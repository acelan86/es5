function ES_Object(o) {
    /**
     * ES_Object是一个属性的集合，属性(property)的表述如下：
     * this._ownProperty[propertyName] = new ES_PropertyIdentifier(o);
     */
    this._ownProperty = {}; //为表述语言自行添加的，定义中无该集合
    
    //内部属性
    this.__Prototype__ = o.__Prototype__ || null; //此对象原型，为ES_Object || null
    this.__Class__ = o.__Class__; //此对象分类的一个字符串，原生对象占用"Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String"，宿主对象可以为除这些值之外的任何字符串
    this.__Extensible__ = o.__Extensible__ || false; //是否可以向对象添加自身属性（ownProperty）
}

ES_Object.prototype = {
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
     * @param  {String} propertyName 属性名
     * @return {PropertyDescriptor}  属性描述符
     */
    __GetOwnProperty__ : function (propertyName) {
        if ('undefined' === typeof this._ownProperty[propertyName]) {
            return undefined;
        }
        var desc = new PropertyDescriptor({}),
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
     * @param  {String} propertyName 属性名
     * @return {PropertyDescriptor}  属性描述符
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

    __Put__ : function (propertyName, value, throw) {
        if (!this.__Canput__(propertyName)) {
            if (throw) {
                throw new TypeError();
            } else {
                return;
            }
        }

        var ownDesc = this.__GetOwnProperty__(propertyName);
        if (PropertyDescriptor.isDataDescriptor(ownDesc)) {
            var valueDesc = new PropertyDescriptor({
                __Value__ : value
            });
            this.__DefineOwnProperty__(propertyName, valueDesc, throw);
            return;
        }
        var desc = this.__GetProperty__(propertyName);
        if (PropertyDescriptor.isAccessorDescriptor(desc)) {
            var setter = desc.__Set__;
            setter.__Call__.call(this, value);
        } else {
            var newDesc = new PropertyDescriptor({
                __Value__ : value,
                __Writable__ : true,
                __Enumerable__ : true,
                __Configurable__ : true
            });
            this.__DefineOwnProperty__(propertyName, newDesc, throw);
        }
        return;
    },

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

    __HasProperty__ : function (propertyName) {
        return Boolean;
    },

    __Delete__ : function (propertyName, Boolean) {
        return Boolean;
    },

    __DefaultValue__ : function (Hint) {
        return primitive;
    },

    __DefineOwnProperty__ : function (propertyName, PropertyDescriptor, Boolean) {
        return Boolean
    }
};