<template>
  <div class="home">

      <Modale :revele="revele" :toggleModale="toggleModale" :modifier="modifier" :save="save" v-if="revele"></Modale>

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
      />
      <div id = "buttonModifPres" v-if="token">
            <input type = 'submit' @click="toggleModale" value="Modifier" class = "Button1 save" v-if="token">
      </div>
    </div>
    
    
    
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import Editor from '@tinymce/tinymce-vue';
import Modale from '../components/Modale.vue';

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
     
      revele :false,
      modifier : true,
      token : this.$store.state.token,
      status : false,
      myInitPresentation : {
                   
                    selector : '#pres',
                    height: 400,
                    menubar: 'file edit view insert format tools table help',
                    plugins: [
                    'print preview paste importcss searchreplace autolink',
                    ' directionality code visualblocks visualchars fullscreen ',
                    'template codesample table charmap hr pagebreak nonbreaking',
                    'anchor toc insertdatetime advlist lists wordcount',
                    'textpattern noneditable help charmap quickbars emoticons '
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat ',
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
  methods : {
    save() {
      if(this.presentation != ''){
        let pres = this.presentation;
        
        this.http.post('//localhost:8010/modifPres', {pres})
        .then(response=>{console.log(response)})
        .then(()=>this.revele = false)
      }
    },
    toggleModale : function(){
                this.revele = !this.revele
    },
  },
  components: {
    VueperSlides,
    VueperSlide,
    'editor' : Editor,
    Modale
  }
}
</script>

<style scoped>
.home{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  
}
#imagePres{
  width: 65%;
  padding-left: 17.5%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index : 5;
  display: block;
}
#pres{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65%;
  padding-left: 17.5%;
  padding-bottom: 50px;
}
#buttonModifPres{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1400px) {
  #imagePres{
    width: 100%;
    padding-left: 0;
    margin-top: 0;
  }
  #pres{
    width: 80%;
    padding-left: 10%;
    padding-bottom: 50px;
  }
}
</style>
