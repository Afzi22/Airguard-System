# Rencana Implementasi: AirGuard Dashboard

## Ikhtisar

Implementasi AirGuard Dashboard dilakukan secara bertahap menggunakan React + TypeScript + Tailwind CSS + Recharts. Setiap task membangun di atas task sebelumnya, dimulai dari fondasi (setup proyek, tipe data, data dummy, utilitas) hingga komponen UI, layout, dan pengujian. Semua komponen menggunakan tema dark glassmorphism dan diintegrasikan melalui `App.tsx` sebagai root.

## Tasks

- [x] 1. Setup proyek dan konfigurasi awal
  - Inisialisasi proyek Vite + React + TypeScript
  - Konfigurasi Tailwind CSS (tema dark, warna kustom: emerald, amber, rose, slate)
  - Install dependensi: `lucide-react`, `recharts`, `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jest-axe`
  - Konfigurasi `vitest.config.ts` dengan environment jsdom dan setup file untuk `jest-axe`
  - Buat struktur direktori: `src/components/`, `src/data/`, `src/types/`, `src/utils/`, `src/api/`
  - _Persyaratan: 7.6_

- [x] 2. Definisi tipe data TypeScript dan data dummy terpusat
  - [x] 2.1 Buat file `src/types/index.ts`
    - Definisikan tipe: `AQILevel`, `NodeStatus`, `AlertSeverity`
    - Definisikan interface: `IoTNode`, `ForecastDataPoint`, `AlertCard`, `CityConfig`
    - _Persyaratan: 7.8_

  - [x] 2.2 Buat file `src/data/mockData.ts`
    - Definisikan konstanta `CITIES` (7 kota: Tangerang, Tangerang Selatan, Cikarang, Depok, Bekasi, Hanoi, Ho Chi Minh City)
    - Definisikan konstanta `IOT_NODES` (minimal 3 node dengan AQI bervariasi: ≤50, 51–100, >100)
    - Definisikan konstanta `FORECAST_DATA` (24 titik data per jam)
    - Definisikan konstanta `POLICY_ALERTS` (3 alert: Critical, Warning, Insight dengan teks sesuai persyaratan)
    - _Persyaratan: 7.7, 1.3, 3.2, 4.1, 5.5, 6.6_

- [x] 3. Implementasi utilitas klasifikasi AQI
  - [x] 3.1 Buat file `src/utils/aqiUtils.ts`
    - Implementasikan fungsi `getAQILevel(aqi: number): AQILevel`
    - Implementasikan fungsi `getAQIColor(aqi: number): string` (emerald ≤50, amber 51–100, rose >100)
    - Implementasikan fungsi `getStatusColor(status: NodeStatus): string`
    - Implementasikan fungsi `getSeverityColor(severity: AlertSeverity): string`
    - _Persyaratan: 3.3, 3.4, 3.5, 4.2, 6.3, 6.4, 6.5_

  - [ ]* 3.2 Tulis property test untuk `getAQIColor` (Properti 1)
    - **Properti 1: Klasifikasi Warna AQI Konsisten**
    - Gunakan `fc.integer({ min: 0, max: 500 })` untuk menghasilkan nilai AQI acak
    - Verifikasi: AQI ≤ 50 → `'emerald'`, AQI 51–100 → `'amber'`, AQI > 100 → `'rose'`
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 3.3, 3.4, 3.5**

  - [ ]* 3.3 Tulis property test untuk `getStatusColor` (Properti 2)
    - **Properti 2: Klasifikasi Warna Status Node Konsisten**
    - Gunakan `fc.constantFrom('Active', 'Warning', 'Offline')` untuk menghasilkan status acak
    - Verifikasi: `Active` → `'emerald'`, `Warning` → `'amber'`, `Offline` → `'rose'`
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 4.2**

  - [ ]* 3.4 Tulis property test untuk `getSeverityColor` (Properti 3)
    - **Properti 3: Klasifikasi Warna Severity Alert Konsisten**
    - Gunakan `fc.constantFrom('Critical', 'Warning', 'Insight')` untuk menghasilkan severity acak
    - Verifikasi: `Critical` → `'rose'`, `Warning` → `'amber'`, `Insight` → `'emerald'`
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 6.3, 6.4, 6.5**

