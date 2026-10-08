<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <div class="badge-sub animate-fade-up">Profil Organisasi</div>
        <h1 class="page-title animate-fade-up" style="animation-delay: 0.1s">Tentang KMLC</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Mengenal lebih dalam sejarah, legalitas, dan struktur kepengurusan Koperasi Konsumen Makmur Lestari Cikawung.
        </p>
      </div>
    </section>

    <!-- History & Founder -->
    <section class="section pt-0">
      <div class="container">
        <div class="about-detailed-grid">
          <div class="content-side animate-fade-up" style="animation-delay: 0.2s">
            <h2 class="mb-4">Sejarah & Latar Belakang</h2>
            <p class="text-muted mb-4">
              Koperasi Konsumen Makmur Lestari Cikawung (KMLC) lahir dari keprihatinan atas banyaknya lahan tidur eks-kawasan Perhutani di wilayah Desa Cikawung, Kecamatan Terisi, Kabupaten Indramayu. Lahan-lahan tersebut memiliki potensi agrikultur yang sangat besar namun belum terkelola dengan maksimal karena keterbatasan modal dan alat dari masyarakat sekitar.
            </p>
            <p class="text-muted mb-4">
              Berangkat dari kondisi tersebut, pada tahun 2021, tokoh masyarakat setempat, <strong>Bapak Unang Herman</strong>, mengambil inisiatif untuk menyatukan para petani ke dalam sebuah wadah ekonomi berbadan hukum yang kuat. Melalui pendekatan persuasif kepada instansi keamanan dan dinas pemerintahan, KMLC berhasil mendapatkan izin pengelolaan lahan berbasis kemitraan.
            </p>
            <p class="text-muted mb-5">
              Hingga hari ini, KMLC telah bertransformasi menjadi salah satu penyokong ketahanan pangan daerah dengan fokus utama pada budidaya jagung hibrida yang terintegrasi dari hulu ke hilir.
            </p>
            
            <div class="vision-mission mt-5">
              <BaseCard>
                <div class="vm-header">
                  <span class="vm-icon">🎯</span>
                  <h3>Visi Koperasi</h3>
                </div>
                <p class="text-muted">Menjadi pilar utama ketahanan pangan nasional tingkat daerah dengan sistem pengelolaan agrikultur yang mandiri, berintegritas, dan menyejahterakan anggota.</p>
              </BaseCard>

              <BaseCard class="mt-4">
                <div class="vm-header">
                  <span class="vm-icon">🚀</span>
                  <h3>Misi Koperasi</h3>
                </div>
                <ul class="mission-list text-muted">
                  <li>Memberdayakan Kelompok Tani Hutan (KTH) secara teknis dan finansial.</li>
                  <li>Menerapkan prinsip tata kelola Koperasi yang jujur, transparan, dan akuntabel berbasis digitalisasi.</li>
                  <li>Menciptakan ekosistem pasar yang adil untuk menyerap hasil panen para petani mitra.</li>
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
                <h4 class="text-primary">Legalitas Resmi</h4>
                <p>Terdaftar di Kemenkumham RI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Structural & Legal Section -->
    <section class="section bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Legalitas & Kepengurusan</h2>
          <p class="section-subtitle">Sistem tata kelola profesional dengan legalitas badan hukum yang terjamin untuk keamanan anggota.</p>
        </div>
        
        <div class="legal-grid">
          <BaseCard class="legal-card animate-fade-up">
            <h3 class="mb-4">Informasi Legalitas</h3>
            <ul class="legal-list">
              <li><strong>Nama Badan Hukum:</strong> Koperasi Konsumen Makmur Lestari Cikawung</li>
              <li><strong>Kedudukan:</strong> Desa Cikawung, Kec. Terisi, Kab. Indramayu</li>
              <li><strong>Bentuk Koperasi:</strong> Koperasi Primer Nasional / Konsumen</li>
              <li><strong>Nomor Badan Hukum:</strong> AHU-00XXXXX.AH.01.26.TAHUN 2021 (Dummy)</li>
              <li><strong>NIB:</strong> 1234567890123 (Dummy)</li>
            </ul>
          </BaseCard>

          <BaseCard class="legal-card animate-fade-up" style="animation-delay: 0.2s">
            <h3 class="mb-4">Struktur Organisasi</h3>
            <div class="org-structure">
              <div class="org-item">
                <span class="org-role">Ketua Pengurus</span>
                <span class="org-name">Unang Herman</span>
              </div>
              <div class="org-item">
                <span class="org-role">Sekretaris</span>
                <span class="org-name">Bpk. Ahmad S. (Dummy)</span>
              </div>
              <div class="org-item">
                <span class="org-role">Bendahara</span>
                <span class="org-name">Ibu Siti N. (Dummy)</span>
              </div>
              <div class="org-item">
                <span class="org-role">Dewan Pengawas</span>
                <span class="org-name">Perwakilan Polres & Dinas Pertanian</span>
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

.page-header {
  padding: 6rem 0 4rem 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4rem;
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
.mb-5 { margin-bottom: 3rem; }

.about-detailed-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
}

.text-muted { color: var(--color-text-muted); line-height: 1.8; font-size: 1.05rem; }
.text-primary { color: var(--color-primary); font-size: 2rem; font-weight: 800; }

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
  border: 1px solid var(--color-border);
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
  padding: 1rem 1.5rem;
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-primary);
}

.org-role {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.org-name {
  font-size: 1.125rem;
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
  .stats-card {
    left: 2rem;
  }
  .legal-list li {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
