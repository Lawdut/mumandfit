<template>
    <div>
        <div id ="connexion">
            <h1>Déjà client ?</h1>
            <input type = "email" class ="input" id = "email" placeholder="exemple@exemple.com" v-model ="email">
            <input type = "password" class ="input" id = "password" placeholder="Mot de passe" v-model ="password">
            <input type = "submit" class ="input" id= "submit1" @click="connexion(); sessions()" value = "Connexion" name = 'submit'>
        </div>
        <div id = "inscription">
            <h1> Nouveau Client ?</h1>
            <button id= "submit2" ><router-link to = "/inscription">Inscription</router-link></button>
        </div>
    </div>
</template>

<script>

    export default {
    

        data : function() {
            return {
                email : "",
                password : "",
            }
        },

        methods : {

            connexion : function(){
                this.http.post('http://localhost:8010/connexion', {
                    email : this.email,
                    password : this.password,
                })
                .then(response=>console.log(response.data))
            },

            sessions(){
                var self = this; //obliger de faire self car variable this : 'undefined'
                self.$session.start();
                self.$session.set('nom', this.nom);
                console.log(self.$session.getAll())
            },
    }
        }
    
</script>

<style scoped>

</style>