var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function")
      throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn)
      context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access)
      context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done)
        throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0)
        continue;
      if (result === null || typeof result !== "object")
        throw new TypeError("Object expected");
      if (_ = accept(result.get))
        descriptor.get = _;
      if (_ = accept(result.set))
        descriptor.set = _;
      if (_ = accept(result.init))
        initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field")
        initializers.unshift(_);
      else
        descriptor[key] = _;
    }
  }
  if (target)
    Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol")
    name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k = ownKeys(mod), i = 0; i < k.length; i++)
      if (k[i] !== "default")
        __createBinding(result, mod, k[i]);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function")
      throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async)
        inner = dispose;
    }
    if (typeof dispose !== "function")
      throw new TypeError("Object not disposable.");
    if (inner)
      dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1)
          return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async)
            return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
        } else
          s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1)
      return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError)
      throw env.error;
  }
  return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
    return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
      return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
    });
  }
  return path;
}
var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    };
    __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
    ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2)
          if (Object.prototype.hasOwnProperty.call(o2, k))
            ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __esDecorate,
      __runInitializers,
      __propKey,
      __setFunctionName,
      __metadata,
      __awaiter,
      __generator,
      __createBinding,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources,
      __rewriteRelativeImportExtension
    };
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports2.default = equal;
  }
});

// node_modules/@companion-module/base/generated/validate_manifest.js
var require_validate_manifest = __commonJS({
  "node_modules/@companion-module/base/generated/validate_manifest.js"(exports2, module2) {
    "use strict";
    module2.exports = validate10;
    module2.exports.default = validate10;
    var schema11 = { "$schema": "http://json-schema.org/draft-07/schema#", "type": "object", "title": "ModuleManifest", "properties": { "$schema": { "type": "string" }, "id": { "type": "string", "description": "Unique identifier for the module" }, "name": { "type": "string", "description": "Name of the module" }, "shortname": { "type": "string" }, "description": { "type": "string", "description": "Description of the module " }, "version": { "type": "string", "description": "Current version of the module" }, "isPrerelease": { "type": "boolean", "description": "Is this a pre-release version" }, "license": { "type": "string", "description": "SPDX identifier for license of the module" }, "repository": { "type": "string", "description": "URL to the source repository" }, "bugs": { "type": "string", "description": "URL to bug tracker" }, "maintainers": { "type": "array", "description": "List of active maintiners", "uniqueItems": true, "items": { "type": "object", "title": "ModuleManifestMaintainer", "properties": { "name": { "type": "string" }, "email": { "type": "string" }, "github": { "type": "string" }, "url": { "type": "string" } }, "required": ["name"], "additionalProperties": false } }, "legacyIds": { "type": "array", "description": "If the module had a different unique identifier previously, then specify it here", "uniqueItems": true, "items": { "type": "string" } }, "runtime": { "type": "object", "title": "ModuleManifestRuntime", "description": "Information on how to execute the module", "properties": { "type": { "type": "string", "description": "Type of the module. Must be: node18 or node22", "enum": ["node18", "node22"] }, "api": { "type": "string", "description": "Which host-api does it use. In the future alternate options will be allowed", "enum": ["nodejs-ipc"] }, "apiVersion": { "type": "string", "description": "The version of the host-api used" }, "entrypoint": { "type": "string", "description": "Entrypoint to pass to the runtime. eg index.js" }, "permissions": { "type": "object", "description": "Permissions required by the module. This is used to inform the user of the permissions required by the module.\nNote: this requires the node22 or newer runtime", "properties": { "worker-threads": { "type": "boolean", "description": "Enable if the module uses worker threads" }, "child-process": { "type": "boolean", "description": "Enable if the module uses child processes" }, "native-addons": { "type": "boolean", "description": "Enable if the module uses native addons" }, "filesystem": { "type": "boolean", "description": "Enable if the module requires read/write access to the filesystem" } }, "additionalProperties": false } }, "required": ["type", "api", "apiVersion", "entrypoint"] }, "manufacturer": { "type": "string" }, "products": { "type": "array", "uniqueItems": true, "items": { "type": "string" }, "minItems": 1 }, "keywords": { "type": "array", "uniqueItems": true, "items": { "type": "string" } }, "bonjourQueries": { "type": "object", "description": "If the device or software for your module supports bonjour announcements, Companion will offer an easy way to watch for these announcements.\nEach query you define must have a matching config field of type 'bonjour-device' with the same name", "patternProperties": { "": { "oneOf": [{ "$ref": "#/definitions/bonjourQuery" }, { "type": "array", "items": { "$ref": "#/definitions/bonjourQuery" } }] } } } }, "required": ["id", "name", "shortname", "description", "version", "license", "repository", "bugs", "maintainers", "legacyIds", "runtime", "manufacturer", "products", "keywords"], "definitions": { "bonjourQuery": { "type": "object", "title": "ModuleBonjourQuery", "description": "", "properties": { "type": { "type": "string" }, "protocol": { "type": "string", "enum": ["tcp", "udp"] }, "port": { "type": "number" }, "txt": { "type": "object", "description": "Match on any txt values returned in the query. This is useful to filter out devices of the same 'type' that are not supported", "patternProperties": { "": { "type": "string" } } } }, "required": ["type", "protocol"] } } };
    var schema12 = { "type": "object", "title": "ModuleBonjourQuery", "description": "", "properties": { "type": { "type": "string" }, "protocol": { "type": "string", "enum": ["tcp", "udp"] }, "port": { "type": "number" }, "txt": { "type": "object", "description": "Match on any txt values returned in the query. This is useful to filter out devices of the same 'type' that are not supported", "patternProperties": { "": { "type": "string" } } } }, "required": ["type", "protocol"] };
    var func0 = require_equal().default;
    var pattern0 = new RegExp("", "u");
    function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (errors === 0) {
        if (data && typeof data == "object" && !Array.isArray(data)) {
          let missing0;
          if (data.id === void 0 && (missing0 = "id") || data.name === void 0 && (missing0 = "name") || data.shortname === void 0 && (missing0 = "shortname") || data.description === void 0 && (missing0 = "description") || data.version === void 0 && (missing0 = "version") || data.license === void 0 && (missing0 = "license") || data.repository === void 0 && (missing0 = "repository") || data.bugs === void 0 && (missing0 = "bugs") || data.maintainers === void 0 && (missing0 = "maintainers") || data.legacyIds === void 0 && (missing0 = "legacyIds") || data.runtime === void 0 && (missing0 = "runtime") || data.manufacturer === void 0 && (missing0 = "manufacturer") || data.products === void 0 && (missing0 = "products") || data.keywords === void 0 && (missing0 = "keywords")) {
            validate10.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
            return false;
          } else {
            if (data.$schema !== void 0) {
              const _errs1 = errors;
              if (typeof data.$schema !== "string") {
                validate10.errors = [{ instancePath: instancePath + "/$schema", schemaPath: "#/properties/%24schema/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
              var valid0 = _errs1 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.id !== void 0) {
                const _errs3 = errors;
                if (typeof data.id !== "string") {
                  validate10.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
                var valid0 = _errs3 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.name !== void 0) {
                  const _errs5 = errors;
                  if (typeof data.name !== "string") {
                    validate10.errors = [{ instancePath: instancePath + "/name", schemaPath: "#/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                  var valid0 = _errs5 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.shortname !== void 0) {
                    const _errs7 = errors;
                    if (typeof data.shortname !== "string") {
                      validate10.errors = [{ instancePath: instancePath + "/shortname", schemaPath: "#/properties/shortname/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                    var valid0 = _errs7 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.description !== void 0) {
                      const _errs9 = errors;
                      if (typeof data.description !== "string") {
                        validate10.errors = [{ instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                      var valid0 = _errs9 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.version !== void 0) {
                        const _errs11 = errors;
                        if (typeof data.version !== "string") {
                          validate10.errors = [{ instancePath: instancePath + "/version", schemaPath: "#/properties/version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                          return false;
                        }
                        var valid0 = _errs11 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.isPrerelease !== void 0) {
                          const _errs13 = errors;
                          if (typeof data.isPrerelease !== "boolean") {
                            validate10.errors = [{ instancePath: instancePath + "/isPrerelease", schemaPath: "#/properties/isPrerelease/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                            return false;
                          }
                          var valid0 = _errs13 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.license !== void 0) {
                            const _errs15 = errors;
                            if (typeof data.license !== "string") {
                              validate10.errors = [{ instancePath: instancePath + "/license", schemaPath: "#/properties/license/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                              return false;
                            }
                            var valid0 = _errs15 === errors;
                          } else {
                            var valid0 = true;
                          }
                          if (valid0) {
                            if (data.repository !== void 0) {
                              const _errs17 = errors;
                              if (typeof data.repository !== "string") {
                                validate10.errors = [{ instancePath: instancePath + "/repository", schemaPath: "#/properties/repository/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                              var valid0 = _errs17 === errors;
                            } else {
                              var valid0 = true;
                            }
                            if (valid0) {
                              if (data.bugs !== void 0) {
                                const _errs19 = errors;
                                if (typeof data.bugs !== "string") {
                                  validate10.errors = [{ instancePath: instancePath + "/bugs", schemaPath: "#/properties/bugs/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                                var valid0 = _errs19 === errors;
                              } else {
                                var valid0 = true;
                              }
                              if (valid0) {
                                if (data.maintainers !== void 0) {
                                  let data10 = data.maintainers;
                                  const _errs21 = errors;
                                  if (errors === _errs21) {
                                    if (Array.isArray(data10)) {
                                      var valid1 = true;
                                      const len0 = data10.length;
                                      for (let i0 = 0; i0 < len0; i0++) {
                                        let data11 = data10[i0];
                                        const _errs23 = errors;
                                        if (errors === _errs23) {
                                          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                                            let missing1;
                                            if (data11.name === void 0 && (missing1 = "name")) {
                                              validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0, schemaPath: "#/properties/maintainers/items/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                              return false;
                                            } else {
                                              const _errs25 = errors;
                                              for (const key0 in data11) {
                                                if (!(key0 === "name" || key0 === "email" || key0 === "github" || key0 === "url")) {
                                                  validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0, schemaPath: "#/properties/maintainers/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
                                                  return false;
                                                  break;
                                                }
                                              }
                                              if (_errs25 === errors) {
                                                if (data11.name !== void 0) {
                                                  const _errs26 = errors;
                                                  if (typeof data11.name !== "string") {
                                                    validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0 + "/name", schemaPath: "#/properties/maintainers/items/properties/name/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                  var valid2 = _errs26 === errors;
                                                } else {
                                                  var valid2 = true;
                                                }
                                                if (valid2) {
                                                  if (data11.email !== void 0) {
                                                    const _errs28 = errors;
                                                    if (typeof data11.email !== "string") {
                                                      validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0 + "/email", schemaPath: "#/properties/maintainers/items/properties/email/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                      return false;
                                                    }
                                                    var valid2 = _errs28 === errors;
                                                  } else {
                                                    var valid2 = true;
                                                  }
                                                  if (valid2) {
                                                    if (data11.github !== void 0) {
                                                      const _errs30 = errors;
                                                      if (typeof data11.github !== "string") {
                                                        validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0 + "/github", schemaPath: "#/properties/maintainers/items/properties/github/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                      }
                                                      var valid2 = _errs30 === errors;
                                                    } else {
                                                      var valid2 = true;
                                                    }
                                                    if (valid2) {
                                                      if (data11.url !== void 0) {
                                                        const _errs32 = errors;
                                                        if (typeof data11.url !== "string") {
                                                          validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0 + "/url", schemaPath: "#/properties/maintainers/items/properties/url/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                          return false;
                                                        }
                                                        var valid2 = _errs32 === errors;
                                                      } else {
                                                        var valid2 = true;
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          } else {
                                            validate10.errors = [{ instancePath: instancePath + "/maintainers/" + i0, schemaPath: "#/properties/maintainers/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                            return false;
                                          }
                                        }
                                        var valid1 = _errs23 === errors;
                                        if (!valid1) {
                                          break;
                                        }
                                      }
                                      if (valid1) {
                                        let i1 = data10.length;
                                        let j0;
                                        if (i1 > 1) {
                                          outer0:
                                            for (; i1--; ) {
                                              for (j0 = i1; j0--; ) {
                                                if (func0(data10[i1], data10[j0])) {
                                                  validate10.errors = [{ instancePath: instancePath + "/maintainers", schemaPath: "#/properties/maintainers/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                                  return false;
                                                  break outer0;
                                                }
                                              }
                                            }
                                        }
                                      }
                                    } else {
                                      validate10.errors = [{ instancePath: instancePath + "/maintainers", schemaPath: "#/properties/maintainers/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                      return false;
                                    }
                                  }
                                  var valid0 = _errs21 === errors;
                                } else {
                                  var valid0 = true;
                                }
                                if (valid0) {
                                  if (data.legacyIds !== void 0) {
                                    let data16 = data.legacyIds;
                                    const _errs34 = errors;
                                    if (errors === _errs34) {
                                      if (Array.isArray(data16)) {
                                        var valid4 = true;
                                        const len1 = data16.length;
                                        for (let i2 = 0; i2 < len1; i2++) {
                                          const _errs36 = errors;
                                          if (typeof data16[i2] !== "string") {
                                            validate10.errors = [{ instancePath: instancePath + "/legacyIds/" + i2, schemaPath: "#/properties/legacyIds/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                          }
                                          var valid4 = _errs36 === errors;
                                          if (!valid4) {
                                            break;
                                          }
                                        }
                                        if (valid4) {
                                          let i3 = data16.length;
                                          let j1;
                                          if (i3 > 1) {
                                            const indices0 = {};
                                            for (; i3--; ) {
                                              let item0 = data16[i3];
                                              if (typeof item0 !== "string") {
                                                continue;
                                              }
                                              if (typeof indices0[item0] == "number") {
                                                j1 = indices0[item0];
                                                validate10.errors = [{ instancePath: instancePath + "/legacyIds", schemaPath: "#/properties/legacyIds/uniqueItems", keyword: "uniqueItems", params: { i: i3, j: j1 }, message: "must NOT have duplicate items (items ## " + j1 + " and " + i3 + " are identical)" }];
                                                return false;
                                                break;
                                              }
                                              indices0[item0] = i3;
                                            }
                                          }
                                        }
                                      } else {
                                        validate10.errors = [{ instancePath: instancePath + "/legacyIds", schemaPath: "#/properties/legacyIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid0 = _errs34 === errors;
                                  } else {
                                    var valid0 = true;
                                  }
                                  if (valid0) {
                                    if (data.runtime !== void 0) {
                                      let data18 = data.runtime;
                                      const _errs38 = errors;
                                      if (errors === _errs38) {
                                        if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
                                          let missing2;
                                          if (data18.type === void 0 && (missing2 = "type") || data18.api === void 0 && (missing2 = "api") || data18.apiVersion === void 0 && (missing2 = "apiVersion") || data18.entrypoint === void 0 && (missing2 = "entrypoint")) {
                                            validate10.errors = [{ instancePath: instancePath + "/runtime", schemaPath: "#/properties/runtime/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" }];
                                            return false;
                                          } else {
                                            if (data18.type !== void 0) {
                                              let data19 = data18.type;
                                              const _errs40 = errors;
                                              if (typeof data19 !== "string") {
                                                validate10.errors = [{ instancePath: instancePath + "/runtime/type", schemaPath: "#/properties/runtime/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                              if (!(data19 === "node18" || data19 === "node22")) {
                                                validate10.errors = [{ instancePath: instancePath + "/runtime/type", schemaPath: "#/properties/runtime/properties/type/enum", keyword: "enum", params: { allowedValues: schema11.properties.runtime.properties.type.enum }, message: "must be equal to one of the allowed values" }];
                                                return false;
                                              }
                                              var valid6 = _errs40 === errors;
                                            } else {
                                              var valid6 = true;
                                            }
                                            if (valid6) {
                                              if (data18.api !== void 0) {
                                                let data20 = data18.api;
                                                const _errs42 = errors;
                                                if (typeof data20 !== "string") {
                                                  validate10.errors = [{ instancePath: instancePath + "/runtime/api", schemaPath: "#/properties/runtime/properties/api/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                                if (!(data20 === "nodejs-ipc")) {
                                                  validate10.errors = [{ instancePath: instancePath + "/runtime/api", schemaPath: "#/properties/runtime/properties/api/enum", keyword: "enum", params: { allowedValues: schema11.properties.runtime.properties.api.enum }, message: "must be equal to one of the allowed values" }];
                                                  return false;
                                                }
                                                var valid6 = _errs42 === errors;
                                              } else {
                                                var valid6 = true;
                                              }
                                              if (valid6) {
                                                if (data18.apiVersion !== void 0) {
                                                  const _errs44 = errors;
                                                  if (typeof data18.apiVersion !== "string") {
                                                    validate10.errors = [{ instancePath: instancePath + "/runtime/apiVersion", schemaPath: "#/properties/runtime/properties/apiVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                  var valid6 = _errs44 === errors;
                                                } else {
                                                  var valid6 = true;
                                                }
                                                if (valid6) {
                                                  if (data18.entrypoint !== void 0) {
                                                    const _errs46 = errors;
                                                    if (typeof data18.entrypoint !== "string") {
                                                      validate10.errors = [{ instancePath: instancePath + "/runtime/entrypoint", schemaPath: "#/properties/runtime/properties/entrypoint/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                      return false;
                                                    }
                                                    var valid6 = _errs46 === errors;
                                                  } else {
                                                    var valid6 = true;
                                                  }
                                                  if (valid6) {
                                                    if (data18.permissions !== void 0) {
                                                      let data23 = data18.permissions;
                                                      const _errs48 = errors;
                                                      if (errors === _errs48) {
                                                        if (data23 && typeof data23 == "object" && !Array.isArray(data23)) {
                                                          const _errs50 = errors;
                                                          for (const key1 in data23) {
                                                            if (!(key1 === "worker-threads" || key1 === "child-process" || key1 === "native-addons" || key1 === "filesystem")) {
                                                              validate10.errors = [{ instancePath: instancePath + "/runtime/permissions", schemaPath: "#/properties/runtime/properties/permissions/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                                              return false;
                                                              break;
                                                            }
                                                          }
                                                          if (_errs50 === errors) {
                                                            if (data23["worker-threads"] !== void 0) {
                                                              const _errs51 = errors;
                                                              if (typeof data23["worker-threads"] !== "boolean") {
                                                                validate10.errors = [{ instancePath: instancePath + "/runtime/permissions/worker-threads", schemaPath: "#/properties/runtime/properties/permissions/properties/worker-threads/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                return false;
                                                              }
                                                              var valid7 = _errs51 === errors;
                                                            } else {
                                                              var valid7 = true;
                                                            }
                                                            if (valid7) {
                                                              if (data23["child-process"] !== void 0) {
                                                                const _errs53 = errors;
                                                                if (typeof data23["child-process"] !== "boolean") {
                                                                  validate10.errors = [{ instancePath: instancePath + "/runtime/permissions/child-process", schemaPath: "#/properties/runtime/properties/permissions/properties/child-process/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                  return false;
                                                                }
                                                                var valid7 = _errs53 === errors;
                                                              } else {
                                                                var valid7 = true;
                                                              }
                                                              if (valid7) {
                                                                if (data23["native-addons"] !== void 0) {
                                                                  const _errs55 = errors;
                                                                  if (typeof data23["native-addons"] !== "boolean") {
                                                                    validate10.errors = [{ instancePath: instancePath + "/runtime/permissions/native-addons", schemaPath: "#/properties/runtime/properties/permissions/properties/native-addons/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                    return false;
                                                                  }
                                                                  var valid7 = _errs55 === errors;
                                                                } else {
                                                                  var valid7 = true;
                                                                }
                                                                if (valid7) {
                                                                  if (data23.filesystem !== void 0) {
                                                                    const _errs57 = errors;
                                                                    if (typeof data23.filesystem !== "boolean") {
                                                                      validate10.errors = [{ instancePath: instancePath + "/runtime/permissions/filesystem", schemaPath: "#/properties/runtime/properties/permissions/properties/filesystem/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                                      return false;
                                                                    }
                                                                    var valid7 = _errs57 === errors;
                                                                  } else {
                                                                    var valid7 = true;
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        } else {
                                                          validate10.errors = [{ instancePath: instancePath + "/runtime/permissions", schemaPath: "#/properties/runtime/properties/permissions/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                          return false;
                                                        }
                                                      }
                                                      var valid6 = _errs48 === errors;
                                                    } else {
                                                      var valid6 = true;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        } else {
                                          validate10.errors = [{ instancePath: instancePath + "/runtime", schemaPath: "#/properties/runtime/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                          return false;
                                        }
                                      }
                                      var valid0 = _errs38 === errors;
                                    } else {
                                      var valid0 = true;
                                    }
                                    if (valid0) {
                                      if (data.manufacturer !== void 0) {
                                        const _errs59 = errors;
                                        if (typeof data.manufacturer !== "string") {
                                          validate10.errors = [{ instancePath: instancePath + "/manufacturer", schemaPath: "#/properties/manufacturer/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                        var valid0 = _errs59 === errors;
                                      } else {
                                        var valid0 = true;
                                      }
                                      if (valid0) {
                                        if (data.products !== void 0) {
                                          let data29 = data.products;
                                          const _errs61 = errors;
                                          if (errors === _errs61) {
                                            if (Array.isArray(data29)) {
                                              if (data29.length < 1) {
                                                validate10.errors = [{ instancePath: instancePath + "/products", schemaPath: "#/properties/products/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                                                return false;
                                              } else {
                                                var valid8 = true;
                                                const len2 = data29.length;
                                                for (let i4 = 0; i4 < len2; i4++) {
                                                  const _errs63 = errors;
                                                  if (typeof data29[i4] !== "string") {
                                                    validate10.errors = [{ instancePath: instancePath + "/products/" + i4, schemaPath: "#/properties/products/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                  var valid8 = _errs63 === errors;
                                                  if (!valid8) {
                                                    break;
                                                  }
                                                }
                                                if (valid8) {
                                                  let i5 = data29.length;
                                                  let j2;
                                                  if (i5 > 1) {
                                                    const indices1 = {};
                                                    for (; i5--; ) {
                                                      let item1 = data29[i5];
                                                      if (typeof item1 !== "string") {
                                                        continue;
                                                      }
                                                      if (typeof indices1[item1] == "number") {
                                                        j2 = indices1[item1];
                                                        validate10.errors = [{ instancePath: instancePath + "/products", schemaPath: "#/properties/products/uniqueItems", keyword: "uniqueItems", params: { i: i5, j: j2 }, message: "must NOT have duplicate items (items ## " + j2 + " and " + i5 + " are identical)" }];
                                                        return false;
                                                        break;
                                                      }
                                                      indices1[item1] = i5;
                                                    }
                                                  }
                                                }
                                              }
                                            } else {
                                              validate10.errors = [{ instancePath: instancePath + "/products", schemaPath: "#/properties/products/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                              return false;
                                            }
                                          }
                                          var valid0 = _errs61 === errors;
                                        } else {
                                          var valid0 = true;
                                        }
                                        if (valid0) {
                                          if (data.keywords !== void 0) {
                                            let data31 = data.keywords;
                                            const _errs65 = errors;
                                            if (errors === _errs65) {
                                              if (Array.isArray(data31)) {
                                                var valid10 = true;
                                                const len3 = data31.length;
                                                for (let i6 = 0; i6 < len3; i6++) {
                                                  const _errs67 = errors;
                                                  if (typeof data31[i6] !== "string") {
                                                    validate10.errors = [{ instancePath: instancePath + "/keywords/" + i6, schemaPath: "#/properties/keywords/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                  var valid10 = _errs67 === errors;
                                                  if (!valid10) {
                                                    break;
                                                  }
                                                }
                                                if (valid10) {
                                                  let i7 = data31.length;
                                                  let j3;
                                                  if (i7 > 1) {
                                                    const indices2 = {};
                                                    for (; i7--; ) {
                                                      let item2 = data31[i7];
                                                      if (typeof item2 !== "string") {
                                                        continue;
                                                      }
                                                      if (typeof indices2[item2] == "number") {
                                                        j3 = indices2[item2];
                                                        validate10.errors = [{ instancePath: instancePath + "/keywords", schemaPath: "#/properties/keywords/uniqueItems", keyword: "uniqueItems", params: { i: i7, j: j3 }, message: "must NOT have duplicate items (items ## " + j3 + " and " + i7 + " are identical)" }];
                                                        return false;
                                                        break;
                                                      }
                                                      indices2[item2] = i7;
                                                    }
                                                  }
                                                }
                                              } else {
                                                validate10.errors = [{ instancePath: instancePath + "/keywords", schemaPath: "#/properties/keywords/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                return false;
                                              }
                                            }
                                            var valid0 = _errs65 === errors;
                                          } else {
                                            var valid0 = true;
                                          }
                                          if (valid0) {
                                            if (data.bonjourQueries !== void 0) {
                                              let data33 = data.bonjourQueries;
                                              const _errs69 = errors;
                                              if (errors === _errs69) {
                                                if (data33 && typeof data33 == "object" && !Array.isArray(data33)) {
                                                  var valid12 = true;
                                                  for (const key2 in data33) {
                                                    if (pattern0.test(key2)) {
                                                      let data34 = data33[key2];
                                                      const _errs71 = errors;
                                                      const _errs72 = errors;
                                                      let valid13 = false;
                                                      let passing0 = null;
                                                      const _errs73 = errors;
                                                      const _errs74 = errors;
                                                      if (errors === _errs74) {
                                                        if (data34 && typeof data34 == "object" && !Array.isArray(data34)) {
                                                          let missing3;
                                                          if (data34.type === void 0 && (missing3 = "type") || data34.protocol === void 0 && (missing3 = "protocol")) {
                                                            const err0 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/bonjourQuery/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" };
                                                            if (vErrors === null) {
                                                              vErrors = [err0];
                                                            } else {
                                                              vErrors.push(err0);
                                                            }
                                                            errors++;
                                                          } else {
                                                            if (data34.type !== void 0) {
                                                              const _errs76 = errors;
                                                              if (typeof data34.type !== "string") {
                                                                const err1 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/type", schemaPath: "#/definitions/bonjourQuery/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                if (vErrors === null) {
                                                                  vErrors = [err1];
                                                                } else {
                                                                  vErrors.push(err1);
                                                                }
                                                                errors++;
                                                              }
                                                              var valid15 = _errs76 === errors;
                                                            } else {
                                                              var valid15 = true;
                                                            }
                                                            if (valid15) {
                                                              if (data34.protocol !== void 0) {
                                                                let data36 = data34.protocol;
                                                                const _errs78 = errors;
                                                                if (typeof data36 !== "string") {
                                                                  const err2 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/protocol", schemaPath: "#/definitions/bonjourQuery/properties/protocol/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                  if (vErrors === null) {
                                                                    vErrors = [err2];
                                                                  } else {
                                                                    vErrors.push(err2);
                                                                  }
                                                                  errors++;
                                                                }
                                                                if (!(data36 === "tcp" || data36 === "udp")) {
                                                                  const err3 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/protocol", schemaPath: "#/definitions/bonjourQuery/properties/protocol/enum", keyword: "enum", params: { allowedValues: schema12.properties.protocol.enum }, message: "must be equal to one of the allowed values" };
                                                                  if (vErrors === null) {
                                                                    vErrors = [err3];
                                                                  } else {
                                                                    vErrors.push(err3);
                                                                  }
                                                                  errors++;
                                                                }
                                                                var valid15 = _errs78 === errors;
                                                              } else {
                                                                var valid15 = true;
                                                              }
                                                              if (valid15) {
                                                                if (data34.port !== void 0) {
                                                                  let data37 = data34.port;
                                                                  const _errs80 = errors;
                                                                  if (!(typeof data37 == "number" && isFinite(data37))) {
                                                                    const err4 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/port", schemaPath: "#/definitions/bonjourQuery/properties/port/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                                                                    if (vErrors === null) {
                                                                      vErrors = [err4];
                                                                    } else {
                                                                      vErrors.push(err4);
                                                                    }
                                                                    errors++;
                                                                  }
                                                                  var valid15 = _errs80 === errors;
                                                                } else {
                                                                  var valid15 = true;
                                                                }
                                                                if (valid15) {
                                                                  if (data34.txt !== void 0) {
                                                                    let data38 = data34.txt;
                                                                    const _errs82 = errors;
                                                                    if (errors === _errs82) {
                                                                      if (data38 && typeof data38 == "object" && !Array.isArray(data38)) {
                                                                        var valid16 = true;
                                                                        for (const key3 in data38) {
                                                                          if (pattern0.test(key3)) {
                                                                            const _errs84 = errors;
                                                                            if (typeof data38[key3] !== "string") {
                                                                              const err5 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/txt/" + key3.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/bonjourQuery/properties/txt/patternProperties//type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                              if (vErrors === null) {
                                                                                vErrors = [err5];
                                                                              } else {
                                                                                vErrors.push(err5);
                                                                              }
                                                                              errors++;
                                                                            }
                                                                            var valid16 = _errs84 === errors;
                                                                            if (!valid16) {
                                                                              break;
                                                                            }
                                                                          }
                                                                        }
                                                                      } else {
                                                                        const err6 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/txt", schemaPath: "#/definitions/bonjourQuery/properties/txt/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                                                        if (vErrors === null) {
                                                                          vErrors = [err6];
                                                                        } else {
                                                                          vErrors.push(err6);
                                                                        }
                                                                        errors++;
                                                                      }
                                                                    }
                                                                    var valid15 = _errs82 === errors;
                                                                  } else {
                                                                    var valid15 = true;
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        } else {
                                                          const err7 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/bonjourQuery/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                                          if (vErrors === null) {
                                                            vErrors = [err7];
                                                          } else {
                                                            vErrors.push(err7);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var _valid0 = _errs73 === errors;
                                                      if (_valid0) {
                                                        valid13 = true;
                                                        passing0 = 0;
                                                      }
                                                      const _errs86 = errors;
                                                      if (errors === _errs86) {
                                                        if (Array.isArray(data34)) {
                                                          var valid17 = true;
                                                          const len4 = data34.length;
                                                          for (let i8 = 0; i8 < len4; i8++) {
                                                            let data40 = data34[i8];
                                                            const _errs88 = errors;
                                                            const _errs89 = errors;
                                                            if (errors === _errs89) {
                                                              if (data40 && typeof data40 == "object" && !Array.isArray(data40)) {
                                                                let missing4;
                                                                if (data40.type === void 0 && (missing4 = "type") || data40.protocol === void 0 && (missing4 = "protocol")) {
                                                                  const err8 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8, schemaPath: "#/definitions/bonjourQuery/required", keyword: "required", params: { missingProperty: missing4 }, message: "must have required property '" + missing4 + "'" };
                                                                  if (vErrors === null) {
                                                                    vErrors = [err8];
                                                                  } else {
                                                                    vErrors.push(err8);
                                                                  }
                                                                  errors++;
                                                                } else {
                                                                  if (data40.type !== void 0) {
                                                                    const _errs91 = errors;
                                                                    if (typeof data40.type !== "string") {
                                                                      const err9 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8 + "/type", schemaPath: "#/definitions/bonjourQuery/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                      if (vErrors === null) {
                                                                        vErrors = [err9];
                                                                      } else {
                                                                        vErrors.push(err9);
                                                                      }
                                                                      errors++;
                                                                    }
                                                                    var valid19 = _errs91 === errors;
                                                                  } else {
                                                                    var valid19 = true;
                                                                  }
                                                                  if (valid19) {
                                                                    if (data40.protocol !== void 0) {
                                                                      let data42 = data40.protocol;
                                                                      const _errs93 = errors;
                                                                      if (typeof data42 !== "string") {
                                                                        const err10 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8 + "/protocol", schemaPath: "#/definitions/bonjourQuery/properties/protocol/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                        if (vErrors === null) {
                                                                          vErrors = [err10];
                                                                        } else {
                                                                          vErrors.push(err10);
                                                                        }
                                                                        errors++;
                                                                      }
                                                                      if (!(data42 === "tcp" || data42 === "udp")) {
                                                                        const err11 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8 + "/protocol", schemaPath: "#/definitions/bonjourQuery/properties/protocol/enum", keyword: "enum", params: { allowedValues: schema12.properties.protocol.enum }, message: "must be equal to one of the allowed values" };
                                                                        if (vErrors === null) {
                                                                          vErrors = [err11];
                                                                        } else {
                                                                          vErrors.push(err11);
                                                                        }
                                                                        errors++;
                                                                      }
                                                                      var valid19 = _errs93 === errors;
                                                                    } else {
                                                                      var valid19 = true;
                                                                    }
                                                                    if (valid19) {
                                                                      if (data40.port !== void 0) {
                                                                        let data43 = data40.port;
                                                                        const _errs95 = errors;
                                                                        if (!(typeof data43 == "number" && isFinite(data43))) {
                                                                          const err12 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8 + "/port", schemaPath: "#/definitions/bonjourQuery/properties/port/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                                                                          if (vErrors === null) {
                                                                            vErrors = [err12];
                                                                          } else {
                                                                            vErrors.push(err12);
                                                                          }
                                                                          errors++;
                                                                        }
                                                                        var valid19 = _errs95 === errors;
                                                                      } else {
                                                                        var valid19 = true;
                                                                      }
                                                                      if (valid19) {
                                                                        if (data40.txt !== void 0) {
                                                                          let data44 = data40.txt;
                                                                          const _errs97 = errors;
                                                                          if (errors === _errs97) {
                                                                            if (data44 && typeof data44 == "object" && !Array.isArray(data44)) {
                                                                              var valid20 = true;
                                                                              for (const key4 in data44) {
                                                                                if (pattern0.test(key4)) {
                                                                                  const _errs99 = errors;
                                                                                  if (typeof data44[key4] !== "string") {
                                                                                    const err13 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8 + "/txt/" + key4.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/definitions/bonjourQuery/properties/txt/patternProperties//type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                                                    if (vErrors === null) {
                                                                                      vErrors = [err13];
                                                                                    } else {
                                                                                      vErrors.push(err13);
                                                                                    }
                                                                                    errors++;
                                                                                  }
                                                                                  var valid20 = _errs99 === errors;
                                                                                  if (!valid20) {
                                                                                    break;
                                                                                  }
                                                                                }
                                                                              }
                                                                            } else {
                                                                              const err14 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8 + "/txt", schemaPath: "#/definitions/bonjourQuery/properties/txt/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                                                              if (vErrors === null) {
                                                                                vErrors = [err14];
                                                                              } else {
                                                                                vErrors.push(err14);
                                                                              }
                                                                              errors++;
                                                                            }
                                                                          }
                                                                          var valid19 = _errs97 === errors;
                                                                        } else {
                                                                          var valid19 = true;
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              } else {
                                                                const err15 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i8, schemaPath: "#/definitions/bonjourQuery/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                                                if (vErrors === null) {
                                                                  vErrors = [err15];
                                                                } else {
                                                                  vErrors.push(err15);
                                                                }
                                                                errors++;
                                                              }
                                                            }
                                                            var valid17 = _errs88 === errors;
                                                            if (!valid17) {
                                                              break;
                                                            }
                                                          }
                                                        } else {
                                                          const err16 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/bonjourQueries/patternProperties//oneOf/1/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                                          if (vErrors === null) {
                                                            vErrors = [err16];
                                                          } else {
                                                            vErrors.push(err16);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var _valid0 = _errs86 === errors;
                                                      if (_valid0 && valid13) {
                                                        valid13 = false;
                                                        passing0 = [passing0, 1];
                                                      } else {
                                                        if (_valid0) {
                                                          valid13 = true;
                                                          passing0 = 1;
                                                        }
                                                      }
                                                      if (!valid13) {
                                                        const err17 = { instancePath: instancePath + "/bonjourQueries/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/bonjourQueries/patternProperties//oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                                                        if (vErrors === null) {
                                                          vErrors = [err17];
                                                        } else {
                                                          vErrors.push(err17);
                                                        }
                                                        errors++;
                                                        validate10.errors = vErrors;
                                                        return false;
                                                      } else {
                                                        errors = _errs72;
                                                        if (vErrors !== null) {
                                                          if (_errs72) {
                                                            vErrors.length = _errs72;
                                                          } else {
                                                            vErrors = null;
                                                          }
                                                        }
                                                      }
                                                      var valid12 = _errs71 === errors;
                                                      if (!valid12) {
                                                        break;
                                                      }
                                                    }
                                                  }
                                                } else {
                                                  validate10.errors = [{ instancePath: instancePath + "/bonjourQueries", schemaPath: "#/properties/bonjourQueries/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                  return false;
                                                }
                                              }
                                              var valid0 = _errs69 === errors;
                                            } else {
                                              var valid0 = true;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          validate10.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
          return false;
        }
      }
      validate10.errors = vErrors;
      return errors === 0;
    }
  }
});

// node_modules/@companion-module/base/dist/manifest.js
var require_manifest = __commonJS({
  "node_modules/@companion-module/base/dist/manifest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateManifest = validateManifest;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var validate_manifest_js_1 = tslib_1.__importDefault(require_validate_manifest());
    function validateManifest(manifest, looseChecks) {
      if (!looseChecks) {
        const manifestStr = JSON.stringify(manifest);
        if (manifestStr.includes("companion-module-your-module-name"))
          throw new Error(`Manifest incorrectly references template module 'companion-module-your-module-name'`);
        if (manifestStr.includes("module-shortname"))
          throw new Error(`Manifest incorrectly references template module 'module-shortname'`);
        if (manifestStr.includes("A short one line description of your module"))
          throw new Error(`Manifest incorrectly references template module 'A short one line description of your module'`);
        if (manifestStr.includes("Your name"))
          throw new Error(`Manifest incorrectly references template module 'Your name'`);
        if (manifestStr.includes("Your email"))
          throw new Error(`Manifest incorrectly references template module 'Your email'`);
        if (manifestStr.includes("Your company"))
          throw new Error(`Manifest incorrectly references template module 'Your company'`);
        if (manifestStr.includes("Your product"))
          throw new Error(`Manifest incorrectly references template module 'Your product'`);
      }
      if (manifest.legacyIds.includes(manifest.id)) {
        throw new Error(`Manifest contains itself '${manifest.id}' in legacyIds`);
      }
      if (!(0, validate_manifest_js_1.default)(manifest)) {
        const errors = validate_manifest_js_1.default.errors;
        if (!errors)
          throw new Error(`Manifest failed validation with unknown reason`);
        throw new Error(`Manifest validation failed: ${JSON.stringify(errors)}`);
      }
    }
  }
});

// node_modules/@companion-module/base/dist/module-api/action.js
var require_action = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/action.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/colord/index.js
var require_colord = __commonJS({
  "node_modules/colord/index.js"(exports2) {
    Object.defineProperty(exports2, "__esModule", { value: true });
    var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
    var t = function(r2) {
      return "string" == typeof r2 ? r2.length > 0 : "number" == typeof r2;
    };
    var n = function(r2, t2, n2) {
      return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
    };
    var e = function(r2, t2, n2) {
      return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
    };
    var u = function(r2) {
      return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
    };
    var o = function(r2) {
      return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
    };
    var a = function(r2) {
      return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
    };
    var s = /^#([0-9a-f]{3,8})$/i;
    var i = function(r2) {
      var t2 = r2.toString(16);
      return t2.length < 2 ? "0" + t2 : t2;
    };
    var h = function(r2) {
      var t2 = r2.r, n2 = r2.g, e2 = r2.b, u2 = r2.a, o2 = Math.max(t2, n2, e2), a2 = o2 - Math.min(t2, n2, e2), s2 = a2 ? o2 === t2 ? (n2 - e2) / a2 : o2 === n2 ? 2 + (e2 - t2) / a2 : 4 + (t2 - n2) / a2 : 0;
      return { h: 60 * (s2 < 0 ? s2 + 6 : s2), s: o2 ? a2 / o2 * 100 : 0, v: o2 / 255 * 100, a: u2 };
    };
    var b = function(r2) {
      var t2 = r2.h, n2 = r2.s, e2 = r2.v, u2 = r2.a;
      t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
      var o2 = Math.floor(t2), a2 = e2 * (1 - n2), s2 = e2 * (1 - (t2 - o2) * n2), i2 = e2 * (1 - (1 - t2 + o2) * n2), h2 = o2 % 6;
      return { r: 255 * [e2, s2, a2, a2, i2, e2][h2], g: 255 * [i2, e2, e2, s2, a2, a2][h2], b: 255 * [a2, a2, i2, e2, e2, s2][h2], a: u2 };
    };
    var d = function(r2) {
      return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
    };
    var g = function(r2) {
      return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
    };
    var f = function(r2) {
      return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
      var t2, n2, e2;
    };
    var p = function(r2) {
      return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
      var t2, n2, e2, u2;
    };
    var l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    var c = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    var v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    var m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
    var y = { string: [[function(r2) {
      var t2 = s.exec(r2);
      return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: 4 === r2.length ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : 6 === r2.length || 8 === r2.length ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: 8 === r2.length ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
    }, "hex"], [function(r2) {
      var t2 = v.exec(r2) || m.exec(r2);
      return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : o({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: void 0 === t2[7] ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
    }, "rgb"], [function(t2) {
      var n2 = l.exec(t2) || c.exec(t2);
      if (!n2)
        return null;
      var e2, u2, o2 = d({ h: (e2 = n2[1], u2 = n2[2], void 0 === u2 && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: void 0 === n2[5] ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
      return f(o2);
    }, "hsl"]], object: [[function(r2) {
      var n2 = r2.r, e2 = r2.g, u2 = r2.b, a2 = r2.a, s2 = void 0 === a2 ? 1 : a2;
      return t(n2) && t(e2) && t(u2) ? o({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(s2) }) : null;
    }, "rgb"], [function(r2) {
      var n2 = r2.h, e2 = r2.s, u2 = r2.l, o2 = r2.a, a2 = void 0 === o2 ? 1 : o2;
      if (!t(n2) || !t(e2) || !t(u2))
        return null;
      var s2 = d({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(a2) });
      return f(s2);
    }, "hsl"], [function(r2) {
      var n2 = r2.h, o2 = r2.s, a2 = r2.v, s2 = r2.a, i2 = void 0 === s2 ? 1 : s2;
      if (!t(n2) || !t(o2) || !t(a2))
        return null;
      var h2 = function(r3) {
        return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
      }({ h: Number(n2), s: Number(o2), v: Number(a2), a: Number(i2) });
      return b(h2);
    }, "hsv"]] };
    var N = function(r2, t2) {
      for (var n2 = 0; n2 < t2.length; n2++) {
        var e2 = t2[n2][0](r2);
        if (e2)
          return [e2, t2[n2][1]];
      }
      return [null, void 0];
    };
    var x = function(r2) {
      return "string" == typeof r2 ? N(r2.trim(), y.string) : "object" == typeof r2 && null !== r2 ? N(r2, y.object) : [null, void 0];
    };
    var M = function(r2, t2) {
      var n2 = p(r2);
      return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
    };
    var I = function(r2) {
      return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1e3 / 255;
    };
    var H = function(r2, t2) {
      var n2 = p(r2);
      return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
    };
    var $ = function() {
      function r2(r3) {
        this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
      }
      return r2.prototype.isValid = function() {
        return null !== this.parsed;
      }, r2.prototype.brightness = function() {
        return n(I(this.rgba), 2);
      }, r2.prototype.isDark = function() {
        return I(this.rgba) < 0.5;
      }, r2.prototype.isLight = function() {
        return I(this.rgba) >= 0.5;
      }, r2.prototype.toHex = function() {
        return r3 = a(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, s2 = (o2 = r3.a) < 1 ? i(n(255 * o2)) : "", "#" + i(t2) + i(e2) + i(u2) + s2;
        var r3, t2, e2, u2, o2, s2;
      }, r2.prototype.toRgb = function() {
        return a(this.rgba);
      }, r2.prototype.toRgbString = function() {
        return r3 = a(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
        var r3, t2, n2, e2, u2;
      }, r2.prototype.toHsl = function() {
        return g(p(this.rgba));
      }, r2.prototype.toHslString = function() {
        return r3 = g(p(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
        var r3, t2, n2, e2, u2;
      }, r2.prototype.toHsv = function() {
        return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
        var r3;
      }, r2.prototype.invert = function() {
        return j({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
        var r3;
      }, r2.prototype.saturate = function(r3) {
        return void 0 === r3 && (r3 = 0.1), j(M(this.rgba, r3));
      }, r2.prototype.desaturate = function(r3) {
        return void 0 === r3 && (r3 = 0.1), j(M(this.rgba, -r3));
      }, r2.prototype.grayscale = function() {
        return j(M(this.rgba, -1));
      }, r2.prototype.lighten = function(r3) {
        return void 0 === r3 && (r3 = 0.1), j(H(this.rgba, r3));
      }, r2.prototype.darken = function(r3) {
        return void 0 === r3 && (r3 = 0.1), j(H(this.rgba, -r3));
      }, r2.prototype.rotate = function(r3) {
        return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
      }, r2.prototype.alpha = function(r3) {
        return "number" == typeof r3 ? j({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
        var t2;
      }, r2.prototype.hue = function(r3) {
        var t2 = p(this.rgba);
        return "number" == typeof r3 ? j({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
      }, r2.prototype.isEqual = function(r3) {
        return this.toHex() === j(r3).toHex();
      }, r2;
    }();
    var j = function(r2) {
      return r2 instanceof $ ? r2 : new $(r2);
    };
    var w = [];
    exports2.Colord = $, exports2.colord = j, exports2.extend = function(r2) {
      r2.forEach(function(r3) {
        w.indexOf(r3) < 0 && (r3($, y), w.push(r3));
      });
    }, exports2.getFormat = function(r2) {
      return x(r2)[1];
    }, exports2.random = function() {
      return new $({ r: 255 * Math.random(), g: 255 * Math.random(), b: 255 * Math.random() });
    };
  }
});

// node_modules/@companion-module/base/dist/util.js
var require_util = __commonJS({
  "node_modules/@companion-module/base/dist/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.literal = literal;
    exports2.assertNever = assertNever;
    exports2.combineRgb = combineRgb;
    exports2.splitRgb = splitRgb;
    exports2.splitHsl = splitHsl;
    exports2.splitHsv = splitHsv;
    exports2.splitHex = splitHex;
    exports2.parseEscapeCharacters = parseEscapeCharacters;
    exports2.substituteEscapeCharacters = substituteEscapeCharacters;
    var colord_1 = require_colord();
    function literal(v) {
      return v;
    }
    function assertNever(_val) {
    }
    function combineRgb(r, g, b, a) {
      let colorNumber = (r & 255) << 16 | (g & 255) << 8 | b & 255;
      if (a && a >= 0 && a < 1) {
        colorNumber += 16777216 * Math.round(255 * (1 - a));
      }
      return colorNumber;
    }
    function splitRgb(color) {
      if (typeof color === "number") {
        if (color > 16777215) {
          return {
            r: color >> 16 & 255,
            g: color >> 8 & 255,
            b: color & 255,
            a: (255 - (color >> 24 & 255)) / 255
          };
        } else {
          return {
            r: color >> 16 & 255,
            g: color >> 8 & 255,
            b: color & 255,
            a: 1
          };
        }
      } else if (typeof color === "string" && (0, colord_1.colord)(color).isValid()) {
        const rgb = (0, colord_1.colord)(color).toRgb();
        return {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          a: rgb.a
        };
      } else {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
    }
    function splitHsl(color) {
      const rgb = splitRgb(color);
      const hsl = (0, colord_1.colord)(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`).toHsl();
      return hsl;
    }
    function splitHsv(color) {
      const rgb = splitRgb(color);
      const hsv = (0, colord_1.colord)(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`).toHsv();
      return hsv;
    }
    function splitHex(color) {
      const rgb = splitRgb(color);
      const hex = (0, colord_1.colord)(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`).toHex();
      return hex;
    }
    function parseEscapeCharacters(msg) {
      const message = msg.replaceAll("\\n", "\n").replaceAll("\\r", "\r").replaceAll("\\t", "	").replaceAll("\\f", "\f").replaceAll("\\v", "\v").replaceAll("\\b", "\b").replaceAll("\\\\", "\\").replaceAll("\\x00", "\0").replaceAll("\\x01", "").replaceAll("\\x02", "").replaceAll("\\x03", "");
      return message;
    }
    function substituteEscapeCharacters(msg) {
      const message = msg.replaceAll("\n", "\\n").replaceAll("\r", "\\r").replaceAll("	", "\\t").replaceAll("\f", "\\f").replaceAll("\v", "\\v").replaceAll("\b", "\\b").replaceAll("\\", "\\\\").replaceAll("\0", "\\x00").replaceAll("", "\\x01").replaceAll("", "\\x02").replaceAll("", "\\x03");
      return message;
    }
  }
});

// node_modules/p-queue/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/p-queue/node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then(
        (val) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => val),
        (err) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => {
          throw err;
        })
      );
    };
  }
});

// node_modules/p-queue/node_modules/p-timeout/index.js
var require_p_timeout = __commonJS({
  "node_modules/p-queue/node_modules/p-timeout/index.js"(exports2, module2) {
    "use strict";
    var pFinally = require_p_finally();
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    };
    var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
      if (typeof milliseconds !== "number" || milliseconds < 0) {
        throw new TypeError("Expected `milliseconds` to be a positive number");
      }
      if (milliseconds === Infinity) {
        resolve(promise);
        return;
      }
      const timer = setTimeout(() => {
        if (typeof fallback === "function") {
          try {
            resolve(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      pFinally(
        // eslint-disable-next-line promise/prefer-await-to-then
        promise.then(resolve, reject),
        () => {
          clearTimeout(timer);
        }
      );
    });
    module2.exports = pTimeout;
    module2.exports.default = pTimeout;
    module2.exports.TimeoutError = TimeoutError;
  }
});

// node_modules/p-queue/dist/lower-bound.js
var require_lower_bound = __commonJS({
  "node_modules/p-queue/dist/lower-bound.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function lowerBound(array, value, comparator) {
      let first = 0;
      let count = array.length;
      while (count > 0) {
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
          first = ++it;
          count -= step + 1;
        } else {
          count = step;
        }
      }
      return first;
    }
    exports2.default = lowerBound;
  }
});

// node_modules/p-queue/dist/priority-queue.js
var require_priority_queue = __commonJS({
  "node_modules/p-queue/dist/priority-queue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var lower_bound_1 = require_lower_bound();
    var PriorityQueue = class {
      constructor() {
        this._queue = [];
      }
      enqueue(run, options) {
        options = Object.assign({ priority: 0 }, options);
        const element = {
          priority: options.priority,
          run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
          this._queue.push(element);
          return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index, 0, element);
      }
      dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
      }
      filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
      }
      get size() {
        return this._queue.length;
      }
    };
    exports2.default = PriorityQueue;
  }
});

// node_modules/p-queue/dist/index.js
var require_dist = __commonJS({
  "node_modules/p-queue/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var EventEmitter = require_eventemitter3();
    var p_timeout_1 = require_p_timeout();
    var priority_queue_1 = require_priority_queue();
    var empty = () => {
    };
    var timeoutError = new p_timeout_1.TimeoutError();
    var PQueue = class extends EventEmitter {
      constructor(options) {
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
        if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
          throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
          throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
      }
      get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
      }
      get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
      }
      _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit("next");
      }
      _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
          this._resolveIdle();
          this._resolveIdle = empty;
          this.emit("idle");
        }
      }
      _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = void 0;
      }
      _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === void 0) {
          const delay = this._intervalEnd - now;
          if (delay < 0) {
            this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
          } else {
            if (this._timeoutId === void 0) {
              this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, delay);
            }
            return true;
          }
        }
        return false;
      }
      _tryToStartAnother() {
        if (this._queue.size === 0) {
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }
          this._intervalId = void 0;
          this._resolvePromises();
          return false;
        }
        if (!this._isPaused) {
          const canInitializeInterval = !this._isIntervalPaused();
          if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
            const job = this._queue.dequeue();
            if (!job) {
              return false;
            }
            this.emit("active");
            job();
            if (canInitializeInterval) {
              this._initializeIntervalIfNeeded();
            }
            return true;
          }
        }
        return false;
      }
      _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== void 0) {
          return;
        }
        this._intervalId = setInterval(() => {
          this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
      }
      _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = void 0;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
      }
      /**
      Executes all queued functions until it reaches the limit.
      */
      _processQueue() {
        while (this._tryToStartAnother()) {
        }
      }
      get concurrency() {
        return this._concurrency;
      }
      set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
          throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
      }
      /**
      Adds a sync or async task to the queue. Always returns a promise.
      */
      async add(fn, options = {}) {
        return new Promise((resolve, reject) => {
          const run = async () => {
            this._pendingCount++;
            this._intervalCount++;
            try {
              const operation = this._timeout === void 0 && options.timeout === void 0 ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === void 0 ? this._timeout : options.timeout, () => {
                if (options.throwOnTimeout === void 0 ? this._throwOnTimeout : options.throwOnTimeout) {
                  reject(timeoutError);
                }
                return void 0;
              });
              resolve(await operation);
            } catch (error) {
              reject(error);
            }
            this._next();
          };
          this._queue.enqueue(run, options);
          this._tryToStartAnother();
          this.emit("add");
        });
      }
      /**
          Same as `.add()`, but accepts an array of sync or async functions.
      
          @returns A promise that resolves when all functions are resolved.
          */
      async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
      }
      /**
      Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
      */
      start() {
        if (!this._isPaused) {
          return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
      }
      /**
      Put queue execution on hold.
      */
      pause() {
        this._isPaused = true;
      }
      /**
      Clear the queue.
      */
      clear() {
        this._queue = new this._queueClass();
      }
      /**
          Can be called multiple times. Useful if you for example add additional items at a later time.
      
          @returns A promise that settles when the queue becomes empty.
          */
      async onEmpty() {
        if (this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveEmpty;
          this._resolveEmpty = () => {
            existingResolve();
            resolve();
          };
        });
      }
      /**
          The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
      
          @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
          */
      async onIdle() {
        if (this._pendingCount === 0 && this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveIdle;
          this._resolveIdle = () => {
            existingResolve();
            resolve();
          };
        });
      }
      /**
      Size of the queue.
      */
      get size() {
        return this._queue.size;
      }
      /**
          Size of the queue, filtered by the given options.
      
          For example, this can be used to find the number of items remaining in the queue with a specific priority level.
          */
      sizeBy(options) {
        return this._queue.filter(options).length;
      }
      /**
      Number of pending promises.
      */
      get pending() {
        return this._pendingCount;
      }
      /**
      Whether the queue is currently paused.
      */
      get isPaused() {
        return this._isPaused;
      }
      get timeout() {
        return this._timeout;
      }
      /**
      Set the timeout for future operations.
      */
      set timeout(milliseconds) {
        this._timeout = milliseconds;
      }
    };
    exports2.default = PQueue;
  }
});

// node_modules/@companion-module/base/dist/internal/base.js
var require_base = __commonJS({
  "node_modules/@companion-module/base/dist/internal/base.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serializeIsVisibleFn = serializeIsVisibleFn;
    exports2.isInstanceBaseProps = isInstanceBaseProps;
    function serializeIsVisibleFn(options) {
      return (options ?? []).map((option) => {
        if ("isVisibleExpression" in option && typeof option.isVisibleExpression === "string") {
          return {
            ...option,
            isVisibleFnType: "expression",
            isVisibleFn: option.isVisibleExpression,
            isVisible: void 0,
            isVisibleExpression: void 0
          };
        } else if ("isVisible" in option && typeof option.isVisible === "function") {
          return {
            ...option,
            isVisibleFn: option.isVisible.toString(),
            isVisibleFnType: "function",
            isVisible: void 0,
            isVisibleExpression: void 0
          };
        }
        return {
          ...option,
          isVisible: void 0,
          isVisibleFn: void 0,
          isVisibleFnType: void 0,
          isVisibleExpression: void 0
        };
      });
    }
    function isInstanceBaseProps(obj) {
      const obj2 = obj;
      return typeof obj2 === "object" && typeof obj2.id === "string" && obj2._isInstanceBaseProps === true;
    }
  }
});

// node_modules/@companion-module/base/dist/internal/upgrade.js
var require_upgrade = __commonJS({
  "node_modules/@companion-module/base/dist/internal/upgrade.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.runThroughUpgradeScripts = runThroughUpgradeScripts;
    var util_js_1 = require_util();
    function clone(val) {
      return JSON.parse(JSON.stringify(val));
    }
    function runThroughUpgradeScripts(allActionsArray, allFeedbacksArray, defaultUpgradeIndex, upgradeScripts, config, secrets, skipConfigAndSecretsUpgrade) {
      const pendingUpgradesGrouped = /* @__PURE__ */ new Map();
      const getPendingUpgradeGroup = (i) => {
        let v = pendingUpgradesGrouped.get(i);
        if (!v) {
          v = { actions: [], feedbacks: [], config: false };
          pendingUpgradesGrouped.set(i, v);
        }
        return v;
      };
      for (const action of allActionsArray) {
        const upgradeIndex = action?.upgradeIndex ?? defaultUpgradeIndex;
        if (action && typeof upgradeIndex === "number") {
          const pending = getPendingUpgradeGroup(upgradeIndex);
          pending.actions.push(action.id);
        }
      }
      for (const feedback of allFeedbacksArray) {
        const upgradeIndex = feedback?.upgradeIndex ?? defaultUpgradeIndex;
        if (feedback && typeof upgradeIndex === "number") {
          const pending = getPendingUpgradeGroup(upgradeIndex);
          pending.feedbacks.push(feedback.id);
        }
      }
      if (!skipConfigAndSecretsUpgrade) {
        for (let i = defaultUpgradeIndex ?? -1; i < upgradeScripts.length; i++) {
          getPendingUpgradeGroup(i).config = true;
        }
      }
      const allActions = Object.fromEntries(allActionsArray.map((a) => [a.id, a]));
      const allFeedbacks = Object.fromEntries(allFeedbacksArray.map((a) => [a.id, a]));
      const updatedFeedbacks = {};
      const updatedActions = {};
      let updatedConfig;
      let updatedSecrets;
      if (pendingUpgradesGrouped.size > 0) {
        const pendingUpgradeGroups = Array.from(pendingUpgradesGrouped.keys()).sort();
        const firstUpgradeGroup = Math.min(...pendingUpgradeGroups, defaultUpgradeIndex ?? -1) + 1;
        const actionsIdsToUpgrade = [];
        const feedbackIdsToUpgrade = [];
        const targetCount = upgradeScripts.length;
        for (let i = firstUpgradeGroup; i < targetCount; i++) {
          const group = pendingUpgradesGrouped.get(i - 1);
          if (group) {
            actionsIdsToUpgrade.push(...group.actions);
            feedbackIdsToUpgrade.push(...group.feedbacks);
          }
          const upgradeConfigAndSecrets = !!group?.config;
          if (!upgradeConfigAndSecrets && actionsIdsToUpgrade.length === 0 && feedbackIdsToUpgrade.length === 0)
            continue;
          const inputConfig = updatedConfig ?? config;
          const inputSecrets = updatedSecrets ?? secrets;
          const fcn = upgradeScripts[i];
          const res = fcn({
            // Pass a clone to avoid mutations
            currentConfig: clone(inputConfig)
          }, {
            config: upgradeConfigAndSecrets ? inputConfig : null,
            secrets: upgradeConfigAndSecrets ? inputSecrets : null,
            // Only pass the actions & feedbacks which need upgrading from this version
            actions: actionsIdsToUpgrade.map((id) => {
              const inst = allActions[id];
              if (inst) {
                return (0, util_js_1.literal)({
                  id: inst.id,
                  controlId: inst.controlId,
                  actionId: inst.actionId,
                  options: inst.options !== void 0 ? clone(inst.options) : {}
                });
              }
            }).filter((v) => !!v),
            feedbacks: feedbackIdsToUpgrade.map((id) => {
              const inst = allFeedbacks[id];
              if (inst) {
                return (0, util_js_1.literal)({
                  id: inst.id,
                  controlId: inst.controlId,
                  feedbackId: inst.feedbackId,
                  options: inst.options !== void 0 ? clone(inst.options) : {},
                  // TODO - style?
                  isInverted: inst.isInverted
                });
              }
            }).filter((v) => !!v)
          });
          if (upgradeConfigAndSecrets && res.updatedConfig)
            updatedConfig = res.updatedConfig;
          if (upgradeConfigAndSecrets && res.updatedSecrets)
            updatedSecrets = res.updatedSecrets;
          for (const action of res.updatedActions) {
            if (action) {
              const instance = allActions[action.id];
              if (instance) {
                instance.actionId = action.actionId;
                instance.options = action.options;
                instance.upgradeIndex = i;
                updatedActions[action.id] = instance;
              }
            }
          }
          for (const feedback of res.updatedFeedbacks) {
            if (feedback) {
              const instance = allFeedbacks[feedback.id];
              if (instance) {
                instance.feedbackId = feedback.feedbackId;
                instance.options = feedback.options;
                instance.upgradeIndex = i;
                updatedFeedbacks[feedback.id] = {
                  ...instance,
                  style: updatedFeedbacks[feedback.id]?.style ?? feedback.style,
                  isInverted: feedback.isInverted ?? false
                };
              }
            }
          }
        }
        for (const [id, action] of Object.entries(allActions)) {
          if (!updatedActions[id] && typeof action?.upgradeIndex === "number") {
            updatedActions[id] = action;
          }
        }
        for (const [id, feedback] of Object.entries(allFeedbacks)) {
          if (!updatedFeedbacks[id] && typeof feedback?.upgradeIndex === "number") {
            updatedFeedbacks[id] = feedback;
          }
        }
      }
      return {
        updatedActions: Object.values(updatedActions),
        updatedFeedbacks: Object.values(updatedFeedbacks),
        updatedConfig,
        updatedSecrets,
        latestUpgradeIndex: upgradeScripts.length - 1
      };
    }
  }
});

// node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "node_modules/mimic-fn/index.js"(exports2, module2) {
    "use strict";
    var copyProperty = (to, from, property, ignoreNonConfigurable) => {
      if (property === "length" || property === "prototype") {
        return;
      }
      if (property === "arguments" || property === "caller") {
        return;
      }
      const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
      const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
      if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
        return;
      }
      Object.defineProperty(to, property, fromDescriptor);
    };
    var canCopyProperty = function(toDescriptor, fromDescriptor) {
      return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
    };
    var changePrototype = (to, from) => {
      const fromPrototype = Object.getPrototypeOf(from);
      if (fromPrototype === Object.getPrototypeOf(to)) {
        return;
      }
      Object.setPrototypeOf(to, fromPrototype);
    };
    var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
    var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
    var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
    var changeToString = (to, from, name) => {
      const withName = name === "" ? "" : `with ${name.trim()}() `;
      const newToString = wrappedToString.bind(null, withName, from.toString());
      Object.defineProperty(newToString, "name", toStringName);
      Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
    };
    var mimicFn = (to, from, { ignoreNonConfigurable = false } = {}) => {
      const { name } = to;
      for (const property of Reflect.ownKeys(from)) {
        copyProperty(to, from, property, ignoreNonConfigurable);
      }
      changePrototype(to, from);
      changeToString(to, from, name);
      return to;
    };
    module2.exports = mimicFn;
  }
});

// node_modules/@companion-module/base/lib/debounce-fn/index.js
var require_debounce_fn = __commonJS({
  "node_modules/@companion-module/base/lib/debounce-fn/index.js"(exports2, module2) {
    "use strict";
    var mimicFn = require_mimic_fn();
    module2.exports = (inputFunction, options = {}) => {
      if (typeof inputFunction !== "function") {
        throw new TypeError(`Expected the first argument to be a function, got \`${typeof inputFunction}\``);
      }
      const { wait = 0, maxWait = 0, before = false, after = true } = options;
      if (!before && !after) {
        throw new Error("Both `before` and `after` are false, function wouldn't be called.");
      }
      let timeout;
      let maxTimeout;
      let result;
      const debouncedFunction = function(...arguments_) {
        const context = this;
        const later = () => {
          timeout = void 0;
          if (maxTimeout) {
            clearTimeout(maxTimeout);
            maxTimeout = void 0;
          }
          if (after) {
            result = inputFunction.apply(context, arguments_);
          }
        };
        const maxLater = () => {
          maxTimeout = void 0;
          if (timeout) {
            clearTimeout(timeout);
            timeout = void 0;
          }
          result = inputFunction.apply(context, arguments_);
        };
        const shouldCallNow = before && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (maxWait > 0 && !maxTimeout && after) {
          maxTimeout = setTimeout(maxLater, maxWait);
        }
        if (shouldCallNow) {
          result = inputFunction.apply(context, arguments_);
        }
        return result;
      };
      mimicFn(debouncedFunction, inputFunction);
      debouncedFunction.cancel = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = void 0;
        }
        if (maxTimeout) {
          clearTimeout(maxTimeout);
          maxTimeout = void 0;
        }
      };
      return debouncedFunction;
    };
  }
});

// node_modules/@companion-module/base/dist/internal/feedback.js
var require_feedback = __commonJS({
  "node_modules/@companion-module/base/dist/internal/feedback.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FeedbackManager = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var base_js_1 = require_base();
    var index_js_1 = tslib_1.__importDefault(require_debounce_fn());
    var util_js_1 = require_util();
    function convertFeedbackInstanceToEvent(type, feedback) {
      return {
        type,
        id: feedback.id,
        feedbackId: feedback.feedbackId,
        controlId: feedback.controlId,
        options: feedback.options
      };
    }
    var FeedbackManager = class {
      #parseVariablesInString;
      #updateFeedbackValues;
      #setFeedbackDefinitions;
      #log;
      #feedbackDefinitions = /* @__PURE__ */ new Map();
      #feedbackInstances = /* @__PURE__ */ new Map();
      // Feedback values waiting to be sent
      #pendingFeedbackValues = /* @__PURE__ */ new Map();
      // Feedbacks currently being checked
      #feedbacksBeingChecked = /* @__PURE__ */ new Map();
      // while in a context which provides an alternate parseVariablesInString, we should log when the original is called
      #parseVariablesContext;
      get parseVariablesContext() {
        return this.#parseVariablesContext;
      }
      constructor(parseVariablesInString, updateFeedbackValues, setFeedbackDefinitions, log) {
        this.#parseVariablesInString = parseVariablesInString;
        this.#updateFeedbackValues = updateFeedbackValues;
        this.#setFeedbackDefinitions = setFeedbackDefinitions;
        this.#log = log;
      }
      getDefinitionIds() {
        return Array.from(this.#feedbackDefinitions.keys());
      }
      getInstanceIds() {
        return Array.from(this.#feedbackInstances.keys());
      }
      handleUpdateFeedbacks(feedbacks) {
        for (const [id, feedback] of Object.entries(feedbacks)) {
          const existing = this.#feedbackInstances.get(id);
          if (existing && !feedback) {
            const definition = this.#feedbackDefinitions.get(existing.feedbackId);
            if (definition?.unsubscribe) {
              const context = {
                parseVariablesInString: async (text) => {
                  return text;
                }
              };
              Promise.resolve(definition.unsubscribe(convertFeedbackInstanceToEvent(definition.type, existing), context)).catch((e) => {
                this.#log("error", `Feedback unsubscribe failed: ${JSON.stringify(existing)} - ${e?.message ?? e} ${e?.stack}`);
              });
            }
          }
          if (!feedback || feedback.disabled) {
            this.#feedbackInstances.delete(id);
          } else {
            this.#feedbackInstances.set(id, { ...feedback });
            if (!existing) {
              const definition = this.#feedbackDefinitions.get(feedback.feedbackId);
              if (definition?.subscribe) {
                const context = {
                  parseVariablesInString: async (text) => {
                    return text;
                  }
                };
                Promise.resolve(definition.subscribe(convertFeedbackInstanceToEvent(definition.type, feedback), context)).catch((e) => {
                  this.#log("error", `Feedback subscribe failed: ${JSON.stringify(feedback)} - ${e?.message ?? e} ${e?.stack}`);
                });
              }
            }
            this.#triggerCheckFeedback(id);
          }
        }
      }
      async handleLearnFeedback(msg) {
        const definition = this.#feedbackDefinitions.get(msg.feedback.feedbackId);
        if (definition && definition.learn) {
          const context = {
            parseVariablesInString: async (text) => {
              const res = await this.#parseVariablesInString({
                text,
                controlId: msg.feedback.controlId,
                actionInstanceId: void 0,
                feedbackInstanceId: msg.feedback.id
              });
              return res.text;
            }
          };
          const newOptions = await definition.learn({
            id: msg.feedback.id,
            feedbackId: msg.feedback.feedbackId,
            controlId: msg.feedback.controlId,
            options: msg.feedback.options,
            type: definition.type
          }, context);
          return {
            options: newOptions
          };
        } else {
          return {
            options: void 0
          };
        }
      }
      #triggerCheckFeedback(id) {
        const existingRecheck = this.#feedbacksBeingChecked.get(id);
        if (existingRecheck) {
          existingRecheck.needsRecheck = true;
          return;
        }
        const feedback0 = this.#feedbackInstances.get(id);
        if (!feedback0)
          return;
        const feedback = feedback0;
        const feedbackCheckStatus = {
          needsRecheck: false
        };
        this.#feedbacksBeingChecked.set(id, feedbackCheckStatus);
        Promise.resolve().then(async () => {
          const definition = this.#feedbackDefinitions.get(feedback.feedbackId);
          let value;
          if (definition) {
            this.#parseVariablesContext = `Feedback ${feedback.feedbackId} (${id})`;
            const context = {
              parseVariablesInString: async (text) => {
                const res = await this.#parseVariablesInString({
                  text,
                  controlId: feedback.controlId,
                  actionInstanceId: void 0,
                  feedbackInstanceId: id
                });
                return res.text;
              }
            };
            switch (definition.type) {
              case "boolean":
                value = definition.callback({
                  ...convertFeedbackInstanceToEvent("boolean", feedback),
                  type: "boolean"
                }, context);
                break;
              case "value":
                value = definition.callback({
                  ...convertFeedbackInstanceToEvent("value", feedback),
                  type: "value"
                }, context);
                break;
              case "advanced":
                value = definition.callback({
                  ...convertFeedbackInstanceToEvent("advanced", feedback),
                  type: "advanced",
                  image: feedback.image
                }, context);
                break;
              default:
                (0, util_js_1.assertNever)(definition);
                break;
            }
            this.#parseVariablesContext = void 0;
          }
          const resolvedValue = await value;
          this.#pendingFeedbackValues.set(id, {
            id,
            controlId: feedback.controlId,
            value: resolvedValue
          });
          this.#sendFeedbackValues();
        }).catch((e) => {
          console.error(`Feedback check failed: ${JSON.stringify(feedback)} - ${e?.message ?? e} ${e?.stack}`);
        }).finally(() => {
          this.#parseVariablesContext = void 0;
          this.#feedbacksBeingChecked.delete(id);
          if (feedbackCheckStatus.needsRecheck) {
            setImmediate(() => {
              this.#triggerCheckFeedback(id);
            });
          }
        });
      }
      /**
       * Send pending feedback values (from this.#pendingFeedbackValues) to companion, with a debounce
       */
      #sendFeedbackValues = (0, index_js_1.default)(() => {
        const newValues = this.#pendingFeedbackValues;
        this.#pendingFeedbackValues = /* @__PURE__ */ new Map();
        if (newValues.size > 0) {
          this.#updateFeedbackValues({
            values: Array.from(newValues.values())
          });
        }
      }, {
        wait: 5,
        maxWait: 25
      });
      setFeedbackDefinitions(feedbacks) {
        const hostFeedbacks = [];
        this.#feedbackDefinitions.clear();
        for (const [feedbackId, feedback] of Object.entries(feedbacks)) {
          if (feedback) {
            hostFeedbacks.push({
              id: feedbackId,
              name: feedback.name,
              description: feedback.description,
              options: (0, base_js_1.serializeIsVisibleFn)(feedback.options),
              type: feedback.type,
              defaultStyle: feedback.type === "boolean" ? feedback.defaultStyle : void 0,
              hasLearn: !!feedback.learn,
              learnTimeout: feedback.learnTimeout,
              showInvert: feedback.type === "boolean" ? feedback.showInvert : false
            });
            this.#feedbackDefinitions.set(feedbackId, feedback);
          }
        }
        this.#setFeedbackDefinitions({ feedbacks: hostFeedbacks });
      }
      checkFeedbacks(feedbackTypes) {
        const types = new Set(feedbackTypes);
        for (const [id, feedback] of this.#feedbackInstances.entries()) {
          const definition = this.#feedbackDefinitions.get(feedback.feedbackId);
          if (definition) {
            if (types.size === 0 || types.has(feedback.feedbackId)) {
              this.#triggerCheckFeedback(id);
            }
          }
        }
      }
      checkFeedbacksById(feedbackIds) {
        for (const id of feedbackIds) {
          this.#triggerCheckFeedback(id);
        }
      }
      subscribeFeedbacks(feedbackIds) {
        let feedbacks = Array.from(this.#feedbackInstances.values());
        const feedbackIdSet = new Set(feedbackIds);
        if (feedbackIdSet.size)
          feedbacks = feedbacks.filter((fb) => feedbackIdSet.has(fb.feedbackId));
        for (const fb of feedbacks) {
          const def = this.#feedbackDefinitions.get(fb.feedbackId);
          if (def?.subscribe) {
            const context = {
              parseVariablesInString: async (text) => {
                return text;
              }
            };
            Promise.resolve(def.subscribe(convertFeedbackInstanceToEvent(def.type, fb), context)).catch((e) => {
              this.#log("error", `Feedback subscribe failed: ${JSON.stringify(fb)} - ${e?.message ?? e} ${e?.stack}`);
            });
          }
        }
      }
      unsubscribeFeedbacks(feedbackIds) {
        let feedbacks = Array.from(this.#feedbackInstances.values());
        const feedbackIdSet = new Set(feedbackIds);
        if (feedbackIdSet.size)
          feedbacks = feedbacks.filter((fb) => feedbackIdSet.has(fb.feedbackId));
        for (const fb of feedbacks) {
          const def = this.#feedbackDefinitions.get(fb.feedbackId);
          if (def && def.unsubscribe) {
            const context = {
              parseVariablesInString: async (text) => {
                return text;
              }
            };
            Promise.resolve(def.unsubscribe(convertFeedbackInstanceToEvent(def.type, fb), context)).catch((e) => {
              this.#log("error", `Feedback unsubscribe failed: ${JSON.stringify(fb)} - ${e?.message ?? e} ${e?.stack}`);
            });
          }
        }
      }
    };
    exports2.FeedbackManager = FeedbackManager;
  }
});

// node_modules/ejson/index.js
var require_ejson = __commonJS({
  "node_modules/ejson/index.js"(exports2, module2) {
    (function() {
      "use strict";
      var __webpack_modules__ = [
        ,
        /* 1 */
        /***/
        function(__unused_webpack_module, exports3) {
          Object.defineProperty(exports3, "__esModule", {
            value: true
          });
          exports3.lengthOf = exports3.keysOf = exports3.isObject = exports3.isInfOrNaN = exports3.isFunction = exports3.isArguments = exports3.hasOwn = exports3.handleError = exports3.convertMapToObject = exports3.checkError = void 0;
          function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
          }
          function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _unsupportedIterableToArray(o, minLen) {
            if (!o)
              return;
            if (typeof o === "string")
              return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
              n = o.constructor.name;
            if (n === "Map" || n === "Set")
              return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
              return _arrayLikeToArray(o, minLen);
          }
          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
              len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }
          function _iterableToArrayLimit(arr, i) {
            var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
            if (_i == null)
              return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _s, _e;
            try {
              for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i)
                  break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null)
                  _i["return"]();
              } finally {
                if (_d)
                  throw _e;
              }
            }
            return _arr;
          }
          function _arrayWithHoles(arr) {
            if (Array.isArray(arr))
              return arr;
          }
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          var isFunction = function isFunction2(fn) {
            return typeof fn === "function";
          };
          exports3.isFunction = isFunction;
          var isObject = function isObject2(fn) {
            return _typeof(fn) === "object";
          };
          exports3.isObject = isObject;
          var keysOf = function keysOf2(obj) {
            return Object.keys(obj);
          };
          exports3.keysOf = keysOf;
          var lengthOf = function lengthOf2(obj) {
            return Object.keys(obj).length;
          };
          exports3.lengthOf = lengthOf;
          var hasOwn = function hasOwn2(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
          };
          exports3.hasOwn = hasOwn;
          var convertMapToObject = function convertMapToObject2(map) {
            return Array.from(map).reduce(function(acc, _ref) {
              var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
              acc[key] = value;
              return acc;
            }, {});
          };
          exports3.convertMapToObject = convertMapToObject;
          var isArguments = function isArguments2(obj) {
            return obj != null && hasOwn(obj, "callee");
          };
          exports3.isArguments = isArguments;
          var isInfOrNaN = function isInfOrNaN2(obj) {
            return Number.isNaN(obj) || obj === Infinity || obj === -Infinity;
          };
          exports3.isInfOrNaN = isInfOrNaN;
          var checkError = {
            maxStack: function maxStack(msgError) {
              return new RegExp("Maximum call stack size exceeded", "g").test(msgError);
            }
          };
          exports3.checkError = checkError;
          var handleError = function handleError2(fn) {
            return function() {
              try {
                return fn.apply(this, arguments);
              } catch (error) {
                var isMaxStack = checkError.maxStack(error.message);
                if (isMaxStack) {
                  throw new Error("Converting circular structure to JSON");
                }
                throw error;
              }
            };
          };
          exports3.handleError = handleError;
        },
        /* 2 */
        /***/
        function(__unused_webpack_module, exports3) {
          Object.defineProperty(exports3, "__esModule", {
            value: true
          });
          exports3.Base64 = void 0;
          var BASE_64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var BASE_64_VALS = /* @__PURE__ */ Object.create(null);
          var getChar = function getChar2(val) {
            return BASE_64_CHARS.charAt(val);
          };
          var getVal = function getVal2(ch) {
            return ch === "=" ? -1 : BASE_64_VALS[ch];
          };
          for (var i = 0; i < BASE_64_CHARS.length; i++) {
            BASE_64_VALS[getChar(i)] = i;
          }
          ;
          var encode = function encode2(array) {
            if (typeof array === "string") {
              var str = array;
              array = newBinary(str.length);
              for (var _i = 0; _i < str.length; _i++) {
                var ch = str.charCodeAt(_i);
                if (ch > 255) {
                  throw new Error("Not ascii. Base64.encode can only take ascii strings.");
                }
                array[_i] = ch;
              }
            }
            var answer = [];
            var a = null;
            var b = null;
            var c = null;
            var d = null;
            for (var _i2 = 0; _i2 < array.length; _i2++) {
              switch (_i2 % 3) {
                case 0:
                  a = array[_i2] >> 2 & 63;
                  b = (array[_i2] & 3) << 4;
                  break;
                case 1:
                  b = b | array[_i2] >> 4 & 15;
                  c = (array[_i2] & 15) << 2;
                  break;
                case 2:
                  c = c | array[_i2] >> 6 & 3;
                  d = array[_i2] & 63;
                  answer.push(getChar(a));
                  answer.push(getChar(b));
                  answer.push(getChar(c));
                  answer.push(getChar(d));
                  a = null;
                  b = null;
                  c = null;
                  d = null;
                  break;
              }
            }
            if (a != null) {
              answer.push(getChar(a));
              answer.push(getChar(b));
              if (c == null) {
                answer.push("=");
              } else {
                answer.push(getChar(c));
              }
              if (d == null) {
                answer.push("=");
              }
            }
            return answer.join("");
          };
          var newBinary = function newBinary2(len) {
            if (typeof Uint8Array === "undefined" || typeof ArrayBuffer === "undefined") {
              var ret = [];
              for (var _i3 = 0; _i3 < len; _i3++) {
                ret.push(0);
              }
              ret.$Uint8ArrayPolyfill = true;
              return ret;
            }
            return new Uint8Array(new ArrayBuffer(len));
          };
          var decode = function decode2(str) {
            var len = Math.floor(str.length * 3 / 4);
            if (str.charAt(str.length - 1) == "=") {
              len--;
              if (str.charAt(str.length - 2) == "=") {
                len--;
              }
            }
            var arr = newBinary(len);
            var one = null;
            var two = null;
            var three = null;
            var j = 0;
            for (var _i4 = 0; _i4 < str.length; _i4++) {
              var c = str.charAt(_i4);
              var v = getVal(c);
              switch (_i4 % 4) {
                case 0:
                  if (v < 0) {
                    throw new Error("invalid base64 string");
                  }
                  one = v << 2;
                  break;
                case 1:
                  if (v < 0) {
                    throw new Error("invalid base64 string");
                  }
                  one = one | v >> 4;
                  arr[j++] = one;
                  two = (v & 15) << 4;
                  break;
                case 2:
                  if (v >= 0) {
                    two = two | v >> 2;
                    arr[j++] = two;
                    three = (v & 3) << 6;
                  }
                  break;
                case 3:
                  if (v >= 0) {
                    arr[j++] = three | v;
                  }
                  break;
              }
            }
            return arr;
          };
          var Base64 = {
            encode,
            decode,
            newBinary
          };
          exports3.Base64 = Base64;
        },
        /* 3 */
        /***/
        function(module3) {
          module3.exports = {
            //
            // When fibers are not supported on you system Meteor automatically sets this
            // function to a nope function. We're going to do the same here as there are
            // small parts of the code that call this function.
            //
            _noYieldsAllowed: function _noYieldsAllowed(f) {
              return f();
            }
          };
        },
        /* 4 */
        /***/
        function(module3, exports3) {
          Object.defineProperty(exports3, "__esModule", {
            value: true
          });
          exports3["default"] = void 0;
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
              return typeof obj2;
            } : function(obj2) {
              return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            }, _typeof(obj);
          }
          function quote(string) {
            return JSON.stringify(string);
          }
          var str = function str2(key, holder, singleIndent, outerIndent, canonical) {
            var value = holder[key];
            switch (_typeof(value)) {
              case "string":
                return quote(value);
              case "number":
                return isFinite(value) ? String(value) : "null";
              case "boolean":
                return String(value);
              case "object": {
                if (!value) {
                  return "null";
                }
                var innerIndent = outerIndent + singleIndent;
                var partial = [];
                var v;
                if (Array.isArray(value) || {}.hasOwnProperty.call(value, "callee")) {
                  var length = value.length;
                  for (var i = 0; i < length; i += 1) {
                    partial[i] = str2(i, value, singleIndent, innerIndent, canonical) || "null";
                  }
                  if (partial.length === 0) {
                    v = "[]";
                  } else if (innerIndent) {
                    v = "[\n" + innerIndent + partial.join(",\n" + innerIndent) + "\n" + outerIndent + "]";
                  } else {
                    v = "[" + partial.join(",") + "]";
                  }
                  return v;
                }
                var keys = Object.keys(value);
                if (canonical) {
                  keys = keys.sort();
                }
                keys.forEach(function(k) {
                  v = str2(k, value, singleIndent, innerIndent, canonical);
                  if (v) {
                    partial.push(quote(k) + (innerIndent ? ": " : ":") + v);
                  }
                });
                if (partial.length === 0) {
                  v = "{}";
                } else if (innerIndent) {
                  v = "{\n" + innerIndent + partial.join(",\n" + innerIndent) + "\n" + outerIndent + "}";
                } else {
                  v = "{" + partial.join(",") + "}";
                }
                return v;
              }
              default:
            }
          };
          var canonicalStringify = function canonicalStringify2(value, options) {
            var allOptions = Object.assign({
              indent: "",
              canonical: false
            }, options);
            if (allOptions.indent === true) {
              allOptions.indent = "  ";
            } else if (typeof allOptions.indent === "number") {
              var newIndent = "";
              for (var i = 0; i < allOptions.indent; i++) {
                newIndent += " ";
              }
              allOptions.indent = newIndent;
            }
            return str("", {
              "": value
            }, allOptions.indent, "", allOptions.canonical);
          };
          var _default = canonicalStringify;
          exports3["default"] = _default;
          module3.exports = exports3.default;
        }
        /******/
      ];
      var __webpack_module_cache__ = {};
      function __webpack_require__2(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) {
          return cachedModule.exports;
        }
        var module3 = __webpack_module_cache__[moduleId] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        __webpack_modules__[moduleId](module3, module3.exports, __webpack_require__2);
        return module3.exports;
      }
      var __webpack_exports__ = {};
      !function() {
        var exports3 = __webpack_exports__;
        var Base64 = __webpack_require__2(2)["Base64"];
        var Meteor = __webpack_require__2(3);
        Object.defineProperty(exports3, "__esModule", {
          value: true
        });
        exports3.EJSON = void 0;
        var _utils = __webpack_require__2(1);
        var EJSON = {};
        exports3.EJSON = EJSON;
        var customTypes = /* @__PURE__ */ new Map();
        EJSON.addType = function(name, factory) {
          if (customTypes.has(name)) {
            throw new Error("Type ".concat(name, " already present"));
          }
          customTypes.set(name, factory);
        };
        var builtinConverters = [{
          // Date
          matchJSONValue: function matchJSONValue(obj) {
            return (0, _utils.hasOwn)(obj, "$date") && (0, _utils.lengthOf)(obj) === 1;
          },
          matchObject: function matchObject(obj) {
            return obj instanceof Date;
          },
          toJSONValue: function toJSONValue(obj) {
            return {
              $date: obj.getTime()
            };
          },
          fromJSONValue: function fromJSONValue(obj) {
            return new Date(obj.$date);
          }
        }, {
          // RegExp
          matchJSONValue: function matchJSONValue(obj) {
            return (0, _utils.hasOwn)(obj, "$regexp") && (0, _utils.hasOwn)(obj, "$flags") && (0, _utils.lengthOf)(obj) === 2;
          },
          matchObject: function matchObject(obj) {
            return obj instanceof RegExp;
          },
          toJSONValue: function toJSONValue(regexp) {
            return {
              $regexp: regexp.source,
              $flags: regexp.flags
            };
          },
          fromJSONValue: function fromJSONValue(obj) {
            return new RegExp(obj.$regexp, obj.$flags.slice(0, 50).replace(/[^gimuy]/g, "").replace(/(.)(?=.*\1)/g, ""));
          }
        }, {
          // NaN, Inf, -Inf. (These are the only objects with typeof !== 'object'
          // which we match.)
          matchJSONValue: function matchJSONValue(obj) {
            return (0, _utils.hasOwn)(obj, "$InfNaN") && (0, _utils.lengthOf)(obj) === 1;
          },
          matchObject: _utils.isInfOrNaN,
          toJSONValue: function toJSONValue(obj) {
            var sign;
            if (Number.isNaN(obj)) {
              sign = 0;
            } else if (obj === Infinity) {
              sign = 1;
            } else {
              sign = -1;
            }
            return {
              $InfNaN: sign
            };
          },
          fromJSONValue: function fromJSONValue(obj) {
            return obj.$InfNaN / 0;
          }
        }, {
          // Binary
          matchJSONValue: function matchJSONValue(obj) {
            return (0, _utils.hasOwn)(obj, "$binary") && (0, _utils.lengthOf)(obj) === 1;
          },
          matchObject: function matchObject(obj) {
            return typeof Uint8Array !== "undefined" && obj instanceof Uint8Array || obj && (0, _utils.hasOwn)(obj, "$Uint8ArrayPolyfill");
          },
          toJSONValue: function toJSONValue(obj) {
            return {
              $binary: Base64.encode(obj)
            };
          },
          fromJSONValue: function fromJSONValue(obj) {
            return Base64.decode(obj.$binary);
          }
        }, {
          // Escaping one level
          matchJSONValue: function matchJSONValue(obj) {
            return (0, _utils.hasOwn)(obj, "$escape") && (0, _utils.lengthOf)(obj) === 1;
          },
          matchObject: function matchObject(obj) {
            var match = false;
            if (obj) {
              var keyCount = (0, _utils.lengthOf)(obj);
              if (keyCount === 1 || keyCount === 2) {
                match = builtinConverters.some(function(converter) {
                  return converter.matchJSONValue(obj);
                });
              }
            }
            return match;
          },
          toJSONValue: function toJSONValue(obj) {
            var newObj = {};
            (0, _utils.keysOf)(obj).forEach(function(key) {
              newObj[key] = EJSON.toJSONValue(obj[key]);
            });
            return {
              $escape: newObj
            };
          },
          fromJSONValue: function fromJSONValue(obj) {
            var newObj = {};
            (0, _utils.keysOf)(obj.$escape).forEach(function(key) {
              newObj[key] = EJSON.fromJSONValue(obj.$escape[key]);
            });
            return newObj;
          }
        }, {
          // Custom
          matchJSONValue: function matchJSONValue(obj) {
            return (0, _utils.hasOwn)(obj, "$type") && (0, _utils.hasOwn)(obj, "$value") && (0, _utils.lengthOf)(obj) === 2;
          },
          matchObject: function matchObject(obj) {
            return EJSON._isCustomType(obj);
          },
          toJSONValue: function toJSONValue(obj) {
            var jsonValue = Meteor._noYieldsAllowed(function() {
              return obj.toJSONValue();
            });
            return {
              $type: obj.typeName(),
              $value: jsonValue
            };
          },
          fromJSONValue: function fromJSONValue(obj) {
            var typeName = obj.$type;
            if (!customTypes.has(typeName)) {
              throw new Error("Custom EJSON type ".concat(typeName, " is not defined"));
            }
            var converter = customTypes.get(typeName);
            return Meteor._noYieldsAllowed(function() {
              return converter(obj.$value);
            });
          }
        }];
        EJSON._isCustomType = function(obj) {
          return obj && (0, _utils.isFunction)(obj.toJSONValue) && (0, _utils.isFunction)(obj.typeName) && customTypes.has(obj.typeName());
        };
        EJSON._getTypes = function() {
          var isOriginal = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
          return isOriginal ? customTypes : (0, _utils.convertMapToObject)(customTypes);
        };
        EJSON._getConverters = function() {
          return builtinConverters;
        };
        var toJSONValueHelper = function toJSONValueHelper2(item) {
          for (var i = 0; i < builtinConverters.length; i++) {
            var converter = builtinConverters[i];
            if (converter.matchObject(item)) {
              return converter.toJSONValue(item);
            }
          }
          return void 0;
        };
        var adjustTypesToJSONValue = function adjustTypesToJSONValue2(obj) {
          if (obj === null) {
            return null;
          }
          var maybeChanged = toJSONValueHelper(obj);
          if (maybeChanged !== void 0) {
            return maybeChanged;
          }
          if (!(0, _utils.isObject)(obj)) {
            return obj;
          }
          (0, _utils.keysOf)(obj).forEach(function(key) {
            var value = obj[key];
            if (!(0, _utils.isObject)(value) && value !== void 0 && !(0, _utils.isInfOrNaN)(value)) {
              return;
            }
            var changed = toJSONValueHelper(value);
            if (changed) {
              obj[key] = changed;
              return;
            }
            adjustTypesToJSONValue2(value);
          });
          return obj;
        };
        EJSON._adjustTypesToJSONValue = adjustTypesToJSONValue;
        EJSON.toJSONValue = function(item) {
          var changed = toJSONValueHelper(item);
          if (changed !== void 0) {
            return changed;
          }
          var newItem = item;
          if ((0, _utils.isObject)(item)) {
            newItem = EJSON.clone(item);
            adjustTypesToJSONValue(newItem);
          }
          return newItem;
        };
        var fromJSONValueHelper = function fromJSONValueHelper2(value) {
          if ((0, _utils.isObject)(value) && value !== null) {
            var keys = (0, _utils.keysOf)(value);
            if (keys.length <= 2 && keys.every(function(k) {
              return typeof k === "string" && k.substr(0, 1) === "$";
            })) {
              for (var i = 0; i < builtinConverters.length; i++) {
                var converter = builtinConverters[i];
                if (converter.matchJSONValue(value)) {
                  return converter.fromJSONValue(value);
                }
              }
            }
          }
          return value;
        };
        var adjustTypesFromJSONValue = function adjustTypesFromJSONValue2(obj) {
          if (obj === null) {
            return null;
          }
          var maybeChanged = fromJSONValueHelper(obj);
          if (maybeChanged !== obj) {
            return maybeChanged;
          }
          if (!(0, _utils.isObject)(obj)) {
            return obj;
          }
          (0, _utils.keysOf)(obj).forEach(function(key) {
            var value = obj[key];
            if ((0, _utils.isObject)(value)) {
              var changed = fromJSONValueHelper(value);
              if (value !== changed) {
                obj[key] = changed;
                return;
              }
              adjustTypesFromJSONValue2(value);
            }
          });
          return obj;
        };
        EJSON._adjustTypesFromJSONValue = adjustTypesFromJSONValue;
        EJSON.fromJSONValue = function(item) {
          var changed = fromJSONValueHelper(item);
          if (changed === item && (0, _utils.isObject)(item)) {
            changed = EJSON.clone(item);
            adjustTypesFromJSONValue(changed);
          }
          return changed;
        };
        EJSON.stringify = (0, _utils.handleError)(function(item, options) {
          var serialized;
          var json = EJSON.toJSONValue(item);
          if (options && (options.canonical || options.indent)) {
            var canonicalStringify = __webpack_require__2(4);
            serialized = canonicalStringify(json, options);
          } else {
            serialized = JSON.stringify(json);
          }
          return serialized;
        });
        EJSON.parse = function(item) {
          if (typeof item !== "string") {
            throw new Error("EJSON.parse argument should be a string");
          }
          return EJSON.fromJSONValue(JSON.parse(item));
        };
        EJSON.isBinary = function(obj) {
          return !!(typeof Uint8Array !== "undefined" && obj instanceof Uint8Array || obj && obj.$Uint8ArrayPolyfill);
        };
        EJSON.equals = function(a, b, options) {
          var i;
          var keyOrderSensitive = !!(options && options.keyOrderSensitive);
          if (a === b) {
            return true;
          }
          if (Number.isNaN(a) && Number.isNaN(b)) {
            return true;
          }
          if (!a || !b) {
            return false;
          }
          if (!((0, _utils.isObject)(a) && (0, _utils.isObject)(b))) {
            return false;
          }
          if (a instanceof Date && b instanceof Date) {
            return a.valueOf() === b.valueOf();
          }
          if (EJSON.isBinary(a) && EJSON.isBinary(b)) {
            if (a.length !== b.length) {
              return false;
            }
            for (i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) {
                return false;
              }
            }
            return true;
          }
          if ((0, _utils.isFunction)(a.equals)) {
            return a.equals(b, options);
          }
          if ((0, _utils.isFunction)(b.equals)) {
            return b.equals(a, options);
          }
          var aIsArray = Array.isArray(a);
          var bIsArray = Array.isArray(b);
          if (aIsArray !== bIsArray) {
            return false;
          }
          if (aIsArray && bIsArray) {
            if (a.length !== b.length) {
              return false;
            }
            for (i = 0; i < a.length; i++) {
              if (!EJSON.equals(a[i], b[i], options)) {
                return false;
              }
            }
            return true;
          }
          switch (EJSON._isCustomType(a) + EJSON._isCustomType(b)) {
            case 1:
              return false;
            case 2:
              return EJSON.equals(EJSON.toJSONValue(a), EJSON.toJSONValue(b));
            default:
          }
          var ret;
          var aKeys = (0, _utils.keysOf)(a);
          var bKeys = (0, _utils.keysOf)(b);
          if (keyOrderSensitive) {
            i = 0;
            ret = aKeys.every(function(key) {
              if (i >= bKeys.length) {
                return false;
              }
              if (key !== bKeys[i]) {
                return false;
              }
              if (!EJSON.equals(a[key], b[bKeys[i]], options)) {
                return false;
              }
              i++;
              return true;
            });
          } else {
            i = 0;
            ret = aKeys.every(function(key) {
              if (!(0, _utils.hasOwn)(b, key)) {
                return false;
              }
              if (!EJSON.equals(a[key], b[key], options)) {
                return false;
              }
              i++;
              return true;
            });
          }
          return ret && i === bKeys.length;
        };
        EJSON.clone = function(v) {
          var ret;
          if (!(0, _utils.isObject)(v)) {
            return v;
          }
          if (v === null) {
            return null;
          }
          if (v instanceof Date) {
            return new Date(v.getTime());
          }
          if (v instanceof RegExp) {
            return v;
          }
          if (EJSON.isBinary(v)) {
            ret = EJSON.newBinary(v.length);
            for (var i = 0; i < v.length; i++) {
              ret[i] = v[i];
            }
            return ret;
          }
          if (Array.isArray(v)) {
            return v.map(EJSON.clone);
          }
          if ((0, _utils.isArguments)(v)) {
            return Array.from(v).map(EJSON.clone);
          }
          if ((0, _utils.isFunction)(v.clone)) {
            return v.clone();
          }
          if (EJSON._isCustomType(v)) {
            return EJSON.fromJSONValue(EJSON.clone(EJSON.toJSONValue(v)), true);
          }
          ret = {};
          (0, _utils.keysOf)(v).forEach(function(key) {
            ret[key] = EJSON.clone(v[key]);
          });
          return ret;
        };
        EJSON.newBinary = Base64.newBinary;
      }();
      module2.exports = __webpack_exports__.EJSON;
    })();
  }
});

// node_modules/@companion-module/base/dist/host-api/ipc-wrapper.js
var require_ipc_wrapper = __commonJS({
  "node_modules/@companion-module/base/dist/host-api/ipc-wrapper.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IpcWrapper = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var util_js_1 = require_util();
    var ejson_1 = tslib_1.__importDefault(require_ejson());
    var MAX_CALLBACK_ID = 1 << 28;
    var IpcWrapper = class {
      #handlers;
      #sendMessage;
      #defaultTimeout;
      #nextCallbackId = 1;
      #pendingCallbacks = /* @__PURE__ */ new Map();
      constructor(handlers, sendMessage, defaultTimeout) {
        this.#handlers = handlers;
        this.#sendMessage = sendMessage;
        this.#defaultTimeout = defaultTimeout;
      }
      async sendWithCb(name, msg, defaultResponse, timeout = 0) {
        if (timeout <= 0)
          timeout = this.#defaultTimeout;
        const callbacks = { timeout: void 0, resolve: () => null, reject: () => null };
        const promise = new Promise((resolve, reject) => {
          callbacks.resolve = resolve;
          callbacks.reject = reject;
        });
        if (this.#nextCallbackId > MAX_CALLBACK_ID)
          this.#nextCallbackId = 1;
        const id = this.#nextCallbackId++;
        this.#pendingCallbacks.set(id, callbacks);
        this.#sendMessage({
          direction: "call",
          name: String(name),
          payload: ejson_1.default.stringify(msg),
          callbackId: id
        });
        const timeoutError = new Error("Call timed out");
        callbacks.timeout = setTimeout(() => {
          callbacks.reject(defaultResponse ? defaultResponse() : timeoutError);
          this.#pendingCallbacks.delete(id);
        }, timeout);
        return promise;
      }
      sendWithNoCb(name, msg) {
        this.#sendMessage({
          direction: "call",
          name: String(name),
          payload: ejson_1.default.stringify(msg),
          callbackId: void 0
        });
      }
      receivedMessage(msg) {
        const rawMsg = msg;
        switch (msg.direction) {
          case "call": {
            const handler = this.#handlers[msg.name];
            if (!handler) {
              if (msg.callbackId) {
                this.#sendMessage({
                  direction: "response",
                  callbackId: msg.callbackId,
                  success: false,
                  payload: ejson_1.default.stringify({ message: `Unknown command "${msg.name}"` })
                });
              }
              return;
            }
            const data = msg.payload ? ejson_1.default.parse(msg.payload) : void 0;
            handler(data).then((res) => {
              if (msg.callbackId) {
                this.#sendMessage({
                  direction: "response",
                  callbackId: msg.callbackId,
                  success: true,
                  payload: ejson_1.default.stringify(res)
                });
              }
            }, (err) => {
              if (msg.callbackId) {
                this.#sendMessage({
                  direction: "response",
                  callbackId: msg.callbackId,
                  success: false,
                  payload: err instanceof Error ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : ejson_1.default.stringify(err)
                });
              }
            });
            break;
          }
          case "response": {
            if (!msg.callbackId) {
              console.error(`Ipc: Response message has no callbackId`);
              return;
            }
            const callbacks = this.#pendingCallbacks.get(msg.callbackId);
            this.#pendingCallbacks.delete(msg.callbackId);
            if (!callbacks) {
              return;
            }
            clearTimeout(callbacks.timeout);
            const data = msg.payload ? ejson_1.default.parse(msg.payload) : void 0;
            if (msg.success) {
              callbacks.resolve(data);
            } else {
              let err = data;
              if (data && typeof data === "object" && "message" in data) {
                err = new Error(data.message);
                if (data.stack)
                  err.stack = data.stack;
              }
              callbacks.reject(err);
            }
            break;
          }
          default:
            (0, util_js_1.assertNever)(msg);
            console.error(`Ipc: Message of unknown direction "${rawMsg.direction}"`);
            break;
        }
      }
    };
    exports2.IpcWrapper = IpcWrapper;
  }
});

// node_modules/@companion-module/base/dist/internal/actions.js
var require_actions = __commonJS({
  "node_modules/@companion-module/base/dist/internal/actions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ActionManager = void 0;
    var base_js_1 = require_base();
    function convertActionInstanceToEvent(action) {
      return {
        id: action.id,
        actionId: action.actionId,
        controlId: action.controlId,
        options: action.options
      };
    }
    var ActionManager = class {
      #parseVariablesInString;
      #setActionDefinitions;
      #setCustomVariableValue;
      #log;
      #actionDefinitions = /* @__PURE__ */ new Map();
      #actionInstances = /* @__PURE__ */ new Map();
      constructor(parseVariablesInString, setActionDefinitions, setCustomVariableValue, log) {
        this.#parseVariablesInString = parseVariablesInString;
        this.#setActionDefinitions = setActionDefinitions;
        this.#setCustomVariableValue = setCustomVariableValue;
        this.#log = log;
      }
      async handleExecuteAction(msg) {
        const actionDefinition = this.#actionDefinitions.get(msg.action.actionId);
        if (!actionDefinition) {
          return {
            success: false,
            errorMessage: `Action definition not found for: ${msg.action.actionId}`
          };
        }
        const context = {
          parseVariablesInString: async (text) => {
            const res = await this.#parseVariablesInString({
              text,
              controlId: msg.action.controlId,
              actionInstanceId: msg.action.id,
              feedbackInstanceId: void 0
            });
            return res.text;
          },
          setCustomVariableValue: (variableName, value) => {
            this.#setCustomVariableValue({
              customVariableId: variableName,
              value,
              controlId: msg.action.controlId
            });
          }
        };
        try {
          await actionDefinition.callback({
            id: msg.action.id,
            actionId: msg.action.actionId,
            controlId: msg.action.controlId,
            options: msg.action.options,
            surfaceId: msg.surfaceId
          }, context);
          return {
            success: true,
            errorMessage: void 0
          };
        } catch (e) {
          return {
            success: false,
            errorMessage: e?.message ?? String(e)
          };
        }
      }
      handleUpdateActions(actions) {
        for (const [id, action] of Object.entries(actions)) {
          const existing = this.#actionInstances.get(id);
          if (existing) {
            const definition = this.#actionDefinitions.get(existing.actionId);
            if (definition?.unsubscribe && !definition.skipUnsubscribeOnOptionsChange) {
              const context = {
                parseVariablesInString: async (text) => {
                  return text;
                },
                setCustomVariableValue: () => {
                  throw new Error(`setCustomVariableValue is not available during unsubscribe`);
                }
              };
              Promise.resolve(definition.unsubscribe(convertActionInstanceToEvent(existing), context)).catch((e) => {
                this.#log("error", `Action unsubscribe failed: ${JSON.stringify(existing)} - ${e?.message ?? e} ${e?.stack}`);
              });
            }
          }
          if (!action || action.disabled) {
            this.#actionInstances.delete(id);
          } else {
            this.#actionInstances.set(id, action);
            const definition = this.#actionDefinitions.get(action.actionId);
            if (definition?.subscribe) {
              const context = {
                parseVariablesInString: async (text) => {
                  return text;
                },
                setCustomVariableValue: () => {
                  throw new Error(`setCustomVariableValue is not available during subscribe`);
                }
              };
              Promise.resolve(definition.subscribe(convertActionInstanceToEvent(action), context)).catch((e) => {
                this.#log("error", `Action subscribe failed: ${JSON.stringify(action)} - ${e?.message ?? e} ${e?.stack}`);
              });
            }
          }
        }
      }
      async handleLearnAction(msg) {
        const definition = this.#actionDefinitions.get(msg.action.actionId);
        if (definition && definition.learn) {
          const context = {
            parseVariablesInString: async (text) => {
              const res = await this.#parseVariablesInString({
                text,
                controlId: msg.action.controlId,
                actionInstanceId: msg.action.id,
                feedbackInstanceId: void 0
              });
              return res.text;
            },
            setCustomVariableValue: () => {
              throw new Error(`setCustomVariableValue is not available during learn`);
            }
          };
          const newOptions = await definition.learn({
            id: msg.action.id,
            actionId: msg.action.actionId,
            controlId: msg.action.controlId,
            options: msg.action.options,
            surfaceId: void 0
          }, context);
          return {
            options: newOptions
          };
        } else {
          return {
            options: void 0
          };
        }
      }
      setActionDefinitions(actions) {
        const hostActions = [];
        this.#actionDefinitions.clear();
        for (const [actionId, action] of Object.entries(actions)) {
          if (action) {
            hostActions.push({
              id: actionId,
              name: action.name,
              description: action.description,
              options: (0, base_js_1.serializeIsVisibleFn)(action.options),
              optionsToIgnoreForSubscribe: action.optionsToIgnoreForSubscribe,
              hasLearn: !!action.learn,
              learnTimeout: action.learnTimeout,
              hasLifecycleFunctions: !!action.subscribe || !!action.unsubscribe
            });
            this.#actionDefinitions.set(actionId, action);
          }
        }
        this.#setActionDefinitions({ actions: hostActions });
      }
      subscribeActions(actionIds) {
        let actions = Array.from(this.#actionInstances.values());
        const actionIdSet = new Set(actionIds);
        if (actionIdSet.size)
          actions = actions.filter((fb) => actionIdSet.has(fb.actionId));
        for (const act of actions) {
          const def = this.#actionDefinitions.get(act.actionId);
          if (def?.subscribe) {
            const context = {
              parseVariablesInString: async (text) => {
                return text;
              },
              setCustomVariableValue: () => {
                throw new Error(`setCustomVariableValue is not available during subscribe`);
              }
            };
            Promise.resolve(def.subscribe(convertActionInstanceToEvent(act), context)).catch((e) => {
              this.#log("error", `Action subscribe failed: ${JSON.stringify(act)} - ${e?.message ?? e} ${e?.stack}`);
            });
          }
        }
      }
      unsubscribeActions(actionIds) {
        let actions = Array.from(this.#actionInstances.values());
        const actionIdSet = new Set(actionIds);
        if (actionIdSet.size)
          actions = actions.filter((fb) => actionIdSet.has(fb.actionId));
        for (const act of actions) {
          const def = this.#actionDefinitions.get(act.actionId);
          if (def && def.unsubscribe) {
            const context = {
              parseVariablesInString: async (text) => {
                return text;
              },
              setCustomVariableValue: () => {
                throw new Error(`setCustomVariableValue is not available during unsubscribe`);
              }
            };
            Promise.resolve(def.unsubscribe(convertActionInstanceToEvent(act), context)).catch((e) => {
              this.#log("error", `Action unsubscribe failed: ${JSON.stringify(act)} - ${e?.message ?? e} ${e?.stack}`);
            });
          }
        }
      }
    };
    exports2.ActionManager = ActionManager;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter32 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/@companion-module/base/dist/module-api/shared-udp-socket.js
var require_shared_udp_socket = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/shared-udp-socket.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SharedUdpSocketImpl = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var eventemitter3_1 = tslib_1.__importDefault(require_eventemitter32());
    var util_js_1 = require_util();
    var SharedUdpSocketImpl = class extends eventemitter3_1.default {
      #ipcWrapper;
      #moduleUdpSockets;
      #options;
      get handleId() {
        return this.boundState?.handleId;
      }
      get portNumber() {
        return this.boundState?.portNumber;
      }
      get boundState() {
        if (this.#state && typeof this.#state === "object") {
          return this.#state;
        } else {
          return void 0;
        }
      }
      #state = "pending";
      constructor(ipcWrapper, moduleUdpSockets, options) {
        super();
        this.#ipcWrapper = ipcWrapper;
        this.#moduleUdpSockets = moduleUdpSockets;
        this.#options = { ...options };
      }
      bind(port, _address, callback) {
        if (this.#state && typeof this.#state === "object")
          throw new Error("Socket is already bound");
        switch (this.#state) {
          case "fatalError":
            throw new Error("Socket has encountered fatal error");
          case "binding":
            throw new Error("Socket is already bound");
          case "closed":
            throw new Error("Socket is closing");
          case "pending":
            break;
          default:
            (0, util_js_1.assertNever)(this.#state);
            throw new Error("Invalid socket state");
        }
        this.#state = "binding";
        if (callback)
          this.on("listening", callback);
        this.#ipcWrapper.sendWithCb("sharedUdpSocketJoin", {
          family: this.#options.type,
          portNumber: port
          // Future: use address?
        }).then((handleId) => {
          this.#state = { portNumber: port, handleId };
          this.#moduleUdpSockets.set(handleId, this);
          this.emit("listening");
        }, (err) => {
          this.#state = "closed";
          this.emit("error", err instanceof Error ? err : new Error(err));
        }).catch(() => null);
      }
      close(callback) {
        if (this.#state && typeof this.#state === "object") {
        } else {
          switch (this.#state) {
            case "fatalError":
              throw new Error("Socket has encountered fatal error");
            case "pending":
            case "closed":
            case "binding":
              throw new Error("Socket is not open");
            default:
              (0, util_js_1.assertNever)(this.#state);
              throw new Error("Invalid socket state");
          }
        }
        const handleId = this.#state.handleId;
        this.#state = "closed";
        if (callback)
          this.on("close", callback);
        this.#ipcWrapper.sendWithCb("sharedUdpSocketLeave", {
          handleId
        }).then(() => {
          this.#moduleUdpSockets.delete(handleId);
          this.emit("close");
        }, (err) => {
          this.#moduleUdpSockets.delete(handleId);
          this.emit("error", err instanceof Error ? err : new Error(err));
        }).catch(() => null);
      }
      send(bufferOrList, offsetOrPort, lengthOrAddress, portOrCallback, address, callback) {
        if (typeof offsetOrPort !== "number")
          throw new Error("Invalid arguments");
        if (typeof lengthOrAddress === "number") {
          if (typeof portOrCallback !== "number" || typeof address !== "string")
            throw new Error("Invalid arguments");
          if (callback !== void 0 && typeof callback !== "function")
            throw new Error("Invalid arguments");
          const buffer = this.#processBuffer(bufferOrList, offsetOrPort, lengthOrAddress);
          this.#sendInner(buffer, portOrCallback, address, callback);
        } else if (typeof lengthOrAddress === "string") {
          if (portOrCallback !== void 0 && typeof portOrCallback !== "function")
            throw new Error("Invalid arguments");
          const buffer = this.#processBuffer(bufferOrList, 0, void 0);
          this.#sendInner(buffer, offsetOrPort, lengthOrAddress, portOrCallback);
        } else {
          throw new Error("Invalid arguments");
        }
      }
      #processBuffer(bufferOrList, offset, length) {
        let buffer;
        if (typeof bufferOrList === "string") {
          buffer = Buffer.from(bufferOrList, "utf-8");
        } else if (Buffer.isBuffer(bufferOrList)) {
          buffer = bufferOrList;
        } else if (Array.isArray(bufferOrList)) {
          return Buffer.from(bufferOrList);
        } else {
          buffer = Buffer.from(bufferOrList.buffer, bufferOrList.byteOffset, bufferOrList.byteLength);
        }
        return buffer.subarray(offset, length !== void 0 ? length + offset : void 0);
      }
      #sendInner(buffer, port, address, callback) {
        if (!this.#state || typeof this.#state !== "object")
          throw new Error("Socket is not open");
        this.#ipcWrapper.sendWithCb("sharedUdpSocketSend", {
          handleId: this.#state.handleId,
          message: buffer,
          address,
          port
        }).then(() => {
          callback?.();
        }, (err) => {
          this.emit("error", err instanceof Error ? err : new Error(err));
        }).catch(() => null);
      }
      receiveSocketMessage(message) {
        try {
          this.emit("message", message.message, message.source);
        } catch (_e) {
        }
      }
      receiveSocketError(error) {
        this.#state = "fatalError";
        const boundState = this.boundState;
        if (boundState)
          this.#moduleUdpSockets.delete(boundState.handleId);
        try {
          this.emit("error", error);
        } catch (_e) {
        }
      }
    };
    exports2.SharedUdpSocketImpl = SharedUdpSocketImpl;
  }
});

// node_modules/@companion-module/base/dist/module-api/base.js
var require_base2 = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/base.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InstanceBase = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var util_js_1 = require_util();
    var p_queue_1 = tslib_1.__importDefault(require_dist());
    var base_js_1 = require_base();
    var upgrade_js_1 = require_upgrade();
    var feedback_js_1 = require_feedback();
    var ipc_wrapper_js_1 = require_ipc_wrapper();
    var actions_js_1 = require_actions();
    var shared_udp_socket_js_1 = require_shared_udp_socket();
    var InstanceBase2 = class {
      #ipcWrapper;
      #upgradeScripts;
      id;
      #lifecycleQueue = new p_queue_1.default({ concurrency: 1 });
      #initialized = false;
      #recordingActions = false;
      #lastConfig = {};
      #lastSecrets = {};
      #actionManager;
      #feedbackManager;
      #sharedUdpSocketHandlers = /* @__PURE__ */ new Map();
      #variableDefinitions = /* @__PURE__ */ new Map();
      #variableValues = /* @__PURE__ */ new Map();
      #options;
      #label;
      get instanceOptions() {
        return this.#options;
      }
      /**
       * The user chosen name for this instance.
       * This can be changed just before `configUpdated` is called
       */
      get label() {
        return this.#label;
      }
      /**
       * Create an instance of the module
       */
      constructor(internal) {
        if (!(0, base_js_1.isInstanceBaseProps)(internal) || !internal._isInstanceBaseProps)
          throw new Error(`Module instance is being constructed incorrectly. Make sure you aren't trying to do this manually`);
        this.createSharedUdpSocket = this.createSharedUdpSocket.bind(this);
        this.#options = {
          disableVariableValidation: false,
          disableNewConfigLayout: false
        };
        this.#ipcWrapper = new ipc_wrapper_js_1.IpcWrapper({
          init: this._handleInit.bind(this),
          destroy: this._handleDestroy.bind(this),
          updateConfigAndLabel: this._handleConfigUpdateAndLabel.bind(this),
          updateConfig: async () => void 0,
          // Replaced by updateConfigAndLabel
          executeAction: this._handleExecuteAction.bind(this),
          updateFeedbacks: this._handleUpdateFeedbacks.bind(this),
          updateActions: this._handleUpdateActions.bind(this),
          upgradeActionsAndFeedbacks: this._handleUpgradeActionsAndFeedbacks.bind(this),
          getConfigFields: this._handleGetConfigFields.bind(this),
          handleHttpRequest: this._handleHttpRequest.bind(this),
          learnAction: this._handleLearnAction.bind(this),
          learnFeedback: this._handleLearnFeedback.bind(this),
          startStopRecordActions: this._handleStartStopRecordActions.bind(this),
          variablesChanged: async () => void 0,
          // Not needed since 1.13.0
          sharedUdpSocketMessage: this._handleSharedUdpSocketMessage.bind(this),
          sharedUdpSocketError: this._handleSharedUdpSocketError.bind(this)
        }, (msg) => {
          process.send(msg);
        }, 5e3);
        process.on("message", (msg) => {
          this.#ipcWrapper.receivedMessage(msg);
        });
        const parseVariablesInStringIfNeeded = async (msg) => {
          if (!msg.text.includes("$("))
            return {
              text: msg.text,
              variableIds: void 0
            };
          return this.#ipcWrapper.sendWithCb("parseVariablesInString", msg);
        };
        this.#actionManager = new actions_js_1.ActionManager(parseVariablesInStringIfNeeded, (msg) => this.#ipcWrapper.sendWithNoCb("setActionDefinitions", msg), (msg) => this.#ipcWrapper.sendWithNoCb("setCustomVariable", msg), this.log.bind(this));
        this.#feedbackManager = new feedback_js_1.FeedbackManager(parseVariablesInStringIfNeeded, (msg) => this.#ipcWrapper.sendWithNoCb("updateFeedbackValues", msg), (msg) => this.#ipcWrapper.sendWithNoCb("setFeedbackDefinitions", msg), this.log.bind(this));
        this.#upgradeScripts = internal.upgradeScripts;
        this.id = internal.id;
        this.#label = internal.id;
        this.log("debug", "Initializing");
      }
      async _handleInit(msg) {
        return this.#lifecycleQueue.add(async () => {
          if (this.#initialized)
            throw new Error("Already initialized");
          this.#lastConfig = msg.config;
          this.#lastSecrets = msg.secrets;
          this.#label = msg.label;
          process.title = msg.label;
          if (msg.isFirstInit) {
            const newConfig = {};
            const newSecrets = {};
            const fields = this.getConfigFields();
            for (const field of fields) {
              if ("default" in field) {
                if (field.type.startsWith("secret")) {
                  newSecrets[field.id] = field.default;
                } else {
                  newConfig[field.id] = field.default;
                }
              }
            }
            this.#lastConfig = newConfig;
            this.#lastSecrets = newSecrets;
            this.saveConfig(this.#lastConfig, this.#lastSecrets);
            msg.lastUpgradeIndex = this.#upgradeScripts.length - 1;
          }
          const { updatedConfig, updatedSecrets } = (0, upgrade_js_1.runThroughUpgradeScripts)([], [], msg.lastUpgradeIndex, this.#upgradeScripts, this.#lastConfig, this.#lastSecrets, false);
          this.#lastConfig = updatedConfig ?? this.#lastConfig;
          this.#lastSecrets = updatedSecrets ?? this.#lastSecrets;
          try {
            await this.init(this.#lastConfig, !!msg.isFirstInit, this.#lastSecrets);
            this.#initialized = true;
          } catch (e) {
            console.trace(`Init failed: ${e}`);
            throw e;
          }
          return {
            hasHttpHandler: typeof this.handleHttpRequest === "function",
            hasRecordActionsHandler: typeof this.handleStartStopRecordActions == "function",
            newUpgradeIndex: this.#upgradeScripts.length - 1,
            disableNewConfigLayout: this.#options.disableNewConfigLayout,
            updatedConfig: this.#lastConfig,
            updatedSecrets: this.#lastSecrets
          };
        });
      }
      async _handleDestroy() {
        await this.#lifecycleQueue.add(async () => {
          if (!this.#initialized)
            throw new Error("Not initialized");
          await this.destroy();
          this.#initialized = false;
        });
      }
      async _handleConfigUpdateAndLabel(msg) {
        await this.#lifecycleQueue.add(async () => {
          if (!this.#initialized)
            throw new Error("Not initialized");
          this.#label = msg.label;
          process.title = msg.label;
          this.#lastConfig = msg.config;
          this.#lastSecrets = msg.secrets;
          await this.configUpdated(this.#lastConfig, this.#lastSecrets);
        });
      }
      async _handleExecuteAction(msg) {
        return this.#actionManager.handleExecuteAction(msg);
      }
      async _handleUpdateFeedbacks(msg) {
        this.#feedbackManager.handleUpdateFeedbacks(msg.feedbacks);
      }
      async _handleUpdateActions(msg) {
        this.#actionManager.handleUpdateActions(msg.actions);
      }
      async _handleUpgradeActionsAndFeedbacks(msg) {
        return (0, upgrade_js_1.runThroughUpgradeScripts)(msg.actions, msg.feedbacks, null, this.#upgradeScripts, this.#lastConfig, this.#lastSecrets, true);
      }
      async _handleGetConfigFields(_msg) {
        return {
          fields: (0, base_js_1.serializeIsVisibleFn)(this.getConfigFields())
        };
      }
      async _handleHttpRequest(msg) {
        if (!this.handleHttpRequest)
          throw new Error(`handleHttpRequest is not supported!`);
        const res = await this.handleHttpRequest(msg.request);
        return { response: res };
      }
      async _handleLearnAction(msg) {
        return this.#actionManager.handleLearnAction(msg);
      }
      async _handleLearnFeedback(msg) {
        return this.#feedbackManager.handleLearnFeedback(msg);
      }
      async _handleStartStopRecordActions(msg) {
        if (!msg.recording) {
          if (!this.#recordingActions) {
            return;
          }
        } else {
          if (this.#recordingActions) {
            return;
          }
        }
        if (!this.handleStartStopRecordActions) {
          this.#recordingActions = false;
          throw new Error("Recording actions is not supported by this module!");
        }
        this.#recordingActions = msg.recording;
        this.handleStartStopRecordActions(this.#recordingActions);
      }
      async _handleSharedUdpSocketMessage(msg) {
        for (const socket of this.#sharedUdpSocketHandlers.values()) {
          if (socket.handleId === msg.handleId) {
            socket.receiveSocketMessage(msg);
          }
        }
      }
      async _handleSharedUdpSocketError(msg) {
        for (const socket of this.#sharedUdpSocketHandlers.values()) {
          if (socket.handleId === msg.handleId) {
            socket.receiveSocketError(msg.error);
          }
        }
      }
      saveConfig(newConfig, newSecrets) {
        if (newConfig)
          this.#lastConfig = newConfig;
        if (newSecrets)
          this.#lastSecrets = newSecrets;
        this.#ipcWrapper.sendWithNoCb("saveConfig", { config: newConfig, secrets: newSecrets });
      }
      /**
       * Set the action definitions for this instance
       * @param actions The action definitions
       */
      setActionDefinitions(actions) {
        this.#actionManager.setActionDefinitions(actions);
      }
      /**
       * Set the feedback definitions for this instance
       * @param feedbacks The feedback definitions
       */
      setFeedbackDefinitions(feedbacks) {
        this.#feedbackManager.setFeedbackDefinitions(feedbacks);
      }
      /**
       * Set the peset definitions for this instance
       * @param presets The preset definitions
       */
      setPresetDefinitions(presets) {
        const hostPresets = [];
        for (const [id, preset] of Object.entries(presets)) {
          if (preset) {
            hostPresets.push({
              ...preset,
              id
            });
          }
        }
        this.#ipcWrapper.sendWithNoCb("setPresetDefinitions", { presets: hostPresets });
      }
      /**
       * Set the variable definitions for this instance
       * @param variables The variable definitions
       */
      setVariableDefinitions(variables) {
        const hostVariables = [];
        const hostValues = [];
        this.#variableDefinitions.clear();
        for (const variable of variables) {
          hostVariables.push({
            id: variable.variableId,
            name: variable.name
          });
          this.#variableDefinitions.set(variable.variableId, variable);
          if (!this.#variableValues.has(variable.variableId)) {
            this.#variableValues.set(variable.variableId, "");
            hostValues.push({
              id: variable.variableId,
              value: ""
            });
          }
        }
        if (!this.#options.disableVariableValidation) {
          const validIds = new Set(this.#variableDefinitions.keys());
          for (const id of this.#variableValues.keys()) {
            if (!validIds.has(id)) {
              this.#variableValues.delete(id);
              hostValues.push({
                id,
                value: void 0
              });
            }
          }
        }
        this.#ipcWrapper.sendWithNoCb("setVariableDefinitions", { variables: hostVariables, newValues: hostValues });
      }
      /**
       * Set the values of some variables
       * @param values The new values for the variables
       */
      setVariableValues(values) {
        const hostValues = [];
        for (const [variableId, value] of Object.entries(values)) {
          if (this.#options.disableVariableValidation) {
            if (value === void 0) {
              this.#variableValues.delete(variableId);
            } else {
              this.#variableValues.set(variableId, value);
            }
            hostValues.push({
              id: variableId,
              value
            });
          } else if (this.#variableDefinitions.has(variableId)) {
            this.#variableValues.set(variableId, value ?? "");
            hostValues.push({
              id: variableId,
              value: value ?? ""
            });
          } else {
            hostValues.push({
              id: variableId,
              value: void 0
            });
          }
        }
        this.#ipcWrapper.sendWithNoCb("setVariableValues", { newValues: hostValues });
      }
      /**
       * Get the last set value of a variable from this connection
       * @param variableId id of the variable
       * @returns The value
       */
      getVariableValue(variableId) {
        return this.#variableValues.get(variableId);
      }
      /**
       * @deprecated Companion now handles this for you, for actions and feedbacks. If you need this for another purpose, let us know as we intend to remove this
       *
       * Parse and replace all the variables in a string
       * Note: You must not use this for feedbacks, as your feedback will not update when the variable changes.
       * There is an alternate version of this supplied to each of the action/feedback callbacks that tracks
       * usages properly and will retrigger the feedback when the variables change.
       * @param text The text to parse
       * @returns The string with variables replaced with their values
       */
      async parseVariablesInString(text) {
        const currentContext = this.#feedbackManager.parseVariablesContext;
        if (currentContext) {
          this.log("debug", `parseVariablesInString called while in: ${currentContext}. You should use the parseVariablesInString provided to the callback instead`);
        }
        if (!text.includes("$("))
          return text;
        const res = await this.#ipcWrapper.sendWithCb("parseVariablesInString", {
          text,
          controlId: void 0,
          actionInstanceId: void 0,
          feedbackInstanceId: void 0
        });
        return res.text;
      }
      /**
       * Request all feedbacks of the specified types to be checked for changes
       * @param feedbackTypes The feedback types to check
       */
      checkFeedbacks(...feedbackTypes) {
        this.#feedbackManager.checkFeedbacks(feedbackTypes);
      }
      /**
       * Request the specified feedback instances to be checked for changes
       * @param feedbackIds The ids of the feedback instances to check
       */
      checkFeedbacksById(...feedbackIds) {
        this.#feedbackManager.checkFeedbacksById(feedbackIds);
      }
      /**
       * Call subscribe on all currently known placed actions.
       * It can be useful to trigger this upon establishing a connection, to ensure all data is loaded.
       * @param actionIds The actionIds to call subscribe for. If no values are provided, then all are called.
       */
      subscribeActions(...actionIds) {
        this.#actionManager.subscribeActions(actionIds);
      }
      /**
       * Call unsubscribe on all currently known placed actions.
       * It can be useful to do some cleanup upon a connection closing.
       * @param actionIds The actionIds to call subscribe for. If no values are provided, then all are called.
       */
      unsubscribeActions(...actionIds) {
        this.#actionManager.unsubscribeActions(actionIds);
      }
      /**
       * Call subscribe on all currently known placed feedbacks.
       * It can be useful to trigger this upon establishing a connection, to ensure all data is loaded.
       * @param feedbackIds The feedbackIds to call subscribe for. If no values are provided, then all are called.
       */
      subscribeFeedbacks(...feedbackIds) {
        this.#feedbackManager.subscribeFeedbacks(feedbackIds);
      }
      /**
       * Call unsubscribe on all currently known placed feedbacks.
       * It can be useful to do some cleanup upon a connection closing.
       * @param feedbackIds The feedbackIds to call subscribe for. If no values are provided, then all are called.
       */
      unsubscribeFeedbacks(...feedbackIds) {
        this.#feedbackManager.unsubscribeFeedbacks(feedbackIds);
      }
      /**
       * Add an action to the current recording session
       * @param action The action to be added to the recording session
       * @param uniquenessId A unique id for the action being recorded. This should be different for each action, but by passing the same as a previous call will replace the previous value.
       */
      recordAction(action, uniquenessId) {
        if (!this.#recordingActions)
          throw new Error("Not currently recording actions");
        this.#ipcWrapper.sendWithNoCb("recordAction", {
          uniquenessId: uniquenessId ?? null,
          actionId: action.actionId,
          options: action.options,
          delay: action.delay
        });
      }
      /**
       * Send an osc message from the system osc sender
       * @param host destination ip address
       * @param port destination port number
       * @param path message path
       * @param args mesage arguments
       */
      oscSend(host, port, path, args) {
        this.#ipcWrapper.sendWithNoCb("send-osc", (0, util_js_1.literal)({
          host,
          port,
          path,
          args
        }));
      }
      /**
       * Update the status of this connection
       * @param status The status level
       * @param message Additional information about the status
       *
       * ### Example
       * ```js
       * this.updateStatus(InstanceStatus.Ok)
       * ```
       */
      updateStatus(status, message) {
        this.#ipcWrapper.sendWithNoCb("set-status", (0, util_js_1.literal)({
          status,
          message: message ?? null
        }));
      }
      /**
       * Write a line to the log
       * @param level The level of the message
       * @param message The message text to write
       */
      log(level, message) {
        this.#ipcWrapper.sendWithNoCb("log-message", (0, util_js_1.literal)({
          level,
          message
        }));
      }
      createSharedUdpSocket(typeOrOptions, callback) {
        const options = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions;
        const socket = new shared_udp_socket_js_1.SharedUdpSocketImpl(this.#ipcWrapper, this.#sharedUdpSocketHandlers, options);
        if (callback)
          socket.on("message", callback);
        return socket;
      }
    };
    exports2.InstanceBase = InstanceBase2;
  }
});

// node_modules/@companion-module/base/dist/module-api/common.js
var require_common = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/config.js
var require_config = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/config.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/enums.js
var require_enums = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/enums.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Regex = exports2.InstanceStatus = void 0;
    var InstanceStatus;
    (function(InstanceStatus2) {
      InstanceStatus2["Ok"] = "ok";
      InstanceStatus2["Connecting"] = "connecting";
      InstanceStatus2["Disconnected"] = "disconnected";
      InstanceStatus2["ConnectionFailure"] = "connection_failure";
      InstanceStatus2["BadConfig"] = "bad_config";
      InstanceStatus2["UnknownError"] = "unknown_error";
      InstanceStatus2["UnknownWarning"] = "unknown_warning";
      InstanceStatus2["AuthenticationFailure"] = "authentication_failure";
    })(InstanceStatus || (exports2.InstanceStatus = InstanceStatus = {}));
    var Regex2;
    (function(Regex3) {
      Regex3.IP = "/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/";
      Regex3.HOSTNAME = "/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/";
      Regex3.BOOLEAN = "/^(true|false|0|1)$/i";
      Regex3.PORT = "/^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-4])$/";
      Regex3.MAC_ADDRESS = "/^(?:[a-fA-F0-9]{2}:){5}([a-fA-F0-9]{2})$/";
      Regex3.PERCENT = "/^(100|[0-9]|[0-9][0-9])$/";
      Regex3.FLOAT = "/^([0-9]*\\.)?[0-9]+$/";
      Regex3.SIGNED_FLOAT = "/^[+-]?([0-9]*\\.)?[0-9]+$/";
      Regex3.FLOAT_OR_INT = "/^([0-9]+)(\\.[0-9]+)?$/";
      Regex3.NUMBER = "/^\\d+$/";
      Regex3.SIGNED_NUMBER = "/^[+-]?\\d+$/";
      Regex3.SOMETHING = "/^.+$/";
      Regex3.TIMECODE = "/^(0*[0-9]|1[0-9]|2[0-4]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[12][0-9]|30)$/";
    })(Regex2 || (exports2.Regex = Regex2 = {}));
  }
});

// node_modules/@companion-module/base/dist/module-api/feedback.js
var require_feedback2 = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/feedback.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/http.js
var require_http = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/http.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/input.js
var require_input = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/input.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/preset.js
var require_preset = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/preset.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/style.js
var require_style = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/style.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/upgrade.js
var require_upgrade2 = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/upgrade.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EmptyUpgradeScript = void 0;
    exports2.CreateConvertToBooleanFeedbackUpgradeScript = CreateConvertToBooleanFeedbackUpgradeScript;
    exports2.CreateUseBuiltinInvertForFeedbacksUpgradeScript = CreateUseBuiltinInvertForFeedbacksUpgradeScript;
    var EmptyUpgradeScript = () => ({
      updatedConfig: null,
      updatedSecrets: null,
      updatedActions: [],
      updatedFeedbacks: []
    });
    exports2.EmptyUpgradeScript = EmptyUpgradeScript;
    function CreateConvertToBooleanFeedbackUpgradeScript(upgradeMap) {
      return (_context, props) => {
        const changedFeedbacks = [];
        for (const feedback of props.feedbacks) {
          let upgrade_rules = upgradeMap[feedback.feedbackId];
          if (upgrade_rules === true) {
            upgrade_rules = {
              bg: "bgcolor",
              bgcolor: "bgcolor",
              fg: "color",
              color: "color",
              png64: "png64",
              png: "png64"
            };
          }
          if (upgrade_rules) {
            if (!feedback.style)
              feedback.style = {};
            for (const [option_key, style_key] of Object.entries(upgrade_rules)) {
              if (feedback.options[option_key] !== void 0) {
                feedback.style[style_key] = feedback.options[option_key];
                delete feedback.options[option_key];
                changedFeedbacks.push(feedback);
              }
            }
          }
        }
        return {
          updatedConfig: null,
          updatedSecrets: null,
          updatedActions: [],
          updatedFeedbacks: changedFeedbacks
        };
      };
    }
    function CreateUseBuiltinInvertForFeedbacksUpgradeScript(upgradeMap) {
      return (_context, props) => {
        const changedFeedbacks = [];
        for (const feedback of props.feedbacks) {
          const propertyName = upgradeMap[feedback.feedbackId];
          if (typeof propertyName !== "string")
            continue;
          const rawValue = feedback.options[propertyName];
          if (rawValue === void 0)
            continue;
          delete feedback.options[propertyName];
          feedback.isInverted = rawValue === "true" || Boolean(rawValue) === true || Number(rawValue) > 0;
          changedFeedbacks.push(feedback);
        }
        return {
          updatedConfig: null,
          updatedSecrets: null,
          updatedActions: [],
          updatedFeedbacks: changedFeedbacks
        };
      };
    }
  }
});

// node_modules/@companion-module/base/dist/module-api/variable.js
var require_variable = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/variable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/module-api/index.js
var require_module_api = __commonJS({
  "node_modules/@companion-module/base/dist/module-api/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_action(), exports2);
    tslib_1.__exportStar(require_base2(), exports2);
    tslib_1.__exportStar(require_common(), exports2);
    tslib_1.__exportStar(require_config(), exports2);
    tslib_1.__exportStar(require_enums(), exports2);
    tslib_1.__exportStar(require_feedback2(), exports2);
    tslib_1.__exportStar(require_http(), exports2);
    tslib_1.__exportStar(require_input(), exports2);
    tslib_1.__exportStar(require_preset(), exports2);
    tslib_1.__exportStar(require_style(), exports2);
    tslib_1.__exportStar(require_upgrade2(), exports2);
    tslib_1.__exportStar(require_variable(), exports2);
  }
});

// node_modules/@companion-module/base/dist/common/osc.js
var require_osc = __commonJS({
  "node_modules/@companion-module/base/dist/common/osc.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/common/json-value.js
var require_json_value = __commonJS({
  "node_modules/@companion-module/base/dist/common/json-value.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@companion-module/base/dist/helpers/tcp.js
var require_tcp = __commonJS({
  "node_modules/@companion-module/base/dist/helpers/tcp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TCPHelper = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var net_1 = tslib_1.__importDefault(require("net"));
    var eventemitter3_1 = require_eventemitter32();
    var enums_js_1 = require_enums();
    var TCPHelper = class extends eventemitter3_1.EventEmitter {
      #host;
      #port;
      _socket;
      #options;
      #connected = false;
      #connecting = false;
      #destroyed = false;
      #lastStatus;
      #reconnectTimer;
      #missingErrorHandlerTimer;
      get isConnected() {
        return this.#connected;
      }
      get isConnecting() {
        return this.#connecting;
      }
      get isDestroyed() {
        return this.#destroyed;
      }
      constructor(host, port, options) {
        super();
        this.#host = host;
        this.#port = port;
        this.#options = {
          reconnect_interval: 2e3,
          reconnect: true,
          ...options
        };
        this._socket = new net_1.default.Socket();
        this._socket.setKeepAlive(true);
        this._socket.setNoDelay(true);
        this._socket.on("error", (err) => {
          this.#connecting = false;
          this.#connected = false;
          if (this.#options.reconnect) {
            this.#queueReconnect();
          }
          this.#new_status(enums_js_1.InstanceStatus.UnknownError, err.message);
          this.emit("error", err);
        });
        this._socket.on("ready", () => {
          this.#connected = true;
          this.#connecting = false;
          this.#new_status(enums_js_1.InstanceStatus.Ok);
          this.emit("connect");
        });
        this._socket.on("end", () => {
          this.#connected = false;
          this.#new_status(enums_js_1.InstanceStatus.Disconnected);
          if (!this.#connecting && this.#options.reconnect) {
            this.#queueReconnect();
          }
          this.emit("end");
        });
        this._socket.on("data", (data) => this.emit("data", data));
        this._socket.on("drain", () => this.emit("drain"));
        setImmediate(() => {
          if (!this.#destroyed)
            this.connect();
        });
        this.#missingErrorHandlerTimer = setTimeout(() => {
          this.#missingErrorHandlerTimer = void 0;
          if (!this.#destroyed && !this.listenerCount("error")) {
            console.error(`Danger: TCP client for ${this.#host}:${this.#port} is missing an error handler!`);
          }
        }, 5e3);
      }
      connect() {
        if (this.#destroyed)
          throw new Error("Cannot connect destroyed socket");
        if (this.#connecting)
          return false;
        this.#connecting = true;
        this._socket.connect(this.#port, this.#host);
        return true;
      }
      async send(message) {
        if (this.#destroyed || this._socket.destroyed)
          throw new Error("Cannot write to destroyed socket");
        if (!message || !message.length)
          throw new Error("No message to send");
        if (!this.#connected) {
          return false;
        }
        try {
          return new Promise((resolve, reject) => {
            this._socket.write(message, (error) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(true);
            });
          });
        } catch (error) {
          this.#connected = false;
          const error2 = error instanceof Error ? error : new Error(`${error}`);
          this.#new_status(enums_js_1.InstanceStatus.UnknownError, error2.message);
          this.emit("error", error2);
          throw error2;
        }
      }
      destroy() {
        this.#destroyed = true;
        if (this.#reconnectTimer !== void 0) {
          clearTimeout(this.#reconnectTimer);
          this.#reconnectTimer = void 0;
        }
        if (this.#missingErrorHandlerTimer !== void 0) {
          clearTimeout(this.#missingErrorHandlerTimer);
          this.#missingErrorHandlerTimer = void 0;
        }
        this._socket.removeAllListeners();
        this.removeAllListeners();
        this._socket.destroy();
      }
      #queueReconnect() {
        if (this.#reconnectTimer !== void 0) {
          clearTimeout(this.#reconnectTimer);
        }
        this.#reconnectTimer = setTimeout(() => {
          this.#reconnectTimer = void 0;
          this.#new_status(enums_js_1.InstanceStatus.Connecting);
          this.connect();
        }, this.#options.reconnect_interval);
      }
      // Private function
      #new_status(status, message) {
        if (this.#lastStatus != status) {
          this.#lastStatus = status;
          this.emit("status_change", status, message);
        }
      }
    };
    exports2.TCPHelper = TCPHelper;
  }
});

// node_modules/@companion-module/base/dist/helpers/telnet.js
var require_telnet = __commonJS({
  "node_modules/@companion-module/base/dist/helpers/telnet.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TelnetHelper = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var eventemitter3_1 = tslib_1.__importDefault(require_eventemitter32());
    var stream_1 = require("stream");
    var tcp_js_1 = require_tcp();
    var DATA = 0;
    var SE = 240;
    var SB = 250;
    var WILL = 251;
    var WONT = 252;
    var DO = 253;
    var DONT = 254;
    var IAC = 255;
    var TelnetHelper = class extends eventemitter3_1.default {
      #tcp;
      #stream;
      #missingErrorHandlerTimer;
      get isConnected() {
        return this.#tcp.isConnected;
      }
      get isConnecting() {
        return this.#tcp.isConnecting;
      }
      get isDestroyed() {
        return this.#tcp.isDestroyed;
      }
      constructor(host, port, options) {
        super();
        this.#tcp = new tcp_js_1.TCPHelper(host, port, options);
        this.#stream = new TelnetStream();
        this.#tcp._socket.pipe(this.#stream);
        this.#tcp.on("connect", () => this.emit("connect"));
        this.#tcp.on("end", () => this.emit("end"));
        this.#tcp.on("error", (error) => this.emit("error", error));
        this.#tcp.on("status_change", (status, message) => this.emit("status_change", status, message));
        this.#stream.on("iac", (a, b) => this.emit("iac", a, b));
        this.#stream.on("sb", (buffer) => this.emit("sb", buffer));
        this.#stream.on("data", (data) => this.emit("data", data));
        this.#stream.on("drain", () => this.emit("drain"));
        this.#missingErrorHandlerTimer = setTimeout(() => {
          this.#missingErrorHandlerTimer = void 0;
          if (!this.isDestroyed && !this.listenerCount("error")) {
            console.error(`Danger: Telnet client for ${host}:${port} is missing an error handler!`);
          }
        }, 5e3);
      }
      connect() {
        return this.#tcp.connect();
      }
      async send(message) {
        return this.#tcp.send(message);
      }
      destroy() {
        this.#tcp.destroy();
        if (this.#missingErrorHandlerTimer !== void 0) {
          clearTimeout(this.#missingErrorHandlerTimer);
          this.#missingErrorHandlerTimer = void 0;
        }
        this.#stream.removeAllListeners();
        this.#stream.destroy();
      }
    };
    exports2.TelnetHelper = TelnetHelper;
    var TelnetStream = class extends stream_1.Transform {
      #buffer;
      #subbuffer;
      #state;
      constructor(options) {
        super(options);
        this.#buffer = Buffer.alloc(0);
        this.#subbuffer = Buffer.alloc(0);
        this.#state = DATA;
      }
      _transform(obj, _encoding, callback) {
        for (let i = 0; i < obj.length; ++i) {
          this.#handleByte(obj[i]);
        }
        const data = this.#getData();
        if (data.length) {
          this.push(data);
        }
        callback();
      }
      #handleByte(byte) {
        if (this.#state === DATA) {
          if (byte === IAC) {
            this.#state = IAC;
            return;
          }
          this.#buffer = Buffer.concat([this.#buffer, Buffer.from([byte])]);
        } else if (this.#state === IAC) {
          switch (byte) {
            case SB:
            case WILL:
            case WONT:
            case DO:
            case DONT:
              this.#state = byte;
              break;
            default:
              this.#state = DATA;
              break;
          }
        } else if (this.#state >= WILL && this.#state <= DONT) {
          let iac = void 0;
          switch (this.#state) {
            case WILL:
              iac = "WILL";
              break;
            case WONT:
              iac = "WONT";
              break;
            case DO:
              iac = "DO";
              break;
            case DONT:
              iac = "DONT";
              break;
            default:
              return;
          }
          this.emit("iac", iac, byte);
          this.#state = DATA;
          return;
        } else if (this.#state === SB) {
          if (byte === SE) {
            this.emit("sb", this.#subbuffer);
            this.#state = DATA;
            this.#subbuffer = Buffer.alloc(0);
            return;
          }
          this.#subbuffer = Buffer.concat([this.#subbuffer, Buffer.from([byte])]);
        }
      }
      #getData() {
        const buff = this.#buffer;
        this.#buffer = Buffer.alloc(0);
        return buff;
      }
    };
  }
});

// node_modules/@companion-module/base/dist/helpers/udp.js
var require_udp = __commonJS({
  "node_modules/@companion-module/base/dist/helpers/udp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UDPHelper = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var dgram_1 = tslib_1.__importDefault(require("dgram"));
    var eventemitter3_1 = require_eventemitter32();
    var enums_js_1 = require_enums();
    var UDPHelper = class extends eventemitter3_1.EventEmitter {
      #host;
      #port;
      #socket;
      #options;
      #destroyed = false;
      #lastStatus;
      #missingErrorHandlerTimer;
      get isDestroyed() {
        return this.#destroyed;
      }
      constructor(host, port, options) {
        super();
        this.#host = host;
        this.#port = port;
        this.#options = { ...options };
        this.#socket = dgram_1.default.createSocket("udp4");
        try {
          this.#socket.bind(this.#options.bind_port || 0, this.#options.bind_ip);
        } catch (_e) {
          throw new Error(`Unable to bind to ip/port: ${this.#options.bind_ip || "0.0.0.0"}:${this.#options.bind_port || 0}`);
        }
        if (this.#options.ttl !== void 0) {
          this.#socket.setTTL(this.#options.ttl);
        }
        if (this.#options.multicast_ttl !== void 0) {
          this.#socket.setMulticastTTL(this.#options.multicast_ttl);
        }
        this.#socket.on("error", (error) => {
          this.#new_status(enums_js_1.InstanceStatus.UnknownError, error.message);
          this.emit("error", error);
        });
        this.#socket.on("listening", () => {
          if (this.#options.broadcast) {
            this.#socket.setBroadcast(true);
          }
          if (this.#options.multicast_interface) {
            this.#socket.setMulticastInterface(this.#options.multicast_interface);
          }
          this.#new_status(enums_js_1.InstanceStatus.Ok);
          this.emit("listening");
        });
        this.#socket.on("message", (data, rinfo) => this.emit("data", data, rinfo));
        this.#missingErrorHandlerTimer = setTimeout(() => {
          if (!this.#destroyed && !this.listenerCount("error")) {
            console.error(`Danger: UDP socket for ${this.#host}:${this.#port} is missing an error handler!`);
          }
        }, 5e3);
      }
      async send(message) {
        if (this.#destroyed)
          throw new Error("Cannot write to destroyed socket");
        if (!message || !message.length)
          throw new Error("No message to send");
        return new Promise((resolve, reject) => {
          this.#socket.send(message, this.#port, this.#host, (error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        });
      }
      // addMembership(member) {
      // 	if (!this.bound) {
      // 		this.pending_memberships.push(member)
      // 	} else {
      // 		this.socket.addMembership(member)
      // 	}
      // }
      destroy() {
        this.#destroyed = true;
        if (this.#missingErrorHandlerTimer !== void 0) {
          clearTimeout(this.#missingErrorHandlerTimer);
          this.#missingErrorHandlerTimer = void 0;
        }
        this.#socket.removeAllListeners();
        this.#socket.close();
        this.removeAllListeners();
      }
      // Private function
      #new_status(status, message) {
        if (this.#lastStatus != status) {
          this.#lastStatus = status;
          this.emit("status_change", status, message);
        }
      }
    };
    exports2.UDPHelper = UDPHelper;
  }
});

// node_modules/@companion-module/base/dist/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/@companion-module/base/dist/helpers/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_tcp(), exports2);
    tslib_1.__exportStar(require_telnet(), exports2);
    tslib_1.__exportStar(require_udp(), exports2);
  }
});

// node_modules/@companion-module/base/dist/host-api/versions.js
var require_versions = __commonJS({
  "node_modules/@companion-module/base/dist/host-api/versions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HostApiNodeJsIpc = void 0;
    exports2.HostApiNodeJsIpc = "nodejs-ipc";
  }
});

// node_modules/@companion-module/base/dist/entrypoint.js
var require_entrypoint = __commonJS({
  "node_modules/@companion-module/base/dist/entrypoint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.runEntrypoint = runEntrypoint2;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var versions_js_1 = require_versions();
    var promises_1 = tslib_1.__importDefault(require("fs/promises"));
    var util_js_1 = require_util();
    var ipc_wrapper_js_1 = require_ipc_wrapper();
    var path_1 = tslib_1.__importDefault(require("path"));
    var hasEntrypoint = false;
    var moduleInstance;
    function runEntrypoint2(factory, upgradeScripts) {
      Promise.resolve().then(async () => {
        if (hasEntrypoint)
          throw new Error(`runEntrypoint can only be called once`);
        hasEntrypoint = true;
        if (!upgradeScripts)
          upgradeScripts = [];
        if (!Array.isArray(upgradeScripts))
          throw new Error("upgradeScripts must be an array");
        for (const upgradeScript of upgradeScripts) {
          if (typeof upgradeScript !== "function")
            throw new Error("upgradeScripts must be an array of functions");
        }
        const manifestPath = process.env.MODULE_MANIFEST;
        if (!manifestPath)
          throw new Error("Module initialise is missing MODULE_MANIFEST");
        const manifestBlob = await promises_1.default.readFile(manifestPath);
        const manifestJson = JSON.parse(manifestBlob.toString());
        if (manifestJson.runtime?.api !== versions_js_1.HostApiNodeJsIpc)
          throw new Error(`Module manifest 'api' mismatch`);
        if (!manifestJson.runtime.apiVersion)
          throw new Error(`Module manifest 'apiVersion' missing`);
        let apiVersion = manifestJson.runtime.apiVersion;
        if (apiVersion === "0.0.0") {
          try {
            const baseJsonStr = await promises_1.default.readFile(path_1.default.join(__dirname, "../package.json"));
            const baseJson = JSON.parse(baseJsonStr.toString());
            if (baseJson.name === "@companion-module/base") {
              apiVersion = baseJson.version;
            }
          } catch (_e) {
            throw new Error("Failed to determine module api version");
          }
        }
        if (!process.send)
          throw new Error("Module is not being run with ipc");
        console.log(`Starting up module class: ${factory.name}`);
        const connectionId = process.env.CONNECTION_ID;
        if (typeof connectionId !== "string" || !connectionId)
          throw new Error("Module initialise is missing CONNECTION_ID");
        const verificationToken = process.env.VERIFICATION_TOKEN;
        if (typeof verificationToken !== "string" || !verificationToken)
          throw new Error("Module initialise is missing VERIFICATION_TOKEN");
        const ipcWrapper = new ipc_wrapper_js_1.IpcWrapper({}, (msg) => {
          process.send(msg);
        }, 5e3);
        process.once("message", (msg) => {
          ipcWrapper.receivedMessage(msg);
        });
        moduleInstance = new factory((0, util_js_1.literal)({
          id: connectionId,
          upgradeScripts,
          _isInstanceBaseProps: true
        }));
        ipcWrapper.sendWithCb("register", { apiVersion, connectionId, verificationToken }).then(() => {
          console.log(`Module-host accepted registration`);
        }, (err) => {
          console.error("Module registration failed", err);
          process.exit(11);
        });
      }).catch((e) => {
        console.error(`Failed to startup module:`);
        console.error(e.stack || e.message);
        process.exit(1);
      });
    }
  }
});

// node_modules/@companion-module/base/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@companion-module/base/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.runEntrypoint = exports2.substituteEscapeCharacters = exports2.parseEscapeCharacters = exports2.assertNever = exports2.splitHex = exports2.splitHsv = exports2.splitHsl = exports2.splitRgb = exports2.combineRgb = exports2.literal = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_manifest(), exports2);
    tslib_1.__exportStar(require_module_api(), exports2);
    tslib_1.__exportStar(require_osc(), exports2);
    tslib_1.__exportStar(require_json_value(), exports2);
    var util_js_1 = require_util();
    Object.defineProperty(exports2, "literal", { enumerable: true, get: function() {
      return util_js_1.literal;
    } });
    Object.defineProperty(exports2, "combineRgb", { enumerable: true, get: function() {
      return util_js_1.combineRgb;
    } });
    Object.defineProperty(exports2, "splitRgb", { enumerable: true, get: function() {
      return util_js_1.splitRgb;
    } });
    Object.defineProperty(exports2, "splitHsl", { enumerable: true, get: function() {
      return util_js_1.splitHsl;
    } });
    Object.defineProperty(exports2, "splitHsv", { enumerable: true, get: function() {
      return util_js_1.splitHsv;
    } });
    Object.defineProperty(exports2, "splitHex", { enumerable: true, get: function() {
      return util_js_1.splitHex;
    } });
    Object.defineProperty(exports2, "assertNever", { enumerable: true, get: function() {
      return util_js_1.assertNever;
    } });
    Object.defineProperty(exports2, "parseEscapeCharacters", { enumerable: true, get: function() {
      return util_js_1.parseEscapeCharacters;
    } });
    Object.defineProperty(exports2, "substituteEscapeCharacters", { enumerable: true, get: function() {
      return util_js_1.substituteEscapeCharacters;
    } });
    tslib_1.__exportStar(require_helpers(), exports2);
    var entrypoint_js_1 = require_entrypoint();
    Object.defineProperty(exports2, "runEntrypoint", { enumerable: true, get: function() {
      return entrypoint_js_1.runEntrypoint;
    } });
  }
});

// node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob)
      BINARY_TYPES.push("blob");
    module2.exports = {
      BINARY_TYPES,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bufferUtil.mask(source, mask, output, offset, length);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var { isUtf8 } = require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module2.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module2.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : true;
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored)
          cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          const error = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            const error = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          const error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          const error = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          const error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error);
            return;
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO)
            this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              const error = this.createError(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = false;
            this.emit("conclude", code, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module2.exports = Receiver;
  }
});

// node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask)
          return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking)
          return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options, cb) {
        this._bufferedBytes += options[kByteLength];
        this._state = GET_BLOB_DATA;
        blob.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          const data = toBuffer(arrayBuffer);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._state = DEFAULT;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {Buffer[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function")
        cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function")
          callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
  }
});

// node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values))
                values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});

// node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https = require("https");
    var http = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { Duplex, Readable } = require("stream");
    var { URL } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var closeTimeout = 30 * 1e3;
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket2 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._autoPong = options.autoPong;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver = new Receiver({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        const sender = new Sender(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout)
          socket.setTimeout(0);
        if (socket.setNoDelay)
          socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED)
          return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain)
          this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED)
          return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute])
              return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function")
            return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost)
              delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted])
          return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket2.CONNECTING)
          return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0)
        return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused)
        websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong)
        websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket2.CLOSED)
        return;
      if (websocket.readyState === WebSocket2.OPEN) {
        websocket._readyState = WebSocket2.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        closeTimeout
      );
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket2.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket2.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data))
          ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed)
          return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy)
          ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused)
          ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream;
  }
});

// node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});

// node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var http = require("http");
    var { Duplex } = require("stream");
    var { createHash } = require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket2 = require_websocket();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket2,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 8 && version !== 13) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message);
      }
    }
  }
});

// node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/ws/index.js"(exports2, module2) {
    "use strict";
    var WebSocket2 = require_websocket();
    WebSocket2.createWebSocketStream = require_stream();
    WebSocket2.Server = require_websocket_server();
    WebSocket2.Receiver = require_receiver();
    WebSocket2.Sender = require_sender();
    WebSocket2.WebSocket = WebSocket2;
    WebSocket2.WebSocketServer = WebSocket2.Server;
    module2.exports = WebSocket2;
  }
});

// node_modules/long/src/long.js
var require_long = __commonJS({
  "node_modules/long/src/long.js"(exports2, module2) {
    module2.exports = Long2;
    var wasm = null;
    try {
      wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        13,
        2,
        96,
        0,
        1,
        127,
        96,
        4,
        127,
        127,
        127,
        127,
        1,
        127,
        3,
        7,
        6,
        0,
        1,
        1,
        1,
        1,
        1,
        6,
        6,
        1,
        127,
        1,
        65,
        0,
        11,
        7,
        50,
        6,
        3,
        109,
        117,
        108,
        0,
        1,
        5,
        100,
        105,
        118,
        95,
        115,
        0,
        2,
        5,
        100,
        105,
        118,
        95,
        117,
        0,
        3,
        5,
        114,
        101,
        109,
        95,
        115,
        0,
        4,
        5,
        114,
        101,
        109,
        95,
        117,
        0,
        5,
        8,
        103,
        101,
        116,
        95,
        104,
        105,
        103,
        104,
        0,
        0,
        10,
        191,
        1,
        6,
        4,
        0,
        35,
        0,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        126,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        127,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        128,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        129,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        130,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11
      ])), {}).exports;
    } catch (e) {
    }
    function Long2(low, high, unsigned) {
      this.low = low | 0;
      this.high = high | 0;
      this.unsigned = !!unsigned;
    }
    Long2.prototype.__isLong__;
    Object.defineProperty(Long2.prototype, "__isLong__", { value: true });
    function isLong(obj) {
      return (obj && obj["__isLong__"]) === true;
    }
    Long2.isLong = isLong;
    var INT_CACHE = {};
    var UINT_CACHE = {};
    function fromInt(value, unsigned) {
      var obj, cachedObj, cache;
      if (unsigned) {
        value >>>= 0;
        if (cache = 0 <= value && value < 256) {
          cachedObj = UINT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
          UINT_CACHE[value] = obj;
        return obj;
      } else {
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj)
            return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
          INT_CACHE[value] = obj;
        return obj;
      }
    }
    Long2.fromInt = fromInt;
    function fromNumber(value, unsigned) {
      if (isNaN(value))
        return unsigned ? UZERO : ZERO;
      if (unsigned) {
        if (value < 0)
          return UZERO;
        if (value >= TWO_PWR_64_DBL)
          return MAX_UNSIGNED_VALUE;
      } else {
        if (value <= -TWO_PWR_63_DBL)
          return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
          return MAX_VALUE;
      }
      if (value < 0)
        return fromNumber(-value, unsigned).neg();
      return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
    }
    Long2.fromNumber = fromNumber;
    function fromBits(lowBits, highBits, unsigned) {
      return new Long2(lowBits, highBits, unsigned);
    }
    Long2.fromBits = fromBits;
    var pow_dbl = Math.pow;
    function fromString(str, unsigned, radix) {
      if (str.length === 0)
        throw Error("empty string");
      if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
      if (typeof unsigned === "number") {
        radix = unsigned, unsigned = false;
      } else {
        unsigned = !!unsigned;
      }
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      var p;
      if ((p = str.indexOf("-")) > 0)
        throw Error("interior hyphen");
      else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
      }
      var radixToPower = fromNumber(pow_dbl(radix, 8));
      var result = ZERO;
      for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
          var power = fromNumber(pow_dbl(radix, size));
          result = result.mul(power).add(fromNumber(value));
        } else {
          result = result.mul(radixToPower);
          result = result.add(fromNumber(value));
        }
      }
      result.unsigned = unsigned;
      return result;
    }
    Long2.fromString = fromString;
    function fromValue(val, unsigned) {
      if (typeof val === "number")
        return fromNumber(val, unsigned);
      if (typeof val === "string")
        return fromString(val, unsigned);
      return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
    }
    Long2.fromValue = fromValue;
    var TWO_PWR_16_DBL = 1 << 16;
    var TWO_PWR_24_DBL = 1 << 24;
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    var ZERO = fromInt(0);
    Long2.ZERO = ZERO;
    var UZERO = fromInt(0, true);
    Long2.UZERO = UZERO;
    var ONE = fromInt(1);
    Long2.ONE = ONE;
    var UONE = fromInt(1, true);
    Long2.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long2.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
    Long2.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
    Long2.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
    Long2.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long2.prototype;
    LongPrototype.toInt = function toInt() {
      return this.unsigned ? this.low >>> 0 : this.low;
    };
    LongPrototype.toNumber = function toNumber() {
      if (this.unsigned)
        return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
      return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    LongPrototype.toString = function toString(radix) {
      radix = radix || 10;
      if (radix < 2 || 36 < radix)
        throw RangeError("radix");
      if (this.isZero())
        return "0";
      if (this.isNegative()) {
        if (this.eq(MIN_VALUE)) {
          var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
          return div.toString(radix) + rem1.toInt().toString(radix);
        } else
          return "-" + this.neg().toString(radix);
      }
      var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
      var result = "";
      while (true) {
        var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
          return digits + result;
        else {
          while (digits.length < 6)
            digits = "0" + digits;
          result = "" + digits + result;
        }
      }
    };
    LongPrototype.getHighBits = function getHighBits() {
      return this.high;
    };
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
      return this.high >>> 0;
    };
    LongPrototype.getLowBits = function getLowBits() {
      return this.low;
    };
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
      return this.low >>> 0;
    };
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
      if (this.isNegative())
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
      var val = this.high != 0 ? this.high : this.low;
      for (var bit = 31; bit > 0; bit--)
        if ((val & 1 << bit) != 0)
          break;
      return this.high != 0 ? bit + 33 : bit + 1;
    };
    LongPrototype.isZero = function isZero() {
      return this.high === 0 && this.low === 0;
    };
    LongPrototype.eqz = LongPrototype.isZero;
    LongPrototype.isNegative = function isNegative() {
      return !this.unsigned && this.high < 0;
    };
    LongPrototype.isPositive = function isPositive() {
      return this.unsigned || this.high >= 0;
    };
    LongPrototype.isOdd = function isOdd() {
      return (this.low & 1) === 1;
    };
    LongPrototype.isEven = function isEven() {
      return (this.low & 1) === 0;
    };
    LongPrototype.equals = function equals(other) {
      if (!isLong(other))
        other = fromValue(other);
      if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
        return false;
      return this.high === other.high && this.low === other.low;
    };
    LongPrototype.eq = LongPrototype.equals;
    LongPrototype.notEquals = function notEquals(other) {
      return !this.eq(
        /* validates */
        other
      );
    };
    LongPrototype.neq = LongPrototype.notEquals;
    LongPrototype.ne = LongPrototype.notEquals;
    LongPrototype.lessThan = function lessThan(other) {
      return this.comp(
        /* validates */
        other
      ) < 0;
    };
    LongPrototype.lt = LongPrototype.lessThan;
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
      return this.comp(
        /* validates */
        other
      ) <= 0;
    };
    LongPrototype.lte = LongPrototype.lessThanOrEqual;
    LongPrototype.le = LongPrototype.lessThanOrEqual;
    LongPrototype.greaterThan = function greaterThan(other) {
      return this.comp(
        /* validates */
        other
      ) > 0;
    };
    LongPrototype.gt = LongPrototype.greaterThan;
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
      return this.comp(
        /* validates */
        other
      ) >= 0;
    };
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;
    LongPrototype.ge = LongPrototype.greaterThanOrEqual;
    LongPrototype.compare = function compare(other) {
      if (!isLong(other))
        other = fromValue(other);
      if (this.eq(other))
        return 0;
      var thisNeg = this.isNegative(), otherNeg = other.isNegative();
      if (thisNeg && !otherNeg)
        return -1;
      if (!thisNeg && otherNeg)
        return 1;
      if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
      return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    };
    LongPrototype.comp = LongPrototype.compare;
    LongPrototype.negate = function negate() {
      if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
      return this.not().add(ONE);
    };
    LongPrototype.neg = LongPrototype.negate;
    LongPrototype.add = function add(addend) {
      if (!isLong(addend))
        addend = fromValue(addend);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = addend.high >>> 16;
      var b32 = addend.high & 65535;
      var b16 = addend.low >>> 16;
      var b00 = addend.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 + b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 + b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 + b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 + b48;
      c48 &= 65535;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    LongPrototype.subtract = function subtract(subtrahend) {
      if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
      return this.add(subtrahend.neg());
    };
    LongPrototype.sub = LongPrototype.subtract;
    LongPrototype.multiply = function multiply(multiplier) {
      if (this.isZero())
        return ZERO;
      if (!isLong(multiplier))
        multiplier = fromValue(multiplier);
      if (wasm) {
        var low = wasm.mul(
          this.low,
          this.high,
          multiplier.low,
          multiplier.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (multiplier.isZero())
        return ZERO;
      if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
      if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;
      if (this.isNegative()) {
        if (multiplier.isNegative())
          return this.neg().mul(multiplier.neg());
        else
          return this.neg().mul(multiplier).neg();
      } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();
      if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
      var a48 = this.high >>> 16;
      var a32 = this.high & 65535;
      var a16 = this.low >>> 16;
      var a00 = this.low & 65535;
      var b48 = multiplier.high >>> 16;
      var b32 = multiplier.high & 65535;
      var b16 = multiplier.low >>> 16;
      var b00 = multiplier.low & 65535;
      var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
      c00 += a00 * b00;
      c16 += c00 >>> 16;
      c00 &= 65535;
      c16 += a16 * b00;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c16 += a00 * b16;
      c32 += c16 >>> 16;
      c16 &= 65535;
      c32 += a32 * b00;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a16 * b16;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c32 += a00 * b32;
      c48 += c32 >>> 16;
      c32 &= 65535;
      c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
      c48 &= 65535;
      return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
    };
    LongPrototype.mul = LongPrototype.multiply;
    LongPrototype.divide = function divide(divisor) {
      if (!isLong(divisor))
        divisor = fromValue(divisor);
      if (divisor.isZero())
        throw Error("division by zero");
      if (wasm) {
        if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
          return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
          this.low,
          this.high,
          divisor.low,
          divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
      var approx, rem, res;
      if (!this.unsigned) {
        if (this.eq(MIN_VALUE)) {
          if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
            return MIN_VALUE;
          else if (divisor.eq(MIN_VALUE))
            return ONE;
          else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) {
              return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
        } else if (divisor.eq(MIN_VALUE))
          return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
          if (divisor.isNegative())
            return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
          return this.div(divisor.neg()).neg();
        res = ZERO;
      } else {
        if (!divisor.unsigned)
          divisor = divisor.toUnsigned();
        if (divisor.gt(this))
          return UZERO;
        if (divisor.gt(this.shru(1)))
          return UONE;
        res = UZERO;
      }
      rem = this;
      while (rem.gte(divisor)) {
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
        var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
          approx -= delta;
          approxRes = fromNumber(approx, this.unsigned);
          approxRem = approxRes.mul(divisor);
        }
        if (approxRes.isZero())
          approxRes = ONE;
        res = res.add(approxRes);
        rem = rem.sub(approxRem);
      }
      return res;
    };
    LongPrototype.div = LongPrototype.divide;
    LongPrototype.modulo = function modulo(divisor) {
      if (!isLong(divisor))
        divisor = fromValue(divisor);
      if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
          this.low,
          this.high,
          divisor.low,
          divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
      }
      return this.sub(this.div(divisor).mul(divisor));
    };
    LongPrototype.mod = LongPrototype.modulo;
    LongPrototype.rem = LongPrototype.modulo;
    LongPrototype.not = function not() {
      return fromBits(~this.low, ~this.high, this.unsigned);
    };
    LongPrototype.and = function and(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    LongPrototype.or = function or(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    LongPrototype.xor = function xor(other) {
      if (!isLong(other))
        other = fromValue(other);
      return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
      else
        return fromBits(0, this.low << numBits - 32, this.unsigned);
    };
    LongPrototype.shl = LongPrototype.shiftLeft;
    LongPrototype.shiftRight = function shiftRight(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      if ((numBits &= 63) === 0)
        return this;
      else if (numBits < 32)
        return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
      else
        return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
    };
    LongPrototype.shr = LongPrototype.shiftRight;
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
      if (isLong(numBits))
        numBits = numBits.toInt();
      numBits &= 63;
      if (numBits === 0)
        return this;
      else {
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        } else if (numBits === 32)
          return fromBits(high, 0, this.unsigned);
        else
          return fromBits(high >>> numBits - 32, 0, this.unsigned);
      }
    };
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;
    LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
    LongPrototype.toSigned = function toSigned() {
      if (!this.unsigned)
        return this;
      return fromBits(this.low, this.high, false);
    };
    LongPrototype.toUnsigned = function toUnsigned() {
      if (this.unsigned)
        return this;
      return fromBits(this.low, this.high, true);
    };
    LongPrototype.toBytes = function toBytes(le) {
      return le ? this.toBytesLE() : this.toBytesBE();
    };
    LongPrototype.toBytesLE = function toBytesLE() {
      var hi = this.high, lo = this.low;
      return [
        lo & 255,
        lo >>> 8 & 255,
        lo >>> 16 & 255,
        lo >>> 24,
        hi & 255,
        hi >>> 8 & 255,
        hi >>> 16 & 255,
        hi >>> 24
      ];
    };
    LongPrototype.toBytesBE = function toBytesBE() {
      var hi = this.high, lo = this.low;
      return [
        hi >>> 24,
        hi >>> 16 & 255,
        hi >>> 8 & 255,
        hi & 255,
        lo >>> 24,
        lo >>> 16 & 255,
        lo >>> 8 & 255,
        lo & 255
      ];
    };
    Long2.fromBytes = function fromBytes(bytes, unsigned, le) {
      return le ? Long2.fromBytesLE(bytes, unsigned) : Long2.fromBytesBE(bytes, unsigned);
    };
    Long2.fromBytesLE = function fromBytesLE(bytes, unsigned) {
      return new Long2(
        bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
        bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
        unsigned
      );
    };
    Long2.fromBytesBE = function fromBytesBE(bytes, unsigned) {
      return new Long2(
        bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
        bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
        unsigned
      );
    };
  }
});

// node_modules/osc/src/osc.js
var require_osc2 = __commonJS({
  "node_modules/osc/src/osc.js"(exports2, module2) {
    var osc = osc || {};
    (function() {
      "use strict";
      osc.SECS_70YRS = 2208988800;
      osc.TWO_32 = 4294967296;
      osc.defaults = {
        metadata: false,
        unpackSingleArgs: true
      };
      osc.isCommonJS = typeof module2 !== "undefined" && module2.exports ? true : false;
      osc.isNode = osc.isCommonJS && typeof window === "undefined";
      osc.isElectron = typeof process !== "undefined" && process.versions && process.versions.electron ? true : false;
      osc.isBufferEnv = osc.isNode || osc.isElectron;
      osc.isArray = function(obj) {
        return obj && Object.prototype.toString.call(obj) === "[object Array]";
      };
      osc.isTypedArrayView = function(obj) {
        return obj.buffer && obj.buffer instanceof ArrayBuffer;
      };
      osc.isBuffer = function(obj) {
        return osc.isBufferEnv && obj instanceof Buffer;
      };
      osc.Long = typeof Long !== "undefined" ? Long : osc.isNode ? require_long() : void 0;
      osc.TextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8") : typeof util !== "undefined" && typeof (util.TextDecoder !== "undefined") ? new util.TextDecoder("utf-8") : void 0;
      osc.TextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : typeof util !== "undefined" && typeof (util.TextEncoder !== "undefined") ? new util.TextEncoder("utf-8") : void 0;
      osc.dataView = function(obj, offset, length) {
        if (obj.buffer) {
          return new DataView(obj.buffer, offset, length);
        }
        if (obj instanceof ArrayBuffer) {
          return new DataView(obj, offset, length);
        }
        return new DataView(new Uint8Array(obj), offset, length);
      };
      osc.byteArray = function(obj) {
        if (obj instanceof Uint8Array) {
          return obj;
        }
        var buf = obj.buffer ? obj.buffer : obj;
        if (!(buf instanceof ArrayBuffer) && (typeof buf.length === "undefined" || typeof buf === "string")) {
          throw new Error("Can't wrap a non-array-like object as Uint8Array. Object was: " + JSON.stringify(obj, null, 2));
        }
        return new Uint8Array(buf);
      };
      osc.nativeBuffer = function(obj) {
        if (osc.isBufferEnv) {
          return osc.isBuffer(obj) ? obj : Buffer.from(obj.buffer ? obj : new Uint8Array(obj));
        }
        return osc.isTypedArrayView(obj) ? obj : new Uint8Array(obj);
      };
      osc.copyByteArray = function(source, target, offset) {
        if (osc.isTypedArrayView(source) && osc.isTypedArrayView(target)) {
          target.set(source, offset);
        } else {
          var start = offset === void 0 ? 0 : offset, len = Math.min(target.length - offset, source.length);
          for (var i = 0, j = start; i < len; i++, j++) {
            target[j] = source[i];
          }
        }
        return target;
      };
      osc.readString = function(dv, offsetState) {
        var charCodes = [], idx = offsetState.idx;
        for (; idx < dv.byteLength; idx++) {
          var charCode = dv.getUint8(idx);
          if (charCode !== 0) {
            charCodes.push(charCode);
          } else {
            idx++;
            break;
          }
        }
        idx = idx + 3 & ~3;
        offsetState.idx = idx;
        var decoder = osc.isBufferEnv ? osc.readString.withBuffer : osc.TextDecoder ? osc.readString.withTextDecoder : osc.readString.raw;
        return decoder(charCodes);
      };
      osc.readString.raw = function(charCodes) {
        var str = "";
        var sliceSize = 1e4;
        for (var i = 0; i < charCodes.length; i += sliceSize) {
          str += String.fromCharCode.apply(null, charCodes.slice(i, i + sliceSize));
        }
        return str;
      };
      osc.readString.withTextDecoder = function(charCodes) {
        var data = new Int8Array(charCodes);
        return osc.TextDecoder.decode(data);
      };
      osc.readString.withBuffer = function(charCodes) {
        return Buffer.from(charCodes).toString("utf-8");
      };
      osc.writeString = function(str) {
        var encoder = osc.isBufferEnv ? osc.writeString.withBuffer : osc.TextEncoder ? osc.writeString.withTextEncoder : null, terminated = str + "\0", encodedStr;
        if (encoder) {
          encodedStr = encoder(terminated);
        }
        var len = encoder ? encodedStr.length : terminated.length, paddedLen = len + 3 & ~3, arr = new Uint8Array(paddedLen);
        for (var i = 0; i < len - 1; i++) {
          var charCode = encoder ? encodedStr[i] : terminated.charCodeAt(i);
          arr[i] = charCode;
        }
        return arr;
      };
      osc.writeString.withTextEncoder = function(str) {
        return osc.TextEncoder.encode(str);
      };
      osc.writeString.withBuffer = function(str) {
        return Buffer.from(str);
      };
      osc.readPrimitive = function(dv, readerName, numBytes, offsetState) {
        var val = dv[readerName](offsetState.idx, false);
        offsetState.idx += numBytes;
        return val;
      };
      osc.writePrimitive = function(val, dv, writerName, numBytes, offset) {
        offset = offset === void 0 ? 0 : offset;
        var arr;
        if (!dv) {
          arr = new Uint8Array(numBytes);
          dv = new DataView(arr.buffer);
        } else {
          arr = new Uint8Array(dv.buffer);
        }
        dv[writerName](offset, val, false);
        return arr;
      };
      osc.readInt32 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getInt32", 4, offsetState);
      };
      osc.writeInt32 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setInt32", 4, offset);
      };
      osc.readInt64 = function(dv, offsetState) {
        var high = osc.readPrimitive(dv, "getInt32", 4, offsetState), low = osc.readPrimitive(dv, "getInt32", 4, offsetState);
        if (osc.Long) {
          return new osc.Long(low, high);
        } else {
          return {
            high,
            low,
            unsigned: false
          };
        }
      };
      osc.writeInt64 = function(val, dv, offset) {
        var arr = new Uint8Array(8);
        arr.set(osc.writePrimitive(val.high, dv, "setInt32", 4, offset), 0);
        arr.set(osc.writePrimitive(val.low, dv, "setInt32", 4, offset + 4), 4);
        return arr;
      };
      osc.readFloat32 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getFloat32", 4, offsetState);
      };
      osc.writeFloat32 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setFloat32", 4, offset);
      };
      osc.readFloat64 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getFloat64", 8, offsetState);
      };
      osc.writeFloat64 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setFloat64", 8, offset);
      };
      osc.readChar32 = function(dv, offsetState) {
        var charCode = osc.readPrimitive(dv, "getUint32", 4, offsetState);
        return String.fromCharCode(charCode);
      };
      osc.writeChar32 = function(str, dv, offset) {
        var charCode = str.charCodeAt(0);
        if (charCode === void 0 || charCode < -1) {
          return void 0;
        }
        return osc.writePrimitive(charCode, dv, "setUint32", 4, offset);
      };
      osc.readBlob = function(dv, offsetState) {
        var len = osc.readInt32(dv, offsetState), paddedLen = len + 3 & ~3, blob = new Uint8Array(dv.buffer, offsetState.idx, len);
        offsetState.idx += paddedLen;
        return blob;
      };
      osc.writeBlob = function(data) {
        data = osc.byteArray(data);
        var len = data.byteLength, paddedLen = len + 3 & ~3, offset = 4, blobLen = paddedLen + offset, arr = new Uint8Array(blobLen), dv = new DataView(arr.buffer);
        osc.writeInt32(len, dv);
        arr.set(data, offset);
        return arr;
      };
      osc.readMIDIBytes = function(dv, offsetState) {
        var midi = new Uint8Array(dv.buffer, offsetState.idx, 4);
        offsetState.idx += 4;
        return midi;
      };
      osc.writeMIDIBytes = function(bytes) {
        bytes = osc.byteArray(bytes);
        var arr = new Uint8Array(4);
        arr.set(bytes);
        return arr;
      };
      osc.readColor = function(dv, offsetState) {
        var bytes = new Uint8Array(dv.buffer, offsetState.idx, 4), alpha = bytes[3] / 255;
        offsetState.idx += 4;
        return {
          r: bytes[0],
          g: bytes[1],
          b: bytes[2],
          a: alpha
        };
      };
      osc.writeColor = function(color) {
        var alpha = Math.round(color.a * 255), arr = new Uint8Array([color.r, color.g, color.b, alpha]);
        return arr;
      };
      osc.readTrue = function() {
        return true;
      };
      osc.readFalse = function() {
        return false;
      };
      osc.readNull = function() {
        return null;
      };
      osc.readImpulse = function() {
        return 1;
      };
      osc.readTimeTag = function(dv, offsetState) {
        var secs1900 = osc.readPrimitive(dv, "getUint32", 4, offsetState), frac = osc.readPrimitive(dv, "getUint32", 4, offsetState), native = secs1900 === 0 && frac === 1 ? Date.now() : osc.ntpToJSTime(secs1900, frac);
        return {
          raw: [secs1900, frac],
          native
        };
      };
      osc.writeTimeTag = function(timeTag) {
        var raw = timeTag.raw ? timeTag.raw : osc.jsToNTPTime(timeTag.native), arr = new Uint8Array(8), dv = new DataView(arr.buffer);
        osc.writeInt32(raw[0], dv, 0);
        osc.writeInt32(raw[1], dv, 4);
        return arr;
      };
      osc.timeTag = function(secs, now) {
        secs = secs || 0;
        now = now || Date.now();
        var nowSecs = now / 1e3, nowWhole = Math.floor(nowSecs), nowFracs = nowSecs - nowWhole, secsWhole = Math.floor(secs), secsFracs = secs - secsWhole, fracs = nowFracs + secsFracs;
        if (fracs > 1) {
          var fracsWhole = Math.floor(fracs), fracsFracs = fracs - fracsWhole;
          secsWhole += fracsWhole;
          fracs = fracsFracs;
        }
        var ntpSecs = nowWhole + secsWhole + osc.SECS_70YRS, ntpFracs = Math.round(osc.TWO_32 * fracs);
        return {
          raw: [ntpSecs, ntpFracs]
        };
      };
      osc.ntpToJSTime = function(secs1900, frac) {
        var secs1970 = secs1900 - osc.SECS_70YRS, decimals = frac / osc.TWO_32, msTime = (secs1970 + decimals) * 1e3;
        return msTime;
      };
      osc.jsToNTPTime = function(jsTime) {
        var secs = jsTime / 1e3, secsWhole = Math.floor(secs), secsFrac = secs - secsWhole, ntpSecs = secsWhole + osc.SECS_70YRS, ntpFracs = Math.round(osc.TWO_32 * secsFrac);
        return [ntpSecs, ntpFracs];
      };
      osc.readArguments = function(dv, options, offsetState) {
        var typeTagString = osc.readString(dv, offsetState);
        if (typeTagString.indexOf(",") !== 0) {
          throw new Error("A malformed type tag string was found while reading the arguments of an OSC message. String was: " + typeTagString, " at offset: " + offsetState.idx);
        }
        var argTypes = typeTagString.substring(1).split(""), args = [];
        osc.readArgumentsIntoArray(args, argTypes, typeTagString, dv, options, offsetState);
        return args;
      };
      osc.readArgument = function(argType, typeTagString, dv, options, offsetState) {
        var typeSpec = osc.argumentTypes[argType];
        if (!typeSpec) {
          throw new Error("'" + argType + "' is not a valid OSC type tag. Type tag string was: " + typeTagString);
        }
        var argReader = typeSpec.reader, arg = osc[argReader](dv, offsetState);
        if (options.metadata) {
          arg = {
            type: argType,
            value: arg
          };
        }
        return arg;
      };
      osc.readArgumentsIntoArray = function(arr, argTypes, typeTagString, dv, options, offsetState) {
        var i = 0;
        while (i < argTypes.length) {
          var argType = argTypes[i], arg;
          if (argType === "[") {
            var fromArrayOpen = argTypes.slice(i + 1), endArrayIdx = fromArrayOpen.indexOf("]");
            if (endArrayIdx < 0) {
              throw new Error("Invalid argument type tag: an open array type tag ('[') was found without a matching close array tag ('[]'). Type tag was: " + typeTagString);
            }
            var typesInArray = fromArrayOpen.slice(0, endArrayIdx);
            arg = osc.readArgumentsIntoArray([], typesInArray, typeTagString, dv, options, offsetState);
            i += endArrayIdx + 2;
          } else {
            arg = osc.readArgument(argType, typeTagString, dv, options, offsetState);
            i++;
          }
          arr.push(arg);
        }
        return arr;
      };
      osc.writeArguments = function(args, options) {
        var argCollection = osc.collectArguments(args, options);
        return osc.joinParts(argCollection);
      };
      osc.joinParts = function(dataCollection) {
        var buf = new Uint8Array(dataCollection.byteLength), parts = dataCollection.parts, offset = 0;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          osc.copyByteArray(part, buf, offset);
          offset += part.length;
        }
        return buf;
      };
      osc.addDataPart = function(dataPart, dataCollection) {
        dataCollection.parts.push(dataPart);
        dataCollection.byteLength += dataPart.length;
      };
      osc.writeArrayArguments = function(args, dataCollection) {
        var typeTag = "[";
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          typeTag += osc.writeArgument(arg, dataCollection);
        }
        typeTag += "]";
        return typeTag;
      };
      osc.writeArgument = function(arg, dataCollection) {
        if (osc.isArray(arg)) {
          return osc.writeArrayArguments(arg, dataCollection);
        }
        var type = arg.type, writer = osc.argumentTypes[type].writer;
        if (writer) {
          var data = osc[writer](arg.value);
          osc.addDataPart(data, dataCollection);
        }
        return arg.type;
      };
      osc.collectArguments = function(args, options, dataCollection) {
        if (!osc.isArray(args)) {
          args = typeof args === "undefined" ? [] : [args];
        }
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        if (!options.metadata) {
          args = osc.annotateArguments(args);
        }
        var typeTagString = ",", currPartIdx = dataCollection.parts.length;
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          typeTagString += osc.writeArgument(arg, dataCollection);
        }
        var typeData = osc.writeString(typeTagString);
        dataCollection.byteLength += typeData.byteLength;
        dataCollection.parts.splice(currPartIdx, 0, typeData);
        return dataCollection;
      };
      osc.readMessage = function(data, options, offsetState) {
        options = options || osc.defaults;
        var dv = osc.dataView(data, data.byteOffset, data.byteLength);
        offsetState = offsetState || {
          idx: 0
        };
        var address = osc.readString(dv, offsetState);
        return osc.readMessageContents(address, dv, options, offsetState);
      };
      osc.readMessageContents = function(address, dv, options, offsetState) {
        if (address.indexOf("/") !== 0) {
          throw new Error("A malformed OSC address was found while reading an OSC message. String was: " + address);
        }
        var args = osc.readArguments(dv, options, offsetState);
        return {
          address,
          args: args.length === 1 && options.unpackSingleArgs ? args[0] : args
        };
      };
      osc.collectMessageParts = function(msg, options, dataCollection) {
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        osc.addDataPart(osc.writeString(msg.address), dataCollection);
        return osc.collectArguments(msg.args, options, dataCollection);
      };
      osc.writeMessage = function(msg, options) {
        options = options || osc.defaults;
        if (!osc.isValidMessage(msg)) {
          throw new Error("An OSC message must contain a valid address. Message was: " + JSON.stringify(msg, null, 2));
        }
        var msgCollection = osc.collectMessageParts(msg, options);
        return osc.joinParts(msgCollection);
      };
      osc.isValidMessage = function(msg) {
        return msg.address && msg.address.indexOf("/") === 0;
      };
      osc.readBundle = function(dv, options, offsetState) {
        return osc.readPacket(dv, options, offsetState);
      };
      osc.collectBundlePackets = function(bundle, options, dataCollection) {
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        osc.addDataPart(osc.writeString("#bundle"), dataCollection);
        osc.addDataPart(osc.writeTimeTag(bundle.timeTag), dataCollection);
        for (var i = 0; i < bundle.packets.length; i++) {
          var packet = bundle.packets[i], collector = packet.address ? osc.collectMessageParts : osc.collectBundlePackets, packetCollection = collector(packet, options);
          dataCollection.byteLength += packetCollection.byteLength;
          osc.addDataPart(osc.writeInt32(packetCollection.byteLength), dataCollection);
          dataCollection.parts = dataCollection.parts.concat(packetCollection.parts);
        }
        return dataCollection;
      };
      osc.writeBundle = function(bundle, options) {
        if (!osc.isValidBundle(bundle)) {
          throw new Error("An OSC bundle must contain 'timeTag' and 'packets' properties. Bundle was: " + JSON.stringify(bundle, null, 2));
        }
        options = options || osc.defaults;
        var bundleCollection = osc.collectBundlePackets(bundle, options);
        return osc.joinParts(bundleCollection);
      };
      osc.isValidBundle = function(bundle) {
        return bundle.timeTag !== void 0 && bundle.packets !== void 0;
      };
      osc.readBundleContents = function(dv, options, offsetState, len) {
        var timeTag = osc.readTimeTag(dv, offsetState), packets = [];
        while (offsetState.idx < len) {
          var packetSize = osc.readInt32(dv, offsetState), packetLen = offsetState.idx + packetSize, packet = osc.readPacket(dv, options, offsetState, packetLen);
          packets.push(packet);
        }
        return {
          timeTag,
          packets
        };
      };
      osc.readPacket = function(data, options, offsetState, len) {
        var dv = osc.dataView(data, data.byteOffset, data.byteLength);
        len = len === void 0 ? dv.byteLength : len;
        offsetState = offsetState || {
          idx: 0
        };
        var header = osc.readString(dv, offsetState), firstChar = header[0];
        if (firstChar === "#") {
          return osc.readBundleContents(dv, options, offsetState, len);
        } else if (firstChar === "/") {
          return osc.readMessageContents(header, dv, options, offsetState);
        }
        throw new Error("The header of an OSC packet didn't contain an OSC address or a #bundle string. Header was: " + header);
      };
      osc.writePacket = function(packet, options) {
        if (osc.isValidMessage(packet)) {
          return osc.writeMessage(packet, options);
        } else if (osc.isValidBundle(packet)) {
          return osc.writeBundle(packet, options);
        } else {
          throw new Error("The specified packet was not recognized as a valid OSC message or bundle. Packet was: " + JSON.stringify(packet, null, 2));
        }
      };
      osc.argumentTypes = {
        i: {
          reader: "readInt32",
          writer: "writeInt32"
        },
        h: {
          reader: "readInt64",
          writer: "writeInt64"
        },
        f: {
          reader: "readFloat32",
          writer: "writeFloat32"
        },
        s: {
          reader: "readString",
          writer: "writeString"
        },
        S: {
          reader: "readString",
          writer: "writeString"
        },
        b: {
          reader: "readBlob",
          writer: "writeBlob"
        },
        t: {
          reader: "readTimeTag",
          writer: "writeTimeTag"
        },
        T: {
          reader: "readTrue"
        },
        F: {
          reader: "readFalse"
        },
        N: {
          reader: "readNull"
        },
        I: {
          reader: "readImpulse"
        },
        d: {
          reader: "readFloat64",
          writer: "writeFloat64"
        },
        c: {
          reader: "readChar32",
          writer: "writeChar32"
        },
        r: {
          reader: "readColor",
          writer: "writeColor"
        },
        m: {
          reader: "readMIDIBytes",
          writer: "writeMIDIBytes"
        }
        // [] are special cased within read/writeArguments()
      };
      osc.inferTypeForArgument = function(arg) {
        var type = typeof arg;
        switch (type) {
          case "boolean":
            return arg ? "T" : "F";
          case "string":
            return "s";
          case "number":
            return "f";
          case "undefined":
            return "N";
          case "object":
            if (arg === null) {
              return "N";
            } else if (arg instanceof Uint8Array || arg instanceof ArrayBuffer) {
              return "b";
            } else if (typeof arg.high === "number" && typeof arg.low === "number") {
              return "h";
            }
            break;
        }
        throw new Error("Can't infer OSC argument type for value: " + JSON.stringify(arg, null, 2));
      };
      osc.annotateArguments = function(args) {
        var annotated = [];
        for (var i = 0; i < args.length; i++) {
          var arg = args[i], msgArg;
          if (typeof arg === "object" && arg.type && arg.value !== void 0) {
            msgArg = arg;
          } else if (osc.isArray(arg)) {
            msgArg = osc.annotateArguments(arg);
          } else {
            var oscType = osc.inferTypeForArgument(arg);
            msgArg = {
              type: oscType,
              value: arg
            };
          }
          annotated.push(msgArg);
        }
        return annotated;
      };
      if (osc.isCommonJS) {
        module2.exports = osc;
      }
    })();
  }
});

// node_modules/slip/src/slip.js
var require_slip = __commonJS({
  "node_modules/slip/src/slip.js"(exports2) {
    (function(root, factory) {
      "use strict";
      if (typeof exports2 === "object") {
        root.slip = exports2;
        factory(exports2);
      } else if (typeof define === "function" && define.amd) {
        define(["exports"], function(exports3) {
          root.slip = exports3;
          return root.slip, factory(exports3);
        });
      } else {
        root.slip = {};
        factory(root.slip);
      }
    })(exports2, function(exports3) {
      "use strict";
      var slip = exports3;
      slip.END = 192;
      slip.ESC = 219;
      slip.ESC_END = 220;
      slip.ESC_ESC = 221;
      slip.byteArray = function(data, offset, length) {
        return data instanceof ArrayBuffer ? new Uint8Array(data, offset, length) : data;
      };
      slip.expandByteArray = function(arr) {
        var expanded = new Uint8Array(arr.length * 2);
        expanded.set(arr);
        return expanded;
      };
      slip.sliceByteArray = function(arr, start, end) {
        var sliced = arr.buffer.slice ? arr.buffer.slice(start, end) : arr.subarray(start, end);
        return new Uint8Array(sliced);
      };
      slip.encode = function(data, o) {
        o = o || {};
        o.bufferPadding = o.bufferPadding || 4;
        data = slip.byteArray(data, o.offset, o.byteLength);
        var bufLen = data.length + o.bufferPadding + 3 & ~3, encoded = new Uint8Array(bufLen), j = 1;
        encoded[0] = slip.END;
        for (var i = 0; i < data.length; i++) {
          if (j > encoded.length - 3) {
            encoded = slip.expandByteArray(encoded);
          }
          var val = data[i];
          if (val === slip.END) {
            encoded[j++] = slip.ESC;
            val = slip.ESC_END;
          } else if (val === slip.ESC) {
            encoded[j++] = slip.ESC;
            val = slip.ESC_ESC;
          }
          encoded[j++] = val;
        }
        encoded[j] = slip.END;
        return slip.sliceByteArray(encoded, 0, j + 1);
      };
      slip.Decoder = function(o) {
        o = typeof o !== "function" ? o || {} : {
          onMessage: o
        };
        this.maxMessageSize = o.maxMessageSize || 10485760;
        this.bufferSize = o.bufferSize || 1024;
        this.msgBuffer = new Uint8Array(this.bufferSize);
        this.msgBufferIdx = 0;
        this.onMessage = o.onMessage;
        this.onError = o.onError;
        this.escape = false;
      };
      var p = slip.Decoder.prototype;
      p.decode = function(data) {
        data = slip.byteArray(data);
        var msg;
        for (var i = 0; i < data.length; i++) {
          var val = data[i];
          if (this.escape) {
            if (val === slip.ESC_ESC) {
              val = slip.ESC;
            } else if (val === slip.ESC_END) {
              val = slip.END;
            }
          } else {
            if (val === slip.ESC) {
              this.escape = true;
              continue;
            }
            if (val === slip.END) {
              msg = this.handleEnd();
              continue;
            }
          }
          var more = this.addByte(val);
          if (!more) {
            this.handleMessageMaxError();
          }
        }
        return msg;
      };
      p.handleMessageMaxError = function() {
        if (this.onError) {
          this.onError(
            this.msgBuffer.subarray(0),
            "The message is too large; the maximum message size is " + this.maxMessageSize / 1024 + "KB. Use a larger maxMessageSize if necessary."
          );
        }
        this.msgBufferIdx = 0;
        this.escape = false;
      };
      p.addByte = function(val) {
        if (this.msgBufferIdx > this.msgBuffer.length - 1) {
          this.msgBuffer = slip.expandByteArray(this.msgBuffer);
        }
        this.msgBuffer[this.msgBufferIdx++] = val;
        this.escape = false;
        return this.msgBuffer.length < this.maxMessageSize;
      };
      p.handleEnd = function() {
        if (this.msgBufferIdx === 0) {
          return;
        }
        var msg = slip.sliceByteArray(this.msgBuffer, 0, this.msgBufferIdx);
        if (this.onMessage) {
          this.onMessage(msg);
        }
        this.msgBufferIdx = 0;
        return msg;
      };
      return slip;
    });
  }
});

// node_modules/osc/src/osc-transports.js
var require_osc_transports = __commonJS({
  "node_modules/osc/src/osc-transports.js"(exports2, module2) {
    var osc = osc || require_osc2();
    var slip = slip || require_slip();
    var EventEmitter = EventEmitter || require("events").EventEmitter;
    (function() {
      "use strict";
      osc.supportsSerial = false;
      osc.firePacketEvents = function(port, packet, timeTag, packetInfo) {
        if (packet.address) {
          port.emit("message", packet, timeTag, packetInfo);
        } else {
          osc.fireBundleEvents(port, packet, timeTag, packetInfo);
        }
      };
      osc.fireBundleEvents = function(port, bundle, timeTag, packetInfo) {
        port.emit("bundle", bundle, timeTag, packetInfo);
        for (var i = 0; i < bundle.packets.length; i++) {
          var packet = bundle.packets[i];
          osc.firePacketEvents(port, packet, bundle.timeTag, packetInfo);
        }
      };
      osc.fireClosedPortSendError = function(port, msg) {
        msg = msg || "Can't send packets on a closed osc.Port object. Please open (or reopen) this Port by calling open().";
        port.emit("error", msg);
      };
      osc.Port = function(options) {
        this.options = options || {};
        this.on("data", this.decodeOSC.bind(this));
      };
      var p = osc.Port.prototype = Object.create(EventEmitter.prototype);
      p.constructor = osc.Port;
      p.send = function(oscPacket) {
        var args = Array.prototype.slice.call(arguments), encoded = this.encodeOSC(oscPacket), buf = osc.nativeBuffer(encoded);
        args[0] = buf;
        this.sendRaw.apply(this, args);
      };
      p.encodeOSC = function(packet) {
        packet = packet.buffer ? packet.buffer : packet;
        var encoded;
        try {
          encoded = osc.writePacket(packet, this.options);
        } catch (err) {
          this.emit("error", err);
        }
        return encoded;
      };
      p.decodeOSC = function(data, packetInfo) {
        data = osc.byteArray(data);
        this.emit("raw", data, packetInfo);
        try {
          var packet = osc.readPacket(data, this.options);
          this.emit("osc", packet, packetInfo);
          osc.firePacketEvents(this, packet, void 0, packetInfo);
        } catch (err) {
          this.emit("error", err);
        }
      };
      osc.SLIPPort = function(options) {
        var that = this;
        var o = this.options = options || {};
        o.useSLIP = o.useSLIP === void 0 ? true : o.useSLIP;
        this.decoder = new slip.Decoder({
          onMessage: this.decodeOSC.bind(this),
          onError: function(err) {
            that.emit("error", err);
          }
        });
        var decodeHandler = o.useSLIP ? this.decodeSLIPData : this.decodeOSC;
        this.on("data", decodeHandler.bind(this));
      };
      p = osc.SLIPPort.prototype = Object.create(osc.Port.prototype);
      p.constructor = osc.SLIPPort;
      p.encodeOSC = function(packet) {
        packet = packet.buffer ? packet.buffer : packet;
        var framed;
        try {
          var encoded = osc.writePacket(packet, this.options);
          framed = slip.encode(encoded);
        } catch (err) {
          this.emit("error", err);
        }
        return framed;
      };
      p.decodeSLIPData = function(data, packetInfo) {
        this.decoder.decode(data, packetInfo);
      };
      osc.relay = function(from, to, eventName, sendFnName, transformFn, sendArgs) {
        eventName = eventName || "message";
        sendFnName = sendFnName || "send";
        transformFn = transformFn || function() {
        };
        sendArgs = sendArgs ? [null].concat(sendArgs) : [];
        var listener = function(data) {
          sendArgs[0] = data;
          data = transformFn(data);
          to[sendFnName].apply(to, sendArgs);
        };
        from.on(eventName, listener);
        return {
          eventName,
          listener
        };
      };
      osc.relayPorts = function(from, to, o) {
        var eventName = o.raw ? "raw" : "osc", sendFnName = o.raw ? "sendRaw" : "send";
        return osc.relay(from, to, eventName, sendFnName, o.transform);
      };
      osc.stopRelaying = function(from, relaySpec) {
        from.removeListener(relaySpec.eventName, relaySpec.listener);
      };
      osc.Relay = function(port1, port2, options) {
        var o = this.options = options || {};
        o.raw = false;
        this.port1 = port1;
        this.port2 = port2;
        this.listen();
      };
      p = osc.Relay.prototype = Object.create(EventEmitter.prototype);
      p.constructor = osc.Relay;
      p.open = function() {
        this.port1.open();
        this.port2.open();
      };
      p.listen = function() {
        if (this.port1Spec && this.port2Spec) {
          this.close();
        }
        this.port1Spec = osc.relayPorts(this.port1, this.port2, this.options);
        this.port2Spec = osc.relayPorts(this.port2, this.port1, this.options);
        var closeListener = this.close.bind(this);
        this.port1.on("close", closeListener);
        this.port2.on("close", closeListener);
      };
      p.close = function() {
        osc.stopRelaying(this.port1, this.port1Spec);
        osc.stopRelaying(this.port2, this.port2Spec);
        this.emit("close", this.port1, this.port2);
      };
      if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = osc;
      }
    })();
  }
});

// node_modules/osc/src/platforms/osc-websocket-client.js
var require_osc_websocket_client = __commonJS({
  "node_modules/osc/src/platforms/osc-websocket-client.js"() {
    var osc = osc || require_osc2();
    (function() {
      "use strict";
      osc.WebSocket = typeof WebSocket !== "undefined" ? WebSocket : require_ws();
      osc.WebSocketPort = function(options) {
        osc.Port.call(this, options);
        this.on("open", this.listen.bind(this));
        this.socket = options.socket;
        if (this.socket) {
          if (this.socket.readyState === 1) {
            osc.WebSocketPort.setupSocketForBinary(this.socket);
            this.emit("open", this.socket);
          } else {
            this.open();
          }
        }
      };
      var p = osc.WebSocketPort.prototype = Object.create(osc.Port.prototype);
      p.constructor = osc.WebSocketPort;
      p.open = function() {
        if (!this.socket || this.socket.readyState > 1) {
          this.socket = new osc.WebSocket(this.options.url);
        }
        osc.WebSocketPort.setupSocketForBinary(this.socket);
        var that = this;
        this.socket.onopen = function() {
          that.emit("open", that.socket);
        };
        this.socket.onerror = function(err) {
          that.emit("error", err);
        };
      };
      p.listen = function() {
        var that = this;
        this.socket.onmessage = function(e) {
          that.emit("data", e.data, e);
        };
        this.socket.onclose = function(e) {
          that.emit("close", e);
        };
        that.emit("ready");
      };
      p.sendRaw = function(encoded) {
        if (!this.socket || this.socket.readyState !== 1) {
          osc.fireClosedPortSendError(this);
          return;
        }
        this.socket.send(encoded);
      };
      p.close = function(code, reason) {
        this.socket.close(code, reason);
      };
      osc.WebSocketPort.setupSocketForBinary = function(socket) {
        socket.binaryType = osc.isNode ? "nodebuffer" : "arraybuffer";
      };
    })();
  }
});

// node_modules/@serialport/parser-byte-length/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/@serialport/parser-byte-length/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ByteLengthParser = void 0;
    var stream_1 = require("stream");
    var ByteLengthParser = class extends stream_1.Transform {
      length;
      position;
      buffer;
      constructor(options) {
        super(options);
        if (typeof options.length !== "number") {
          throw new TypeError('"length" is not a number');
        }
        if (options.length < 1) {
          throw new TypeError('"length" is not greater than 0');
        }
        this.length = options.length;
        this.position = 0;
        this.buffer = Buffer.alloc(this.length);
      }
      _transform(chunk, _encoding, cb) {
        let cursor = 0;
        while (cursor < chunk.length) {
          this.buffer[this.position] = chunk[cursor];
          cursor++;
          this.position++;
          if (this.position === this.length) {
            this.push(this.buffer);
            this.buffer = Buffer.alloc(this.length);
            this.position = 0;
          }
        }
        cb();
      }
      _flush(cb) {
        this.push(this.buffer.slice(0, this.position));
        this.buffer = Buffer.alloc(this.length);
        cb();
      }
    };
    exports2.ByteLengthParser = ByteLengthParser;
  }
});

// node_modules/@serialport/parser-cctalk/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/@serialport/parser-cctalk/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CCTalkParser = void 0;
    var stream_1 = require("stream");
    var CCTalkParser = class extends stream_1.Transform {
      array;
      cursor;
      lastByteFetchTime;
      maxDelayBetweenBytesMs;
      constructor(maxDelayBetweenBytesMs = 50) {
        super();
        this.array = [];
        this.cursor = 0;
        this.lastByteFetchTime = 0;
        this.maxDelayBetweenBytesMs = maxDelayBetweenBytesMs;
      }
      _transform(buffer, encoding, cb) {
        if (this.maxDelayBetweenBytesMs > 0) {
          const now = Date.now();
          if (now - this.lastByteFetchTime > this.maxDelayBetweenBytesMs) {
            this.array = [];
            this.cursor = 0;
          }
          this.lastByteFetchTime = now;
        }
        this.cursor += buffer.length;
        Array.from(buffer).map((byte) => this.array.push(byte));
        while (this.cursor > 1 && this.cursor >= this.array[1] + 5) {
          const FullMsgLength = this.array[1] + 5;
          const frame = Buffer.from(this.array.slice(0, FullMsgLength));
          this.array = this.array.slice(frame.length, this.array.length);
          this.cursor -= FullMsgLength;
          this.push(frame);
        }
        cb();
      }
    };
    exports2.CCTalkParser = CCTalkParser;
  }
});

// node_modules/@serialport/parser-delimiter/dist/index.js
var require_dist5 = __commonJS({
  "node_modules/@serialport/parser-delimiter/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DelimiterParser = void 0;
    var stream_1 = require("stream");
    var DelimiterParser = class extends stream_1.Transform {
      includeDelimiter;
      delimiter;
      buffer;
      constructor({ delimiter, includeDelimiter = false, ...options }) {
        super(options);
        if (delimiter === void 0) {
          throw new TypeError('"delimiter" is not a bufferable object');
        }
        if (delimiter.length === 0) {
          throw new TypeError('"delimiter" has a 0 or undefined length');
        }
        this.includeDelimiter = includeDelimiter;
        this.delimiter = Buffer.from(delimiter);
        this.buffer = Buffer.alloc(0);
      }
      _transform(chunk, encoding, cb) {
        let data = Buffer.concat([this.buffer, chunk]);
        let position;
        while ((position = data.indexOf(this.delimiter)) !== -1) {
          this.push(data.slice(0, position + (this.includeDelimiter ? this.delimiter.length : 0)));
          data = data.slice(position + this.delimiter.length);
        }
        this.buffer = data;
        cb();
      }
      _flush(cb) {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        cb();
      }
    };
    exports2.DelimiterParser = DelimiterParser;
  }
});

// node_modules/@serialport/parser-inter-byte-timeout/dist/index.js
var require_dist6 = __commonJS({
  "node_modules/@serialport/parser-inter-byte-timeout/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InterByteTimeoutParser = void 0;
    var stream_1 = require("stream");
    var InterByteTimeoutParser = class extends stream_1.Transform {
      maxBufferSize;
      currentPacket;
      interval;
      intervalID;
      constructor({ maxBufferSize = 65536, interval, ...transformOptions }) {
        super(transformOptions);
        if (!interval) {
          throw new TypeError('"interval" is required');
        }
        if (typeof interval !== "number" || Number.isNaN(interval)) {
          throw new TypeError('"interval" is not a number');
        }
        if (interval < 1) {
          throw new TypeError('"interval" is not greater than 0');
        }
        if (typeof maxBufferSize !== "number" || Number.isNaN(maxBufferSize)) {
          throw new TypeError('"maxBufferSize" is not a number');
        }
        if (maxBufferSize < 1) {
          throw new TypeError('"maxBufferSize" is not greater than 0');
        }
        this.maxBufferSize = maxBufferSize;
        this.currentPacket = [];
        this.interval = interval;
      }
      _transform(chunk, encoding, cb) {
        if (this.intervalID) {
          clearTimeout(this.intervalID);
        }
        for (let offset = 0; offset < chunk.length; offset++) {
          this.currentPacket.push(chunk[offset]);
          if (this.currentPacket.length >= this.maxBufferSize) {
            this.emitPacket();
          }
        }
        this.intervalID = setTimeout(this.emitPacket.bind(this), this.interval);
        cb();
      }
      emitPacket() {
        if (this.intervalID) {
          clearTimeout(this.intervalID);
        }
        if (this.currentPacket.length > 0) {
          this.push(Buffer.from(this.currentPacket));
        }
        this.currentPacket = [];
      }
      _flush(cb) {
        this.emitPacket();
        cb();
      }
    };
    exports2.InterByteTimeoutParser = InterByteTimeoutParser;
  }
});

// node_modules/@serialport/parser-packet-length/dist/index.js
var require_dist7 = __commonJS({
  "node_modules/@serialport/parser-packet-length/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PacketLengthParser = void 0;
    var stream_1 = require("stream");
    var PacketLengthParser = class extends stream_1.Transform {
      buffer;
      start;
      opts;
      constructor(options = {}) {
        super(options);
        const { delimiter = 170, packetOverhead = 2, lengthBytes = 1, lengthOffset = 1, maxLen = 255 } = options;
        this.opts = {
          delimiter,
          packetOverhead,
          lengthBytes,
          lengthOffset,
          maxLen
        };
        this.buffer = Buffer.alloc(0);
        this.start = false;
      }
      _transform(chunk, encoding, cb) {
        for (let ndx = 0; ndx < chunk.length; ndx++) {
          const byte = chunk[ndx];
          if (byte === this.opts.delimiter) {
            this.start = true;
          }
          if (true === this.start) {
            this.buffer = Buffer.concat([this.buffer, Buffer.from([byte])]);
            if (this.buffer.length >= this.opts.lengthOffset + this.opts.lengthBytes) {
              const len = this.buffer.readUIntLE(this.opts.lengthOffset, this.opts.lengthBytes);
              if (this.buffer.length == len + this.opts.packetOverhead || len > this.opts.maxLen) {
                this.push(this.buffer);
                this.buffer = Buffer.alloc(0);
                this.start = false;
              }
            }
          }
        }
        cb();
      }
      _flush(cb) {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        cb();
      }
    };
    exports2.PacketLengthParser = PacketLengthParser;
  }
});

// node_modules/@serialport/parser-readline/dist/index.js
var require_dist8 = __commonJS({
  "node_modules/@serialport/parser-readline/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadlineParser = void 0;
    var parser_delimiter_1 = require_dist5();
    var ReadlineParser = class extends parser_delimiter_1.DelimiterParser {
      constructor(options) {
        const opts = {
          delimiter: Buffer.from("\n", "utf8"),
          encoding: "utf8",
          ...options
        };
        if (typeof opts.delimiter === "string") {
          opts.delimiter = Buffer.from(opts.delimiter, opts.encoding);
        }
        super(opts);
      }
    };
    exports2.ReadlineParser = ReadlineParser;
  }
});

// node_modules/@serialport/parser-ready/dist/index.js
var require_dist9 = __commonJS({
  "node_modules/@serialport/parser-ready/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadyParser = void 0;
    var stream_1 = require("stream");
    var ReadyParser = class extends stream_1.Transform {
      delimiter;
      readOffset;
      ready;
      constructor({ delimiter, ...options }) {
        if (delimiter === void 0) {
          throw new TypeError('"delimiter" is not a bufferable object');
        }
        if (delimiter.length === 0) {
          throw new TypeError('"delimiter" has a 0 or undefined length');
        }
        super(options);
        this.delimiter = Buffer.from(delimiter);
        this.readOffset = 0;
        this.ready = false;
      }
      _transform(chunk, encoding, cb) {
        if (this.ready) {
          this.push(chunk);
          return cb();
        }
        const delimiter = this.delimiter;
        let chunkOffset = 0;
        while (this.readOffset < delimiter.length && chunkOffset < chunk.length) {
          if (delimiter[this.readOffset] === chunk[chunkOffset]) {
            this.readOffset++;
          } else {
            this.readOffset = 0;
          }
          chunkOffset++;
        }
        if (this.readOffset === delimiter.length) {
          this.ready = true;
          this.emit("ready");
          const chunkRest = chunk.slice(chunkOffset);
          if (chunkRest.length > 0) {
            this.push(chunkRest);
          }
        }
        cb();
      }
    };
    exports2.ReadyParser = ReadyParser;
  }
});

// node_modules/@serialport/parser-regex/dist/index.js
var require_dist10 = __commonJS({
  "node_modules/@serialport/parser-regex/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RegexParser = void 0;
    var stream_1 = require("stream");
    var RegexParser = class extends stream_1.Transform {
      regex;
      data;
      constructor({ regex, ...options }) {
        const opts = {
          encoding: "utf8",
          ...options
        };
        if (regex === void 0) {
          throw new TypeError('"options.regex" must be a regular expression pattern or object');
        }
        if (!(regex instanceof RegExp)) {
          regex = new RegExp(regex.toString());
        }
        super(opts);
        this.regex = regex;
        this.data = "";
      }
      _transform(chunk, encoding, cb) {
        const data = this.data + chunk;
        const parts = data.split(this.regex);
        this.data = parts.pop() || "";
        parts.forEach((part) => {
          this.push(part);
        });
        cb();
      }
      _flush(cb) {
        this.push(this.data);
        this.data = "";
        cb();
      }
    };
    exports2.RegexParser = RegexParser;
  }
});

// node_modules/@serialport/parser-slip-encoder/dist/decoder.js
var require_decoder = __commonJS({
  "node_modules/@serialport/parser-slip-encoder/dist/decoder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SlipDecoder = void 0;
    var stream_1 = require("stream");
    var SlipDecoder = class extends stream_1.Transform {
      opts;
      buffer;
      escape;
      start;
      constructor(options = {}) {
        super(options);
        const { START, ESC = 219, END = 192, ESC_START, ESC_END = 220, ESC_ESC = 221 } = options;
        this.opts = {
          START,
          ESC,
          END,
          ESC_START,
          ESC_END,
          ESC_ESC
        };
        this.buffer = Buffer.alloc(0);
        this.escape = false;
        this.start = false;
      }
      _transform(chunk, encoding, cb) {
        for (let ndx = 0; ndx < chunk.length; ndx++) {
          let byte = chunk[ndx];
          if (byte === this.opts.START) {
            this.start = true;
            continue;
          } else if (void 0 == this.opts.START) {
            this.start = true;
          }
          if (this.escape) {
            if (byte === this.opts.ESC_START && this.opts.START) {
              byte = this.opts.START;
            } else if (byte === this.opts.ESC_ESC) {
              byte = this.opts.ESC;
            } else if (byte === this.opts.ESC_END) {
              byte = this.opts.END;
            } else {
              this.escape = false;
              this.push(this.buffer);
              this.buffer = Buffer.alloc(0);
            }
          } else {
            if (byte === this.opts.ESC) {
              this.escape = true;
              continue;
            }
            if (byte === this.opts.END) {
              this.push(this.buffer);
              this.buffer = Buffer.alloc(0);
              this.escape = false;
              this.start = false;
              continue;
            }
          }
          this.escape = false;
          if (this.start) {
            this.buffer = Buffer.concat([this.buffer, Buffer.from([byte])]);
          }
        }
        cb();
      }
      _flush(cb) {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        cb();
      }
    };
    exports2.SlipDecoder = SlipDecoder;
  }
});

// node_modules/@serialport/parser-slip-encoder/dist/encoder.js
var require_encoder = __commonJS({
  "node_modules/@serialport/parser-slip-encoder/dist/encoder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SlipEncoder = void 0;
    var stream_1 = require("stream");
    var SlipEncoder = class extends stream_1.Transform {
      opts;
      constructor(options = {}) {
        super(options);
        const { START, ESC = 219, END = 192, ESC_START, ESC_END = 220, ESC_ESC = 221, bluetoothQuirk = false } = options;
        this.opts = {
          START,
          ESC,
          END,
          ESC_START,
          ESC_END,
          ESC_ESC,
          bluetoothQuirk
        };
      }
      _transform(chunk, encoding, cb) {
        const chunkLength = chunk.length;
        if (this.opts.bluetoothQuirk && chunkLength === 0) {
          return cb();
        }
        const encoded = Buffer.alloc(chunkLength * 2 + 2);
        let j = 0;
        if (this.opts.bluetoothQuirk == true) {
          encoded[j++] = this.opts.END;
        }
        if (this.opts.START !== void 0) {
          encoded[j++] = this.opts.START;
        }
        for (let i = 0; i < chunkLength; i++) {
          let byte = chunk[i];
          if (byte === this.opts.START && this.opts.ESC_START) {
            encoded[j++] = this.opts.ESC;
            byte = this.opts.ESC_START;
          } else if (byte === this.opts.END) {
            encoded[j++] = this.opts.ESC;
            byte = this.opts.ESC_END;
          } else if (byte === this.opts.ESC) {
            encoded[j++] = this.opts.ESC;
            byte = this.opts.ESC_ESC;
          }
          encoded[j++] = byte;
        }
        encoded[j++] = this.opts.END;
        cb(null, encoded.slice(0, j));
      }
    };
    exports2.SlipEncoder = SlipEncoder;
  }
});

// node_modules/@serialport/parser-slip-encoder/dist/index.js
var require_dist11 = __commonJS({
  "node_modules/@serialport/parser-slip-encoder/dist/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar2(require_decoder(), exports2);
    __exportStar2(require_encoder(), exports2);
  }
});

// node_modules/@serialport/parser-spacepacket/dist/utils.js
var require_utils = __commonJS({
  "node_modules/@serialport/parser-spacepacket/dist/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertHeaderBufferToObj = exports2.HEADER_LENGTH = void 0;
    exports2.HEADER_LENGTH = 6;
    var toOctetStr = (num) => {
      let str = Number(num).toString(2);
      while (str.length < 8) {
        str = `0${str}`;
      }
      return str;
    };
    var convertHeaderBufferToObj = (buf) => {
      const headerStr = Array.from(buf.slice(0, exports2.HEADER_LENGTH)).reduce((accum, curr) => `${accum}${toOctetStr(curr)}`, "");
      const isVersion1 = headerStr.slice(0, 3) === "000";
      const versionNumber = isVersion1 ? 1 : "UNKNOWN_VERSION";
      const type = Number(headerStr[3]);
      const secondaryHeader = Number(headerStr[4]);
      const apid = parseInt(headerStr.slice(5, 16), 2);
      const sequenceFlags = parseInt(headerStr.slice(16, 18), 2);
      const packetName = parseInt(headerStr.slice(18, 32), 2);
      const dataLength = parseInt(headerStr.slice(-16), 2) + 1;
      return {
        versionNumber,
        identification: {
          apid,
          secondaryHeader,
          type
        },
        sequenceControl: {
          packetName,
          sequenceFlags
        },
        dataLength
      };
    };
    exports2.convertHeaderBufferToObj = convertHeaderBufferToObj;
  }
});

// node_modules/@serialport/parser-spacepacket/dist/index.js
var require_dist12 = __commonJS({
  "node_modules/@serialport/parser-spacepacket/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SpacePacketParser = void 0;
    var stream_1 = require("stream");
    var utils_1 = require_utils();
    var SpacePacketParser = class extends stream_1.Transform {
      timeCodeFieldLength;
      ancillaryDataFieldLength;
      dataBuffer;
      headerBuffer;
      dataLength;
      expectingHeader;
      dataSlice;
      header;
      /**
       * A Transform stream that accepts a stream of octet data and emits object representations of
       * CCSDS Space Packets once a packet has been completely received.
       * @param {Object} [options] Configuration options for the stream
       * @param {Number} options.timeCodeFieldLength The length of the time code field within the data
       * @param {Number} options.ancillaryDataFieldLength The length of the ancillary data field within the data
       */
      constructor(options = {}) {
        super({ ...options, objectMode: true });
        this.timeCodeFieldLength = options.timeCodeFieldLength || 0;
        this.ancillaryDataFieldLength = options.ancillaryDataFieldLength || 0;
        this.dataSlice = this.timeCodeFieldLength + this.ancillaryDataFieldLength;
        this.dataBuffer = Buffer.alloc(0);
        this.headerBuffer = Buffer.alloc(0);
        this.dataLength = 0;
        this.expectingHeader = true;
      }
      /**
       * Bundle the header, secondary header if present, and the data into a JavaScript object to emit.
       * If more data has been received past the current packet, begin the process of parsing the next
       * packet(s).
       */
      pushCompletedPacket() {
        if (!this.header) {
          throw new Error("Missing header");
        }
        const timeCode = Buffer.from(this.dataBuffer.slice(0, this.timeCodeFieldLength));
        const ancillaryData = Buffer.from(this.dataBuffer.slice(this.timeCodeFieldLength, this.timeCodeFieldLength + this.ancillaryDataFieldLength));
        const data = Buffer.from(this.dataBuffer.slice(this.dataSlice, this.dataLength));
        const completedPacket = {
          header: { ...this.header },
          data: data.toString()
        };
        if (timeCode.length > 0 || ancillaryData.length > 0) {
          completedPacket.secondaryHeader = {};
          if (timeCode.length) {
            completedPacket.secondaryHeader.timeCode = timeCode.toString();
          }
          if (ancillaryData.length) {
            completedPacket.secondaryHeader.ancillaryData = ancillaryData.toString();
          }
        }
        this.push(completedPacket);
        const nextChunk = Buffer.from(this.dataBuffer.slice(this.dataLength));
        if (nextChunk.length >= utils_1.HEADER_LENGTH) {
          this.extractHeader(nextChunk);
        } else {
          this.headerBuffer = nextChunk;
          this.dataBuffer = Buffer.alloc(0);
          this.expectingHeader = true;
          this.dataLength = 0;
          this.header = void 0;
        }
      }
      /**
       * Build the Stream's headerBuffer property from the received Buffer chunk; extract data from it
       * if it's complete. If there's more to the chunk than just the header, initiate handling the
       * packet data.
       * @param chunk -  Build the Stream's headerBuffer property from
       */
      extractHeader(chunk) {
        const headerAsBuffer = Buffer.concat([this.headerBuffer, chunk]);
        const startOfDataBuffer = headerAsBuffer.slice(utils_1.HEADER_LENGTH);
        if (headerAsBuffer.length >= utils_1.HEADER_LENGTH) {
          this.header = (0, utils_1.convertHeaderBufferToObj)(headerAsBuffer);
          this.dataLength = this.header.dataLength;
          this.headerBuffer = Buffer.alloc(0);
          this.expectingHeader = false;
        } else {
          this.headerBuffer = headerAsBuffer;
        }
        if (startOfDataBuffer.length > 0) {
          this.dataBuffer = Buffer.from(startOfDataBuffer);
          if (this.dataBuffer.length >= this.dataLength) {
            this.pushCompletedPacket();
          }
        }
      }
      _transform(chunk, encoding, cb) {
        if (this.expectingHeader) {
          this.extractHeader(chunk);
        } else {
          this.dataBuffer = Buffer.concat([this.dataBuffer, chunk]);
          if (this.dataBuffer.length >= this.dataLength) {
            this.pushCompletedPacket();
          }
        }
        cb();
      }
      _flush(cb) {
        const remaining = Buffer.concat([this.headerBuffer, this.dataBuffer]);
        const remainingArray = Array.from(remaining);
        this.push(remainingArray);
        cb();
      }
    };
    exports2.SpacePacketParser = SpacePacketParser;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common2 = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common2()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util2 = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util2.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util2.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common2()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/@serialport/stream/dist/index.js
var require_dist13 = __commonJS({
  "node_modules/@serialport/stream/dist/index.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SerialPortStream = exports2.DisconnectedError = void 0;
    var stream_1 = require("stream");
    var debug_1 = __importDefault2(require_src());
    var debug = (0, debug_1.default)("serialport/stream");
    var DisconnectedError = class extends Error {
      disconnected;
      constructor(message) {
        super(message);
        this.disconnected = true;
      }
    };
    exports2.DisconnectedError = DisconnectedError;
    var defaultSetFlags = {
      brk: false,
      cts: false,
      dtr: true,
      rts: true
    };
    function allocNewReadPool(poolSize) {
      const pool = Buffer.allocUnsafe(poolSize);
      pool.used = 0;
      return pool;
    }
    var SerialPortStream = class extends stream_1.Duplex {
      port;
      _pool;
      _kMinPoolSpace;
      opening;
      closing;
      settings;
      /**
       * Create a new serial port object for the `path`. In the case of invalid arguments or invalid options, when constructing a new SerialPort it will throw an error. The port will open automatically by default, which is the equivalent of calling `port.open(openCallback)` in the next tick. You can disable this by setting the option `autoOpen` to `false`.
       * @emits open
       * @emits data
       * @emits close
       * @emits error
       */
      constructor(options, openCallback) {
        const settings = {
          autoOpen: true,
          endOnClose: false,
          highWaterMark: 64 * 1024,
          ...options
        };
        super({
          highWaterMark: settings.highWaterMark
        });
        if (!settings.binding) {
          throw new TypeError('"Bindings" is invalid pass it as `options.binding`');
        }
        if (!settings.path) {
          throw new TypeError(`"path" is not defined: ${settings.path}`);
        }
        if (typeof settings.baudRate !== "number") {
          throw new TypeError(`"baudRate" must be a number: ${settings.baudRate}`);
        }
        this.settings = settings;
        this.opening = false;
        this.closing = false;
        this._pool = allocNewReadPool(this.settings.highWaterMark);
        this._kMinPoolSpace = 128;
        if (this.settings.autoOpen) {
          this.open(openCallback);
        }
      }
      get path() {
        return this.settings.path;
      }
      get baudRate() {
        return this.settings.baudRate;
      }
      get isOpen() {
        return (this.port?.isOpen ?? false) && !this.closing;
      }
      _error(error, callback) {
        if (callback) {
          callback.call(this, error);
        } else {
          this.emit("error", error);
        }
      }
      _asyncError(error, callback) {
        process.nextTick(() => this._error(error, callback));
      }
      /**
       * Opens a connection to the given serial port.
       * @param {ErrorCallback=} openCallback - Called after a connection is opened. If this is not provided and an error occurs, it will be emitted on the port's `error` event.
       * @emits open
       */
      open(openCallback) {
        if (this.isOpen) {
          return this._asyncError(new Error("Port is already open"), openCallback);
        }
        if (this.opening) {
          return this._asyncError(new Error("Port is opening"), openCallback);
        }
        const { highWaterMark, binding, autoOpen, endOnClose, ...openOptions } = this.settings;
        this.opening = true;
        debug("opening", `path: ${this.path}`);
        this.settings.binding.open(openOptions).then((port) => {
          debug("opened", `path: ${this.path}`);
          this.port = port;
          this.opening = false;
          this.emit("open");
          if (openCallback) {
            openCallback.call(this, null);
          }
        }, (err) => {
          this.opening = false;
          debug("Binding #open had an error", err);
          this._error(err, openCallback);
        });
      }
      /**
       * Changes the baud rate for an open port. Emits an error or calls the callback if the baud rate isn't supported.
       * @param {object=} options Only supports `baudRate`.
       * @param {number=} [options.baudRate] The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
       * @param {ErrorCallback=} [callback] Called once the port's baud rate changes. If `.update` is called without a callback, and there is an error, an error event is emitted.
       * @returns {undefined}
       */
      update(options, callback) {
        if (!this.isOpen || !this.port) {
          debug("update attempted, but port is not open");
          return this._asyncError(new Error("Port is not open"), callback);
        }
        debug("update", `baudRate: ${options.baudRate}`);
        this.port.update(options).then(() => {
          debug("binding.update", "finished");
          this.settings.baudRate = options.baudRate;
          if (callback) {
            callback.call(this, null);
          }
        }, (err) => {
          debug("binding.update", "error", err);
          return this._error(err, callback);
        });
      }
      write(data, encoding, callback) {
        if (Array.isArray(data)) {
          data = Buffer.from(data);
        }
        if (typeof encoding === "function") {
          return super.write(data, encoding);
        }
        return super.write(data, encoding, callback);
      }
      _write(data, encoding, callback) {
        if (!this.isOpen || !this.port) {
          this.once("open", () => {
            this._write(data, encoding, callback);
          });
          return;
        }
        debug("_write", `${data.length} bytes of data`);
        this.port.write(data).then(() => {
          debug("binding.write", "write finished");
          callback(null);
        }, (err) => {
          debug("binding.write", "error", err);
          if (!err.canceled) {
            this._disconnected(err);
          }
          callback(err);
        });
      }
      _writev(data, callback) {
        debug("_writev", `${data.length} chunks of data`);
        const dataV = data.map((write) => write.chunk);
        this._write(Buffer.concat(dataV), void 0, callback);
      }
      _read(bytesToRead) {
        if (!this.isOpen || !this.port) {
          debug("_read", "queueing _read for after open");
          this.once("open", () => {
            this._read(bytesToRead);
          });
          return;
        }
        if (!this._pool || this._pool.length - this._pool.used < this._kMinPoolSpace) {
          debug("_read", "discarding the read buffer pool because it is below kMinPoolSpace");
          this._pool = allocNewReadPool(this.settings.highWaterMark);
        }
        const pool = this._pool;
        const toRead = Math.min(pool.length - pool.used, bytesToRead);
        const start = pool.used;
        debug("_read", `reading`, { start, toRead });
        this.port.read(pool, start, toRead).then(({ bytesRead }) => {
          debug("binding.read", `finished`, { bytesRead });
          if (bytesRead === 0) {
            debug("binding.read", "Zero bytes read closing readable stream");
            this.push(null);
            return;
          }
          pool.used += bytesRead;
          this.push(pool.slice(start, start + bytesRead));
        }, (err) => {
          debug("binding.read", `error`, err);
          if (!err.canceled) {
            this._disconnected(err);
          }
          this._read(bytesToRead);
        });
      }
      _disconnected(err) {
        if (!this.isOpen) {
          debug("disconnected aborted because already closed", err);
          return;
        }
        debug("disconnected", err);
        this.close(void 0, new DisconnectedError(err.message));
      }
      /**
       * Closes an open connection.
       *
       * If there are in progress writes when the port is closed the writes will error.
       * @param {ErrorCallback} callback Called once a connection is closed.
       * @param {Error} disconnectError used internally to propagate a disconnect error
       */
      close(callback, disconnectError = null) {
        if (!this.isOpen || !this.port) {
          debug("close attempted, but port is not open");
          return this._asyncError(new Error("Port is not open"), callback);
        }
        this.closing = true;
        debug("#close");
        this.port.close().then(() => {
          this.closing = false;
          debug("binding.close", "finished");
          this.emit("close", disconnectError);
          if (this.settings.endOnClose) {
            this.emit("end");
          }
          if (callback) {
            callback.call(this, disconnectError);
          }
        }, (err) => {
          this.closing = false;
          debug("binding.close", "had an error", err);
          return this._error(err, callback);
        });
      }
      /**
       * Set control flags on an open port. Uses [`SetCommMask`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363257(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for OS X and Linux.
       *
       * All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. If options isn't provided default options is used.
       */
      set(options, callback) {
        if (!this.isOpen || !this.port) {
          debug("set attempted, but port is not open");
          return this._asyncError(new Error("Port is not open"), callback);
        }
        const settings = { ...defaultSetFlags, ...options };
        debug("#set", settings);
        this.port.set(settings).then(() => {
          debug("binding.set", "finished");
          if (callback) {
            callback.call(this, null);
          }
        }, (err) => {
          debug("binding.set", "had an error", err);
          return this._error(err, callback);
        });
      }
      /**
       * Returns the control flags (CTS, DSR, DCD) on the open port.
       * Uses [`GetCommModemStatus`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363258(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for mac and linux.
       */
      get(callback) {
        if (!this.isOpen || !this.port) {
          debug("get attempted, but port is not open");
          return this._asyncError(new Error("Port is not open"), callback);
        }
        debug("#get");
        this.port.get().then((status) => {
          debug("binding.get", "finished");
          callback.call(this, null, status);
        }, (err) => {
          debug("binding.get", "had an error", err);
          return this._error(err, callback);
        });
      }
      /**
       * Flush discards data received but not read, and written but not transmitted by the operating system. For more technical details, see [`tcflush(fd, TCIOFLUSH)`](http://linux.die.net/man/3/tcflush) for Mac/Linux and [`FlushFileBuffers`](http://msdn.microsoft.com/en-us/library/windows/desktop/aa364439) for Windows.
       */
      flush(callback) {
        if (!this.isOpen || !this.port) {
          debug("flush attempted, but port is not open");
          return this._asyncError(new Error("Port is not open"), callback);
        }
        debug("#flush");
        this.port.flush().then(() => {
          debug("binding.flush", "finished");
          if (callback) {
            callback.call(this, null);
          }
        }, (err) => {
          debug("binding.flush", "had an error", err);
          return this._error(err, callback);
        });
      }
      /**
         * Waits until all output data is transmitted to the serial port. After any pending write has completed it calls [`tcdrain()`](http://linux.die.net/man/3/tcdrain) or [FlushFileBuffers()](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364439(v=vs.85).aspx) to ensure it has been written to the device.
        * @example
        Write the `data` and wait until it has finished transmitting to the target serial port before calling the callback. This will queue until the port is open and writes are finished.
      
        ```js
        function writeAndDrain (data, callback) {
          port.write(data);
          port.drain(callback);
        }
        ```
        */
      drain(callback) {
        debug("drain");
        if (!this.isOpen || !this.port) {
          debug("drain queuing on port open");
          this.once("open", () => {
            this.drain(callback);
          });
          return;
        }
        this.port.drain().then(() => {
          debug("binding.drain", "finished");
          if (callback) {
            callback.call(this, null);
          }
        }, (err) => {
          debug("binding.drain", "had an error", err);
          return this._error(err, callback);
        });
      }
    };
    exports2.SerialPortStream = SerialPortStream;
  }
});

// node_modules/@serialport/binding-mock/dist/index.js
var require_dist14 = __commonJS({
  "node_modules/@serialport/binding-mock/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var debugFactory = require_src();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var debugFactory__default = /* @__PURE__ */ _interopDefaultLegacy(debugFactory);
    var debug = debugFactory__default["default"]("serialport/binding-mock");
    var ports = {};
    var serialNumber = 0;
    function resolveNextTick() {
      return new Promise((resolve) => process.nextTick(() => resolve()));
    }
    var CanceledError = class extends Error {
      constructor(message) {
        super(message);
        this.canceled = true;
      }
    };
    var MockBinding = {
      reset() {
        ports = {};
        serialNumber = 0;
      },
      // Create a mock port
      createPort(path, options = {}) {
        serialNumber++;
        const optWithDefaults = Object.assign({ echo: false, record: false, manufacturer: "The J5 Robotics Company", vendorId: void 0, productId: void 0, maxReadSize: 1024 }, options);
        ports[path] = {
          data: Buffer.alloc(0),
          echo: optWithDefaults.echo,
          record: optWithDefaults.record,
          readyData: optWithDefaults.readyData,
          maxReadSize: optWithDefaults.maxReadSize,
          info: {
            path,
            manufacturer: optWithDefaults.manufacturer,
            serialNumber: `${serialNumber}`,
            pnpId: void 0,
            locationId: void 0,
            vendorId: optWithDefaults.vendorId,
            productId: optWithDefaults.productId
          }
        };
        debug(serialNumber, "created port", JSON.stringify({ path, opt: options }));
      },
      async list() {
        debug(null, "list");
        return Object.values(ports).map((port) => port.info);
      },
      async open(options) {
        var _a;
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        if (!options.path) {
          throw new TypeError('"path" is not a valid port');
        }
        if (!options.baudRate) {
          throw new TypeError('"baudRate" is not a valid baudRate');
        }
        const openOptions = Object.assign({ dataBits: 8, lock: true, stopBits: 1, parity: "none", rtscts: false, xon: false, xoff: false, xany: false, hupcl: true }, options);
        const { path } = openOptions;
        debug(null, `open: opening path ${path}`);
        const port = ports[path];
        await resolveNextTick();
        if (!port) {
          throw new Error(`Port does not exist - please call MockBinding.createPort('${path}') first`);
        }
        const serialNumber2 = port.info.serialNumber;
        if ((_a = port.openOpt) === null || _a === void 0 ? void 0 : _a.lock) {
          debug(serialNumber2, "open: Port is locked cannot open");
          throw new Error("Port is locked cannot open");
        }
        debug(serialNumber2, `open: opened path ${path}`);
        port.openOpt = Object.assign({}, openOptions);
        return new MockPortBinding(port, openOptions);
      }
    };
    var MockPortBinding = class {
      constructor(port, openOptions) {
        this.port = port;
        this.openOptions = openOptions;
        this.pendingRead = null;
        this.isOpen = true;
        this.lastWrite = null;
        this.recording = Buffer.alloc(0);
        this.writeOperation = null;
        this.serialNumber = port.info.serialNumber;
        if (port.readyData) {
          const data = port.readyData;
          process.nextTick(() => {
            if (this.isOpen) {
              debug(this.serialNumber, "emitting ready data");
              this.emitData(data);
            }
          });
        }
      }
      // Emit data on a mock port
      emitData(data) {
        if (!this.isOpen || !this.port) {
          throw new Error("Port must be open to pretend to receive data");
        }
        const bufferData = Buffer.isBuffer(data) ? data : Buffer.from(data);
        debug(this.serialNumber, "emitting data - pending read:", Boolean(this.pendingRead));
        this.port.data = Buffer.concat([this.port.data, bufferData]);
        if (this.pendingRead) {
          process.nextTick(this.pendingRead);
          this.pendingRead = null;
        }
      }
      async close() {
        debug(this.serialNumber, "close");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        const port = this.port;
        if (!port) {
          throw new Error("already closed");
        }
        port.openOpt = void 0;
        port.data = Buffer.alloc(0);
        debug(this.serialNumber, "port is closed");
        this.serialNumber = void 0;
        this.isOpen = false;
        if (this.pendingRead) {
          this.pendingRead(new CanceledError("port is closed"));
        }
      }
      async read(buffer, offset, length) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        if (typeof offset !== "number" || isNaN(offset)) {
          throw new TypeError(`"offset" is not an integer got "${isNaN(offset) ? "NaN" : typeof offset}"`);
        }
        if (typeof length !== "number" || isNaN(length)) {
          throw new TypeError(`"length" is not an integer got "${isNaN(length) ? "NaN" : typeof length}"`);
        }
        if (buffer.length < offset + length) {
          throw new Error("buffer is too small");
        }
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        debug(this.serialNumber, "read", length, "bytes");
        await resolveNextTick();
        if (!this.isOpen || !this.port) {
          throw new CanceledError("Read canceled");
        }
        if (this.port.data.length <= 0) {
          return new Promise((resolve, reject) => {
            this.pendingRead = (err) => {
              if (err) {
                return reject(err);
              }
              this.read(buffer, offset, length).then(resolve, reject);
            };
          });
        }
        const lengthToRead = this.port.maxReadSize > length ? length : this.port.maxReadSize;
        const data = this.port.data.slice(0, lengthToRead);
        const bytesRead = data.copy(buffer, offset);
        this.port.data = this.port.data.slice(lengthToRead);
        debug(this.serialNumber, "read", bytesRead, "bytes");
        return { bytesRead, buffer };
      }
      async write(buffer) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        if (!this.isOpen || !this.port) {
          debug("write", "error port is not open");
          throw new Error("Port is not open");
        }
        debug(this.serialNumber, "write", buffer.length, "bytes");
        if (this.writeOperation) {
          throw new Error("Overlapping writes are not supported and should be queued by the serialport object");
        }
        this.writeOperation = (async () => {
          await resolveNextTick();
          if (!this.isOpen || !this.port) {
            throw new Error("Write canceled");
          }
          const data = this.lastWrite = Buffer.from(buffer);
          if (this.port.record) {
            this.recording = Buffer.concat([this.recording, data]);
          }
          if (this.port.echo) {
            process.nextTick(() => {
              if (this.isOpen) {
                this.emitData(data);
              }
            });
          }
          this.writeOperation = null;
          debug(this.serialNumber, "writing finished");
        })();
        return this.writeOperation;
      }
      async update(options) {
        if (typeof options !== "object") {
          throw TypeError('"options" is not an object');
        }
        if (typeof options.baudRate !== "number") {
          throw new TypeError('"options.baudRate" is not a number');
        }
        debug(this.serialNumber, "update");
        if (!this.isOpen || !this.port) {
          throw new Error("Port is not open");
        }
        await resolveNextTick();
        if (this.port.openOpt) {
          this.port.openOpt.baudRate = options.baudRate;
        }
      }
      async set(options) {
        if (typeof options !== "object") {
          throw new TypeError('"options" is not an object');
        }
        debug(this.serialNumber, "set");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await resolveNextTick();
      }
      async get() {
        debug(this.serialNumber, "get");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await resolveNextTick();
        return {
          cts: true,
          dsr: false,
          dcd: false
        };
      }
      async getBaudRate() {
        var _a;
        debug(this.serialNumber, "getBaudRate");
        if (!this.isOpen || !this.port) {
          throw new Error("Port is not open");
        }
        await resolveNextTick();
        if (!((_a = this.port.openOpt) === null || _a === void 0 ? void 0 : _a.baudRate)) {
          throw new Error("Internal Error");
        }
        return {
          baudRate: this.port.openOpt.baudRate
        };
      }
      async flush() {
        debug(this.serialNumber, "flush");
        if (!this.isOpen || !this.port) {
          throw new Error("Port is not open");
        }
        await resolveNextTick();
        this.port.data = Buffer.alloc(0);
      }
      async drain() {
        debug(this.serialNumber, "drain");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await this.writeOperation;
        await resolveNextTick();
      }
    };
    exports2.CanceledError = CanceledError;
    exports2.MockBinding = MockBinding;
    exports2.MockPortBinding = MockPortBinding;
  }
});

// node_modules/serialport/dist/serialport-mock.js
var require_serialport_mock = __commonJS({
  "node_modules/serialport/dist/serialport-mock.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SerialPortMock = void 0;
    var stream_1 = require_dist13();
    var binding_mock_1 = require_dist14();
    var SerialPortMock = class extends stream_1.SerialPortStream {
      static list = binding_mock_1.MockBinding.list;
      static binding = binding_mock_1.MockBinding;
      constructor(options, openCallback) {
        const opts = {
          binding: binding_mock_1.MockBinding,
          ...options
        };
        super(opts, openCallback);
      }
    };
    exports2.SerialPortMock = SerialPortMock;
  }
});

// node_modules/node-gyp-build/node-gyp-build.js
var require_node_gyp_build = __commonJS({
  "node_modules/node-gyp-build/node-gyp-build.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
    var vars = process.config && process.config.variables || {};
    var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
    var abi = process.versions.modules;
    var runtime = isElectron() ? "electron" : isNwjs() ? "node-webkit" : "node";
    var arch = process.env.npm_config_arch || os.arch();
    var platform = process.env.npm_config_platform || os.platform();
    var libc = process.env.LIBC || (isAlpine(platform) ? "musl" : "glibc");
    var armv = process.env.ARM_VERSION || (arch === "arm64" ? "8" : vars.arm_version) || "";
    var uv = (process.versions.uv || "").split(".")[0];
    module2.exports = load;
    function load(dir) {
      return runtimeRequire(load.resolve(dir));
    }
    load.resolve = load.path = function(dir) {
      dir = path.resolve(dir || ".");
      try {
        var name = runtimeRequire(path.join(dir, "package.json")).name.toUpperCase().replace(/-/g, "_");
        if (process.env[name + "_PREBUILD"])
          dir = process.env[name + "_PREBUILD"];
      } catch (err) {
      }
      if (!prebuildsOnly) {
        var release = getFirst(path.join(dir, "build/Release"), matchBuild);
        if (release)
          return release;
        var debug = getFirst(path.join(dir, "build/Debug"), matchBuild);
        if (debug)
          return debug;
      }
      var prebuild = resolve(dir);
      if (prebuild)
        return prebuild;
      var nearby = resolve(path.dirname(process.execPath));
      if (nearby)
        return nearby;
      var target = [
        "platform=" + platform,
        "arch=" + arch,
        "runtime=" + runtime,
        "abi=" + abi,
        "uv=" + uv,
        armv ? "armv=" + armv : "",
        "libc=" + libc,
        "node=" + process.versions.node,
        process.versions.electron ? "electron=" + process.versions.electron : "",
        typeof __webpack_require__ === "function" ? "webpack=true" : ""
        // eslint-disable-line
      ].filter(Boolean).join(" ");
      throw new Error("No native build was found for " + target + "\n    loaded from: " + dir + "\n");
      function resolve(dir2) {
        var tuples = readdirSync(path.join(dir2, "prebuilds")).map(parseTuple);
        var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
        if (!tuple)
          return;
        var prebuilds = path.join(dir2, "prebuilds", tuple.name);
        var parsed = readdirSync(prebuilds).map(parseTags);
        var candidates = parsed.filter(matchTags(runtime, abi));
        var winner = candidates.sort(compareTags(runtime))[0];
        if (winner)
          return path.join(prebuilds, winner.file);
      }
    };
    function readdirSync(dir) {
      try {
        return fs.readdirSync(dir);
      } catch (err) {
        return [];
      }
    }
    function getFirst(dir, filter) {
      var files = readdirSync(dir).filter(filter);
      return files[0] && path.join(dir, files[0]);
    }
    function matchBuild(name) {
      return /\.node$/.test(name);
    }
    function parseTuple(name) {
      var arr = name.split("-");
      if (arr.length !== 2)
        return;
      var platform2 = arr[0];
      var architectures = arr[1].split("+");
      if (!platform2)
        return;
      if (!architectures.length)
        return;
      if (!architectures.every(Boolean))
        return;
      return { name, platform: platform2, architectures };
    }
    function matchTuple(platform2, arch2) {
      return function(tuple) {
        if (tuple == null)
          return false;
        if (tuple.platform !== platform2)
          return false;
        return tuple.architectures.includes(arch2);
      };
    }
    function compareTuples(a, b) {
      return a.architectures.length - b.architectures.length;
    }
    function parseTags(file) {
      var arr = file.split(".");
      var extension = arr.pop();
      var tags = { file, specificity: 0 };
      if (extension !== "node")
        return;
      for (var i = 0; i < arr.length; i++) {
        var tag = arr[i];
        if (tag === "node" || tag === "electron" || tag === "node-webkit") {
          tags.runtime = tag;
        } else if (tag === "napi") {
          tags.napi = true;
        } else if (tag.slice(0, 3) === "abi") {
          tags.abi = tag.slice(3);
        } else if (tag.slice(0, 2) === "uv") {
          tags.uv = tag.slice(2);
        } else if (tag.slice(0, 4) === "armv") {
          tags.armv = tag.slice(4);
        } else if (tag === "glibc" || tag === "musl") {
          tags.libc = tag;
        } else {
          continue;
        }
        tags.specificity++;
      }
      return tags;
    }
    function matchTags(runtime2, abi2) {
      return function(tags) {
        if (tags == null)
          return false;
        if (tags.runtime !== runtime2 && !runtimeAgnostic(tags))
          return false;
        if (tags.abi !== abi2 && !tags.napi)
          return false;
        if (tags.uv && tags.uv !== uv)
          return false;
        if (tags.armv && tags.armv !== armv)
          return false;
        if (tags.libc && tags.libc !== libc)
          return false;
        return true;
      };
    }
    function runtimeAgnostic(tags) {
      return tags.runtime === "node" && tags.napi;
    }
    function compareTags(runtime2) {
      return function(a, b) {
        if (a.runtime !== b.runtime) {
          return a.runtime === runtime2 ? -1 : 1;
        } else if (a.abi !== b.abi) {
          return a.abi ? -1 : 1;
        } else if (a.specificity !== b.specificity) {
          return a.specificity > b.specificity ? -1 : 1;
        } else {
          return 0;
        }
      };
    }
    function isNwjs() {
      return !!(process.versions && process.versions.nw);
    }
    function isElectron() {
      if (process.versions && process.versions.electron)
        return true;
      if (process.env.ELECTRON_RUN_AS_NODE)
        return true;
      return typeof window !== "undefined" && window.process && window.process.type === "renderer";
    }
    function isAlpine(platform2) {
      return platform2 === "linux" && fs.existsSync("/etc/alpine-release");
    }
    load.parseTags = parseTags;
    load.matchTags = matchTags;
    load.compareTags = compareTags;
    load.parseTuple = parseTuple;
    load.matchTuple = matchTuple;
    load.compareTuples = compareTuples;
  }
});

// node_modules/node-gyp-build/index.js
var require_node_gyp_build2 = __commonJS({
  "node_modules/node-gyp-build/index.js"(exports2, module2) {
    if (typeof process.addon === "function") {
      module2.exports = process.addon.bind(process);
    } else {
      module2.exports = require_node_gyp_build();
    }
  }
});

// node_modules/@serialport/bindings-cpp/dist/load-bindings.js
var require_load_bindings = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/load-bindings.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.asyncWrite = exports2.asyncRead = exports2.asyncUpdate = exports2.asyncSet = exports2.asyncOpen = exports2.asyncList = exports2.asyncGetBaudRate = exports2.asyncGet = exports2.asyncFlush = exports2.asyncDrain = exports2.asyncClose = void 0;
    var node_gyp_build_1 = __importDefault2(require_node_gyp_build2());
    var util_1 = require("util");
    var path_1 = require("path");
    var binding = (0, node_gyp_build_1.default)((0, path_1.join)(__dirname, "../"));
    exports2.asyncClose = binding.close ? (0, util_1.promisify)(binding.close) : async () => {
      throw new Error('"binding.close" Method not implemented');
    };
    exports2.asyncDrain = binding.drain ? (0, util_1.promisify)(binding.drain) : async () => {
      throw new Error('"binding.drain" Method not implemented');
    };
    exports2.asyncFlush = binding.flush ? (0, util_1.promisify)(binding.flush) : async () => {
      throw new Error('"binding.flush" Method not implemented');
    };
    exports2.asyncGet = binding.get ? (0, util_1.promisify)(binding.get) : async () => {
      throw new Error('"binding.get" Method not implemented');
    };
    exports2.asyncGetBaudRate = binding.getBaudRate ? (0, util_1.promisify)(binding.getBaudRate) : async () => {
      throw new Error('"binding.getBaudRate" Method not implemented');
    };
    exports2.asyncList = binding.list ? (0, util_1.promisify)(binding.list) : async () => {
      throw new Error('"binding.list" Method not implemented');
    };
    exports2.asyncOpen = binding.open ? (0, util_1.promisify)(binding.open) : async () => {
      throw new Error('"binding.open" Method not implemented');
    };
    exports2.asyncSet = binding.set ? (0, util_1.promisify)(binding.set) : async () => {
      throw new Error('"binding.set" Method not implemented');
    };
    exports2.asyncUpdate = binding.update ? (0, util_1.promisify)(binding.update) : async () => {
      throw new Error('"binding.update" Method not implemented');
    };
    exports2.asyncRead = binding.read ? (0, util_1.promisify)(binding.read) : async () => {
      throw new Error('"binding.read" Method not implemented');
    };
    exports2.asyncWrite = binding.write ? (0, util_1.promisify)(binding.write) : async () => {
      throw new Error('"binding.write" Method not implemented');
    };
  }
});

// node_modules/@serialport/bindings-cpp/dist/errors.js
var require_errors = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BindingsError = void 0;
    var BindingsError = class extends Error {
      constructor(message, { canceled = false } = {}) {
        super(message);
        this.canceled = canceled;
      }
    };
    exports2.BindingsError = BindingsError;
  }
});

// node_modules/@serialport/bindings-cpp/dist/poller.js
var require_poller = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/poller.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Poller = exports2.EVENTS = void 0;
    var debug_1 = __importDefault2(require_src());
    var events_1 = require("events");
    var path_1 = require("path");
    var node_gyp_build_1 = __importDefault2(require_node_gyp_build2());
    var errors_1 = require_errors();
    var { Poller: PollerBindings } = (0, node_gyp_build_1.default)((0, path_1.join)(__dirname, "../"));
    var logger = (0, debug_1.default)("serialport/bindings-cpp/poller");
    exports2.EVENTS = {
      UV_READABLE: 1,
      UV_WRITABLE: 2,
      UV_DISCONNECT: 4
    };
    function handleEvent(error, eventFlag) {
      if (error) {
        logger("error", error);
        this.emit("readable", error);
        this.emit("writable", error);
        this.emit("disconnect", error);
        return;
      }
      if (eventFlag & exports2.EVENTS.UV_READABLE) {
        logger('received "readable"');
        this.emit("readable", null);
      }
      if (eventFlag & exports2.EVENTS.UV_WRITABLE) {
        logger('received "writable"');
        this.emit("writable", null);
      }
      if (eventFlag & exports2.EVENTS.UV_DISCONNECT) {
        logger('received "disconnect"');
        this.emit("disconnect", null);
      }
    }
    var Poller = class extends events_1.EventEmitter {
      constructor(fd, FDPoller = PollerBindings) {
        logger("Creating poller");
        super();
        this.poller = new FDPoller(fd, handleEvent.bind(this));
      }
      /**
       * Wait for the next event to occur
       * @param {string} event ('readable'|'writable'|'disconnect')
       * @returns {Poller} returns itself
       */
      once(event, callback) {
        switch (event) {
          case "readable":
            this.poll(exports2.EVENTS.UV_READABLE);
            break;
          case "writable":
            this.poll(exports2.EVENTS.UV_WRITABLE);
            break;
          case "disconnect":
            this.poll(exports2.EVENTS.UV_DISCONNECT);
            break;
        }
        return super.once(event, callback);
      }
      /**
       * Ask the bindings to listen for an event, it is recommend to use `.once()` for easy use
       * @param {EVENTS} eventFlag polls for an event or group of events based upon a flag.
       */
      poll(eventFlag = 0) {
        if (eventFlag & exports2.EVENTS.UV_READABLE) {
          logger('Polling for "readable"');
        }
        if (eventFlag & exports2.EVENTS.UV_WRITABLE) {
          logger('Polling for "writable"');
        }
        if (eventFlag & exports2.EVENTS.UV_DISCONNECT) {
          logger('Polling for "disconnect"');
        }
        this.poller.poll(eventFlag);
      }
      /**
       * Stop listening for events and cancel all outstanding listening with an error
       */
      stop() {
        logger("Stopping poller");
        this.poller.stop();
        this.emitCanceled();
      }
      destroy() {
        logger("Destroying poller");
        this.poller.destroy();
        this.emitCanceled();
      }
      emitCanceled() {
        const err = new errors_1.BindingsError("Canceled", { canceled: true });
        this.emit("readable", err);
        this.emit("writable", err);
        this.emit("disconnect", err);
      }
    };
    exports2.Poller = Poller;
  }
});

// node_modules/@serialport/bindings-cpp/dist/unix-read.js
var require_unix_read = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/unix-read.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unixRead = void 0;
    var util_1 = require("util");
    var fs_1 = require("fs");
    var errors_1 = require_errors();
    var debug_1 = __importDefault2(require_src());
    var logger = (0, debug_1.default)("serialport/bindings-cpp/unixRead");
    var readAsync = (0, util_1.promisify)(fs_1.read);
    var readable = (binding) => {
      return new Promise((resolve, reject) => {
        if (!binding.poller) {
          throw new Error("No poller on bindings");
        }
        binding.poller.once("readable", (err) => err ? reject(err) : resolve());
      });
    };
    var unixRead = async ({ binding, buffer, offset, length, fsReadAsync = readAsync }) => {
      logger("Starting read");
      if (!binding.isOpen || !binding.fd) {
        throw new errors_1.BindingsError("Port is not open", { canceled: true });
      }
      try {
        const { bytesRead } = await fsReadAsync(binding.fd, buffer, offset, length, null);
        if (bytesRead === 0) {
          return (0, exports2.unixRead)({ binding, buffer, offset, length, fsReadAsync });
        }
        logger("Finished read", bytesRead, "bytes");
        return { bytesRead, buffer };
      } catch (err) {
        logger("read error", err);
        if (err.code === "EAGAIN" || err.code === "EWOULDBLOCK" || err.code === "EINTR") {
          if (!binding.isOpen) {
            throw new errors_1.BindingsError("Port is not open", { canceled: true });
          }
          logger("waiting for readable because of code:", err.code);
          await readable(binding);
          return (0, exports2.unixRead)({ binding, buffer, offset, length, fsReadAsync });
        }
        const disconnectError = err.code === "EBADF" || // Bad file number means we got closed
        err.code === "ENXIO" || // No such device or address probably usb disconnect
        err.code === "UNKNOWN" || err.errno === -1;
        if (disconnectError) {
          err.disconnect = true;
          logger("disconnecting", err);
        }
        throw err;
      }
    };
    exports2.unixRead = unixRead;
  }
});

// node_modules/@serialport/bindings-cpp/dist/unix-write.js
var require_unix_write = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/unix-write.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unixWrite = void 0;
    var fs_1 = require("fs");
    var debug_1 = __importDefault2(require_src());
    var util_1 = require("util");
    var logger = (0, debug_1.default)("serialport/bindings-cpp/unixWrite");
    var writeAsync = (0, util_1.promisify)(fs_1.write);
    var writable = (binding) => {
      return new Promise((resolve, reject) => {
        binding.poller.once("writable", (err) => err ? reject(err) : resolve());
      });
    };
    var unixWrite = async ({ binding, buffer, offset = 0, fsWriteAsync = writeAsync }) => {
      const bytesToWrite = buffer.length - offset;
      logger("Starting write", buffer.length, "bytes offset", offset, "bytesToWrite", bytesToWrite);
      if (!binding.isOpen || !binding.fd) {
        throw new Error("Port is not open");
      }
      try {
        const { bytesWritten } = await fsWriteAsync(binding.fd, buffer, offset, bytesToWrite);
        logger("write returned: wrote", bytesWritten, "bytes");
        if (bytesWritten + offset < buffer.length) {
          if (!binding.isOpen) {
            throw new Error("Port is not open");
          }
          return (0, exports2.unixWrite)({ binding, buffer, offset: bytesWritten + offset, fsWriteAsync });
        }
        logger("Finished writing", bytesWritten + offset, "bytes");
      } catch (err) {
        logger("write errored", err);
        if (err.code === "EAGAIN" || err.code === "EWOULDBLOCK" || err.code === "EINTR") {
          if (!binding.isOpen) {
            throw new Error("Port is not open");
          }
          logger("waiting for writable because of code:", err.code);
          await writable(binding);
          return (0, exports2.unixWrite)({ binding, buffer, offset, fsWriteAsync });
        }
        const disconnectError = err.code === "EBADF" || // Bad file number means we got closed
        err.code === "ENXIO" || // No such device or address probably usb disconnect
        err.code === "UNKNOWN" || err.errno === -1;
        if (disconnectError) {
          err.disconnect = true;
          logger("disconnecting", err);
        }
        logger("error", err);
        throw err;
      }
    };
    exports2.unixWrite = unixWrite;
  }
});

// node_modules/@serialport/bindings-cpp/dist/darwin.js
var require_darwin = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/darwin.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DarwinPortBinding = exports2.DarwinBinding = void 0;
    var debug_1 = __importDefault2(require_src());
    var load_bindings_1 = require_load_bindings();
    var poller_1 = require_poller();
    var unix_read_1 = require_unix_read();
    var unix_write_1 = require_unix_write();
    var debug = (0, debug_1.default)("serialport/bindings-cpp");
    exports2.DarwinBinding = {
      list() {
        debug("list");
        return (0, load_bindings_1.asyncList)();
      },
      async open(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        if (!options.path) {
          throw new TypeError('"path" is not a valid port');
        }
        if (!options.baudRate) {
          throw new TypeError('"baudRate" is not a valid baudRate');
        }
        debug("open");
        const openOptions = Object.assign({ vmin: 1, vtime: 0, dataBits: 8, lock: true, stopBits: 1, parity: "none", rtscts: false, xon: false, xoff: false, xany: false, hupcl: true }, options);
        const fd = await (0, load_bindings_1.asyncOpen)(openOptions.path, openOptions);
        return new DarwinPortBinding(fd, openOptions);
      }
    };
    var DarwinPortBinding = class {
      constructor(fd, options) {
        this.fd = fd;
        this.openOptions = options;
        this.poller = new poller_1.Poller(fd);
        this.writeOperation = null;
      }
      get isOpen() {
        return this.fd !== null;
      }
      async close() {
        debug("close");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        const fd = this.fd;
        this.poller.stop();
        this.poller.destroy();
        this.fd = null;
        await (0, load_bindings_1.asyncClose)(fd);
      }
      async read(buffer, offset, length) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        if (typeof offset !== "number" || isNaN(offset)) {
          throw new TypeError(`"offset" is not an integer got "${isNaN(offset) ? "NaN" : typeof offset}"`);
        }
        if (typeof length !== "number" || isNaN(length)) {
          throw new TypeError(`"length" is not an integer got "${isNaN(length) ? "NaN" : typeof length}"`);
        }
        debug("read");
        if (buffer.length < offset + length) {
          throw new Error("buffer is too small");
        }
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, unix_read_1.unixRead)({ binding: this, buffer, offset, length });
      }
      async write(buffer) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        debug("write", buffer.length, "bytes");
        if (!this.isOpen) {
          debug("write", "error port is not open");
          throw new Error("Port is not open");
        }
        this.writeOperation = (async () => {
          if (buffer.length === 0) {
            return;
          }
          await (0, unix_write_1.unixWrite)({ binding: this, buffer });
          this.writeOperation = null;
        })();
        return this.writeOperation;
      }
      async update(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw TypeError('"options" is not an object');
        }
        if (typeof options.baudRate !== "number") {
          throw new TypeError('"options.baudRate" is not a number');
        }
        debug("update");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncUpdate)(this.fd, options);
      }
      async set(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        debug("set", options);
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncSet)(this.fd, options);
      }
      async get() {
        debug("get");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, load_bindings_1.asyncGet)(this.fd);
      }
      async getBaudRate() {
        debug("getBaudRate");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        throw new Error("getBaudRate is not implemented on darwin");
      }
      async flush() {
        debug("flush");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncFlush)(this.fd);
      }
      async drain() {
        debug("drain");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await this.writeOperation;
        await (0, load_bindings_1.asyncDrain)(this.fd);
      }
    };
    exports2.DarwinPortBinding = DarwinPortBinding;
  }
});

// node_modules/@serialport/bindings-cpp/node_modules/@serialport/parser-delimiter/dist/index.js
var require_dist15 = __commonJS({
  "node_modules/@serialport/bindings-cpp/node_modules/@serialport/parser-delimiter/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DelimiterParser = void 0;
    var stream_1 = require("stream");
    var DelimiterParser = class extends stream_1.Transform {
      constructor({ delimiter, includeDelimiter = false, ...options }) {
        super(options);
        if (delimiter === void 0) {
          throw new TypeError('"delimiter" is not a bufferable object');
        }
        if (delimiter.length === 0) {
          throw new TypeError('"delimiter" has a 0 or undefined length');
        }
        this.includeDelimiter = includeDelimiter;
        this.delimiter = Buffer.from(delimiter);
        this.buffer = Buffer.alloc(0);
      }
      _transform(chunk, encoding, cb) {
        let data = Buffer.concat([this.buffer, chunk]);
        let position;
        while ((position = data.indexOf(this.delimiter)) !== -1) {
          this.push(data.slice(0, position + (this.includeDelimiter ? this.delimiter.length : 0)));
          data = data.slice(position + this.delimiter.length);
        }
        this.buffer = data;
        cb();
      }
      _flush(cb) {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        cb();
      }
    };
    exports2.DelimiterParser = DelimiterParser;
  }
});

// node_modules/@serialport/bindings-cpp/node_modules/@serialport/parser-readline/dist/index.js
var require_dist16 = __commonJS({
  "node_modules/@serialport/bindings-cpp/node_modules/@serialport/parser-readline/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadlineParser = void 0;
    var parser_delimiter_1 = require_dist15();
    var ReadlineParser = class extends parser_delimiter_1.DelimiterParser {
      constructor(options) {
        const opts = {
          delimiter: Buffer.from("\n", "utf8"),
          encoding: "utf8",
          ...options
        };
        if (typeof opts.delimiter === "string") {
          opts.delimiter = Buffer.from(opts.delimiter, opts.encoding);
        }
        super(opts);
      }
    };
    exports2.ReadlineParser = ReadlineParser;
  }
});

// node_modules/@serialport/bindings-cpp/dist/linux-list.js
var require_linux_list = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/linux-list.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.linuxList = void 0;
    var child_process_1 = require("child_process");
    var parser_readline_1 = require_dist16();
    function checkPathOfDevice(path) {
      return /(tty(S|WCH|ACM|USB|AMA|MFD|O|XRUSB)|rfcomm)/.test(path) && path;
    }
    function propName(name) {
      return {
        DEVNAME: "path",
        ID_VENDOR_ENC: "manufacturer",
        ID_SERIAL_SHORT: "serialNumber",
        ID_VENDOR_ID: "vendorId",
        ID_MODEL_ID: "productId",
        DEVLINKS: "pnpId",
        /**
        * Workaround for systemd defect
        * see https://github.com/serialport/bindings-cpp/issues/115
        */
        ID_USB_VENDOR_ENC: "manufacturer",
        ID_USB_SERIAL_SHORT: "serialNumber",
        ID_USB_VENDOR_ID: "vendorId",
        ID_USB_MODEL_ID: "productId"
        // End of workaround
      }[name.toUpperCase()];
    }
    function decodeHexEscape(str) {
      return str.replace(/\\x([a-fA-F0-9]{2})/g, (a, b) => {
        return String.fromCharCode(parseInt(b, 16));
      });
    }
    function propVal(name, val) {
      if (name === "pnpId") {
        const match = val.match(/\/by-id\/([^\s]+)/);
        return (match === null || match === void 0 ? void 0 : match[1]) || void 0;
      }
      if (name === "manufacturer") {
        return decodeHexEscape(val);
      }
      if (/^0x/.test(val)) {
        return val.substr(2);
      }
      return val;
    }
    function linuxList(spawnCmd = child_process_1.spawn) {
      const ports = [];
      const udevadm = spawnCmd("udevadm", ["info", "-e"]);
      const lines = udevadm.stdout.pipe(new parser_readline_1.ReadlineParser());
      let skipPort = false;
      let port = {
        path: "",
        manufacturer: void 0,
        serialNumber: void 0,
        pnpId: void 0,
        locationId: void 0,
        vendorId: void 0,
        productId: void 0
      };
      lines.on("data", (line) => {
        const lineType = line.slice(0, 1);
        const data = line.slice(3);
        if (lineType === "P") {
          port = {
            path: "",
            manufacturer: void 0,
            serialNumber: void 0,
            pnpId: void 0,
            locationId: void 0,
            vendorId: void 0,
            productId: void 0
          };
          skipPort = false;
          return;
        }
        if (skipPort) {
          return;
        }
        if (lineType === "N") {
          if (checkPathOfDevice(data)) {
            ports.push(port);
          } else {
            skipPort = true;
          }
          return;
        }
        if (lineType === "E") {
          const keyValue = data.match(/^(.+)=(.*)/);
          if (!keyValue) {
            return;
          }
          const key = propName(keyValue[1]);
          if (!key) {
            return;
          }
          port[key] = propVal(key, keyValue[2]);
        }
      });
      return new Promise((resolve, reject) => {
        udevadm.on("close", (code) => {
          if (code) {
            reject(new Error(`Error listing ports udevadm exited with error code: ${code}`));
          }
        });
        udevadm.on("error", reject);
        lines.on("error", reject);
        lines.on("finish", () => resolve(ports));
      });
    }
    exports2.linuxList = linuxList;
  }
});

// node_modules/@serialport/bindings-cpp/dist/linux.js
var require_linux = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/linux.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LinuxPortBinding = exports2.LinuxBinding = void 0;
    var debug_1 = __importDefault2(require_src());
    var linux_list_1 = require_linux_list();
    var poller_1 = require_poller();
    var unix_read_1 = require_unix_read();
    var unix_write_1 = require_unix_write();
    var load_bindings_1 = require_load_bindings();
    var debug = (0, debug_1.default)("serialport/bindings-cpp");
    exports2.LinuxBinding = {
      list() {
        debug("list");
        return (0, linux_list_1.linuxList)();
      },
      async open(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        if (!options.path) {
          throw new TypeError('"path" is not a valid port');
        }
        if (!options.baudRate) {
          throw new TypeError('"baudRate" is not a valid baudRate');
        }
        debug("open");
        const openOptions = Object.assign({ vmin: 1, vtime: 0, dataBits: 8, lock: true, stopBits: 1, parity: "none", rtscts: false, xon: false, xoff: false, xany: false, hupcl: true }, options);
        const fd = await (0, load_bindings_1.asyncOpen)(openOptions.path, openOptions);
        this.fd = fd;
        return new LinuxPortBinding(fd, openOptions);
      }
    };
    var LinuxPortBinding = class {
      constructor(fd, openOptions) {
        this.fd = fd;
        this.openOptions = openOptions;
        this.poller = new poller_1.Poller(fd);
        this.writeOperation = null;
      }
      get isOpen() {
        return this.fd !== null;
      }
      async close() {
        debug("close");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        const fd = this.fd;
        this.poller.stop();
        this.poller.destroy();
        this.fd = null;
        await (0, load_bindings_1.asyncClose)(fd);
      }
      async read(buffer, offset, length) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        if (typeof offset !== "number" || isNaN(offset)) {
          throw new TypeError(`"offset" is not an integer got "${isNaN(offset) ? "NaN" : typeof offset}"`);
        }
        if (typeof length !== "number" || isNaN(length)) {
          throw new TypeError(`"length" is not an integer got "${isNaN(length) ? "NaN" : typeof length}"`);
        }
        debug("read");
        if (buffer.length < offset + length) {
          throw new Error("buffer is too small");
        }
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, unix_read_1.unixRead)({ binding: this, buffer, offset, length });
      }
      async write(buffer) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        debug("write", buffer.length, "bytes");
        if (!this.isOpen) {
          debug("write", "error port is not open");
          throw new Error("Port is not open");
        }
        this.writeOperation = (async () => {
          if (buffer.length === 0) {
            return;
          }
          await (0, unix_write_1.unixWrite)({ binding: this, buffer });
          this.writeOperation = null;
        })();
        return this.writeOperation;
      }
      async update(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw TypeError('"options" is not an object');
        }
        if (typeof options.baudRate !== "number") {
          throw new TypeError('"options.baudRate" is not a number');
        }
        debug("update");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncUpdate)(this.fd, options);
      }
      async set(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        debug("set");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncSet)(this.fd, options);
      }
      async get() {
        debug("get");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, load_bindings_1.asyncGet)(this.fd);
      }
      async getBaudRate() {
        debug("getBaudRate");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, load_bindings_1.asyncGetBaudRate)(this.fd);
      }
      async flush() {
        debug("flush");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncFlush)(this.fd);
      }
      async drain() {
        debug("drain");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await this.writeOperation;
        await (0, load_bindings_1.asyncDrain)(this.fd);
      }
    };
    exports2.LinuxPortBinding = LinuxPortBinding;
  }
});

// node_modules/@serialport/bindings-cpp/dist/win32-sn-parser.js
var require_win32_sn_parser = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/win32-sn-parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serialNumParser = void 0;
    var PARSERS = [/USB\\(?:.+)\\(.+)/, /FTDIBUS\\(?:.+)\+(.+?)A?\\.+/];
    var serialNumParser = (pnpId) => {
      if (!pnpId) {
        return null;
      }
      for (const parser of PARSERS) {
        const sn = pnpId.match(parser);
        if (sn) {
          return sn[1];
        }
      }
      return null;
    };
    exports2.serialNumParser = serialNumParser;
  }
});

// node_modules/@serialport/bindings-cpp/dist/win32.js
var require_win32 = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/win32.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WindowsPortBinding = exports2.WindowsBinding = void 0;
    var debug_1 = __importDefault2(require_src());
    var _1 = require_dist18();
    var load_bindings_1 = require_load_bindings();
    var win32_sn_parser_1 = require_win32_sn_parser();
    var debug = (0, debug_1.default)("serialport/bindings-cpp");
    exports2.WindowsBinding = {
      async list() {
        const ports = await (0, load_bindings_1.asyncList)();
        return ports.map((port) => {
          if (port.pnpId && !port.serialNumber) {
            const serialNumber = (0, win32_sn_parser_1.serialNumParser)(port.pnpId);
            if (serialNumber) {
              return Object.assign(Object.assign({}, port), { serialNumber });
            }
          }
          return port;
        });
      },
      async open(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        if (!options.path) {
          throw new TypeError('"path" is not a valid port');
        }
        if (!options.baudRate) {
          throw new TypeError('"baudRate" is not a valid baudRate');
        }
        debug("open");
        const openOptions = Object.assign({ dataBits: 8, lock: true, stopBits: 1, parity: "none", rtscts: false, rtsMode: "handshake", xon: false, xoff: false, xany: false, hupcl: true }, options);
        const fd = await (0, load_bindings_1.asyncOpen)(openOptions.path, openOptions);
        return new WindowsPortBinding(fd, openOptions);
      }
    };
    var WindowsPortBinding = class {
      constructor(fd, options) {
        this.fd = fd;
        this.openOptions = options;
        this.writeOperation = null;
      }
      get isOpen() {
        return this.fd !== null;
      }
      async close() {
        debug("close");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        const fd = this.fd;
        this.fd = null;
        await (0, load_bindings_1.asyncClose)(fd);
      }
      async read(buffer, offset, length) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        if (typeof offset !== "number" || isNaN(offset)) {
          throw new TypeError(`"offset" is not an integer got "${isNaN(offset) ? "NaN" : typeof offset}"`);
        }
        if (typeof length !== "number" || isNaN(length)) {
          throw new TypeError(`"length" is not an integer got "${isNaN(length) ? "NaN" : typeof length}"`);
        }
        debug("read");
        if (buffer.length < offset + length) {
          throw new Error("buffer is too small");
        }
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        try {
          const bytesRead = await (0, load_bindings_1.asyncRead)(this.fd, buffer, offset, length);
          return { bytesRead, buffer };
        } catch (err) {
          if (!this.isOpen) {
            throw new _1.BindingsError(err.message, { canceled: true });
          }
          throw err;
        }
      }
      async write(buffer) {
        if (!Buffer.isBuffer(buffer)) {
          throw new TypeError('"buffer" is not a Buffer');
        }
        debug("write", buffer.length, "bytes");
        if (!this.isOpen) {
          debug("write", "error port is not open");
          throw new Error("Port is not open");
        }
        this.writeOperation = (async () => {
          if (buffer.length === 0) {
            return;
          }
          await (0, load_bindings_1.asyncWrite)(this.fd, buffer);
          this.writeOperation = null;
        })();
        return this.writeOperation;
      }
      async update(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw TypeError('"options" is not an object');
        }
        if (typeof options.baudRate !== "number") {
          throw new TypeError('"options.baudRate" is not a number');
        }
        debug("update");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncUpdate)(this.fd, options);
      }
      async set(options) {
        if (!options || typeof options !== "object" || Array.isArray(options)) {
          throw new TypeError('"options" is not an object');
        }
        debug("set", options);
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncSet)(this.fd, options);
      }
      async get() {
        debug("get");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, load_bindings_1.asyncGet)(this.fd);
      }
      async getBaudRate() {
        debug("getBaudRate");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        return (0, load_bindings_1.asyncGetBaudRate)(this.fd);
      }
      async flush() {
        debug("flush");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await (0, load_bindings_1.asyncFlush)(this.fd);
      }
      async drain() {
        debug("drain");
        if (!this.isOpen) {
          throw new Error("Port is not open");
        }
        await this.writeOperation;
        await (0, load_bindings_1.asyncDrain)(this.fd);
      }
    };
    exports2.WindowsPortBinding = WindowsPortBinding;
  }
});

// node_modules/@serialport/bindings-interface/dist/index.js
var require_dist17 = __commonJS({
  "node_modules/@serialport/bindings-interface/dist/index.js"() {
    "use strict";
  }
});

// node_modules/@serialport/bindings-cpp/dist/index.js
var require_dist18 = __commonJS({
  "node_modules/@serialport/bindings-cpp/dist/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.autoDetect = void 0;
    var debug_1 = __importDefault2(require_src());
    var darwin_1 = require_darwin();
    var linux_1 = require_linux();
    var win32_1 = require_win32();
    var debug = (0, debug_1.default)("serialport/bindings-cpp");
    __exportStar2(require_dist17(), exports2);
    __exportStar2(require_darwin(), exports2);
    __exportStar2(require_linux(), exports2);
    __exportStar2(require_win32(), exports2);
    __exportStar2(require_errors(), exports2);
    function autoDetect() {
      switch (process.platform) {
        case "win32":
          debug("loading WindowsBinding");
          return win32_1.WindowsBinding;
        case "darwin":
          debug("loading DarwinBinding");
          return darwin_1.DarwinBinding;
        default:
          debug("loading LinuxBinding");
          return linux_1.LinuxBinding;
      }
    }
    exports2.autoDetect = autoDetect;
  }
});

// node_modules/serialport/dist/serialport.js
var require_serialport = __commonJS({
  "node_modules/serialport/dist/serialport.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SerialPort = void 0;
    var stream_1 = require_dist13();
    var bindings_cpp_1 = require_dist18();
    var DetectedBinding = (0, bindings_cpp_1.autoDetect)();
    var SerialPort = class extends stream_1.SerialPortStream {
      static list = DetectedBinding.list;
      static binding = DetectedBinding;
      constructor(options, openCallback) {
        const opts = {
          binding: DetectedBinding,
          ...options
        };
        super(opts, openCallback);
      }
    };
    exports2.SerialPort = SerialPort;
  }
});

// node_modules/serialport/dist/index.js
var require_dist19 = __commonJS({
  "node_modules/serialport/dist/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar2(require_dist3(), exports2);
    __exportStar2(require_dist4(), exports2);
    __exportStar2(require_dist5(), exports2);
    __exportStar2(require_dist6(), exports2);
    __exportStar2(require_dist7(), exports2);
    __exportStar2(require_dist8(), exports2);
    __exportStar2(require_dist9(), exports2);
    __exportStar2(require_dist10(), exports2);
    __exportStar2(require_dist11(), exports2);
    __exportStar2(require_dist12(), exports2);
    __exportStar2(require_serialport_mock(), exports2);
    __exportStar2(require_serialport(), exports2);
  }
});

// node_modules/osc/src/platforms/osc-node-serialport.js
var require_osc_node_serialport = __commonJS({
  "node_modules/osc/src/platforms/osc-node-serialport.js"() {
    var osc = osc || require_osc2();
    var SerialPort = require_dist19().SerialPort;
    osc.supportsSerial = true;
    osc.SerialPort = function(options) {
      this.on("open", this.listen.bind(this));
      osc.SLIPPort.call(this, options);
      this.options.bitrate = this.options.bitrate || 9600;
      this.serialPort = options.serialPort;
      if (this.serialPort) {
        this.emit("open", this.serialPort);
      }
    };
    var p = osc.SerialPort.prototype = Object.create(osc.SLIPPort.prototype);
    p.constructor = osc.SerialPort;
    p.open = function() {
      if (this.serialPort) {
        this.once("close", this.open.bind(this));
        this.close();
        return;
      }
      var that = this;
      this.serialPort = new SerialPort({
        path: this.options.devicePath,
        baudRate: this.options.bitrate,
        autoOpen: false
      });
      this.serialPort.on("error", function(err) {
        that.emit("error", err);
      });
      this.serialPort.on("open", function() {
        that.emit("open", that.serialPort);
      });
      this.serialPort.open();
    };
    p.listen = function() {
      var that = this;
      this.serialPort.on("data", function(data) {
        that.emit("data", data, void 0);
      });
      this.serialPort.on("close", function() {
        that.emit("close");
      });
      that.emit("ready");
    };
    p.sendRaw = function(encoded) {
      if (!this.serialPort || !this.serialPort.isOpen) {
        osc.fireClosedPortSendError(this);
        return;
      }
      var that = this;
      this.serialPort.write(encoded);
    };
    p.close = function() {
      if (this.serialPort) {
        this.serialPort.close();
      }
    };
  }
});

// node_modules/osc/src/platforms/osc-node-serialport-loader.js
var require_osc_node_serialport_loader = __commonJS({
  "node_modules/osc/src/platforms/osc-node-serialport-loader.js"() {
    var osc = osc || require_osc2();
    try {
      SerialPort = require_dist19();
      require_osc_node_serialport();
    } catch (err) {
      osc.SerialPort = function() {
        throw new Error("The Node.js SerialPort library is not installed. osc.js' serial transport is unavailable.");
      };
    }
    var SerialPort;
  }
});

// node_modules/osc/src/platforms/osc-node.js
var require_osc_node = __commonJS({
  "node_modules/osc/src/platforms/osc-node.js"(exports2, module2) {
    (function() {
      "use strict";
      var shallowMerge = function(target, toMerge) {
        target = target || {};
        if (toMerge.forEach === void 0) {
          toMerge = [toMerge];
        }
        toMerge.forEach(function(obj) {
          for (var prop in obj) {
            target[prop] = obj[prop];
          }
        });
        return target;
      };
      var dgram = require("dgram"), net = require("net"), WebSocket2 = require_ws(), modules = [
        require_osc2(),
        require_osc_transports(),
        require_osc_websocket_client(),
        require_osc_node_serialport_loader()
      ], osc = shallowMerge({}, modules);
      osc.UDPPort = function(options) {
        osc.Port.call(this, options);
        this.options.localAddress = this.options.localAddress || "127.0.0.1";
        this.options.localPort = this.options.localPort !== void 0 ? this.options.localPort : 57121;
        this.options.remoteAddress = this.options.remoteAddress || "127.0.0.1";
        this.options.remotePort = this.options.remotePort !== void 0 ? this.options.remotePort : 57121;
        this.on("open", this.listen.bind(this));
        this.socket = options.socket;
        if (this.socket) {
          this.emit("open", this.socket);
        }
      };
      var p = osc.UDPPort.prototype = Object.create(osc.Port.prototype);
      p.constructor = osc.UDPPort;
      p.open = function() {
        var that = this;
        if (this.socket) {
          return;
        }
        this.socket = dgram.createSocket("udp4");
        this.socket.on("error", function(error) {
          that.emit("error", error);
        });
        function onBound() {
          osc.UDPPort.setupMulticast(that);
          if (that.options.broadcast) {
            that.socket.setBroadcast(that.options.broadcast);
          }
          that.emit("open", that.socket);
        }
        this.socket.bind(this.options.localPort, this.options.localAddress, onBound);
      };
      p.listen = function() {
        if (!this.socket) {
          return;
        }
        var that = this;
        this.socket.on("message", function(msg, rinfo) {
          that.emit("data", msg, rinfo);
        });
        this.socket.on("close", function() {
          that.emit("close");
        });
        that.emit("ready");
      };
      p.sendRaw = function(encoded, address, port) {
        if (!this.socket) {
          osc.fireClosedPortSendError(this);
          return;
        }
        var length = encoded.byteLength !== void 0 ? encoded.byteLength : encoded.length, that = this;
        address = address || this.options.remoteAddress;
        port = port !== void 0 ? port : this.options.remotePort;
        this.socket.send(encoded, 0, length, port, address, function(err) {
          if (err) {
            that.emit("error", err);
          }
        });
      };
      p.close = function() {
        if (this.socket) {
          this.socket.close();
        }
      };
      osc.UDPPort.setupMulticast = function(that) {
        if (that.options.multicastTTL !== void 0) {
          that.socket.setMulticastTTL(that.options.multicastTTL);
        }
        if (that.options.multicastMembership) {
          if (typeof that.options.multicastMembership === "string") {
            that.options.multicastMembership = [that.options.multicastMembership];
          }
          that.options.multicastMembership.forEach(function(addr) {
            if (typeof addr === "string") {
              that.socket.addMembership(addr);
            } else {
              that.socket.addMembership(addr.address, addr.interface);
            }
          });
        }
      };
      osc.TCPSocketPort = function(options) {
        osc.SLIPPort.call(this, options);
        var o = this.options;
        o.address = o.address || o.localAddress || "127.0.0.1";
        o.port = o.port !== void 0 ? o.port : o.localPort !== void 0 ? o.localPort : 57121;
        this.on("open", this.listen.bind(this));
        this.socket = options.socket;
        if (this.socket) {
          this.emit("open", this.socket);
        }
      };
      p = osc.TCPSocketPort.prototype = Object.create(osc.SLIPPort.prototype);
      p.constructor = osc.TCPSocketPort;
      p.open = function(address, port) {
        var o = this.options;
        address = address || o.address;
        port = port !== void 0 ? port : o.port;
        if (!this.socket) {
          this.socket = net.connect({
            port,
            host: address
          });
        } else {
          this.socket.connect(port, address);
        }
        this.emit("open", this.socket);
      };
      p.listen = function() {
        var that = this;
        this.socket.on("data", function(msg) {
          that.emit("data", msg, void 0);
        });
        this.socket.on("error", function(err) {
          that.emit("error", err);
        });
        this.socket.on("close", function(hadError) {
          that.emit("close", hadError);
        });
        this.socket.on("connect", function() {
          that.emit("ready");
        });
      };
      p.sendRaw = function(encoded) {
        if (!this.socket) {
          return;
        }
        encoded = Buffer.from(encoded);
        try {
          this.socket.write(encoded);
        } catch (err) {
          this.emit("error", err);
        }
      };
      p.close = function() {
        this.socket.end();
      };
      module2.exports = osc;
    })();
  }
});

// src/data-handler.js
var require_data_handler = __commonJS({
  "src/data-handler.js"(exports2, module2) {
    var osc = require_osc_node();
    function calcPacketLength(buffer) {
      try {
        const packet = osc.readPacket(buffer, {});
        return osc.writePacket(packet).length;
      } catch {
        return buffer.length + 1;
      }
    }
    async function parsePackets(root, buffer) {
      const packets = [];
      while (buffer.length > 0) {
        const len = calcPacketLength(buffer);
        if (len > buffer.length)
          break;
        const chunk = buffer.slice(0, len);
        buffer = buffer.slice(len);
        try {
          const packet = osc.readPacket(chunk, { metadata: true });
          packets.push(packet);
        } catch (err) {
          root.log("error", `Error parsing OSC message: ${err.message}. Data: ${chunk}`);
        }
      }
      return { remainingBuffer: buffer, packets };
    }
    async function onDataHandler(root, data) {
      try {
        let buffer = Buffer.alloc(0);
        buffer = Buffer.concat([buffer, data]);
        root.log("trace", `Buffer length: ${buffer.length}`);
        const { remainingBuffer, packets } = await parsePackets(root, buffer);
        buffer = remainingBuffer;
        root.log("debug", `Raw: ${JSON.stringify(data)}`);
        for (const packet of packets) {
          if (packet.address) {
            if (!packet.args || packet.args.length === 0) {
              root.onDataReceived[packet.address] = [{ type: "i", value: null }];
              root.log("debug", `OSC message: ${packet.address}, args: Null`);
              await root.checkFeedbacks();
              root.setVariableValues({
                latest_received_raw: `${packet.address}`,
                latest_received_path: packet.address,
                latest_received_args: void 0,
                latest_received_timestamp: Date.now()
              });
              continue;
            }
            const argsStr = packet.args.map((a) => a.value).join(" ");
            root.log("debug", `OSC message: ${packet.address}, args: ${JSON.stringify(packet.args)}`);
            let arenaHandled = false;
            if (typeof root.handleArenaIncoming === "function") {
              arenaHandled = root.handleArenaIncoming(packet.address, packet.args);
            } else {
              root.onDataReceived[packet.address] = packet.args;
            }
            if (!arenaHandled)
              await root.checkFeedbacks();
            root.setVariableValues({
              latest_received_raw: `${packet.address} ${argsStr}`,
              latest_received_path: packet.address,
              latest_received_args: packet.args.length ? packet.args.map((a) => a.value) : void 0,
              latest_received_timestamp: Date.now()
            });
          } else if (packet.packets) {
            for (const bundlePacket of packet.packets) {
              if (bundlePacket.address) {
                root.log("debug", `Bundle element message: ${bundlePacket.address}, args: ${JSON.stringify(bundlePacket.args)}`);
                let bundleArenaHandled = false;
                if (typeof root.handleArenaIncoming === "function") {
                  bundleArenaHandled = root.handleArenaIncoming(bundlePacket.address, bundlePacket.args);
                } else {
                  root.onDataReceived[bundlePacket.address] = bundlePacket.args;
                }
                if (!bundleArenaHandled)
                  await root.checkFeedbacks();
                root.setVariableValues({
                  latest_received_raw: `${bundlePacket.address} ${bundlePacket.args}`,
                  latest_received_path: bundlePacket.address,
                  latest_received_args: bundlePacket.args.length ? bundlePacket.args.map((a) => a.value) : void 0,
                  latest_received_timestamp: Date.now()
                });
              }
            }
          }
        }
        root.log("trace", `Remaining buffer length: ${buffer.length}`);
      } catch (err) {
        root.log("error", `Error handling incoming data: ${err.message}`);
      }
    }
    module2.exports = { onDataHandler };
  }
});

// src/tcp-connection.js
var require_tcp_connection = __commonJS({
  "src/tcp-connection.js"(exports2, module2) {
    var osc = require_osc_node();
    var { onDataHandler } = require_data_handler();
    var TcpConnection = class {
      constructor(root, host, port, listen) {
        this.root = root;
        this.host = host;
        this.port = port;
        this.listen = listen;
        this.tcpPort = null;
        this.connected = false;
      }
      openConnection() {
        if (!this.connected) {
          return new Promise((resolve, reject) => {
            this.root.updateStatus("connecting");
            this.tcpPort = new osc.TCPSocketPort({
              address: this.host,
              port: this.port
            });
            this.tcpPort.on("error", (err) => {
              const msg = `Error with TCP port: ${err.message}`;
              this.tcpPort.close();
              this.connected = false;
              this.root.updateStatus("connection_failure");
              reject(new Error(msg));
            });
            this.tcpPort.on("ready", () => {
              this.root.log("info", `Connected to OSC Server ${this.host}:${this.port}`);
              this.connected = true;
              this.root.updateStatus("ok");
              resolve();
            });
            this.tcpPort.on("data", async (data) => {
              if (this.listen) {
                onDataHandler(this.root, data);
              }
            });
            this.tcpPort.on("close", () => {
              this.root.log("info", "Disconnected from OSC server");
              this.connected = false;
            });
            this.tcpPort.open();
          });
        }
        this.root.log("info", "TCP connection is already open");
      }
      closeConnection() {
        if (this.tcpPort && this.connected) {
          return new Promise((resolve, reject) => {
            this.tcpPort.close();
            this.connected = false;
            if (this.listen)
              this.root.updateStatus("disconnected");
            this.root.log("info", "TCP connection closed manually");
            resolve();
          });
        }
        this.root.log("debug", "No TCP connection to close");
      }
      async sendCommand(path, args) {
        if (!this.connected) {
          this.root.log("info", "No open TCP connection. Opening connection now...");
          await this.openConnection();
        }
        return new Promise((resolve, reject) => {
          try {
            this.tcpPort.send({ address: path, args }, this.host, this.port);
            const argsStr = args.map((a) => a.value).join(" ");
            this.root.setVariableValues({
              latest_sent_raw: `${path} ${argsStr}`,
              latest_sent_path: path,
              latest_sent_args: args.length ? args.map((a) => a.value) : void 0,
              latest_sent_timestamp: Date.now()
            });
            this.root.log("debug", `Sent command: ${path} with args: ${JSON.stringify(args)}`);
            resolve();
          } catch (err) {
            this.root.log("warn", `Error sending OSC message: ${err.message}`);
            reject(new Error(err.message));
          }
        });
      }
      isConnected() {
        return this.connected;
      }
    };
    module2.exports = TcpConnection;
  }
});

// src/utils.js
var require_utils2 = __commonJS({
  "src/utils.js"(exports2, module2) {
    var dns = require("dns");
    function isValidIPAddress2(str) {
      const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (ipv4.test(str)) {
        return str.split(".").every((n) => parseInt(n) <= 255);
      }
      const ipv6 = /^[\da-fA-F:]+$/;
      return ipv6.test(str) && str.includes(":");
    }
    async function resolveHostname2(root, hostname) {
      return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
          if (err) {
            reject(new Error(`DNS lookup failed for ${hostname}: ${err.message}`));
          } else {
            root.log("debug", `Resolved ${hostname} to ${address}`);
            resolve(address);
          }
        });
      });
    }
    function parseArguments2(str) {
      if (!str || str.trim() === "")
        return { args: [], error: null };
      str = str.replaceAll(/[\u201C\u201D\u201E\u201F]/g, '"');
      const regex = /(-?\d+(?:\.\d+)?)|true|false|"((?:[^"\\]|\\.)+)"|'((?:[^'\\]|\\.)+)'|\S+/g;
      const args = [];
      let match;
      while ((match = regex.exec(str)) !== null) {
        if (match[1] !== void 0) {
          if (match[1].includes(".")) {
            args.push({ type: "f", value: parseFloat(match[1]) });
          } else {
            args.push({ type: "i", value: parseInt(match[1]) });
          }
        } else if (match[2] !== void 0) {
          args.push({ type: "s", value: match[2].replace(/\\"/g, '"') });
        } else if (match[3] !== void 0) {
          args.push({ type: "s", value: match[3].replace(/\\'/g, "'") });
        } else if (match[0] === "true") {
          args.push({ type: "T" });
        } else if (match[0] === "false") {
          args.push({ type: "F" });
        } else {
          args.push({ type: "s", value: match[0] });
        }
      }
      return { args, error: null };
    }
    function evaluateComparison2(actual, expected, comparison) {
      switch (comparison) {
        case "equal":
          return actual == expected;
        case "notequal":
          return actual != expected;
        case "greaterthan":
          return actual > expected;
        case "lessthan":
          return actual < expected;
        case "greaterthanequal":
          return actual >= expected;
        case "lessthanequal":
          return actual <= expected;
        default:
          return false;
      }
    }
    function setupOSC2(root) {
      const osc = require_osc_node();
      const TcpConnection = require_tcp_connection();
      const { onDataHandler } = require_data_handler();
      const config = root.config;
      if (root.client && root.client.isConnected && root.client.isConnected()) {
        root.client.closeConnection().catch(() => {
        });
      }
      if (config.protocol === "udp") {
        const udpPort = new osc.UDPPort({
          localAddress: "0.0.0.0",
          localPort: config.listen ? parseInt(config.feedbackPort) : 0,
          remoteAddress: root.targetHost,
          remotePort: parseInt(config.targetPort)
        });
        udpPort.on("error", (err) => {
          root.log("error", `UDP error: ${err.message}`);
          root.updateStatus("connection_failure");
        });
        udpPort.on("ready", () => {
          root.log("info", `UDP OSC port ready`);
          root.updateStatus("ok");
        });
        if (config.listen) {
          udpPort.on("message", async (oscMsg, timeTag, info) => {
            const address = oscMsg.address;
            const args = (oscMsg.args || []).map(
              (v) => typeof v === "object" && v !== null && "type" in v ? v : { type: "s", value: v }
            );
            const argsStr = args.map((a) => a.value).join(" ");
            root.log("debug", `UDP OSC: ${address} ${argsStr}`);
            let arenaHandled = false;
            if (typeof root.handleArenaIncoming === "function") {
              arenaHandled = root.handleArenaIncoming(address, args);
            } else {
              root.onDataReceived[address] = args;
            }
            if (!arenaHandled)
              await root.checkFeedbacks();
            root.setVariableValues({
              latest_received_raw: `${address} ${argsStr}`,
              latest_received_path: address,
              latest_received_args: args.length ? args.map((a) => a.value) : void 0,
              latest_received_timestamp: Date.now(),
              latest_received_client: info ? info.address : void 0,
              latest_received_port: info ? info.port : void 0
            });
          });
        }
        udpPort.on("ready", () => {
          if (config.relay_enabled && config.relay_host && config.relay_port) {
            const dgram = require("dgram");
            if (root._relaySocket) {
              try {
                root._relaySocket.close();
              } catch {
              }
              root._relaySocket = null;
            }
            const relaySock = dgram.createSocket("udp4");
            relaySock.bind(0, () => {
              root.log("info", `OSC Relay active \u2192 ${config.relay_host}:${config.relay_port}`);
            });
            relaySock.on("error", (err) => {
              root.log("warn", `Relay socket error: ${err.message}`);
            });
            root._relaySocket = relaySock;
            if (udpPort.socket) {
              udpPort.socket.on("message", (rawBuf) => {
                if (!root._relaySocket)
                  return;
                root._relaySocket.send(
                  rawBuf,
                  0,
                  rawBuf.length,
                  parseInt(config.relay_port),
                  config.relay_host,
                  (err) => {
                    if (err)
                      root.log("debug", `Relay fwd error: ${err.message}`);
                  }
                );
              });
            }
          }
        });
        udpPort.open();
        root.oscSend = (host, port, path, args) => {
          udpPort.send({ address: path, args }, host, port);
        };
        root.udpPort = udpPort;
      } else {
        root.client = new TcpConnection(root, root.targetHost, parseInt(config.targetPort), config.listen);
        if (config.listen) {
          root.client.openConnection().catch((err) => {
            root.log("error", err.message);
          });
        }
      }
    }
    module2.exports = { isValidIPAddress: isValidIPAddress2, resolveHostname: resolveHostname2, parseArguments: parseArguments2, evaluateComparison: evaluateComparison2, setupOSC: setupOSC2 };
  }
});

// src/index.js
var { InstanceBase, Regex, runEntrypoint } = require_dist2();
var { isValidIPAddress, resolveHostname, parseArguments, evaluateComparison, setupOSC } = require_utils2();
var NAME_QUERY_TIMEOUT = 2e3;
var BLINK_INTERVAL = 600;
var QUICK_ASSIGN_TTL = 3e3;
var GENERIC_OSC_CLEANUP_TTL = 3e4;
var ArenaOscInstance = class extends InstanceBase {
  constructor(internal) {
    super(internal);
    this.config = {};
    this.targetHost = null;
    this.client = null;
    this.udpPort = null;
    this.oscSend = null;
    this.onDataReceived = {};
    this._cleanupTimers = {};
    this.arenaSelectedClip = { layer: null, clip: null };
    this.arenaSelectedColumn = { column: null };
    this.arenaLastSelectType = null;
    this.presetSlots = {};
    this.editMode = false;
    this._editBlinkTimer = null;
    this._editBlinkState = false;
    this.deleteMode = false;
    this._deleteBlinkTimer = null;
    this._deleteBlinkState = false;
    this._quickAssignSlots = /* @__PURE__ */ new Set();
    this._quickAssignTimers = {};
    this._pendingNameQueries = {};
    this._lastColumnSelectTime = 0;
    this._relaySocket = null;
    this.arenaBpm = null;
    this.arenaMasterOpacity = null;
    this.arenaLayerState = {};
  }
  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  async init(config) {
    this.config = config;
    this.onDataReceived = {};
    if (this.config._presetSlots && typeof this.config._presetSlots === "object") {
      this.presetSlots = this.config._presetSlots;
    }
    let resolved = false;
    if (this.config.host) {
      if (isValidIPAddress(this.config.host)) {
        this.targetHost = this.config.host;
        resolved = true;
      } else {
        await resolveHostname(this, this.config.host).then((ip) => {
          this.targetHost = ip;
          resolved = true;
        }).catch((err) => {
          this.log("error", `Unable to resolve hostname for ${this.config.host}: ${err.message}`);
          this.updateStatus("bad_config");
        });
      }
    }
    if (this.targetHost && this.config.targetPort) {
      setupOSC(this);
      if (resolved && this.config.listen)
        this.setupListeners();
    }
    if (!this.config.listen)
      this.updateStatus("ok");
    this.updateActions();
    this.updateFeedbacks();
    this.updateVariables();
    this.updatePresets();
  }
  async destroy() {
    this.log("debug", "destroy");
    this._stopEditBlink();
    this._stopDeleteBlink();
    for (const t of Object.values(this._quickAssignTimers))
      clearTimeout(t);
    this._quickAssignTimers = {};
    this._quickAssignSlots.clear();
    for (const t of Object.values(this._cleanupTimers))
      clearTimeout(t);
    this._cleanupTimers = {};
    if (this.udpPort) {
      try {
        this.udpPort.close();
      } catch {
      }
      this.udpPort = null;
    }
    if (this._relaySocket) {
      try {
        this._relaySocket.close();
      } catch {
      }
      this._relaySocket = null;
    }
    if (this.client && this.client.isConnected && this.client.isConnected()) {
      await this.client.closeConnection().catch(() => {
      });
      this.client = null;
    }
  }
  async configUpdated(config) {
    const prevConfig = this.config;
    this.config = config;
    if (this.config._presetSlots && typeof this.config._presetSlots === "object") {
      this.presetSlots = this.config._presetSlots;
    }
    const connectionFields = [
      "host",
      "targetPort",
      "feedbackPort",
      "protocol",
      "listen",
      "relay_enabled",
      "relay_host",
      "relay_port",
      "remote_enabled",
      "remote_prefix"
    ];
    if (!connectionFields.some((k) => prevConfig[k] !== config[k]))
      return;
    if (this.udpPort) {
      try {
        this.udpPort.close();
      } catch {
      }
      this.udpPort = null;
    }
    if (this._relaySocket) {
      try {
        this._relaySocket.close();
      } catch {
      }
      this._relaySocket = null;
    }
    if (this.client && this.client.isConnected && this.client.isConnected()) {
      await this.client.closeConnection().catch((err) => {
        this.log("error", `${this.config.protocol} close error: ${err.message}`);
      });
      this.client = null;
    }
    let resolved = false;
    if (!this.config.host) {
      this.updateStatus("bad_config");
      this.log("warn", "No host");
      return;
    }
    if (!this.config.targetPort) {
      this.updateStatus("bad_config");
      this.log("warn", "No targetPort");
      return;
    }
    if (isValidIPAddress(this.config.host)) {
      this.targetHost = this.config.host;
      resolved = true;
    } else {
      await resolveHostname(this, this.config.host).then((ip) => {
        this.targetHost = ip;
        resolved = true;
      }).catch((err) => {
        this.log("error", `Unable to resolve hostname for ${this.config.host}: ${err.message}`);
        this.updateStatus("bad_config");
      });
    }
    if (resolved) {
      setupOSC(this);
      this.setupListeners();
    }
  }
  async setupListeners() {
    this.log("info", "Resetting Listeners..");
    if (this.config.listen) {
      if (this.config.protocol && this.client && !this.client.isConnected()) {
        await this.client.openConnection().catch((err) => this.log("error", err.message));
      }
    } else {
      this.updateStatus("ok");
    }
  }
  // ---------------------------------------------------------------------------
  // Config fields
  // ---------------------------------------------------------------------------
  getConfigFields() {
    return [
      // ── Main connection ────────────────────────────────────────────────────────
      { type: "textinput", id: "host", label: "Target Hostname or IP", width: 8, regex: Regex.HOSTNAME, required: true },
      { type: "textinput", id: "targetPort", label: "Target Port", width: 4, regex: Regex.PORT, default: "7000", required: true },
      {
        type: "dropdown",
        id: "protocol",
        label: "Protocol",
        width: 4,
        default: "udp",
        required: true,
        choices: [{ id: "udp", label: "UDP (Default)" }, { id: "tcp", label: "TCP" }, { id: "tcp-raw", label: "TCP (Raw)" }]
      },
      { type: "checkbox", id: "listen", label: "Listen for Feedback", width: 4, default: false, required: true },
      {
        type: "textinput",
        id: "feedbackPort",
        label: "Feedback Port",
        width: 4,
        regex: Regex.PORT,
        default: "7001",
        isVisible: (o) => o.listen && o.protocol === "udp",
        isVisibleExpression: "$(options:listen) === true && $(options:protocol) === 'udp'"
      },
      // ── OSC Relay / Passthrough ───────────────────────────────────────────
      {
        type: "static-text",
        id: "relay_header",
        label: "OSC Relay / Passthrough",
        value: "Forwards every incoming UDP message to a second host (e.g. duplicate PC). The module stays transparent \u2014 it only reads messages, never blocks them.",
        width: 12
      },
      { type: "checkbox", id: "relay_enabled", label: "Enable Relay", width: 3, default: false },
      {
        type: "textinput",
        id: "relay_host",
        label: "Relay Host / IP",
        width: 6,
        regex: Regex.HOSTNAME,
        default: "",
        isVisible: (o) => !!o.relay_enabled,
        isVisibleExpression: "$(options:relay_enabled) === true"
      },
      {
        type: "textinput",
        id: "relay_port",
        label: "Relay Port",
        width: 3,
        regex: Regex.PORT,
        default: "7001",
        isVisible: (o) => !!o.relay_enabled,
        isVisibleExpression: "$(options:relay_enabled) === true"
      },
      // ── Remote control via OSC ──────────────────────────────────────────
      {
        type: "static-text",
        id: "remote_header",
        label: "Remote Control via OSC",
        value: "Resolume (or any OSC source) can trigger preset slots and modes by sending OSC commands to the listen port. Requires \u201CListen for Feedback\u201D to be enabled.",
        width: 12
      },
      { type: "checkbox", id: "remote_enabled", label: "Enable Remote Control", width: 3, default: false },
      {
        type: "textinput",
        id: "remote_prefix",
        label: "OSC path prefix",
        width: 4,
        default: "/companion",
        isVisible: (o) => !!o.remote_enabled,
        isVisibleExpression: "$(options:remote_enabled) === true"
      },
      {
        type: "static-text",
        id: "remote_help",
        label: "Available commands",
        value: "{prefix}/slot/{n} i:1 \u2192 trigger slot n\n{prefix}/slot/{n}/assign i:1 \u2192 assign\n{prefix}/slot/{n}/clear i:1 \u2192 clear\n{prefix}/edit i:1/0 \u2192 set edit mode\n{prefix}/delete i:1/0 \u2192 set delete mode\n{prefix}/bpm_tap \u2192 tap tempo",
        width: 12,
        isVisible: (o) => !!o.remote_enabled,
        isVisibleExpression: "$(options:remote_enabled) === true"
      }
    ];
  }
  // ---------------------------------------------------------------------------
  // OSC send helper
  // ---------------------------------------------------------------------------
  async _sendOSC(path, args) {
    const argsJson = JSON.stringify(args);
    const argsStr = args.map((a) => a.value !== void 0 ? a.value : "").join(" ");
    this.log("debug", `OSC [${this.config.protocol}] -> ${path} ${argsStr}`);
    if (this.config.protocol === "udp") {
      this.setVariableValues({
        latest_sent_raw: `${path} ${argsStr}`,
        latest_sent_path: path,
        latest_sent_args: args.length > 0 ? args.map((a) => a.value) : void 0,
        latest_sent_timestamp: Date.now()
      });
      if (this.oscSend)
        this.oscSend(this.targetHost, this.config.targetPort, path, args);
    } else {
      if (!this.client)
        return;
      this.setVariableValues({
        latest_sent_raw: `${path} ${argsStr}`,
        latest_sent_path: path,
        latest_sent_args: args.length > 0 ? args.map((a) => a.value) : void 0,
        latest_sent_timestamp: Date.now()
      });
      await this.client.sendCommand(path, args).catch((err) => {
        this.log("error", `Failed to send command: ${err.message}`);
      });
    }
  }
  // ---------------------------------------------------------------------------
  // Arena incoming OSC processing
  // Called by setupOSC / data-handler for EVERY incoming message
  // ---------------------------------------------------------------------------
  handleArenaIncoming(address, args) {
    if (this.config.remote_enabled && this.config.remote_prefix) {
      const prefix = String(this.config.remote_prefix).replace(/\/+$/, "");
      if (address.startsWith(prefix + "/") || address === prefix) {
        const sub = address.slice(prefix.length);
        const firstArg = args && args.length > 0 ? args[0].value : void 0;
        const slotTriggerMatch = sub.match(/^\/slot\/(\d+)$/);
        if (slotTriggerMatch) {
          if (firstArg === 0 || firstArg === false)
            return true;
          const slotId = parseInt(slotTriggerMatch[1]);
          if (this.editMode || this._quickAssignSlots.has(slotId)) {
            this._assignSlot(slotId);
          } else if (this.deleteMode) {
            delete this.presetSlots[slotId];
            this._savePresetSlots();
            this.deleteMode = false;
            this._stopDeleteBlink();
            this.setVariableValues({ arena_delete_mode: "0" });
            this.checkFeedbacks("preset_slot", "preset_slot_delete");
          } else {
            const slot = this.presetSlots[slotId];
            if (slot) {
              this._triggerSlot(slotId);
            } else {
              this._startQuickAssign(slotId);
            }
          }
          return true;
        }
        const slotAssignMatch = sub.match(/^\/slot\/(\d+)\/assign$/);
        if (slotAssignMatch) {
          if (firstArg === 0 || firstArg === false)
            return true;
          this._assignSlot(parseInt(slotAssignMatch[1]));
          return true;
        }
        const slotClearMatch = sub.match(/^\/slot\/(\d+)\/clear$/);
        if (slotClearMatch) {
          if (firstArg === 0 || firstArg === false)
            return true;
          const slotId = parseInt(slotClearMatch[1]);
          delete this.presetSlots[slotId];
          this._savePresetSlots();
          this.checkFeedbacks("preset_slot");
          return true;
        }
        if (sub === "/edit" || sub === "/edit_mode") {
          const newState = firstArg === void 0 ? !this.editMode : firstArg === 1 || firstArg === true;
          if (newState !== this.editMode) {
            this.editMode = newState;
            if (newState) {
              if (this.deleteMode) {
                this.deleteMode = false;
                this._stopDeleteBlink();
                this.setVariableValues({ arena_delete_mode: "0" });
              }
              this._startEditBlink();
            } else {
              this._stopEditBlink();
            }
            this.setVariableValues({ arena_edit_mode: this.editMode ? "1" : "0" });
            this.checkFeedbacks("preset_slot", "preset_slot_edit");
          }
          return true;
        }
        if (sub === "/delete" || sub === "/delete_mode") {
          const newState = firstArg === void 0 ? !this.deleteMode : firstArg === 1 || firstArg === true;
          if (newState !== this.deleteMode) {
            this.deleteMode = newState;
            if (newState) {
              if (this.editMode) {
                this.editMode = false;
                this._stopEditBlink();
                this.setVariableValues({ arena_edit_mode: "0" });
              }
              this._startDeleteBlink();
            } else {
              this._stopDeleteBlink();
            }
            this.setVariableValues({ arena_delete_mode: this.deleteMode ? "1" : "0" });
            this.checkFeedbacks("preset_slot", "preset_slot_delete");
          }
          return true;
        }
        if (sub === "/bpm_tap") {
          if (firstArg !== 0 && firstArg !== false)
            this._sendOSC("/composition/tempocontroller/tap", []);
          return true;
        }
        this.log("debug", `[Remote] Unknown command: ${address}`);
        return true;
      }
    }
    if (this._pendingNameQueries[address]) {
      const q = this._pendingNameQueries[address];
      clearTimeout(q.timer);
      delete this._pendingNameQueries[address];
      const name = args && args.length > 0 ? String(args[0].value ?? "") : "";
      q.resolve(name);
      return true;
    }
    const clipSelectMatch = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/(select|selected)$/);
    if (clipSelectMatch) {
      const layer = parseInt(clipSelectMatch[1]);
      const clip = parseInt(clipSelectMatch[2]);
      const val = args && args.length > 0 ? args[0].value : 1;
      if (val === 1 || val === true || val === "1") {
        this.arenaSelectedClip = { layer, clip };
        const columnJustSelected = Date.now() - this._lastColumnSelectTime < 200;
        if (!columnJustSelected) {
          this.arenaLastSelectType = "clip";
          this.setVariableValues({
            arena_selected_layer: layer,
            arena_selected_clip: clip,
            arena_last_select_type: "clip"
          });
          this.checkFeedbacks("arena_last_select_type", "preset_slot");
        } else {
          this.setVariableValues({ arena_selected_layer: layer, arena_selected_clip: clip });
        }
      }
      return true;
    }
    const colSelectMatch = address.match(/^\/composition\/columns\/(\d+)\/(select|selected)$/);
    if (colSelectMatch) {
      const column = parseInt(colSelectMatch[1]);
      const val = args && args.length > 0 ? args[0].value : 1;
      if (val === 1 || val === true || val === "1") {
        this._lastColumnSelectTime = Date.now();
        this.arenaSelectedColumn = { column };
        this.arenaLastSelectType = "column";
        this.setVariableValues({
          arena_selected_column: column,
          arena_last_select_type: "column"
        });
        this.checkFeedbacks("arena_last_select_type", "preset_slot");
      }
      return true;
    }
    const isNamePath = /^\/composition\/layers\/\d+\/clips\/\d+\/name$/.test(address) || /^\/composition\/columns\/\d+\/name$/.test(address);
    if (isNamePath)
      return true;
    if (address === "/composition/tempocontroller/tempo" || address === "/composition/bpm") {
      const bpm = args && args.length > 0 ? Number(args[0].value) : null;
      if (bpm !== null && !isNaN(bpm)) {
        this.arenaBpm = bpm;
        this.setVariableValues({ arena_bpm: bpm.toFixed(2) });
        this.checkFeedbacks("arena_bpm_value");
      }
      return true;
    }
    if (address === "/composition/video/opacity") {
      const op = args && args.length > 0 ? Number(args[0].value) : null;
      if (op !== null && !isNaN(op)) {
        this.arenaMasterOpacity = op;
        this.setVariableValues({ arena_master_opacity: op.toFixed(3) });
      }
      return true;
    }
    const layerOpacityMatch = address.match(/^\/composition\/layers\/(\d+)\/video\/opacity$/);
    if (layerOpacityMatch) {
      const layer = parseInt(layerOpacityMatch[1]);
      const op = args && args.length > 0 ? Number(args[0].value) : null;
      if (op !== null && !isNaN(op)) {
        if (!this.arenaLayerState[layer])
          this.arenaLayerState[layer] = {};
        this.arenaLayerState[layer].opacity = op;
        this.checkFeedbacks("arena_layer_opacity");
      }
      return true;
    }
    const layerBypassMatch = address.match(/^\/composition\/layers\/(\d+)\/bypassed$/);
    if (layerBypassMatch) {
      const layer = parseInt(layerBypassMatch[1]);
      const bypass = args && args.length > 0 ? args[0].value === 1 || args[0].value === true : false;
      if (!this.arenaLayerState[layer])
        this.arenaLayerState[layer] = {};
      this.arenaLayerState[layer].bypass = bypass;
      this.checkFeedbacks("arena_layer_bypass");
      return true;
    }
    this.onDataReceived[address] = args || [];
    if (this._cleanupTimers[address])
      clearTimeout(this._cleanupTimers[address]);
    this._cleanupTimers[address] = setTimeout(() => {
      delete this.onDataReceived[address];
      delete this._cleanupTimers[address];
    }, GENERIC_OSC_CLEANUP_TTL);
    return false;
  }
  // ---------------------------------------------------------------------------
  // Name query
  // ---------------------------------------------------------------------------
  async _queryName(oscPath) {
    return new Promise((resolve) => {
      if (this._pendingNameQueries[oscPath]) {
        clearTimeout(this._pendingNameQueries[oscPath].timer);
        this._pendingNameQueries[oscPath].resolve("");
        delete this._pendingNameQueries[oscPath];
      }
      const timer = setTimeout(() => {
        delete this._pendingNameQueries[oscPath];
        this.log("debug", `Name query timeout: ${oscPath}`);
        resolve("");
      }, NAME_QUERY_TIMEOUT);
      this._pendingNameQueries[oscPath] = { resolve, timer };
      this._sendOSC(oscPath, [{ type: "s", value: "?" }]).catch(() => {
        clearTimeout(timer);
        delete this._pendingNameQueries[oscPath];
        resolve("");
      });
    });
  }
  async _getClipName(layer, clip) {
    return this._queryName(`/composition/layers/${layer}/clips/${clip}/name`);
  }
  async _getColumnName(column) {
    return this._queryName(`/composition/columns/${column}/name`);
  }
  // ---------------------------------------------------------------------------
  // Preset slots persistence
  // ---------------------------------------------------------------------------
  _savePresetSlots() {
    this.saveConfig({ ...this.config, _presetSlots: this.presetSlots });
  }
  // ---------------------------------------------------------------------------
  // Edit mode blink
  // ---------------------------------------------------------------------------
  _startEditBlink() {
    this._stopEditBlink();
    this._editBlinkState = true;
    this._editBlinkTimer = setInterval(() => {
      this._editBlinkState = !this._editBlinkState;
      this.checkFeedbacks("preset_slot", "preset_slot_edit");
    }, BLINK_INTERVAL);
  }
  _stopEditBlink() {
    if (this._editBlinkTimer) {
      clearInterval(this._editBlinkTimer);
      this._editBlinkTimer = null;
    }
    this._editBlinkState = false;
  }
  _startDeleteBlink() {
    this._stopDeleteBlink();
    this._deleteBlinkState = true;
    this._deleteBlinkTimer = setInterval(() => {
      this._deleteBlinkState = !this._deleteBlinkState;
      this.checkFeedbacks("preset_slot", "preset_slot_delete");
    }, BLINK_INTERVAL);
  }
  _stopDeleteBlink() {
    if (this._deleteBlinkTimer) {
      clearInterval(this._deleteBlinkTimer);
      this._deleteBlinkTimer = null;
    }
    this._deleteBlinkState = false;
  }
  // Start a 3-second quick-assign highlight on a slot
  _startQuickAssign(slotId) {
    if (this._quickAssignTimers[slotId]) {
      clearTimeout(this._quickAssignTimers[slotId]);
    }
    this._quickAssignSlots.add(slotId);
    this.checkFeedbacks("preset_slot");
    this._quickAssignTimers[slotId] = setTimeout(() => {
      this._quickAssignSlots.delete(slotId);
      delete this._quickAssignTimers[slotId];
      this.checkFeedbacks("preset_slot");
    }, QUICK_ASSIGN_TTL);
  }
  _cancelQuickAssign(slotId) {
    if (this._quickAssignTimers[slotId]) {
      clearTimeout(this._quickAssignTimers[slotId]);
      delete this._quickAssignTimers[slotId];
    }
    this._quickAssignSlots.delete(slotId);
  }
  // ---------------------------------------------------------------------------
  // Slot helpers
  // ---------------------------------------------------------------------------
  async _assignSlot(slotId) {
    this.log("info", `Assigning slot ${slotId}`);
    if (this.arenaLastSelectType === "clip") {
      const { layer, clip } = this.arenaSelectedClip;
      if (layer == null || clip == null) {
        this.log("warn", "No clip selected yet");
        return;
      }
      const name = await this._getClipName(layer, clip);
      this.presetSlots[slotId] = { type: "clip", layer, clip, name: name || `L${layer}C${clip}` };
    } else if (this.arenaLastSelectType === "column") {
      const { column } = this.arenaSelectedColumn;
      if (column == null) {
        this.log("warn", "No column selected yet");
        return;
      }
      const name = await this._getColumnName(column);
      this.presetSlots[slotId] = { type: "column", column, name: name || `Col${column}` };
    } else {
      this.log("warn", "No Arena selection \u2014 select a clip or column first");
      return;
    }
    this.log("info", `Slot ${slotId} = ${JSON.stringify(this.presetSlots[slotId])}`);
    this._savePresetSlots();
    this.editMode = false;
    this._stopEditBlink();
    this._cancelQuickAssign(slotId);
    this.setVariableValues({ arena_edit_mode: "0" });
    this.checkFeedbacks("preset_slot", "preset_slot_edit");
  }
  async _triggerSlot(slotId) {
    const slot = this.presetSlots[slotId];
    if (!slot) {
      this.log("debug", `Slot ${slotId} is empty`);
      return;
    }
    if (slot.type === "clip") {
      await this._sendOSC(`/composition/layers/${slot.layer}/clips/${slot.clip}/connect`, [{ type: "i", value: 1 }]);
    } else if (slot.type === "column") {
      await this._sendOSC(`/composition/columns/${slot.column}/connect`, [{ type: "i", value: 1 }]);
    }
    this.log("info", `Slot ${slotId} triggered: ${slot.name}`);
  }
  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  updateActions() {
    const send = (path, args) => this._sendOSC(path, args);
    this.setActionDefinitions({
      // ── Generic OSC ─────────────────────────────────────────────────────
      send_blank: {
        name: "Send message without arguments",
        options: [{ type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true }],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          send(path, []);
        }
      },
      send_int: {
        name: "Send integer",
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Value", id: "int", default: "1", regex: Regex.SIGNED_NUMBER, useVariables: true }
        ],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          const val = await this.parseVariablesInString(String(action.options.int ?? ""));
          send(path, [{ type: "i", value: parseInt(val) }]);
        }
      },
      send_float: {
        name: "Send float",
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Value", id: "float", default: "1", regex: Regex.SIGNED_FLOAT, useVariables: true }
        ],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          const val = await this.parseVariablesInString(String(action.options.float ?? ""));
          send(path, [{ type: "f", value: parseFloat(val) }]);
        }
      },
      send_string: {
        name: "Send string",
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Value", id: "string", default: "text", useVariables: true }
        ],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          const val = await this.parseVariablesInString(String(action.options.string ?? ""));
          send(path, [{ type: "s", value: "" + val }]);
        }
      },
      send_multiple: {
        name: "Send message with multiple arguments",
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Arguments", id: "arguments", default: '1 "text" 2.5', useVariables: true, tooltip: "Space-delimited numbers, booleans, or strings." }
        ],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          const argsStr = await this.parseVariablesInString(String(action.options.arguments ?? ""));
          const args = Array.isArray(argsStr) ? argsStr.filter((v) => ["string", "boolean", "number"].includes(typeof v)).map((v) => typeof v === "number" ? { type: "f", value: v } : typeof v === "string" ? { type: "s", value: v } : v ? { type: "T" } : { type: "F" }) : parseArguments(argsStr).args;
          send(path, args);
        }
      },
      send_boolean: {
        name: "Send boolean",
        options: [
          { type: "static-text", label: "Note", value: "Non-standard, may only work with some receivers.", id: "w" },
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "checkbox", label: "Value", id: "value", default: false }
        ],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          send(path, [{ type: action.options.value === true ? "T" : "F" }]);
        }
      },
      send_blob: {
        name: "Send blob",
        options: [
          { type: "static-text", label: "Note", value: "Non-standard, may only work with some receivers.", id: "w" },
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          {
            type: "textinput",
            label: "Blob Data (Base64)",
            id: "blob",
            default: "",
            useVariables: true,
            isVisible: (o) => o.hexswitch === false,
            isVisibleExpression: "$(options:hexswitch) === false"
          },
          {
            type: "textinput",
            label: "Blob Data (Hex)",
            id: "blob_hex",
            default: "0A0B0C",
            useVariables: true,
            isVisible: (o) => o.hexswitch === true,
            isVisibleExpression: "$(options:hexswitch) === true"
          },
          { type: "checkbox", label: "Use Hex", id: "hexswitch", default: false }
        ],
        callback: async (action) => {
          const path = await this.parseVariablesInString(String(action.options.path ?? ""));
          const raw64 = await this.parseVariablesInString(String(action.options.blob ?? ""));
          const rawHex = await this.parseVariablesInString(String(action.options.blob_hex ?? ""));
          const buf = action.options.hexswitch ? Buffer.from(rawHex.replace(/[\s,]/g, ""), "hex") : Buffer.from(raw64.replace(/[\s,]/g, ""), "base64");
          if (!buf || buf.length === 0) {
            this.log("error", "Invalid blob data");
            return;
          }
          send(path, [{ type: "b", value: buf }]);
        }
      },
      // ── Arena direct triggers ────────────────────────────────────────────
      arena_trigger_clip: {
        name: "[Arena] Trigger clip (layer + clip number)",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true },
          { type: "textinput", label: "Clip number", id: "clip", default: "1", regex: Regex.NUMBER, useVariables: true }
        ],
        callback: async (action) => {
          const layer = parseInt(await this.parseVariablesInString(String(action.options.layer ?? "")));
          const clip = parseInt(await this.parseVariablesInString(String(action.options.clip ?? "")));
          send(`/composition/layers/${layer}/clips/${clip}/connect`, [{ type: "i", value: 1 }]);
        }
      },
      arena_trigger_column: {
        name: "[Arena] Trigger column (by number)",
        options: [
          { type: "textinput", label: "Column number", id: "column", default: "1", regex: Regex.NUMBER, useVariables: true }
        ],
        callback: async (action) => {
          const column = parseInt(await this.parseVariablesInString(String(action.options.column ?? "")));
          send(`/composition/columns/${column}/connect`, [{ type: "i", value: 1 }]);
        }
      },
      arena_select_clip: {
        name: "[Arena] Select clip (focus, no trigger)",
        description: "Selects (focuses) a clip in the Arena UI without triggering it.",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true },
          { type: "textinput", label: "Clip number", id: "clip", default: "1", regex: Regex.NUMBER, useVariables: true }
        ],
        callback: async (action) => {
          const layer = parseInt(await this.parseVariablesInString(String(action.options.layer ?? "")));
          const clip = parseInt(await this.parseVariablesInString(String(action.options.clip ?? "")));
          send(`/composition/layers/${layer}/clips/${clip}/select`, [{ type: "i", value: 1 }]);
        }
      },
      arena_select_column: {
        name: "[Arena] Select column (focus, no trigger)",
        description: "Selects (focuses) a column in the Arena UI without triggering it.",
        options: [
          { type: "textinput", label: "Column number", id: "column", default: "1", regex: Regex.NUMBER, useVariables: true }
        ],
        callback: async (action) => {
          const column = parseInt(await this.parseVariablesInString(String(action.options.column ?? "")));
          send(`/composition/columns/${column}/select`, [{ type: "i", value: 1 }]);
        }
      },
      arena_clear_layer: {
        name: "[Arena] Clear layer",
        description: "Clears the specified layer. Sends 1 then 0 after 100ms (momentary).",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true }
        ],
        callback: async (action) => {
          const layer = parseInt(await this.parseVariablesInString(String(action.options.layer ?? "")));
          await this._sendOSC(`/composition/layers/${layer}/clear`, [{ type: "i", value: 1 }]);
          await new Promise((r) => setTimeout(r, 100));
          await this._sendOSC(`/composition/layers/${layer}/clear`, [{ type: "i", value: 0 }]);
        }
      },
      arena_layer_opacity: {
        name: "[Arena] Layer opacity",
        description: "Sets the video opacity of a layer (0.0 = transparent, 1.0 = full).",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true },
          { type: "textinput", label: "Opacity (0.0 \u2013 1.0)", id: "opacity", default: "1", regex: Regex.SIGNED_FLOAT, useVariables: true }
        ],
        callback: async (action) => {
          const layer = parseInt(await this.parseVariablesInString(String(action.options.layer ?? "")));
          const opacity = Math.max(0, Math.min(1, parseFloat(await this.parseVariablesInString(String(action.options.opacity ?? "1")))));
          send(`/composition/layers/${layer}/video/opacity`, [{ type: "f", value: opacity }]);
        }
      },
      arena_layer_bypass: {
        name: "[Arena] Layer bypass",
        description: "Sets the bypass (mute) state of a layer.",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true },
          {
            type: "dropdown",
            label: "Bypass",
            id: "bypass",
            default: "toggle",
            choices: [{ id: "on", label: "ON (bypass)" }, { id: "off", label: "OFF (active)" }, { id: "toggle", label: "Toggle" }]
          }
        ],
        callback: async (action) => {
          const layer = parseInt(await this.parseVariablesInString(String(action.options.layer ?? "")));
          const cur = this.arenaLayerState[layer]?.bypass ?? false;
          const val = action.options.bypass === "toggle" ? cur ? 0 : 1 : action.options.bypass === "on" ? 1 : 0;
          send(`/composition/layers/${layer}/bypassed`, [{ type: "i", value: val }]);
        }
      },
      arena_master_opacity: {
        name: "[Arena] Master composition opacity",
        description: "Sets the master video opacity of the composition (0.0 \u2013 1.0).",
        options: [
          { type: "textinput", label: "Opacity (0.0 \u2013 1.0)", id: "opacity", default: "1", regex: Regex.SIGNED_FLOAT, useVariables: true }
        ],
        callback: async (action) => {
          const opacity = Math.max(0, Math.min(1, parseFloat(await this.parseVariablesInString(String(action.options.opacity ?? "1")))));
          send("/composition/video/opacity", [{ type: "f", value: opacity }]);
        }
      },
      arena_bpm_set: {
        name: "[Arena] Set BPM",
        description: "Sets the composition BPM/tempo.",
        options: [
          { type: "textinput", label: "BPM", id: "bpm", default: "120", regex: Regex.SIGNED_FLOAT, useVariables: true }
        ],
        callback: async (action) => {
          const bpm = parseFloat(await this.parseVariablesInString(String(action.options.bpm ?? "120")));
          send("/composition/tempocontroller/tempo", [{ type: "f", value: bpm }]);
        }
      },
      arena_bpm_tap: {
        name: "[Arena] Tap tempo",
        description: "Sends a tap tempo trigger to Arena.",
        options: [],
        callback: async () => {
          send("/composition/tempocontroller/tap", []);
        }
      },
      // ── Preset slots ─────────────────────────────────────────────────────
      preset_slot_trigger: {
        name: "[Arena] Preset slot \u2014 Trigger / Assign",
        description: "Edit/delete mode ON \u2192 assign or delete. Slot empty \u2192 3s quick-assign. Slot filled \u2192 trigger.",
        options: [
          { type: "number", label: "Slot number", id: "slot", default: 1, min: 1, max: 200 }
        ],
        callback: async (action) => {
          const slotId = Number(action.options.slot ?? 1);
          if (this.deleteMode) {
            delete this.presetSlots[slotId];
            this._savePresetSlots();
            this.deleteMode = false;
            this._stopDeleteBlink();
            this.setVariableValues({ arena_delete_mode: "0" });
            this.checkFeedbacks("preset_slot", "preset_slot_delete");
            this.log("info", `Slot ${slotId} cleared via delete mode`);
            return;
          }
          if (this.editMode) {
            await this._assignSlot(slotId);
            return;
          }
          if (this._quickAssignSlots.has(slotId)) {
            await this._assignSlot(slotId);
            return;
          }
          const slot = this.presetSlots[slotId];
          if (slot) {
            await this._triggerSlot(slotId);
          } else {
            this._startQuickAssign(slotId);
          }
        }
      },
      preset_slot_edit_mode: {
        name: "[Arena] Preset slot \u2014 Toggle edit mode",
        description: "While edit mode is active, pressing a slot assigns the current Arena selection.",
        options: [
          {
            type: "dropdown",
            label: "Action",
            id: "action",
            default: "toggle",
            choices: [{ id: "toggle", label: "Toggle" }, { id: "on", label: "Turn ON" }, { id: "off", label: "Turn OFF" }]
          }
        ],
        callback: async (action) => {
          const act = action.options.action ?? "toggle";
          this.editMode = act === "toggle" ? !this.editMode : act === "on";
          if (this.editMode) {
            if (this.deleteMode) {
              this.deleteMode = false;
              this._stopDeleteBlink();
              this.setVariableValues({ arena_delete_mode: "0" });
            }
            this._startEditBlink();
          } else {
            this._stopEditBlink();
          }
          this.setVariableValues({ arena_edit_mode: this.editMode ? "1" : "0" });
          this.checkFeedbacks("preset_slot", "preset_slot_edit");
        }
      },
      preset_slot_delete_mode: {
        name: "[Arena] Preset slot \u2014 Toggle delete mode",
        description: "While delete mode is active, pressing a slot clears it (red blink).",
        options: [
          {
            type: "dropdown",
            label: "Action",
            id: "action",
            default: "toggle",
            choices: [{ id: "toggle", label: "Toggle" }, { id: "on", label: "Turn ON" }, { id: "off", label: "Turn OFF" }]
          }
        ],
        callback: async (action) => {
          const act = action.options.action ?? "toggle";
          this.deleteMode = act === "toggle" ? !this.deleteMode : act === "on";
          if (this.deleteMode) {
            if (this.editMode) {
              this.editMode = false;
              this._stopEditBlink();
              this.setVariableValues({ arena_edit_mode: "0" });
            }
            this._startDeleteBlink();
          } else {
            this._stopDeleteBlink();
          }
          this.setVariableValues({ arena_delete_mode: this.deleteMode ? "1" : "0" });
          this.checkFeedbacks("preset_slot", "preset_slot_delete");
        }
      },
      preset_slot_clear: {
        name: "[Arena] Preset slot \u2014 Clear",
        options: [
          { type: "number", label: "Slot number", id: "slot", default: 1, min: 1, max: 200 },
          {
            type: "button",
            label: "Clear this slot now",
            id: "clear_btn",
            text: "Clear Slot"
          }
        ],
        callback: async (action) => {
          const slotId = Number(action.options.slot ?? 1);
          delete this.presetSlots[slotId];
          this._savePresetSlots();
          this.checkFeedbacks("preset_slot", "preset_slot_edit");
        }
      }
    });
  }
  // ---------------------------------------------------------------------------
  // Feedbacks
  // ---------------------------------------------------------------------------
  updateFeedbacks() {
    this.setFeedbackDefinitions({
      // ── Preset slot display (advanced — controls button look) ─────────────
      preset_slot: {
        type: "advanced",
        name: "[Arena] Preset slot display",
        description: "Shows clip/column name and color. Blinks orange (edit), red (delete), amber (quick-assign).",
        options: [
          { type: "number", label: "Slot number", id: "slot", default: 1, min: 1, max: 200 },
          { type: "colorpicker", label: "Clip color", id: "clip_color", default: this._rgb(0, 80, 200) },
          { type: "colorpicker", label: "Column color", id: "column_color", default: this._rgb(0, 160, 0) }
        ],
        callback: (feedback) => {
          const slotId = Number(feedback.options.slot ?? 1);
          const slot = this.presetSlots[slotId];
          if (this.deleteMode) {
            if (slot) {
              const bg2 = this._deleteBlinkState ? this._rgb(220, 0, 0) : this._rgb(60, 0, 0);
              return { text: slot.name || "?", bgcolor: bg2, color: this._rgb(255, 255, 255), size: "auto" };
            } else {
              const bg2 = this._deleteBlinkState ? this._rgb(100, 0, 0) : this._rgb(20, 20, 20);
              return { text: String(slotId), bgcolor: bg2, color: this._rgb(150, 80, 80), size: "auto" };
            }
          }
          if (this._quickAssignSlots.has(slotId)) {
            return { text: "PRESS\nAGAIN", bgcolor: this._rgb(200, 90, 0), color: this._rgb(255, 255, 255), size: "auto" };
          }
          if (this.editMode) {
            if (slot) {
              const bg2 = this._editBlinkState ? slot.type === "clip" ? feedback.options.clip_color : feedback.options.column_color : this._rgb(0, 0, 0);
              return { text: slot.name || "?", bgcolor: bg2, color: this._rgb(255, 255, 255), size: "auto" };
            } else {
              const bg2 = this._editBlinkState ? this._rgb(210, 90, 0) : this._rgb(20, 20, 20);
              return { text: String(slotId), bgcolor: bg2, color: this._rgb(255, 255, 255), size: "auto" };
            }
          }
          if (!slot) {
            return { text: String(slotId), bgcolor: this._rgb(25, 25, 25), color: this._rgb(90, 90, 90), size: "auto" };
          }
          const bg = slot.type === "clip" ? feedback.options.clip_color : feedback.options.column_color;
          const label = slot.name || (slot.type === "clip" ? `L${slot.layer}C${slot.clip}` : `Col${slot.column}`);
          return { text: label, bgcolor: bg, color: this._rgb(255, 255, 255), size: "auto" };
        }
      },
      // ── Edit mode indicator ───────────────────────────────────────────────
      preset_slot_edit: {
        type: "boolean",
        name: "[Arena] Edit mode active",
        description: "True while edit mode is ON.",
        options: [],
        defaultStyle: { bgcolor: this._rgb(210, 90, 0), color: this._rgb(255, 255, 255) },
        callback: () => this.editMode
      },
      preset_slot_delete: {
        type: "boolean",
        name: "[Arena] Delete mode active",
        description: "True while delete mode is ON.",
        options: [],
        defaultStyle: { bgcolor: this._rgb(200, 0, 0), color: this._rgb(255, 255, 255) },
        callback: () => this.deleteMode
      },
      // ── Last Arena select type ────────────────────────────────────────────
      arena_last_select_type: {
        type: "boolean",
        name: "[Arena] Last selection type",
        description: "True when last Arena selection matches the configured type.",
        options: [
          {
            type: "dropdown",
            label: "Type",
            id: "type",
            default: "clip",
            choices: [{ id: "clip", label: "Clip" }, { id: "column", label: "Column" }]
          }
        ],
        defaultStyle: { bgcolor: this._rgb(0, 80, 200), color: this._rgb(255, 255, 255) },
        callback: (feedback) => this.arenaLastSelectType === feedback.options.type
      },
      // ── Arena live feedbacks ─────────────────────────────────────────────
      arena_bpm_value: {
        type: "boolean",
        name: "[Arena] BPM value",
        description: "True when Arena BPM matches the comparison.",
        options: [
          { type: "textinput", label: "BPM", id: "bpm", default: "120", regex: Regex.SIGNED_FLOAT, useVariables: true },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [
              { id: "equal", label: "=" },
              { id: "greaterthan", label: ">" },
              { id: "lessthan", label: "<" },
              { id: "greaterthanequal", label: ">=" },
              { id: "lessthanequal", label: "<=" },
              { id: "notequal", label: "!=" }
            ]
          }
        ],
        defaultStyle: { bgcolor: this._rgb(100, 0, 150), color: this._rgb(255, 255, 255) },
        callback: async (fb, ctx) => {
          if (this.arenaBpm === null)
            return false;
          const target = parseFloat(await ctx.parseVariablesInString(String(fb.options.bpm ?? "120")));
          if (isNaN(target))
            return false;
          return evaluateComparison(this.arenaBpm, target, fb.options.comparison);
        }
      },
      arena_layer_bypass: {
        type: "boolean",
        name: "[Arena] Layer bypass state",
        description: "True when the layer is bypassed (muted).",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true }
        ],
        defaultStyle: { bgcolor: this._rgb(180, 0, 0), color: this._rgb(255, 255, 255) },
        callback: async (fb, ctx) => {
          const layer = parseInt(await ctx.parseVariablesInString(String(fb.options.layer ?? "1")));
          return this.arenaLayerState[layer]?.bypass === true;
        }
      },
      arena_layer_opacity: {
        type: "boolean",
        name: "[Arena] Layer opacity value",
        description: "True when layer opacity matches comparison.",
        options: [
          { type: "textinput", label: "Layer number", id: "layer", default: "1", regex: Regex.NUMBER, useVariables: true },
          { type: "textinput", label: "Opacity (0.0 \u2013 1.0)", id: "opacity", default: "1", regex: Regex.SIGNED_FLOAT, useVariables: true },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [
              { id: "equal", label: "=" },
              { id: "greaterthan", label: ">" },
              { id: "lessthan", label: "<" },
              { id: "greaterthanequal", label: ">=" },
              { id: "lessthanequal", label: "<=" },
              { id: "notequal", label: "!=" }
            ]
          }
        ],
        defaultStyle: { bgcolor: this._rgb(0, 100, 100), color: this._rgb(255, 255, 255) },
        callback: async (fb, ctx) => {
          const layer = parseInt(await ctx.parseVariablesInString(String(fb.options.layer ?? "1")));
          const curOpacity = this.arenaLayerState[layer]?.opacity;
          if (curOpacity === void 0)
            return false;
          const target = parseFloat(await ctx.parseVariablesInString(String(fb.options.opacity ?? "1")));
          if (isNaN(target))
            return false;
          return evaluateComparison(curOpacity, target, fb.options.comparison);
        }
      },
      // ── Generic OSC feedbacks ────────────────────────────────────────────
      osc_feedback_int: {
        type: "boolean",
        name: "Listen for OSC messages (Integer)",
        description: 'Requires "Listen for Feedback" to be enabled.',
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Value", id: "arguments", default: "1", regex: Regex.SIGNED_NUMBER, useVariables: true },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [
              { id: "equal", label: "=" },
              { id: "greaterthan", label: ">" },
              { id: "lessthan", label: "<" },
              { id: "greaterthanequal", label: ">=" },
              { id: "lessthanequal", label: "<=" },
              { id: "notequal", label: "!=" }
            ]
          }
        ],
        callback: async (fb, ctx) => {
          const path = await ctx.parseVariablesInString(String(fb.options.path ?? ""));
          const target = parseFloat(await ctx.parseVariablesInString(String(fb.options.arguments ?? "")));
          if (isNaN(target) || !Object.prototype.hasOwnProperty.call(this.onDataReceived, path))
            return false;
          return evaluateComparison(parseFloat(this.onDataReceived[path][0]?.value), target, fb.options.comparison);
        }
      },
      osc_feedback_float: {
        type: "boolean",
        name: "Listen for OSC messages (Float)",
        description: 'Requires "Listen for Feedback" to be enabled.',
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Value", id: "arguments", default: "1", regex: Regex.SIGNED_FLOAT, useVariables: true },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [
              { id: "equal", label: "=" },
              { id: "greaterthan", label: ">" },
              { id: "lessthan", label: "<" },
              { id: "greaterthanequal", label: ">=" },
              { id: "lessthanequal", label: "<=" },
              { id: "notequal", label: "!=" }
            ]
          }
        ],
        callback: async (fb, ctx) => {
          const path = await ctx.parseVariablesInString(String(fb.options.path ?? ""));
          const target = parseFloat(await ctx.parseVariablesInString(String(fb.options.arguments ?? "")));
          if (isNaN(target) || !Object.prototype.hasOwnProperty.call(this.onDataReceived, path))
            return false;
          return evaluateComparison(parseFloat(this.onDataReceived[path][0]?.value), target, fb.options.comparison);
        }
      },
      osc_feedback_bool: {
        type: "boolean",
        name: "Listen for OSC messages (Boolean)",
        description: 'Requires "Listen for Feedback" to be enabled.',
        options: [
          { type: "static-text", label: "Note", value: "Non-standard type.", id: "w" },
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "checkbox", label: "Value", id: "arguments", default: false },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [{ id: "equal", label: "=" }, { id: "notequal", label: "!=" }]
          }
        ],
        callback: async (fb, ctx) => {
          const path = await ctx.parseVariablesInString(String(fb.options.path ?? ""));
          if (!Object.prototype.hasOwnProperty.call(this.onDataReceived, path))
            return false;
          return evaluateComparison(this.onDataReceived[path][0]?.value === true, fb.options.arguments, fb.options.comparison);
        }
      },
      osc_feedback_string: {
        type: "boolean",
        name: "Listen for OSC messages (String)",
        description: 'Requires "Listen for Feedback" to be enabled.',
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Value", id: "arguments", default: "my string", useVariables: true },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [{ id: "equal", label: "=" }, { id: "notequal", label: "!=" }]
          }
        ],
        callback: async (fb, ctx) => {
          const path = await ctx.parseVariablesInString(String(fb.options.path ?? ""));
          const expected = await ctx.parseVariablesInString(String(fb.options.arguments ?? ""));
          if (!Object.prototype.hasOwnProperty.call(this.onDataReceived, path))
            return false;
          const actual = this.onDataReceived[path][0]?.value;
          if (typeof actual !== "string")
            return false;
          return evaluateComparison(actual, expected, fb.options.comparison);
        }
      },
      osc_feedback_multi: {
        type: "boolean",
        name: "Listen for OSC messages (Multiple Arguments)",
        description: 'Requires "Listen for Feedback" to be enabled.',
        options: [
          { type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true },
          { type: "textinput", label: "Arguments", id: "arguments", default: '1 "test" 2.5', useVariables: true },
          {
            id: "comparison",
            type: "dropdown",
            label: "Comparison",
            default: "equal",
            choices: [{ id: "equal", label: "=" }, { id: "notequal", label: "!=" }]
          }
        ],
        callback: async (fb, ctx) => {
          const path = await ctx.parseVariablesInString(String(fb.options.path ?? ""));
          const argsStr = await ctx.parseVariablesInString(String(fb.options.arguments ?? ""));
          const { args, error } = parseArguments(argsStr);
          if (error || !Object.prototype.hasOwnProperty.call(this.onDataReceived, path))
            return false;
          const received = this.onDataReceived[path];
          let result = fb.options.comparison === "equal";
          for (let i = 0; i < args.length; i++) {
            result = evaluateComparison(received[i]?.value, args[i], fb.options.comparison);
            if (fb.options.comparison === "equal" && !result)
              break;
            if (fb.options.comparison === "notequal" && result)
              break;
          }
          return result;
        }
      },
      osc_feedback_noargs: {
        type: "boolean",
        name: "Listen for OSC messages (No Arguments)",
        description: 'Requires "Listen for Feedback" to be enabled.',
        options: [{ type: "textinput", label: "OSC Path", id: "path", default: "/osc/path", useVariables: true }],
        callback: async (fb, ctx) => {
          const path = await ctx.parseVariablesInString(String(fb.options.path ?? ""));
          if (Object.prototype.hasOwnProperty.call(this.onDataReceived, path) && this.onDataReceived[path].length > 0) {
            delete this.onDataReceived[path];
            return true;
          }
          return false;
        }
      }
    });
  }
  // ---------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------
  updateVariables() {
    this.setVariableDefinitions([
      // Generic
      { variableId: "latest_received_timestamp", name: "Latest OSC message received timestamp" },
      { variableId: "latest_received_raw", name: "Latest OSC message received" },
      { variableId: "latest_received_path", name: "Latest OSC command received" },
      { variableId: "latest_received_client", name: "Latest OSC message received client (UDP only)" },
      { variableId: "latest_received_port", name: "Latest OSC message received port (UDP only)" },
      { variableId: "latest_received_args", name: "Latest OSC arguments received array" },
      { variableId: "latest_sent_timestamp", name: "Latest OSC message sent timestamp" },
      { variableId: "latest_sent_raw", name: "Latest OSC message sent" },
      { variableId: "latest_sent_path", name: "Latest OSC command sent" },
      { variableId: "latest_sent_args", name: "Latest OSC arguments sent array" },
      // Arena — selection
      { variableId: "arena_selected_layer", name: "Arena \u2014 last selected layer" },
      { variableId: "arena_selected_clip", name: "Arena \u2014 last selected clip" },
      { variableId: "arena_selected_column", name: "Arena \u2014 last selected column" },
      { variableId: "arena_last_select_type", name: "Arena \u2014 last select type (clip | column)" },
      { variableId: "arena_edit_mode", name: "Arena \u2014 edit mode active (1 | 0)" },
      { variableId: "arena_delete_mode", name: "Arena \u2014 delete mode active (1 | 0)" },
      // Arena — live parameters
      { variableId: "arena_bpm", name: "Arena \u2014 current BPM" },
      { variableId: "arena_master_opacity", name: "Arena \u2014 master composition opacity (0.0\u20131.0)" }
    ]);
    this.setVariableValues({
      arena_selected_layer: this.arenaSelectedClip.layer ?? "",
      arena_selected_clip: this.arenaSelectedClip.clip ?? "",
      arena_selected_column: this.arenaSelectedColumn.column ?? "",
      arena_last_select_type: this.arenaLastSelectType ?? "",
      arena_edit_mode: "0",
      arena_delete_mode: "0",
      arena_bpm: this.arenaBpm !== null ? String(this.arenaBpm) : "",
      arena_master_opacity: this.arenaMasterOpacity !== null ? String(this.arenaMasterOpacity) : ""
    });
  }
  // ---------------------------------------------------------------------------
  // Utility
  // ---------------------------------------------------------------------------
  _rgb(r, g, b) {
    return (r & 255) << 16 | (g & 255) << 8 | b & 255;
  }
  // ---------------------------------------------------------------------------
  // Presets (drag-and-drop button templates)
  // ---------------------------------------------------------------------------
  updatePresets() {
    const presets = {};
    for (let slot = 1; slot <= 30; slot++) {
      presets[`slot_${slot}`] = {
        type: "button",
        category: "Preset Slots",
        name: `Preset Slot ${slot}`,
        style: {
          text: `Slot ${slot}`,
          size: "auto",
          bgcolor: this._rgb(25, 25, 25),
          color: this._rgb(150, 150, 150)
        },
        feedbacks: [{
          feedbackId: "preset_slot",
          options: { slot, clip_color: this._rgb(0, 80, 200), column_color: this._rgb(0, 160, 0) }
        }],
        steps: [{ down: [{ actionId: "preset_slot_trigger", options: { slot } }], up: [] }]
      };
    }
    presets["edit_mode_toggle"] = {
      type: "button",
      category: "Preset Slots",
      name: "Edit Mode",
      style: { text: "EDIT\nMODE", size: "auto", bgcolor: this._rgb(50, 25, 0), color: this._rgb(200, 120, 0) },
      feedbacks: [{ feedbackId: "preset_slot_edit", options: {} }],
      steps: [{ down: [{ actionId: "preset_slot_edit_mode", options: { action: "toggle" } }], up: [] }]
    };
    presets["delete_mode_toggle"] = {
      type: "button",
      category: "Preset Slots",
      name: "Delete Mode",
      style: { text: "DEL\nMODE", size: "auto", bgcolor: this._rgb(50, 0, 0), color: this._rgb(200, 80, 80) },
      feedbacks: [{ feedbackId: "preset_slot_delete", options: {} }],
      steps: [{ down: [{ actionId: "preset_slot_delete_mode", options: { action: "toggle" } }], up: [] }]
    };
    presets["trigger_clip"] = {
      type: "button",
      category: "Arena Controls",
      name: "Trigger Clip L1C1",
      style: { text: "L1\nC1", size: "auto", bgcolor: this._rgb(0, 50, 150), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_trigger_clip", options: { layer: "1", clip: "1" } }], up: [] }]
    };
    presets["trigger_column"] = {
      type: "button",
      category: "Arena Controls",
      name: "Trigger Column 1",
      style: { text: "COL\n1", size: "auto", bgcolor: this._rgb(0, 120, 0), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_trigger_column", options: { column: "1" } }], up: [] }]
    };
    presets["layer_opacity_full"] = {
      type: "button",
      category: "Arena Controls",
      name: "Layer 1 \u2014 Opacity 100%",
      style: { text: "L1\n100%", size: "auto", bgcolor: this._rgb(0, 60, 80), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_layer_opacity", options: { layer: "1", opacity: "1" } }], up: [] }]
    };
    presets["layer_opacity_zero"] = {
      type: "button",
      category: "Arena Controls",
      name: "Layer 1 \u2014 Opacity 0%",
      style: { text: "L1\n0%", size: "auto", bgcolor: this._rgb(0, 60, 80), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_layer_opacity", options: { layer: "1", opacity: "0" } }], up: [] }]
    };
    presets["layer_bypass_toggle"] = {
      type: "button",
      category: "Arena Controls",
      name: "Layer 1 \u2014 Bypass Toggle",
      style: { text: "L1\nBYPASS", size: "auto", bgcolor: this._rgb(60, 0, 0), color: this._rgb(200, 200, 200) },
      feedbacks: [{ feedbackId: "arena_layer_bypass", options: { layer: "1" } }],
      steps: [{ down: [{ actionId: "arena_layer_bypass", options: { layer: "1", bypass: "toggle" } }], up: [] }]
    };
    presets["clear_layer"] = {
      type: "button",
      category: "Arena Controls",
      name: "Layer 1 \u2014 Clear",
      style: { text: "CLEAR\nL1", size: "auto", bgcolor: this._rgb(80, 0, 0), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_clear_layer", options: { layer: "1" } }], up: [] }]
    };
    presets["master_opacity_full"] = {
      type: "button",
      category: "Arena Controls",
      name: "Master Opacity 100%",
      style: { text: "MASTER\n100%", size: "auto", bgcolor: this._rgb(20, 60, 80), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_master_opacity", options: { opacity: "1" } }], up: [] }]
    };
    presets["master_opacity_zero"] = {
      type: "button",
      category: "Arena Controls",
      name: "Master Opacity 0%",
      style: { text: "MASTER\n0%", size: "auto", bgcolor: this._rgb(20, 60, 80), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_master_opacity", options: { opacity: "0" } }], up: [] }]
    };
    presets["tap_tempo"] = {
      type: "button",
      category: "Arena Controls",
      name: "Tap Tempo",
      style: { text: "TAP\nTEMPO", size: "auto", bgcolor: this._rgb(60, 0, 100), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_bpm_tap", options: {} }], up: [] }]
    };
    presets["bpm_120"] = {
      type: "button",
      category: "Arena Controls",
      name: "Set BPM 120",
      style: { text: "BPM\n120", size: "auto", bgcolor: this._rgb(60, 0, 100), color: this._rgb(255, 255, 255) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "arena_bpm_set", options: { bpm: "120" } }], up: [] }]
    };
    presets["clear_slot_1"] = {
      type: "button",
      category: "Preset Slots",
      name: "Clear Slot 1",
      style: { text: "CLR\nSLOT 1", size: "auto", bgcolor: this._rgb(60, 0, 0), color: this._rgb(200, 100, 100) },
      feedbacks: [],
      steps: [{ down: [{ actionId: "preset_slot_clear", options: { slot: 1 } }], up: [] }]
    };
    this.setPresetDefinitions(presets);
  }
};
runEntrypoint(ArenaOscInstance, []);
