import React from 'react';
import Header from './components/Header.jsx';
import Hero from './sections/Hero.jsx';
import Day from './sections/Day.jsx';
import Sections from './sections/Sections.jsx';
import Courses from './sections/Courses.jsx';
import Reviews from './sections/Reviews.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">К содержанию</a>
      <Header />
      <main id="main">
        <Hero />
        <Day />
        <Sections />
        <Courses />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
