const axios = require("axios");
const { Log } = require("../logging_middleware/logger");

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzUxMDY4NC5keXBpdEBkeXB2cC5lZHUuaW4iLCJleHAiOjE3NzkwOTg1NDQsImlhdCI6MTc3OTA5NzY0NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk3YWM5YWNjLTEyYTUtNDMwMi05YzgwLTMwZDAyZTY4Y2IwYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhbXJ1ZGRoaSByYWphcmFtIGJlbGRhciIsInN1YiI6ImU5ZmJlNzZiLWM0N2UtNGVlNi1iMDJhLTRkMzdkNWUzMjRiNSJ9LCJlbWFpbCI6IjIzNTEwNjg0LmR5cGl0QGR5cHZwLmVkdS5pbiIsIm5hbWUiOiJzYW1ydWRkaGkgcmFqYXJhbSBiZWxkYXIiLCJyb2xsTm8iOiJ0Y29jMTIiLCJhY2Nlc3NDb2RlIjoiZnpFUVNRIiwiY2xpZW50SUQiOiJlOWZiZTc2Yi1jNDdlLTRlZTYtYjAyYS00ZDM3ZDVlMzI0YjUiLCJjbGllbnRTZWNyZXQiOiJjdHBnUE5Nd1VaV0RBdXRuIn0.vY7djBZyT69ukEOzhkWIJhhpD6yQlUyHWnYh5fyWSlA";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };

async function getTopNotifications(n = 10) {
    await Log("frontend", "info", "api", "Fetching notifications from API");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });

    const notifications = response.data.notifications;
    await Log("frontend", "info", "api", `Fetched ${notifications.length} notifications`);

    const scored = notifications.map(item => ({
        ...item,
        score: TYPE_WEIGHT[item.Type] * 1e12 + new Date(item.Timestamp).getTime()
    }));

    scored.sort((a, b) => b.score - a.score);

    const topN = scored.slice(0, n);

    await Log("frontend", "info", "utils", `Top ${n} notifications computed`);

    console.log(`\n✅ Top ${n} Notifications:\n`);
    topN.forEach((item, i) => {
        console.log(`${i + 1}. [${item.Type}] ${item.Message} — ${item.Timestamp}`);
    });
}

getTopNotifications(10);