- [x] 4. Implementasi komponen shared
  - [x] 4.1 Buat `src/components/shared/GlassCard.tsx`
    - Komponen wrapper dengan kelas Tailwind: `bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-lg`
    - Terima props: `children`, `className` (opsional)
    - _Persyaratan: 2.5, 7.2, 7.3_

  - [x] 4.2 Buat `src/components/shared/SkeletonLoader.tsx`
    - Komponen skeleton dengan animasi pulse bergaya dark-mode
    - Terima props: `width`, `height`, `className` (opsional)
    - _Persyaratan: 7.9_

  - [x] 4.3 Buat `src/components/shared/Toast.tsx`
    - Komponen notifikasi toast yang muncul di sudut layar
    - Terima props: `message`, `isVisible`, `onClose`
    - _Persyaratan: 2.6_

  - [x] 4.4 Buat `src/components/shared/ErrorBoundary.tsx`
    - Implementasikan class component `ErrorBoundary` dengan `getDerivedStateFromError`
    - Render `ErrorFallback` ketika `hasError` bernilai `true`
    - _Persyaratan: 1.7, 9.3_

- [x] 5. Checkpoint — Pastikan semua tests utilitas lulus
  - Pastikan semua tests lulus, tanyakan kepada pengguna jika ada pertanyaan.

- [x] 6. Implementasi komponen Navbar
  - [x] 6.1 Buat `src/components/Navbar/LiveClock.tsx`
    - Gunakan `useState` dan `useEffect` dengan `setInterval` (1000ms) untuk memperbarui waktu setiap detik
    - Tampilkan waktu dan tanggal dalam format yang terbaca
    - _Persyaratan: 1.5_

  - [x] 6.2 Buat `src/components/Navbar/StatusIndicator.tsx`
    - Terima props: `label`, `status`, `color`
    - Tampilkan indikator "AI Engine: Online" (hijau) dan "IoT Nodes: 45 Active" (biru)
    - Sertakan atribut `aria-label`
    - _Persyaratan: 1.6, 7.5_

  - [x] 6.3 Buat `src/components/Navbar/CitySelector.tsx`
    - Implementasikan searchable dropdown dengan daftar 7 kota dari `CITIES`
    - Terima props: `activeCity`, `onCityChange`
    - Sertakan atribut `aria-label` pada elemen dropdown
    - _Persyaratan: 1.3, 1.4, 7.5_

  - [x] 6.4 Buat `src/components/Navbar/Navbar.tsx`
    - Tampilkan logo teks "AirGuard System" dengan efek glow emerald-green
    - Integrasikan `CitySelector`, `LiveClock`, `StatusIndicator`
    - Tambahkan tombol "Export Report" dengan ikon `Download` dari Lucide React dan atribut `aria-label`
    - Terima props: `activeCity`, `onCityChange`, `onExportReport`
    - _Persyaratan: 1.1, 1.2, 2.7, 7.5_

- [x] 7. Implementasi komponen GISMap
  - [x] 7.1 Buat `src/components/GISMap/MapPlaceholder.tsx`
    - Render area placeholder peta dengan dimensi penuh (fill kolom kiri)
    - Tampilkan grid atau gradien yang merepresentasikan area peta
    - _Persyaratan: 3.1, 3.9_

  - [x] 7.2 Buat `src/components/GISMap/NodePin.tsx`
    - Terima props: `node: IoTNode`, `isSelected: boolean`, `onClick`
    - Tampilkan badge dengan warna sesuai AQI menggunakan `getAQIColor`
    - Tampilkan tooltip/popup dengan detail PM2.5 dan status ketika `isSelected` bernilai `true`
    - Sertakan atribut `aria-label`
    - _Persyaratan: 3.2, 3.3, 3.4, 3.5, 8.3, 7.5_

  - [x] 7.3 Buat `src/components/GISMap/HeatmapToggle.tsx`
    - Implementasikan toggle switch berlabel "Heatmap Layer"
    - Terima props: `isActive`, `onToggle`
    - Sertakan atribut `aria-label`
    - _Persyaratan: 3.6, 7.5_

  - [x] 7.4 Buat `src/components/GISMap/MapControls.tsx`
    - Implementasikan floating controls: tombol zoom-in, zoom-out, dan recenter
    - Setiap tombol menggunakan ikon Lucide React yang sesuai
    - Sertakan atribut `aria-label` pada setiap tombol
    - _Persyaratan: 3.8, 7.5_

  - [x] 7.5 Buat `src/components/GISMap/GISMap.tsx`
    - Integrasikan `MapPlaceholder`, `NodePin` (untuk setiap node), `HeatmapToggle`, `MapControls`
    - Kelola state `isHeatmapActive` secara lokal
    - Tampilkan overlay heatmap visual ketika `isHeatmapActive` bernilai `true`
    - Tampilkan `SkeletonLoader` ketika `isLoading` bernilai `true`
    - Terima props: `nodes`, `selectedNodeId`, `onNodeSelect`, `activeCity`, `isLoading`
    - _Persyaratan: 3.1–3.9, 7.9_

