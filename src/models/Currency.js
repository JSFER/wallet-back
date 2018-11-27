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

export default {
    state: {
        currencies: [],
        pageNo: 0,
        pageSize: 20,
    },
    reducers: {
        updateCurrencies: ( state, { currencies, pageNo } ) => {
            const nState = cloneDeep(state)
            
            nState.currencies = currencies
            nState.pageNo = pageNo

            return nState
        }
    },
    effects: dispatch => {
        async function fetchCurrenciesAsync( { nPageNo }, { pageSize }) {
            const res = ApiService.get('/currency/query/page', {
                pageIndex: nPageNo,
                pageSize 
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Currency/updateCurrencies',
                    payload: {
                        currencies: res.data,
                        pageNo: res.pageNo
                    }
                })
            }
        }
    },
}
