/**
 * 对象类型 （语言类型）
 * @param {Object} o 初始化参数
 */
function ES_LT_Object(o) {
    /**
     * ES_LT_Object是一个属性的集合，属性(property)的表述如下：
     * this._ownProperty[propertyName] = new ES_ST_PropertyDescriptor(o);
     */
    this._ownProperty = {}; //为表述语言自行添加的，ES规范中并无该集合描述, 如果使用this[propertyName]，由于js的查找变量特点，会找到链中所有的属性而不是自身属性
    
    //内部属性
    this.__Prototype__ = o.__Prototype__ || null; //此对象原型，为ES_LT_Object || null
    this.__Class__ = o.__Class__; //此对象分类的一个字符串，原生对象占用"Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String"，宿主对象可以为除这些值之外的任何字符串
    this.__Extensible__ = o.__Extensible__ || false; //是否可以向对象添加自身属性（ownProperty）
}

ES_LT_Object.prototype = {
    /**
     * 返回命名属性的值
     * @param  {String} propertyName 属性名
     * @return {Any}                 属性值
     */
    __Get__ : function (propertyName) {
        var desc = this.__GetProperty__(propertyName);
        if (desc === undefined) {
            return undefined;
        }
        if (PropertyDescriptor.isDataDescriptor(desc)) {
            return desc.__Value__;
        } else {
            var getter = desc.__Get__;
            if (getter === undefined) {
                return undefined;
            } else {
                return getter.__Call__.call(this); //怎么做？
            }
        }
    },
    /**
     * 返回对象自身属性ownProperty的属性描述符
     * @param  {String}             propertyName 属性名
     * @return {PropertyDescriptor}              属性描述符
     */
    __GetOwnProperty__ : function (propertyName) {
        if ('undefined' === typeof this._ownProperty[propertyName]) {
            return undefined;
        }
        var desc = new ES_PropertyDescriptor({}),
            x = this._ownProperty[propertyName];
        if (PropertyDescriptor.isDataDescriptor(x)) {
            desc.__Value__ = x.__Value__;
            desc.__Writable__ = x.__Writable__;
        } else {
            desc.__Get__ = x.__Get__;
            desc.__Set__ = x.__Set__;
        }

        desc.__Enumerable__ = x.__Enumerable__;
        desc.__Configurable__ = x.__Configurable__;

        return desc;
    },
    /**
     * 返回对象完全填入的自身命名属性的属性描述符，即通过__Property__查找的属性的属性描述符
     * @param  {String}             propertyName    属性名
     * @return {PropertyDescriptor}                 属性描述符
     */
    __GetProperty__ : function (propertyName) {
        var desc = this.__GetOwnProperty__(propertyName);
        if (desc !== undefined) {
            return desc;
        }
        var proto = this.__Prototype__;
        if (proto === null) {
            return undefined;
        }
        return proto.__GetProperty__(propertyName);
    },
    /**
     * 设置命名属性的值
     * @param  {String}     propertyName 属性名
     * @param  {Any}        value        属性值
     * @param  {Boolean}    isThrow        是否抛出错误
     * @return                  
     */
    __Put__ : function (propertyName, value, isThrow) {
        if (!this.__CanPut__(propertyName)) {
            if (isThrow) {
                throw new TypeError();
            } else {
                return;
            }
        }

        var ownDesc = this.__GetOwnProperty__(propertyName);
        if (PropertyDescriptor.isDataDescriptor(ownDesc)) {
            var valueDesc = new ES_PropertyDescriptor({
                __Value__ : value
            });
            this.__DefineOwnProperty__(propertyName, valueDesc, isThrow);
            return;
        }

        var desc = this.__GetProperty__(propertyName);
        if (PropertyDescriptor.isAccessorDescriptor(desc)) {
            var setter = desc.__Set__;
            setter.__Call__.call(this, value);
        } else {
            var newDesc = new ES_ST_PropertyDescriptor({
                __Value__           : value,
                __Writable__        : true,
                __Enumerable__      : true,
                __Configurable__    : true
            });
            this.__DefineOwnProperty__(propertyName, newDesc, isThrow);
        }
        return;
    },
    /**
     * 判断是否可以在某个属性上执行__Put__操作
     * @param  {String}     propertyName 属性名
     * @return {Boolean}                 是否可以put
     */
    __CanPut__ : function (propertyName) {
        var desc = this.__GetOwnProperty__(propertyName);
        if (desc !== undefined) {
            if (PropertyDescriptor.isAccessorDescriptor(desc)) {
                return desc.__Set__ !== undefined;
            } else {
                return desc.__Writable__;
            }
        }
        var proto = this.__Prototype__;
        if (proto === null) {
            return this.__Extensible__;
        }

        var inherited = proto.__GetProperty__(propertyName);
        if (inherited === undefined) {
            return this.__Extensible__;
        }
        if (PropertyDescriptor.isAccessorDescriptor(inherited)) {
            return inherited.__Set__ !== undefined;
        }
        if (!this.__Extensible__) {
            return false;
        } else {
            return inherited.__Writable__;
        }
    },

    /**
     * 判断对象是否有某个属性
     * @param  {String}     propertyName 属性名
     * @return {Boolean}                 是否具有该属性
     */
    __HasProperty__ : function (propertyName) {
        var desc = this.__GetProperty__(propertyName);
        return desc !== undefined;
    },

    /**
     * 从对象上删除指定的自身命名属性
     * @param  {String} propertyName 属性名
     * @param  {[type]} isThrow        是否抛出错误
     * @return {[type]}              是否成功删除
     */
    __Delete__ : function (propertyName, isThrow) {
        var desc = this.__GetOwnProperty__(propertyName);
        if (desc === undefined) {
            return true;
        }
        if (desc.__Configurable__) {
            delete this._ownProperty[propertyName];
            return true;
        } else {
            isThrow && (throw new TypeError());
            return false;
        }
    },
    /**
     * 返回对象的默认值
     * @param  {String}     hint    标识
     * @return {Primitive}          对象默认值
     */
    __DefaultValue__ : function (hint) {
        //当hint为String时
        var toString = this.__Get__('toString');
        if (ES_Global.isCallable(toString)) {
            var str = toString.__Call__.call(this);
            if (isPrimitive(str)) {
                return str;
            }
        }
        var valueOf = this.__Get__('valueOf');
        if (ES_Global.isCallable(valueOf)) {
            var val = valueOf.__Call__.call(this);
            if (isPrimitive(val)) {
                return val;
            }
        }
        throw new TypeError();

        //@todo 当hint为数字
        //@todo 当不用hint调用
    },

    /**
     * 创建或修改自身命名属性为属性描述的状态
     * @param  {String}                 propertyName       属性名
     * @param  {ES_ST_PropertyDescriptor}  propertyDescriptor 属性描述符
     * @param  {Boolean}                isThrow            是否抛出错误
     * @return {Boolean}                                   是否成功 
     */
    __DefineOwnProperty__ : function (propertyName, propertyDescriptor, isThrow) {
        function _denied() {
            if (isThrow) {
                throw new TypeError();
            } else {
                return false;
            }
        }
        var current = this.__GetOwnProperty__(propertyName),
            extensible = this.__Extensible__;
        if (current === undefined && extensible === false) {
            _denied();
        }
        if (current === undefined && extensible === true) {
            if (ES_PropertyIdentifier.isGenericDescriptor(propertyDescriptor) || ES_ST_PropertyIdentifier.isDataDescriptor(propertyDescriptor)) {
                this._ownProperty[propertyName] = new ES_ST_PropertyDescriptor({
                    __Value__           : propertyDescriptor.__Value__,
                    __Writable__        : propertyDescriptor.__Writable__,
                    __Enumerable__      : propertyDescriptor.__Enumerable__,
                    __Configurable__    : propertyDescriptor.__Configurable__
                });
            } else {
                this._ownProperty[propertyName] = new ES_ST_PropertyDescriptor({
                    __Get__             : propertyDescriptor.__Get__,
                    __Set__             : propertyDescriptor.__Set__,
                    __Enumerable__      : propertyDescriptor.__Enumerable__,
                    __Configurable__    : propertyDescriptor.__Configurable__
                });
            }
        }
        if (propertyDescriptor 不存在任何字段) {
            return true;
        }
        if (ES_Global.sameValue(propertyDescriptor, current)) {
            return true;
        }
        if (current.__Configurable__ === false) {
            if (propertyDescriptor.__Configurable__ === true) {
                _denied();
            }
            if ('undefined' !== propertyDescriptor.__Enumerable__ && current.__Enumerable__ !== propertyDescriptor.__Enumerable__) {
                _denied();
            }
        }
        if (!ES_ST_PropertyDescriptor.isGenericDescriptor(propertyDescriptor)) {
            if (ES_ST_PropertyDescriptor.isDataDescriptor(current) !== ES_ST_PropertyDescriptor.isDataDescriptor(propertyDescriptor)) {
                if (current.__Configurable__ === false) {
                    _denied();
                }
                if (ES_ST_PropertyDescriptor.isDataDescriptor(current)) {
                    this._ownProperty[propertyName] = new ES_ST_PropertyDescriptor({
                        __Get__             : undefined,
                        __Set__             : undefined,
                        __Enumerable__      : current.__Enumerable__,
                        __Configurable__    : current.__Configurable__
                    });
                } else {
                    this._ownProperty[propertyName] = new ES_ST_PropertyDescriptor({
                        __Value__           : undefined,
                        __Writable__        : false,
                        __Enumerable__      : current.__Enumerable__,
                        __Configurable__    : current.__Configurable__
                    });
                }
            } else if (ES_ST_PropertyDescriptor.isDataDescriptor(current) === true && ES_ST_PropertyDescriptor.isDataDescriptor(propertyDescriptor) === true) {
                if (current.__Configurable__ === false) {
                    if (current.__Writable__ === false && propertyDescriptor.__Writable__ === true) {
                        _denied();
                    }
                    if (current.__Writable__ === false) {
                        if ('undefined' !== typeof propertyDescriptor.__Value__ && !ES_ST_Global.sameValue(propertyDescriptor.__Value__, current.__Value__)) {
                            _denied();
                        }
                    }
                } 
                //else {
                //     //current.__Configurable__ === true, 可接受任何更改,更改在最后面
                // }
            } else {
                //ES_ST_PropertyDescriptor.isAccessorDescriptor(current) === true && ES_ST_PropertyDescriptor.isAccessorDescriptor(propertyDescriptor) === true;
                if (current.__Configurable__ === false) {
                    if ('undefined' !== typeof propertyDescriptor.__Set__ && !ES_Global.sameValue(propertyDescriptor.__Set__, current.__Set__)) {
                        _denied();
                    }
                    if ('undefined' !== typeof propertyDescriptor.__Get__ && !ES_Global.sameValue(propertyDescriptor.__Get__, current.__Get__)) {
                        _denied();
                    }
                }
            }
            //propertyDescriptor有所有特性字段
            this._ownProperty[propertyName] = new ES_ST_PropertyDescriptor(propertyDescriptor);
            return true;
        }
    }
};