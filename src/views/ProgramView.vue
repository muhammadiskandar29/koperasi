<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'

const programsList = ref([
  {
    id: 1,
    title: 'Pembiayaan Koperasi Mikro',
    badge: 'Finansial',
    description: 'Unit Simpan Pinjam (KSP) KMLC berfokus pada penyaluran kredit produktif bagi para anggota untuk memastikan tidak adanya hambatan operasional akibat kendala likuiditas.',
    benefits: ['Plafon pinjaman khusus sarana produksi pertanian', 'Sistem bagi hasil disesuaikan siklus panen', 'Pencairan dana tepat waktu tanpa jaminan memberatkan', 'Fasilitas simpanan terkelola transparan']
  },
  {
    id: 2,
    title: 'Pengembangan SDM Pertanian',
    badge: 'Edukasi',
    description: 'Divisi edukasi KMLC menyelenggarakan pelatihan intensif untuk meningkatkan standar kompetensi dan kualitas hidup Kelompok Tani Hutan (KTH) binaan kami.',
    benefits: ['Pelatihan pencegahan hama dan penyakit', 'Sertifikasi dan standarisasi mutu hasil panen', 'Workshop literasi keuangan bagi petani', 'Edukasi keselamatan kerja lapangan']
  }
])

const selectedProgram = ref(null)
const showProgramModal = ref(false)

const openProgramDetail = (prog) => {
  selectedProgram.value = prog
  showProgramModal.value = true
}

const closeProgramDetail = () => {
  showProgramModal.value = false
  selectedProgram.value = null
}

