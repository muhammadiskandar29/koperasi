<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'

const aboutData = ref({
  historyP1: 'Koperasi Konsumen Makmur Lestari Cikawung (KMLC) didirikan sebagai respon atas kurangnya optimalisasi lahan tidur eks-kawasan Perhutani di wilayah Desa Cikawung, Kabupaten Indramayu. Lahan tersebut memiliki valuasi agrikultur tinggi yang membutuhkan intervensi manajemen terstruktur.',
  historyP2: 'Pada tahun 2021, Bapak Unang Herman menginisiasi konsolidasi para petani lokal ke dalam satu payung hukum yang kredibel. Melalui koordinasi vertikal dengan kepolisian dan instansi pemerintahan, KMLC sukses memperoleh hak kelola lahan berbasis kemitraan berkelanjutan.',
  vision: 'Menjadi pilar strategis ketahanan pangan nasional tingkat regional melalui tata kelola agrikultur modern yang transparan dan akuntabel.',
  missions: [
    'Inklusi finansial dan teknis bagi Kelompok Tani Hutan (KTH).',
    'Implementasi standar operasional prosedur yang transparan.',
    'Menciptakan ekosistem pasar (supply chain) yang efisien.'
  ],
  founderName: 'Unang Herman',
  founderTitle: 'Ketua / Inisiator KMLC',
  secretaryName: 'Ahmad S.',
  treasurerName: 'Siti N.',
  supervisorName: 'Perwakilan Kepolisian & Dinas Pertanian',
  aboutImage: '/assets/images/hero.jpg'
})

const profileData = ref({
  name: 'Koperasi Konsumen Makmur Lestari Cikawung',
  address: 'Kec. Terisi, Kab. Indramayu',
  legalNumber: 'AHU-0012345.AH.01.26.TAHUN 2021',
  nib: '1234567890123'
})

onMounted(async () => {
  try {
    const res = await fetch('/api/content?section=about&t=' + Date.now()).then(r => r.json())
    if (res.success && res.data) {
      aboutData.value = { ...aboutData.value, ...res.data }
    }
  } catch (e) {}

  try {
    const pRes = await fetch('/api/content?section=profile&t=' + Date.now()).then(r => r.json())
    if (pRes.success && pRes.data) {
      profileData.value = { ...profileData.value, ...pRes.data }
    }
  } catch (e) {}
})
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Profil Korporasi</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Tentang KMLC</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Informasi sejarah pendirian, legalitas, serta struktur direksi Koperasi Konsumen Makmur Lestari Cikawung.
        </p>
      </div>
    </section>

    <!-- History & Founder -->
    <section class="section pt-0">
      <div class="container">
        <div class="about-detailed-grid">
          <div class="content-side animate-fade-up" style="animation-delay: 0.2s">
            <h2 class="mb-4">Sejarah Organisasi</h2>
            <p class="text-muted mb-4">
              {{ aboutData.historyP1 }}
            </p>
            <p class="text-muted mb-4" v-if="aboutData.historyP2">
              {{ aboutData.historyP2 }}
            </p>
            
            <div class="vision-mission mt-5">
              <BaseCard>
                <div class="vm-header">
                  <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <h3>Visi Koperasi</h3>
                </div>
                <p class="text-muted">{{ aboutData.vision }}</p>
              </BaseCard>

              <BaseCard class="mt-4">
                <div class="vm-header">
                  <svg class="svg-icon" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  <h3>Misi Organisasi</h3>
                </div>
                <ul class="mission-list text-muted">
                  <li v-for="(m, i) in aboutData.missions" :key="i">{{ m }}</li>
                </ul>
              </BaseCard>
            </div>
          </div>
          
          <div class="image-side animate-fade-up" style="animation-delay: 0.3s">
            <div class="image-stack">
              <div class="img-large">
                <img :src="aboutData.aboutImage || '/assets/images/hero.jpg'" alt="Kegiatan Operasional Koperasi" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Structural & Legal Section -->
    <section class="section bg-light border-top">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Legalitas & Manajemen</h2>
          <p class="section-subtitle">Struktur kepengurusan profesional dengan kepatuhan hukum yang terverifikasi.</p>
        </div>
        
        <div class="legal-grid">
          <BaseCard class="legal-card animate-fade-up">
            <h3 class="mb-4">Data Korporat</h3>
            <ul class="legal-list">
              <li><strong>Entitas Hukum:</strong> {{ profileData.name }}</li>
              <li><strong>Domisili:</strong> {{ profileData.address }}</li>
              <li><strong>Bentuk Organisasi:</strong> Koperasi Primer Konsumen</li>
              <li><strong>Nomor AHU:</strong> {{ profileData.legalNumber }}</li>
              <li><strong>NIB:</strong> {{ profileData.nib }}</li>
            </ul>
          </BaseCard>

          <BaseCard class="legal-card animate-fade-up" style="animation-delay: 0.2s">
            <h3 class="mb-4">Dewan Direksi & Pengawas</h3>
            <div class="org-structure">
              <div class="org-item">
                <span class="org-role">{{ aboutData.founderTitle || 'Ketua Pengurus' }}</span>
                <span class="org-name">{{ aboutData.founderName || 'Unang Herman' }}</span>
              </div>
              <div class="org-item">
                <span class="org-role">Sekretaris</span>
                <span class="org-name">{{ aboutData.secretaryName || 'Ahmad S.' }}</span>
              </div>
              <div class="org-item">
                <span class="org-role">Bendahara</span>
                <span class="org-name">{{ aboutData.treasurerName || 'Siti N.' }}</span>
              </div>
              <div class="org-item">
                <span class="org-role">Dewan Pengawas</span>
                <span class="org-name">{{ aboutData.supervisorName || 'Perwakilan Kepolisian & Dinas Pertanian' }}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 5rem;
}

