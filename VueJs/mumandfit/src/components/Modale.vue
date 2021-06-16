<template>
    <div class="modale">

        <div class="overlay" v-if="toggleModale" @click="toggleModale"></div>

        <div class ="modaleCard" v-if="toggleModale">
            <div class = "titreModale" v-if="supprimer === true"><p>Voulez-vous confirmer la <strong>suppression</strong> ?</p></div>
            <div class = "titreModale" v-else-if="modifier === true"><p>Voulez-vous confirmer la <strong>modification</strong> ?</p></div>
            <div class = "ebookGuid" v-if="guid && supprimer === true">
                <p>Copier ce GUID pour supprimer l'ebook de snipcart <strong>UNIQUEMENT</strong> si personne ne l'a déja acheté </p>
                <p>{{guid}}</p>
            </div>
            <div id = "buttonModale">
                <input type = 'submit' v-if="supprimer === true && token" @click="deleted" value="Supprimer" class = "Button1 save">
                <input type = 'submit' v-else-if="modifier === true && token" @click="save" value="Modifier" class = "Button1 save">
                <input type = 'submit' @click="toggleModale" value="Annuler" class = "Button1 save" v-if="token">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modale",
        data : function(){
            return{
                token : this.$store.state.token
            }
        },
        props: ['deleted','save', 'revele', 'toggleModale', 'guid', 'supprimer', 'modifier']
    }
</script>

<style scoped>
.modale{
    position: fixed;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
}

.modaleCard{
    background: white;
    z-index: 100000000000000;
    box-shadow: 1px 1px 10px 3px #2c3e50;
    border-radius: 20px;
    padding: 50px;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
}
.titreModale{
    grid-row: 1/2;
}
.ebookGuid{
    grid-row: 2/3;
}
#buttonModale{
    grid-row: 3/4;
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 20px;
    align-items: center;
}
</style>