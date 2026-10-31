import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { FileSpreadsheet, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'
import { sidebarGroups, calculatorRegistry, formatScientificInText } from './testCalculatorsData'
import TestCalculatorPanel from './TestCalculatorPanel'

// =========================================================================
// DATA MODUL PRAKTIKUM: DUAL-LEVEL FILTER SYSTEM
// Level 1: Praktikum Bahan Bangunan (19 Uji), Praktikum Mekanika Tanah (12 Uji), & Praktikum Mekanika Fluida (5 Uji)
// =========================================================================
const labTabsData = {
  bahan: [
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'bab1', label: 'Bab 1: Agregat Halus' },
    { id: 'bab2', label: 'Bab 2: Agregat Kasar' },
    { id: 'bab3', label: 'Bab 3: Beton' },
    { id: 'bab4', label: 'Bab 4: Kayu' },
    { id: 'bab5', label: 'Bab 5: Baja' },
  ],
  tanah: [
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'bab1', label: 'Bab 1: Penyelidikan Lapangan' },
    { id: 'bab2', label: 'Bab 2: Sifat Fisik' },
    { id: 'bab3', label: 'Bab 3: Pemadatan' },
    { id: 'bab4', label: 'Bab 4: Analisis Butiran' },
    { id: 'bab5', label: 'Bab 5: Sifat Mekanik' },
    { id: 'bab6', label: 'Bab 6: Permeabilitas' },
  ],
  fluida: [
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'bab1', label: 'Bab 1: Sifat Fluida' },
    { id: 'bab2', label: 'Bab 2: Osborne Reynolds' },
    { id: 'bab3', label: 'Bab 3: Flow Measurement' },
    { id: 'bab4', label: 'Bab 4: Ambang Tajam' },
    { id: 'bab5', label: 'Bab 5: Kalibrasi Flowmeter' },
  ],
  perkerasan: [
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'bab1', label: 'Bab 1: Keausan LA' },
    { id: 'bab2', label: 'Bab 2: Penetrasi Aspal' },
    { id: 'bab3', label: 'Bab 3: Titik Lembek & PI' },
    { id: 'bab4', label: 'Bab 4: Berat Jenis Aspal' },
    { id: 'bab5', label: 'Bab 5: Titik Nyala & Bakar' },
    { id: 'bab6', label: 'Bab 6: Daktilitas' },
    { id: 'bab7', label: 'Bab 7: Saybolt Furol' },
    { id: 'bab8', label: 'Bab 8: JMF' },
    { id: 'bab9', label: 'Bab 9: Marshall Test' },
    { id: 'bab10', label: 'Bab 10: Ekstraksi' },
  ],
}

