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

    effects: dispatch => {
        async function fetchCurrencies() {}
    },
}
