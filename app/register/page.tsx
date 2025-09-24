'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  async function handleRegister(e:any){
    e.preventDefault();
    const res = await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
    if (res.ok) router.push('/login');
    else alert('注册失败');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">注册</h1>
      <form onSubmit={handleRegister} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="用户名" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w-full p-2 border rounded" type="password" placeholder="密码" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-red-500 text-white rounded">注册</button>
      </form>
    </div>
  );
}
