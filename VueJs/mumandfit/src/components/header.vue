<template>
    <div id = 'header'>
        <div id = 'titre'>
            <h1>Mum&Fit</h1>
        </div>
        <div id='liens'>
                <div class = "texteLiens">Actualité</div>
                <div class = "texteLiens">Réservation</div>
                <div class = "texteLiens">E-Boutiques</div>
                <div id = "logoUser"><router-link to = "/connexion"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link></div>
        </div> 
    </div>
</template>

<script>
    export default {
    
    }    
    


</script>

<style scoped>
#header {
    background-color: #fdaf93;
    font-size: 15px;
    box-shadow: 0 2px 5px black;

    position: relative;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
}
#titre {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left : 20px;
}

#titre:hover {
    cursor: pointer;
}

#liens{
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right : 20px;
    column-gap: 30px;
}

.texteLiens{
    border-bottom: 1px solid black;
    transition: 0.4s;
    cursor: pointer;
}
#logoUser{
    transition: 0.4s;
}
#liens div:hover{
    transform: scale(1.1) ;
}
h1 {
    
}



</style>