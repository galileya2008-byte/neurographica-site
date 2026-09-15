/**
 * Счётчик и идентификаторы целей для Яндекс.Метрики.
 * В интерфейсе Метрики: Настройки → Цели → «JavaScript-событие»,
 * в поле «Идентификатор цели» — строка из `goals` (например purchase_click).
 */
export const yandexMetrika = {
  counterId: 112116319,
  goals: {
    purchase: "purchase_click",
    telegram: "telegram_click",
    email: "email_click",
    ctaMasterclasses: "cta_masterclasses",
    ctaPrograms: "cta_programs",
    ctaContacts: "cta_contacts",
  },
} as const;

export type MetrikaGoalId =
  (typeof yandexMetrika.goals)[keyof typeof yandexMetrika.goals];
