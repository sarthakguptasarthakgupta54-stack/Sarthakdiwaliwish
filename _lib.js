const { createClient } = require("@supabase/supabase-js");

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Server is missing Supabase environment variables.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function requireAdmin(req, res) {
  const expected = process.env.ADMIN_PASSWORD;
  const supplied = req.headers["x-admin-password"];
  if (!expected) {
    res.status(500).json({ error: "ADMIN_PASSWORD is not configured in Vercel." });
    return false;
  }
  if (!supplied || supplied !== expected) {
    res.status(401).json({ error: "Incorrect admin password." });
    return false;
  }
  return true;
}

function method(req, res, allowed) {
  if (req.method !== allowed) {
    res.setHeader("Allow", allowed);
    res.status(405).json({ error: "Method not allowed." });
    return false;
  }
  return true;
}

module.exports = { getSupabase, requireAdmin, method };