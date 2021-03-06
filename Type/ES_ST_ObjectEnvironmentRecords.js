/**
 * 对象式环境数据对象
 * 程序 with语句
 * 将一系列标识符与其绑定的对象属性名建立一一对应关系
 * @param {[type]} o 指定对象
 */
function ES_ST_ObjectEnvironmentRecords(o, isProvideThis) {
    this._constructor = 'ES_ST_ObjectEnvironmentRecords';
    this.bindingObject = o;
    this.provideThis = isProvideThis;
}
ES_ST_ObjectEnvironmentRecords.prototype = {
    /**
     * 判断环境记录项中是否包含对某个标识符的绑定。
     * @param  {String}  name 标识符
     * @return {Boolean}      是否绑定true, false
     */
    hasBinding : function (name) {
        return this.bindingObject.__HasProperty__(name);
    },
    /**
     * 在环境记录项中创建一个新的未初始化的可变绑定
     * @param  {String} name      绑定标识符
     * @param  {Boolean} canDelete 是否可以被删除
     */
    createMutableBinding : function (name, canDelete) {
        var bindings = this.bindingObject;
        if (!bindings.__HasProperty__(name)) {
            bindings.__DefineOwnProperty__(
                name,
                new ES_ST_PropertyDescriptor({
                    __Value__       : undefined,
                    __Writable__    : true,
                    __Enumerable__  : true,
                    __Configurable__: canDelete || false
                }),
                true
            );
        }
    },
    /**
     * 在环境记录项中设置一个已存在的值
     * @param {String} name  绑定标识符
     * @param {Any} value 设置的值
     * @param {[type]} strict 是否严格模式
     */
    setMutableBinding : function (name, value, strict) {
        var bindings = this.bindingObject;
        bindings.__Put__(name, value, strict);
    },
    /**
     * 返回环境记录项中一个已经存在的绑定的值
     * @param  {[type]} name   绑定标识符
     * @param  {[type]} strict 是否严格模式
     * @return {[type]}        绑定的值
     */
    getBindingValue : function (name, strict) {
        var bindings = this.bindingObject;
        if (!bindings.__HasProperty__(name)) {
            if (strict) {
                throw new ReferenceError();
            } else {
                return undefined;
            }
        }
        return bindings.__Get__(name);
    },
    /**
     * 从环境记录项中删除一个绑定
     * @param  {[type]} name 绑定标识符
     * @return {[type]}      是否成功删除
     */
    deleteBinding : function (name) {
        var bindings = this.bindingObject;
        return bindings.__Delete__(name, false);
    },
    /**
     * 当从环境记录项的绑定中获取一个函数对象并调用时，改方法返回函数对象使用的this对象值
     * @return {[type]} 函数对象使用的this对象值
     */
    implicitThisValue : function () {
        return this.provideThis ? this.bindingObject : undefined;
    }
};
