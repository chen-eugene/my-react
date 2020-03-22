import React, {Component} from 'react'
import {createStore} from "./redux/CreateStore";
import {Provider} from './redux/Provider'
import Header from './Header'
import Content from './Content'

const themeReducer = (state, action) => {
    if (!state) return {
        themeColor: 'red'
    };

    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return state
    }
};

const store = createStore(themeReducer);

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

