import axios from 'axios';
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpc2hlazIyMTEwNzNAYWtnZWMuYWMuaW4iLCJleHAiOjE3NTI1NTYzNzQsImlhdCI6MTc1MjU1NTQ3NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQzNWQxY2I4LWFjZGQtNGRkMC05MTI3LTVkMTZiN2Q4YmU3YyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFiaGlzaGVrIGt1bWFyIiwic3ViIjoiMDIzMjk3ZGUtZmNmZi00MzA1LWE5NzEtNjUxMDJlY2QyN2I0In0sImVtYWlsIjoiYWJoaXNoZWsyMjExMDczQGFrZ2VjLmFjLmluIiwibmFtZSI6ImFiaGlzaGVrIGt1bWFyIiwicm9sbE5vIjoiMjIwMDI3MDExMDAwNSIsImFjY2Vzc0NvZGUiOiJ1dU1ieVkiLCJjbGllbnRJRCI6IjAyMzI5N2RlLWZjZmYtNDMwNS1hOTcxLTY1MTAyZWNkMjdiNCIsImNsaWVudFNlY3JldCI6Ik52YWJnU1FSeUhER3lQSkQifQ.LJz-oFFRlVVcy26tokM1r_tzJbgnU8wDnYgFd_Ilsm4"
const API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
) {
  try {
    const res = await axios.post(
      API_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Log created:", res.data);
  } catch (err: any) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
}
