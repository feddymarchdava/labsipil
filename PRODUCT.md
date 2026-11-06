# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primer (Akademik):** Mahasiswa Teknik Sipil dan Asisten Laboratorium yang melakukan praktikum pengujian material (Bahan Bangunan, Mekanika Tanah, Mekanika Fluida, dan Bahan Perkerasan) untuk mengolah data mentah laboratorium, memverifikasi kriteria kelayakan material, serta menyusun laporan praktikum resmi.
- **Sekunder (Praktisi Lapangan):** Insinyur sipil, teknisi laboratorium uji bahan, dan konsultan geoteknik/perkerasan yang membutuhkan kalkulasi cepat, verifikasi toleransi mutu (quality control/QC), dan analisis parameter campuran di lapangan.

## Product Purpose

LabSipil hadir sebagai media pembelajaran interaktif sekaligus laboratorium digital terpadu untuk pengolahan data pengujian teknik sipil. Tujuannya adalah mengeliminasi kesalahan hitung manual, memberikan transparansi rumus langkah demi langkah (step-by-step mathematical reasoning), dan memverifikasi kepatuhan terhadap standar teknis nasional dan internasional secara otomatis.

## Positioning

Berbeda dengan kalkulator teknik generik yang bekerja seperti "kotak hitam" (black box) tanpa penjelasan, LabSipil menyajikan setiap tahapan perhitungan secara terperinci dengan substitusi angka nyata, mendukung multi-sampel dinamis dengan rekapitulasi rata-rata instan, serta mengintegrasikan visualisasi grafik geoteknik dan perkerasan yang presisi sesuai standar SNI, ASTM, dan Spesifikasi Umum Bina Marga 2018.

## Operating Context

- **Lingkungan Penggunaan:** Laboratorium uji basah dan kering teknik sipil, studio komputer kampus, dan evaluasi hasil pengujian di kantor konsultan/lapangan proyek.
- **Alur Kerja Utama:** Input pembacaan alat laboratorium (massa, dimensi, manometer, dial gauge, suhu) -> Kalkulasi multi-sampel otomatis -> Penelusuran rincian 16 langkah rumus / tahapan matematis -> Verifikasi status kelayakan spesifikasi -> Visualisasi kurva teknis -> Ekspor dan penyusunan laporan praktikum.
- **Dokumen & Standar Acuan:** Laporan Resmi Praktikum Laboratorium Teknik Sipil (Universitas Tidar), Standar Nasional Indonesia (SNI BSN), ASTM International, dan Spesifikasi Umum Bina Marga 2018 (Divisi 6 Campuran Beraspal).

## Capabilities and Constraints

- **Cakupan Modul Uji (40+ Modul):**
  - *Praktikum Bahan Bangunan:* Agregat Halus (SNI 1970:2016), Agregat Kasar (SNI 1969:2016), Analisis Ayakan Gradasi (SNI ASTM C136:2012), Kadar Lumpur, Bobot Isi, Kuat Tekan Beton Silinder/Kubus (SNI 1974:2011), Uji Lentur Kayu, dan Uji Tarik Baja Tulangan (SNI 2052:2017).
  - *Praktikum Mekanika Tanah:* Penyelidikan Lapangan Sondir CPT (SNI 2827:2008 / ASTM D3441), Sifat Fisik Tanah (Kadar Air SNI 1965:2008, Berat Jenis Gs SNI 1964:2008, Batas Cair Casagrande SNI 1967:2008, Batas Plastis PL/PI SNI 1966:2008), Pemadatan Proctor Standar/Modifikasi (SNI 1742:2008), Kuat Geser Langsung Direct Shear (SNI 3420:2016), dan Uji Konsolidasi (SNI 2812:2011).
  - *Praktikum Mekanika Fluida:* Sifat Fisik Fluida (Densitas Piknometer, Viskositas Bola Jatuh, Archimedes, Specific Gravity) dan Pengujian Bilangan Osborne Reynolds Aliran Pipa (SNI 7509:2011).
  - *Praktikum Bahan Perkerasan:* Keausan Agregat Los Angeles (SNI 2417:2008), Penetrasi Aspal (SNI 2456:2011), Titik Lembek Ring and Ball (SNI 2434:2011), Berat Jenis Aspal (SNI 2441:2011), Titik Nyala Cleveland (SNI 2433:2011), Daktilitas Aspal (SNI 2432:2011), Viskositas Saybolt Furol (SNI 7729:2011), Job Mix Formula / JMF (Bina Marga 2018), Karakteristik Marshall 16-Langkah (SNI 06-2489-1991), dan Ekstraksi Aspal Sentrifus Variabel W1-W5 (SNI 03-6894-2002).
