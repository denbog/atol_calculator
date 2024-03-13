<script setup>
import { ref } from 'vue'

import StartPage from './views/StartPage_2.vue'
import Order from './views/Order.vue'
import Success from './views/Success.vue'

const step = ref(1)

</script>

<template>
    <StartPage v-if="1 == step" @complited="step++" />
    <Order v-else-if="2 == step" />
    <Success v-else-if="3 == step" />
</template>

<style scoped>

</style>
