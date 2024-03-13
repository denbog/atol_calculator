<script setup>
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

const main = useCalcStore();

const { 
    cashboxCount, 
    useReserve, 
    fiscalStorage, 
    monthSelected, 
    tariff,
    tariffName,
    fiscalStoragePrice,
    totalPrice,
    totalPriceDiscount,
    cashboxCountText
} = storeToRefs(main);

</script>

<template>
    <div class="cart-block">
        <div>
            <p>Тариф &laquo;{{ tariffName }}&raquo;</p>

            <div v-text="cashboxCountText"></div>
        </div>

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

        <p>{{ totalPrice + fiscalStoragePrice }} ₽</p>
    </div>
</template>