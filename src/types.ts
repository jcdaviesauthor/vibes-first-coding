export type QType = "short_text" | "multiple_choice" | "rating";

export type Form = {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  created_at: string;
};

export type Question = {
  id: string;
  form_id: string;
  type: QType;
  label: string;
  options: string[];
  position: number;
};

export type AnswerItem = {
  question_id: string;
  type: string;
  label: string;
  answer: string | number | null;
};

export type Response = {
  id: string;
  form_id: string;
  submitted_at: string;
  answers: AnswerItem[] | Record<string, string | number | null>;
};
