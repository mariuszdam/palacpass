from __future__ import annotations

from io import BytesIO
from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
ASSETS_DIR = ROOT / "assets" / "brochure"
OUT_DIR = ROOT / "output" / "brochure"
OUT_PATH = OUT_DIR / "palac-pass-trifold-brochure.pdf"


def mm(value: float) -> float:
    return value * 72.0 / 25.4


PAGE_W_MM = 303.0
PAGE_H_MM = 216.0
TRIM_X_MM = 3.0
TRIM_Y_MM = 3.0
PANEL_W_MM = 99.0
PANEL_H_MM = 210.0

COL_FOREST = (0x35 / 255.0, 0x3A / 255.0, 0x2C / 255.0)
COL_GOLD = (0xB5 / 255.0, 0x9A / 255.0, 0x6E / 255.0)
COL_CREAM = (0xF2 / 255.0, 0xEB / 255.0, 0xDF / 255.0)
COL_CHARCOAL = (0x2A / 255.0, 0x24 / 255.0, 0x21 / 255.0)
COL_WHITE = (1.0, 1.0, 1.0)


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Serif", r"C:\Windows\Fonts\times.ttf"))
    pdfmetrics.registerFont(TTFont("SerifBold", r"C:\Windows\Fonts\timesbd.ttf"))
    pdfmetrics.registerFont(TTFont("Sans", r"C:\Windows\Fonts\arial.ttf"))
    pdfmetrics.registerFont(TTFont("SansBold", r"C:\Windows\Fonts\arialbd.ttf"))


def resolve_asset(prefix: str) -> Path:
    matches = sorted(ASSETS_DIR.glob(f"{prefix}*"))
    if not matches:
        raise FileNotFoundError(f"Missing asset for prefix: {prefix}")
    return matches[0]


def panel_x(panel_index_left_to_right: int) -> float:
    return TRIM_X_MM + (panel_index_left_to_right * PANEL_W_MM)


def draw_rect(c: canvas.Canvas, x: float, y: float, w: float, h: float, rgb: tuple[float, float, float]) -> None:
    c.setFillColorRGB(*rgb)
    c.setStrokeColorRGB(*rgb)
    c.rect(mm(x), mm(y), mm(w), mm(h), fill=1, stroke=0)


def draw_alpha_rect(
    c: canvas.Canvas,
    x: float,
    y: float,
    w: float,
    h: float,
    rgb: tuple[float, float, float],
    alpha: float,
) -> None:
    c.saveState()
    c.setFillColorRGB(*rgb)
    try:
        c.setFillAlpha(alpha)
    except Exception:
        pass
    c.rect(mm(x), mm(y), mm(w), mm(h), fill=1, stroke=0)
    c.restoreState()


def crop_to_ratio(img: Image.Image, target_ratio: float, focal_x: float = 0.5, focal_y: float = 0.5) -> Image.Image:
    w, h = img.size
    src_ratio = w / h

    if src_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = int((w - new_w) * focal_x)
        left = max(0, min(left, w - new_w))
        return img.crop((left, 0, left + new_w, h))
    new_h = int(w / target_ratio)
    top = int((h - new_h) * focal_y)
    top = max(0, min(top, h - new_h))
    return img.crop((0, top, w, top + new_h))


def draw_image_fill(
    c: canvas.Canvas,
    path: Path,
    x: float,
    y: float,
    w: float,
    h: float,
    focal_x: float = 0.5,
    focal_y: float = 0.5,
) -> None:
    with Image.open(path) as src:
        img = src.convert("RGB")
        cropped = crop_to_ratio(img, w / h, focal_x=focal_x, focal_y=focal_y)
        buffer = BytesIO()
        cropped.save(buffer, format="JPEG", quality=95)
        buffer.seek(0)
        c.drawImage(ImageReader(buffer), mm(x), mm(y), mm(w), mm(h), mask="auto")


def text_width(font_name: str, size: float, text: str) -> float:
    return pdfmetrics.stringWidth(text, font_name, size)


