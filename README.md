# Klinik Sehat - Sistem Informasi Klinik

Aplikasi web untuk manajemen klinik kesehatan dengan fitur pendaftaran online, antrian pasien, konsultasi online, dan rekam medis.

---

## ⚡ PANDUAN CEPAT UNTUK PRESENTASI (BACA INI DULU!)

### 🎯 Langkah 1: Persiapan Awal

**Yang Dibutuhkan:**
1. **Node.js** - Download dari https://nodejs.org (pilih versi LTS)
2. **XAMPP** - Download dari https://www.apachefriends.org (untuk MySQL database)
3. **Visual Studio Code** - Download dari https://code.visualstudio.com (untuk menjalankan terminal)

### 🎯 Langkah 2: Setup Database (Sekali Saja)

1. **Buka XAMPP Control Panel** dan START:
   - Apache
   - MySQL

2. **Buka browser**, pergi ke: `http://localhost/phpmyadmin`

3. **Buat database baru:**
   - Klik "New" di sidebar kiri
   - Ketik nama database: `klinik_sehat`
   - Klik "Create"

4. **Import data:**
   - Klik database `klinik_sehat` di sidebar
   - Klik tab "Import" di atas
   - Klik "Choose File" dan pilih file: `backend/migrations/create_tables_only.sql`
   - Scroll ke bawah, klik "Import"
   - Tunggu sampai muncul pesan sukses ✅

### 🎯 Langkah 3: Jalankan Aplikasi

**Buka 2 Terminal di VS Code (Terminal → New Terminal):**

**Terminal 1 - Backend:**
```bash
cd backend
npm install
node server.js
```
Tunggu sampai muncul: `Server running on port 5001`

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```
Tunggu sampai muncul URL seperti: `http://localhost:5173`

### 🎯 Langkah 4: Buka Aplikasi

Buka browser dan pergi ke: **http://localhost:5173**

---

## 🔑 AKUN DEMO UNTUK PRESENTASI

### Admin (Kelola Antrian & User)
- **Email:** `admin@kliniksehat.com`
- **Password:** `admin123`

### Dokter (Lihat Jadwal & Pasien)
- **Email:** `dokter@kliniksehat.com`
- **Password:** `dokter123`

### Pasien (Daftar & Konsultasi)
- **Email:** `pasien@kliniksehat.com`
- **Password:** `admin123`

---

## 📋 SKENARIO DEMO PRESENTASI

### Demo 1: Alur Pendaftaran Pasien
1. Login sebagai **Pasien** (`pasien@kliniksehat.com` / `admin123`)
2. Klik menu **"Pendaftaran Online"**
3. Pilih dokter, tanggal, dan slot waktu
4. Isi keluhan, klik **"Daftar Sekarang"**
5. Tunjukkan nomor antrian yang muncul ✅

### Demo 2: Kelola Antrian (Admin)
1. Logout, lalu login sebagai **Admin** (`admin@kliniksehat.com` / `admin123`)
2. Klik menu **"Kelola Antrian"**
3. Tunjukkan pasien yang menunggu
4. Klik **"Panggil"** untuk memanggil pasien
5. Klik **"Selesai"** setelah dilayani ✅

### Demo 3: Jadwal Dokter
1. Login sebagai **Dokter** (`dokter@kliniksehat.com` / `dokter123`)
2. Klik menu **"Jadwal Praktik"**
3. Tunjukkan jadwal yang ada
4. Tambah jadwal baru dengan klik **"Tambah Jadwal"** ✅

### Demo 4: Konsultasi Online
1. Login sebagai **Pasien**
2. Klik menu **"Konsultasi Online"**
3. Kirim pesan ke dokter
4. Login sebagai **Dokter** di browser lain (atau incognito)
5. Balas pesan di menu **"Konsultasi"** ✅

---

## ❓ TROUBLESHOOTING (Jika Ada Masalah)

### "Cannot connect to database"
- Pastikan XAMPP sudah jalan (MySQL harus hijau)
- Cek file `backend/.env` sudah benar

### "npm not found"
- Install Node.js dari https://nodejs.org
- Restart terminal/VS Code setelah install

