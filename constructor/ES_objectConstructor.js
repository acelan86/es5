/**
 * 创建一个空对象的方法
 * @param {[type]} value [description]
 */
var ES_createNullObject = function () {
    return new ES_Object({
        __Prototype__ : ES_objectPrototype,
        __Class__ : 'Object',
        __Extensible__ : true
    });
};
/**
 * 标准Object内置构造器
 */
var ES_objectConstructor = (function () {
    var oc = new ES_Object({
        __Prototype__ : ES_functionPrototype
    });

    //作为构造器使用 new Object
    oc.__Construct__ = function (value) {
        //提供了value
        if ('undefined' !== typeof value) {
            var obj;
            switch (ES_Global.type(value)) {
                case "ES_LT_Object" : 
                    if (ES_Global.isBuildIn(value)) {
                        obj = value;
                    }
                    if (ES_Global.isHost(value)) {
                       //.... 15.2.1
                    }
                    break;
                case "string" : 
                case "boolean" : 
                case "number" : 
                    obj = ES_Global.toObject(value);
                    break;
            }
            return obj;
        }
        if ('undefined' === typeof value || ('undefined' !== typeof value && (ES_Global.type(value) === "ES_LT_Null" || ES_Global.type(value) === "ES_LT_Undefined"))) {
            return ES_createNullObject();
        }
    };

    oc.length = 1;
    oc.prototype = ES_objectPrototype;
    oc.getPrototypeOf = function (o) {
        if (ES_Global.type(o) !== ES_LT_Object) {
            throw new TypeError();
        }
        return o.__Prototype__;
    };

    oc.getOwnPropertyDescriptor = function (o, p) {
        if (ES_Global.type(o) !== ES_LT_Object) {
            throw new TypeError();
        }
        var name = ES_Global.toString(p),
            desc = o.__GetOwnProperty__(name);
        return fromPropertyDescriptor(desc); //这个方法在哪？
    };

    oc.getOwnPropertyNames = function (o) {

    };

    oc.create = function (o, properties) {

    };

    oc.defineProperty = function (o, p, attribute) {

    };

    oc.defineProperties = function (o, properties) {

    };

    oc.seal = function (o) {

    };

    oc.freeze = function (o) {

    };

    oc.preventExtensions = function (o) {

    };

    oc.isSealed = function (o) {

    };

    oc.isFrozen = function (o) {

    };

    oc.isExtensible = function (o) {

    };

    oc.keys = function (o) {

    };

    return oc;
})();

