export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SERVER_NAME || "REYNETWORK",
  tagline: process.env.NEXT_PUBLIC_SERVER_TAGLINE || "A living RPG network built inside Minecraft.",
  javaIp: process.env.NEXT_PUBLIC_JAVA_IP || "play.example.net",
  bedrockIp: process.env.NEXT_PUBLIC_BEDROCK_IP || "play.example.net",
  bedrockPort: process.env.NEXT_PUBLIC_BEDROCK_PORT || "19132",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/example",
  map: process.env.NEXT_PUBLIC_MAP_URL || "https://map.example.net",
  est: process.env.NEXT_PUBLIC_EST_YEAR || "2026",
  season: process.env.NEXT_PUBLIC_SEASON_NAME || "FRACTURE PROTOCOL",
};
