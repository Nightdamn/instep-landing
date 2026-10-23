import React, { useState } from 'react';
import { ChevronLeft, TrendingUp } from 'lucide-react';
import { CATEGORIES, REAL_COURSE, EXAMPLE_COURSES } from '../data/content.js';

// Мини-версия магазина курсов (CourseStore.jsx): направления, список, цена или «бесплатно».
const ROWS = [REAL_COURSE, ...EXAMPLE_COURSES.slice(0, 4)];

export default function StoreScreen({ onBack, highlightTop = false }) {
  const [cat, setCat] = useState('all');
  const rows = cat === 'all' ? ROWS : ROWS.filter((r) => r.category === cat);

  return (
    <div className="scr">
      <div className="scr__top glass-strong">
        <button type="button" className="scr__back" onClick={onBack} aria-label="Назад"><ChevronLeft size={22} strokeWidth={2} /></button>
        <div className="scr__title">Магазин курсов</div>
        <span style={{ width: 42 }} />
      </div>

      <div className="scr__body">
        <div className="store__cats" role="tablist" aria-label="Направления">
          <button type="button" role="tab" aria-selected={cat === 'all'} className={`store__cat${cat === 'all' ? ' is-on' : ''}`} onClick={() => setCat('all')}>Все</button>
          {CATEGORIES.slice(0, 5).map((c) => (
            <button key={c.key} type="button" role="tab" aria-selected={cat === c.key} className={`store__cat${cat === c.key ? ' is-on' : ''}`} onClick={() => setCat(c.key)}>{c.label}</button>
          ))}
        </div>

        <ul className="scr__list">
          {rows.map((r, i) => {
            const Cat = CATEGORIES.find((c) => c.key === r.category);
            const Icon = Cat?.icon;
            return (
              <li key={r.id}>
                <div className={`prac glass${highlightTop && i === 1 ? ' is-active' : ''}`}>
                  <span className="prac__icon">{r.avatar ? <img src={r.avatar} alt="" /> : Icon && <Icon size={22} strokeWidth={2} color="#27ae60" />}</span>
                  <span className="prac__text">
                    <span className="prac__label">{r.title}</span>
                    <span className="prac__meta">{r.isExample ? Cat?.label : r.author}, {r.days} дн.</span>
                  </span>
                  <span className="price">{!r.isExample ? 'поток' : r.price}</span>
                </div>
                {highlightTop && i === 1 && <div className="store__top"><TrendingUp size={12} strokeWidth={2.4} aria-hidden="true" /> продвижение в первые строки, пример</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
