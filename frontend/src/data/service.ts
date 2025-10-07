// src/services/profileService.ts
const API_URL = "http://localhost:5000/api/profiles"; // your backend URL

export const getProfiles = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProfile = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
