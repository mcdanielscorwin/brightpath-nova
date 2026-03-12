'use client';

type AvatarState = 'listening' | 'thinking' | 'talking' | 'happy' | 'encouraging';

const NOVA_IMAGE = 'https://cdn.abacus.ai/images/5704b091-55b4-476b-93a8-e51ae6c6deb9.jpg';

const animations = `
  @keyframes nova-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes nova-bounce {
    0%, 100% { transform: translateY(0px) scale(1); }
    25% { transform: translateY(-18px) scale(1.05); }
    50% { transform: translateY(-8px) scale(1); }
    75% { transform: translateY(-14px) scale(1.03); }
  }
  @keyframes nova-pulse {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.04); filter: brightness(1.1); }
  }
  @keyframes nova-think {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-6px) rotate(-3deg); }
    75% { transform: translateY(-4px) rotate(3deg); }
  }
  @keyframes nova-glow-purple {
    0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.2); }
    50% { box-shadow: 0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.4); }
  }
  @keyframes nova-glow-yellow {
    0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.4), 0 0 40px rgba(251,191,36,0.2); }
    50% { box-shadow: 0 0 40px rgba(251,191,36,0.9), 0 0 80px rgba(251,191,36,0.5); }
  }
  @keyframes nova-glow-green {
    0%, 100% { box-shadow: 0 0 20px rgba(52,211,153,0.4), 0 0 40px rgba(52,211,153,0.2); }
    50% { box-shadow: 0 0 40px rgba(52,211,153,0.9), 0 0 80px rgba(52,211,153,0.5); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
  }
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
  @keyframes wave-ring {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.8); opacity: 0; }
  }
`;

function getStateConfig(state: AvatarState) {
  switch (state) {
    case 'listening':
      return {
        label: 'Nova is listening',
        emoji: '👂',
        desc: 'She is focused on you',
        animation: 'nova-float 3s ease-in-out infinite',
        glow: 'nova-glow-purple 2s ease-in-out infinite',
        bg: 'linear-gradient(135deg, #ede9fe, #f5f3ff)',
        ring: '#8b5cf6',
        badge: '#7c3aed',
      };
    case 'thinking':
      return {
        label: 'Nova is thinking',
        emoji: '🤔',
        desc: 'Working out the best answer',
        animation: 'nova-think 2s ease-in-out infinite',
        glow: 'nova-glow-purple 1.5s ease-in-out infinite',
        bg: 'linear-gradient(135deg, #e0e7ff, #ede9fe)',
        ring: '#6366f1',
        badge: '#4f46e5',
      };
    case 'talking':
      return {
        label: 'Nova is talking',
        emoji: '💬',
        desc: 'Walking you through it step by step',
        animation: 'nova-pulse 1.2s ease-in-out infinite',
        glow: 'nova-glow-purple 1s ease-in-out infinite',
        bg: 'linear-gradient(135deg, #f3e8ff, #ede9fe)',
        ring: '#a855f7',
        badge: '#9333ea',
      };
    case 'happy':
      return {
        label: 'Nova is hyped for you!',
        emoji: '🎉',
        desc: 'She is celebrating your progress',
        animation: 'nova-bounce 0.8s ease-in-out infinite',
        glow: 'nova-glow-yellow 0.8s ease-in-out infinite',
        bg: 'linear-gradient(135deg, #fef9c3, #fef3c7)',
        ring: '#f59e0b',
        badge: '#d97706',
      };
    case 'encouraging':
    default:
      return {
        label: 'Nova is cheering you on',
        emoji: '💪',
        desc: 'She sees you trying — keep going!',
        animation: 'nova-float 2s ease-in-out infinite',
        glow: 'nova-glow-green 2s ease-in-out infinite',
        bg: 'linear-gradient(135deg, #d1fae5, #ecfdf5)',
        ring: '#10b981',
        badge: '#059669',
      };
  }
}

export default function NovaAvatar({ state }: { state: AvatarState }) {
  const config = getStateConfig(state);

  return (
    <>
      <style>{animations}</style>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem 1rem',
        background: config.bg,
        borderRadius: '24px',
        border: `2px solid ${config.ring}33`,
        transition: 'all 0.5s ease',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Sparkle top left */}
        {state === 'happy' && (
          <>
            <div style={{ position: 'absolute', top: 16, left: 20, fontSize: 20,
              animation: 'sparkle 0.8s ease-in-out infinite' }}>✨</div>
            <div style={{ position: 'absolute', top: 40, right: 24, fontSize: 16,
              animation: 'sparkle 0.8s ease-in-out infinite 0.3s' }}>⭐</div>
            <div style={{ position: 'absolute', bottom: 60, left: 16, fontSize: 14,
              animation: 'sparkle 0.8s ease-in-out infinite 0.6s' }}>🌟</div>
          </>
        )}

        {/* Wave rings for talking */}
        {state === 'talking' && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `3px solid ${config.ring}44`,
            animation: 'wave-ring 1.5s ease-out infinite',
            pointerEvents: 'none',
          }} />
        )}

        {/* Nova image */}
        <div style={{
          position: 'relative',
          animation: config.animation,
        }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `4px solid ${config.ring}`,
            animation: config.glow,
            background: '#c4b5fd',
          }}>
            <img
              src={NOVA_IMAGE}
              alt="Nova"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: 'scale(1.1)',
              }}
            />
          </div>

          {/* State badge */}
          <div style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: config.badge,
            color: '#fff',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            border: '3px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            {config.emoji}
          </div>
        </div>

        {/* Label */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#1e1b4b',
          }}>
            {config.label}
          </h2>
          <p style={{
            margin: '4px 0 0',
            fontSize: '0.85rem',
            color: '#6b7280',
            lineHeight: 1.4,
          }}>
            {config.desc}
          </p>
        </div>

        {/* Thinking dots */}
        {state === 'thinking' && (
          <div style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: config.ring,
                animation: `nova-bounce 1s ease-in-out infinite ${i * 0.2}s`,
              }} />
            ))}
          </div>
        )}

        {/* Talking sound wave bars */}
        {state === 'talking' && (
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: 24 }}>
            {[0.4, 0.7, 1, 0.7, 0.4].map((h, i) => (
              <div key={i} style={{
                width: 5,
                height: `${h * 24}px`,
                borderRadius: 3,
                background: config.ring,
                animation: `nova-pulse ${0.6 + i * 0.1}s ease-in-out infinite ${i * 0.1}s`,
              }} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
