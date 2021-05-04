<template>
    <div class = "UnArticle">
        <div class = "vueArticle">
            <span v-html="$store.state.unArticle.contenu">{{unArticle.contenu}}</span>
            <div>
                <button v-on:click="enableEditMode()">Editer</button>
                <button v-on:click="execCmd('bold');">Gras</button>
            </div>
            
            <iframe id="frame" name ="richTextField" frameborder="0"></iframe>
            
        </div>
    </div>
</template>

<script>
import { mapGetters} from 'vuex'
import jQuery from "jquery";
    const $ = jQuery;
    window.$ = $;

    export default {
        name : "Article",

        data : function (){
            return {
               
            }
        },

        beforeMount : function () {
            
        },

        mounted : function() {
            this.insertIframe()
                        
        },


        methods:{
            insertIframe: function () {
               var frame = $("#frame").contents().find('body');
               var text = $('span').html();
               frame.html(text);
            },
            enableEditMode: function () {
                let richTextField = document.getElementById('frame').contentWindow;
                richTextField.document.designMode = "on";
                //document.getElementById('myElement').style.display = 'none'; -> pour faire une fonction édition avec appararition des boutons (display block pour les boutons)
            },
            execCmd(command) {
                console.log(command);
                let richTextField =  document.getElementById('frame').contentWindow;
                richTextField.document.execCommand(command, false, 'test');
                
            },

        },
        computed: {
            ...mapGetters(['unArticle'])
        }
    }
</script>

<style scoped>
span {
    visibility: hidden;
}

iframe{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>