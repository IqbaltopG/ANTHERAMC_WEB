export const modes = [
  {
    code: "ORIGIN",
    title: "Survival RPG",
    description: "Survival progresif dengan custom weapon, skill tree, quest, boss, ekonomi, dan dungeon instanced.",
    accent: "amber",
    bullets: ["Custom 3D Weapons", "Aura Skills", "Quests & Economy"],
    online: 72,
  },
  {
    code: "ABYSS",
    title: "Dungeons",
    description: "Party dungeon, encounter bertahap, boss mekanikal, rare drops, dan seasonal challenge.",
    accent: "violet",
    bullets: ["Instanced Runs", "Boss Mechanics", "Rare Loot"],
    online: 18,
  },
  {
    code: "NEXUS",
    title: "Seasonal Events",
    description: "World boss, event komunitas, treasure hunt, dan konten musiman dengan reward eksklusif.",
    accent: "cyan",
    bullets: ["Live Events", "World Boss", "Season Rewards"],
    online: 11,
  },
];

export const leaderboard = [
  { rank: 1, name: "ReyYoga", value: "12,840", metric: "Power", class: "Riftblade", level: 87 },
  { rank: 2, name: "Asteria", value: "11,920", metric: "Power", class: "Arcanist", level: 84 },
  { rank: 3, name: "KuroNeko", value: "10,775", metric: "Power", class: "Assassin", level: 82 },
  { rank: 4, name: "FrostByte", value: "9,640", metric: "Power", class: "Warden", level: 79 },
  { rank: 5, name: "Lumina", value: "8,915", metric: "Power", class: "Cleric", level: 76 },
  { rank: 6, name: "Noxis", value: "8,201", metric: "Power", class: "Necromancer", level: 74 },
  { rank: 7, name: "Raijin", value: "7,894", metric: "Power", class: "Tempest", level: 71 },
  { rank: 8, name: "Pineapple", value: "7,310", metric: "Power", class: "Ranger", level: 69 },
  { rank: 9, name: "Velora", value: "6,998", metric: "Power", class: "Paladin", level: 67 },
  { rank: 10, name: "AbyssWalker", value: "6,775", metric: "Power", class: "Reaper", level: 65 },
];

export const storeItems = [
  { name: "NOVA", price: "Rp35.000", badge: "Starter", perks: ["Prefix NOVA", "3 Homes", "Vault 2 rows", "Cosmetic trail", "Queue priority I"] },
  { name: "CELESTIAL", price: "Rp75.000", badge: "Popular", perks: ["Prefix CELESTIAL", "6 Homes", "Vault 4 rows", "Cosmetic bundle", "Queue priority II", "Monthly style token"] },
  { name: "ASCENDANT", price: "Rp149.000", badge: "Premium", perks: ["Prefix ASCENDANT", "10 Homes", "Vault 6 rows", "Pet skin pack", "Queue priority III", "Profile frame", "Season cosmetic token"] },
];

export const votes = [
  { name: "Minecraft-MP", reward: "1 Vote Key + 500 Coins", url: "https://minecraft-mp.com/" },
  { name: "MinecraftServers.org", reward: "1 Vote Key + 500 Coins", url: "https://minecraftservers.org/" },
  { name: "TopG", reward: "1 Vote Key + 500 Coins", url: "https://topg.org/" },
  { name: "Minecraft Pocket Servers", reward: "1 Vote Key + 500 Coins", url: "https://minecraftpocket-servers.com/" },
];

export const player = {
  name: "ReyYoga",
  className: "Riftblade",
  level: 87,
  power: 12840,
  rank: "ASCENDANT",
  guild: "Nightfall",
  coins: 4289100,
  shards: 2480,
  playtime: "312h 44m",
  kills: 1842,
  deaths: 173,
  streak: 14,
  seasonRank: 1,
  battlePassLevel: 63,
  battlePassXp: 7420,
  battlePassNext: 9000,
  skills: [
    { name: "Combat", level: 92, progress: 92 },
    { name: "Mining", level: 84, progress: 84 },
    { name: "Farming", level: 76, progress: 76 },
    { name: "Agility", level: 88, progress: 88 },
    { name: "Enchanting", level: 69, progress: 69 },
  ],
};

