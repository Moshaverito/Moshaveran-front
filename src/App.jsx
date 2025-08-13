// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

import Layout from './components/layout/Layout';

import { GoftinoSnippet } from '@mohsen007/react-goftino';
import RegistrationPage from './pages/Signup';
import CounselorWaitlist from './pages/MoshaverWait';
import ConsultantProfile from './pages/ConsultantProfile';
import TherapistQuestionnaire from './pages/TherapistQuestionnaire';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFoundPage';
import AboutUs from './pages/AboutUs';

import MoshaverAvailabilityPage from './pages/moshaverReservation';
import TherapistHomePage from './pages/HomePage';
import TermsAndConditionsPage from './pages/TermsAndConditions';
import ContactUsPage from './pages/ContacUs';
import MoshaverProfile from './pages/UserProfile';
import PersianHadithSpiritualPage from './pages/hh';
import PlansPage from './pages/plans';
import NotificationsPage from './pages/notifications';
import LiveKitPage from './pages/test';
import WorkWithUsPage from './pages/workWithUs';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return !!(accessToken && refreshToken);
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const GOFTINO_KEY = "qn3s7J";


  // Check login status
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    // checks axios access token validity
    if (accessToken && refreshToken) {
      fetch('https://api.moshaveritoo.ir/api/accounts/token/validate-token/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(true);
          }
          else {
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('isLoggedIn', false);
          }
        })
        .catch((error) => {
          console.error('Failed to validate token:', error);
          setIsLoggedIn(false);
        });
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);



  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <GoftinoSnippet
        goftinoKey={GOFTINO_KEY}
        onReady={() => window.Goftino.close()}
      />
      <div >
        <Layout
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
        >
          <Routes>
            {/* Login Routes */}
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<TherapistHomePage />} />
            <Route path="/Profile" element={<MoshaverProfile setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/ConsultantProfile" element={<ConsultantProfile />} />
            <Route path="/TQuestionnaire" element={<TherapistQuestionnaire />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditionsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/plans" element={<PlansPage />} />

            {/* Public pages */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/wait" element={<CounselorWaitlist />} />
            <Route path="/test" element={<LiveKitPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/joinUs" element={<WorkWithUsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/setAvailability" element={<MoshaverAvailabilityPage setIsLoggedIn={setIsLoggedIn} />} />
            {/* <Route path="/mosha" element={<MoshaverReservationPage setIsLoggedIn={setIsLoggedIn} />} /> */}


          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
