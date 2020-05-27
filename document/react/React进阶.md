##### [1、React组件中的 `this` 究竟指向谁](https://zhuanlan.zhihu.com/p/37911534)

- `this`指向的是直接调用函数的那个对象
```
var name = 'Global';

const matt = {
    name: "Matt",
    sayName: function () {
        console.log(this.name);
    }
}

function exec(cb) {
    cb();  //没有显示调用者 this在非严格模式下就会指向全局对象，在严格模式下就会指向 undefined
}

exec(matt.sayName); // `Global` (浏览器), `undefined` (Node.js)
```
- 如果你使用了 ES6 的 `class` 语法，所有在 `class` 中声明的方法都会自动地使用严格模式
- 箭头函数的`this`：`this` 永远绑定了定义箭头函数所在的那个对象


    
##### [2、React类组件和函数组件的差异，如何进行选择](https://zhuanlan.zhihu.com/p/62767474)

##### [3、React Hooks](https://juejin.im/post/5ceb36dd51882530be7b1585#heading-16)
