<template>
    <div>
        <h1>Référencer un nouvel e-book sur le site</h1>

        <h2>Etape 1</h2>
        <p>Se rendre sur Snipcart à l'adresse <a href = "https://app.snipcart.com/dashboard/digital/upload">en suivant ce lien</a> et télécharger le fichier</p>

        <h2>Etape 2</h2>
        <p>Récupérer le GUID et l'insérer ci-dessous</p>
        <input type = "text" class = "inputForm" v-model = ebook.guid>

        <h2>Etape 3</h2>
        <p>Fixer un prix (sous ce format : 79.95)</p>
        <input type = "text" class = "inputForm" v-model = ebook.prix>

        <h2>Etape 4</h2>
        <p>Donner un titre à l'e-book</p>
        <input type = "text" class = "inputForm" v-model = ebook.titre>

        <h2>Etape 5</h2>
        <p>Donner une description en cliquant ci-dessous</p>
        <div id = "description">
            <editor v-model = ebook.description 
            api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
            :init="myInit"
            :disabled="status"
            initial-value="<strong>Clic ici</strong>"
            />
        </div>

        <div id = "buttonEbook">
            <input type = 'submit' @click="saveArticle" value="Enregistrer" class = "Button1 save" v-if="token">
            <router-link to = "/admin" ><input type ="submit" value = "Retour" class = "Button1" ></router-link>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

    export default {
        name : 'NewEbook',
        components : {
            'editor' : Editor,
        },
        data : function () {
            return {
                ebook : {
                    guid : '',
                    titre : '',
                    prix : '',
                    description : ''
                },
                token : this.$store.state.token,
                status : null,
                myInit : {
                    selector : '#description',
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
        mounted : function (){
                if(this.token === "") {
                    this.status = true
                }else{
                   this.status = false
                }
        },
        methods : {
            
        }
    }
</script>

<style scoped>
.inputForm{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        --border : 1px solid #ccc;
        border: var(--border);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
</style>