// ── Inject global styles ─────────────────────────────────────────────
const _style = document.createElement('style');
_style.textContent = `
  @keyframes slideInRight { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn      { from { opacity:0; transform:scale(.95) translateY(6px); } to { opacity:1; transform:scale(1) translateY(0); } }
  .toast-enter  { animation: slideInRight .3s cubic-bezier(.4,0,.2,1) forwards; }
  .modal-enter  { animation: scaleIn .2s cubic-bezier(.4,0,.2,1) forwards; }
  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:#374151; border-radius:99px; }
  #reader { border-radius:12px !important; overflow:hidden; border:2px solid #1f2937 !important; }
  #reader video { border-radius:12px !important; }
`;
document.head.appendChild(_style);

// ── Sidebar ──────────────────────────────────────────────────────────
export function toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('-translate-x-full');
    document.getElementById('overlay')?.classList.toggle('hidden');
}
export function closeSidebar() {
    document.getElementById('sidebar')?.classList.add('-translate-x-full');
    document.getElementById('overlay')?.classList.add('hidden');
}
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;

// ── Modal ────────────────────────────────────────────────────────────
export function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
export function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    document.body.style.overflow = '';
}
window.closeModal = closeModal;
document.addEventListener('click', e => {
    if (e.target.dataset.modalClose) { closeModal(e.target.dataset.modalClose); }
});

// ── Toast ────────────────────────────────────────────────────────────
export function showToast(message, type = 'info', duration = 3500) {
    let c = document.getElementById('_toasts');
    if (!c) {
        c = document.createElement('div');
        c.id = '_toasts';
        c.className = 'fixed bottom-20 lg:bottom-5 right-4 z-[200] flex flex-col gap-2 items-end pointer-events-none';
        document.body.appendChild(c);
    }
    const border = { success: 'border-l-4 border-emerald-500', error: 'border-l-4 border-red-500', info: 'border-l-4 border-indigo-500', warning: 'border-l-4 border-amber-500' };
    const icon = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const t = document.createElement('div');
    t.className = `toast-enter flex items-center gap-3 bg-gray-800 ${border[type] || ''} rounded-xl px-4 py-3 shadow-2xl text-sm text-gray-100 max-w-xs`;
    t.innerHTML = `<span class="shrink-0 text-base">${icon[type] || 'ℹ️'}</span><span>${message}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.style.cssText = 'transition:.3s;opacity:0;transform:translateX(16px)'; setTimeout(() => t.remove(), 300); }, duration);
}
window.showToast = showToast;

// ── Confirm Dialog ───────────────────────────────────────────────────
export function confirmAction(message) {
    return new Promise(resolve => {
        const uid = '_cf_' + Date.now();
        const el = document.createElement('div');
        el.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[300] flex items-end sm:items-center justify-center p-4';
        el.innerHTML = `
      <div class="modal-enter bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm shadow-2xl">
        <div class="p-6 pb-4">
          <div class="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-2xl mb-4">⚠️</div>
          <p class="text-gray-300 text-sm leading-relaxed">${message}</p>
        </div>
        <div class="flex gap-3 p-4">
          <button id="${uid}c" class="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-colors">Cancel</button>
          <button id="${uid}ok" class="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">Confirm</button>
        </div>
      </div>`;
        document.body.appendChild(el);
        document.body.style.overflow = 'hidden';
        const done = r => { el.remove(); document.body.style.overflow = ''; resolve(r); };
        el.querySelector(`#${uid}c`).onclick = () => done(false);
        el.querySelector(`#${uid}ok`).onclick = () => done(true);
        el.addEventListener('click', e => { if (e.target === el) done(false); });
    });
}
window.confirmAction = confirmAction;

// ── Date helpers ─────────────────────────────────────────────────────
export const todayStr = () => new Date().toISOString().slice(0, 10);
export const currentMonthStr = () => { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`; };
export function formatDate(v) {
    if (!v) return '—';
    try { return new Date(v.length === 10 ? v + 'T00:00:00' : v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch { return v; }
}
export function formatTime(v) {
    if (!v) return '—';
    try { const d = v?.toDate ? v.toDate() : new Date(v); return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }
    catch { return '—'; }
}
export const initials = (f, l) => ((f?.[0] || '') + (l?.[0] || '')).toUpperCase() || '?';

// ── Subject helper (backward compatible) ─────────────────────────────
export function getSubjects(student) {
    if (Array.isArray(student.subjects) && student.subjects.length) return student.subjects;
    if (student.subject === 'Both') return ['Science', 'Maths'];
    if (student.subject === 'Science') return ['Science'];
    if (student.subject === 'Maths') return ['Maths'];
    return ['Science'];
}
window.getSubjects = getSubjects;
