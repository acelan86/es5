var ES_globalObject = (function () {

    var obj = new ES_Object({
        __Extensible__ : true
    });

    var _oop = obj._ownProperty, //ownProperty
        _attribute = {
            __Writable__ : true,
            __Enumerable__ : false,
            __Configurable__ : true
        }; //全局属性中除特殊说明的属性外默认属性值

    //用于辅助生成各种函数或构造器属性，ES没有描述这个，只是为了实现方便，不然每个属性都要用__DefineOwnProperty__
    function _initOwnProperty (props) {
        for (var k in props) {  
            _attribute.__Value__ = props[k];
            _oop[k] = new ES_ST_PropertyDescriptor(_attribute);
        }
    }

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
        "undefined",
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
    _initOwnProperty({
        eval : function () {},
        parseInt : function (string) {},
        parseFloat : function (string) {},
        isNaN : function (number) {},
        isFinite : function (number) {},
        decodeURI : function (encodedURI) {},
        decodeURIComponent : function (encodedURIComponent) {},
        encodedURI : function (uri) {},
        encodedURIComponent : function (uriComponent) {}
    };

    //全局对象的构造器属性, 可以用new 
    _initOwnProperty({
        "Object" : ES_objectConstructor,
        "Function" : ES_functionConstructor,
        "Array" : ES_arrayConstructor,
        "String" : ES_stringConstructor,
        "Boolean" : ES_booleanConstructor,
        "Number" : ES_numberConstructor,
        "Date" : ES_dateConstructor,
        "RegExp" : ES_regExpConstructor,
        "Error" : ES_errorConstructor,
        "EvalError" : ES_evalErrorConstructor,
        "RangeError" : ES_RangeErrorConstructor,
        "ReferenceError" : ES_referenceErrorConstructor,
        "SyntaxError" : ES_syntaxErrorConstructor,
        "TypeError" : ES_typeErrorConstructor,
        "URIError" ES_uriErrorConstructor 
    });
    //全局对象的其他属性
    _initOwnProperty({
        "Math" : , //15.8
        "JSON" :   //15.2
    });

    return obj;
})();
