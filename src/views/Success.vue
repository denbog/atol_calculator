<script setup>
import Cart from '@/components/Cart.vue'
</script>

<template>
    <div class="mb-lg-128 mb-md-56 mb-48">
        <div class="container">
            <h3>Ваш заказ успешно оплачен</h3>
            <p>Ваш заказ успешно оплачен. Для продолжения оформления Вам необходимо завершить регистрацию. В&nbsp;ближайшее время по указанному телефону с&nbsp;Вами свяжется менеджер для сопровождения оформления</p>
            <a class="button" href="https://online.atol.ru/lk/Account/Register" target="_blank">
                <span class="button__text">Завершить регистрацию</span>
            </a>

            <Cart />
        </div>
    </div>
</template>