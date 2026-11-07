const { getSupabase, method } = require("./_lib");

module.exports = async (req, res) => {
  if (!method(req, res, "POST")) return;
  try {
    const name = String((req.body || {}).name || "").trim().replace(/\s+/g, " ");
    if (!name || name.length > 40) return res.status(400).json({ error: "Please enter a name up to 40 characters." });
    const supabase = getSupabase();
    const { error } = await supabase.from("diwali_visitors").insert({ name });
    if (error) throw error;
    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error("visit error:", e.message);
    return res.status(500).json({ error: "Could not save visitor." });
  }
};