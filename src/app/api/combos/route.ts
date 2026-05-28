import { NextResponse } from "next/server";
import { getAllCombos } from "@/lib/combos-db";

export async function GET() {
  const combos = await getAllCombos();
  return NextResponse.json(combos.filter((c) => c.available !== false));
}
