import connectToDatabase from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

type Role = "user" | "admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  let body: { role?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const role = body.role as Role | undefined;
  if (role !== "user" && role !== "admin") {
    return NextResponse.json(
      { error: "role must be 'user' or 'admin'" },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();

    const target = await User.findById(id);
    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (target.role === "admin" && role === "user") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot remove the last admin" },
          { status: 400 },
        );
      }
    }

    target.role = role;
    await target.save();

    return NextResponse.json({
      id: target._id.toString(),
      name: target.name,
      email: target.email,
      role: target.role,
    });
  } catch (e) {
    console.error("PATCH /api/admin/users/[id]/role:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
