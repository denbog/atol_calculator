<script setup>
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

const main = useCalcStore()

const { 
    cashboxCount,
    fiscalStorage, 
    monthSelected, 
    tariff,
    fiscalStoragePrice,
    totalPrice,
    totalPriceDiscount,
    cashboxCountText
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
            
            <div class="card-list">
                <div class="card-list__item">
                    <h3>1. Выберите количество касс</h3>

                    <input type="number" min="1" max="100" v-model="cashboxCount">

                    <h3>2. Выберите фискальный накопитель</h3>
                    <div class="field" v-for="value in [15, 36]">
                        <div class="field__control">
                            <label class="checkbox checkbox--radio">
                                <input class="checkbox__input" type="radio" :value="value" v-model="fiscalStorage">
                                <span class="checkbox__box"></span>
                                <span class="checkbox__text">{{ value }} месяцев</span>
                            </label>
                        </div>
                    </div>

                    <h3>3. Выберите срок оплаты</h3>

                    <label v-for="value in [1, 6, 12, 15, 36]">
                        <input type="radio" :value="value" v-model="monthSelected">
                        <span v-text="printMonthText(value)"></span>
                    </label>
                </div>
                <div class="card-list__item">
                    <h3>4. Выберите тариф</h3>

                    <div class="card-tariff">
                        <div class="card-tariff__content">
                            <h3 class="card-tariff__title h3">Базовый</h3>
                            <div class="card-tariff__text">
                                <p>Для опытных пользователей</p>
                            </div>

                            <p class="card-tariff__price h3">от 2 190 ₽/мес</p>

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
                    </div>

                    <div class="card-tariff">
                        <div class="card-tariff__content">
                            <h3 class="card-tariff__title h3">Без забот</h3>
                            <div class="card-tariff__text">
                                <p class="tariffs-morelink">Максимальный комфорт</p>
                            </div>
                            <p class="card-tariff__price h3">от 2 990 ₽/мес</p>

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
                                <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ;</li>
                                <li class="card-tariff__item">Регистрация кассы без визита в налоговую;</li>
                                <li class="card-tariff__item">Поддержка в любое время;</li>
                                <li class="card-tariff__item">ОФД входит в тариф;</li>
                                <li class="card-tariff__item">Настройка и регистрация кассы 0 ₽.</li>
                            </ul>
                        </div>
                    </div>

                    <p><a href="">Посмотрите сравнение тарифов</a></p>
                </div>
                <div class="card-list__item">
                    <h3>5. Вы выбрали</h3>

                    <div>
                        <div v-if="'base' == tariff">
                            <p>Тариф &laquo;Базовый&raquo;</p>
                            <p>Оптимально по минимальной цене</p>
                        </div>
                        <div v-else-if="'no_worries' == tariff">
                            <p>Тариф &laquo;Без забот&raquo;</p>
                            <p>Максимальный комфорт</p>
                        </div>

                        <div class="button-circle button-circle--black button-circle--has-text">
                            <span class="button__text">{{ monthSelected }} мес.</span>
                        </div>
                        <div class="button-circle button-circle--has-text">
                            <span class="button__text" v-text="cashboxCountText"></span>
                        </div>
                    </div>

                    <p><s>{{ totalPrice + totalPriceDiscount }} ₽</s></p>
                    <p>{{ totalPrice }} ₽</p>

                    <ul class="card-tariff__list" v-if="'base' == tariff">
                        <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
                        <li class="card-tariff__item">Прозрачность и контроль: онлайн доступ к вашим чекам, мониторинг
                            кассы через удобный Личный кабинет;</li>
                        <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ.</li>
                    </ul>
                    <ul class="card-tariff__list" v-else-if="'no_worries' == tariff">
                        <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
                        <li class="card-tariff__item">Прозрачность и контроль: онлайн-доступ к чекам, мониторинг кассы
                            через удобный личный кабинет;</li>
                        <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ;</li>
                        <li class="card-tariff__item">Регистрация кассы без визита в налоговую;</li>
                        <li class="card-tariff__item">Поддержка в любое время;</li>
                        <li class="card-tariff__item">ОФД входит в тариф;</li>
                        <li class="card-tariff__item">Настройка и регистрация кассы 0 ₽.</li>
                    </ul>

                    <p>Фискальный накопитель на {{ fiscalStorage }} мес.</p>
                    <p>{{ fiscalStoragePrice }} ₽</p>

                    <h3>Итого</h3>

                    <p>С учётом скидки -{{ totalPriceDiscount }} ₽</p>

                    <p><s>{{ totalPrice + fiscalStoragePrice + totalPriceDiscount }} ₽</s></p>
                    <p>{{ totalPrice + fiscalStoragePrice }} ₽</p>

                    <button class="button button--line" @click="$emit('complited')">
                        <span class="button__text">Перейти к оплате</span>
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.card-list {
    display: flex;
    gap: 25px;

    &__item {
        border: 1px solid #616161;
        border-radius: 30px;
        padding: 25px;
    }
}
</style>
