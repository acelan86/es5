/**
 * 引用规范类型(specification types)
 */
function ES_ST_Reference(base, name, strict) {
    this._constructor = 'ES_ST_Reference';
    this.baseValue = base; //undefined, ES_LT_Object, Boolean, Number, String, ES_ST_EnviornmentRecords
    this.referenceName = name;
    this.strictReference = strict;
}
ES_ST_Reference.prototype = {
    getBase : function () {
        return this.baseValue;
    },
    getReferencedName : function() {
        return this.referenceName;
    },
    isStrictReference : function () {
        return this.strictReference;
    },
    hasPrimitiveBase : function () {
        var type = ES_Global.type(this.baseValue);
        return type === 'boolean' || type === 'string' || type === 'number';
    },
    isPropertyReference : function () {
        var type = ES_Global.type(this.baseValue);
        return type === 'boolean' || type === 'string' || type === 'number' || type === 'ES_LT_Object';
    },
    isUnresolvableReference : function () {
        return this.baseValue === undefined;
    }
};

ES_ST_Reference.getValue = function (ref) {
    if (ES_Global.type(ref) !== "ES_ST_Reference") {
        return ref;
    }
    var base = ref.getBase();
    //base === undefined;
    if (ref.isUnresolvableReference()) {
        return new ReferenceError();
    } 
    //base !== envrionmentRecords;
    if (ref.isPropertyReference()) {
        if (!ref.hasPrimitiveBase()) {
            //base is ES_LT_Object
            return base.__Get__(ref.getReferencedName());
        } else {
            var o = ES_Global.toObject(base);
            //todo 未详细
            var desc = o.__GetProperty__(ref.getReferencedName());
            if (desc === undefined) {
                return undefined;
            }
            if (ES_ST_PropertyDescriptor.isDataDescriptor(desc) === true) {
                return desc.__Value__;
            }
            //ES_ST_PropertyDescriptor.isAccessorDescriptor(desc) === true
            var getter = desc.__Get__;
            if (getter === undefined) {
                return undefined;
            }
            return getter.__Call__.call(base);
        }
    }
    //base is ES_ST_EnvironmentRecords
    return base.getBindingValue(ref.getReferencedName(), ref.isStrictReference());
};

ES_ST_Reference.putValue = function (ref, value) {
    if (ES_Global.type(ref) !== "ES_ST_Reference") {
        throw new ReferenceError();
    }
    var base = ref.getBase();
    //base === undefined
    if (ref.isUnresolvableReference()) {
        if (ref.isStrictReference()) {
            throw new ReferenceError();
        }
        return ES_globalObject.__Put__(ref.getReferencedName(), value, false);
    } else if (ref.isPropertyReference()) {
        var putter = null;
        if (!ref.hasPrimitiveBase()) {
            //base is ES_LT_Object
            return base.__Put__(ref.getReferencedName(), value, ref.isStrictReference());
        } else {
            var o = ES_Global.toObject(base);
            if (o.__CanPut__(ref.getReferencedName()) === false) {
                if (isThrow) {
                    throw new TypeError();
                } else {
                    return;
                }
            }
            var ownDesc = o.__GetOwnProperty__(ref.getReferencedName());
            if (ES_ST_PropertyDescriptor.isDataDescriptor(ownDesc) === true) {
                if (isThrow) {
                    throw new TypeError();
                } else {
                    return;
                }
            }
            var desc = o.__GetProperty__(ref.getReferencedName());
            if (ES_ST_PropertyDescriptor.isAccessorDescriptor(desc) === true) {
                var setter = desc.__Set__;
                if (setter !== undefined) {
                    setter.__Call__.call(this, value);
                }
            }
            //在临时对象上创建自身属性
            if (isThrow) {
                throw new TypeError();
            }
            return;
        }
    }
    //base is ES_ST_EnvironmentRecords;
    return base.setMutableBinding(ref.getReferencedName(), value, ref.isStrictReference());
};