const labModulesData = {
  bahan: {
  ringkasan: [
    {
      id: 'sum-1',
      code: 'Bab 1',
      title: 'Pengujian Agregat Halus',
      badge: 'SNI 1970:2008 • SNI 1971:2011 • SNI 03-1968-1990',
      desc: 'Mencakup 5 modul uji pasir: Berat Jenis & Penyerapan Air, Kadar Air, Kandungan Lumpur & Zat Organik, Bobot Isi & Rongga Udara, serta Analisis Gradasi.',
      icon: 'sand',
    },
    {
      id: 'sum-2',
      code: 'Bab 2',
      title: 'Pengujian Agregat Kasar',
      badge: 'SNI 1969:2008 • SNI 03-1968-1990 • SNI 2417:2008',
      desc: 'Mencakup 6 modul uji batu pecah/kerikil: Berat Jenis & Penyerapan Air, Kadar Air, Kandungan Lumpur, Bobot Isi & Rongga Udara, Analisis Gradasi, serta Keausan Los Angeles.',
      icon: 'rock',
    },
    {
      id: 'sum-4',
      code: 'Bab 3',
      title: 'Pengujian Beton Segar & Keras',
      badge: 'SNI 1972:2008 • SNI 1974:2011 • SNI 4154:2014',
      desc: 'Evaluasi nilai Slump beton segar, kalkulasi Kuat Tekan silinder/kubus beton, serta pengujian Kuat Lentur balok beton.',
      icon: 'concrete-press',
    },
    {
      id: 'sum-5',
      code: 'Bab 4',
      title: 'Sifat Fisik & Mekanis Kayu',
      badge: 'ASTM D2395-17 • SNI 7973:2013',
      desc: 'Analisis terpadu material kayu mencakup perhitungan Kadar Air, Kerapatan (Density), Berat Jenis, serta pengujian Kuat Lentur (MOE & MOR).',
      icon: 'wood',
    },
    {
      id: 'sum-6',
      code: 'Bab 5',
      title: 'Pengujian Kuat Tarik Baja',
      badge: 'SNI 8369:2017',
      desc: 'Evaluasi sifat mekanis baja tulangan meliputi batas ulur/leleh (yield strength), tegangan tarik maksimum (ultimate), dan persentase regangan.',
      icon: 'steel',
    },
  ],
  bab1: [
    {
      id: 'b1-1',
      code: 'UJI 1.1',
      title: 'Berat Jenis dan Penyerapan Air Agregat Halus',
      badge: 'SNI 1970:2008',
      desc: 'Penentuan nilai berat jenis Bulk, SSD, Apparent, serta persentase absorpsi air pada pasir menggunakan piknometer.',
      icon: 'water',
    },
    {
      id: 'b1-2',
      code: 'UJI 1.2',
      title: 'Kadar Air Agregat Halus',
      badge: 'SNI 1971:2011',
      desc: 'Perhitungan persentase kandungan air dalam agregat halus melalui metode pengeringan oven.',
      icon: 'oven',
    },
    {
      id: 'b1-3',
      code: 'UJI 1.3',
      title: 'Kandungan Lumpur dan Zat Organik Agregat Halus',
      badge: 'SNI 03-4142-1996 • SNI 2816:2014',
      desc: 'Pengujian persentase butiran lolos saringan No. 200 dan deteksi kontaminasi bahan organik menggunakan larutan NaOH.',
      icon: 'beaker',
    },
    {
      id: 'b1-4',
      code: 'UJI 1.4',
      title: 'Bobot Isi dan Rongga Udara Agregat Halus',
      badge: 'SNI 03-4804-1998',
      desc: 'Kalkulasi berat satuan agregat halus dalam kondisi gembur maupun padat beserta persentase rongga udara.',
      icon: 'box',
    },
    {
      id: 'b1-5',
      code: 'UJI 1.5',
      title: 'Gradasi Agregat Halus',
      badge: 'SNI 03-1968-1990',
      desc: 'Analisis distribusi ukuran butiran pasir dengan susunan ayakan standar untuk menentukan nilai Modulus Kehalusan (FM) dan kurva gradasi.',
      icon: 'sieve',
    },
  ],
  bab2: [
    {
      id: 'b2-1',
      code: 'UJI 2.1',
      title: 'Berat Jenis dan Penyerapan Air Agregat Kasar',
      badge: 'SNI 1969:2008',
      desc: 'Kalkulasi berat jenis Bulk, SSD, Apparent, dan penyerapan air pada batu pecah menggunakan timbangan hidrostatis.',
      icon: 'water',
    },
    {
      id: 'b2-2',
      code: 'UJI 2.2',
      title: 'Kadar Air Agregat Kasar',
      badge: 'SNI 1971:2011',
      desc: 'Evaluasi kandungan air aktual pada agregat kasar dari perbandingan massa sampel basah dan kering oven.',
      icon: 'oven',
    },
    {
      id: 'b2-3',
      code: 'UJI 2.3',
      title: 'Kandungan Lumpur Agregat Kasar',
      badge: 'SNI 03-4142-1996',
      desc: 'Penentuan persentase material halus lolos saringan No. 200 pada permukaan agregat kasar.',
      icon: 'beaker',
    },
    {
      id: 'b2-4',
      code: 'UJI 2.4',
      title: 'Bobot Isi dan Rongga Udara Agregat Kasar',
      badge: 'SNI 03-4804-1998',
      desc: 'Perhitungan berat volume agregat kasar kondisi lepas dan padat beserta kadar rongga udara.',
      icon: 'box',
    },
    {
      id: 'b2-5',
      code: 'UJI 2.5',
      title: 'Gradasi Agregat Kasar',
      badge: 'SNI 03-1968-1990',
      desc: 'Pemetaan kurva semi-logaritmik distribusi ukuran butir batu pecah dan nilai Modulus Kehalusan.',
      icon: 'sieve',
    },
    {
      id: 'b2-6',
      code: 'UJI 2.6',
      title: 'Keausan Agregat Kasar',
      badge: 'SNI 2417:2008',
      desc: 'Pengujian ketahanan agregat kasar terhadap degradasi mekanis menggunakan mesin abrasi Los Angeles.',
      icon: 'los-angeles',
    },
  ],
  bab3: [
    {
      id: 'b3-1',
      code: 'UJI 3.1',
      title: 'Slump Beton',
      badge: 'SNI 1972:2008',
      desc: 'Pengukuran tingkat kelecakan (workability) dan konsistensi adukan beton segar menggunakan kerucut Abrams.',
      icon: 'slump',
    },
    {
      id: 'b3-2',
      code: 'UJI 3.2',
      title: 'Kuat Tekan Beton',
      badge: 'SNI 1974:2011',
      desc: 'Kalkulasi tegangan tekan maksimum benda uji silinder/kubus beton dan evaluasi mutu beton.',
      icon: 'concrete-press',
    },
    {
      id: 'b3-3',
      code: 'UJI 3.3',
      title: 'Kuat Lentur Beton',
      badge: 'SNI 4154:2014',
      desc: 'Penentuan nilai modulus keruntuhan (modulus of rupture) pada balok beton dengan beban titik pertigaan bentang.',
      icon: 'concrete-flex',
    },
  ],
  bab4: [
    {
      id: 'b4-1',
      code: 'UJI 4.1',
      title: 'Kadar Air Kayu',
      badge: 'ASTM D2395-17',
      desc: 'Perhitungan persentase kandungan air pada spesimen kayu dari selisih massa awal dan massa kering oven.',
      icon: 'oven',
    },
    {
      id: 'b4-2',
      code: 'UJI 4.2',
      title: 'Kerapatan Kayu',
      badge: 'ASTM D2395-17',
      desc: 'Penentuan rasio massa terhadap volume benda uji kayu pada kondisi pengujian maupun kering oven.',
      icon: 'wood',
    },
    {
      id: 'b4-3',
      code: 'UJI 4.3',
      title: 'Berat Jenis Kayu',
      badge: 'ASTM D2395-17',
      desc: 'Kalkulasi nilai specific gravity kayu berdasarkan perbandingan kerapatan kering oven terhadap kerapatan air.',
      icon: 'water',
    },
    {
      id: 'b4-4',
      code: 'UJI 4.4',
      title: 'Kuat Lentur Kayu',
      badge: 'SNI 7973:2013',
      desc: 'Analisis ketahanan lentur balok kayu untuk mendapatkan nilai Modulus of Elasticity (MOE) dan Modulus of Rupture (MOR).',
      icon: 'concrete-flex',
    },
  ],
  bab5: [
    {
      id: 'b5-1',
      code: 'UJI 5.1',
      title: 'Kuat Tarik Baja',
      badge: 'SNI 8369:2017',
      desc: 'Evaluasi sifat mekanis baja tulangan meliputi tegangan leleh (yield), kuat tarik maksimum (ultimate), dan regangan.',
      icon: 'steel',
    },
  ],
  },
  tanah: {
    ringkasan: [
      {
        id: 't-sum-1',
        code: 'Bab 1',
        title: 'Penyelidikan Tanah di Lapangan',
        badge: 'SNI 2827:2008 • SNI 8460:2017',
        desc: 'Evaluasi daya dukung tanah lapangan melalui uji penetrasi konus (Sondir/CPT) serta pencatatan stratigrafi pengeboran teknik (Boring).',
        icon: 'sondir',
      },
      {
        id: 't-sum-2',
        code: 'Bab 2',
        title: 'Sifat Fisik & Konsistensi Tanah',
        badge: 'SNI 1964 • 1965 • 1966 • 1967:2008',
        desc: 'Penentuan parameter dasar tanah meliputi Kadar Air, Berat Jenis (Gs), serta Batas-Batas Atterberg (Batas Cair, Batas Plastis, dan Indeks Plastisitas).',
        icon: 'casagrande',
      },
      {
        id: 't-sum-3',
        code: 'Bab 3',
        title: 'Pemadatan Tanah Lab & Lapangan',
        badge: 'SNI 1742:2008 • SNI 2828:2011',
        desc: 'Analisis kurva pemadatan Standard Proctor untuk mencari OMC & MDD di laboratorium, serta verifikasi derajat kepadatan lapangan dengan metode Sand Cone.',
        icon: 'proctor',
      },
      {
        id: 't-sum-4',
        code: 'Bab 4',
        title: 'Analisis Ukuran Butiran Tanah',
        badge: 'SNI 3423:2008',
        desc: 'Pemetaan kurva distribusi ukuran partikel tanah melalui analisis saringan standar untuk penentuan klasifikasi tanah sistem USCS dan AASHTO.',
        icon: 'sieve',
      },
      {
        id: 't-sum-5',
        code: 'Bab 5',
        title: 'Kuat Geser & Konsolidasi Tanah',
        badge: 'SNI 3420:2016 • SNI 2812:2011',
        desc: 'Pengujian mekanik laboratorium meliputi Direct Shear Test untuk mencari nilai kohesi (c) & sudut geser dalam (ϕ), serta uji Oedometer untuk analisis penurunan konsolidasi.',
        icon: 'direct-shear',
      },
      {
        id: 't-sum-6',
        code: 'Bab 6',
        title: 'Uji Permeabilitas Tanah',
        badge: 'SNI 2435:2008',
        desc: 'Perhitungan koefisien kelulusan air (k) melalui pori-pori tanah menggunakan metode Constant Head dan Falling Head.',
        icon: 'permeability',
      },
    ],
    bab1: [
      {
        id: 't-b1-1',
        code: 'UJI 1.1',
        title: 'Uji Sondir (Cone Penetration Test)',
        badge: 'SNI 2827:2008',
        desc: 'Penentuan nilai perlawanan ujung konus (qc) dan jumlah hambatan lekat (JHL) untuk analisis profil daya dukung pondasi per kedalaman.',
        icon: 'sondir',
      },
      {
        id: 't-b1-2',
        code: 'UJI 1.2',
        title: 'Pengeboran Tanah (Boring)',
        badge: 'SNI 8460:2017',
        desc: 'Pengambilan contoh tanah terganggu (disturbed) dan tidak terganggu (undisturbed) beserta penyusunan profil borlog geoteknik.',
        icon: 'boring',
      },
    ],
    bab2: [
      {
        id: 't-b2-1',
        code: 'UJI 2.1',
        title: 'Kadar Air Tanah',
        badge: 'SNI 1965:2008',
        desc: 'Perhitungan persentase perbandingan massa air pori terhadap massa butir tanah kering oven.',
        icon: 'oven',
      },
      {
        id: 't-b2-2',
        code: 'UJI 2.2',
        title: 'Berat Jenis Tanah',
        badge: 'SNI 1964:2008',
        desc: 'Kalkulasi nilai Specific Gravity (Gs) partikel padat tanah menggunakan metode labu ukur/piknometer dengan koreksi suhu air.',
        icon: 'water',
      },
      {
        id: 't-b2-3',
        code: 'UJI 2.3',
        title: 'Batas Cair (Liquid Limit)',
        badge: 'SNI 1967:2008',
        desc: 'Penentuan kadar air tanah pada jumlah ketukan ke-25 menggunakan cawan Casagrande melalui plot garis alir (flow curve).',
        icon: 'casagrande',
      },
      {
        id: 't-b2-4',
        code: 'UJI 2.4',
        title: 'Batas Plastis & Indeks Plastisitas',
        badge: 'SNI 1966:2008',
        desc: 'Evaluasi kadar air kondisi plastis (PL) gulungan tanah 3 mm serta perhitungan Indeks Plastisitas (PI) untuk diagram plastisitas Casagrande.',
        icon: 'plastic-limit',
      },
    ],
    bab3: [
      {
        id: 't-b3-1',
        code: 'UJI 3.1',
        title: 'Pemadatan Tanah Lab (Standard Proctor)',
        badge: 'SNI 1742:2008',
        desc: 'Pemetaan kurva pemadatan dan garis Zero Air Void (ZAV) untuk mendapatkan Kadar Air Optimum (OMC) dan berat isi kering maksimum.',
        icon: 'proctor',
      },
      {
        id: 't-b3-2',
        code: 'UJI 3.2',
        title: 'Pemadatan Tanah Lapangan (Sand Cone)',
        badge: 'SNI 2828:2011',
        desc: 'Penentuan berat volume kering tanah di lapangan menggunakan pasir Ottawa dan konus pasir guna menghitung persentase derajat kepadatan.',
        icon: 'sand-cone',
      },
    ],
    bab4: [
      {
        id: 't-b4-1',
        code: 'UJI 4.1',
        title: 'Analisis Saringan (Sieve Analysis)',
        badge: 'SNI 3423:2008',
        desc: 'Kalkulasi persentase tertahan dan lolos susunan ayakan standar disertai perhitungan koefisien keseragaman (Cu) dan kelengkungan (Cc).',
        icon: 'sieve',
      },
    ],
    bab5: [
      {
        id: 't-b5-1',
        code: 'UJI 5.1',
        title: 'Uji Geser Langsung (Direct Shear Test)',
        badge: 'SNI 3420:2016',
        desc: 'Penentuan garis keruntuhan Mohr-Coulomb untuk menghasilkan parameter kohesi tanah (c) dan sudut geser dalam (ϕ).',
        icon: 'direct-shear',
      },
      {
        id: 't-b5-2',
        code: 'UJI 5.2',
        title: 'Uji Konsolidasi (Oedometer)',
        badge: 'SNI 2812:2011',
        desc: 'Kalkulasi parameter pemampatan tanah lempung jenuh meliputi indeks kompresi (Cc), tegangan prakonsolidasi, dan koefisien konsolidasi (Cv).',
        icon: 'oedometer',
      },
    ],
    bab6: [
      {
        id: 't-b6-1',
        code: 'UJI 6.1',
        title: 'Uji Permeabilitas (Constant & Falling Head)',
        badge: 'SNI 2435:2008',
        desc: 'Penentuan laju aliran dan koefisien permeabilitas tanah (k) pada tekanan air konstan maupun tekanan air jatuh bebas.',
        icon: 'permeability',
      },
    ],
  },
  fluida: {
    ringkasan: [
      {
        id: 'f-sum-1',
        code: 'Bab 1',
        title: 'Pengujian Sifat Fluida',
        badge: 'ASTM D1475 • ASTM D445 • SNI ISO 2811',
        desc: 'Pengukuran densitas (massa jenis piknometer), viskositas kinematik bola jatuh, gaya apung Archimedes, dan specific gravity zat cair.',
        icon: 'droplet',
      },
      {
        id: 'f-sum-2',
        code: 'Bab 2',
        title: 'Pengujian Osborne Reynolds',
        badge: 'ASTM D5242 • Standar Hidraulika',
        desc: 'Penentuan bilangan Reynolds (Re) untuk mendeteksi rezim aliran pipa: Laminer (Re < 2000), Transisi (2000-4000), atau Turbulen (Re > 4000).',
        icon: 'flow',
      },
      {
        id: 'f-sum-3',
        code: 'Bab 3',
        title: 'Flow Measurement (Venturi & Orifice)',
        badge: 'SNI 03-2414-1991 • ASTM D5242',
        desc: 'Perhitungan debit teoritis dan aktual fluida melalui alat ukur venturimeter dan pelat orifice berdasarkan beda tinggi manometer.',
        icon: 'pipe',
      },
      {
        id: 'f-sum-4',
        code: 'Bab 4',
        title: 'Aliran Ambang Tajam (Sharp Crested Weir)',
        badge: 'ASTM D5242 • SNI 03-2414-1991',
        desc: 'Pengukuran debit aliran saluran terbuka melalui mercu peluap ambang tajam segiempat (sharp crested weir).',
        icon: 'waves',
      },
      {
        id: 'f-sum-5',
        code: 'Bab 5',
        title: 'Kalibrasi Flowmeter & Akurasi Debit',
        badge: 'SNI 03-2414-1991 • Standar Kalibrasi',
        desc: 'Evaluasi akurasi pembacaan alat ukur debit aliran (flowmeter/rotameter) terhadap pengukuran volumetrik aktual beserta persentase error.',
        icon: 'gauge',
      },
    ],
    bab1: [
      {
        id: 'f1-1',
        code: 'UJI 1.1',
        title: 'Sifat Fisik Fluida (Densitas, Viskositas, Archimedes, SG)',
        badge: 'ASTM D1475 • ASTM D445 • SNI ISO 2811',
        desc: 'Pengukuran komprehensif densitas piknometer fluida, viskositas kinematik metode bola jatuh, gaya apung Archimedes, dan specific gravity.',
        icon: 'droplet',
      },
    ],
    bab2: [
      {
        id: 'f2-1',
        code: 'UJI 2.1',
        title: 'Pengujian Bilangan Osborne Reynolds',
        badge: 'ASTM D5242 • Standar Hidraulika',
        desc: 'Menghitung bilangan Reynolds (Re = v·D/ν) dan menentukan rezim aliran pipa (Laminer, Transisi, atau Turbulen) dengan visualisasi zat warna.',
        icon: 'flow',
      },
    ],
    bab3: [
      {
        id: 'f3-1',
        code: 'UJI 3.1',
        title: 'Flow Measurement (Venturi & Orifice)',
        badge: 'SNI 03-2414-1991 • ASTM D5242',
        desc: 'Pengukuran debit pengaliran fluida dalam pipa menggunakan prinsip penurunan tekanan pada venturimeter dan orifice plate.',
        icon: 'pipe',
      },
    ],
    bab4: [
      {
        id: 'f4-1',
        code: 'UJI 4.1',
        title: 'Aliran Ambang Tajam (Sharp Crested Weir)',
        badge: 'ASTM D5242 • SNI 03-2414-1991',
        desc: 'Kalkulasi debit aliran saluran terbuka di atas mercu peluap ambang tajam segiempat berdasarkan tinggi energi head H.',
        icon: 'waves',
      },
    ],
    bab5: [
      {
        id: 'f5-1',
        code: 'UJI 5.1',
        title: 'Kalibrasi Flowmeter & Akurasi Debit',
        badge: 'SNI 03-2414-1991 • Standar Kalibrasi',
        desc: 'Uji kalibrasi debit terbaca flowmeter terhadap metode volumetrik aktual dan evaluasi batas toleransi kesalahan (error < 5%).',
        icon: 'gauge',
      },
    ],
  },
  perkerasan: {
    ringkasan: [
      {
        id: 'p-sum-1',
        code: 'Bab 1',
        title: 'Uji Keausan Agregat (Los Angeles)',
        badge: 'SNI 2417:2008 • Bina Marga 2018',
        desc: 'Penentuan ketahanan agregat kasar terhadap degradasi/keausan abrasi di dalam silinder mesin Los Angeles dengan bola baja.',
        icon: 'los-angeles',
      },
      {
        id: 'p-sum-2',
        code: 'Bab 2',
        title: 'Uji Penetrasi Aspal',
        badge: 'SNI 2456:2011 • Bina Marga 2018',
        desc: 'Pengukuran konsistensi dan kekerasan aspal suhu 25°C beban 100 gram 5 detik dengan algoritma eliminasi data outlier statistik.',
        icon: 'gauge',
      },
      {
        id: 'p-sum-3',
        code: 'Bab 3',
        title: 'Uji Titik Lembek & Indeks Penetrasi (PI)',
        badge: 'SNI 2434:2011 • Bina Marga 2018',
        desc: 'Pengukuran titik lembek cincin dan bola (Ring and Ball) serta penentuan kepekaan temperatur aspal (Indeks Penetrasi PI).',
        icon: 'fire',
      },
      {
        id: 'p-sum-4',
        code: 'Bab 4',
        title: 'Uji Berat Jenis Aspal Keras',
        badge: 'SNI 2441:2011 • Bina Marga 2018',
        desc: 'Penentuan kerapatan dan specific gravity aspal padat/semi-padat menggunakan piknometer kaca kalibrasi pada suhu 25°C.',
        icon: 'beaker',
      },
      {
        id: 'p-sum-5',
        code: 'Bab 5',
        title: 'Uji Titik Nyala & Bakar (Cleveland)',
        badge: 'SNI 2433:2011 • Bina Marga 2018',
        desc: 'Pengukuran suhu titik nyala (flash point) dan titik bakar (fire point) aspal cawan Cleveland dengan koreksi barometer udara.',
        icon: 'fire',
      },
      {
        id: 'p-sum-6',
        code: 'Bab 6',
        title: 'Uji Daktilitas Aspal',
        badge: 'SNI 2432:2011 • Bina Marga 2018',
        desc: 'Pengukuran keelastisan, kohesi internal, dan elastisitas aspal melalui pemuluran briket hingga putus pada suhu 25°C kecepatan 5 cm/menit.',
        icon: 'waves',
      },
      {
        id: 'p-sum-7',
        code: 'Bab 7',
        title: 'Uji Viskositas (Saybolt Furol)',
        badge: 'SNI 7729:2011 • Bina Marga 2018',
        desc: 'Pengukuran waktu alir Saybolt Furol (SSF), interpolasi cSt, dan regresi suhu pencampuran (170-230 cSt) serta pemadatan (250-350 cSt).',
        icon: 'droplet',
      },
      {
        id: 'p-sum-8',
        code: 'Bab 8',
        title: 'Job Mix Formula (JMF)',
        badge: 'Spesifikasi Umum Bina Marga 2018',
        desc: 'Perhitungan perkiraan Kadar Aspal Awal (KAA / Pb) berdasarkan proporsi fraksi agregat (%CA, %FA, %Filler) dan konstanta K.',
        icon: 'box',
      },
      {
        id: 'p-sum-9',
        code: 'Bab 9',
        title: 'Uji Marshall Test',
        badge: 'SNI 06-2489-1991 • Bina Marga 2018',
        desc: 'Analisis volumetrik (VMA, VIM, VFA, Gmb, Gmm) dan mekanik (Stabilitas, Flow, Marshall Quotient) briket campuran beraspal.',
        icon: 'concrete-press',
      },
      {
        id: 'p-sum-10',
        code: 'Bab 10',
        title: 'Uji Ekstraksi Aspal (Sentrifus)',
        badge: 'SNI 03-6894-2002 • Bina Marga 2018',
        desc: 'Pemisahan aspal dari campuran perkerasan menggunakan centrifuge extractor untuk mengevaluasi toleransi deviasi terhadap JMF (±0.30%).',
        icon: 'sand',
      },
    ],
    bab1: [
      {
        id: 'p1-1',
        code: 'UJI 1.1',
        title: 'Uji Keausan Agregat dengan Mesin Los Angeles',
        badge: 'SNI 2417:2008 • Bina Marga 2018',
        desc: 'Pengukuran ketahanan abrasi agregat kasar menggunakan mesin Los Angeles (batas maksimum keausan < 40.0%).',
        icon: 'los-angeles',
      },
    ],
    bab2: [
      {
        id: 'p2-1',
        code: 'UJI 2.1',
        title: 'Uji Penetrasi Aspal & Filter Outlier',
        badge: 'SNI 2456:2011 • Bina Marga 2018',
        desc: 'Pengujian konsistensi penetrasi jarum pada suhu 25°C dengan eliminasi data pencilan statistik.',
        icon: 'gauge',
      },
    ],
    bab3: [
      {
        id: 'p3-1',
        code: 'UJI 3.1',
        title: 'Uji Titik Lembek (Ring & Ball) & Indeks Penetrasi (PI)',
        badge: 'SNI 2434:2011 • Bina Marga 2018',
        desc: 'Pengujian titik lembek aspal dan evaluasi kepekaan temperatur menggunakan rumus Indeks Penetrasi (PI) Pfeiffer.',
        icon: 'fire',
      },
    ],
    bab4: [
      {
        id: 'p4-1',
        code: 'UJI 4.1',
        title: 'Uji Berat Jenis Aspal Keras (Piknometer)',
        badge: 'SNI 2441:2011 • Bina Marga 2018',
        desc: 'Kerapatan massa jenis relatif aspal padat pada suhu 25°C dengan piknometer gelas kalibrasi.',
        icon: 'beaker',
      },
    ],
    bab5: [
      {
        id: 'p5-1',
        code: 'UJI 5.1',
        title: 'Uji Titik Nyala dan Titik Bakar (Cleveland)',
        badge: 'SNI 2433:2011 • Bina Marga 2018',
        desc: 'Evaluasi batas keamanan pemanasan aspal dengan cawan terbuka Cleveland dan koreksi tekanan barometer.',
        icon: 'fire',
      },
    ],
    bab6: [
      {
        id: 'p6-1',
        code: 'UJI 6.1',
        title: 'Uji Daktilitas Bahan Aspal',
        badge: 'SNI 2432:2011 • Bina Marga 2018',
        desc: 'Pengukuran elastisitas dan sifat kohesi pemuluran aspal pada 25°C kecepatan 5 cm/menit (syarat ≥ 100 cm).',
        icon: 'waves',
      },
    ],
    bab7: [
      {
        id: 'p7-1',
        code: 'UJI 7.1',
        title: 'Uji Viskositas Saybolt Furol & Rentang Suhu Pelaksanaan',
        badge: 'SNI 7729:2011 • Bina Marga 2018',
        desc: 'Konversi Saybolt Furol ke viskositas kinematik dan penentuan kurva suhu pencampuran & pemadatan.',
        icon: 'droplet',
      },
    ],
    bab8: [
      {
        id: 'p8-1',
        code: 'UJI 8.1',
        title: 'Job Mix Formula (JMF) & Perkiraan Kadar Aspal Awal',
        badge: 'Spesifikasi Umum Bina Marga 2018',
        desc: 'Kalkulasi Kadar Aspal Awal (KAA) dan 5 variasi kadar aspal untuk pengujian briket Marshall.',
        icon: 'box',
      },
    ],
    bab9: [
      {
        id: 'p9-1',
        code: 'UJI 9.1',
        title: 'Uji Marshall Campuran Beraspal Panas',
        badge: 'SNI 06-2489-1991 • Bina Marga 2018',
        desc: 'Kalkulasi komprehensif volumetrik (VMA, VIM, VFA) dan mekanik (Stabilitas, Flow, MQ) dengan multi-step form.',
        icon: 'concrete-press',
      },
    ],
    bab10: [
      {
        id: 'p10-1',
        code: 'UJI 10.1',
        title: 'Uji Ekstraksi Kadar Aspal (Centrifuge Extractor)',
        badge: 'SNI 03-6894-2002 • Bina Marga 2018',
        desc: 'Pemisahan aspal dari campuran perkerasan dan verifikasi batas toleransi deviasi terhadap JMF (±0.30%).',
        icon: 'sand',
      },
    ],
  },
}

