import { useEffect, useState, type FormEvent } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type SettingsData = {
  factoryName: string;
  location: string;
  timeZone: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
  cameraAlerts: boolean;
  mqttBroker: string;
  mqttPort: number;
  clientId: string;
};

const emptySettings: SettingsData = {
  factoryName: "",
  location: "",
  timeZone: "Europe/Berlin",
  emailAlerts: false,
  smsAlerts: false,
  cameraAlerts: false,
  mqttBroker: "",
  mqttPort: 1883,
  clientId: "",
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsData>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        setError("");

        const response = await api.get<SettingsData>("/settings");
        setSettings(response.data);
      } catch {
        setError("Could not load settings from the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function updateField<K extends keyof SettingsData>(
    field: K,
    value: SettingsData[K]
  ) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const response = await api.put<SettingsData>(
        "/settings",
        settings
      );

      setSettings(response.data);
      setSuccessMessage("Settings saved successfully.");
    } catch {
      setError("Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading settings...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Configure factory details, notifications, and IoT connections.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
                  value={settings.factoryName}
                  onChange={(event) =>
                    updateField("factoryName", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Location
                </label>

                <input
                  type="text"
                  value={settings.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Time Zone
                </label>

                <select
                  value={settings.timeZone}
                  onChange={(event) =>
                    updateField("timeZone", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                >
                  <option value="Europe/Berlin">Europe/Berlin</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
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
                  <p className="font-medium text-slate-900">
                    Email Alerts
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Receive critical alerts by email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={(event) =>
                    updateField("emailAlerts", event.target.checked)
                  }
                  className="h-5 w-5"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-900">
                    SMS Alerts
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Send urgent notifications by SMS.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={settings.smsAlerts}
                  onChange={(event) =>
                    updateField("smsAlerts", event.target.checked)
                  }
                  className="h-5 w-5"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-900">
                    Camera Alerts
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Notify managers when cameras go offline.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={settings.cameraAlerts}
                  onChange={(event) =>
                    updateField("cameraAlerts", event.target.checked)
                  }
                  className="h-5 w-5"
                />
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
                  value={settings.mqttBroker}
                  onChange={(event) =>
                    updateField("mqttBroker", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  MQTT Port
                </label>

                <input
                  type="number"
                  value={settings.mqttPort}
                  onChange={(event) =>
                    updateField(
                      "mqttPort",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Client ID
                </label>

                <input
                  type="text"
                  value={settings.clientId}
                  onChange={(event) =>
                    updateField("clientId", event.target.value)
                  }
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
              <button
                type="button"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50"
              >
                Change Password
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50"
              >
                Enable Two-Factor Authentication
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left font-medium text-slate-700 hover:bg-slate-50"
              >
                View Login Activity
              </button>
            </div>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}