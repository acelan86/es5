/**
 * 属性描述符
 */
function PropertyDescriptor(o) {
    // //命名的数据属性
    // this.[[Value]] = undefined;
    // this.[[Writable]] = false;

    // //命名的访问器属性
    // this.[[Get]] = undefined;
    // this.[[Set]] = undefined;

    // this.[[Enumerable]] = false;
    // this.[[Configurable]] = false;
}

PropertyDescriptor.isAccessorDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if ('undefined' === typeof desc.[[Get]] || 'undefined' === typeof desc.[[Set]]) {
        return false;
    }
    return true;
};

PropertyDescriptor.isDataDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if ('undefined' === typeof desc.[[Value]] || 'undefined' === typeof desc.[[Writable]]) {
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