// =========================================================================
// SINGLE SOURCE OF TRUTH: GENERATOR STANDARISASI DINAMIS DARI DATA MODUL
// =========================================================================
function extractStandardsFromList(modules) {
  const stdSet = new Set()
  modules.forEach((mod) => {
    if (mod.badge) {
      mod.badge.split('•').forEach((raw) => {
        const clean = raw.trim()
        if (clean) stdSet.add(clean)
      })
    }
  })
  return Array.from(stdSet)
}

function getDynamicStandardCategories(data) {
  const bbBab1_2 = [...(data.bahan?.bab1 || []), ...(data.bahan?.bab2 || [])]
  const bbBab3_4_5 = [
    ...(data.bahan?.bab3 || []),
    ...(data.bahan?.bab4 || []),
    ...(data.bahan?.bab5 || []),
  ]
  const mtBab1_2_4 = [
    ...(data.tanah?.bab1 || []),
    ...(data.tanah?.bab2 || []),
    ...(data.tanah?.bab4 || []),
  ]
  const mtBab3_5_6 = [
    ...(data.tanah?.bab3 || []),
    ...(data.tanah?.bab5 || []),
    ...(data.tanah?.bab6 || []),
  ]
  const mfBabAll = [
    ...(data.fluida?.bab1 || []),
    ...(data.fluida?.bab2 || []),
    ...(data.fluida?.bab3 || []),
    ...(data.fluida?.bab4 || []),
    ...(data.fluida?.bab5 || []),
  ]
  const bpBabAll = [
    ...(data.perkerasan?.bab1 || []),
    ...(data.perkerasan?.bab2 || []),
    ...(data.perkerasan?.bab3 || []),
    ...(data.perkerasan?.bab4 || []),
    ...(data.perkerasan?.bab5 || []),
    ...(data.perkerasan?.bab6 || []),
    ...(data.perkerasan?.bab7 || []),
    ...(data.perkerasan?.bab8 || []),
    ...(data.perkerasan?.bab9 || []),
    ...(data.perkerasan?.bab10 || []),
  ]

  return [
    {
      num: '01',
      title: 'Standar Agregat Halus & Kasar',
      badgeGroup: 'Bahan Bangunan • Bab 1 & 2',
      standards: extractStandardsFromList(bbBab1_2),
      modules: bbBab1_2,
    },
    {
      num: '02',
      title: 'Standar Beton, Kayu & Baja',
      badgeGroup: 'Bahan Bangunan • Bab 3, 4, 5',
      standards: extractStandardsFromList(bbBab3_4_5),
      modules: bbBab3_4_5,
    },
    {
      num: '03',
      title: 'Standar Penyelidikan & Sifat Fisik Tanah',
      badgeGroup: 'Mekanika Tanah • Bab 1, 2, 4',
      standards: extractStandardsFromList(mtBab1_2_4),
      modules: mtBab1_2_4,
    },
    {
      num: '04',
      title: 'Standar Pemadatan & Mekanika Tanah',
      badgeGroup: 'Mekanika Tanah • Bab 3, 5, 6',
      standards: extractStandardsFromList(mtBab3_5_6),
      modules: mtBab3_5_6,
    },
    {
      num: '05',
      title: 'Standar Mekanika Fluida & Hidraulika',
      badgeGroup: 'Mekanika Fluida • Bab 1 s.d. 5',
      standards: extractStandardsFromList(mfBabAll),
      modules: mfBabAll,
    },
    {
      num: '06',
      title: 'Standar Bahan Perkerasan',
      badgeGroup: 'Bahan Perkerasan • Bab 1 s.d. 10',
      standards: [
        'SNI 2417:2008',
        'SNI 2456:2011',
        'SNI 2434:2011',
        'SNI 2441:2011',
        'SNI 2433:2011',
        'SNI 2432:2011',
        'SNI 7729:2011',
        'SNI 06-2489-1991',
        'SNI 03-6894-2002',
        'Bina Marga 2018',
      ],
      modules: bpBabAll,
    },
  ]
}

// Generator Acuan Standar Lengkap untuk Kolom Footer (Dinamis dari Data Master)
function getDynamicFooterStandards(data) {
  const agregatMods = [...(data.bahan?.bab1 || []), ...(data.bahan?.bab2 || [])]
  const betonMods = [...(data.bahan?.bab3 || [])]
  const kayuBajaMods = [...(data.bahan?.bab4 || []), ...(data.bahan?.bab5 || [])]
  const sondirMods = [...(data.tanah?.bab1 || [])]
  const atterbergMods = [...(data.tanah?.bab2 || []), ...(data.tanah?.bab4 || [])]
  const proctorMods = [
    ...(data.tanah?.bab3 || []),
    ...(data.tanah?.bab5 || []),
    ...(data.tanah?.bab6 || []),
  ]

  return [
    {
      id: 'f-agregat',
      label: 'SNI Agregat Halus & Kasar',
      codes: extractStandardsFromList(agregatMods).slice(0, 2).join(' & '),
      hint: 'Gradasi, Kadar Air, Bobot Isi & Keausan Los Angeles',
    },
    {
      id: 'f-beton',
      label: 'SNI Kuat Tekan & Slump Beton',
      codes: extractStandardsFromList(betonMods).join(' & '),
      hint: 'Slump, Kuat Tekan Silinder/Kubus & Kuat Lentur',
    },
    {
      id: 'f-kayu-baja',
      label: 'SNI/ASTM Kayu & Baja Tulangan',
      codes: `${extractStandardsFromList(kayuBajaMods).find((c) => c.includes('ASTM')) || 'ASTM D2395'} • SNI 7973 & 8369`,
      hint: 'Kadar Air, Berat Jenis, Lentur Kayu & Tarik Baja',
    },
    {
      id: 'f-sondir',
      label: 'SNI Penyelidikan Tanah (Sondir & Boring)',
      codes: extractStandardsFromList(sondirMods).join(' & '),
      hint: 'Sondir CPT Lapangan & Pengeboran Teknik (Boring)',
    },
    {
      id: 'f-atterberg',
      label: 'SNI Sifat Fisik & Batas Atterberg',
      codes: extractStandardsFromList(atterbergMods).slice(0, 2).join(' & '),
      hint: 'Batas Cair, Plastis, Gs & Distribusi Saringan Tanah',
    },
    {
      id: 'f-proctor',
      label: 'SNI Pemadatan (Proctor) & Geser Langsung',
      codes: extractStandardsFromList(proctorMods).slice(0, 2).join(' & '),
      hint: 'Standard Proctor OMC/MDD, Sand Cone & Direct Shear Test',
    },
    {
      id: 'f-fluida-sifat',
      label: 'Massa Jenis & Viskositas Fluida',
      codes: 'ASTM D1475 / SNI ISO 2811 & ASTM D445 / SNI 06-6989.15',
      hint: 'Densitas Piknometer, Viskositas Bola Jatuh, Gaya Archimedes & SG',
    },
    {
      id: 'f-fluida-hidraulika',
      label: 'Debit Ambang Tajam & Aliran Pipa',
      codes: 'ASTM D5242 & SNI 03-2414-1991',
      hint: 'Bilangan Reynolds, Venturimeter, Ambang Tajam (Weir) & Kalibrasi',
    },
    {
      id: 'f-perkerasan-aspal',
      label: 'SNI Aspal & Bahan Perkerasan',
      codes: 'SNI 2456:2011 • SNI 2434:2011 & Bina Marga 2018',
      hint: 'Penetrasi, Titik Lembek (PI), Berat Jenis, Saybolt Furol & Marshall Test',
    },
  ]
}

const dynamicStandardCategories = getDynamicStandardCategories(labModulesData)
const dynamicFooterStandards = getDynamicFooterStandards(labModulesData)
const allUniqueStandardsList = Array.from(
  new Set(dynamicStandardCategories.flatMap((c) => c.standards))
)
const totalAllModulesCount = dynamicStandardCategories.reduce(
  (acc, c) => acc + c.modules.length,
  0
)

function renderModuleIcon(icon) {
  switch (icon) {
    case 'sand':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12a4 4 0 0 0 8 0" />
          <line x1="12" y1="2" x2="12" y2="4" />
        </svg>
      )
    case 'rock':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
          <polyline points="2 9 12 12 22 9" />
          <line x1="12" y1="21" x2="12" y2="12" />
        </svg>
      )
    case 'water':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    case 'oven':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="6" y1="8" x2="6" y2="8.01" />
          <line x1="10" y1="8" x2="10" y2="8.01" />
          <path d="M6 14c1.5-2 3.5-2 5 0s3.5 2 5 0" />
        </svg>
      )
    case 'beaker':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 3h15M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3M6 14h12" />
          <circle cx="9" cy="17" r="1" />
          <circle cx="14" cy="18" r="1" />
        </svg>
      )
    case 'box':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    case 'sieve':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      )
    case 'los-angeles':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'slump':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="7 3 17 3 20 21 4 21 7 3" />
          <line x1="5.5" y1="12" x2="18.5" y2="12" />
        </svg>
      )
    case 'concrete-press':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 5v14c0 1.66-4 3-9 3s-9-1.34-9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    case 'concrete-flex':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="11" width="20" height="5" rx="1" />
          <line x1="12" y1="3" x2="12" y2="10" />
          <polyline points="9 7 12 10 15 7" />
          <line x1="4" y1="17" x2="6" y2="21" />
          <line x1="20" y1="17" x2="18" y2="21" />
        </svg>
      )
    case 'wood':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      )
    case 'steel':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="8" width="14" height="8" rx="1" />
          <line x1="9" y1="8" x2="9" y2="16" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="15" y1="8" x2="15" y2="16" />
          <path d="M2 12h3M19 12h3" />
          <polyline points="4 10 2 12 4 14" />
          <polyline points="20 10 22 12 20 14" />
        </svg>
      )
    case 'sondir':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="15" />
          <polyline points="8 11 12 15 16 11" />
          <polygon points="12 15 8 22 16 22 12 15" />
          <line x1="4" y1="2" x2="20" y2="2" />
        </svg>
      )
    case 'boring':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="18" />
          <path d="M8 6l8 2M8 10l8 2M8 14l8 2" />
          <polygon points="12 18 10 22 14 22 12 18" />
        </svg>
      )
    case 'casagrande':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13a8 8 0 0 0 16 0H4z" />
          <path d="M12 13v5M8 22h8M12 18h4" />
          <circle cx="12" cy="6" r="3" />
        </svg>
      )
    case 'plastic-limit':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="10" width="18" height="4" rx="2" />
          <path d="M7 6l-4 4 4 4M17 6l4 4-4 4" />
        </svg>
      )
    case 'proctor':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="8" width="12" height="13" rx="1" />
          <path d="M4 21h16M12 2v6M9 4h6" />
          <line x1="6" y1="13" x2="18" y2="13" strokeDasharray="2 2" />
        </svg>
      )
    case 'sand-cone':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="5" ry="3" />
          <path d="M7 5v4l5 6 5-6V5" />
          <polygon points="12 15 6 21 18 21 12 15" />
        </svg>
      )
    case 'direct-shear':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="5" width="16" height="6" rx="1" />
          <rect x="4" y="13" width="16" height="6" rx="1" />
          <path d="M17 8h4M3 16h4" />
          <polyline points="19 6 21 8 19 10" />
          <polyline points="5 14 3 16 5 18" />
        </svg>
      )
    case 'oedometer':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <polyline points="12 5 12 7 14 8" />
          <rect x="5" y="14" width="14" height="7" rx="1" />
          <line x1="12" y1="11" x2="12" y2="14" />
        </svg>
      )
    case 'permeability':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="4" width="10" height="16" rx="1" />
          <path d="M12 2v2M12 20v2" />
          <path d="M10 8c1-1 3-1 4 0s3 1 4 0M6 13c1-1 3-1 4 0s3 1 4 0" />
        </svg>
      )
    case 'droplet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    case 'flow':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20M17 7l5 5-5 5M2 6h12M2 18h12" />
        </svg>
      )
    case 'pipe':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="10" rx="2" />
          <line x1="6" y1="7" x2="6" y2="17" />
          <line x1="18" y1="7" x2="18" y2="17" />
        </svg>
      )
    case 'waves':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      )
    case 'gauge':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 14 4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
      )
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
        </svg>
      )
  }
}

