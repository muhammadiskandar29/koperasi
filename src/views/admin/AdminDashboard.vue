<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ImageUploader from '../../components/common/ImageUploader.vue'

const router = useRouter()

// Tabs: overview, hero, news, programs, about, partners, reports, stats, faqs, contact, messages, settings
const activeTab = ref('overview')
const user = ref(null)
const isLoading = ref(true)
const statusMessage = ref({ text: '', type: 'success' })

// Data State
const stats = ref([])
const news = ref([])
const activities = ref([])
const programs = ref([])
const messages = ref([])
const content = ref({
  hero: {
    badge: 'Koperasi Konsumen Makmur Lestari Cikawung',
    title: 'Membangun Kesejahteraan Melalui Ketahanan Pangan',
    subtitle: 'Mengoptimalkan potensi lahan dan memberdayakan masyarakat Cikawung untuk mencapai kemandirian ekonomi yang inklusif dan berkelanjutan.',
    primaryBtnText: 'Jelajahi Profil KMLC',
    secondaryBtnText: 'Program Layanan',
    heroImage: '/assets/images/hero.jpg'
  },
  profile: {
    name: 'Koperasi Konsumen Makmur Lestari Cikawung',
    shortName: 'KMLC',
    tagline: 'Institusi Koperasi Konsumen bersertifikasi, berdedikasi membangun resiliensi finansial agrikultur melalui manajemen profesional.',
    address: 'Desa Cikawung, Kec. Terisi, Kab. Indramayu, Jawa Barat 45262',
    phone: '0852-8033-0182',
    mobile: '0852-8033-0182',
    email: 'korespondensi@kmlc.co.id',
    operatingHours: 'Senin - Jumat: 08:00 - 16:00 WIB',
    legalNumber: 'AHU-0012345.AH.01.26.TAHUN 2021',
    nib: '1234567890123'
  },
  about: {
    historyP1: 'Koperasi Konsumen Makmur Lestari Cikawung (KMLC) didirikan sebagai respon atas kurangnya optimalisasi lahan tidur eks-kawasan Perhutani di wilayah Desa Cikawung, Kabupaten Indramayu.',
    historyP2: 'Pada tahun 2021, Bapak Unang Herman menginisiasi konsolidasi para petani lokal ke dalam satu payung hukum yang kredibel. Melalui koordinasi vertikal dengan kepolisian dan instansi pemerintahan, KMLC sukses memperoleh hak kelola lahan berbasis kemitraan berkelanjutan.',
    vision: 'Menjadi pilar strategis ketahanan pangan nasional tingkat regional melalui tata kelola agrikultur modern yang transparan dan akuntabel.',
    missions: [
      'Inklusi finansial dan teknis bagi Kelompok Tani Hutan (KTH).',
      'Implementasi standar operasional prosedur yang transparan.',
      'Menciptakan ekosistem pasar (supply chain) yang efisien.'
    ],
    founderName: 'Unang Herman',
    founderTitle: 'Ketua / Inisiator KMLC',
    secretaryName: 'Nursyah Pratiwi',
    treasurerName: 'Agus Suryana',
    supervisorName: 'Perwakilan Kepolisian & Dinas Pertanian',
    aboutImage: '/assets/images/hero.jpg'
  },
  partners: [],
  reports: [],
  faqs: []
})

// Modals State
const showNewsModal = ref(false)
const isEditingNews = ref(false)
const newsForm = ref({
  id: null,
  title: '',
  category: 'Laporan Kegiatan',
  image_url: '/assets/images/harvest.jpg',
  summary: '',
  content: '',
  is_published: true
})

const showActivityModal = ref(false)
const isEditingActivity = ref(false)
const activityForm = ref({
  id: null,
  type: 'image',
  title: '',
  category: 'Pembukaan Lahan',
  media_url: '',
  thumbnail_url: '',
  date: '',
  time: '',
  location: '',
  district: '',
  regency: 'Kab. Indramayu, Jawa Barat',
  coordinates: '',
  altitude: '',
  equipment: '',
  description: ''
})

const showProgramModal = ref(false)
const isEditingProgram = ref(false)
const programForm = ref({
  id: null,
  title: '',
  badge: 'Sektor Utama',
  description: '',
  benefitsList: ['Pemberian bibit unggul bersertifikat', 'Bimbingan berkala dari penyuluh'],
  image_url: '/assets/images/harvest.jpg',
  is_active: true
})

const showPartnerModal = ref(false)
const isEditingPartner = ref(false)
const partnerForm = ref({ id: null, name: '', category: 'Pemerintah', description: '' })

const showReportModal = ref(false)
const isEditingReport = ref(false)
const reportForm = ref({ id: null, title: '', year: '2025', status: 'Disetujui RAT', downloadUrl: '#' })

const showFaqModal = ref(false)
const isEditingFaq = ref(false)
const faqForm = ref({ id: null, question: '', answer: '' })

// Message Detail Modal
const showMessageModal = ref(false)
const selectedMessage = ref(null)

// Computed KPI
const unreadMessagesCount = computed(() => messages.value.filter(m => !m.is_read).length)
const publishedNewsCount = computed(() => news.value.filter(n => n.is_published).length)

// Flash notification
const notify = (text, type = 'success') => {
  statusMessage.value = { text, type }
  setTimeout(() => {
    statusMessage.value = { text: '', type: 'success' }
  }, 4000)
}

// Authentication check
const checkAuth = () => {
  const token = localStorage.getItem('kmlc_admin_token')
  const userJson = localStorage.getItem('kmlc_admin_user')
  if (!token) {
    router.push('/admin/login')
    return false
  }
  if (userJson) {
    try {
      user.value = JSON.parse(userJson)
    } catch (e) {
      user.value = { name: 'Administrator KMLC', email: 'admin@kmlc.id' }
    }
  }
  return true
}

const handleLogout = () => {
  localStorage.removeItem('kmlc_admin_token')
  localStorage.removeItem('kmlc_admin_user')
  router.push('/admin/login')
}

// Fetch all initial data
const fetchAllData = async () => {
  isLoading.value = true
  const ts = Date.now()
  try {
    const [statsRes, newsRes, activitiesRes, programsRes, messagesRes, contentRes] = await Promise.all([
      fetch(`/api/stats?t=${ts}`).then(r => r.json()),
      fetch(`/api/news?t=${ts}`).then(r => r.json()),
      fetch(`/api/activities?t=${ts}`).then(r => r.json()),
      fetch(`/api/programs?t=${ts}`).then(r => r.json()),
      fetch(`/api/messages?t=${ts}`).then(r => r.json()),
      fetch(`/api/content?t=${ts}`).then(r => r.json())
    ])

    if (statsRes.success) stats.value = statsRes.data || []
    if (newsRes.success) news.value = newsRes.data || []
    if (activitiesRes.success) activities.value = activitiesRes.data || []
    if (programsRes.success) programs.value = programsRes.data || []
    if (messagesRes.success) messages.value = messagesRes.data || []
    if (contentRes.success && contentRes.data) {
      content.value = {
        ...content.value,
        ...contentRes.data,
        about: {
          ...content.value.about,
          ...(contentRes.data.about || {})
        }
      }
    }
  } catch (err) {
    console.error('Gagal memuat data CMS:', err)
    notify('Gagal memuat data dari server', 'error')
  } finally {
    isLoading.value = false
  }
}

// Save Section Content Helper
const saveSection = async (sectionName, friendlyLabel = '') => {
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: sectionName,
        data: content.value[sectionName]
      })
    })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)
    notify(`Perubahan data [${friendlyLabel || sectionName}] berhasil disimpan.`)
  } catch (err) {
    notify('Gagal menyimpan: ' + err.message, 'error')
  }
}

// ======================== STATS HANDLERS ========================
const saveAllStats = async () => {
  try {
    for (const item of stats.value) {
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
    }
    notify('Statistik capaian berhasil disimpan.')
  } catch (err) {
    notify('Gagal menyimpan statistik: ' + err.message, 'error')
  }
}

// ======================== NEWS HANDLERS ========================
const openCreateNewsModal = () => {
  isEditingNews.value = false
  newsForm.value = {
    id: null,
    title: '',
    category: 'Laporan Kegiatan',
    image_url: '/assets/images/harvest.jpg',
    summary: '',
    content: '',
    is_published: true
  }
  showNewsModal.value = true
}

const openEditNewsModal = (item) => {
  isEditingNews.value = true
  newsForm.value = { ...item }
  showNewsModal.value = true
}

