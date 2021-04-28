<template>
    <nav>
        <ul>
            <li>Actualité</li>
            <li>Réservation</li>
            <li>E-Boutiques</li>
            <li>Connexion</li>
        </ul> 
    </nav>    
</template>

<script>

export default ({})
</script>

<style scoped>

ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding : 0 200px 0 200px ;
  margin : 10px;
  font-size: 25px;
}

li {
    transition: 0.4s;
    border-bottom: 1px solid #2c3e50;;
}

li:hover {
    transform: scale(1.1);
    cursor: pointer;
}

</style>