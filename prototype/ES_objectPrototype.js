var ES_objectPrototype = (function () {
    var op = new ES_Object({
        __Prototype__ : null,
        __Class__ : 'Object',
        __Extensible__ : true
    });

    //下面其实都是用op.__DefineOwnProperty__定义的属性，为命名数据属性或者命名访问器属性，这样写就是为了方便
    op.constructor = ES_objectConstructor;
    op.toString = function () {};
    op.toLocalString = function () {};
    op.toLocalString = function () {};
    op.valueOf = function () {};
    op.hasOwnProperty = function (v) {
        var p = ES_Global.toString(v),
            o = ES_Global.toObject(this),
            desc = o.__GetOwnProperty__(p);
        return desc !== undefined;
    };
    op.isPrototypeOf = function () {};
    op.propertyIsEnumerable = function (v) {};

    return op;
})();