- [x] 8. Implementasi komponen NodeTicker
  - [x] 8.1 Buat `src/components/NodeTicker/NodeCard.tsx`
    - Tampilkan Node ID, nilai PM2.5, dan status operasional
    - Tampilkan kode warna status menggunakan `getStatusColor`
    - Tampilkan efek visual aktif (border menyala) ketika `isSelected` bernilai `true`
    - Terima props: `node: IoTNode`, `isSelected: boolean`, `onClick`
    - _Persyaratan: 4.1, 4.2, 8.2_

  - [x] 8.2 Buat `src/components/NodeTicker/NodeTicker.tsx`
    - Render deretan horizontal `NodeCard` untuk setiap node
    - Panggil `onNodeSelect` dengan ID node ketika kartu diklik
    - Terima props: `nodes`, `selectedNodeId`, `onNodeSelect`
    - _Persyaratan: 4.1, 4.3, 4.4, 8.1_

  - [ ]* 8.3 Tulis property test untuk rendering `NodeTicker` (Properti 5)
    - **Properti 5: Rendering Node Card Sesuai Data**
    - Gunakan `fc.array(fc.record({ id, name, aqi, pm25, status, ... }))` untuk menghasilkan array node acak
    - Render `NodeTicker` dan verifikasi setiap kartu menampilkan Node ID, PM2.5, dan status yang sesuai
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 4.1**

  - [ ]* 8.4 Tulis property test untuk interaksi klik node (Properti 8)
    - **Properti 8: Klik Node Ticker Memperbarui selectedNodeId**
    - Gunakan `fc.constantFrom(...IOT_NODES)` untuk memilih node acak
    - Simulasikan klik pada kartu node dan verifikasi `onNodeSelect` dipanggil dengan ID yang benar
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 8.1, 8.2**

- [x] 9. Implementasi komponen LSTMForecast
  - [x] 9.1 Buat `src/components/LSTMForecast/ForecastChart.tsx`
    - Implementasikan `AreaChart` dari Recharts dengan sumbu-X (waktu per jam) dan sumbu-Y (nilai AQI)
    - Tambahkan `ReferenceLine` pada Y=100 dengan label "Hazard Threshold (AQI > 100)" berwarna rose, bergaya putus-putus
    - Aktifkan `Tooltip` Recharts yang menampilkan nilai AQI dan waktu
    - Terima props: `data: ForecastDataPoint[]`
    - _Persyaratan: 5.1, 5.2, 5.3, 5.4, 5.7_

  - [x] 9.2 Buat `src/components/LSTMForecast/LSTMForecast.tsx`
    - Tampilkan judul kartu "48-Hour AQI Forecast (LSTM Model)"
    - Integrasikan `ForecastChart`
    - Tampilkan `SkeletonLoader` ketika `isLoading` bernilai `true`
    - Tampilkan pesan error "Gagal memuat prediksi AI. Silakan coba lagi." di tengah kartu ketika `error` tidak null
    - Terima props: `forecastData`, `isLoading`, `error`
    - _Persyaratan: 5.5, 5.6, 7.9, 9.1_

  - [ ]* 9.3 Tulis property test untuk rendering `LSTMForecast` (Properti 6)
    - **Properti 6: Tooltip Forecast Menampilkan Data yang Benar**
    - Gunakan `fc.array(fc.record({ hour, aqi, timestamp }))` untuk menghasilkan data forecast acak
    - Render `LSTMForecast` dan verifikasi grafik merender titik data sesuai panjang array
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 5.7**

  - [ ]* 9.4 Tulis property test untuk skeleton loading (Properti 9)
    - **Properti 9: Skeleton Loading Ditampilkan Saat State Loading**
    - Gunakan `fc.boolean()` untuk menghasilkan nilai `isLoading` acak
    - Render `LSTMForecast` dengan `isLoading=true` dan verifikasi elemen skeleton muncul, konten data tidak muncul
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 7.9**