- **Fitur Utama:**
  - Multi-sampel dinamis (tambah & kurangi benda uji/titik bacaan dengan perhitungan rata-rata instan).
  - Transparansi rumus bertahap dengan notasi matematis dan substitusi numerik lengkap.
  - Grafik teknis interaktif berbasis Recharts (Step Chart untuk Sondir CPT, Kurva Logaritmik Gradasi Agregat, Kurva Alir Casagrande, Kurva Kompaksi OMC/MDD, Kurva Viskositas-Suhu, dan 8 Kurva Marshall).
  - Indikator kelayakan instan dengan diagnosis spesifikasi teknis (Memenuhi / Evaluasi / Tidak Memenuhi).

## Brand Commitments

- **Nama Produk:** LabSipil (Laboratorium Teknik Sipil Digital).
- **Nada & Suara (Voice & Tone):** Ilmiah, presisi, mendidik, terstruktur, andal, dan profesional.
- **Bahasa:** Bahasa Indonesia baku teknik sipil dengan istilah teknis standar (e.g., benda uji, SSD, kadar air optimum, berat jenis bulk, stabilitas Marshall, dmm, cSt).

## Evidence on Hand

- Dataset laporan praktikum nyata dan formula baku Universitas Tidar untuk modul Bahan Perkerasan, Bahan Bangunan, Mekanika Tanah, dan Mekanika Fluida.
- Registry kalkulasi lengkap 40+ modul pada [src/testCalculatorsData.js](file:///k:/Materi%20Mata%20Kuliah/Semester%205/Aplikasi%20Komputer/LabSipil/src/testCalculatorsData.js).
- Komponen antarmuka interaktif kalkulator pada [src/TestCalculatorPanel.jsx](file:///k:/Materi%20Mata%20Kuliah/Semester%205/Aplikasi%20Komputer/LabSipil/src/TestCalculatorPanel.jsx).
- Landing page katalog modul dan acuan regulasi pada [src/App.jsx](file:///k:/Materi%20Mata%20Kuliah/Semester%205/Aplikasi%20Komputer/LabSipil/src/App.jsx).

## Product Principles

1. **Transparansi Perhitungan Mutlak:** Setiap pengujian wajib menjabarkan langkah rumus matematika secara berurutan dan terperinci beserta substitusi angka input ke dalam formula, bukan sekadar menampilkan angka hasil akhir.
2. **Kepatuhan Terikat Standar Resmi:** Batas toleransi, kriteria kelayakan, formula konversi, dan amplop spesifikasi material terikat ketat pada regulasi BSN (SNI), ASTM International, dan Spesifikasi Umum Bina Marga 2018.
3. **Fleksibilitas Multi-Sampel Realistis:** Data pengujian di laboratorium lapangan selalu melibatkan replikasi benda uji; antarmuka wajib memfasilitasi penambahan/pengurangan baris sampel secara dinamis dengan rekapitulasi rata-rata otomatis.
4. **Visualisasi Representasi Teknik Presisi:** Grafik geoteknik, kurva gradasi, dan mekanika bahan disajikan sesuai standar grafis teknik sipil (seperti kurva langkah pada CPT Sondir dan fitting kurva Marshall), bukan grafik bisnis generik.
