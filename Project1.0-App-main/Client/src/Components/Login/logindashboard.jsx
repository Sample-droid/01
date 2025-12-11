import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";

import {
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Event as EventIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  MonetizationOn as DonationIcon,
} from "@mui/icons-material";

import "./logindashboard.css";
import EventHostPart from "./EventHostPart";
import { useAuth } from "../Context/AuthContext";

const LoginDashboard = () => {
  const { user, api, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("userInfo");
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Donations
  const [donations, setDonations] = useState([]);
  const [donationLoading, setDonationLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [donationCount, setDonationCount] = useState(0);

  const showSnackbar = (msg, sev = "success") => {
    setSnackbar({ open: true, message: msg, severity: sev });
    setTimeout(() => setSnackbar((p) => ({ ...p, open: false })), 2500);
  };

  // ----------------------------------------------------
  // Fetch User Info
  // ----------------------------------------------------
  useEffect(() => {
    if (!user?.id || activeSection !== "userInfo") return;

    setLoading(true);
    api
      .get(`/api/auth/user/${user.id}`)
      .then((res) => setUserData(res.data))
      .catch(() => showSnackbar("Error fetching user data", "error"))
      .finally(() => setLoading(false));
  }, [activeSection, user]);

  // ----------------------------------------------------
  // Fetch Donations
  // ----------------------------------------------------
  useEffect(() => {
    if (!user?.email || activeSection !== "donations") return;

    const fetchDonations = async () => {
      setDonationLoading(true);
      try {
        const res = await api.get(`/api/donations/history?page=${page + 1}&limit=${rowsPerPage}`);
        setDonations(res.data.donations || []);
        setDonationCount(res.data.total || res.data.totalPages * rowsPerPage || 0);
      } catch (err) {
        console.error(err);
        showSnackbar("Error fetching donation history", "error");
      } finally {
        setDonationLoading(false);
      }
    };

    fetchDonations();
  }, [activeSection, user, page, rowsPerPage]);

  // Menu
  const handleUserMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  const navigateTo = (path) => () => (window.location.href = path);

  // ----------------------------------------------------
  // Render Sections
  // ----------------------------------------------------
  const renderUserInfo = () => (
    <Box className="fade-in">
      <Typography variant="h5" gutterBottom>
        User Information
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : userData ? (
        <Card className="info-card">
          <CardContent>
            <Typography>
              <strong>Name:</strong> {userData.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {userData.email}
            </Typography>
            <Typography>
              <strong>Role:</strong> {userData.role}
            </Typography>
            <Typography>
              <strong>Joined:</strong> {userData.createdAt?.slice(0, 10)}
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );

  const renderDonationHistory = () => (
    <Box className="fade-in">
      <Typography variant="h5" gutterBottom>
        Donation History
      </Typography>
      {donationLoading ? (
        <CircularProgress />
      ) : donations.length === 0 ? (
        <Typography>No donations found.</Typography>
      ) : (
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount ($)</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((d) => (
                <TableRow key={d._id}>
                  <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{(d.amount / 100).toFixed(2)}</TableCell>
                  <TableCell>{d.message || "-"}</TableCell>
                  <TableCell>{d.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={donationCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(e, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Box>
      )}
    </Box>
  );

  return (
    <Box className="dashboard-container">
      <AppBar position="static" sx={{ background: "#2C2F48" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Eventify
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={navigateTo("/home")}>
              Home
            </Button>
            <Button color="inherit" startIcon={<InfoIcon />} onClick={navigateTo("/features")}>
              Features
            </Button>
            <Button color="inherit" startIcon={<ContactMailIcon />} onClick={navigateTo("/contact")}>
              Contact
            </Button>

            <IconButton color="inherit" onClick={handleUserMenuOpen}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleUserMenuClose}>
              <MenuItem
                onClick={() => {
                  setActiveSection("userInfo");
                  handleUserMenuClose();
                }}
              >
                <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} /> User Info
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveSection("events");
                  handleUserMenuClose();
                }}
              >
                <EventIcon fontSize="small" sx={{ mr: 1 }} /> Events
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveSection("donations");
                  handleUserMenuClose();
                }}
              >
                <DonationIcon fontSize="small" sx={{ mr: 1 }} /> Donations
              </MenuItem>
              <MenuItem onClick={logout} sx={{ color: "error.main" }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box className="dashboard-content" sx={{ p: 3 }}>
        {activeSection === "userInfo" && renderUserInfo()}
        {activeSection === "events" && <EventHostPart userId={user?.id} showSnackbar={showSnackbar} />}
        {activeSection === "donations" && renderDonationHistory()}
      </Box>

      <Snackbar open={snackbar.open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginDashboard;