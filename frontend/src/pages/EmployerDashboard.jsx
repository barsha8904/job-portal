import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Mock fetching employer's jobs
    setTimeout(() => {
      setPostedJobs([
        { id: 1, title: 'Frontend Developer', applicants: 12, status: 'Active', postedAt: '2023-10-01' },
        { id: 2, title: 'UI/UX Designer', applicants: 5, status: 'Closed', postedAt: '2023-09-15' },
      ]);
      setIsLoading(false);
    }, 600);
  }, []);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this job?')) {
      setPostedJobs(postedJobs.filter(job => job.id !== id));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="text-gray-600">Company: {user?.name || 'Company Name'}</p>
          </div>
          <Link to="/post-job" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post a New Job
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Your Posted Jobs</h3>
            <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-bold">{postedJobs.length} Jobs</span>
          </div>
          
          {postedJobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {postedJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/applications/${job.id}`} className="text-sm text-blue-600 hover:text-blue-900 font-medium underline">
                          {job.applicants} candidates
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.postedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/edit-job/${job.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                        <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-gray-500">
               No jobs posted yet. Start by creating your first job listing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
