<template>
    <div id = 'aside'>
        <div id = 'titre'>
            <h1><router-link to = "/">Mum&Fit</router-link></h1>
        </div>
        <div id='liens'>
                <div class = "texteLiens"><router-link to = "/blog">Actualité</router-link></div>
                <div class = "texteLiens"><router-link to = "/blog">Réservation</router-link></div>
                <div class = "texteLiens"><router-link to = "/blog">E-Boutiques</router-link></div>
                <div class = "texteLiens"><router-link to = "/blog">Réseau sociaux</router-link></div>
                <div class = "texteLiens"><router-link to = "/blog">Contact</router-link></div>
                <div class = "logoUser" v-if="this.$store.state.token">
                    <router-link to= "/admin"><img src = '../assets/logoResSociaux/user.svg' height="70px"></router-link>
                </div>
                
        </div> 
    </div>
</template>

<script>
    export default {
        name : 'Aside',
    data : function() {
            return {
                token : this.$store.state.token
             }
        },
    }  
    


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Zen+Dots&display=swap');

#aside {
    background-color: #ec7463;
    font-size: 15px;

    position: relative;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat( 7, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
}
#titre {
    grid-row : 1/2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: flex-start;
    margin-left: 90px;
}

#titre:hover {
    cursor: pointer;
}

#titre h1 a {
    text-decoration: none;
}

#liens{
    grid-row: 3 / 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 90px;
    /*margin: 0;*/
    padding: 0;
    row-gap: 90px;
}

.texteLiens{
    transition: 0.4s;
    cursor: pointer;
    margin: 0;
    padding: 0;
    color : black;
}

.texteLiens a{
  text-decoration : none ;
  color : black
}

.logoUser{
    transition: 0.4s;
}

.texteLiens:hover{
    border-bottom: 1px solid black;
}
#liens a:hover{
    transform: scale(1.1) ;
    font-weight: bold;
}
h1 {
    font-family: 'Montserrat';
    font-size: 30px;
    padding: 0;
    margin: 0;
}
.router-link-active {
    color : black;
}

/*<div class = "logoUser" v-else>
                    <router-link to="/connexion"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link>
                </div>*/

</style>
