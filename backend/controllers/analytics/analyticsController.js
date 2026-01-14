// controllers/analytics.controller.js
// controllers/analytics/analyticsController.js
import {
  getAnalyticsSummaryService,
  getJobStatsService,
  getApplicationStatsService,
} from "../../services/analyticsService.js";


export const getAnalyticsSummary = async (req, res) => {
  try {
    const data = await getAnalyticsSummaryService();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getJobStats = async (req, res) => {
  try {
    const data = await getJobStatsService();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplicationStats = async (req, res) => {
  try {
    const data = await getApplicationStatsService();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
