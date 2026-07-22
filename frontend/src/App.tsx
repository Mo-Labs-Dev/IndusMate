import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import AlertsPage from "./pages/AlertsPage";
import DashboardPage from "./pages/DashboardPage";
import DeviceDetailsPage from "./pages/DeviceDetailsPage";
import DevicesPage from "./pages/DevicesPage";
import LoginPage from "./pages/LoginPage";
import ProductionPage from "./pages/ProductionPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";
import MateAIPage from "./pages/MateAIPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <DevicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/devices/:deviceId"
          element={
            <ProtectedRoute>
              <DeviceDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/production"
          element={
            <ProtectedRoute>
              <ProductionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <AlertsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/mate-ai"
  element={
    <ProtectedRoute>
      <MateAIPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;