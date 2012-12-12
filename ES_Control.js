//全局控制器
var ES_control = (function () {
    var runningEC = ES_globalEC,
        ecStack = [ES_globalEC];

    return {
        enter : function (ec) {
            ecStack.push(ec);
            runningEC = ecStack[ecStack.length - 1];
        },
        quit : function () {
            ecStack.pop();
            runningEC = ecStack[ecStack.length - 1];
        },
        execute : function (code) {
            code = code || [];
            console.debug(runningEC, code);
            return {
                type : code[code.length - 1]
            };
        }
    };
})();