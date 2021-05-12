<template>
    <div>
        <div>
            <editor @onSaveContent="saveArticle()" v-model = unArticle.genre output-format="html"
            api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
            :disabled="status"
                :init="{
                    selector : '#myeditable',
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

                    
                }"

        />
            <editor @onSaveContent="saveArticle()" v-model = unArticle.contenu output-format="html"
                api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                :disabled="status"
                :init="myInit"
                />
            
            <div id="myeditable"></div>
            <div class ="editable"></div>
            <img src = "https://ibb.co/KXVYZZ5">
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
                   contenu : this.$store.state.unArticle.contenu,
                   genre : this.$store.state.unArticle.genre
               },
               token : this.$store.state.token,
               status : null,
               image : null,
               myInit : {
                    selector : '.editable',
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
                   //automatic_uploads: true,
                    file_picker_types: 'image',
                    //images_upload_base_path:'/images/',
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
            saveArticle : function () {
                this.$store.commit('modifArticleStore', this.unArticle);
                this.http.post('//localhost:8010/modifArticle' , {
                    unArticle : {
                        id : this.$store.state.unArticle.id,
                        contenu : this.$store.state.unArticle.contenu,
                        genre : this.$store.state.unArticle.genre}
                })
                .then(response => console.log(response.data))
            },
            
        }
    }
</script>

<style scoped>

</style>