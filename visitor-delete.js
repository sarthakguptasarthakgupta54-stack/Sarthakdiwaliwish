const { getSupabase, requireAdmin, method } = require("../_lib");
module.exports = async (req, res) => {
  if (!method(req, res, "POST")) return;
  if (!requireAdmin(req, res)) return;
  try {
    const id = String((req.body || {}).id || "");
    if (!id) return res.status(400).json({ error: "Visitor ID is required." });
    const { error } = await getSupabase().from("diwali_visitors").delete().eq("id", id);
    if (error) throw error;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Could not delete visitor." });
  }
};