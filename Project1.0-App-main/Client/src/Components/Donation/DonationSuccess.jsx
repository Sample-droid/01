import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const DonationSuccess = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 12,
        px: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          🎉 Donation Successful!
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Thank you for your generous support.  
          Your contribution makes a real difference!
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 4, px: 4 }}
          href="/"
        >
          Go Back Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default DonationSuccess;