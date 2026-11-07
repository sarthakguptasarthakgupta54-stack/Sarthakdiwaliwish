const { getSupabase, requireAdmin, method } = require("../_lib");
const BUCKET = "diwali-gallery";
module.exports = async (req, res) => {
  if (!method(req, res, "GET")) return;
  if (!requireAdmin(req, res)) return;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.storage.from(BUCKET).list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw error;
    const photos = (data || []).filter(x => x.name && !x.name.endsWith("/")).map(x => {
      const { data: u } = supabase.storage.from(BUCKET).getPublicUrl(x.name);
      return { name: x.name, url: u.publicUrl };
    });
    res.status(200).json({ photos });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Could not load gallery photos. Check that the diwali-gallery bucket exists and is public." });
  }
};