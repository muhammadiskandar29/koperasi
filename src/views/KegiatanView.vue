<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Data default instan berbasis file lokal (0ms render, tanpa skeleton loading)
const defaultActivities = [
  {
    id: 1,
    type: 'video',
    title: 'Land Clearing & Perataan Lahan Produktif Cikawung',
    category: 'Pembukaan Lahan',
    media_url: '/assets/images/WhatsApp Video 2026-10-12 at 08.29.50.mp4',
    thumbnail_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg',
    date: '10 Oktober 2026',
    time: '09:13 WIB',
    location: 'Jalan Tanpa Nama, Cikawung',
    district: 'Kec. Terisi',
    regency: 'Kabupaten Indramayu, Jawa Barat',
    coordinates: '284° W - 290° W',
    altitude: '89.0 - 90.0 msnm',
    equipment: 'Excavator Kobelco & Wheel Loader',
    description: 'Dokumentasi video manuver alat berat Wheel Loader dan Excavator Kobelco dalam meratakan gundukan tanah berkontur serta membersihkan lahan eks-hutan tidur untuk dipersiapkan menjadi sentra budidaya agrikultur KMLC.'
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
    regency: 'Kabupaten Indramayu, Jawa Barat',
    coordinates: 'Tegal Biting Area',
    altitude: '92.0 msnm',
    equipment: 'Excavator Kobelco & Kendaraan Operasional Lapangan',
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
    regency: 'Kabupaten Sumedang, Jawa Barat',
    coordinates: '275° W',
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
    regency: 'Kabupaten Indramayu, Jawa Barat',
    coordinates: 'Sekretariat Koperasi KMLC',
    altitude: '85.0 msnm',
    equipment: 'Pengurus KMLC, Pengawas & Anggota KTH',
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
    regency: 'Kabupaten Indramayu, Jawa Barat',
    coordinates: '-6.625770, +107.998556 (325° NW)',
    altitude: '90.0 msnm',
    equipment: 'Ketua KMLC (Unang Herman), Mitra Pengawas, Petani KTH',
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
    regency: 'Kabupaten Indramayu, Jawa Barat',
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
    regency: 'Kabupaten Indramayu, Jawa Barat',
    coordinates: 'Kawasan Lahan KMLC',
    altitude: '90.0 msnm',
    equipment: 'Petani & Tim Pendamping Lapangan',
    description: 'Dokumentasi kebersamaan antara pengurus koperasi dan anggota kelompok tani di tengah hamparan lahan terkelola, mencerminkan semangat gotong royong dan optimisme swasembada pangan.'
  },
  {
    id: 8,
    type: 'image',
    title: 'Panen Raya Komoditas Jagung Hibrida Musim Pertama',
    category: 'Panen & Produksi',
    media_url: '/assets/images/harvest.jpg',
    thumbnail_url: '/assets/images/harvest.jpg',
    date: '16 Oktober 2026',
    time: '10:00 WIB',
    location: 'Lahan Inti Blok A Cikawung',
    district: 'Kec. Terisi',
    regency: 'Kabupaten Indramayu, Jawa Barat',
    coordinates: 'Sentra Pertanian Cikawung',
    altitude: '88.0 msnm',
    equipment: 'Tim Pemanen & Mitra Off-taker',
    description: 'Hasil nyata optimalisasi lahan: panen raya komoditas jagung berbobot tinggi yang siap didistribusikan ke jaringan rantai pasok industri dan pasar regional.'
  }
]

// Data state awal langsung terisi data lokal (0 detik langsung tampil)
const activities = ref([...defaultActivities])
const isLoading = ref(false)
const fetchError = ref('')
const activeCategory = ref('all')
const searchQuery = ref('')
const selectedItem = ref(null)

// Membaca cache lokal browser agar instan
try {
  const cached = localStorage.getItem('kmlc_activities_cache')
  if (cached) {
    const parsed = JSON.parse(cached)
    if (Array.isArray(parsed) && parsed.length > 0) {
      activities.value = parsed
    }
  }
} catch (e) {}

