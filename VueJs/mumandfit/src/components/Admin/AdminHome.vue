<template>
    <div id = 'adminHome'>
        <div id = "titreAdmin">
            <h1>Administration du site</h1>
        </div>

        <div id = "navAdmin">
            <div class = "liensAdmin"><router-link to="/newArticle"><button class = "Button1">Création d'article</button></router-link></div>
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

</style>