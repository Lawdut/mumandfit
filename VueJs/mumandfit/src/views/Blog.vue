<template>
    <div class = "blog">
        <div class = "list-articles">
            <div class = "articles">
                <div class = "card-article" v-for="unArticle in articles" v-bind:key ="unArticle.id">
                    <div class ="banniere" v-html="unArticle.banniere">{{unArticle.banniere}}</div>
                    <div class = "titre" v-html="unArticle.titre">{{unArticle.titre}}</div>
                    <div class = "chapeau" v-html="unArticle.chapeau">{{unArticle.chapeau}}</div>
                    <div class = "button-article first"><span @click ="selectArticle(unArticle)">Lire la suite</span></div>
                </div>
            </div>
        </div>
        <div class="card-footer">
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

.blog {
    width: 100%;
    display : grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(6, 1fr);
}
.list-articles{
    grid-row: 1/6 ;
    display: flex;
    align-items: center;
    justify-content: center;
}
.articles{

    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    row-gap: 10px;
}
.card-footer{
    grid-row: 6/7;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-article{
    box-shadow: 1px 1px 10px 3px #F56345;
    width: 300px;
    height: 600px;
    display: grid;
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: repeat(6, 1fr);
}
.banniere{
    grid-column: 1 / 1;
    grid-row: 1/3;
}
.banniere >>> p {
    width: 100% ;
    height: 100% ;
    display:  flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.banniere >>> img {
    width: 300px;
	height: 100%;
    object-fit: cover;
}

.titre{
    grid-column: 1 / 1;
    grid-row: 3/4;
    display: flex;
    justify-content: center;
    align-items: center;
}
.chapeau{
    grid-column: 1 / 1;
    grid-row: 4/6;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-article{
    grid-column: 1 / 1;
    grid-row: 6/7;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #ec7463;

}

.button-article {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  color: #F56345;
  cursor: pointer;  
  text-transform: uppercase;
  color: black;
}
.button-article:hover, .button-article:focus {
  color: #fff;
  outline: 0;
}

.first {
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.first:hover {
  box-shadow: 0 0 40px 40px #F56345 inset;
}


</style>
