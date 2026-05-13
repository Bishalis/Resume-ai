import connectToDatabase from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { Contact } from "@/models/contact";
import type { ContactStatus } from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const STATUSES: ContactStatus[] = ["open", "resolved", "archived"];

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
    );
    const statusParam = (searchParams.get("status") ?? "all").trim();

    const filter: Record<string, unknown> = {};
    if (statusParam !== "all" && STATUSES.includes(statusParam as ContactStatus)) {
      if (statusParam === "open") {
        filter.$or = [
          { status: "open" },
          { status: { $exists: false } },
        ];
      } else {
        filter.status = statusParam;
      }
    }

    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(filter),
    ]);

    const serialized = contacts.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      email: c.email,
      message: c.message,
      status: (c.status as ContactStatus | undefined) ?? "open",
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));

    return NextResponse.json({
      contacts: serialized,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (e) {
    console.error("GET /api/admin/contacts:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
