const { getSupabase, requireAdmin, method } = require("../_lib");
module.exports = async (req, res) => {
  if (!method(req, res, "GET")) return;
  if (!requireAdmin(req, res)) return;
  try {
    const { data, error } = await getSupabase().from("diwali_visitors").select("id,name,created_at").order("created_at", { ascending: false }).limit(1000);
    if (error) throw error;
    res.status(200).json({ visitors: data || [] });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Could not load visitors." });
  }
};