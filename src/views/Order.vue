<script setup>
import { ref, watch, defineEmits } from 'vue'
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

import PhoneConfirm from '@/components/PhoneConfirm.vue'
import Organization from '@/components/Organization.vue'
import NumberInput from '@/components/NumberInput.vue'

const main = useCalcStore();

const emit = defineEmits(['complited'])

const {
    cashboxCount,
    monthSelected,
    fiscalStorage,
    tariffName
} = storeToRefs(main)

const phoneConfirmed = ref(false)
const contactsFilled = ref(false)
const billMode = ref(false)

const contacts = ref({
    name: '',
    address: '',
    inn: '',
    kpp: '',
    email: ''
})

watch(contacts, () => {
    contactsFilled.value = 
        '' != contacts.value.name
        && '' != contacts.value.address
        && contacts.value.inn.match(/[0-9]{10,12}/)
        && contacts.value.kpp.match(/[0-9]{9}/)
        && contacts.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}, { deep: true })

function payOnline() {
    billMode.value = false

    emit('complited', 'success')
}
function payBillDownload() {
    emit('complited', 'register')
}
function payBillEmail() {
    emit('complited', 'register')
}
</script>


<template>
    <h3>Оформление кассы</h3>

    <PhoneConfirm v-model="phoneConfirmed" />

    <template v-if="phoneConfirmed">

        <div class="grid-action mt-40">
            <p>Онлайн-касса Тариф &laquo;{{ tariffName }}&raquo; {{ monthSelected }} мес + фискальный накопитель 1.2 на {{ fiscalStorage }} мес</p>
            <NumberInput v-model="cashboxCount" />
        </div>
        
        <Organization v-model="contacts" />

        <div class="btn-group mt-40">
            <button class="btn btn--pay" :disabled="!contactsFilled" @click="payOnline">Оплатить картой</button>
            <button class="btn btn--dark" :disabled="!contactsFilled" @click="billMode = true">Выставить счёт</button>
        </div>
        <div class="btn-group mt-40" v-if="billMode">
            <button class="btn btn--dark" :disabled="!contactsFilled" @click="payBillDownload">Скачать</button>
            <button class="btn btn--dark" :disabled="!contactsFilled" @click="payBillEmail">Отправить на e-mail</button>
        </div>
    </template>
</template>