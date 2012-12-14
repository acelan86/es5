/**
 * 执行上下文对象
 */
function ES_ExecuteContext(lex, thiz, _name) {
    this.lexicalEnvironment = lex;
    this.varEnvironment = lex;
    this.thisBinding = thiz;
    this._name = _name; //用来标识而已
}
/**
 * 创建一个新的执行环境
 * caller.funcObj(args);
 */
function ES_createExecuteContext(funcObj, args, thisArg) {
    var thiz,
        isStrict = false,
        args = args || [],
        _num = 0;

    //1、确定this
    if (ES_Global.isStrictCode(funcObj.__Code__)) {
        thiz = thisArg;
        isStrict = true;
    } else if (thiz === null || thiz === undefined) {
        thiz = ES_globalObject;
    } else if (ES_Global.type(thisArg) !== "ES_LT_Object") {
        thiz = ES_Global.toObject(thisArg);
    } else {
        thiz = thisArg;
    }
    //2、建立词法环境,建立执行环境
    var localEnv = ES_ST_LexicalEnvironment.newDeclarativeEnvironment(funcObj.__Scope__),
        ec = new ES_ExecuteContext(localEnv, thiz, 'EC' + (_num++));
    return ec;
};

/**
 * 定义绑定初始化方法
 * @param  {ExecuteContext} ec      当前执行上下文
 * @param  {code}           code    当前调用者提供的代码
 */
function ES_declarationBindingInstantiation(code, args, argNames) {
    var ec = ES_control.runningEC,
        envRec = ec.varEnvironment.environmentRecords,
        strict = ES_control.isStrict || false,
        configurableBindings = false,
        _code = code.code;
    if (ES_Global.isEvalCode(code)) {
        configurableBindings = true;
    }

    if (ES_Global.isFunctionCode(code)) {
        var func = ES_createFunctionObject(argNames, code, ec, strict);
        argNames = argNames.split(',');
        var argCount = args.length;
        var n = 0,
            v = null;
        for (; n < argNames.length; n++) {
            if (n > argCount) {
                v = undefined;
            } else {
                v = args[n];
            }
            var argAlreadyDeclared = envRec.hasBinding(argNames[n]);
            if (argAlreadyDeclared === false) {
                envRec.createMutableBinding(argNames[n]);
            }
            envRec.setMutableBinding(argNames[n], v, strict);
        }
    }
    //绑定函数声明
    var fn, fo, linenum = 0, line;
    while (line = _code[linenum++]) {
        if (ES_Global.isFunctionDeclaration(line) === true) {
            fn = line.args[0]; //标识符
            //old
            //fo = new ES_createFunctionObject(line.args[1], line.args[2], ec, isStrict);
            //更新描述为
            fo = ES_FunctionDefinition["FD : function id(par) {body}"](fn, line.args[1], line.args[2]);

            var argAlreadyDeclared = envRec.hasBinding(fn);
            if (argAlreadyDeclared === false) {
                envRec.createMutableBinding(fn, configurableBindings);
            } else if (envRec === ES_globalEC.varEnvironment.environmentRecords){
                var go = ES_globalObject;
                var existingProp = go.__GetProperty__(fn);
                if (existingProp.__Configurable__ === true) {
                    go.__DefineOwnProperty__(
                        fn,
                        new ES_ST_PropertyDescriptor({
                            __Value__       : undefined,
                            __Writable__    : true,
                            __Enumerable__  : true,
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

    var argumentsAlreadyDeclared = envRec.hasBinding("arguments");
    if (ES_Global.isFunctionCode(code) && argumentsAlreadyDeclared === false) {
        var argsObj = ES_createArgumentsObject(func, argNames, args, envRec, strict);
        if (strict === true) {
            envRec.createImmutableBinding("arguments");
            envRec.initializeImmutableBinding("arguments", argsObj);
        } else {
            envRec.createMutableBinding("arguments");
            envRec.setMutableBinding("arguments", argsObj, false);
        }
    }

    //绑定内部变量声明
    var d, dn, linenum = 0, line;
    while (line = _code[linenum++]) {
        if (ES_Global.isVariableDeclaration(line) || ES_Global.isVariableDeclarationNoIn(line)) {
            dn = line.args[0];
            var varAlreadyDeclared = envRec.hasBinding(dn);
            //解释了同一个lexicalEnv下，同名的变量定义无法覆盖同名函数定义
            if (varAlreadyDeclared === false) {
                envRec.createMutableBinding(dn, configurableBindings);
                envRec.setMutableBinding(dn, undefined, strict);
            }
        }
    }
};