# Production Architecture

## Target

The public site and player portal should remain available even when one Minecraft runtime is restarting. Game servers therefore publish state to the portal data layer rather than the browser querying Paper directly.

## Data ownership

- **Minecraft runtime** owns immediate gameplay state.
- **Portal database** owns public snapshots, web-account links, transaction history and durable store entitlements.
- **Redis** owns short-lived pairing codes, cache, locks and reward jobs.
- **Payment provider** owns payment truth until a signed/verified webhook is accepted.

## Sync model

### Game -> Portal

WebsiteBridge publishes normalized events after game-side changes. Coalesce noisy values such as money/skill XP to avoid writing SQL on every tick.

Recommended event names:

```text
player.snapshot.updated
skill.updated
dungeon.run.completed
achievement.unlocked
collection.unlocked
season.xp.changed
entitlement.synced
```

### Portal -> Game

Never expose RCON from Next.js. Add reward work to Redis or a private bridge endpoint. The game-side consumer acknowledges jobs only after successful application.

```text
entitlement.apply
reward.deliver
account.link.confirm
account.unlink
cosmetic.refresh
```

Every job needs an idempotency key.

## Account pairing

1. Player runs `/weblink` in Minecraft.
2. Bridge generates a cryptographically random short code.
3. Store only a hash of the code with player UUID and a short expiry.
4. Logged-in web user submits the code.
5. Server hashes submitted code and performs atomic consume.
6. Link web account -> canonical Minecraft UUID.
7. Emit audit-log event.

Bedrock users should resolve to their canonical Floodgate identity/XUID mapping before linking.

## Store fulfillment

```text
Browser creates order
  -> server creates PENDING transaction
  -> gateway checkout
  -> provider webhook
  -> verify provider signature + expected amount + merchant
  -> acquire idempotency lock
  -> transaction = PAID
  -> create entitlement
  -> enqueue entitlement.apply
  -> WebsiteBridge consumes job
  -> LuckPerms/custom plugin applies state
  -> entitlement sync acknowledged
```

Do not grant rewards from a frontend redirect/callback page.

## Caching

Suggested TTLs:

- server status: 15-30 sec
- leaderboard: 30-120 sec
- public player profile: 15-60 sec
- store catalog: 5-15 min
- season config: 1-5 min
- authenticated account balance: avoid shared CDN cache

## Security baseline

- Cloudflare/WAF in front of web origin.
- Rate-limit auth, account link, username search and order creation.
- HMAC/signature verification for private bridge traffic.
- Keep bridge endpoints private where infrastructure allows.
- Validate every provider webhook independently from browser state.
- Secure, httpOnly, sameSite cookies for web sessions.
- CSRF protections for state-changing browser endpoints.
- RBAC for admin/moderator tools.
- Audit all staff entitlement/payment/account-link changes.
- Separate staging and production databases/merchant credentials.
- Encrypt backups and test restore procedures.

## Recommended deployment

Small/medium network:

```text
Cloudflare
   -> Vercel/Next.js
   -> managed MariaDB
   -> managed Redis
   -> Singapore Minecraft VPS/cluster
```

Larger network:

```text
Cloudflare
   -> containerized Next.js replicas
   -> private API/worker service
   -> MariaDB primary + backups
   -> Redis HA
   -> Velocity edge
   -> Paper runtime pool
```
