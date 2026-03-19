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
OUT_PATH = OUT_DIR / "palac-pass-invitation-brochure.pdf"

CANVAS_W_MM = 154.0
CANVAS_H_MM = 216.0
SHAPE_W_MM = 150.0
SHAPE_H_MM = 205.0
X_OFFSET_MM = (CANVAS_W_MM - SHAPE_W_MM) / 2
Y_OFFSET_MM = (CANVAS_H_MM - SHAPE_H_MM) / 2

COL_FOREST = (0x35 / 255.0, 0x3A / 255.0, 0x2C / 255.0)
COL_GOLD = (0xB5 / 255.0, 0x9A / 255.0, 0x6E / 255.0)
COL_CREAM = (0xF2 / 255.0, 0xEB / 255.0, 0xDF / 255.0)
COL_CHARCOAL = (0x2A / 255.0, 0x24 / 255.0, 0x21 / 255.0)
COL_WHITE = (1.0, 1.0, 1.0)

FONT_DIR = Path(r"C:\Windows\Fonts")


def mm(value: float) -> float:
    return value * 72.0 / 25.4


def register_font(alias: str, candidates: list[str], fallback: str) -> str:
    for name in candidates:
        font_path = FONT_DIR / name
        if font_path.exists():
            try:
                pdfmetrics.registerFont(TTFont(alias, str(font_path)))
                return alias
            except Exception:
                pass

    fallback_path = FONT_DIR / fallback
    pdfmetrics.registerFont(TTFont(alias, str(fallback_path)))
    return alias


def register_fonts() -> tuple[str, str, str, str]:
    serif = register_font(
        "PalaceSerif",
        [
            "CormorantGaramond-Regular.ttf",
            "CormorantGaramond-Regular.otf",
            "CormorantGaramond-Light.ttf",
            "times.ttf",
        ],
        "times.ttf",
    )
    serif_bold = register_font(
        "PalaceSerifBold",
        [
            "CormorantGaramond-SemiBold.ttf",
            "CormorantGaramond-Bold.ttf",
            "timesbd.ttf",
        ],
        "timesbd.ttf",
    )
    sans = register_font(
        "PalaceSans",
        [
            "Inter-Regular.ttf",
            "Inter-Regular.otf",
            "arial.ttf",
        ],
        "arial.ttf",
    )
    sans_bold = register_font(
        "PalaceSansBold",
        [
            "Inter-Bold.ttf",
            "Inter-Bold.otf",
            "arialbd.ttf",
        ],
        "arialbd.ttf",
    )
    return serif, serif_bold, sans, sans_bold


def resolve_asset(prefix: str) -> Path:
    matches = sorted(ASSETS_DIR.glob(f"{prefix}*"))
    if not matches:
        raise FileNotFoundError(f"Missing asset for prefix: {prefix}")
    return matches[0]


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


def text_block(
    c: canvas.Canvas,
    text: str,
    x: float,
    y_top: float,
    max_width: float,
    font_name: str,
    size: float,
    leading: float,
    color: tuple[float, float, float],
) -> None:
    c.setFillColorRGB(*color)
    c.setFont(font_name, size)
    words = text.split()
    line = ""
    y = y_top

    for word in words:
        candidate = f"{line} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font_name, size) <= mm(max_width):
            line = candidate
            continue
        if line:
            c.drawString(mm(x), mm(y), line)
            y -= leading
        line = word

    if line:
        c.drawString(mm(x), mm(y), line)


def build_die_path(c: canvas.Canvas, x: float, y: float) -> object:
    p = c.beginPath()
    p.moveTo(mm(x + 20.0), mm(y + 86.0))
    p.curveTo(mm(x + 12.0), mm(y + 78.0), mm(x + 10.0), mm(y + 58.0), mm(x + 22.0), mm(y + 48.0))
    p.curveTo(mm(x + 38.0), mm(y + 30.0), mm(x + 58.0), mm(y + 16.0), mm(x + 75.0), mm(y + 14.0))
    p.curveTo(mm(x + 92.0), mm(y + 16.0), mm(x + 112.0), mm(y + 30.0), mm(x + 128.0), mm(y + 48.0))
    p.curveTo(mm(x + 140.0), mm(y + 58.0), mm(x + 138.0), mm(y + 78.0), mm(x + 130.0), mm(y + 86.0))
    p.lineTo(mm(x + 130.0), mm(y + 145.0))
    p.curveTo(mm(x + 138.0), mm(y + 176.0), mm(x + 112.0), mm(y + 195.0), mm(x + 75.0), mm(y + 195.0))
    p.curveTo(mm(x + 38.0), mm(y + 195.0), mm(x + 12.0), mm(y + 176.0), mm(x + 20.0), mm(y + 145.0))
    p.curveTo(mm(x + 14.0), mm(y + 130.0), mm(x + 14.0), mm(y + 86.0), mm(x + 20.0), mm(y + 86.0))
    p.close()
    return p


def draw_shape_outline(c: canvas.Canvas, x: float, y: float, color: tuple[float, float, float], width: float) -> None:
    c.saveState()
    c.setStrokeColorRGB(*color)
    c.setLineWidth(mm(width))
    c.setFillColorRGB(*COL_WHITE)
    c.drawPath(build_die_path(c, x, y), fill=0, stroke=1)
    c.restoreState()


def draw_shape_image(
    c: canvas.Canvas,
    image_path: Path,
    x: float,
    y: float,
    fill_mode: str = "cover",
) -> None:
    path = build_die_path(c, x, y)
    c.saveState()
    c.drawPath(path, fill=0, stroke=0)
    c.clipPath(path, fill=0)
    if fill_mode == "cover":
        draw_image_fill(c, image_path, x, y, SHAPE_W_MM, SHAPE_H_MM, focal_x=0.5, focal_y=0.47)
    else:
        c.setFillColorRGB(*COL_CREAM)
        c.rect(mm(x), mm(y), mm(SHAPE_W_MM), mm(SHAPE_H_MM), stroke=0, fill=1)
    c.restoreState()


def draw_front_page(c: canvas.Canvas, assets: dict[str, Path], fonts: tuple[str, str, str, str]) -> None:
    serif, serif_bold, sans, sans_bold = fonts
    x = X_OFFSET_MM
    y = Y_OFFSET_MM
    c.setFillColorRGB(*COL_CREAM)
    c.rect(mm(0), mm(0), mm(CANVAS_W_MM), mm(CANVAS_H_MM), fill=1, stroke=0)

    draw_shape_image(c, assets["cover"], x, y)
    c.saveState()
    c.setFillColorRGB(*COL_FOREST)
    c.setFillAlpha(0.22)
    c.rect(mm(x), mm(y), mm(SHAPE_W_MM), mm(SHAPE_H_MM), fill=1, stroke=0)
    c.restoreState()

    c.setFillColorRGB(*COL_GOLD)
    c.setFont(serif_bold, 40)
    c.drawString(mm(x + 24.5), mm(y + 168.0), "PAŁAC PASS")
    c.setFont(sans_bold, 12)
    c.drawString(mm(x + 24.6), mm(y + 157.8), "Palace invitation")

    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.5))
    c.line(mm(x + 24.6), mm(y + 153.0), mm(x + 78.0), mm(y + 153.0))

    c.setFont(sans, 10.4)
    text_block(
        c,
        "A private setting where heritage is the language.",
        x + 24.6,
        y + 61.0,
        96.0,
        sans_bold,
        9.8,
        4.8,
        COL_CREAM,
    )

    c.setStrokeColorRGB(*COL_CREAM)
    c.setLineWidth(mm(0.35))
    c.setFillColorRGB(*COL_CREAM)
    c.circle(mm(x + 45.0), mm(y + 25.0), mm(0.7), fill=1, stroke=1)
    c.setLineWidth(mm(0.35))
    c.circle(mm(x + 75.0), mm(y + 25.0), mm(0.7), fill=1, stroke=1)
    c.circle(mm(x + 105.0), mm(y + 25.0), mm(0.7), fill=1, stroke=1)

    draw_shape_outline(c, x, y, COL_GOLD, 0.35)


