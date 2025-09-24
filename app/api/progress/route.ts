import { NextResponse } from 'next/server';
import redis from '../../../lib/redis';
import { verifyToken } from '../../../lib/auth';

function getUserId(req: Request) {
  const token = req.cookies.get('token')?.value;
  const payload = token ? verifyToken(token) : null;
  return payload?.userId || 'guest';
}

export async function GET(req: Request) {
  const uid = getUserId(req);
  const progress = await redis.hgetall(`user:${uid}:progress`);
  return NextResponse.json(progress);
}

export async function POST(req: Request) {
  const uid = getUserId(req);
  const body = await req.json();
  if (body.id && body.value !== undefined) {
    await redis.hset(`user:${uid}:progress`, { [body.id]: String(body.value) });
  }
  return NextResponse.json({ success: true });
}
