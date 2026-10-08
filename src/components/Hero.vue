<template>
  <section id="beranda" class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <div class="badge animate-fade-up">Koperasi Konsumen Makmur Lestari Cikawung</div>
        <h1 class="hero-title animate-fade-up" style="animation-delay: 0.1s">
          Membangun <span class="text-gradient">Kesejahteraan</span> <br/>
          Melalui Ketahanan Pangan
        </h1>
        <p class="hero-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Mengoptimalkan potensi lahan dan memberdayakan masyarakat Cikawung untuk mencapai kemandirian ekonomi yang inklusif dan berkelanjutan.
        </p>
        <div class="hero-actions animate-fade-up" style="animation-delay: 0.3s">
          <a href="#tentang" class="btn btn-primary">
            Jelajahi KMLC
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href="#program" class="btn btn-outline">Lihat Program</a>
        </div>
        
        <div class="stats-row animate-fade-up" style="animation-delay: 0.4s">
          <div class="stat-item">
            <h3 class="stat-value">50+</h3>
            <p class="stat-label">Hektar Lahan</p>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <h3 class="stat-value">120</h3>
            <p class="stat-label">Mitra Petani</p>
          </div>
        </div>
      </div>
      
      <div class="hero-visual animate-fade-up" style="animation-delay: 0.2s">
        <div class="hero-image-wrapper">
          <img src="/assets/images/hero.jpg" alt="Pertanian KMLC" class="hero-img" />
          <div class="glow-effect"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem;
  background-color: var(--color-surface);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40vw;
  height: 100%;
  background: linear-gradient(135deg, rgba(6, 156, 106, 0.05) 0%, rgba(248, 250, 252, 0) 100%);
  border-bottom-left-radius: 100px;
  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
}

.hero-content {
  padding-right: 2rem;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background-color: rgba(6, 156, 106, 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-text-main);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  max-width: 90%;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.stat-value {
  font-size: 2.5rem;
  color: var(--color-text-main);
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--color-text-muted);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background-color: var(--color-border);
}

.hero-visual {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  border-radius: 2rem;
  z-index: 2;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2rem;
  box-shadow: var(--shadow-xl);
  transform: scale(0.95);
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%) scale(0.9);
  background: var(--color-primary-light);
  filter: blur(80px);
  opacity: 0.2;
  z-index: -1;
  border-radius: 50%;
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 4rem;
    padding-top: 4rem;
  }
  
  .hero-content {
    padding-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-subtitle {
    max-width: 100%;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-img {
    max-height: 500px;
  }
}
</style>
