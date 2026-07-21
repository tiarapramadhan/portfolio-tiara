/* ============================================================
   KONFIGURASI — INI SATU-SATUNYA BAGIAN YANG PERLU KAMU EDIT
   ============================================================
   Cara dapetin link CSV dari Google Sheet:
   1. Buka Google Sheet kamu
   2. File > Share > Publish to web
   3. Pilih tab sheet yang mau dipublish (Profile / Experience / Skills / Projects)
   4. Pilih format "Comma-separated values (.csv)"
   5. Klik Publish, copy link yang muncul
   6. Ulangi untuk tiap tab, tempel link-nya di bawah ini
   ============================================================ */

const CONFIG = {
  PROFILE_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTI5ncPDt9dn81vno9qRNhMPV0Ad70FnT73ykKCd2E3MoW1iOc4oFffhK2k-_EHZOO1Eb4deAjVTzMs/pub?gid=269192175&single=true&output=csv",
  EXPERIENCE_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTI5ncPDt9dn81vno9qRNhMPV0Ad70FnT73ykKCd2E3MoW1iOc4oFffhK2k-_EHZOO1Eb4deAjVTzMs/pub?gid=952401450&single=true&output=csv",
  SKILLS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTI5ncPDt9dn81vno9qRNhMPV0Ad70FnT73ykKCd2E3MoW1iOc4oFffhK2k-_EHZOO1Eb4deAjVTzMs/pub?gid=1587155435&single=true&output=csv",
  PROJECTS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTI5ncPDt9dn81vno9qRNhMPV0Ad70FnT73ykKCd2E3MoW1iOc4oFffhK2k-_EHZOO1Eb4deAjVTzMs/pub?gid=0&single=true&output=csv",

  // opsional: tampilkan repo GitHub yang punya topic ini secara otomatis
  GITHUB_USERNAME: "username-github-kamu",
  GITHUB_AUTO_TOPIC: "portfolio-auto",
  ENABLE_GITHUB_AUTO_SECTION: false,
};

let CURRENT_LANG = localStorage.getItem("lang") || "en";
console.log("[Portfolio] script.js versi build: 2026-07-17-r7"); // ganti angka ini tiap update, biar gampang cek versi mana yg live

/* ============================================================
   I18N — dictionary teks statis UI (nav, judul, form, label, dll)
   ============================================================
   FORMAT-NYA: tiap "kata/kalimat" punya 2 baris — satu "id:" (versi
   Indonesia), satu "en:" (versi Inggris) — ditaruh nempel biar
   gampang dibandingin & diedit.

   CARA EDIT: cari teks yang mau diubah, ganti kalimat yang ada di
   DALAM tanda kutip " " sesudah "id:" atau "en:". JANGAN ubah nama
   key di paling kiri (misal cf_heading) — itu "alamat" yang dipanggil
   kode, kalau diubah nanti teksnya nggak nongol.

   Tiap kelompok dikasih komentar "// ini bagian translate ..." biar
   kamu tau itu dipakai buat apa.
   ============================================================ */
const I18N = {

  // ini bagian translate nama logo di navbar (paling kiri)
  nav_logo: { id: "Portofolio", en: "Portfolio" },

  // ini bagian translate menu navbar (Home/Skills/dst) — biasanya sama aja di 2 bahasa, sesuaikan aja
  nav_home:       { id: "Beranda",       en: "Home" },
  nav_skills:     { id: "Keahlian",     en: "Skills" },
  nav_experience: { id: "Pengalaman", en: "Experience" },
  nav_projects:   { id: "Proyek",   en: "Projects" },
  nav_contact:    { id: "Kontak",    en: "Contact" },

  // ini bagian translate sapaan pembuka di Hero ("Hi, aku {nama}" / "Hi, I'm {nama}")
  hero_greeting: { id: "Halo, saya", en: "Hi, I'm" },

  // ini bagian translate badge kecil di atas nama (Hero)
  hero_badge: { id: "Terbuka untuk Peluang Baru", en: "Open to New Opportunities" },

  // ini bagian translate 2 tombol CTA di Hero
  hero_cta_projects: { id: "Lihat Proyek", en: "View Projects" },
  hero_cta_cv:       { id: "Unduh CV",   en: "Download CV" },

  // ini bagian translate judul-judul section (eyebrow = teks kecil di atas judul besar)
  skills_eyebrow:     { id: "teknologi", en: "technologies" },
  skills_title:       { id: "Skills",    en: "Skills" },
  skills_tools_heading: { id: "Tech Stack", en: "Tech Stack" },
  experience_eyebrow: { id: "perjalanan", en: "journey" },
  experience_title:   { id: "Pengalaman", en: "Experience" },
  projects_eyebrow:   { id: "proyek",      en: "projects" },
  projects_title:      { id: "Proyek Pilihan", en: "Featured Projects" },
  contact_eyebrow:     { id: "kontak",    en: "contact" },
  contact_title:       { id: "Mari Terhubung", en: "Let's Connect" },

  // ini bagian translate isi form Contact (judul, subjudul, label, placeholder, tombol)
  cf_heading:    { id: "Hubungi Saya", en: "Get in Touch" },
  cf_subheading: {
    id: "Tertarik bekerja sama atau punya peluang yang cocok? Saya akan senang mendengar dari Anda.",
    en: "Interested in working together or have an opportunity in mind? I'd love to hear from you.",
  },
  cf_label_name:        { id: "Nama", en: "Name" },
  cf_placeholder_name:  { id: "Masukkan nama Anda", en: "Enter your name" },
  cf_label_email:       { id: "Email", en: "Email" },
  cf_placeholder_email: { id: "Masukkan alamat email Anda", en: "Enter your email address" },
  cf_label_message:     { id: "Pesan", en: "Message" },
  cf_placeholder_message: { id: "Tulis pesan Anda di sini...", en: "Write your message here..." },
  cf_submit: { id: "Kirim Pesan", en: "Send Message" },

  // ini bagian translate baris copyright di footer paling bawah
  footer_rights: { id: "Seluruh hak cipta dilindungi.", en: "All rights reserved." },

  // ini bagian translate label-label di dalam popup detail Project
  modal_files_title:         { id: "File Pendukung", en: "Supporting Files" },
  modal_dashboard_title:     { id: "Dashboard", en: "Dashboard" },
  modal_related_title_default: { id: "Terkait", en: "Related" },
  modal_github_btn:          { id: "Lihat di GitHub", en: "View on GitHub" },
  modal_related_dikerjakan:  { id: "Periode", en: "Duration" },

  // ini bagian translate label-label di dalam popup detail Experience
  exp_modal_did_title:   { id: "Tanggung Jawab", en: "Responsibilities" },
  exp_achievements_title: { id: "Pencapaian", en: "Achievements" },
  exp_documentation_title: { id: "Dokumentasi", en: "Documentation" },
  exp_view_detail_hint: { id: "Lihat detail", en: "View details" },
  exp_modal_tools_title: { id: "Tech Stack", en: "Tech Stack" },
  exp_modal_projects_label_project:     { id: "Proyek Terkait", en: "Related Projects" },
  exp_modal_projects_label_achievement: { id: "Pencapaian", en: "Achievements" },

  // ini bagian translate label di popup "tools dipakai di mana aja" (cross-reference)
  tool_modal_projects_title:   { id: "Proyek", en: "Projects" },
  tool_modal_experience_title: { id: "Pengalaman", en: "Experience" },

  // ini bagian translate tombol filter "Semua" (di Skills/Experience/Projects)
  label_all: { id: "Semua", en: "All" },

  // ini bagian translate pesan-pesan "belum ada data" (empty state)
  empty_skills:             { id: "Belum ada data.", en: "No data available." },
  empty_experience:         { id: "Belum ada data pengalaman.", en: "No experience available." },
  empty_experience_category: { id: "Belum ada data pada kategori ini.", en: "No entries in this category." },
  empty_projects:           { id: "Belum ada proyek yang tersedia.", en: "No projects available." },
  empty_projects_category:  { id: "Belum ada proyek pada kategori ini.", en: "No projects in this category." },
  tool_no_projects:         { id: "Belum ada project yang tercatat", en: "No projects recorded yet" },
  tool_no_experience:       { id: "Belum ada pengalaman yang tercatat", en: "No experience recorded yet" },
  tool_no_data:             { id: "Belum ada project atau pengalaman yang tercatat pakai skill ini.", en: "No projects or experience recorded using this skill yet." },

  // ini bagian translate tombol toggle bahasa & tombol toggle tema di navbar
  lang_switch_label: { id: "Indonesia", en: "English" }, // teks yg tampil sesuai bahasa yg LAGI aktif
  theme_dark_label:  { id: "Gelap",     en: "Dark" },
  theme_light_label: { id: "Terang",    en: "Light" },
};

