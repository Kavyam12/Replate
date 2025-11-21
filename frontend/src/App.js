import React from 'react';
import './App.css';
import Navbar from "./components/common/navbar.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration';
import DonorDashboard from './pages/DonorDashboard.jsx';
import VolunteerDashboard from './pages/VolunteerDashboard';
import NgoDashboard from './pages/NgoDashboard';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/registration"];

  return (
    <div className="container">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div className="content">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/donor' element={<DonorDashboard />} />
            <Route path='/volunteer' element={<VolunteerDashboard />} />
            <Route path='/ngo' element={<NgoDashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
