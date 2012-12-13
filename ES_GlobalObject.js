var ES_globalObject = (function () {

    var obj = new ES_Object({
        __Extensible__ : true
    });

    //全局对象的值属性
    obj.__DefineOwnProperty__(
        "NaN",
        new ES_ST_PropertyDescriptor({
            __Value__ : NaN,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable : false
        }),
        false
    );

    obj.__DefineOwnProperty__(
        "Infinity", 
        new ES_ST_PropertyDescriptor({
            __Value__ : Infinity,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable : false
        }),
        false
    );

    obj.__DefineOwnProperty__(
        "Undefined",
        new ES_ST_PropertyDescriptor({
            __Value__ : undefined,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable : false
        }),
        false
    );
    //下面都是通过__DefineOwnProperty__定义的, 原谅我简便T_T
    //全局对象的函数属性
    ES_Helper._initOwnProperty(obj, {
        eval : function () {},
        parseInt : function (string) {},
        parseFloat : function (string) {},
        isNaN : function (number) {},
        isFinite : function (number) {},
        decodeURI : function (encodedURI) {},
        decodeURIComponent : function (encodedURIComponent) {},
        encodeURI : function (uri) {},
        encodeURIComponent : function (uriComponent) {}
    });

    //全局对象的构造器属性, 可以用new 
    ES_Helper._initOwnProperty(obj, {
        "Object" : ES_objectConstructor,
        "Function" : ES_functionConstructor
        // "Array" : ES_arrayConstructor,
        // "String" : ES_stringConstructor,
        // "Boolean" : ES_booleanConstructor,
        // "Number" : ES_numberConstructor,
        // "Date" : ES_dateConstructor,
        // "RegExp" : ES_regExpConstructor,
        // "Error" : ES_errorConstructor,
        // "EvalError" : ES_evalErrorConstructor,
        // "RangeError" : ES_RangeErrorConstructor,
        // "ReferenceError" : ES_referenceErrorConstructor,
        // "SyntaxError" : ES_syntaxErrorConstructor,
        // "TypeError" : ES_typeErrorConstructor,
        // "URIError" ES_uriErrorConstructor 
    });
    //全局对象的其他属性
    ES_Helper._initOwnProperty(obj, {
        "Math" : null, //15.8
        "JSON" : null  //15.2
    });

    return obj;
})();
