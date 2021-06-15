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
        <router-view />
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
  cursor : default;

  

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



          /*-----Bouton-----*/
/*.Button1 {
  color: #494949 !important;
	text-transform: uppercase;
	text-decoration: none;
	background: #ec7463;
	padding: 10px;
	border-radius: 5px;
	display: inline-block;
	border: none;
	transition: all 0.4s ease 0s;
  cursor: pointer;
  box-shadow: 1px 1px 10px 3px #2c3e50;
}

.Button1:hover {
  background: #434343;
	letter-spacing: 1px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.4s ease 0s;
  color : #ec7463 !important;
}*/

.Button1 {
  color: #434343 !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ec7463;
  padding:8px 36px;
  border: 2px solid #434343 !important;
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

@media (max-width: 1000px) {
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
   /*border : solid 3px black*/
  }
  ::placeholder{
    font-size: 9px;
  }
}
</style>