.bg-light {
  background-color: var(--color-bg);
}
.border-top {
  border-top: 1px solid var(--color-border);
}

.page-header {
  padding: 5rem 0 3rem 0;
  background: white;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4rem;
}

.badge-sub {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto;
}

.pt-0 { padding-top: 0; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 3rem; }

.about-detailed-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
}

.text-muted { color: var(--color-text-muted); line-height: 1.8; font-size: 0.95rem; }

.vm-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.svg-icon {
  width: 24px;
  height: 24px;
  stroke: var(--color-primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.vm-header h3 {
  font-size: 1.125rem;
}

.mission-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mission-list li {
  position: relative;
  padding-left: 1.5rem;
}

.mission-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background-color: var(--color-primary);
  border-radius: 50%;
}

.image-stack {
  position: relative;
  height: 100%;
}

.img-large {
  border-radius: var(--radius-md);
  overflow: hidden;
  height: 100%;
  min-height: 500px;
  border: 1px solid var(--color-border);
}

.img-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.legal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.legal-list {
  list-style: none;
  padding: 0;
}

.legal-list li {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.legal-list li:last-child {
  border-bottom: none;
}

.org-structure {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.org-item {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  padding: 1rem 1.25rem;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-primary);
}

.org-role {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.org-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-main);
}

@media (max-width: 992px) {
  .about-detailed-grid, .legal-grid {
    grid-template-columns: 1fr;
  }
  .img-large {
    min-height: 400px;
  }
  .legal-list li {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .page-title { font-size: 1.85rem; }
  .page-header { padding: 2.25rem 0; margin-bottom: 1.5rem; }
  .page-subtitle { font-size: 0.92rem; }
  .img-large { min-height: 220px; }
  .about-detailed-grid { gap: 1.75rem; }
  .legal-grid { gap: 1.25rem; }
  .org-item { padding: 0.85rem 1rem; }
}

@media (max-width: 480px) {
  .page-title { font-size: 1.5rem; line-height: 1.3; }
  .page-header { padding: 1.75rem 0; margin-bottom: 1rem; }
  .page-subtitle { font-size: 0.85rem; line-height: 1.5; }
  .badge-sub { font-size: 0.72rem; margin-bottom: 0.5rem; }
  .img-large { min-height: 180px; max-height: 220px; }
  .about-detailed-grid { gap: 1.25rem; }
  .about-story h3 { font-size: 1.15rem; }
  .about-story p { font-size: 0.85rem; line-height: 1.6; }
  .mission-list li { font-size: 0.85rem; padding-left: 1.25rem; }
  .legal-grid { gap: 1rem; }
  .legal-list li { padding: 0.55rem 0; font-size: 0.82rem; }
  .org-structure { gap: 0.65rem; }
  .org-item { padding: 0.65rem 0.85rem; border-radius: 4px; }
  .org-role { font-size: 0.68rem; margin-bottom: 0.15rem; }
  .org-name { font-size: 0.9rem; }
}
</style>
