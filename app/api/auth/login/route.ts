import { NextResponse } from 'next/server';
import { findUser, signToken } from '../../../../lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({ error: 'missing' }, { status: 400 });
  const user = await findUser(username);
  if (!user || user.password !== password) return NextResponse.json({ error: 'invalid' }, { status: 401 });

  const token = signToken({ userId: user.id, username: user.username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60*60*24*30 });
  return res;
}
