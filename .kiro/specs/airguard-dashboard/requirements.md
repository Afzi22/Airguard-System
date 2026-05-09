# Dokumen Persyaratan

## Pendahuluan

AirGuard Dashboard adalah antarmuka web modern berbasis React untuk platform Smart City pemantauan kualitas udara. Sistem ini kini mendukung **dua tampilan berbeda** yang diakses melalui halaman login:

1. **Tampilan Admin/Operator** — "Command Center" lengkap untuk operator kota dengan data teknis penuh, kontrol ekspor laporan, dan indikator status sistem.
2. **Tampilan Publik/Masyarakat** — Versi yang ramah warga dengan bahasa yang lebih sederhana (Bahasa Indonesia), label AQI dalam kata-kata sehari-hari, dan saran kesehatan sebagai pengganti rekomendasi kebijakan teknis.

Akses ke masing-masing tampilan ditentukan oleh peran pengguna yang diverifikasi saat login. Autentikasi menggunakan kredensial mock (hardcoded) tanpa backend nyata.

Tech stack yang digunakan: React, Tailwind CSS, Lucide React (ikon), dan Recharts (visualisasi data). Routing antar halaman menggunakan React state (tanpa `react-router-dom`).

## Glosarium

- **Dashboard**: Antarmuka utama AirGuard yang menampilkan seluruh komponen pemantauan kualitas udara.
- **Admin_Dashboard**: Tampilan Command Center lengkap yang hanya dapat diakses oleh pengguna dengan peran `admin`.
- **Public_Dashboard**: Tampilan ramah warga yang dapat diakses oleh pengguna dengan peran `public`.
- **Login_Page**: Halaman awal sistem yang menampilkan formulir login dan mengarahkan pengguna ke tampilan yang sesuai berdasarkan peran.
- **Auth_State**: State autentikasi yang menyimpan informasi pengguna yang sedang login, termasuk peran (`UserRole`).
- **UserRole**: Tipe union yang merepresentasikan peran pengguna: `'admin'` atau `'public'`.
- **Mock_Credentials**: Kredensial login yang di-hardcode untuk keperluan demonstrasi (tanpa backend nyata).
- **AQI (Air Quality Index)**: Indeks kualitas udara dengan skala numerik; nilai ≤ 50 = Baik (hijau), 51–100 = Sedang (kuning), > 100 = Tidak Sehat (merah).
- **AQI_Label_Publik**: Deskripsi AQI dalam bahasa sehari-hari untuk tampilan publik: "Udara Baik" (≤ 50), "Sedang" (51–100), "Tidak Sehat" (> 100).
- **PM2.5**: Partikel udara berdiameter ≤ 2,5 mikrometer yang diukur oleh sensor IoT.
- **IoT_Node**: Perangkat sensor fisik (simulasi Wokwi) yang mengukur kualitas udara di lokasi tertentu.
- **GIS_Map**: Komponen peta interaktif berbasis Mapbox GL / Leaflet yang menampilkan sebaran IoT_Node.
- **Heatmap_Layer**: Lapisan visual pada GIS_Map yang menggambarkan konsentrasi polutan secara spasial.
- **LSTM_Forecast**: Komponen grafik yang menampilkan prediksi AQI 48 jam ke depan menggunakan model LSTM.
- **Policy_Panel**: Panel yang menampilkan rekomendasi kebijakan (Admin) atau saran kesehatan (Publik) berdasarkan prediksi AQI.
- **Navbar**: Bilah navigasi atas yang menampilkan identitas sistem, pemilih kota, waktu, dan tombol Logout.
- **City_Selector**: Dropdown pada Navbar untuk memilih kota yang dipantau (Tangerang, Tangerang Selatan, Cikarang, Depok, Bekasi, Hanoi, Ho Chi Minh City).
- **Status_Indicator**: Elemen pada Navbar Admin yang menampilkan status komponen sistem (AI Engine, IoT Nodes).
- **Node_Ticker**: Komponen yang menampilkan status live ringkas dari setiap IoT_Node aktif.
- **Hazard_Threshold**: Batas nilai AQI = 100 yang ditandai sebagai garis referensi pada LSTM_Forecast.
- **Alert_Card**: Kartu notifikasi pada Policy_Panel dengan tingkat keparahan: Critical, Warning, atau Insight.
- **Health_Advice_Card**: Versi ramah warga dari Alert_Card pada tampilan publik, menggunakan bahasa saran kesehatan.
- **Glassmorphism**: Gaya desain dengan efek kaca buram (backdrop blur + transparansi) pada elemen kartu.

