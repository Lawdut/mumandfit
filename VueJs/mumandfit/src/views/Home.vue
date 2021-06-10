<template>
  <div class="home">
    <div id = "imagePres">
      <vueper-slides fade autoplay :touchable="true" :pause-on-hover="pauseOnHover" :slide-ratio="337 / 599">
        <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" />
      </vueper-slides>

    </div>
    <div id = 'pres'>
      <editor v-model = presentation output-format = "html"
      api-key="2jgh6mgdua98sogh7mnlao1m9ilkavvncdhz2sa9frmmbet6"
                    :disabled="status"
                    :init="myInitPresentation"
                    initial-value="Placer une présentation ici"
      />
    </div>
    <div id = "buttonModifPres">
            <input type = 'submit' @click="saveModifPres" value="Modifier" class = "Button1 save" v-if="token">
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import Editor from '@tinymce/tinymce-vue';

export default {
  name: 'Home',
  data() {
    return {
      pauseOnHover: true,
      
      slides : [
        {
          image : require("../../public/imagesSlider/image1.jpg")
        },
        {
          image : require("../../public/imagesSlider/image2.jpg")
        },
        {
          image : require("../../public/imagesSlider/image3.jpg")
        },
      ],
      
      presentation : this.presentation,
      
      token : this.$store.state.token,
      status : null,
      myInitPresentation : {
                   
                    selector : '#pres',
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
      }
  },
  beforeMount : function(){
    this.http.post('//localhost:8010/getPres')
    .then(response=>this.presentation = response.data.textPres)
    
  },
  mounted : function (){
                if(this.token === "") {
                    this.status = true
                }else{
                   this.status = false
                }
  },
  components: {
    VueperSlides,
    VueperSlide,
    'editor' : Editor,
  }
}
</script>

<style scoped>
.home{
  display: grid;
  grid-template-columns: repeat(6 , 1fr);
  grid-template-rows: repeat(4, 1fr);
  
}
#imagePres{
  grid-column: 1/7;
  grid-row: 1/2;
  margin : 50px 0px;
  width: 65%;
  padding-left : 17.5%;
}
#pres{
  grid-column: 2/6;
  grid-row: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#buttonModifPres{
  grid-column: 2/6;
  grid-row: 4/5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 1000px) {
  #imagePres{
    width: 100%;
    padding-left: 0;
    align-content: center;
    justify-items: center;
  }
}
</style>
