import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, Server, FileText, Pause, MessageCircle, ListChecks, Repeat } from 'lucide-react';
import Phone from '../demo/Phone.jsx';
import TimerScreen from '../demo/TimerScreen.jsx';
import CallScreen from '../demo/CallScreen.jsx';
import TaskScreen from '../demo/TaskScreen.jsx';
import CabinetScreen from '../demo/CabinetScreen.jsx';
import { STOPS } from './stops.js';
import { LOGIN_URL } from '../data/content.js';
import './day.css';

function useActiveStop(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

// Лента прилипла под шапкой: высокий сторож над лентой целиком ушёл выше низа шапки.
function useStuck(ref) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const hdr = document.querySelector('.hdr');
    const h = hdr ? hdr.offsetHeight : 68;
    // Считаем по геометрии сторожа, а не по флагу пересечения: при смене размера окна
    // наблюдатель может прислать переходное событие с пустыми границами корня.
    const io = new IntersectionObserver(([e]) => {
      setStuck(e.boundingClientRect.bottom <= h);
    }, { rootMargin: `-${h}px 0px 0px 0px`, threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return stuck;
}

function TimeLabel({ stop }) {
  const Icon = stop.icon;
  return (
    <p className="stop-sec__time"><Icon size={16} strokeWidth={2.2} aria-hidden="true" /> {stop.time}</p>
  );
}

export default function Day() {
  const ids = useRef(STOPS.map((s) => s.id)).current;
  const active = useActiveStop(ids);
  const idx = Math.max(0, ids.indexOf(active));
  const sentinelRef = useRef(null);
  const rowRef = useRef(null);
  const stuck = useStuck(sentinelRef);
  const [callMode, setCallMode] = useState('before');

  // В прилипшем состоянии на узких экранах держим текущую остановку в кадре ленты.
  // Прокручиваем только сам ряд по горизонтали, страницу не трогаем.
  useEffect(() => {
    const row = rowRef.current;
    if (!stuck || !row || row.scrollWidth <= row.clientWidth) return;
    const cur = row.querySelector('[aria-current="true"]');
    if (!cur) return;
    const rowRect = row.getBoundingClientRect();
    const curRect = cur.getBoundingClientRect();
    const left = row.scrollLeft + (curRect.left - rowRect.left) - (rowRect.width - curRect.width) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active, stuck]);

  const byId = Object.fromEntries(STOPS.map((s) => [s.id, s]));

  return (
    <div className="day" id="how" style={{ '--progress': (idx + 0.5) / STOPS.length }}>
      <div ref={sentinelRef} className="day__sentinel" aria-hidden="true" />

      <nav className={`dayrail${stuck ? ' is-stuck' : ''}`} aria-label="Один день курса">
        <div className="wrap">
          <ol className="dayrail__row" ref={rowRef}>
            {STOPS.map((s, i) => {
              const Icon = s.icon;
              const state = i < idx ? 'done' : i === idx ? 'now' : 'next';
              return (
                <li key={s.id} className="dayrail__item" style={{ '--i': i }}>
                  <a href={`#${s.id}`} className={`dayrail__stop is-${state}`} aria-current={state === 'now' ? 'true' : undefined}>
                    <span className="dayrail__dot">{state === 'done' ? <Check strokeWidth={3} /> : <Icon strokeWidth={2} />}</span>
                    <span className="dayrail__label">
                      <span className="dayrail__time">{s.time}</span>
                      <span className="dayrail__title">{s.title}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="dayrail__track" aria-hidden="true"><div className="dayrail__fill" /></div>
      </nav>

      {/* Утром: практика с таймером */}
      <section className="stop-sec" id="morning" aria-labelledby="morning-title">
        <div className="wrap stop-sec__split">
          <div className="stop-sec__copy">
            <TimeLabel stop={byId.morning} />
            <h2 id="morning-title" className="h2">Практика с таймером</h2>
            <p className="lead">Открываете день, нажимаете практику, и таймер идёт вместе с видео мастера. Экран не гаснет, прогресс сохраняется каждые десять секунд. Дошли до конца, и практика отмечена на сегодняшнем дне.</p>
            <ul className="facts">
              <li>Видео, аудио, картинка или только таймер, как задал мастер</li>
              <li>Перемотка кольцом двигает видео, и наоборот</li>
              <li>Карта курса показывает все дни, статистика считает минуты</li>
            </ul>
          </div>
          <div className="stop-sec__media">
            <Phone label="Экран таймера" height={600}><TimerScreen /></Phone>
          </div>
        </div>
      </section>

      {/* Днём: теория */}
      <section className="stop-sec stop-sec--theory" id="theory" aria-labelledby="theory-title">
        <div className="wrap">
          <div className="theory__head">
            <TimeLabel stop={byId.theory} />
            <h2 id="theory-title" className="h2">Теория</h2>
            <p className="lead">Текст от мастера с картинками и ссылками читается в любой день курса, не только в свой. Внизу одна кнопка.</p>
          </div>
          <article className="theory glass" aria-label="Пример текста теории">
            <div className="theory__bar">
              <span className="theory__back" aria-hidden="true"><ChevronLeft size={20} strokeWidth={2} /></span>
              <span className="theory__title">Опора и шаг</span>
              <span className="tag">пример текста</span>
            </div>
            <div className="theory__body">
              <h3>Откуда начинается шаг</h3>
              <p>Шаг начинается не со стопы, а с переноса веса. Прежде чем нога оторвётся от земли, вес уже ушёл на опорную. Если это замечать, походка перестаёт быть падением вперёд.</p>
              <figure className="theory__figure">
                <img src="/icons/standing.svg" alt="Схема: вес на опорной ноге перед шагом" />
                <figcaption>Вес на опорной ноге до того, как вторая оторвётся от земли</figcaption>
              </figure>
              <p>Сегодня на прогулке отметьте три перехода веса подряд. Не ускоряйтесь и не замедляйтесь, просто заметьте.</p>
              <ul>
                <li>Пятка касается первой</li>
                <li>Вес проходит через середину стопы</li>
                <li>Отталкивание с подушечки</li>
              </ul>
            </div>
            <div className="theory__foot">
              <span className="pill pill--ink pill--full"><Check size={16} strokeWidth={2.6} /> Изучено</span>
            </div>
          </article>
        </div>
      </section>

      {/* Вечером: онлайн с мастером */}
      <section className="stop-sec" id="call" aria-labelledby="call-title">
        <div className="wrap stop-sec__split stop-sec__split--rev">
          <div className="stop-sec__media">
            <Phone label="Экран онлайн-практики" height={540}><CallScreen mode={callMode} onToggle={() => setCallMode((m) => (m === 'before' ? 'after' : 'before'))} /></Phone>
          </div>
          <div className="stop-sec__copy">
            <TimeLabel stop={byId.call} />
            <h2 id="call-title" className="h2">Онлайн с мастером</h2>
            <p className="lead">Созвон назначен на день курса. До начала виден обратный отсчёт, вход открывается за пять минут. После встречи запись появляется в этой же практике сама. Кто пропустил, смотрит запись, и день засчитывается.</p>
            <ul className="facts facts--icons">
              <li><Server size={18} strokeWidth={2} aria-hidden="true" /> Свой видеосервер, без сторонних аккаунтов и ссылок в чатах</li>
              <li><FileText size={18} strokeWidth={2} aria-hidden="true" /> Запись подписана курсом, группой и днём</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Перед сном: задание */}
      <section className="stop-sec" id="task" aria-labelledby="task-title">
        <div className="wrap">
          <div className="task-sec">
            <aside className="note note--left">
              <h3>Файлы до 200 МБ</h3>
              <p>Видео, фото, аудио прикладываются как есть, без перекодирования.</p>
            </aside>
            <div className="task-sec__center">
              <TimeLabel stop={byId.task} />
              <h2 id="task-title" className="h2">Задание</h2>
              <p className="lead">Ответ текстом и файлами. Мастер засчитывает или возвращает с комментарием, статус виден в той же карточке.</p>
              <Phone label="Экран задания" height={560}><TaskScreen /></Phone>
            </div>
            <aside className="note note--right">
              <h3>Не держит день</h3>
              <p>Невыполненное задание остаётся в списке, пока не сделано. Остальные практики идут своим чередом.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* Вечер мастера */}
      <section className="stop-sec stop-sec--master" id="master" aria-labelledby="master-title">
        <div className="wrap">
          <div className="master__head">
            <TimeLabel stop={byId.master} />
            <h2 id="master-title" className="h2">Группа по дням, ответы списком</h2>
            <p className="lead">Мастер видит, кто на каком дне, кто на паузе, и проверяет задания за один вечер. Созвоны создаются при настройке потока, напоминать никому не нужно.</p>
          </div>
          <div className="master__phones">
            <Phone label="Кабинет тренера" height={560}><CabinetScreen /></Phone>
            <Phone label="Проверка задания мастером" height={560}><TaskScreen master /></Phone>
          </div>
          <ul className="master__list">
            <li><ListChecks size={18} strokeWidth={2} aria-hidden="true" /> Конструктор курса: дни, практики, медиа, расписание. Сохраняется сам.</li>
            <li><Pause size={18} strokeWidth={2} aria-hidden="true" /> Пауза ученика и индивидуальные практики на конкретный день.</li>
            <li><MessageCircle size={18} strokeWidth={2} aria-hidden="true" /> Личные сообщения с каждым учеником внутри курса.</li>
            <li><Repeat size={18} strokeWidth={2} aria-hidden="true" /> Банк практик: собранное один раз переносится в новый поток пачкой.</li>
          </ul>
          <div className="master__cta">
            <a className="btn btn--ink btn--lg" href={LOGIN_URL}>Собрать свой курс</a>
            <p>Регистрация в приложении. Права мастера открывает администратор после регистрации.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
