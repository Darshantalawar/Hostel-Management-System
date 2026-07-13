import api from "./api";

// ---- Login ----

export async function loginAdmin(usernameOrEmail, password) {
  const response = await api.post("/api/admin/login", {
    usernameOrEmail,
    password
  });

  const { token, role, id, fullName, email } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("admin", JSON.stringify({ id, fullName, email }));

  return response.data;
}

export async function loginStudent(email, password) {
  const response = await api.post("/api/student/login", {
    email,
    password
  });

  const { token, role, id, fullName } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  // Full student record (used throughout the existing student pages)
  localStorage.setItem(
    "student",
    JSON.stringify({ id, fullName, email: response.data.email })
  );

  return response.data;
}

// ---- Session helpers ----

export function getRole() {
  return localStorage.getItem("role");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAdmin() {
  return getRole() === "ADMIN";
}

export function isStudent() {
  return getRole() === "STUDENT";
}

export function getCurrentStudent() {
  const raw = localStorage.getItem("student");
  return raw ? JSON.parse(raw) : null;
}

export function getCurrentAdmin() {
  const raw = localStorage.getItem("admin");
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("student");
  localStorage.removeItem("admin");
}
