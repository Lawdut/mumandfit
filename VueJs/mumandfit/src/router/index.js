import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connexion from '../components/connexion.vue'
import Inscription from '../components/inscription.vue'
import Blog from '../views/blog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/connexion",
    name : "Connexion",
    component: Connexion
  },
  {
    path: "/inscription",
    name : "Inscription",
    component: Inscription
  },

  {
    path : "/blog",
    name : "Blog",
    component : Blog
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
