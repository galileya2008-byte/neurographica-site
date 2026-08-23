export const adminConfig = {
  /**
   * Пароль входа в /admin.
   * Смените значение перед тем, как делиться ссылкой на сайт.
   * Это базовая защита для личного кабинета, не банковский уровень.
   */
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "galina2026",
  github: {
    owner: "galileya2008-byte",
    repo: "neurographica-site",
    branch: "main",
    masterclassesPath: "content/masterclasses",
    /** Путь в репозитории (без public/ в URL сайта) */
    coversRepoPath: "public/images/covers",
    coversPublicPath: "/images/covers",
  },
  covers: [
    "/images/galina/portrait-premium.png",
    "/images/galina/at-work.png",
    "/images/galina/with-pavel-piskarev.png",
  ],
  coverUpload: {
    maxBytes: 5 * 1024 * 1024,
    accept: ["image/jpeg", "image/png", "image/webp"],
  },
} as const;
