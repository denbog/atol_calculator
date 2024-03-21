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
    <p class="calc-subtitle">Выберите род вашей деятельности</p>

    <div class="calc-choice-group">
        <button class="calc-choice" :class="{ active: 'services' == typeSelected }"
            @click="selectType('services')">Оказание услуг</button>
        <button class="calc-choice" :class="{ active: 'goods' == typeSelected }" @click="selectType('goods')">Продажа
            товаров</button>
        <button class="calc-choice" :class="{ active: 'services_goods' == typeSelected }"
            @click="selectType('services_goods')">Продажа товаров и оказание услуг</button>
    </div>

    <div class="calc-choice-group" v-if="'goods' == typeSelected || 'services_goods' == typeSelected">
        <button class="calc-choice" :class="{ active: 'osn' == taxationSelected }"
            @click="selectTaxation('osn')">Применяю ОСН</button>
        <button class="calc-choice" :class="{ active: 'usn' == taxationSelected }"
            @click="selectTaxation('usn')">Применяю только УСН, ЕСХН, ПС</button>
    </div>

    <div class="calc-choice-group" v-if="'services' == typeSelected || taxationSelected">
        <button class="calc-choice" :class="{ active: 12 == monthSelected }" @click="selectMonth(12)">Оплата за
            год</button>
        <button class="calc-choice" :class="{ active: 1 == monthSelected }" @click="selectMonth(1)">Помесячная
            оплата</button>
    </div>

    <template v-if="monthSelected">
        <div class="calc-price-block mt-64">
            <p>Для каждой онлайн кассы Вы должны купить фискальный накопитель на <a href="#"
                    @click.prevent="fiscalStorage = 15" :class="{ active: 15 == fiscalStorage }">15</a> или <a href="#"
                    @click.prevent="fiscalStorage = 36" :class="{ active: 36 == fiscalStorage }">36</a> месяцев</p>
            <div class="calc-price-block__total">
                <p class="calc-price-block__primary">{{ $filters.formatCurrency(fiscalStoragePrice) }} ₽ на {{ fiscalStorage }} мес</p>
                <p class="calc-price-block__seconary">~{{ Math.ceil(fiscalStoragePrice / fiscalStorage) }} ₽/мес</p>
            </div>
        </div>

        <div class="calc-price-block">
            <p>Стоимость одной онлайн-кассы</p>
            <div class="calc-price-block__total" v-if="12 == monthSelected">
                <p class="calc-price-block__discount"><s>{{ $filters.formatCurrency(tariffBaseTotalPrice * 1.18) }}</s> <span>-18%</span></p>
                <p class="calc-price-block__primary">{{ $filters.formatCurrency(tariffBaseTotalPrice) }} ₽/год</p>
                <p class="calc-price-block__seconary">{{ $filters.formatCurrency(tariffBaseTotalPrice / monthSelected) }} ₽/мес</p>
            </div>
            <div class="calc-price-block__total" v-else>
                <p class="calc-price-block__primary">{{ $filters.formatCurrency(tariffBaseTotalPrice * 12) }} ₽/год</p>
                <p class="calc-price-block__seconary">{{ $filters.formatCurrency(tariffBaseTotalPrice) }} ₽/мес</p>
            </div>
        </div>

        <div class="calc-block calc-block--full mt-15">
            <div class="calc-block__title">
                <div>Опция Без забот</div>
            </div>

            <div class="calc-block__price">
                <span>{{ $filters.formatCurrency(tariffNoWorriesTotalPrice - tariffBaseTotalPrice) }} ₽/{{ 12 == monthSelected ? 'год' : 'мес' }}</span>
            </div>

            <div>Выделенная линия поддержки</div>
            <div>Бесплатный партнёрский ОФД</div>
            <div>Замена фискального накопителя по заполненности</div>
            <div>Регистрация ККТ без посещения налоговой</div>

            <div class="mt-40">
                <button class="calc-block__btn calc-block__btn--rounded calc-block__btn--dark" v-if="'base' == tariff" @click.prevent="tariff = 'no_worries'">Добавить</button>
                <button class="calc-block__btn calc-block__btn--rounded calc-block__btn--dark" v-else @click.prevent="tariff = 'base'">Убрать</button>
            </div>
        </div>
    </template>
</template>

<style scoped lang="scss">
.calc-choice-group {
    display: grid;
    gap: 48px;
    grid-template-columns: repeat(3, 1fr);

    margin-bottom: 24px;
}
.calc-choice {
    background: #FFFFFF;
    border: none;
    border-radius: 12px;
    box-shadow: 0px 4px 30px 0px #0000001A;

    
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    padding: 0 24px;

    transition: all .5s;

    &:hover,
    &.active {
        background: #EC1A30;
        color: #FFFFFF;
    }
}

.calc-price-block {
    display: grid;
    grid-template-columns: 1fr 280px;

    & + & {
        margin-top: 50px;
    }

    & > p {
        font-weight: 600;
        line-height: 2;

        a:not(.active) {
            color: #EC1A30;
            text-decoration: underline;
            text-underline-position: under;
        }
    }

    &__total {
        text-align: right;
    }

    &__primary {
        font-size: 24px;
        font-weight: 600;
    }
    &__secondary {
        color: #8e8f91;
        font-size: 20px;
        font-weight: 400;
    }
    &__discount {
        font-size: 18px;
        font-weight: 600;

        s {
            color: #8e8f91
        }
        span {
            color: #EC1A30;
        }
    }
}

</style>
