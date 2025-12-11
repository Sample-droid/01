// src/components/EventJoinForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import './EventJoinForm.css';

// Same mock data; ideally fetch from your backend
const mockEvents = [
  { id: 'e1', name: 'Beach Cleanup', date: '2025-10-05', location: 'Beach' },
  { id: 'e2', name: 'Tree Plantation', date: '2025-11-12', location: 'Forest' },
  { id: 'e3', name: 'Food Drive', date: '2025-12-01', location: 'City' }
];

const generateJoinCode = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};

const EventJoinForm = ({ onJoin }) => {
  const { id } = useParams();
  const event = mockEvents.find(evt => evt.id === id) || {};
  const [formData, setFormData] = useState({
    participantName: '',
    email: '',
    phone: '',
    joinCode: ''
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      joinCode: generateJoinCode()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegenerateCode = () => {
    setFormData(prev => ({ ...prev, joinCode: generateJoinCode() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin && onJoin({ ...formData, eventId: id });
    alert(`Registered for ${event.name} with code ${formData.joinCode}`);
  };

  return (
    <Container className="event-join-form__container">
      <Button
        component={Link} to="/EventJoin"
        
        className="event-join-form__back"
      >
        
        &larr; Back to Events
      </Button>

      <Typography variant="h5" gutterBottom>
        Joining: {event.name}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Date: {new Date(event.date).toLocaleDateString()}<br/>
        Location: {event.location}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className="event-join-form">
        <TextField
          fullWidth
          label="Your Name"
          name="participantName"
          value={formData.participantName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Your Join Code"
          name="joinCode"
          value={formData.joinCode}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleRegenerateCode} size="small">
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText="Code auto-generated; click to refresh"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Confirm & Join
        </Button>
      </Box>
    </Container>
  );
};

export default EventJoinForm;