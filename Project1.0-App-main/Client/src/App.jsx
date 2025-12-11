import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Auth
import { AuthProvider } from "./Components/Context/AuthContext"; import ProtectedRoute from "./Components/Context/ProtectedRoute";

// Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Pages / Components
import Login from "./Components/Login/Login";
import AdminLogin from "./Components/Login/AdminLogin/AdminLogin";
import Home from "./Components/Home/Home";
import Features from "./Components/Features/Features";
import EventJoin from "./Components/Forms/Events/EventJoin/EventJoin";
import EventCreate from "./Components/Forms/Events/EventCreate/EventCreate";
import EventJoinForm from "./Components/Forms/Events/EventJoin/EventJoinForm/EventJoinForm";
import Green from "./Components/Forms/OEvents/Green";
import Foo from "./Components/Forms/OEvents/Foo";
import Feedback from "./Components/Feedback/Feedback";
import CarbonCalculator from "./Components/Forms/OEvents/Carbon";
import EcoQuiz from "./Components/Quiz/EcoQuiz";
import LoginDashboard from "./Components/Login/logindashboard";
import Footer from "./Components/Footer/Footer";
import Odonation from "./Components/Donation/Odonation";
import Volunteer from "./Components/Volunteer/Volunteer";
import EventHostPart from "./Components/Login/EventHostPart";
import Signup from "./Components/Signup/Signup";
import Welcomepage from "./Components/Welcomepage/Welcomepage";
import AdminPanel from "./Components/Admin/AdminPanel";
import Condacts from "./Components/Condact/Condacts";
import DonationSuccess from "./Components/Donation/DonationSuccess";
import DonationHistory from "./Components/Donation/DonationHistory";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public / General */}
        <Route path="/" element={<Welcomepage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Condacts />} />
        <Route path="/footer" element={<Footer />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logindashboard" element={<LoginDashboard />} />
        <Route path="/admn" element={<AdminLogin />} />

        {/* Admin (Protected) */}
        <Route
          path="/admndashb"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Events */}
        <Route
          path="/eventcreate"
          element={
            <ProtectedRoute>
              <EventCreate />
            </ProtectedRoute>
          }
        />
        <Route path="/eventjoin" element={<EventJoin />} />
        <Route path="/join/:id" element={<EventJoinForm />} />
        <Route
          path="/eventhostpart"
          element={
            <ProtectedRoute>
              <EventHostPart />
            </ProtectedRoute>
          }
        />

        {/* Eco & Volunteer */}
        <Route
          path="/green"
          element={
            <ProtectedRoute>
              <Green />
            </ProtectedRoute>
          }
        />
        <Route path="/f" element={<Foo />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/carbon" element={<CarbonCalculator />} />
        <Route path="/ecoquiz" element={<EcoQuiz />} />
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          }
        />
        <Route path="/donationsuccess" element={<DonationSuccess />} />

        <Route
          path="/donationhistory"
          element={
            <ProtectedRoute>
              <DonationHistory />
            </ProtectedRoute>
          }
        />

        {/* Donations */}
        <Route
          path="/odonation"
          element={
            <ProtectedRoute>
              <Elements stripe={stripePromise}>
                <Odonation />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/donation-success" element={<DonationSuccess />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;