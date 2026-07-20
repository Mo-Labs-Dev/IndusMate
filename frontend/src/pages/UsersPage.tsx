import DashboardLayout from "../layouts/DashboardLayout";

const users = [
  {
    id: 1,
    name: "Mohamed Shafi",
    email: "mohamed@indusmate.com",
    department: "Management",
    role: "Administrator",
    status: "Active",
  },
  {
    id: 2,
    name: "Arun Kumar",
    email: "arun@indusmate.com",
    department: "Production",
    role: "Production Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Sara Ahmed",
    email: "sara@indusmate.com",
    department: "Maintenance",
    role: "Maintenance Engineer",
    status: "Active",
  },
  {
    id: 4,
    name: "Daniel Thomas",
    email: "daniel@indusmate.com",
    department: "Quality",
    role: "Quality Inspector",
    status: "Inactive",
  },
];

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between gap-4">
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
          <p className="mt-2 text-2xl font-bold text-slate-900">200</p>
          <p className="mt-2 text-sm text-slate-500">
            Across all departments
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active Today</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">186</p>
          <p className="mt-2 text-sm text-slate-500">
            Currently present
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Departments</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">8</p>
          <p className="mt-2 text-sm text-slate-500">
            Operational teams
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pending Access</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">3</p>
          <p className="mt-2 text-sm text-slate-500">
            Awaiting approval
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
              Current users and their access levels.
            </p>
          </div>

          <input
            type="search"
            placeholder="Search users..."
            className="rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3">User</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4">
                    <p className="font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>
                  </td>

                  <td className="py-4 text-slate-600">
                    {user.department}
                  </td>

                  <td className="py-4 text-slate-600">
                    {user.role}
                  </td>

                  <td className="py-4">
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

                  <td className="py-4">
                    <button className="font-medium text-emerald-600 hover:text-emerald-700">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}