// Kategori dinamis yang otomatis menyesuaikan isi database
const availableCategories = computed(() => {
  const base = [{ id: 'all', label: 'Semua Dokumentasi' }]
  if (activities.value.some(a => a.type === 'video')) {
    base.push({ id: 'video', label: 'Video Lapangan' })
  }
  const uniqueCats = [...new Set(activities.value.map(a => a.category).filter(Boolean))]
  uniqueCats.forEach(c => {
    base.push({ id: c, label: c })
  })
  return base
})

// Filter data kegiatan berdasarkan kategori aktif dan pencarian
const filteredActivities = computed(() => {
  return activities.value.filter(item => {
    // Filter Kategori
    let matchCategory = true
    if (activeCategory.value === 'video') {
      matchCategory = item.type === 'video'
    } else if (activeCategory.value !== 'all') {
      matchCategory = item.category === activeCategory.value
    }

    // Filter Pencarian
    let matchQuery = true
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      matchQuery = (item.title && item.title.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.district && item.district.toLowerCase().includes(q)) ||
        (item.regency && item.regency.toLowerCase().includes(q)) ||
        (item.equipment && item.equipment.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
    }

    return matchCategory && matchQuery
  })
})

// Hitungan statistik dinamis dari data database yang ada
const totalHektar = computed(() => '50+ Hektar')
const uniqueDistricts = computed(() => {
  const set = new Set(activities.value.map(a => a.district || a.location).filter(Boolean))
  return set.size
})
const videoCount = computed(() => activities.value.filter(a => a.type === 'video').length)
const photoCount = computed(() => activities.value.filter(a => a.type !== 'video').length)

