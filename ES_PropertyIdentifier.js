/**
 * 属性描述符
 */
function ES_PropertyDescriptor(o) {
    // //命名的数据属性
    // this.__Value__ = undefined;
    // this.__Writable__ = false;

    // //命名的访问器属性
    // this.__Get__ = undefined;
    // this.__Set__ = undefined;

    // this.__Enumerable__ = false;
    // this.__Configurable__ = false;
}

PropertyDescriptor.isAccessorDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if ('undefined' === typeof desc.__Get__ || 'undefined' === typeof desc.__Set__) {
        return false;
    }
    return true;
};

PropertyDescriptor.isDataDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if ('undefined' === typeof desc.__Value__ || 'undefined' === typeof desc.__Writable__) {
        return false;
    }
    return true;
};

PropertyDescriptor.isGenericDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if (!PropertyDescriptor.isAccessorDescriptor(desc) && !PropertyDescriptor.isDataDescriptor(desc)) {
        return true;
    }
    return false;
};

PropertyDescriptor.fromPropertyDescriptor = function (desc) {

};

PropertyDescriptor.toPropertyDescriptor = function (obj) {

};
/**
 * 属性标识符类型
 * @param {[type]} name       [description]
 * @param {[type]} descriptor [description]
 */
function PropertyIdentifier(name, descriptor) {
    this.name = name;
    this.descriptor = descriptor;
}