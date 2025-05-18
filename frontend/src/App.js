import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Table from './pages/Table';



export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/about" element={<About />} />
            <Route path="/table" element={<Table />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}
