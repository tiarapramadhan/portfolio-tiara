# Data Science Portfolio — Tiara Putri Ramadhani

Personal portfolio website showcasing my work, skills, and experience as a Data Science undergraduate at Cakrawala University. Built as a lightweight, fully custom site rather than a page-builder template, focused on being fast, easy to scan, and genuinely reflective of what I've worked on.

**🔗 Live site:** [portfolio-tiara-putri-ramadhani.vercel.app](https://portfolio-tiara-putri-ramadhani.vercel.app)

## What's in it

- **Hero** — quick intro, current focus, and links to reach me
- **Skills** — soft skills, technical skills, and tech stack, organized by category (Programming, Data Analysis, Database, Development, Design & Productivity)
- **Experience** — internships, organizational roles, and education, each with responsibilities, achievements, tools used, and (where relevant) links to the specific projects done during that role
- **Projects** — data analysis, data engineering, and data science projects, each with a description, tools used, a link to the live dashboard where applicable, and links to the source code
- **Contact** — a working contact form plus direct links (email, LinkedIn, GitHub, WhatsApp)

## Notable features

- **Dark / light mode** toggle, remembered across visits
- **Bilingual (Indonesian / English)** toggle — content adapts to whichever recruiter is reading it, local or remote
- **Cross-referenced skills** — clicking a skill shows exactly which projects and experiences it was used in, instead of just listing it as a claim
- Optional ambient touches: an animated illustration that shifts between a day and night scene, and an opt-in lofi music toggle

## Tech stack

Built with plain HTML, CSS, and JavaScript (no framework) for speed and simplicity, hosted on **Vercel**. Content — profile info, skills, experience, and projects — is managed through a connected **Google Sheet**, so the site updates whenever the underlying data changes, without needing a redeploy for content-only changes.

## Get in touch

Open to internship, full-time, and remote data opportunities. Reach out through the contact form on the site, or via the links in the footer.

## Update — Dashboard project sekarang link, bukan embed

Sebelumnya `link_dashboard` di-embed pakai iframe di modal detail project. Ternyata Google Looker Studio sering nge-block iframe embed dari domain luar (X-Frame-Options/CSP), jadi hasilnya suka muncul error "refused to connect". Sekarang diganti jadi tombol "Lihat Dashboard Live ↗" yang buka dashboard-nya di tab baru — lebih stabil, lebih cepat, dan lebih umum dipakai di portfolio profesional (preview gambar + link out, bukan embed langsung).

Kolom `link_dashboard` di sheet Projects **isinya tetap sama** (link biasa ke dashboard Looker Studio kamu, nggak perlu embed URL khusus lagi) — cukup pastiin dashboard-nya udah di-share "Anyone with the link can view".
