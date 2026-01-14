import express from "express";
import { getAnalyticsSummary, getJobStats, getApplicationStats} from './../controllers/analytics/analyticsController';


const router = express.Router();

router.get("/", getAnalyticsSummary);
router.get("/jobs", getJobStats);
router.get("/applications", getApplicationStats);

// keep db-test if you want
router.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM test_connection");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
