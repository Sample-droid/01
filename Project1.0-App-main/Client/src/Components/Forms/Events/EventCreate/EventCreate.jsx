import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import { jwtDecode } from "jwt-decode";
import UploadIcon from "@mui/icons-material/CloudUpload";
import "./eventcreate.css";

const API_BASE_URL =
  import.meta.env.VITE_VITE_API_BASE_URL || "http://localhost:8000";

const initialEventState = {
  name: "",
  code: nanoid(8),
  date: null,
  location: "",
  description: "",
  category: "",
};

const EventCreate = () => {
  const [eventData, setEventData] = useState(initialEventState);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, type: "success", text: "" });
  const [errors, setErrors] = useState({});
  const calendarRef = useRef(null);
  const [userId, setUserId] = useState();

  // Decode token
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, []);

  // Calendar click outside handler
  useEffect(() => {
    if (calendarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  function handleClickOutside(e) {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setCalendarOpen(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function regenerateCode() {
    setEventData((prev) => ({ ...prev, code: nanoid(8) }));
  }

  function validateForm() {
    const newErrors = {};
    if (!eventData.name) newErrors.name = "Event name is required";
    if (!eventData.code) newErrors.code = "Event code is required";
    if (!eventData.date) newErrors.date = "Event date is required";
    if (!eventData.location) newErrors.location = "Location is required";
    if (!eventData.category) newErrors.category = "Category is required";
    if (!image) newErrors.image = "Event image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbar({ open: true, type: "error", text: "Please fill all required fields." });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, key === "date" && value ? value.toISOString() : value);
      });
      formData.append("user", userId);
      if (image) formData.append("image", image);

      const response = await axios.post(`${API_BASE_URL}/api/event`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbar({ open: true, type: "success", text: response.data.message });
      setEventData({ ...initialEventState, code: nanoid(8) });
      setImage(null);
      setImagePreview(null);
      setErrors({});
    } catch (err) {
      const errorText =
        err.response?.data?.message || "Error creating event. Please try again.";
      setSnackbar({ open: true, type: "error", text: errorText });
    } finally {
      setLoading(false);
    }
  }

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <Box className="eventcreate-container">
      {/* Hero Section */}
      <Box className="hero-section" py={10}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <motion.div variants={heroVariants} initial="hidden" animate="visible">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Create a New Event
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Organize impactful events to support sustainability and community engagement.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Form Section */}
      <Box className="form-section" py={8}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={8}
              sx={{
                p: 5,
                borderRadius: 4,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Event Details
              </Typography>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField
                  fullWidth
                  label="Event Name"
                  name="name"
                  value={eventData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Event Code"
                    name="code"
                    value={eventData.code}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                    error={!!errors.code}
                    helperText={errors.code}
                  />
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button type="button" variant="outlined" onClick={regenerateCode}>
                      Regenerate
                    </Button>
                  </motion.div>
                </Box>

                <FormControl fullWidth margin="normal" required error={!!errors.category}>
                  <InputLabel id="category-label">Event Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    label="Event Category"
                    value={eventData.category}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Select a category</em>
                    </MenuItem>
                    <MenuItem value="Food Donation">Food Donation</MenuItem>
                    <MenuItem value="Tree Planting">Tree Planting</MenuItem>
                    <MenuItem value="Cleaning">Cleaning</MenuItem>
                  </Select>
                  {!!errors.category && (
                    <Typography color="error" variant="caption">
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>

                <Box sx={{ position: "relative", mt: 2 }} ref={calendarRef}>
                  <TextField
                    fullWidth
                    label="Event Date"
                    name="date"
                    value={eventData.date ? format(eventData.date, "yyyy-MM-dd") : ""}
                    onClick={() => setCalendarOpen(true)}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                    required
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                  {calendarOpen && (
                    <Box className="calendar-popup">
                      <DayPicker
                        mode="single"
                        selected={eventData.date}
                        onSelect={(d) => {
                          setEventData((prev) => ({ ...prev, date: d }));
                          setErrors((prev) => ({ ...prev, date: "" }));
                          setCalendarOpen(false);
                        }}
                        disabled={{ before: new Date() }}
                      />
                    </Box>
                  )}
                </Box>

                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.location}
                  helperText={errors.location}
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={eventData.description}
                  onChange={handleChange}
                  margin="normal"
                />

                {/* Modern Image Upload */}
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    border: "2px dashed rgba(255,255,255,0.3)",
                    borderRadius: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "#90caf9",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    },
                  }}
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Event Preview"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "10px",
                        maxHeight: "250px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <>
                      <UploadIcon sx={{ fontSize: 50, color: "primary.main" }} />
                      <Typography variant="body1" mt={1}>
                      
                        Click or Drag to Upload Event Image
                      </Typography>
                    </>
                  )}
                  {!!errors.image && (
                    <Typography color="error" variant="caption" display="block" mt={1}>
                      {errors.image}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ textAlign: "center", mt: 4 }}>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : "Create Event"}
                    </Button>
                  </motion.div>
                </Box>
              </form>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      
      >
        <Alert
          severity={snackbar.type}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventCreate;