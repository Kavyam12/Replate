import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration';
import DonorDashboard from './pages/DonorDashboard.jsx';
import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteerProfile from './pages/VolunteerProfile';
import VolunteerLayout from './Layouts/VolunteerLayout';
import NgoDashboard from './pages/NgoDashboard';
import LandingPage from './pages/LandingPage.jsx';
import PublicLayout from './Layouts/PublicLayout.jsx';
import DonorDashboardLayout from './Layouts/DonorDashboardlayout.jsx';
import AuthLayout from './Layouts/AuthLayout.jsx';
import FoodListing from './pages/FoodListing.jsx';
import OrdersList from './pages/OrdersList.jsx';
import Salespage from './pages/Salespage.jsx';
// import OrderHistory from './pages/OrderHistory.jsx';
import Settings from './pages/Settings.jsx';
import { UserProvider } from './Context/UserContext.jsx';
import NgoLayout from './Layouts/NgoLayout.jsx';
import NgoCart from './pages/NgoCart.jsx';
import NgoHistory from './pages/NgoHistory.jsx';
import NgoProfile from './pages/NgoProfile.jsx';
import NgoCheckout from './pages/NgoCheckout.jsx';

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout />
      </UserProvider>
    </Router>
  );
}

function Layout() {


  return (
    <div className="container">

      <div className="content">
        <Routes>

          <Route element={<PublicLayout />}>
            <Route path='/' element={<LandingPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/donor' element={<DonorDashboardLayout />}>
              <Route index element={<DonorDashboard />} />
              <Route path='food-listing' element={<FoodListing />} />
              <Route path='orders' element={<OrdersList />} />
              <Route path='sales' element={<Salespage />} />
              {/* <Route path='/donor/orderHistory' element = {<OrderHistory />} /> */}
              <Route path='me' element={<Settings />} />
            </Route>




            <Route path='/ngo' element={<NgoLayout />}>
              <Route index element={<NgoDashboard />} />
              <Route path='cart' element={<NgoCart />} />
              <Route path='checkout' element={<NgoCheckout />} />
              <Route path='history' element={<NgoHistory />} />
              <Route path='me' element={<NgoProfile />} />
            </Route>

            <Route path='/volunteer' element={<VolunteerLayout />}>
              <Route index element={<VolunteerDashboard />} />
              <Route path='me' element={<VolunteerProfile />} />
            </Route>
          </Route>

        </Routes>
      </div>
    </div>
  );
}

export default App;
