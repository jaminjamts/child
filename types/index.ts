export type Tab = 'home' | 'report' | 'diary';
export type ButtonColor = 'pink' | 'mint' | 'blue' | 'yellow' | 'darkBlue';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ReportStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface Article {
  id: string; // UUID from database
  title: string;
  body: string;
  thumbnail_url: string | null;
  category: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: string;
};

export interface ReportData {
  moodLevel: number | null;
  actionType: string | null;
  location: string | null;
  role: string | null;
  gender: string;
  age: string;
  school: string;
  phone: string;
}
