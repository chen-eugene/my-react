import React, {Component} from 'react'
import ThemeSwitch from './ThemeSwitch'
import {connect} from "./redux/Connect";
import PropTypes from "prop-types";

class Content extends Component {
    static propType = {
        themeColor: PropTypes.string
    };

    render() {
        return (
            <div>
                <p style={{color: this.props.themeColor}}>React.js 小书内容</p>
                <ThemeSwitch/>
            </div>
        )
    }

}

//定义如何从state中取数据
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
};

Content = connect(mapStateToProps)(Content);

export default Content;
