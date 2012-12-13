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
        execute : function (expression) {
            expression = expression || [],
            //代表一种表达式执行方案
            function executeExpression (runningEC, expression) {
                var type = 'return|throw|normal',
                    r = {/*执行结果*/},
                    other = {/*其他附加*/};
                return [type, r, other];
            }
            return executeExpression(runningEC, expression);
        }
    };
})();