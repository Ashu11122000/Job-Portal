import axiosInstance from "./axiosInstance";

export const getAllCompanies = () => axiosInstance.get("/companies");
export const getCompanyById = (id) => axiosInstance.get(`/companies/${id}`);
export const createCompany = (data) => axiosInstance.post("/companies", data);
