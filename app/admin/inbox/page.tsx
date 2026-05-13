"use client";

import { useCallback, useEffect, useState } from "react";

type ContactStatus = "open" | "resolved" | "archived";

type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt?: string;
  updatedAt?: string;
};

type ListResponse = {
  contacts: ContactRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "resolved", label: "Resolved" },
  { value: "archived", label: "Archived" },
];

export default function AdminInboxPage() {
  const [statusFilter, setStatusFilter] = useState("all");
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
      params.set("page", String(page));
      params.set("limit", "20");
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/contacts?${params.toString()}`);
      if (res.status === 401) {
        setError("Not signed in.");
        return;
      }
      if (res.status === 403) {
        setError("Admin access required.");
        return;
      }
      if (!res.ok) {
        setError("Failed to load messages.");
        return;
      }
      const json: ListResponse = await res.json();
      setData(json);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const patchStatus = async (id: string, status: ContactStatus) => {
    setActionId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const errJson = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof errJson.error === "string" ? errJson.error : "Could not update status.",
        );
        return;
      }
      await load();
    } finally {
      setActionId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message permanently?")) return;
    setActionId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Could not delete.");
        return;
      }
      await load();
    } finally {
      setActionId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-600 focus:ring-green-600"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-800 px-4 py-2 text-sm">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading messages...</p>
      ) : data && data.contacts.length === 0 ? (
        <p className="text-gray-600">No messages.</p>
      ) : data ? (
        <>
          <div className="space-y-4">
            {data.contacts.map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-600">{c.email}</p>
                    {c.createdAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <span
                    className={
                      c.status === "open"
                        ? "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900"
                        : c.status === "resolved"
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                          : "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                    }
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-gray-800 whitespace-pre-wrap border-t border-gray-100 pt-3">
                  {c.message}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.status !== "resolved" && (
                    <button
                      type="button"
                      disabled={actionId === c.id}
                      onClick={() => void patchStatus(c.id, "resolved")}
                      className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      Resolve
                    </button>
                  )}
                  {c.status !== "archived" && (
                    <button
                      type="button"
                      disabled={actionId === c.id}
                      onClick={() => void patchStatus(c.id, "archived")}
                      className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Archive
                    </button>
                  )}
                  {c.status !== "open" && (
                    <button
                      type="button"
                      disabled={actionId === c.id}
                      onClick={() => void patchStatus(c.id, "open")}
                      className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Reopen
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={actionId === c.id}
                    onClick={() => void remove(c.id)}
                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>
              Page {data.page} of {data.totalPages} ({data.total} messages)
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
