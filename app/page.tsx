'use client';

import { useState } from 'react';
import NovaAvatar from './nova-avatar';

type AvatarState = 'listening' | 'thinking' | 'talking' | 'happy' | 'encouraging';

type ChatTurn = {
  from: 'user' | 'nova';
  text: string;
};

export default function HomePage() {
  const [chat, setChat] = useState<ChatTurn[]>([
    {
      from: 'nova',
      text: "Hey, I’m Nova. I’ve got your back with reading, math, and school stuff. What are we working on today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [avatarState, setAvatarState] = useState<AvatarState>('listening');
  const [isSending, setIsSending] = useState(false);

  async function sendMessage() {
    const userText = input.trim();
    if (!userText || isSending) return;

    setChat(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setIsSending(true);
    setAvatarState('thinking');

    try {
      const res = await fetch('/api/nova_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = (await res.json()) as {
        message: string;
        avatar_state?: AvatarState;
      };

      setChat(prev => [...prev, { from: 'nova', text: data.message }]);
      setAvatarState(data.avatar_state || 'talking');
      // later: hook up TTS here

    } catch (e) {
      setChat(prev => [
        ...prev,
        {
          from: 'nova',
          text: "Hmm, something glitched on my side. Let’s try that again in a sec."
        }
      ]);
      setAvatarState('encouraging');
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main style={{ display: 'flex', minHeight: '100vh' }}>
      <section style={{ flex: 2, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1>BrightPath – Study with Nova</h1>
        <div
          style={{
            flex: 1,
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            overflowY: 'auto',
            background: '#fafafa'
          }}
        >
          {chat.map((turn, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '0.75rem',
                display: 'flex',
                justifyContent: turn.from === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '12px',
                  background: turn.from === 'user' ? '#4f46e5' : '#e5e7eb',
                  color: turn.from === 'user' ? '#fff' : '#111827',
                  fontSize: '0.95rem',
                  lineHeight: 1.4
                }}
              >
                {turn.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell Nova what you need help with…"
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid #d1d5db'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isSending}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              border: 'none',
              background: '#4f46e5',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {isSending ? 'Thinking…' : 'Send'}
          </button>
        </div>
      </section>
      <aside
        style={{
          flex: 1,
          borderLeft: '1px solid #e5e7eb',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <NovaAvatar state={avatarState} />
      </aside>
    </main>
  );
}