function t(key) {
  const entry = I18N[key];
  if (!entry) return key;
  return entry[CURRENT_LANG] || entry.id || key;
}

// ambil field _en kalau lagi mode EN dan isinya ada, else fallback ke field aslinya
// Ini BUKAN dictionary teks — ini buat konten yang datang dari Google Sheet
// (bio, deskripsi project, deskripsi pengalaman). Kalau mode EN aktif, dia nyari
// kolom "namakolom_en" di sheet (misal bio_en, deskripsi_en). Kalau kolom itu
// kosong/belum diisi, otomatis balik pakai teks Indonesia biasa (nggak error).
// Edit teks EN-nya di GOOGLE SHEET langsung, bukan di file ini.
function pick(row, field) {
  if (CURRENT_LANG === "en") {
    const enVal = row[field + "_en"];
    if (enVal && enVal.trim()) return enVal;
  }
  return row[field] || "";
}

// translate label pendek yang umum dipakai (tipe experience, status project)
// PENTING: ini translate 2 ARAH — nggak peduli kamu nulis "Magang" atau
// "Internship" di sheet, sistem bakal otomatis nampilin versi yang sesuai
// bahasa yang lagi aktif. Tambah pasangan baru di LABEL_PAIRS kalau kamu
// nambah tipe/status baru di sheet (misal "Freelance", "Volunteer", dll).
const LABEL_PAIRS = [
  { id: "Magang",      en: "Internship", synonyms: ["intern"] },
  { id: "Organisasi",  en: "Organization", synonyms: ["organization"] },
  { id: "Pendidikan",  en: "Education", synonyms: ["education"] },
  { id: "Kerja",       en: "Work Experience", synonyms: ["full-time", "fulltime", "work"] },
  { id: "Selesai",     en: "Completed", synonyms: ["complete", "done"] },
  { id: "Berjalan",    en: "In Progress", synonyms: ["ongoing", "in progress"] },
  { id: "Aktif",       en: "Active", synonyms: [] },
  { id: "Coming Soon", en: "Coming Soon", synonyms: [] },
];
const LABEL_LOOKUP = {};
LABEL_PAIRS.forEach(pair => {
  LABEL_LOOKUP[pair.id.toLowerCase()] = pair;
  LABEL_LOOKUP[pair.en.toLowerCase()] = pair;
  (pair.synonyms || []).forEach(syn => { LABEL_LOOKUP[syn.toLowerCase()] = pair; });
});
function translateLabel(value) {
  if (!value) return value;
  const pair = LABEL_LOOKUP[value.trim().toLowerCase()];
  if (!pair) return value; // nggak dikenali (belum ada di LABEL_PAIRS) -> tampilin apa adanya
  return pair[CURRENT_LANG] || pair.id;
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.documentElement.lang = CURRENT_LANG;
  const langText = document.getElementById("lang-toggle-text");
  if (langText) langText.textContent = t("lang_switch_label");
}

/* ============================================================
   CSV PARSER (menangani koma & kutip di dalam sel)
   ============================================================ */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++; }
      else if (char === '"') { inQuotes = false; }
      else { field += char; }
    } else {
      if (char === '"') inQuotes = true;
      else if (char === ',') { row.push(field); field = ""; }
      else if (char === '\r') { /* skip */ }
      else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
      else { field += char; }
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }

  const headers = rows.shift().map(h => h.trim());
  return rows
    .filter(r => r.some(cell => cell.trim() !== ""))
    .map(r => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = (r[idx] || "").trim(); });
      return obj;
    });
}

async function fetchCSV(url) {
  if (!url || url.startsWith("TEMPEL_LINK")) return [];
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Gagal fetch: " + url);
    const text = await res.text();
    return parseCSV(text);
  } catch (err) {
    console.error(err);
    return [];
  }
}

function splitTags(str) {
  return (str || "").split(",").map(s => s.trim()).filter(Boolean);
}

function el(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstElementChild;
}

/* ============================================================
   PROFILE
   ============================================================ */
