import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Product images disabled" }, { status: 400 });
}

export async function PUT() {
  return NextResponse.json({ error: "Product images disabled" }, { status: 400 });
}
