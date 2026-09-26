import type { FC } from 'hono/jsx'

export const Login: FC<{ error?: string }> = ({ error }) => {
 return (
 <html lang="id" class="dark">
 <head>
 <meta charset="utf-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Login - Nuansa Studio</title>
 <script src="https://cdn.tailwindcss.com"></script>
 {/* eslint-disable-next-line react/no-danger */}
 <script dangerouslySetInnerHTML={{ __html: `
 tailwind.config = {
 darkMode: 'class',
 theme: {
 extend: {
 colors: {
 dark: {
 900: '#0f172a',
 800: '#1e293b'
 },
 brand: {
 400: '#38bdf8',
 500: '#0ea5e9',
 600: '#0284c7'
 }
 }
 }
 }
 }
 ` }} />
 <style dangerouslySetInnerHTML={{ __html: `
 @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
 body { font-family: 'Plus Jakarta Sans', sans-serif; }
 .bg-white shadow-sm {
 background: rgba(30, 41, 59, 0.7);
 backdrop-filter: blur(16px);
 -webkit-backdrop-filter: blur(16px);
 border: 1px solid rgba(255, 255, 255, 0.1);
 }
 .animate-mesh {
 background: radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
 radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
 radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
 radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
 radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
 radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
 radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
 filter: blur(60px);
 opacity: 0.15;
 }
 ` }} />
 </head>
 <body class="bg-gray-50 text-slate-100 min-h-screen flex items-center justify-center selection:bg-brand-500/30 relative">
 <div class="absolute inset-0 z-0 pointer-events-none animate-mesh"></div>
 
 <div class="w-full max-w-md p-6 relative z-10">
 <div class="text-center mb-8">
 <h1 class="text-3xl font-extrabold tracking-tight mb-2">Nuansa<span class="font-normal text-gray-400">Studio</span></h1>
 <p class="text-gray-500">Masuk ke dasbor manajemen Anda</p>
 </div>

 <div class="bg-white shadow-sm p-8 rounded-3xl shadow-2xl">
 {error && (
 <div class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
 {error}
 </div>
 )}
 
 <form method="POST" action="/api/login" class="space-y-6">
 <div>
 <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
 <input type="email" name="email" placeholder="admin@perusahaan.com" required class="w-full bg-white border border-[#ebebeb] rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-500 transition text-gray-900 placeholder-slate-500" />
 </div>
 <div>
 <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kata Sandi</label>
 <input type="password" name="password" placeholder="••••••••" required class="w-full bg-white border border-[#ebebeb] rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-500 transition text-gray-900 placeholder-slate-500" />
 </div>
 <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-gray-900 font-semibold py-4 px-4 rounded-xl transition-all shadow-lg shadow-brand-500/20 mt-4">
 Masuk Dasbor &rarr;
 </button>
 </form>
 </div>

 <div class="mt-8 text-center text-sm text-gray-400">
 Belum punya akun? <a href="https://nuansa.net/register" class="text-brand-600 hover:text-brand-300">Daftar sekarang</a>
 </div>
 </div>
 </body>
 </html>
 )
}
