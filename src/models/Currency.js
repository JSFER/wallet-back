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
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateCurrencies: (state, { currencies, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.currencies = currencies
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchCurrenciesAsync({ pageNo }, rootState) {
            const {
                Currency: { pageSize },
            } = rootState
            const res = await ApiService.get(`/currency/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`)

            if (res.code === 200) {
                dispatch({
                    type: 'Currency/updateCurrencies',
                    payload: {
                        currencies: res.data.data,
                        total: res.data.total,
                        pageNo
                    },
                })
            }
        },
        async addCurrencyAsync({ params, callback}, rootState){
            const { App: { userId }} = rootState
            const res = await ApiService.post('/currency/add', Object.assign(params, { userId }))

            if(res.code === 200){
                callback && callback()
            }
        }
    }),
}

export default Currency
