<template>
    <nav>
        <div id='liens'>
            <div class = "texteLiens">Actualité</div>
            <div class = "texteLiens">Réservation</div>
            <div class = "texteLiens">E-Boutiques</div>
            <div id = "logoUser"><router-link to = "/connexion"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link></div>
        </div> 
    </nav>    
</template>

<script>
//import Connexion from '@components/connexion.vue'
export default ({
    /*components : {
        Connexion
    }*/

})
</script>

<style scoped>

#liens {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding : 0 200px 0 200px ;
  margin : 10px;
  font-size: 20px;
}

.texteLiens {
    transition: 0.4s;
    border-bottom: 1px solid black;
    color: black;
}

#logoUser {
    transition: 0.4s;
}

#liens div:hover {
    transform: scale(1.1);
    cursor: pointer;
}



</style>