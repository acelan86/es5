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
    var o = new ES_Object({
        __Prototype__ : ES_functionPrototype
    });

    o.__Call__ = function (value) {
        if (value === undefined || value === null) {
            return o.__Construct__(value);
        }
        return ES_Global.toObject(value);
    };
    //作为构造器使用 new Object
    o.__Construct__ = function (value) {
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

    ES_Helper._initOwnProperty(o, {
        "length" : 1,
        "prototype" : ES_objectPrototype,
        "getPrototypeOf" : function (o) {
            if (ES_Global.type(o) !== ES_LT_Object) {
                throw new TypeError();
            }
            return o.__Prototype__;
        },
        "getOwnPropertyDescriptor" : function (o, p) {
            if (ES_Global.type(o) !== ES_LT_Object) {
                throw new TypeError();
            }
            var name = ES_Global.toString(p),
                desc = o.__GetOwnProperty__(name);
            return fromPropertyDescriptor(desc); //这个方法在哪？
        },
        "getOwnPropertyNames" : function (o) {},
        "create" : function (o, properties) {},
        "defineProperty" : function (o, p, attribute) {},
        "defineProperties" : function (o, properties) {},
        "seal" : function (o) {},
        "freeze" : function (o) {},
        "preventExtensions" : function (o) {},
        "isSealed" : function (o) {},
        "isFrozen" : function (o) {},
        "isExtensible" : function (o) {},
        "keys" : function (o) {}
    });

    return o;
})();

