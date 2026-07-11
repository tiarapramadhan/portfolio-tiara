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

## Kategori Tools (sub_kategori)

Kalau kamu mau tools di section Skills dikelompokkan (Programming, Data Analysis, Database, dst), tambah kolom `sub_kategori` di sheet Skills — isi cuma buat baris yang `kategori`-nya "Tools".
