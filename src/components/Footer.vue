<template>
  <footer id="kontak" class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo-text mb-2">KML<span class="text-primary-light">C</span></div>
          <p class="footer-desc">
            Mitra strategis dalam mewujudkan ketahanan pangan nasional dan kesejahteraan petani lokal melalui tata kelola koperasi yang modern.
          </p>
        </div>
        
        <div class="footer-links">
          <h4 class="footer-title">Tautan Cepat</h4>
          <ul>
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/tentang">Tentang KMLC</router-link></li>
            <li><router-link to="/program">Program & Layanan</router-link></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4 class="footer-title">Informasi Kontak</h4>
          <ul>
            <li class="contact-item">
              <span class="contact-icon">📍</span>
              <span>Desa Cikawung, Kec. Terisi, Kab. Indramayu, Jawa Barat</span>
            </li>
            <li class="contact-item">
              <span class="contact-icon">📞</span>
              <span>(0234) 567890</span>
            </li>
            <li class="contact-item">
              <span class="contact-icon">✉️</span>
              <span>halo@kmlc.co.id</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Koperasi Konsumen Makmur Lestari Cikawung. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #0F172A;
  color: white;
  padding: 6rem 0 2rem 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.logo-text {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: white;
}

.text-primary-light {
  color: var(--color-primary-light);
}

.mb-2 {
  margin-bottom: 1.5rem;
}

.footer-desc {
  color: #94A3B8;
  line-height: 1.8;
  font-size: 1rem;
  max-width: 90%;
}

.footer-title {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.footer-links a {
  color: #94A3B8;
  transition: color 0.2s ease;
  font-weight: 500;
  text-decoration: none;
}

.footer-links a:hover {
  color: white;
}

.footer-contact ul {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  list-style: none;
  padding: 0;
}

.contact-item {
  display: flex;
  gap: 1rem;
  color: #94A3B8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.contact-icon {
  flex-shrink: 0;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #64748B;
  font-size: 0.875rem;
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
