import React from 'react';
import { Users, ListChecks, Video, Layers } from 'lucide-react';
import { REAL_COURSE, TESTIMONIALS } from '../data/content.js';
import './proof.css';

function Fact({ icon: Icon, value, label }) {
  return (
    <li className="pfact">
      <span className="pfact__icon"><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
      <span className="pfact__value">{value}</span>
      <span className="pfact__label">{label}</span>
    </li>
  );
}

export default function Proof() {
  return (
    <section className="proof" id="proof" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="proof__grid">
          <div className="proof__facts glass">
            <h2 id="proof-title" className="h2 proof__h2">Платформа уже работает</h2>
            <p className="lead">Первый живой курс идёт прямо сейчас: {REAL_COURSE.activeGroup} занимался на этой неделе. Числа из базы платформы, не из презентации.</p>
            <ul className="pfacts" aria-label="Числа платформы">
              <Fact icon={Users} value={REAL_COURSE.enrolled} label="участников в двух потоках" />
              <Fact icon={ListChecks} value={REAL_COURSE.practices} label={`практик в курсе, из них ${REAL_COURSE.calls} созвонов`} />
              <Fact icon={Video} value={REAL_COURSE.recordings} label="записей созвонов лежат в своих днях" />
              <Fact icon={Layers} value={REAL_COURSE.days} label="дней длится курс" />
            </ul>
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
