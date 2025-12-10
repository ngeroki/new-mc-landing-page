

# **Draf Penelitian: Arsitektur Etalase Digital Grosir Sandal (Edisi 2025\)**

## **Bagian 1: Rekomendasi Tumpukan Teknologi (Tech Stack) MVP 1 Minggu untuk 2025**

### **Keputusan Akhir: Astro \+ React \+ Tailwind CSS**

Untuk tujuan spesifik proyek ini—sebuah katalog produk statis, SEO-sentris, dengan target peluncuran dalam 1 minggu—rekomendasi tumpukan teknologi (tech stack) yang paling optimal untuk tahun 2025 adalah **Astro**, dikombinasikan dengan integrasi **React** untuk komponen interaktif dan **Tailwind CSS** untuk *styling*.

### **Analisis Rekomendasi**

Tiga faktor utama mendorong keputusan ini: kinerja SEO, kecepatan pengembangan untuk MVP, dan fleksibilitas untuk mengakomodasi keterampilan React yang ada.

1. **Kinerja & SEO Terbaik di Kelasnya:** Astro dirancang sebagai *framework* yang mengutamakan konten (*content-first*) dan menghasilkan *Zero JavaScript by default*.1 Saat situs di-*build*, Astro menghasilkan halaman HTML statis murni. Ini menghasilkan waktu pemuatan yang sangat cepat dan skor *Core Web Vitals* (CWV) yang nyaris sempurna, yang merupakan faktor peringkat (ranking factor) signifikan bagi Google.2  
2. **Kecepatan Pengembangan (untuk MVP):** Dibandingkan dengan *framework* *full-stack* seperti Next.js, Astro memiliki kurva belajar yang jauh lebih landai, terutama untuk proyek yang berfokus pada konten.1 Logika penulisan dalam file .astro sangat mirip dengan HTML standar, yang memungkinkan pembuatan *layout* dan halaman statis dengan cepat. Ini sangat penting untuk mencapai target MVP 1 minggu.  
3. **Fleksibilitas (Arsitektur "Islands"):** Ini adalah keunggulan strategis utama. Sebagian besar situs katalog produk (seperti header, footer, deskripsi produk) bersifat statis. Hanya sebagian kecil, seperti *image slider* atau tombol interaktif, yang memerlukan JavaScript. Astro menggunakan "Arsitektur Islands" 3, yang memungkinkan pengembang untuk "menghidrasi" (menjadikan interaktif) komponen individual. Secara krusial, Astro memungkinkan penggunaan komponen React (yang sedang dipelajari) secara spesifik untuk *islands* tersebut.5 Pendekatan ini memberikan kinerja situs statis murni sambil tetap memanfaatkan ekosistem React untuk interaktivitas.

## **Bagian 2: Analisis Mendalam: Astro vs. Next.js untuk "Grosir Sandal"**

Pemilihan antara Astro dan Next.js pada tahun 2025 bergantung pada pemahaman perbedaan filosofi fundamental mereka dan bagaimana hal itu berdampak pada proyek katalog sederhana.

### **Perbedaan Filosofi Inti**

* **Astro (Content-First):** Astro dioptimalkan untuk situs di mana konten adalah prioritas utama—blog, portofolio, situs dokumentasi, dan etalase katalog produk.1 Filosofinya adalah mengirimkan sesedikit mungkin ke peramban, dimulai dengan HTML statis, dan hanya menambahkan JavaScript secara *opt-in* (sesuai kebutuhan).3  
* **Next.js (Application-First):** Next.js telah berevolusi menjadi *platform* aplikasi *full-stack* yang komprehensif.2 Ini dirancang untuk aplikasi web yang dinamis, kaya data, dan seringkali memerlukan *backend*, seperti *dashboard* admin, platform media sosial, atau aplikasi SaaS.7 Menggunakan Next.js untuk katalog statis murni sering dianggap "berlebihan" (*overkill* atau *bloated*), karena membawa kompleksitas yang tidak diperlukan untuk kasus penggunaan ini.1

### **Trade-off Kinerja & SEO (Arsitektur Islands vs. Hidrasi)**

* **Astro (Islands):** Saat Astro membangun situs, ia menghasilkan HTML murni. Jika sebuah komponen React ditandai untuk interaktivitas (misalnya, client:load), Astro akan mengisolasi JavaScript *hanya* untuk komponen tersebut.3 Analisis menunjukkan bahwa pendekatan ini dapat menghasilkan *bundle* JavaScript 50-70% lebih kecil dibandingkan dengan situs React pada umumnya.3  
* **Next.js (Hydration):** Bahkan ketika Next.js dikonfigurasi untuk *static export* (SSG), *framework* ini masih perlu mengirimkan *runtime* React ke peramban klien. Proses yang disebut "hidrasi" ini kemudian mengambil alih halaman HTML statis untuk membuatnya interaktif. Meskipun sangat dioptimalkan (terutama dengan React Server Components 2), ini secara inheren merupakan operasi yang lebih berat daripada pendekatan *zero-JS-default* Astro.2

### **Trade-off Kecepatan & Pengalaman Pengembang (DX)**

