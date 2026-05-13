"use client";

import { useCallback, useEffect, useState } from "react";
import PrimaryButton from "@/components/common/PrimaryButton";

type UserRow = { id: string; name: string; email: string; role: "user" | "admin" };

type ListResponse = {
  users: UserRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function AdminUsersPage() {
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      params.set("page", String(page));
      params.set("limit", "20");
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.status === 401) {
        setError("Not signed in.");
        return;
      }
      if (res.status === 403) {
        setError("Admin access required.");
        return;
      }
      if (!res.ok) {
        setError("Failed to load users.");
        return;
      }
      const json: ListResponse = await res.json();
      setData(json);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    void load();
  }, [load]);

  const setRole = async (id: string, role: "user" | "admin") => {
    setActionId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const errJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof errJson.error === "string" ? errJson.error : "Could not update role.",
        );
        return;
      }
      await load();
    } finally {
      setActionId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-end">
        <div className="flex-1 w-full">
          <label htmlFor="user-search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by name or email
          </label>
          <input
            id="user-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-600 focus:ring-green-600"
            placeholder="Search..."
          />
        </div>
        <PrimaryButton
          type="button"
          onClick={() => {
            setPage(1);
            setSearch(q);
          }}
        >
          Search
        </PrimaryButton>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-800 px-4 py-2 text-sm">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : data && data.users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : data ? (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-3 text-gray-900">{u.name}</td>
                    <td className="px-4 py-3 text-gray-700">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          u.role === "admin"
                            ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                            : "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                        }
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {u.role === "admin" ? (
                        <button
                          type="button"
                          disabled={actionId === u.id}
                          onClick={() => void setRole(u.id, "user")}
                          className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Make user
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actionId === u.id}
                          onClick={() => void setRole(u.id, "admin")}
                          className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          Make admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>
              Page {data.page} of {data.totalPages} ({data.total} users)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
