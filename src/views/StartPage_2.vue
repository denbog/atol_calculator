<script setup>
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'


import Cart2 from '@/components/Cart_2.vue'
import NumberInput from '@/components/NumberInput.vue'

const main = useCalcStore()

const { 
    cashboxCount,
    fiscalStorage, 
    monthSelected, 
    tariff,
    fiscalStoragePrice,
    totalPrice,
    totalPriceDiscount,
    cashboxCountText,
    tariffBaseTotalPrice,
    tariffNoWorriesTotalPrice
} = storeToRefs(main)

function printMonthText(count) {
    let text = 'месяцев'
    if (1 == count) {
        text = 'месяц'
    } else if (6 > count) {
        text = 'месяца'
    }

    return count + ' ' + text
}
</script>

<template>
    <div class="mb-md-56 mb-48">
        <div class="head-block">
            <div class="container">
                <div class="head-block__content">
                    <div class="head-block__info">
                        <h1>Рассчитайте стоимость облачной кассы</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-lg-128 mb-md-56 mb-48">
        <div class="container">
            
            <div class="calc-block-list">
                <div class="calc-block calc-block--bordered">
                    <h4>1. Выберите количество касс</h4>

                    <NumberInput v-model="cashboxCount" />

                    <h4>2. Выберите фискальный накопитель</h4>

                    <div class="field" v-for="value in [15, 36]">
                        <div class="field__control">
                            <label class="checkbox checkbox--radio">
                                <input class="checkbox__input" type="radio" :value="value" v-model="fiscalStorage">
                                <span class="checkbox__box"></span>
                                <span class="checkbox__text">{{ value }} месяцев</span>
                            </label>
                        </div>
                    </div>

                    <h4>3. Выберите срок оплаты</h4>

                    <div class="calc-month-list">
                        <label v-for="value in [1, 3, 6, 12, 15, 36]">
                            <input type="radio" :value="value" v-model="monthSelected">
                            <span v-text="printMonthText(value)"></span>
                        </label>
                    </div>
                    
                </div>
                <div class="calc-block calc-block--bordered calc-block--full">
                    <h4>4. Выберите тариф</h4>

                    <div class="calc-block__tarifs">
                        <div class="calc-block__tarif">
                            <h3 class="card-tariff__title h3">Базовый</h3>
                            <div class="card-tariff__text"><p>Для опытных пользователей</p></div>

                            <p class="card-tariff__price h3">{{ $filters.formatCurrency(tariffBaseTotalPrice / monthSelected) }} ₽/мес</p>

                            <button 
                                class="button button--small" 
                                :class="{ 'button--line': 'base' == tariff }"
                                @click="tariff = 'base'"
                            >
                                <span class="button__text" v-text="'base' == tariff ? 'Выбран этот тариф' : 'Выбрать этот тариф'"></span>
                            </button>

                            <ul class="card-tariff__list">
                                <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
                                <li class="card-tariff__item">Прозрачность и контроль: онлайн доступ к вашим чекам, мониторинг
                                    кассы через удобный Личный кабинет;</li>
                                <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ.</li>
                            </ul>
                        </div>
                        <div class="calc-block__tarif">
                            <h3 class="card-tariff__title h3">Без забот</h3>
                            <div class="card-tariff__text">
                                <p class="tariffs-morelink">Максимальный комфорт</p>
                            </div>
                            <p class="card-tariff__price h3">{{ $filters.formatCurrency(tariffNoWorriesTotalPrice / monthSelected) }} ₽/мес</p>

                            <button 
                                class="button button--small" 
                                :class="{ 'button--line': 'no_worries' == tariff }"
                                @click="tariff = 'no_worries'"
                            >
                                <span class="button__text" v-text="'no_worries' == tariff ? 'Выбран этот тариф' : 'Выбрать этот тариф'"></span>
                            </button>

                            <ul class="card-tariff__list">
                                <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
                                <li class="card-tariff__item">Прозрачность и контроль: онлайн-доступ к чекам, мониторинг кассы
                                    через удобный личный кабинет;</li>
                                <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54&#8209;ФЗ;</li>
                                <li class="card-tariff__item">Регистрация кассы без визита в налоговую;</li>
                                <li class="card-tariff__item">Поддержка в любое время;</li>
                                <li class="card-tariff__item">ОФД входит в тариф;</li>
                                <li class="card-tariff__item">Настройка и регистрация кассы 0 ₽.</li>
                            </ul>
                        </div>
                    </div>

                    <p><a href="">Посмотрите сравнение тарифов</a></p>
                </div>

                <Cart2>
                    <template v-slot:header>
                        <h4>5. Вы выбрали</h4>
                    </template>
                    <template v-slot:action>
                        <button class="button button--small" @click="$emit('complited', 'order')">
                            <span class="button__text">Перейти к оплате</span>
                        </button>
                    </template>
                </Cart2>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.calc-block-list {
    display: flex;
    gap: 25px;
}
.calc-block__tarifs {
    display: grid;
    gap: 20px 40px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.calc-month-list {
    display: flex;
    gap: 15px 10px;
    flex-wrap: wrap;

    label {
        border: 1px solid #D8D8D8;
        border-radius: 60px;
        color: #616161;
        font-size: 16px;
        line-height: 1.25;
        padding: 4px 10px;

        display: grid;
        grid-template-columns: 15px auto;
        align-items: center;
        gap: 6px;

        accent-color: #ED1B2F;

        &:has(input:checked) {
            border-color: #313131;
        }

        input {
            appearance: none;
            -webkit-appearance: none;

            border-radius: 50%;
            box-shadow: 0 0 0 1px #D8D8D8;

            height: 15px;

            &:checked {
                background: #ED1B2F;
            }
        }
    }
}
</style>
