/**
 * Object构造器
 * @param {[type]} value [description]
 */
var ES_createNullObject = function () {
    return new ES_Object({
        __Prototype__ : ES_objectPrototype,
        __Class__ : 'Object',
        __Extensible__ : true
    });
};

var ES_object = (function () {
    var o = new ES_Object({
        __Prototype__ : ES_functionPrototype
    });

    //作为构造器使用
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

    o.length = 1;
    o.prototype = ES_objectPrototype;
    o.getPrototypeOf = function (o) {
        if (ES_Global.type(o) !== ES_LT_Object) {
            throw new TypeError();
        }
        return o.__Prototype__;
    };

    o.getOwnPropertyDescriptor = function (o, p) {
        if (ES_Global.type(o) !== ES_LT_Object) {
            throw new TypeError();
        }
        var name = ES_Global.toString(p),
            desc = o.__GetOwnProperty__(name);
        return fromPropertyDescriptor(desc); //这个方法在哪？
    };

    o.getOwnPropertyNames = function (o) {

    };

    o.create = function (o, properties) {

    };

    o.defineProperty = function (o, p, attribute) {

    };

    o.defineProperties = function (o, properties) {

    };

    o.seal = function (o) {

    };

    o.freeze = function (o) {

    };

    o.preventExtensions = function (o) {

    };

    o.isSealed = function (o) {

    };

    o.isFrozen = function (o) {

    };

    o.isExtensible = function (o) {

    };

    o.keys = function (o) {

    };

    return o;
})();

