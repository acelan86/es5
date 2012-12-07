/**
 * 执行上下文对象
 */
function ExecuteContext(lex, thiz) {
    this.LexicalEnvironment = lex;
    this.VarEnvironment = lex;
    this.thisArg = thiz;
}