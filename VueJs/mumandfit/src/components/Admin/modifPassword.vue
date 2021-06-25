<template>
    <div class = "modifPassword">
        <h1>Nouveau mot de passe</h1>
        <div id="password1"><input type="password" class ="inputFormPass" v-model="mdp"></div>

        <div class="buttonChange">
            <div id= "submitPassChange"><input type = "submit" class ="Button1"  @click="changePass" value = "Changer le mot de passe" name = 'submit'></div>
            <router-link to = "/admin" ><input type ="submit" value = "Retour" class = "Button1" ></router-link>
        </div>
        
    </div>
</template>

<script>
    export default {
        name : 'changePassword',
        data : function() {
            return{
                email : this.$session.get('email'),
                mdp : ''
            }
        },
        methods : {
            changePass(){
                this.http.post('http://localhost:8010/changePass', {
                    email : this.email,
                    mdp : this.mdp
                })
                .then(response=>{console.log(response.data)})
                .then(()=> this.$router.push("/admin"))
                    
                
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