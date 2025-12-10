import axiosInstance from "./axiosInstance";

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return axiosInstance.post("/upload/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return axiosInstance.post("/upload/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
