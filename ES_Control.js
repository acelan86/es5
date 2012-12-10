var ES_control = {
    runningEC : null,
    ecStack : [ES_globalObject]
};

ES_control.enter = function (ec) {
    this.ecStack.push(ec);
    this.runningEC = this.ecStack[this.ecStack.length - 1];
}
ES_control.excute = function (code) {
    return this.runningEC.excute(code);
};

ES_control.quit = function () {
    this.ecStack.pop();
    this.runningEC = this.ecStack[this.ecStack.length - 1];
}