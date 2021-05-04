<template>
    <div class = "UnArticle">
        <div class = "vueArticle">
            <span v-html="$store.state.unArticle.contenu" width="300" height="200">{{unArticle.contenu}}</span>
            <button v-on:click="enableEditMode()">Editer</button>
            <div>
                <button v-on:click="execCmd('bold');">Gras</button>
            </div>
            <iframe id="frame" name ="richTextField" ></iframe>
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
                let richTextField =  document.getElementById('frame').contentWindow;
                console.log(richTextField);
                richTextField.document.designMode = "on";
            },
            execCmd(command) {
                console.log(command);
                let richTextField =  document.getElementById('frame').contentWindow;
                richTextField.document.execCommand(command, false, 'test');
            }

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
    border: 0 none;
}
</style>