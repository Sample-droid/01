import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Person, Star } from '@mui/icons-material';
import './home.css';
import Footer from '../Footer/Footer';

const Home = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <AppBar position="static" className="navbar" color="transparent" elevation={4}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Humanity Care Foundation
          </Typography>

          <Box display="flex" gap="1rem">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <IconButton color="inherit" href="/logindashboard">
                <Person />
                <Typography variant="body1" sx={{ ml: 1 }}>User</Typography>
              </IconButton>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <IconButton color="inherit" href="/features">
                <Star />
                <Typography variant="body1" sx={{ ml: 1 }}>Features</Typography>
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box className="hero-section">
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative', zIndex: 5 }}
          >
            <Typography variant="h2" className="hero-title" gutterBottom>
              Together, We Can Build Brighter Futures
            </Typography>

            <Typography variant="h5" className="hero-subtitle" gutterBottom>
              Support children, families, and communities through education,
              health, and humanitarian aid.
            </Typography>

            {/* Donate Button (FIXED) */}
            <Box mt={4} sx={{ position: "relative", zIndex: 10 }}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ display: "inline-block" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/odonation"
                  component="a"
                  sx={{ pointerEvents: "auto" }}
                >
                  Donate Now
                </Button>
              </motion.div>
            </Box>

          </motion.div>
        </Container>
      </Box>

      {/* ABOUT SECTION */}
      <Box className="about-section">
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography variant="h4">
                  Our Mission
                </Typography>

                <Typography variant="body1" paragraph>
                  We empower vulnerable communities by providing education, food support,
                  environmental programs, and healthcare initiatives.  
                  Your contribution directly fuels real-world change.
                </Typography>

                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button variant="outlined" color="primary" href="/volunteer">
                    Become a Volunteer
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.img
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80"
                alt="NGO Work"
                className="about-image"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* EVENTS SECTION */}
      <Box className="events-section">
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4">
              Upcoming Community Events
            </Typography>

            <Typography variant="body1" paragraph>
              Participate in events that spark change — or create one and lead the movement.
            </Typography>

            <Box mt={4} display="flex" justifyContent="center" gap="1.2rem">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="outlined" color="secondary" href="/EventCreate">
                  Create Event
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="outlined" color="secondary" href="/EventJoin">
                  Join Event
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* CTA SECTION */}
      <Box className="cta-section">
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4">
              Be Part of the Change
            </Typography>

            <Typography variant="body1" paragraph>
              Join hands with us in creating a world filled with opportunity and hope.
            </Typography>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button variant="contained" color="primary" href="/join">
                Join Our Community
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </div>
  );
};


export default Home;