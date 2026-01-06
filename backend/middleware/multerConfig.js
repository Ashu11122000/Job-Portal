import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/companyLogos/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadCompanyLogo = multer({ storage }).single("logo");
