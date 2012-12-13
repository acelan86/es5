var ES_globalEC = (function () {
    var ec = new ES_ExecuteContext(
        ES_ST_LexicalEnvironment.newObjectEnvironment(ES_globalObject, null),
        ES_globalObject
    );
    return ec;
})();