def wrap_text(font_name: str, size: float, text: str, max_width_mm: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    max_width_pt = mm(max_width_mm)

    for word in words:
        test = " ".join(current + [word]) if current else word
        if text_width(font_name, size, test) <= max_width_pt:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def draw_text_block(
    c: canvas.Canvas,
    text: str,
    x: float,
    y_top: float,
    max_width_mm: float,
    font_name: str,
    size: float,
    leading_mm: float,
    rgb: tuple[float, float, float],
) -> float:
    c.setFillColorRGB(*rgb)
    c.setFont(font_name, size)
    lines = wrap_text(font_name, size, text, max_width_mm)
    y = y_top
    for line in lines:
        c.drawString(mm(x), mm(y), line)
        y -= leading_mm
    return y


def draw_crop_and_fold_marks(c: canvas.Canvas) -> None:
    x0, y0 = TRIM_X_MM, TRIM_Y_MM
    x1, y1 = TRIM_X_MM + 297.0, TRIM_Y_MM + 210.0
    mark_len = 2.5

    c.setLineWidth(mm(0.2))
    c.setStrokeColorRGB(*COL_CHARCOAL)

    c.line(mm(x0 - mark_len), mm(y0), mm(x0), mm(y0))
    c.line(mm(x0), mm(y0 - mark_len), mm(x0), mm(y0))
    c.line(mm(x1), mm(y0), mm(x1 + mark_len), mm(y0))
    c.line(mm(x1), mm(y0 - mark_len), mm(x1), mm(y0))
    c.line(mm(x0 - mark_len), mm(y1), mm(x0), mm(y1))
    c.line(mm(x0), mm(y1), mm(x0), mm(y1 + mark_len))
    c.line(mm(x1), mm(y1), mm(x1 + mark_len), mm(y1))
    c.line(mm(x1), mm(y1), mm(x1), mm(y1 + mark_len))

    for fold_x in (TRIM_X_MM + PANEL_W_MM, TRIM_X_MM + (2 * PANEL_W_MM)):
        c.line(mm(fold_x), mm(y0 - mark_len), mm(fold_x), mm(y0))
        c.line(mm(fold_x), mm(y1), mm(fold_x), mm(y1 + mark_len))


def draw_crest(c: canvas.Canvas, cx_mm: float, cy_mm: float, r_mm: float) -> None:
    c.saveState()
    c.setStrokeColorRGB(*COL_GOLD)
    c.setFillColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.35))
    c.circle(mm(cx_mm), mm(cy_mm), mm(r_mm), stroke=1, fill=0)
    c.circle(mm(cx_mm), mm(cy_mm), mm(r_mm * 0.14), stroke=0, fill=1)
    c.restoreState()


