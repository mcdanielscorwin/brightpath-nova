import { NextRequest, NextResponse } from 'next/server';

type AvatarState = 'listening' | 'thinking' | 'talking' | 'happy' | 'encouraging';

export async function POST(req: NextRequest) {
  const { message } = (await req.json()) as { message: string };

  const apiKey = process.env.ABACUS_API_KEY;
  const appId = process.env.ABACUS_APP_ID;

  try {
    const abacusRes = await fetch('https://api.abacus.ai/api/v0/getChatResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': apiKey || ''
      },
      body: JSON.stringify({
        deploymentToken: apiKey,
        deploymentId: appId,
        messages: [{ is_user: true, text: message }]
      })
    });

    const data = await abacusRes.json();
    const replyText = data?.response || data?.result || data?.message || "Hey, give me one sec and try again!";

    let avatar_state: AvatarState = 'talking';
    const lower = replyText.toLowerCase();
    if (lower.includes('great') || lower.includes('awesome') || lower.includes('nice work') || lower.includes('you got it')) {
      avatar_state = 'happy';
    } else if (lower.includes('try') || lower.includes('keep going') || lower.includes("don't give up") || lower.includes('you can')) {
      avatar_state = 'encouraging';
    }

    return NextResponse.json({ message: replyText, avatar_state });

  } catch (err) {
    return NextResponse.json({
      message: "Hmm, something glitched on my side. Let's try again in a sec!",
      avatar_state: 'encouraging' as AvatarState
    });
  }
}
