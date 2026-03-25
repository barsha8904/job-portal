const db = require('../config/db');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (JobSeeker)
const applyJob = async (req, res) => {
  try {
    const { job_id, resume_url } = req.body;
    const user_id = req.user.id;

    if (!job_id || !resume_url) {
      return res.status(400).json({ message: 'Please provide job_id and resume_url' });
    }

    // Check if already applied
    const existing = await db.query('SELECT * FROM applications WHERE job_id = $1 AND user_id = $2', [job_id, user_id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const result = await db.query(
      'INSERT INTO applications (job_id, user_id, resume_url) VALUES ($1, $2, $3) RETURNING *',
      [job_id, user_id, resume_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications
// @access  Private
const getUserApplications = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await db.query(
      `SELECT a.*, j.title, j.company, j.location 
       FROM applications a 
       JOIN jobs j ON a.job_id = j.id 
       WHERE a.user_id = $1 ORDER BY a.applied_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applicants for a specific job (Employer)
// @route   GET /api/applications/:jobId
// @access  Private (Employer/Admin)
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Check if job belongs to employer
    const jobResult = await db.query('SELECT * FROM jobs WHERE id = $1', [jobId]);
    if (jobResult.rows.length === 0) return res.status(404).json({ message: 'Job not found' });
    
    if (jobResult.rows[0].posted_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }

    const result = await db.query(
      `SELECT a.*, u.name, u.email 
       FROM applications a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.job_id = $1 ORDER BY a.applied_at DESC`,
      [jobId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyJob, getUserApplications, getJobApplicants };