// helper: cek apakah value dari sheet itu masih placeholder ("ISI: ...") atau beneran udah diisi
function isFilled(value) {
  return !!(value && value.trim() && !value.trim().toUpperCase().startsWith("ISI:"));
}

// pastiin link selalu punya https:// di depan — kalau kolom sheet cuma diisi
// "linkedin.com/in/xxx" tanpa https://, browser nganggep itu link internal (404).
// Khusus link Google Drive, juga dirapihin ke format /view standar.
function normalizeUrl(url) {
  if (!url) return "";
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  // rapihin link Google Drive ke format .../file/d/FILE_ID/view standar
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/view`;
  return url;
}

function socialIconLink(url, slug, label) {
  // pakai warna asli brand (bukan dipaksa putih) — biar tetep keliatan jelas
  // baik di tema gelap MAUPUN terang, karena warna brand (biru LinkedIn,
  // ijo WhatsApp, dll) kontras di kedua tema, sedangkan putih polos
  // ilang/nge-blend kalau background-nya juga terang.
  //
  // KHUSUS LinkedIn: banyak ad-blocker/privacy extension browser yang
  // otomatis nge-block request ke server luar yang namanya ada "linkedin"-nya
  // (dianggap tracker). Makanya icon LinkedIn digambar LANGSUNG di kode
  // (inline SVG), bukan minta ke server luar — dijamin selalu muncul.
  if (slug === "linkedin") {
    return `<a href="${url}" target="_blank" rel="noopener" aria-label="${label}"><svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3ZM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75ZM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.87 3.36 3.7Z"/></svg></a>`;
  }
  return `<a href="${url}" target="_blank" rel="noopener" aria-label="${label}"><img src="https://cdn.simpleicons.org/${slug}" alt="" width="18" height="18" onerror="this.parentElement.textContent='${label.slice(0,2).toUpperCase()}'"></a>`;
}

// icon email pakai SVG asli (bukan emoji ✉ yang suka kekecilan/beda-beda tampilannya
// tergantung OS) — ukurannya disamain sama icon-icon lain (18x18)
const EMAIL_SVG_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z" stroke="currentColor" stroke-width="1.7"/><path d="M4 6.5L12 13L20 6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

