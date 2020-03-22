import React from 'react'
import PropTypes from 'prop-types'

class Lifecycle extends React.Component {

    static defaultProps = {
    };

    /**
     * 唯一可以直接修改state的地方，其他地方使用this.setState
     */
    constructor(props) {
        super(props);
    }

    /**
     * UI渲染完成后调用；
     * 只执行一次；
     * 典型场景：获取外部资源
     */
    componentDidMount() {
    }

    /**
     * 组件被移除时调用
     * 典型场景：资源释放
     */
    componentWillMount() {
    }

    /**
     * 页面render之前调用，state已经更新
     * 典型场景：获取render之前的DOM状态
     * @param prevProps
     * @param prevState
     */
    getSnapshotBeforeUpdate(prevProps, prevState) {
    }

    /**
     * 每次UI更新时被调用
     * 典型场景：页面需要根据props变化重新获取数据
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    /**
     * 决定VirtualDom是否需要重绘
     * 典型场景：性能优化
     * @param nextProps
     * @param nextState
     * @param nextContext
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
    }
}