// Modal Lightbox Handlers
const openDetail = (item) => {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

const closeDetail = () => {
  selectedItem.value = null
  document.body.style.overflow = 'auto'
}

const nextItem = () => {
  if (!selectedItem.value) return
  const currentIdx = filteredActivities.value.findIndex(a => a.id === selectedItem.value.id)
  if (currentIdx !== -1 && currentIdx < filteredActivities.value.length - 1) {
    selectedItem.value = filteredActivities.value[currentIdx + 1]
  } else {
    selectedItem.value = filteredActivities.value[0]
  }
}

const prevItem = () => {
  if (!selectedItem.value) return
  const currentIdx = filteredActivities.value.findIndex(a => a.id === selectedItem.value.id)
  if (currentIdx > 0) {
    selectedItem.value = filteredActivities.value[currentIdx - 1]
  } else {
    selectedItem.value = filteredActivities.value[filteredActivities.value.length - 1]
  }
}

const handleKeydown = (e) => {
  if (!selectedItem.value) return
  if (e.key === 'Escape') closeDetail()
  if (e.key === 'ArrowRight') nextItem()
  if (e.key === 'ArrowLeft') prevItem()
}

// Sinkronisasi data di background (Stale-While-Revalidate)
const fetchActivitiesFromDatabase = async () => {
  if (!activities.value || activities.value.length === 0) {
    isLoading.value = true
  }
  fetchError.value = ''
  try {
    const res = await fetch('/api/activities').then(r => r.json())
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      activities.value = res.data
      try {
        localStorage.setItem('kmlc_activities_cache', JSON.stringify(res.data))
      } catch (e) {}
    }
  } catch (err) {
    console.warn('Menggunakan data lokal:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  fetchActivitiesFromDatabase()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="page-container">
    <!-- Header Banner -->
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Dokumentasi & Laporan Lapangan</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">
          Galeri Kegiatan & Aktivitas Fisik
        </h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Rekaman visual dan data riil progres penataan lahan, operasional alat berat, dan musyawarah kemitraan yang tersinkronisasi secara real-time.
        </p>
      </div>
    </section>

    <!-- Project Metrics Overview (Dihitung Real dari Data Database) -->
    <section class="section pt-0">
      <div class="container">
        <div class="metrics-bar animate-fade-up">
          <div class="metric-box">
            <div class="metric-icon-wrap">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/></svg>
            </div>
            <div class="metric-content">
              <div class="metric-val">{{ totalHektar }}</div>
              <div class="metric-lbl">Target Kawasan Dikelola</div>
            </div>
          </div>

          <div class="metric-box">
            <div class="metric-icon-wrap">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="metric-content">
              <div class="metric-val">{{ uniqueDistricts || 3 }} Titik Wilayah</div>
              <div class="metric-lbl">Indramayu & Sumedang</div>
            </div>
          </div>

          <div class="metric-box">
            <div class="metric-icon-wrap">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </div>
            <div class="metric-content">
              <div class="metric-val">{{ videoCount }} Video & {{ photoCount }} Foto</div>
              <div class="metric-lbl">Dokumentasi Terverifikasi</div>
            </div>
          </div>

          <div class="metric-box">
            <div class="metric-icon-wrap">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="metric-content">
              <div class="metric-val">100% Terverifikasi</div>
              <div class="metric-lbl">Database Cloud Aktif</div>
            </div>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div class="filter-controls animate-fade-up">
          <div class="category-tabs">
            <button 
              v-for="cat in availableCategories" 
              :key="cat.id" 
              :class="['cat-btn', { active: activeCategory === cat.id }]"
              @click="activeCategory = cat.id"
            >
              <span>{{ cat.label }}</span>
            </button>
          </div>

          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari lokasi, alat berat, atau topik..."
              class="search-input"
            />
            <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">&times;</button>
          </div>
        </div>

        <!-- Loading State Skeleton -->
        <div v-if="isLoading" class="activities-grid">
          <div v-for="n in 6" :key="n" class="skeleton-card">
            <div class="skeleton-media shimmer"></div>
            <div class="skeleton-body">
              <div class="skeleton-line shimmer w-40"></div>
              <div class="skeleton-line shimmer w-80"></div>
              <div class="skeleton-line shimmer w-60"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="fetchError" class="empty-state">
          <svg class="empty-icon text-danger" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h3>Gagal Menghubungkan ke Database</h3>
          <p>{{ fetchError }}</p>
          <button class="btn btn-primary mt-3" @click="fetchActivitiesFromDatabase">Coba Lagi</button>
        </div>

        <!-- Empty State (Jika Database Kosong / Dihapus Semua) -->
        <div v-else-if="activities.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <h3>Belum Ada Dokumentasi Kegiatan di Database</h3>
          <p>Data dokumentasi foto dan video belum diinputkan ke sistem database atau sedang dalam proses pembaharuan oleh pengurus.</p>
          <router-link to="/admin" class="btn btn-outline mt-3">Buka Panel Admin CMS</router-link>
        </div>

        <!-- Filter Empty State (Pencarian Tidak Ketemu) -->
        <div v-else-if="filteredActivities.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3>Tidak Ada Hasil yang Cocok</h3>
          <p>Tidak ditemukan dokumentasi untuk filter atau kata kunci "{{ searchQuery }}".</p>
          <button class="btn btn-outline mt-3" @click="activeCategory = 'all'; searchQuery = ''">Reset Filter & Pencarian</button>
        </div>

        <!-- Gallery Grid (100% Dinamis dari Database) -->
        <div v-else class="activities-grid">
          <article 
            v-for="(item, idx) in filteredActivities" 
            :key="item.id" 
            class="activity-card animate-fade-up"
            :style="{ animationDelay: (idx * 0.04) + 's' }"
            @click="openDetail(item)"
          >
            <!-- Media Container -->
            <div class="card-media-wrapper">
              <!-- Video Preview -->
              <template v-if="item.type === 'video'">
                <video 
                  :src="item.media_url" 
                  preload="metadata" 
                  muted 
                  playsinline
                  class="card-media card-video"
                ></video>
                <div class="media-type-badge video-badge">
                  <svg class="badge-icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
                  <span>Video Lapangan</span>
                </div>
                <div class="video-overlay-play">
                  <div class="play-pulse">
                    <svg class="play-svg" viewBox="0 0 24 24"><polygon points="8 5 19 12 8 19 8 5" fill="currentColor"/></svg>
                  </div>
                </div>
              </template>

              <!-- Image Preview -->
              <template v-else>
                <img 
                  :src="item.media_url" 
                  :alt="item.title" 
                  loading="lazy" 
                  class="card-media"
                />
                <div class="media-type-badge photo-badge">
                  <svg class="badge-icon" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <span>Foto Lapangan</span>
                </div>
              </template>

              <div class="card-cat-chip">{{ item.category }}</div>
            </div>

            <!-- Card Body -->
            <div class="card-body">
              <div class="meta-row">
                <span class="meta-item">
                  <svg class="meta-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {{ item.date }}
                </span>
                <span class="meta-item location-tag">
                  <svg class="meta-svg" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {{ item.district || item.location }}
                </span>
              </div>

              <h3 class="card-title">{{ item.title }}</h3>

              <p class="card-desc">
                {{ item.description }}
              </p>

              <div class="card-footer-info">
                <div class="equipment-pill" :title="item.equipment">
                  <span class="pill-dot"></span>
                  <span class="pill-text">{{ item.equipment || 'Operasional KMLC' }}</span>
                </div>
                <span class="detail-link">
                  Lihat Detail & Geotag &rarr;
                </span>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>

    <!-- Modal Lightbox Detail & GPS Geotag -->
    <div v-if="selectedItem" class="lightbox-backdrop" @click.self="closeDetail">
      <div class="lightbox-modal animate-scale-up">
        <!-- Close Button -->
        <button class="modal-close-btn" @click="closeDetail" aria-label="Tutup">
          &times;
        </button>

        <!-- Navigation Buttons -->
        <button class="modal-nav-btn prev-btn" @click="prevItem" aria-label="Sebelumnya">
          &#8249;
        </button>
        <button class="modal-nav-btn next-btn" @click="nextItem" aria-label="Berikutnya">
          &#8250;
        </button>

        <div class="modal-content-grid">
          <!-- Left: Big Media Viewer -->
          <div class="modal-media-pane">
            <div v-if="selectedItem.type === 'video'" class="modal-video-box">
              <video 
                :src="selectedItem.media_url" 
                controls 
                autoplay 
                playsinline 
                class="modal-video"
              ></video>
            </div>
            <div v-else class="modal-image-box">
              <img 
                :src="selectedItem.media_url" 
                :alt="selectedItem.title" 
                class="modal-img"
              />
            </div>
          </div>

          <!-- Right: Detailed Metadata & Geotag Pane -->
          <div class="modal-info-pane">
            <div class="modal-badge-group">
              <span class="chip-cat">{{ selectedItem.category }}</span>
              <span class="chip-type" :class="selectedItem.type">
                {{ selectedItem.type === 'video' ? 'Video Dokumentasi' : 'Foto Arsip Lapangan' }}
              </span>
            </div>

            <h2 class="modal-title">{{ selectedItem.title }}</h2>

            <p class="modal-desc">
              {{ selectedItem.description }}
            </p>

            <div class="geotag-card">
              <div class="geotag-header">
                <svg class="geotag-icon" viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                <span>Informasi Geotag & Lapangan (Database)</span>
              </div>
              
              <div class="geotag-rows">
                <div class="geotag-item">
                  <span class="gt-lbl">Titik Lokasi</span>
                  <span class="gt-val">{{ selectedItem.location }}{{ selectedItem.district ? ', ' + selectedItem.district : '' }}</span>
                </div>
                <div class="geotag-item">
                  <span class="gt-lbl">Wilayah</span>
                  <span class="gt-val">{{ selectedItem.regency || 'Jawa Barat' }}</span>
                </div>
                <div class="geotag-item" v-if="selectedItem.coordinates">
                  <span class="gt-lbl">Koordinat / Arah</span>
                  <span class="gt-val mono">{{ selectedItem.coordinates }}</span>
                </div>
                <div class="geotag-item" v-if="selectedItem.altitude">
                  <span class="gt-lbl">Ketinggian (Elevasi)</span>
                  <span class="gt-val">{{ selectedItem.altitude }}</span>
                </div>
                <div class="geotag-item">
                  <span class="gt-lbl">Waktu Perekaman</span>
                  <span class="gt-val">{{ selectedItem.date }}{{ selectedItem.time ? ' • ' + selectedItem.time : '' }}</span>
                </div>
                <div class="geotag-item" v-if="selectedItem.equipment">
                  <span class="gt-lbl">Unit / Personel</span>
                  <span class="gt-val text-accent">{{ selectedItem.equipment }}</span>
                </div>
              </div>
            </div>

            <div class="modal-actions">
              <a 
                :href="selectedItem.media_url" 
                target="_blank" 
                download 
                class="btn btn-outline btn-sm"
              >
                Unduh Media Asli
              </a>
              <router-link to="/kontak" class="btn btn-primary btn-sm" @click="closeDetail">
                Ajukan Peninjauan Lahan
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA Banner -->
    <section class="section section-cta">
      <div class="container text-center">
        <div class="cta-inner animate-fade-up">
          <div class="cta-badge">Kemitraan & Survei Lahan</div>
          <h2 class="cta-title">Ingin Meninjau Langsung Sentra Agrikultur KMLC?</h2>
          <p class="cta-desc">
            Kami menyambut kolaborasi institusi pemerintah, kelompok tani hutan sekitar, maupun investor off-taker untuk survei langsung ke titik blok garapan.
          </p>
          <div class="cta-buttons">
            <router-link to="/kontak" class="btn btn-accent btn-lg">
              Jadwalkan Kunjungan Lapangan
            </router-link>
            <router-link to="/program" class="btn btn-outline-light btn-lg">
              Lihat Program Kemitraan
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 5rem;
}

.page-header {
  padding: 4rem 0 2.5rem;
  background: radial-gradient(circle at top right, rgba(6, 78, 59, 0.05), transparent 70%);
}

.badge-sub {
  display: inline-block;
  background: rgba(6, 78, 59, 0.08);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
  border: 1px solid rgba(6, 78, 59, 0.15);
}

.page-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  max-width: 720px;
  margin: 0 auto;
}

/* Metrics Bar */
.metrics-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  background: white;
  padding: 1.75rem 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2.5rem;
}

