<script setup>
import { useSlots } from 'vue'
import { useCalcStore } from '@/lib/store'
import { storeToRefs } from 'pinia'

const main = useCalcStore()
const slots = useSlots()

const { 
    cashboxCount,
    fiscalStorage, 
    monthSelected, 
    tariff,
    fiscalStorageTotalPrice,
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
            <div v-html="cashboxCountText"></div>
        </div>
            
        <div class="calc-block__price">
            <span>{{ $filters.formatCurrency(tariffBaseTotalPrice * cashboxCount) }} ₽</span>
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
                <div v-html="cashboxCountText"></div>
            </div>
            
            <div class="calc-block__price">
                <span>{{ $filters.formatCurrency((tariffNoWorriesTotalPrice - tariffBaseTotalPrice) * cashboxCount) }} ₽</span>
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
            <div>Фискальный накопитель на&nbsp;{{ fiscalStorage }} месяцев</div>
            <div>{{ cashboxCount }}&nbsp;ФН</div>
        </div>

        <div class="calc-block__price">
            <span>{{ $filters.formatCurrency(fiscalStorageTotalPrice) }} ₽</span>
        </div>

        <div class="calc-block__footer">
            <div class="calc-block__total">
                <span>Итого</span>
                <div class="calc-block__total__value">{{ $filters.formatCurrency(totalPrice + fiscalStorageTotalPrice) }} ₽</div>
            </div>
            <div class="calc-block__action" v-if="slots.action">
                <slot name="action"></slot>
            </div>
        </div>
    </div>
</template>