- [x] 10. Implementasi komponen PolicyPanel
  - [x] 10.1 Buat `src/components/PolicyPanel/AlertCard.tsx`
    - Tampilkan severity, message, dan timestamp
    - Gunakan `getSeverityColor` untuk menentukan warna aksen kartu
    - Tampilkan ikon peringatan (Lucide `AlertTriangle`) untuk Critical/Warning dan ikon informasi (Lucide `Info`) untuk Insight
    - Terima props: `alert: AlertCard`
    - _Persyaratan: 6.2, 6.3, 6.4, 6.5_

  - [x] 10.2 Buat `src/components/PolicyPanel/PolicyPanel.tsx`
    - Tampilkan judul "Automated Policy Recommendations"
    - Render daftar `AlertCard` untuk setiap alert
    - Tampilkan empty state (ilustrasi dark-mode + teks "Kualitas udara saat ini stabil. Tidak ada rekomendasi kebijakan darurat.") ketika array `alerts` kosong
    - Tampilkan `SkeletonLoader` ketika `isLoading` bernilai `true`
    - Terima props: `alerts`, `isLoading`
    - _Persyaratan: 6.1, 6.2, 6.7, 7.9, 9.2_

  - [ ]* 10.3 Tulis property test untuk rendering `PolicyPanel` (Properti 4)
    - **Properti 4: Rendering Alert Card Sesuai Data**
    - Gunakan `fc.array(fc.record({ id, severity, message, timestamp }))` untuk menghasilkan array alert acak
    - Render `PolicyPanel` dan verifikasi jumlah `AlertCard` yang dirender sama persis dengan panjang array
    - Verifikasi setiap kartu menampilkan severity, message, dan timestamp yang sesuai
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 6.2**

- [x] 11. Checkpoint — Pastikan semua komponen individual lulus tests
  - Pastikan semua tests lulus, tanyakan kepada pengguna jika ada pertanyaan.

- [x] 12. Implementasi layout utama dan integrasi Dashboard
  - [x] 12.1 Buat `src/components/Dashboard/MainLayout.tsx`
    - Implementasikan CSS Grid dua kolom: kolom kiri 65% dan kolom kanan 35%
    - Terapkan responsive stacking (kolom vertikal) untuk viewport < 1024px
    - Terima props: `leftColumn: ReactNode`, `rightColumn: ReactNode`
    - _Persyaratan: 2.1, 2.2, 2.3_

  - [x] 12.2 Buat `src/components/Dashboard/Dashboard.tsx`
    - Kelola state: `activeCity`, `selectedNodeId`, `isToastVisible`, `toastMessage`
    - Implementasikan handler `onCityChange`, `onNodeSelect`, `onExportReport` (memunculkan toast)
    - Integrasikan `Navbar`, `MainLayout`, `GISMap`, `NodeTicker`, `LSTMForecast`, `PolicyPanel`
    - Terapkan latar belakang `bg-slate-900` dan `min-h-screen`
    - Integrasikan komponen `Toast` untuk notifikasi "Mempersiapkan laporan PDF kualitas udara..."
    - _Persyaratan: 1.4, 2.1–2.7, 7.1, 7.4_

  - [ ]* 12.3 Tulis property test untuk pemilihan kota (Properti 7)
    - **Properti 7: Pemilihan Kota Memperbarui Konteks Aktif**
    - Gunakan `fc.constantFrom(...CITIES)` untuk memilih kota acak
    - Simulasikan pemilihan kota melalui `CitySelector` dan verifikasi `activeCity` diperbarui ke ID kota yang dipilih
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 1.4**