### Halaman kosong/blank
- Buka Developer Tools (F12)
- Lihat tab Console untuk error
- Biasanya perlu restart backend (`Ctrl+C` lalu `node server.js`)

### Login gagal / "Tidak memiliki akses"
1. Buka browser → F12 → Application → Local Storage
2. Hapus item "token"
3. Refresh halaman dan login ulang

---

## 🚀 Fitur Utama

### Admin
- Dashboard statistik klinik
- Manajemen antrian pasien real-time
- Manajemen user (ubah role & hapus user)
- Database pasien lengkap
- Broadcast notifikasi ke pasien

### Dokter
- Dashboard pasien hari ini
- Manajemen jadwal praktik
- Rekam medis pasien
- Konsultasi online dengan pasien
- Lihat daftar pasien yang terdaftar

### Pasien
- Pendaftaran online dengan validasi kapasitas
- Pilih slot waktu dengan indikator ketersediaan
- Status antrian real-time
- Konsultasi online dengan dokter
- Riwayat kunjungan dan rekam medis

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Router
- Sonner (toast notifications)

**Backend:**
- Node.js + Express
- MySQL
- JWT Authentication
- bcryptjs

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- MySQL (v8 atau lebih baru)
- npm atau yarn

## 🔧 Instalasi Lengkap

### 1. Clone Repository
```bash
git clone https://github.com/adrianobwn/klinik-sehat
cd klinik-sehat
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend`:
```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=klinik_sehat
JWT_SECRET=kliniksehat_secret_key_2024
```

### 3. Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE klinik_sehat;

# Import schema
mysql -u root -p klinik_sehat < backend/migrations/create_tables_only.sql
```

### 4. Setup Frontend

```bash
# Kembali ke root directory
cd ..
npm install
```

Buat file `.env` di root directory:
```env
VITE_API_URL=http://localhost:5001/api
```

## 🚀 Menjalankan Aplikasi

### Development Mode

**1. Jalankan Backend**
```bash
cd backend
node server.js
```
Backend akan berjalan di `http://localhost:5001`

**2. Jalankan Frontend** (di terminal baru)
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`

### Build Production

```bash
# Build frontend
npm run build

# Preview build
npm run preview
```

## 📁 Struktur Project

```
klinik-sehat/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication & authorization
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin pages
│   │   ├── doctor/      # Doctor pages
│   │   └── patient/     # Patient pages
│   ├── contexts/        # React contexts
│   ├── lib/             # API client & utilities
│   └── App.tsx          # Main app component
└── public/              # Static assets
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile

### Patient
- `GET /api/patient/doctors` - Daftar dokter
- `GET /api/patient/doctors/:id/timeslots` - Slot waktu tersedia
- `POST /api/patient/appointments` - Buat pendaftaran
- `GET /api/patient/appointments` - Riwayat pendaftaran
- `GET /api/patient/queue/:id` - Status antrian

### Doctor
- `GET /api/doctor/schedules` - Jadwal praktik
- `POST /api/doctor/schedules` - Update jadwal
- `GET /api/doctor/today-patients` - Pasien hari ini
- `GET /api/doctor/consultations` - Daftar konsultasi
- `POST /api/doctor/medical-records` - Buat rekam medis

### Admin
- `GET /api/admin/queue/today` - Antrian hari ini
- `POST /api/admin/queue/call` - Panggil antrian
- `POST /api/admin/queue/complete` - Selesaikan antrian
- `GET /api/admin/users` - Daftar user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Hapus user

## 📝 Fitur Validasi

### Kapasitas Antrian
- Maximum 20 pasien per slot waktu (1 jam)
- Real-time indicator ketersediaan slot:
  - 🟢 Hijau: Banyak tersedia (>5 slot)
  - 🟡 Kuning: Hampir penuh (≤5 slot)
  - 🔴 Merah: Penuh (tidak bisa booking)

### Jadwal Praktik
- Validasi hari dan waktu praktik dokter
- Pasien hanya bisa booking sesuai jadwal dokter

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ for better healthcare management

