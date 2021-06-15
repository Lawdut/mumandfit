<template>
    <div id ="headerResp" >
        <div id="headerContainer">
            <div id= "header">
                <h1 @click="isActive = false"><router-link to = "/">Mum&Fit</router-link></h1>
            </div>

            <div id = "menuBurger">
                <div @click="isActive = !isActive" class="container" v-bind:class="{ change: isActive}">  
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>     
            </div>

            <div class='liensResp' v-if="isActive" v-bind:class="{overlay: isActive}">
                    <div class = "texteLiensResp" @click="isActive = false"><router-link to = "/blog">Actualité</router-link></div>
                    <div class = "texteLiensResp" @click="isActive = false"><router-link to = "/contact">Contact</router-link></div>
                    <div class = "texteLiensResp" @click="isActive = false"><router-link to = "/eboutique">E-Boutiques</router-link></div>
                    <div class = "searchBoxResp"><input class="searchInputResp" @focus="onFocus" id='searchInputIdResp' type ="text" placeholder="Rechercher" v-model="results" name="results"><button class ="searchButton" @click="searchArticle(results) ; isActive = false">Go</button></div>
                    <div class = "texteLiensResp" @click="isActive = false"><router-link to = "/blog">Mentions légales</router-link></div>
                    <div class = "cart" @click="isActive = false"><img src = '../assets/logoResSociaux/panier.png' height="40px" class="snipcart-checkout"><span class="snipcart-items-count"></span></div>
                    <div class = "logoUserResp" v-if="this.$store.state.token" @click="isActive = false">
                        <router-link to= "/admin"><img src = '../assets/logoResSociaux/user.svg' height="40px"></router-link>
                    </div>
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
                results : '',
                isActive : false,
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
        },
    } 
    }
</script>

<style scoped>

#headerResp{
    height: 100%;
    width: 100%;
    
}
#headerContainer{
    background-color: #ec7463;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
}
#header{
    grid-column: 1/3;
    display: flex;
    align-items: center;
    justify-content: center;
  
}

#header h1 a {
    color: black;
}

#menuBurger{
    grid-column: 3/4;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20%;
}
.searchBoxResp{
    display: flex;
    justify-content: center;
}
.searchInputResp{
    border-bottom: 1px solid black;
    border-left: none;
    border-top: none;
    border-right:none;
    background-color :#ec7463;
    width: 50%;
    height: 20px;
    font-family: 'Montserrat';
    font-size: 15px;
}
.searchInputResp::placeholder{
    color: #303030;
    font-family: 'Montserrat';
    font-size: 15px;
}
.searchInputResp:focus{
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

/*-----MENU BURGER-----*/
.overlay {
  background-color: #ec7463;
  position: fixed;
  top: 20%;
  bottom: 0;
  transition: 10s;
  right: 0;
  width: 50%;
 box-shadow: 1px 1px 10px 3px #2c3e50;
}
.liensResp{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.liensResp>div>>>a{
    color : black;
    
}
/*----- BUTTON BURGER-----*/
.container {
  display: inline-block;
  cursor: pointer;
}

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}

</style>