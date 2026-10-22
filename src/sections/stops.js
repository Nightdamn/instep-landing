import { Timer, BookOpen, Video, ClipboardCheck, Users } from 'lucide-react';

// Остановки одного дня курса. Время суток условное: практики привязаны к дню, не к часу.
export const STOPS = [
  { id: 'morning', time: 'Утром', title: 'Практика с таймером', icon: Timer },
  { id: 'theory', time: 'Днём', title: 'Теория', icon: BookOpen },
  { id: 'call', time: 'Вечером', title: 'Онлайн с мастером', icon: Video },
  { id: 'task', time: 'Перед сном', title: 'Задание', icon: ClipboardCheck },
  { id: 'master', time: 'Вечер мастера', title: 'Проверка и прогресс', icon: Users },
];