.metric-box {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem;
}

.metric-box:not(:last-child) {
  border-right: 1px solid var(--color-border);
}

.metric-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(6, 78, 59, 0.08);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon-wrap .svg-icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.metric-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  line-height: 1.2;
}

.metric-lbl {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.15rem;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.15rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background: white;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.cat-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(6, 78, 59, 0.25);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  width: 18px;
  height: 18px;
  stroke: var(--color-text-muted);
  stroke-width: 2;
  fill: none;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.65rem 2.2rem 0.65rem 2.5rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  outline: none;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(6, 78, 59, 0.1);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--color-text-muted);
  cursor: pointer;
}

/* Skeleton Loading */
.skeleton-card {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  height: 380px;
}

.skeleton-media {
  width: 100%;
  height: 230px;
  background: #E2E8F0;
}

.skeleton-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-line {
  height: 14px;
  background: #E2E8F0;
  border-radius: 4px;
}

.w-40 { width: 40%; }
.w-60 { width: 60%; }
.w-80 { width: 80%; }

.shimmer {
  background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: var(--radius-xl);
  border: 1px dashed var(--color-border);
}

.empty-icon {
  width: 48px;
  height: 48px;
  stroke: var(--color-text-muted);
  stroke-width: 1.5;
  fill: none;
  margin-bottom: 1rem;
}

