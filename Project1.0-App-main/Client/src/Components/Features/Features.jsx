import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Person, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import Footer from '../Footer/Footer';
import './features.css';

const allFeatures = [
  { id: 1, title: 'Green Design', desc: 'Create an eco-friendly scenery tailored to your vision.', path: '/green', category: 'Tools' },
  { id: 2, title: 'Food For Health', desc: 'Nourish your mind and body with healthy eating.', path: '/f', category: 'Health' },
  { id: 3, title: 'EcoQuiz', desc: 'Test your knowledge with our ecological quiz.', path: '/ecoquiz', category: 'Education' },
  { id: 4, title: 'Feedback', desc: 'Share your thoughts and ideas with the community.', path: '/feedback', category: 'Community' },
  { id: 5, title: 'Carbon Footprint Calculator', desc: 'Estimate your daily CO₂ emissions.', path: '/carbon', category: 'Tools' },
];

const Features = () => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const categories = ['All', ...new Set(allFeatures.map(f => f.category))];

  const filtered = allFeatures.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === 'All' || f.category === activeCat;
    return matchesSearch && matchesCat;
  });

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <div className="features-container">
      {/* Navbar */}
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NGO Platform
          </Typography>
          <Box display="flex" gap="1rem">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <IconButton color="inherit" component={Link} to="/home" className="nav-button">
                <Home />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Home
                </Typography>
              </IconButton>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <IconButton color="inherit" component={Link} to="/logindashboard" className="nav-button">
                <Person />
                <Typography variant="body1" sx={{ ml: 1 }}>
                Dashboard
                </Typography>
              </IconButton>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <IconButton color="inherit" component={Link} to="/contact" className="nav-button">
                <Typography variant="body1">
                  Contact
                </Typography>
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero-section" py={10}>
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h2" className="hero-title" gutterBottom>
              Discover Our Features
            </Typography>
            <Typography variant="h5" className="hero-subtitle" gutterBottom>
              Explore tools and resources to support sustainability, health, and community engagement.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Filter Section */}
      <Box className="filter-section" py={4}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search features..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-bar"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box className="category-tabs">
                {categories.map(cat => (
                  <motion.div
                    key={cat}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      className={activeCat === cat ? 'category-button active' : 'category-button'}
                      onClick={() => setActiveCat(cat)}
                    >
                      {cat}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box className="features-section" py={8}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {filtered.map(feature => (
              <Grid item xs={12} sm={6} md={4} key={feature.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Box className="feature-card" component={Link} to={feature.path}>
                    <Typography variant="h6" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="feature-desc">
                      {feature.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
            {filtered.length === 0 && (
              <Box width="100%" textAlign="center" py={4}>
                <Typography variant="body1" className="no-results">
                  No features match your search.
                </Typography>
              </Box>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Features;