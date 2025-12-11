import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Stack, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, ExitToApp as ExitIcon, Info as InfoIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { useAuth } from "../Context/AuthContext";

// -------------------- Reusable Events Table --------------------
const EventsTable = ({ events, type, onEdit, onDelete, onLeave, onViewDetails }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e._id}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {e.image && (
                  <img
                    src={`http://localhost:8000/${e.image}`}
                    alt={e.name}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5 }}
                  />
                )}
                {e.name}
              </TableCell>
              <TableCell>{e.code}</TableCell>
              <TableCell>{new Date(e.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                {type === "hosted" ? (
                  <>
                    <Button size="small" variant="outlined" startIcon={<EditIcon />} sx={{ mr: 1 }} onClick={() => onEdit(e)}>Edit</Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(e)}>Delete</Button>
                  </>
                ) : (
                  <>
                    <Button size="small" variant="outlined" startIcon={<InfoIcon />} sx={{ mr: 1 }} onClick={() => onViewDetails(e)}>View Details</Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<ExitIcon />} onClick={() => onLeave(e)}>Leave Event</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// -------------------- Main Component --------------------
const EventHostPart = ({ userId, showSnackbar }) => {
  const { api } = useAuth();
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [eventView, setEventView] = useState("hosted");
  const [loading, setLoading] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [editData, setEditData] = useState({ name: "", date: "", location: "", description: "", category: "" });
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  // -------------------- Fetch Events --------------------
  const fetchHostedEvents = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/events/user/${userId}`);
      setEvents(res.data.events || []);
    } catch (err) {
      showSnackbar("Error fetching hosted events", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinedEvents = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/joined/${userId}`);
      setJoinedEvents(res.data.joinedEvents || []);
    } catch (err) {
      showSnackbar("Error fetching joined events", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventView === "hosted") fetchHostedEvents();
    else fetchJoinedEvents();
  }, [eventView, userId]);

  const list = eventView === "hosted" ? events : joinedEvents.map(j => j.event).filter(Boolean);

  // -------------------- Edit Event --------------------
  const handleEditOpen = (event) => {
    setSelectedEvent(event);
    setEditData({
      name: event.name,
      date: format(new Date(event.date), "yyyy-MM-dd"),
      location: event.location,
      description: event.description,
      category: event.category
    });
    setEditImage(null);
    setEditImagePreview(event.image ? `http://localhost:8000/${event.image}` : null);
    setOpenEdit(true); 
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const selDate = new Date(editData.date);
      if (selDate < new Date().setHours(0,0,0,0)) {
        showSnackbar("Event date cannot be in the past.", "error");
        return;
      }

      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => formData.append(key, value));
      if (editImage) formData.append("image", editImage);

      await api.put(`/api/event/${selectedEvent._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSnackbar("Event updated!", "success");
      setOpenEdit(false);
      fetchHostedEvents();
    } catch {
      showSnackbar("Error updating event", "error");
    }
  };

  // -------------------- Delete Event --------------------
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/event/${selectedEvent._id}`);
      showSnackbar("Event deleted!", "success");
      setOpenDelete(false);
      fetchHostedEvents();
    } catch {
      showSnackbar("Error deleting event", "error");
    }
  };

  // -------------------- Leave Event --------------------
  const confirmLeaveEvent = (event) => {
    setSelectedEvent(event);
    setOpenLeave(true);
  };

  const handleLeaveEvent = async () => {
    try {
      const eventId = selectedEvent._id;
      const res = await api.delete(`/api/forfeit-event`, { data: { userId, eventId } });
      if (res.data?.success) {
        showSnackbar("You left the event successfully!", "info");
        setJoinedEvents(prev => prev.filter(j => j.event?._id !== eventId));
      } else {
        showSnackbar(res.data?.message || "Error leaving event", "error");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Error leaving event";
      showSnackbar(msg, "error");
    } finally {
      setOpenLeave(false);
    }
  };

  // -------------------- View Details --------------------
  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setOpenDetails(true);
  };

  return (
    <Box className="fade-in">
      <Typography variant="h5" gutterBottom>Events</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant={eventView === "hosted" ? "contained" : "outlined"} onClick={() => setEventView("hosted")}>Hosted</Button>
        <Button variant={eventView === "participated" ? "contained" : "outlined"} onClick={() => setEventView("participated")}>Participated</Button>
      </Stack>

      {loading && <CircularProgress />}

      {!loading && list.length > 0 && (
        <EventsTable
          events={list}
          type={eventView}
          onEdit={handleEditOpen}
          onDelete={(e) => { setSelectedEvent(e); setOpenDelete(true); }}
          onLeave={confirmLeaveEvent}
          onViewDetails={handleViewDetails}
        />
      )}

      {!loading && list.length === 0 && (
        <Typography>{eventView === "hosted" ? "No hosted events." : "No participated events."}</Typography>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" name="name" value={editData.name} onChange={handleEditChange} margin="normal" />
          <TextField fullWidth type="date" label="Date" name="date" InputLabelProps={{ shrink: true }} inputProps={{ min: new Date().toISOString().split("T")[0] }} value={editData.date} onChange={handleEditChange} margin="normal" />
          <TextField fullWidth label="Location" name="location" value={editData.location} onChange={handleEditChange} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={editData.category} onChange={handleEditChange}>
              <MenuItem value="Food Donation">Food Donation</MenuItem>
              <MenuItem value="Tree Planting">Tree Planting</MenuItem>
              <MenuItem value="Cleaning">Cleaning</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Description" name="description" multiline rows={3} value={editData.description} onChange={handleEditChange} margin="normal" />

          <Box
            sx={{
              mt: 3, p: 2, border: "2px dashed rgba(0,0,0,0.2)", borderRadius: 2, textAlign: "center", cursor: "pointer",
              transition: "0.3s", "&:hover": { borderColor: "#1976d2", backgroundColor: "rgba(0,0,0,0.05)" }
            }}
            onClick={() => document.getElementById("editImageInput").click()}
          >
            <input id="editImageInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleEditImageChange} />
            {editImagePreview ? (
              <img src={editImagePreview} alt="Event" style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "10px" }} />
            ) : (
              <Typography variant="body2" color="textSecondary">Click to upload new image</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Delete <strong>{selectedEvent?.name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Leave Dialog */}
      <Dialog open={openLeave} onClose={() => setOpenLeave(false)}>
        <DialogTitle>Confirm Leave</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to leave <strong>{selectedEvent?.name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLeave(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleLeaveEvent}>Leave</Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth maxWidth="sm">
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              {selectedEvent.image && (
                <img
                  src={`http://localhost:8000/${selectedEvent.image}`}
                  alt={selectedEvent.name}
                  style={{ width: "100%", maxHeight: 250, objectFit: "cover", borderRadius: 10, marginBottom: 10 }}
                />
              )}
              <Typography><strong>Name:</strong> {selectedEvent.name}</Typography>
              <Typography><strong>Code:</strong> {selectedEvent.code}</Typography>
              <Typography><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</Typography>
              <Typography><strong>Location:</strong> {selectedEvent.location}</Typography>
              <Typography><strong>Category:</strong> {selectedEvent.category}</Typography>
              <Typography><strong>Description:</strong> {selectedEvent.description || "None"}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default EventHostPart;