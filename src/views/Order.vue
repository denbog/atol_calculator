<script setup>
import { ref } from 'vue'
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

import PhoneConfirm from '@/components/PhoneConfirm.vue'
import Organization from '@/components/Organization.vue'

const main = useCalcStore();

const {
    cashboxCount,
    monthSelected,
    fiscalStorage,
    tariffName
} = storeToRefs(main)

const phoneConfirmed = ref(false)
const contacts = ref({
    name: '',
    address: '',
    inn: '',
    kpp: '',
    email: ''
})

</script>


<template>
    <h3>Оформление кассы</h3>

    <PhoneConfirm v-model="phoneConfirmed" />

    <template v-if="phoneConfirmed">

        <p>Онлайн-касса Тариф &laquo;{{ tariffName }}&raquo; {{ monthSelected }} мес + фискальный накопитель 1.2 на {{ fiscalStorage }} мес</p>

        <div>
            <input type="number" min="1" max="100" v-model="cashboxCount">
        </div>
        
        <Organization v-model="contacts" />

        <div>
            <button class="button button--small" :disabled="!inn">
                <span class="button__text">Оплатить картой</span>
            </button>
            <button class="button button--small" :disabled="!inn">
                <span class="button__text">Выставить счёт</span>
            </button>
        </div>
    </template>
</template>