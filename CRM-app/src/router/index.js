import { createRouter, createWebHistory } from 'vue-router'
import ClientView from '@/views/ClientView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientView
    },
    {
      path: '/add-client',
      name: 'add-client',
      component: ()=>import('../views/AddClient.vue')
    },
    {
      path: '/edit-client/:id',
      name: 'edit-client',
      component: ()=>import('../views/EditClient.vue')
    },
  
  ]
})

export default router
