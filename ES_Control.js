//全局控制器
var ES_control = (function () {
    var runningEC = ES_globalEC,
        ecStack = [ES_globalEC];

    return {
        ecStack : ecStack,
        runningEC : runningEC,
        enter : function (ec) {
            ecStack.push(ec);
            this.runningEC = ecStack[ecStack.length - 1];
        },
        quit : function () {
            ecStack.pop();
            this.runningEC = ecStack[ecStack.length - 1];
        },

        run : function (code) {
            var _code = code.code,
                i = 0,
                line;
            while (line = _code[i++]) {
                if (!ES_Global.isFunctionDeclaration(line) && !ES_Global.isVariableDeclaration(line)) {
                    this.execute(line);
                }
            }
            //window[code.type][code.exp].call(null, code.args)
            return {
                type : "return",
                value : {},
                target : this.runningEC
            };
        },
        execute : function (expr) {
            return window[expr.type][expr.exp].apply(null, expr.args);
        }
    };
})();