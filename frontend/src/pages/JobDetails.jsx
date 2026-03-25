import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Mock fetching job details
    setTimeout(() => {
      setJob({ 
        id, 
        title: 'Frontend Developer', 
        company: 'TechCorp', 
        location: 'Remote', 
        salary: '$80k - $120k', 
        description: 'We are looking for an experienced Frontend Developer proficient in React and Tailwind CSS. You will be responsible for building responsive, accessible, and performant web applications. Strong understanding of modern web principles is required.',
        requirements: [
          '3+ years of experience with React',
          'Strong proficiency in JavaScript/TypeScript',
          'Experience with Tailwind CSS',
          'Understanding of REST APIs',
          'Excellent problem-solving skills'
        ],
        postedAt: '2023-10-01'
      });
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'jobseeker') {
      alert('Only job seekers can apply for jobs');
      return;
    }

    setIsApplying(true);
    
    try {
      // Mock API call
      // await api.post('/applications', { job_id: id, resume_url: 'http://example.com/resume.pdf' });
      
      setTimeout(() => {
        setIsApplying(false);
        setApplySuccess(true);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsApplying(false);
      alert('Failed to apply. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!job) {
    return <div className="text-center py-20 text-xl">Job not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <div className="mt-2 flex items-center text-lg text-blue-600 font-medium">
                  {job.company}
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {applySuccess ? (
                  <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 cursor-default">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Applied Successfully
                  </div>
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={isApplying}
                    className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm ${isApplying ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                  >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary}
              </div>
              <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
                Posted {job.postedAt}
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
            <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
              {job.description}
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
              {job.requirements && job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