def draw_back_page(c: canvas.Canvas, assets: dict[str, Path], fonts: tuple[str, str, str, str]) -> None:
    serif, serif_bold, sans, sans_bold = fonts
    x = X_OFFSET_MM
    y = Y_OFFSET_MM
    c.setFillColorRGB(*COL_WHITE)
    c.rect(mm(0), mm(0), mm(CANVAS_W_MM), mm(CANVAS_H_MM), fill=1, stroke=0)

    draw_shape_image(c, assets["back"], x, y)
    c.saveState()
    c.setFillColorRGB(*COL_CREAM)
    c.setFillAlpha(0.74)
    c.rect(mm(x + 0), mm(y + 0), mm(SHAPE_W_MM), mm(SHAPE_H_MM), fill=1, stroke=0)
    c.restoreState()

    c.setFillColorRGB(*COL_CHARCOAL)
    c.setFont(serif, 17)
    c.drawString(mm(x + 22.0), mm(y + 170.0), "In the hush of stone, light, and glass")

    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.55))
    c.line(mm(x + 22.0), mm(y + 165.0), mm(x + 92.0), mm(y + 165.0))

    c.setFont(serif_bold, 36)
    c.drawString(mm(x + 22.0), mm(y + 148.0), "Oranżeria")

    c.setFont(sans, 9.0)
    text_block(
        c,
        "The signature room of clear lines, open light, and quiet grandeur.",
        x + 22.0,
        y + 136.0,
        100.0,
        sans,
        9.0,
        5.2,
        COL_CHARCOAL,
    )
    text_block(
        c,
        "You are invited to an evening at Palac Pass",
        x + 22.0,
        y + 112.0,
        100.0,
        sans_bold,
        10.2,
        5.6,
        COL_CHARCOAL,
    )
    c.setFont(sans, 9.4)
    c.drawString(mm(x + 22.0), mm(y + 101.0), "For private viewing and reserved dates, write:")
    c.setFont(sans_bold, 9.9)
    c.drawString(mm(x + 22.0), mm(y + 91.0), "Date  ·  Time")
    c.setFont(sans, 10.0)
    c.drawString(mm(x + 22.0), mm(y + 78.0), "Pass 1, 05-870 Blonie")
    c.drawString(mm(x + 22.0), mm(y + 68.0), "+48 785 897 157")
    c.drawString(mm(x + 22.0), mm(y + 58.0), "dustin.nowak@palacpass.pl")

    c.setStrokeColorRGB(*COL_GOLD)
    c.setLineWidth(mm(0.6))
    c.roundRect(mm(x + 20.0), mm(y + 30.0), mm(108.0), mm(17.0), mm(2.2), stroke=1, fill=0)
    c.setFillColorRGB(*COL_CHARCOAL)
    c.setFont(serif, 9.4)
    c.drawString(mm(x + 28.0), mm(y + 40.0), "Request private viewing")

    c.setFillColorRGB(*COL_CREAM)
    c.setFont(sans_bold, 9.0)
    c.drawString(mm(x + 98.0), mm(y + 28.0), "Palac Pass")

    draw_shape_outline(c, x, y, COL_GOLD, 0.35)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fonts = register_fonts()

    assets = {
        "cover": resolve_asset("H1_cover"),
        "back": resolve_asset("H3_oranzeria_day"),
    }

    c = canvas.Canvas(str(OUT_PATH), pagesize=(mm(CANVAS_W_MM), mm(CANVAS_H_MM)))

    draw_front_page(c, assets, fonts)
    c.showPage()
    draw_back_page(c, assets, fonts)
    c.showPage()
    c.save()

    print(f"Generated: {OUT_PATH}")


if __name__ == "__main__":
    main()
