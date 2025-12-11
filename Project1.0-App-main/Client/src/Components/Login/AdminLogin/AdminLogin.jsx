import React, { useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './AdminLogin.css';

export default function AdminLogin() {
  const baseurl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const [form, setForm] = useState({
    username: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(
        `${baseurl}/api/admin/login`,      // <-- FIXED
        {
          username: form.username,
          password: form.password
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Login success → store token + admin data
      const storage = form.remember ? localStorage : sessionStorage;

      storage.setItem('adminToken', data.token);    // <-- TOKEN
      storage.setItem('adminUser', JSON.stringify(data.admin));

      window.location.href = '/admin/dashboard';
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} className="login-paper">
        <Box className="login-box">
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={form.remember}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />
            {error && (
              <Typography className="login-error">{error}</Typography>
            )}
            <Button type="submit" fullWidth variant="contained" className="login-button">
              Sign In
            </Button>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <a href="#forgot" className="login-link">
                  Forgot password?
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  
);



}