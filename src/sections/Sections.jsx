import React from 'react';
import {
  BookOpen, ShoppingBag, Target, MessageCircle, Map, Lightbulb,
  Blocks, Users, ClipboardCheck, Library, Layers, UserPlus,
} from 'lucide-react';
import { SECTIONS } from '../data/content.js';
import './sections.css';

const ICONS = {
  my_courses: BookOpen, store: ShoppingBag, trackers: Target, ask: MessageCircle, map: Map, recs: Lightbulb,
  builder: Blocks, cabinet: Users, reviews: ClipboardCheck, library: Library, groups: Layers, invite: UserPlus,
};

function List({ title, items }) {
  return (
    <div className="secs__col">
      <h3 className="secs__who">{title}</h3>
      <ul className="secs__list">
        {items.map((s) => {
          const Icon = ICONS[s.key];
          return (
            <li key={s.key} className="secs__item">
              <span className="secs__icon"><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
              <span className="secs__text">
                <span className="secs__title">{s.title}</span>
                <span className="secs__desc">{s.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Sections() {
  return (
    <section className="secs" id="sections" aria-labelledby="sections-title">
      <div className="wrap">
        <div className="secs__head">
          <h2 id="sections-title" className="h2">Что есть внутри</h2>
          <p className="lead">Разделы приложения, как они называются в меню. У ученика и у мастера свой набор.</p>
        </div>
        <div className="secs__grid glass">
          <List title="Ученику" items={SECTIONS.student} />
          <List title="Мастеру" items={SECTIONS.master} />
        </div>
      </div>
    </section>
  );
}
