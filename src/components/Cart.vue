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
    <div class="calc-block" v-if="monthSelected">
        <div class="calc-block__title">
            <div>Базовый тариф</div>
            <div v-text="cashboxCountText"></div>
        </div>
            
        <div class="calc-block__price">
            <span>{{ $filters.formatCurrency(tariffBaseTotalPrice) }} ₽</span>
        </div>

        <ul class="card-tariff__list">
            <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
            <li class="card-tariff__item">Прозрачность и контроль: онлайн доступ к вашим чекам, мониторинг
                кассы через удобный Личный кабинет;</li>
            <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54-ФЗ.</li>
        </ul>

        <template v-if="'no_worries' == tariff">
            <div class="calc-block__title">
                <div>Без забот</div>
                <div v-text="cashboxCountText"></div>
            </div>
            
            <div class="calc-block__price">
                <span>{{ $filters.formatCurrency(tariffNoWorriesTotalPrice - tariffBaseTotalPrice) }} ₽</span>
            </div>

            <ul class="card-tariff__list" >
                <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
                <li class="card-tariff__item">Прозрачность и контроль: онлайн-доступ к чекам, мониторинг кассы
                    через удобный личный кабинет;</li>
                <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54&#8209;ФЗ;</li>
                <li class="card-tariff__item">Регистрация кассы без визита в налоговую;</li>
                <li class="card-tariff__item">Поддержка в любое время;</li>
                <li class="card-tariff__item">ОФД входит в тариф;</li>
                <li class="card-tariff__item">Настройка и регистрация кассы 0 ₽.</li>
            </ul>
        </template>

        <div class="calc-block__title">
            <div>Фискальный накопитель на {{ fiscalStorage }} месяцев</div>
        </div>

        <div class="calc-block__price">
            <span>{{ $filters.formatCurrency(fiscalStoragePrice) }} ₽</span>
        </div>

        <div class="calc-block__total">
            <span>Итого</span>
            <div class="calc-block__total__value">{{ $filters.formatCurrency(totalPrice + fiscalStoragePrice) }} ₽</div>
        </div>
    </div>
</template>