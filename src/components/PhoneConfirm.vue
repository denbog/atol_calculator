<script setup>
import { ref, watch, defineModel } from 'vue'
import { vMaska } from 'maska'
import tingle from 'tingle.js'

const modal = new tingle.modal({
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['tingle-confirm']
})
modal.setContent('<div id="phone-confirm"></div>')

let confirmeCode = '1111'

const confirmed = defineModel()

const phone = ref('')
const confirmValues = ref(['', '', '', ''])
const modalOpened = ref(false)

watch(confirmValues, () => {
    if (confirmeCode == confirmValues.value.join('')) {
        confirmed.value = true
        modal.close()
    }
}, { deep: true })

function restart() {
    modal.close()

    phone.value = ''
    confirmed.value = false
    confirmValues.value = ['', '', '', '']
}
function startConfirm() {
    modal.open()
}
</script>

<template>
    <div>
        <label>Введите Ваш номер телефона</label>
        <input v-maska data-maska="+7 ### ### ## ##" placeholder="+7" v-model="phone" :disabled="confirmed" />


        <button class="button button--small" @click="restart" v-if="confirmed">
            <span class="button__text">Изменить номер телефона</span>
        </button>
        <button class="button button--small" @click="startConfirm" v-else>
            <span class="button__text">Получить код подтверждения</span>
        </button>
    </div>

    <Teleport to="#phone-confirm">
            <h3>Код из смс</h3>
            <div>
                <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[0]">
                <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[1]">
                <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[2]">
                <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[3]">
            </div>
            
            <p>Отправить код повторно (1:29)</p>
            <p><button @click="restart">Указать другой номер</button></p>
    </Teleport>
</template>