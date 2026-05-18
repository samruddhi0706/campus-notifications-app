import { NextResponse } from "next/server";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzUxMDY4NC5keXBpdEBkeXB2cC5lZHUuaW4iLCJleHAiOjE3NzkxMDI4ODcsImlhdCI6MTc3OTEwMTk4NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjMxMGFkMGNmLTBiN2ItNGRjMi04MTQ3LWM3N2YxNWJkYjEwYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhbXJ1ZGRoaSByYWphcmFtIGJlbGRhciIsInN1YiI6ImU5ZmJlNzZiLWM0N2UtNGVlNi1iMDJhLTRkMzdkNWUzMjRiNSJ9LCJlbWFpbCI6IjIzNTEwNjg0LmR5cGl0QGR5cHZwLmVkdS5pbiIsIm5hbWUiOiJzYW1ydWRkaGkgcmFqYXJhbSBiZWxkYXIiLCJyb2xsTm8iOiJ0Y29jMTIiLCJhY2Nlc3NDb2RlIjoiZnpFUVNRIiwiY2xpZW50SUQiOiJlOWZiZTc2Yi1jNDdlLTRlZTYtYjAyYS00ZDM3ZDVlMzI0YjUiLCJjbGllbnRTZWNyZXQiOiJjdHBnUE5Nd1VaV0RBdXRuIn0.LsmEMIBlwyqbtaC1t16gxBcTNzTq4SlzC8AZXacd1eQ";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 10);
    const page = searchParams.get("page") || 1;
    const type = searchParams.get("type");

    let url = `http://4.224.186.213/evaluation-service/notifications?limit=${limit}&page=${page}`;
    if (type) url += `&notification_type=${type}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                "Content-Type": "application/json"
            },
            cache: "no-store"
        });

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data).substring(0, 200));

        const notifications = Array.isArray(data.notifications) ? data.notifications : Array.isArray(data) ? data : [];
        return NextResponse.json({ notifications });
    } catch (err) {
        console.error("Error:", err.message);
        return NextResponse.json({ notifications: [], error: err.message });
    }
}