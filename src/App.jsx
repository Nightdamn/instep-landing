import React from 'react';
import Header from './components/Header.jsx';
import Hero from './sections/Hero.jsx';
import Catalog from './sections/Catalog.jsx';
import Students from './sections/Students.jsx';
import Masters from './sections/Masters.jsx';
import Proof from './sections/Proof.jsx';
import Faq from './sections/Faq.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">К содержанию</a>
      <Header />
      <main id="main">
        <Hero />
        <Catalog />
        <Students />
        <Masters />
        <Proof />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
