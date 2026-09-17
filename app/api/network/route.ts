import { NextResponse } from "next/server";
import { networkNodes } from "@/data/demo";
export async function GET(){return NextResponse.json({ok:true,nodes:networkNodes,season:"FRACTURE PROTOCOL",generatedAt:new Date().toISOString()},{headers:{"Cache-Control":"public, s-maxage=30, stale-while-revalidate=60"}})}