async function renderProfile() {
  const rows = await fetchCSV(CONFIG.PROFILE_CSV_URL);
  if (!rows.length) return;
  const p = rows[0];

  document.getElementById("hero-name").textContent = p.nama || "—";
  document.getElementById("hero-tagline").textContent = pick(p, "tagline");
  document.getElementById("hero-bio").textContent = pick(p, "bio");
  document.getElementById("footer-name").textContent = p.nama || "—";
  document.getElementById("footer-year").textContent = new Date().getFullYear();
  document.getElementById("footer-logo-name").textContent = p.nama || "Portfolio";
  document.getElementById("footer-tagline").textContent = pick(p, "tagline");

  if (p.foto_url) document.getElementById("hero-photo").src = p.foto_url;

  // ilustrasi workspace siang/malam
  const dayImg = document.getElementById("illust-day");
  const nightImg = document.getElementById("illust-night");
  const dayFrames = splitTags(p.illustration_pagi_frames);
  const nightFrames = splitTags(p.illustration_malam_frames);

  if (dayFrames.length || nightFrames.length) {
    SPRITE.day = dayFrames;
    SPRITE.night = nightFrames;
    [...dayFrames, ...nightFrames].forEach(url => { const pre = new Image(); pre.src = url; });
    if (dayImg && dayFrames.length) dayImg.src = dayFrames[0];
    if (nightImg && nightFrames.length) nightImg.src = nightFrames[0];
    initSpriteObserver();
  } else {
    // fallback: 1 gambar statis per mode (kalau frame belum diisi)
    if (dayImg && p.illustration_pagi_url && !p.illustration_pagi_url.startsWith("ISI:")) {
      dayImg.src = p.illustration_pagi_url;
    }
    if (nightImg && p.illustration_malam_url && !p.illustration_malam_url.startsWith("ISI:")) {
      nightImg.src = p.illustration_malam_url;
    }
  }

  const starsWrap = document.getElementById("illust-stars");
  if (starsWrap && !starsWrap.dataset.built) {
    for (let i = 0; i < 18; i++) {
      const star = document.createElement("span");
      star.className = "star-dot";
      star.style.top = `${Math.random() * 45}%`;
      star.style.left = `${Math.random() * 95}%`;
      star.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
      starsWrap.appendChild(star);
    }
    starsWrap.dataset.built = "true";
  }

  const cv = document.getElementById("hero-cv");
  if (isFilled(p.link_cv)) {
    cv.href = normalizeUrl(p.link_cv);
    cv.style.display = "";
    console.log("[Portfolio] Link CV yang dipakai:", cv.href); // buka DevTools (F12) > Console buat cek link ini kalau CV masih error
  } else {
    cv.style.display = "none";
  }

  if (!window.__musicToggleInit) {
    window.__musicToggleInit = true;
    initMusicToggle(p.lofi_url);
  }

  // hero socials — LinkedIn, GitHub, WhatsApp pakai logo asli (Simple Icons), Email pakai icon amplop
  const waDigits = (p.wa_number || "").replace(/[^0-9]/g, "");
  const heroSocials = document.getElementById("hero-socials");
  heroSocials.innerHTML = "";
  if (isFilled(p.link_linkedin)) heroSocials.appendChild(el(socialIconLink(normalizeUrl(p.link_linkedin), "linkedin", "LinkedIn")));
  if (isFilled(p.link_github)) heroSocials.appendChild(el(socialIconLink(normalizeUrl(p.link_github), "github", "GitHub")));
  if (isFilled(p.wa_number) && waDigits) heroSocials.appendChild(el(socialIconLink(`https://wa.me/${waDigits}`, "whatsapp", "WhatsApp")));
  if (isFilled(p.email)) heroSocials.appendChild(el(`<a href="mailto:${p.email}" aria-label="Email">${EMAIL_SVG_ICON}</a>`));

  // footer socials — sama persis kayak hero socials
  const footerSocials = document.getElementById("footer-socials");
  footerSocials.innerHTML = "";
  if (isFilled(p.link_linkedin)) footerSocials.appendChild(el(socialIconLink(normalizeUrl(p.link_linkedin), "linkedin", "LinkedIn")));
  if (isFilled(p.link_github)) footerSocials.appendChild(el(socialIconLink(normalizeUrl(p.link_github), "github", "GitHub")));
  if (isFilled(p.wa_number) && waDigits) footerSocials.appendChild(el(socialIconLink(`https://wa.me/${waDigits}`, "whatsapp", "WhatsApp")));
  if (isFilled(p.email)) footerSocials.appendChild(el(`<a href="mailto:${p.email}" aria-label="Email">${EMAIL_SVG_ICON}</a>`));

  // contact form -> buka email client dengan pesan udah keisi (nggak butuh backend)
  // catatan: preventDefault SELALU dipanggil duluan, jadi form nggak akan reload halaman
  // meskipun email belum keisi di sheet Profile (biar nggak berasa "form cuma pajangan")
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!isFilled(p.email)) {
        alert("Form belum bisa kirim: kolom 'email' di sheet Profile belum diisi pemilik web ini.");
        return;
      }
      const name = document.getElementById("cf-name").value;
      const fromEmail = document.getElementById("cf-email").value;
      const message = document.getElementById("cf-message").value;
      const subject = encodeURIComponent(`Halo dari ${name} lewat portfolio`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${fromEmail})`);
      window.location.href = `mailto:${p.email}?subject=${subject}&body=${body}`;
    });
  }
}

/* ============================================================
   EXPERIENCE — tab kategori (tipe: Kerja / Organisasi / Pendidikan / Lomba, dst)
   ============================================================ */
let ALL_EXPERIENCE = [];
let ACTIVE_EXP_TAB = "Semua";

async function renderExperience() {
  ALL_EXPERIENCE = await fetchCSV(CONFIG.EXPERIENCE_CSV_URL);
  const tabsWrap = document.getElementById("exp-tabs");
  const list = document.getElementById("exp-list");

  if (!ALL_EXPERIENCE.length) {
    tabsWrap.innerHTML = "";
    list.innerHTML = `<div class="empty-state">${t("empty_experience")}</div>`;
    return;
  }

  const tipes = new Set(["Semua"]);
  ALL_EXPERIENCE.forEach(r => { if (r.tipe) tipes.add(r.tipe); });

  tabsWrap.innerHTML = "";
  tipes.forEach(tipe => {
    const label = tipe === "Semua" ? t("label_all") : translateLabel(tipe);
    const btn = el(`<button class="filter-pill ${tipe === ACTIVE_EXP_TAB ? "active" : ""}">${label}</button>`);
    btn.addEventListener("click", () => {
      ACTIVE_EXP_TAB = tipe;
      document.querySelectorAll("#exp-tabs .filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      drawExperienceList();
    });
    tabsWrap.appendChild(btn);
  });

  drawExperienceList();
}

function drawExperienceList() {
  const list = document.getElementById("exp-list");
  list.innerHTML = "";
  const filtered = ACTIVE_EXP_TAB === "Semua"
    ? ALL_EXPERIENCE
    : ALL_EXPERIENCE.filter(r => r.tipe === ACTIVE_EXP_TAB);

  if (!filtered.length) {
    list.appendChild(el(`<div class="empty-state">${t("empty_experience_category")}</div>`));
    return;
  }

  filtered.forEach(row => {
    const hasImage = row.gambar_url && !row.gambar_url.startsWith("ISI:");
    const hasLogo = row.logo_url && !row.logo_url.startsWith("ISI:");
    const initial = (row.institusi || row.posisi || "?").trim().slice(0, 1).toUpperCase();
    const logoHtml = hasLogo ? `<img src="${row.logo_url}" alt="">` : initial;

    const bullets = pick(row, "deskripsi")
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    const achievements = pick(row, "pencapaian")
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    const card = el(`
      <div class="exp-card">
        <div class="exp-card-header">
          <div class="exp-logo">${logoHtml}</div>
          <div class="exp-heading">
            <div class="exp-title-row">
              <span class="exp-role">${row.posisi || ""}</span>
              <span class="exp-date">${row.tanggal_mulai || ""}${row.tanggal_selesai ? " – " + row.tanggal_selesai : ""}</span>
            </div>
            <p class="exp-institusi">${row.institusi || ""}</p>
          </div>
          ${row.tipe ? `<span class="exp-badge">${translateLabel(row.tipe)}</span>` : ""}
        </div>
        <hr class="exp-divider">
        <div class="exp-preview-row">
          ${hasImage ? `<div class="exp-thumb"><img src="${row.gambar_url}" alt=""></div>` : ""}
          <div class="exp-preview-window">
            ${bullets.length ? `<ul class="exp-bullets">${bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : ""}
          </div>
        </div>
        <div class="exp-tools"></div>
        <div class="exp-links"></div>
        <div class="exp-click-hint"><span>${t("exp_view_detail_hint")}</span><span class="exp-click-hint-arrow">→</span></div>
      </div>
    `);

    const toolsWrap = card.querySelector(".exp-tools");
    splitTags(row.tools).forEach(toolName => {
      const chip = el(`<span class="skill-tag clickable small">${toolIconOrFallback(toolName, findToolIconUrl(toolName))}<span>${toolName}</span></span>`);
      chip.addEventListener("click", (e) => { e.stopPropagation(); openToolModal(toolName); });
      toolsWrap.appendChild(chip);
    });

    const linksWrap = card.querySelector(".exp-links");
    splitTags(row.project_terkait).forEach(projectId => {
      const linkBtn = el(`<button class="exp-project-link">Lihat project terkait →</button>`);
      linkBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const proj = ALL_PROJECTS.find(p => p.id === projectId);
        if (proj) openModal(proj);
      });
      linksWrap.appendChild(linkBtn);
    });

    card.addEventListener("click", () => openExpModal(row));
    list.appendChild(card);
  });
}

/* ============================================================
   EXPERIENCE DETAIL MODAL
   ============================================================ */
