<template>
    <div class = "eboutique">
        <div class = "ebooks">
            <div class = "card-ebook">
                <div class = "imageEbook" v-for="ebook in ebooks" v-bind:key="ebook.id">
                    <div class = "titreEbook" v-html="ebook.titre">{{ebook.titre}}</div>
                    <div class = "descriptionEbook" v-html="ebook.description">{{ebook.description}}</div>
                    <div class = "button-article first1" @click ="selectEbook(ebook)"><span >Lire la suite</span></div>
                </div>
            </div>
            <div  class="card-footer">
            <jw-pagination :items="ebookTab" @changePage="onChangePage" :pageSize ="8" :labels="customLabels"></jw-pagination>
        </div>
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
            selectArticle(ebook) {

                this.$store.dispatch('selectEbook', ebook)
                .then(()=> this.$router.push('/ebook'))
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

</style>