<template>
    <div>
         <div class = "article">
            <div id = "banniereCreate">
                <editor  v-model = unArticle.banniere output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitBanniere"
                    initial-value="Placer une image de bannière ici"
                    />
            </div>
            <div id = "genreCreate">
                <div id = "genreCreatePos">
                    <editor  v-model = unArticle.genre output-format="html"
                        api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                        :disabled="status"
                        :init="myInitGenre"
                        initial-value="Placer un genre (<i>facultatif</i>)"
                        />
                </div>
            </div>        
            <div id = "titreCreate">
                <editor  v-model = unArticle.titre output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitTitre"
                    initial-value="<h1>Placer un titre ici</h1>"
                />
            </div>
            <div id = "chapeauCreate">
                <editor  v-model = unArticle.chapeau output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitChapeau"
                    initial-value="<strong>Placer un chapeau ici</strong>"
                />
            </div>
            <div id = "contenuCreate">
                <editor  v-model = unArticle.contenu output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitContenu"
                    initial-value="Placer le corps du post ici"
                />
            </div>
                <div id = "buttonCreateArticle">
                    <input type = 'submit' @click="createArticle" value="Enregistrer" class = "Button1">
                    <router-link to = "/admin" ><input type ="submit" value = "Retour" class = "Button1" ></router-link>
                </div>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import jQuery from "jquery";
    const $ = jQuery;
    window.$ = $;


    export default {
        name : 'NewArticle',
        components : {
            'editor' : Editor,
        },
        data : function (){
            return {
               unArticle : {
                   genre:'',
                   banniere : '',
                   titre : '',
                   chapeau : '',
                   contenu : '',
               },
               uploadImageStatus : null,
               token : this.$store.state.token,
               status : null,
               myInitGenre : {
                    selector : '#genreCreate',
                    height: 300,
                    menubar: 'file edit insert tools table help',
                    plugins: [
                    'paste importcss',
                    'fullscreen',
                    'help quickbars '
                    ],
                    toolbar:
                    'undo redo | \
                    alignleft aligncenter alignright alignjustify | \
                    outdent indent',
                    
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    images_upload_url : '//localhost:8010/upload',
                    quickbars_selection_toolbar: '',
                    quickbars_insert_toolbar: '',
               },
               myInitBanniere : {
                    selector : '#banniereCreate',
                    height: 300,
                    menubar: 'file edit insert tools table help',
                    plugins: [
                    'paste importcss',
                    'fullscreen image',
                    'imagetools',
                    'help quickbars '
                    ],
                    toolbar:
                    'undo redo | \
                    alignleft aligncenter alignright alignjustify | \
                    outdent indent | imagetools | quickimage',
                    quickbars_insert_toolbar: 'quickimage',
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
                    images_upload_url : '//localhost:8010/upload',
               },
               myInitTitre : {
                   
                    selector : '#titreCreate',
                    height: 200,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat |',
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    quickbars_selection_toolbar: '',
                    quickbars_insert_toolbar: '',

               },

               myInitChapeau : {
                    selector : '#chapeauCreate',
                    height: 200,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    'directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount ',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat |',
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    quickbars_selection_toolbar: '',
                    quickbars_insert_toolbar: '',

               },
               myInitContenu : {
                    selector : '#contenuCreate',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    'directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat |  | imagetools',
                    language_url : './assets/js/fr_FR.js',
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
                    //image_prepend_url : '/images/',
                    //relative_urls : false,
                    automatic_uploads: true,
                    //file_picker_types: 'image',
                    //images_upload_base_path:'/images/',
                    //tinydrive_token_provider : "//localhost:8010/jwt",

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
                  
        },
        beforeDestroy : function(){
            if(this.uploadImageStatus != true){
                this.http.post('//localhost:8010/createCanceled')
            }
        },
        methods : {
            createArticle : function () {

                this.uploadImageStatus = true;

                if(this.unArticle.banniere != '' && this.unArticle.titre != '' && this.unArticle.chapeau != '' && this.unArticle.contenu != ''){
                    let unArticle = 
                    { unArticle : {
                        id : "",
                        genre : this.unArticle.genre,
                        banniere : this.unArticle.banniere,
                        titre : this.unArticle.titre,
                        chapeau : this.unArticle.chapeau,
                        contenu : this.unArticle.contenu,
                    }}
                    this.http.post('//localhost:8010/createArticle', unArticle)

                    
                .then(response => {console.log(response.data)})
                .then(()=> {this.$router.push('/blog')})
                }
            
            },
            
        }
    }
</script>

<style scoped>

#genreCreate{
    display: flex;
    justify-content: center;
    align-items: center;
}
#genreCreatePos{
     color : black;
    text-transform: uppercase;
    border: 1px solid #204554;
    background-color: hsla(23,51%,92%,.4);
    padding: 12px;
    top : 87%;
    left : 2%;
}
#genreCreate>>>p{
    margin: 0;
    font-size: 12px;
}

#buttonCreateArticle{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    column-gap: 20px;
}
</style>