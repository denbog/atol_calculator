<script setup>
import { ref, watch, computed, defineModel } from 'vue'
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
const ready = ref(false)
const resendTimer = ref(90)

const resendTimerDisplay = computed(() => {
    const minutes = Math.floor(resendTimer.value / 60)
    const seconds = resendTimer.value % 60

    return minutes.toString() + ':' + seconds.toString().padStart(2, '0')
})

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
    resendTimer.value = 90
}
function resend() {
    confirmed.value = false
    confirmValues.value = ['', '', '', '']
    resendTimer.value = 90

    resendCountdown()
}

function startConfirm() {
    modal.open()

    resendCountdown()
}

function onCodeInput() {
    const active = document.activeElement

    if (active && active.parentNode && active.parentNode.nextElementSibling) {
        active.parentNode.nextElementSibling.querySelector('input').select()
        active.parentNode.nextElementSibling.querySelector('input').focus()
    }
}

function resendCountdown() {
    resendTimer.value--

    if (0 < resendTimer.value) {
        setTimeout(() => {
            resendCountdown()
        }, 1000)
    }
}

const options = {
  onMaska: (detail) => ready.value = detail.completed
}
</script>

<template>
    <div class="input-field">
        <label>Введите Ваш номер телефона</label>
        <div class="input-field__action">
            <input v-maska:[options] data-maska="+7 ### ### ## ##" placeholder="+7" v-model="phone" :disabled="confirmed" />

            <div>
                <button class="btn btn--link" @click="restart" v-if="confirmed">Изменить номер телефона</button>
                <button class="btn btn--dark" @click="startConfirm" :disabled="!ready" v-else>Получить код</button>
            </div>
        </div>
    </div>
    

    <Teleport to="#phone-confirm">
        <div class="phone-confirm">
            <h3>Код из смс</h3>
            <div class="phone-confirm-inputs">
                <div class="input-field input-field--center">
                    <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[0]" @input="onCodeInput">
                </div>
                <div class="input-field input-field--center">
                    <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[1]" @input="onCodeInput">
                </div>
                <div class="input-field input-field--center">
                    <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[2]" @input="onCodeInput">
                </div>
                <div class="input-field input-field--center">
                    <input type="text" size="1" maxlength="1" pattern="[0-9]" v-model="confirmValues[3]" @input="onCodeInput">
                </div>
            </div>
            
            <p><button class="btn btn--link" @click="resend" :disabled="0 < resendTimer">Отправить код повторно<span v-if="0 < resendTimer"> ({{ resendTimerDisplay }})</span></button></p>
            <p><button class="btn btn--link" @click="restart">Указать другой номер</button></p>
        </div>
        
    </Teleport>
</template>

<style scoped lang="scss">
    .phone-confirm {
        display: grid;
        gap: 30px;

        h3 {
            font-size: 36px;
        }

        .phone-confirm-inputs {
            --clr-input: #f7f7f7;

            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
        }
    }
</style>