---

## Persyaratan

> **Catatan Cakupan:** Persyaratan 1–9 berlaku khusus untuk **Tampilan Admin/Operator**. Persyaratan 10 mendefinisikan sistem login bersama. Persyaratan 11–12 mendefinisikan **Tampilan Publik/Masyarakat**.

---

### Persyaratan 1: Navbar dan Identitas Sistem *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin melihat identitas sistem, pemilih kota, waktu live, dan status sistem di bagian atas dashboard, sehingga saya dapat memantau konteks operasional secara sekilas.

#### Kriteria Penerimaan

1. THE Admin_Dashboard SHALL menampilkan Navbar di bagian paling atas halaman dengan lebar penuh (full-width).
2. THE Navbar SHALL menampilkan logo teks "AirGuard System" dengan aksen warna emerald-green bercahaya (glow effect).
3. THE Navbar SHALL menyediakan City_Selector berupa searchable dropdown yang memuat pilihan kota: Tangerang, Tangerang Selatan, Cikarang, Depok, Bekasi, Hanoi, Ho Chi Minh City.
4. WHEN pengguna memilih kota pada City_Selector, THE Admin_Dashboard SHALL memperbarui konteks kota aktif yang ditampilkan di seluruh komponen.
5. THE Navbar SHALL menampilkan waktu dan tanggal yang diperbarui setiap detik menggunakan timer berbasis `setInterval`.
6. THE Navbar SHALL menampilkan dua Status_Indicator: "AI Engine: Online" dengan warna hijau dan "IoT Nodes: 45 Active" dengan warna biru.
7. THE Navbar SHALL menampilkan tombol "Logout" yang ketika diklik akan mengembalikan pengguna ke Login_Page.
8. IF komponen Navbar gagal merender, THEN THE Admin_Dashboard SHALL tetap menampilkan konten utama tanpa Navbar.

---

### Persyaratan 2: Layout Utama Dua Kolom *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin layout dashboard yang membagi layar menjadi area peta di kiri dan area analitik di kanan, sehingga saya dapat memantau data spasial dan prediksi secara bersamaan.

#### Kriteria Penerimaan

1. THE Admin_Dashboard SHALL menggunakan CSS Grid atau Flexbox untuk membagi area konten menjadi dua kolom: kolom kiri 65% lebar dan kolom kanan 35% lebar.
2. THE Admin_Dashboard SHALL mengisi seluruh tinggi viewport (full-screen / `min-h-screen`) tanpa scroll horizontal.
3. WHILE lebar viewport kurang dari 1024px, THE Admin_Dashboard SHALL menumpuk kedua kolom secara vertikal (responsive stacking).
4. THE Admin_Dashboard SHALL menerapkan tema dark dengan latar belakang warna Dark Slate atau Navy (`bg-slate-900` atau setara).
5. THE Admin_Dashboard SHALL menerapkan gaya Glassmorphism pada semua kartu komponen menggunakan `backdrop-blur`, transparansi, dan border halus.
6. WHEN tombol "Export Report" diklik, THE Admin_Dashboard SHALL memunculkan notifikasi toast "Mempersiapkan laporan PDF kualitas udara..."
7. THE Navbar (atau area kanan atas Admin_Dashboard) SHALL menyediakan tombol berlabel "Export Report" dengan ikon Download dari Lucide React.

---

### Persyaratan 3: Komponen GIS Map Interaktif *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin melihat peta interaktif yang menampilkan lokasi IoT_Node beserta nilai AQI-nya, sehingga saya dapat mengidentifikasi area berpolusi tinggi secara spasial.

#### Kriteria Penerimaan

