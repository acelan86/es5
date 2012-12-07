function Object() {

	//命名的数据属性
	this.[[Value]] = undefined;
	this.[[Writable]] = false;
	this.[[Enumerable]] = false;
	this.[[Configurable]] = false;

	//命名的访问器属性
	this.[[Get]] = undefined;
	this.[[Set]] = undefined;
	this.[[Enumerable]] = false;
	this.[[Configurable]] = false;

	//内部属性及方法
	this.[[Prototype]] = Object || null;

	this.[[Class]] = String;

	this.[[Extensible]] = Boolean;

	this.[[Get]] = function (propertyName) {
		var desc = this.[[GetProperty]](propertyName);
		if (desc === undefined) {
			return undefined;
		}
		if (PropertyDescriptor.isDataDescriptor(desc)) {
			return desc.[[Value]];
		} else {
			var getter = desc.[[Get]];
			if (getter === undefined) {
				return undefined;
			} else {
				return getter.[[Call]].call(this); //怎么做？
			}
		}
	};

	this.[[GetOwnProperty]] = function (propertyName) {
		if ('undefined' === typeof this[propertyName]) {
			return undefined;
		}
		var descriptor = new PropertyDescriptor(),
			x = this[propertyName];
		if (PropertyDescriptor.isDataDescriptor(x)) {
			descriptor.[[Value]] = x.[[Value]];
			descriptor.[[Writable]] = x.[[Writable]];
		} else {
			descriptor.[[Get]] = x.[[Get]];
			descriptor.[[Set]] = x.[[Set]];
		}

		descriptor.[[Enumerable]] = x.[[Enumerable]];
		descriptor.[[Configurable]] = x.[[Configurable]];

		return descriptor;
	};

	this.[[GetProperty]] = function (propertyName) {
		var prop = this.[[GetOwnProperty]](propertyName);
		if (prop !== undefined) {
			return prop;
		}
		var proto = this.[[Prototype]];
		if (proto === null) {
			return undefined;
		}
		return proto.[[GetProperty]](propertyName);
	};

	this.[[Put]] = function (propertyName, value, throw) {
		if (!this.[[Canput]](propertyName)) {
			if (throw) {
				throw new TypeError();
			} else {
				return;
			}
		}

		var ownDesc = this.[[GetOwnProperty]](propertyName);
		if (PropertyDescriptor.isDataDescriptor(ownDesc)) {
			var valueDesc = new PropertyDescriptor({
				[[Value]] : value
			});
			this.[[DefineOwnProperty]](propertyName, valueDesc, throw);
			return;
		}
		var desc = this.[[GetProperty]](propertyName);
		if (PropertyDescriptor.isAccessorDescriptor(desc)) {
			var setter = desc.[[Set]];
			setter.[[Call]].call(this, value);
		} else {
			var newDesc = new PropertyDescriptor({
				[[Value]] : value,
				[[Writable]] : true,
				[[Enumerable]] : true,
				[[Configurable]] : true
			});
			this.[[DefineOwnProperty]](propertyName, newDesc, throw);
		}
		return;
	};

	this.[[CanPut]] = function (propertyName) {
		var desc = this.[[GetOwnProperty]](propertyName);
		if (desc !== undefined) {
			if (PropertyDescriptor.isAccessorDescriptor(desc)) {
				return desc.[[Set]] !== undefined;
			} else {
				return desc.[[Writable]];
			}
		}
		var proto = this.[[Prototype]];
		if (proto === null) {
			return this.[[Extensible]];
		}

		var inherited = proto.[[GetProperty]](propertyName);
		if (inherited === undefined) {
			return this.[[Extensible]];
		}
		if (PropertyDescriptor.isAccessorDescriptor(inherited)) {
			return inherited.[[Set]] !== undefined;
		}
		if (!this.[[Extensible]]) {
			return false;
		} else {
			return inherited.[[Writable]];
		}
 	};

	this.[[HasProperty]] = function (propertyName) {
		return Boolean;
	};

	this.[[Delete]] = function (propertyName, Boolean) {
		return Boolean;
	};

	this.[[DefaultValue]] = function (Hint) {
		return primitive;
	};

	this.[[DefineOwnProperty]] = function (propertyName, PropertyDescriptor, Boolean) {
		return Boolean
	}
}