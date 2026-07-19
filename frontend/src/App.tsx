import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevicesPage from "./pages/DevicesPage";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DeviceDetailsPage from "./pages/DeviceDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/devices/:deviceId" element={<DeviceDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;