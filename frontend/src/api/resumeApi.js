import axios from "axios";

const API_BASE = "http://localhost:5000/api/resume";

export const saveResumeApi = (data) => axios.post(API_BASE, data);
export const getResumeApi = (id) => axios.get(`${API_BASE}/${id}`);
export const listResumesApi = () => axios.get(API_BASE);
