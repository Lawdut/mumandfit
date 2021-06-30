import Vue from 'vue'
import VueRouter from 'vue-router'
//import $ from 'jquery'
import Home from '../views/Home.vue'
import Connexion from '../components/Connexion.vue'
import Inscription from '../components/Inscription.vue'
import ChangePass from '../components/Admin/modifPassword.vue'
import ChangeAdmin from '../components/Admin/changeAdmin.vue'
import Blog from '../views/Blog.vue'
import Article from '../components/Article.vue'
import AdminHome from '../views/Admin/AdminHome.vue'
import NewArticle from '../components/Admin/NewArticle.vue'
import ResultsSearch from '../components/ResultsSearch.vue'
import Aside from '../components/Aside.vue'
import HeaderResp from '../components/HeaderResp.vue'
import Contact from '../views/Contact.vue'
import ChangeImageSlider from '../components/Admin/ChangeImageSlider.vue'
import NewEbook from '../components/Admin/NewEbook.vue'
import Eboutique from '../views/Eboutique.vue'
import Ebook from '../components/Ebook.vue'
import Modale from '../components/Modale.vue'
import About from '../views/About.vue'
import ChangeGoogleMap from '../components/Admin/changeGoogleMap.vue'
import ChangePassMail from '../components/Admin/changePassMail.vue'


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
    path:"/changeAdmin",
    name: "ChangeAdmin",
    component : ChangeAdmin,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/'})
      }
    }
  },
  {
    path:"/modifPass",
    name: "ChangePassword",
    component : ChangePass,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/'})
      }
    }
  },
  {
    path:'/changeGoogleMap',
    name : "ChangeGoogleMap",
    component : ChangeGoogleMap,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/changeAdmin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/'})
      }
    }
  },
  {
    path : '/changePassMail',
    name : "ChangePassMail",
    component : ChangePassMail,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/changeAdmin' && loggedIn){
        return next();
      }else if (!loggedIn){
        next({path : '/'})
      }
    }
  },
  
  {
    path : "/modale",
    name : "Modale",
    component : Modale
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
        next({path : '/'})
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
        next({path : '/'})
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
        next({path : '/'})
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
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(loggedIn){
        return next();
      }else if (!loggedIn){
        return next({path : '/'})
      }
    }
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
        next({path : '/'})
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
    component : About,
  },

  
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode : 'history',
  routes,
});


export default router
