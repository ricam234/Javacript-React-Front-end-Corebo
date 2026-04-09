import axios from "axios";

const API_URL = "https://www.corebocuautla.com.mx/admin/public/api";

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};