<template>
    <div class = "contact">
        <div class = "titreContact">
            <h1>Page de Contact</h1>
        </div>
        
        <div class ="formContact">
            <h3 class = "formTitre">Laissez-nous vos coordonnées</h3>
            <div id ="firstName"><input type ="text" class = "inputForm" name="firstName" v-model="firstName" placeholder="Prénom" required></div>
            <div id = "lastName"><input type ="text" class = "inputForm"  name="lastName" v-model="lastName" placeholder="Nom" required></div>
            <div id = "email"><input type ="mail" class = "inputForm" name="email" v-model="mail" placeholder="exemple@exemple.com" required></div>
            <div id = "phone"><input type ="tel" class = "inputForm" name="phone" v-model="phone" placeholder="0102030405" required></div>
            <div id = "message"> <textarea id="textArea" name="message" v-model="message" placeholder="Votre message ici (optionnel)"></textarea></div>
            <div id="submitForm"><input type = "submit"></div>
        </div>
        
        <div class = "geoLoc">
            <h3>Où nous trouver ?</h3>
        </div>

        <div class = "reseauxSociaux">
            <h3>Res</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name : "contact",

        data : function() {
            return {
                firstName : '',
                lastName : '',
                email : '',
                phone : '',
                message : '',
            }
        }
    }
</script>

<style scoped>
    .contact{
        display: grid;
        grid-template-rows: repeat(10, 1fr);
    }
    .titreContact{
        grid-row: 1/2;
        border-bottom : solid black 1px;
    }
    .formContact{
        grid-row: 2/6;
        border-bottom : solid black 1px;
        display: grid;
        grid-template-columns: repeat(2, 1fr) ;
        grid-template-rows: repeat(5, 1fr);
        column-gap: 30px;
        
    }
    .formTitre{
        grid-column: 1/3;
        grid-row: 1/2;
    }
    #firstName{
        grid-column: 1/2;
        grid-row: 2/3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #lastName{
        grid-column: 1/2;
        grid-row: 3/4;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #email{
        grid-column: 2/3;
        grid-row: 2/3;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    #phone{
        grid-column: 2/3;
        grid-row: 3/4;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #message{
        grid-column: 1/3;
        grid-row: 4/5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #submitForm{
        grid-column: 1/3;
        grid-row: 5/6;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #textArea{
        width: 75%;
        height: 100%;
    }
    .geoLoc{
        grid-row: 6/10;
        border-bottom : solid black 1px;
    }
    .inputForm{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .reseauxSociaux{
        grid-row: 10/11;
        
    }
</style>