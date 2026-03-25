import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // In a real app:
        // const res = await api.get('/jobs');
        // setJobs(res.data);
        
        // Mock data for display
        setTimeout(() => {
          setJobs([
            { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$80k - $120k', description: 'React and Tailwind experience needed.' },
            { id: 2, title: 'Backend Node Engineer', company: 'DataStream', location: 'New York, NY', salary: '$100k - $140k', description: 'Node.js, Express, PostgreSQL expert.' },
            { id: 3, title: 'Full Stack Developer', company: 'StartupInc', location: 'San Francisco, CA', salary: '$120k - $160k', description: 'MERN stack or similar required.' },
            { id: 4, title: 'UI/UX Designer', company: 'CreativeSpace', location: 'Remote', salary: '$70k - $100k', description: 'Figma master shaping user experiences.' },
          ]);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching jobs', error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Explore Jobs</h1>
            <p className="mt-2 text-sm text-gray-600">Find the perfect role to advance your career.</p>
          </div>
          
          <div className="mt-4 md:mt-0 max-w-md w-full">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3"
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full transform hover:-translate-y-1 duration-200">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{job.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-blue-600">{job.company}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.salary}
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                    {job.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
