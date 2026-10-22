import React from 'react';
import { CalendarDays, ListChecks, Users } from 'lucide-react';
import { REAL_COURSE, EXAMPLE_COURSES, LOGIN_URL } from '../data/content.js';
import './courses.css';

function Fact({ icon: Icon, value, label }) {
  return (
    <span className="fact">
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      <span className="fact__value">{value}</span>
      <span className="fact__label">{label}</span>
    </span>
  );
}

export default function Courses() {
  return (
    <section className="courses" id="courses" aria-labelledby="courses-title">
      <div className="wrap">
        <div className="courses__head">
          <h2 id="courses-title" className="h2">Курсы на платформе</h2>
          <p className="lead">Сейчас идёт один живой курс. Остальные карточки показывают, какие направления может собрать мастер.</p>
        </div>

        <div className="courses__grid">
          <article className="course course--real glass">
            <div className="course__top">
              <span className="course__avatar"><img src={REAL_COURSE.avatar} alt="" /></span>
              <div className="course__titles">
                <h3 className="course__title">{REAL_COURSE.title}</h3>
                <p className="course__author">ведёт {REAL_COURSE.author}</p>
              </div>
              <span className="tag tag--live">идёт сейчас</span>
            </div>
            <p className="course__summary">{REAL_COURSE.summary}</p>
            <div className="course__facts">
              <Fact icon={CalendarDays} value={REAL_COURSE.days} label="дней" />
              <Fact icon={ListChecks} value={REAL_COURSE.practices} label="практик" />
              <Fact icon={Users} value={REAL_COURSE.enrolled} label="участников в двух потоках" />
            </div>
            <a className="btn btn--ink" href={LOGIN_URL}>Открыть в магазине курсов</a>
          </article>

          {EXAMPLE_COURSES.map((c) => (
            <article key={c.id} className="course course--example glass">
              <div className="course__top">
                <span className="course__avatar"><img src={c.avatar} alt="" /></span>
                <div className="course__titles">
                  <h3 className="course__title">{c.title}</h3>
                  <p className="course__author">{c.author}</p>
                </div>
                <span className="tag">пример</span>
              </div>
              <p className="course__summary">{c.summary}</p>
              <div className="course__facts">
                <Fact icon={CalendarDays} value={c.days} label="дней" />
                <Fact icon={ListChecks} value={c.practices} label="практик" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
