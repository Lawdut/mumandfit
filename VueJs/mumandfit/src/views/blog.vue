<template>
    <div>
        <div class = "articles">
            <div class = "card-article" v-for="unArticle in articles" v-bind:key ="unArticle.id">
                {{unArticle}}
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
                this.http.get('//localhost:8010/getMyArticles')
                .then(response=>{this.articles = response.data.articles})
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