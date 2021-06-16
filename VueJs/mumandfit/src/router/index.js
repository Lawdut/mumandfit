import Vue from 'vue'
import VueRouter from 'vue-router'
//import $ from 'jquery'
import Home from '../views/Home.vue'
import Connexion from '../components/Connexion.vue'
import Inscription from '../components/Inscription.vue'
import Blog from '../components/Blog.vue'
import Article from '../components/Article.vue'
import AdminHome from '../components/Admin/AdminHome.vue'
import NewArticle from '../components/Admin/NewArticle.vue'
import ResultsSearch from '../components/ResultsSearch.vue'
import Aside from '../components/Aside.vue'
import HeaderResp from '../components/HeaderResp.vue'
import Contact from '../components/Contact.vue'
import ChangeImageSlider from '../components/Admin/ChangeImageSlider.vue'
import NewEbook from '../components/Admin/NewEbook.vue'
import Eboutique from '../components/Eboutique.vue'
import Ebook from '../components/Ebook.vue'
import Modale from '../components/Modale.vue'
import ListAdmin from '../components/Admin/ListAdmin.vue'

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
  {
    path : "/modale",
    name : "Modale",
    component : Modale
  },
  {
    path : "/listAdmin",
    name : "ListAdmin",
    component : ListAdmin,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/accueil'})
      }
    }
  },
  {
    path:"/aside",
    name : "Aside",
    component : Aside
  },
  {
    path:"/changeSlider",
    name : "ChangeImageSlider",
    component : ChangeImageSlider,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/accueil'})
      }
    }
  },
  {
    path: "/inscription",
    name : "Inscription",
    component: Inscription,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/accueil'})
      }
    }
  },
  {
    path:"/newEbook",
    name:"newEbook",
    component : NewEbook,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/accueil'})
      }
    }
  },
  {
    path:"/eboutique",
    name : "eboutique",
    component : Eboutique,
  },
  {
    path : "/ebook/:id",
    name : "ebook",
    component : Ebook,
    props : true
  },
  {
    path : "/blog",
    name : "Blog",
    component : Blog
  },

  {
    path: "/article",
    name : "Article",
    component : Article
  },

  {
    path : "/results",
    name : "ResultsSearch",
    component : ResultsSearch,
  },
  {
    path : "/contact",
    name : "Contact",
    component : Contact
  },

  {
    path : "/admin",
    name : "AdminHome",
    component : AdminHome,
  },
  


  {
    path : '/newArticle',
    name : "NewArticle",
    component : NewArticle,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/accueil'})
      }
    }
  },

            //-----RESPONSIVE-----//
  {
    path : '/headerResp',
    name : "HeaderResp",
    component : HeaderResp
  },

  {
    path: '*', redirect: '/'
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode : 'history',
  routes,
});


export default router
