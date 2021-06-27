<template>
    <div id ="changeAdmin">
        <div class = "titre">
            <h1> Modification de vos coordonnées </h1>
        </div>

        <div id = "prenom"><h3>Prénom</h3></div>
        <input type= "text" v-model="prenom" class = "inputForm">

        <div id = "nom"><h3>Nom</h3></div>
        <input type= "text" v-model="nom" class = "inputForm">

        <div id = "email"><h3>Email</h3></div>
        <input type= "text" v-model="email" class = "inputForm">

        <div id = "passContact"><h3>Modification du mot de passe de la boîte mail de contact</h3></div>
        <div class = "liensAdmin"><router-link to="/modifPass"><button class = "Button1">Modifier</button></router-link></div>

        <div id = "phone"><h3>Téléphone</h3></div>
        <input type= "text" v-model="phone" class = "inputForm">

        <div id = "adresse"><h3>Adresse</h3></div>
        <input type= "text" v-model="adresse" class = "inputForm">

        <div id = "titreLienCarte"><h3>Modification de la cible de la carte Google Map</h3> </div>
        <div id="lienCarte"><router-link to="/modifPass"><button class = "Button1">Modifier</button></router-link></div>
        
        <input type = "submit" id="updateAdmin" value="Enregistrer" class = "Button1" @click="changeAdmin">
        <router-link to = "/admin" ><input type ="submit" value = "Retour" class = "Button1" ></router-link>

    </div>
</template>

<script>

    export default {
        name : "changeAdmin",
        data() {
            return {
                prenom : this.prenom,
                nom : this.nom,
                email : this.email,
                phone : this.phone,
                adresse : this.adresse,
                lienCarte : '',
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
            changeAdmin() {
                this.http.post('//localhost:8010/updateAdmin', {
                    prenom : this.prenom,
                    nom : this.nom,
                    email : this.email,
                    phone : this.phone,
                    adresse : this.adresse
                })
            }
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
</style>