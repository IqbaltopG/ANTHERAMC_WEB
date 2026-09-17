-- REYNETWORK portal reference schema (MariaDB 10.11+)
-- Review indexes and retention policies before production use.

CREATE TABLE players (
  uuid CHAR(36) PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  floodgate_xuid VARCHAR(32) NULL,
  edition ENUM('JAVA','BEDROCK','CROSSPLAY') NOT NULL DEFAULT 'JAVA',
  class_name VARCHAR(32) NOT NULL DEFAULT 'Adventurer',
  level INT NOT NULL DEFAULT 1,
  power BIGINT NOT NULL DEFAULT 0,
  guild_name VARCHAR(48) NULL,
  coins BIGINT NOT NULL DEFAULT 0,
  shards BIGINT NOT NULL DEFAULT 0,
  playtime_seconds BIGINT NOT NULL DEFAULT 0,
  kills BIGINT NOT NULL DEFAULT 0,
  deaths BIGINT NOT NULL DEFAULT 0,
  public_profile BOOLEAN NOT NULL DEFAULT TRUE,
  last_seen_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_players_username (username),
  UNIQUE KEY uq_players_xuid (floodgate_xuid),
  KEY idx_players_power (power DESC)
);

CREATE TABLE web_accounts (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NULL,
  discord_id VARCHAR(32) NULL,
  minecraft_uuid CHAR(36) NULL,
  role ENUM('PLAYER','MODERATOR','ADMIN','OWNER') NOT NULL DEFAULT 'PLAYER',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_web_accounts_discord (discord_id),
  UNIQUE KEY uq_web_accounts_mc (minecraft_uuid),
  CONSTRAINT fk_web_accounts_player FOREIGN KEY (minecraft_uuid) REFERENCES players(uuid) ON DELETE SET NULL
);

CREATE TABLE account_pair_codes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  player_uuid CHAR(36) NOT NULL,
  code_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  consumed_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_pair_hash (code_hash),
  KEY idx_pair_expiry (expires_at),
  CONSTRAINT fk_pair_player FOREIGN KEY (player_uuid) REFERENCES players(uuid) ON DELETE CASCADE
);

CREATE TABLE seasons (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(96) NOT NULL,
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE player_season_progress (
  player_uuid CHAR(36) NOT NULL,
  season_id INT UNSIGNED NOT NULL,
  xp BIGINT NOT NULL DEFAULT 0,
  pass_level INT NOT NULL DEFAULT 1,
  power BIGINT NOT NULL DEFAULT 0,
  rank_position INT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (player_uuid, season_id),
  KEY idx_season_rank (season_id, power DESC),
  CONSTRAINT fk_psp_player FOREIGN KEY (player_uuid) REFERENCES players(uuid) ON DELETE CASCADE,
  CONSTRAINT fk_psp_season FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE
);

CREATE TABLE dungeon_runs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  run_uuid CHAR(36) NOT NULL UNIQUE,
  player_uuid CHAR(36) NOT NULL,
  dungeon_id VARCHAR(64) NOT NULL,
  tier INT NOT NULL,
  duration_ms INT UNSIGNED NOT NULL,
  grade VARCHAR(4) NULL,
  completed BOOLEAN NOT NULL DEFAULT TRUE,
  completed_at DATETIME NOT NULL,
  KEY idx_dungeon_player (player_uuid, completed_at DESC),
  KEY idx_dungeon_rank (dungeon_id, tier, duration_ms ASC),
  CONSTRAINT fk_dungeon_player FOREIGN KEY (player_uuid) REFERENCES players(uuid) ON DELETE CASCADE
);

CREATE TABLE player_collections (
  player_uuid CHAR(36) NOT NULL,
  collection_type VARCHAR(32) NOT NULL,
  collection_id VARCHAR(64) NOT NULL,
  level INT NOT NULL DEFAULT 1,
  unlocked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata_json JSON NULL,
  PRIMARY KEY (player_uuid, collection_type, collection_id),
  CONSTRAINT fk_collection_player FOREIGN KEY (player_uuid) REFERENCES players(uuid) ON DELETE CASCADE
);

CREATE TABLE player_achievements (
  player_uuid CHAR(36) NOT NULL,
  achievement_id VARCHAR(64) NOT NULL,
  progress BIGINT NOT NULL DEFAULT 0,
  unlocked_at DATETIME NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (player_uuid, achievement_id),
  CONSTRAINT fk_achievement_player FOREIGN KEY (player_uuid) REFERENCES players(uuid) ON DELETE CASCADE
);

CREATE TABLE store_products (
  sku VARCHAR(64) PRIMARY KEY,
  name VARCHAR(96) NOT NULL,
  price_idr BIGINT UNSIGNED NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  metadata_json JSON NULL
);

CREATE TABLE transactions (
  id CHAR(36) PRIMARY KEY,
  provider ENUM('MIDTRANS','TRIPAY','MANUAL') NOT NULL,
  provider_transaction_id VARCHAR(128) NOT NULL,
  player_uuid CHAR(36) NOT NULL,
  sku VARCHAR(64) NOT NULL,
  amount_idr BIGINT UNSIGNED NOT NULL,
  status ENUM('PENDING','PAID','EXPIRED','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  paid_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_provider_transaction (provider, provider_transaction_id),
  KEY idx_tx_player (player_uuid, created_at DESC),
  CONSTRAINT fk_tx_player FOREIGN KEY (player_uuid) REFERENCES players(uuid),
  CONSTRAINT fk_tx_product FOREIGN KEY (sku) REFERENCES store_products(sku)
);

CREATE TABLE entitlements (
  id CHAR(36) PRIMARY KEY,
  player_uuid CHAR(36) NOT NULL,
  sku VARCHAR(64) NOT NULL,
  transaction_id CHAR(36) NULL,
  source ENUM('STORE','EVENT','STAFF','MIGRATION') NOT NULL,
  state ENUM('ACTIVE','REVOKED','EXPIRED') NOT NULL DEFAULT 'ACTIVE',
  granted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NULL,
  revoked_at DATETIME NULL,
  UNIQUE KEY uq_entitlement_tx_sku (transaction_id, sku),
  KEY idx_entitlement_player (player_uuid, state),
  CONSTRAINT fk_entitlement_player FOREIGN KEY (player_uuid) REFERENCES players(uuid) ON DELETE CASCADE,
  CONSTRAINT fk_entitlement_tx FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE SET NULL
);

CREATE TABLE audit_log (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  actor_type VARCHAR(32) NOT NULL,
  actor_id VARCHAR(64) NULL,
  action VARCHAR(96) NOT NULL,
  target_type VARCHAR(32) NULL,
  target_id VARCHAR(128) NULL,
  request_id VARCHAR(64) NULL,
  metadata_json JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_audit_created (created_at DESC),
  KEY idx_audit_target (target_type, target_id)
);
