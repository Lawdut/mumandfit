<template>
    <div>
        <div id ="connexion">
            <h1>Connexion</h1>
            <div id = "email"><input type = "email" class ="inputForm"  placeholder="exemple@exemple.com" v-model="email"></div>
            <div id = "password"><input type = "password" class ="inputForm"  placeholder="Mot de passe" v-model="password"></div>
            <div id= "submitConnex"><input type = "submit" class ="Button1"  @click="connexion();" value = "Connexion" name = 'submit'></div>
        </div>
        <!--<div id = "inscription">
            <h1> Nouveau Client ?</h1>
            <button id= "submit2" ><router-link to = "/inscription">Inscription</router-link></button>
        </div>-->
    </div>
</template>

<script>

    export default {
    

        data : function() {
            return {
                email : "",
                password : "",
                token : this.$store.state.token
             }
        },

        methods : {

            connexion () {
                let self = this;
                window.grecaptcha.ready(function(){
                    window.grecaptcha.execute("6LeJiycbAAAAAKiNDgZRDkzPXsObmQjM1hOgtYmk", {
                        action : "submit"
                    })
                .then(function(token){
                    if(self.email != "" && self.password !=""){
                    const mail = self.email;
                    const passwd = self.password;
                    self.$store.dispatch('connexionStore', {mail, passwd, token})
                    .then(()=> self.$router.push("/admin"))
                }

                })
                
                })
            },
            

            /*connexion : function(){
                this.http.post('http://localhost:8010/connexion', {
                    email : this.email,
                    password : this.password,
                })
                .then(response=>{
                    console.log(response.data),
                    window.localStorage.setItem('token', response.data);
                    document.location.reload();
                    this.http.defaults.headers.common["Autorization"] = response.data;
                })
            },*/

            /*sessions(){
                var self = this; //obliger de faire self car variable this : 'undefined'
                self.$session.start();
                self.$session.set('nom', this.nom);
                console.log(self.$session.getAll())
            },*/
    }
        }
    
</script>

<style scoped>
#connexion{
    display: grid;
    grid-template-rows: repeat(3 , 1fr);
}
#email{
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputForm{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        --border : 1px solid #ccc;
        border: var(--border);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
</style>
