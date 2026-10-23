import React from 'react';
import { REAL_COURSE, TESTIMONIALS } from '../data/content.js';
import './proof.css';

export default function Proof() {
  return (
    <section className="proof" id="proof" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="proof__grid">
          <div className="proof__facts glass">
            <h2 id="proof-title" className="h2 proof__h2">Платформа уже работает</h2>
            <p className="lead">Первый живой курс идёт прямо сейчас. Числа ниже из базы платформы, не из презентации.</p>
            <dl className="nums">
              <div><dt>курс идёт сейчас</dt><dd>1</dd></div>
              <div><dt>участников в двух потоках</dt><dd>{REAL_COURSE.enrolled}</dd></div>
              <div><dt>практик с таймером</dt><dd>{REAL_COURSE.practices - REAL_COURSE.calls}</dd></div>
              <div><dt>созвонов с записями</dt><dd>{REAL_COURSE.calls}</dd></div>
            </dl>
            <p className="proof__master">Курс «{REAL_COURSE.title}» ведёт {REAL_COURSE.author}: два потока стартовали 26 сентября и идут по дням в приложении.</p>
          </div>
          <ul className="proof__quotes">
            {TESTIMONIALS.map((t) => (
              <li key={t.id} className="quote glass">
                <blockquote><p className="quote__text">«{t.quote}»</p></blockquote>
                <footer className="quote__foot">
                  <span className="quote__avatar" aria-hidden="true">{t.name.slice(0, 1)}</span>
                  <span className="quote__who"><span className="quote__name">{t.name}</span><span className="quote__role">{t.role}</span></span>
                </footer>
              </li>
            ))}
            <li className="proof__note">Настоящие отзывы появятся после первого потока. Пока показан формат блока.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
