export type Edition = "JAVA" | "BEDROCK" | "CROSSPLAY";

export type PublicPlayer = {
  uuid: string;
  username: string;
  edition: Edition;
  level: number;
  power: number;
  className: string;
  guild?: string | null;
  seasonRank?: number | null;
  updatedAt: string;
};

export type Entitlement = {
  id: string;
  playerUuid: string;
  sku: string;
  source: "STORE" | "EVENT" | "STAFF" | "MIGRATION";
  state: "ACTIVE" | "REVOKED" | "EXPIRED";
  grantedAt: string;
  expiresAt?: string | null;
};

export type RewardJob = {
  id: string;
  playerUuid: string;
  type: "ENTITLEMENT_SYNC" | "ITEM" | "CURRENCY" | "COSMETIC_REFRESH";
  payload: Record<string, unknown>;
  idempotencyKey: string;
};

export type BridgeEvent =
  | { type: "player.snapshot.updated"; player: PublicPlayer }
  | { type: "dungeon.run.completed"; playerUuid: string; dungeonId: string; tier: number; durationMs: number; completedAt: string }
  | { type: "achievement.unlocked"; playerUuid: string; achievementId: string; unlockedAt: string }
  | { type: "collection.unlocked"; playerUuid: string; collectionType: string; collectionId: string; unlockedAt: string };
