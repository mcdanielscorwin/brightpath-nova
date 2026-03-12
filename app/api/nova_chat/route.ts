import { NextRequest, NextResponse } from 'next/server';

type AvatarState = 'listening' | 'thinking' | 'talking' | 'happy' | 'encouraging';

export async function POST(req: NextRequest) {
  const { message } = (await req.json()) as { message: string };

  const apiKey = process.env.ABACUS_API_KEY;
  const appId = process.env.ABACUS_APP_ID;

  try {
    const abacusRes = await fetch(
      `https://api.abacus.ai/api/v0/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ApiKey': apiKey || ''
        },
        body: JSON.stringify({
          requestId: Date.now().toString(),
          deploymentConversationId: null,
          message: message,
          chatllmWebappId: appId
        })
      }
    );

    const text = await abacusRes.text();
    let replyText = "Hey, give me one sec and try again!";

    try {
      const lines = text.trim().split('\n');
      for (const line of lines.reverse()) {
        if (line.trim()) {
          const parsed = JSON.parse(line);
          if (parsed?.segment) {
            replyText = parsed.segment;
            break;
          }
          if (parsed?.message) {
            replyText = parsed.message;
            break;
          }
          if (parsed?.response) {
            replyText = parsed.response;
            break;
          }
        }
      }
    } catch {
      replyText = text.slice(0, 500) || "Hey, give me one sec and try again!";
    }

    let avatar_state: AvatarState = 'talking';
    const lower = replyText.toLowerCase();
    if (lower.includes('great') || lower.includes('awesome') || lower.includes('nice work') || lower.includes('you got it')) {
      avatar_state = 'happy';
    } else if (lower.includes('try') || lower.includes('keep going') || lower.includes('you can')) {
      avatar_state = 'encouraging';
    }

    return NextResponse.json({ message: replyText, avatar_state });

  } catch (err) {
    console.error('Abacus API error:', err);
    return NextResponse.json({
      message: "Hmm, something glitched on my side. Let's try again in a sec!",
      avatar_state: 'encouraging' as AvatarState
    });
  }
}
