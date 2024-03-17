<script setup>
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

const main = useCalcStore();

const { 
    fiscalStorage, 
    monthSelected, 
    tariff,
    fiscalStoragePrice,
    totalPrice,
    tariffBaseTotalPrice,
    tariffNoWorriesTotalPrice,
    cashboxCountText
} = storeToRefs(main);

</script>

<template>
    <div class="cart-block" v-if="monthSelected">
        <div>
            <p>Базовый тариф</p>

            <div v-text="cashboxCountText"></div>
        </div>

        <p>{{ tariffBaseTotalPrice }} ₽</p>

        <ul class="card-tariff__list">
            <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
            <li class="card-tariff__item">Прозрачность и контроль: онлайн доступ к вашим чекам, мониторинг
                кассы через удобный Личный кабинет;</li>
            <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ.</li>
        </ul>

        <template v-if="'no_worries' == tariff">
            <div>
                <p>Без забот</p>

                <div v-text="cashboxCountText"></div>
            </div>

            <p>{{ tariffNoWorriesTotalPrice - tariffBaseTotalPrice }} ₽</p>

            <ul class="card-tariff__list" >
                <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
                <li class="card-tariff__item">Прозрачность и контроль: онлайн-доступ к чекам, мониторинг кассы
                    через удобный личный кабинет;</li>
                <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ;</li>
                <li class="card-tariff__item">Регистрация кассы без визита в налоговую;</li>
                <li class="card-tariff__item">Поддержка в любое время;</li>
                <li class="card-tariff__item">ОФД входит в тариф;</li>
                <li class="card-tariff__item">Настройка и регистрация кассы 0 ₽.</li>
            </ul>
        </template>

        

        <p>Фискальный накопитель на {{ fiscalStorage }} мес.</p>
        <p>{{ fiscalStoragePrice }} ₽</p>

        <h3>Итого</h3>

        <p>{{ totalPrice + fiscalStoragePrice }} ₽</p>
    </div>
</template>