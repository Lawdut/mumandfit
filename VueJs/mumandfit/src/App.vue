<template>
  <div id="app">
    <Aside />
    <div class = "main">
      <div class = "box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Aside  from '@/components/aside.vue';


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
  components: {
    Aside,
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



#aside {
  grid-column: 18 / 21;
  grid-row: 1 / 13;
   
}

.main {
  grid-column : 1 / 18;
  grid-row : 1/13;
  background: url("./assets/background.svg") no-repeat center;
  background-size: cover;
  background-position: center;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  height : 90vh;
  width: 900px;

  overflow-y: auto;

  background-color: #D80286;

  display: flex;
  justify-content: center;
  align-items: center;
}



          /*-----Bouton-----*/
.Button29 {
  color: red;
  border: 2px solid rgb(216, 2, 134);
  border-radius: 0px;
  padding: 9px 37px;
  display: inline-block;
  font-family: "Montserrat";
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #D80286;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_inside:hover {
  box-shadow: inset 0 0 0 50px #D80286;
}
</style>
