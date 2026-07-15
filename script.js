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
async function renderProfile() {
  const rows = await fetchCSV(CONFIG.PROFILE_CSV_URL);
  if (!rows.length) return;
  const p = rows[0];

  document.getElementById("hero-name").textContent = p.nama || "—";
  document.getElementById("hero-tagline").textContent = p.tagline || "";
  document.getElementById("hero-bio").textContent = p.bio || "";
  document.getElementById("footer-name").textContent = p.nama || "—";
  document.getElementById("footer-year").textContent = new Date().getFullYear();
  document.getElementById("footer-logo-name").textContent = p.nama || "Portfolio";
  document.getElementById("footer-tagline").textContent = p.tagline || "";

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
  if (p.link_cv) cv.href = p.link_cv; else cv.style.display = "none";

  // hero socials
  const heroSocials = document.getElementById("hero-socials");
  heroSocials.innerHTML = "";
  if (p.link_linkedin) heroSocials.appendChild(el(`<a href="${p.link_linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>`));
  if (p.link_github) heroSocials.appendChild(el(`<a href="${p.link_github}" target="_blank" rel="noopener" aria-label="GitHub">gh</a>`));
  if (p.wa_number) heroSocials.appendChild(el(`<a href="https://wa.me/${p.wa_number.replace(/[^0-9]/g,"")}" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>`));
  if (p.email) heroSocials.appendChild(el(`<a href="mailto:${p.email}" aria-label="Email">✉</a>`));

  // footer socials
  const footerSocials = document.getElementById("footer-socials");
  footerSocials.innerHTML = "";
  if (p.link_linkedin) footerSocials.appendChild(el(`<a href="${p.link_linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>`));
  if (p.link_github) footerSocials.appendChild(el(`<a href="${p.link_github}" target="_blank" rel="noopener" aria-label="GitHub">gh</a>`));
  if (p.wa_number) footerSocials.appendChild(el(`<a href="https://wa.me/${p.wa_number.replace(/[^0-9]/g,"")}" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>`));
  if (p.email) footerSocials.appendChild(el(`<a href="mailto:${p.email}" aria-label="Email">✉</a>`));

  // contact form -> buka email client dengan pesan udah keisi (nggak butuh backend)
  const form = document.getElementById("contact-form");
  if (form && p.email) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
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
    list.innerHTML = `<div class="empty-state">Belum ada data pengalaman.</div>`;
    return;
  }

  const tipes = new Set(["Semua"]);
  ALL_EXPERIENCE.forEach(r => { if (r.tipe) tipes.add(r.tipe); });

  tabsWrap.innerHTML = "";
  tipes.forEach(tipe => {
    const btn = el(`<button class="filter-pill ${tipe === ACTIVE_EXP_TAB ? "active" : ""}">${tipe}</button>`);
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
    list.appendChild(el(`<div class="empty-state">Belum ada data di kategori ini.</div>`));
    return;
  }

  filtered.forEach(row => {
    const hasImage = row.gambar_url && !row.gambar_url.startsWith("ISI:");
    const hasLogo = row.logo_url && !row.logo_url.startsWith("ISI:");
    const initial = (row.institusi || row.posisi || "?").trim().slice(0, 1).toUpperCase();
    const logoHtml = hasLogo ? `<img src="${row.logo_url}" alt="">` : initial;

    const bullets = (row.deskripsi || "")
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
          ${row.tipe ? `<span class="exp-badge">${row.tipe}</span>` : ""}
        </div>
        <hr class="exp-divider">
        <ul class="exp-bullets">
          ${bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
        ${hasImage ? `<div class="exp-cover"><img src="${row.gambar_url}" alt=""></div>` : ""}
        <div class="exp-tools"></div>
        <div class="exp-links"></div>
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
  document.getElementById("exp-modal-badge").textContent = row.tipe || "";
  document.getElementById("exp-modal-title").textContent = row.posisi || "";
  document.getElementById("exp-modal-date").textContent =
    `${row.tanggal_mulai || ""}${row.tanggal_selesai ? " – " + row.tanggal_selesai : ""}`;
  document.getElementById("exp-modal-institusi").textContent = row.institusi || "";

  const bullets = (row.deskripsi || "").split("\n").map(s => s.trim()).filter(Boolean);
  document.getElementById("exp-modal-bullets").innerHTML = bullets.map(b => `<li>${b}</li>`).join("");

  const toolsBlock = document.getElementById("exp-modal-tools-block");
  const toolsWrap = document.getElementById("exp-modal-tools");
  const tools = splitTags(row.tools);
  if (tools.length) {
    toolsWrap.innerHTML = tools.map(t =>
      `<span class="skill-tag clickable small" data-tool="${t}">${toolIconOrFallback(t, findToolIconUrl(t))}<span>${t}</span></span>`
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
    ? "Prestasi selama di sini"
    : "Project selama menjabat di posisi ini";

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
    staticWrap.innerHTML = `<div class="empty-state">Belum ada data skills.</div>`;
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
      staticItems.push({ ...r, isTools: false, isHard: (r.kategori || "").toLowerCase().includes("hard"), group: r.kategori || "Lainnya" });
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
    const btn = el(`<button class="filter-pill ${group === ACTIVE_SKILL_GROUP ? "active" : ""}">${group}</button>`);
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
  const tag = el(`<span class="skill-tag${clickable ? " clickable" : ""}">${iconHtml}<span>${item.nama_skill}${level}</span></span>`);
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
      `<div class="empty-state">Belum ada project. Isi sheet Projects dulu ya ✦</div>`;
    return;
  }

  const categories = new Set(["Semua"]);
  ALL_PROJECTS.forEach(p => splitTags(p.kategori).forEach(c => categories.add(c)));

  const filterBar = document.getElementById("filter-bar");
  filterBar.innerHTML = "";
  categories.forEach(cat => {
    const btn = el(`<button class="filter-pill ${cat === ACTIVE_FILTER ? "active" : ""}">${cat}</button>`);
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
    grid.appendChild(el(`<div class="empty-state">Belum ada project di kategori ini. Coming soon ✦</div>`));
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
          <span class="project-status">${p.status || "Selesai"}</span>
          <p class="project-name">${p.nama_project || "Untitled"}</p>
          <p class="project-desc">${p.deskripsi_singkat || ""}</p>
          <div class="project-tags">
            ${splitTags(p.tools).slice(0, 3).map(t => `<span class="project-tag">${t}</span>`).join("")}
          </div>
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
  const matchedProjects = ALL_PROJECTS.filter(p => splitTags(p.tools).some(t => t.toLowerCase().includes(needle) || needle.includes(t.toLowerCase())));
  const matchedExp = ALL_EXPERIENCE.filter(r => splitTags(r.tools).some(t => t.toLowerCase().includes(needle) || needle.includes(t.toLowerCase())));

  const projList = document.getElementById("tool-modal-projects");
  projList.innerHTML = matchedProjects.length
    ? matchedProjects.map(p => `<li data-project-id="${p.id}" class="linkable-item">📁 ${p.nama_project}</li>`).join("")
    : `<li class="muted-item">Belum ada project yang tercatat</li>`;
  projList.querySelectorAll("[data-project-id]").forEach(node => {
    node.addEventListener("click", () => {
      const proj = ALL_PROJECTS.find(p => p.id === node.dataset.projectId);
      closeToolModal();
      if (proj) openModal(proj);
    });
  });

  const expList = document.getElementById("tool-modal-experience");
  expList.innerHTML = matchedExp.length
    ? matchedExp.map(r => `<li>💼 ${r.posisi} · ${r.institusi || ""}</li>`).join("")
    : `<li class="muted-item">Belum ada pengalaman yang tercatat</li>`;

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
  document.getElementById("modal-status").textContent = p.status || "Selesai";
  document.getElementById("modal-title").textContent = p.nama_project || "";
  document.getElementById("modal-desc").textContent = p.deskripsi_lengkap || p.deskripsi_singkat || "";

  const cover = document.getElementById("modal-cover");
  cover.innerHTML = (p.cover_image_url && !p.cover_image_url.startsWith("ISI:"))
    ? `<img src="${p.cover_image_url}" alt="${p.nama_project}">` : "";

  const tools = document.getElementById("modal-tools");
  tools.innerHTML = splitTags(p.tools).map(t => {
    const iconHtml = toolIconOrFallback(t, findToolIconUrl(t));
    return `<span class="skill-tag">${iconHtml}<span>${t}</span></span>`;
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
    document.getElementById("modal-related-title").textContent = "Dikerjakan selama";
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
   THEME TOGGLE — day/night, tersimpan di localStorage
   ============================================================ */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-toggle-icon");
  if (!toggle) return;

  function applyTheme(theme) {
    if (theme === "day") {
      document.documentElement.setAttribute("data-theme", "day");
      icon.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      icon.textContent = "🌙";
    }
  }

  const saved = localStorage.getItem("theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(saved || (systemPrefersLight ? "day" : "night"));

  toggle.addEventListener("click", () => {
    const isDay = document.documentElement.getAttribute("data-theme") === "day";
    const next = isDay ? "night" : "day";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
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