1. THE GIS_Map SHALL menampilkan area peta sebagai placeholder dengan dimensi yang mengisi kolom kiri secara penuh.
2. THE GIS_Map SHALL menampilkan minimal 3 titik data IoT_Node dummy dengan posisi koordinat yang berbeda.
3. WHEN nilai AQI sebuah IoT_Node ≤ 50, THE GIS_Map SHALL menampilkan badge node tersebut dengan warna Emerald Green.
4. WHEN nilai AQI sebuah IoT_Node berada antara 51 dan 100, THE GIS_Map SHALL menampilkan badge node tersebut dengan warna Amber/Kuning.
5. WHEN nilai AQI sebuah IoT_Node > 100, THE GIS_Map SHALL menampilkan badge node tersebut dengan warna Rose Red.
6. THE GIS_Map SHALL menyediakan toggle switch berlabel "Heatmap Layer" yang mengaktifkan atau menonaktifkan tampilan Heatmap_Layer.
7. WHEN toggle "Heatmap Layer" diaktifkan, THE GIS_Map SHALL menampilkan overlay visual yang merepresentasikan konsentrasi polutan.
8. THE GIS_Map SHALL menyediakan kontrol peta mengambang (floating controls) berupa tombol zoom-in, zoom-out, dan recenter.
9. IF integrasi library peta eksternal (Mapbox GL / Leaflet) tidak tersedia, THEN THE GIS_Map SHALL menampilkan placeholder visual yang fungsional dengan data dummy tetap terlihat.

---

### Persyaratan 4: Node Ticker / Status Node Live *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin melihat status ringkas setiap IoT_Node secara live di bawah peta, sehingga saya dapat memantau kondisi sensor tanpa membuka detail penuh.

#### Kriteria Penerimaan

1. THE Node_Ticker SHALL menampilkan minimal 3 kartu mini IoT_Node dummy dengan data: Node ID, nilai PM2.5, dan status operasional.
2. THE Node_Ticker SHALL menampilkan status operasional setiap node menggunakan kode warna: hijau untuk "Active", kuning untuk "Warning", merah untuk "Offline".
3. THE Node_Ticker SHALL ditampilkan sebagai deretan horizontal (ticker atau mini-cards) di bawah komponen GIS_Map.
4. THE Node_Ticker SHALL menggunakan data dummy yang terstruktur sehingga mudah diganti dengan respons API JSON nyata.

---

### Persyaratan 5: Grafik Prediksi AQI 48 Jam (LSTM Forecast) *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin melihat grafik prediksi AQI untuk 24 jam ke depan, sehingga saya dapat mengambil tindakan pencegahan sebelum kualitas udara memburuk.

#### Kriteria Penerimaan

1. THE LSTM_Forecast SHALL menampilkan grafik menggunakan komponen `AreaChart` atau `LineChart` dari library Recharts.
2. THE LSTM_Forecast SHALL memiliki sumbu-X yang merepresentasikan 24 titik waktu ke depan (per jam).
3. THE LSTM_Forecast SHALL memiliki sumbu-Y yang merepresentasikan nilai AQI dengan rentang yang sesuai dengan data.
4. THE LSTM_Forecast SHALL menampilkan garis referensi putus-putus berwarna Rose Red berlabel "Hazard Threshold (AQI > 100)" pada nilai Y = 100.
5. THE LSTM_Forecast SHALL menggunakan data dummy 24 titik yang terstruktur sehingga mudah diganti dengan respons API JSON nyata.
6. THE LSTM_Forecast SHALL menampilkan judul kartu "48-Hour AQI Forecast (LSTM Model)" di bagian atas komponen.
7. WHEN pengguna mengarahkan kursor ke titik data pada grafik, THE LSTM_Forecast SHALL menampilkan tooltip yang memuat nilai AQI dan waktu yang sesuai.

---

### Persyaratan 6: Panel Rekomendasi Kebijakan Otomatis *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin melihat rekomendasi kebijakan yang dihasilkan secara otomatis berdasarkan prediksi AQI, sehingga saya dapat mengambil tindakan yang tepat dengan cepat.

#### Kriteria Penerimaan

