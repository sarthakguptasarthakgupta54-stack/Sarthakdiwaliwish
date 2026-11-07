const { getSupabase, method } = require("./_lib");
module.exports = async (req, res) => {
  if (!method(req, res, "GET")) return;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.storage.from("diwali-gallery").list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw error;
    const photos = (data || []).filter(x => x.name && !x.name.endsWith("/")).map(x => {
      const { data: u } = supabase.storage.from("diwali-gallery").getPublicUrl(x.name);
      return { name: x.name, url: u.publicUrl };
    });
    res.status(200).json({ photos });
  } catch (e) {
    console.error("gallery:", e.message);
    res.status(500).json({ error: "Gallery photos are temporarily unavailable." });
  }
};