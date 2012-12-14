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
            console.log('enter, curEC:', ES_control.runningEC);
        },
        quit : function () {
            ecStack.pop();
            this.runningEC = ecStack[ecStack.length - 1];
            console.log('quit, curEC:', runningEC);
        },
        execute : function (code) {
            //window[code.type][code.exp].call(null, code.args)
            return {
                type : "return",
                value : {},
                target : this.runningEC
            };
        }
    };
})();