1. THE Policy_Panel SHALL menampilkan judul "Automated Policy Recommendations" di bagian atas komponen.
2. THE Policy_Panel SHALL menampilkan minimal 3 Alert_Card dengan tingkat keparahan yang berbeda: Critical, Warning, dan Insight.
3. WHEN tingkat keparahan Alert_Card adalah Critical, THE Policy_Panel SHALL menampilkan kartu tersebut dengan aksen warna Rose Red dan ikon peringatan.
4. WHEN tingkat keparahan Alert_Card adalah Warning, THE Policy_Panel SHALL menampilkan kartu tersebut dengan aksen warna Amber/Oranye dan ikon peringatan.
5. WHEN tingkat keparahan Alert_Card adalah Insight, THE Policy_Panel SHALL menampilkan kartu tersebut dengan aksen warna Emerald Green dan ikon informasi.
6. THE Policy_Panel SHALL menampilkan teks rekomendasi berikut sebagai data dummy:
   - Critical: "Predicted AQI > 150 at Tanggerang Selatan Intersection at 17:00. Recommendation: Trigger traffic rerouting protocol."
   - Warning: "High PM2.5 cluster forming near School District 4. Recommendation: Restrict outdoor physical activities."
   - Insight: "Low pollution expected tomorrow morning. Ideal time for public park maintenance."
7. THE Policy_Panel SHALL menggunakan struktur data dummy yang terstruktur sehingga mudah diganti dengan respons API JSON nyata.

---

### Persyaratan 7: Sistem Desain dan Aksesibilitas *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin dashboard yang konsisten secara visual dan dapat diakses, sehingga penggunaan jangka panjang tidak melelahkan dan informasi tetap terbaca jelas.

#### Kriteria Penerimaan

1. THE Admin_Dashboard SHALL menerapkan palet warna yang konsisten: latar belakang Dark Slate/Navy, teks putih bersih, Emerald Green untuk status baik, Amber untuk peringatan, dan Rose Red untuk kondisi kritis.
2. THE Admin_Dashboard SHALL menerapkan `rounded-xl` pada semua kartu komponen untuk sudut membulat yang konsisten.
3. THE Admin_Dashboard SHALL menerapkan bayangan lembut (`shadow-lg` atau setara) pada semua kartu komponen.
4. THE Admin_Dashboard SHALL memastikan rasio kontras teks terhadap latar belakang memenuhi standar WCAG AA (minimum 4.5:1 untuk teks normal).
5. THE Admin_Dashboard SHALL menyertakan atribut `aria-label` pada semua elemen interaktif (tombol, dropdown, toggle) untuk mendukung pembaca layar.
6. THE Admin_Dashboard SHALL menggunakan komponen yang modular dan terpisah per file sehingga setiap komponen dapat dikembangkan dan diuji secara independen.
7. THE Admin_Dashboard SHALL menggunakan struktur data dummy yang terpusat (satu file konstanta atau objek konfigurasi) sehingga seluruh data dapat diganti dengan respons API JSON nyata tanpa mengubah logika komponen.
8. THE Admin_Dashboard SHALL mendefinisikan tipe data TypeScript yang jelas untuk objek Alert_Card, seperti `{ id: string, severity: 'Critical' | 'Warning' | 'Insight', message: string, timestamp: string }`.
9. WHEN data sedang dimuat dari API, THE Admin_Dashboard SHALL menampilkan efek Skeleton Loading bergaya dark-mode pada komponen GIS_Map, LSTM_Forecast, dan Policy_Panel agar UI tidak terlihat kosong atau rusak.

---

### Persyaratan 8: Interaksi Peta dan Node Ticker *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin dapat mengklik salah satu kartu IoT_Node di Node_Ticker agar peta langsung menyorot lokasi spesifik tersebut, sehingga saya bisa langsung melihat konteks geografis dari sensor yang bermasalah.

#### Kriteria Penerimaan

