import React from 'react'
import { connect } from 'react-redux'
import { table } from 'antd'

@connect(
    state => ({
        ...state.Currency
    })
)
class Currency extends React.Component{
    componentDidMount(){
        const { dispatch } = this.props

        dispatch({
            type: 'Currency/fetchCurrenciesAsync',
            payload: {
                pageNo: 0
            }
        })
    }
    render(){
        const { currencies } = this.props

        return (
            <div className="page-currency">
              123
            </div>
        )
    }
}

export default Currency