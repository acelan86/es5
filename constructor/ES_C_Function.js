function ES_C_Function(p1, p2, ..., pn, body) {
    this.__Class__ = 'Function';
    this.__Prototype__ = ES_BI_FunctionPrototype;
    this.__Extensible__ = true;


    var argCount = arguments.length;//参数总数， 包括body
    var p = '';
    if (argCount === 0) {
        var body = '';
    } else if (argCount === 1) {
        body = arguments[0];
    } else {
        //argCount > 1
        var firstArg = arguments[0];
        p = ES_Global.toString(firstArg);
        var k = 2;
        while (k < argCount) {
            var nextArg = arguments[k - 1];
            p = p + ',' + ES_Global.toString(nextArg);
            k++;
        }
        body = arguments[k - 1];
    }
    body = ES_Global.toString(body);
    if (p isnot FormalParameterListopt) {
        throw new SyntaxError();
    }
    if (body isnot FunctionBody) {
        throw new SyntaxError();
    }
    var strict;
    if (body is strict) {
        strict = true;
    } else {
        strict = false;
    }
    if (strict) {
        throw Error(); //13.1 todo
    }
    return new ES_createFunctionObject(p, body, scope, strict);
}

ES_C_Function.prototype = ES_BI_FunctionPrototype;

ES_C_Function.length = 1;