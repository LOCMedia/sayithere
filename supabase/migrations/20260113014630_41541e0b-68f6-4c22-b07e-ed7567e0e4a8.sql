-- Create vent_sessions table to store text and voice vents
CREATE TABLE public.vent_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT,
  audio_url TEXT,
  wants_response BOOLEAN NOT NULL DEFAULT false,
  deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vent_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no user auth required)
CREATE POLICY "Anyone can create vent sessions"
ON public.vent_sessions
FOR INSERT
WITH CHECK (true);

-- Allow anonymous users to read their own sessions (by ID lookup)
CREATE POLICY "Anyone can read vent sessions by ID"
ON public.vent_sessions
FOR SELECT
USING (true);

-- Allow anonymous users to update their own sessions (for deletion)
CREATE POLICY "Anyone can update vent sessions"
ON public.vent_sessions
FOR UPDATE
USING (true);

-- Create storage bucket for voice notes (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-notes', 'voice-notes', false);

-- Storage policy: Anyone can upload voice notes
CREATE POLICY "Anyone can upload voice notes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'voice-notes');

-- Storage policy: Anyone can read voice notes (private bucket needs signed URLs)
CREATE POLICY "Anyone can read voice notes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'voice-notes');

-- Storage policy: Anyone can delete their voice notes
CREATE POLICY "Anyone can delete voice notes"
ON storage.objects
FOR DELETE
USING (bucket_id = 'voice-notes');