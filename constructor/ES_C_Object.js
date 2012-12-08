/**
 * Object构造器
 * @param {[type]} value [description]
 */
function ES_C_Object(value) {
    this.__Prototype__ = ES_P_Function;
    //提供了value
    if ('undefined' !== typeof value) {
        var obj;
        switch (ES_Global.type(value)) {
            case ES_LT_Object : 
                if (value is 原生对象) {
                    obj = value;
                }
                if (value is 宿主对象) {
                    .... 15.2.1
                }
                break;
            case ES_LT_String : 
            case ES_LT_Boolean : 
            case ES_LT_Number : 
                obj = ES_Global.toObject(value);
                break;
        }
        return obj;
    }
    if ('undefined' === typeof value || ('undefined' !== typeof value && (ES_Global.type(value) === ES_LT_Null || ES_Global.type(value) === ES_LT_Undefined))) {
        return new ES_O_Object({
            __Prototype__ : ES_P_Object,
            __Class__ : 'Object',
            __Extensible__ : true
        });
    }
}

ES_C_Object.length = 1;

ES_C_Object.prototype = ES_P_Object;

ES_C_Object.getPrototypeOf = function (o) {
    if (ES_Global.type(o) !== ES_LT_Object) {
        throw new TypeError();
    }
    return o.__Prototype__;
};

ES_C_Object.getOwnPropertyDescriptor = function (o, p) {
    if (ES_Global.type(o) !== ES_LT_Object) {
        throw new TypeError();
    }
    var name = ES_Global.toString(p),
        desc = o.__GetOwnProperty__(name);
    return fromPropertyDescriptor(desc); //这个方法在哪？
};

ES_C_Object.getOwnPropertyNames = function (o) {

};

ES_C_Object.create = function (o, properties) {

};

ES_C_Object.defineProperty = function (o, p, attribute) {

};

ES_C_Object.defineProperties = function (o, properties) {

};

ES_C_Object.seal = function (o) {

};

ES_C_Object.freeze = function (o) {

};

ES_C_Object.preventExtensions = function (o) {

};

ES_C_Object.isSealed = function (o) {

};

ES_C_Object.isFrozen = function (o) {

};

ES_C_Object.isExtensible = function (o) {

};

ES_C_Object.keys = function (o) {

};

