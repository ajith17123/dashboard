import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/home.css";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  FaUserGraduate,
  FaUsers,
  FaBriefcase,
  FaCalendarCheck
} from "react-icons/fa";

import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Layers, 
  CheckSquare, FileSpreadsheet, Briefcase, BarChart3, Settings
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

// Custom Area Chart Tooltip Component
const CustomAreaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <p className="label">{label}</p>
        <p className="value">{`${payload[0].value} Students`}</p>
      </div>
    );
  }
  return null;
};

// Custom Bar Chart Tooltip Component
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip">
        <p className="label">{label}</p>
        <p className="value" style={{ color: '#7C3AED' }}>{`${payload[0].value}% Placed`}</p>
      </div>
    );
  }
  return null;
};

function Home () {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const sidebar = [
    {id: 1, name: "DashBoard", path: '/', icon: LayoutDashboard},
    {id: 2, name: "Students", path: '/', icon: Users },
    {id: 3, name: "Trainers", path: '/', icon: GraduationCap},
    {id: 4, name: "Courses", path: '/', icon: BookOpen},
    {id: 5, name: "Batches", path: '/', icon: Layers},
    {id: 6, name: "Attendance", path: '/', icon: CheckSquare},
    {id: 7, name: "Assessment", path: '/', icon: FileSpreadsheet},
    {id: 8, name: "Placement", path: '/', icon: Briefcase},
    {id: 9, name: "Reports", path: '/', icon: BarChart3},
    {id: 10, name: "Settings", path: '/', icon: Settings},
  ];

  const enrolmentData = [
    { month: "Jan", students: 80 },
    { month: "Feb", students: 95 },
    { month: "Mar", students: 120 },
    { month: "Apr", students: 140 },
    { month: "May", students: 180 },
    { month: "Jun", students: 210 }
  ];

  const placementData = [
    { course: "MERN", placement: 90 },
    { course: "Python", placement: 85 },
    { course: "Java", placement: 88 },
    { course: "Data Science", placement: 93 }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="d-flex">
              <button className="btn-toggle"
              type='button'
              data-bs-toggle="offcanvas"
              data-bs-target="#side-menu"
              >
               <span className="navbar-toggler-icon"></span>   
              </button>
               <Link className="navbar-brand" to="/">Talent OS</Link>
          </div>
            <form className='form-search d-flex' role='search' onSubmit={(e) => e.preventDefault()} >
              <input className='form-control' type='search' placeholder='Search' />
               <button className='btn-search' type='submit'>
                  <i className="bi bi-search"></i>
               </button>
            </form>
          
          <div className="d-flex align-items-center nav-icons">
             <button className="btn-nav" type='button'>
                 <i className="bi bi-bell"></i>
             </button>
             <Link className='btn-link' to="/profile">
               <i className="bi bi-person"></i>
             </Link>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-start" id='side-menu'>
         <div className="offcanvas-header">
            <h5 className='offcanvas-title'>Institute Admin</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
         </div>
         <div className="offcanvas-body">
            <ul className="list-unstyled">
              {sidebar.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id} className='nav-item '>
                    <Link to={item.path} className='nav-links d-flex align-items-center' data-bs-dismiss="offcanvas">
                      <IconComponent size={18} className="sidebar-icon" />
                      <span className='li-span'>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className='nav-bottom text-center'>
                &copy; 2026 Institute Admin Dashboard
            </div>
         </div>
      </div>

      <main className="dashboard-container" data-aos="fade-up">
        {/* Welcome Header */}
        <div className="row mb-4">
          <div className="col-12 text-start">
            <h1 className="dashboard-title">Institute Admin Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, Admin! Here's the performance summary of your institute.</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
          {/* Card 1: Students */}
          <div className="col">
            <div className="stat-card students">
              <div className="stat-header">
                <span className="stat-title">Total Students</span>
                <div className="stat-icon-container">
                  <FaUserGraduate />
                </div>
              </div>
              <div className="stat-body text-start">
                <h3 className="stat-value">1,250</h3>
                <span className="stat-change">↑ 12% vs last month</span>
              </div>
            </div>
          </div>

          {/* Card 2: Batches */}
          <div className="col">
            <div className="stat-card batches">
              <div className="stat-header">
                <span className="stat-title">Active Batches</span>
                <div className="stat-icon-container">
                  <FaUsers />
                </div>
              </div>
              <div className="stat-body text-start">
                <h3 className="stat-value">48</h3>
                <span className="stat-change">↑ 4 new this week</span>
              </div>
            </div>
          </div>

          {/* Card 3: Placement */}
          <div className="col">
            <div className="stat-card placement">
              <div className="stat-header">
                <span className="stat-title">Placement %</span>
                <div className="stat-icon-container">
                  <FaBriefcase />
                </div>
              </div>
              <div className="stat-body text-start">
                <h3 className="stat-value">92%</h3>
                <span className="stat-change">↑ 5% increase YoY</span>
              </div>
            </div>
          </div>

          {/* Card 4: Attendance */}
          <div className="col">
            <div className="stat-card attendance">
              <div className="stat-header">
                <span className="stat-title">Attendance %</span>
                <div className="stat-icon-container">
                  <FaCalendarCheck />
                </div>
              </div>
              <div className="stat-body text-start">
                <h3 className="stat-value">88%</h3>
                <span className="stat-change">↑ 2% vs last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-4">
          {/* Monthly Enrolment */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-start">
            <div className="chart-container-card">
              <div className="chart-title-area">
                <div>
                  <h5 className="chart-title">Monthly Enrolment</h5>
                  <span className="chart-subtitle">Student registrations for the last 6 months</span>
                </div>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrolmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip content={<CustomAreaTooltip />} />
                    <Area type="monotone" dataKey="students" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Placement Analytics */}
          <div className="col-12 col-lg-6 text-start">
            <div className="chart-container-card">
              <div className="chart-title-area">
                <div>
                  <h5 className="chart-title">Placement Analytics</h5>
                  <span className="chart-subtitle">Placement rates across core domains</span>
                </div>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="course" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis unit="%" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Bar dataKey="placement" name="Placement Rate" fill="#7C3AED" radius={[6, 6, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Trends Section */}
        <div className="row text-start">
          <div className="col-12">
            <div className="attendance-card">
              <div className="chart-title-area">
                <div>
                  <h5 className="chart-title">Attendance Trends</h5>
                  <span className="chart-subtitle">Daily attendance status summary</span>
                </div>
              </div>
              <div className="attendance-metrics-grid">
                {/* Present */}
                <div className="attendance-metric-item">
                  <div className="attendance-label text-start">Present</div>
                  <div className="attendance-value present text-start">88%</div>
                  <div className="progress">
                    <div 
                      className="progress-bar bg-success progress-bar-striped progress-bar-animated progress-bar-animated-custom" 
                      role="progressbar" 
                      style={{ width: '88%' }} 
                      aria-valuenow={88} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>

                {/* Absent */}
                <div className="attendance-metric-item">
                  <div className="attendance-label text-start">Absent</div>
                  <div className="attendance-value absent text-start">8%</div>
                  <div className="progress">
                    <div 
                      className="progress-bar bg-danger progress-bar-striped progress-bar-animated progress-bar-animated-custom" 
                      role="progressbar" 
                      style={{ width: '8%' }} 
                      aria-valuenow={8} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>

                {/* Leave */}
                <div className="attendance-metric-item">
                  <div className="attendance-label text-start">Leave</div>
                  <div className="attendance-value leave text-start">4%</div>
                  <div className="progress">
                    <div 
                      className="progress-bar bg-warning progress-bar-striped progress-bar-animated progress-bar-animated-custom" 
                      role="progressbar" 
                      style={{ width: '4%' }} 
                      aria-valuenow={4} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;