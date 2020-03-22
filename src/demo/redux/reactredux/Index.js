import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Header from './Header'
import Content from './Content'

import store from './store/Store'

export default class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <Header/>
                <Content/>
            </Provider>

        )
    }
}

