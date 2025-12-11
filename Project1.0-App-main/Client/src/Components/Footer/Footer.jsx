import React from 'react';
import { Container, Typography, Box, Grid, IconButton } from '@mui/material';
import { Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './footer.css';

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.1, color: '#2563eb', transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} className="footer-content">
          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="footer-title">
              Explore
            </Typography>
            <Box className="footer-links">
              <motion.div variants={linkVariants} whileHover="hover">
                <Typography
                  variant="body2"
                  component="a"
                  href="/"
                  className="footer-link"
                >
                  Home
                </Typography>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Typography
                  variant="body2"
                  component="a"
                  href="/dashboard"
                  className="footer-link"
                >
                  Dashboard
                </Typography>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Typography
                  variant="body2"
                  component="a"
                  href="/features"
                  className="footer-link"
                >
                  Features
                </Typography>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Typography
                  variant="body2"
                  component="a"
                  href="/about"
                  className="footer-link"
                >
                  About
                </Typography>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover">
                <Typography
                  variant="body2"
                  component="a"
                  href="/contact"
                  className="footer-link"
                >
                  Contact
                </Typography>
              </motion.div>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="footer-title">
              Contact Us
            </Typography>
            <Typography variant="body2" className="footer-text">
              Email: support@ngoplatform.org
            </Typography>
            <Typography variant="body2" className="footer-text">
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" className="footer-text">
              Address: 123 Impact Lane, Community City, USA
            </Typography>
          
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="footer-title">
              Follow Us
            </Typography>
            <Box className="footer-social">
              <motion.div variants={iconVariants} whileHover="hover">
                <IconButton
                  href="https://x.com/ngoplatform"
                  target="_blank"
                  className="footer-icon"
                >
                  <Twitter />
                </IconButton>
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <IconButton
                  href="https://linkedin.com/company/ngoplatform"
                  target="_blank"
                  className="footer-icon"
                >
                  <LinkedIn />
                </IconButton>
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <IconButton
                  href="https://instagram.com/ngoplatform"
                  target="_blank"
                  className="footer-icon"
                >
                  <Instagram />
                </IconButton>
              </motion.div>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box className="footer-copyright">
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} NGO Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};



export default Footer;