<template>
    <nav>
        <ul>
            <li>Actualité</li>
            <li>Prendre un rendez-vous</li>
            <li>E-Boutiques</li>
            <li>Connexion</li>
        </ul> 
    </nav>    
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },

})
</script>

<style scoped>
nav ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>