import ApiService from '@src/utils/ApiService'

const Product = {
    state: {},
    reducers: {},
    effects: () => ({
        async addProductAction({ name, type, profile, limit, applyForCount, url, cb }) {
            const res = await ApiService.post('/api/product/save', {
                name,
                type,
                limit,
                profile,
                applyForCount,
                url,
            })

            if (res.code === 0) {
                cb()
            }
        },
    }),
}

export default Product