export const pets = [
  { name: "Voidling", rarity: "MYTHIC", level: 42, owned: true, icon: "◈", bonus: "+4% dungeon damage" },
  { name: "Ember Fox", rarity: "LEGENDARY", level: 37, owned: true, icon: "✦", bonus: "+8% movement out of combat" },
  { name: "Moss Golem", rarity: "EPIC", level: 29, owned: true, icon: "⬢", bonus: "+5% gathering yield" },
  { name: "Astral Moth", rarity: "MYTHIC", level: 1, owned: false, icon: "✧", bonus: "Rare seasonal companion" },
  { name: "Frost Wisp", rarity: "LEGENDARY", level: 1, owned: false, icon: "❄", bonus: "Winter raid drop" },
  { name: "Clockwork Bee", rarity: "EPIC", level: 1, owned: false, icon: "⬡", bonus: "Engineering event reward" },
];

export const dungeons = [
  { name: "The Sunken Archive", tier: "T7", best: "08:41", clears: 28, status: "CLEARED", boss: "The Archivist" },
  { name: "Citadel of Ash", tier: "T6", best: "11:07", clears: 19, status: "CLEARED", boss: "Ashen King" },
  { name: "Null Cathedral", tier: "T8", best: "--:--", clears: 0, status: "LOCKED", boss: "???" },
];

export const achievements = [
  { name: "Worldbreaker", detail: "Defeat 10 world bosses", progress: 10, total: 10, reward: "Title: Worldbreaker", done: true },
  { name: "Relic Hunter", detail: "Collect 50 unique relics", progress: 38, total: 50, reward: "500 Shards", done: false },
  { name: "No One Left Behind", detail: "Clear a T7 dungeon with all party members alive", progress: 1, total: 1, reward: "Profile Frame", done: true },
  { name: "The Long Grind", detail: "Reach skill level 100", progress: 92, total: 100, reward: "Animated Aura", done: false },
];

export const battlePass = [
  { level: 61, free: "25,000 Coins", premium: "Nebula Trail", claimed: true },
  { level: 62, free: "2 Dungeon Keys", premium: "450 Shards", claimed: true },
  { level: 63, free: "Mystery Cache", premium: "Voidling Skin", claimed: false, current: true },
  { level: 64, free: "30,000 Coins", premium: "3 Raid Keys", claimed: false },
  { level: 65, free: "Relic Dust ×8", premium: "Profile Banner", claimed: false },
];

export const news = [
  { tag: "SEASON", date: "17 SEP 2026", title: "Season Zero: Fracture Protocol", excerpt: "Dungeon tiers, relic crafting, world rifts, dan seasonal progression resmi masuk ke network." },
  { tag: "UPDATE", date: "13 SEP 2026", title: "Combat Reforged", excerpt: "Ability timing, boss telegraph, threat system, dan balancing class mendapat overhaul besar." },
  { tag: "EVENT", date: "08 SEP 2026", title: "The Falling Star", excerpt: "Meteor event global menghadirkan limited relic, cosmetic, dan cooperative boss encounter." },
];

export const networkNodes = [
  { name: "Proxy", label: "Velocity Edge", status: "Operational", latency: 18 },
  { name: "Origin", label: "Survival RPG", status: "Operational", latency: 21 },
  { name: "Abyss", label: "Dungeon Cluster", status: "Operational", latency: 24 },
  { name: "Nexus", label: "Event Runtime", status: "Operational", latency: 23 },
  { name: "Data", label: "MariaDB + Redis", status: "Operational", latency: 7 },
];
