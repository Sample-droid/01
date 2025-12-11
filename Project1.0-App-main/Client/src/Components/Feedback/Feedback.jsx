// src/components/ContactPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Rating,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';


import './Feedback.css';
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string(),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
  rating: yup.number().min(1, 'Please provide a rating'),
}).required();

export default function Feedback() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      rating: 0,
      attachment: null
    }
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSnackbar({ open: true, severity: 'success', message: 'Feedback sent successfully!' });
      reset();
    } catch {
      setSnackbar({ open: true, severity: 'error', message: 'Failed to send. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="contact-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper className="contact-paper" elevation={4}>
          <Typography className="form-title" variant="h4">
            Feedback
          </Typography>

          <Box component="form" className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="form-field">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} className="form-field">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} className="form-field">
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Subject" fullWidth />
                  )}
                />
              </Grid>

              <Grid item xs={12} className="form-field">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Message"
                      fullWidth
                      multiline
                      rows={6}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} className="rating-section">
                <Typography component="legend">Rate Your Experience</Typography>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Rating {...field} value={field.value || 0} />
                  )}
                />
                {errors.rating && (
                  <Typography className="error-text" variant="caption">
                    {errors.rating.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} className="file-upload">
                <Controller
                  name="attachment"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <IconButton component="label">
                        <AttachFileIcon />
                        <input
                          type="file"
                          hidden
                          onChange={e => onChange(e.target.files[0])}
                        />
                      </IconButton>
                      <Typography className="file-name">
                        {value?.name || 'No file chosen'}
                      </Typography>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className="submit-button"
                  type="submit"
                  variant="contained"
                  fullWidth
                  endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Grid>
            </Grid>

  

          </Box>
        </Paper>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    
    
           <footer className="footer">
    <div className="footer-content">
      {/* Brand Section */}
      <div className="footer-brand">
        <h2 className="brand-title">EcoGuardians</h2>
        <p className="brand-tagline">Protecting Nature, Empowering People</p>
      </div>

      {/* Quick Links */}
      <nav className="footer-links">
        <h4 className="links-heading">Quick Links</h4>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/projects">Our Projects</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {/* Get Involved */}
      <div className="footer-involve">
        <h4 className="involve-heading">Get Involved</h4>
        <button className="involve-button">Volunteer</button>
        <button className="involve-button outline">Donate</button>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        <h4 className="social-heading">Follow Us</h4>
        <div className="social-icons">
          {/* Replace with actual SVGs or icon components */}
          <a href="https://facebook.com" aria-label="Facebook" className="icon">F</a>
          <a href="https://X.com" aria-label="X" className="icon">T</a>
          <a href="https://instagram.com" aria-label="Instagram" className="icon">I</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      © {new Date().getFullYear()} EcoGuardians. All rights reserved.
    
    </div>
  </footer></Container>



);

}