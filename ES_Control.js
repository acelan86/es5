//全局控制器
var ES_control = (function () {
    var runningEC = ES_globalEC,
        ecStack = [ES_globalEC];

    return {
        runningEC : runningEC,
        enter : function (ec) {
            ecStack.push(ec);
            runningEC = ecStack[ecStack.length - 1];
        },
        quit : function () {
            ecStack.pop();
            runningEC = ecStack[ecStack.length - 1];
        },
        execute : function (expression) {
            expression = expression || [];
            //代表一种表达式执行方案
            function executeExpression(runningEC, expression) {
                var type = 'return|throw|normal',
                    value = {/*执行结果*/},
                    target = {/*其他附加*/};
                return {
                    type : type,
                    value : value,
                    target : target
                };
            }
            return executeExpression(runningEC, expression);
        }
    };
})();