<script setup>
import Hero from '../components/Hero.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import Accordion from '../components/ui/Accordion.vue'
</script>

<template>
  <div>
    <Hero />
    
    <!-- Quick Highlights Section -->
    <section class="section py-5 bg-white">
      <div class="container">
        <div class="highlights-grid animate-fade-up">
          <div class="highlight-item">
            <h2>50+</h2>
            <p>Hektar Lahan Produktif Dikelola</p>
          </div>
          <div class="divider-vertical"></div>
          <div class="highlight-item">
            <h2>120+</h2>
            <p>Anggota KTH Berdaya</p>
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
          <div class="badge-sub animate-fade-up">Kabar KMLC</div>
          <h2 class="section-title animate-fade-up" style="animation-delay: 0.1s">Dampak Nyata di Lapangan</h2>
          <p class="section-subtitle animate-fade-up" style="animation-delay: 0.2s">
            Melihat langsung bagaimana program koperasi memberikan perubahan signifikan pada taraf hidup masyarakat Cikawung.
          </p>
        </div>

        <div class="news-grid">
          <BaseCard class="news-card animate-fade-up" style="padding: 0; overflow: hidden;">
            <div class="news-img-wrapper">
              <img src="/assets/images/harvest.jpg" alt="Panen Raya" />
              <div class="news-tag">Kegiatan Tani</div>
            </div>
            <div class="news-content">
              <h3>Panen Raya Jagung Musim Pertama Bersama Polres Indramayu</h3>
              <p class="text-muted">Kegiatan panen raya sukses dilakukan pada lahan seluas 15 Hektar yang sebelumnya merupakan lahan tidur. Kegiatan ini disaksikan langsung oleh jajaran kepolisian dan perangkat desa.</p>
              <router-link to="/program" class="read-more">Lihat Program →</router-link>
            </div>
          </BaseCard>

          <BaseCard class="news-card animate-fade-up" style="animation-delay: 0.2s; padding: 0; overflow: hidden;">
            <div class="news-img-wrapper">
              <img src="/assets/images/hero.jpg" alt="Penyuluhan KTH" />
              <div class="news-tag">Edukasi</div>
            </div>
            <div class="news-content">
              <h3>Penyuluhan Manajemen Keuangan Usaha Tani untuk Anggota</h3>
              <p class="text-muted">KMLC menggelar edukasi tata cara pengelolaan modal dan pencatatan hasil panen agar petani tidak terjebak hutang rentenir/tengkulak, demi kemandirian ekonomi.</p>
              <router-link to="/tentang" class="read-more">Tentang Kami →</router-link>
            </div>
          </BaseCard>
        </div>

      </div>
    </section>

    <!-- Interactive FAQ Section -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-5">
          <div class="badge-sub animate-fade-up">FAQ</div>
          <h2 class="section-title animate-fade-up" style="animation-delay: 0.1s">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div class="faq-container animate-fade-up" style="animation-delay: 0.2s">
          <Accordion 
            title="Bagaimana cara bergabung menjadi Mitra KTH KMLC?" 
            content="Anda bisa datang langsung ke kantor kami di Desa Cikawung atau mengisi formulir pada halaman Hubungi Kami. Syarat utamanya adalah memiliki integritas, KTP domisili, dan bersedia mengikuti SOP pertanian dari KMLC." 
          />
          <Accordion 
            title="Apakah ada biaya pendaftaran?" 
            content="Sesuai prinsip koperasi, ada Simpanan Pokok (dibayarkan sekali) dan Simpanan Wajib bulanan yang nominalnya sangat terjangkau. Dana ini akan dikelola kembali untuk kesejahteraan anggota." 
          />
          <Accordion 
            title="Bagaimana sistem bagi hasil atau pembelian panen?" 
            content="KMLC bertindak sebagai offtaker utama. Kami akan membeli hasil panen jagung Anda dengan harga yang kompetitif dan mengikuti standar pasar, sehingga Anda tidak perlu khawatir hasil panen dipermainkan tengkulak." 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.py-5 { padding: 4rem 0; }
.bg-white { background: var(--color-surface); }
.bg-light { background: var(--color-bg); }
.mb-5 { margin-bottom: 4rem; }

.faq-container {
  max-width: 800px;
  margin: 0 auto;
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

.highlights-grid {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: white;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  transform: translateY(-50px);
  position: relative;
  z-index: 10;
}

.highlight-item {
  text-align: center;
}

.highlight-item h2 {
  font-size: 3.5rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-weight: 800;
}

.highlight-item p {
  color: var(--color-text-muted);
  font-size: 1.125rem;
  font-weight: 500;
}

.divider-vertical {
  width: 1px;
  height: 80px;
  background: var(--color-border);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
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
  transform: scale(1.05);
}

.news-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--color-primary);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.news-content {
  padding: 2rem;
}

.news-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: var(--color-text-main);
}

.text-muted {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.read-more {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1rem;
  transition: opacity 0.3s ease;
}

.read-more:hover {
  opacity: 0.8;
}

@media (max-width: 992px) {
  .highlights-grid {
    flex-direction: column;
    gap: 2rem;
    transform: translateY(0);
    margin-top: -3rem;
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
