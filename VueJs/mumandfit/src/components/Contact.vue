<template>
    <div class = "contact">
        <div class = "titreContact">
            <h1>Page de Contact</h1>
        </div>
        
        <div class ="formContact">
            <h3 class = "formTitre">Laissez-nous vos coordonnées</h3>
            <div class="error" v-show="error !=''">{{error}}</div>
            <div class="validate" v-show="validate !=''">{{validate}}</div>
            <div id ="firstName"><input type ="text" id = "inputFormFirstName" name="firstName" @focus="borderFirstNameChange" v-bind:style="`--borderFirstName : ${computedBorderFirstName}`" v-model="firstName" placeholder="Prénom" required></div>
            <div id = "lastName"><input type ="text" id = "inputFormLastName"  name="lastName" @focus="borderLastNameChange" v-bind:style="`--borderLastName : ${computedBorderLastName}`" v-model="lastName" placeholder="Nom" required></div>
            <div id = "email"><input type ="mail" id = "inputFormEmail" name="email" @focus="borderEmailChange" v-bind:style="`--borderEmail : ${computedBorderEmail}`" v-model="mail" placeholder="exemple@exemple.com" required></div>
            <div id = "phone"><input type ="tel" id = "inputFormPhone" name="phone" @focus="borderPhoneChange" v-bind:style="`--borderPhone : ${computedBorderPhone}`" v-model="phone" placeholder="0102030405" required></div>
            <div id = "message"> <textarea id="textArea" name="message" v-model="message" placeholder="Votre message ici (optionnel)"></textarea></div>
            <div id="submitForm"><button id = "send" class = "Button1" name = "send" @click ="sendMessage">Envoyer</button></div>
        </div>
        
        <div class = "geoLoc">
            <h3 class = "geoLocTitre">Où nous trouver ?</h3>
            <iframe v-bind:src="`${this.mumAndFit.lienCarte}`" 
                width="100%" height="75%" 
                style="border:0;" allowfullscreen="" 
                loading="lazy">
            </iframe>
            <p>{{this.mumAndFit.prenom}} {{this.mumAndFit.nom}} - {{this.mumAndFit.adresse}} - {{this.mumAndFit.phone}} - {{this.mumAndFit.email}}</p>
            
        </div>

        <div class = "reseauxSociaux">
            <h3>Réseaux sociaux</h3>
            <div class= "logoRes">
            <div class= "logoReseau" id = "facebook"><a href="https://www.facebook.com/korinne.lancette"><img src ="../assets/logoResSociaux/facebook.svg" width="40px"></a></div>
            <div class= "logoReseau" id = "instagram"><a href="https://www.instagram.com/kokofit25/?hl=fr"><img src ="../assets/logoResSociaux/instagram.svg" width="40px"></a></div>
            <div class= "logoReseau" id = "youtube"><a href="https://www.instagram.com/kokofit25/?hl=fr"><img src ="../assets/logoResSociaux/youtube.svg" width="40px"></a></div>
            </div>
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
                mail : '',
                phone : '',
                message : '',
                borderFirstName : '',
                borderLastName : '',   
                borderEmail : '',
                borderPhone : '',
                error : '', 
                validate : '',
                mumAndFit : {
                    prenom : '',
                    nom : '',
                    adresse : '',
                    phone : '',
                    email : '',
                    lienCarte : '',
                }             
            }
        },
        beforeMount () {
            this.http.post('//localhost:8010/getMumAndFit')
            .then (response=>{
                this.mumAndFit.prenom = response.data[0].prenom,
                this.mumAndFit.nom = response.data[0].nom,
                this.mumAndFit.adresse = response.data[0].adresse,
                this.mumAndFit.phone = response.data[0].phone,
                this.mumAndFit.email = response.data[0].email,
                this.mumAndFit.lienCarte = response.data[0].lienCarte
            })
        },
        computed: {
            computedBorderFirstName: function () {
            return this.borderFirstName;
            },
            computedBorderLastName: function () {
            return this.borderLastName;
            },
            computedBorderEmail: function () {
            return this.borderEmail;
            },
            computedBorderPhone: function () {
            return this.borderPhone;
            },
            /*computedError : function() {
                return this.error
            }*/
        },
        methods : {
            sendMessage : function(){
                let self = this;
                window.grecaptcha.ready(function(){
                    window.grecaptcha.execute("6LeJiycbAAAAAKiNDgZRDkzPXsObmQjM1hOgtYmk", {
                        action : "submit"
                    })
                    .then(function(token) {
                        let userMessage = {
                            firstName : self.firstName,
                            lastName : self.lastName,
                            mail : self.mail,
                            phone : self.phone,
                            message : self.message,
                            token : token,
                        }
                        const regexTelM = new RegExp(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
                        const regexTelOM = new RegExp(/^(?:(?:\+|00|0)((262|692)|(263|693)|508|(5|6)90|(5|6)94|(5|6|7)96|681|687|689))(?:[\s.-]*\d{2}){3,4}$/)
                        const mailAdress = new RegExp(/^([\w-.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)
                        if(self.firstName != '' && self.lastName != '' && self.mail != '' && self.phone != '' && self.mail.match(mailAdress) && (self.phone.match(regexTelM) || self.phone.match(regexTelOM))){
                            self.http.post("//localhost:8010/formContact", userMessage)
                            .then(()=> { self.error = '' })                        
                            .then(() => { self.validate='Votre message a bien été envoyé. Vous allez être redirigé vers l\'accueil'})
                            .then(()=> {setTimeout(()=>{self.$router.push('/')}, 4000)})
                        }if(self.firstName == ''){
                            self.borderFirstName = "2px solid red"
                            self.error = "Le champs prénom est vide"
                        }if(self.lastName == ''){
                            self.borderLastName = "2px solid red"
                            self.error = "Le champs nom est vide"
                        }if(self.mail == '' || !self.mail.match(mailAdress)){
                            self.borderEmail = "2px solid red"
                            self.error = "Veuillez vérifier le format de l'adresse mail"
                        }if(self.phone == '' || (!self.phone.match(regexTelM) || self.phone.match(regexTelOM))){
                            self.borderPhone = "2px solid red"
                            self.error = "Veuillez vérifier le format du numéro de téléphone"
                        }if(!self.mail.match(mailAdress) && (!self.phone.match(regexTelM) || self.phone.match(regexTelOM))){
                            self.error = "Veuillez vérifier le format du numéro de téléphone et de l'adresse mail"
                        }
                    })
                })
            },
            borderFirstNameChange : function() {
                this.borderFirstName = "1px solid #ccc"
            },
            borderLastNameChange : function() {
                this.borderLastName = "1px solid #ccc"
            },
            borderEmailChange : function() {
                this.borderEmail = "1px solid #ccc"
                this.error=""
            },
            borderPhoneChange : function() {
                this.borderPhone = "1px solid #ccc"
                this.error=""
            },
            verifyPattern : function() {
                console.log('hello')
            }
        }
    }
</script>

<style scoped>
    .contact{
        justify-content: center;
        display: grid;
        grid-template-rows: repeat(10, 1fr); 
    }
    .logoReseau{
        cursor: pointer;
    }
    .titreContact{
        grid-row: 1/2;
        background-color: #ec7463;
        box-shadow: 1px 1px 10px 3px #2c3e50;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 10px 10px;
        font-size: 15px;
        
    }
    .formContact{
        grid-row: 2/6;
        border-bottom : solid black 1px;
        display: grid;
        grid-template-columns: repeat(2, 1fr) ;
        grid-template-rows: repeat(6, 1fr);
        column-gap: 30px;
        padding-bottom: 10px;
    }
    .formTitre{
        grid-column: 1/3;
        grid-row: 1/2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #firstName{
        grid-column: 1/2;
        grid-row: 2/3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #lastName{
        grid-column: 2/3;
        grid-row: 2/3;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    #email{
        grid-column: 1/2;
        grid-row: 3/4;
        display: flex;
        justify-content: flex-end;
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
    .error{
        color: red;
        grid-column: 1/3;
        grid-row: 5/6;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .validate{
        color: green;
        grid-column: 1/3;
        grid-row: 5/6;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    #submitForm{
        grid-column: 1/3;
        grid-row: 6/7;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #textArea{
        width: 100%;
        height: 100%;
    }
    .geoLoc{
        grid-row: 6/10;
        border-bottom : solid black 1px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #inputFormFirstName{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderFirstName : 1px solid #ccc;
        border: var(--borderFirstName);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #inputFormLastName{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderLastName : 1px solid #ccc;
        border: var(--borderLastName);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #inputFormEmail{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderEmail : 1px solid #ccc;
        border: var(--borderEmail);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #inputFormPhone{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderPhone : 1px solid #ccc;
        border: var(--borderPhone);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .reseauxSociaux{
        grid-row: 10/11;
    }
    .logoRes{
     display: flex;
     justify-content: center;
     align-items: center;
     column-gap: 30px;
    }
    textarea{
        border : 1px solid #ccc;
        margin-top : 25px;
        border-radius: 5px;
    }

    @media (max-width : 1400px){
        .formContact > input {
            width: 75%;
        }
        .titreContact{
        box-shadow: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        font-size: 15px;
        background-color: white;
        border-bottom : solid black 1px;
        }
    }
    @media (max-width: 850px){
        #inputFormFirstName{
            width: 90%;
            
        }
        #inputFormLastName{
            width: 90%;
        }
        #inputFormEmail{
            width: 90%;
        }
        #inputFormPhone{
            width: 90%;
        }
        .error{
            font-size: 12px;
        }
        #textArea{
            margin-top : 10px;
            width: 90%;
        }
    }
</style>