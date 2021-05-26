import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    unArticle : "",
    token : localStorage.getItem('token') || "",
    user : "",
  },
  mutations: {
    selectedArticle(state, unArticle) {state.unArticle = unArticle},
    
    modifArticleStore(state, unArticleModifie) {state.unArticle = unArticleModifie},

    token(state, token) {state.token = token},

    user (state, data) {state.user = data},

  },
  actions: {

    selectArticle(context, unArticle) {
    console.log(unArticle);
    context.commit('selectedArticle', unArticle)
    },

    connexionStore(context, infos) {
      console.log(infos);
      axios.post('http://localhost:8010/connexion', infos) 
      .then((res)=> {
        localStorage.setItem("jwt-mumandfit", res.data);
        context.commit('user', infos.mail);
        context.commit('token', res.data);
        axios.defaults.headers.common['authorization'] = res.data;
      })
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
