export const siteConfig = {
  brand: "От намерения к действию",
  expert: "Галина Оноприенко",
  title: "От намерения к действию — Галина Оноприенко",
  description:
    "Мастер-классы и программы по нейрографике. 17 лет онлайн-обучения, 1000+ мастер-классов. Осознанный подход к целям, намерению и изменениям.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://galileya2008-byte.github.io/neurographica-site",
  locale: "ru_RU",
  email: "galileya2008@yandex.ru",
  social: {
    telegram: "https://t.me/galina1901",
    telegramHandle: "@galina1901",
  },
} as const;

export const navigation = [
  { label: "Мастер-классы", href: "/masterclasses" },
  { label: "Программы", href: "/programs" },
  { label: "Полезные материалы", href: "/materials" },
  { label: "Обо мне", href: "/about" },
  { label: "Отзывы", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
] as const;

export const legalNavigation = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Публичная оферта", href: "/offer" },
] as const;

export const benefits = [
  {
    value: "17 лет",
    label: "работы онлайн",
    description: "Делаю качественные знания доступными независимо от города и страны.",
  },
  {
    value: "1000+",
    label: "мастер-классов",
    description: "Богатый опыт проведения живых и записанных занятий.",
  },
  {
    value: "Инструктор",
    label: "нейрографики",
    description: "Дипломированный специалист с профессиональным обучением у создателя метода.",
  },
  {
    value: "Регулярно",
    label: "повышаю квалификацию",
    description: "Несколько раз в год обновляю профессиональные знания и навыки.",
  },
] as const;

/** Короткие ярлыки для каталога и админки */
export const directions = [
  {
    id: "intention",
    label: "Намерение",
    description: "Сформулировать и удерживать фокус на том, что действительно важно.",
  },
  {
    id: "planning",
    label: "Планирование",
    description: "Перевести идеи в понятные шаги и структуру действий.",
  },
  {
    id: "motivation",
    label: "Мотивация",
    description: "Найти внутренний ресурс для движения к целям.",
  },
  {
    id: "self-realization",
    label: "Самореализация",
    description: "Раскрыть потенциал через осознанную работу с собой.",
  },
  {
    id: "relationships",
    label: "Отношения",
    description: "Лучше понимать себя и своё место в отношениях с другими.",
  },
  {
    id: "finance",
    label: "Финансы",
    description: "Прояснить отношение к деньгам и финансовым целям.",
  },
  {
    id: "beginners",
    label: "Для новичков",
    description: "Мягкое знакомство с методом нейрографики.",
  },
  {
    id: "clarity",
    label: "Ясность",
    description: "Навести порядок в мыслях и внутреннем шуме.",
  },
  {
    id: "desires",
    label: "Желания",
    description: "Лучше понять свои желания и внутренние опоры.",
  },
  {
    id: "body",
    label: "Стройность",
    description: "Осознанная работа с телом, образом себя и привычками.",
  },
  {
    id: "love",
    label: "Любовь и сексуальность",
    description: "Бережная работа с близостью, чувствами и телесностью.",
  },
] as const;

/**
 * Карточки на главной: практика по запросу пользователя.
 * directionId — фильтр каталога мастер-классов.
 */
export const practiceRequests = [
  {
    id: "self-understanding",
    directionId: "self-realization",
    title: "Хочу разобраться в себе",
    description: "Увидеть свои опоры, внутренние противоречия и то, что действительно важно.",
  },
  {
    id: "goals",
    directionId: "intention",
    title: "Хочу двигаться к своей цели",
    description: "Сформулировать намерение и перейти от мысли к конкретным шагам.",
  },
  {
    id: "thoughts",
    directionId: "clarity",
    title: "Хочу навести порядок в мыслях",
    description: "Снять внутренний шум и вернуть ясность через практику линии.",
  },
  {
    id: "motivation-request",
    directionId: "motivation",
    title: "Хочу работать с мотивацией",
    description: "Найти ресурс для действия без давления и «волшебных обещаний».",
  },
  {
    id: "desires-request",
    directionId: "desires",
    title: "Хочу лучше понять свои желания",
    description: "Отличить чужие ожидания от своих истинных запросов.",
  },
  {
    id: "beginners-request",
    directionId: "beginners",
    title: "Хочу познакомиться с нейрографикой",
    description: "Мягкий старт: понять метод и попробовать первую практику.",
  },
  {
    id: "body-request",
    directionId: "body",
    title: "Хочу работать со стройностью",
    description: "Осознанный взгляд на тело, привычки и отношение к себе — без жёстких обещаний.",
  },
  {
    id: "love-request",
    directionId: "love",
    title: "Хочу глубже понять любовь и сексуальность",
    description: "Бережная работа с близостью, чувствами и внутренней свободой.",
  },
] as const;

export const philosophyQuote = {
  lines: [
    "Я не обещаю волшебных таблеток.",
    "Я верю, что каждый человек способен стать автором собственных изменений.",
  ],
} as const;