onMounted(async () => {
  try {
    const res = await fetch('/api/programs?t=' + Date.now()).then(r => r.json())
    if (res.success && res.data && res.data.length > 0) {
      programsList.value = res.data.filter(p => p.is_active !== false)
    }
  } catch (e) {}
})
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Katalog Layanan</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Layanan & Program Kerja</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Solusi agrikultur terpadu dan berkelanjutan untuk mewujudkan kemandirian pangan nasional.
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        
        <!-- Core Program 1: Agriculture -->
        <div class="program-showcase animate-fade-up">
          <div class="showcase-content">
            <h2 class="mb-4">Manajemen Lahan Agrikultur</h2>
            <p class="text-muted mb-4">
              KMLC menjalankan fungsi strategis dalam mengelola lahan non-produktif menjadi area agrikultur bernilai tinggi. Proses ini dikelola dengan standar profesionalisme melalui tiga fase utama:
            </p>
            <div class="steps-grid mt-4">
              <div class="step-item">
                <div class="step-header">
                  <span class="step-num">01</span>
                  <h4>Pra-Tanam</h4>
                </div>
                <p>Pengadaan alat berat untuk pengolahan tanah awal serta perizinan legalitas Hak Guna lahan secara komprehensif.</p>
              </div>
              <div class="step-item">
                <div class="step-header">
                  <span class="step-num">02</span>
                  <h4>Saprotan</h4>
                </div>
                <p>Penyediaan bibit unggul tersertifikasi, alokasi pupuk, dan sistem irigasi teknis terstandar.</p>
              </div>
              <div class="step-item">
                <div class="step-header">
                  <span class="step-num">03</span>
                  <h4>Off-take</h4>
                </div>
                <p>Penyerapan hasil panen secara penuh dengan kontrak harga kompetitif yang melindungi stabilitas ekonomi petani.</p>
              </div>
            </div>
          </div>
          <div class="showcase-visual">
            <img src="/assets/images/harvest.jpg" alt="Panen Jagung" class="rounded-img" />
          </div>
        </div>

        <hr class="divider my-5" />

        <!-- Dynamic Programs List from API -->
        <div class="other-programs-grid">
          <BaseCard v-for="(prog, idx) in programsList" :key="prog.id" class="animate-fade-up" :style="{ animationDelay: (idx * 0.1) + 's' }">
            <div class="icon-wrapper">
              <span class="prog-badge">{{ prog.badge || 'Layanan' }}</span>
            </div>
            <h3 class="title mt-2">{{ prog.title }}</h3>
            <p class="desc mb-4">{{ prog.description }}</p>
            <ul class="feature-list" v-if="prog.benefits && prog.benefits.length">
              <li v-for="(b, i) in prog.benefits" :key="i">{{ b }}</li>
            </ul>
            <div class="card-footer-action">
              <button type="button" class="btn-detail-link" @click="openProgramDetail(prog)">
                Detail Layanan &rarr;
              </button>
            </div>
          </BaseCard>
        </div>

      </div>
    </section>

    <!-- Modal Detail Program Layanan -->
    <div v-if="showProgramModal && selectedProgram" class="program-modal-overlay" @click.self="closeProgramDetail">
      <div class="program-modal-card">
        <button class="modal-close-btn" @click="closeProgramDetail" title="Tutup">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-content-area">
          <span class="modal-program-badge">{{ selectedProgram.badge || 'Program Unggulan' }}</span>
          <h2 class="modal-headline">{{ selectedProgram.title }}</h2>

          <div class="modal-description-box">
            {{ selectedProgram.description }}
          </div>

          <div class="modal-benefits-section" v-if="selectedProgram.benefits && selectedProgram.benefits.length">
            <h4 class="benefits-heading">Fasilitas & Keuntungan Anggota:</h4>
            <div class="benefits-grid-list">
              <div v-for="(b, bIdx) in selectedProgram.benefits" :key="bIdx" class="benefit-check-row">
                <span class="check-icon">✓</span>
                <span>{{ b }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer-line">
            <a 
              :href="'https://wa.me/6281234567890?text=' + encodeURIComponent('Halo Pengurus KMLC, saya ingin menanyakan informasi mengenai program ' + selectedProgram.title)" 
              target="_blank" 
              class="btn btn-primary"
            >
              Konsultasi Program via WhatsApp
            </a>
            <button type="button" class="btn btn-secondary" @click="closeProgramDetail">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 5rem;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.page-header {
  padding: 5rem 0 3rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  background: white;
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

.pt-0 {
  padding-top: 2rem;
}

.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.my-5 { margin: 5rem 0; }
.text-muted { color: var(--color-text-muted); line-height: 1.8; font-size: 1rem; }

/* Showcase 1 */
.program-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: flex-start;
  background: var(--color-surface);
  padding: 3rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.steps-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  background: var(--color-bg);
  padding: 1.25rem;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-primary);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.step-num {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

.step-item h4 {
  font-size: 1.125rem;
  color: var(--color-text-main);
}

.step-item p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.rounded-img {
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.divider {
  border: 0;
  height: 1px;
  background: var(--color-border);
}

/* Other Programs */
.other-programs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.icon-wrapper {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.icon-wrapper svg {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.desc {
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: 0.95rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background-color: var(--color-primary);
  border-radius: 50%;
}

@media (max-width: 992px) {
  .program-showcase {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
  .other-programs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title { font-size: 1.85rem; }
  .page-header { padding: 2.25rem 0; margin-bottom: 1.5rem; }
  .program-showcase { padding: 1.35rem; gap: 1.5rem; }
  .rounded-img { min-height: 180px; }
  .other-programs-grid { gap: 1.25rem; }
  .icon-wrapper svg { width: 26px; height: 26px; }
  .title { font-size: 1.1rem; }
}

@media (max-width: 480px) {
  .page-title { font-size: 1.5rem; line-height: 1.3; }
  .page-header { padding: 1.75rem 0; margin-bottom: 1rem; }
  .page-subtitle { font-size: 0.85rem; line-height: 1.5; }
  .program-showcase { padding: 1rem; gap: 1.25rem; border-radius: 8px; }
  .program-showcase h2 { font-size: 1.2rem; margin-bottom: 0.75rem; }
  .steps-grid { gap: 0.85rem; }
  .step-item { padding: 0.65rem 0.85rem; border-radius: 4px; }
  .step-header { gap: 0.5rem; margin-bottom: 0.35rem; }
  .step-num { font-size: 0.95rem; }
  .step-item h4 { font-size: 0.92rem; }
  .step-item p { font-size: 0.8rem; line-height: 1.45; }
  .rounded-img { max-height: 180px; min-height: auto; }
  .other-programs-grid { gap: 1rem; }
  .title { font-size: 1rem; line-height: 1.3; }
  .desc { font-size: 0.82rem; line-height: 1.5; margin-bottom: 0.75rem !important; }
  .feature-list li { font-size: 0.8rem; padding-left: 1.25rem; margin-bottom: 0.35rem; }
  .program-modal-overlay { padding: 0.4rem; }
  .program-modal-card { border-radius: 10px; max-height: 94vh; }
  .modal-content-area { padding: 1rem; }
  .modal-headline { font-size: 1.15rem; line-height: 1.3; }
  .modal-description-box { font-size: 0.82rem; padding: 0.65rem 0.85rem; line-height: 1.5; margin-bottom: 1rem; }
  .modal-benefits-section { margin-bottom: 1.25rem; }
  .benefit-check-row { font-size: 0.8rem; gap: 0.45rem; }
  .modal-footer-line { flex-direction: column; gap: 0.5rem; }
  .modal-footer-line .btn { width: 100%; }
}

.card-footer-action {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #E2E8F0);
}

.btn-detail-link {
  background: none;
  border: none;
  color: var(--color-primary, #047857);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.btn-detail-link:hover {
  color: var(--color-primary-dark, #022C22);
  gap: 0.55rem;
}

/* Modal Detail Program */
.program-modal-overlay {
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

.program-modal-card {
  background: #FFFFFF;
  border-radius: 14px;
  width: 100%;
  max-width: 650px;
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
  width: 34px;
  height: 34px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
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
  background: #E2E8F0;
}

.modal-content-area {
  padding: 2.25rem;
}

.modal-program-badge {
  display: inline-block;
  background: #ECFDF5;
  color: #047857;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  border: 1px solid #A7F3D0;
  margin-bottom: 0.85rem;
}

.modal-headline {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 1rem 0;
}

.modal-description-box {
  background: #F8FAFC;
  border-left: 3px solid #047857;
  padding: 1rem 1.25rem;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.6;
  border-radius: 0 6px 6px 0;
  margin-bottom: 1.5rem;
}

.modal-benefits-section {
  margin-bottom: 2rem;
}

.benefits-heading {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.75rem;
}

.benefits-grid-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.benefit-check-row {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: #334155;
}

.check-icon {
  color: #047857;
  font-weight: 800;
}

.modal-footer-line {
  padding-top: 1.25rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
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

.btn-secondary {
  background: #F1F5F9;
  color: #334155;
  border: 1px solid #CBD5E1;
}

.btn-secondary:hover {
  background: #E2E8F0;
}
</style>
