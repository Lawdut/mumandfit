<template>
  <div class="home">
    <div id = "imagePres">
      <vueper-slides fade autoplay :touchable="true" :pause-on-hover="pauseOnHover" fixedHeight="100%">
      <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" />
      </vueper-slides>

    </div>
    <div id = 'pres'>
      <editor v-model = pres.titre output-format = "html"/><h1>Qui suis-je ?</h1>
      <p id = "presText">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, quo. Nulla impedit illum veritatis deleniti facere debitis dolorem! Reiciendis sed vero cumque est nihil, saepe debitis odio accusamus quas illum culpa eum ipsa enim veniam temporibus unde consequuntur labore quae repellat iste quod explicabo? Enim assumenda quae asperiores culpa dignissimos fuga maxime numquam accusantium excepturi molestiae, consequuntur distinctio iusto error quas, velit dolorem temporibus itaque fugiat saepe at sint vitae beatae totam? Odit nesciunt, distinctio culpa corrupti ut quas explicabo vero fuga deleniti fugit alias asperiores tempora sunt labore quo recusandae nam reiciendis. Nesciunt, quibusdam ullam? Quos, voluptas perferendis harum reiciendis illo error officiis, quod molestias nobis autem sapiente amet et corporis eius accusantium quia a ipsam nisi labore. Quos optio nesciunt magni est suscipit, voluptatibus consectetur ea quis, esse temporibus ducimus ab. Distinctio laboriosam ut quam enim recusandae blanditiis explicabo architecto culpa qui necessitatibus quo sed voluptatibus voluptates ratione aliquid, laudantium soluta provident, temporibus nostrum cumque! Totam magni consequatur accusamus deleniti nulla non veniam quae aliquam consectetur ipsum, earum eum provident possimus nesciunt id? Perferendis eligendi temporibus incidunt aspernatur totam iure fugiat soluta ea ipsum aperiam, optio modi, voluptate voluptatem recusandae vitae. Eius qui ab neque provident expedita quidem?
      </p>
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
      pres : {
        titre : this.titre,
        presentation : this.presentation
      }
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
  grid-template-rows: repeat(2, 1fr);
}
#imagePres{
  grid-column: 1/7;
  grid-row: 1/2;
  margin : 50px 0px;
  height: 500px;
  width: 100%;
}
#pres{
  grid-column: 2/6;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
