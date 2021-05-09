import api from "./apiConfig";
import jwtDecode from "jwt-decode";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/sign-up", credentials); 
    localStorage.setItem("token", resp.data.token);
    const user = jwtDecode(resp.data.token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/sign-in", credentials);
    localStorage.setItem("token", resp.data.token);
    const user = jwtDecode(resp.data.token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async (user) => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (passwords, user) => {
  try {
    const resp = await api.post("/");
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await api.get("/verify"); 
    return res.data;
  }
  return false;
};

export const addToWatchlist = async (id, showId) => {
  try {
    const resp = await api.put(`/users/${id}/add-to-watchlist/${showId}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getUserWatchlist = async (id) => {
  try {
    const resp = await api.get(`/users/${id}`)
    return resp.data
  } catch (error) {
    throw error;
  }
};

export const deleteFromWatchlist = async (id, showId) => {
  try {
    const resp = await api.delete(`/users/${id}/remove-from-watchlist/${showId}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
};