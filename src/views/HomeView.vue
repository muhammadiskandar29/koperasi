<script setup>
import { ref, onMounted } from 'vue'
import Hero from '../components/Hero.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import Accordion from '../components/ui/Accordion.vue'

const dynamicStats = ref([
  { id: 'lahan', value: '50+', label: 'Hektar Lahan Produktif Dikelola' },
  { id: 'anggota', value: '120+', label: 'Anggota KTH Terdaftar' },
  { id: 'panen', value: '1.5K', label: 'Ton Estimasi Panen Tahunan' }
])

const dynamicNews = ref([
  {
    id: 1,
    title: 'Panen Raya Jagung Musim Pertama Bersama Polres Indramayu',
    category: 'Laporan Kegiatan',
    image_url: '/assets/images/harvest.jpg',
    summary: 'Kegiatan panen raya berhasil dilaksanakan pada lahan agrikultur seluas 15 Hektar. Proses ini disaksikan oleh perwakilan kepolisian dan otoritas desa setempat.'
  },
  {
    id: 2,
    title: 'Penyuluhan Manajemen Keuangan Usaha Tani untuk KTH',
    category: 'Edukasi Anggota',
    image_url: '/assets/images/hero.jpg',
    summary: 'KMLC menggelar edukasi pengelolaan modal dan pencatatan hasil panen demi mencegah resiko finansial dan memastikan stabilitas likuiditas para anggota.'
  }
])

onMounted(async () => {
  try {
    const statsRes = await fetch('/api/stats?t=' + Date.now()).then(r => r.json())
    if (statsRes.success && statsRes.data && statsRes.data.length > 0) {
      dynamicStats.value = statsRes.data.map(item => ({
        id: item.id,
        value: item.value,
        label: item.label
      }))
    }
  } catch (e) {
    // fallback gracefully
  }

  try {
    const newsRes = await fetch('/api/news?t=' + Date.now()).then(r => r.json())
    if (newsRes.success && newsRes.data && newsRes.data.length > 0) {
      dynamicNews.value = newsRes.data.filter(n => n.is_published !== false)
    }
  } catch (e) {
    // fallback gracefully
  }

  try {
    const faqRes = await fetch('/api/content?section=faqs&t=' + Date.now()).then(r => r.json())
    if (faqRes.success && faqRes.data && faqRes.data.length > 0) {
      dynamicFaqs.value = faqRes.data
    }
  } catch (e) {
    // fallback gracefully
  }
})

const dynamicFaqs = ref([
  { id: 1, question: 'Prosedur Pendaftaran Mitra KTH KMLC', answer: 'Registrasi dapat dilakukan secara luring di kantor sekretariat Desa Cikawung atau melalui form pada halaman Kontak. Calon mitra diwajibkan memiliki kelengkapan administrasi domisili dan mematuhi standar operasional KMLC.' },
  { id: 2, question: 'Struktur Permodalan & Kewajiban Finansial', answer: 'Kewajiban finansial meliputi Simpanan Pokok dan Simpanan Wajib sesuai AD/ART yang ditetapkan dalam Rapat Anggota. Dana dikelola secara transparan dan dipublikasikan pada laporan neraca berkala.' },
  { id: 3, question: 'Mekanisme Distribusi Hasil Panen', answer: 'KMLC berkedudukan sebagai offtaker utama dengan penetapan harga beli (HPP) yang mengacu pada indeks harga pasar regional, memastikan proteksi nilai bagi para anggota petani.' }
])

const selectedNews = ref(null)
const showNewsModal = ref(false)

const openNewsDetail = (item) => {
  selectedNews.value = item
  showNewsModal.value = true
}

const closeNewsDetail = () => {
  showNewsModal.value = false
  selectedNews.value = null
}
</script>

