import jwt from 'jsonwebtoken';
import redis from './redis';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

// simple user storage in redis hash 'users:{username}' -> { password, id }
export async function createUser(username: string, password: string) {
  const id = `u:${Date.now()}:${Math.random().toString(36).slice(2,8)}`;
  await redis.hset(`user:${username}`, { id, username, password });
  return { id, username };
}

export async function findUser(username: string) {
  const data = await redis.hgetall(`user:${username}`);
  if (!data || !data.id) return null;
  return { id: data.id, username: data.username, password: data.password };
}
