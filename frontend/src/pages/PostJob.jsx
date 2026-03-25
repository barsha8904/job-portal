import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock job posting
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/employer');
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Post a New Job</h2>
            <p className="text-blue-100 text-sm mt-1">Fill out the details to find your next great hire.</p>
          </div>
          
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title <span className="text-red-500">*</span></label>
                  <div className="mt-1">
                    <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="e.g. Senior Frontend Developer" />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
                  <div className="mt-1">
                    <input type="text" name="company" id="company" required value={formData.company} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location <span className="text-red-500">*</span></label>
                  <div className="mt-1">
                    <input type="text" name="location" id="location" required value={formData.location} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="e.g. Remote, San Francisco, CA" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <div className="mt-1">
                    <input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border" placeholder="e.g. $80k - $120k / year" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description <span className="text-red-500">*</span></label>
                  <div className="mt-1">
                    <textarea id="description" name="description" rows="8" required value={formData.description} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3" placeholder="Describe the role, responsibilities, and requirements..."></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-5 flex justify-end space-x-3">
                <button type="button" onClick={() => navigate(-1)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}>
                  {isLoading ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
