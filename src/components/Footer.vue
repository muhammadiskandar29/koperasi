<template>
  <footer id="kontak" class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo-text mb-2">KML<span class="text-primary-light">C</span></div>
          <p class="footer-desc">
            Institusi Koperasi Konsumen bersertifikasi, berdedikasi membangun resiliensi finansial agrikultur melalui manajemen profesional dan kepatuhan regulasi.
          </p>
        </div>
        
        <div class="footer-links">
          <h4 class="footer-title">Navigasi Utama</h4>
          <ul>
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/tentang">Profil Korporasi</router-link></li>
            <li><router-link to="/program">Layanan Koperasi</router-link></li>
            <li><router-link to="/laporan">Laporan Kinerja</router-link></li>
            <li><router-link to="/mitra">Kemitraan Jaringan</router-link></li>
            <li><router-link to="/kontak">Pusat Informasi</router-link></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4 class="footer-title">Hubungi Kami</h4>
          <ul>
            <li class="contact-item">
              <svg class="svg-icon contact-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Desa Cikawung, Kec. Terisi, Kab. Indramayu, Jawa Barat</span>
            </li>
            <li class="contact-item">
              <svg class="svg-icon contact-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>(0234) 567890</span>
            </li>
            <li class="contact-item">
              <svg class="svg-icon contact-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>korespondensi@kmlc.co.id</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Koperasi Konsumen Makmur Lestari Cikawung. Hak Cipta Dilindungi Undang-Undang.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-text-main);
  color: white;
  padding: 5rem 0 2rem 0;
  border-top: 4px solid var(--color-primary);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: white;
}

.text-primary-light {
  color: var(--color-primary-light);
}

.mb-2 {
  margin-bottom: 1rem;
}

.footer-desc {
  color: #94A3B8;
  line-height: 1.8;
  font-size: 0.95rem;
  max-width: 90%;
}

.footer-title {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
}

.footer-links a {
  color: #94A3B8;
  transition: color 0.2s ease;
  font-size: 0.95rem;
  text-decoration: none;
}

.footer-links a:hover {
  color: white;
}

.footer-contact ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.contact-item {
  display: flex;
  gap: 0.75rem;
  color: #94A3B8;
  font-size: 0.95rem;
  line-height: 1.5;
  align-items: flex-start;
}

.svg-icon {
  width: 20px;
  height: 20px;
  stroke: var(--color-primary-light);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.contact-icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #64748B;
  font-size: 0.85rem;
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
