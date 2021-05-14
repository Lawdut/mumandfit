<template>
    <div>
         <div class = "article">
           
                <editor  v-model = unArticle.banniere output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitBanniere"
                    initial-value="Placer une image de bannière ici"
                    />
                    

                <editor  v-model = unArticle.titre output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitTitre"
                    initial-value="Placer un titre ici"
                />
                <editor  v-model = unArticle.chapeau output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitChapeau"
                    initial-value="Placer un chapeau ici"
                />
                <editor  v-model = unArticle.contenu output-format="html"
                    api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitContenu"
                    initial-value="Placer le corps du post ici"
                />

            
                <div id = "banniereCreate"></div>
                <div id = "titreCreate"></div>
                <div id = "chapeauCreate"></div>
                <div id = "contenuCreate"></div>
                <input type = 'submit' @click="createArticle" value="Enregistrer">
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
                   banniere : '',
                   titre : '',
                   chapeau : '',
                   contenu : '',
                   
               },
               token : this.$store.state.token,
               status : null,
               myInitBanniere : {
                    selector : '#banniereCreate',
                    height: 300,
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
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
                    images_upload_url : '//localhost:8010/upload',
                    file_picker_callback : function (callback, value, meta) {
                        if (meta.filetype == 'image') {
                        $('#upload').trigger('click');
                        $('#upload').on('change', function () {
                            var file = this.files[ 0 ];
                            var reader = new FileReader();
                            reader.onload = function (e) {
                            callback(e.target.result, {
                                alt: ''
                            });
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                    }
               },
               myInitTitre : {
                   
                    selector : '#titreCreate',
                    height: 200,
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
                    bullist numlist outdent indent | removeformat |  | imagetools',
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,

               },

               myInitChapeau : {
                    selector : '#chapeauCreate',
                    height: 200,
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
                    encoding: 'UTF-8',
                    inline: true,
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
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
                    file_picker_callback : function (callback, value, meta) {
                        if (meta.filetype == 'image') {
                        $('#upload').trigger('click');
                        $('#upload').on('change', function () {
                            var file = this.files[ 0 ];
                            var reader = new FileReader();
                            reader.onload = function (e) {
                            callback(e.target.result, {
                                alt: ''
                            });
                            };
                            reader.readAsDataURL(file);
                        });
                    }
                    }
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
        methods : {
            createArticle : function () {

                if(this.unArticle.banniere != '' && this.unArticle.titre != '' && this.unArticle.chapeau != '' && this.unArticle.contenu != ''){
                    this.http.post('//localhost:8010/createArticle', {
                    unArticle : {
                        banniere : this.unArticle.banniere,
                        titre : this.unArticle.titre,
                        chapeau : this.unArticle.chapeau,
                        contenu : this.unArticle.contenu,
                    }
                })
                .then(response => console.log(response.data))
                .then(()=> this.$router.push('/blog'))
                }
            
            }
        }
    }
</script>

<style scoped>

</style>