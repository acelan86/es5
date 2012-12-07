/**
 * 词法环境对象
 */
function LexicalEnvironment(envRec, outerLex) {
    this.environmentRecords = envRec;
    this.outerLexicalEnvironment = outerLex;
}