const saveNews = async () => {
  if (!newsForm.value.title || !newsForm.value.summary) {
    alert('Judul dan ringkasan berita wajib diisi.')
    return
  }

  try {
    const method = isEditingNews.value ? 'PUT' : 'POST'
    const res = await fetch('/api/news', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsForm.value)
    })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)

    showNewsModal.value = false
    notify(isEditingNews.value ? 'Berita berhasil diperbarui.' : 'Berita baru berhasil diterbitkan.')
    fetchAllData()
  } catch (err) {
    notify('Gagal menyimpan berita: ' + err.message, 'error')
  }
}

const deleteNews = async (id) => {
  if (!confirm('Hapus berita ini? Tindakan tidak dapat dibatalkan.')) return
  try {
    const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)

    notify('Berita telah berhasil dihapus.')
    fetchAllData()
  } catch (err) {
    notify('Gagal menghapus berita: ' + err.message, 'error')
  }
}

// ======================== ACTIVITIES HANDLERS ========================
const openCreateActivityModal = () => {
  isEditingActivity.value = false
  activityForm.value = {
    id: null,
    type: 'image',
    title: '',
    category: 'Pembukaan Lahan',
    media_url: '/assets/images/WhatsApp Image 2026-10-12 at 08.29.44.jpeg',
    thumbnail_url: '',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    location: '',
    district: '',
    regency: 'Kab. Indramayu, Jawa Barat',
    coordinates: '',
    altitude: '',
    equipment: '',
    description: ''
  }
  showActivityModal.value = true
}

const openEditActivityModal = (item) => {
  isEditingActivity.value = true
  activityForm.value = { ...item }
  showActivityModal.value = true
}

const saveActivity = async () => {
  if (!activityForm.value.title || !activityForm.value.media_url) {
    alert('Judul dan URL media (foto/video) wajib diisi.')
    return
  }

  try {
    const method = isEditingActivity.value ? 'PUT' : 'POST'
    const res = await fetch('/api/activities', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityForm.value)
    })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)

    showActivityModal.value = false
    notify(isEditingActivity.value ? 'Dokumentasi kegiatan berhasil diperbarui di database.' : 'Dokumentasi baru berhasil disimpan ke database Supabase.')
    fetchAllData()
  } catch (err) {
    notify('Gagal menyimpan dokumentasi: ' + err.message, 'error')
  }
}

const deleteActivity = async (id) => {
  if (!confirm('Hapus dokumentasi kegiatan ini dari database Supabase? Tindakan ini permanen.')) return
  try {
    const res = await fetch(`/api/activities?id=${id}`, { method: 'DELETE' })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)

    notify('Dokumentasi telah berhasil dihapus dari database.')
    fetchAllData()
  } catch (err) {
    notify('Gagal menghapus dokumentasi: ' + err.message, 'error')
  }
}

// ======================== PROGRAMS HANDLERS ========================
const openCreateProgramModal = () => {
  isEditingProgram.value = false
  programForm.value = {
    id: null,
    title: '',
    badge: 'Sektor Pertanian',
    description: '',
    benefitsList: [
      'Penyediaan bibit unggul bersertifikat',
      'Bimbingan teknis berkala dari penyuluh'
    ],
    image_url: '/assets/images/harvest.jpg',
    is_active: true
  }
  showProgramModal.value = true
}

const openEditProgramModal = (item) => {
  isEditingProgram.value = true
  let benefits = []
  if (Array.isArray(item.benefits)) {
    benefits = [...item.benefits]
  } else if (typeof item.benefits === 'string' && item.benefits) {
    benefits = item.benefits.split(',').map(s => s.trim()).filter(Boolean)
  }
  if (benefits.length === 0) benefits = ['Fasilitas standar untuk anggota']

  programForm.value = {
    ...item,
    benefitsList: benefits,
    image_url: item.image_url || '/assets/images/harvest.jpg'
  }
  showProgramModal.value = true
}

const addProgramBenefitRow = () => {
  programForm.value.benefitsList.push('')
}

const removeProgramBenefitRow = (index) => {
  programForm.value.benefitsList.splice(index, 1)
}

const saveProgram = async () => {
  if (!programForm.value.title || !programForm.value.description) {
    alert('Nama program dan deskripsi wajib diisi.')
    return
  }

  try {
    const method = isEditingProgram.value ? 'PUT' : 'POST'
    const cleanBenefits = programForm.value.benefitsList.filter(b => b && b.trim() !== '')

    const payload = {
      ...programForm.value,
      benefits: cleanBenefits
    }

    const res = await fetch('/api/programs', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)

    showProgramModal.value = false
    notify(isEditingProgram.value ? 'Program berhasil diperbarui.' : 'Program baru berhasil ditambahkan.')
    fetchAllData()
  } catch (err) {
    notify('Gagal menyimpan program: ' + err.message, 'error')
  }
}

const deleteProgram = async (id) => {
  if (!confirm('Hapus program ini?')) return
  try {
    const res = await fetch(`/api/programs?id=${id}`, { method: 'DELETE' })
    const result = await res.json()
    if (!res.ok || !result.success) throw new Error(result.message)

    notify('Program telah berhasil dihapus.')
    fetchAllData()
  } catch (err) {
    notify('Gagal menghapus program: ' + err.message, 'error')
  }
}

// ======================== PARTNERS HANDLERS ========================
const openCreatePartnerModal = () => {
  isEditingPartner.value = false
  partnerForm.value = { id: Date.now(), name: '', category: 'Pemerintah', description: '' }
  showPartnerModal.value = true
}

const openEditPartnerModal = (p) => {
  isEditingPartner.value = true
  partnerForm.value = { ...p }
  showPartnerModal.value = true
}

const savePartner = async () => {
  if (!partnerForm.value.name) {
    alert('Nama mitra wajib diisi.')
    return
  }
  if (!content.value.partners) content.value.partners = []
  if (isEditingPartner.value) {
    const idx = content.value.partners.findIndex(p => p.id === partnerForm.value.id)
    if (idx !== -1) content.value.partners[idx] = { ...partnerForm.value }
  } else {
    content.value.partners.push({ ...partnerForm.value, id: Date.now() })
  }
  showPartnerModal.value = false
  await saveSection('partners', 'Mitra Kerjasama')
}

const deletePartner = async (id) => {
  if (!confirm('Hapus mitra ini?')) return
  content.value.partners = content.value.partners.filter(p => p.id !== id)
  await saveSection('partners', 'Mitra Kerjasama')
}

// ======================== REPORTS HANDLERS ========================
const openCreateReportModal = () => {
  isEditingReport.value = false
  reportForm.value = { id: Date.now(), title: '', year: '2025', status: 'Disetujui RAT', downloadUrl: '#' }
  showReportModal.value = true
}

const openEditReportModal = (r) => {
  isEditingReport.value = true
  reportForm.value = { ...r }
  showReportModal.value = true
}

const saveReport = async () => {
  if (!reportForm.value.title) {
    alert('Judul laporan wajib diisi.')
    return
  }
  if (!content.value.reports) content.value.reports = []
  if (isEditingReport.value) {
    const idx = content.value.reports.findIndex(r => r.id === reportForm.value.id)
    if (idx !== -1) content.value.reports[idx] = { ...reportForm.value }
  } else {
    content.value.reports.push({ ...reportForm.value, id: Date.now() })
  }
  showReportModal.value = false
  await saveSection('reports', 'Dokumen Laporan')
}

const deleteReport = async (id) => {
  if (!confirm('Hapus dokumen ini?')) return
  content.value.reports = content.value.reports.filter(r => r.id !== id)
  await saveSection('reports', 'Dokumen Laporan')
}

// ======================== FAQS HANDLERS ========================
const openCreateFaqModal = () => {
  isEditingFaq.value = false
  faqForm.value = { id: Date.now(), question: '', answer: '' }
  showFaqModal.value = true
}

const openEditFaqModal = (f) => {
  isEditingFaq.value = true
  faqForm.value = { ...f }
  showFaqModal.value = true
}

const saveFaq = async () => {
  if (!faqForm.value.question || !faqForm.value.answer) {
    alert('Pertanyaan dan jawaban wajib diisi.')
    return
  }
  if (!content.value.faqs) content.value.faqs = []
  if (isEditingFaq.value) {
    const idx = content.value.faqs.findIndex(f => f.id === faqForm.value.id)
    if (idx !== -1) content.value.faqs[idx] = { ...faqForm.value }
  } else {
    content.value.faqs.push({ ...faqForm.value, id: Date.now() })
  }
  showFaqModal.value = false
  await saveSection('faqs', 'Tanya Jawab FAQ')
}

