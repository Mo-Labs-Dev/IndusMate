import DashboardLayout from "../layouts/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Configure factory details, notifications, IoT connections, and security.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Factory Settings
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Factory Name
              </label>

              <input
                type="text"
                defaultValue="IndusMate Demo Factory"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Location
              </label>

              <input
                type="text"
                defaultValue="Karlsruhe, Germany"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Time Zone
              </label>

              <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500">
                <option>Europe/Berlin</option>
                <option>Asia/Kolkata</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Notifications
          </h2>

          <div className="mt-5 space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">Email Alerts</p>
                <p className="mt-1 text-sm text-slate-500">
                  Receive critical alerts by email.
                </p>
              </div>

              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">SMS Alerts</p>
                <p className="mt-1 text-sm text-slate-500">
                  Send urgent notifications by SMS.
                </p>
              </div>

              <input type="checkbox" className="h-5 w-5" />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">Camera Alerts</p>
                <p className="mt-1 text-sm text-slate-500">
                  Notify managers when cameras go offline.
                </p>
              </div>

              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            IoT Connection
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                MQTT Broker
              </label>

              <input
                type="text"
                defaultValue="localhost"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                MQTT Port
              </label>

              <input
                type="number"
                defaultValue="1883"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Client ID
              </label>

              <input
                type="text"
                defaultValue="indusmate-backend"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Security
          </h2>

          <div className="mt-5 space-y-4">
            <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50">
              Change Password
            </button>

            <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50">
              Enable Two-Factor Authentication
            </button>

            <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50">
              View Login Activity
            </button>
          </div>
        </section>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}