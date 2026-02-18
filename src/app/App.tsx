import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MentorDiscoveryPage } from "./pages/MentorDiscoveryPage";
import { ChatPage } from "./pages/ChatPage";
import { HealthcarePage } from "./pages/HealthcarePage";
import { ResourcesPage } from "./pages/ResourcesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes (Dashboard) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mentors" element={<MentorDiscoveryPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:mentorId" element={<ChatPage />} />
        <Route path="/healthcare" element={<HealthcarePage />} />
        <Route path="/resources" element={<ResourcesPage />} />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