def draw_outside_page(c: canvas.Canvas, assets: dict[str, Path]) -> None:
    draw_rect(c, 0, 0, PAGE_W_MM, PAGE_H_MM, COL_CREAM)

    x_p6 = panel_x(0)
    x_p1 = panel_x(1)
    x_p5 = panel_x(2)
    y = TRIM_Y_MM

    # Panel 1 (cover)
    draw_image_fill(c, assets["H1"], x_p1, y, PANEL_W_MM, PANEL_H_MM, focal_x=0.5, focal_y=0.45)
    draw_alpha_rect(c, x_p1, y, PANEL_W_MM, PANEL_H_MM, COL_FOREST, 0.2)
    draw_rect(c, x_p1, y, 22.0, PANEL_H_MM, COL_FOREST)
    draw_crest(c, x_p1 + 11.0, y + 196.0, 5.0)

    c.setFillColorRGB(*COL_CREAM)
    c.setFont("SerifBold", 23)
    c.drawString(mm(x_p1 + 8.0), mm(y + 28.0), "Palac Pass")
    c.setFont("Sans", 8.7)
    c.drawString(mm(x_p1 + 8.0), mm(y + 21.0), "A Residence of Quiet Grandeur")
    c.setFont("Sans", 7.8)
    c.drawString(mm(x_p1 + 8.0), mm(y + 15.0), "Near Warsaw")

    # Panel 5 (possibilities)
    draw_rect(c, x_p5, y, PANEL_W_MM, PANEL_H_MM, COL_FOREST)
    c.setFillColorRGB(*COL_CREAM)
    c.setFont("SerifBold", 21)
    c.drawString(mm(x_p5 + 8.0), mm(y + 190.0), "Possibilities")
    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.5))
    c.line(mm(x_p5 + 8.0), mm(y + 186.0), mm(x_p5 + 54.0), mm(y + 186.0))
    c.setFont("Sans", 8.2)
    lines = [
        "Curated experiences at Palac Pass:",
        "Private celebrations",
        "Editorial and brand productions",
        "Business gatherings and retreats",
        "Private dining and tasting evenings",
        "Cultural events and seasonal occasions",
    ]
    yy = y + 178.0
    for line in lines:
        c.drawString(mm(x_p5 + 8.0), mm(yy), line)
        yy -= 8.0

    draw_image_fill(c, assets["H5"], x_p5, y + 88.0, PANEL_W_MM, 46.0, focal_x=0.5, focal_y=0.5)
    draw_image_fill(c, assets["H6"], x_p5, y, 49.5, 85.0, focal_x=0.45, focal_y=0.55)
    draw_image_fill(c, assets["H7"], x_p5 + 49.5, y, 49.5, 85.0, focal_x=0.52, focal_y=0.5)

    # Panel 6 (back/contact)
    draw_rect(c, x_p6, y, PANEL_W_MM, PANEL_H_MM, COL_CREAM)
    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.6))
    c.line(mm(x_p6 + 8.0), mm(y + 168.0), mm(x_p6 + 63.0), mm(y + 168.0))

    c.setFillColorRGB(*COL_CHARCOAL)
    c.setFont("SerifBold", 22)
    c.drawString(mm(x_p6 + 8.0), mm(y + 174.0), "Bookings")
    c.setFont("Sans", 9.4)
    c.drawString(mm(x_p6 + 8.0), mm(y + 158.0), "Private viewings and date inquiries")
    c.setFont("Sans", 10.2)
    c.drawString(mm(x_p6 + 8.0), mm(y + 144.0), "+48 785 897 157")
    c.drawString(mm(x_p6 + 8.0), mm(y + 136.0), "dustin.nowak@palacpass.pl")
    c.drawString(mm(x_p6 + 8.0), mm(y + 128.0), "Pass 1, 05-870 Blonie")
    c.setFont("Sans", 8.9)
    c.drawString(mm(x_p6 + 8.0), mm(y + 116.0), "By appointment only")
    draw_image_fill(c, assets["H8"], x_p6 + 57.0, y + 12.0, 34.0, 48.0, focal_x=0.56, focal_y=0.45)

    draw_crop_and_fold_marks(c)