1. WHEN pengguna mengklik salah satu kartu di Node_Ticker, THEN GIS_Map SHALL secara otomatis memusatkan tampilan (recenter / pan) ke koordinat IoT_Node tersebut.
2. WHEN sebuah kartu di Node_Ticker diklik, THEN kartu tersebut SHALL menampilkan efek visual aktif (misalnya, border menyala atau background sedikit lebih terang) untuk menandakan bahwa node tersebut sedang dipilih.
3. WHEN IoT_Node dipilih, GIS_Map SHALL menampilkan tooltip atau popup di atas pin node tersebut yang berisi detail data PM2.5 dan statusnya.

---

### Persyaratan 9: Penanganan Status Error dan Data Kosong *(Admin View)*

**User Story:** Sebagai operator kota, saya ingin mendapatkan informasi visual yang jelas jika sistem gagal mengambil data dari server atau jika tidak ada peringatan kebijakan, sehingga saya tidak kebingungan mendiagnosis masalah.

#### Kriteria Penerimaan

1. IF proses pengambilan data untuk LSTM_Forecast gagal (misalnya karena timeout API), THEN komponen SHALL menampilkan pesan error "Gagal memuat prediksi AI. Silakan coba lagi." di tengah kartu, tanpa merusak tata letak.
2. IF Policy_Panel menerima array data kosong (tidak ada peringatan saat ini), THEN komponen SHALL menampilkan ilustrasi sederhana bergaya dark-mode dan teks "Kualitas udara saat ini stabil. Tidak ada rekomendasi kebijakan darurat."
3. THE Admin_Dashboard SHALL memiliki Error Boundary global sehingga jika satu komponen error, komponen lain (seperti Navbar dan Peta) tetap berfungsi normal.

---

### Persyaratan 10: Sistem Login dan Routing Berbasis Peran

**User Story:** Sebagai pengguna sistem (operator atau warga), saya ingin masuk melalui halaman login dan diarahkan ke tampilan yang sesuai dengan peran saya, sehingga saya mendapatkan informasi yang relevan tanpa harus melihat antarmuka yang tidak perlu.

#### Kriteria Penerimaan

1. THE Login_Page SHALL menampilkan formulir login dengan dua field input: "Username" dan "Password", serta tombol "Masuk".
2. THE Login_Page SHALL menampilkan logo dan nama sistem "AirGuard System" di bagian atas formulir.
3. WHEN pengguna memasukkan username `admin` dan password `admin123` lalu menekan tombol "Masuk", THE System SHALL menampilkan Admin_Dashboard.
4. WHEN pengguna memasukkan username `user` dan password `user123` lalu menekan tombol "Masuk", THE System SHALL menampilkan Public_Dashboard.
5. IF pengguna memasukkan kombinasi username dan password yang tidak dikenali, THEN THE Login_Page SHALL menampilkan pesan error "Username atau password salah. Silakan coba lagi." tanpa menavigasi ke halaman lain.
6. THE System SHALL menggunakan React state (tanpa `react-router-dom`) untuk mengelola halaman yang sedang aktif (`'login'`, `'admin'`, atau `'public'`).
7. THE System SHALL menyimpan Auth_State yang berisi `role: UserRole` dan `username: string` selama sesi aktif (dalam React state, tidak perlu `localStorage`).
8. WHEN pengguna menekan tombol "Logout" dari tampilan mana pun, THE System SHALL menghapus Auth_State dan menampilkan kembali Login_Page.
9. THE Login_Page SHALL menampilkan petunjuk kredensial demo yang terlihat jelas (misalnya, "Demo: admin / admin123 atau user / user123") untuk kemudahan pengujian.
10. THE Login_Page SHALL menerapkan tema dark yang konsisten dengan Admin_Dashboard dan Public_Dashboard.

---

### Persyaratan 11: Layout dan Navigasi Tampilan Publik/Masyarakat

**User Story:** Sebagai warga kota, saya ingin melihat informasi kualitas udara di kota saya dalam tampilan yang mudah dipahami, sehingga saya dapat membuat keputusan sehari-hari berdasarkan kondisi udara terkini.

#### Kriteria Penerimaan

