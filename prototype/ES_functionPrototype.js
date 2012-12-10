var ES_functionPrototype = (function () {
    var fp = new ES_Object({
        __Class__ : 'Function',
        __Prototype__ : ES_objectPrototype,
        __Extensible__ : true
    });

    //命名的数据或访问器属性
    fp.length = 0;
    fp.constructor = ES_functionCounstructor;
    fp.toString = function () {};
    fp.apply = function (thisArg, argArray) {};
    return fp;
})();
