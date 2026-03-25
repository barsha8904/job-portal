const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, employerOrAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getJobs)
  .post(protect, employerOrAdmin, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, employerOrAdmin, updateJob)
  .delete(protect, employerOrAdmin, deleteJob);

module.exports = router;
