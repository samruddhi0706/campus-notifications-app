const axios = require("axios");

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzUxMDY4NC5keXBpdEBkeXB2cC5lZHUuaW4iLCJleHAiOjE3NzkwOTg1NDQsImlhdCI6MTc3OTA5NzY0NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk3YWM5YWNjLTEyYTUtNDMwMi05YzgwLTMwZDAyZTY4Y2IwYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNhbXJ1ZGRoaSByYWphcmFtIGJlbGRhciIsInN1YiI6ImU5ZmJlNzZiLWM0N2UtNGVlNi1iMDJhLTRkMzdkNWUzMjRiNSJ9LCJlbWFpbCI6IjIzNTEwNjg0LmR5cGl0QGR5cHZwLmVkdS5pbiIsIm5hbWUiOiJzYW1ydWRkaGkgcmFqYXJhbSBiZWxkYXIiLCJyb2xsTm8iOiJ0Y29jMTIiLCJhY2Nlc3NDb2RlIjoiZnpFUVNRIiwiY2xpZW50SUQiOiJlOWZiZTc2Yi1jNDdlLTRlZTYtYjAyYS00ZDM3ZDVlMzI0YjUiLCJjbGllbnRTZWNyZXQiOiJjdHBnUE5Nd1VaV0RBdXRuIn0.vY7djBZyT69ukEOzhkWIJhhpD6yQlUyHWnYh5fyWSlA";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, packageName, message) {
    try {
        await axios.post(
            LOG_API, {
                stack: stack,
                level: level,
                package: packageName,
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(`✅ Log sent: [${level}] ${message}`);
    } catch (error) {
        console.error("Log failed:", error.message);
    }
}

module.exports = { Log };