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

## Update — Bahasa ID/EN

Toggle bahasa (ID/EN) sekarang ada di navbar, sebelah tombol dark/light mode. Semua teks UI (menu, judul section, label form, dll) otomatis translate. Pilihan bahasa juga tersimpan (localStorage).

### Sheet Profile — 2 kolom baru (opsional)
| Kolom | Isinya |
|---|---|
| `tagline_en` | Versi Inggris dari `tagline` |
| `bio_en` | Versi Inggris dari `bio` |

### Sheet Experience — 1 kolom baru (opsional)
| Kolom | Isinya |
|---|---|
| `deskripsi_en` | Versi Inggris dari `deskripsi` (pakai Alt+Enter juga buat bullet points, sama kayak `deskripsi`) |

### Sheet Projects — 2 kolom baru (opsional)
| Kolom | Isinya |
|---|---|
| `deskripsi_singkat_en` | Versi Inggris dari `deskripsi_singkat` |
| `deskripsi_lengkap_en` | Versi Inggris dari `deskripsi_lengkap` |

### Yang TIDAK perlu diterjemahin (udah otomatis)
- **Nama tools & skill** (Python, Excel, "Basic Data Analysis", dll) — udah dalam bahasa Inggris dari awal, nggak perlu kolom tambahan
- **Kategori project** (Data Analyst, Data Scientist, dll) — sama, udah istilah Inggris standar
- **Nama institusi/perusahaan** — nama tetap sama di kedua bahasa (nggak ada yang perlu diterjemahin)
- **Tipe pengalaman** (Magang/Organisasi/Pendidikan) & **status project** (Selesai) — otomatis translate ke Internship/Organization/Education/Completed tanpa kolom tambahan

### Catatan penting
Kalau kolom `_en` di atas kamu **kosongin**, sistem otomatis fallback nampilin versi Indonesia-nya — jadi nggak akan ada teks kosong/error, aman buat diisi pelan-pelan/nyicil. Prioritasin isi `bio_en` dan `tagline_en` dulu (paling keliatan di hero), baru nyusul deskripsi project & pengalaman.

## ✅ CHECKLIST FINAL — audit sheet kamu sekarang

Bug LinkedIn 404, WA nggak nyambung, form nggak jalan — itu semua kemungkinan besar karena kolom sheet masih ada placeholder "ISI: ..." yang belum diganti. Sekarang kode udah otomatis skip placeholder ini (nggak akan render link rusak), tapi biar FITUR-nya beneran nyala, cek satu-satu ini di sheet Profile:

