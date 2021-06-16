<template>
    <div class = "ebook-box">
    <div class = "ebook">
        <div id = "titreModifEbook">
            <editor v-model = ebook.titre output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                :init="myInitTitreEbook"

            />
        </div>
        <div id = "descriptionModifEbook">
            <editor v-model = ebook.description output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                :init="myInitDescription"
            />
        </div>
        <div id = "corpsModifEbook">
            <editor v-model = ebook.corps output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                :init="myInitCorps"
            />
        </div>
        
    </div>
    <div id = "modifPrix" v-if="token">Modifier le prix : <input type = "number" class = "inputForm" v-model = ebook.prix> €</div>
    <div id = "buttonEbook">
        <input type = 'submit'  value="Enregistrer les modifications" class = "Button1 save" v-if="token" @click="toggleModale('save')">
        <input type = 'submit'  value = "Supprimer" class = "Button1 delete" v-if="token" @click="toggleModale('delete')">
        <button class = "snipcart-add-item Button1" v-if="!token"
            :data-item-id= this.ebook.id
            :data-item-price= this.ebook.prix
            :data-item-url= this.ebook.url
            :data-item-file-guid = this.ebook.guid
            :data-item-name = this.titreSansBalise
        >Ajouter au panier : {{ebook.prix}} €</button>
        <input @click="navigation" type ="submit" value = "Retour" class = "Button1 return">
    </div>

    <Modale :deleted="deleted" :revele="revele" :toggleModale="toggleModale" :guid="ebook.guid" :supprimer="supprimer" :modifier="modifier" :save="save" v-if="revele"></Modale>

</div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Modale from './Modale.vue';

    export default {
        name : 'ebook',
        components : {
            'editor' : Editor,
            Modale,
        },
        data (){
            return{
                ebook : {
                    id : this.$route.params.id,
                    guid : '',
                    prix : '',
                    titre : '',
                    description : '',
                    corps : '',
                    url : "http://localhost:8080/ebook/"+`${this.$route.params.id}` ,
                },
                titreSansBalise : "",
                revele :false,
                token : this.$store.state.token,
                status : null,
                enregistrer : false,
                modifier : false,
                myInitTitreEbook : {
                    selector : '#titreModifEbook',
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
                myInitDescription : {
                    selector : '#descriptionModifEbook',
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
               myInitCorps : {
                    selector : '#corpsModifEbook',
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
            }
        },
        beforeMount : function (){
            let id = this.ebook.id
            this.http.post('//localhost:8010/getOneEbook', {id})
            .then(response=>{
                this.ebook.guid = response.data.ebook[0].guid;
                this.ebook.prix = response.data.ebook[0].prix;
                this.ebook.titre = response.data.ebook[0].titre;
                this.ebook.description = response.data.ebook[0].description;
                this.ebook.corps = response.data.ebook[0].corps;
                this.titreSansBalise = response.data.ebook[0].titre.replace(/<h1>/g, "").replace(/<\/h1>/g, "")
            })
            //.then(response=>{console.log(response.data)})
        },
        mounted : function (){
                if(this.token === "") {
                    this.status = true
                }else{
                   this.status = false
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
            navigation : function () {
                this.$router.go(-1)
            },
            deleted : function() {
                let ebook = {
                    ebook : {
                        id : this.ebook.id,
                        guid : this.ebook.guid,
                        prix : this.ebook.prix,
                        titre : this.ebook.titre,
                        description : this.ebook.description,
                        corps : this.ebook.corps,
                        url : "http://localhost:8080/ebook/"+`${this.$route.params.id}`
                    }  
                }
                this.http.post('//localhost:8010/deleteEbook', ebook)
                .then(()=>{this.$router.push('/eboutique')})
            },
            save : function(){
                let ebook = {
                    ebook : {
                        id : this.ebook.id,
                        guid : this.ebook.guid,
                        prix : this.ebook.prix,
                        titre : this.ebook.titre,
                        description : this.ebook.description,
                        corps : this.ebook.corps,
                        url : "http://localhost:8080/ebook/"+`${this.$route.params.id}`
                    }  
                }
                this.http.post('//localhost:8010/modifEbook', ebook)
                .then(()=>{this.$router.push('/eboutique')})
            }
        }
    }
</script>

<style scoped>
.ebook-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0px 30px 0px;
    row-gap : 20px;
}
.ebook {
    width: 90%;
}
#buttonEbook{
    display: flex;
    column-gap: 20px;
}
</style>