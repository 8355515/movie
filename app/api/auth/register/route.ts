import { NextResponse } from 'next/server';
import { createUser, findUser } from '../../../../lib/auth';
export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({ error: 'missing' }, { status: 400 });
  const exists = await findUser(username);
  if (exists) return NextResponse.json({ error: 'user exists' }, { status: 409 });
  const user = await createUser(username, password);
  return NextResponse.json({ ok: true, user });
}
