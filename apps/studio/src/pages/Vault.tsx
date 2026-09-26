import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

type MediaObject = {
 id: string;
 filename: string;
 url: string;
 type: string;
 size: number;
 has_watermark: number;
 created_at: string | Date;
}

export const Vault: FC<{ currentPath: string, files?: MediaObject[] }> = ({ currentPath, files = [] }) => {
 return (
 <Layout title="Pustaka Media (R2 Vault)" currentPath={currentPath}>
 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
 
 {/* Formulir Unggahan */}
 <div class="md:col-span-1">
 <form id="upload-form" action="/api/upload" method="POST" enctype="multipart/form-data" class="bg-white backdrop-blur-sm border border-[#ebebeb] rounded-2xl p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-dashed h-full flex flex-col justify-center">
 
 <div id="preview-container" class="hidden mb-6 relative rounded-xl overflow-hidden border border-[#ebebeb] bg-gray-50 aspect-square">
 <img id="image-preview" class="w-full h-full object-contain" />
 <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
 <button type="button" onclick="resetUpload()" class="bg-red-500/80 text-[#161616] px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">Hapus</button>
 </div>
 </div>

 <div id="upload-prompt" class="flex flex-col items-center">
 <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-[#ebebeb] shadow-inner">
 <svg class="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
 </div>
 <h2 class="text-lg font-semibold text-[#161616] mb-2">Unggah Aset Media</h2>
 <p class="text-gray-500 text-xs mb-6 px-4">
 Pilih gambar. File akan disimpan secara permanen di R2 secara global.
 </p>
 
 <label class="bg-slate-200 text-slate-900 hover:bg-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg cursor-pointer w-full max-w-[200px]">
 Pilih File Gambar
 <input type="file" id="file-input" name="file" class="hidden" accept="image/*" onchange="handleFileSelect(event)" />
 </label>
 </div>

 {/* Fitur Watermark Otomatis Client-side */}
 <div id="watermark-options" class="hidden mt-6 text-left border-t border-[#ebebeb] pt-4">
 <label class="flex items-center gap-2 cursor-pointer mb-3">
 <input type="checkbox" id="apply-watermark" checked class="rounded border-slate-600 bg-gray-100 text-brand-600 focus:ring-brand-500/20" onchange="updatePreview()" />
 <span class="text-gray-700 text-sm font-medium">Beri Watermark Hak Cipta</span>
 </label>
 <input type="text" id="watermark-text" value="© Nuansa Studio" oninput="updatePreview()" class="w-full bg-gray-50 border border-[#ebebeb] rounded-lg px-3 py-2 text-sm text-[#161616] focus:border-brand-500 focus:outline-none placeholder-slate-600" />
 <p class="text-[10px] text-gray-400 mt-2 leading-tight">Watermark dirender secara lokal menggunakan HTML5 Canvas sehingga 100% gratis tanpa biaya Serverless.</p>
 
 <button id="upload-btn" type="submit" class="w-full mt-4 bg-brand-600 text-white hover:bg-brand-500 px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg">
 Mulai Unggah
 </button>
 </div>
 </form>
 </div>

 {/* Daftar Gambar di R2 */}
 <div class="md:col-span-2">
 <div class="bg-white backdrop-blur-sm border border-[#ebebeb] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] h-full">
 <h3 class="text-[#161616] font-medium mb-4 flex items-center gap-2">
 File Tersimpan <span class="bg-gray-100 text-gray-500 border border-[#ebebeb] text-xs px-2 py-0.5 rounded-full">{files.length}</span>
 </h3>
 
 {files.length === 0 ? (
 <div class="text-center p-12 border border-[#ebebeb] border-dashed rounded-xl text-gray-400 text-sm">
 Belum ada media yang diunggah.
 </div>
 ) : (
 <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
 {files.map((file) => (
 <div class="aspect-square bg-gray-50 rounded-xl border border-[#ebebeb] overflow-hidden group relative flex items-center justify-center">
 <img src={file.url} alt={file.filename} class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
 
 {file.has_watermark === 1 && (
 <div class="absolute top-2 right-2 bg-brand-500/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
 Watermarked
 </div>
 )}

 <div class="absolute inset-0 bg-gray-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center gap-2">
 <p class="text-[#161616] text-xs truncate w-full font-medium" title={file.filename}>{file.filename}</p>
 <p class="text-brand-600 text-[10px] mb-2">{(file.size / 1024).toFixed(1)} KB</p>
 <div class="flex flex-wrap gap-1.5 justify-center">
 <a href={file.url} target="_blank" class="bg-gray-100 hover:bg-gray-200 text-[#161616] border border-[#ebebeb] text-xs px-2.5 py-1 rounded hover:bg-slate-600 transition">
 Buka
 </a>
 <button onclick={`navigator.clipboard.writeText(window.location.origin + '${file.url}'); alert('Tautan disalin!')`} class="bg-brand-600/20 text-brand-600 border border-[#ebebeb] text-xs px-2.5 py-1 rounded hover:bg-brand-600/30 transition">
 Salin
 </button>
 <form action="/api/vault/delete" method="POST" onsubmit="return confirm('Hapus media ini secara permanen?')">
 <input type="hidden" name="id" value={file.id} />
 <input type="hidden" name="url" value={file.url} />
 <button type="submit" class="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2.5 py-1 rounded hover:bg-red-500/20 transition">
 Hapus
 </button>
 </form>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 </div>

 <script dangerouslySetInnerHTML={{__html: `
 let originalImageObj = null;
 let originalFileName = '';
 let originalFileType = '';

 function handleFileSelect(event) {
 const file = event.target.files[0];
 if (!file) return;

 originalFileName = file.name;
 originalFileType = file.type;

 const reader = new FileReader();
 reader.onload = (e) => {
 originalImageObj = new Image();
 originalImageObj.onload = () => {
 document.getElementById('upload-prompt').classList.add('hidden');
 document.getElementById('preview-container').classList.remove('hidden');
 document.getElementById('watermark-options').classList.remove('hidden');
 updatePreview();
 };
 originalImageObj.src = e.target.result;
 };
 reader.readAsDataURL(file);
 }

 function updatePreview() {
 if (!originalImageObj) return;

 const applyWatermark = document.getElementById('apply-watermark').checked;
 const text = document.getElementById('watermark-text').value;

 const canvas = document.createElement('canvas');
 const ctx = canvas.getContext('2d');
 
 canvas.width = originalImageObj.width;
 canvas.height = originalImageObj.height;

 // Draw original image
 ctx.drawImage(originalImageObj, 0, 0);

 // Apply watermark if checked
 if (applyWatermark && text) {
 const fontSize = Math.max(20, Math.floor(canvas.width / 20)); // Responsive font size
 ctx.font = \`bold \${fontSize}px sans-serif\`;
 ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'bottom';
 
 // Text shadow for visibility on bright images
 ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
 ctx.shadowBlur = 4;
 ctx.shadowOffsetX = 2;
 ctx.shadowOffsetY = 2;

 // Padding
 const padding = fontSize;
 ctx.fillText(text, canvas.width - padding, canvas.height - padding);
 }

 // Update preview img src
 document.getElementById('image-preview').src = canvas.toDataURL(originalFileType);
 }

 function resetUpload() {
 document.getElementById('file-input').value = '';
 originalImageObj = null;
 document.getElementById('upload-prompt').classList.remove('hidden');
 document.getElementById('preview-container').classList.add('hidden');
 document.getElementById('watermark-options').classList.add('hidden');
 }

 // Intercept form submission to upload the canvas data instead of the raw file
 document.getElementById('upload-form').addEventListener('submit', function(e) {
 e.preventDefault();
 
 if (!originalImageObj) return;

 const btn = document.getElementById('upload-btn');
 const oldText = btn.innerHTML;
 btn.innerHTML = 'Mengunggah...';
 btn.disabled = true;

 const imgSrc = document.getElementById('image-preview').src;
 
 // Convert base64 to Blob
 fetch(imgSrc)
 .then(res => res.blob())
 .then(blob => {
 const formData = new FormData();
 // Add prefix to filename if watermarked
 const isWatermarked = document.getElementById('apply-watermark').checked;
 const fileName = (isWatermarked ? 'wm-' : '') + originalFileName;
 
 formData.append('file', blob, fileName);

 fetch('/api/upload', {
 method: 'POST',
 body: formData
 }).then(() => {
 window.location.reload();
 }).catch(err => {
 console.error(err);
 alert('Gagal mengunggah file.');
 btn.innerHTML = oldText;
 btn.disabled = false;
 });
 });
 });
 `}} />
 </Layout>
 )
}
