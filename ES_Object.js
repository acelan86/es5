function ES_Object() {

	//命名的数据属性
	this.__Value__ = undefined;
	this.__Writable__ = false;
	this.__Enumerable__ = false;
	this.__Configurable__ = false;

	//命名的访问器属性
	this.__Get__ = undefined;
	this.__Set__ = undefined;
	this.__Enumerable__ = false;
	this.__Configurable__ = false;

	//内部属性及方法
	this.__Prototype__ = Object || null;
	this.__Class__ = String;
	this.__Extensible__ = Boolean;
}

ES_Object.prototype = {
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

	__GetOwnProperty__ : function (propertyName) {
		if ('undefined' === typeof this[propertyName]) {
			return undefined;
		}
		var descriptor = new PropertyDescriptor(),
			x = this[propertyName];
		if (PropertyDescriptor.isDataDescriptor(x)) {
			descriptor.__Value__ = x.__Value__;
			descriptor.__Writable__ = x.__Writable__;
		} else {
			descriptor.__Get__ = x.__Get__;
			descriptor.__Set__ = x.__Set__;
		}

		descriptor.__Enumerable__ = x.__Enumerable__;
		descriptor.__Configurable__ = x.__Configurable__;

		return descriptor;
	},

	__GetProperty__ : function (propertyName) {
		var prop = this.__GetOwnProperty__(propertyName);
		if (prop !== undefined) {
			return prop;
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