1. THE Public_Dashboard SHALL menampilkan layout dua kolom yang sama dengan Admin_Dashboard (kolom kiri 65%, kolom kanan 35%) dengan responsive stacking di bawah 1024px.
2. THE Public_Dashboard SHALL menampilkan Navbar yang disederhanakan: logo "AirGuard System", City_Selector, LiveClock, dan tombol "Logout" — tanpa tombol "Export Report" dan tanpa Status_Indicator teknis.
3. THE Public_Dashboard SHALL menampilkan GIS_Map dengan fungsionalitas penuh yang sama seperti Admin_Dashboard (node pins, heatmap toggle, map controls, interaksi klik node).
4. THE Public_Dashboard SHALL menampilkan Node_Ticker dengan fungsionalitas penuh yang sama seperti Admin_Dashboard.
5. THE Public_Dashboard SHALL menampilkan LSTM_Forecast dengan fungsionalitas penuh yang sama seperti Admin_Dashboard.
6. THE Public_Dashboard SHALL menampilkan panel saran kesehatan (versi publik dari Policy_Panel) dengan fungsionalitas penuh yang sama.
7. WHILE lebar viewport kurang dari 1024px, THE Public_Dashboard SHALL menumpuk kedua kolom secara vertikal.
8. THE Public_Dashboard SHALL menerapkan tema dark glassmorphism yang sama dengan Admin_Dashboard.
9. THE Public_Dashboard SHALL menyertakan atribut `aria-label` pada semua elemen interaktif untuk mendukung pembaca layar.

---

### Persyaratan 12: Adaptasi Konten Tampilan Publik/Masyarakat

**User Story:** Sebagai warga kota, saya ingin melihat informasi kualitas udara dengan bahasa yang mudah dimengerti dan saran yang relevan untuk kehidupan sehari-hari, sehingga saya tidak perlu memahami istilah teknis untuk mengambil tindakan yang tepat.

#### Kriteria Penerimaan

1. THE Public_Dashboard SHALL menampilkan nilai AQI menggunakan AQI_Label_Publik: "Udara Baik 🟢" untuk AQI ≤ 50, "Sedang 🟡" untuk AQI 51–100, dan "Tidak Sehat 🔴" untuk AQI > 100, di samping atau sebagai pengganti angka numerik pada komponen yang relevan.
2. THE Public_Dashboard SHALL menampilkan judul panel saran kesehatan sebagai "Saran Kesehatan Hari Ini" (bukan "Automated Policy Recommendations").
3. THE Public_Dashboard SHALL menampilkan Health_Advice_Card dengan teks yang ditulis ulang dalam Bahasa Indonesia yang ramah warga:
   - Critical: "⚠️ Kualitas udara sangat buruk di Persimpangan Tangerang Selatan sekitar pukul 17:00. Hindari aktivitas luar ruangan dan gunakan masker jika harus keluar."
   - Warning: "😷 Konsentrasi PM2.5 tinggi di sekitar area sekolah. Batasi aktivitas fisik di luar ruangan untuk anak-anak."
   - Insight: "✅ Kualitas udara diperkirakan baik besok pagi. Waktu yang tepat untuk berolahraga di luar ruangan."
4. THE Public_Dashboard SHALL menampilkan judul grafik LSTM_Forecast sebagai "Prakiraan Kualitas Udara 48 Jam" (bukan "48-Hour AQI Forecast (LSTM Model)").
5. THE Public_Dashboard SHALL menampilkan label status node pada Node_Ticker dalam Bahasa Indonesia: "Aktif" (Active), "Peringatan" (Warning), "Tidak Aktif" (Offline).
6. THE Public_Dashboard SHALL menampilkan label Hazard_Threshold pada grafik sebagai "Batas Tidak Sehat (AQI > 100)" (bukan "Hazard Threshold (AQI > 100)").
7. THE Public_Dashboard SHALL menampilkan pesan error dalam Bahasa Indonesia yang ramah: "Gagal memuat data. Silakan coba lagi nanti." (bukan pesan teknis).
8. IF panel saran kesehatan menerima array data kosong, THEN THE Public_Dashboard SHALL menampilkan teks "Udara hari ini dalam kondisi baik. Tidak ada saran khusus saat ini. 🌿"
