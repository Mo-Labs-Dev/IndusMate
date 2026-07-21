import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "Active" | "Inactive";
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setError("");

        const response = await api.get<User[]>("/users");
        setUsers(response.data);
      } catch {
        setError("Could not load users from the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) =>
      [
        user.name,
        user.email,
        user.department,
        user.role,
        user.status,
      ].some((value) =>
        value.toLowerCase().includes(normalizedSearch)
      )
    );
  }, [searchTerm, users]);

  const summary = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((user) => user.status === "Active").length,
      inactive: users.filter((user) => user.status === "Inactive").length,
      departments: new Set(users.map((user) => user.department)).size,
    };
  }, [users]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading users...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Users
          </h1>

          <p className="mt-2 text-slate-500">
            Manage employees, departments, roles, and platform access.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
          Add User
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Users</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summary.total}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active Users</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {summary.active}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Inactive Users</p>
          <p className="mt-2 text-2xl font-bold text-slate-700">
            {summary.inactive}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Departments</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summary.departments}
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Team Members
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Users loaded from the Spring Boot backend.
            </p>
          </div>

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search users..."
            className="rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="px-3 pb-3">User</th>
                <th className="px-3 pb-3">Department</th>
                <th className="px-3 pb-3">Role</th>
                <th className="px-3 pb-3">Status</th>
                <th className="px-3 pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-3 py-4">
                    <p className="font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>
                  </td>

                  <td className="px-3 py-4 text-slate-600">
                    {user.department}
                  </td>

                  <td className="px-3 py-4 text-slate-600">
                    {user.role}
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <button className="font-medium text-emerald-600 hover:text-emerald-700">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-8 text-center text-slate-500"
                  >
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}