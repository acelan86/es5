//全局控制器
var ES_control = (function () {
    var runningEC = ES_globalEC,
        ecStack = [ES_globalEC];

    return {
        runningEC : runningEC,
        enter : function (ec) {
            ecStack.push(ec);
            runningEC = ecStack[ecStack.length - 1];
            console.log('enter, curEC:', runningEC);
        },
        quit : function () {
            ecStack.pop();
            runningEC = ecStack[ecStack.length - 1];
            console.log('quit, curEC:', runningEC);
        },
        execute : function (code) {
            return {
                type : "return",
                value : window[code.type][code.exp].call(null, code.args),
                target : runningEC
            };
        }
    };
})();