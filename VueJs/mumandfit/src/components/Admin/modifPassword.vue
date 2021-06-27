<template>
    <div class = "modifPassword">
        <h1>Nouveau mot de passe</h1>
        <div id = "emailChange">Votre email : {{this.email}}</div>
        <div id="password1"><input type="password" class ="inputFormPass" v-model="mdp" autocomplete="new-password"></div>

        <div class="buttonChange">
            <div id= "submitPassChange"><input type = "submit" class ="Button1"  @click="toggleModale('save')" value = "Changer le mot de passe" name = 'submit'></div>
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
        name : 'changePassword',
        components : {
            Modale,
        },
        data : function() {
            return{
                email : this.$store.state.user,
                mdp : '',
                revele :false,
                modifier : false,
            }
        },
        methods : {
            save(){
                this.http.post('http://localhost:8010/changePass', {
                    email : this.email,
                    mdp : this.mdp
                })
                .then(response=>{console.log(response.data)})
                .then(()=> this.$router.push("/admin"))
                    
                
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
.modifPassword{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
}
.inputFormPass{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        border : 1px solid #ccc;
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
}
.buttonChange{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
}
</style>