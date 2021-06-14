<template>
    <div class = "article-box">
    <div class = "article">
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
    <div id = "buttonArticle">
        <input type = 'submit'  value="Enregistrer" class = "Button1 save" v-if="token">
        <input type = 'submit'  value = "Supprimer" class = "Button1 delete" v-if="token">
        <button class = "snipcart-add-item Button1" 
            :data-item-id= this.ebook.id
            :data-item-price= this.ebook.prix
            :data-item-url= this.ebook.url
            :data-item-file-guid = this.ebook.guid
            :data-item-name = this.ebook.titre
        >Ajouter au panier</button>
        <input @click="navigation" type ="submit" value = "Retour" class = "Button1 return">
    </div>
</div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
    export default {
        name : 'ebook',
        components : {
            'editor' : Editor,
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
                urls : this.$route.params.id,
                token : this.$store.state.token,
                status : null,
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
            })
        },
        mounted : function (){
                if(this.token === "") {
                    this.status = true
                }else{
                   this.status = false
                }
        },
        methods : {
            navigation : function () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>