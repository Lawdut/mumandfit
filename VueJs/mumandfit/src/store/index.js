import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    unArticle : "",
  },
  mutations: {
    selectedArticle(state, unArticle) {state.unArticle = unArticle},
    
    modifArticleStore(state, unArticleModifie) {state.unArticle.contenu = unArticleModifie}

  },
  actions: {

    selectArticle(context, unArticle) {
    console.log(unArticle);
    context.commit('selectedArticle', unArticle)
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
