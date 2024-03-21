<script setup>
import { ref, defineModel, onMounted, onUnmounted } from 'vue'
import autoComplete from '@tarekraafat/autocomplete.js'

const DaDataSuggest = async (query) => {

    const type = query.match(/^[0-9]+/i) ? 'findById' : 'suggest'

    const resp = await fetch('http://suggestions.dadata.ru/suggestions/api/4_1/rs/'+type+'/party', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 4808f665f589bfae7380e2f522dff85fe8d80ef3'
        },
        body: JSON.stringify({
            query: query,
            status: ["ACTIVE"]
        })
    })

    const json = await resp.json()

    return json.suggestions
}

const search = ref(null)
const contacts = defineModel()

let autoCompleteJS = null
let suggestions = []

onMounted(() => {
    autoCompleteJS = new autoComplete({
        selector: () => {
            return search.value
        },
        debounce: 500,
        threshold: 2,
        searchEngine: 'loose',
        data: {
            src: async (query) => {
                if ('' === query) {
                    return []
                }

                try {
                    suggestions = await DaDataSuggest(query)
                    return suggestions.map((item) => item.value)
                } catch (error) {
                    return error
                }
            }
        },
        resultItem: {
            element: (item, data) => {
                const selection = suggestions.find((item) => data.value == item.value)

                //item.style = "display: flex; justify-content: space-between;"

                item.innerHTML = `
                <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                    ${data.match}
                </span>
                <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
                    ИНН ${selection.data.inn} КПП ${selection.data.kpp} ${selection.data.address.value} 
                </span>`
            },
            highlight: true
        }
    })

    autoCompleteJS.input.addEventListener('selection', function (event) {
        const selection = suggestions.find((item) => event.detail.selection.value == item.value)

        contacts.value.name = selection.value
        contacts.value.address = selection.data.address.value
        contacts.value.inn = selection.data.inn
        contacts.value.kpp = selection.data.kpp

        console.log(contacts)

        autoCompleteJS.input.blur()
        autoCompleteJS.input.value = selection.value
    })
})

onUnmounted(() => {
    autoCompleteJS.unInit()
})
</script>

<template>
    <div class="org-input-group mt-40" v-if="contacts.inn">
        <div class="input-field">
            <label>Введите ИНН</label>
            <input type="text" v-model="contacts.inn" />
        </div>
        <div class="input-field">
            <label>Введите КПП</label>
            <input type="text" v-model="contacts.kpp" />
        </div>
        <div class="input-field">
            <label>Организация</label>
            <input type="text" v-model="contacts.name" />
        </div>
        <div class="input-field">
            <label>Адрес организации</label>
            <input type="text" v-model="contacts.address" />
        </div>
        <div class="input-field">
            <label>E-mail</label>
            <input type="text" v-model="contacts.email" />
        </div>
    </div>
    <div class="mt-40" v-else>
        <div class="input-field">
            <label>Начните вводить ИНН или наименование</label>
            <input type="text" ref="search" autocomplete="off" placeholder="Организация" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .org-input-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>