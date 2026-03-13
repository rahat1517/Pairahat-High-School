// ========== DATA STORE (localStorage based) ==========
const DB = {
    get(key, fallback) {
        try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; } catch { return fallback; }
    },
    set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

// ========== INITIAL DATA ==========
const defaultNotices = [
    { id: 1, title: "২০২৫ সালের বার্ষিক পরীক্ষার সময়সূচী প্রকাশিত হয়েছে", desc: "সকল শ্রেণীর বার্ষিক পরীক্ষা ২০ নভেম্বর থেকে শুরু হবে। শিক্ষার্থীরা যথাসময়ে উপস্থিত থাকবে।", day: "১৫", month: "অক্টো", badge: "urgent", pdf: true, date: "2024-10-15" },
    { id: 2, title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫ - রেজিস্ট্রেশন শুরু", desc: "বিদ্যালয়ের বার্ষিক ক্রীড়া দিবস উপলক্ষে শিক্ষার্থীদের নিবন্ধন গ্রহণ চলছে।", day: "১০", month: "অক্টো", badge: "event", pdf: false, date: "2024-10-10" },
    { id: 3, title: "ষষ্ঠ থেকে দশম শ্রেণীর মডেল টেস্ট পরীক্ষার রুটিন", desc: "মডেল টেস্ট ২৫ অক্টোবর থেকে শুরু। সকল শিক্ষার্থী প্রবেশপত্র নিয়ে আসবে।", day: "০৮", month: "অক্টো", badge: "info", pdf: true, date: "2024-10-08" },
    { id: 4, title: "শীতকালীন ছুটির তালিকা প্রকাশ ২০২৫", desc: "ডিসেম্বর ২৫ থেকে জানুয়ারি ৫ পর্যন্ত শীতকালীন ছুটি থাকবে।", day: "০৫", month: "অক্টো", badge: "info", pdf: false, date: "2024-10-05" },
    { id: 5, title: "অভিভাবক সমাবেশ — ১ম সাময়িক পরীক্ষার ফলাফল বিতরণ", desc: "১ম সাময়িক পরীক্ষার ফলাফল বিতরণ ও অভিভাবক সমাবেশ আগামী ১৮ অক্টোবর অনুষ্ঠিত হবে।", day: "০২", month: "অক্টো", badge: "event", pdf: false, date: "2024-10-02" },
    { id: 6, title: "ভর্তি বিজ্ঞপ্তি ২০২৫ — ১ম শ্রেণী থেকে ৯ম শ্রেণী", desc: "আগামী শিক্ষাবর্ষে ভর্তির জন্য আবেদন গ্রহণ শুরু হয়েছে। সীমিত আসন।", day: "২৮", month: "সেপ্টে", badge: "urgent", pdf: true, date: "2024-09-28" }
];

const defaultEvents = [
    { title: "অভিভাবক সমাবেশ", date: "১৮ অক্টোবর ২০২৪" },
    { title: "বার্ষিক ক্রীড়া দিবস", date: "২৫ অক্টোবর ২০২৪" },
    { title: "বার্ষিক পরীক্ষা শুরু", date: "২০ নভেম্বর ২০২৪" },
    { title: "বার্ষিক পুরস্কার বিতরণী", date: "১৫ ডিসেম্বর ২০২৪" }
];

const defaultTeachers = [
    { name: "মো. আবদুল করিম", subject: "গণিত", role: "সিনিয়র শিক্ষক", emoji: "👨‍🏫" },
    { name: "রাহেলা বেগম", subject: "বাংলা", role: "প্রধান শিক্ষিকা", emoji: "👩‍🏫" },
    { name: "মো. সফিকুল ইসলাম", subject: "বিজ্ঞান", role: "সহকারী শিক্ষক", emoji: "👨‍🔬" },
    { name: "নাজনীন আক্তার", subject: "ইংরেজি", role: "সিনিয়র শিক্ষিকা", emoji: "👩‍💻" },
    { name: "মো. হারুনুর রশীদ", subject: "ইতিহাস", role: "সহকারী শিক্ষক", emoji: "👨‍🎓" },
    { name: "সুমাইয়া খানম", subject: "তথ্যপ্রযুক্তি", role: "সহকারী শিক্ষিকা", emoji: "👩‍🔬" },
    { name: "মো. জামাল উদ্দিন", subject: "ধর্ম শিক্ষা", role: "সহকারী শিক্ষক", emoji: "👨‍🏫" },
    { name: "রোকেয়া সুলতানা", subject: "চিত্রকলা", role: "সহকারী শিক্ষিকা", emoji: "👩‍🎨" }
];

const defaultGallery = [
    { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500", caption: "বার্ষিক পুরস্কার বিতরণী", category: "event" },
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500", caption: "বিজ্ঞান মেলা ২০২৪", category: "academic" },
    { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500", caption: "ক্রীড়া দিবস", category: "sports" },
    { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500", caption: "বিদ্যালয় ভবন", category: "academic" },
    { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=500", caption: "বার্ষিক সাংস্কৃতিক অনুষ্ঠান", category: "event" },
    { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500", caption: "ফুটবল প্রতিযোগিতা", category: "sports" },
    { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500", caption: "শিক্ষার্থীদের পাঠচক্র", category: "academic" },
    { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500", caption: "আন্তঃস্কুল বিতর্ক", category: "event" }
];

const resultsData = {
    ssc: {
        summary: { total: "২৪৫", passed: "২৪০", gpa5: "৬৮", rate: "৯৮%" },
        rows: [
            { cls: "বিজ্ঞান", total: "১২০", passed: "১১৮", gpa5: "৪৮", rate: "৯৮.৩%" },
            { cls: "মানবিক", total: "৮০", passed: "৭৮", gpa5: "১২", rate: "৯৭.৫%" },
            { cls: "ব্যবসায়", total: "৪৫", passed: "৪৪", gpa5: "৮", rate: "৯৭.৮%" }
        ]
    },
    jsc: {
        summary: { total: "৩৮০", passed: "৩৭২", gpa5: "৯২", rate: "৯৭.৯%" },
        rows: [
            { cls: "অষ্টম শ্রেণী-ক", total: "৯৫", passed: "৯৩", gpa5: "২৫", rate: "৯৭.৯%" },
            { cls: "অষ্টম শ্রেণী-খ", total: "৯৫", passed: "৯৩", gpa5: "২২", rate: "৯৭.৯%" },
            { cls: "অষ্টম শ্রেণী-গ", total: "৯৫", passed: "৯৩", gpa5: "২৩", rate: "৯৭.৯%" },
            { cls: "অষ্টম শ্রেণী-ঘ", total: "৯৫", passed: "৯৩", gpa5: "২২", rate: "৯৭.৯%" }
        ]
    },
    annual: {
        summary: { total: "২৮০০", passed: "২৭৩০", gpa5: "৩৪০", rate: "৯৭.৫%" },
        rows: [
            { cls: "১ম-২য় শ্রেণী", total: "৪৮০", passed: "৪৭২", gpa5: "৮০", rate: "৯৮.৩%" },
            { cls: "৩য়-৫ম শ্রেণী", total: "৭২০", passed: "৭০২", gpa5: "৯৬", rate: "৯৭.৫%" },
            { cls: "৬ষ্ঠ-৮ম শ্রেণী", total: "৮৪০", passed: "৮১৮", gpa5: "১০৮", rate: "৯৭.৪%" },
            { cls: "৯ম-১০ম শ্রেণী", total: "৭৬০", passed: "৭৩৮", gpa5: "৫৬", rate: "৯৭.১%" }
        ]
    }
};

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    renderDateTime();
    setInterval(renderDateTime, 1000);
    renderTicker();
    renderNotices();
    renderEvents();
    renderTeachers();
    renderGallery('all');
    showResult('ssc');
    initSlider();
    initScrollEffects();
    initNavigation();
    animateStats();
});

// ========== DATETIME ==========
function renderDateTime() {
    const el = document.getElementById('current-datetime');
    if (!el) return;
    const now = new Date();
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    el.textContent = now.toLocaleDateString('bn-BD', opts);
}

// ========== TICKER ==========
function renderTicker() {
    const notices = DB.get('notices', defaultNotices);
    const el = document.getElementById('tickerContent');
    if (!el) return;
    el.innerHTML = notices.map(n => `<span>${n.title}</span>`).join('');
}

// ========== NOTICES ==========
function renderNotices() {
    const notices = DB.get('notices', defaultNotices);
    const el = document.getElementById('noticeList');
    if (!el) return;
    el.innerHTML = notices.map(n => `
        <div class="notice-item fade-up">
            <div class="notice-date-box">
                <span class="day">${n.day}</span>
                <span class="month">${n.month}</span>
            </div>
            <div class="notice-body">
                <span class="notice-badge badge-${n.badge}">${n.badge === 'urgent' ? '⚠ জরুরি' : n.badge === 'event' ? '🎉 অনুষ্ঠান' : 'ℹ তথ্য'}</span>
                <h4>${n.title}</h4>
                <p>${n.desc}</p>
                ${n.pdf ? '<span class="notice-pdf">📄 PDF ডাউনলোড</span>' : ''}
            </div>
        </div>
    `).join('');
    observeFadeUp();
}

// ========== EVENTS ==========
function renderEvents() {
    const events = DB.get('events', defaultEvents);
    const el = document.getElementById('eventList');
    if (!el) return;
    el.innerHTML = events.map(e => `
        <div class="event-item">
            <div class="event-dot"></div>
            <div>
                <p>${e.title}</p>
                <span>${e.date}</span>
            </div>
        </div>
    `).join('');
}

// ========== TEACHERS ==========
function renderTeachers() {
    const teachers = DB.get('teachers', defaultTeachers);
    const el = document.getElementById('teachersGrid');
    if (!el) return;
    el.innerHTML = teachers.map(t => `
        <div class="teacher-card fade-up">
            <div class="teacher-emoji">${t.emoji}</div>
            <div class="teacher-info">
                <h4>${t.name}</h4>
                <p>${t.role}</p>
                <span class="teacher-subject">${t.subject}</span>
            </div>
        </div>
    `).join('');
    observeFadeUp();
}

// ========== RESULTS ==========
function showResult(type) {
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', ['ssc','jsc','annual'][i] === type));
    const data = resultsData[type];
    const el = document.getElementById('resultContent');
    el.innerHTML = `
        <div class="result-summary">
            <div class="result-box highlight">
                <span class="result-val">${data.summary.total}</span>
                <span class="result-label">মোট পরীক্ষার্থী</span>
            </div>
            <div class="result-box">
                <span class="result-val">${data.summary.passed}</span>
                <span class="result-label">উত্তীর্ণ</span>
            </div>
            <div class="result-box">
                <span class="result-val">${data.summary.gpa5}</span>
                <span class="result-label">GPA-5</span>
            </div>
            <div class="result-box">
                <span class="result-val">${data.summary.rate}</span>
                <span class="result-label">পাশের হার</span>
            </div>
        </div>
        <div class="result-table-wrap">
            <table class="result-table">
                <thead><tr><th>শ্রেণী</th><th>মোট</th><th>উত্তীর্ণ</th><th>GPA-5</th><th>পাশের হার</th></tr></thead>
                <tbody>${data.rows.map(r => `
                    <tr>
                        <td>${r.cls}</td>
                        <td>${r.total}</td>
                        <td>${r.passed}</td>
                        <td><span class="gpa-badge gpa-5">${r.gpa5}</span></td>
                        <td>${r.rate}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
}

// ========== GALLERY ==========
function renderGallery(filter) {
    const gallery = DB.get('gallery', defaultGallery);
    const items = filter === 'all' ? gallery : gallery.filter(g => g.category === filter);
    const el = document.getElementById('galleryGrid');
    el.innerHTML = items.map((g, i) => `
        <div class="gallery-item" onclick="openLightbox('${g.src}')">
            <img src="${g.src}" alt="${g.caption}" loading="lazy">
            <div class="gallery-overlay">🔍</div>
            <div class="gallery-caption">${g.caption}</div>
        </div>
    `).join('');
}

function filterGallery(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderGallery(cat);
}

// ========== LIGHTBOX ==========
function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// ========== HERO SLIDER ==========
let currentSlide = 0;
let sliderInterval;

function initSlider() {
    sliderInterval = setInterval(() => nextSlide(), 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(i) {
    clearInterval(sliderInterval);
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = i;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    sliderInterval = setInterval(() => nextSlide(), 5000);
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        scrollTop.classList.toggle('visible', window.scrollY > 300);
        // Active nav
        document.querySelectorAll('section[id]').forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            if (top < 100 && top > -sec.offsetHeight + 100) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
                if (link) link.classList.add('active');
            }
        });
    });
    observeFadeUp();
}

function observeFadeUp() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ========== STATS COUNTER ==========
function animateStats() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.target);
            let count = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                count = Math.min(count + step, target);
                el.textContent = Math.floor(count).toLocaleString('bn-BD');
                if (count >= target) clearInterval(timer);
            }, 25);
            io.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => io.observe(el));
}

// ========== NAVIGATION ==========
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    hamburger.addEventListener('click', () => navbar.classList.toggle('open'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navbar.classList.remove('open'));
    });
    document.addEventListener('click', e => {
        if (!hamburger.contains(e.target) && !navbar.contains(e.target)) navbar.classList.remove('open');
    });
}

// ========== CONTACT FORM ==========
function submitContact(e) {
    e.preventDefault();
    alert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।');
    e.target.reset();
}
