<template>
    <div id = 'header'>
        <div id = 'logo'>
        </div>
        <div id = 'titre'>
            <h1>Mum&Fit</h1>
        </div>
        <Navbar />
    </div>
</template>

<script>
    import Navbar from '@/components/navbar.vue'
    export default {
    components : {
        Navbar,
    }    
    }


</script>

<style scoped>
#header {
    background-color: #fdaf93;
    padding:  0;
    margin : 0;
    font-size: 15px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    box-shadow: 0 2px 5px black;
}

h1 {
    margin : 20px;
}

#logo {
    grid-area: 1 / 1 / 2 / 2;
    transition: 0.4s; 
}

#logo:hover {
    cursor: pointer;
    transform: scale(1.2);
}

#titre {
    grid-area: 1 / 3 / 2 / 4;
    transition: 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
}
#titre:hover {
    cursor: pointer;
    transform: scale(1.1);
}
nav {
    grid-area: 2 / 1 / 3 / 6;
    
}
</style>