function openExpModal(row) {
  const hasImage = row.gambar_url && !row.gambar_url.startsWith("ISI:");
  document.getElementById("exp-modal-cover").innerHTML = hasImage
    ? `<img src="${row.gambar_url}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">` : "";
  document.getElementById("exp-modal-badge").textContent = translateLabel(row.tipe) || "";
  document.getElementById("exp-modal-title").textContent = row.posisi || "";
  document.getElementById("exp-modal-date").textContent =
    `${row.tanggal_mulai || ""}${row.tanggal_selesai ? " – " + row.tanggal_selesai : ""}`;
  document.getElementById("exp-modal-institusi").textContent = row.institusi || "";

  const bullets = pick(row, "deskripsi").split("\n").map(s => s.trim()).filter(Boolean);
  const didBlock = document.getElementById("exp-modal-did-block");
  if (bullets.length) {
    document.getElementById("exp-modal-bullets").innerHTML = bullets.map(b => `<li>${b}</li>`).join("");
    didBlock.style.display = "block";
  } else {
    didBlock.style.display = "none";
  }

  const achievements = pick(row, "pencapaian").split("\n").map(s => s.trim()).filter(Boolean);
  const achievementsBlock = document.getElementById("exp-modal-achievements-block");
  if (achievements.length) {
    document.getElementById("exp-modal-achievements").innerHTML = achievements.map(b => `<li>${b}</li>`).join("");
    achievementsBlock.style.display = "block";
  } else {
    achievementsBlock.style.display = "none";
  }

  const docBlock = document.getElementById("exp-modal-documentation-block");
  const docWrap = document.getElementById("exp-modal-documentation");
  if (row.dokumentasi_url && !row.dokumentasi_url.startsWith("ISI:")) {
    docWrap.innerHTML = `<iframe src="${normalizeUrl(row.dokumentasi_url)}" loading="lazy" allowfullscreen></iframe>`;
    docBlock.style.display = "block";
  } else {
    docWrap.innerHTML = "";
    docBlock.style.display = "none";
  }

  const toolsBlock = document.getElementById("exp-modal-tools-block");
  const toolsWrap = document.getElementById("exp-modal-tools");
  const tools = splitTags(row.tools);
  if (tools.length) {
    toolsWrap.innerHTML = tools.map(toolName =>
      `<span class="skill-tag clickable small" data-tool="${toolName}">${toolIconOrFallback(toolName, findToolIconUrl(toolName))}<span>${toolName}</span></span>`
    ).join("");
    toolsWrap.querySelectorAll("[data-tool]").forEach(node => {
      node.addEventListener("click", () => openToolModal(node.dataset.tool));
    });
    toolsBlock.style.display = "block";
  } else {
    toolsBlock.style.display = "none";
  }

  const isPendidikan = (row.tipe || "").toLowerCase().includes("pendidikan");
  document.getElementById("exp-modal-projects-label").textContent = isPendidikan
    ? t("exp_modal_projects_label_achievement")
    : t("exp_modal_projects_label_project");

  const projBlock = document.getElementById("exp-modal-projects-block");
  const projWrap = document.getElementById("exp-modal-projects");
  const relatedIds = splitTags(row.project_terkait);
  const relatedProjects = relatedIds.map(id => ALL_PROJECTS.find(p => p.id === id)).filter(Boolean);
  if (relatedProjects.length) {
    projWrap.innerHTML = relatedProjects.map(p => `<li data-project-id="${p.id}" class="linkable-item">📁 ${p.nama_project}</li>`).join("");
    projWrap.querySelectorAll("[data-project-id]").forEach(node => {
      node.addEventListener("click", () => {
        const proj = ALL_PROJECTS.find(p => p.id === node.dataset.projectId);
        closeExpModal();
        if (proj) openModal(proj);
      });
    });
    projBlock.style.display = "block";
  } else {
    projBlock.style.display = "none";
  }

  document.getElementById("exp-modal-overlay").classList.add("open");
}

function closeExpModal() {
  document.getElementById("exp-modal-overlay").classList.remove("open");
}

document.getElementById("exp-modal-close").addEventListener("click", closeExpModal);
document.getElementById("exp-modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "exp-modal-overlay") closeExpModal();
});

/* ============================================================
   ICON MAPPING (khusus kategori Tools)
   Prioritas: 1) icon_url dari sheet Skills, 2) tebakan Simple Icons, 3) badge inisial
   ============================================================ */
let TOOL_ICON_MAP = {}; // diisi otomatis dari kolom icon_url di sheet Skills
let HARD_SKILL_PROJECT_MAP = {}; // diisi dari kolom hard_skill_relevan di sheet Skills (nama_skill -> [nama project])

const TOOL_ICON_SLUGS = {
  "python": "python",
  "microsoft excel": "microsoftexcel",
  "excel": "microsoftexcel",
  "google sheets": "googlesheets",
  "google colab": "googlecolab",
  "google bigquery": "googlebigquery",
  "bigquery": "googlebigquery",
  "supabase": "supabase",
  "postgresql": "postgresql",
  "figma": "figma",
  "canva": "canva",
  "google docs": "googledocs",
  "microsoft word": "microsoftword",
  "microsoft powerpoint": "microsoftpowerpoint",
  "tableau": "tableau",
  "power bi": "powerbi",
  "mysql": "mysql",
  "jupyter": "jupyter",
  "github": "github",
  "git": "git",
  "dbeaver": "dbeaver",
};

function findToolIconUrl(name) {
  const key = (name || "").toLowerCase().trim();
  if (!key) return null;

  // 1) cek dulu link icon yang kamu isi manual di sheet Skills
  for (const [sheetName, url] of Object.entries(TOOL_ICON_MAP)) {
    if (key.includes(sheetName) || sheetName.includes(key)) return url;
  }
  // 2) fallback: tebak dari Simple Icons
  for (const [needle, slug] of Object.entries(TOOL_ICON_SLUGS)) {
    if (key.includes(needle)) return `https://cdn.simpleicons.org/${slug}`;
  }
  return null;
}

function toolIconOrFallback(name, url) {
  const initial = (name || "?").trim().slice(0, 1).toUpperCase();
  if (!url) return `<span class="icon-fallback">${initial}</span>`;
  return `<img src="${url}" alt="" loading="lazy" onerror="this.outerHTML='<span class=&quot;icon-fallback&quot;>${initial}</span>'">`;
}

/* ============================================================
   SKILLS — sidebar + panel (pola sama kayak Projects)
   ============================================================ */
let ALL_SKILLS = [];
let ACTIVE_SKILL_GROUP = "Semua";

