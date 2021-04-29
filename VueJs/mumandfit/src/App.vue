<template>
  <div id="app">
    <Header />
    <div class = "main"><router-view /></div>
    <Footer />
  </div>
</template>

<script>
import Header  from '@/components/header.vue';
import Footer from '@/components/footer.vue';

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
    Header,
    Footer,
  },
};

</script>


<style>
body {
  background-color: #ffe7d5;
  margin: 0;
  padding: 0;
  
}

#app {
  font-family: Tahoma, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  cursor : default;

  background-size: cover;
  background-position: center;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;
}

#header {
  /*position : relative;*/
  grid-column: 1 / 13;
  grid-row: 1 / 2;
  background-color: #fdaf93;
  font-size: 15px;
  box-shadow: 0 2px 5px black;
  
}

.main {
   grid-column : 1 / 13;
   grid-row : 2/12;
   padding: 40px 20px;
}

#footer {
  box-shadow: 0 -2px 5px black;
  grid-column: 1/13;
  grid-row : 12/13;
  background-color: #fdaf93;
}

/*:-moz-full-screen.input{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}*/

</style>
