<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <h1 class="page-title animate-fade-up">Tentang KMLC</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.1s">
          Mengenal lebih dekat Koperasi Konsumen Makmur Lestari Cikawung
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="about-detailed-grid">
          <div class="content-side animate-fade-up" style="animation-delay: 0.2s">
            <h2 class="mb-4">Sejarah & Dedikasi Kami</h2>
            <p class="mb-4 text-muted">
              Didirikan dengan menjunjung tinggi nilai-nilai gotong royong masyarakat Cikawung, Indramayu. KMLC (Koperasi Konsumen Makmur Lestari Cikawung) bertransformasi menjadi katalisator penggerak ekonomi desa yang modern.
            </p>
            <p class="mb-4 text-muted">
              Di bawah kepemimpinan <strong>Bapak Unang Herman</strong>, kami berdedikasi mengoptimalkan lahan bekas kawasan Perhutani untuk penanaman jagung sebagai komoditas utama.
            </p>
            
            <div class="vision-mission mt-5">
              <BaseCard>
                <div class="vm-header">
                  <span class="vm-icon">🎯</span>
                  <h3>Visi Koperasi</h3>
                </div>
                <p class="text-muted">Menjadi pilar utama ketahanan pangan nasional tingkat daerah dengan sistem pengelolaan agrikultur yang mandiri dan berintegritas.</p>
              </BaseCard>

              <BaseCard class="mt-4">
                <div class="vm-header">
                  <span class="vm-icon">🚀</span>
                  <h3>Misi Koperasi</h3>
                </div>
                <ul class="mission-list text-muted">
                  <li>Memberdayakan Kelompok Tani Hutan (KTH) secara berkesinambungan.</li>
                  <li>Menerapkan prinsip tata kelola Koperasi yang jujur, transparan, dan modern.</li>
                  <li>Menjalin kemitraan strategis dengan instansi (Polres, Perhutani, Dinas Pertanian).</li>
                </ul>
              </BaseCard>
            </div>
          </div>
          
          <div class="image-side animate-fade-up" style="animation-delay: 0.3s">
            <div class="image-stack">
              <div class="img-large">
                <img src="/assets/images/hero.jpg" alt="Kegiatan Koperasi" />
              </div>
              <div class="stats-card">
                <h4 class="text-primary">100%</h4>
                <p>Dedikasi untuk Petani</p>
              </div>
            </div>
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
  padding: 6rem 0 4rem 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3.5rem;
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-muted);
}

.pt-0 {
  padding-top: 0;
}

.about-detailed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
}

.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 3rem; }
.text-muted { color: var(--color-text-muted); line-height: 1.8; }
.text-primary { color: var(--color-primary); font-size: 2.5rem; font-weight: 800; }

.vm-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.vm-icon {
  font-size: 1.5rem;
  background: var(--color-bg);
  padding: 0.5rem;
  border-radius: 0.5rem;
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
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

.image-stack {
  position: relative;
  height: 100%;
}

.img-large {
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  height: 100%;
  min-height: 600px;
}

.img-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats-card {
  position: absolute;
  bottom: -2rem;
  left: -2rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
  text-align: center;
}

@media (max-width: 992px) {
  .about-detailed-grid {
    grid-template-columns: 1fr;
  }
  .img-large {
    min-height: 400px;
  }
  .stats-card {
    left: 2rem;
  }
}
</style>