async function renderSkills() {
  const rows = await fetchCSV(CONFIG.SKILLS_CSV_URL);
  const staticWrap = document.getElementById("skills-static");
  const sidebar = document.getElementById("skills-filter-bar");
  const panel = document.getElementById("skills-panel");

  if (!rows.length) {
    staticWrap.innerHTML = `<div class="empty-state">${t("empty_skills")}</div>`;
    sidebar.innerHTML = "";
    panel.innerHTML = "";
    return;
  }

  const staticItems = []; // Soft Skill, Hard Skill, dst — langsung tampil semua
  const toolItems = [];   // Tools — masuk sidebar + panel

  rows.forEach(r => {
    const isTools = (r.kategori || "").toLowerCase().includes("tool");
    if (isTools) {
      if (r.icon_url && !r.icon_url.startsWith("ISI:")) {
        TOOL_ICON_MAP[r.nama_skill.toLowerCase().trim()] = r.icon_url;
      }
      toolItems.push({ ...r, isTools: true, group: r.sub_kategori || "Lainnya" });
    } else {
      // "isHard" sekarang ngenalin "Hard Skill" ATAU "Technical Skills" (fleksibel nama kategorinya)
      const isHard = /hard|technical/i.test(r.kategori || "");
      if (isHard && r.hard_skill_relevan && r.hard_skill_relevan.trim()) {
        HARD_SKILL_PROJECT_MAP[r.nama_skill.toLowerCase().trim()] = splitTags(r.hard_skill_relevan);
      }
      staticItems.push({ ...r, isTools: false, isHard, group: r.kategori || "Lainnya" });
    }
  });

  // render Soft Skill / Hard Skill langsung, semua tampil
  staticWrap.innerHTML = "";
  const staticGroups = {};
  staticItems.forEach(s => { (staticGroups[s.group] = staticGroups[s.group] || []).push(s); });
  Object.entries(staticGroups).forEach(([group, items]) => {
    const block = el(`<div class="skill-category-block"><p class="skill-category-title">${group}</p><div class="skill-tags"></div></div>`);
    const tagsWrap = block.querySelector(".skill-tags");
    items.forEach(item => tagsWrap.appendChild(renderSkillTagCard(item)));
    staticWrap.appendChild(block);
  });

  // Tools: sidebar sub-kategori + panel
  ALL_SKILLS = toolItems;
  if (!toolItems.length) {
    sidebar.innerHTML = "";
    panel.innerHTML = "";
    return;
  }

  const groupOrder = [];
  toolItems.forEach(s => { if (!groupOrder.includes(s.group)) groupOrder.push(s.group); });

  sidebar.innerHTML = "";
  ["Semua", ...groupOrder].forEach(group => {
    const label = group === "Semua" ? t("label_all") : group;
    const btn = el(`<button class="filter-pill ${group === ACTIVE_SKILL_GROUP ? "active" : ""}">${label}</button>`);
    btn.addEventListener("click", () => {
      ACTIVE_SKILL_GROUP = group;
      document.querySelectorAll("#skills-filter-bar .filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      drawSkillsPanel();
    });
    sidebar.appendChild(btn);
  });

  drawSkillsPanel();
}

function resolveSkillIcon(item) {
  if (item.icon_url && !item.icon_url.startsWith("ISI:")) {
    return toolIconOrFallback(item.nama_skill, item.icon_url);
  }
  if (item.icon_emoji) {
    return `<span class="icon-emoji">${item.icon_emoji}</span>`;
  }
  if (item.isTools) {
    return toolIconOrFallback(item.nama_skill, findToolIconUrl(item.nama_skill));
  }
  return `<span class="icon-fallback">${(item.nama_skill || "?").trim().slice(0, 1).toUpperCase()}</span>`;
}

function renderSkillTagCard(item) {
  const level = item["level (opsional)"] ? ` · ${item["level (opsional)"]}` : "";
  const iconHtml = resolveSkillIcon(item);
  const clickable = item.isTools || item.isHard;
  // kolom "eng" di sheet Skills isinya versi Indonesia (nama_skill sendiri udah default Inggris)
  // jadi kalau mode ID aktif dan "eng" keisi, tampilin itu; selain itu tampilin nama_skill apa adanya
  const displayName = (CURRENT_LANG === "id" && item.eng && item.eng.trim()) ? item.eng : item.nama_skill;
  const tag = el(`<span class="skill-tag${clickable ? " clickable" : ""}">${iconHtml}<span>${displayName}${level}</span></span>`);
  if (clickable) {
    tag.addEventListener("click", () => openToolModal(item.nama_skill));
  }
  return tag;
}

function drawSkillsPanel() {
  const panel = document.getElementById("skills-panel");
  panel.innerHTML = "";

  if (ACTIVE_SKILL_GROUP === "Semua") {
    const groups = {};
    ALL_SKILLS.forEach(s => { (groups[s.group] = groups[s.group] || []).push(s); });
    Object.entries(groups).forEach(([group, items]) => {
      const block = el(`<div class="skill-category-block"><p class="skill-category-title">${group}</p><div class="skill-tags"></div></div>`);
      const tagsWrap = block.querySelector(".skill-tags");
      items.forEach(item => tagsWrap.appendChild(renderSkillTagCard(item)));
      panel.appendChild(block);
    });
  } else {
    const items = ALL_SKILLS.filter(s => s.group === ACTIVE_SKILL_GROUP);
    const tagsWrap = el(`<div class="skill-tags"></div>`);
    items.forEach(item => tagsWrap.appendChild(renderSkillTagCard(item)));
    panel.appendChild(tagsWrap);
  }
}

/* ============================================================
   PROJECTS
   ============================================================ */
let ALL_PROJECTS = [];
let ACTIVE_FILTER = "Semua";

async function renderProjects() {
  const sheetRows = await fetchCSV(CONFIG.PROJECTS_CSV_URL);
  let githubRows = [];
  if (CONFIG.ENABLE_GITHUB_AUTO_SECTION && CONFIG.GITHUB_USERNAME && !CONFIG.GITHUB_USERNAME.startsWith("username-")) {
    githubRows = await fetchGithubAutoProjects();
  }
  ALL_PROJECTS = [...sheetRows, ...githubRows];

  if (!ALL_PROJECTS.length) {
    document.getElementById("filter-bar").innerHTML = "";
    document.getElementById("projects-grid").innerHTML =
      `<div class="empty-state">${t("empty_projects")}</div>`;
    return;
  }

  const categories = new Set(["Semua"]);
  ALL_PROJECTS.forEach(p => splitTags(p.kategori).forEach(c => categories.add(c)));

  const filterBar = document.getElementById("filter-bar");
  filterBar.innerHTML = "";
  categories.forEach(cat => {
    const label = cat === "Semua" ? t("label_all") : cat;
    const btn = el(`<button class="filter-pill ${cat === ACTIVE_FILTER ? "active" : ""}">${label}</button>`);
    btn.addEventListener("click", () => {
      ACTIVE_FILTER = cat;
      document.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      drawProjectsGrid();
    });
    filterBar.appendChild(btn);
  });

  drawProjectsGrid();
}

function drawProjectsGrid() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  const filtered = ACTIVE_FILTER === "Semua"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => splitTags(p.kategori).includes(ACTIVE_FILTER));

  if (!filtered.length) {
    grid.appendChild(el(`<div class="empty-state">${t("empty_projects_category")}</div>`));
    return;
  }

  filtered.forEach(p => {
    const cover = p.cover_image_url && !p.cover_image_url.startsWith("ISI:")
      ? `<img src="${p.cover_image_url}" alt="${p.nama_project}">`
      : (p.nama_project || "").slice(0, 1).toUpperCase();
    const card = el(`
      <button class="project-card">
        <div class="project-cover">${cover}</div>
        <div class="project-info">
          <span class="project-status">${translateLabel(p.status) || translateLabel("Selesai")}</span>
          <p class="project-name">${p.nama_project || "Untitled"}</p>
          <p class="project-desc">${pick(p, "deskripsi_singkat")}</p>
          <div class="project-tags">
            ${splitTags(p.tools).slice(0, 3).map(tool => `<span class="project-tag">${tool}</span>`).join("")}
          </div>
          <div class="exp-click-hint"><span>${t("exp_view_detail_hint")}</span><span class="exp-click-hint-arrow">→</span></div>
        </div>
      </button>
    `);
    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });
}

