<template>
    <div id = 'footer'>
        <div id ="resSociaux">
            <a href = '#'>
                <img src = '../assets/logoResSociaux/facebook.png'>
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/instagram.png'>
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/youtube.png'>
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/mail.png'>
            </a>
            <a href = '#'>
                <img src = '../assets/logoResSociaux/location.png'>
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
}
#resSociaux{
    display: flex;
    flex-direction: row;  
    justify-content: space-around; 
    align-items: center;
    margin: auto;
    box-shadow: 0 0 5px black;
    height:100% ;
    width: 100%;
}
a {
    display : flex;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
}
a:hover {
    transform: scale(1.1);
}

#resSociaux>a:hover{
    cursor: pointer; 
}

</style>