- [x] 13. Implementasi `App.tsx` dengan ErrorBoundary global
  - Bungkus `Dashboard` dengan `ErrorBoundary` global di `App.tsx`
  - Pastikan jika satu komponen error, komponen lain tetap berfungsi
  - _Persyaratan: 9.3_

- [x] 14. Implementasi API layer (stub)
  - Buat `src/api/apiClient.ts` dengan konfigurasi dasar fetch (timeout, interceptor placeholder)
  - Buat `src/api/nodeService.ts` dengan fungsi `fetchNodes()` yang saat ini mengembalikan `IOT_NODES` dari mockData
  - Buat `src/api/forecastService.ts` dengan fungsi `fetchForecast()` yang saat ini mengembalikan `FORECAST_DATA` dari mockData
  - Buat `src/api/policyService.ts` dengan fungsi `fetchAlerts()` yang saat ini mengembalikan `POLICY_ALERTS` dari mockData
  - _Persyaratan: 7.7_

- [x] 15. Pengujian aksesibilitas dan property test elemen interaktif
  - [x] 15.1 Tulis unit tests aksesibilitas dengan `jest-axe`
    - Render `Dashboard` dan jalankan `axe(container)` untuk memverifikasi 0 pelanggaran WCAG AA
    - Render komponen individual (`Navbar`, `GISMap`, `NodeTicker`, `LSTMForecast`, `PolicyPanel`) dan verifikasi aksesibilitas masing-masing
    - _Persyaratan: 7.4, 7.5_

  - [ ]* 15.2 Tulis property test untuk atribut aria-label (Properti 10)
    - **Properti 10: Elemen Interaktif Memiliki Atribut Aria-Label**
    - Render semua komponen yang mengandung elemen interaktif (tombol, dropdown, toggle)
    - Verifikasi setiap elemen interaktif memiliki atribut `aria-label` yang tidak kosong
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 7.5**

- [x] 16. Checkpoint akhir — Verifikasi integrasi penuh
  - Pastikan semua tests lulus (unit, property-based, aksesibilitas), tanyakan kepada pengguna jika ada pertanyaan.

- [x] 17. Implementasi sistem login dan autentikasi mock
  - [x] 17.1 Perbarui `src/types/index.ts`
    - Tambahkan tipe `UserRole = 'admin' | 'public'`
    - Tambahkan interface `AuthState { role: UserRole; username: string }`
    - Tambahkan interface `PublicHealthAdvice` (id, severity, message, timestamp, location?)
    - _Persyaratan: 10.7_

  - [x] 17.2 Buat `src/utils/authUtils.ts`
    - Definisikan konstanta `MOCK_CREDENTIALS` dengan entri untuk `admin` (password: `admin123`, role: `'admin'`) dan `user` (password: `user123`, role: `'public'`)
    - Implementasikan fungsi `validateCredentials(username: string, password: string): UserRole | null`
    - Fungsi mengembalikan `UserRole` jika kredensial cocok, atau `null` jika tidak cocok
    - _Persyaratan: 10.3, 10.4, 10.5_

  - [x] 17.3 Buat `src/components/Auth/LoginPage.tsx`
    - Tampilkan logo dan nama sistem "AirGuard System" di bagian atas formulir
    - Render formulir dengan dua field input: "Username" dan "Password" (type="password")
    - Render tombol "Masuk" dengan atribut `aria-label`
    - Tampilkan petunjuk kredensial demo: "Demo: admin / admin123 atau user / user123"
    - Gunakan `validateCredentials` untuk memverifikasi input
    - WHEN kredensial valid → panggil `onLogin(role, username)`
    - IF kredensial tidak valid → tampilkan pesan error inline "Username atau password salah. Silakan coba lagi." tanpa navigasi
    - Terapkan tema dark glassmorphism yang konsisten
    - Terima props: `onLogin: (role: UserRole, username: string) => void`
    - Sertakan atribut `aria-label` pada semua elemen interaktif
    - _Persyaratan: 10.1, 10.2, 10.3, 10.4, 10.5, 10.9, 10.10_

  - [x] 17.4 Perbarui `src/App.tsx` untuk mengelola routing berbasis state
    - Tambahkan state `currentPage: 'login' | 'admin' | 'public'` (default: `'login'`)
    - Tambahkan state `authState: AuthState | null` (default: `null`)
    - Implementasikan handler `handleLogin(role: UserRole, username: string)`: set `authState`, set `currentPage` ke `'admin'` atau `'public'` sesuai role
    - Implementasikan handler `handleLogout()`: set `authState` ke `null`, set `currentPage` ke `'login'`
    - Render `LoginPage` ketika `currentPage === 'login'`
    - Render `Dashboard` (dengan prop `onLogout`) ketika `currentPage === 'admin'`
    - Render `PublicDashboard` (dengan prop `onLogout`) ketika `currentPage === 'public'`
    - Bungkus semua dengan `ErrorBoundary`
    - _Persyaratan: 10.6, 10.7, 10.8_

  - [x] 17.5 Perbarui `src/components/Navbar/Navbar.tsx` untuk menambahkan tombol Logout
    - Tambahkan prop `onLogout: () => void`
    - Tambahkan tombol "Logout" dengan ikon `LogOut` dari Lucide React dan atribut `aria-label="Logout"`
    - _Persyaratan: 1.7_