async function fetchGithubAutoProjects() {
  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=user:${CONFIG.GITHUB_USERNAME}+topic:${CONFIG.GITHUB_AUTO_TOPIC}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map(repo => ({
      id: "gh-" + repo.id,
      nama_project: repo.name,
      kategori: "Dari GitHub",
      status: "Selesai",
      deskripsi_singkat: repo.description || "",
      deskripsi_lengkap: repo.description || "",
      cover_image_url: "",
      link_github: repo.html_url,
      link_dashboard: "",
      tools: repo.language || "",
      file_list: "",
      tanggal: repo.updated_at ? repo.updated_at.slice(0, 10) : "",
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* ============================================================
   TOOL CROSS-REFERENCE MODAL
   ============================================================ */
function openToolModal(toolName) {
  document.getElementById("tool-modal-title").textContent = toolName;

  const needle = toolName.toLowerCase();
  const relevantNames = HARD_SKILL_PROJECT_MAP[needle];

  let matchedProjects;
  if (relevantNames && relevantNames.length) {
    // pakai kolom hard_skill_relevan -> cocokin persis sama nama_project
    matchedProjects = ALL_PROJECTS.filter(p =>
      relevantNames.some(name => name.toLowerCase().trim() === (p.nama_project || "").toLowerCase().trim())
    );
  } else {
    // fallback: cari di kolom "tools" (buat item Tools yang punya icon, bukan Hard Skill)
    matchedProjects = ALL_PROJECTS.filter(p => splitTags(p.tools).some(tag => tag.toLowerCase().includes(needle) || needle.includes(tag.toLowerCase())));
  }
  const matchedExp = ALL_EXPERIENCE.filter(r => splitTags(r.tools).some(tag => tag.toLowerCase().includes(needle) || needle.includes(tag.toLowerCase())));

  const projBlock = document.getElementById("tool-modal-projects-block");
  const projList = document.getElementById("tool-modal-projects");
  if (matchedProjects.length) {
    projList.innerHTML = matchedProjects.map(p => `<li data-project-id="${p.id}" class="linkable-item">📁 ${p.nama_project}</li>`).join("");
    projList.querySelectorAll("[data-project-id]").forEach(node => {
      node.addEventListener("click", () => {
        const proj = ALL_PROJECTS.find(p => p.id === node.dataset.projectId);
        closeToolModal();
        if (proj) openModal(proj);
      });
    });
    projBlock.style.display = "block";
  } else {
    projBlock.style.display = "none";
  }

  const expBlock = document.getElementById("tool-modal-experience-block");
  const expList = document.getElementById("tool-modal-experience");
  if (matchedExp.length) {
    expList.innerHTML = matchedExp.map((r, i) => `<li data-exp-index="${i}" class="linkable-item">💼 ${r.posisi} · ${r.institusi || ""}</li>`).join("");
    expList.querySelectorAll("[data-exp-index]").forEach(node => {
      node.addEventListener("click", () => {
        const row = matchedExp[Number(node.dataset.expIndex)];
        closeToolModal();
        if (row) openExpModal(row);
      });
    });
    expBlock.style.display = "block";
  } else {
    expBlock.style.display = "none";
  }

  const emptyMsg = document.getElementById("tool-modal-empty");
  if (!matchedProjects.length && !matchedExp.length) {
    emptyMsg.textContent = t("tool_no_data");
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  document.getElementById("tool-modal-overlay").classList.add("open");
}

function closeToolModal() {
  document.getElementById("tool-modal-overlay").classList.remove("open");
}

document.getElementById("tool-modal-close").addEventListener("click", closeToolModal);
document.getElementById("tool-modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "tool-modal-overlay") closeToolModal();
});
function openModal(p) {
  document.getElementById("modal-status").textContent = translateLabel(p.status) || translateLabel("Selesai");
  document.getElementById("modal-title").textContent = p.nama_project || "";
  document.getElementById("modal-desc").textContent = pick(p, "deskripsi_lengkap") || pick(p, "deskripsi_singkat");

  const cover = document.getElementById("modal-cover");
  cover.innerHTML = (p.cover_image_url && !p.cover_image_url.startsWith("ISI:"))
    ? `<img src="${p.cover_image_url}" alt="${p.nama_project}">` : "";

  const tools = document.getElementById("modal-tools");
  tools.innerHTML = splitTags(p.tools).map(toolName => {
    const iconHtml = toolIconOrFallback(toolName, findToolIconUrl(toolName));
    return `<span class="skill-tag">${iconHtml}<span>${toolName}</span></span>`;
  }).join("");

  const filesBlock = document.getElementById("modal-files-block");
  const filesList = document.getElementById("modal-files");
  const files = splitTags(p.file_list);
  if (files.length) {
    filesList.innerHTML = files.map(f => `<li>📄 ${f}</li>`).join("");
    filesBlock.style.display = "block";
  } else {
    filesBlock.style.display = "none";
  }

  const dashBlock = document.getElementById("modal-dashboard-block");
  const dashWrap = document.getElementById("modal-dashboard");
  if (p.link_dashboard && !p.link_dashboard.startsWith("ISI:")) {
    dashWrap.innerHTML = `<iframe src="${p.link_dashboard}" loading="lazy" allowfullscreen></iframe>`;
    dashBlock.style.display = "block";
  } else {
    dashBlock.style.display = "none";
  }

  const githubBtn = document.getElementById("modal-github");
  if (p.link_github && !p.link_github.startsWith("ISI:")) {
    githubBtn.href = p.link_github;
    githubBtn.style.display = "inline-flex";
  } else {
    githubBtn.style.display = "none";
  }

  const relatedBlock = document.getElementById("modal-related-block");
  const relatedWrap = document.getElementById("modal-related");
  const relatedExp = ALL_EXPERIENCE.filter(r => splitTags(r.project_terkait).includes(p.id));
  if (relatedExp.length) {
    document.getElementById("modal-related-title").textContent = t("modal_related_dikerjakan");
    relatedWrap.innerHTML = relatedExp.map(r => `<div class="linkable-item">💼 ${r.posisi} · ${r.institusi || ""}</div>`).join("");
    relatedBlock.style.display = "block";
  } else {
    relatedBlock.style.display = "none";
  }

  document.getElementById("modal-overlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.getElementById("modal-dashboard").innerHTML = "";
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); closeToolModal(); closeExpModal(); }
});

/* ============================================================
   SPRITE SEQUENCE — 6 frame pose per mode, loop, mulai pas discroll masuk
   ============================================================ */
const SPRITE = { day: [], night: [], index: 0, timer: null, playing: false, observed: false };
const FRAME_DURATIONS = [1300, 450, 550, 600, 650, 1500]; // ms per frame F1..F6 (idle lama, transisi cepat, pose akhir lama)
const reduceMotionSprite = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function tickSprite() {
  const dayImg = document.getElementById("illust-day");
  const nightImg = document.getElementById("illust-night");
  if (SPRITE.day.length) dayImg.src = SPRITE.day[SPRITE.index % SPRITE.day.length];
  if (SPRITE.night.length) nightImg.src = SPRITE.night[SPRITE.index % SPRITE.night.length];
  const duration = FRAME_DURATIONS[SPRITE.index % FRAME_DURATIONS.length] || 500;
  SPRITE.index++;
  SPRITE.timer = setTimeout(tickSprite, duration);
}

function startSprite() {
  if (SPRITE.playing || (!SPRITE.day.length && !SPRITE.night.length)) return;
  if (reduceMotionSprite) {
    // statis di pose "senyum & dadah" (frame index 2), nggak looping
    const dayImg = document.getElementById("illust-day");
    const nightImg = document.getElementById("illust-night");
    if (SPRITE.day.length) dayImg.src = SPRITE.day[Math.min(2, SPRITE.day.length - 1)];
    if (SPRITE.night.length) nightImg.src = SPRITE.night[Math.min(2, SPRITE.night.length - 1)];
    return;
  }
  SPRITE.playing = true;
  SPRITE.index = 0;
  tickSprite();
}

function stopSprite() {
  SPRITE.playing = false;
  clearTimeout(SPRITE.timer);
}

function initSpriteObserver() {
  if (SPRITE.observed) return;
  SPRITE.observed = true;
  const stage = document.getElementById("illust-day")?.closest(".illust-stage");
  if (!stage) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) startSprite(); else stopSprite();
    });
  }, { threshold: 0.35 });
  observer.observe(stage);
}

