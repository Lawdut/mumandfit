<template>
    <div id="inscription">
        <div class = "titreInsc">
            <h1> INSCRIPTION </h1>
        </div>

        <div v-if="!message">
            <div id = "titre-prenom"><h2>Prénom</h2></div>
            <input type="text" name="prenom" class = "input prenom-inscri" v-model ="prenom">
        
        
            <div id = "titre-nom"><h2>Nom</h2></div>
            <input type="text" name="last_name" class = "input nom-inscri" v-model ="nom">
                      
        
            <div id = "titre-email-inscri"><h2>Email</h2></div>
            <input type="email" name="mail" placeholder="courriel@exemple.com" v-on:Focus="this.value='';" class="input email-inscri" v-model ="email">

            <div class = "titre-password-inscri"><h2>Mot de passe</h2></div>
            <input type="password" name="password" id="password1"  class="input passwd-inscri" v-model ="password">
        
        
            <div class = "titre-passwd2-inscri"><h2>Confirmation du mot de passe</h2></div>
            <input type="password" name="password2" id="password2"  class="input password2-inscri">
        
            <input type = "submit" id= "submit-inscri" @click="inscription" name = 'submit' value = "Inscription">

        </div>

        <div class = "verif-inscri">{{message}}</div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                prenom : "",
                nom : "",
                telephone : "",
                email : "",
                password : "",
                message : "",
            }
        },
        methods : {

            inscription(){
                this.http.post('http://localhost:8010/inscription', {
                    prenom : this.prenom,
                    nom : this.nom,
                    telephone : this.telephone,
                    email : this.email,
                    mdp : this.password
                })
                .then(response => { //console.log(response.data)
                    if(response.data.res === false){
                        this.message = "L'utilisateur existe déjà"
                    }else if (response.data.res === true){
                        this.message = "L'utilisateur a été enregistré"
                        
                    }
                    })
                .then(()=> {setTimeout(()=>{this.$router.push('/admin')}, 3000)})
        },  
            /*checkpass(){
                let pass1 = this.password
                let pass2 = this.password2
                if (pass1 == pass2) {
                    submit.disabled = false;
                }
            }*/
            }
    }
    
</script>

<style scoped>

</style>