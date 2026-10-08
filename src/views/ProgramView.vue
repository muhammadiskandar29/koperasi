<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
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

        <!-- Core Program 2 & 3: Finance and Education -->
        <div class="other-programs-grid">
          <BaseCard class="animate-fade-up">
            <div class="icon-wrapper">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 class="title">Pembiayaan Koperasi Mikro</h3>
            <p class="desc mb-4">
              Unit Simpan Pinjam (KSP) KMLC berfokus pada penyaluran kredit produktif bagi para anggota untuk memastikan tidak adanya hambatan operasional akibat kendala likuiditas.
            </p>
            <ul class="feature-list">
              <li>Plafon pinjaman khusus sarana produksi pertanian.</li>
              <li>Sistem bagi hasil yang disesuaikan dengan siklus panen.</li>
              <li>Pencairan dana tepat waktu tanpa jaminan memberatkan.</li>
              <li>Fasilitas simpanan wajib dan pokok yang terkelola transparan.</li>
            </ul>
          </BaseCard>

          <BaseCard class="animate-fade-up" style="animation-delay: 0.1s">
            <div class="icon-wrapper">
              <svg class="svg-icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <h3 class="title">Pengembangan SDM Pertanian</h3>
            <p class="desc mb-4">
              Divisi edukasi KMLC menyelenggarakan pelatihan intensif untuk meningkatkan standar kompetensi dan kualitas hidup Kelompok Tani Hutan (KTH) binaan kami.
            </p>
            <ul class="feature-list">
              <li>Pelatihan pencegahan hama dan penyakit tanaman.</li>
              <li>Sertifikasi dan standarisasi mutu hasil panen.</li>
              <li>Workshop literasi keuangan bagi keluarga petani.</li>
              <li>Edukasi keselamatan kerja lapangan terpadu.</li>
            </ul>
          </BaseCard>
        </div>

      </div>
    </section>
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
</style>
