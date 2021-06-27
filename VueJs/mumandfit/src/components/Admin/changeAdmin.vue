<template>
    <div id ="changeAdmin">
        <div class = "titre">
            <h1> Modification de vos coordonnées </h1>
        </div>

        <div class = "titreChangeAdmin" id = "prenom"><h3>Prénom</h3></div>
        <input type= "text" v-model="prenom" class = "inputForm">

        <div class = "titreChangeAdmin" id = "nom"><h3>Nom</h3></div>
        <input type= "text" v-model="nom" class = "inputForm">

        <div class = "titreChangeAdmin" id = "email"><h3>Email</h3></div>
        <input type= "text" v-model="email" class = "inputForm">

        <div class = "titreChangeAdmin" id = "passContact"><h3>Modification du mot de passe de la boîte mail de contact</h3></div>
        <div class = "liensAdmin buttonChange"><router-link to="/modifPass"><button class = "Button1">Modifier</button></router-link></div>

        <div class = "titreChangeAdmin" id = "phone"><h3>Téléphone</h3></div>
        <input type= "text" v-model="phone" class = "inputForm">

        <div class = "titreChangeAdmin" id = "adresse"><h3>Adresse</h3></div>
        <input type= "text" v-model="adresse" class = "inputForm">

        <div class = "titreChangeAdmin" id = "titreLienCarte"><h3>Modification de la cible de la carte Google Map</h3> </div>
        <div id="lienCarte" class="buttonChange"><router-link to="/changeGoogleMap"><button class = "Button1">Modifier</button></router-link></div>
        
        <transition name="fade">
            <Modale :revele="revele" :toggleModale="toggleModale" :modifier="modifier" :save="save" v-if="revele"></Modale>
        </transition>

        <div id="buttonChangeAdmin">
            <input type = "submit" id="updateAdmin" value="Enregistrer les modifications" class = "Button1" @click="toggleModale('save')">
            <router-link to = "/admin" ><input type ="submit" value = "Retour" class = "Button1" ></router-link>
        </div>
        

    </div>
</template>

<script>
import Modale from '../Modale.vue';

    export default {
        name : "changeAdmin",
        components : {
            Modale,
        },
        data() {
            return {
                prenom : this.prenom,
                nom : this.nom,
                email : this.email,
                phone : this.phone,
                adresse : this.adresse,
                revele :false,
                modifier : false,
            }
        },
        beforeMount () {
            this.http.post('//localhost:8010/getMumAndFit')
            .then (response=>{
                this.prenom = response.data[0].prenom,
                this.nom = response.data[0].nom,
                this.adresse = response.data[0].adresse,
                this.phone = response.data[0].phone,
                this.email = response.data[0].email,
                this.lienCarte = response.data[0].lienCarte
            })
        },

        methods : {
            save() {
                this.http.post('//localhost:8010/updateAdmin', {
                    prenom : this.prenom,
                    nom : this.nom,
                    email : this.email,
                    phone : this.phone,
                    adresse : this.adresse
                })
                .then(()=>this.revele=false)
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
.titreChangeAdmin{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    
}
.buttonChange{
    margin:20px
}

.titreChangeAdmin>h3{
    margin-bottom : 5px;
}
#buttonChangeAdmin{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    margin-top: 50px;
}
</style>