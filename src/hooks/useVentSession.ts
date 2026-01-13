import { useState, useCallback } from 'react';
import { VentSession, TalkMethod, ResponsePreference } from '@/types/vent';

// Generate a simple unique ID
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export function useVentSession() {
  const [currentSession, setCurrentSession] = useState<VentSession | null>(null);
  const [talkMethod, setTalkMethod] = useState<TalkMethod | null>(null);
  const [responsePreference, setResponsePreference] = useState<ResponsePreference | null>(null);

  const createSession = useCallback((content: string, wantsResponse: boolean): VentSession => {
    const session: VentSession = {
      id: generateId(),
      content,
      wantsResponse,
      createdAt: new Date(),
      deleted: false,
    };
    
    // Store in localStorage (temporary - will be replaced with backend)
    const sessions = JSON.parse(localStorage.getItem('ventSessions') || '[]');
    sessions.push(session);
    localStorage.setItem('ventSessions', JSON.stringify(sessions));
    
    setCurrentSession(session);
    return session;
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    // Mark as deleted in localStorage
    const sessions = JSON.parse(localStorage.getItem('ventSessions') || '[]');
    const updatedSessions = sessions.map((s: VentSession) => 
      s.id === sessionId ? { ...s, deleted: true, content: '' } : s
    );
    localStorage.setItem('ventSessions', JSON.stringify(updatedSessions));
    
    if (currentSession?.id === sessionId) {
      setCurrentSession({ ...currentSession, deleted: true, content: '' });
    }
  }, [currentSession]);

  const resetSession = useCallback(() => {
    setCurrentSession(null);
    setTalkMethod(null);
    setResponsePreference(null);
  }, []);

  return {
    currentSession,
    talkMethod,
    responsePreference,
    setTalkMethod,
    setResponsePreference,
    createSession,
    deleteSession,
    resetSession,
  };
}
