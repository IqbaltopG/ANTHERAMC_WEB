import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const host = process.env.SERVER_STATUS_HOST || process.env.NEXT_PUBLIC_JAVA_IP || "play.example.net";
  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(4500),
    });
    const data = await response.json();
    const motd = Array.isArray(data?.motd?.clean) ? data.motd.clean.join(" ") : "";
    return NextResponse.json({
      online: Boolean(data?.online),
      players: Number(data?.players?.online || 0),
      maxPlayers: Number(data?.players?.max || 0),
      version: String(data?.version || "1.21+"),
      motd,
      checkedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } });
  } catch {
    return NextResponse.json({ online: false, players: 0, maxPlayers: 0, version: "1.21+", checkedAt: new Date().toISOString() });
  }
}
