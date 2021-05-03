<template>
    <div id = 'aside'>
        <div id = 'titre'>
            <h1><router-link to = "/">Mum&Fit</router-link></h1>
        </div>
        <div id='liens'>
                <div class = "texteLiens"><router-link to = "/blog">Actualité</router-link></div>
                <div class = "texteLiens">Réservation</div>
                <div class = "texteLiens">E-Boutiques</div>
                <div class = "texteLiens">Réseau sociaux</div>
                <div class = "texteLiens">Contact</div>
                <div id = "logoUser"><router-link to = "/connexion"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link></div>
        </div> 
    </div>
</template>

<script>
    export default {
    
    }    
    


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Zen+Dots&display=swap');

#aside {
    background-color: white;
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
}

#titre:hover {
    cursor: pointer;
}

#liens{
    grid-row: 3 / 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    row-gap: 90px;
}

.texteLiens{
    transition: 0.4s;
    cursor: pointer;
    margin: 0;
    padding: 0;
}
#logoUser{
    transition: 0.4s;
}

.texteLiens:hover{
    border-bottom: 1px solid black;
}
#liens div:hover{
    transform: scale(1.1) ;
}
h1 {
    font-family: 'Montserrat';
    font-size: 30px;
    padding: 0;
    margin: 0;
}



</style>