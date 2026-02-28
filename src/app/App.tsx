import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ChatPage } from "./pages/ChatPage";
import { HealthcarePage } from "./pages/HealthcarePage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { TalentShowcasePage } from "./pages/TalentShowcasePage";
import { TalentProfilePage } from "./pages/TalentProfilePage";
import { StudyBotPage } from "./pages/StudyBotPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/study-bot" element={<StudyBotPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/healthcare" element={<HealthcarePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/talent" element={<TalentShowcasePage />} />
        <Route path="/talent/:userId" element={<TalentProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
