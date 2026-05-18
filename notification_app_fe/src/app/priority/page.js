"use client";
import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Chip, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert, Box, Button } from "@mui/material";
import { fetchNotifications } from "../api/notifications";

const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };
const TYPE_COLORS = { Placement: "success", Result: "warning", Event: "info" };

export default function PriorityInbox() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topN, setTopN] = useState(10);
    const [viewed, setViewed] = useState([]);

    useEffect(() => { loadPriority(); }, [topN]);

    async function loadPriority() {
        try {
            setLoading(true);
            const data = await fetchNotifications(100, 1);
            const list = Array.isArray(data) ? data : [];
            const scored = list
                .map(item => ({
                    ...item,
                    score: TYPE_WEIGHT[item.Type] * 1e12 + new Date(item.Timestamp).getTime()
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, topN);
            setNotifications(scored);
        } catch (err) {
            setError("Failed to load priority notifications");
        } finally {
            setLoading(false);
        }
    }

    return ( <
            Container maxWidth = "md"
            sx = {
                { py: 4 }
            } >
            <
            Typography variant = "h4"
            fontWeight = "bold"
            gutterBottom > Priority Inbox < /Typography> <
            FormControl sx = {
                { mb: 3, minWidth: 150 }
            } >
            <
            InputLabel > Show Top < /InputLabel> <
            Select value = { topN }
            onChange = {
                (e) => setTopN(e.target.value)
            }
            label = "Show Top" >
            <
            MenuItem value = { 10 } > Top 10 < /MenuItem> <
            MenuItem value = { 15 } > Top 15 < /MenuItem> <
            MenuItem value = { 20 } > Top 20 < /MenuItem> < /
            Select > <
            /FormControl> { loading && < CircularProgress / >
        } {
            error && < Alert severity = "error" > { error } < /Alert>} {
            notifications.map((item, index) => ( <
                Card key = { item.ID }
                onClick = {
                    () => setViewed((p) => [...p, item.ID])
                }
                sx = {
                    { mb: 2, cursor: "pointer", opacity: viewed.includes(item.ID) ? 0.6 : 1, borderLeft: `4px solid ${item.Type === "Placement" ? "green" : item.Type === "Result" ? "orange" : "blue"}` }
                } >
                <
                CardContent >
                <
                Box display = "flex"
                justifyContent = "space-between"
                alignItems = "center" >
                <
                Typography fontWeight = "bold" > #{ index + 1 } { item.Message } < /Typography> <
                Box display = "flex"
                gap = { 1 } >
                <
                Chip label = { item.Type }
                color = { TYPE_COLORS[item.Type] }
                size = "small" / > {!viewed.includes(item.ID) && < Chip label = "NEW"
                    color = "error"
                    size = "small" / >
                } <
                /Box> < /
                Box > <
                Typography variant = "caption"
                color = "text.secondary" > { new Date(item.Timestamp).toLocaleString() } < /Typography> < /
                CardContent > <
                /Card>
            ))
        } <
        Button variant = "outlined"
    href = "/"
    sx = {
        { mt: 2 }
    } > Back to All Notifications < /Button> < /
    Container >
);
}