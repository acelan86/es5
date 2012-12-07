/**
 * 声明式环境数据对象
 */
function ES_ST_DeclarativeEnvironmentRecords() {
    this.bindingObject = {};
}
ES_ST_DeclarativeEnvironmentRecords.prototype = {
    /**
     * 判断环境记录项中是否包含对某个标识符的绑定。
     * @param  {[type]}  name 标识符
     * @return {Boolean}      是否绑定true, false
     */
    hasBinding : function (name) {
        return 'undefined' !== typeof this.bindingObject[name] && this.bindingObject[name] !== null;
    },
    /**
     * 在环境记录项中创建一个新的未初始化的可变绑定
     * @param  {[type]} name      绑定标识符
     * @param  {[type]} canDelete 是否可以被删除
     * @return {[type]}           无返回
     */
    createMutableBinding : function (name, canDelete) {
        if (!this.hasBinding(name)) {
            this.bindingObject[name] = { 
                mutable : true,
                delete : canDelete,
                value : undefined 
            };
        }
    },
    /**
     * 在环境记录项中设置一个已存在的值
     * @param {[type]} name  绑定标识符
     * @param {[type]} value 设置的值
     * @param {[type]} strict 是否严格模式
     */
    setMutableBinding : function (name, value, strict) {
        if (this.hasBinding(name)) {
            if (this.bindingObject[name].mutable) {
                this.bindingObject[name].value = value;
            } else if (strict) {
                throw new TypeError();
            }
        }
    },
    /**
     * 返回环境记录项中一个已经存在的绑定的值
     * @param  {[type]} name   绑定标识符
     * @param  {[type]} strict 是否严格模式
     * @return {[type]}        绑定的值
     */
    getBindingValue : function (name, strict) {
        if (this.hasBinding(name)) {
            if (this.bindingObject[name].value === undefined) {
                //绑定未初始化
                if (strict) {
                    throw new ReferenceError();
                } else {
                    return undefined;
                }
            } else {
                return this.bindingObject[name].value;
            }
        }
    },
    /**
     * 从环境记录项中删除一个绑定
     * @param  {[type]} name 绑定标识符
     * @return {[type]}      是否成功删除
     */
    deleteBinding : function (name) {
        if (!this.hasBinding(name)) {
            return true;
        }
        if (this.bindingObject[name].configurable) {
            return false;
        } else {
            delete this.bindingObject[name];
            return true;
        }
    },
    /**
     * 当从环境记录项的绑定中获取一个函数对象并调用时，改方法返回函数对象使用的this对象值
     * @return {[type]} 函数对象使用的this对象值
     */
    implicitThisValue : function () {
        return undefined;
    },
    /**
     * 在环境记录项中创建一个新的未初始化的不可变绑定
     * @param  {[type]} name 绑定标识符
     */
    createImmutableBinding : function (name) {
        if (!this.hasBinding(name)) {
            this.bindingObject[name] = { 
                writable        : false,
                configurable    : false,
                value           : undefined 
            };
        }
    },
    /**
     * 初始化环境记录项中不可变的绑定
     * @param  {[type]} name  绑定标识符
     * @param  {[type]} value 值
     */
    initializeImmutableBinding : function (name, value) {
        if (this.hasBinding(name) && !this.bindingObject[name].writable && this.bindingObject[name].value === undefined) {
            this.bindingObject[name].value = value;
        }
    } 
};