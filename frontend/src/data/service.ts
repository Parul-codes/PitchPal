import { API_URL } from "../api/base";

const API_url = `${API_URL}/api/profiles`; 

export const UserProfile = async () => {
  const res = await fetch(API_url);
  return res.json();
};

export const createProfile = async (data: any) => {
  const res = await fetch(API_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

