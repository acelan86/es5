/**
 * 属性描述符（规范类型）
 * _t用来区分是类型的属性（访问器， 数据， 或者其他，默认为数据属性）
 */
function ES_ST_PropertyDescriptor(o, _t) {
    switch (_t) {
        case 'accessor' : 
            this._t = 'accessor';
            this.__Get__ = 'undefined' !== typeof o.__Get__ ? o.__Get__ : undefined;
            this.__Set__ = 'undefined' !== typeof o.__Set__ ? o.__Set__ : undefined;
            break;
        case 'generic' : 
            this._t = 'generic';
            break;
        default : 
            this._t = 'data';
            this.__Value__ = 'undefined' !== typeof o.__Value__ ? o.__Value__ : undefined;
            this.__Writable__ = 'undefined' !== typeof o.__Writable__ ? o.__Writable__ : false;
            break;
    }
    //公共属性
    this.__Enumerable__ = 'undefined' !== typeof o.__Enumerable__ ? o.__Enumerable__ : false; //是否可被for-in枚举
    this.__Configurable__ = 'undefined' !== typeof o.__Configurable__ ? o.__Configurable__ : false;//是否可删除，是否可以改变属性性质（数据或访问器属性），是否可以改变attributes(指命名的数据属性或者命名的访问器属性是否可改？)
}

/**
 * 判断是否为访问器属性
 * @param  {ES_ST_PropertyDescriptor}  desc 属性描述符
 * @return {Boolean}                     是否时访问器属性
 */
ES_ST_PropertyDescriptor.isAccessorDescriptor = function (desc) {
    if ('undefined' === typeof desc) {
        return false;
    }
    if (desc._t === 'accessor' || 'undefined' !== typeof desc.__Get__ || 'undefined' !== typeof desc.__Set__) {
        return true;
    }
    //ES描述如下才是正确的
    // if ('undefined' !== typeof desc.__Get__ || 'undefined' !== typeof desc.__Set__) {
    //     return true;
    // }
    return false;
};

/**
 * 判断是否为数据属性
 * @param  {ES_ST_PropertyDescriptor}  desc 属性描述符
 * @return {Boolean}                     是否为数据属性
 */
ES_ST_PropertyDescriptor.isDataDescriptor = function (desc) {
    if (desc === undefined) {
        return false;
    }
    if (desc._t === 'data' || 'undefined' !== typeof desc.__Value__ || 'undefined' !== typeof desc.__Writable__) {
        return true;
    }
    return false;
};

/**
 * 判断是否为普通属性
 * @param  {ES_ST_PropertyDescriptor}  desc 属性描述符
 * @return {Boolean}                     是否为普通属性
 */
ES_ST_PropertyDescriptor.isGenericDescriptor = function (desc) {
    if (desc === undefined) {
        return false;
    }
    if (!ES_ST_PropertyDescriptor.isAccessorDescriptor(desc) && !ES_ST_PropertyDescriptor.isDataDescriptor(desc)) {
        return true;
    }
    return false;
};


ES_ST_PropertyDescriptor.fromPropertyDescriptor = function (desc) {
    if (desc === undefined) {
        return false;
    }
    var obj = ES_objectConstructor.__Construct__();
    if (ES_ST_PropertyDescriptor.isDataDescriptor(desc)) {
        obj.__DefineOwnProperty__(
            "value",
            new ES_ST_PropertyDescriptor({
                __Value__       : desc.__Value__,
                __Writable__    : true,
                __Enumerable__  : true,
                __Configurable__: true
            }),
            false
        );

        obj.__DefineOwnProperty__(
            "writable",
            new ES_ST_PropertyDescriptor({
                __Value__       : desc.__Writable__,
                __Writable__    : true,
                __Enumerable__  : true,
                __Configurable__: true
            }),
            false
        );
    } else {
        //ES_ST_PropertyDescriptor.isAccessorDescriptor(desc) === true
        obj.__DefineOwnProperty__(
            "get",
            new ES_ST_PropertyDescriptor({
                __Value__       : desc.__Get__,
                __Writable__    : true,
                __Enumerable__  : true,
                __Configurable__: true
            }),
            false
        );
        obj.__DefineOwnProperty__(
            "set",
            new ES_ST_PropertyDescriptor({
                __Value__       : desc.__Set__,
                __Writable__    : true,
                __Enumerable__  : true,
                __Configurable__: true
            }),
            false
        );
    }

    obj.__DefineOwnProperty__(
        "enumerable",
        new ES_ST_PropertyDescriptor({
            __Value__       : desc.__Enumerable__,
            __Writable__    : true,
            __Enumerable__  : true,
            __Configurable__: true
        }),
        false
    );
    obj.__DefineOwnProperty__(
        "configurable",
        new ES_ST_PropertyDescriptor({
            __Value__       : desc.__Configuable__,
            __Writable__    : true,
            __Enumerable__  : true,
            __Configurable__: true
        }),
        false
    );
    return obj;
};

ES_ST_PropertyDescriptor.toPropertyDescriptor = function (obj) {
    if (ES_Global.type(obj) !== "ES_LT_Object") {
        throw new TypeError();
    }
    var desc = new ES_ST_PropertyDescriptor({});
    if (obj.__HasProperty__('enumerable') === true) {
        var enume = obj.__Get__('enumerable');
        desc.__Enumerable__ = ES_Global.toBoolean(enume);
    }
    if (obj.__HasProperty__('configurable') === true) {
        var conf = obj.__Get__('configurable');
        desc.__Configurable__ = ES_Global.toBoolean(conf);
    }
    if (obj.__HasProperty__('value') === true) {
        var value = obj.__Get__('value');
        desc.__Value__ = value;
    }
    if (obj.__HasProperty__('writable') === true) {
        var writable = obj.__Get__('writable');
        desc.__Writable__ = ES_Global.toBoolean(writable);
    }
     if (obj.__HasProperty__('get') === true) {
        var getter = obj.__Get__('get');
        if (ES_Global.isCallable(getter) === false && getter !== undefined) {
            throw new TypeError();
        }
        desc.__Get__ = getter;
    }
     if (obj.__HasProperty__('set') === true) {
        var setter = obj.__Get__('set');
        if (ES_Global.isCallable(setter) === false && setter !== undefined) {
            throw new TypeError();
        }
        desc.__Set__ = setter;
    }
    if ('undefined' !== typeof desc.__Set__ || 'undefined' !== typeof desc.__Get__) {
        if ('undefined' !== typeof desc.__Value__ || 'undefined' !== typeof desc.__Writable__) {
            throw new TypeError();
        }
    }
    return desc;
};