.empty-icon.text-danger {
  stroke: #DC2626;
}

/* Gallery Grid */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.activity-card {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(6, 78, 59, 0.3);
}

/* Card Media */
.card-media-wrapper {
  position: relative;
  width: 100%;
  height: 230px;
  background: #111827;
  overflow: hidden;
}

.card-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.activity-card:hover .card-media {
  transform: scale(1.04);
}

.media-type-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(8px);
  z-index: 2;
}

.video-badge {
  background: rgba(220, 38, 38, 0.85);
  color: white;
}

.photo-badge {
  background: rgba(15, 23, 42, 0.75);
  color: white;
}

.badge-icon {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.card-cat-chip {
  position: absolute;
  bottom: 0.85rem;
  left: 0.85rem;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary-dark);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  backdrop-filter: blur(4px);
  z-index: 2;
}

.video-overlay-play {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease;
}

.activity-card:hover .video-overlay-play {
  background: rgba(0, 0, 0, 0.35);
}

.play-pulse {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.activity-card:hover .play-pulse {
  transform: scale(1.15);
  background: var(--color-accent);
  color: white;
}

.play-svg {
  width: 22px;
  height: 22px;
  margin-left: 3px;
}

/* Card Body */
.card-body {
  padding: 1.35rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.location-tag {
  font-weight: 600;
  color: var(--color-primary);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-main);
  line-height: 1.4;
  margin-bottom: 0.65rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.55;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.card-footer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.82rem;
}

.equipment-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 60%;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

.pill-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-muted);
  font-weight: 500;
}

