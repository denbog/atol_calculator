import { defineStore } from "pinia"

const tariffTable = {
    'base': [
        [1, 2200],
        [3, 6600],
        [6, 12000],
        [12, 21600],
        [15, 25500],
        [36, 61200]
    ],
    'no_worries': [
        [1, 3500],
        [3, 10500],
        [6, 19800],
        [12, 36000],
        [15, 43500],
        [36, 104400]
    ]
}
const fiscalStorageTable = {
    'base': [
        [15, 10500],
        [36, 15600],
    ],
    'no_worries': [
        [15, 10500],
        [36, 15600],
    ]
}

export const useCalcStore = defineStore("main", {
    state: () => ({
        cashboxCount: 1,
        useReserve : false,
        fiscalStorage: 15,
        monthSelected: 12,
        tariff: 'base'
    }),
    getters: {
        tariffPrice: (state) => tariffTable[state.tariff].filter(row => state.monthSelected == row[0])[0][1],
        fiscalStoragePrice: (state) => fiscalStorageTable[state.tariff].filter(row => state.fiscalStorage == row[0])[0][1],
        totalPrice: (state) => state.tariffPrice * state.cashboxCount,
        totalPriceDiscount: (state) => (state.totalPrice / 0.8) - state.totalPrice,
        cashboxCountText: (state) => {
            let text = 'касс'
            if (1 == state.cashboxCount) {
                text = 'касса'
            } else if (5 > state.cashboxCount) {
                text = 'кассы'
            }

            return state.cashboxCount + ' ' + text
        },
        tariffName: (state) => {
            if ('base' == state.tariff) {
                return 'Базовый'
            }
            if ('no_worries' == state.tariff) {
                return 'Без забот'
            }
        }
    }
})