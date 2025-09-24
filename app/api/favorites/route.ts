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
  const favs = await redis.lrange(`user:${uid}:favorites`, 0, -1);
  return NextResponse.json(favs.map(f => JSON.parse(f)));
}

export async function POST(req: Request) {
  const uid = getUserId(req);
  const body = await req.json();
  await redis.rpush(`user:${uid}:favorites`, JSON.stringify(body));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const uid = getUserId(req);
  const { mediaId } = await req.json();
  // remove by filtering (simple approach)
  const list = await redis.lrange(`user:${uid}:favorites`, 0, -1);
  const filtered = list.filter(item => JSON.parse(item).id !== mediaId);
  await redis.del(`user:${uid}:favorites`);
  if (filtered.length) await redis.rpush(`user:${uid}:favorites`, ...filtered);
  return NextResponse.json({ success: true });
}
