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
import Aside  from '@/components/Aside.vue';



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
  grid-column: 1 / 3;
  grid-row: 1 / 13;
   
}

.main {
  grid-column : 3 / 21;
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

  

  display: flex;
  justify-content: center;
  align-items: center;
}



          /*-----Bouton-----*/
.Button1 {
  color: #fff !important;
	text-transform: uppercase;
	text-decoration: none;
	background: #ec7463;
	padding: 20px;
	border-radius: 5px;
	display: inline-block;
	border: none;
	transition: all 0.4s ease 0s;
  cursor: pointer;
}

.Button1:hover {
  background: #434343;
	letter-spacing: 1px;
	-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	transition: all 0.4s ease 0s;
}


</style>
