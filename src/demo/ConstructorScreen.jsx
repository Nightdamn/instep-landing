import React, { useState } from 'react';
import { ChevronLeft, Timer, BookOpen, Video, ClipboardCheck, Plus, Check } from 'lucide-react';

// Мини-версия конструктора курса (CreateCourse/EditCourse): дни, практики, типы, автосохранение.
const TYPES = [
  { key: 'media', label: 'Таймер', icon: Timer },
  { key: 'theory', label: 'Теория', icon: BookOpen },
  { key: 'call', label: 'Созвон', icon: Video },
  { key: 'task', label: 'Задание', icon: ClipboardCheck },
];
const ICON = Object.fromEntries(TYPES.map((t) => [t.key, t.icon]));

const START = [
  { day: 1, items: [{ key: 'media', label: 'Этюд: небо, 15 мин' }, { key: 'theory', label: 'Как держать кисть' }] },
  { day: 2, items: [{ key: 'media', label: 'Этюд: вода, 20 мин' }, { key: 'call', label: 'Разбор работ, 19:00' }] },
];

export default function ConstructorScreen({ onBack }) {
  const [days, setDays] = useState(START);
  const [saved, setSaved] = useState(true);

  const add = (key) => {
    const label = { media: 'Практика, 15 мин', theory: 'Теория', call: 'Созвон, 19:00', task: 'Задание' }[key];
    setDays((d) => (d.some((x) => x.day === 3)
      ? d.map((x) => (x.day === 3 ? { ...x, items: [...x.items, { key, label }] } : x))
      : [...d, { day: 3, items: [{ key, label }] }]));
    setSaved(false);
    setTimeout(() => setSaved(true), 900);
  };

  return (
    <div className="scr">
      <div className="scr__top glass-strong">
        <button type="button" className="scr__back" onClick={onBack} aria-label="Назад"><ChevronLeft size={22} strokeWidth={2} /></button>
        <div className="scr__title">Акварель</div>
        <span className={`saved${saved ? ' is-on' : ''}`} aria-live="polite">{saved ? <><Check size={12} strokeWidth={3} /> Сохранено</> : 'Сохраняю…'}</span>
      </div>

      <div className="scr__body">
        <div className="ctor__meta">
          <span className="ctor__chip">21 день</span>
          <span className="ctor__chip">Поток, старт по дате</span>
        </div>
        <ul className="ctor">
          {days.map((d) => (
            <li key={d.day} className="ctor__day glass">
              <div className="ctor__day-head">День {d.day}</div>
              <ul className="ctor__items">
                {d.items.map((it, i) => {
                  const Icon = ICON[it.key];
                  return (
                    <li key={i} className="ctor__item"><Icon size={14} strokeWidth={2.2} aria-hidden="true" /><span>{it.label}</span></li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        <div className="ctor__add">
          <div className="ctor__add-label"><Plus size={14} strokeWidth={2.4} aria-hidden="true" /> Добавить в день 3</div>
          <div className="ctor__types">
            {TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.key} type="button" className="ctor__type" onClick={() => add(t.key)}>
                  <Icon size={14} strokeWidth={2.2} aria-hidden="true" />{t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
