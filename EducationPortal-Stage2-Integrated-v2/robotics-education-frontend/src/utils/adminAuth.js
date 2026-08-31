export function saveAdminSession(data) {
  sessionStorage.setItem("admin_token", data.token);
  sessionStorage.setItem("admin_user", JSON.stringify({
    email: data.email,
    role: data.role,
  }));
}

export function clearAdminSession() {
  sessionStorage.removeItem("admin_token");
  sessionStorage.removeItem("admin_user");
}

export function getAdminSession() {
  const token = sessionStorage.getItem("admin_token");
  const user = sessionStorage.getItem("admin_user");
  return token && user ? { token, user: JSON.parse(user) } : null;
}
