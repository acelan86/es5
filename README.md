ES5.1
===
这不是一个可用的项目，只是用javascript来描述ES5.1的内容

约定：
==
1. 'undefined' !== typeof XXX 标识XXX不存在
2. 用__Xxx__ 来替代ES5描述中的[[Xxx]]内部属性或方法
3. 用_xxx 来定义为了实现语言描述额外加上的变量或方法，非ES规范描述的内容

类型：
==
1. ES_LT_XXX 语言类型 (包括Undefined, Null, Boolean, String, Number, Object)
2. ES_ST_XXX 规范类型 (包括Refrence, List, Completion, PropertyDescriptor, PropertyIdentifier, LexicalEnvironment, EnvironmentRecords)
3. ES_Object ecma原生对象
4. constructor/.. 构造器目录，存放了new表达式执行构造一个任何对象时候执行的步骤，返回一个对象
5. prototype/..   原型目录，存放了ecma原生的原型对象，如Object.prototype, Function.prototype
6. Type/...  类型目录， 存放了ecma定义的数据类型和规范类型的定义，包括Undefined, Null, String, Number, Boolean, Object数据类型和Completion，Reference等规范类型
7. ES_globalObject 唯一全局对象的定义，包含了全局对象属性及方法的定义
8. ES_ExecuteContext 执行上下文相关方法定义


关键
==
1. ES_control可以认为是解释执行的全局控制对象，包含ES描述的如下内容：
    * 执行环境栈ecStack
    * 当前活动的执行环境runningEC
    * 抽象了如下几个方法
        *  enter(ec)进入执行环境ec
        *  execute(code) 使用当前活动的执行环境解释执行code
        *  quit() 退出当前执行环境
        
    ＊ 代码中以该对象来描述解释执行代码