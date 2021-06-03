<template>
    <div id ="headerResp">
        <div id= "header">
            <h1><router-link to = "/">Mum&Fit</router-link></h1>
        </div>

        <div class='liensResp'>
                <div class = "texteLiensResp"><router-link to = "/blog">Actualité</router-link></div>
                <div class = "texteLiensResp"><router-link to = "/blog">Contact</router-link></div>
                <div class = "texteLiensResp"><router-link to = "/blog">E-Boutiques</router-link></div>
                <div class = "searchBoxResp"><input class="searchInputResp" @focus="onFocus" id='searchInputIdResp' type ="text" placeholder="Rechercher" v-model="results" name="results"><button class ="searchButton" @click="searchArticle(results)">Go</button></div>
                <div class = "texteLiensResp"><router-link to = "/blog">Mentions légales</router-link></div>
                <div class = "logoUserResp" v-if="this.$store.state.token">
                    <router-link to= "/admin"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link>
                </div>
                
        </div>



    </div>
</template>

<script>
    export default {
        name : "HeaderResp",
        
    data : function() {
            return {
                token : this.$store.state.token,
                results : ''
             }
        },

    methods : {
        searchArticle(results){
            const path = `/results`;
                this.$store.dispatch('searching', results)
                .catch(err => console.log(err))
                .then( ()=>{this.$router.push(path)})
                .then(this.results = '')
        },
        onFocus() {
            const path = `/results`;
            if(this.$route.path === path){
                this.$router.push('/blog')
            }
        }
    } 
    }
</script>

<style scoped>

#headerResp{
    background-color: #ec7463;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#header h1 a {
    color: black;
  }

</style>