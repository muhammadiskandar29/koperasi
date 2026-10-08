<script setup>
import BaseCard from '../components/ui/BaseCard.vue'
</script>

<template>
  <div class="page-container">
    <section class="page-header">
      <div class="container text-center">
        <h1 class="page-title animate-fade-up">Program KMLC</h1>
        <p class="page-subtitle animate-fade-up" style="animation-delay: 0.1s">
          Solusi terpadu dari pengolahan lahan hingga permodalan.
        </p>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="programs-grid">
          
          <BaseCard class="animate-fade-up" style="animation-delay: 0.1s">
            <div class="icon-box">🌱</div>
            <h3 class="title">Manajemen Lahan Pertanian</h3>
            <p class="desc">
              Memaksimalkan pemanfaatan lahan tidur menjadi lahan produktif berkualitas, bekerja sama secara strategis dengan Perhutani dan kepolisian setempat. Kami memfasilitasi kebutuhan alat dan pengolahan awal.
            </p>
          </BaseCard>

          <BaseCard class="animate-fade-up" style="animation-delay: 0.2s">
            <div class="icon-box">🌽</div>
            <h3 class="title">Budidaya Jagung Hibrida</h3>
            <p class="desc">
              Pendampingan komprehensif mulai dari pemilihan bibit jagung hibrida terbaik, penyediaan pupuk, hingga teknik pemanenan modern yang memastikan produktivitas tinggi bagi para petani mitra.
            </p>
          </BaseCard>

          <BaseCard class="animate-fade-up" style="animation-delay: 0.3s">
            <div class="icon-box">💰</div>
            <h3 class="title">Fasilitas Pembiayaan Mikro</h3>
            <p class="desc">
              Program kredit dan simpan pinjam bunga rendah yang dirancang khusus untuk memenuhi kebutuhan saprotan (sarana produksi pertanian) anggota dan pengembangan usaha mikro masyarakat Desa Cikawung.
            </p>
          </BaseCard>

          <BaseCard class="animate-fade-up" style="animation-delay: 0.4s">
            <div class="icon-box">🤝</div>
            <h3 class="title">Edukasi & Pelatihan KTH</h3>
            <p class="desc">
              Menyelenggarakan workshop rutin bagi Kelompok Tani Hutan (KTH) terkait praktik pertanian berkelanjutan, manajemen keuangan keluarga, dan tata cara mitigasi hama/penyakit tanaman.
            </p>
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

.programs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
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

@media (max-width: 768px) {
  .programs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