- [x] 18. Implementasi Public Dashboard dan Public Navbar
  - [x] 18.1 Perbarui `src/data/mockData.ts`
    - Tambahkan konstanta `PUBLIC_HEALTH_ADVICES: PublicHealthAdvice[]` dengan 3 entri (Critical, Warning, Insight) menggunakan teks Bahasa Indonesia yang ramah warga sesuai Persyaratan 12.3
    - _Persyaratan: 12.3_

  - [x] 18.2 Perbarui `src/utils/aqiUtils.ts`
    - Tambahkan fungsi `getAQIPublicLabel(aqi: number): string` yang mengembalikan "Udara Baik 🟢" (≤50), "Sedang 🟡" (51–100), "Tidak Sehat 🔴" (>100)
    - Tambahkan fungsi `getNodeStatusPublicLabel(status: NodeStatus): string` yang mengembalikan "Aktif", "Peringatan", "Tidak Aktif"
    - _Persyaratan: 12.1, 12.5_

  - [x] 18.3 Buat `src/components/Navbar/PublicNavbar.tsx`
    - Tampilkan logo "AirGuard System" dengan efek glow emerald-green (sama dengan Navbar admin)
    - Integrasikan `CitySelector` dan `LiveClock`
    - Tambahkan tombol "Logout" dengan ikon `LogOut` dari Lucide React dan atribut `aria-label="Logout"`
    - **Tidak** menampilkan tombol "Export Report"
    - **Tidak** menampilkan `StatusIndicator` teknis
    - Terima props: `activeCity`, `onCityChange`, `onLogout`
    - _Persyaratan: 11.2_

  - [x] 18.4 Buat `src/components/Dashboard/PublicDashboard.tsx`
    - Kelola state: `activeCity`, `selectedNodeId`
    - Implementasikan handler `onCityChange`, `onNodeSelect`
    - Integrasikan `PublicNavbar`, `MainLayout`, `GISMap`, `NodeTicker`, `PublicForecast`, `PublicPolicyPanel`
    - Terapkan latar belakang `bg-slate-900` dan `min-h-screen`
    - Terima props: `onLogout: () => void`
    - _Persyaratan: 11.1, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

