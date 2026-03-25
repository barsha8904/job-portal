import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Applications = () => {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [jobInfo, setJobInfo] = useState({ title: '', status: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetching applications for a specific job
    setTimeout(() => {
      setJobInfo({ title: 'Frontend Developer', status: 'Active' });
      setCandidates([
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', appliedAt: '2023-10-15', status: 'pending', resumeUrl: '#' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', appliedAt: '2023-10-14', status: 'reviewed', resumeUrl: '#' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', appliedAt: '2023-10-10', status: 'rejected', resumeUrl: '#' },
      ]);
      setIsLoading(false);
    }, 600);
  }, [jobId]);

  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(candidates.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    ));
    // Here we would also make an API call to update the status in the backend
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/dashboard/employer" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicants for {jobInfo.title}</h1>
            <p className="text-gray-500 mt-1">Total {candidates.length} candidates applied</p>
          </div>
          <span className={`mt-4 sm:mt-0 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${jobInfo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            Job Status: {jobInfo.status}
          </span>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                <div className="px-4 py-6 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex justify-center items-center text-indigo-700 font-bold text-xl flex-shrink-0">
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {candidate.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                        </svg>
                        Applied on {candidate.appliedAt}
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <a href={candidate.resumeUrl} className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <svg className="-ml-1 mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          View Resume
                        </a>
                        
                        <div className="relative">
                          <select
                            value={candidate.status}
                            onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                            className={`block w-full pl-3 pr-8 py-1 text-xs border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${getStatusBadge(candidate.status)}`}
                          >
                            <option value="pending" className="bg-white text-gray-900">Pending</option>
                            <option value="reviewed" className="bg-white text-gray-900">Reviewed</option>
                            <option value="accepted" className="bg-white text-gray-900">Accepted</option>
                            <option value="rejected" className="bg-white text-gray-900">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Applications;
