import Vue from 'vue'
import VueRouter from 'vue-router'
//import $ from 'jquery'
import Home from '../views/Home.vue'
import Connexion from '../components/Connexion.vue'
//import Inscription from '../components/Inscription.vue'
import Blog from '../views/Blog.vue'
import Article from '../components/Article.vue'
import AdminHome from '../components/Admin/AdminHome.vue'
import NewArticle from '../components/Admin/NewArticle.vue'
import ResultsSearch from '../components/ResultsSearch.vue'
import Aside from '../components/Aside.vue'
import HeaderResp from '../components/HeaderResp.vue'
import Contact from '../components/Contact.vue'

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
    path:"/aside",
    name : "Aside",
    component : Aside
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
    /*beforeEnter : (to, from, next) =>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
        if (to.path === '/admin' && loggedIn) {
          return next();
        }else if (to.path === '/admin' && !loggedIn){
          next({ path: '/' });
        }
      
    }*/
  },
  


  {
    path : '/newArticle',
    name : "NewArticle",
    component : NewArticle,
    beforeEnter : (to, from, next)=>{
      const loggedIn = localStorage.getItem('jwt-mumandfit');
      if(from.path === '/admin' && loggedIn){
        return next();
      }else if (from.path === '/admin' && !loggedIn){
        next({path : '/connexion'})
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
