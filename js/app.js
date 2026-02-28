// ============================================================
//  app.js  –  Core utilities shared across all pages
// ============================================================

// ── Toast Notification System ──────────────────────────────
function showToast(message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = '0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ── Modal helpers ────────────────────────────────────────────
function openModal(id) {
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ── Mobile sidebar toggle ────────────────────────────────────
function initSidebar() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
}

// ── Active nav link ──────────────────────────────────────────
function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href')?.split('/').pop();
        if (href === path) link.classList.add('active');
    });
}

// ── Date helpers ─────────────────────────────────────────────
function todayStr() {
    return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(isoString) {
    if (!isoString) return '—';
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function currentMonthStr() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// ── Initials from name ───────────────────────────────────────
function initials(first, last) {
    return ((first?.[0] || '') + (last?.[0] || '')).toUpperCase();
}

// ── Grade display ────────────────────────────────────────────
function gradeLabel(g) { return `Grade ${g}`; }

// ── Confirm dialog ───────────────────────────────────────────
function confirmAction(message) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay open';
        overlay.innerHTML = `
      <div class="modal" style="max-width:400px">
        <div class="modal-header">
          <span class="modal-title">⚠️ Confirm Action</span>
        </div>
        <div class="modal-body">
          <p class="confirm-text">${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="cfCancel">Cancel</button>
          <button class="btn btn-danger" id="cfConfirm">Confirm</button>
        </div>
      </div>`;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const cleanup = (result) => {
            overlay.remove();
            document.body.style.overflow = '';
            resolve(result);
        };

        overlay.querySelector('#cfCancel').addEventListener('click', () => cleanup(false));
        overlay.querySelector('#cfConfirm').addEventListener('click', () => cleanup(true));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
    });
}

// ── On DOM ready ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    setActiveNav();
});

export { showToast, openModal, closeModal, todayStr, formatDate, formatTime, currentMonthStr, initials, gradeLabel, confirmAction };
