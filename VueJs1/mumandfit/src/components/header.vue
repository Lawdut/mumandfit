<template>
    <div id = 'header'>
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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    box-shadow: 0 2px 5px black;
    height: 100px;
}

h1 {
    margin : 20px;
}


#titre {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
#titre:hover {
    cursor: pointer;
}
nav {
    grid-area: 1 / 2 / 2 / 3;
}


</style>