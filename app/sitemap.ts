import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base=process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return ["","/leaderboard","/dungeons","/collections","/season","/battle-pass","/achievements","/store","/vote","/status","/news"].map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path===""?"daily":"weekly",priority:path===""?1:0.7}));
}
