// Контент лендинга. Реальные данные помечены источником, примеры помечены isExample.

export const APP_URL = 'https://instep.expert/';
export const LOGIN_URL = 'https://instep.expert/';

// Реальный курс (прод-БД instep, 2026-10-23): courses.id b31b4a4e…
export const REAL_COURSE = {
  id: 'b31b4a4e',
  title: 'Осознанная Походка',
  author: 'Мария Коломбина',
  days: 17,
  practices: 27,
  enrolled: 19,
  groups: 2,
  avatar: '/icons/walking.svg',
  summary: 'Ежедневные практики внимания к шагу, дыханию и опоре. Два потока, созвоны с мастером, записи встреч.',
  isExample: false,
};

// Курсы-примеры: показывают, какие ещё направления может вести мастер. Помечены как примеры.
export const EXAMPLE_COURSES = [
  {
    id: 'ex-breath',
    title: 'Дыхание на 21 день',
    author: 'собирается в конструкторе',
    days: 21,
    practices: 42,
    avatar: '/icons/sitting.svg',
    summary: 'Утренняя и вечерняя дыхательная практика с таймером, теория по неделям.',
    isExample: true,
  },
  {
    id: 'ex-standing',
    title: 'Столб. Стояние и опора',
    author: 'собирается в конструкторе',
    days: 14,
    practices: 20,
    avatar: '/icons/standing.svg',
    summary: 'Стояние в столбе с нарастающим временем, созвон раз в неделю, задание в конце.',
    isExample: true,
  },
];

// Типы практик: как в приложении (practice_type media / theory / call / task).
export const PRACTICE_TYPES = [
  {
    key: 'media',
    title: 'Практика с таймером',
    text: 'Круговой таймер, видео или аудио мастера на экране. Экран не гаснет, прогресс сохраняется каждые десять секунд.',
  },
  {
    key: 'theory',
    title: 'Теория',
    text: 'Текст с картинками и ссылками. Одна кнопка «Изучено», её можно нажать в любой день.',
  },
  {
    key: 'call',
    title: 'Онлайн с мастером',
    text: 'Созвон в назначенный день. Запись появляется в этой же практике сама, кто пропустил, смотрит её позже.',
  },
  {
    key: 'task',
    title: 'Задание',
    text: 'Ответ текстом и файлами до 200 МБ. Мастер засчитывает или возвращает с комментарием.',
  },
];

// Разделы приложения: меню MenuDrawer.jsx + кабинет тренера.
export const SECTIONS = {
  student: [
    { key: 'my_courses', title: 'Мои курсы', text: 'Все курсы и потоки, в которые вы записаны, с прогрессом по дням.' },
    { key: 'store', title: 'Магазин курсов', text: 'Витрина одобренных курсов: автор, длительность, запись в один шаг.' },
    { key: 'trackers', title: 'Мои трекеры', text: 'Личные практики без мастера: свой список, свой таймер, своя статистика.' },
    { key: 'ask', title: 'Вопрос тренеру', text: 'Личные сообщения мастеру и куратору прямо из курса.' },
    { key: 'map', title: 'Карта курса и статистика', text: 'Все дни на одном экране, время практик, процент выполнения.' },
    { key: 'recs', title: 'Рекомендации', text: 'Что мастер советует именно вам: индивидуальные практики и заметки.' },
  ],
  master: [
    { key: 'builder', title: 'Конструктор курса', text: 'Дни, практики, медиа, расписание созвонов. Сохраняется само.' },
    { key: 'cabinet', title: 'Кабинет тренера', text: 'Прогресс каждого ученика по дням, пауза, индивидуальные практики.' },
    { key: 'reviews', title: 'Ответы на задания', text: 'Файлы и тексты учеников, зачёт или возврат с комментарием.' },
    { key: 'library', title: 'Банк практик', text: 'Свои практики с медиа и расписанием, переносятся в новый курс пачкой.' },
    { key: 'groups', title: 'Потоки', text: 'Несколько групп одного курса со своими датами старта.' },
    { key: 'invite', title: 'Приглашения', text: 'Ученик входит по ссылке или email и сразу видит свой день.' },
  ],
};

// Отзывов на платформе пока нет. Тексты ниже - примеры формата, подписаны как примеры.
export const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'Раньше я теряла записи встреч в чате. Теперь запись лежит в том же дне, где был созвон.',
    name: 'Ученица курса',
    role: 'пример отзыва',
    isExample: true,
  },
  {
    id: 't2',
    quote: 'Вижу, кто какой день прошёл, без таблиц. Задания проверяю за десять минут вечером.',
    name: 'Мастер курса',
    role: 'пример отзыва',
    isExample: true,
  },
  {
    id: 't3',
    quote: 'Таймер и видео вместе, экран не гаснет. Практика стала делом на пятнадцать минут, а не на полчаса сборов.',
    name: 'Ученик курса',
    role: 'пример отзыва',
    isExample: true,
  },
];

export const APPS = [
  { key: 'android', label: 'Google Play', note: 'скоро' },
  { key: 'ios', label: 'App Store', note: 'скоро' },
  { key: 'apk', label: 'APK для Android', note: 'скоро' },
];

// Демо-данные дня для живых мини-экранов (как Dashboard.jsx: день, практики, прогресс).
export const DEMO_DAY = {
  course: REAL_COURSE.title,
  day: 5,
  totalDays: REAL_COURSE.days,
  items: [
    { id: 'a1', label: 'Разминка', minutes: 10, icon: '/icons/warmup.svg', type: 'media', done: true },
    { id: 'a2', label: 'Стояние', minutes: 15, icon: '/icons/standing.svg', type: 'media', done: true },
    { id: 'a3', label: 'Прогулка', minutes: 20, icon: '/icons/walking.svg', type: 'media', done: false },
    { id: 'a4', label: 'Разбор недели', minutes: 45, icon: '/icons/sitting.svg', type: 'call', done: false },
  ],
};
