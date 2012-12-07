/**
 * 定义绑定初始化方法
 * @param  {ExecuteContext} ec 		当前执行上下文
 * @param  {code} 			code 	当前调用者提供的代码
 */
function declarationBindingInstantiation(ec, code, isStrict, [args]) {
	var envRec = ec.varEnvironment.environmentRecords,
		configurableBindings = false,
		strict = false;
	if (code is evalCode) {
		configurableBindings = true;
	}
	strict = isStrict;
	if (code is funcCode) {
		var func = new ES_Function({
			__Call__ : code
		});
		var names = func.__FormalParameters__;
		var argCount = args.length;
		var n = 0,
			v = null;
		for (var argName in names) {
			n++;
			if (n > argCount) {
				v = undefined;
			} else {
				v = args[n];
			}
			var argAlreadyDeclared = envRec.hasBinding(argName);
			if (argAlreadyDeclared === false) {
				envRec.createMutableBinding(argName);
			}
			envRec.setMutableBinding(argName, v, strict);
		}
	}
	//遍历每一句code
	var f, fn, fo;
	for (var linenum = 1, len = code.length; linenum < len; linenum++) {
		if (f = code[linenum] is FunctionDeclaration) {
			fn = f.identifier; //标识符
			fo = new ES_Function({
				__Code__ : f
			});
			var argAlreadyDeclared = envRec.hasBinding(fn);
			if (argAlreadyDeclared === false) {
				envRec.createMutableBinding(fn, configurableBindings);
			} else if (envRec === global.varEnvironment.environmentRecords){
				var go = globalObject;
				var existingProp = go.__GetProperty__(fn);
				if (existingProp.__Configurable__ === true) {
					go.__DefineOwnProperty__(
						fn,
						new ES_ST_PropertyDescriptor({
							__Value__		: undefined,
							__Writable__	: true,
							__Enumerable__	: true,
							__Configurable__: configurableBindings
						}),
						true
					);
				} else if (ES_ST_PropertyDescriptor.isAccessorDescriptor(existingProp) === true || !(existingProp.__Writable__ === true && existingProp.__Enumerable__ === true)) {
					throw new TypeError();
				}
			}
			envRec.setMutableBinding(fn, fo, strict);
		}
	}

	var argumentsAlreadyDeclared = envRec.hasBinding(arguments);
	if (code is funcCode && argumentsAlreadyDeclared === false) {
		var argsObj = ES_Arguments.createArgumentsObject(fn, names, args, envRec, strict);
		if (strict === true) {
			envRec.createImmutableBinding("arguments");
			envRec.initializeImmutableBinding("arguments", argsObj);
		} else {
			envRec.createMutableBinding("arguments");
			envRec.setMutableBinding("arguments", argsObj, false);
		}
	}

	var d, dn;
	for (var linenum = 1, len = code.length; linenum < len; linenum++) {
		if (d = code[linenum] is VariableDeclaration || d = code[linenum] is VariableDeclarationNoIn) {
			dn = d.identifier;
			var varAlreadyDeclared = envRec.hasBinding(dn);
			if (varAlreadyDeclared === false) {
				envRec.createMutableBinding(dn, configurableBindings);
				envRec.setMutableBinding(dn, undefined, strict);
			}
		}
	}
}