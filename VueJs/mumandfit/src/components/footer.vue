<template>
    <div id = 'footer'>
        <div class = "mention">
            <h1>blavl</h1>
        </div>
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
a {
    transition: 0.4s;
    
}
a:hover {
    transform: scale(1.1);
}
.mention {
    display: flex;
    justify-content: center;
}
#resSociaux{
    grid-column: 3/4;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 20px;
    margin-right: 20px;
}
#resSociaux>a:hover{
    cursor: pointer; 
}

</style>