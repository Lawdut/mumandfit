<template>
    <div>
        <div>
            <editor @onSaveContent="saveArticle()" v-model = unArticle.banniere output-format="html"
            api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
            :disabled="status"
                :init="myInitBanniere"

            />

            <editor @onSaveContent="saveArticle()" v-model = unArticle.titre output-format="html"
            api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
            :disabled="status"
                :init="myInitTitre"

            />
            <editor @onSaveContent="saveArticle()" v-model = unArticle.chapeau output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                :init="myInitChapeau"
            />
            <editor @onSaveContent="saveArticle()" v-model = unArticle.contenu output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                :init="myInitContenu"
            />

            <div class = "article">
                <div id = "banniereModif"></div>
                <div id = "titreModif"></div>
                <div id = "chapeauModif"></div>
                <div id = "contenuModif"></div>
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
        name : 'Article',
        components : {
            'editor' : Editor,
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
               token : this.$store.state.token,
               status : null,
               image : null,
               myInitBanniere : {
                    selector : '#banniereModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink autosave',
                    'save directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons save'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | save | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
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
                   
                    selector : '#titreModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink autosave',
                    'save directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons save'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | save | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,

               },

               myInitChapeau : {
                    selector : '#chapeauModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink autosave',
                    'save directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons save'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | save | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    encoding: 'UTF-8',
                    entity_encoding : 'raw',
                    image_advtab: true,
                    image_uploadtab: true,
               },
               myInitContenu : {
                    selector : '#contenuModif',
                    height: 500,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink autosave',
                    'save directionality code visualblocks visualchars fullscreen image',
                    'link media template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount imagetools',
                    'textpattern noneditable help charmap quickbars emoticons save'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | save | imagetools',
                    toolbar_sticky: true,
                    inline: true,
                    language_url : './assets/js/fr_FR.js',
                    encoding: 'UTF-8',
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
                /*this.http.post("//localhost:8010/jwt")
                .then(response=>{this.tinyToken = response.data});*/
        },
        created : function() {
                
        },

        methods : {
            saveArticle : function () {
                this.$store.commit('modifArticleStore', this.unArticle);
                this.http.post('//localhost:8010/modifArticle' , {
                    unArticle : {
                        id : this.$store.state.unArticle.id,
                        banniere : this.$store.state.unArticle.banniere,
                        titre : this.$store.state.unArticle.titre,
                        chapeau : this.$store.state.unArticle.chapeau,
                        contenu : this.$store.state.unArticle.contenu,
                        }
                })
                .then(response => console.log(response.data))
            },
            
        }
    }
</script>

<style scoped>

</style>