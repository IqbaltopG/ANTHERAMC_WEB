# REYNETWORK Portal V2

Deploy-ready Next.js game portal for a Paper / Velocity / Geyser Minecraft network.

The project intentionally runs with demo adapters first, so the UI can be deployed immediately without exposing a Minecraft database or accepting payment before the backend is ready.

## Included surfaces

- Premium landing page + live Java status
- Player Command Center (`/dashboard`)
- Public character profile (`/player/[username]`)
- Global leaderboard (`/leaderboard`)
- Pet / companion collection (`/collections`)
- Dungeon terminal + run history (`/dungeons`)
- Season hub (`/season`)
- Battle Pass (`/battle-pass`)
- Achievement archive (`/achievements`)
- Minecraft account pairing UX (`/account/link`)
- Store / entitlement UX (`/store`)
- Vote hub (`/vote`)
- Network status center (`/status`)
- News / patch feed (`/news`)
- Demo API adapters (`/api/status`, `/api/network`, `/api/leaderboard`, `/api/player/[username]`)

## Quick deploy

```bash
cp .env.example .env.local
npm install
npm run build
npm start
```

For Vercel: import the repository, add the values from `.env.example` in Project Settings > Environment Variables, then deploy.

## Recommended production architecture

```text
Cloudflare
   |
   v
Next.js Portal
   |-- public pages
   |-- authenticated Command Center
   |-- store + webhook endpoints
   |-- admin/CMS (next phase)
   |
   +--> MariaDB/PostgreSQL (canonical player + entitlement data)
   +--> Redis (cache, pairing code, reward queue, sessions)
   +--> Payment gateway (Midtrans / Tripay)
   |
   v
WebsiteBridge API / queue consumer
   |
Velocity -> Paper runtimes -> Geyser/Floodgate
```

## Important backend rules

1. Do not expose the Minecraft database directly to browser code.
2. Use a narrow server-side data adapter or bridge service.
3. Account pairing should use short-lived one-time codes stored hashed in Redis/database.
4. Payment fulfillment must be driven by a verified webhook, never by the browser success screen.
5. Webhook processing must be idempotent. Store external transaction IDs and reject duplicate fulfillment.
6. Purchases should create durable entitlements. Minecraft commands are a synchronization result, not the source of truth.
7. Reward delivery should go through a queue so an offline game server cannot lose a purchase.
8. Separate public profile fields from private dashboard/account data.
9. Put Cloudflare/rate limiting in front of auth, pairing, search, and webhook surfaces.
10. Keep staging and production credentials completely separate.

## Replacing demo data

`data/demo.ts` is the current demo adapter. Keep page components stable and replace data access behind server-only functions, e.g.:

```text
lib/data/player.ts
lib/data/leaderboard.ts
lib/data/season.ts
lib/data/store.ts
```

Then connect those modules to Prisma/Drizzle or your own SQL queries.

## Minecraft WebsiteBridge contract (recommended)

Game -> web events:

- player.snapshot.updated
- skill.updated
- dungeon.run.completed
- achievement.unlocked
- collection.unlocked
- season.xp.changed
- entitlement.synced

Web -> game jobs:

- entitlement.apply
- reward.deliver
- account.link.confirm
- account.unlink
- cosmetic.refresh

Use a signed internal API or Redis Streams/list queue. Never expose RCON to the public web app.

## Store state

Checkout is deliberately disabled. Add merchant credentials only after signature verification, webhook idempotency, entitlement storage, and a reward queue exist.

## Brand / data

All player statistics and products in `data/demo.ts` are placeholders. Replace them with your actual server data and store catalog.
