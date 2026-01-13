import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/resume`;

export const saveResumeApi = (data) => axios.post(API_BASE, data);
export const getResumeApi = (id) => axios.get(`${API_BASE}/${id}`);
export const listResumesApi = () => axios.get(API_BASE);

console.log("Resume API Base:", API_BASE);