* **Astro:** Kurva belajarnya lebih sederhana untuk proyek statis.1 Pengembang dapat menulis dalam file .astro (yang pada dasarnya HTML dengan *frontmatter* YAML dan sintaks JSX-like) dan dapat langsung mengimpor serta menggunakan komponen dari berbagai *framework* (termasuk React).5  
* **Next.js (App Router):** Bagi pengembang yang sedang belajar React, Next.js (versi 13 ke atas) memperkenalkan paradigma yang sama sekali baru dan kompleks: React Server Components (RSC).2 Pengembang harus bergulat dengan konsep seperti direktif “use client” 8, yang menentukan di mana komponen dieksekusi. Kompleksitas tambahan ini kemungkinan besar akan memperlambat pencapaian target MVP 1 minggu.

### **Tabel 1: Analisis Perbandingan Tumpukan Teknologi (Skenario: "Grosir Sandal" MVP)**

| Kriteria | Astro (+ React) (Direkomendasikan) | Next.js (Static Export) | React Murni (Vite \+ react-helmet) |
| :---- | :---- | :---- | :---- |
| **Tujuan Inti** | Situs Katalog Statis | Aplikasi Dinamis (dapat diekspor statis) | Aplikasi Sisi Klien (SPA) |
| **Kinerja SEO (OOTB)** | **Luar Biasa** (HTML statis, Zero JS *default*) 1 | **Sangat Baik** (HTML statis) | **Buruk** (Render di Sisi Klien) \[9, 10\] |
| **Kecepatan Muat** | Tak Terkalahkan (Waktu muat tercepat) 2 | Cepat (Lebih berat dari Astro) 2 | Lambat (Membutuhkan JS untuk me-render konten) |
| **Kecepatan Dev (MVP 1 Minggu)** | **Sangat Cepat** (Kurva belajar landai) 1 | Sedang (Kompleksitas App Router/RSC) \[2, 8\] | Lambat (Harus \+ *pre-rendering* manual) \[9\] |
| **Pengalaman Belajar React** | **Bagus.** Menggunakan React untuk *islands* interaktif 5 | **Bagus, tapi kompleks.** Mempelajari React \+ paradigma Next.js (RSC) 8 | **Murni.** Fokus hanya pada React. |
| **Deployment cPanel** | **Sangat Mudah.** (Hanya salin/tempel file statis) 11 | **Mungkin.** (Perlu konfigurasi output: 'export') 13 | **Mungkin.** (Perlu *build* & *pre-render* dulu) |

## **Bagian 3: Peta Jalan (Roadmap) 7 Hari: Dari Nol ke Peluncuran**

Peta jalan ini dirancang agar agresif namun realistis, dengan fokus eksklusif pada fitur MVP (Minimum Viable Product).

### **Hari 1-2: Pengaturan Proyek, Layout, dan Data**

* **Tindakan:**  
  1. Inisialisasi proyek Astro baru menggunakan npm create astro@latest.15  
  2. Selama proses *wizard* instalasi, tambahkan integrasi resmi untuk **Tailwind CSS** 17 dan **React**.6  
  3. Buat struktur *layout* dasar di src/layouts/MainLayout.astro (termasuk header, footer, dan slot \<slot /\> untuk konten halaman).15  
  4. Buat file data produk di src/data/products.json. (Gunakan *prompt* AI dari Bagian 5 untuk menghasilkan struktur data awal).

### **Hari 3-4: Membangun Komponen Inti (React)**

* **Tindakan:**  
  1. Buat komponen React src/components/ProductCard.jsx. Komponen ini akan menerima *prop* product dan menampilkan gambar, nama, merek, dan harga.  
  2. Buat komponen React src/components/ProductGallery.jsx. Komponen ini akan mengimpor data dari src/data/products.json, melakukan iterasi (*map*) melalui data tersebut, dan me-render sebuah \<ProductCard\> untuk setiap item.  
  3. Gunakan *prompt* AI dari Bagian 5 untuk menghasilkan *boilerplate* untuk galeri responsif dengan Tailwind CSS.18

### **Hari 5: Implementasi Halaman & Fitur Utama (Tombol WA)**

* **Tindakan:**  
  1. Edit halaman utama di src/pages/index.astro. Impor dan render komponen \<ProductGallery client:load /\> (menggunakan direktif client:load jika galeri memerlukan interaktivitas, atau biarkan statis jika tidak).  
  2. Implementasikan *routing* dinamis untuk detail produk dengan membuat file src/pages/produk/\[id\].astro. Halaman ini akan mengambil data produk berdasarkan id dan menampilkannya.  
  3. Buat komponen React src/components/WhatsAppButton.jsx. (Lihat *Snippet* Kode di Bagian 4). Tambahkan komponen ini ke halaman detail produk \[id\].astro.

### **Hari 6: Pengujian dan Persiapan Deployment**

* **Tindakan:**  
  1. Jalankan *server* pengembangan lokal: npm run dev.  
  2. Uji situs secara menyeluruh. Verifikasi responsivitas di peramban (menggunakan mode *mobile* dan *desktop*).  
  3. Pastikan semua tautan produk berfungsi dan tombol WhatsApp menghasilkan pesan yang benar.  
  4. Jalankan perintah *build* statis: npm run build.19  
  5. Periksa *output* di *folder* dist/. Ini adalah file-file statis (HTML/CSS/JS) yang akan diunggah ke *server*.

