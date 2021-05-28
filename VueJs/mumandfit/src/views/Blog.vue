<template>
    <div>
        <div class = "articles">
            <div class = "card-article" v-for="unArticle in articles" v-bind:key ="unArticle.id">
                <span v-html="unArticle.banniere">{{unArticle.banniere}}</span> <br>
                <span v-html="unArticle.titre">{{unArticle.titre}}</span>
                <span v-html="unArticle.chapeau">{{unArticle.chapeau}}</span>
                <button @click ="selectArticle(unArticle)">Lire cet article</button>
            </div>
        </div>
        <div class="card-footer pb-2 pt-3">
            <jw-pagination :items="articleTab" @changePage="onChangePage" :pageSize ="4"></jw-pagination>
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
                articles : [],
                articleTab : [],
            }
            
        },
        /*computed : {
            computedItems () {
            return this.articles;
        }
        },*/
        
        beforeMount : function (){
            this.$store.dispatch('numberOfArticle')
            .catch(err => console.log(err))
            .then (this.http.get('//localhost:8010/getAllArticles')
                .then(response=>{this.articleTab = response.data.articles.reverse()}))
        },

        mounted : function() {
                //this.http.get('//localhost:8010/getAllArticles')
                //.then(response=>{this.articles = response.data.articles.reverse()}
                //.then(this.articles = [...Array(this.$store.state.numberOfArticle).keys()].map(i => ({ id: (i+1), name : 'hello'})))
        }, 
        
        methods : {
            selectArticle(unArticle) {

                this.$store.dispatch('selectArticle', unArticle)
                .then( ()=> this.$router.push('/article'))
                .catch(err => console.log(err))
            },
            onChangePage(articles) {
            this.articles = articles;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
        }

        }
    //const self = this;
    //const articleTab = [...Array(self.$store.state.numberOfArticle).keys()].map(i => ({ id: (i+1)}));

</script>

<style scoped>
.articles{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
}

.card-article{
    
}
</style>
