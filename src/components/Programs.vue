<template>
  <section id="program" class="section">
    <div class="container">
      <div class="text-center">
        <div class="badge-sub animate-fade-up">Program Koperasi</div>
        <h2 class="section-title animate-fade-up" style="animation-delay: 0.1s">Layanan & Sinergi</h2>
        <p class="section-subtitle animate-fade-up" style="animation-delay: 0.2s">
          Berfokus pada pengembangan sektor agrikultur dan pendampingan ekonomi produktif untuk kemandirian anggota.
        </p>
      </div>
      
      <div class="programs-grid animate-fade-up" style="animation-delay: 0.3s">
        <div class="card-premium">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13V6a7 7 0 0 1 14 0v7a7 7 0 0 1-7 7Z"/><path d="M11 2v4"/><path d="M7 6h8"/></svg>
          </div>
          <h3 class="program-title">Pengelolaan Lahan Pertanian</h3>
          <p class="program-desc">
            Menggarap lahan kosong/tidur menjadi area produktif untuk penanaman komoditas unggulan jagung dengan tata kelola profesional.
          </p>
        </div>
        
        <div class="card-premium">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="program-title">Pemberdayaan KTH</h3>
          <p class="program-desc">
            Pendampingan teknis dan akses sarana produksi pertanian bagi Kelompok Tani Hutan (KTH) guna meningkatkan hasil panen.
          </p>
        </div>
        
        <div class="card-premium">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 class="program-title">Layanan Modal Usaha</h3>
          <p class="program-desc">
            Memberikan kemudahan akses permodalan yang adil dan transparan bagi anggota untuk mengembangkan usaha mikro mereka.
          </p>
        </div>
      </div>
      
      <div class="partnership-box animate-fade-up" style="animation-delay: 0.4s">
        <h4 class="partnership-title">Didukung & Bersinergi Dengan:</h4>
        <div class="partners-grid">
          <div class="partner-item">Polres Indramayu</div>
          <div class="partner-item">Perhutani KPH</div>
          <div class="partner-item">Dinas Pertanian</div>
          <div class="partner-item">Pemdes Cikawung</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.badge-sub {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  margin-bottom: 1.5rem;
  background: rgba(6, 156, 106, 0.1);
  color: var(--color-primary);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.card-premium:hover .icon-wrapper {
  background: var(--color-primary);
  color: white;
  transform: scale(1.05);
}

.program-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-text-main);
}

.program-desc {
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.partnership-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.partnership-title {
  color: var(--color-text-muted);
  font-size: 1rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.partners-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;
}

.partner-item {
  font-size: 1.25rem;
  font-weight: 800;
  color: #CBD5E1;
  transition: color 0.3s ease;
}

.partner-item:hover {
  color: var(--color-text-main);
}

@media (max-width: 1024px) {
  .programs-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .partners-grid {
    gap: 2rem;
  }
  .partnership-box {
    padding: 2rem 1.5rem;
  }
}
</style>
