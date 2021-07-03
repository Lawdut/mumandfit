<template>
    <div class = "modifPassword">
        <h1>Nouveau mot de passe pour vous connecter</h1>
        <div id = "emailChange">Votre email : {{this.email}}</div>

        <div class="passwordChange"><h2>Nouveau mot de passe</h2><input type="password" class ="inputFormPass" v-model="mdp" autocomplete="new-password" @focus="borderChange" v-bind:style="`--border : ${computedBorder}`"></div>
        <div class="passwordChange"><h2>Vérification du mot de passe</h2><input type="password" class ="inputFormPass" v-model="mdp2" autocomplete="new-password" @focus="borderChange" v-bind:style="`--border : ${computedBorder}`"></div>

        <div id = "messageChangeMDP" v-show="message!=''">{{message}}</div>
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
                mdp2 : '',
                message : '',
                revele :false,
                modifier : false,
                border : '',
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
                if((this.mdp === this.mdp2) && this.mdp !=''){
                    this.revele = !this.revele
                    if(event === "save"){
                        this.modifier = true;
                    }
                }else if(this.mdp != this.mdp2){
                    this.border = "2px solid red";
                    this.message = "Les mots de passe ne correspondent pas"
                }else if(this.mdp === ''){
                    this.message = "Veuillez remplir les champs"
                }
                
            },
            borderChange : function() {
                this.border = "1px solid #ccc"
                this.message = ''
            }
        },
        computed : {
                computedBorder : function () {
                    return this.border;
                }
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
    width: 100%;
}
.passwordChange{
    width: 100%;
    max-width: 300px;
}
.inputFormPass{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        --border : 1px solid #ccc;
        border : var(--border);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
}
.buttonChange{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
}
#messageChangeMDP{
    color : red;
}

 @media (max-width: 850px){
     .buttonChange{
    display: flex;
    flex-direction: column;    
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    margin-bottom: 10px;
    }
}

</style>