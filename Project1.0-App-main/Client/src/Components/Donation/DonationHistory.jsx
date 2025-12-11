import React, { useEffect, useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, CircularProgress, Typography 
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const DonationHistory = () => {
  const { token } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const baseurl = import.meta.env.VITE_API_BASE_URL;

  const fetchDonations = async (pageNumber = 1) => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${baseurl}/api/donations/history?page=${pageNumber}&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDonations(res.data.donations);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations(1);
  }, []);

  const handlePrev = () => {
    if (page > 1) fetchDonations(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) fetchDonations(page + 1);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Donation History
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : donations.length === 0 ? (
        <Typography>No donations found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date / Time</TableCell>
                  <TableCell>Amount ($)</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation._id}>
                    <TableCell>
                      {new Date(donation.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {(donation.amount / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>{donation.message || '-'}</TableCell>
                    <TableCell>{donation.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Button onClick={handlePrev} disabled={page <= 1}>
              Previous
            </Button>
            <Typography>
              Page {page} of {totalPages}
            </Typography>
            <Button onClick={handleNext} disabled={page >= totalPages}>
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DonationHistory;