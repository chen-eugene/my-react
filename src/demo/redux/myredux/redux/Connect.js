import React, {Component} from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        };

        constructor() {
            super();
            //用来保存需要传给被包装组件的所有的参数
            this.state = {allProps: {}}
        }

        componentWillMount() {
            const {store} = this.context;
            this._updateProps();
            //设置监听，如果属性改变，从新更新
            store.subscribe(() => this._updateProps())
        }

        _updateProps() {
            const {store} = this.context;
            //防止 mapStateToProps 没有传入
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {};
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {};
            this.setState({
                //将通过store取得的属性和props全部整合到allProps中
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render() {
            return (
                //{...this.state.allProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
                <WrappedComponent {...this.state.allProps}/>
            )
        }

    }

    return Connect
};

