'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function me() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    }
    me();
  }, []);

  async function logout() {
    // clear cookie by calling endpoint that clears token
    await fetch('/api/auth/logout');
    setUser(null);
    window.location.href = '/';
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="hidden md:flex w-64 bg-gray-800 p-4 flex-col">
        <h1 className="text-2xl font-bold">影视聚合</h1>
        <nav className="mt-6 flex flex-col gap-3">
          <Link href="/">首页</Link>
          <Link href="/favorites">收藏</Link>
          <Link href="/history">历史</Link>
        </nav>
        <div className="mt-auto">
          {user ? (
            <div className="text-sm">已登录: {user.username}<button onClick={logout} className="ml-2 text-red-400">登出</button></div>
          ) : (
            <div className="flex gap-2"><Link href="/login">登录</Link><Link href="/register">注册</Link></div>
          )}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
      <nav className="md:hidden fixed bottom-0 w-full bg-gray-800 p-2 flex justify-around">
        <Link href="/">首页</Link>
        <Link href="/favorites">收藏</Link>
        <Link href="/history">历史</Link>
      </nav>
    </div>
  );
}