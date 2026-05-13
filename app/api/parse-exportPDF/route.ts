import { NextResponse } from "next/server";

/** Stub — PDF export via Puppeteer was commented out; endpoint kept for future use. */
export async function POST() {
  return NextResponse.json(
    { error: "PDF export is not enabled yet" },
    { status: 501 },
  );
}
