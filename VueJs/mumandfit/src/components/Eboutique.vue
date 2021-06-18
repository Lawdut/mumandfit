<template>
    <div class = "eboutique">
        <div class = "list-ebooks">
            <div class = "ebooks">
                <div class = "card-ebook" v-for="ebook in ebooks" v-bind:key="ebook.id">
                    <div class = "imageEbook"><p><a>{{ebook.prix}} €</a></p></div>
                    <div class = "titreEbook" v-html="ebook.titre"><h1>{{ebook.titre}}</h1></div>
                    <div class = "descriptionEbook" v-html="ebook.description">{{ebook.description}}</div>
                    <div class = "button-ebook first1" @click ="selectEbook(ebook)"><span >Lire la suite</span></div>
                </div>
            </div>
        </div>
        <div  class="card-footer">
                    <jw-pagination :items="ebookTab" @changePage="onChangePage" :pageSize ="8" :labels="customLabels"></jw-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name : "eboutique",
        data : function () {
            return {
                ebooks : [],
                ebookTab : [],
                customLabels : {
                    first : '<<',
                    last : '>>',
                    previous : '<',
                    next : '>'
                },
            }
        },
        beforeMount : function() {
            this.http.post('//localhost:8010/getAllEbooks')
            .then(response=>{this.ebookTab = response.data.ebooks.reverse()})
        },
        methods : {
            selectEbook(ebook) {

                this.$store.dispatch('selectEbook', ebook)
                .then(()=> this.$router.push({path : `/ebook/${this.$store.state.ebook.id}`}))
                .catch(err => console.log(err))
            },
            onChangePage(ebooks) {
            this.ebooks = ebooks;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }
    }
</script>

<style scoped>
.eboutique {
    display : grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(7, 1fr);
}
.list-ebooks{
    grid-row: 1/8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}
.ebooks{
    display : flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    row-gap: 30px;
}
.card-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
}
.card-ebook{
    box-shadow: 1px 1px 10px 3px #2c3e50;
    width: 300px;
    height: 600px;
    display: grid;
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: repeat(6, 1fr);
    background-color: #cecece;
}
.imageEbook{
    grid-column: 1 / 1;
    grid-row: 1/3;
    background-image: url("../assets/ebook.png");
    background-size: cover;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

}
.imageEbook >>> p {
    color :#434343;
    margin : 0;
    font-size: 15px;
    background-color: #ec7463;
    height: 50px;
    width: 100px;
    border-radius: 0% 70% 0% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    
}


.titreEbook{
    grid-column: 1 / 1;
    grid-row: 3/4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px !important;
    margin: 0 ;
    padding: 0 5px 0 5px;
    background-color: #aaa;
}
.titreEbook >>> h1 {
    margin-block-start: 0px !important;
    margin-block-end: 0px !important;
    font-size: 20px;
}
.descriptionEbook{
    grid-column: 1 / 1;
    grid-row: 4/6;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #cecece;
    margin : 5px 5px;
    

    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;

}
.descriptionEbook >>> p {
    text-align: center !important;
    margin :0;
    height: 100%;
    font-size: 15px;
}

.button-ebook{
    grid-column: 1 / 1;
    grid-row: 6/7;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ec7463;

}

.button-ebook {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  cursor: pointer;  
  text-transform: uppercase;
  color: black;
}
.button-ebook:hover, .button-article:focus {
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
#prix{
    color:#ec7463;
}

</style>