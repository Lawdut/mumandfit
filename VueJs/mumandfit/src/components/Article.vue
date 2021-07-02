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
            
            <div id = "genreModif" v-if="unArticle.genre != '' || token">
                <div id = "genreModifPos">
                    <editor v-model = unArticle.genre output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitGenre"
                    initial-value="Placer un genre ici (<i>facultatif</i>) ?"
                    />
                </div>
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
        <div class="date">
                    <div class = "dateCreat">Créé le {{unArticle.date_creation}}</div>
                        <div v-if="this.$store.state.unArticle.statusMaj != 'non' || token " class = "dateModif">
                        <p v-if="this.$store.state.unArticle.date_modif != null">Mis à jour le {{unArticle.date_maj}}</p>
                        <div id = "majValid" v-if="token && this.$store.state.unArticle.date_modif != null">
                            <p>Souhaitez-vous faire apparaître la date de mise à jour ?</p>
                            <input type ="radio" id="yes" name="status_maj" value="oui" @change="changeStatus(1)" v-model="this.unArticle.statusMaj">
                            <label for="yes">Oui</label>
                            <input type ="radio" id="no" name="status_maj" value="non" @change="changeStatus(0)" v-model="this.unArticle.statusMaj">
                            <label for="no">Non</label>
                        </div>

                    </div>
                </div>
        </div>
        <div id = "buttonArticle">
            <input type = 'submit' @click="toggleModale('save')" value="Enregistrer les modifications" class = "Button1 save" v-if="token">
            <input type = 'submit' @click="toggleModale('delete')" value = "Supprimer" class = "Button1 delete" v-if="token">
            <input @click="navigation" type ="submit" value = "Retour" class = "Button1 return">
        </div>
        <transition name="fade">
            <Modale :deleted="deleted" :revele="revele" :toggleModale="toggleModale" :supprimer="supprimer" :modifier="modifier" :save="save" v-if="revele"></Modale>
        </transition>

    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Modale from './Modale.vue';


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
                   genre : this.$store.state.unArticle.genre,
                   banniere : this.$store.state.unArticle.banniere,
                   titre : this.$store.state.unArticle.titre,
                   chapeau : this.$store.state.unArticle.chapeau,
                   contenu : this.$store.state.unArticle.contenu,
                   date_creation : this.$store.state.unArticle.date_creat,
                   date_maj : this.$store.state.unArticle.date_modif,
                   statusMaj : this.$store.state.unArticle.statusMaj,
                   
               },
               //selectedValue : this.$store.state.unArticle.statusMaj,
               revele :false,
               uploadImageStatus : false,
               token : this.$store.state.token,
               status : false,
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
               myInitGenre : {
                   
                    selector : '#genreModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount ',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    quickbars_selection_toolbar: '',
                    quickbars_insert_toolbar: '',

               },
               myInitTitre : {
                   
                    selector : '#titreModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount ',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    quickbars_selection_toolbar: '',
                    quickbars_insert_toolbar: '',

               },

               myInitChapeau : {
                    selector : '#chapeauModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen ',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    quickbars_selection_toolbar: '',
                    quickbars_insert_toolbar: '',
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
            changeStatus(status){
                if(status === 1){
                    this.unArticle.statusMaj = 'oui'
                }else if(status === 0){
                    this.unArticle.statusMaj = 'non'
                }
    
            },
            save : function () {
                this.uploadImageStatus = true;
                this.$store.commit('modifArticleStore', this.unArticle);
                
                let unArticle = {
                    unArticle : {
                        id : this.$store.state.unArticle.id,
                        genre : this.$store.state.unArticle.genre,
                        banniere : this.$store.state.unArticle.banniere,
                        titre : this.$store.state.unArticle.titre,
                        chapeau : this.$store.state.unArticle.chapeau,
                        contenu : this.$store.state.unArticle.contenu,
                        statusMaj : this.$store.state.unArticle.statusMaj,
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
                        genre : this.$store.state.unArticle.genre,
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

#genreModif{
    display: flex;
    justify-content: center;
    align-items: center;
}
#genreModifPos{
     color : black;
    text-transform: uppercase;
    border: 1px solid #204554;
    background-color: hsla(23,51%,92%,.4);
    padding: 12px;
    top : 87%;
    left : 2%;
}
#genreModif>>>p{
    margin: 0;
    font-size: 12px;
}
.article {
    width: 90%;
}
#buttonArticle{
    display: flex;
    column-gap: 20px;
}
.date{
    margin-bottom: 20px;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
.dateModif{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
#majValid{
    background-color:hsla(7, 78%, 66%, 0.25);
    border: 1px solid #204554;
    padding: 5px;
}
@media (max-width : 680px){
    #buttonArticle{
        display: flex;
        flex-direction: column;
        row-gap: 20px;

    }
}
</style>