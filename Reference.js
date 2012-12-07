/**
 * 引用类型对象
 */
function Reference(base, name, strict) {
    this.baseValue = base; //undefined, Object, Boolean, Number, environmentRecord
    this.referenceName = name;
    this.strictReference = strict;
}
Reference.prototype = {
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
        return this.baseValue === Boolean, String, Number;
    },
    isPropertyReference : function () {
        return this.baseValue === Boolean, String, Number, Object;
    },
    isUnresolvableReference : function () {
        return this.basValue === undefined;
    }
};

Reference.getValue = function (ref) {
    if (Type(ref) !== Reference) {
        return ref;
    }
    var base = ref.getBase();
    //base === undefined;
    if (ref.isUnresolvableReference()) {
        return new ReferenceError();
    } 
    //base !== envrionmentRecords;
    if (ref.isPropertyReference()) {
        var get = null;
        if (!ref.hasPrimitiveBase()) {
            get = base.[[Get]];
        } else {
            var o = ToObject(base);
            //todo 未详细
            get = xxxx; 
        }
        return get(ref.getReferencedName());
    }
    //base === envrionmentRecords
    return base.getBindingValue(ref.getReferencedName(), ref.isStrictReference());
};

Reference.putValue = function (ref, W) {
    if (Type(ref) !== Reference) {
        throw new ReferenceError();
    }
    var base = ref.getBase();
    if (ref.isUnresolvableReference()) {
        if (ref.isStrictReference()) {
            throw new ReferenceError();
        }
        globalObj.[[Put]](ref.getReferencedName(), W, false);
    } else if (ref.isPropertyReference()) {
        var put = null;
        if (!ref.hasPrimitiveBase()) {
            put = base.[[Put]];
        } else {
            var o = ToObject(base);
            put = .....
        }
        put.call(base, ref.getReferencedName(), W, ref.isStrictReference());
    }
    return base.setMutableBinding(ref.getReferencedName(), W, ref.isStrictReference());
};