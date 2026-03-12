'use client';

type AvatarState = 'listening' | 'thinking' | 'talking' | 'happy' | 'encouraging';

export default function NovaAvatar({ state }: { state: AvatarState }) {
  let label = '';
  let description = '';

  if (state === 'listening') {
    label = 'Nova is listening';
    description = 'She’s focused on you, ready to hear what’s going on.';
  } else if (state === 'thinking') {
    label = 'Nova is thinking';
    description = 'She’s working out the best way to explain this.';
  } else if (state === 'talking') {
    label = 'Nova is talking';
    description = 'She’s walking you through the next step.';
  } else if (state === 'happy') {
    label = 'Nova is hyped for you';
    description = 'She’s celebrating your progress.';
  } else {
    label = 'Nova is cheering you on';
    description = 'She sees you trying and wants you to keep going.';
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '320px',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        padding: '1rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #eef2ff, #f9fafb)'
      }}
    >
      <div
        style={{
          width: '180px',
          height: '180px',
          margin: '0 auto 1rem',
          borderRadius: '999px',
          background: '#4f46e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1.15rem'
        }}
      >
        Nova
      </div>
      <h2 style={{ marginBottom: '0.25rem' }}>{label}</h2>
      <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>{description}</p>
    </div>
  );
}
