export interface VentSession {
  id: string;
  content: string;
  wantsResponse: boolean;
  createdAt: Date;
  deleted: boolean;
}

export type TalkMethod = 'write' | 'voice';
export type ResponsePreference = 'no-response' | 'gentle-response';
