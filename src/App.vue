<script setup>
import { ref } from 'vue'


import StartPage1 from './views/StartPage_1.vue'
import StartPage2 from './views/StartPage_2.vue'
import Order from './views/Order.vue'
import Success from './views/Success.vue'

import Cart from '@/components/Cart.vue'

const step = ref(1)

const props = defineProps({
    variant: {
        type: Number,
        default: 1
    }
})

</script>

<template>
    <StartPage2 v-if="2 == variant && 1 == step" @complited="step++" />

    <div class="mb-lg-128 mb-md-56 mb-48" v-else>
        <div class="container">
            <StartPage1 v-if="1 == step" @complited="step++" />
            <Order v-else-if="2 == step" />
            <Success v-else-if="3 == step" />

            <Cart />
        </div>
    </div>
    
</template>

<style scoped>

</style>
