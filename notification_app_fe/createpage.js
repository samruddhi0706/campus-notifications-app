const fs = require('fs');

const content = `"use client";
import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Chip, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert, Box, Button } from "@mui/material";
import { fetchNotifications } from "./api/notifications";

const TYPE_COLORS = { Placement: "success", Result: "warning", Event: "info" };

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [viewed, setViewed] = useState([]);

  useEffect(() => { loadNotifications(); }, [filter]);

  async function loadNotifications() {
    try {
      setLoading(true);
      const data = await fetchNotifications(10, 1, filter || undefined);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>All Notifications</Typography>
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter by Type">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {notifications.map((item) => (
        <Card key={item.ID} onClick={() => setViewed((p) => [...p, item.ID])}
          sx={{ mb: 2, cursor: "pointer", opacity: viewed.includes(item.ID) ? 0.6 : 1, borderLeft: viewed.includes(item.ID) ? "4px solid grey" : "4px solid #1976d2" }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={viewed.includes(item.ID) ? "normal" : "bold"}>{item.Message}</Typography>
              <Box display="flex" gap={1}>
                <Chip label={item.Type} color={TYPE_COLORS[item.Type]} size="small" />
                {!viewed.includes(item.ID) && <Chip label="NEW" color="error" size="small" />}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">{new Date(item.Timestamp).toLocaleString()}</Typography>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" href="/priority" sx={{ mt: 2 }}>View Priority Inbox</Button>
    </Container>
  );
}`;

fs.writeFileSync('./src/app/page.js', content);
console.log('page.js created successfully!');