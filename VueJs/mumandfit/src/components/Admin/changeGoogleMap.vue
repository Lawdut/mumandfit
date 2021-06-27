<template>
    <div id ="changeMap">
        <div class = "titre">
            <h1> Modification de la cible de Google Map </h1>
        </div>
        <div id="changeMapCorps">
            <p>1 - Se rendre sur <a href = "https://www.google.fr/maps">Google Map</a> et rentrez votre adresse</p>
            <p>2 - Ajustez le zoom à votre convenance et cliquez sur l'icône "Partager"</p>
            <p>3 - Dans la fenêtre modale qui apparaît, cliquez sur l'onglet "Intégrer une carte"</p>
            <p>4 - Cliquez sur "copier le contenu HTML"</p>
            <p>5 - Collez-le ci-dessous en suivant l'exemple</p>
            <p><input class="inputForm" type = "text" v-model="lienCarte"></p>
            <p><strong>ATTENTION</strong>, veuillez ne conserver <strong>que</strong> la partie qui se trouve entre les guillemets et qui commence par "https://www.google.com/maps/embed?pb=[...]"</p>

            <div id="buttonChangeMap">
                <input type = 'submit' @click="toggleModale('save')" value="Enregistrer les modifications" class = "Button1 save">
                <input @click="navigation" type ="submit" value = "Retour" class = "Button1 return">
            </div>
            <transition name="fade">
            <Modale :revele="revele" :toggleModale="toggleModale" :modifier="modifier" :save="save" v-if="revele"></Modale>
        </transition>
        </div>
    </div>
</template>

<script>
import Modale from '../Modale.vue';
    export default {
        name : "ChangeGoogleMap",
        components : {
            Modale,
        },
        data() {
            return{
                lienCarte : this.lienCarte,
                revele :false,
                modifier : false,
            }
        },

        beforeMount () {
            this.http.post('//localhost:8010/getMumAndFit')
            .then (response=>{
                this.lienCarte = response.data[0].lienCarte
            })
        },
        methods : {
            save() {
                this.http.post('//localhost:8010/updateGoogleMap', {
                    lienCarte : this.lienCarte
                })
                .then(()=>this.revele=false)
                .then(()=>this.$router.push('/admin'))
            },
            toggleModale : function(event){
                this.revele = !this.revele
                if(event === "save"){
                    this.modifier = true;
                }
            },

            navigation : function () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
#changeMapCorps{
    text-align: start;
}

#buttonChangeMap{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
}
</style>