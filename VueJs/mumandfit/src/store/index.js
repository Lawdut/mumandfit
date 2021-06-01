import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    unArticle : "",
    token : localStorage.getItem('token') || "",
    user : "",
    search : "",
  },
  mutations: {
    selectedArticle(state, unArticle) {state.unArticle = unArticle},
    
    modifArticleStore(state, unArticleModifie) {state.unArticle = unArticleModifie},

    token(state, token) {state.token = token},

    user (state, data) {state.user = data},

    search(state, data) {state.search = data},

  },
  actions: {

    selectArticle(context, unArticle) {
    console.log(unArticle);
    context.commit('selectedArticle', unArticle)
    },

    connexionStore(context, infos) {
      axios.post('http://localhost:8010/connexion', infos) 
      .then((res)=> {
        localStorage.setItem("jwt-mumandfit", res.data);
        context.commit('user', infos.mail);
        context.commit('token', res.data);
        axios.defaults.headers.common['authorization'] = res.data;
      })
    },

    searching(context, search){
      context.commit('search', search)
    }
  },
  modules: {
  },

  getters : {
    unArticle : state => {
      return `${state.unArticle}`
    }
  }
})
