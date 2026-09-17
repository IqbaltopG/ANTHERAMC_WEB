export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SERVER_NAME || "ANTHERA SERVER",
  tagline: process.env.NEXT_PUBLIC_SERVER_TAGLINE || "A living Dark Fantasy RPG built inside Minecraft.",
  javaIp: process.env.NEXT_PUBLIC_JAVA_IP || "play.antheraserver.id",
  bedrockIp: process.env.NEXT_PUBLIC_BEDROCK_IP || "play.antheraserver.id",
  bedrockPort: process.env.NEXT_PUBLIC_BEDROCK_PORT || "19132",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/anthera",
  map: process.env.NEXT_PUBLIC_MAP_URL || "https://map.antheraserver.id",
  est: process.env.NEXT_PUBLIC_EST_YEAR || "2026",
  season: process.env.NEXT_PUBLIC_SEASON_NAME || "SEASON 1: THE AWAKENING",
};
