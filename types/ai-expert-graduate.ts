export type AiExpertGraduateSocial = {
  label: string;
  url: string;
};

export type AiExpertGraduateStory = {
  id: string;
  name: string;
  role: string;
  change: string;
  quote: string;
  /** Ссылка на пост/историю выпускника */
  storyUrl?: string;
  storyLabel?: string;
  socials?: AiExpertGraduateSocial[];
};

export type AiExpertGraduatesContent = {
  eyebrow: string;
  title: string;
  intro: string;
  promise: { label: string; text: string }[];
  emptyNote: string;
  footer: string;
  stories: AiExpertGraduateStory[];
};
