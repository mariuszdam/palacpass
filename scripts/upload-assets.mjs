import { createClient } from "@supabase/supabase-js";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const SUPABASE_URL = "https://uqkbgkxqwnyinzfgrwec.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_KEY) {
  console.error("Missing Supabase key. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET = "assets";
const TEMP_DIR = "./scripts/tmp";

const ASSETS = [
  {
    url: "https://palacpass.pl/wp-content/uploads/2021/08/dsc_1965-kopia_652-600x640.jpg",
    path: "images/dsc_1965-kopia.jpg",
    type: "image/jpeg",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2021/07/dsc_8185_107.jpg",
    path: "images/dsc_8185_107.jpg",
    type: "image/jpeg",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2022/07/alexey_pilipenko-431_655-600x640.jpg",
    path: "images/alexey_pilipenko-431.jpg",
    type: "image/jpeg",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2024/04/na-strone_800_781.jpg",
    path: "images/na-strone_800.jpg",
    type: "image/jpeg",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2021/10/rdyf_347.jpg",
    path: "images/rdyf_347.jpg",
    type: "image/jpeg",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2021/07/hgjk_777.jpg",
    path: "images/hgjk_777.jpg",
    type: "image/jpeg",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2022/08/dji_0339_434.mp4",
    path: "videos/dji_0339_434.mp4",
    type: "video/mp4",
  },
  {
    url: "https://palacpass.pl/wp-content/uploads/2022/08/dji_0314_366.mp4",
    path: "videos/dji_0314_366.mp4",
    type: "video/mp4",
  },
];

async function ensureBucket() {
  const { data, error } = await supabase.storage.getBucket(BUCKET);
  if (error && error.message.includes("not found")) {
    console.log(`Creating bucket "${BUCKET}"...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    if (createError) {
      console.error("Failed to create bucket:", createError.message);
      process.exit(1);
    }
    console.log("Bucket created successfully.");
  } else if (error) {
    console.error("Bucket error:", error.message);
    process.exit(1);
  } else {
    console.log(`Bucket "${BUCKET}" already exists.`);
  }
}

async function downloadFile(url, localPath) {
  const dir = path.dirname(localPath);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  if (existsSync(localPath)) {
    console.log(`  ↳ Cached: ${localPath}`);
    return readFile(localPath);
  }

  console.log(`  ↳ Downloading: ${url}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(localPath, buffer);
  return buffer;
}

async function uploadAsset(asset) {
  const localPath = path.join(TEMP_DIR, asset.path);
  const buffer = await downloadFile(asset.url, localPath);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(asset.path, buffer, {
      contentType: asset.type,
      upsert: true,
    });

  if (error) {
    console.error(`  ✗ Upload failed for ${asset.path}:`, error.message);
    return false;
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${asset.path}`;
  console.log(`  ✓ Uploaded: ${asset.path}`);
  console.log(`    URL: ${publicUrl}`);
  return true;
}

async function main() {
  console.log("=== Palac Pass Asset Upload ===\n");

  await ensureBucket();

  let success = 0;
  let failed = 0;

  for (const asset of ASSETS) {
    console.log(`\n[${asset.path}]`);
    try {
      const ok = await uploadAsset(asset);
      if (ok) success++;
      else failed++;
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=== Done: ${success} uploaded, ${failed} failed ===`);

  if (failed === 0) {
    console.log("\nAll assets uploaded. URL mapping:");
    console.log("─".repeat(60));
    for (const asset of ASSETS) {
      console.log(`${asset.path}`);
      console.log(`  → ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${asset.path}`);
    }
  }
}

main().catch(console.error);