### **Hari 7: Deployment (Pilih Jalur A atau B)**

* **Tindakan:** Pilih salah satu dari dua metode *deployment* yang diuraikan di Bagian 6 (Vercel/Netlify atau Niaga Hoster) dan ikuti langkah-langkah yang disediakan untuk meluncurkan situs secara *online*.

## **Bagian 4: Panduan Implementasi Fitur Inti (dengan Snippet Kode)**

### **1\. Struktur Data Anda: src/data/products.json**

Untuk MVP, menggunakan file JSON statis adalah solusi tercepat dan paling efisien. Ini menghilangkan kebutuhan akan *database* atau CMS, selaras dengan target 1 minggu.

JSON

,  
    "colors":  
  },  
  {  
    "id": "new-mc-002",  
    "name": "Sandal Gunung New MC Adventure",  
    "brand": "New MC",  
    "price": 120000,  
    "description": "Sandal gunung New MC dengan sol kuat dan tali yang kokoh, siap untuk petualangan.",  
    "imageUrls": \[  
      "/images/new-mc-002-1.jpg"  
    \],  
    "colors": \["Merah-Hitam", "Abu-abu"\]  
  }  
\]

### **2\. Snippet 1: Galeri Produk Responsif (React \+ Tailwind)**

*Snippet* ini 18 menunjukkan cara membuat *grid* responsif menggunakan *utility classes* Tailwind CSS di dalam komponen React.

JavaScript

// src/components/ProductGallery.jsx  
import React from 'react';  
import products from '../data/products.json'; // Impor data JSON  
import ProductCard from './ProductCard'; 

function ProductGallery() {  
  return (  
    \<div className="container mx-auto px-4 py-8"\>  
      \<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"\>  
        {products.map((product) \=\> (  
          \<ProductCard key={product.id} product={product} /\>  
        ))}  
      \</div\>  
    \</div\>  
  );  
}  
export default ProductGallery;

// \----------------------------------------  
// src/components/ProductCard.jsx  
// (Buat file ini secara terpisah)  
import React from 'react';

