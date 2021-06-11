<template>
    
        <div id = 'adminHome'>
            <div id = "titreAdmin">
                <h1>Administration du site</h1>
            </div>

            <div id = "navAdmin">
                <div class = "liensAdmin"><router-link to="/newEbook"><button class = "Button1">Référencer un nouvel e-book</button></router-link></div>
                <div class = "liensAdmin"><router-link to="/newArticle"><button class = "Button1">Création d'article pour le blog</button></router-link></div>
                <div class = "liensAdmin"><router-link to="/changeSlider"><button class = "Button1">Changer les images du slider</button></router-link></div>
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
    height: 100%;
}

#titreAdmin{
    grid-row: 1 / 2;
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
</style>