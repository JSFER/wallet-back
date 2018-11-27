import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

/**
 * 
    "id": 6,
    "currencyNo": "string",
    "currencyName": "string",
    "exchangeRate": 0.33,
    "modifyDateTime": null,
    "userId": 0,
    "status": null,
    "currencyStatusEnum": {
        "code": "N",
        "text": "非基准货币"
    }
 */

const Currency = {
    state: {
        currencies: [],
        pageNo: 0,
        pageSize: 20,
    },
    reducers: {
        updateCurrencies: (state, { currencies }) => {
            const nState = cloneDeep(state)

            nState.currencies = currencies

            return nState
        },
    },
    effects: dispatch => ({
        async fetchCurrenciesAsync({ pageNo }, { Currency: { pageSize } }) {
            const res = await ApiService.get(`/currency/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`)

            if (res.code === 200) {
                dispatch({
                    type: 'Currency/updateCurrencies',
                    payload: {
                        currencies: res.data.data,
                    },
                })
            }
        },
    }),
}

export default Currency
