export type Tab = 'home' | 'report' | 'diary';
export type ButtonColor = 'pink' | 'mint' | 'blue' | 'yellow' | 'darkBlue';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ReportStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface DiaryMessage {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

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
