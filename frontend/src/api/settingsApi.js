import axios from "./axiosInstance.js"; // existing axios instance kept

class SettingAPI {
  /* ================= ADMIN SETTINGS ================= */

  static async getSettings() {
    try {
      const res = await axios.get("/admin/settings");
      return res.data;
    } catch (error) {
      console.warn("⚠ Admin settings API not available");
      return null;
    }
  }

  static async updateSetting(key, value) {
    try {
      const res = await axios.put("/admin/settings", { key, value });
      return res.data;
    } catch (error) {
      console.warn("⚠ Failed to update setting");
      return null;
    }
  }

  /* ================= ADMIN LOGS ================= */

  static async getLogs() {
    try {
      const res = await axios.get("/admin/logs");
      return res.data;
    } catch (error) {
      console.warn("⚠ Admin logs API not available");
      return null;
    }
  }

  static async deleteLog(id) {
    try {
      const res = await axios.delete(`/admin/logs/${id}`);
      return res.data;
    } catch (error) {
      console.warn("⚠ Failed to delete admin log");
      return null;
    }
  }

  /* ================= JOBS (OPTIONAL / SHARED) ================= */

  static async createJob(jobData) {
    try {
      const res = await axios.post("/jobs", jobData);
      return res.data;
    } catch (error) {
      console.warn("⚠ Failed to create job");
      return null;
    }
  }
}

export default SettingAPI;
