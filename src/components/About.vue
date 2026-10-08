<template>
  <section id="tentang" class="section bg-light">
    <div class="container">
      <div class="about-grid">
        <div class="about-visual animate-fade-up">
          <div class="visual-card">
            <div class="card-inner main-card">
              <h3 class="card-title">Fondasi Gotong Royong</h3>
              <p class="card-desc">Berakar kuat dari semangat masyarakat Desa Cikawung.</p>
            </div>
            <div class="card-inner sub-card-1">
              <span class="icon-large">🌾</span>
              <span class="sub-label">Ketahanan Pangan</span>
            </div>
            <div class="card-inner sub-card-2">
              <span class="icon-large">🤝</span>
              <span class="sub-label">Sinergi Instansi</span>
            </div>
          </div>
        </div>

        <div class="about-content animate-fade-up" style="animation-delay: 0.2s">
          <div class="badge-sub">Tentang KMLC</div>
          <h2 class="section-title text-left">Mengelola Potensi, Membangun Ekonomi Desa</h2>
          <p class="about-text">
            <strong>Koperasi Konsumen Makmur Lestari Cikawung (KMLC)</strong> hadir sebagai lembaga ekonomi proaktif di Kabupaten Indramayu. Di bawah kepemimpinan <strong>Bapak Unang Herman</strong>, KMLC mengelola lahan tidur bekas kawasan Perhutani menjadi lahan pertanian produktif yang fokus pada komoditas jagung.
          </p>
          <p class="about-text">
            Sinergi strategis bersama Kelompok Tani Hutan (KTH) dan Polres Indramayu memastikan transparansi, keamanan, dan dukungan maksimal bagi petani.
          </p>

          <div class="features-list">
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div>
                <h4 class="feature-title">Transparan & Profesional</h4>
                <p class="feature-desc">Tata kelola modern berbasis kepercayaan anggota.</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div>
                <h4 class="feature-title">Pemberdayaan Berkelanjutan</h4>
                <p class="feature-desc">Fokus pada kemandirian ekonomi petani jangka panjang.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-light {
  background-color: var(--color-bg);
  position: relative;
}

.about-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 5rem;
  align-items: center;
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

.text-left {
  text-align: left;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.about-text {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.about-text strong {
  color: var(--color-text-main);
  font-weight: 700;
}

.features-list {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  gap: 1.25rem;
}

.feature-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary-light);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.feature-title {
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.feature-desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

/* Visual Cards */
.visual-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 250px 200px;
  gap: 1.5rem;
}

.card-inner {
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: var(--shadow-md);
}

.main-card {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
}

.card-title {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: white;
}

.card-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.sub-card-1 {
  background: white;
  border: 1px solid var(--color-border);
  align-items: center;
  text-align: center;
  justify-content: center;
}

.sub-card-2 {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  align-items: center;
  text-align: center;
  justify-content: center;
}

.icon-large {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.sub-label {
  font-weight: 700;
  color: var(--color-text-main);
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .visual-card {
    grid-template-rows: 200px 180px;
  }
}
</style>
