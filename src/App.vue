<script setup>
import { ref } from 'vue'


import StartPage1 from './views/StartPage_1.vue'
import StartPage2 from './views/StartPage_2.vue'
import Order from './views/Order.vue'
import Success from './views/Success.vue'
import Register from './views/Register.vue'

import Cart1 from '@/components/Cart_1.vue'
import Cart2 from '@/components/Cart_2.vue'

const step = ref('start')

const props = defineProps({
    variant: {
        type: Number,
        default: 1
    }
})

</script>

<template>
    <StartPage2 v-if="2 == variant && 'start' == step" @complited="(n) => step = n" />

    <div class="mb-lg-128 mb-md-56 mb-48 mt-md-56 mt-48" v-else>
        <div class="container">
            <div class="cal-layout">
                <div class="calc-layout__main">
                    <StartPage1 v-if="'start' == step" />
                    <Order v-else-if="'order' == step" @complited="(n) => step = n" />
                    <Success v-else-if="'success' == step" />
                    <Register v-else-if="'register' == step" />
                </div>
                <div class="calc-layout__aside">
                    <Cart1 v-if="1 == variant">
                        <template v-slot:action v-if="'start' == step">
                            <button class="button button--small" @click="step = 'order'">
                                <span class="button__text">Далее</span>
                            </button>
                        </template>
                    </Cart1>
                    <Cart2 v-else />
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
.cal-layout {
    display: grid;
    gap: 100px;
    grid-template-columns: repeat(2, 1fr);
}
</style>
