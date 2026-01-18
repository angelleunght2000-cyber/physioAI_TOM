
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  recoveryData?: RecoveryPlanData;
}

export interface RecoveryPlanData {
  stretch: string;
  stretchImage?: string;
  strength: string;
  strengthImage?: string;
  smooth: string;
  heal: string;
  explanation: string;
  muscleName: string;
}

export interface MuscleZone {
  id: string;
  name: string;
  points: string;
  color: string;
}