// =========================================================================
// DATA AWAL RIWAYAT PENGUJIAN TERSIMPAN (LOCALSTORAGE)
// =========================================================================
const initialSavedTests = [
  {
    id: 'KB-01',
    testId: 'bb-3-2',
    codePrefix: 'KB',
    baseCode: 'KTB-01',
    name: 'Kuat Tekan Silinder Beton K-300',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 3',
    standard: 'SNI 1974:2011',
    summary: "f'c = 28.4 MPa (Valid)",
    status: 'Valid',
    time: 'Hari ini, 09:30 WIB',
    inputs: { tipeSample: 'silinder', umurHari: 28, bebanHancur: 502.0, targetFc: 25.0 },
    notes: 'Benda uji silinder D15x30 cm umur 28 hari. Beban aksial hancur 502 kN memenuhi kuat tekan rencana.',
  },
  {
    id: 'AS-07',
    testId: 'bb-1-5',
    codePrefix: 'AS',
    baseCode: 'GR-01',
    name: 'Analisis Saringan Agregat Halus',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 1',
    standard: 'SNI 03-1968-1990',
    summary: 'FM = 2.85 (Zona II)',
    status: 'Valid',
    time: 'Kemarin, 14:15 WIB',
    inputs: {
      sieves: [
        { id: 1, size: 9.5,   label: '3/8" (9.5 mm)',     weight: 0 },
        { id: 2, size: 4.75,  label: 'No. 4 (4.75 mm)',   weight: 25 },
        { id: 3, size: 2.36,  label: 'No. 8 (2.36 mm)',   weight: 75 },
        { id: 4, size: 1.18,  label: 'No. 16 (1.18 mm)',  weight: 120 },
        { id: 5, size: 0.60,  label: 'No. 30 (0.60 mm)',  weight: 150 },
        { id: 6, size: 0.30,  label: 'No. 50 (0.30 mm)',  weight: 80 },
        { id: 7, size: 0.15,  label: 'No. 100 (0.15 mm)', weight: 35 },
        { id: 8, size: 0,     label: 'Pan Penampung (Dasar)', weight: 15, isPan: true },
      ],
    },
    notes: 'Gradasi pasir memenuhi syarat zona II agregat halus untuk campuran beton struktural SNI.',
  },
  {
    id: 'SD-02',
    testId: 'mt-1-1',
    codePrefix: 'SD',
    baseCode: 'CPT-01',
    name: 'Uji Penetrasi Konus (Sondir CPT)',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 1',
    standard: 'SNI 2827:2008',
    summary: 'qc max = 145 kg/cm²',
    status: 'Valid',
    time: '27 Okt 2026',
    inputs: { depth: 8.4, qc: 145.0, tw: 175.0 },
    notes: 'Kedalaman tanah keras (perlawanan konus maksimum qc > 150 kg/cm²) tercapai pada elevasi -8.40 m.',
  },
  {
    id: 'KY-04',
    testId: 'bb-4-4',
    codePrefix: 'KY',
    baseCode: 'KLKY-01',
    name: 'Uji Kuat Lentur Balok Kayu',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 4',
    standard: 'SNI 7973:2013',
    summary: 'MOR = 98.4 MPa, MOE = 52.903 MPa',
    status: 'Valid',
    time: '26 Okt 2026',
    inputs: { lebarB: 50.0, tinggiH: 50.0, bentangL: 1000.0, bebanP: 8200.0, lendutan: 6.2 },
    notes: 'Pengujian balok kayu penampang standar 50x50 mm bentang 1000 mm dengan tumpuan sendi-rol.',
  },
  {
    id: 'PR-03',
    testId: 'mt-3-1',
    codePrefix: 'PR',
    baseCode: 'PRC-01',
    name: 'Pemadatan Standard Proctor',
    lab: 'Mekanika Tanah',
    category: 'Mekanika Tanah • Bab 3',
    standard: 'SNI 1742:2008',
    summary: 'OMC = 14.2%, MDD = 1.72 gr/cm³',
    status: 'Valid',
    time: '25 Okt 2026',
    inputs: { volMold: 943.8, wMold: 2150.0, wMoldTanah: 3980.0, w1: 30.5, w2: 125.0, w3: 113.2 },
    notes: 'Kadar air optimum (OMC) 14.2% dan berat volume kering maksimum (MDD) 1.72 gr/cm³ kurva pemadatan.',
  },
  {
    id: 'RE-01',
    testId: 'mf-2-1',
    codePrefix: 'RE',
    baseCode: 'REY-01',
    name: 'Pengujian Bilangan Osborne Reynolds',
    lab: 'Mekanika Fluida',
    category: 'Mekanika Fluida • Bab 2',
    standard: 'ASTM D5242',
    summary: 'Re = 1619 (Laminer)',
    status: 'Laminer',
    time: '24 Okt 2026',
    inputs: { diameterD: 0.025, kecepatanV: 0.065, viskositasNu: 0.000001004 },
    notes: 'Pengujian aliran pipa akrilik D=25 mm dengan zat warna. Bilangan Reynolds Re = 1619 menunjukkan aliran laminer stabil.',
  },
  {
    id: 'MR-01',
    testId: 'bp-9-1',
    codePrefix: 'MR',
    baseCode: 'MAR-01',
    name: 'Uji Marshall Campuran Beraspal Panas',
    lab: 'Bahan Perkerasan',
    category: 'Bahan Perkerasan • Bab 9: Uji Marshall',
    standard: 'SNI 06-2489-1991',
    summary: 'Stab = 1012 kg, VIM = 5.624%',
    status: 'Valid',
    time: '26 Okt 2026',
    inputs: { beratKering: 1153.6, beratSsd: 1158.2, beratAir: 662.4, kadarAspalPa: 5.8, persenAgregatPs: 94.2, gsb: 2.620, gse: 2.6968, ga: 1.030, bacaanStabilitas: 265.0, flow: 3.2, angkaKorelasi: 1.00, kalibrasiAlat: 3.82 },
    notes: 'Pengujian Marshall campuran beraspal panas. Stabilitas 1012.3 kg, Flow 3.2 mm, VIM 5.624%, VMA 16.34%. Memenuhi Spesifikasi Bina Marga 2018.',
  },
]

