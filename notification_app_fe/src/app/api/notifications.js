import axios from "axios";

export async function fetchNotifications(limit, page, type) {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit);
    if (page) params.append("page", page);
    if (type) params.append("type", type);

    const response = await axios.get(`/api-notifications?${params.toString()}`);

    const data = response.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.notifications)) return data.notifications;
    return [];
}