- [x] 19. Implementasi adaptasi konten tampilan publik
  - [x] 19.1 Buat `src/components/PolicyPanel/HealthAdviceCard.tsx`
    - Tampilkan severity, message, dan timestamp dengan format ramah warga
    - Gunakan `getSeverityColor` untuk warna aksen (konsisten dengan `AlertCard`)
    - Tampilkan ikon peringatan (Lucide `AlertTriangle`) untuk Critical/Warning dan ikon informasi (Lucide `Info`) untuk Insight
    - Terima props: `advice: PublicHealthAdvice`
    - Sertakan atribut `aria-label`
    - _Persyaratan: 12.3_

  - [x] 19.2 Buat `src/components/PolicyPanel/PublicPolicyPanel.tsx`
    - Tampilkan judul "Saran Kesehatan Hari Ini" (bukan "Automated Policy Recommendations")
    - Render daftar `HealthAdviceCard` untuk setiap saran
    - Tampilkan empty state dengan teks "Udara hari ini dalam kondisi baik. Tidak ada saran khusus saat ini. 🌿" ketika array `advices` kosong
    - Tampilkan `SkeletonLoader` ketika `isLoading` bernilai `true`
    - Terima props: `advices: PublicHealthAdvice[]`, `isLoading: boolean`
    - _Persyaratan: 12.2, 12.8_

  - [x] 19.3 Buat `src/components/LSTMForecast/PublicForecast.tsx`
    - Gunakan kembali `ForecastChart` yang sudah ada sebagai komponen chart bersama
    - Tampilkan judul kartu "Prakiraan Kualitas Udara 48 Jam" (bukan "48-Hour AQI Forecast (LSTM Model)")
    - Tampilkan label Hazard_Threshold sebagai "Batas Tidak Sehat (AQI > 100)" — teruskan sebagai prop ke `ForecastChart` atau override label di komponen ini
    - Tampilkan pesan error "Gagal memuat data. Silakan coba lagi nanti." (bukan pesan teknis)
    - Tampilkan `SkeletonLoader` ketika `isLoading` bernilai `true`
    - Terima props: `forecastData: ForecastDataPoint[]`, `isLoading: boolean`, `error: string | null`
    - _Persyaratan: 12.4, 12.6, 12.7_

- [x] 20. Integrasi dan routing lengkap
  - [x] 20.1 Verifikasi alur login → routing → dashboard berfungsi end-to-end
    - Login dengan `admin` / `admin123` → tampilkan `Dashboard` (Admin Command Center)
    - Login dengan `user` / `user123` → tampilkan `PublicDashboard`
    - Kredensial salah → tetap di `LoginPage` dengan pesan error
    - Klik Logout dari Admin_Dashboard → kembali ke `LoginPage`
    - Klik Logout dari Public_Dashboard → kembali ke `LoginPage`
    - _Persyaratan: 10.3, 10.4, 10.5, 10.8_

  - [x] 20.2 Verifikasi semua fitur Public_Dashboard berfungsi
    - GIS_Map: node pins, heatmap toggle, map controls, klik node → update selectedNodeId
    - Node_Ticker: render kartu node, klik kartu → update selectedNodeId dan GIS_Map
    - PublicForecast: render grafik dengan judul Bahasa Indonesia
    - PublicPolicyPanel: render HealthAdviceCard dengan teks Bahasa Indonesia
    - City_Selector: ganti kota → update activeCity di seluruh komponen
    - _Persyaratan: 11.3, 11.4, 11.5, 11.6, 12.1–12.8_

