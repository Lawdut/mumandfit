<template>
    
        <div id = 'adminHome'>
            <div id = "titreAdmin">
                <h2>Administration du site</h2>
            </div>
            <div id = "navAdmin">
                <div class="gestionContenu">
                    <h3 id="contenu">Gestion de contenu</h3>
                    <div class = "liensAdmin"><router-link to="/newEbook"><button class = "Button1">Référencer un nouvel e-book</button></router-link></div>
                    <div class = "liensAdmin"><router-link to="/newArticle"><button class = "Button1">Création d'article pour le blog</button></router-link></div>
                    <div class = "liensAdmin"><router-link to="/changeSlider"><button class = "Button1">Changer les images du slider</button></router-link></div>
                    <div class = "liensAdmin"><a href ="https://app.snipcart.com/dashboard"><button class = "Button1">Snipcart dashboard</button></a></div>
                </div>
                <div class="gestionAcces">
                    <h3 id="gestion">Gestion des accès</h3>
                    <div class = "liensAdmin"><router-link to="/changeAdmin"><button class = "Button1">Modifier vos coordonnées</button></router-link></div>
                    <div class = "liensAdmin"><router-link to="/modifPass"><button class = "Button1">Changer votre mot de passe</button></router-link></div>
                </div>
                
                
                <div class = "deconnexion"><button @click='deconnexion' class = "Button1">Déconnexion</button></div>
            </div>
        </div>
</template>

<script>
    export default {
        methods : {
            deconnexion(){
                localStorage.removeItem("jwt-mumandfit")
                this.$router.push('/')
                document.location.reload();
            }
        }
    }
</script>

<style scoped>
#adminHome {
    display: grid;
    grid-template-rows: repeat (6, 1fr);
    justify-content: center;
    height: 100%;
}

#titreAdmin{
    grid-row: 1 / 2;
    background-color: #ec7463;
    box-shadow: 1px 1px 10px 3px #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 10px 10px;
    padding: 0 30px 0 30px;
    width: 600px;
    
}
#navAdmin{
    grid-row: 2 / 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    column-gap: 10px;
    row-gap: 30px;
}
a{
    color : #43434343 !important

}
#contenu, #gestion{
    font-size: 20px;
}
.gestionContenu, .gestionAcces {
    border : 2px solid black;
    background-color: hsla(0, 0%, 26%, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    padding-bottom: 30px ;
    border-radius: 25px;
    width: 100%;
}
@media (max-width : 1400px){
    #titreAdmin{
        background-color: white;
        box-shadow: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: none;
        padding: 0 30px 0 30px;
        width: 80vw;
    }
    
}
</style>