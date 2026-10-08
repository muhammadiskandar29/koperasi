<script setup>
import Hero from '../components/Hero.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import Accordion from '../components/ui/Accordion.vue'
</script>

<template>
  <div>
    <Hero />
    
    <!-- Quick Highlights Section -->
    <section class="section pt-0 bg-white">
      <div class="container">
        <div class="highlights-grid animate-fade-up">
          <div class="highlight-item">
            <h2>50+</h2>
            <p>Hektar Lahan Produktif Dikelola</p>
          </div>
          <div class="divider-vertical"></div>
          <div class="highlight-item">
            <h2>120+</h2>
            <p>Anggota KTH Terdaftar</p>
          </div>
          <div class="divider-vertical"></div>
          <div class="highlight-item">
            <h2>1.5K</h2>
            <p>Ton Estimasi Panen Tahunan</p>
          </div>
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
          <BaseCard class="news-card animate-fade-up" style="padding: 0; overflow: hidden; border: 1px solid var(--color-border);">
            <div class="news-img-wrapper">
              <img src="/assets/images/harvest.jpg" alt="Panen Raya" />
              <div class="news-tag">Laporan Kegiatan</div>
            </div>
            <div class="news-content">
              <h3>Panen Raya Jagung Musim Pertama Bersama Polres Indramayu</h3>
              <p class="text-muted">Kegiatan panen raya berhasil dilaksanakan pada lahan agrikultur seluas 15 Hektar. Proses ini disaksikan oleh perwakilan kepolisian dan otoritas desa setempat.</p>
              <router-link to="/program" class="read-more">Detail Program &rarr;</router-link>
            </div>
          </BaseCard>

          <BaseCard class="news-card animate-fade-up" style="animation-delay: 0.2s; padding: 0; overflow: hidden; border: 1px solid var(--color-border);">
            <div class="news-img-wrapper">
              <img src="/assets/images/hero.jpg" alt="Penyuluhan KTH" />
              <div class="news-tag">Edukasi Anggota</div>
            </div>
            <div class="news-content">
              <h3>Penyuluhan Manajemen Keuangan Usaha Tani untuk KTH</h3>
              <p class="text-muted">KMLC menggelar edukasi pengelolaan modal dan pencatatan hasil panen demi mencegah resiko finansial dan memastikan stabilitas likuiditas para anggota.</p>
              <router-link to="/tentang" class="read-more">Profil Institusi &rarr;</router-link>
            </div>
          </BaseCard>
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
            title="Prosedur Pendaftaran Mitra KTH KMLC" 
            content="Registrasi dapat dilakukan secara luring di kantor sekretariat Desa Cikawung atau melalui form pada halaman Kontak. Calon mitra diwajibkan memiliki kelengkapan administrasi domisili dan mematuhi standar operasional KMLC." 
          />
          <Accordion 
            title="Struktur Permodalan & Kewajiban Finansial" 
            content="Kewajiban finansial meliputi Simpanan Pokok dan Simpanan Wajib sesuai AD/ART yang ditetapkan dalam Rapat Anggota. Dana dikelola secara transparan dan dipublikasikan pada laporan neraca berkala." 
          />
          <Accordion 
            title="Mekanisme Distribusi Hasil Panen" 
            content="KMLC berkedudukan sebagai offtaker utama dengan penetapan harga beli (HPP) yang mengacu pada indeks harga pasar regional, memastikan proteksi nilai bagi para anggota petani." 
          />
        </div>
      </div>
    </section>
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
</style>
