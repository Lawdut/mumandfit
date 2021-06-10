<template>
    <div class = 'imageSlider'>
        <h1>Hello</h1>
        <div id = "image1">
            <h2>Image 1</h2>
            <img src = "../../../public/imagesSlider/image1.jpg">
            <input type = "file" name = 'image1' @change="processFile1($event)" accept="image/jpg, image/jpeg">
        </div>
        <div id = "image2">
            <h2>Image 2</h2>
            <img src = "../../../public/imagesSlider/image2.jpg">
            <input type = "file" name = 'image2' @change="processFile2($event)">
        </div>
        <div id = "image3">
            <h2>Image 3</h2>
            <img src = "../../../public/imagesSlider/image3.jpg">
            <input type = "file" name = 'image3' @change="processFile3($event)">
        </div>
    </div>
</template>

<script>
    export default {
        name : "ChangeImageSlider",
        data: function() {
            return {
                image1change : [],
                image2change : [],
                image3change : [],
            }
            
        },
        methods: {
            processFile1(event) {
                this.image1change = event.target.files[0];
                let id = 1;

                let formData = new FormData();

                formData.append('image', this.image1change)
                formData.append('id', id)

                this.http.post('//localhost:8010/uploadSlider', formData)
                .then(res=>{console.log(res)})

            },
            processFile2(event) {
                this.image2change = event.target.files[0];
                let id = 2;
                let formData = new FormData();

                formData.append('image', this.image2change)
                formData.append('id', id)

                this.http.post('//localhost:8010/uploadSlider', formData)
                .then(res=>{console.log(res)})
            },
            processFile3(event) {
                this.image3change = event.target.files[0];
                let id = 3;
                let formData = new FormData();

                formData.append('image', this.image3change)
                formData.append('id', id)

                this.http.post('//localhost:8010/uploadSlider', formData)
                .then(res=>{console.log(res)})
            }
}
    }
</script>

<style scoped>
.imageSlider{

}
</style>