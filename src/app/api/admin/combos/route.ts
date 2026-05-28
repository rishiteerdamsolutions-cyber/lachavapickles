import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAllCombos, saveAllCombos } from "@/lib/combos-db";
import type { ComboPack } from "@/data/combos";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getAllCombos());
}

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const combos = (await req.json()) as ComboPack[];
  if (!Array.isArray(combos)) {
    return NextResponse.json({ error: "Expected array" }, { status: 400 });
  }
  await saveAllCombos(
    combos.map((c) => ({ ...c, updatedAt: new Date().toISOString() }))
  );
  return NextResponse.json(await getAllCombos());
}