| Kolom | Wajib diisi beneran (bukan "ISI: ...") | Efek kalau kosong |
|---|---|---|
| `email` | ✅ **Wajib**, ini yang bikin form Contact & icon amplop jalan | Form cuma nampilin alert "belum bisa kirim", icon amplop hilang |
| `link_linkedin` | Isi **URL LENGKAP** (boleh tanpa https://, kode otomatis nambahin) | Icon LinkedIn nggak muncul |
| `link_github` | Isi URL profil GitHub kamu | Icon GitHub nggak muncul |
| `wa_number` | **Cuma angka**, format `62812xxxxxxx` (kode negara, tanpa 0 di depan, tanpa spasi/strip) | Icon WA nggak muncul |
| `link_cv` | URL Google Drive/PDF CV kamu | Tombol "Download CV" otomatis disembunyikan |
| `foto_url`, `nama`, `tagline`, `bio` | Sesuai yang udah kamu isi sebelumnya | — |

**Cara cek cepat**: buka tiap cell di atas, pastikan isinya BUKAN teks yang diawali "ISI:" — kalau masih ada tulisan itu, ganti dengan data asli kamu.

## Ringkasan sheet Profile lengkap (semua kolom yang sekarang dipakai)

```
nama | foto_url | tagline | bio | link_linkedin | link_cv | email
tagline_en | bio_en
link_github | wa_number
illustration_pagi_url | illustration_malam_url
illustration_pagi_frames | illustration_malam_frames
```

Kalau ada salah satu kolom di atas yang belum ada di sheet-mu, tambahin dulu — sisanya (yang kolom `_frames` atau `_en`) boleh dikosongin kalau belum sempet diisi, sistemnya udah otomatis fallback.

## Update — perbaikan besar (8 bug/request)

1. **Logo LinkedIn & icon email** — sekarang pakai warna asli brand (bukan dipaksa putih), jadi kontras di tema gelap MAUPUN terang. Icon email diganti SVG proper (bukan emoji kekecilan)
2. **Icon ilang di tema terang** — fixed, akar masalahnya sama kayak nomor 1
3. **Layout footer** — sekarang grid 3 kolom seimbang: nama+tagline (kiri), menu (tengah), social icons (kanan)
4. **Tombol Download CV error** — kode udah dirapihin buat handle link Google Drive dengan format yang lebih konsisten. **Kalau masih error**: cek setting share Google Drive-nya, harus **"Anyone with the link"** (bukan "Restricted") — ini penyebab paling umum
5. **Popup cross-reference skill** — sekarang section "Dipakai di project"/"Dipakai di pengalaman" otomatis **hilang total** kalau kosong (nggak nampilin "belum ada" lagi), dan entry pengalaman sekarang **bisa diklik** juga (buka detail pengalaman itu), sama kayak entry project
6. **Bug translate tipe/status nggak jalan** — ketemu akarnya: fungsi pembanding di kode itu case-sensitive, jadi "Magang" (huruf besar) di sheet nggak ketemu sama key "magang" di LABEL_MAP_EN. **Sekarang udah fixed** (dibikin nggak peduli besar/kecil huruf). Kalau nanti nambah tipe/status baru, tinggal tambah baris baru di `LABEL_MAP_EN` (di `script.js`), formatnya:
   ```javascript
   "tipe-baru-kamu": "Translation In English",
   ```
7. **Tanggung Jawab vs Pencapaian dipisah** — sekarang ada 2 section terpisah di kartu & popup Experience. Kolom **baru**: `pencapaian` (dan opsional `pencapaian_en`) di sheet Experience — isinya pakai Alt+Enter buat bullet, sama kayak `deskripsi`. Kalau kosong, section "Pencapaian" otomatis nggak muncul (misal buat entry Pendidikan yang nggak punya "pencapaian kerja")
8. **Logo navbar "Portfolio"/"Portofolio"** — sekarang ikut translate otomatis sesuai bahasa aktif

## ✅ CHECKLIST FINAL PALING BARU — sheet Profile

Kolom yang WAJIB ada isinya asli (bukan "ISI: ..."):
```
nama, tagline, bio, email
```
Kolom social (opsional, tapi isi biar nggak kosong):
```
link_linkedin, link_github, wa_number, link_cv
```
Kolom terjemahan (opsional):
```
tagline_en, bio_en
```
Kolom ilustrasi Contact (opsional):
```
illustration_pagi_url, illustration_malam_url
illustration_pagi_frames, illustration_malam_frames
```

## ✅ CHECKLIST FINAL — sheet Experience (kolom baru: `pencapaian`)

```
posisi, institusi, tanggal_mulai, tanggal_selesai, deskripsi, tipe
tools, gambar_url, project_terkait, logo_url
deskripsi_en
pencapaian, pencapaian_en   <-- BARU
```

## ✅ CHECKLIST FINAL — sheet Skills & Projects (nggak ada kolom baru kali ini)

Skills: `nama_skill, kategori, level (opsional), sub_kategori, icon_url, icon_emoji`
Projects: `id, nama_project, kategori, status, deskripsi_singkat, deskripsi_lengkap, cover_image_url, link_github, link_dashboard, tools, file_list, tanggal, deskripsi_singkat_en, deskripsi_lengkap_en`

## Update — kartu Experience jadi compact, foto & dokumentasi baru

### Yang berubah di tampilan
- **Kartu Experience** (list, sebelum diklik) sekarang jauh lebih ringkas:
  - Kalau ada `gambar_url`, muncul thumbnail kecil (64x64px) di samping teks
  - "Tanggung Jawab" sekarang jadi **jendela kecil bisa di-scroll** (max ~90px tinggi), nggak makan tempat kartu lagi
  - "Pencapaian" nggak ditampilin di kartu (biar makin ringkas) — cuma muncul di modal detail
- **Modal detail** (setelah diklik) tetap lengkap: foto ukuran penuh di atas, Tanggung Jawab & Pencapaian full, plus section baru **Dokumentasi**

### Kolom baru di sheet Experience: `dokumentasi_url`
Isinya link **embed** Canva (bukan link biasa) — dokumentasi/portofolio kerjaan kamu selama posisi itu. Muncul sebagai tampilan tertanam (bukan cuma tombol link) di dalam modal, kayak baca README langsung di web.

**Cara dapetin link embed Canva:**
1. Buka desain Canva kamu
2. Klik **Share** → cari opsi **Embed**
3. Copy link embed-nya (biasanya beda dari link share biasa, formatnya ada `/view?embed`)
4. Tempel ke kolom `dokumentasi_url`

Kolom ini **opsional** — kosongin aja kalau nggak ada dokumentasinya, section "Dokumentasi" otomatis nggak muncul di modal.

### Ringkasan sheet Experience final (semua kolom sampai saat ini)
```
posisi, institusi, tanggal_mulai, tanggal_selesai, deskripsi, tipe
tools, gambar_url, project_terkait, logo_url
deskripsi_en, pencapaian, pencapaian_en
dokumentasi_url   <-- BARU
```

## Update — musik lofi opt-in (floating button)

Ada tombol musik kecil melayang di pojok kanan bawah — **cuma muncul kalau kamu isi link musiknya**, dan **nggak autoplay** (user harus klik sendiri). Pas lagi main, ada animasi pulse halus di tombolnya biar tau statusnya "lagi puter".

### Sheet Profile — 1 kolom baru: `lofi_url`

Isinya **link file audio langsung** (format `.mp3` atau `.ogg`), BUKAN link YouTube/Spotify (itu nggak bisa langsung diputer di web biasa).

**Cara dapetin file MP3 yang boleh dipakai gratis:**
1. Buka [Pixabay Music](https://pixabay.com/music/search/lofi/) (gratis, royalty-free, nggak perlu kredit)
2. Cari "lofi", download file MP3-nya
3. Upload ke **imgbb nggak bisa buat audio** — pakai **Google Drive** aja: upload MP3, klik kanan → Share → "Anyone with the link", copy link share-nya
4. Convert ke direct link pakai format sama kayak foto: `https://drive.google.com/uc?export=view&id=FILE_ID`

Kolom ini **opsional total** — kosongin, tombolnya otomatis nggak muncul sama sekali.
