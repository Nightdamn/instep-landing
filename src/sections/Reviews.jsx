import React from 'react';
import { TESTIMONIALS } from '../data/content.js';
import './reviews.css';

export default function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className="reviews__head">
          <h2 id="reviews-title" className="h2">Отзывы</h2>
          <p className="lead">Первый поток «Осознанной Походки» ещё идёт, настоящие отзывы появятся после него. Ниже показан формат блока на примерах.</p>
        </div>
        <ul className="reviews__list">
          {TESTIMONIALS.map((t, i) => (
            <li key={t.id} className={`quote glass quote--${i}`}>
              <blockquote>
                <p className="quote__text">«{t.quote}»</p>
              </blockquote>
              <footer className="quote__foot">
                <span className="quote__avatar" aria-hidden="true">{t.name.slice(0, 1)}</span>
                <span className="quote__who">
                  <span className="quote__name">{t.name}</span>
                  <span className="quote__role">{t.role}</span>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
