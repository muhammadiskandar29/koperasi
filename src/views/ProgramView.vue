<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Katalog Program</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Layanan & Program Kerja</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Solusi terpadu end-to-end yang menjembatani kebutuhan agrikultur dari pengolahan lahan awal hingga distribusi pasca panen.
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        
        <!-- Core Program 1: Agriculture -->
        <div class="program-showcase animate-fade-up">
          <div class="showcase-content">
            <div class="icon-box">🌽</div>
            <h2 class="mb-4">Budidaya & Manajemen Lahan Agrikultur</h2>
            <p class="text-muted mb-4">
              Program unggulan KMLC adalah pengorganisasian lahan tidur menjadi lahan jagung produktif. Kami tidak hanya menyewakan alat, namun mendampingi petani secara menyeluruh melalui alur kerja yang sistematis:
            </p>
            <div class="steps-grid mt-4">
              <div class="step-item">
                <span class="step-num">01</span>
                <h4>Pra-Tanam & Lahan</h4>
                <p>Fasilitasi alat berat (traktor) untuk membalik tanah keras, serta administrasi legal dengan Perhutani untuk Hak Guna lahan.</p>
              </div>
              <div class="step-item">
                <span class="step-num">02</span>
                <h4>Penyediaan Saprotan</h4>
                <p>Distribusi bibit jagung hibrida unggul bersertifikat, pupuk subsidi/non-subsidi, dan pestisida ramah lingkungan.</p>
              </div>
              <div class="step-item">
                <span class="step-num">03</span>
                <h4>Panen & Offtaker</h4>
                <p>Memastikan hasil panen dibeli (off-take) dengan harga standar pasar yang adil agar petani terlindungi dari tengkulak.</p>
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
            <div class="icon-box-small">💰</div>
            <h3 class="title">Simpan Pinjam & Pembiayaan Mikro</h3>
            <p class="desc mb-4">
              Menyadari bahwa kendala utama petani adalah modal awal musim tanam, KMLC mendirikan unit simpan pinjam (KSP) yang berfungsi khusus untuk membiayai kebutuhan operasional kebun.
            </p>
            <ul class="feature-list">
              <li>Plafon pinjaman khusus saprotan (Pupuk, Bibit).</li>
              <li>Bunga/Bagi hasil yang disesuaikan dengan kemampuan musim panen.</li>
              <li>Prosedur pencairan dana cepat dan tanpa agunan memberatkan.</li>
              <li>Simpanan Wajib & Pokok untuk permodalan internal anggota.</li>
            </ul>
          </BaseCard>

          <BaseCard class="animate-fade-up" style="animation-delay: 0.2s">
            <div class="icon-box-small">🎓</div>
            <h3 class="title">Edukasi Kelompok Tani Hutan (KTH)</h3>
            <p class="desc mb-4">
              Koperasi secara rutin menyelenggarakan penyuluhan lapangan berkoordinasi dengan Dinas Pertanian Kabupaten Indramayu untuk memastikan standarisasi mutu pertanian KTH.
            </p>
            <ul class="feature-list">
              <li>Pelatihan pencegahan hama ulat grayak pada jagung.</li>
              <li>Workshop manajemen keuangan keluarga untuk petani.</li>
              <li>Edukasi keselamatan kerja di lahan pertanian.</li>
              <li>Sosialisasi hukum dan keamanan bersama Polres Indramayu.</li>
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
  padding: 6rem 0 4rem 0;
  margin-bottom: 2rem;
}

.badge-sub {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.page-title {
  font-size: 3.5rem;
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto;
}

.pt-0 {
  padding-top: 0;
}

.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.my-5 { margin: 5rem 0; }
.text-muted { color: var(--color-text-muted); line-height: 1.8; font-size: 1.05rem; }

/* Showcase 1 */
.program-showcase {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  background: var(--color-surface);
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.icon-box {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 156, 106, 0.1);
  border-radius: 1.5rem;
}

.icon-box-small {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 156, 106, 0.1);
  border-radius: 1rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.step-item {
  background: var(--color-bg);
  padding: 1.5rem;
  border-radius: 1rem;
  border-top: 3px solid var(--color-primary);
}

.step-num {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-border);
  margin-bottom: 0.5rem;
  display: block;
}

.step-item h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-main);
}

.step-item p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.rounded-img {
  width: 100%;
  height: 100%;
  min-height: 450px;
  object-fit: cover;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-md);
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
  gap: 3rem;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-main);
}

.desc {
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: 1.05rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-muted);
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: white;
  background: var(--color-primary-light);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
  top: 4px;
}

@media (max-width: 1024px) {
  .program-showcase {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .other-programs-grid {
    grid-template-columns: 1fr;
  }
  .rounded-img {
    min-height: 300px;
  }
}
</style>
