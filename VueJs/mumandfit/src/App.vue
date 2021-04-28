<template>
  <div id="app">
    <Header />
    <Navbar />
    <div class = "main"><router-view /></div>
    <Footer />
  </div>
</template>

<script>
import Header  from '@/components/header.vue';
import Navbar from '@/components/navbar.vue';
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
  color: #2c3e50;
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
}

#main {
  grid-area: 2 / 1 / 5 / 2;
}

#footer {
  grid-area: 7 / 1 / 7 / 2;
}

</style>
