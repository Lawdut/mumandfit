<template>
    <div id ="changePassMail">
        <h1>Mot de passe pour accéder à la boîte mail</h1>
        <p>Si vous avez changé le mot de passe pour accéder à votre adresse mail,</p><p>il faut <strong>impérativement</strong> rentrer le nouveau ici.</p><p> Sans cela, vous ne recevrez plus de message de la part de vos potentiels futurs clients.</p>
        <input type ="password" v-model="mdpAdresseMail" autocomplete="new-password" class = "inputForm">

        <div id="buttonChangeMdpMail">
                <input type = 'submit' @click="toggleModale('save')" value="Enregistrer les modifications" class = "Button1 save">
                <router-link to = "/admin" ><input type ="submit" value = "Retour" class = "Button1" ></router-link>
        </div>

        <transition name="fade">
                <Modale :revele="revele" :toggleModale="toggleModale" :modifier="modifier" :save="save" v-if="revele"></Modale>
        </transition>
    </div>
</template>

<script>
import Modale from '../Modale.vue';
    export default {
       name :"ChangePassMail",
       components : {
            Modale,
        },
       data(){
           return{
               mdpAdresseMail : '',
               revele :false,
                modifier : false,
           }
       },

        methods : {
            save() {
                this.http.post('//localhost:8010/updateMdpMail', {
                    mdpAdresseMail : this.mdpAdresseMail,
                })
                .then(()=>this.revele=false)
                .then(()=>this.$router.push('/admin'))
            },
            toggleModale : function(event){
                this.revele = !this.revele
                if(event === "save"){
                    this.modifier = true;
                }
            },
        }
    }
</script>

<style scoped>
#buttonChangeMdpMail{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    margin: 30px;
}
</style>