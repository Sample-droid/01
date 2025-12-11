// Volunteer.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";

const opportunities = [
  {
    title: "Event Support",
    description: "Help organize and manage community events, ensuring smooth operations.",
    image: "https://source.unsplash.com/400x300/?event,community",
  },
  {
    title: "Teaching & Mentoring",
    description: "Share your knowledge with children and adults through workshops and classes.",
    image: "https://source.unsplash.com/400x300/?teaching,education",
  },
  {
    title: "Fundraising",
    description: "Assist in campaigns to raise funds and awareness for our mission.",
    image: "https://source.unsplash.com/400x300/?fundraising,charity",
  },
  {
    title: "Digital Outreach",
    description: "Support our online presence through social media and digital campaigns.",
    image: "https://source.unsplash.com/400x300/?digital,volunteer",
  },
];

export default function Volunteer() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Join Us in Making a Difference
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
          Volunteering is more than giving time — it’s about creating impact, building community, and
          changing lives. Explore opportunities to contribute your skills and passion.
        </Typography>
      </Box>

      {/* Opportunities Grid */}
      <Grid container spacing={4}>
        {opportunities.map((opportunity, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="160"
                image={opportunity.image}
                alt={opportunity.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {opportunity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {opportunity.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h5" gutterBottom>
          Ready to take the next step?
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Reach out to us to learn more about how you can get involved.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Contact Us
        </Button>
      </Box>
    </Container>
  );
}