import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/dashboard/seeker" element={<JobSeekerDashboard />} />
            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/applications/:jobId" element={<Applications />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
