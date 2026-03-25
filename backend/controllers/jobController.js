const db = require('../config/db');

// @desc    Get all jobs
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;
    const posted_by = req.user.id;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: 'Please provide required job fields' });
    }

    const result = await db.query(
      'INSERT INTO jobs (title, company, location, salary, description, posted_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, company, location, salary, description, posted_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Employer/Admin)
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, location, salary, description } = req.body;

    // Check if job exists and belongs to the user
    const jobResult = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (jobResult.rows.length === 0) return res.status(404).json({ message: 'Job not found' });
    
    // Only admin or the employer who posted it can update
    if (jobResult.rows[0].posted_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await db.query(
      'UPDATE jobs SET title = $1, company = $2, location = $3, salary = $4, description = $5 WHERE id = $6 RETURNING *',
      [title, company, location, salary, description, id]
    );

    res.json(updatedJob.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer/Admin)
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    const jobResult = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (jobResult.rows.length === 0) return res.status(404).json({ message: 'Job not found' });
    
    if (jobResult.rows[0].posted_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await db.query('DELETE FROM jobs WHERE id = $1', [id]);
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob };
