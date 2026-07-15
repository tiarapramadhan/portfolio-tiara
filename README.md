# Portfolio Kamu — Panduan Setup (Tanpa Coding)

Situs ini otomatis ambil data dari Google Sheet kamu. Nggak perlu install apapun di laptop — semua bisa lewat browser.

## Langkah 1 — Publish Google Sheet jadi link CSV

Untuk **tiap tab** (Profile, Experience, Skills, Projects):

1. Buka Google Sheet kamu
2. Klik tab yang mau dipublish (misal "Profile")
3. Menu **File > Share > Publish to web**
4. Di dropdown pertama, pastiin yang dipilih tab yang benar (bukan "Entire Document")
5. Di dropdown kedua, pilih **Comma-separated values (.csv)**
6. Klik **Publish**, klik OK di konfirmasi
7. Copy link yang muncul

Ulangi untuk keempat tab. Kamu akan punya 4 link CSV.

## Langkah 2 — Isi link itu ke file `script.js`

1. Buka file `script.js` di folder ini pakai text editor apapun (Notepad, atau langsung edit di GitHub nanti — lihat Langkah 3)
2. Di bagian paling atas ada `CONFIG`, ganti tulisan `TEMPEL_LINK_CSV_..._DI_SINI` dengan link yang kamu dapat di Langkah 1
3. Simpan file

Ini satu-satunya bagian yang perlu "diedit" — cukup tempel link, nggak ada logika/kode yang perlu diubah.

## Langkah 3 — Upload ke GitHub

1. Buka [github.com/new](https://github.com/new), bikin repository baru (misal nama `portfolio-ku`), pilih **Public**
2. Setelah repo dibuat, klik **"uploading an existing file"**
3. Drag semua file di folder ini (`index.html`, `style.css`, `script.js`) ke situ
4. Klik **Commit changes**

Kalau nanti mau ubah link CSV atau apapun, kamu bisa edit langsung di GitHub: buka file-nya, klik ikon pensil (Edit), ubah, lalu **Commit changes**.

## Langkah 4 — Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com), daftar/login pakai akun **GitHub** kamu
2. Klik **Add New > Project**
3. Pilih repo `portfolio-ku` yang tadi kamu buat
4. Biarkan semua setting default (situs ini statis, nggak butuh build command apapun)
5. Klik **Deploy**

Tunggu sebentar, situs kamu langsung online dengan link `namarepo.vercel.app`.

## Selanjutnya

- **Update konten** (project baru, pengalaman baru, dll) → tinggal edit Google Sheet, otomatis kebaca web tanpa deploy ulang
- **Ganti warna/tampilan** → edit `style.css` (nilai warna ada di bagian `:root` paling atas)
- **Custom domain** → bisa ditambahin nanti lewat setting Vercel kalau mau beli domain sendiri

## Kalau ada yang kosong/belum muncul

- Pastikan link CSV di `script.js` udah kepasang dengan benar (bukan lagi tulisan `TEMPEL_LINK_...`)
- Pastikan sheet Google Sheets kamu sudah **Publish to web**, bukan cuma "Share"
- Kolom `cover_image_url`, `link_github`, `link_dashboard` yang masih ditulis "ISI: ..." akan disembunyikan otomatis di tampilan, jadi aman kalau belum lengkap semua

## Update terbaru — kolom baru di sheet Experience

Biar fitur "tools yang dipakai" dan "link ke project terkait" di kartu pengalaman jalan, tambah 3 kolom baru di tab **Experience**:

| Kolom | Isinya | Wajib? |
|---|---|---|
| `tools` | Tools yang dipakai, pisah koma (misal `Google Sheets, Excel`) | Opsional |
| `gambar_url` | Link gambar/screenshot kegiatan | Opsional |
| `project_terkait` | ID project dari sheet Projects yang berkaitan (misal `proj-001`), bisa lebih dari 1 dipisah koma | Opsional |

Kolom `id` di sheet Projects itu yang jadi acuan buat `project_terkait` — pastiin nulisnya persis sama (case-sensitive).


## Icon tools sekarang dari sheet, bukan tebakan

Tambah kolom `icon_url` di sheet **Skills** (isi cuma buat baris kategori "Tools"). Ini lebih akurat karena kamu yang nentuin linknya, bukan sistem yang nebak nama file.

Link siap pakai buat tools yang kamu punya sekarang (tinggal copy-paste ke kolom `icon_url`):

| nama_skill | icon_url |
|---|---|
| Python | `https://cdn.simpleicons.org/python` |
| Microsoft Excel | `https://cdn.simpleicons.org/microsoftexcel` |
| Google Sheets | `https://cdn.simpleicons.org/googlesheets` |
| Google Colab | `https://cdn.simpleicons.org/googlecolab` |
| Google BigQuery | `https://cdn.simpleicons.org/googlebigquery` |
| Supabase | `https://cdn.simpleicons.org/supabase` |
| PostgreSQL | `https://cdn.simpleicons.org/postgresql` |
| DBeaver | `https://cdn.simpleicons.org/dbeaver` |
| Figma | `https://cdn.simpleicons.org/figma` |
| Canva | `https://cdn.simpleicons.org/canva` |
| Tableau | `https://cdn.simpleicons.org/tableau` |
| Power BI | `https://cdn.simpleicons.org/powerbi` |
| Looker Studio | `https://www.google.com/s2/favicons?sz=64&domain=lookerstudio.google.com` |
| R | `https://www.google.com/s2/favicons?sz=64&domain=r-project.org` |

**Buat tools lain di masa depan** yang nggak ada di daftar ini: kalau tools-nya ada di [simpleicons.org](https://simpleicons.org), cari nama tools-nya di situ, klik, copy nama slug-nya, pakai format `https://cdn.simpleicons.org/NAMASLUG`. Kalau nggak ketemu di situ, pakai cara universal ini (jalan buat hampir semua tools/website): `https://www.google.com/s2/favicons?sz=64&domain=namawebsite.com` — tinggal ganti `namawebsite.com` sesuai website resmi tools-nya.


## Kategori Tools (sub_kategori)

Kalau kamu mau tools di section Skills dikelompokkan (Programming, Data Analysis, Database, dst), tambah kolom `sub_kategori` di sheet Skills — isi cuma buat baris yang `kategori`-nya "Tools".

## Update tampilan Experience (format baru)

Sekarang kartu Experience formatnya: logo bulat di kiri, judul + tanggal sejajar, nama institusi, badge tipe di kanan, lalu deskripsi dalam bentuk bullet points.

**Kolom baru (opsional):**
- `logo_url` — link logo perusahaan/institusi. Kalau kosong, otomatis pakai huruf pertama nama institusi dalam lingkaran

**Cara bikin deskripsi jadi bullet points (bukan 1 paragraf):**
1. Klik cell `deskripsi` di sheet Experience
2. Tulis poin pertama, lalu tekan **Alt+Enter** (Windows) atau **Option+Enter** (Mac) buat pindah baris di cell yang sama
3. Tulis poin berikutnya, ulangi
4. Tiap baris otomatis jadi 1 bullet point terpisah di web

Kalau cell cuma diisi 1 baris teks tanpa Alt+Enter, tetap muncul sebagai 1 bullet point aja (nggak error).

## Update — kolom baru buat fitur terbaru

### Sheet Profile
Tambah 2 kolom:
| Kolom | Isinya |
|---|---|
| `link_github` | Link profil GitHub kamu |
| `wa_number` | Nomor WhatsApp, format internasional tanpa simbol (misal `6281234567890`, bukan `0812-3456-7890`) |

Kolom ini otomatis muncul jadi icon di hero (bagian atas web) dan footer.

### Sheet Skills
Tambah 1 kolom opsional:
| Kolom | Isinya |
|---|---|
| `icon_emoji` | Emoji buat Soft Skill / Hard Skill (contoh di bawah) — kalau kosong, otomatis pakai huruf inisial |

Contoh isian buat skill kamu yang sekarang:
| nama_skill | icon_emoji |
|---|---|
| Analytical Thinking | 🧠 |
| Attention to Detail | 🔍 |
| Clear Communication | 💬 |
| Team Collaboration | 🤝 |
| Time Management | ⏱️ |
| Willingness to Learn | 🌱 |
| Basic Data Analysis | 📊 |
| Data Cleaning | 🧹 |
| Exploratory Data Analysis (EDA) | 🔎 |
| Data Visualization & Reporting | 📈 |
| Dashboard Creation | 🖥️ |
| Basic SQL & Querying | 🗄️ |
| Database Design | 🏗️ |
| Entity Relationship Diagram (ERD) | 🧩 |
| Relational Database | 🔗 |

Catatan: kolom `icon_url` (yang udah ada dari sebelumnya) tetap dipakai buat logo asli tools — kalau suatu Hard Skill kamu isi `icon_url` juga, itu yang dipakai duluan (prioritas di atas emoji).

### Hard Skill sekarang bisa diklik (bukti nyata skill kamu)
Ini **tidak butuh kolom baru** — sistemnya reuse kolom `tools` yang udah ada di sheet Experience dan Projects. Supaya sebuah Hard Skill (misal "Exploratory Data Analysis (EDA)") ke-link ke project/pengalaman tertentu, pastikan kata itu (atau kata yang mirip) disebut di kolom `tools` project/pengalaman terkait.

Contoh: kalau project "Analisis Kesehatan Mental" pakai EDA, isi kolom `tools`-nya jadi:
```
Excel, Pivot Table, Data Cleaning, Exploratory Data Analysis (EDA), Data Visualization
```
Biar pas orang klik "Exploratory Data Analysis (EDA)" di section Skills, project ini otomatis muncul di daftar "Dipakai di project".

## Update — Dark/Light mode toggle + ilustrasi siang/malam

Toggle mode terang/gelap sekarang ada di navbar (icon ☀️/🌙). Pilihan tersimpan otomatis (localStorage), jadi kalau user balik lagi ke web-nya, mode terakhir yang dipilih tetap kepakai.

### Sheet Profile — 2 kolom baru
| Kolom | Isinya |
|---|---|
| `illustration_pagi_url` | Link gambar ilustrasi versi siang (upload ke imgbb dulu) |
| `illustration_malam_url` | Link gambar ilustrasi versi malam |

Begitu link ini keisi, ilustrasi di section Contact otomatis:
- Crossfade halus (700ms) pas toggle mode di-klik
- Ada efek glow lampu meja & monitor (lebih nyala pas mode malam)
- Ada cahaya hangat matahari (mode siang) dan bintang berkedip (mode malam)
- Background, navbar, tombol, teks, dan shadow di seluruh web ikut transisi warna halus barengan

### Catatan jujur soal batasan
Karena ilustrasinya gambar PNG datar (bukan per-elemen/vektor), efek "tanaman bergerak" nggak bisa diisolasi cuma ke tanamannya — yang ada sekarang seluruh ilustrasi punya gerakan "napas" sangat halus (scale naik-turun dikit) biar tetap kerasa hidup tanpa terlihat aneh.

## Update — 6-frame pose sequence + layout landscape 16:9

### Sheet Profile — 2 kolom baru (buat sequence 6 frame)
| Kolom | Isinya |
|---|---|
| `illustration_pagi_frames` | 6 link frame Pagi F1-F6, dipisah koma, **urutan harus sesuai**: F1 (natap PC/fokus), F2 (noleh ke viewer), F3 (angkat tangan sapa), F4 (senyum+masih sapa), F5 (nunjuk viewer), F6 (nunjuk ke form) |
| `illustration_malam_frames` | Sama, tapi 6 link frame Malam F1-F6 |

Contoh isi `illustration_pagi_frames`:
```
https://i.ibb.co/xxx/pagi-f1.png, https://i.ibb.co/xxx/pagi-f2.png, https://i.ibb.co/xxx/pagi-f3.png, https://i.ibb.co/xxx/pagi-f4.png, https://i.ibb.co/xxx/pagi-f5.png, https://i.ibb.co/xxx/pagi-f6.png
```

Kolom lama `illustration_pagi_url` / `illustration_malam_url` (1 gambar statis) tetap didukung sebagai fallback kalau kolom frame ini kosong — tapi kalau frame udah diisi, itu yang dipakai (looping otomatis).

### Perilaku animasinya
- Animasi **mulai jalan otomatis pas section Contact ke-scroll masuk layar** (bukan langsung dari awal buka web), dan **berhenti kalau di-scroll keluar** (hemat resource)
- Loop: F1 (diem agak lama, fokus ngoding) → F2 → F3 → F4 → F5 → F6 (nunjuk ke form, ditahan agak lama) → balik ke F1
- Kalau browser/OS user pakai setting "reduce motion", animasi otomatis nggak looping — cuma nampilin 1 pose statis (F3, lagi senyum & sapa) biar tetap aksesibel

### Layout landscape 16:9
Ilustrasi sekarang di atas (lebar penuh, rasio 16:9), form di bawahnya — bukan sisi-sisian lagi. Gambar dipasang pakai `object-fit: contain`, jadi **nggak ada crop sama sekali** — asal frame kamu emang didesain rasio 16:9, bakal pas persis tanpa distorsi atau terpotong.
