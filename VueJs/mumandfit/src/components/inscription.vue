<template>
    <div id="inscription">
        <div class = "titreInsc">
            <h1> INSCRIPTION </h1>
        </div>

        
            <div id = "titre-prenom"><label for="first_name"><h2>Prénom</h2></label></div>
            <input type="text" name="prenom" class = "input prenom-inscri" v-model = "prenom">
        
        
            <div id = "titre-nom"><label for="last_name"><h2>Nom</h2></label></div>
            <input type="text" name="last_name" class = "input nom-inscri" v-model = "nom">
        
        
            <div id = "titre-telephone"><label for="phone_number"><h2>Numéro de téléphone</h2></label></div>
            <input type="tel" name="telephone" class = "input phone-inscri" placeholder="0102030405" v-model = "telephone" v-on:Focus="this.value='';" pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$" >
                
        
            <div id = "titre-email-inscri"><label for="mail"><h2>Email</h2></label></div>
            <input type="email" name="mail" placeholder="courriel@exemple.com" v-on:Focus="this.value='';" class="input email-inscri" v-model = "email">

            <div class = "titre-password-inscri"><label for="password"><h2>Mot de passe</h2></label></div>
            <input type="password" name="password" id="password1"  class="input passwd-inscri" v-model = "password">
        
        
            <div class = "titre-passwd2-inscri"><label for = "password2"> <h2>Confirmation du mot de passe</h2></label></div>
            <input type="password" name="password2" id="password2"  class="input password2-inscri">

            <div class = "pass-verif-inscri"></div>
        
            <input type = "submit" id= "submit-inscri" @click="inscription()" name = 'submit' value = "Connexion">

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
                .then(response => console.log(response.data))
            },

            /*sessions(){
                var self = this; //obliger de faire self car variable this : 'undefined'
                self.$session.start();
                self.$session.set('nom', this.nom);
                console.log(self.$session.getAll());
        },  */ 
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