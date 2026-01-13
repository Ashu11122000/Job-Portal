import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* GENERATE COVER LETTER */
export const generateCoverLetterAPI = (data) =>
  API.post("/api/cover-letter/generate", data);

/* ATS SCORE */
export const calculateATSAPI = (data) =>
  API.post("/api/cover-letter/ats-score", data);

/* SAVE LETTER */
export const saveCoverLetterAPI = (data) =>
  API.post("/api/cover-letter/save", data);

/* LIST SAVED LETTERS */
export const listCoverLettersAPI = () =>
  API.get("/api/cover-letter/list");
