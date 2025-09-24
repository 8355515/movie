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
  const hist = await redis.lrange(`user:${uid}:history`, 0, -1);
  return NextResponse.json(hist.map(h => JSON.parse(h)));
}

export async function POST(req: Request) {
  const uid = getUserId(req);
  const body = await req.json();
  await redis.lpush(`user:${uid}:history`, JSON.stringify(body));
  await redis.ltrim(`user:${uid}:history`, 0, 49);
  return NextResponse.json({ success: true });
}
