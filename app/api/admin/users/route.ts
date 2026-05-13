import connectToDatabase from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

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
    const q = (searchParams.get("q") ?? "").trim();

    const filter =
      q.length > 0
        ? {
            $or: [
              { email: { $regex: q, $options: "i" } },
              { name: { $regex: q, $options: "i" } },
            ],
          }
        : {};

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    const serialized = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
    }));

    return NextResponse.json({
      users: serialized,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (e) {
    console.error("GET /api/admin/users:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
