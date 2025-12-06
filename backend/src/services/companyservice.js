// Company Service - handles company business logic
import Company from "../models/Company.js";

export const createCompany = async (companyData) => {
  try {
    return await Company.create(companyData);
  } catch (error) {
    throw error;
  }
};

export const getCompanies = async (filters = {}) => {
  try {
    return await Company.find(filters).populate("createdBy", "name email");
  } catch (error) {
    throw error;
  }
};

export const getCompanyById = async (id) => {
  try {
    return await Company.findById(id).populate("createdBy", "name email");
  } catch (error) {
    throw error;
  }
};
