<template>
  <div id="app">
    <div id = "headerRespApp">
      <HeaderResp/>
    </div>
    <div id = "asideApp">
      <Aside />
    </div>
    <div class = "main">
      <div class = "box">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Aside  from '@/components/Aside.vue';
import HeaderResp from './components/HeaderResp.vue';



export default {
  data: function () {
    return {
    };
  },
  mounted() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this.$store.commit("connected");
    }
  },
  methods : {
    
  },
  components: {
    Aside,
    HeaderResp,
  },
};

</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Zen+Dots&display=swap');

body {
  background-color: #ffe7d5;
  margin: 0;
  padding: 0;
  
}
a, router-link{
  text-decoration: none;
}
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;
}

#asideApp{
  grid-column: 1 / 6;
  grid-row: 1 / 13;
  height: 100vh;
}

#aside {
  height: 100vh;
  background: url("./assets/background.svg") no-repeat center;
  background-color: #ec7463;
  background-size: cover;
  background-position: center;

}
#headerRespApp{
  display: none;
}

.main {
  grid-column : 6 / 21;
  grid-row : 1/13;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.box {
  height : 100%;
  width: 100%;
  overflow-y: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
  /*transition: all 1s ease 0.5s;*/
}
.page-enter, .page-leave-to {
  opacity: 0;
  
}
.inputForm{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        --border : 1px solid #ccc;
        border: var(--border);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
}

          /*-----Bouton-----*/

.Button1 {
  color: #434343 !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ec7463;
  padding:8px 36px;
  border: 1px solid #434343 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
  box-shadow: 1px 1px 10px 3px #2c3e50;
  border-radius: 20px;
}
.Button1:hover {
  color: #ec7463 !important;
  background: #434343;
  border-color: #ec7463 !important;
  transition: all 0.4s ease 0s;
  cursor: pointer;
}

#headerRespApp{
  display: none;
}
.snipcart-modal__container{
  box-shadow: 1px 1px 10px 3px #2c3e50 !important;
}

.grecaptcha-badge {
        visibility: hidden;
    }

@media(max-width: 1600px){
  #titre {
     
    margin-left: 45px !important;
}
  #liens{
    margin-left: 45px !important;
  }

}

@media (max-width: 1400px) {
  #asideApp {
    display: none;
  }
  .main{
    grid-column: 1/21;
    grid-row: 3/13;
  }
  #headerRespApp{
    display: block;
    grid-column: 1/21;
    grid-row: 1/3;  
    box-shadow: 1px 1px 10px 3px #2c3e50;
    z-index:10;
  }
  ::placeholder{
    font-size: 9px;
  }
  .mce-object-iframe>iframe{
    
    width: 90vw;
}
  #banniereModif>.mce-content-body>p>img{
    max-width: 90vw;
  }
  .mce-content-body>p>img{
    max-width: 90vw;
    width: auto;
    height: auto;
  }
}
</style>
