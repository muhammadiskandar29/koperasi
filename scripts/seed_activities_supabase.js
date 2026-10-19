import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Baca .env
const envContent = fs.readFileSync('.env', 'utf-8')
const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
  if (match) {
    let value = match[2] || ''
    value = value.trim().replace(/^['"](.*)['"]$/, '$1')
    env[match[1]] = value
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Kredensial Supabase tidak ditemukan di .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const initialActivities = [
  {
    id: 1,
    type: 'video',
    title: 'Land Clearing & Perataan Lahan Produktif Cikawung',
    category: 'Pembukaan Lahan',
    media_url: '/assets/images/WhatsApp Video 2026-10-12 at 08.29.50.mp4',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg',
    date: '10 Oktober 2026',
    time: '09:13 WIB',
    location: 'Jalan Tanpa Nama, Desa Cikawung',
    district: 'Kec. Terisi',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: '284° W - 290° W (Index: 132)',
    altitude: '89.0 - 90.0 msnm',
    equipment: 'Excavator Kobelco & Wheel Loader',
    description: 'Dokumentasi video manuver alat berat Wheel Loader dan Excavator Kobelco dalam meratakan kontur tanah perbukitan dan membersihkan semak belukar pada blok perluasan lahan agrikultur KMLC di wilayah Cikawung.'
  },
  {
    id: 2,
    type: 'video',
    title: 'Galian Terasering & Konstruksi Embung Tadah Hujan',
    category: 'Infrastruktur Lahan',
    media_url: '/assets/images/WhatsApp Video 2026-10-12 at 08.29.51.mp4',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg',
    date: '06 Oktober 2026',
    time: '11:28 WIB',
    location: 'Tegal Biting, Desa Sanca',
    district: 'Kec. Gantar',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: 'Tegal Biting Area',
    altitude: '92.0 msnm',
    equipment: 'Excavator Kobelco & Armada Lapangan',
    description: 'Peninjauan langsung oleh pimpinan pengurus KMLC terhadap pekerjaan pengerukan lereng tanah untuk terasering anti-erosi dan persiapan kolam embung guna menjamin suplai cadangan air tanaman saat musim kemarau.'
  },
  {
    id: 3,
    type: 'image',
    title: 'Pembersihan & Penataan Akses Jalan Angkut Pertanian',
    category: 'Pembukaan Lahan',
    media_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg',
    date: '10 Oktober 2026',
    time: '09:19 WIB',
    location: 'Jalan Raya Buahdua',
    district: 'Kec. Buahdua',
    regency: 'Kab. Sumedang, Jawa Barat',
    coordinates: '275° W (Index: 133)',
    altitude: '93.0 msnm',
    equipment: 'Wheel Loader & Kobelco Excavator',
    description: 'Pekerjaan pemindahan material tanah dan perataan jalan akses perbatasan Sumedang - Indramayu guna membuka aksesibilitas kendaraan logistik dan alat mesin pertanian (alsintan) menuju areal garapan.'
  },
  {
    id: 4,
    type: 'image',
    title: 'Rapat Musyawarah Koordinasi Pengurus & Kelompok Tani Hutan',
    category: 'Rapat & Koordinasi',
    media_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.51.jpeg',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.51.jpeg',
    date: '08 Oktober 2026',
    time: '09:48 WIB',
    location: 'Kantor Sekretariat KMLC',
    district: 'Kec. Terisi',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: 'Sekretariat Koperasi KMLC',
    altitude: '85.0 msnm',
    equipment: 'Ketua, Pengurus & Anggota KTH',
    description: 'Rapat kerja teknis di kantor koperasi yang dihadiri ketua, jajaran pengurus, tim lapangan, dan perwakilan petani hutan membahas jadwal tanam, pembagian blok garapan, serta distribusi sarana produksi pertanian.'
  },
  {
    id: 5,
    type: 'image',
    title: 'Survei Lapangan & Pengecekan Pipa Irigasi Perkebunan',
    category: 'Survei & Monitoring',
    media_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52.jpeg',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52.jpeg',
    date: '01 Oktober 2026',
    time: '14:35 WIB',
    location: 'Kawasan Perkebunan KMLC',
    district: 'Kec. Terisi / Gantar',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: '-6.625770, +107.998556 (325° NW)',
    altitude: '90.0 msnm',
    equipment: 'Ketua KMLC (Unang Herman), Mitra Keamanan, Petani',
    description: 'Kunjungan kerja lapangan pimpinan koperasi bersama perwakilan mitra aparat keamanan dan anggota petani binaan meninjau vegetasi pohon yang mulai ditanam serta instalasi jaringan pipa pengairan air.'
  },
  {
    id: 6,
    type: 'image',
    title: 'Inspeksi Teknis Titik Geotagging & Batas Wilayah Garapan',
    category: 'Survei & Monitoring',
    media_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52 (1).jpeg',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52 (1).jpeg',
    date: '01 Oktober 2026',
    time: '14:35 WIB',
    location: 'Kawasan Penyangga Lahan Hutan',
    district: 'Kec. Terisi',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: '-6.625770, +107.998556 (325° NW)',
    altitude: '91.0 msnm',
    equipment: 'Tim Pemetaan & Aparat Mitra',
    description: 'Verifikasi titik koordinat GPS dan batas wilayah kemitraan kehutanan sosial untuk memastikan aspek legalitas serta keamanan pemanfaatan lahan secara berkelanjutan.'
  },
  {
    id: 7,
    type: 'image',
    title: 'Konsolidasi & Kebersamaan Anggota Tani di Lokasi Proyek',
    category: 'Survei & Monitoring',
    media_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52 (2).jpeg',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.52 (2).jpeg',
    date: '01 Oktober 2026',
    time: '14:35 WIB',
    location: 'Blok Perkebunan Mandiri',
    district: 'Kec. Terisi',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: 'Kawasan Lahan KMLC',
    altitude: '90.0 msnm',
    equipment: 'Petani & Tim Pendamping Lapangan',
    description: 'Dokumentasi kebersamaan antara pengurus koperasi dan anggota kelompok tani di tengah hamparan lahan terkelola, mencerminkan semangat gotong royong dan optimisme swasembada pangan.'
  },
  {
    id: 8,
    type: 'image',
    title: 'Panen Raya Komoditas Jagung Hibrida Musim Pertama',
    category: 'Panen Raya',
    media_url: '/assets/images/harvest.jpg',
    thumbnail_url: '/assets/images/harvest.jpg',
    date: '16 Oktober 2026',
    time: '10:00 WIB',
    location: 'Lahan Inti Blok A Cikawung',
    district: 'Kec. Terisi',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: 'Sentra Pertanian Cikawung',
    altitude: '88.0 msnm',
    equipment: 'Tim Pemanen & Mitra Off-taker',
    description: 'Hasil nyata optimalisasi lahan: panen raya komoditas jagung berbobot tinggi yang siap didistribusikan ke jaringan rantai pasok industri dan pasar regional.'
  }
]

async function migrate() {
  console.log('--- Memulai Migrasi Data Dokumentasi Kegiatan ke Supabase ---')
  
  // 1. Coba insert ke koperasi_activities jika ada
  let tableSuccess = false
  try {
    const { data, error } = await supabase.from('koperasi_activities').upsert(initialActivities).select()
    if (!error && data) {
      console.log('✓ Berhasil migrasi ke tabel koperasi_activities:', data.length, 'data')
      tableSuccess = true
    }
  } catch (e) {
    // Abaikan jika tabel belum ada di public schema
  }

  // 2. Simpan ke koperasi_content dengan ID 'activities'
  const { data, error } = await supabase.from('koperasi_content').upsert({
    id: 'activities',
    payload: initialActivities,
    updated_at: new Date().toISOString()
  }).select()

  if (error) {
    console.error('✗ Gagal migrasi ke koperasi_content:', error.message)
    process.exit(1)
  }

  console.log('✓ Sukses migrasi ke Supabase (koperasi_content -> activities)!')
  console.log('Jumlah kegiatan tersimpan:', initialActivities.length)
}

migrate()
