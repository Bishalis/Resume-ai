import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";

/**
 * Use in App Router API routes to require an authenticated admin session.
 * Returns a NextResponse error or null when authorized with session.
 */
export async function requireAdminSession(): Promise<
  | { ok: true; session: NonNullable<Awaited<ReturnType<typeof getServerSession>>> }
  | { ok: false; response: NextResponse }
> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (session.user.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true, session };
}
