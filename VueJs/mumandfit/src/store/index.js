import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    unArticle : "",
    token : localStorage.getItem('token') || "",
  },
  mutations: {
    selectedArticle(state, unArticle) {state.unArticle = unArticle},
    
    modifArticleStore(state, unArticleModifie) {state.unArticle = unArticleModifie},


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
        localStorage.setItem("jwt", res.data);
        //document.location.reload();
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
