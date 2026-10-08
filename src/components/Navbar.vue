<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled || route.path !== '/' }]">
    <div class="container navbar-container">
      <router-link to="/" class="logo">
        <span class="logo-text">KML<span class="text-primary">C</span></span>
      </router-link>
      
      <nav class="nav-links">
        <router-link to="/" class="nav-link" active-class="active-link">Beranda</router-link>
        <router-link to="/tentang" class="nav-link" active-class="active-link">Tentang Kami</router-link>
        <router-link to="/program" class="nav-link" active-class="active-link">Program</router-link>
      </nav>

      <div class="nav-action">
        <router-link to="/kontak" class="btn btn-primary nav-btn">Hubungi Kami</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.5rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem 0;
  box-shadow: 0 1px 0 rgba(0,0,0,0.05);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text-main);
}

.text-primary {
  color: var(--color-primary);
}

.nav-links {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.nav-link {
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 1rem;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover, .active-link {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover::after, .active-link::after {
  width: 100%;
}

.nav-btn {
  padding: 0.75rem 1.75rem;
}

@media (max-width: 992px) {
  .nav-links, .nav-action {
    display: none;
  }
}
</style>
