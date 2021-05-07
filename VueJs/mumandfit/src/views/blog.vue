<template>
    <div>
        <div class = "articles">
            <div class = "card-article" v-for="unArticle in articles" v-bind:key ="unArticle.id">
                <span v-html="unArticle.genre">{{unArticle.genre}}</span> <br>
                <span v-html="unArticle.contenu">{{unArticle.contenu}}</span>
                <button @click ="selectArticle(unArticle)">Lire cet article</button>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name : "Blog",
        props : {

        },

        data : function() {
            return {
                articles : {}
            }
            
        },

        mounted : function() {
                this.http.get('//localhost:8010/getAllArticles')
                .then(response=>{this.articles = response.data.articles})
        },
        
        methods : {
            selectArticle(unArticle) {

                this.$store.dispatch('selectArticle', unArticle)
                .then( ()=> this.$router.push('/article'))
                .catch(err => console.log(err))
            }
        }

        }

    
</script>

<style scoped>
.articles{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>