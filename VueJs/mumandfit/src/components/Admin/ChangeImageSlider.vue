<template>
    <div class = 'imageSlider'>
        <div class = "titreSlider"><h1>Images du slider</h1></div>
        <div id = "image1">
            <h2>Image 1</h2>
            <img src = "../../../public/imagesSlider/image1.jpg">
            <label for ="file1" class = "Button1">Choisir une nouvelle image</label>
            <input id = "file1" type = "file" name = 'image1' @change="processFile($event, 1)"  accept="image/jpg, image/jpeg">
        </div>
        <div id = "image2">
            <h2>Image 2</h2>
            <img src = "../../../public/imagesSlider/image2.jpg">
            <label for ="file2" class = "Button1">Choisir une nouvelle image</label>
            <input id = "file2" type = "file" name = 'image2' @change="processFile($event, 2)" accept="image/jpg, image/jpeg">
        </div>
        <div id = "image3">
            <h2>Image 3</h2>
            <img src = "../../../public/imagesSlider/image3.jpg">
            <label for ="file3" class = "Button1">Choisir une nouvelle image</label>
            <input id ="file3" type = "file" name = 'image3' @change="processFile($event, 3)" accept="image/jpg, image/jpeg">
        </div>
    </div>
</template>

<script>
    export default {
        name : "ChangeImageSlider",
        data: function() {
            return {
                imageChange : [],
                
            }
        },
        methods: {
            processFile(event, id) {
                this.imageChange = event.target.files[0];
                let formData = new FormData();

                formData.append('image', this.imageChange)
                formData.append('id', id)

                this.http.post('//localhost:8010/uploadSlider', formData)
                .then(response=>{console.log(response)})

            },
            /*processFile2(event) {
                this.image2change = event.target.files[0];
                let id = 2;
                let formData2 = new FormData();

                formData2.append('image', this.image2change)
                formData2.append('id', id)

                this.http.post('//localhost:8010/uploadSlider', formData2)
                .then(res=>{console.log(res)})
            },
            processFile3(event) {
                this.image3change = event.target.files[0];
                let id = 3;
                let formData3 = new FormData();

                formData3.append('image', this.image3change)
                formData3.append('id', id)

                this.http.post('//localhost:8010/uploadSlider', formData3)
                .then(res=>{console.log(res)})
            }*/
}
    }
</script>

<style scoped>
.imageSlider{
    display : grid;
    grid-template-rows: repeat(8, 1fr);
}
.titreSlider{
    grid-row: 1/2;
}
#image1{
    grid-row: 2/4;
    border-bottom : 2px solid black;
    border-top : 2px solid black;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    padding-bottom: 20px;
}
#image2{
    grid-row : 4/6;
    border-bottom : 2px solid black;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    padding-bottom: 20px;
}
#image3{
    grid-row : 6/8;
    border-bottom : 2px solid black;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    padding-bottom: 20px;
}
img{
    width: 400px
}
input{
    display: none;
}
</style>