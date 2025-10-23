
export enum Mood {
  Happy = 'Happy',
  Calm = 'Calm',
  Focused = 'Focused',
  Sad = 'Sad',
  Stressed = 'Stressed',
}

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface HealthData {
  sleep: number;
  water: number;
  exercise: number;
}
