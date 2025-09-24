import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req: Request) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ user: null });
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ user: null });
  return NextResponse.json({ user: payload });
}
