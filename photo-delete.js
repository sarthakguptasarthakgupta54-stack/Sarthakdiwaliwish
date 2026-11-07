const { getSupabase, requireAdmin, method } = require("../_lib");
module.exports = async (req, res) => {
  if (!method(req, res, "POST")) return;
  if (!requireAdmin(req, res)) return;
  try {
    const name = String((req.body || {}).name || "");
    if (!name || name.includes("..") || name.includes("/")) return res.status(400).json({ error: "Invalid photo name." });
    const { error } = await getSupabase().storage.from("diwali-gallery").remove([name]);
    if (error) throw error;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Could not delete photo." });
  }
};