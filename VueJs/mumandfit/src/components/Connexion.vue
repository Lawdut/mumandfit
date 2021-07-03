<template>
    <div>
        <div id ="connexion">
            <h1>Connexion</h1>
            <div id = "email"><input type = "email" class ="inputForm"  placeholder="exemple@exemple.com" v-model="email" @focus="borderChange" v-bind:style="`--border : ${computedBorder}`"></div>
            <div id = "password"><input type = "password" class ="inputFormPass"  placeholder="Mot de passe" v-model="password"></div>
            <div class="error" v-show="error !=''">{{error}}</div>
            <div id= "submitConnex"><input type = "submit" class ="Button1"  @click="connexion()" value = "Connexion" name = 'submit'></div>
        </div>
    </div>
</template>

<script>

    export default {
    

        data : function() {
            return {
                email : "",
                password : "",
                token : this.$store.state.token,
                error : "",
                border : "",
             }
        },
        computed : {
            computedBorder : function() {
                return this.border;
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
                    const mailAdress = new RegExp(/^([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)
                    if(self.email != "" && self.password !="" && self.email.match(mailAdress)){
                    const mail = self.email;
                    const passwd = self.password;
                    self.$store.dispatch('connexionStore', {mail, passwd, token})
                    .then(()=> self.$router.push("/admin"))
                    }if(!self.email.match(mailAdress)){
                        self.border = "2px solid red"
                        self.error = "Veuillez vérifier le format de l'adresse mail"
                    }

                })
                
                })
            },
            borderChange : function() {
                this.border = "1px solid #ccc"
            },
            
    }
        }
    
</script>

<style scoped>
#connexion{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
}
#email{
    display: flex;
    justify-content: center;
    align-items: center;
}
.inputForm{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        --border : 1px solid #ccc;
        border: var(--border);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
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
.error{
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        margin-bottom: 20px;
    }
</style>
