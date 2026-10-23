import React from 'react';
import { Percent } from 'lucide-react';
import Phone from '../demo/Phone.jsx';
import ConstructorScreen from '../demo/ConstructorScreen.jsx';
import CabinetScreen from '../demo/CabinetScreen.jsx';
import StoreScreen from '../demo/StoreScreen.jsx';
import { MASTER_PILLARS, MASTER_MODEL, COMPARE, LOGIN_URL } from '../data/content.js';
import './masters.css';

const SCREENS = { builder: <ConstructorScreen />, cabinet: <CabinetScreen />, store: <StoreScreen highlightTop /> };

export default function Masters() {
  return (
    <section className="mas" id="masters" aria-labelledby="mas-title">
      <div className="wrap">
        <div className="mas__head">
          <h2 id="mas-title" className="h2">Мастерам: ведите курс, а не чаты</h2>
          <p className="lead">Соберите курс по дням, ведите поток из кабинета и продавайте через витрину платформы. Без серверов, интеграций и недель настройки.</p>
        </div>

        <div className="mas__pillars">
          {MASTER_PILLARS.map((p, i) => (
            <article key={p.key} className="pillar" style={{ '--i': i }}>
              <Phone label={p.title} height={600}>{SCREENS[p.key]}</Phone>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__text">{p.text}</p>
            </article>
          ))}
        </div>

        <div className="model glass">
          <span className="model__icon"><Percent size={22} strokeWidth={2.2} aria-hidden="true" /></span>
          <div className="model__text">
            <h3 className="model__title">{MASTER_MODEL.title}</h3>
            <p>{MASTER_MODEL.text}</p>
            <p className="model__note">{MASTER_MODEL.note}</p>
          </div>
          <a className="btn btn--ink btn--lg" href={LOGIN_URL}>Стать мастером</a>
        </div>

        <div className="cmp" role="table" aria-label="Сравнение способов вести курс">
          <div className="cmp__row cmp__row--head" role="row">
            <span role="columnheader" className="cmp__label" />
            {COMPARE.columns.map((c, i) => <span key={c} role="columnheader" className={`cmp__cell${i === 0 ? ' cmp__cell--us' : ''}`}>{c}</span>)}
          </div>
          {COMPARE.rows.map((r) => (
            <div key={r.label} className="cmp__row" role="row">
              <span role="rowheader" className="cmp__label">{r.label}</span>
              {r.cells.map((c, i) => <span key={i} role="cell" data-col={COMPARE.columns[i]} className={`cmp__cell${i === 0 ? ' cmp__cell--us' : ''}`}>{c}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
