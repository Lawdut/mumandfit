import Vue from 'vue'
import VueRouter from 'vue-router'
//import $ from 'jquery'
import Home from '../views/Home.vue'
import Connexion from '../components/Connexion.vue'
//import Inscription from '../components/Inscription.vue'
import Blog from '../views/Blog.vue'
import ListeArticles from '../components/ListeArticles.vue'
import Article from '../components/Article.vue'

Vue.use(VueRouter)
//Vue.use($)

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
  /*{
    path: "/inscription",
    name : "Inscription",
    component: Inscription
  },*/

  {
    path : "/blog",
    name : "Blog",
    component : Blog
  },

  {
    path : "/listeArticles",
    name : "ListeArticles",
    component : ListeArticles
  },

  {
    path: "/article",
    name : "Article",
    component : Article
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
