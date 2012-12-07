/**
 * 属性描述符
 * 继承自ES_Object
 */
function ES_PropertyDescriptor(o) {
    //命名的数据属性（可选）
    __Value__ : undefined,
    __Writable__ : false, //若为false, 试图通过__Put__方法去访问__Value__都会失效

    //命名的访问器属性(可选)
    __Get__ : undefined, //函数方法或者undefined
    __Set__ : undefined, //函数方法或者undefined

    //公共属性
    __Enumerable__ : false, //是否可被for-in枚举
    __Configurable__ : false //是否可删除，是否可以改变属性性质（数据或访问器属性），是否可以改变attributes(指命名的数据属性或者命名的访问器属性是否可改？)
}

ES_PropertyDescriptor.isAccessorDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if ('undefined' === typeof desc.__Get__ || 'undefined' === typeof desc.__Set__) {
        return false;
    }
    return true;
};

ES_PropertyDescriptor.isDataDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if ('undefined' === typeof desc.__Value__ || 'undefined' === typeof desc.__Writable__) {
        return false;
    }
    return true;
};

ES_PropertyDescriptor.isGenericDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if (!PropertyDescriptor.isAccessorDescriptor(desc) && !PropertyDescriptor.isDataDescriptor(desc)) {
        return true;
    }
    return false;
};

ES_PropertyDescriptor.fromPropertyDescriptor = function (desc) {

};

ES_PropertyDescriptor.toPropertyDescriptor = function (obj) {

};
/**
 * 属性标识符类型
 * @param {[type]} name       [description]
 * @param {[type]} descriptor [description]
 * 这个东西或许不存在，他只是在ES_Object里面的name : ES_PropertyDescriptor对；见ES_Object
 */
function ES_PropertyIdentifier(name, descriptor) {
    this.name = name;
    this.descriptor = descriptor;
}