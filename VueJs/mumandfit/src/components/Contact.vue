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
            <h3>Où nous trouver ?</h3>
            <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2728.510486659392!2d6.208440751355216!3d46.85332554759804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478da6f5acf0b82b%3A0xe64db311e5375f7e!2sChemin%20Entre%20Deux%20Ponts%2C%2025560%20Bouverans!5e0!3m2!1sfr!2sfr!4v1623230288955!5m2!1sfr!2sfr" 
                width="100%" height="75%" 
                style="border:0;" allowfullscreen="" 
                loading="lazy">
            </iframe>
            <p>Korinne Lancette - chemin entre 2 Ponts 25560 Bouverans - 06.31.75.20.17 - mumuandfit@gmail.com</p>
            
        </div>

        <div class = "reseauxSociaux">
            <h3>Réseaux sociaux</h3>
            <div class= "logoRes">
            <div id = "facebook"><a href="https://www.facebook.com/korinne.lancette"><img src ="../assets/logoResSociaux/facebook.svg" width="40px"></a></div>
            <div id = "instagram"><a href="https://www.instagram.com/kokofit25/?hl=fr"><img src ="../assets/logoResSociaux/instagram.svg" width="40px"></a></div>
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
                validate : ''             
            }
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
            },
            borderPhoneChange : function() {
                this.borderPhone = "1px solid #ccc"
            },
            verifyPattern : function() {
                console.log('hello')
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
        grid-template-rows: repeat(6, 1fr);
        column-gap: 30px;
        padding-bottom: 10px;
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
        width: 50%;
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
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderFirstName : 1px solid #ccc;
        border: var(--borderFirstName);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #inputFormLastName{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderLastName : 1px solid #ccc;
        border: var(--borderLastName);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #inputFormEmail{
        width: 50%;
        padding: 12px 20px;
        margin: 8px 0;
        --borderEmail : 1px solid #ccc;
        border: var(--borderEmail);
        display: inline-block;
        border-radius: 4px;
        box-sizing: border-box;
    }
    #inputFormPhone{
        width: 50%;
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

    @media (max-width : 1200px){
        .formContact > input {
            width: 75%;
        };
    }
    @media (max-width: 650px){
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