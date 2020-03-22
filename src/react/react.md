#####  1、事件监听：
1. `React.js` 不需要手动调用浏览器原生的 `addEventListener` 进行事件监听。`React.js` 帮我们封装好了一系列的 `on*` 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 `on*` 就可以了。    
2. **`on*` 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上**
3. 为 React 的组件添加事件监听是很简单的事情，你只需要使用 React.js 提供了一系列的 on* 方法即可。
4. React.js 会给每个事件监听传入一个 event 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。
5. React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。

	```
	class Title extends Component {
        handleClickOnTitle (word, e) {
            console.log(this, word)
        }

        render () {
            return (
                <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
                //console.log(this, word) ==> this打印出来为null or undefined，
                //因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClickOnTitle），
                //而是直接通过函数调用 （handleClickOnTitle），所以事件监听函数内并不能通过 this 获取到实例。
                //<h1 onClick={this.handleClickOnTitle('Hello')}>React 小书</h1>
            )
        }
	}
	```

##### 2、组件的 `state` 和 `setState`
1. `React.js` 提供的 `setState` 方法，**它接受一个对象或者函数作为参数。**
    * 传入一个对象：这个对象表示该组件的新状态。但你只需要传入需要更新的部分就可以了，而不需要传入整个对象

        当你调用 setState 的时候，React.js 并不会马上修改 state。而是把这个对象放  到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。
        ```
        handleClickOnLikeButton () {
            this.setState({ count: 0 }) // => this.state.count 还是 undefined
            this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
            this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
        }
        所以如果你想在 setState 之后使用新的 state 来做后续运算就做不到了
	    ```
    * 传入一个函数：React.js 会把上一个 setState 的结果传入这个函数。你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象
        ```
        handleClickOnLikeButton () {
            this.setState((prevState) => {
                return { count: 0 }
            })
                        
            this.setState((prevState) => {
                // 上一个 setState 的返回是 count 为 0，当前返回 1
                return { count: prevState.count + 1 } 
            })
                        
            this.setState((prevState) => {
                // 上一个 setState 的返回是 count 为 1，当前返回 3
                return { count: prevState.count + 2 } 
            })
            // 最后的结果是 this.state.count 为 3
        }    
        ```

  2. `setState` 合并：上面我们进行了三次 `setState`，但是实际上组件只会重新渲染一次，而不是三次；这是因为在 `React.js` 内部会把 `JavaScript` 事件循环中的消息队列的同一个消息中的 `setState` 都进行合并以后再重新渲染组件。	

##### 3、组件的props
1. 每个组件都可以接受一个 props 参数，它是一个对象，包含了所有你对这个组件的配置。
2. 在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值        

    ```
    class Index extends Component {
        render () {
            return (
                <div>
                    //可以把任何类型的数据作为组件的参数，包括字符串、数字、对象、数组、甚至是函数等等
                    <LikeButton wordings={{likedText: '已赞', unlikedText: '赞'}} />
                </div>
            )
         }
    }
    ```
3. 可以通过给组件添加类属性 `defaultProps` 来配置默认参数。：

	```
	class LikeButton extends Component {
        static defaultProps = {
            likedText: '取消',
            unlikedText: '点赞'
        }
	}
	```

4. props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

	```
	class Index extends Component {
        constructor () {
            super()
            this.state = {
                likedText: '已赞',
                unlikedText: '赞'
            }
        }

        handleClickOnChange () {
            this.setState({
                likedText: '取消',
                unlikedText: '点赞'
            })
        }

        render () {
            return (
                <div>
                    <LikeButton
                        likedText={this.state.likedText}
                        unlikedText={this.state.unlikedText} />
                    <div>
                        <button onClick={this.handleClickOnChange.bind(this)}>
            修改 wordings
                        </button>
                    </div>
            </div>
            )
        }
	}
	```
	
##### 4、`state` vs `props`
1. `state`类似于`Vue`中的`data`，属于组件内部的数据；`props`类似于`Vue`中的`props`，用于父组件向子组件传递数据。
2. `state` 的主要作用是用于组件保存、控制、修改自己的可变状态。`state` 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 `state` 是一个局部的、只能被组件自身控制的数据源。`state` 中状态可以通过 `this.setState` 方法进行更新，`setState` 会导致组件的重新渲染。

3. `props` 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 `props`，否则组件的 `props` 永远保持不变。

4. `props.children`：所有嵌套在组件中的JSX结构都可以在组件内部通过 `props.children` 获取到。
    
    ```
    class Card extends Component {
        render () {
            return (
                <div className='card'>
                    <div className='card-content'>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }
    //React.js 就是把我们嵌套的 JSX 元素一个个都放到数组当中，然后通过 props.children 传给了 Card。
    ```

##### 5、列表渲染
* 对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识。

    ```
    class Index extends Component {
        render () {
            return (
                <div>
                    {users.map((user, i) => <User key={i} user={user} />)}
                </div>
            )
        }
    }
    ```

##### 6、父组件和子组件如何进行通信。
1. 父组件向子组件传递数据：父组件通过 `props` 向子组件传递参数。
2. `React.js` 认为所有的状态都应该由 `React.js` 的 `state` 控制，类似于 `<input />`、`<textarea />`、`<select />`需要通过 `setState` 来设置值，然后通过 `onChange` 来监听值的变化。

    ```
    <div className='comment-field-input'>
      <input
        //设置值
        value={this.state.username}
        //监听输入的改变
        onChange={this.handleUsernameChange.bind(this)} />
    </div>
    handleUsernameChange (event) {
        this.setState({
            //获取event的值
            username: event.target.value
        })
    } 
    ```
3. 子组件向父组件传递数据：子组件的 `props` 可以是一个函数，子组件判断回调函数是否存在，然后在进行回调。

    ```
    class CommentApp extends Component {
        handleSubmitComment (comment) {
            console.log(comment)
        }
        render() {
            return (
            <div className='wrapper'>
                <CommentInput
                    onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList />
            </div>
            )
        }
    }
    //子组件回调
    <div className='comment-field-button'>
        <button
          onClick={this.handleSubmit.bind(this)}>
          发布
        </button>
    </div>
  
    handleUsernameChange (event) {
        this.setState({
            username: event.target.value
        })
    }  
    ```

##### 7、`ref` 进行DOM操作
* `ref`属性的值是一个函数，参数为绑定的DOM元素。

    ```
    class AutoFocusInput extends Component {
        componentDidMount () {
            this.input.focus()
        }

        render () {
            return (
                //input 为绑定的DOM元素
                <input ref={(input) => this.input = input} />
            )
        }
    }
    //ref也可以用在组件标签上，获取的是这个组件的实例
    <Clock ref={(clock) => this.clock = clock} />
    ```

##### 8、高阶组件和函数组件
	
1. 高阶组件：高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。
2. 
	```
	import React, { Component } from 'react'

	export default (WrappedComponent, name) => {
  		class NewComponent extends Component {
    			constructor () {
			      super()
			      this.state = { data: null }
		    	}
		
			 componentWillMount () {
				let data = localStorage.getItem(name)
				this.setState({ data })
			 }
			
			 render () {
				return <WrappedComponent data={this.state.data} />
			}
		 }
		 return NewComponent
	}
	```


