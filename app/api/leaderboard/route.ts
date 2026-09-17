import { NextResponse } from "next/server";
import { leaderboard } from "@/data/demo";
export async function GET(){return NextResponse.json({metric:"power",season:0,players:leaderboard,source:"demo-adapter"},{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=120"}})}
