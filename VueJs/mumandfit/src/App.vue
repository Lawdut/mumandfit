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
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  cursor : default
}

#header {
  grid-area: 1 / 1 / 2 / 2;
  background-color: #fdaf93;
    padding:  0;
    margin : 0;
    font-size: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    box-shadow: 0 2px 5px black;
}

#main {
  grid-area: 2 / 1 / 5 / 2;
  height: 100%;
  position: relative;
}

#footer {
  grid-area: 7 / 1 / 7 / 2;
  bottom : 0;
  height :100px;
  position: absolute;
}

</style>
