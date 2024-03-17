<script setup>
import { ref, onMounted } from 'vue'
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

const main = useCalcStore()

const { 
    tariff,
    fiscalStorage, 
    monthSelected,
    fiscalStoragePrice,
    tariffBaseTotalPrice,
    tariffNoWorriesTotalPrice,
} = storeToRefs(main)

const typeSelected = ref('')
const taxationSelected = ref('')

onMounted(() => {
    fiscalStorage.value = 36
    monthSelected.value = 0
})

function selectType(value) {
    typeSelected.value = value
    taxationSelected.value = ''
    monthSelected.value = 0
}
function selectTaxation(value) {
    taxationSelected.value = value
    monthSelected.value = 0
}
function selectMonth(value) {
    monthSelected.value = value
}
</script>

<template>
    <h3>Подберите стоимость решения</h3>
    <h4>Выберите род вашей деятельности</h4>

    <div>
        <button 
            class="button" 
            :class="{ active: 'services' == typeSelected }" 
            @click="selectType('services')"
        >Оказание услуг</button>
        <button 
            class="button" 
            :class="{ active: 'goods' == typeSelected }" 
            @click="selectType('goods')"
        >Продажа товаров</button>
        <button 
            class="button" 
            :class="{ active: 'services_goods' == typeSelected }" 
            @click="selectType('services_goods')"
        >Продажа товаров и оказание услуг</button>
    </div>

    <div v-if="'goods' == typeSelected || 'services_goods' == typeSelected">
        <button 
            class="button" 
            :class="{ active: 'osn' == taxationSelected }" 
            @click="selectTaxation('osn')"
        >Применяю ОСН</button>
        <button 
            class="button" 
            :class="{ active: 'usn' == taxationSelected }" 
            @click="selectTaxation('usn')"
        >Применяю только УСН, ЕСХН, ПС</button>
    </div>

    <div v-if="'services' == typeSelected || taxationSelected">
        <button 
            class="button" 
            :class="{ active: 12 == monthSelected }" 
            @click="selectMonth(12)"
        >Оплата за год</button>
        <button 
            class="button" 
            :class="{ active: 1 == monthSelected }" 
            @click="selectMonth(1)"
        >Помесячная оплата</button>
    </div>

    <template v-if="monthSelected">
        <div>
            <p>Для каждой онлайн кассы Вы должны купить фискальный накопитель на <a href="#" @click="fiscalStorage = 15">15</a> или <a href="#" @click="fiscalStorage = 36">36</a> месяцев</p>
            <div>
                <p>{{ fiscalStoragePrice }} ₽ на {{ fiscalStorage }} мес</p>
                <p>~{{ Math.ceil(fiscalStoragePrice / fiscalStorage) }} ₽/мес</p>
            </div>
        </div>
        
        <div>
            <p>Стоимость одной онлайн-кассы</p>
            <div v-if="12 == monthSelected">
                <p><s>{{ tariffBaseTotalPrice * 1.18 }}</s> -18%</p>
                <p>{{ tariffBaseTotalPrice }} ₽/год</p>
                <p>{{ tariffBaseTotalPrice / monthSelected }} ₽/мес</p>
            </div>
            <div v-else>
                <p>{{ tariffBaseTotalPrice * 12 }} ₽/год</p>
                <p>{{ tariffBaseTotalPrice }} ₽/мес</p>
            </div>
        </div>

        <div>
            <h3>Опция Без забот</h3>

            <p>{{ tariffNoWorriesTotalPrice - tariffBaseTotalPrice }} ₽/{{ 12 == monthSelected ? 'год' : 'мес' }}</p>

            <div>Выделенная линия поддержки</div>
            <div>Бесплатный партнёрский ОФД</div>
            <div>Замена фискального накопителя по заполненности</div>
            <div>Регистрация ККТ без посещения налоговой</div>

            <button v-if="'base' == tariff" @click="tariff = 'no_worries'">Добавить</button>
            <button v-else @click="tariff = 'base'">Убрать</button>
        </div>

        

        <button class="button button--line" @click="$emit('complited')">
            <span class="button__text">Далее</span>
        </button>
    </template>
</template>