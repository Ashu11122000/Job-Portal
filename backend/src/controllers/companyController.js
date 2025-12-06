// Company Controller - handles company-related requests
import ApiResponse from "../utils/apiResponse.js";
import ErrorResponse from "../utils/errorResponse.js";
import catchAsync from "../utils/catchAsync.js";
import * as companyRepo from "../repositories/companyRepository.js";

export const createCompany = catchAsync(async (req, res, next) => {
  const { name, description, website, location, industry, size } = req.body;

  const company = await companyRepo.createCompany({
    name,
    description,
    website,
    location,
    industry,
    size,
    createdBy: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, company, "Company created successfully"));
});

export const getAllCompanies = catchAsync(async (req, res, next) => {
  const companies = await companyRepo.findAllCompanies();
  res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

export const getCompanyById = catchAsync(async (req, res, next) => {
  const company = await companyRepo.findCompanyById(req.params.id);
  if (!company) {
    return next(new ErrorResponse("Company not found", 404));
  }
  res
    .status(200)
    .json(new ApiResponse(200, company, "Company fetched successfully"));
});

export const updateCompany = catchAsync(async (req, res, next) => {
  let company = await companyRepo.findCompanyById(req.params.id);
  if (!company) {
    return next(new ErrorResponse("Company not found", 404));
  }

  if (
    company.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  company = await companyRepo.updateCompany(req.params.id, req.body);
  res
    .status(200)
    .json(new ApiResponse(200, company, "Company updated successfully"));
});

export const deleteCompany = catchAsync(async (req, res, next) => {
  const company = await companyRepo.findCompanyById(req.params.id);
  if (!company) {
    return next(new ErrorResponse("Company not found", 404));
  }

  if (
    company.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  await companyRepo.deleteCompany(req.params.id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Company deleted successfully"));
});
