// src/components/ContactDetailsPage.jsx
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './Condacts.css';

export default function Condacts() {
  return (
    <Container className="details-container">
      <Typography variant="h3" className="details-title">
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Contact Info */}
        <Grid item xs={12} md={5}>
          <Paper className="info-card" elevation={3}>
            <Box className="info-item">
              <LocationOnIcon className="info-icon" />
              <Box>
                <Typography variant="h6">Our Office</Typography>
                <Typography>1234 Greenway Rd, Mukundapuram, KL 682022</Typography>
              </Box>
            </Box>

            <Box className="info-item">
              <PhoneIcon className="info-icon" />
              <Box>
                <Typography variant="h6">Call Us</Typography>
                <Typography>+91 98765 43210</Typography>
              </Box>
            </Box>

            <Box className="info-item">
              <EmailIcon className="info-icon" />
              <Box>
                <Typography variant="h6">Email Us</Typography>
                <Link href="mailto:info@myapp.com">info@myapp.com</Link>
              </Box>
            </Box>

            <Box className="info-item">
              <AccessTimeIcon className="info-icon" />
              <Box>
                <Typography variant="h6">Hours</Typography><Typography>Mon–Fri: 10 AM–4 PM</Typography>
              
              </Box>
            </Box>

            <Box className="socials">
              <Link href="#" className="social-link"><FacebookIcon /></Link>
              <Link href="#" className="social-link"><TwitterIcon /></Link>
              <Link href="#" className="social-link"><LinkedInIcon /></Link>
            </Box>
          </Paper>
        </Grid>

        
        
      </Grid>
    </Container>
  );
}