import { NextResponse } from "next/server";
import { achievements, dungeons, pets, player } from "@/data/demo";
export async function GET(_:Request,{params}:{params:Promise<{username:string}>}){const {username}=await params;const clean=decodeURIComponent(username).replace(/[^a-zA-Z0-9_.-]/g,"").slice(0,32)||"Player";return NextResponse.json({identity:{username:clean,linked:true,edition:"crossplay"},character:player,collections:{pets},dungeons,achievements,source:"demo-adapter"},{headers:{"Cache-Control":"private, max-age=10"}})}
