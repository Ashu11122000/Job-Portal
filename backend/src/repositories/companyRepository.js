// Company Repository - data access layer for companies
import Company from "../models/Company.js";

export const findAllCompanies = async (filters = {}) => {
  return await Company.find(filters).populate("createdBy", "name email");
};

export const findCompanyById = async (id) => {
  return await Company.findById(id).populate("createdBy", "name email");
};

export const createCompany = async (companyData) => {
  return await Company.create(companyData);
};

export const updateCompany = async (id, companyData) => {
  return await Company.findByIdAndUpdate(id, companyData, { new: true });
};

export const deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};