function ProductCard({ product }) {  
  return (  
    // Tautkan card ke halaman detail produk dinamis  
    \<a href={\`/produk/${product.id}\`} className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"\>  
      \<div className="overflow-hidden"\>  
        \<img   
          src={product.imageUrls}   
          alt={product.name}   
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"   
          // Pastikan gambar ada di folder \`public/images/...\`  
        /\>  
      \</div\>  
      \<div className="p-4"\>  
        \<p className="text-gray-600 text-sm"\>{product.brand}\</p\>  
        \<h3 className="font-bold text-md h-12 overflow-hidden"\>{product.name}\</h3\>  
        \<p className="text-red-600 font-semibold mt-2"\>  
          Rp {product.price.toLocaleString('id-ID')}  
        \</p\>  
      \</div\>  
    \</a\>  
  );  
}  
export default ProductCard;

### **3\. Snippet 2: Fungsi Tombol "Pesan via WhatsApp" Dinamis**

Untuk MVP ini, penggunaan API WhatsApp Business yang kompleks dan berbayar 21 tidak diperlukan. Solusinya adalah menggunakan fitur "Click to Chat" gratis dari WhatsApp, yang hanya memerlukan URL *link* yang diformat khusus.24  
Poin teknis yang krusial adalah penggunaan encodeURIComponent. Fungsi ini memastikan bahwa spasi, pemisah baris, dan karakter khusus dalam pesan diubah menjadi format yang aman untuk dikirim melalui URL.26

JavaScript

// src/components/WhatsAppButton.jsx  
import React from 'react';

// Ganti dengan nomor WA bisnis (gunakan 62, bukan 0\)  
const WHATSAPP\_PHONE\_NUMBER \= '6281234567890'; 

function WhatsAppButton({ product }) {  
  // 1\. Tentukan pesan default.   
  // \\n digunakan untuk membuat baris baru di WhatsApp.  
  const message \= \`Halo, saya tertarik dengan grosir sandal:  
\\nNama Produk: ${product.name}  
ID Produk: ${product.id}  
\\nMohon info ketersediaan stok dan harga grosirnya. Terima kasih.\`;

  // 2\. Encode pesan untuk URL  
  const encodedMessage \= encodeURIComponent(message);

  // 3\. Buat link wa.me  
  const whatsappUrl \= \`https://wa.me/${WHATSAPP\_PHONE\_NUMBER}?text=${encodedMessage}\`;

  return (  
    \<a  
      href={whatsappUrl}  
      target="\_blank" // Buka di tab baru  
      rel="noopener noreferrer" // Praktik keamanan standar  
      className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-center text-lg hover:bg-green-600 transition-colors duration-300 w-full"  
    \>  
      Pesan via WhatsApp  
    \</a\>  
  );  
}

export default WhatsAppButton;

## **Bagian 5: Pengembangan dengan Bantuan AI: Bekerja Lebih Cerdas di 2025**

### **Memilih Asisten AI (untuk Pembelajar React)**

* **Rekomendasi Utama: GitHub Copilot (terintegrasi di VS Code).**  
  * **Analisis:** Ini adalah standar industri untuk pelengkapan kode *inline*. Sebagai seseorang yang sedang belajar React, Copilot sangat baik untuk mempercepat pengetikan kode *boilerplate* (seperti membuat komponen atau fungsi) tanpa mengambil alih seluruh proses pemikiran. Ini membantu pembelajaran dengan menyarankan pola umum React.  
* **Alternatif *Power-User*: Cursor.**  
  * **Analisis:** Cursor adalah *fork* dari VS Code yang dirancang sepenuhnya di sekitar AI, berfungsi lebih sebagai "agen" daripada "asisten".30 Cursor dapat memahami seluruh basis kode, merencanakan, dan mengeksekusi perubahan multi-file. 30 menggambarkannya sebagai "true beast" untuk *refactoring* atau *bootstrapping* proyek. Namun, untuk tujuan *pembelajaran*, alat ini mungkin terlalu "ajaib", berpotensi mengabstraksi pemahaman fundamental yang sedang coba dibangun.

**Putusan:** Mulailah dengan **GitHub Copilot** untuk mempercepat proses *coding* sambil tetap memegang kendali. Jika proyek berkembang dalam kompleksitas, **Cursor** dapat dieksplorasi sebagai alat bantu *power-user*.30

### **Seni Prompting: Cara Meminta Kode yang Tepat**

*Prompt* AI yang efektif 31 harus selalu mencakup tiga elemen:

1. **Konteks (Peran & Teknologi):** "Bertindaklah sebagai pengembang React senior yang ahli dalam Tailwind CSS."  
2. **Batasan (Aturan):** "Gunakan hanya *utility class* Tailwind. Jangan menulis CSS kustom dalam tag \<style\>." 31  
3. **Tujuan (Hasil):** "Buat komponen untuk kartu produk."

### **Contoh Prompt untuk Proyek "Grosir Sandal"**

* **Prompt 1 (Struktur Data):**"Buatkan saya struktur data products.json untuk katalog sandal. Setiap produk harus memiliki id (string), name (string), brand (string, dengan opsi 'Mc Polo', 'New MC', 'Baiyo'), price (number), description (string), dan imageUrls (array berisi string URL gambar)."  
* **Prompt 2 (Galeri Produk Responsif):**  
  "Buat komponen React fungsional bernama ProductGallery.jsx.  
  1. Gunakan Tailwind CSS untuk *styling*.  
  2. Komponen ini harus me-render sebuah div sebagai *grid* yang responsif: 2 kolom di HP (default), 3 kolom di layar 'sm', dan 5 kolom di layar 'lg'.  
  3. Gunakan gap-4 untuk spasi antar item *grid*.  
  4. Di dalam *grid*, lakukan iterasi (*map*) pada *placeholder* array produk dan render komponen \<ProductCard /\> untuk setiap produk."  
* **Prompt 3 (Fungsi Tombol WA Dinamis):**  
  "Buat komponen React fungsional bernama WhatsAppButton.jsx.  
  1. Komponen ini harus menerima *prop* productName (string) dan phoneNumber (string).  
  2. Harus me-render tag \<a\> (anchor).  
  3. href dari tag \<a\> harus berupa link '[https://wa.me/](https://wa.me/)' yang dinamis.  
  4. Link ini harus menyertakan phoneNumber.  
  5. Link ini harus menyertakan pesan teks yang sudah diisi: 'Halo, saya tertarik dengan \[productName\]'.  
  6. PENTING: Pastikan pesan teks di-encode dengan benar untuk URL menggunakan encodeURIComponent." 26

## **Bagian 6: Buku Panduan (Playbook) Deployment: Dua Jalan Menuju Produksi**

### **Memahami Konsep Inti: Static Site Generation (SSG)**

Baik Astro maupun *static export* Next.js beroperasi berdasarkan prinsip SSG. SSG berarti bahwa pada saat perintah npm run build dijalankan, *framework* akan menghasilkan file .html statis untuk *setiap* halaman di situs. Hasilnya adalah satu set file HTML, CSS, dan JavaScript yang sudah jadi. Saat di-*deploy*, *server hosting* (seperti Niaga Hoster atau Vercel) tidak perlu menjalankan *database* atau logika *server-side* yang kompleks; ia hanya perlu mengirimkan file-file yang sudah jadi ini. Inilah yang membuat situs SSG sangat cepat, aman, dan dapat di-*cache* secara efisien.

### **Tabel 2: Perbandingan Opsi Hosting (Niaga Hoster cPanel vs. Vercel/Netlify)**

| Fitur | Opsi A: Vercel / Netlify (Direkomendasikan) | Opsi B: Niaga Hoster (cPanel) |
| :---- | :---- | :---- |
| **Biaya (MVP)** | **Gratis.** (Tier gratis sangat memadai) \[33\] | **Sudah Dibayar.** (Menggunakan paket yang ada) |
| **Kecepatan (CDN)** | **Luar Biasa.** (CDN Global gratis, aset di-*cache* di seluruh dunia) \[34\] | **Standar.** (Tergantung server, mungkin hanya di 1 lokasi) |
| **Proses Deploy** | **Otomatis (via Git).** *Push* ke GitHub \= *deploy* otomatis.\[19\] | **Manual.** (Upload file.zip via Manajer File).11 |
| **Kemudahan** | Sangat Mudah (Didesain untuk ini) \[35, 36\] | Agak Rumit (Perlu tahu public\_html, dll.) 11 |
| **Optimasi** | **Otomatis.** (Optimasi gambar, *minification*, dll) \[34, 37\] | **Tidak Ada.** (Anda *deploy* apa yang Anda *build*). |
| **Rekomendasi** | **Jalur Terbaik.** Modern, cepat, gratis, dan *developer experience* (DX) superior.\[34\] | **Jalur "Bisa".** Gunakan jika *harus* memakai *hosting* yang ada. |

### **6.1. Jalur A (Sangat Direkomendasikan): Deployment 10 Menit ke Vercel/Netlify**

*Platform* modern seperti Vercel dan Netlify 34 dirancang khusus untuk alur kerja *framework* JavaScript modern. Netlify, khususnya, adalah mitra *hosting* resmi untuk Astro 39 dan proses *deployment*\-nya mulus.20

* **Langkah demi Langkah (menggunakan Vercel sebagai contoh):**  
  1. Pastikan proyek Astro Anda sudah ada di repositori **GitHub** (atau GitLab/Bitbucket).  
  2. Daftar ke **Vercel** (vercel.com) menggunakan akun GitHub Anda (Gratis).  
  3. Di *dashboard* Vercel, klik "Add New... \> Project".  
  4. Pilih repositori GitHub proyek Astro Anda.  
  5. **Deteksi Otomatis:** Vercel akan otomatis mendeteksi bahwa ini adalah proyek Astro.36  
  6. **Konfigurasi Build:** Vercel akan secara otomatis mengisi pengaturan *build* yang benar 36:  
     * *Build Command:* astro build (atau npm run build)  
     * *Output Directory:* dist  
  7. Klik **"Deploy"**.  
  8. Dalam 1-2 menit, situs akan *online* dengan URL .vercel.app. Domain kustom dapat ditambahkan nanti dari *dashboard* Vercel.

### **6.2. Jalur B (Jalur cPanel): Deployment Statis ke Niaga Hoster**

Ini adalah metode *deployment* "tradisional" dan sangat mungkin dilakukan karena Astro menghasilkan file statis murni.  
**Peringatan Kritis:** Metode ini **tidak** menggunakan fitur "Setup Node.js App" yang mungkin ada di cPanel.41 Fitur tersebut ditujukan untuk aplikasi SSR (*Server-Side Rendered*) yang berjalan terus-menerus, yang jauh lebih rumit, rapuh, dan tidak diperlukan untuk proyek SSG ini.43 Metode di bawah ini adalah untuk *deployment* statis sederhana.

* **Langkah-langkah Deploy Astro ke cPanel:**  
  1. **Lokal:** Di terminal, jalankan perintah *build*: npm run build.11  
  2. **Lokal:** Proses ini akan membuat *folder* baru bernama dist/.19  
  3. **Lokal:** Kompres (zip) **isi** dari *folder* dist/ (bukan *folder* dist/ itu sendiri).  
  4. **cPanel:** Masuk ke *dashboard* Niaga Hoster dan buka **"File Manager"**.12  
  5. **cPanel:** Navigasi ke direktori root domain Anda, yang biasanya adalah public\_html.11 (Disarankan untuk mem-backup dan menghapus file index.html *default* atau file situs lama 12).  
  6. **cPanel:** Klik **"Upload"** dan unggah file .zip yang dibuat pada Langkah 3\.  
  7. **cPanel:** Setelah terunggah, klik kanan file .zip tersebut dan pilih **"Extract"**. Pastikan Anda mengekstraknya langsung ke public\_html.  
  8. Situs sekarang harus *live* di domain utama.  
* **(Catatan Tambahan) Jika Menggunakan Next.js ke cPanel:**  
  1. **Lokal:** Modifikasi next.config.js untuk menambahkan output: 'export',.13  
  2. **Lokal:** Jalankan npm run build.  
  3. **Lokal:** Ini akan menghasilkan *folder* out/ (bukan dist/).14  
  4. **cPanel:** Ikuti langkah 3-8 di atas, tetapi gunakan **isi** dari *folder* out/.

## **Bagian 7: Jalan Setelah MVP: Mengelola Produk dalam Jangka Panjang**

### **Kapan Harus Meninggalkan products.json?**

File products.json adalah solusi MVP yang sempurna. Namun, seiring pertumbuhan bisnis, pendekatan ini akan menunjukkan keterbatasannya.44 Transisi ke solusi yang lebih kuat harus dipertimbangkan ketika "pemicu" berikut terjadi:

1. **Pemicu Skala:** File JSON menjadi terlalu besar (misalnya, 500+ produk) sehingga sulit dikelola atau memperlambat waktu *build*.  
2. **Pemicu Frekuensi:** Harga atau stok produk perlu diperbarui beberapa kali sehari. Menjalankan proses git commit dan *deploy* ulang untuk setiap perubahan kecil menjadi tidak efisien.  
3. **Pemicu Kolaborasi:** Staf non-teknis (seperti admin atau tim penjualan) perlu menambahkan, mengedit, atau menghapus produk tanpa harus menyentuh kode, membuka VS Code, atau memahami Git.45

### **Perkenalan Singkat tentang Headless CMS**

*Headless CMS* (Sistem Manajemen Konten Tanpa Kepala) adalah solusi untuk pemicu di atas. Ini memisahkan "Kepala" (Frontend/Situs Web) dari "Badan" (Backend/Database Konten).44  
Dalam praktiknya, alih-alih situs Astro mengimpor products.json, ia akan melakukan *fetch* data dari API CMS saat *build*.48 Tim admin akan memiliki *dashboard* web yang ramah pengguna untuk mengelola produk, dan setiap perubahan yang mereka "simpan" akan secara otomatis memicu *build* ulang situs (jika menggunakan Vercel/Netlify).

### **Rekomendasi CMS Gratis untuk Masa Depan**

* **Sanity.io:** 48 Pilihan *cloud-hosted* (SaaS) yang populer. Sanity menyediakan *database* konten yang di-*host* dan *tier* gratis yang sangat memadai. UI pengeditannya (Sanity Studio) dapat disesuaikan dan sangat kuat. Ini terintegrasi dengan sangat baik dengan Vercel.  
* **Strapi.io:** 48 Pilihan *open-source* dan *self-hosted* terkemuka. Ini berarti perangkat lunak Strapi di-*install* di *server* sendiri (bahkan berpotensi di Niaga Hoster, meskipun memerlukan konfigurasi Node.js), memberikan kontrol penuh atas data.

### **Peta Jalan Migrasi (untuk 6 Bulan ke Depan)**

1. Luncurkan MVP dengan products.json sekarang. Fokus pada peluncuran cepat.  
2. Setelah bisnis berjalan dan "pemicu" transisi terasa, buat akun gratis di **Sanity**.  
3. Di dalam Sanity Studio, buat "Content Model" (Skema) yang mencerminkan struktur products.json (bidang untuk name, price, brand, imageUrls, dll.).  
4. Migrasikan data dari products.json ke *dashboard* Sanity.  
5. Di dalam kode Astro, ganti logika import products.json dengan fetch() API Sanity (atau gunakan *client* Sanity resmi) untuk mengambil data pada saat *build*.  
6. *Redeploy* situs. Komponen UI React (ProductCard.jsx, WhatsAppButton.jsx) tidak perlu diubah sama sekali, karena mereka hanya menerima *props*—mereka tidak peduli dari mana data berasal. Ini adalah kekuatan dari arsitektur yang terpisah.

#### **Works cited**

1. Why I Built MadeWithAstro.co and My Thoughts on Next.js vs. Astro : r/astrojs \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/astrojs/comments/1ghwy9s/why\_i\_built\_madewithastroco\_and\_my\_thoughts\_on/](https://www.reddit.com/r/astrojs/comments/1ghwy9s/why_i_built_madewithastroco_and_my_thoughts_on/)  
2. Astro vs Next.js in 2025: A Comprehensive Comparison \- Lexington Themes, accessed November 5, 2025, [https://lexingtonthemes.com/blog/astro-vs-nextjs-in-2025-a-comprehensive-comparison](https://lexingtonthemes.com/blog/astro-vs-nextjs-in-2025-a-comprehensive-comparison)  
3. Next.js vs. Astro in 2025: Which Framework Is Best for Your Marketing Website?, accessed November 5, 2025, [https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website)  
4. Astro vs Next.js: Which Is Better for Your Project in 2025? \- Pagepro, accessed November 5, 2025, [https://pagepro.co/blog/astro-nextjs/](https://pagepro.co/blog/astro-nextjs/)  
5. How to deploy an Astro site \- Netlify, accessed November 5, 2025, [https://www.netlify.com/blog/how-to-deploy-astro/](https://www.netlify.com/blog/how-to-deploy-astro/)  
6. Getting Started with Astro with React/Tailwind Integrations \- YouTube, accessed November 5, 2025, [https://www.youtube.com/watch?v=9tYtzOAhTWY](https://www.youtube.com/watch?v=9tYtzOAhTWY)  
7. When should you choose Next.js vs React \+ Vite for building web applications? \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/nextjs/comments/1neuh1s/when\_should\_you\_choose\_nextjs\_vs\_react\_vite\_for/](https://www.reddit.com/r/nextjs/comments/1neuh1s/when_should_you_choose_nextjs_vs_react_vite_for/)  
8. How do you guys decide between using next.js or react.js project ? : r/reactjs \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/reactjs/comments/1eciqa3/how\_do\_you\_guys\_decide\_between\_using\_nextjs\_or/](https://www.reddit.com/r/reactjs/comments/1eciqa3/how_do_you_guys_decide_between_using_nextjs_or/)  
9. Deploying with Cpanel : r/astrojs \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/astrojs/comments/1bcryqy/deploying\_with\_cpanel/](https://www.reddit.com/r/astrojs/comments/1bcryqy/deploying_with_cpanel/)  
10. Deploy to cPanel? : r/astrojs \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/astrojs/comments/19ed9jr/deploy\_to\_cpanel/](https://www.reddit.com/r/astrojs/comments/19ed9jr/deploy_to_cpanel/)  
11. cPanel DEPLOY Static Export with Next.js (public\_html) \- YouTube, accessed November 5, 2025, [https://www.youtube.com/watch?v=04OwRBUgTpo](https://www.youtube.com/watch?v=04OwRBUgTpo)  
12. Guides: Static Exports | Next.js, accessed November 5, 2025, [https://nextjs.org/docs/pages/guides/static-exports](https://nextjs.org/docs/pages/guides/static-exports)  
13. What is Astro? A Step-by-Step Tutorial for Beginners in 2025 \- Themefisher, accessed November 5, 2025, [https://themefisher.com/astro-js-introduction](https://themefisher.com/astro-js-introduction)  
14. Tailwind Astro Tutorial: Quick Setup Guide | Tailkits, accessed November 5, 2025, [https://tailkits.com/blog/tailwind-astro-tutorial/](https://tailkits.com/blog/tailwind-astro-tutorial/)  
15. Install Tailwind CSS with Astro \- Tailwind CSS, accessed November 5, 2025, [https://tailwindcss.com/docs/installation/framework-guides/astro](https://tailwindcss.com/docs/installation/framework-guides/astro)  
16. Building a Responsive Grid Gallery with Tailwind and React | Hoverify, accessed November 5, 2025, [https://tryhoverify.com/blog/building-a-responsive-grid-gallery-with-tailwind-and-react/](https://tryhoverify.com/blog/building-a-responsive-grid-gallery-with-tailwind-and-react/)  
17. Deploy your Astro Site | Docs, accessed November 5, 2025, [https://docs.astro.build/en/guides/deploy/](https://docs.astro.build/en/guides/deploy/)  
18. Deploy your Astro Site to Netlify | Docs, accessed November 5, 2025, [https://docs.astro.build/en/guides/deploy/netlify/](https://docs.astro.build/en/guides/deploy/netlify/)  
19. trigger a whatsapp message when new order \- Stack Overflow, accessed November 5, 2025, [https://stackoverflow.com/questions/67311482/trigger-a-whatsapp-message-when-new-order](https://stackoverflow.com/questions/67311482/trigger-a-whatsapp-message-when-new-order)  
20. Messaging \- WhatsApp Cloud API \- Meta for Developers, accessed November 5, 2025, [https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages/](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages/)  
21. Send Interactive Messages on the WhatsApp Business Platform \- Meta for Developers, accessed November 5, 2025, [https://developers.facebook.com/blog/post/2022/11/21/sending-interactive-messages/](https://developers.facebook.com/blog/post/2022/11/21/sending-interactive-messages/)  
22. How to create a dynamic WhatsApp link with product name ..., accessed November 5, 2025, [https://community.shopify.com/t/how-to-create-a-dynamic-whatsapp-link-with-product-name/176290](https://community.shopify.com/t/how-to-create-a-dynamic-whatsapp-link-with-product-name/176290)  
23. Build a React App with WhatsApp, Phone Call, SMS, and Email Support \- YouTube, accessed November 5, 2025, [https://www.youtube.com/watch?v=0brvlzjMtgI](https://www.youtube.com/watch?v=0brvlzjMtgI)  
24. Web to mobile whatsapp message \- Stack Overflow, accessed November 5, 2025, [https://stackoverflow.com/questions/79107832/web-to-mobile-whatsapp-message](https://stackoverflow.com/questions/79107832/web-to-mobile-whatsapp-message)  
25. How to Send WhatsApp Messages From Your React App Easily \- In Plain English, accessed November 5, 2025, [https://plainenglish.io/blog/send-whatsapp-web-messages-in-react-easily-3bf2a82a2eb2](https://plainenglish.io/blog/send-whatsapp-web-messages-in-react-easily-3bf2a82a2eb2)  
26. Opening WhatsApp in React Native for iOS and Android | by Vishamber Lal \- Medium, accessed November 5, 2025, [https://medium.com/@vishamberlal/opening-whatsapp-in-react-native-for-ios-and-android-3504aae4ca26](https://medium.com/@vishamberlal/opening-whatsapp-in-react-native-for-ios-and-android-3504aae4ca26)  
27. Is there a way to open apps like whatsapp from react web app? \- Stack Overflow, accessed November 5, 2025, [https://stackoverflow.com/questions/78595761/is-there-a-way-to-open-apps-like-whatsapp-from-react-web-app](https://stackoverflow.com/questions/78595761/is-there-a-way-to-open-apps-like-whatsapp-from-react-web-app)  
28. Best AI Coding Agents Summer 2025 | by Martin ter Haak | Sep ..., accessed November 5, 2025, [https://medium.com/@martinterhaak/best-ai-coding-agents-summer-2025-c4d20cd0c846](https://medium.com/@martinterhaak/best-ai-coding-agents-summer-2025-c4d20cd0c846)  
29. AI Prompt to Create a Tailwind CSS Product Card \- Quackit Tutorials, accessed November 5, 2025, [https://www.quackit.com/ai/prompts/tailwind\_css\_product\_card\_ai\_prompt.cfm](https://www.quackit.com/ai/prompts/tailwind_css_product_card_ai_prompt.cfm)  
30. Optimized Web Design Prompt Structure for React & Tailwind \- AnotherWrapper, accessed November 5, 2025, [https://anotherwrapper.com/tools/prompt-generator/general-optimized-web-design-prompt-structure-for-react-tailwind](https://anotherwrapper.com/tools/prompt-generator/general-optimized-web-design-prompt-structure-for-react-tailwind)  
31. Next.js Hosting Options Compared: Vercel, Netlify, Cloudflare, AWS, GCP, Azure (2025), accessed November 5, 2025, [https://www.nandann.com/blog/nextjs-hosting-options-comparison](https://www.nandann.com/blog/nextjs-hosting-options-comparison)  
32. Vercel vs Netlify: Choosing the right one in 2025 (and what comes next) | Blog \- Northflank, accessed November 5, 2025, [https://northflank.com/blog/vercel-vs-netlify-choosing-the-deployment-platform-in-2025](https://northflank.com/blog/vercel-vs-netlify-choosing-the-deployment-platform-in-2025)  
33. Astro on Vercel, accessed November 5, 2025, [https://vercel.com/docs/frameworks/astro](https://vercel.com/docs/frameworks/astro)  
34. Astro on Netlify, accessed November 5, 2025, [https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/](https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/)  
35. 9+ Best Next.js Hosting Providers for 2025, accessed November 5, 2025, [https://nextjstemplates.com/blog/best-nextjs-hosting](https://nextjstemplates.com/blog/best-nextjs-hosting)  
36. Netlify vs Vercel vs CLoudflare : r/astrojs \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/astrojs/comments/1eazpt0/netlify\_vs\_vercel\_vs\_cloudflare/](https://www.reddit.com/r/astrojs/comments/1eazpt0/netlify_vs_vercel_vs_cloudflare/)  
37. Deploy your Astro Site to Vercel | Docs, accessed November 5, 2025, [https://docs.astro.build/en/guides/deploy/vercel/](https://docs.astro.build/en/guides/deploy/vercel/)  
38. How to Host Next JS Project on cPanel for Beginners \- YouTube, accessed November 5, 2025, [https://www.youtube.com/watch?v=w5NYOvBzGLI](https://www.youtube.com/watch?v=w5NYOvBzGLI)  
39. Deploying to cPanel : r/nextjs \- Reddit, accessed November 5, 2025, [https://www.reddit.com/r/nextjs/comments/1hw8apk/deploying\_to\_cpanel/](https://www.reddit.com/r/nextjs/comments/1hw8apk/deploying_to_cpanel/)  
40. how to deploy nextJs app in cpanel · vercel next.js · Discussion \#12234 \- GitHub, accessed November 5, 2025, [https://github.com/vercel/next.js/discussions/12234](https://github.com/vercel/next.js/discussions/12234)  
41. Guide to choosing the best React CMS \- Hygraph, accessed November 5, 2025, [https://hygraph.com/blog/react-cms](https://hygraph.com/blog/react-cms)  
42. Finding the Best React CMS: A Comprehensive Guide \- Builder.io, accessed November 5, 2025, [https://www.builder.io/m/knowledge-center/best-react-cms](https://www.builder.io/m/knowledge-center/best-react-cms)  
43. Best Headless CMS to Choose: Directus | Strapi | Payload | Sanity \- Kernelics, accessed November 5, 2025, [https://kernelics.com/blog/headless-cms-comparison-guide](https://kernelics.com/blog/headless-cms-comparison-guide)  
44. Choosing the best React CMS \- Contentful, accessed November 5, 2025, [https://www.contentful.com/react-cms/](https://www.contentful.com/react-cms/)  
45. React CMS Options: Which One Is Best for Modern Frontends?, accessed November 5, 2025, [https://agilitycms.com/blog/react-cms-options-which-one-is-best-for-modern-frontends](https://agilitycms.com/blog/react-cms-options-which-one-is-best-for-modern-frontends)  
46. Can someone explain the difference between a headless CMS and a traditional Rest API?, accessed November 5, 2025, [https://www.reddit.com/r/webdev/comments/1gcpo70/can\_someone\_explain\_the\_difference\_between\_a/](https://www.reddit.com/r/webdev/comments/1gcpo70/can_someone_explain_the_difference_between_a/)  
47. 10 Best CMS Platforms to Build With in 2025 (Compared) \- Strapi, accessed November 5, 2025, [https://strapi.io/blog/best-cms-2025](https://strapi.io/blog/best-cms-2025)  
48. Strapi vs Sanity: Which Headless CMS is Right for Your Project? \- Green-Apex, accessed November 5, 2025, [https://www.green-apex.com/strapi-vs-sanity](https://www.green-apex.com/strapi-vs-sanity)