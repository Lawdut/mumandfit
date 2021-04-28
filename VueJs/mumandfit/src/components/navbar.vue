<template>
    <nav>
        <ul>
            <li>Actualité</li>
            <li>Réservation</li>
            <li>E-Boutiques</li>
            <li><img src = '../assets/logoResSociaux/user.svg' height="40px"></li>
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
  font-size: 20px;
}

li {
    transition: 0.4s;
    border-bottom: 1px solid black;
    color: black;
}

li:hover {
    transform: scale(1.1);
    cursor: pointer;
}

</style>