import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ } from '../data/content.js';
import './faq.css';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <div className="faq__head">
          <h2 id="faq-title" className="h2">Вопросы перед первым шагом</h2>
          <p className="lead">Коротко о цене, устройстве и правилах. Остальное подскажет мастер внутри курса.</p>
        </div>
        <ul className="faq__list">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`qa glass${isOpen ? ' is-open' : ''}`}>
                <button type="button" className="qa__q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="qa__icon" aria-hidden="true"><Plus size={18} strokeWidth={2.2} /></span>
                </button>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="qa__a" hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
