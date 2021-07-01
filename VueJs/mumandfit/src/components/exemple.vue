<template>
    <div>
        <div id = "exemple" v-if="exemple!=''">Hello</div>
        <input type = "submit" @click='fonctionExemple'>
    </div>
</template>

<script>
    export default {
        name : "exemple",

        data() {
            return{
                exemple: '',
            }
        },

        beforeMount : function () {
            this.exemple = "show"
        },

        methods : {
            fonctionExemple() {
                this.exemple = ''
            }
        }
    }
</script>

<style scoped>
#exemple{
    width: 100%;
}
</style>