- [x] 21. Pengujian sistem login dan tampilan publik
  - [x] 21.1 Tulis unit tests untuk `LoginPage`
    - Render formulir login dengan semua elemen yang diperlukan
    - Simulasikan input kredensial admin yang valid → verifikasi `onLogin` dipanggil dengan `('admin', 'admin')`
    - Simulasikan input kredensial publik yang valid → verifikasi `onLogin` dipanggil dengan `('public', 'user')`
    - Simulasikan input kredensial yang salah → verifikasi pesan error ditampilkan, `onLogin` tidak dipanggil
    - Verifikasi petunjuk demo ditampilkan
    - _Persyaratan: 10.1–10.5, 10.9_

  - [x] 21.2 Tulis unit tests untuk `PublicNavbar`
    - Verifikasi logo ditampilkan
    - Verifikasi `CitySelector` ditampilkan
    - Verifikasi tombol "Logout" ditampilkan
    - Verifikasi tombol "Export Report" **tidak** ditampilkan
    - Verifikasi `StatusIndicator` **tidak** ditampilkan
    - _Persyaratan: 11.2_

  - [x] 21.3 Tulis unit tests untuk `PublicDashboard`
    - Verifikasi semua komponen dirender: `PublicNavbar`, `GISMap`, `NodeTicker`, `PublicForecast`, `PublicPolicyPanel`
    - Verifikasi judul "Saran Kesehatan Hari Ini" ditampilkan
    - Verifikasi judul "Prakiraan Kualitas Udara 48 Jam" ditampilkan
    - _Persyaratan: 11.1–11.6, 12.2, 12.4_

  - [x] 21.4 Tulis unit tests untuk `App.tsx` routing
    - Verifikasi `LoginPage` dirender saat awal (sebelum login)
    - Simulasikan login admin → verifikasi `Dashboard` dirender
    - Simulasikan login publik → verifikasi `PublicDashboard` dirender
    - Simulasikan logout dari Admin_Dashboard → verifikasi `LoginPage` dirender kembali
    - _Persyaratan: 10.6, 10.8_

  - [ ]* 21.5 Tulis property test untuk `validateCredentials` (Properti 11)
    - **Properti 11: Validasi Kredensial Login Konsisten**
    - Gunakan `fc.string()` × `fc.string()` untuk menghasilkan pasangan username/password acak
    - Verifikasi: hanya `('admin', 'admin123')` → `'admin'`, hanya `('user', 'user123')` → `'public'`, semua lainnya → `null`
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 10.3, 10.4, 10.5**

  - [ ]* 21.6 Tulis property test untuk routing berbasis peran (Properti 12)
    - **Properti 12: Routing Berbasis Peran Konsisten**
    - Gunakan `fc.constantFrom<UserRole>('admin', 'public')` untuk memilih peran acak
    - Simulasikan `handleLogin` dengan peran tersebut dan verifikasi `currentPage` diperbarui ke nilai yang tepat
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 10.3, 10.4, 10.6**

  - [ ]* 21.7 Tulis property test untuk `getAQIPublicLabel` (Properti 13)
    - **Properti 13: Label AQI Publik Konsisten**
    - Gunakan `fc.integer({ min: 0, max: 500 })` untuk menghasilkan nilai AQI acak
    - Verifikasi: AQI ≤ 50 → mengandung "Udara Baik", AQI 51–100 → mengandung "Sedang", AQI > 100 → mengandung "Tidak Sehat"
    - Verifikasi konsistensi dengan `getAQIColor`: AQI yang menghasilkan `'emerald'` harus menghasilkan label "Udara Baik"
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 12.1**

  - [ ]* 21.8 Tulis property test untuk logout (Properti 14)
    - **Properti 14: Logout Mengembalikan ke Login Page**
    - Gunakan `fc.constantFrom<UserRole>('admin', 'public')` untuk memilih peran acak
    - Simulasikan login dengan peran tersebut, lalu simulasikan logout
    - Verifikasi `currentPage` kembali ke `'login'` dan `authState` menjadi `null`
    - Konfigurasi `numRuns: 100`
    - **Memvalidasi: Persyaratan 10.8**

  - [x] 21.9 Tulis unit tests aksesibilitas untuk halaman baru
    - Render `LoginPage` dan jalankan `axe(container)` → verifikasi 0 pelanggaran WCAG AA
    - Render `PublicDashboard` dan jalankan `axe(container)` → verifikasi 0 pelanggaran WCAG AA
    - _Persyaratan: 11.9_

- [x] 22. Checkpoint akhir — Verifikasi integrasi dual-view penuh
  - Pastikan semua tests lulus (unit, property-based, aksesibilitas) untuk semua komponen baru
  - Verifikasi alur lengkap: Login → Admin Dashboard → Logout → Login → Public Dashboard → Logout
  - Verifikasi tidak ada regresi pada komponen Admin yang sudah ada (Tasks 1–16)
  - Tanyakan kepada pengguna jika ada pertanyaan sebelum menyelesaikan implementasi

## Catatan

- Task yang ditandai dengan `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan persyaratan spesifik untuk keterlacakan
- Checkpoint memastikan validasi bertahap sebelum melanjutkan ke fase berikutnya
- Property tests memvalidasi properti kebenaran universal dengan minimum 100 iterasi per properti
- Unit tests memvalidasi contoh spesifik dan kondisi edge case
- Seluruh data dummy terpusat di `mockData.ts` sehingga mudah diganti dengan respons API nyata
- Tasks 1–16 (Admin Command Center) sudah selesai [x] dan tidak berubah
- Tasks 17–22 adalah penambahan baru untuk sistem dual-view
- Routing menggunakan React state (tanpa `react-router-dom`) karena library tersebut tidak tersedia di proyek ini
