<template>
    <div class = "blog">
        <div class = "list-articles">
            <div class = "articles">
                <div class = "card-article" v-for="unArticle in articles" v-bind:key ="unArticle.id">
                    <div class ="banniere" v-html="unArticle.banniere">{{unArticle.banniere}}</div>
                    <div class = "titre" v-html="unArticle.titre">{{unArticle.titre}}</div>
                    <div class = "chapeau" v-html="unArticle.chapeau">{{unArticle.chapeau}}</div>
                    <div class = "button-article first1" @click ="selectArticle(unArticle)"><span >Lire la suite</span></div>
                </div>
            </div>
        </div>
        <div  class="card-footer">
            <jw-pagination :items="articleTab" @changePage="onChangePage" :pageSize ="8" :labels="customLabels"></jw-pagination>
        </div>
    </div>
</template>

<script>

    

    export default {
        name : "Blog",

        data : function() {
            return {
                articles : [],
                articleTab : [],
                customLabels : {
                    first : '<<',
                    last : '>>',
                    previous : '<',
                    next : '>'
                },
            }
            
        },
        
        
        beforeMount : function (){
            this.http.post('//localhost:8010/getAllArticles')
            //.then(response=>{console.log(response.data.articles)})
            .then(response=>{this.articleTab = response.data.articles.reverse()})
        },
        
        methods : {
            selectArticle(unArticle) {

                this.$store.dispatch('selectArticle', unArticle)
                .then(()=> this.$router.push('/article'))
                .catch(err => console.log(err))
            },
            onChangePage(articles) {
            this.articles = articles;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }

        }
</script>

<style scoped>

.blog {
    display : grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(7, 1fr);
}
.list-articles{
    grid-row: 1/7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}
.articles{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    row-gap: 30px;
}
.card-footer{
    grid-row: 7/8;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-article{
    box-shadow: 1px 1px 10px 3px #2c3e50;
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
    align-items: flex-start;
    font-size: 12px !important;
    margin: 7px 0 0 0 ;
    padding: 0px;
}
.titre >>> h1 {
    margin-block-start: 0px !important;
    margin-block-end: 0px !important;
}
.chapeau{
    grid-column: 1 / 1;
    grid-row: 4/6;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    margin-bottom: 10px;
}
.chapeau >>> p {
    text-align: center !important;
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
  cursor: pointer;  
  text-transform: uppercase;
  color: black;
}
.button-article:hover, .button-article:focus {
  color: #ec7463;
  outline: 0;
}

.first1 {
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.first1:hover {
  box-shadow: 0 0 40px 40px #434343 inset;
}

.card-footer >>> ul{
    background-color: #ec7463;
    box-shadow: 1px 1px 10px 3px #2c3e50;
    border-radius: 10px;
}

.pagination >>> .first > a{
    border: 1px solid #303030 ;
    border-radius: 10px 0px 0px 10px;
}
.pagination >>> .last > a{
    border-radius : 0px 10px 10px 0px;
    border: 1px solid #303030 ;
}
.pagination >>> .previous > a {
    border-top: 1px solid #303030 ;
    border-bottom: 1px solid #303030 ;
    border-right:1px solid #303030 ;
    
}
.pagination >>> .next > a {
    border-top: 1px solid #303030 ;
    border-bottom: 1px solid #303030 ;
}
.pagination >>> .page-number > a{
    border-top: 1px solid #303030 ;
    border-bottom: 1px solid #303030 ;
    border-right:1px solid #303030 ;
}
.pagination >>> .disabled{
    color : #303030
}

.pagination >>> a {
    -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.pagination >>> a:hover {
    box-shadow: 0 0 40px 40px #434343 inset;
    color : #ec7463;
}


</style>