<template>
  <div>
    <Hero />
    
    <!-- Quick Highlights Section -->
    <section class="section pt-0 bg-white">
      <div class="container">
        <div class="highlights-grid animate-fade-up">
          <template v-for="(stat, idx) in dynamicStats.slice(0, 3)" :key="stat.id">
            <div class="highlight-item">
              <h2>{{ stat.value }}</h2>
              <p>{{ stat.label }}</p>
            </div>
            <div v-if="idx < dynamicStats.slice(0, 3).length - 1" class="divider-vertical"></div>
          </template>
        </div>
      </div>
    </section>

    <!-- Latest Impact / News -->
    <section class="section bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <div class="badge-sub animate-fade-up">Kinerja Operasional</div>
          <h2 class="section-title animate-fade-up" style="animation-delay: 0.1s">Dampak Nyata Lapangan</h2>
          <p class="section-subtitle animate-fade-up" style="animation-delay: 0.2s">
            Laporan kegiatan operasional koperasi dalam meningkatkan taraf hidup ekonomi masyarakat agrikultur Cikawung secara terstruktur.
          </p>
        </div>

        <div class="news-grid">
          <BaseCard 
            v-for="(item, i) in dynamicNews.slice(0, 4)" 
            :key="item.id" 
            class="news-card animate-fade-up" 
            :style="{ animationDelay: (i * 0.1) + 's', padding: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }"
          >
            <div class="news-img-wrapper">
              <img :src="item.image_url || '/assets/images/harvest.jpg'" :alt="item.title" />
              <div class="news-tag">{{ item.category }}</div>
            </div>
            <div class="news-content">
              <h3>{{ item.title }}</h3>
              <p class="text-muted">{{ item.summary }}</p>
              <button type="button" class="read-more-btn" @click="openNewsDetail(item)">
                Baca Selengkapnya &rarr;
              </button>
            </div>
          </BaseCard>
        </div>

        <div class="text-center mt-5 animate-fade-up">
          <router-link to="/kegiatan" class="btn btn-outline" style="border-radius: 9999px; padding: 0.8rem 2rem; font-weight: 700;">
            Lihat Galeri Foto & Video Lapangan &rarr;
          </router-link>
        </div>
      </div>
    </section>

    <!-- Interactive FAQ Section -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-5">
          <div class="badge-sub animate-fade-up">Informasi Publik</div>
          <h2 class="section-title animate-fade-up" style="animation-delay: 0.1s">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div class="faq-container animate-fade-up" style="animation-delay: 0.2s">
          <Accordion 
            v-for="faq in dynamicFaqs" 
            :key="faq.id"
            :title="faq.question" 
            :content="faq.answer" 
          />
        </div>
      </div>
    </section>

    <!-- Modal Detail Berita / Kegiatan Lapangan -->
    <div v-if="showNewsModal && selectedNews" class="news-modal-overlay" @click.self="closeNewsDetail">
      <div class="news-modal-card">
        <button class="modal-close-btn" @click="closeNewsDetail" title="Tutup">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-cover-wrap">
          <img :src="selectedNews.image_url || '/assets/images/harvest.jpg'" :alt="selectedNews.title" class="modal-cover-img" />
          <div class="modal-category-chip">{{ selectedNews.category }}</div>
        </div>

        <div class="modal-content-area">
          <div class="modal-meta-line">
            <span>{{ new Date(selectedNews.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
            <span>•</span>
            <span>Koperasi Konsumen Makmur Lestari Cikawung</span>
          </div>

          <h2 class="modal-headline">{{ selectedNews.title }}</h2>

          <div class="modal-summary-box">
            {{ selectedNews.summary }}
          </div>

          <div class="modal-body-paragraphs">
            <p v-for="(p, pIdx) in (selectedNews.content || selectedNews.summary).split('\n')" :key="pIdx">
              {{ p }}
            </p>
          </div>

          <div class="modal-footer-line">
            <button type="button" class="btn btn-primary" @click="closeNewsDetail">Tutup Bacaan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pt-0 { padding-top: 0; }
.bg-white { background: var(--color-surface); }
.bg-light { background: var(--color-bg); }
.mb-5 { margin-bottom: 4rem; }

.badge-sub {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.highlights-grid {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: white;
  padding: 3rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transform: translateY(-50px);
  position: relative;
  z-index: 10;
}

.highlight-item {
  text-align: center;
}

.highlight-item h2 {
  font-size: 3rem;
  color: var(--color-primary-dark);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.highlight-item p {
  color: var(--color-text-muted);
  font-size: 1rem;
}

.divider-vertical {
  width: 1px;
  height: 60px;
  background: var(--color-border);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.news-img-wrapper {
  position: relative;
  height: 250px;
  width: 100%;
}

.news-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-img-wrapper img {
  transform: scale(1.02);
}

.news-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  color: var(--color-primary-dark);
  padding: 0.3rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid var(--color-border);
}

.news-content {
  padding: 2rem;
}

.news-content h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-text-main);
}

.text-muted {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.read-more {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.95rem;
}

.read-more:hover {
  text-decoration: underline;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .highlights-grid {
    flex-direction: column;
    gap: 2rem;
    transform: translateY(0);
    margin-top: -2rem;
  }
  .divider-vertical {
    width: 80%;
    height: 1px;
  }
  .news-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.25rem;
  }
  .page-header {
    padding: 3rem 0;
  }
  .highlight-item h2 {
    font-size: 2.25rem;
  }
  .highlights-grid {
    padding: 2rem 1rem;
  }
  .news-img-wrapper {
    height: 180px;
  }
  .news-content {
    padding: 1.5rem;
  }
  .news-content h3 {
    font-size: 1.15rem;
  }
}

.read-more-btn {
  background: none;
  border: none;
  color: var(--color-primary, #047857);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: gap 0.2s ease, color 0.2s ease;
}

.read-more-btn:hover {
  color: var(--color-primary-dark, #022C22);
  gap: 0.6rem;
}

/* Modal Detail Berita */
.news-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

.news-modal-card {
  background: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.96) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0F172A;
  z-index: 10;
  transition: all 0.15s ease;
}

.modal-close-btn:hover {
  background: #FFFFFF;
  transform: scale(1.08);
}

.modal-cover-wrap {
  position: relative;
  width: 100%;
  height: 320px;
  background: #022C22;
}

.modal-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-category-chip {
  position: absolute;
  bottom: 1.25rem;
  left: 1.5rem;
  background: #047857;
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.modal-content-area {
  padding: 2rem 2.25rem;
}

.modal-meta-line {
  font-size: 0.85rem;
  color: #64748B;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.modal-headline {
  font-size: 1.65rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.35;
  margin: 0 0 1.25rem 0;
}

.modal-summary-box {
  background: #F8FAFC;
  border-left: 4px solid #047857;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: #334155;
  line-height: 1.6;
  border-radius: 0 8px 8px 0;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.modal-body-paragraphs {
  font-size: 1rem;
  color: #334155;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.modal-body-paragraphs p {
  margin-bottom: 1rem;
}

.modal-footer-line {
  padding-top: 1.5rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 480px) {
  .highlights-grid {
    padding: 1rem 0.75rem;
    margin-top: -0.5rem;
    gap: 1rem;
    border-radius: 8px;
  }
  .highlight-item h2 {
    font-size: 1.55rem;
  }
  .highlight-item p {
    font-size: 0.75rem;
  }
  .divider-vertical {
    width: 60%;
  }
  .news-img-wrapper {
    height: 145px;
  }
  .news-content {
    padding: 0.85rem 1rem;
  }
  .news-content h3 {
    font-size: 0.98rem;
    line-height: 1.3;
  }
  .news-content p {
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .read-more-btn {
    font-size: 0.85rem;
  }
  .news-modal-overlay {
    padding: 0.4rem;
  }
  .news-modal-card {
    border-radius: 10px;
    max-height: 94vh;
  }
  .modal-cover-wrap {
    height: 160px;
  }
  .modal-category-chip {
    bottom: 0.65rem;
    left: 0.85rem;
    font-size: 0.68rem;
    padding: 0.2rem 0.55rem;
  }
  .modal-content-area {
    padding: 0.9rem 1rem 1.25rem;
  }
  .modal-meta-line {
    font-size: 0.75rem;
    gap: 0.35rem;
  }
  .modal-headline {
    font-size: 1.15rem;
    line-height: 1.3;
    margin-bottom: 0.65rem;
  }
  .modal-summary-box {
    font-size: 0.82rem;
    padding: 0.6rem 0.75rem;
    margin-bottom: 0.85rem;
    border-left-width: 3px;
  }
  .modal-body-paragraphs {
    font-size: 0.84rem;
    line-height: 1.55;
    margin-bottom: 1.25rem;
  }
  .modal-footer-line .btn {
    width: 100%;
  }
}
</style>
