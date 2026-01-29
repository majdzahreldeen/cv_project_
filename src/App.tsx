import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Achievements from './components/Achievements';
import CVBuilder from './components/CVBuilder/CVBuilder';
import Analysis from './components/Analysis';
import Navigation from './components/Navigation';
import Pricing from './components/Payment/Pricing';
import PaymentStatus from './components/Payment/PaymentStatus';

function Layout() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active section with current path
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    if (['create', 'analyze', 'pricing'].includes(path)) {
      setActiveSection(path);
    } else {
      setActiveSection('home');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Hide Navigation on specific paths like payment result if desired, or keep it */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="relative">
        <Routes>
          <Route path="/" element={
            <>
              <Hero scrollY={scrollY} />
              <Achievements />
            </>
          } />
          <Route path="/create" element={<CVBuilder />} />
          <Route path="/analyze" element={<Analysis />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment/success" element={<PaymentStatus />} />
          <Route path="/payment/cancel" element={<PaymentStatus />} />
        </Routes>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