def draw_inside_page(c: canvas.Canvas, assets: dict[str, Path]) -> None:
    draw_rect(c, 0, 0, PAGE_W_MM, PAGE_H_MM, COL_CREAM)

    x_p2 = panel_x(0)
    x_p3 = panel_x(1)
    x_p4 = panel_x(2)
    y = TRIM_Y_MM

    # Panel 2 (about)
    draw_rect(c, x_p2, y, PANEL_W_MM, PANEL_H_MM, COL_CREAM)
    c.setFillColorRGB(*COL_CHARCOAL)
    c.setFont("SerifBold", 20)
    c.drawString(mm(x_p2 + 8.0), mm(y + 188.0), "About the Palace")
    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.6))
    c.line(mm(x_p2 + 8.0), mm(y + 184.0), mm(x_p2 + 62.0), mm(y + 184.0))

    about_text = (
        "Built in 1830, Palac Pass remains one of Mazovia's distinguished classical estates. "
        "Restored with respect for original proportion and detail, it offers marble interiors, "
        "antique character, and 17 hectares of English parkland."
    )
    draw_text_block(
        c,
        text=about_text,
        x=x_p2 + 8.0,
        y_top=y + 174.0,
        max_width_mm=54.0,
        font_name="Sans",
        size=9.1,
        leading_mm=5.5,
        rgb=COL_CHARCOAL,
    )
    draw_image_fill(c, assets["H2"], x_p2 + 53.0, y + 14.0, 38.0, 52.0, focal_x=0.48, focal_y=0.42)

    # Panel 3 (Oranzeria)
    draw_image_fill(c, assets["H3"], x_p3, y, PANEL_W_MM, PANEL_H_MM, focal_x=0.5, focal_y=0.48)
    for i in range(14):
        band_h = 7.0
        alpha = 0.33 * (1.0 - (i / 14.0))
        draw_alpha_rect(c, x_p3, y + (i * band_h), PANEL_W_MM, band_h + 0.1, (0, 0, 0), alpha)

    c.setFillColorRGB(*COL_WHITE)
    c.setFont("Sans", 8.0)
    c.drawString(mm(x_p3 + 8.0), mm(y + 48.0), "THE ORANZERIA")
    c.setFont("SerifBold", 22)
    c.drawString(mm(x_p3 + 8.0), mm(y + 37.0), "Glass. Light. Nature.")
    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.55))
    c.line(mm(x_p3 + 8.0), mm(y + 33.0), mm(x_p3 + 52.0), mm(y + 33.0))
    or_text = (
        "Our signature space, the Czarna Oranzeria, frames the park in natural light by day "
        "and a refined atmosphere by evening."
    )
    draw_text_block(
        c,
        text=or_text,
        x=x_p3 + 8.0,
        y_top=y + 27.0,
        max_width_mm=78.0,
        font_name="Sans",
        size=8.7,
        leading_mm=5.0,
        rgb=COL_WHITE,
    )

    # Panel 4 (weddings)
    draw_rect(c, x_p4, y, PANEL_W_MM, PANEL_H_MM, COL_CREAM)
    img_w = 39.6
    draw_image_fill(c, assets["H4"], x_p4 + PANEL_W_MM - img_w, y, img_w, PANEL_H_MM, focal_x=0.52, focal_y=0.46)
    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.6))
    c.line(mm(x_p4 + PANEL_W_MM - img_w - 3.5), mm(y + 12.0), mm(x_p4 + PANEL_W_MM - img_w - 3.5), mm(y + 198.0))

    c.setFillColorRGB(*COL_CHARCOAL)
    c.setFont("SerifBold", 22)
    c.drawString(mm(x_p4 + 8.0), mm(y + 188.0), "Weddings")
    c.setFont("Serif", 12.8)
    c.drawString(mm(x_p4 + 8.0), mm(y + 176.0), "Elegant, deeply personal, never formulaic.")
    weddings_body = (
        "From intimate palace dinners to full Oranzeria celebrations, each wedding is "
        "composed around season, rhythm, and your private vision."
    )
    draw_text_block(
        c,
        text=weddings_body,
        x=x_p4 + 8.0,
        y_top=y + 164.0,
        max_width_mm=49.0,
        font_name="Sans",
        size=9.0,
        leading_mm=5.3,
        rgb=COL_CHARCOAL,
    )

    draw_crop_and_fold_marks(c)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()

    assets = {
        "H1": resolve_asset("H1_cover"),
        "H2": resolve_asset("H2_about_detail"),
        "H3": resolve_asset("H3_oranzeria_day"),
        "H4": resolve_asset("H4_weddings_couple"),
        "H5": resolve_asset("H5_driveway"),
        "H6": resolve_asset("H6_table_detail"),
        "H7": resolve_asset("H7_oranzeria_night"),
        "H8": resolve_asset("H2_about_detail"),
    }

    c = canvas.Canvas(str(OUT_PATH), pagesize=(mm(PAGE_W_MM), mm(PAGE_H_MM)))

    draw_outside_page(c, assets)
    c.showPage()
    draw_inside_page(c, assets)
    c.showPage()
    c.save()

    print(f"Generated: {OUT_PATH}")


if __name__ == "__main__":
    main()