const deleteFaq = async (id) => {
  if (!confirm('Hapus data tanya jawab ini?')) return
  content.value.faqs = content.value.faqs.filter(f => f.id !== id)
  await saveSection('faqs', 'Tanya Jawab FAQ')
}

// Mission helpers
const addMissionItem = () => {
  if (!content.value.about.missions) content.value.about.missions = []
  content.value.about.missions.push('Misi baru koperasi...')
}

const removeMissionItem = (index) => {
  content.value.about.missions.splice(index, 1)
}

// Message Detail
const openMessageDetail = (msg) => {
  selectedMessage.value = msg
  showMessageModal.value = true
  if (!msg.is_read) {
    markMessageAsRead(msg.id, true)
  }
}

const markMessageAsRead = async (id, isRead) => {
  try {
    const res = await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_read: isRead })
    })
    if (res.ok) {
      const msg = messages.value.find(m => m.id === id)
      if (msg) msg.is_read = isRead
      notify('Status pesan diperbarui.')
    }
  } catch (err) {
    notify('Gagal mengubah status pesan: ' + err.message, 'error')
  }
}

onMounted(() => {
  if (checkAuth()) {
    fetchAllData()
  }
})
</script>

<template>
  <div class="cms-layout">
    <!-- Sidebar -->
    <aside class="cms-sidebar">
      <div class="sidebar-brand">
        <router-link to="/" class="brand-link">
          <span class="logo-mark">KMLC</span>
        </router-link>
        <div class="sidebar-brand-right">
          <span class="badge-role">Admin</span>
          <button @click="handleLogout" class="btn-logout-mobile" title="Keluar">Keluar</button>
        </div>
      </div>

      <nav class="sidebar-menu">
        <div class="menu-label">Utama</div>
        <button :class="['menu-btn', { active: activeTab === 'overview' }]" @click="activeTab = 'overview'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Ringkasan</span>
        </button>

        <div class="menu-label">Konten Website</div>
        <button :class="['menu-btn', { active: activeTab === 'hero' }]" @click="activeTab = 'hero'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
          </svg>
          <span>Banner Beranda</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'news' }]" @click="activeTab = 'news'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
          </svg>
          <span>Berita & Kegiatan</span>
          <span class="count-tag">{{ news.length }}</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'activities' }]" @click="activeTab = 'activities'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
          </svg>
          <span>Galeri Kegiatan</span>
          <span class="count-tag">{{ activities.length }}</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'programs' }]" @click="activeTab = 'programs'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>Program Layanan</span>
          <span class="count-tag">{{ programs.length }}</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'about' }]" @click="activeTab = 'about'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M3 7v14M21 7v14M6 10h.01M6 14h.01M6 18h.01M10 10h.01M10 14h.01M10 18h.01M14 10h.01M14 14h.01M14 18h.01M18 10h.01M18 14h.01M18 18h.01M12 3l9 4H3l9-4z"/>
          </svg>
          <span>Profil & Struktur</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'partners' }]" @click="activeTab = 'partners'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Mitra Kerjasama</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'reports' }]" @click="activeTab = 'reports'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Laporan Dokumen</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'stats' }]" @click="activeTab = 'stats'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <span>Statistik Capaian</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'faqs' }]" @click="activeTab = 'faqs'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>Tanya Jawab (FAQ)</span>
        </button>

        <div class="menu-label">Pengaturan & Komunikasi</div>
        <button :class="['menu-btn', { active: activeTab === 'contact' }]" @click="activeTab = 'contact'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>Kontak & Legalitas</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'messages' }]" @click="activeTab = 'messages'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>Kotak Pesan</span>
          <span v-if="unreadMessagesCount > 0" class="badge-alert">{{ unreadMessagesCount }}</span>
        </button>

        <button :class="['menu-btn', { active: activeTab === 'settings' }]" @click="activeTab = 'settings'">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          </svg>
          <span>Database Cloud</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="avatar">{{ user?.name?.charAt(0) || 'A' }}</div>
          <div class="user-meta">
            <span class="user-name">{{ user?.name || 'Administrator' }}</span>
            <span class="user-email">{{ user?.email || 'admin@kmlc.id' }}</span>
          </div>
        </div>
        <button @click="handleLogout" class="btn-logout" title="Keluar">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="cms-main">
      <header class="cms-topbar">
        <div class="topbar-left">
          <h1>
            {{ 
              activeTab === 'overview' ? 'Ringkasan Sistem' :
              activeTab === 'hero' ? 'Banner Beranda' :
              activeTab === 'news' ? 'Berita & Kegiatan' :
              activeTab === 'activities' ? 'Dokumentasi & Galeri Kegiatan' :
              activeTab === 'programs' ? 'Program Layanan' :
              activeTab === 'about' ? 'Profil & Struktur Organisasi' :
              activeTab === 'partners' ? 'Mitra Kerjasama' :
              activeTab === 'reports' ? 'Laporan Dokumen RAT' :
              activeTab === 'stats' ? 'Statistik Capaian' :
              activeTab === 'faqs' ? 'Tanya Jawab (FAQ)' :
              activeTab === 'contact' ? 'Kontak & Legalitas' :
              activeTab === 'messages' ? 'Kotak Pesan Pengunjung' : 'Database & Serverless'
            }}
          </h1>
          <p class="topbar-sub">Perubahan yang disimpan langsung diperbarui pada halaman website publik.</p>
        </div>

        <div class="topbar-right">
          <router-link to="/" target="_blank" class="btn btn-secondary-nav">
            <span>Lihat Website</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </router-link>
        </div>
      </header>

      <!-- Alert Notification Banner -->
      <div v-if="statusMessage.text" :class="['alert-banner', statusMessage.type]">
        <span>{{ statusMessage.text }}</span>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-panel">
        <div class="spinner"></div>
        <p>Memuat data...</p>
      </div>

      <!-- Tab Content Area -->
      <div v-else class="tab-body">
        
        <!-- 1. OVERVIEW TAB -->
        <div v-if="activeTab === 'overview'" class="tab-pane">
          <div class="stats-cards-grid">
            <div class="metric-card" v-for="item in stats" :key="item.id">
              <div class="metric-val">{{ item.value }}</div>
              <div class="metric-label">{{ item.label }}</div>
              <div class="metric-desc">{{ item.description }}</div>
            </div>
          </div>

          <div class="quick-overview-grid mt-4">
            <!-- News Quick List -->
            <div class="dashboard-box">
              <div class="box-header">
                <h3>Berita & Kegiatan Terbaru</h3>
                <button @click="openCreateNewsModal" class="btn btn-primary-sm">+ Buat Berita</button>
              </div>
              <div class="box-content">
                <div v-if="news.length === 0" class="empty-state">Belum ada berita tersimpan.</div>
                <div v-else class="news-list-mini">
                  <div v-for="item in news.slice(0, 4)" :key="item.id" class="mini-item" @click="openEditNewsModal(item)">
                    <img :src="item.image_url || '/assets/images/harvest.jpg'" alt="" class="mini-thumb" />
                    <div class="mini-meta">
                      <h4>{{ item.title }}</h4>
                      <span class="mini-tag">{{ item.category }} • {{ new Date(item.created_at).toLocaleDateString('id-ID') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Messages Quick List -->
            <div class="dashboard-box">
              <div class="box-header">
                <h3>Pesan Masuk Terkini</h3>
                <span class="badge-tag">{{ unreadMessagesCount }} Belum Dibaca</span>
              </div>
              <div class="box-content">
                <div v-if="messages.length === 0" class="empty-state">Belum ada pesan masuk.</div>
                <div v-else class="messages-list-mini">
                  <div v-for="msg in messages.slice(0, 4)" :key="msg.id" class="msg-mini-item" :class="{ unread: !msg.is_read }" @click="openMessageDetail(msg)">
                    <div class="msg-sender">
                      <strong>{{ msg.name }}</strong>
                      <span class="msg-time">{{ new Date(msg.created_at).toLocaleDateString('id-ID') }}</span>
                    </div>
                    <p class="msg-snippet">{{ msg.message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. HERO / BERANDA TAB -->
        <div v-if="activeTab === 'hero'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Edit Konten Banner Utama</h2>
              <p class="text-muted">Kustomisasi judul, subjudul, tombol aksi, dan gambar utama pada halaman beranda.</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/" target="_blank" class="btn btn-secondary">Pratinjau Beranda</router-link>
              <button @click="saveSection('hero', 'Banner Beranda')" class="btn btn-primary">Simpan Banner</button>
            </div>
          </div>

          <div class="form-card">
            <ImageUploader 
              v-model="content.hero.heroImage" 
              label="Gambar Banner Utama"
              hint="Gambar ini akan tampil sebagai latar belakang atau visual utama pada bagian atas beranda."
            />

            <div class="form-group">
              <label>Label Atas (Badge)</label>
              <input v-model="content.hero.badge" type="text" class="form-input" placeholder="Contoh: Koperasi Konsumen Makmur Lestari Cikawung" />
            </div>

            <div class="form-group">
              <label>Judul Utama (Headline)</label>
              <input v-model="content.hero.title" type="text" class="form-input font-bold" placeholder="Contoh: Membangun Kesejahteraan Melalui Ketahanan Pangan" />
            </div>

            <div class="form-group">
              <label>Deskripsi Subjudul</label>
              <textarea v-model="content.hero.subtitle" class="form-textarea" rows="3" placeholder="Tuliskan deskripsi singkat tujuan dan komitmen koperasi..."></textarea>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Teks Tombol Pertama (Primary)</label>
                <input v-model="content.hero.primaryBtnText" type="text" class="form-input" placeholder="Contoh: Jelajahi Profil KMLC" />
              </div>
              <div class="form-group flex-1">
                <label>Teks Tombol Kedua (Secondary)</label>
                <input v-model="content.hero.secondaryBtnText" type="text" class="form-input" placeholder="Contoh: Program Layanan" />
              </div>
            </div>

            <div class="form-actions-bar">
              <button @click="saveSection('hero', 'Banner Beranda')" class="btn btn-primary">Simpan Perubahan Banner</button>
            </div>
          </div>
        </div>

        <!-- 3. NEWS TAB -->
        <div v-if="activeTab === 'news'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Manajemen Berita & Kegiatan</h2>
              <p class="text-muted">Kelola publikasi kegiatan lapangan, panen raya, dan penyuluhan petani.</p>
            </div>
            <button @click="openCreateNewsModal" class="btn btn-primary">+ Tambah Berita Baru</button>
          </div>

          <div class="table-container">
            <table class="cms-table">
              <thead>
                <tr>
                  <th style="width: 80px">Gambar</th>
                  <th>Judul Kegiatan</th>
                  <th>Kategori</th>
                  <th>Ringkasan</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th style="text-align: right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in news" :key="item.id">
                  <td>
                    <img :src="item.image_url || '/assets/images/harvest.jpg'" class="table-thumb" alt="" />
                  </td>
                  <td>
                    <div class="table-title">{{ item.title }}</div>
                  </td>
                  <td>
                    <span class="category-pill">{{ item.category }}</span>
                  </td>
                  <td>
                    <p class="table-desc">{{ item.summary }}</p>
                  </td>
                  <td>
                    <span :class="['status-chip', item.is_published ? 'published' : 'draft']">
                      {{ item.is_published ? 'Tayang' : 'Draft' }}
                    </span>
                  </td>
                  <td>
                    <span class="date-text">{{ new Date(item.created_at).toLocaleDateString('id-ID') }}</span>
                  </td>
                  <td style="text-align: right">
                    <div class="action-btn-group">
                      <button @click="openEditNewsModal(item)" class="btn-action edit">Edit</button>
                      <button @click="deleteNews(item.id)" class="btn-action delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ACTIVITIES TAB -->
        <div v-if="activeTab === 'activities'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Dokumentasi & Galeri Kegiatan Lapangan</h2>
              <p class="text-muted">Kelola foto dan video aktivitas pembukaan lahan, rapat koordinasi, serta monitoring lapangan (tersimpan langsung di Supabase).</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/kegiatan" target="_blank" class="btn btn-secondary">Lihat Halaman Galeri</router-link>
              <button @click="openCreateActivityModal" class="btn btn-primary">+ Tambah Dokumentasi Baru</button>
            </div>
          </div>

          <div class="table-container">
            <table class="cms-table">
              <thead>
                <tr>
                  <th style="width: 80px">Media</th>
                  <th>Judul Kegiatan</th>
                  <th>Tipe</th>
                  <th>Kategori</th>
                  <th>Lokasi & Wilayah</th>
                  <th>Tanggal</th>
                  <th>Alat / Personel</th>
                  <th style="text-align: right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="activities.length === 0">
                  <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--color-text-muted)">
                    Belum ada data dokumentasi kegiatan di database. Klik tombol "+ Tambah Dokumentasi Baru" di atas.
                  </td>
                </tr>
                <tr v-for="item in activities" :key="item.id">
                  <td>
                    <video v-if="item.type === 'video'" :src="item.media_url" class="table-thumb" muted style="background: black; object-fit: cover"></video>
                    <img v-else :src="item.media_url" class="table-thumb" alt="" />
                  </td>
                  <td>
                    <div class="table-title">{{ item.title }}</div>
                    <div class="date-text" style="font-size: 0.75rem">{{ item.coordinates || '' }}</div>
                  </td>
                  <td>
                    <span :class="['status-chip', item.type === 'video' ? 'draft' : 'published']">
                      {{ item.type === 'video' ? '🎥 Video' : '📷 Foto' }}
                    </span>
                  </td>
                  <td>
                    <span class="category-pill">{{ item.category }}</span>
                  </td>
                  <td>
                    <div style="font-size: 0.85rem; font-weight: 600">{{ item.location }}</div>
                    <div class="date-text">{{ item.district }}</div>
                  </td>
                  <td>
                    <span class="date-text">{{ item.date }}</span>
                  </td>
                  <td>
                    <span style="font-size: 0.8rem; color: var(--color-text-muted)">{{ item.equipment }}</span>
                  </td>
                  <td style="text-align: right">
                    <div class="action-btn-group">
                      <button @click="openEditActivityModal(item)" class="btn-action edit">Edit</button>
                      <button @click="deleteActivity(item.id)" class="btn-action delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. PROGRAMS TAB -->
        <div v-if="activeTab === 'programs'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Program & Layanan Koperasi</h2>
              <p class="text-muted">Kelola unit usaha pertanian, permodalan, saprotan, dan bimbingan anggota.</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/program" target="_blank" class="btn btn-secondary">Lihat Halaman Program</router-link>
              <button @click="openCreateProgramModal" class="btn btn-primary">+ Tambah Program Baru</button>
            </div>
          </div>

          <div class="programs-grid">
            <div v-for="prog in programs" :key="prog.id" class="program-card">
              <div class="prog-header">
                <span class="prog-badge">{{ prog.badge || 'Layanan' }}</span>
                <span :class="['status-chip', prog.is_active ? 'published' : 'draft']">
                  {{ prog.is_active ? 'Aktif' : 'Non-aktif' }}
                </span>
              </div>
              <h3 class="prog-title">{{ prog.title }}</h3>
              <p class="prog-desc">{{ prog.description }}</p>
              
              <div class="prog-benefits" v-if="prog.benefits && prog.benefits.length">
                <div class="benefit-item" v-for="(b, i) in prog.benefits" :key="i">
                  ✓ {{ b }}
                </div>
              </div>
              
              <div class="prog-footer">
                <button @click="openEditProgramModal(prog)" class="btn-action edit">Edit</button>
                <button @click="deleteProgram(prog.id)" class="btn-action delete">Hapus</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. ABOUT TAB -->
        <div v-if="activeTab === 'about'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Profil, Sejarah & Struktur Pengurus</h2>
              <p class="text-muted">Kelola sejarah pendirian, visi misi, dan susunan kepengurusan organisasi.</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/tentang" target="_blank" class="btn btn-secondary">Lihat Halaman Profil</router-link>
              <button @click="saveSection('about', 'Profil & Struktur')" class="btn btn-primary">Simpan Profil</button>
            </div>
          </div>

          <div class="form-card">
            <ImageUploader 
              v-model="content.about.aboutImage" 
              label="Gambar Dokumentasi Profil"
              hint="Gambar ini akan tampil mendampingi teks sejarah pada halaman Tentang KMLC."
            />

            <h3 class="form-section-title">1. Sejarah Organisasi</h3>
            
            <div class="form-group">
              <label>Sejarah Awal Berdiri (Paragraf 1)</label>
              <textarea v-model="content.about.historyP1" class="form-textarea" rows="3" placeholder="Tuliskan latar belakang pendirian koperasi..."></textarea>
            </div>

            <div class="form-group">
              <label>Perkembangan & Legalitas (Paragraf 2)</label>
              <textarea v-model="content.about.historyP2" class="form-textarea" rows="3" placeholder="Tuliskan perkembangan kemitraan dan koordinasi perizinan..."></textarea>
            </div>

            <h3 class="form-section-title mt-4">2. Visi & Misi</h3>

            <div class="form-group">
              <label>Visi Koperasi</label>
              <textarea v-model="content.about.vision" class="form-textarea" rows="2" placeholder="Visi strategis koperasi..."></textarea>
            </div>

            <div class="form-group">
              <div class="flex-between mb-2">
                <label>Butir-butir Misi</label>
                <button type="button" @click="addMissionItem" class="btn btn-secondary-sm">+ Tambah Misi</button>
              </div>
              <div class="mission-inputs-list">
                <div v-for="(m, idx) in content.about.missions" :key="idx" class="mission-input-row">
                  <span class="mission-index">{{ idx + 1 }}</span>
                  <input v-model="content.about.missions[idx]" type="text" class="form-input flex-1" />
                  <button type="button" @click="removeMissionItem(idx)" class="btn-action delete" title="Hapus">✕</button>
                </div>
              </div>
            </div>

            <h3 class="form-section-title mt-4">3. Susunan Dewan Direksi & Pengawas</h3>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Nama Ketua / Inisiator</label>
                <input v-model="content.about.founderName" type="text" class="form-input" />
              </div>
              <div class="form-group flex-1">
                <label>Jabatan Ketua</label>
                <input v-model="content.about.founderTitle" type="text" class="form-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Sekretaris</label>
                <input v-model="content.about.secretaryName" type="text" class="form-input" />
              </div>
              <div class="form-group flex-1">
                <label>Bendahara</label>
                <input v-model="content.about.treasurerName" type="text" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label>Dewan Pengawas</label>
              <input v-model="content.about.supervisorName" type="text" class="form-input" />
            </div>

            <div class="form-actions-bar">
              <button @click="saveSection('about', 'Profil & Struktur')" class="btn btn-primary">Simpan Profil & Pengurus</button>
            </div>
          </div>
        </div>

        <!-- 6. PARTNERS TAB -->
        <div v-if="activeTab === 'partners'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Mitra & Jaringan Strategis</h2>
              <p class="text-muted">Kelola lembaga, kepolisian, instansi kehutanan, dan perbankan yang bermitra dengan KMLC.</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/mitra" target="_blank" class="btn btn-secondary">Lihat Halaman Mitra</router-link>
              <button @click="openCreatePartnerModal" class="btn btn-primary">+ Tambah Mitra</button>
            </div>
          </div>

          <div class="programs-grid">
            <div v-for="p in content.partners" :key="p.id" class="program-card">
              <span class="prog-badge">{{ p.category }}</span>
              <h3 class="prog-title mt-2">{{ p.name }}</h3>
              <p class="prog-desc">{{ p.description }}</p>
              <div class="prog-footer">
                <button @click="openEditPartnerModal(p)" class="btn-action edit">Edit</button>
                <button @click="deletePartner(p.id)" class="btn-action delete">Hapus</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 7. REPORTS TAB -->
        <div v-if="activeTab === 'reports'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Laporan RAT & Akuntabilitas</h2>
              <p class="text-muted">Publikasi laporan pertanggungjawaban tahunan dan berkas keuangan resmi.</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/laporan" target="_blank" class="btn btn-secondary">Lihat Halaman Laporan</router-link>
              <button @click="openCreateReportModal" class="btn btn-primary">+ Tambah Laporan</button>
            </div>
          </div>

          <div class="table-container">
            <table class="cms-table">
              <thead>
                <tr>
                  <th>Judul Dokumen</th>
                  <th>Tahun Buku</th>
                  <th>Status Verifikasi</th>
                  <th style="text-align: right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rep in content.reports" :key="rep.id">
                  <td><strong>{{ rep.title }}</strong></td>
                  <td>{{ rep.year }}</td>
                  <td><span class="status-chip published">{{ rep.status }}</span></td>
                  <td style="text-align: right">
                    <button @click="openEditReportModal(rep)" class="btn-action edit mr-1">Edit</button>
                    <button @click="deleteReport(rep.id)" class="btn-action delete">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 8. STATS TAB -->
        <div v-if="activeTab === 'stats'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Statistik Capaian Beranda</h2>
              <p class="text-muted">4 indikator utama pencapaian yang tampil di halaman depan website.</p>
            </div>
            <button @click="saveAllStats" class="btn btn-primary">Simpan Semua Statistik</button>
          </div>

          <div class="stats-form-grid">
            <div v-for="item in stats" :key="item.id" class="stat-edit-card">
              <div class="stat-id-label">Indikator: {{ item.id }}</div>
              
              <div class="form-group mt-2">
                <label>Nilai / Angka Capaian</label>
                <input v-model="item.value" type="text" class="form-input stat-val-input" />
              </div>

              <div class="form-group">
                <label>Label Indikator</label>
                <input v-model="item.label" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>Deskripsi Tambahan</label>
                <input v-model="item.description" type="text" class="form-input" />
              </div>
            </div>
          </div>

          <div class="form-actions-bar mt-4">
            <button @click="saveAllStats" class="btn btn-primary">Simpan Semua Statistik</button>
          </div>
        </div>

        <!-- 9. FAQS TAB -->
        <div v-if="activeTab === 'faqs'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Tanya Jawab (FAQ)</h2>
              <p class="text-muted">Daftar pertanyaan yang sering diajukan seputar keanggotaan dan layanan koperasi.</p>
            </div>
            <button @click="openCreateFaqModal" class="btn btn-primary">+ Tambah FAQ</button>
          </div>

          <div class="messages-grid">
            <div v-for="f in content.faqs" :key="f.id" class="message-card">
              <h3 class="msg-subject">{{ f.question }}</h3>
              <p class="msg-body">{{ f.answer }}</p>
              <div class="msg-actions">
                <button @click="openEditFaqModal(f)" class="btn-action edit mr-1">Edit</button>
                <button @click="deleteFaq(f.id)" class="btn-action delete">Hapus</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 10. CONTACT TAB -->
        <div v-if="activeTab === 'contact'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Kontak, Sekretariat & Legalitas</h2>
              <p class="text-muted">Informasi domisili, nomor WhatsApp korespondensi, jam operasional, dan nomor AHU/NIB.</p>
            </div>
            <div class="btn-group-right">
              <router-link to="/kontak" target="_blank" class="btn btn-secondary">Lihat Halaman Kontak</router-link>
              <button @click="saveSection('profile', 'Kontak & Legalitas')" class="btn btn-primary">Simpan Kontak</button>
            </div>
          </div>

          <div class="form-card">
            <div class="form-row">
              <div class="form-group flex-1">
                <label>Nama Resmi Koperasi</label>
                <input v-model="content.profile.name" type="text" class="form-input" />
              </div>
              <div class="form-group flex-1">
                <label>Singkatan</label>
                <input v-model="content.profile.shortName" type="text" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label>Slogan Organisasi (Tagline)</label>
              <input v-model="content.profile.tagline" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label>Alamat Sekretariat</label>
              <textarea v-model="content.profile.address" class="form-textarea" rows="2"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Nomor WhatsApp Layanan</label>
                <input v-model="content.profile.mobile" type="text" class="form-input font-bold" />
              </div>
              <div class="form-group flex-1">
                <label>Telepon Kantor</label>
                <input v-model="content.profile.phone" type="text" class="form-input" />
              </div>
              <div class="form-group flex-1">
                <label>Email Resmi</label>
                <input v-model="content.profile.email" type="email" class="form-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Jam Pelayanan</label>
                <input v-model="content.profile.operatingHours" type="text" class="form-input" />
              </div>
              <div class="form-group flex-1">
                <label>Nomor AHU Kemenkumham</label>
                <input v-model="content.profile.legalNumber" type="text" class="form-input" />
              </div>
              <div class="form-group flex-1">
                <label>Nomor Induk Berusaha (NIB)</label>
                <input v-model="content.profile.nib" type="text" class="form-input" />
              </div>
            </div>

            <div class="form-actions-bar">
              <button @click="saveSection('profile', 'Kontak & Legalitas')" class="btn btn-primary">Simpan Kontak & Legalitas</button>
            </div>
          </div>
        </div>

        <!-- 11. MESSAGES TAB -->
        <div v-if="activeTab === 'messages'" class="tab-pane">
          <div class="pane-action-bar">
            <div>
              <h2>Kotak Pesan Pengunjung</h2>
              <p class="text-muted">Aspirasi, permohonan kemitraan, dan pesan yang dikirimkan melalui formulir publik.</p>
            </div>
          </div>

          <div v-if="messages.length === 0" class="empty-state-card">
            <h3>Belum Ada Pesan Masuk</h3>
            <p>Pesan yang dikirimkan pengunjung melalui formulir Kontak akan otomatis tampil di sini.</p>
          </div>

          <div v-else class="table-container">
            <table class="cms-table">
              <thead>
                <tr>
                  <th>Pengirim</th>
                  <th>Kontak</th>
                  <th>Subjek</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th style="text-align: right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="msg in messages" :key="msg.id" :class="{ 'tr-unread': !msg.is_read }">
                  <td><strong>{{ msg.name }}</strong></td>
                  <td>
                    <div class="text-xs text-muted">{{ msg.phone || msg.email || '-' }}</div>
                  </td>
                  <td>
                    <div class="msg-table-snippet">{{ msg.subject || msg.message }}</div>
                  </td>
                  <td><span class="date-text">{{ new Date(msg.created_at).toLocaleDateString('id-ID') }}</span></td>
                  <td>
                    <span :class="['status-chip', msg.is_read ? 'published' : 'draft']">
                      {{ msg.is_read ? 'Dibaca' : 'Baru' }}
                    </span>
                  </td>
                  <td style="text-align: right">
                    <button @click="openMessageDetail(msg)" class="btn-action edit mr-1">Detail Pesan</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 12. SETTINGS TAB -->
        <div v-if="activeTab === 'settings'" class="tab-pane">
          <div class="settings-container">
            <div class="settings-card">
              <h3>Status Integrasi Serverless & Database</h3>
              <p class="text-muted">Sistem penyimpanan lokal dan cloud Supabase aktif.</p>

              <div class="status-indicator-box">
                <div class="indicator-dot online"></div>
                <div>
                  <strong>Serverless API Active: /api/content, /api/news, /api/programs</strong>
                  <p class="text-sm">Siap deploy ke Vercel tanpa konfigurasi server tambahan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- NEWS MODAL (TAMBAH / EDIT BERITA) -->
    <div v-if="showNewsModal" class="modal-backdrop" @click.self="showNewsModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>{{ isEditingNews ? 'Edit Berita Kegiatan' : 'Tambah Berita / Kegiatan Baru' }}</h3>
          <button @click="showNewsModal = false" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="saveNews" class="modal-body">
          
          <ImageUploader 
            v-model="newsForm.image_url" 
            label="Gambar Kegiatan"
            hint="Format: JPG, PNG, atau WEBP. Gambar otomatis dioptimalkan."
          />

          <div class="form-group">
            <label>Judul Kegiatan / Berita</label>
            <input v-model="newsForm.title" type="text" class="form-input" placeholder="Contoh: Panen Raya Jagung Musim Pertama Bersama Petani Cikawung" required />
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Kategori</label>
              <select v-model="newsForm.category" class="form-select">
                <option value="Laporan Kegiatan">Laporan Kegiatan</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Edukasi & Pelatihan">Edukasi & Pelatihan</option>
                <option value="Kelembagaan">Kelembagaan</option>
              </select>
            </div>
            <div class="form-group flex-1">
              <label>Status Publikasi</label>
              <select v-model="newsForm.is_published" class="form-select">
                <option :value="true">Tayang (Published)</option>
                <option :value="false">Draft (Belum Ditayangkan)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Ringkasan Singkat (Lead Paragraph)</label>
            <textarea v-model="newsForm.summary" class="form-textarea" rows="2" placeholder="Tuliskan intisari berita dalam 1-2 kalimat..." required></textarea>
          </div>

          <div class="form-group">
            <label>Isi Lengkap Berita</label>
            <textarea v-model="newsForm.content" class="form-textarea" rows="6" placeholder="Tuliskan jalannya kegiatan, peserta yang hadir, dan rincian capaian kegiatan..."></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" @click="showNewsModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Berita</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ACTIVITY MODAL (TAMBAH / EDIT DOKUMENTASI KEGIATAN) -->
    <div v-if="showActivityModal" class="modal-backdrop" @click.self="showActivityModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>{{ isEditingActivity ? 'Edit Dokumentasi Kegiatan' : 'Tambah Dokumentasi Kegiatan Baru' }}</h3>
          <button @click="showActivityModal = false" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="saveActivity" class="modal-body">
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Tipe Media</label>
              <select v-model="activityForm.type" class="form-select">
                <option value="image">Foto Lapangan</option>
                <option value="video">Video Lapangan</option>
              </select>
            </div>
            <div class="form-group flex-1">
              <label>Kategori Kegiatan</label>
              <input v-model="activityForm.category" type="text" class="form-input" placeholder="Contoh: Pembukaan Lahan" required />
            </div>
          </div>

          <div class="form-group">
            <label>Judul Dokumentasi</label>
            <input v-model="activityForm.title" type="text" class="form-input font-bold" placeholder="Contoh: Land Clearing & Perataan Lahan Cikawung" required />
          </div>

          <div class="form-group" v-if="activityForm.type !== 'video'">
            <ImageUploader 
              v-model="activityForm.media_url" 
              label="Foto Dokumentasi (WebP / Path Ringan)"
              hint="Upload foto dari perangkat (otomatis dikonversi ke WebP ringan) atau pilih path foto yang tersedia."
            />
          </div>

          <div class="form-group" v-else>
            <label>Path File Video Lapangan</label>
            <input v-model="activityForm.media_url" type="text" class="form-input" placeholder="/assets/images/WhatsApp Video ....mp4" required />
            <span class="field-hint">Path file video di folder public/assets/images/</span>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Tanggal</label>
              <input v-model="activityForm.date" type="text" class="form-input" placeholder="Contoh: 10 Oktober 2026" />
            </div>
            <div class="form-group flex-1">
              <label>Waktu / Jam</label>
              <input v-model="activityForm.time" type="text" class="form-input" placeholder="Contoh: 09:13 WIB" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Nama Titik Lokasi</label>
              <input v-model="activityForm.location" type="text" class="form-input" placeholder="Contoh: Blok Lahan Cikawung" required />
            </div>
            <div class="form-group flex-1">
              <label>Kecamatan</label>
              <input v-model="activityForm.district" type="text" class="form-input" placeholder="Contoh: Kec. Terisi" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Kabupaten / Provinsi</label>
              <input v-model="activityForm.regency" type="text" class="form-input" placeholder="Contoh: Kab. Indramayu, Jawa Barat" />
            </div>
            <div class="form-group flex-1">
              <label>Koordinat GPS / Arah</label>
              <input v-model="activityForm.coordinates" type="text" class="form-input" placeholder="Contoh: -6.625770, +107.998556" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Ketinggian (Elevasi)</label>
              <input v-model="activityForm.altitude" type="text" class="form-input" placeholder="Contoh: 90.0 msnm" />
            </div>
            <div class="form-group flex-1">
              <label>Alat / Personel Lapangan</label>
              <input v-model="activityForm.equipment" type="text" class="form-input" placeholder="Contoh: Excavator Kobelco & Wheel Loader" />
            </div>
          </div>

          <div class="form-group">
            <label>Deskripsi Kegiatan</label>
            <textarea v-model="activityForm.description" class="form-textarea" rows="3" placeholder="Tuliskan keterangan detail proses pengerjaan atau hasil kegiatan..."></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" @click="showActivityModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan ke Supabase</button>
          </div>
        </form>
      </div>
    </div>

    <!-- PROGRAM MODAL (TAMBAH / EDIT PROGRAM) -->
    <div v-if="showProgramModal" class="modal-backdrop" @click.self="showProgramModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>{{ isEditingProgram ? 'Edit Program Layanan' : 'Tambah Program Layanan' }}</h3>
          <button @click="showProgramModal = false" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="saveProgram" class="modal-body">
          
          <div class="form-group">
            <label>Nama Program</label>
            <input v-model="programForm.title" type="text" class="form-input" placeholder="Contoh: Unit Pembiayaan Pertanian Mikro" required />
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Sektor / Kategori</label>
              <input v-model="programForm.badge" type="text" class="form-input" placeholder="Contoh: Finansial, Saprotan, Edukasi" />
            </div>
            <div class="form-group flex-1">
              <label>Status Layanan</label>
              <select v-model="programForm.is_active" class="form-select">
                <option :value="true">Aktif</option>
                <option :value="false">Non-aktif</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Deskripsi Program</label>
            <textarea v-model="programForm.description" class="form-textarea" rows="3" placeholder="Jelaskan mekanisme dan manfaat program bagi anggota..." required></textarea>
          </div>

          <div class="form-group">
            <div class="flex-between mb-2">
              <label>Daftar Fasilitas / Keunggulan</label>
              <button type="button" @click="addProgramBenefitRow" class="btn btn-secondary-sm">+ Tambah Poin</button>
            </div>
            <div class="mission-inputs-list">
              <div v-for="(b, idx) in programForm.benefitsList" :key="idx" class="mission-input-row">
                <span class="bullet-check">✓</span>
                <input v-model="programForm.benefitsList[idx]" type="text" class="form-input flex-1" placeholder="Tuliskan poin fasilitas..." />
                <button type="button" @click="removeProgramBenefitRow(idx)" class="btn-action delete" title="Hapus">✕</button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" @click="showProgramModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Program</button>
          </div>
        </form>
      </div>
    </div>

    <!-- PARTNER MODAL -->
    <div v-if="showPartnerModal" class="modal-backdrop" @click.self="showPartnerModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>{{ isEditingPartner ? 'Edit Mitra' : 'Tambah Mitra Kerjasama' }}</h3>
          <button @click="showPartnerModal = false" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="savePartner" class="modal-body">
          <div class="form-group">
            <label>Nama Mitra / Instansi</label>
            <input v-model="partnerForm.name" type="text" class="form-input" placeholder="Contoh: Polres Indramayu" required />
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <input v-model="partnerForm.category" type="text" class="form-input" placeholder="Contoh: Penegakan Hukum, Perbankan" />
          </div>
          <div class="form-group">
            <label>Ruang Lingkup Kerjasama</label>
            <textarea v-model="partnerForm.description" class="form-textarea" rows="3" required></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showPartnerModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Mitra</button>
          </div>
        </form>
      </div>
    </div>

    <!-- REPORT MODAL -->
    <div v-if="showReportModal" class="modal-backdrop" @click.self="showReportModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>{{ isEditingReport ? 'Edit Dokumen Laporan' : 'Tambah Dokumen Laporan RAT' }}</h3>
          <button @click="showReportModal = false" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="saveReport" class="modal-body">
          <div class="form-group">
            <label>Judul Laporan</label>
            <input v-model="reportForm.title" type="text" class="form-input" placeholder="Contoh: Laporan Pertanggungjawaban RAT Tahun Buku 2025" required />
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Tahun Buku</label>
              <input v-model="reportForm.year" type="text" class="form-input" placeholder="2025" />
            </div>
            <div class="form-group flex-1">
              <label>Status Verifikasi</label>
              <input v-model="reportForm.status" type="text" class="form-input" placeholder="Disetujui RAT" />
            </div>
          </div>
          <div class="form-group">
            <label>URL Dokumen Unduhan</label>
            <input v-model="reportForm.downloadUrl" type="text" class="form-input" placeholder="https://... atau #" />
          </div>
          <div class="modal-footer">
            <button type="button" @click="showReportModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Laporan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- FAQ MODAL -->
    <div v-if="showFaqModal" class="modal-backdrop" @click.self="showFaqModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>{{ isEditingFaq ? 'Edit FAQ' : 'Tambah Tanya Jawab (FAQ)' }}</h3>
          <button @click="showFaqModal = false" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="saveFaq" class="modal-body">
          <div class="form-group">
            <label>Pertanyaan</label>
            <input v-model="faqForm.question" type="text" class="form-input" required />
          </div>
          <div class="form-group">
            <label>Jawaban</label>
            <textarea v-model="faqForm.answer" class="form-textarea" rows="4" required></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showFaqModal = false" class="btn btn-secondary">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MESSAGE DETAIL MODAL -->
    <div v-if="showMessageModal && selectedMessage" class="modal-backdrop" @click.self="showMessageModal = false">
      <div class="modal-window">
        <div class="modal-header">
          <h3>Detail Pesan Masuk</h3>
          <button @click="showMessageModal = false" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="msg-detail-meta">
            <div class="meta-item">
              <label>Pengirim:</label>
              <strong>{{ selectedMessage.name }}</strong>
            </div>
            <div class="meta-item" v-if="selectedMessage.email">
              <label>Email:</label>
              <span>{{ selectedMessage.email }}</span>
            </div>
            <div class="meta-item" v-if="selectedMessage.phone">
              <label>Telepon / WhatsApp:</label>
              <span>{{ selectedMessage.phone }}</span>
            </div>
            <div class="meta-item">
              <label>Waktu:</label>
              <span>{{ new Date(selectedMessage.created_at).toLocaleString('id-ID') }}</span>
            </div>
            <div class="meta-item" v-if="selectedMessage.subject">
              <label>Subjek:</label>
              <strong>{{ selectedMessage.subject }}</strong>
            </div>
          </div>

          <div class="msg-detail-body">
            <label>Isi Pesan:</label>
            <p>{{ selectedMessage.message }}</p>
          </div>

          <div class="modal-footer">
            <a v-if="selectedMessage.phone" :href="'https://wa.me/' + selectedMessage.phone.replace(/[^0-9]/g, '')" target="_blank" class="btn btn-primary">
              Balas via WhatsApp
            </a>
            <button type="button" @click="showMessageModal = false" class="btn btn-secondary">Tutup</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.cms-layout {
  display: flex;
  min-height: 100vh;
  background-color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #0F172A;
}

/* Sidebar */
.cms-sidebar {
  width: 260px;
  background: #022C22;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-brand {
  padding: 1.25rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  text-decoration: none;
}

.logo-mark {
  font-size: 1.25rem;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.02em;
}

.badge-role {
  background: rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.sidebar-menu {
  flex: 1;
  padding: 0.85rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow-y: auto;
}

.menu-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6EE7B7;
  font-weight: 700;
  margin-top: 0.85rem;
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  color: #94A3B8;
  background: transparent;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  width: 100%;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #FFFFFF;
}

.menu-btn.active {
  background: #047857;
  color: #FFFFFF;
  font-weight: 600;
}

.count-tag {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.badge-alert {
  margin-left: auto;
  background: #EF4444;
  color: #FFFFFF;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

.sidebar-footer {
  padding: 0.85rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  overflow: hidden;
}

.avatar {
  width: 30px;
  height: 30px;
  background: #047857;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.user-meta {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-name {
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.7rem;
  color: #64748B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-logout {
  background: none;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-logout:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.08);
}

/* Main Area */
.cms-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cms-topbar {
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  padding: 1rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar-left h1 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.topbar-sub {
  font-size: 0.82rem;
  color: #64748B;
  margin: 0.15rem 0 0 0;
}

.btn-secondary-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  color: #334155;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-secondary-nav:hover {
  background: #F8FAFC;
  border-color: #94A3B8;
}

.tab-body {
  padding: 1.75rem;
  flex: 1;
}

.pane-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.pane-action-bar h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.text-muted {
  color: #64748B;
  font-size: 0.85rem;
  margin: 0.2rem 0 0 0;
}

.btn-group-right {
  display: flex;
  gap: 0.6rem;
}

/* Forms */
.form-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.form-section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0F172A;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #F1F5F9;
  margin-bottom: 1.15rem;
}

.form-group {
  margin-bottom: 1.15rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.35rem;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  padding: 0.6rem 0.85rem;
  font-size: 0.88rem;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #0F172A;
  transition: border-color 0.15s ease;
  font-family: inherit;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  outline: none;
  border-color: #047857;
  box-shadow: 0 0 0 2px rgba(4, 120, 87, 0.15);
}

.form-input.font-bold {
  font-weight: 700;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-actions-bar {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #F1F5F9;
  display: flex;
  justify-content: flex-end;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.55rem 1.15rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: all 0.15s ease;
}

.btn-primary {
  background: #047857;
  color: #FFFFFF;
}

.btn-primary:hover {
  background: #065F46;
}

.btn-primary-sm {
  background: #047857;
  color: #FFFFFF;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  background: #F1F5F9;
  color: #334155;
  border: 1px solid #CBD5E1;
}

.btn-secondary:hover {
  background: #E2E8F0;
}

.btn-secondary-sm {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  color: #334155;
  padding: 0.35rem 0.65rem;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

/* Alert Banner */
.alert-banner {
  padding: 0.75rem 1.75rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.alert-banner.success {
  background: #ECFDF5;
  color: #065F46;
  border-bottom: 1px solid #A7F3D0;
}

.alert-banner.error {
  background: #FEF2F2;
  color: #991B1B;
  border-bottom: 1px solid #FECACA;
}

/* Stats Cards */
.stats-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.25rem;
}

.metric-val {
  font-size: 1.75rem;
  font-weight: 800;
  color: #047857;
}

.metric-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1E293B;
  margin-top: 0.2rem;
}

.metric-desc {
  font-size: 0.78rem;
  color: #64748B;
  margin-top: 0.2rem;
}

.quick-overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.dashboard-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  overflow: hidden;
}

.box-header {
  padding: 0.85rem 1.15rem;
  border-bottom: 1px solid #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-header h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.box-content {
  padding: 1rem 1.15rem;
}

.empty-state {
  color: #94A3B8;
  font-size: 0.85rem;
  text-align: center;
  padding: 1.5rem 0;
}

.empty-state-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.empty-state-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 0.35rem 0;
}

.empty-state-card p {
  color: #64748B;
  font-size: 0.85rem;
  margin: 0;
}

/* Mini Lists */
.news-list-mini {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mini-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.mini-item:hover {
  background: #F8FAFC;
}

.mini-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

.mini-meta h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 0.2rem 0;
}

.mini-tag {
  font-size: 0.72rem;
  color: #64748B;
}

.messages-list-mini {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.msg-mini-item {
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  cursor: pointer;
}

.msg-mini-item.unread {
  background: #ECFDF5;
  border-color: #A7F3D0;
}

.msg-sender {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.msg-snippet {
  font-size: 0.8rem;
  color: #475569;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Tables */
.table-container {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  overflow-x: auto;
}

.cms-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.cms-table th {
  background: #F8FAFC;
  padding: 0.75rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #E2E8F0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.cms-table td {
  padding: 0.85rem 1rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #F1F5F9;
  vertical-align: middle;
}

.tr-unread {
  background: #F0FDF4;
}

.table-thumb {
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: 4px;
}

.table-title {
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.15rem;
}

.table-desc {
  color: #64748B;
  font-size: 0.8rem;
  margin: 0;
  max-width: 300px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-pill {
  display: inline-block;
  background: #EFF6FF;
  color: #1D4ED8;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.status-chip {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.status-chip.published {
  background: #ECFDF5;
  color: #047857;
}

.status-chip.draft {
  background: #FEF3C7;
  color: #92400E;
}

.action-btn-group {
  display: flex;
  gap: 0.35rem;
  justify-content: flex-end;
}

.btn-action {
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-action.edit {
  background: #EFF6FF;
  color: #1D4ED8;
}

.btn-action.edit:hover {
  background: #DBEAFE;
}

.btn-action.delete {
  background: #FEF2F2;
  color: #DC2626;
}

.btn-action.delete:hover {
  background: #FEE2E2;
}

/* Programs */
.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.program-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
}

.prog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.prog-badge {
  background: #ECFDF5;
  color: #047857;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  border: 1px solid #A7F3D0;
}

.prog-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 0.45rem 0;
}

.prog-desc {
  color: #475569;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.prog-benefits {
  background: #F8FAFC;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.benefit-item {
  font-size: 0.8rem;
  color: #047857;
  margin-bottom: 0.25rem;
}

.prog-footer {
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
  padding-top: 0.85rem;
  border-top: 1px solid #F1F5F9;
}

/* Mission Inputs */
.mission-inputs-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mission-input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mission-index {
  width: 24px;
  height: 24px;
  background: #047857;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.bullet-check {
  font-weight: 700;
  color: #047857;
  font-size: 0.9rem;
}

/* Stats Edit */
.stats-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.stat-edit-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.25rem;
}

.stat-id-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748B;
}

.stat-val-input {
  font-size: 1.25rem;
  font-weight: 700;
  color: #047857;
}

/* Messages */
.messages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

.message-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.15rem;
}

.msg-subject {
  font-weight: 600;
  color: #1E293B;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.msg-body {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.msg-table-snippet {
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Message Detail Modal Content */
.msg-detail-meta {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.meta-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.meta-item label {
  color: #64748B;
  min-width: 120px;
}

.msg-detail-body {
  margin-bottom: 1.5rem;
}

.msg-detail-body label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.35rem;
}

.msg-detail-body p {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 1rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

/* Modals */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
}

.modal-window {
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1.15rem 1.35rem;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #94A3B8;
  cursor: pointer;
  line-height: 1;
}

.modal-close:hover {
  color: #0F172A;
}

.modal-body {
  padding: 1.35rem;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 1rem 1.35rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
  background: #F8FAFC;
}

/* Settings */
.settings-container {
  max-width: 650px;
}

.settings-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.5rem;
}

.status-indicator-box {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-top: 1rem;
}

.indicator-dot.online {
  width: 10px;
  height: 10px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #BBF7D0;
  flex-shrink: 0;
}

.text-sm {
  font-size: 0.8rem;
  color: #047857;
  margin: 0.2rem 0 0 0;
}

.loading-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #E2E8F0;
  border-top-color: #047857;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.sidebar-brand-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-logout-mobile {
  display: none;
  background: rgba(239, 68, 68, 0.2);
  color: #FCA5A5;
  border: 1px solid rgba(239, 68, 68, 0.3);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout-mobile:hover {
  background: #EF4444;
  color: #FFFFFF;
}

@media (max-width: 900px) {
  .cms-layout {
    flex-direction: column;
  }
  .cms-sidebar {
    width: 100%;
    height: auto;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
  }
  .sidebar-brand {
    padding: 0.65rem 1rem;
  }
  .btn-logout-mobile {
    display: inline-block;
  }
  .sidebar-menu {
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0.4rem 0.65rem;
    gap: 0.35rem;
    -webkit-overflow-scrolling: touch;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .menu-label {
    display: none;
  }
  .menu-btn {
    width: auto;
    flex-shrink: 0;
    padding: 0.45rem 0.75rem;
    font-size: 0.8rem;
    border-radius: 6px;
  }
  .sidebar-footer {
    display: none;
  }
  .cms-main {
    width: 100%;
    min-width: 0;
  }
  .cms-topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
  }
  .topbar-left h1 {
    font-size: 1.25rem;
  }
  .topbar-sub {
    font-size: 0.8rem;
  }
  .topbar-right {
    width: 100%;
    display: flex;
    gap: 0.5rem;
  }
  .topbar-right .btn {
    flex: 1;
    font-size: 0.85rem;
    padding: 0.65rem;
    text-align: center;
    justify-content: center;
  }
  .cms-content {
    padding: 1rem 0.75rem;
  }
  .quick-overview-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  .form-card {
    padding: 1.15rem 1rem;
    border-radius: 8px;
  }
  .form-header h2 {
    font-size: 1.15rem;
  }
  .form-header p {
    font-size: 0.8rem;
  }
  .data-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
  }
  .data-table {
    min-width: 580px;
  }
  .data-table th, .data-table td {
    padding: 0.6rem 0.75rem;
    font-size: 0.82rem;
  }
  .modal-backdrop {
    padding: 0.4rem;
  }
  .modal-window {
    max-height: 94vh;
    border-radius: 8px;
    width: 100%;
  }
  .modal-header {
    padding: 0.85rem 1rem;
  }
  .modal-header h3 {
    font-size: 1rem;
  }
  .modal-body {
    padding: 0.85rem 1rem;
  }
  .modal-footer {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  .modal-footer .btn {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .cms-content {
    padding: 0.75rem 0.5rem;
  }
  .topbar-left h1 {
    font-size: 1.15rem;
  }
  .topbar-sub {
    font-size: 0.75rem;
  }
  .kpi-card {
    padding: 0.75rem;
  }
  .kpi-val {
    font-size: 1.35rem;
  }
  .kpi-label {
    font-size: 0.72rem;
  }
  .form-card {
    padding: 0.85rem 0.75rem;
  }
  .form-input, .form-textarea, .form-select {
    padding: 0.55rem 0.65rem;
    font-size: 0.85rem;
  }
  .form-group label {
    font-size: 0.75rem;
  }
  .btn-save-primary, .btn-submit-panel {
    width: 100%;
    padding: 0.75rem;
  }
  .mission-input-row {
    gap: 0.35rem;
  }
  .btn-action {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
}
</style>
