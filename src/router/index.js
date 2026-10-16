import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProgramView from '../views/ProgramView.vue'
import LaporanView from '../views/LaporanView.vue'
import MitraView from '../views/MitraView.vue'
import ContactView from '../views/ContactView.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tentang',
      name: 'about',
      component: AboutView
    },
    {
      path: '/program',
      name: 'program',
      component: ProgramView
    },
    {
      path: '/laporan',
      name: 'laporan',
      component: LaporanView
    },
    {
      path: '/mitra',
      name: 'mitra',
      component: MitraView
    },
    {
      path: '/kontak',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
      meta: { layout: 'clean' }
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { layout: 'clean', requiresAuth: true }
    },
    {
      path: '/cms',
      redirect: '/admin'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('kmlc_admin_token')
    if (!token) {
      next('/admin/login')
      return
    }
  }
  next()
})

export default router
