<script setup>
import { ref, watch, defineModel } from 'vue'

const value = defineModel()

watch(value, () => {
    if (!value.value) {
        value.value = 1
    }
})
</script>

<template>
    <div class="counter">
        <div class="counter__inner">
            <button type="button" class="counter__btn" @click="value--" :disabled="1==value">-</button>
            <input type="number" v-model="value">
            <button type="button" class="counter__btn" @click="value++">+</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.counter {
    display: inline-block;

    &__inner {
        display: grid;
        grid-template-columns: 56px 75px 56px;
        grid-template-rows: 1fr;

        border-radius: 16px;
        overflow: hidden;
        height: 56px;
        width: 187px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;

        border: none;

        font-size: 28px;
        text-align: center;

        &:focus {
            outline: none;
        }
    }

    &__btn {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--clr-dark);
        border: none;
        color: var(--clr-white);

        font-size: 38px;
        font-weight: 600;
        line-height: 1;

        &:disabled {
            background-color: var(--clr-light);
            cursor: not-allowed;
        }
    }
}
</style>