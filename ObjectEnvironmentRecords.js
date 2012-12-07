/**
 * 对象式环境数据对象
 * @param {[type]} o 指定对象
 */
function ObjectEnvironmentRecords(o, isProvideThis) {
    this.bindingObject = o;
    this.provideThis = isProvideThis;
}
ObjectEnvironmentRecords.prototype = {
    /**
     * 判断环境记录项中是否包含对某个标识符的绑定。
     * @param  {[type]}  name 标识符
     * @return {Boolean}      是否绑定true, false
     */
    hasBinding : function (name) {
        return this.bindingObject.[[HasProperty]](name);
    },
    /**
     * 在环境记录项中创建一个新的未初始化的可变绑定
     * @param  {[type]} name      绑定标识符
     * @param  {[type]} canDelete 是否可以被删除
     * @return {[type]}           无返回
     */
    createMutableBinding : function (name, canDelete) {
        var bindings = this.bindingObject;
        if (!bindings.[[HasProperty]](name)) {
            bindings.[[DefineOwnProperty]](
                name,
                {
                    [[Value]]       : undefined,
                    [[Writable]]    : true,
                    [[Enumerable]]  : true,
                    [[Configurable]]: canDelete
                },
                true
            );
        }
    },
    /**
     * 在环境记录项中设置一个已存在的值
     * @param {[type]} name  绑定标识符
     * @param {[type]} value 设置的值
     * @param {[type]} strict 是否严格模式
     */
    setMutableBinding : function (name, value, strict) {
        var bindings = this.bindingObject;
        bindings.[[Put]](name, value, strict);
    },
    /**
     * 返回环境记录项中一个已经存在的绑定的值
     * @param  {[type]} name   绑定标识符
     * @param  {[type]} strict 是否严格模式
     * @return {[type]}        绑定的值
     */
    getBindingValue : function (name, strict) {
        var bindings = this.bindingObject;
        if (!bindings.[[HasProperty]](name)) {
            if (strict) {
                throw new ReferenceError();
            } else {
                return undefined;
            }
        }
        return bindings.[[Get]](name);
    },
    /**
     * 从环境记录项中删除一个绑定
     * @param  {[type]} name 绑定标识符
     * @return {[type]}      是否成功删除
     */
    deleteBinding : function (name) {
        var bindings = this.bindingObject;
        return bindings.[[Delete]](name, false);
    },
    /**
     * 当从环境记录项的绑定中获取一个函数对象并调用时，改方法返回函数对象使用的this对象值
     * @return {[type]} 函数对象使用的this对象值
     */
    implicitThisValue : function () {
        return this.provideThis ? this.bindingObject : undefined;
    }
};
