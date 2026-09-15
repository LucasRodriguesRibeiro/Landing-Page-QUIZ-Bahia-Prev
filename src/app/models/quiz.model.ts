export type PlanType = 'esmeralda' | 'diamante' | 'rubi';

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface QuizQuestion {
  id: number;
  badge: string;
  icon: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  isMultiple?: boolean;
  options: QuizOption[];
}

export interface PlanDetail {
  id: PlanType;
  name: string;
  tagline: string;
  badgeEmoji: string;
  price: number;
  beneficiaries: string;
  highlights: string[];
  note?: string;
  themeColor: string;
  accentBg: string;
  borderColor: string;
  badgeColor: string;
  whatsappMessage: string;
  buttonLabel: string;
}

export interface QuizAnswers {
  q1_beneficiaries: string;
  q2_benefits: string[];
  q3_telemedicina: string;
  q4_priority: string;
  q5_interest: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}
