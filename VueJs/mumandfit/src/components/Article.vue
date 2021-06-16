<template>
    <div class = "article-box">
        <div class = "article">
            <div id = "banniereModif">
                <editor v-model = unArticle.banniere output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                    :init="myInitBanniere"

                />
            </div>
            <div id = "titreModif">
                <editor v-model = unArticle.titre output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                    :init="myInitTitre"

                />
            </div>
            <div id = "chapeauModif">
                <editor v-model = unArticle.chapeau output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitChapeau"
                />
            </div>
            <div id = "contenuModif">
                <editor v-model = unArticle.contenu output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitContenu"
                />
            </div>
            
        </div>
        <div id = "buttonArticle">
            <input type = 'submit' @click="toggleModale('save')" value="Enregistrer les modifications" class = "Button1 save" v-if="token">
            <input type = 'submit' @click="toggleModale('delete')" value = "Supprimer" class = "Button1 delete" v-if="token">
            <input @click="navigation" type ="submit" value = "Retour" class = "Button1 return">
        </div>

        <Modale :deleted="deleted" :revele="revele" :toggleModale="toggleModale" :supprimer="supprimer" :modifier="modifier" :save="save" v-if="revele"></Modale>

    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import jQuery from "jquery";
import Modale from './Modale.vue';

    const $ = jQuery;
    window.$ = $;

    export default {
        name : 'Article',
        components : {
            'editor' : Editor,
            Modale
        },
        data : function (){
            return {
               unArticle : {
                   id : this.$store.state.unArticle.id,
                   banniere : this.$store.state.unArticle.banniere,
                   titre : this.$store.state.unArticle.titre,
                   chapeau : this.$store.state.unArticle.chapeau,
                   contenu : this.$store.state.unArticle.contenu,
                   
               },
               revele :false,
               uploadImageStatus : false,
               token : this.$store.state.token,
               status : null,
               image : null,
               supprimer : false,
               modifier : false,
               myInitBanniere : {
                    selector : '#banniereModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
                    images_upload_url : '//localhost:8010/upload',
                    
               },
               myInitTitre : {
                   
                    selector : '#titreModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',

               },

               myInitChapeau : {
                    selector : '#chapeauModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen ',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
               },
               myInitContenu : {
                    selector : '#contenuModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    language_url : './assets/js/fr_FR.js',
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
                    automatic_uploads: true,
                    images_upload_url : '//localhost:8010/upload',
                    
                }
            }
        },
        mounted : function (){
                if(this.token === "") {
                    this.status = true
                }else{
                   this.status = false
                }
                /*this.http.post("//localhost:8010/jwt")
                .then(response=>{this.tinyToken = response.data});*/
        },
        beforeDestroy : function(){
            if(this.uploadImageStatus == false){
                this.http.post('//localhost:8010/createCanceled')
            }
        },

        methods : {
            toggleModale : function(event){
                this.revele = !this.revele
                if(event === "save"){
                    this.supprimer = false;
                    this.modifier = true;
                }
                if(event === "delete"){
                    this.supprimer = true;
                    this.modifier = false;
                }
                
            },
            save : function () {
                this.uploadImageStatus = true;
                this.$store.commit('modifArticleStore', this.unArticle);
                
                let unArticle = {
                    unArticle : {
                        id : this.$store.state.unArticle.id,
                        banniere : this.$store.state.unArticle.banniere,
                        titre : this.$store.state.unArticle.titre,
                        chapeau : this.$store.state.unArticle.chapeau,
                        contenu : this.$store.state.unArticle.contenu,
                    }
                }
                this.http.post('//localhost:8010/modifArticle' , unArticle)
                .then(response => console.log(response.data))
                .then(()=> {this.$router.push('/blog')})
            },
            deleted : function() {
                
                let unArticle = {
                    unArticle : {
                        id : this.$store.state.unArticle.id,
                        banniere : this.$store.state.unArticle.banniere,
                        titre : this.$store.state.unArticle.titre,
                        chapeau : this.$store.state.unArticle.chapeau,
                        contenu : this.$store.state.unArticle.contenu,
                    }
                }
                this.http.post('//localhost:8010/deleteArticle', unArticle)
                .then(response => console.log(response.data))
                .then(()=> {this.$router.push('/blog')})
            },
            navigation : function () {
                this.$router.go(-1)
            }
            
        }
    }
</script>

<style scoped>
.article-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0px 30px 0px;
    row-gap : 20px;
}
.article {
    width: 90%;
}
#buttonArticle{
    display: flex;
    column-gap: 20px;
}

</style>