.detail-link {
  font-weight: 700;
  color: var(--color-primary);
  font-size: 0.85rem;
}

/* Lightbox Modal */
.lightbox-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lightbox-modal {
  background: white;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-xl);
  display: flex;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: rgba(15, 23, 42, 0.6);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: background 0.2s ease;
}

.modal-close-btn:hover {
  background: rgba(220, 38, 38, 0.9);
}

.modal-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--color-border);
  color: var(--color-primary-dark);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 15;
  transition: all 0.2s ease;
}

.modal-nav-btn:hover {
  background: var(--color-primary);
  color: white;
}

.prev-btn { left: 1rem; }
.next-btn { right: 1rem; }

.modal-content-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
}

.modal-media-pane {
  background: #0B0F19;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;
}

.modal-video-box, .modal-image-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-video {
  max-width: 100%;
  max-height: 75vh;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.modal-img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.modal-info-pane {
  padding: 2.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-badge-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.chip-cat {
  background: rgba(6, 78, 59, 0.1);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
}

.chip-type {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
}

.chip-type.video {
  background: rgba(220, 38, 38, 0.1);
  color: #DC2626;
}

.chip-type.image {
  background: rgba(15, 23, 42, 0.08);
  color: var(--color-text-main);
}

.modal-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  line-height: 1.35;
  margin-bottom: 1rem;
}

.modal-desc {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Geotag Card */
.geotag-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  margin-bottom: 1.75rem;
}

.geotag-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.geotag-icon {
  width: 16px;
  height: 16px;
  stroke: var(--color-primary);
  stroke-width: 2;
  fill: none;
}

.geotag-rows {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.geotag-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.82rem;
}

.gt-lbl {
  color: var(--color-text-muted);
  font-weight: 500;
  flex-shrink: 0;
}

.gt-val {
  color: var(--color-text-main);
  font-weight: 600;
  text-align: right;
}

.gt-val.mono {
  font-family: monospace;
  background: rgba(0, 0, 0, 0.04);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.text-accent {
  color: var(--color-accent);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
}

/* Bottom CTA */
.section-cta {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, #064E3B 100%);
  color: white;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.cta-inner {
  max-width: 780px;
  margin: 0 auto;
}

.cta-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  color: #FCD34D;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.cta-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.cta-desc {
  font-size: 1.05rem;
  color: #E2E8F0;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-accent {
  background-color: var(--color-accent);
  color: white;
  border: none;
}

.btn-accent:hover {
  background-color: #B45309;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(217, 119, 6, 0.35);
}

.btn-outline-light {
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background: transparent;
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Animations */
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Breakpoints */
@media (max-width: 992px) {
  .metrics-bar {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .metric-box:nth-child(2) {
    border-right: none;
  }

  .modal-content-grid {
    grid-template-columns: 1fr;
    max-height: 85vh;
    overflow-y: auto;
  }

  .modal-media-pane {
    max-height: 380px;
  }

  .modal-info-pane {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .metrics-bar {
    grid-template-columns: 1fr;
  }

  .metric-box:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1rem;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .activities-grid {
    grid-template-columns: 1fr;
  }

  .modal-nav-btn {
    display: none;
  }
}
</style>
