const express = require('express');
const router = express.Router();
const { applyJob, getUserApplications, getJobApplicants } = require('../controllers/applicationController');
const { protect, employerOrAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, applyJob)
  .get(protect, getUserApplications);

router.route('/:jobId')
  .get(protect, employerOrAdmin, getJobApplicants);

module.exports = router;
