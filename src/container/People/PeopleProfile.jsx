import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Modal, Row, Col, Button, notification } from 'antd'

@connect(state => ({
    Client: state.Client
}))
class PeopleProfile extends React.Component{
    render(){
        return (
            <div >people manage</div>
        )
    }
}

export default PeopleProfile