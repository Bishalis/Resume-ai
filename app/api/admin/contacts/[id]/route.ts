import connectToDatabase from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { Contact } from "@/models/contact";
import type { ContactStatus } from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";

const STATUSES: ContactStatus[] = ["open", "resolved", "archived"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = body.status as ContactStatus | undefined;
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "status must be open, resolved, or archived" },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();

    const doc = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).lean();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      message: doc.message,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  } catch (e) {
    console.error("PATCH /api/admin/contacts/[id]:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    await connectToDatabase();

    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/contacts/[id]:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
