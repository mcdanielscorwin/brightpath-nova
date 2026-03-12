import { NextRequest, NextResponse } from 'next/server';

type AvatarState = 'listening' | 'thinking' | 'talking' | 'happy' | 'encouraging';

export async function POST(req: NextRequest) {
  const { message } = (await req.json()) as { message: string };

  // TEMP: replace with real Abacus call later
  const replyText =
    "I heard you say: " +
    message +
    ". I’m not connected to Abacus yet, but this is where Nova’s reply will appear.";
  const avatar_state: AvatarState = 'talking';

  return NextResponse.json({ message: replyText, avatar_state });
}
