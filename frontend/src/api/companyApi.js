import axiosInstance from "./axiosInstance";

// Fetch all companies
export const getCompanies = () => axiosInstance.get("/company");

// Fetch one company by ID
export const getCompanyById = (id) => axiosInstance.get(`/company/${id}`);

// Create company
export const createCompany = (data) => axiosInstance.post("/company", data);

// Update company
export const updateCompany = (id, data) => axiosInstance.put(`/company/${id}`, data);

// Delete company
export const deleteCompany = (id) => axiosInstance.delete(`/company/${id}`);

// Update logo
export const updateCompanyLogo = (id, logoData) =>
  axiosInstance.put(`/company/logo/${id}`, logoData);
