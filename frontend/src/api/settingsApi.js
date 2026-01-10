import axios from "./axiosInstance.js"; // existing axios instance kept

class SettingAPI {
  static async getSettings() {
    return axios.get("/api/admin/settings");
  }

  static async updateSetting(key, value) {
    return axios.put("/api/admin/settings", { key, value });
  }

  static async getLogs() {
    return axios.get("/api/admin/logs");
  }

  static async deleteLog(id) {
    return axios.delete(`/api/admin/logs/${id}`);
  }

  static async createJob(jobData) {
    return axios.post("/api/jobs", jobData);
  }
}

export default SettingAPI;