/* ============================================================
   LANGUAGE TOGGLE — ID/EN, tersimpan di localStorage
   ============================================================ */
function applyLanguage(lang) {
  CURRENT_LANG = lang;
  localStorage.setItem("lang", lang);
  applyStaticI18n();
  if (window.__refreshThemeLabel) window.__refreshThemeLabel();
  // re-render bagian yang datanya udah kebaca, biar teks dinamis ikut ganti bahasa
  renderProfile();
  renderSkills();
  renderExperience();
  renderProjects();
}

function initLangToggle() {
  const toggle = document.getElementById("lang-toggle");
  if (!toggle) return;
  applyStaticI18n();
  toggle.addEventListener("click", () => {
    applyLanguage(CURRENT_LANG === "id" ? "en" : "id");
  });
}
initLangToggle();

/* ============================================================
   THEME TOGGLE — day/night, tersimpan di localStorage
   ============================================================ */
/* ============================================================
   MUSIC TOGGLE — floating button, opt-in, nggak autoplay
   ============================================================ */
function initMusicToggle(lofiUrl) {
  const btn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-toggle-icon");
  const audio = document.getElementById("lofi-audio");
  if (!btn || !isFilled(lofiUrl)) return; // sembunyi total kalau kolom lofi_url kosong

  audio.src = lofiUrl;
  audio.volume = 0.35; // volume sedang, nggak kaget pas pertama nyala
  btn.style.display = "flex";

  let playing = false;
  function updateIcon() {
    icon.textContent = playing ? "🎶" : "🎵";
    btn.classList.toggle("playing", playing);
  }

  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      playing = false;
    } else {
      audio.play().catch(() => {}); // kalau browser tetep block, diemin aja nggak error
      playing = true;
    }
    updateIcon();
  });
}

function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-toggle-icon");
  const label = document.getElementById("theme-toggle-text");
  if (!toggle) return;

  function applyTheme(theme) {
    if (theme === "day") {
      document.documentElement.setAttribute("data-theme", "day");
      icon.textContent = "☀️";
      if (label) label.textContent = t("theme_light_label");
    } else {
      document.documentElement.removeAttribute("data-theme");
      icon.textContent = "🌙";
      if (label) label.textContent = t("theme_dark_label");
    }
  }

  const saved = localStorage.getItem("theme");
  applyTheme(saved || "night"); // default: dark mode

  toggle.addEventListener("click", () => {
    const isDay = document.documentElement.getAttribute("data-theme") === "day";
    const next = isDay ? "night" : "day";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  // expose biar bisa dipanggil ulang pas ganti bahasa
  window.__refreshThemeLabel = () => {
    const isDay = document.documentElement.getAttribute("data-theme") === "day";
    if (label) label.textContent = t(isDay ? "theme_light_label" : "theme_dark_label");
  };
}
initThemeToggle();

function initScrollSpy() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));
}
initScrollSpy();
(async () => {
  renderProfile();
  await renderSkills();
  renderExperience();
  renderProjects();
})();
