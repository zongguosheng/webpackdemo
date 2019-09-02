// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,   // 此项是用来告诉eslint找当前配置文件不能往父级查找
  parserOptions: {
    parser: 'babel-eslint', // 解析器，默认使用Espree
    "ecmaVersion": 6 // 支持es6语法，但并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型）
    // "sourceType": "module"	// 指定来源的类型，"script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
  },
  env: {
    es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
    // node: true, // Node.js 全局变量和 Node.js 作用域
    browser: true, // 浏览器全局变量
    // jquery: true // jQuery 全局变量
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
    // 'html',
  ],
  // add your custom rules here
   /* 
   下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
    // 不需要
    // "space-before-function-paren": 0,  // 函数定义时括号前面要不要有空格
    // "eol-last": 0,  // 文件以单一的换行符结束
    "no-extra-semi": 0, // 可以多余的冒号
    "semi": 0,  // 语句可以不需要分号结尾
    "eqeqeq": 0, // 必须使用全等
    "one-var": 0, // 连续声明
    "no-undef": 0, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-unused-vars": 1, // 禁止出现未使用过的变量
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
