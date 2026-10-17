// Build-time sitemap generator. Queries Supabase with the PUBLIC publishable key
// (RLS guarantees only published, already-due content is returned) and rewrites
// public/sitemap.xml. If credentials are missing or the request fails, the
// existing sitemap is left untouched and the build continues.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

function loadEnv() {
  const env = { ...process.env };
  for (const f of [".env.local", ".env"]) {
    if (!existsSync(f)) continue;
    for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
const site = (readFileSync("src/utils/seo.ts", "utf8").match(/SITE_URL = "([^"]+)"/) || [])[1];

if (!url || !key || !site) {
  console.warn("[sitemap] Supabase env or SITE_URL missing - keeping existing public/sitemap.xml");
  process.exit(0);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
async function get(path) {
  const res = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
  return res.json();
}

try {
  const now = new Date().toISOString();
  const [articles, vehicles, categories] = await Promise.all([
    get(`articles?select=slug,category_id,updated_at&status=eq.published&published_at=lte.${encodeURIComponent(now)}&order=published_at.desc`),
    get("vehicles?select=id,updated_at&is_published=eq.true"),
    get("article_categories?select=id,slug"),
  ]);
  const usedCats = new Set(articles.map((a) => a.category_id).filter(Boolean));

  const entries = [
    ["/", "weekly", "1.0"], ["/vehicles", "daily", "0.9"], ["/services", "monthly", "0.7"],
    ["/blog", "daily", "0.8"], ["/about", "monthly", "0.5"], ["/contact", "monthly", "0.6"],
    ...categories.filter((c) => usedCats.has(c.id)).map((c) => [`/blog/category/${encodeURIComponent(c.slug)}`, "weekly", "0.5"]),
    ...articles.map((a) => [`/blog/${encodeURIComponent(a.slug)}`, "monthly", "0.7", a.updated_at]),
    ...vehicles.map((v) => [`/vehicles/${v.id}`, "weekly", "0.8", v.updated_at]),
  ];

  const body = entries
    .map(([p, freq, prio, mod]) =>
      `  <url>\n    <loc>${esc(site + p)}</loc>\n${mod ? `    <lastmod>${mod.slice(0, 10)}</lastmod>\n` : ""}    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`)
    .join("\n");
  writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  console.log(`[sitemap] wrote ${entries.length} URLs (${articles.length} articles, ${vehicles.length} vehicles)`);
} catch (e) {
  console.warn("[sitemap] generation failed, keeping existing file:", e.message);
}
