import React, { useState } from 'react';
import { CalendarDays, ListChecks, Users, Video } from 'lucide-react';
import { CATEGORIES, REAL_COURSE, EXAMPLE_COURSES, STORE_URL } from '../data/content.js';
import './catalog.css';

const ALL = [REAL_COURSE, ...EXAMPLE_COURSES];

function Fact({ icon: Icon, value, label }) {
  return (
    <span className="fact"><Icon size={15} strokeWidth={2} aria-hidden="true" /><span className="fact__value">{value}</span><span className="fact__label">{label}</span></span>
  );
}

export default function Catalog() {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? ALL : ALL.filter((c) => c.category === cat);

  return (
    <section className="cat" id="courses" aria-labelledby="cat-title">
      <div className="wrap">
        <div className="cat__head">
          <h2 id="cat-title" className="h2">Витрина курсов по направлениям</h2>
          <p className="lead">Сейчас идёт один живой курс. Остальные карточки показывают, какой будет витрина: бесплатные курсы, пробный доступ, потоки с мастером.</p>
        </div>

        <div className="cat__chips" role="tablist" aria-label="Направления">
          <button type="button" role="tab" aria-selected={cat === 'all'} className={`chip${cat === 'all' ? ' is-on' : ''}`} onClick={() => setCat('all')}>Все</button>
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.key} type="button" role="tab" aria-selected={cat === c.key} className={`chip${cat === c.key ? ' is-on' : ''}`} onClick={() => setCat(c.key)}>
                <Icon size={15} strokeWidth={2} aria-hidden="true" />{c.label}
              </button>
            );
          })}
        </div>

        <ul className="cat__grid" aria-live="polite">
          {list.map((c) => {
            const Cat = CATEGORIES.find((x) => x.key === c.category);
            const Icon = Cat?.icon;
            return (
              <li key={c.id} className={`ccard glass${c.isExample ? '' : ' ccard--real'}`}>
                <div className="ccard__top">
                  <span className="ccard__avatar">{c.avatar ? <img src={c.avatar} alt="" /> : Icon && <Icon size={24} strokeWidth={2} />}</span>
                  <span className="ccard__cat">{Cat?.label}</span>
                  <span className={`tag${c.isExample ? '' : ' tag--live'}`}>{c.isExample ? 'пример' : c.badge}</span>
                </div>
                <h3 className="ccard__title">{c.title}</h3>
                <p className="ccard__author">{c.isExample ? c.access : `ведёт ${c.author}, ${c.access}`}</p>
                <p className="ccard__summary">{c.summary}</p>
                <div className="ccard__facts">
                  <Fact icon={CalendarDays} value={c.days} label="дней" />
                  <Fact icon={ListChecks} value={c.practices} label="практик" />
                  {c.calls ? <Fact icon={Video} value={c.calls} label="созвонов" /> : null}
                  {c.enrolled ? <Fact icon={Users} value={c.enrolled} label="участников" /> : null}
                </div>
                <div className="ccard__foot">
                  <span className={`ccard__price${c.price === 'бесплатно' ? ' is-free' : ''}`}>{c.isExample ? c.price : 'поток идёт'}</span>
                  {!c.isExample && <a className="btn btn--ink btn--sm" href={STORE_URL}>Записаться</a>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cat__more">
          <a className="btn btn--ghost" href={STORE_URL}>Открыть магазин курсов</a>
          <p>Магазин открывается после входа в приложение.</p>
        </div>
      </div>
    </section>
  );
}
