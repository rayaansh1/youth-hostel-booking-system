import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmPage from './pages/BookingConfirmPage';
import { GalleryPage, ContactPage } from './pages/GalleryContact';
import ExplorePage from './pages/ExplorePage';
import ReviewsPage from './pages/ReviewsPage';
import AvailabilityPage from './pages/AvailabilityPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/book/:roomId" element={<BookingPage />} />
          <Route path="/booking-confirm" element={<BookingConfirmPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:placeId" element={<ExplorePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/availability" element={<AvailabilityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
