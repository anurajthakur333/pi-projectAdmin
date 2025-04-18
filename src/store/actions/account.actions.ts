export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export function login(email: string) {
  localStorage.setItem('adminEmail', email); // ✅ Save to storage
  return {
    type: LOG_IN,
    email
  };
}

export function logout() {
  localStorage.removeItem('adminEmail'); // ✅ Clear storage on logout
  return {
    type: LOG_OUT
  };
}
