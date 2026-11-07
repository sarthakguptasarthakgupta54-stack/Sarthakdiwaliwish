const { getSupabase, requireAdmin } = require("../_lib");
const formidable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Method not allowed." }); }
  if (!requireAdmin(req, res)) return;
  try {
    const form = formidable({ maxFileSize: 8 * 1024 * 1024, maxFiles: 1, multiples: false });
    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.photo) ? files.photo[0] : files.photo;
    if (!file) return res.status(400).json({ error: "Choose an image first." });
    const mime = file.mimetype || "";
    if (!mime.startsWith("image/")) return res.status(400).json({ error: "Only image files are allowed." });
    const ext = (file.originalFilename || "photo").split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8) || "jpg";
    const name = `${Date.now()}-${crypto.randomBytes(5).toString("hex")}.${ext}`;
    const buffer = fs.readFileSync(file.filepath);
    const supabase = getSupabase();
    const { error } = await supabase.storage.from("diwali-gallery").upload(name, buffer, { contentType: mime, upsert: false });
    if (error) throw error;
    res.status(201).json({ ok: true, name });
  } catch (e) {
    console.error("photo upload:", e.message);
    res.status(500).json({ error: e.message.includes("maxFileSize") ? "Image must be 8 MB or smaller." : "Photo upload failed. Check Supabase Storage setup." });
  }
};
module.exports.config = { api: { bodyParser: false } };