<template>
    <div class = "UnArticle">
        <div class = "vueArticle">
            
            
            <iframe id="frame" name ="richTextField" frameborder="0" v-bind:srcdoc="$store.state.unArticle.contenu"></iframe>

            <div>
                <button v-on:click="enableEditMode()">Editer</button>
                <button v-on:click="execCmd('bold');">Gras</button>
                <button v-on:click="confirmChange()">Confirmer changements</button>
            </div>
        </div>
    </div>
</template>

<script>

import jQuery from "jquery";
    const $ = jQuery;
    window.$ = $;

    export default {
        name : "Article",

        data : function (){
            return {
               articleModif : {
                   id : this.$store.state.unArticle.id,
                   contenu : this.$store.state.unArticle.contenu,
                   genre : this.$store.state.unArticle.genre
               }
            }
        },

        beforeMount : function () {
            
        },

        mounted : function() {

                        
        },


        methods:{

            enableEditMode: function () {
                let richTextField = document.getElementById('frame').contentWindow;
                console.log(richTextField);
                richTextField.document.designMode = "on";
                //document.getElementById('myElement').style.display = 'none'; -> pour faire une fonction édition avec appararition des boutons (display block pour les boutons)
            },
            execCmd(command) {
                console.log(command);
                let richTextField =  document.getElementById('frame').contentWindow;
                richTextField.document.execCommand(command, false, 'test');
                
            },
            confirmChange() {
                let unArticleModifie = $("#frame").contents().find("body").html();
                this.$store.commit('modifArticleStore', unArticleModifie);
                this.http.post('//localhost:8010/modifArticle' , {
                    articleModif : {
                        id : this.$store.state.unArticle.id,
                        contenu : this.$store.state.unArticle.contenu,
                        genre : this.$store.state.unArticle.genre}
                })
                .then(response => console.log(response.data))
            },

        },
        computed: {
            

        
        }
    }
</script>

<style scoped>
.vueArticle{
    width: 40vw;
    height: 80vh;
    background-color: bisque;
}

iframe{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>