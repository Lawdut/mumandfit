<template>
    <div class = "UnArticle">
        <div class = "vueArticle">
            
            
            <iframe id="frame" name ="richTextField" frameborder="0" height="100%" allowfullscreen="" loading="lazy" v-bind:srcdoc="$store.state.unArticle.contenu"></iframe>

            <div>
                <button v-on:click="enableEditMode()">Editer</button>
                <button v-on:click="execCmd('bold');"><i class = "fa fa-bold"></i></button>
                <button v-on:click="execCmd('italic');"><i class = "fa fa-italic"></i></button>
                <button v-on:click="execCmd('underline');"><i class = "fa fa-underline"></i></button>
                <button v-on:click="execCmd('strikethrough');"><i class = "fa fa-strikethrough"></i></button>
                <button v-on:click="execCmd('justifLeft');"><i class = "fa fa-align-left"></i></button>
                <button v-on:click="execCmd('justifyCenter');"><i class = "fa fa-align-center"></i></button>
                <button v-on:click="execCmd('justifyRight');"><i class = "fa fa-align-right"></i></button>
                <button v-on:click="execCmd('justifyFull');"><i class = "fa fa-align-justify"></i></button>
                <button v-on:click="execCmd('cut');"><i class = "fa fa-cut"></i></button>
                <button v-on:click="execCmd('copy');"><i class = "fa fa-copy"></i></button>
                <button v-on:click="execCmd('indent');"><i class = "fa fa-indent"></i></button>
                <button v-on:click="execCmd('outdent');"><i class = "fa fa-dedent"></i></button>
                <button v-on:click="execCmd('subscript');"><i class = "fa fa-subscript"></i></button>
                <button v-on:click="execCmd('superscript');"><i class = "fa fa-superscript"></i></button>
                <button v-on:click="execCmd('undo');"><i class = "fa fa-undo"></i></button>
                <button v-on:click="execCmd('redo');"><i class = "fa fa-repeat"></i></button>
                <button v-on:click="execCmd('insertUnorderedList');"><i class = "fa fa-list-ul"></i></button>
                <button v-on:click="execCmd('insertOrderedList');"><i class = "fa fa-list-ol"></i></button>
                <button v-on:click="execCmd('insertParagraph');"><i class = "fa fa-paragraph"></i></button>
                <select v-on:click="execCmdArgs('formatBlock',selectedTitle)" v-model="selectedTitle" >
                    <option value = "H1">H1</option>
                    <option value = "H2">H2</option>
                    <option value = "H3">H3</option>
                    <option value = "H4">H4</option>
                    <option value = "H5">H5</option>
                    <option value = "H6">H6</option>
                </select>
                <button v-on:click="execCmd('insertHorizontaleRule');">HR</button>
                <button v-on:click="execCmdArgs('createLink', alert('Entrez une URL', 'http://'));"><i class = "fa fa-link"></i></button>
                <button v-on:click="execCmd('unlink');"><i class = "fa fa-unlink"></i></button>
                <button v-on:click="toggleSource();"><i class = "fa fa-code"></i></button>
                <button v-on:click="toggleEdit();">Toggle Edit</button>
                <select v-on:click="execCmdArgs('fontName',selectedFont)" v-model="selectedFont">
                    <option value = "Arial">Arial</option>
                    <option value = "Comic Sans MS">Comic Sans MS</option>
                    <option value = "Courier">Courier</option>
                    <option value = "Georgia">Georgia</option>
                    <option value = "Tahoma">Tahoma</option>
                    <option value = "Times New Roman">Times New Roman</option>
                    <option value = "Verdana">Verdana</option>
                </select>
                <select v-on:click="execCmdArgs('formatBlock',selectedSize)" v-model="selectedSize">
                    <option value = "1">1</option>
                    <option value = "2">2</option>
                    <option value = "3">3</option>
                    <option value = "4">4</option>
                    <option value = "5">5</option>
                    <option value = "6">6</option>
                    <option value = "7">7</option>
                </select>

                Font Color : <input type = "color" v-on:click="execCmdArgs('foreColor',selectedColor)" v-model="selectedColor">
                Background Color : <input type = "color" v-on:click="execCmdArgs('hiliteColor',selectedBackgroundColor)" v-model="selectedBackgroundColor">

                <button v-on:click="execCmdArgs('insertImage', alert('Insérez une image', ''));"><i class = "fa fa-file-image-o"></i></button>
                <button v-on:click="execCmd('selectAll');">Select All</button>

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
               },
               selectedTitle : "H1",
               selectedFont : "Tahoma",
               selectedSize : "1",
               selectedColor : "",
               selectedBackgroundColor : "",
               showingSourceCode : false,
            }
        },

        beforeMount : function () {
            
        },

        mounted : function() {

                        
        },


        methods:{

            enableEditMode: function () {
                let richTextField = document.getElementById('frame').contentWindow;
                richTextField.document.designMode = "on";
                //document.getElementById('myElement').style.display = 'none'; -> pour faire une fonction édition avec appararition des boutons (display block pour les boutons)
            },
            execCmd(command) {
                let richTextField =  document.getElementById('frame').contentWindow;
                richTextField.document.execCommand(command, false, null);
                
            },
            execCmdArgs(command, args){
                let richTextField =  document.getElementById('frame').contentWindow;
                richTextField.document.execCommand(command, false, args);
            },

            toggleSource() {
                let richTextField = document.getElementById('frame').contentWindow;
                if (this.showingSourceCode) {
                    richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document.getElementsByTagName('body')[0].textContent;
                }else {
                    richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document.getElementsByTagName('body')[0].innerHTML;
                }
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