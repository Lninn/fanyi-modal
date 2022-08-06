(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/action.js
var CONTENT_LOAD = 'CONTENT_LOAD';
var TRANSLATE_START = 'TRANSLATE_START';
var TRANSLATE_END = 'TRANSLATE_END';
var TRANSLATE_ERROR = 'TRANSLATE_ERROR';
var COMMEND_ID = 'Translate';
;// CONCATENATED MODULE: ./src/utils.js
// https://stackoverflow.com/questions/1655769/fastest-md5-implementation-in-javascript
//  A formatted version of a popular md5 implementation.
//  Original copyright (c) Paul Johnston & Greg Holt.
//  The function itself is now 42 lines long.
function md5(inputString) {
  var hc = "0123456789abcdef";

  function rh(n) {
    var j,
        s = "";

    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 0x0F) + hc.charAt(n >> j * 8 & 0x0F);
    }

    return s;
  }

  function ad(x, y) {
    var l = (x & 0xFFFF) + (y & 0xFFFF);
    var m = (x >> 16) + (y >> 16) + (l >> 16);
    return m << 16 | l & 0xFFFF;
  }

  function rl(n, c) {
    return n << c | n >>> 32 - c;
  }

  function cm(q, a, b, x, s, t) {
    return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cm(b & c | ~b & d, a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cm(b & d | c & ~d, a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cm(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cm(c ^ (b | ~d), a, b, x, s, t);
  }

  function sb(x) {
    var i;
    var nblk = (x.length + 8 >> 6) + 1;
    var blks = new Array(nblk * 16);

    for (i = 0; i < nblk * 16; i++) {
      blks[i] = 0;
    }

    for (i = 0; i < x.length; i++) {
      blks[i >> 2] |= x.charCodeAt(i) << i % 4 * 8;
    }

    blks[i >> 2] |= 0x80 << i % 4 * 8;
    blks[nblk * 16 - 2] = x.length * 8;
    return blks;
  }

  var i,
      x = sb(inputString),
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878,
      olda,
      oldb,
      oldc,
      oldd;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }

  return rh(a) + rh(b) + rh(c) + rh(d);
}
;// CONCATENATED MODULE: ./src/baidu-setup.js

var BAIDU_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
var APP_ID = {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\thl38\\AppData\\Roaming","BAIDU_APP_ID":"20220801001290121","BAIDU_APP_KEY":"hExmVdyKqQDwnK6LeSzK","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132853458681837411","CHROME_CRASHPAD_PIPE_NAME":"\\\\.\\pipe\\crashpad_2468_RYHMLUSWBLYNYHYU","COLOR":"1","COLORTERM":"truecolor","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"DESKTOP-8QBKPGI","ComSpec":"C:\\Windows\\system32\\cmd.exe","dp0":"C:\\Users\\thl38\\Documents\\fanyi-modal\\node_modules\\.bin\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","GIT_ASKPASS":"d:\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh","HOME":"C:\\Users\\thl38","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\thl38","INIT_CWD":"C:\\Users\\thl38\\Documents\\fanyi-modal","LANG":"en_US.UTF-8","LOCALAPPDATA":"C:\\Users\\thl38\\AppData\\Local","LOGONSERVER":"\\\\DESKTOP-8QBKPGI","NODE":"D:\\Program Files\\nodejs\\node.exe","NODE_EXE":"D:\\Program Files\\nodejs\\\\node.exe","NPM_CLI_JS":"D:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js","npm_command":"run-script","npm_config_cache":"C:\\Users\\thl38\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\thl38\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\thl38\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\thl38\\.npm-init.js","npm_config_local_prefix":"C:\\Users\\thl38\\Documents\\fanyi-modal","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_node_gyp":"D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\thl38\\AppData\\Roaming\\npm","npm_config_userconfig":"C:\\Users\\thl38\\.npmrc","npm_config_user_agent":"npm/8.1.2 node/v16.13.1 win32 x64 workspaces/false","npm_execpath":"D:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"watch","npm_lifecycle_script":"webpack --watch","npm_node_execpath":"D:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\Users\\thl38\\Documents\\fanyi-modal\\package.json","npm_package_name":"fanyi-modal","npm_package_version":"1.0.0","NPM_PREFIX_NPM_CLI_JS":"C:\\Users\\thl38\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","NUMBER_OF_PROCESSORS":"4","OneDrive":"C:\\Users\\thl38\\OneDrive","OneDriveConsumer":"C:\\Users\\thl38\\OneDrive","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","OS":"Windows_NT","Path":"C:\\Users\\thl38\\Documents\\fanyi-modal\\node_modules\\.bin;C:\\Users\\thl38\\Documents\\node_modules\\.bin;C:\\Users\\thl38\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;D:\\Program Files\\nodejs\\;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\thl38\\AppData\\Local\\pnpm;C:\\Users\\thl38\\AppData\\Local\\Microsoft\\WindowsApps;D:\\Programs\\Microsoft VS Code\\bin;C:\\Users\\thl38\\AppData\\Roaming\\npm;C:\\Users\\thl38\\AppData\\Local\\GitHubDesktop\\bin","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW;.CPL","PNPM_HOME":"C:\\Users\\thl38\\AppData\\Local\\pnpm","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 158 Stepping 9, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"9e09","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Users\\thl38\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\Windows","TEMP":"C:\\Users\\thl38\\AppData\\Local\\Temp","TERM_PROGRAM":"vscode","TERM_PROGRAM_VERSION":"1.70.0","TMP":"C:\\Users\\thl38\\AppData\\Local\\Temp","USERDOMAIN":"DESKTOP-8QBKPGI","USERDOMAIN_ROAMINGPROFILE":"DESKTOP-8QBKPGI","USERNAME":"thl38","USERPROFILE":"C:\\Users\\thl38","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"--ms-enable-electron-run-as-node","VSCODE_GIT_ASKPASS_MAIN":"d:\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js","VSCODE_GIT_ASKPASS_NODE":"D:\\Programs\\Microsoft VS Code\\Code.exe","VSCODE_GIT_IPC_HANDLE":"\\\\.\\pipe\\vscode-git-8b2bbc5f15-sock","windir":"C:\\Windows","ZES_ENABLE_SYSMAN":"1","_prog":"node"}.BAIDU_APP_ID;
var KEY = {"ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\thl38\\AppData\\Roaming","BAIDU_APP_ID":"20220801001290121","BAIDU_APP_KEY":"hExmVdyKqQDwnK6LeSzK","ChocolateyInstall":"C:\\ProgramData\\chocolatey","ChocolateyLastPathUpdate":"132853458681837411","CHROME_CRASHPAD_PIPE_NAME":"\\\\.\\pipe\\crashpad_2468_RYHMLUSWBLYNYHYU","COLOR":"1","COLORTERM":"truecolor","CommonProgramFiles":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"DESKTOP-8QBKPGI","ComSpec":"C:\\Windows\\system32\\cmd.exe","dp0":"C:\\Users\\thl38\\Documents\\fanyi-modal\\node_modules\\.bin\\","DriverData":"C:\\Windows\\System32\\Drivers\\DriverData","EDITOR":"notepad.exe","GIT_ASKPASS":"d:\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh","HOME":"C:\\Users\\thl38","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\thl38","INIT_CWD":"C:\\Users\\thl38\\Documents\\fanyi-modal","LANG":"en_US.UTF-8","LOCALAPPDATA":"C:\\Users\\thl38\\AppData\\Local","LOGONSERVER":"\\\\DESKTOP-8QBKPGI","NODE":"D:\\Program Files\\nodejs\\node.exe","NODE_EXE":"D:\\Program Files\\nodejs\\\\node.exe","NPM_CLI_JS":"D:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js","npm_command":"run-script","npm_config_cache":"C:\\Users\\thl38\\AppData\\Local\\npm-cache","npm_config_globalconfig":"C:\\Users\\thl38\\AppData\\Roaming\\npm\\etc\\npmrc","npm_config_global_prefix":"C:\\Users\\thl38\\AppData\\Roaming\\npm","npm_config_init_module":"C:\\Users\\thl38\\.npm-init.js","npm_config_local_prefix":"C:\\Users\\thl38\\Documents\\fanyi-modal","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_node_gyp":"D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js","npm_config_noproxy":"","npm_config_prefix":"C:\\Users\\thl38\\AppData\\Roaming\\npm","npm_config_userconfig":"C:\\Users\\thl38\\.npmrc","npm_config_user_agent":"npm/8.1.2 node/v16.13.1 win32 x64 workspaces/false","npm_execpath":"D:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"watch","npm_lifecycle_script":"webpack --watch","npm_node_execpath":"D:\\Program Files\\nodejs\\node.exe","npm_package_json":"C:\\Users\\thl38\\Documents\\fanyi-modal\\package.json","npm_package_name":"fanyi-modal","npm_package_version":"1.0.0","NPM_PREFIX_NPM_CLI_JS":"C:\\Users\\thl38\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js","NUMBER_OF_PROCESSORS":"4","OneDrive":"C:\\Users\\thl38\\OneDrive","OneDriveConsumer":"C:\\Users\\thl38\\OneDrive","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","OS":"Windows_NT","Path":"C:\\Users\\thl38\\Documents\\fanyi-modal\\node_modules\\.bin;C:\\Users\\thl38\\Documents\\node_modules\\.bin;C:\\Users\\thl38\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Python310\\Scripts\\;C:\\Python310\\;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;D:\\Program Files\\nodejs\\;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\thl38\\AppData\\Local\\pnpm;C:\\Users\\thl38\\AppData\\Local\\Microsoft\\WindowsApps;D:\\Programs\\Microsoft VS Code\\bin;C:\\Users\\thl38\\AppData\\Roaming\\npm;C:\\Users\\thl38\\AppData\\Local\\GitHubDesktop\\bin","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC;.PY;.PYW;.CPL","PNPM_HOME":"C:\\Users\\thl38\\AppData\\Local\\pnpm","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 158 Stepping 9, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"9e09","ProgramData":"C:\\ProgramData","ProgramFiles":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Users\\thl38\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","SESSIONNAME":"Console","SystemDrive":"C:","SystemRoot":"C:\\Windows","TEMP":"C:\\Users\\thl38\\AppData\\Local\\Temp","TERM_PROGRAM":"vscode","TERM_PROGRAM_VERSION":"1.70.0","TMP":"C:\\Users\\thl38\\AppData\\Local\\Temp","USERDOMAIN":"DESKTOP-8QBKPGI","USERDOMAIN_ROAMINGPROFILE":"DESKTOP-8QBKPGI","USERNAME":"thl38","USERPROFILE":"C:\\Users\\thl38","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"--ms-enable-electron-run-as-node","VSCODE_GIT_ASKPASS_MAIN":"d:\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js","VSCODE_GIT_ASKPASS_NODE":"D:\\Programs\\Microsoft VS Code\\Code.exe","VSCODE_GIT_IPC_HANDLE":"\\\\.\\pipe\\vscode-git-8b2bbc5f15-sock","windir":"C:\\Windows","ZES_ENABLE_SYSMAN":"1","_prog":"node"}.BAIDU_APP_KEY;
var createTranslateUrl = function createTranslateUrl(q) {
  var url = BAIDU_URL;
  var salt = new Date().getTime();
  var sign = toSign(q, salt);
  var params = {
    q: q,
    from: 'en',
    to: 'zh',
    appid: APP_ID,
    salt: salt,
    sign: sign
  };
  var finalUrl = append(url, params);
  return finalUrl;
};

var toSign = function toSign(q, salt) {
  var s = "".concat(APP_ID).concat(q).concat(salt).concat(KEY);
  return md5(s);
};

var append = function append(url, params) {
  var qIdx = url.indexOf('?');

  if (qIdx === -1) {
    url = "".concat(url, "?");
  }

  return Object.keys(params).reduce(function (accu, next, idx) {
    var value = params[next];
    var preFix = idx === 0 ? '' : '&';
    accu += "".concat(preFix).concat(next, "=").concat(value);
    return accu;
  }, url);
};
;// CONCATENATED MODULE: ./src/background.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Demo = /*#__PURE__*/function () {
  function Demo() {
    _classCallCheck(this, Demo);

    _defineProperty(this, "currentActiveTabId", null);

    chrome.contextMenus.create({
      title: COMMEND_ID + ' "%s"',
      id: COMMEND_ID,
      contexts: ['selection']
    });
    chrome.runtime.onMessage.addListener(this.onRuntimeMessage.bind(this));
    chrome.contextMenus.onClicked.addListener(this.onContextMenusClick.bind(this));
  }

  _createClass(Demo, [{
    key: "onRuntimeMessage",
    value: function onRuntimeMessage(message, sender) {
      switch (message.type) {
        case CONTENT_LOAD:
          var id = sender.tab.id;
          this.currentActiveTabId = id;
          break;
      }
    }
  }, {
    key: "onContextMenusClick",
    value: function onContextMenusClick(evt) {
      var _this = this;

      if (evt.menuItemId === COMMEND_ID) {
        var url = createTranslateUrl(evt.selectionText);
        this.sendToActiveTab({
          type: TRANSLATE_START
        });
        fetch(url).then(function (res) {
          return res.json();
        }).then(function (res) {
          if (res.error_code === '54001') {
            console.log('ERROR ', res.error_msg);
            return;
          }

          var trans_result = res.trans_result;

          _this.sendToActiveTab({
            type: TRANSLATE_END,
            payload: trans_result[0]
          });
        })["catch"](function (err) {
          console.error(err);

          _this.sendToActiveTab({
            type: TRANSLATE_ERROR
          });
        });
      }
    }
  }, {
    key: "sendToActiveTab",
    value: function sendToActiveTab(payload) {
      if (!this.currentActiveTabId) return;
      chrome.tabs.sendMessage(this.currentActiveTabId, payload, function () {
        if (!chrome.runtime.lastError) {
          console.log('error in chrome');
        }
      });
    }
  }]);

  return Demo;
}();

chrome.runtime.onInstalled.addListener( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          new Demo();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
/******/ 	return __webpack_exports__;
/******/ })()
;
});