export default function App() {
  // State untuk SPA view toggle: false = Landing Page, true = Dasbor Aplikasi Penuh
  const [isAppOpen, setIsAppOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#dashboard') {
      return true
    }
    return false
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'calculator'
  const [activeTestId, setActiveTestId] = useState('bb-1-1')
  const [openChapters, setOpenChapters] = useState({
    'bb-bab1': true,
    'bb-bab2': false,
    'bb-bab3': false,
    'bb-bab4': false,
    'bb-bab5': false,
    'mt-bab1': false,
    'mt-bab2': false,
    'mt-bab3': false,
    'mt-bab4': false,
    'mt-bab5': false,
    'mt-bab6': false,
    'mf-bab1': false,
    'mf-bab2': false,
    'mf-bab3': false,
    'mf-bab4': false,
    'mf-bab5': false,
  })
  const [selectedLab, setSelectedLab] = useState('bahan') // 'bahan' | 'tanah'
  const [activeCategoryTab, setActiveCategoryTab] = useState('ringkasan')

  const handleSelectTest = (testId, chapterId) => {
    setActiveTestId(testId)
    setActiveTab('calculator')
    if (chapterId) {
      setOpenChapters((prev) => ({ ...prev, [chapterId]: true }))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }))
  }

  // State penyimpanan riwayat uji praktikum dengan persistensi localStorage
  const [savedTests, setSavedTests] = useState(() => {
    try {
      const stored = localStorage.getItem('labsipil_saved_tests')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (err) {
      console.error('Gagal membaca data labsipil_saved_tests dari localStorage:', err)
    }
    return initialSavedTests
  })

  // Simpan otomatis ke localStorage setiap ada perubahan pada data uji
  useEffect(() => {
    try {
      localStorage.setItem('labsipil_saved_tests', JSON.stringify(savedTests))
    } catch (err) {
      console.error('Gagal menyimpan data ke localStorage:', err)
    }
  }, [savedTests])

  // Sinkronisasi otomatis antar-tab atau perubahan eksternal pada localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!e.key || e.key === 'labsipil_saved_tests') {
        try {
          const stored = localStorage.getItem('labsipil_saved_tests')
          if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSavedTests(parsed)
            }
          }
        } catch (err) {
          console.error('Gagal membaca pembaruan localStorage:', err)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // State penyimpanan nilai parameter input per modul pengujian (Persistence Antar Menu)
  const [moduleInputs, setModuleInputs] = useState(() => {
    try {
      const stored = localStorage.getItem('labsipil_module_inputs')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed === 'object') {
          return parsed
        }
      }
    } catch (err) {
      console.error('Gagal membaca data labsipil_module_inputs dari localStorage:', err)
    }
    return {}
  })

  // Simpan otomatis ke localStorage setiap ada perubahan parameter input
  useEffect(() => {
    try {
      localStorage.setItem('labsipil_module_inputs', JSON.stringify(moduleInputs))
    } catch (err) {
      console.error('Gagal menyimpan moduleInputs ke localStorage:', err)
    }
  }, [moduleInputs])

  // Sinkronisasi antar-tab untuk labsipil_module_inputs
  useEffect(() => {
    const handleModuleInputsChange = (e) => {
      if (!e.key || e.key === 'labsipil_module_inputs') {
        try {
          const stored = localStorage.getItem('labsipil_module_inputs')
          if (stored) {
            const parsed = JSON.parse(stored)
            if (parsed && typeof parsed === 'object') {
              setModuleInputs(parsed)
            }
          }
        } catch (err) {
          console.error('Gagal membaca pembaruan labsipil_module_inputs:', err)
        }
      }
    }

    window.addEventListener('storage', handleModuleInputsChange)
    return () => window.removeEventListener('storage', handleModuleInputsChange)
  }, [])

  // Integrasi Browser History API (Mendukung tombol Back/Forward browser & mouse macro)
  useEffect(() => {
    const handlePopState = (e) => {
      if (window.location.hash === '#dashboard' || (e.state && e.state.page === 'dashboard')) {
        setIsAppOpen(true)
      } else {
        setIsAppOpen(false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // State untuk modal tambah data uji
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTestData, setNewTestData] = useState({
    id: '',
    name: '',
    lab: 'Bahan Bangunan',
    category: 'Bahan Bangunan • Bab 3',
    standard: 'SNI 1974:2011',
    summary: '',
    notes: '',
  })

  // State untuk modal lihat detail uji
  const [selectedTestDetail, setSelectedTestDetail] = useState(null)

  // State untuk filter dan pencarian tabel
  const [searchQuery, setSearchQuery] = useState('')
  const [tableLabFilter, setTableLabFilter] = useState('all')

  const handleSelectLab = (labKey) => {
    setSelectedLab(labKey)
    setActiveCategoryTab('ringkasan')
  }

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  // Evaluasi klasifikasi status: 'danger' (Merah), 'warning' (Kuning), 'valid' (Hijau)
  const getTestChipClass = (testItem) => {
    if (!testItem) return 'valid'
    const statusStr = (testItem.status || '').toLowerCase()
    const summaryStr = (testItem.summary || '').toLowerCase()
    const notesStr = (testItem.notes || '').toLowerCase()

    if (
      statusStr.startsWith('perlu evaluasi') ||
      statusStr === 'perlu evaluasi'
    ) {
      return 'warning'
    }

    if (
      statusStr.includes('tidak memenuhi') ||
      statusStr.includes('tidak wajar') ||
      statusStr.includes('error') ||
      statusStr.includes('tidak logis') ||
      statusStr.includes('gagal') ||
      summaryStr.includes('tidak memenuhi') ||
      summaryStr.includes('tidak wajar') ||
      summaryStr.includes('tidak logis') ||
      notesStr.includes('tidak memenuhi')
    ) {
      return 'danger'
    }

    if (
      statusStr.includes('evaluasi') ||
      statusStr.includes('review') ||
      statusStr.includes('pending') ||
      summaryStr.includes('evaluasi') ||
      summaryStr.includes('perlu evaluasi')
    ) {
      return 'warning'
    }

    return 'valid'
  }

  // Render catatan teknis & verifikasi pada modal detail data pengujian
  const renderDetailNotes = (rawNotes) => {
    if (!rawNotes || typeof rawNotes !== 'string' || !rawNotes.trim()) {
      return (
        <div className="detail-notes-empty">
          <span>Tidak ada catatan teknis tambahan.</span>
        </div>
      )
    }

    // Split berdasarkan simbol pemisah garis ('|') atau perpindahan baris ('\n')
    const rawItems = rawNotes
      .split(/[|\n]/)
      .map((item) => item.trim())
      .filter(Boolean)

    if (rawItems.length === 0) {
      return (
        <div className="detail-notes-empty">
          <span>Tidak ada catatan teknis tambahan.</span>
        </div>
      )
    }

    const renderItemText = (cleanText) => {
      // 1. Deteksi label judul sebelum titik dua (contoh: "Target Mutu:", "Evaluasi Gradasi:", "Penentuan Zona:")
      let label = ''
      let body = cleanText
      const labelMatch = cleanText.match(/^([A-Za-z0-9\s/()"._-]{2,35}:)\s*(.*)$/)
      if (labelMatch && !labelMatch[1].includes('=')) {
        label = labelMatch[1]
        body = labelMatch[2]
      }

      // 2. Deteksi parameter awal perhitungan jika ada tanda sama dengan (contoh: "Nilai Slump =", "fy =", "Cu =")
      let paramPrefix = ''
      if (!label) {
        const eqMatch = body.match(/^([A-Za-z0-9_()\s/'.-]{1,32}?)\s*=\s*(.+)$/)
        if (
          eqMatch &&
          !eqMatch[1].toLowerCase().startsWith('http') &&
          !body.includes(' mengindikasikan ')
        ) {
          paramPrefix = eqMatch[1]
          body = eqMatch[2]
        }
      }

      // 3. Tokenisasi kata kunci evaluasi SNI dan nilai parameter
      const tokenRegex = /(^|[\s([,;])(\b(?:Memenuhi Standar|Tidak Memenuhi Standar|Memenuhi(?:\s+spesifikasi|\s+syarat|\s+rentang|\s+kualifikasi|\s+seluruh syarat)?|Tidak Memenuhi|Perlu Evaluasi|Tidak Valid|Input tidak valid|Valid|Lolos|Gagal|True Slump|Pasir Bergradasi Baik(?:\s*\([A-Z]+\))?|Kerikil Bergradasi Baik(?:\s*\([A-Z]+\))?|Well-Graded [A-Za-z]+|Poorly Graded [A-Za-z]+|Kelas Kuat [IVX]+|Zona [IVX]+|BjTS \d+|BjTP \d+)\b|(?:fu\/fy|Nilai Cu|Nilai Cc|Cu|Cc|FM|fy|fu|f'c|E|BJ|Sd|Ss|Sa|Gs|LL|PL|PI|qc)\s*(?:=|≥|≤|>|<)\s*[\d.,]+(?:\s*(?:MPa|N\/m²|N|kN|mm|cm|gr\/cm³|g\/cm³|g\/mm³|kg\/cm²|kg\/L|kg\/m³|gr|gram|%|cm\/s))?|\b(?:OMC|MDD)\s+[\d.,]+(?:\s*(?:%|gr\/cm3|g\/cm³))?)/gi

      const elements = []
      let lastIdx = 0
      let match
      let keyCounter = 0

      while ((match = tokenRegex.exec(body)) !== null) {
        const prefix = match[1] || ''
        const token = match[2]
        const tokenIndex = match.index + prefix.length

        if (tokenIndex > lastIdx) {
          elements.push(body.substring(lastIdx, tokenIndex))
        }

        const lower = token.toLowerCase()
        let kind = 'highlight'
        if (
          lower.includes('tidak memenuhi') ||
          lower.includes('tidak valid') ||
          lower.includes('gagal')
        ) {
          kind = 'bad'
        } else if (lower.includes('perlu evaluasi')) {
          kind = 'warn'
        } else if (
          lower.includes('memenuhi') ||
          lower === 'valid' ||
          lower === 'lolos'
        ) {
          kind = 'ok'
        }

        elements.push(
          <strong key={`tok-${keyCounter++}`} className={`note-tok-${kind}`}>
            {token}
          </strong>
        )

        lastIdx = tokenIndex + token.length
      }

      if (lastIdx < body.length) {
        elements.push(body.substring(lastIdx))
      }

      return (
        <>
          {label && <strong className="detail-note-label">{label} </strong>}
          {paramPrefix && (
            <strong className="detail-note-param">{paramPrefix} = </strong>
          )}
          {elements.length > 0 ? elements : body}
        </>
      )
    }

    return (
      <ul className="detail-notes-list">
        {rawItems.map((item, idx) => {
          const clean = item.replace(/^[•\-*]\s*/, '').trim()
          return (
            <li key={idx} className="detail-notes-item">
              <span className="detail-notes-bullet" aria-hidden="true" />
              <div className="detail-notes-content">{renderItemText(clean)}</div>
            </li>
          )
        })}
      </ul>
    )
  }

  // Pemetaan rute modul kartu landing page ke testId dan chapterId di Dasbor
  const getModuleTargetRoute = (item) => {
    if (!item || !item.id) {
      return { testId: 'bb-1-1', chapterId: 'bb-bab1' }
    }
    const id = item.id

    // Ringkasan Bahan Bangunan
    if (id === 'sum-1') return { testId: 'bb-1-1', chapterId: 'bb-bab1' }
    if (id === 'sum-2') return { testId: 'bb-2-1', chapterId: 'bb-bab2' }
    if (id === 'sum-4') return { testId: 'bb-3-1', chapterId: 'bb-bab3' }
    if (id === 'sum-5') return { testId: 'bb-4-1', chapterId: 'bb-bab4' }
    if (id === 'sum-6') return { testId: 'bb-5-1', chapterId: 'bb-bab5' }

    // Ringkasan Mekanika Tanah
    if (id === 't-sum-1') return { testId: 'mt-1-1', chapterId: 'mt-bab1' }
    if (id === 't-sum-2') return { testId: 'mt-2-1', chapterId: 'mt-bab2' }
    if (id === 't-sum-3') return { testId: 'mt-3-1', chapterId: 'mt-bab3' }
    if (id === 't-sum-4') return { testId: 'mt-4-1', chapterId: 'mt-bab4' }
    if (id === 't-sum-5') return { testId: 'mt-5-1', chapterId: 'mt-bab5' }
    if (id === 't-sum-6') return { testId: 'mt-6-1', chapterId: 'mt-bab6' }

    // Ringkasan Mekanika Fluida
    if (id === 'f-sum-1' || id === 'f1-1') return { testId: 'mf-1-1', chapterId: 'mf-bab1' }
    if (id === 'f-sum-2' || id === 'f2-1') return { testId: 'mf-2-1', chapterId: 'mf-bab2' }
    if (id === 'f-sum-3' || id === 'f3-1') return { testId: 'mf-3-1', chapterId: 'mf-bab3' }
    if (id === 'f-sum-4' || id === 'f4-1') return { testId: 'mf-4-1', chapterId: 'mf-bab4' }
    if (id === 'f-sum-5' || id === 'f5-1') return { testId: 'mf-5-1', chapterId: 'mf-bab5' }

    // Uji Spesifik Bahan Bangunan (format: b1-1 => bb-1-1, b2-1 => bb-2-1, dst)
    if (id.startsWith('b')) {
      const match = id.match(/^b(\d+)-(\d+)$/)
      if (match) {
        const chapNum = match[1]
        const itemNum = match[2]
        return {
          testId: `bb-${chapNum}-${itemNum}`,
          chapterId: `bb-bab${chapNum}`,
        }
      }
    }

    // Uji Spesifik Mekanika Tanah (format: t-b1-1 => mt-1-1, dst)
    if (id.startsWith('t-b')) {
      const match = id.match(/^t-b(\d+)-(\d+)$/)
      if (match) {
        const chapNum = match[1]
        const itemNum = match[2]
        return {
          testId: `mt-${chapNum}-${itemNum}`,
          chapterId: `mt-bab${chapNum}`,
        }
      }
    }

    // Uji Spesifik Mekanika Fluida (format: f1-1 => mf-1-1, dst)
    if (id.startsWith('f')) {
      const match = id.match(/^f(\d+)-(\d+)$/)
      if (match) {
        const chapNum = match[1]
        const itemNum = match[2]
        return {
          testId: `mf-${chapNum}-${itemNum}`,
          chapterId: `mf-bab${chapNum}`,
        }
      }
    }

    // Ringkasan Bahan Perkerasan (format: p-sum-1 => bp-1-1, dst)
    if (id.startsWith('p-sum-')) {
      const match = id.match(/^p-sum-(\d+)$/)
      if (match) {
        const num = match[1]
        return { testId: `bp-${num}-1`, chapterId: `bp-bab${num}` }
      }
    }

    // Uji Spesifik Bahan Perkerasan (format: p1-1 => bp-1-1, p9-1 => bp-9-1, dst)
    if (id.startsWith('p') && !id.startsWith('pr')) {
      const match = id.match(/^p(\d+)-(\d+)$/)
      if (match) {
        const chapNum = match[1]
        const itemNum = match[2]
        return {
          testId: `bp-${chapNum}-${itemNum}`,
          chapterId: `bp-bab${chapNum}`,
        }
      }
    }

    if (id.startsWith('bp-')) {
      const match = id.match(/^bp-(\d+)-(\d+)$/)
      if (match) {
        const chapNum = match[1]
        const itemNum = match[2]
        return {
          testId: `bp-${chapNum}-${itemNum}`,
          chapterId: `bp-bab${chapNum}`,
        }
      }
    }

    return { testId: 'bb-1-1', chapterId: 'bb-bab1' }
  }

  // CTA Mulai Hitung: Buka Dasbor Utama dengan seluruh dropdown bab tertutup (collapsed)
  const handleOpenApp = (e) => {
    if (e) e.preventDefault()
    if (window.location.hash !== '#dashboard') {
      window.history.pushState({ page: 'dashboard' }, '', '#dashboard')
    }
    setActiveTab('dashboard')
    setOpenChapters({
      'bb-bab1': false,
      'bb-bab2': false,
      'bb-bab3': false,
      'bb-bab4': false,
      'bb-bab5': false,
      'mt-bab1': false,
      'mt-bab2': false,
      'mt-bab3': false,
      'mt-bab4': false,
      'mt-bab5': false,
      'mt-bab6': false,
      'mf-bab1': false,
      'mf-bab2': false,
      'mf-bab3': false,
      'mf-bab4': false,
      'mf-bab5': false,
    })
    setIsAppOpen(true)
    closeMobileMenu()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // CTA Mulai Hitung Modul: Buka langsung kalkulator modul terkait & buka dropdown babnya
  const handleOpenModuleCalculator = (item, e) => {
    if (e) e.preventDefault()
    const { testId, chapterId } = getModuleTargetRoute(item)
    if (window.location.hash !== '#dashboard') {
      window.history.pushState({ page: 'dashboard' }, '', '#dashboard')
    }
    setActiveTab('calculator')
    setActiveTestId(testId)
    setOpenChapters({
      'bb-bab1': false,
      'bb-bab2': false,
      'bb-bab3': false,
      'bb-bab4': false,
      'bb-bab5': false,
      'mt-bab1': false,
      'mt-bab2': false,
      'mt-bab3': false,
      'mt-bab4': false,
      'mt-bab5': false,
      'mt-bab6': false,
      'mf-bab1': false,
      'mf-bab2': false,
      'mf-bab3': false,
      'mf-bab4': false,
      'mf-bab5': false,
      [chapterId]: true,
    })
    setIsAppOpen(true)
    closeMobileMenu()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Pembaruan nilai parameter input modul ke dalam state terpusat (Auto-save)
  const handleUpdateModuleInput = (testId, fieldKey, value) => {
    setModuleInputs((prev) => {
      const currentTestInputs = prev[testId] || calculatorRegistry[testId]?.initialInputs || {}
      return {
        ...prev,
        [testId]: {
          ...currentTestInputs,
          [fieldKey]: value,
        },
      }
    })
  }

  // Reset nilai parameter modul ke nilai default awal
  const handleResetModuleInputs = (testId) => {
    if (calculatorRegistry[testId]) {
      setModuleInputs((prev) => ({
        ...prev,
        [testId]: { ...calculatorRegistry[testId].initialInputs },
      }))
    }
  }

  // Dapatkan chapterId di sidebar berdasarkan testId modul
  const getChapterIdByTestId = (testId) => {
    if (!testId) return 'bb-bab1'
    for (const group of sidebarGroups) {
      for (const chap of group.chapters) {
        if (chap.items.some((item) => item.id === testId)) {
          return chap.chapterId
        }
      }
    }
    return 'bb-bab1'
  }

  // Auto-Increment ID saat data disimpan ke Dashboard (contoh: BJ-01, BJ-02, KA-01, dst)
  const handleSaveRecordFromCalculator = (recordData) => {
    const baseCode = recordData.baseCode || recordData.code || 'UJ-01'
    const prefixMatch = baseCode.match(/^([A-Za-z]+)-/)
    const prefix = (recordData.codePrefix || (prefixMatch ? prefixMatch[1] : baseCode.split('-')[0]) || 'UJ').toUpperCase()

    // Cari urutan angka tertinggi dari id yang sudah ada di savedTests
    const prefixRegex = new RegExp(`^${prefix}-(\\d+)$`, 'i')
    let maxSeq = 0

    savedTests.forEach((t) => {
      if (t && t.id) {
        const match = t.id.match(prefixRegex)
        if (match) {
          const num = parseInt(match[1], 10)
          if (!isNaN(num) && num > maxSeq) {
            maxSeq = num
          }
        }
      }
    })

    const nextSeq = maxSeq + 1
    const generatedId = `${prefix}-${String(nextSeq).padStart(2, '0')}`

    const finalRecord = {
      ...recordData,
      id: generatedId,
    }

    setSavedTests((prev) => [finalRecord, ...prev])
    return finalRecord
  }

  // Tombol "Hitung" pada tabel riwayat: Buka modul pengujian dengan memuat nilai parameter yang tersimpan
  const handleOpenCalculatorFromRecord = (record) => {
    if (!record) return

    let targetTestId = record.testId
    if (!targetTestId || !calculatorRegistry[targetTestId]) {
      const matchKey = Object.keys(calculatorRegistry).find((k) => {
        const reg = calculatorRegistry[k]
        const prefix = reg.code.split('-')[0].toUpperCase()
        const recPrefix = (record.id || '').split('-')[0].toUpperCase()
        return (
          reg.id === record.id ||
          reg.code === record.id ||
          (recPrefix && prefix === recPrefix) ||
          reg.name.toLowerCase() === (record.name || '').toLowerCase()
        )
      })
      targetTestId = matchKey || 'bb-1-1'
    }

    // Jika baris riwayat memiliki nilai parameter input tersimpan, muat ke moduleInputs
    if (record.inputs && typeof record.inputs === 'object' && Object.keys(record.inputs).length > 0) {
      setModuleInputs((prev) => ({
        ...prev,
        [targetTestId]: { ...record.inputs },
      }))
    }

    const targetChapterId = getChapterIdByTestId(targetTestId)
    setOpenChapters({
      'bb-bab1': false,
      'bb-bab2': false,
      'bb-bab3': false,
      'bb-bab4': false,
      'bb-bab5': false,
      'mt-bab1': false,
      'mt-bab2': false,
      'mt-bab3': false,
      'mt-bab4': false,
      'mt-bab5': false,
      'mt-bab6': false,
      'mf-bab1': false,
      'mf-bab2': false,
      'mf-bab3': false,
      'mf-bab4': false,
      'mf-bab5': false,
      [targetChapterId]: true,
    })

    setActiveTestId(targetTestId)
    setActiveTab('calculator')
    if (window.location.hash !== '#dashboard') {
      window.history.pushState({ page: 'dashboard' }, '', '#dashboard')
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBackToLanding = (e) => {
    if (e) e.preventDefault()
    setIsAppOpen(false)
    if (window.location.hash === '#dashboard') {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Operasi Modal & CRUD Data Pengujian
  const handleOpenAddModal = () => {
    const nextNumber = savedTests.length + 1
    const defaultId = `UJ-${String(nextNumber).padStart(2, '0')}`
    setNewTestData({
      id: defaultId,
      name: '',
      lab: 'Bahan Bangunan',
      category: 'Bahan Bangunan • Bab 3',
      standard: 'SNI 1974:2011',
      summary: '',
      notes: '',
    })
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  const handleSaveNewTest = (e) => {
    e.preventDefault()
    if (!newTestData.name.trim()) return

    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const timeString = `Hari ini, ${hours}:${minutes} WIB`

    const newEntry = {
      id: newTestData.id.trim() || `UJ-${String(savedTests.length + 1).padStart(2, '0')}`,
      name: newTestData.name.trim(),
      lab: newTestData.lab,
      category: newTestData.category,
      standard: newTestData.standard.trim() || 'SNI Standar',
      summary: newTestData.summary.trim() || 'Data Uji Tervalidasi',
      status: 'Valid',
      time: timeString,
      notes: newTestData.notes.trim() || 'Data pengujian dicatat melalui form pengisian mandiri.',
    }

    setSavedTests([newEntry, ...savedTests])
    setIsAddModalOpen(false)
  }

  const handleDeleteTest = (idToDelete) => {
    if (window.confirm(`Yakin ingin menghapus data pengujian ${idToDelete}?`)) {
      setSavedTests((prev) => prev.filter((item) => item.id !== idToDelete))
      if (selectedTestDetail && selectedTestDetail.id === idToDelete) {
        setSelectedTestDetail(null)
      }
    }
  }

  const handleResetSampleData = () => {
    if (window.confirm('Kembalikan database pengujian ke 5 data contoh awal?')) {
      setSavedTests(initialSavedTests)
    }
  }

  // Ekspor seluruh riwayat pengujian ke format spreadsheet Microsoft Excel (.xlsx)
  const handleExportToExcel = () => {
    let dataToExport = savedTests
    if (!dataToExport || dataToExport.length === 0) {
      try {
        const stored = localStorage.getItem('labsipil_saved_tests')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            dataToExport = parsed
          }
        }
      } catch (err) {
        console.error('Gagal membaca data dari localStorage:', err)
      }
    }

    if (!dataToExport || dataToExport.length === 0) {
      alert('Tidak ada data riwayat pengujian untuk diekspor.')
      return
    }

    // Format array of objects yang rapi sesuai kolom spesifikasi:
    // Kode ID, Nama Pengujian, Kategori, Standar SNI, Ringkasan Hasil, Waktu Input
    const formattedData = dataToExport.map((item) => ({
      'Kode ID': item.id || '-',
      'Nama Pengujian': item.name || '-',
      'Kategori': item.category || '-',
      'Standar SNI': item.standard || '-',
      'Ringkasan Hasil': item.summary || '-',
      'Waktu Input': item.time || '-',
    }))

    // Generate worksheet Excel
    const worksheet = XLSX.utils.json_to_sheet(formattedData)

    // Pengaturan lebar kolom agar tampilan tabel Excel rapi dan proporsional
    worksheet['!cols'] = [
      { wch: 14 }, // Kode ID
      { wch: 38 }, // Nama Pengujian
      { wch: 28 }, // Kategori
      { wch: 20 }, // Standar SNI
      { wch: 34 }, // Ringkasan Hasil
      { wch: 22 }, // Waktu Input
    ]

    // Buat workbook baru dan unduh dengan nama Data_Praktikum_LabSipil.xlsx
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Riwayat Pengujian')
    XLSX.writeFile(workbook, 'Data_Praktikum_LabSipil.xlsx')
  }

  // Filter Data untuk Ditampilkan di Tabel
  const filteredTests = savedTests.filter((test) => {
    if (tableLabFilter !== 'all' && test.lab !== tableLabFilter) return false

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        test.id.toLowerCase().includes(q) ||
        test.name.toLowerCase().includes(q) ||
        test.standard.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q) ||
        test.summary.toLowerCase().includes(q)
      )
    }

    return true
  })

  // Metrik Ringkasan untuk Kartu Bento & Mockup Preview (Auto-Sync)
  const totalSavedCount = savedTests.length
  const bahanCount = savedTests.filter((t) => t.lab === 'Bahan Bangunan' || t.category.includes('Bahan Bangunan')).length
  const tanahCount = savedTests.filter((t) => t.lab === 'Mekanika Tanah' || t.category.includes('Mekanika Tanah')).length
  const fluidaCount = savedTests.filter((t) => t.lab === 'Mekanika Fluida' || t.category.includes('Mekanika Fluida') || t.category.includes('Fluida')).length
  const perkerasanCount = savedTests.filter((t) => t.lab === 'Bahan Perkerasan' || t.category.includes('Bahan Perkerasan') || t.category.includes('Perkerasan')).length

  // =========================================================================
  // VIEW 1: DASBOR APLIKASI WEB PENUH (Saat isAppOpen === true)
  // =========================================================================
  if (isAppOpen) {
    return (
      <div className="full-dashboard-layout">
        {/* Sidebar Kiri Gelap (#12345A) */}
        <aside className="full-dashboard-sidebar">
          <div className="sidebar-top-section">
            <button 
              type="button" 
              className="sidebar-brand-btn flex items-center gap-3" 
              onClick={handleBackToLanding}
              title="Klik untuk kembali ke Beranda Landing Page"
            >
              {/* Sebelah KIRI: Hanya gambar ikon logo huruf L baru warna putih */}
              <img 
                src="/logo-l.png" 
                alt="LabSipil Icon" 
                className="sidebar-brand-icon h-11 w-auto object-contain brightness-0 invert" 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              
              {/* Sebelah KANAN: Teks yang ditumpuk (flex-col) */}
              <div className="sidebar-brand-text flex flex-col text-left">
                <span className="sidebar-brand-name text-xl font-bold leading-tight">
                  <span className="text-white">Lab</span>
                  <span className="text-blue-500">Sipil</span>
                </span>
                <span className="sidebar-brand-sub text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
                  SISTEM PENGOLAHAN DATA
                </span>
              </div>
            </button>

            {/* Area Navigasi Accordion Menu Dinamis (Bahan Bangunan & Mekanika Tanah) */}
            <div className="sidebar-accordion-wrapper">
              {/* Tombol Utama: Dashboard Utama */}
              <button 
                type="button" 
                className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('dashboard')
                  window.scrollTo({ top: 0, behavior: 'instant' })
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Dashboard Utama</span>
              </button>

              {/* 2 Kelompok Kategori Pengujian */}
              <div className="sidebar-accordion-groups">
                {sidebarGroups.map((group) => (
                  <div key={group.groupId} className="sidebar-group-box">
                    <div className="sidebar-group-heading">
                      <span>{group.groupTitle}</span>
                    </div>

                    <div className="sidebar-chapters-accordion">
                      {group.chapters.map((chapter) => {
                        const isOpen = !!openChapters[chapter.chapterId]
                        const isChapterActive = chapter.items.some(
                          (item) => activeTab === 'calculator' && activeTestId === item.id
                        )

                        return (
                          <div 
                            key={chapter.chapterId} 
                            className={`sidebar-chapter-block ${isOpen ? 'expanded' : ''} ${isChapterActive ? 'has-active' : ''}`}
                          >
                            <button
                              type="button"
                              className="sidebar-chapter-header-btn"
                              onClick={() => toggleChapter(chapter.chapterId)}
                              aria-expanded={isOpen}
                            >
                              <span className="chapter-header-title">{chapter.title}</span>
                              <svg 
                                className={`chapter-chevron-icon ${isOpen ? 'rotate-down' : ''}`} 
                                width="14" 
                                height="14" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              >
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>

                            {isOpen && (
                              <div className="sidebar-subitem-dropdown">
                                {chapter.items.map((item, idx) => {
                                  const isSelected = activeTab === 'calculator' && activeTestId === item.id

                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      className={`sidebar-subitem-link ${isSelected ? 'active-test' : ''}`}
                                      onClick={() => handleSelectTest(item.id, chapter.chapterId)}
                                      title={`${item.title} (${item.standard})`}
                                    >
                                      <span className="subitem-number">{idx + 1}.</span>
                                      <span className="subitem-text">{item.title}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bagian Bawah Sidebar */}
          <div className="sidebar-bottom-section">
            <button 
              type="button" 
              className="btn-back-landing" 
              onClick={handleBackToLanding}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </aside>

        {/* Konten Utama Dasbor */}
        <div className="full-dashboard-main">
          {/* Topbar Dasbor */}
          <header className="dashboard-topbar">
            <div className="topbar-title-group">
              <h1 className="dashboard-heading">
                {activeTab === 'calculator' && calculatorRegistry[activeTestId]
                  ? calculatorRegistry[activeTestId].name
                  : 'Monitoring Pengujian Praktikum'}
              </h1>
            </div>

            <div className="topbar-status-group">
              <div className="system-live-badge">
                <span className="live-pulsing-dot"></span>
                <span>Sistem Online</span>
              </div>
            </div>
          </header>

          {/* Area Isi Dasbor: Toggle antara Kalkulator Pengujian Dinamis dan Dashboard Utama */}
          {activeTab === 'calculator' && calculatorRegistry[activeTestId] ? (
            <TestCalculatorPanel
              key={activeTestId}
              testConfig={calculatorRegistry[activeTestId]}
              currentInputs={moduleInputs[activeTestId] || calculatorRegistry[activeTestId]?.initialInputs}
              onInputChange={(fieldKey, value) => handleUpdateModuleInput(activeTestId, fieldKey, value)}
              onResetInputs={() => handleResetModuleInputs(activeTestId)}
              onSaveToDashboard={handleSaveRecordFromCalculator}
              onBackToDashboard={() => {
                setActiveTab('dashboard')
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
            />
          ) : (
            <div className="dashboard-content-area">
            {/* Metrik Bento Grid (4 Kolom Ringkas) */}
            <div className="bento-metrics-container">
              <div className="bento-card">
                <div className="bento-card-top">
                  <span className="bento-card-label">Total Pengujian Tersimpan</span>
                  <span className="bento-card-tag positive">Aktif</span>
                </div>
                <div className="bento-card-number-row">
                  <strong className="bento-card-number">{totalSavedCount}</strong>
                  <span className="bento-card-unit">Data Uji</span>
                </div>
                <span className="bento-card-sub">Seluruh berkas pengujian terekam</span>
              </div>

              <div className="bento-card">
                <div className="bento-card-top">
                  <span className="bento-card-label">Modul Bahan Bangunan</span>
                  <span className="bento-card-tag neutral">Lab Bahan</span>
                </div>
                <div className="bento-card-number-row">
                  <strong className="bento-card-number">{bahanCount}</strong>
                  <span className="bento-card-unit">Catatan</span>
                </div>
                <span className="bento-card-sub">Agregat, beton, kayu, dan baja</span>
              </div>

              <div className="bento-card">
                <div className="bento-card-top">
                  <span className="bento-card-label">Modul Mekanika Tanah</span>
                  <span className="bento-card-tag neutral">Lab Geoteknik</span>
                </div>
                <div className="bento-card-number-row">
                  <strong className="bento-card-number">{tanahCount}</strong>
                  <span className="bento-card-unit">Catatan</span>
                </div>
                <span className="bento-card-sub">Sondir, fisik, gradasi, & proctor</span>
              </div>

              <div className="bento-card">
                <div className="bento-card-top">
                  <span className="bento-card-label">Modul Mekanika Fluida</span>
                  <span className="bento-card-tag neutral">Lab Fluida</span>
                </div>
                <div className="bento-card-number-row">
                  <strong className="bento-card-number">{fluidaCount}</strong>
                  <span className="bento-card-unit">Catatan</span>
                </div>
                <span className="bento-card-sub">Sifat fluida, reynolds, & debit</span>
              </div>

              <div className="bento-card">
                <div className="bento-card-top">
                  <span className="bento-card-label">Modul Bahan Perkerasan</span>
                  <span className="bento-card-tag neutral">Lab Perkerasan</span>
                </div>
                <div className="bento-card-number-row">
                  <strong className="bento-card-number">{perkerasanCount}</strong>
                  <span className="bento-card-unit">Catatan</span>
                </div>
                <span className="bento-card-sub">LA, Penetrasi, Marshall & JMF</span>
              </div>
            </div>

            {/* Panel Riwayat & Ringkasan Data Pengujian Masuk */}
            <div className="records-panel">
              <div className="records-panel-header">
                <div className="records-panel-title-group">
                  <h3>Riwayat & Ringkasan Data Pengujian Masuk</h3>
                  <p>Database pengujian praktikum tersimpan otomatis di browser secara lokal (localStorage) • Dapat ditambah, dicek, atau dihapus.</p>
                </div>

                <div className="records-panel-controls">
                  <input
                    type="text"
                    className="records-search-input"
                    placeholder="Cari ID, nama pengujian, standar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <select
                    className="records-filter-select"
                    value={tableLabFilter}
                    onChange={(e) => setTableLabFilter(e.target.value)}
                  >
                    <option value="all">Semua Laboratorium</option>
                    <option value="Bahan Bangunan">Bahan Bangunan</option>
                    <option value="Mekanika Tanah">Mekanika Tanah</option>
                    <option value="Mekanika Fluida">Mekanika Fluida</option>
                    <option value="Bahan Perkerasan">Bahan Perkerasan</option>
                  </select>

                  <button
                    type="button"
                    className="btn-add-record"
                    onClick={handleOpenAddModal}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Simpan Data Uji Baru</span>
                  </button>

                  <button
                    type="button"
                    className="btn-reset-sample"
                    onClick={handleResetSampleData}
                    title="Kembalikan riwayat ke 5 data contoh awal"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    <span>Reset Contoh</span>
                  </button>
                </div>
              </div>

              {/* Tabel Data */}
              <div className="records-table-wrapper">
                <table className="records-table">
                  <thead>
                    <tr>
                      <th style={{ width: '90px' }}>Kode/ID Uji</th>
                      <th>Nama Pengujian</th>
                      <th>Kategori Bab</th>
                      <th>Standar SNI / ASTM</th>
                      <th>Ringkasan Hasil Utama</th>
                      <th>Waktu Input</th>
                      <th style={{ textAlign: 'center', width: '130px' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.length > 0 ? (
                      filteredTests.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className="table-code-chip">{item.id}</span>
                          </td>
                          <td>
                            <span className="table-test-name">{item.name}</span>
                          </td>
                          <td>
                            <span className="table-category-text">{item.category}</span>
                          </td>
                          <td>
                            <span className="table-standard-chip">{item.standard}</span>
                          </td>
                          <td>
                            <span className={`table-result-chip ${getTestChipClass(item)}`}>
                              {formatScientificInText(item.summary)}
                            </span>
                          </td>
                          <td>
                            <span className="table-time-text">{item.time}</span>
                          </td>
                          <td>
                            <div className="table-actions-cell">
                              <button
                                type="button"
                                className="btn-tbl-calc"
                                onClick={() => handleOpenCalculatorFromRecord(item)}
                                title="Buka kalkulator modul ini dengan nilai parameter tersimpan"
                              >
                                Hitung
                              </button>
                              <button
                                type="button"
                                className="btn-tbl-view"
                                onClick={() => setSelectedTestDetail(item)}
                                title="Lihat detail data pengujian"
                              >
                                Lihat
                              </button>
                              <button
                                type="button"
                                className="btn-tbl-delete"
                                onClick={() => handleDeleteTest(item.id)}
                                title="Hapus data ini"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">
                          <div className="table-empty-state">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p>Tidak ada data pengujian yang sesuai dengan filter pencarian.</p>
                            <button
                              type="button"
                              className="btn-add-record"
                              onClick={handleOpenAddModal}
                            >
                              + Tambah Pengujian Sekarang
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Tambah Data Uji Baru */}
            {isAddModalOpen && (
              <div className="modal-overlay" onClick={handleCloseAddModal}>
                <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header-row">
                    <div className="modal-title-wrap">
                      <h4>+ Simpan Data Pengujian Baru</h4>
                      <span>Formulir pencatatan hasil uji laboratorium ke database lokal</span>
                    </div>
                    <button
                      type="button"
                      className="modal-close-btn"
                      onClick={handleCloseAddModal}
                      title="Tutup dialog"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveNewTest}>
                    <div className="modal-form-body">
                      <div className="modal-form-grid-2">
                        <div className="modal-field-group">
                          <label>Kode / ID Uji</label>
                          <input
                            type="text"
                            required
                            className="modal-input"
                            value={newTestData.id}
                            onChange={(e) => setNewTestData({ ...newTestData, id: e.target.value })}
                            placeholder="Contoh: BT-08"
                          />
                        </div>

                        <div className="modal-field-group">
                          <label>Laboratorium</label>
                          <select
                            className="modal-select"
                            value={newTestData.lab}
                            onChange={(e) => {
                              const newLab = e.target.value
                              const defaultCat = newLab === 'Bahan Bangunan' 
                                ? 'Bahan Bangunan • Bab 3' 
                                : newLab === 'Mekanika Tanah' 
                                ? 'Mekanika Tanah • Bab 1' 
                                : newLab === 'Mekanika Fluida'
                                ? 'Mekanika Fluida • Bab 1'
                                : 'Bahan Perkerasan • Bab 1'
                              setNewTestData({ ...newTestData, lab: newLab, category: defaultCat })
                            }}
                          >
                            <option value="Bahan Bangunan">Praktikum Bahan Bangunan</option>
                            <option value="Mekanika Tanah">Praktikum Mekanika Tanah</option>
                            <option value="Mekanika Fluida">Praktikum Mekanika Fluida</option>
                            <option value="Bahan Perkerasan">Praktikum Bahan Perkerasan</option>
                          </select>
                        </div>
                      </div>

                      <div className="modal-field-group">
                        <label>Nama Pengujian</label>
                        <input
                          type="text"
                          required
                          className="modal-input"
                          value={newTestData.name}
                          onChange={(e) => setNewTestData({ ...newTestData, name: e.target.value })}
                          placeholder="Contoh: Uji Slump Beton Segar"
                        />
                      </div>

                      <div className="modal-form-grid-2">
                        <div className="modal-field-group">
                          <label>Kategori Bab</label>
                          <input
                            type="text"
                            required
                            className="modal-input"
                            value={newTestData.category}
                            onChange={(e) => setNewTestData({ ...newTestData, category: e.target.value })}
                            placeholder="Contoh: Bahan Bangunan • Bab 3"
                          />
                        </div>

                        <div className="modal-field-group">
                          <label>Standar Acuan (SNI / ASTM)</label>
                          <input
                            type="text"
                            required
                            className="modal-input"
                            value={newTestData.standard}
                            onChange={(e) => setNewTestData({ ...newTestData, standard: e.target.value })}
                            placeholder="Contoh: SNI 1972:2008"
                          />
                        </div>
                      </div>

                      <div className="modal-field-group">
                        <label>Ringkasan Hasil Utama</label>
                        <input
                          type="text"
                          required
                          className="modal-input"
                          value={newTestData.summary}
                          onChange={(e) => setNewTestData({ ...newTestData, summary: e.target.value })}
                          placeholder="Contoh: Nilai Slump = 10.0 cm (Toleransi OK)"
                        />
                      </div>

                      <div className="modal-field-group">
                        <label>Catatan Tambahan Pengujian</label>
                        <textarea
                          className="modal-textarea"
                          rows="3"
                          value={newTestData.notes}
                          onChange={(e) => setNewTestData({ ...newTestData, notes: e.target.value })}
                          placeholder="Catatan kondisi benda uji, beban hancur, atau catatan asisten..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="modal-actions-footer">
                      <button
                        type="button"
                        className="btn-modal-cancel"
                        onClick={handleCloseAddModal}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="btn-modal-submit"
                      >
                        Simpan ke Database
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal Lihat Detail Data Pengujian */}
            {selectedTestDetail && (
              <div className="modal-overlay" onClick={() => setSelectedTestDetail(null)}>
                <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header-row">
                    <div className="modal-title-wrap">
                      <h4>Detail Lembar Data Pengujian</h4>
                      <span>ID: {selectedTestDetail.id} • {selectedTestDetail.lab}</span>
                    </div>
                    <button
                      type="button"
                      className="modal-close-btn"
                      onClick={() => setSelectedTestDetail(null)}
                      title="Tutup dialog"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="modal-form-body">
                    <div className="detail-meta-list">
                      <div className="detail-meta-row">
                        <span className="meta-key">Kode / ID Uji</span>
                        <span className="table-code-chip">{selectedTestDetail.id}</span>
                      </div>
                      <div className="detail-meta-row">
                        <span className="meta-key">Nama Pengujian</span>
                        <strong>{selectedTestDetail.name}</strong>
                      </div>
                      <div className="detail-meta-row">
                        <span className="meta-key">Kategori Bab</span>
                        <span>{selectedTestDetail.category}</span>
                      </div>
                      <div className="detail-meta-row">
                        <span className="meta-key">Standar SNI / ASTM</span>
                        <span className="table-standard-chip">{selectedTestDetail.standard}</span>
                      </div>
                      <div className="detail-meta-row">
                        <span className="meta-key">Hasil Utama</span>
                        <span className={`table-result-chip ${getTestChipClass(selectedTestDetail)}`}>
                          {formatScientificInText(selectedTestDetail.summary)}
                        </span>
                      </div>
                      <div className="detail-meta-row">
                        <span className="meta-key">Waktu Input</span>
                        <span>{selectedTestDetail.time}</span>
                      </div>
                    </div>

                    <div className="modal-field-group" style={{ marginTop: '0.5rem' }}>
                      <label>Catatan Teknis & Verifikasi:</label>
                      <div className="detail-notes-box">
                        {renderDetailNotes(selectedTestDetail.notes)}
                      </div>
                    </div>
                  </div>

                  <div className="modal-actions-footer">
                    <button
                      type="button"
                      className="btn-tbl-calc"
                      style={{ padding: '0.55rem 1rem' }}
                      onClick={() => {
                        const itemToOpen = selectedTestDetail
                        setSelectedTestDetail(null)
                        handleOpenCalculatorFromRecord(itemToOpen)
                      }}
                      title="Buka modul pengujian ini dengan data tersimpan"
                    >
                      Buka & Hitung di Modul
                    </button>
                    <button
                      type="button"
                      className="btn-tbl-delete"
                      style={{ padding: '0.55rem 1rem' }}
                      onClick={() => handleDeleteTest(selectedTestDetail.id)}
                    >
                      Hapus Catatan Ini
                    </button>
                    <button
                      type="button"
                      className="btn-modal-cancel"
                      onClick={() => setSelectedTestDetail(null)}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tombol Floating CTA: Export ke Excel */}
            <button
              type="button"
              className="btn-floating-export fixed bottom-8 right-8 z-50 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg"
              onClick={handleExportToExcel}
              title="Export seluruh riwayat data praktikum ke file Microsoft Excel (.xlsx)"
            >
              <FileSpreadsheet size={19} className="btn-floating-export-icon" />
              <span>Export ke Excel</span>
            </button>
          </div>
        )}
        </div>
      </div>
    )
  }

  // =========================================================================
  // VIEW 2: LANDING PAGE UTAMA (Saat isAppOpen === false)
  // =========================================================================
  return (
    <div className="page-wrapper">
      {/* ================= 1. STICKY NAVBAR ================= */}
      <header className="sticky-navbar">
        <div className="nav-container">
          {/* Logo LabSipil di Kiri */}
          <a href="#beranda" className="navbar-logo" onClick={closeMobileMenu}>
            <img 
              src="/logo-labsipil-baru.png" 
              alt="LabSipil Logo" 
              className="navbar-brand-logo logo-img h-10 w-auto object-contain" 
              style={{ mixBlendMode: 'multiply', objectFit: 'contain' }}
            />
          </a>

          {/* Menu Navigasi Desktop di Kanan (3 Menu Bersih tanpa Dropdown) */}
          <nav className="nav-menu-desktop">
            <a href="#modul-uji" className="nav-item">Modul Uji</a>
            <a href="#cara-kerja" className="nav-item">Cara Kerja</a>
            <a href="#standar" className="nav-item">Standar SNI/ASTM</a>
          </nav>

          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#12345A" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            <a href="#modul-uji" className="mobile-nav-link" onClick={closeMobileMenu}>Modul Uji</a>
            <a href="#cara-kerja" className="mobile-nav-link" onClick={closeMobileMenu}>Cara Kerja</a>
            <a href="#standar" className="mobile-nav-link" onClick={closeMobileMenu}>Standar SNI/ASTM</a>
            <button type="button" className="btn-primary-solid btn-block" onClick={handleOpenApp}>
              Mulai Hitung
            </button>
          </div>
        )}
      </header>

      <main>
        {/* ================= 2. HERO SECTION ================= */}
        <section id="beranda" className="hero-section">
          <div className="container hero-container">
            {/* Rotating Gradient Border Badge */}
            <div className="relative overflow-hidden rounded-full p-[1.5px] inline-flex hero-badge-rotating-container">
              <motion.div
                className="absolute w-[300%] aspect-square hero-rotating-gradient-line"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, #3b82f6 100%)',
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              />
              <div className="bg-blue-50 rounded-full relative z-10 hero-badge-content">
                <span className="pill-dot animate-pulse"></span>
                <span>Sistem Informasi Laboratorium Teknik Sipil</span>
              </div>
            </div>

            {/* Judul H1 Ekstra Tebal */}
            <h1 className="hero-h1">
              Selesaikan Hitungan Lab dan Laporan Praktikum Tanpa Ribet Rumus Manual.
            </h1>

            {/* Deskripsi Singkat */}
            <p className="hero-desc">
              Platform hitung otomatis khusus mahasiswa dan asisten Teknik Sipil. Mulai dari uji bahan, mekanika tanah, hingga beton yang sesuai standar SNI & ASTM.
            </p>

            {/* 1 Tombol Utama di Tengah */}
            <div className="hero-cta-row">
              <button type="button" className="btn-primary-solid btn-lg" onClick={handleOpenApp}>
                <span>Mulai Hitung</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ================= 3. DASHBOARD PREVIEW SCREENSHOT ================= */}
        <section className="preview-section">
          <div className="container">
            <div className="mockup-window h-auto overflow-hidden rounded-2xl shadow-2xl flex flex-col border border-slate-200/80 bg-white" aria-label="Mockup Preview Dasbor LabSipil">
              {/* Window Title Bar (Macbook style) */}
              <div className="mockup-header h-[45px] shrink-0">
                <div className="window-controls">
                  <span className="win-dot dot-close"></span>
                  <span className="win-dot dot-min"></span>
                  <span className="win-dot dot-max"></span>
                </div>
                <div className="url-bar">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="url-text">https://labsipil.vercel.app/</span>
                </div>
                <div className="system-status">
                  <span className="status-indicator"></span>
                  <span>Sistem Online • Monitoring Pengujian</span>
                </div>
              </div>

              {/* Gambar Screenshot Dashboard Statis */}
              <div className="w-full overflow-hidden bg-slate-50 flex items-center justify-center">
                <img 
                  src="/dashboard-preview.png" 
                  alt="Preview Dasbor Aplikasi LabSipil" 
                  className="w-full h-auto object-cover rounded-b-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. BARIS 4 KEUNGGULAN SINGKAT & DARK FEATURE BANNER ================= */}
        <section className="keunggulan-section">
          <div className="container">
            {/* Baris 4 Keunggulan Singkat */}
            <div className="keunggulan-grid">
              <div className="keunggulan-item">
                <div className="keunggulan-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="keunggulan-title">Hitungan Akurat</h4>
                <p className="keunggulan-desc">
                  Kalkulasi parameter agregat, beton, kayu, dan baja bebas salah hitung.
                </p>
              </div>

              <div className="keunggulan-item">
                <div className="keunggulan-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="keunggulan-title">Mudah Divalidasi</h4>
                <p className="keunggulan-desc">
                  Asisten dan dosen bisa mengecek lembar uji praktikum dengan cepat.
                </p>
              </div>

              <div className="keunggulan-item">
                <div className="keunggulan-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <h4 className="keunggulan-title">Grafik Otomatis</h4>
                <p className="keunggulan-desc">
                  Plot kurva semi-logaritmik gradasi butir dan kuat tekan langsung jadi.
                </p>
              </div>

              <div className="keunggulan-item">
                <div className="keunggulan-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2478D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h4 className="keunggulan-title">Data Aman</h4>
                <p className="keunggulan-desc">
                  Seluruh riwayat hitungan praktikum tersimpan rapi dan terstruktur.
                </p>
              </div>
            </div>

            {/* Dark Feature Banner (Target Scroll Anchor 'Standar SNI/ASTM') */}
            <div id="standar" className="dark-feature-banner">
              <div className="dark-banner-left">
                <div className="banner-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>100% Sesuai Standar SNI & ASTM ({allUniqueStandardsList.length} Standar Resmi)</span>
                </div>
                <h2 className="banner-title">
                  Standarisasi Mutu Data Laboratorium Teknik Sipil Indonesia
                </h2>
                <p className="banner-text">
                  Formula kalkulasi, toleransi pengujian, faktor konversi umur bahan, hingga batas amplop gradasi agregat dirancang mengacu ketat pada regulasi Badan Standardisasi Nasional (BSN) dan standar ASTM International.
                </p>
                <div className="banner-meta-summary">
                  <div className="banner-meta-item">
                    <strong>{totalAllModulesCount} Modul</strong>
                    <span>Praktikum Resmi</span>
                  </div>
                  <div className="banner-meta-item">
                    <strong>{allUniqueStandardsList.length} Standar</strong>
                    <span>SNI & ASTM Terpadu</span>
                  </div>
                  <div className="banner-meta-item">
                    <strong>{dynamicStandardCategories.length} Kategori</strong>
                    <span>Materi Standarisasi</span>
                  </div>
                </div>
              </div>

              <div className="dark-banner-right">
                {dynamicStandardCategories.map((cat) => (
                  <div key={cat.num} className="banner-point-card">
                    <div className="point-card-header">
                      <div className="point-card-title-row">
                        <span className="point-number-badge">{cat.num}</span>
                        <h3 className="point-title">{cat.title}</h3>
                      </div>
                      <span className="point-category-tag">{cat.badgeGroup}</span>
                    </div>
                    <div className={`point-standards-tags ${cat.standards.length > 6 ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-1.5'}`}>
                      {cat.standards.map((std) => (
                        <span key={std} className="std-badge-pill">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. SECTION ALUR PRAKTIKUM (5-STEP HORIZONTAL STEPPER) ================= */}
        <section id="cara-kerja" className="stepper-section">
          <div className="container">
            <div className="section-title-wrap">
              <span className="section-kicker">SISTEM KERJA LABORATORIUM</span>
              <h2 className="section-heading">Alur Pengolahan Data Praktikum Digital</h2>
              <p className="section-subtext">
                Transisi alur kerja praktikum manual ke platform digital terstandarisasi hanya dalam lima langkah terukur.
              </p>
            </div>

            {/* 5-Step Horizontal Stepper */}
            <div className="stepper-container">
              <div className="stepper-line" aria-hidden="true"></div>

              <div className="step-item">
                <div className="step-circle">1</div>
                <div className="step-card">
                  <h4 className="step-title">Input Sampel</h4>
                  <p className="step-desc">
                    Mahasiswa menginput dimensi benda uji, bobot basah, dan kode spesimen ke dalam formulir tervalidasi.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-circle">2</div>
                <div className="step-card">
                  <h4 className="step-title">Pengujian Lab</h4>
                  <p className="step-desc">
                    Pelaksanaan uji lapangan: pembacaan dial gauge, berat saringan agregat, atau gaya tekan mesin UTM.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-circle">3</div>
                <div className="step-card">
                  <h4 className="step-title">Kalkulasi Otomatis</h4>
                  <p className="step-desc">
                    Mesin komputasi menghitung tegangan, regresi kadar air, gradasi butiran, dan grafik hasil dalam hitungan detik.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-circle">4</div>
                <div className="step-card">
                  <h4 className="step-title">Verifikasi Asisten</h4>
                  <p className="step-desc">
                    Asisten laboratorium meninjau validitas data, memberikan catatan revisi, atau menyetujui lembar kerja digital.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-circle">5</div>
                <div className="step-card">
                  <h4 className="step-title">Export Excel</h4>
                  <p className="step-desc">
                    Unduh hasil rekapitulasi hitungan dan lembar data pengujian ke format spreadsheet Excel untuk lampiran laporan resmi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. SECTION GRID KARTU FITUR / MODUL UJI ================= */}
        <section id="modul-uji" className="feature-grid-section">
          <div className="container">
            <div className="section-title-wrap">
              <span className="section-kicker">MODUL</span>
              <h2 className="section-heading">Modul Praktikum Siap Pakai</h2>
              <p className="section-subtext">
                Katalog komputasi resmi Praktikum Bahan Bangunan, Mekanika Tanah, Mekanika Fluida, dan Bahan Perkerasan Teknik Sipil.
              </p>
            </div>

            {/* Segmented Switcher Utama (Tingkat 1) */}
            <div className="lab-segmented-switcher-container">
              <div 
                className="lab-segmented-switcher grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl mx-auto p-2 rounded-2xl w-full" 
                role="radiogroup" 
                aria-label="Pilih Kategori Laboratorium"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedLab === 'bahan'}
                  className={`lab-segment-btn ${selectedLab === 'bahan' ? 'active' : ''}`}
                  onClick={() => handleSelectLab('bahan')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22h20M12 2L2 22M12 2l10 20M7 12h10" />
                  </svg>
                  <span>Praktikum Bahan Bangunan (19 Uji)</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedLab === 'tanah'}
                  className={`lab-segment-btn ${selectedLab === 'tanah' ? 'active' : ''}`}
                  onClick={() => handleSelectLab('tanah')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>Praktikum Mekanika Tanah (12 Uji)</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedLab === 'fluida'}
                  className={`lab-segment-btn ${selectedLab === 'fluida' ? 'active' : ''}`}
                  onClick={() => handleSelectLab('fluida')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                  <span>Praktikum Mekanika Fluida (5 Uji)</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedLab === 'perkerasan'}
                  className={`lab-segment-btn ${selectedLab === 'perkerasan' ? 'active' : ''}`}
                  onClick={() => handleSelectLab('perkerasan')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="3" x2="12" y2="9" />
                    <line x1="12" y1="15" x2="12" y2="21" />
                  </svg>
                  <span>Praktikum Bahan Perkerasan (10 Uji)</span>
                </button>
              </div>
            </div>

            {/* Tab Filter Kategori (Pill Tabs - Tingkat 2) */}
            <div className="category-tabs-container" role="tablist" aria-label="Filter Kategori Modul Praktikum">
              {(labTabsData[selectedLab] || []).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategoryTab === tab.id}
                  className={`category-pill-tab ${activeCategoryTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveCategoryTab(tab.id)}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Grid Kartu Modul */}
            <div className="six-cards-grid">
              {(labModulesData[selectedLab]?.[activeCategoryTab] || []).map((item) => (
                <div 
                  key={item.id} 
                  className="feature-card" 
                  onClick={(e) => handleOpenModuleCalculator(item, e)} 
                  style={{ cursor: 'pointer' }} 
                  title={`Buka ${item.title}`}
                >
                  <div className="card-top-row">
                    <div className="feature-icon-box">
                      {renderModuleIcon(item.icon)}
                    </div>
                    <span className="card-code-pill">{item.code}</span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-standard-tag">{item.badge}</span>
                  <p className="card-desc">{item.desc}</p>
                  <div className="card-action-bar">
                    <span>Mulai Hitung Modul</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION SECTION ================= */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-title">Siap Menyelesaikan Laporan Praktikum Tanpa Rumus Manual?</h2>
              <p className="cta-desc">
                Otomasi kalkulasi uji bahan, kurva gradasi, serta parameter mekanika tanah, kayu, dan baja dengan kepatuhan penuh terhadap standar SNI & ASTM.
              </p>
              <div className="cta-actions">
                <button type="button" className="btn-primary-solid btn-lg" onClick={handleOpenApp}>
                  Mulai Hitung Sekarang →
                </button>
                <a href="#standar" className="btn-ghost-white btn-lg">
                  Pelajari Standar SNI
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="container footer-content-grid">
          <div className="footer-left">
            <div className="footer-brand">
              <img 
                src="/logo-labsipil-baru.png" 
                alt="LabSipil Logo" 
                className="footer-logo-img h-14 md:h-16 w-auto object-contain mb-6 brightness-0 invert" 
                style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
              />
            </div>
            <p className="footer-tagline text-base md:text-lg leading-relaxed md:leading-7 text-slate-300 text-gray-300 max-w-md">
              Sistem Informasi & Pengolahan Data Praktikum Laboratorium Teknik Sipil. 
              Membangun efisiensi, akurasi, dan standarisasi pendidikan teknik di Indonesia.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-column-title text-white text-slate-100">Navigasi Halaman</h4>
            <ul>
              <li><a href="#beranda" className="footer-link text-gray-300 text-slate-400 hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#modul-uji" className="footer-link text-gray-300 text-slate-400 hover:text-white transition-colors">Modul Praktikum</a></li>
              <li><a href="#cara-kerja" className="footer-link text-gray-300 text-slate-400 hover:text-white transition-colors">Cara Kerja</a></li>
              <li><a href="#standar" className="footer-link text-gray-300 text-slate-400 hover:text-white transition-colors">Standar SNI/ASTM</a></li>
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=feddymarchdava@gmail.com&su=Feedback%20Pengguna%20Web%20LabSipil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link text-gray-300 text-slate-400 hover:text-white transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-column-title text-white text-slate-100">Standar Acuan</h4>
            <ul>
              {dynamicFooterStandards.map((item) => (
                <li key={item.id}>
                  <a 
                    href="#standar" 
                    title={`${item.label} • ${item.codes} (${item.hint})`}
                    className="footer-link text-gray-300 text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar border-t border-slate-700 border-white/10">
          <div className="container bottom-inner">
            <p className="footer-copyright text-slate-400">&copy; {new Date().getFullYear()} LabSipil.</p>
            <p className="footer-compliance text-slate-400">Bersih • Minimalis • Bebas Rumus Manual</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
