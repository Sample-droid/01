import React from 'react';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Person, Home, ContactMail } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './welcomepage.css';

const Welcomepage = () => {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <Box className="welcome-container">
     

      {/* Hero Section */}
      <Box className="hero-section" py={10}>
        <Container maxWidth="lg" className="welcome-content">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h2" className="hero-title" gutterBottom>
              Course of Humanity is to Save, Not Devour
            </Typography>
            <Typography variant="h5" className="hero-subtitle" gutterBottom>
              Join us in our mission to protect and secure a healthier future for all.
            </Typography>
            <Box mt={4}>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/login"
                  className="cta-button"
                >
                  Get Involved
                </Button>
              </motion.div>
            </Box>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <IconButton
                className="scroll-indicator"
                onClick={scrollToAbout}
              >
                <KeyboardArrowDownIcon fontSize="large" />
              </IconButton>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" className="about-section" py={8}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" className="about-title">
              About Our Mission
            </Typography>
            <Typography variant="body1" className="about-text">
              At HumanityFirst, we empower communities through sustainable housing, nutritious meal
              programs, and lifelong learning. We believe in holistic well-being—building safe homes,
              feeding bodies, and nurturing minds.
            </Typography>
          </motion.div>
          <Grid container spacing={4} className="about-cards">
            <Grid item xs={12} md={4}>
              <motion.div
                className="about-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <HomeIcon className="about-icon" />
                <Typography variant="h6" className="card-title">
                  Sustainable Housing
                </Typography>
                <Typography variant="body2" className="card-text">
                  We construct eco-friendly homes using local materials and community labor.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                className="about-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <FastfoodIcon className="about-icon" />
                <Typography variant="h6" className="card-title">
                  Nutritious Meals
                </Typography>
                <Typography variant="body2" className="card-text">
                  Our food programs deliver balanced diets crafted by nutrition experts.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                className="about-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <LocalLibraryIcon className="about-icon" />
                <Typography variant="h6" className="card-title">
                  Education & Skills
                </Typography>
                <Typography variant="body2" className="card-text">
                  Workshops and training courses that uplift individuals and families.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      
    </Box>
  );
};

export default Welcomepage;