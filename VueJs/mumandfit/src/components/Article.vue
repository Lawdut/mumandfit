<template>
    <div class = "UnArticle">
        <div class = "vueArticle">
            <span v-html="$store.state.unArticle.contenu">{{$store.state.unArticle.contenu}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name : "Article",

        data : function (){
            return {
                
            }
        }
    }
</script>

<style scoped>

</style>