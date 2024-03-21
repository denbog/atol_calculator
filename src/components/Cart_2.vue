<script setup>
import { useSlots } from 'vue'
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

const main = useCalcStore()
const slots = useSlots()

const { 
    fiscalStorage, 
    monthSelected, 
    tariff,
    fiscalStoragePrice,
    totalPrice,
    totalPriceDiscount,
    tariffBaseTotalPrice,
    tariffNoWorriesTotalPrice,
    cashboxCountText
} = storeToRefs(main);

</script>

<template>
    <div class="calc-block calc-block--bordered" v-if="monthSelected">
        <slot name="header"></slot>

        <div class="calc-block__tariff-title">
            <p class="h4">Тариф &laquo;<span v-text="'base' == tariff ? 'Базовый' : 'Без забот'"></span>&raquo;</p>
            <div class="calc-block__tariff-badge calc-block__tariff-badge--dark">{{ monthSelected }} мес.</div>
            <div class="calc-block__tariff-badge" v-text="cashboxCountText"></div>
        </div>
        <div class="calc-block__tariff-subtitle" v-if="'base' == tariff">Оптимально по минимальной цене</div>
        <div class="calc-block__tariff-subtitle" v-else-if="'no_worries' == tariff">Максимальный комфорт</div>

        <div class="calc-block__price mt-15">
            <span><s>{{ $filters.formatCurrency(totalPrice + totalPriceDiscount) }} ₽</s> {{ $filters.formatCurrency(totalPrice) }} ₽</span>
        </div>

        <ul class="card-tariff__list" v-if="'base' == tariff">
            <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
            <li class="card-tariff__item">Прозрачность и контроль: онлайн доступ к вашим чекам, мониторинг
                кассы через удобный Личный кабинет;</li>
            <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54&#8209;ФЗ.</li>
        </ul>
        <ul class="card-tariff__list" v-else-if="'no_worries' == tariff">
            <li class="card-tariff__item">Гарантированная отправка чеков вашим покупателям 24/7;</li>
            <li class="card-tariff__item">Прозрачность и контроль: онлайн-доступ к чекам, мониторинг кассы
                через удобный личный кабинет;</li>
            <li class="card-tariff__item">Поддержка маркировки и полное соответствие 54&#8209;ФЗ;</li>
            <li class="card-tariff__item">Регистрация кассы без визита в налоговую;</li>
            <li class="card-tariff__item">Поддержка в любое время;</li>
            <li class="card-tariff__item">ОФД входит в тариф;</li>
            <li class="card-tariff__item">Настройка и регистрация кассы 0 ₽.</li>
        </ul>

        <div class="calc-block__title">
            <div>Фискальный накопитель на&nbsp;{{ fiscalStorage }}&nbsp;мес.</div>
        </div>
        <div class="calc-block__price">
            <span>{{ $filters.formatCurrency(fiscalStoragePrice) }} ₽</span>
        </div>

        <div class="calc-block__total calc-block__total--big">
            <span>Итого</span>
            <div class="calc-block__total__discount">С учётом скидки -{{ $filters.formatCurrency(totalPriceDiscount) }} ₽</div>
        </div>

        <div class="calc-block__footer mt-24">
            <div class="calc-block__total">
                <div class="calc-block__total__old-value"><s>{{ $filters.formatCurrency(totalPrice + fiscalStoragePrice + totalPriceDiscount) }} ₽</s></div>
                <div class="calc-block__total__value">{{ $filters.formatCurrency(totalPrice + fiscalStoragePrice) }} ₽</div>
            </div>
            <div class="calc-block__action" v-if="slots.action">
                <slot name="action"></slot>
            </div>
        </div>
    </div>
</template>