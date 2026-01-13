import axiosInstance from "./axiosInstance";

export const getCompanies = () => axiosInstance.get("/company");
export const getCompanyById = (id) => axiosInstance.get(`/company/${id}`);
export const createCompany = (data) => axiosInstance.post("/company", data);
export const updateCompany = (id, data) =>
  axiosInstance.put(`/company/${id}`, data);
export const deleteCompany = (id) =>
  axiosInstance.delete(`/company/${id}`);
export const updateCompanyLogo = (id, logoData) =>
  axiosInstance.put(`/company/logo/${id}`, logoData);
