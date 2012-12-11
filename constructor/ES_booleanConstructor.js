var ES_booleanConstructor = (function () {
	var obj = new ES_Object({
		__Prototype__ : ES_functionPrototype
	});

	obj.__DefineOwnProperty__(
		"es_length",
		new ES_ST_PropertyDescriptor({
			__Writable__ : false,
			__Enumerable__ : false,
			__Configurable__ : false,
			__Value__ : 1
		}),
		false
	);

	obj.__DefineOwnProperty__(
		"es_prototype",
		new ES_ST_PropertyDescriptor({
			__Writable__ : false,
			__Enumerable__ : false,
			__Configurable__ : false,
			__Value__ : ES_booleanPrototype
		}),
		false
	);

	obj._func = function (value) {
		return ES_Global.toBoolean(value);
	};
	obj._new = function (value) {
		value = obj._func(value);
		var bo = new ES_Object({
			__Prototype__ : ES_booleanPrototype,
			__Class__ : "Boolean",
			__PrimitiveValue__ : value,
			__Extensible__ : true
		});
		return bo;
	};
	return obj;
})();