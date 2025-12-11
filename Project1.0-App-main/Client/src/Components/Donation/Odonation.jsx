import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import "./Odonation.css";

const Odonation = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  const stripe = useStripe();
  const elements = useElements();

  // Get logged-in user info from JWT token
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  const [donation, setDonation] = useState({
    amount: "",
    customAmount: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
 

  /* ---------------- Input Handlers ---------------- */
  const handleChange = (e) =>
    setDonation((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAmountChange = (e) =>
    setDonation((prev) => ({
      ...prev,
      amount: e.target.value,
      customAmount: e.target.value === "custom" ? prev.customAmount : "",
    }));

  /* ---------------- Form Submission ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setStatus(null); // reset

    if (!stripe || !elements) {
      setError("Payment processing is unavailable. Try again shortly.");
      setLoading(false);
      return;
    }

    const rawAmount =
      donation.amount === "custom"
        ? donation.customAmount
        : donation.amount;

    const numericAmount = parseFloat(rawAmount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid donation amount.");
      setLoading(false);
      return;
    }

    const amountInCents = Math.round(numericAmount * 100);

    try {
      // Create payment intent
      const response = await axios.post(`${baseurl}/api/donations`, {
        amount: amountInCents,
        currency: "usd",
        name: user?.username || "Anonymous",
        email: user?.email || "anonymous@example.com",
        message: donation.message,
      });

      const { clientSecret } = response.data;

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.username || "Anonymous",
            email: user?.email || "anonymous@example.com",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setStatus("failed"); // ⬅️ ADDED
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentIntentId = result.paymentIntent.id;

        // ⬅️ UPDATE STATUS IN BACKEND
        try {
          const updateRes = await axios.post(
            `${baseurl}/api/donations/update-status`,
            { paymentIntentId }
          );

          setStatus(updateRes?.data?.donation?.status || "succeeded");
        } catch (err) {
          console.error("Failed to update donation status:", err);
          setStatus("succeeded");
        }

        setSuccess("Thank you for your donation! ❤️");

        setDonation({ amount: "", customAmount: "", message: "" });

        const card = elements.getElement(CardElement);
        if (card?.clear) card.clear();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
      console.error(err);
      setStatus("failed"); // ⬅️ ADDED
    }

    setLoading(false);
  };

  /* ---------------- Animations ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
  };

  const buttonFx = { hover: { scale: 1.05 }, tap: { scale: 0.95 } };

  /* ---------------- JSX ---------------- */
  return (
    <Box className="donation-container">
      {/* HERO */}
      <Box className="hero-section" py={12}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Typography variant="h2" className="hero-title">
              Support Our Mission
            </Typography>
            <Typography variant="h6" className="hero-subtitle">
              Your generosity helps us build stronger communities and uplift
              lives.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* DONATION FORM */}
      <Box className="form-section" py={8}>
        <Container maxWidth="sm">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Box className="form-card">
              <Typography variant="h5" className="form-title" gutterBottom>
                Make a Donation
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
              )}

              

              <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Donation Amount</InputLabel>
                  <Select
                    name="amount"
                    value={donation.amount}
                    onChange={handleAmountChange}
                    required
                    className="form-input"
                  >
                    <MenuItem value="">Choose an amount</MenuItem>
                    <MenuItem value="10">$10</MenuItem>
                    <MenuItem value="25">$25</MenuItem>
                    <MenuItem value="50">$50</MenuItem>
                    <MenuItem value="100">$100</MenuItem>
                    <MenuItem value="custom">Custom Amount</MenuItem>
                  </Select>
                </FormControl>

                {donation.amount === "custom" && (
                  <TextField
                    fullWidth
                    label="Custom Amount ($)"
                    name="customAmount"
                    type="number"
                    value={donation.customAmount}
                    onChange={handleChange}
                    inputProps={{ min: 1, step: "0.01" }}
                    required
                    margin="normal"
                    className="form-input"
                  />
                )}

                <Box sx={{ mt: 3 }}>
                  <CardElement
                    className="stripe-card-input"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          fontFamily: "'Inter', sans-serif",
                          color: "#374151",
                          "::placeholder": { color: "#9ca3af" },
                        },
                        invalid: { color: "#dc2626" },
                      },
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Message (Optional)"
                  name="message"
                  value={donation.message}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  margin="normal"
                />

                <Box sx={{ textAlign: "center", mt: 4 }}>
                  <motion.div variants={buttonFx} whileHover="hover" whileTap="tap">
                    <Button
                      type="submit"
                      variant="contained"
                      className="submit-button"
                      disabled={loading || !stripe || !elements}
                    >
                      {loading ? <CircularProgress size={22} /> : "Donate Now"}
                    </Button>
                  </motion.div>
                </Box>
              </form>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};


export default Odonation;