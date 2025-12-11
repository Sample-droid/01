import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./EventJoin.css";



import { useAuth } from "../../../Context/AuthContext";   // ✅ USE AUTH CONTEXT

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const DATE_RANGE_DAYS = {
  "5 days": 5,
  "10 days": 10,
  "1 month": 30,
  "1.5 months": 45,
  "2 months": 60,
};

export default function EventJoin() {
  const { user } = useAuth();  // ✅ Get logged-in user
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  // ===========================
  // Fetch Events
  // ===========================
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events`);
        if (res.data?.success) {
          const upcoming = res.data.events.filter(
            (e) => new Date(e.date) >= new Date()
          );
          setEvents(upcoming);
          setFilteredEvents(upcoming);
        }
      } catch {
        setSnackbar({ open: true, message: "Failed to fetch events", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ===========================
  // Fetch Joined Events (AFTER user loads)
  // ===========================
  useEffect(() => {
    if (!user) return;

    const uid = user._id || user.id; // 🔥 Accept both formats
    if (!uid) return;

    const fetchJoined = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/joined/${uid}`);
        if (res.data?.success) {
          setJoinedEvents(res.data.joinedEvents.map((j) => j.event._id));
        }
      } catch (err) {
        console.error("Error fetching joined events", err);
      }
    };

    fetchJoined();
  }, [user]);

  // ===========================
  // Search by Code
  // ===========================
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return setSnackbar({ open: true, message: "Enter an event code", severity: "warning" });
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/api/event/code/${searchTerm}`);
      if (res.data?.success) {
        setFilteredEvents([res.data.event]);
        setSnackbar({ open: true, message: "Event found!", severity: "success" });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "No event found",
        severity: "error",
      });
    }
  };

  // ===========================
  // Filters
  // ===========================
  const handleFilter = (category, dateRange) => {
    let filtered = [...events];
    const now = new Date();

    if (category) filtered = filtered.filter((e) => e.category === category);

    if (dateRange) {
      const target = new Date();
      target.setDate(now.getDate() + DATE_RANGE_DAYS[dateRange]);
      filtered = filtered.filter((e) => new Date(e.date) <= target);
    }

    setFilteredEvents(filtered);
    setFilterCategory(category || "");
    setFilterDateRange(dateRange || "");
    setAnchorEl(null);
  };

  const handleClearFilter = () => {
    setFilteredEvents(events);
    setFilterCategory("");
    setFilterDateRange("");
    setSnackbar({ open: true, message: "Filters cleared", severity: "info" });
  };

  // ===========================
  // JOIN EVENT
  // ===========================
  const handleJoinEvent = async (eventId) => {
    if (!user) {
      return setSnackbar({
        open: true,
        message: "Please sign in to join events",
        severity: "warning",
      });
    }

    const userId = user._id || user.id;  // 🔥 FIX: unified user ID

    try {
      const res = await axios.post(`${API_BASE_URL}/api/join-event`, {
        userId,
        eventId,
      });
      if (res.data?.success) {
        setJoinedEvents((prev) => [...prev, eventId]);
        setSnackbar({ open: true, message: "Joined successfully!", severity: "success" });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error joining event",
        severity: "error",
      });
    }
  };

  // ===========================
  // UI Interactions
  // ===========================
  const handleCardClick = (id) => setSelectedCard((prev) => (prev === id ? null : id));
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Join Community Events
      </Typography>

      {/* Search & Filters */}
      <Box className="event-filters">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Event Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" startIcon={<Search />} onClick={handleSearch}>
          Search
        </Button>
        <Tooltip title="Filter Events">
          <IconButton color="primary" onClick={openMenu}>
            <FilterList />
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>Filter by Category</Typography>
          {["Food Donation", "Tree Planting", "Cleaning"].map((cat) => (
            <MenuItem key={cat} onClick={() => handleFilter(cat, filterDateRange)}>
              {cat}
            </MenuItem>
          ))}

          <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>Filter by Date Range</Typography>
          {Object.keys(DATE_RANGE_DAYS).map((range) => (
            <MenuItem key={range} onClick={() => handleFilter(filterCategory, range)}>
              {range}
            </MenuItem>
          ))}

          <MenuItem onClick={handleClearFilter} sx={{ color: "red", fontWeight: "bold" }}>
            Clear Filters
          </MenuItem>
        </Menu>
      </Box>

      {/* Event Cards */}
      <Grid container spacing={3}>
        {loading ? (
          <Typography align="center" sx={{ width: "100%", mt: 4 }}>
            Loading events...
          </Typography>
        ) : filteredEvents.length ? (
          filteredEvents.map((event) => {
            const isJoined = joinedEvents.includes(event._id);
            const imageUrl = event.image
              ? `${API_BASE_URL.replace(/\/$/, "")}/${event.image.replace(/^\/+/, "")}?t=${Date.now()}`
              : "";

            const isOpen = selectedCard === event._id;

            return (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <motion.div layout whileHover={{ scale: 1.01 }}>
                  <Card className={`event-card ${isOpen ? "selected" : ""}`} onClick={() => handleCardClick(event._id)}>
                    <div className="event-image-wrap">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={event.name}
                          className="event-image"
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "12px 12px 0 0",
                            backgroundColor: "#f0f0f0",
                          }}
                        />
                      ) : (
                        <div className="event-image-placeholder">No Image</div>
                      )}
                    </div>

                    <CardContent>
                      <Typography variant="h6">{event.name}</Typography>
                      <Typography variant="caption"><b>Code:</b> {event.code}</Typography><br/>
                      <Typography variant="caption"><b>Category:</b> {event.category}</Typography><br/>
                      <Typography variant="caption"><b>Date:</b> {new Date(event.date).toLocaleDateString()}</Typography>
                    </CardContent>

                    {/* OVERLAY DETAILS */}
                    <div className={`details-overlay ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
                      <div className="details-inner">
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {event.name}
                        </Typography>

                        <Typography><b>Code:</b> {event.code}</Typography>
                        <Typography><b>Category:</b> {event.category}</Typography>
                        <Typography><b>Date:</b> {new Date(event.date).toLocaleDateString()}</Typography>
                        <Typography sx={{ mt: 1 }}><b>Location:</b> {event.location}</Typography>
                        <Typography sx={{ mt: 1 }}>{event.description}</Typography>

                        <Box textAlign="center" sx={{ mt: 2 }}>
                          <Button
                            variant={isJoined ? "contained" : "outlined"}
                            color={isJoined ? "success" : "primary"}
                            disabled={isJoined}
                            onClick={() => handleJoinEvent(event._id)}
                          >
                            {isJoined ? "Joined" : "Join Event"}
                          </Button>
                        </Box>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" align="center" sx={{ width: "100%", mt: 4 }}>
            No events found.
          </Typography>
        )}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );



}