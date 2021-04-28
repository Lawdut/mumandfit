<template>
    <div id = 'footer'>
        <div id ="resSociaux">
            <a href = '#'>
                <img src = '../assets/logoResSociaux/facebook.svg' height="40px">
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/instagram.svg' height="40px">
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/youtube.svg' height="40px">
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/mail.svg' height="40px">
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/location.svg' height="40px">
            </a>
        </div>
    </div>
</template>

<script>

    export default {
        
    }
</script>

<style scoped>
#footer {
    background-color: #fdaf93;
    height: 100px;
    bottom: 0;
}
#resSociaux{
    display: flex;
    flex-direction: row;  
    justify-content: center; 
    align-items: center;
    box-shadow: 0 -2px 5px black;
    height:100% ;
    width: 100%;
    column-gap: 50px;
    margin :0;
    padding : 0;
}
a {
    display : flex;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
    margin:0;
    padding: 0;
}
a:hover {
    transform: scale(1.1);
}

#resSociaux>a:hover{
    cursor: pointer; 
}

</style>