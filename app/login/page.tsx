'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  async function handleLogin(e:any){
    e.preventDefault();
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
    if (res.ok) router.push('/');
    else alert('登录失败');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">登录</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="用户名" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w-full p-2 border rounded" type="password" placeholder="密码" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-red-500 text-white rounded">登录</button>
      </form>
    </div>
  );
}
