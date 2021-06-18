<template>
    <div id = 'aside'>
        <div id = 'titre'>
            <h1><router-link to = "/">Mum&Fit</router-link></h1>
        </div>
        <div class='liens'>
                <div class = "texteLiens"><router-link to = "/blog">Actualité</router-link></div>
                <div class = "texteLiens"><router-link to = "/eboutique">E-Boutique</router-link></div>
                <div class = "texteLiens"><router-link to = "/contact">Contact</router-link></div>
                <div class = "searchBox"><input class="searchInput" @focus="onFocus" id='searchInputId' type ="text" placeholder="Rechercher" v-model="results" name="results"><button class ="searchButton" @click="searchArticle(results)">Go</button></div>
                <div class = "texteLiens"><router-link to = "/about">Mentions légales</router-link></div>
                <div class = "cart" v-if="!this.$store.state.token"><img src = '../assets/logoResSociaux/panier.png' height="40px" class="snipcart-checkout" ></div>
                <div class = "logoUser" v-if="this.$store.state.token">
                    <router-link to= "/admin"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link>
                </div>
                
        </div> 
    </div>
</template>

<script>
    export default {
        name : 'Aside',
    data : function() {
            return {
                results : '',
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Zen+Dots&display=swap');


#aside {
    font-size: 15px;
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
    align-items: flex-start;
    margin-left: 60px;
}

#titre:hover {
    cursor: pointer;
}

#titre h1 a {
    text-decoration: none;
}

.liens{
    grid-row: 3 / 7;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    margin-left: 60px;
    padding: 0;
    
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
.liens a:hover{
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

.searchBox{
    display: flex;

}
.searchInput{
    border-bottom: 1px solid black;
    border-left: none;
    border-top: none;
    border-right:none;
    background-color :#ec7463;
    width: 45%;
    height: 20px;
    font-family: 'Montserrat';
    font-size: 15px;
}
.searchInput::placeholder{
    color: #303030;
    font-family: 'Montserrat';
    font-size: 15px;
}
.searchInput:focus{
    outline: none;
    border-bottom : 1px dotted black;
}
.searchButton{
    background-color: #ec7463;
    border: solid black;
    border-width: 1px;
    color :black;
    font-family: 'Montserrat';
    cursor: pointer;
}
.searchButton:hover{
    background-color: #434343;
    color :#ec7463;
    border : 1px solid #434343
}
.snipcart-items-count{
    position: absolute;
    background-color: #434343;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
}
/*@media (min-width: 768px) and (max-width: 979px) {
  #aside {
    font-size: 50px;
  }
}*/
/*<div class = "logoUser" v-else>
                    <router-link to="/connexion"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link>
                </div>*/

</style>
