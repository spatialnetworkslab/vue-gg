(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3-scale'), require('d3-scale-chromatic'), require('d3-array'), require('d3-time-format'), require('d3-interpolate'), require('d3-shape')) :
  typeof define === 'function' && define.amd ? define(['d3-scale', 'd3-scale-chromatic', 'd3-array', 'd3-time-format', 'd3-interpolate', 'd3-shape'], factory) :
  (global = global || self, global.VueGG = factory(global.d3, global.d3$1, global.d3Array, global.d3TimeFormat, global.d3Interpolate, global.d3Shape));
}(this, function (d3, d3$1, d3Array, d3TimeFormat, d3Interpolate, d3Shape) { 'use strict';

  require('./_wks-define')('asyncIterator');

  // @@replace logic
  require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace) {
    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    return [function replace(searchValue, replaceValue) {

      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
    }, $replace];
  });

  var global = require('./_global');

  var inheritIfRequired = require('./_inherit-if-required');

  var dP = require('./_object-dp').f;

  var gOPN = require('./_object-gopn').f;

  var isRegExp = require('./_is-regexp');

  var $flags = require('./_flags');

  var $RegExp = global.RegExp;
  var Base = $RegExp;
  var proto = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g; // "new" creates a new object, old webkit buggy here

  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
    re2[require('./_wks')('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;
      var piRE = isRegExp(p);
      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
    };

    var proxy = function proxy(key) {
      key in $RegExp || dP($RegExp, key, {
        configurable: true,
        get: function get() {
          return Base[key];
        },
        set: function set(it) {
          Base[key] = it;
        }
      });
    };

    for (var keys = gOPN(Base), i = 0; keys.length > i;) {
      proxy(keys[i++]);
    }

    proto.constructor = $RegExp;
    $RegExp.prototype = proto;

    require('./_redefine')(global, 'RegExp', $RegExp);
  }

  require('./_set-species')('RegExp');

  // @@split logic
  require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split) {

    var isRegExp = require('./_is-regexp');

    var _split = $split;
    var $push = [].push;
    var $SPLIT = 'split';
    var LENGTH = 'length';
    var LAST_INDEX = 'lastIndex';

    if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
      var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
      // based on es5-shim implementation, need to rework it

      $split = function $split(separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

        if (!isRegExp(separator)) return _split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var separator2, match, lastIndex, lastLength, i; // Doesn't need flags gy, but they don't hurt

        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);

        while (match = separatorCopy.exec(string)) {
          // `separatorCopy.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0][LENGTH];

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
            // eslint-disable-next-line no-loop-func

            if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
              for (i = 1; i < arguments[LENGTH] - 2; i++) {
                if (arguments[i] === undefined) match[i] = undefined;
              }
            });
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }

          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
        }

        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));

        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      }; // Chakra, V8

    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      $split = function $split(separator, limit) {
        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
      };
    } // 21.1.3.17 String.prototype.split(separator, limit)


    return [function split(separator, limit) {
      var O = defined(this);
      var fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
    }, $split];
  });

  function _typeof2(obj) {
    if (typeof Symbol === "function" && _typeof$$1(Symbol.iterator) === "symbol") {
      _typeof2 = function _typeof2(obj) {
        return _typeof$$1(obj);
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$$1(obj);
      };
    }

    return _typeof2(obj);
  }

  function _typeof$$1(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      _typeof$$1 = function _typeof$$1(obj) {
        return _typeof2(obj);
      };
    } else {
      _typeof$$1 = function _typeof$$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof$$1(obj);
  }

  var global$1 = require('./_global');

  var has = require('./_has');

  var DESCRIPTORS = require('./_descriptors');

  var $export = require('./_export');

  var redefine = require('./_redefine');

  var META = require('./_meta').KEY;

  var $fails = require('./_fails');

  var shared = require('./_shared');

  var setToStringTag = require('./_set-to-string-tag');

  var uid = require('./_uid');

  var wks = require('./_wks');

  var wksExt = require('./_wks-ext');

  var wksDefine = require('./_wks-define');

  var enumKeys = require('./_enum-keys');

  var isArray = require('./_is-array');

  var anObject = require('./_an-object');

  var isObject = require('./_is-object');

  var toIObject = require('./_to-iobject');

  var toPrimitive = require('./_to-primitive');

  var createDesc = require('./_property-desc');

  var _create = require('./_object-create');

  var gOPNExt = require('./_object-gopn-ext');

  var $GOPD = require('./_object-gopd');

  var $DP = require('./_object-dp');

  var $keys = require('./_object-keys');

  var gOPD = $GOPD.f;
  var dP$1 = $DP.f;
  var gOPN$1 = gOPNExt.f;
  var $Symbol = global$1.Symbol;
  var $JSON = global$1.JSON;

  var _stringify = $JSON && $JSON.stringify;

  var PROTOTYPE = 'prototype';
  var HIDDEN = wks('_hidden');
  var TO_PRIMITIVE = wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = shared('symbol-registry');
  var AllSymbols = shared('symbols');
  var OPSymbols = shared('op-symbols');
  var ObjectProto = Object[PROTOTYPE];
  var USE_NATIVE = typeof $Symbol == 'function';
  var QObject = global$1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDesc = DESCRIPTORS && $fails(function () {
    return _create(dP$1({}, 'a', {
      get: function get() {
        return dP$1(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
  } : dP$1;

  var wrap = function wrap(tag) {
    var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);

    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && _typeof$$1($Symbol.iterator) == 'symbol' ? function (it) {
    return _typeof$$1(it) == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    anObject(it);
    key = toPrimitive(key, true);
    anObject(D);

    if (has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN)) dP$1(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _create(D, {
          enumerable: createDesc(0, false)
        });
      }

      return setSymbolDesc(it, key, D);
    }

    return dP$1(it, key, D);
  };

  var $defineProperties = function defineProperties(it, P) {
    anObject(it);
    var keys = enumKeys(P = toIObject(P));
    var i = 0;
    var l = keys.length;
    var key;

    while (l > i) {
      $defineProperty(it, key = keys[i++], P[key]);
    }

    return it;
  };

  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = toPrimitive(key, true));
    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = toIObject(it);
    key = toPrimitive(key, true);
    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
    var D = gOPD(it, key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(toIObject(it));
    var result = [];
    var i = 0;
    var key;

    while (names.length > i) {
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    }

    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN$1(IS_OP ? OPSymbols : toIObject(it));
    var result = [];
    var i = 0;
    var key;

    while (names.length > i) {
      if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    }

    return result;
  }; // 19.4.1.1 Symbol([description])


  if (!USE_NATIVE) {
    $Symbol = function _Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = uid(arguments.length > 0 ? arguments[0] : undefined);

      var $set = function $set(value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      };

      if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
        configurable: true,
        set: $set
      });
      return wrap(tag);
    };

    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return this._k;
    });
    $GOPD.f = $getOwnPropertyDescriptor;
    $DP.f = $defineProperty;
    require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
    require('./_object-pie').f = $propertyIsEnumerable;
    require('./_object-gops').f = $getOwnPropertySymbols;

    if (DESCRIPTORS && !require('./_library')) {
      redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    wksExt.f = function (name) {
      return wrap(wks(name));
    };
  }

  $export($export.G + $export.W + $export.F * !USE_NATIVE, {
    Symbol: $Symbol
  });

  for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
    wks(es6Symbols[j++]);
  }

  for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
    wksDefine(wellKnownSymbols[k++]);
  }

  $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function _for(key) {
      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

      for (var key in SymbolRegistry) {
        if (SymbolRegistry[key] === sym) return key;
      }
    },
    useSetter: function useSetter() {
      setter = true;
    },
    useSimple: function useSimple() {
      setter = false;
    }
  });
  $export($export.S + $export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // 24.3.2 JSON.stringify(value [, replacer [, space]])

  $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
    var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols

    return _stringify([S]) != '[null]' || _stringify({
      a: S
    }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;

      while (arguments.length > i) {
        args.push(arguments[i++]);
      }

      $replacer = replacer = args[1];
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function replacer(key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  }); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

  $Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

  setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

  setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

  setToStringTag(global$1.JSON, 'JSON', true);

  var $iterators = require('./es6.array.iterator');

  var getKeys = require('./_object-keys');

  var redefine$1 = require('./_redefine');

  var global$2 = require('./_global');

  var hide = require('./_hide');

  var Iterators = require('./_iterators');

  var wks$1 = require('./_wks');

  var ITERATOR = wks$1('iterator');
  var TO_STRING_TAG = wks$1('toStringTag');
  var ArrayValues = Iterators.Array;
  var DOMIterables = {
    CSSRuleList: true,
    // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true,
    // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true,
    // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = getKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
    var NAME = collections[i$1];
    var explicit = DOMIterables[NAME];
    var Collection = global$2[NAME];
    var proto$1 = Collection && Collection.prototype;
    var key;

    if (proto$1) {
      if (!proto$1[ITERATOR]) hide(proto$1, ITERATOR, ArrayValues);
      if (!proto$1[TO_STRING_TAG]) hide(proto$1, TO_STRING_TAG, NAME);
      Iterators[NAME] = ArrayValues;
      if (explicit) for (key in $iterators) {
        if (!proto$1[key]) redefine$1(proto$1, key, $iterators[key], true);
      }
    }
  }

  var $export$1 = require('./_export');

  var $includes = require('./_array-includes')(true);

  $export$1($export$1.P, 'Array', {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  require('./_add-to-unscopables')('includes');

  // 21.1.3.7 String.prototype.includes(searchString, position = 0)

  var $export$2 = require('./_export');

  var context = require('./_string-context');

  var INCLUDES = 'includes';
  $export$2($export$2.P + $export$2.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var global$3 = require('./_global');

  var has$1 = require('./_has');

  var cof = require('./_cof');

  var inheritIfRequired$1 = require('./_inherit-if-required');

  var toPrimitive$1 = require('./_to-primitive');

  var fails = require('./_fails');

  var gOPN$2 = require('./_object-gopn').f;

  var gOPD$1 = require('./_object-gopd').f;

  var dP$2 = require('./_object-dp').f;

  var $trim = require('./_string-trim').trim;

  var NUMBER = 'Number';
  var $Number = global$3[NUMBER];
  var Base$1 = $Number;
  var proto$2 = $Number.prototype; // Opera ~12 has broken Object#toString

  var BROKEN_COF = cof(require('./_object-create')(proto$2)) == NUMBER;
  var TRIM = 'trim' in String.prototype; // 7.1.3 ToNumber(argument)

  var toNumber = function toNumber(argument) {
    var it = toPrimitive$1(argument, false);

    if (typeof it == 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim(it, 3);
      var first = it.charCodeAt(0);
      var third, radix, maxCode;

      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          // fast equal /^0b[01]+$/i

          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          // fast equal /^0o[0-7]+$/i

          default:
            return +it;
        }

        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols

          if (code < 48 || code > maxCode) return NaN;
        }

        return parseInt(digits, radix);
      }
    }

    return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var that = this;
      return that instanceof $Number // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () {
        proto$2.valueOf.call(that);
      }) : cof(that) != NUMBER) ? inheritIfRequired$1(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
    };

    for (var keys$1 = require('./_descriptors') ? gOPN$2(Base$1) : ( // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j$1 = 0, key$1; keys$1.length > j$1; j$1++) {
      if (has$1(Base$1, key$1 = keys$1[j$1]) && !has$1($Number, key$1)) {
        dP$2($Number, key$1, gOPD$1(Base$1, key$1));
      }
    }

    $Number.prototype = proto$2;
    proto$2.constructor = $Number;

    require('./_redefine')(global$3, NUMBER, $Number);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  var CoordinateTreeUser = {
    inject: ['$$coordinateTree', '$$coordinateTreeParent'],
    computed: {
      parentBranch: function parentBranch() {
        return this.$$coordinateTree.getBranch(this.$$coordinateTreeParent);
      },
      parentRangeTypes: function parentRangeTypes() {
        return this.parentBranch.domainTypes;
      }
    }
  };

  var DataReceiver = {
    inject: ['$$dataContainerContext'],
    computed: {
      $$dataContainer: function $$dataContainer() {
        return this.$$dataContainerContext.dataContainer;
      }
    }
  };

  function is(value) {
    return value !== undefined;
  }
  function isnt(value) {
    return value === undefined;
  }

  function parseAesthetic (prop, options) {
    if (prop && is(options.isFunction)) {
      for (var key in this.parentRangeTypes) {
        if (['categorical', 'temporal'].includes(this.parentRangeTypes[key])) {
          throw new Error("\n          Cannot use :func prop on 'vgg-line' in combination with\n          '".concat(this.parentRangeTypes[key], "' parent domain\n        "));
        }
      }
    }

    if (!this.$$map) {
      if (is(prop) && prop.constructor === Object) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop) && prop.constructor === Function && isnt(options.isFunction)) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop)) {
        return prop;
      }

      if (isnt(prop)) {
        return options.default;
      }
    }

    if (this.$$map) {
      var isObject = is(prop) && prop.constructor === Object;
      var isFunction = is(prop) && prop.constructor === Function;

      if (is(prop) && isObject) {
        return prop;
      }

      if (is(prop) && isFunction) {
        return {
          func: prop
        };
      }

      if (is(prop) && !isObject && !isFunction) {
        return {
          assign: prop
        };
      }

      if (isnt(prop)) {
        return {
          assign: options.default
        };
      }
    }
  }

  function convertToNumeric (prop, dimension, parentBranch) {
    if (dimension === 'x') {
      return parentBranch.scaleX(prop);
    }

    if (dimension === 'y') {
      return parentBranch.scaleY(prop);
    }
  }

  function parseCoordinate (prop, _ref) {
    var dimension = _ref.dimension,
        wh = _ref.wh;
    var parentRangeType = this.parentRangeTypes[dimension];

    if (!this.$$map) {
      if (is(prop) && prop.constructor === Object) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop) && prop.constructor === Function) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop)) {
        // Here we check whether the passed prop (String, Number, etc)
        // is compatible with the parent domain (categorical, quantitative, etc)
        if (invalidValueForRangeType(prop, parentRangeType)) {
          throw new Error("Invalid input ".concat(prop, " for parent Section domain type ").concat(parentRangeType));
        } else {
          if (['categorical', 'temporal'].includes(parentRangeType)) {
            if (wh) {
              throw new Error("Cannot set 'w' or 'h' value in parent domain '".concat(parentRangeType, "'"));
            } // We will already convert categorical and temporal data here.


            return convertToNumeric(prop, dimension, this.parentBranch);
          }

          return prop;
        }
      }

      if (isnt(prop)) {
        return undefined;
      }
    }

    if (this.$$map) {
      var isObject = is(prop) && prop.constructor === Object;
      var isFunction = is(prop) && prop.constructor === Function;

      if (is(prop) && isObject) {
        // block object mapping syntax if used with categorical or temporal
        // parent domain
        if (['categorical', 'temporal'].includes(parentRangeType) && prop.hasOwnProperty('scale')) {
          throw new Error("Cannot scale ".concat(prop, " to parent Section domain type ").concat(parentRangeType));
        }

        return prop;
      }

      if (is(prop) && isFunction) {
        return {
          func: prop
        };
      }

      if (is(prop) && !isObject && !isFunction) {
        // Here we check whether the passed prop (String, Number, etc)
        // is compatible with the parent domain (categorical, quantitative, etc)
        if (invalidValueForRangeType(prop, parentRangeType)) {
          throw new Error("Invalid input ".concat(prop, " for parent Section domain type ").concat(parentRangeType));
        } else {
          if (['categorical', 'temporal'].includes(parentRangeType)) {
            if (wh) {
              throw new Error("Cannot set 'w' or 'h' value in parent domain '".concat(parentRangeType, "'"));
            } // We will already convert categorical and temporal data here.


            return {
              assign: convertToNumeric(prop, dimension, this.parentBranch)
            };
          }

          return {
            assign: prop
          };
        }
      }

      if (isnt(prop)) {
        return {
          assign: undefined
        };
      }
    }
  }

  function invalidValueForRangeType(value, rangeType) {
    if (rangeType === 'quantitative') {
      return value.constructor !== Number;
    } else if (rangeType === 'categorical') {
      return value.constructor !== String;
    } else if (rangeType === 'temporal') {
      return value.constructor !== Date;
    }
  }

  function parseCoordinateSet (prop, _ref) {
    var dimension = _ref.dimension;
    var parentRangeType = this.parentRangeTypes[dimension];

    if (!this.$$map) {
      if (is(prop) && prop.constructor === Object) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop) && prop.constructor === Function) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop) && prop.constructor === Array) {
        return parseArray(prop, parentRangeType, dimension, this.parentBranch);
      }

      if (is(prop) && prop.constructor === String) {
        if (!this.$$dataContainer.hasVariable(prop)) {
          throw new Error("Variable ".concat(prop, " not found"));
        }

        var data = this.$$dataContainer.getVariableData(prop);
        return parseArray(data, parentRangeType, dimension, this.parentBranch);
      }

      if (isnt(prop)) {
        return undefined;
      }
    }

    if (this.$$map) {
      var isObject = is(prop) && prop.constructor === Object;
      var isFunction = is(prop) && prop.constructor === Function;

      if (is(prop) && isObject) {
        // block object mapping syntax if used with categorical or temporal
        // parent domain
        if (['categorical', 'temporal'].includes(parentRangeType) && prop.hasOwnProperty('scale')) {
          throw new Error("Cannot scale ".concat(prop, " to parent Section domain type ").concat(parentRangeType));
        }

        return prop;
      }

      if (is(prop) && isFunction) {
        return {
          func: prop
        };
      }

      if (is(prop) && prop.constructor === Array) {
        return {
          assign: parseArray(prop, parentRangeType, dimension, this.parentBranch)
        };
      }

      if (is(prop) && prop.constructor === String) {
        throw new Error("Cannot set Mark coordinates from variable when mapping");
      }

      if (isnt(prop)) {
        return {
          assign: undefined
        };
      }
    }
  }
  function invalidValueForRangeType$1(value, rangeType) {
    if (rangeType === 'quantitative') {
      return value.constructor !== Number;
    } else if (rangeType === 'categorical') {
      return value.constructor !== String;
    } else if (rangeType === 'temporal') {
      return value.constructor !== Date;
    }
  }

  function parseArray(data, parentRangeType, dimension, parentBranch) {
    // Here we check whether array entries' types (String, Number, etc)
    // are compatible with the parent domain (categorical, quantitative, etc)
    var parsed = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entry = _step.value;

        if (invalidValueForRangeType$1(entry, parentRangeType)) {
          throw new Error("Invalid input ".concat(entry, " for parent Section domain type ").concat(parentRangeType));
        } else {
          if (['categorical', 'temporal'].includes(parentRangeType)) {
            // We will already convert categorical and temporal data here.
            parsed.push(convertToNumeric(entry, dimension, parentBranch));
          } else {
            parsed.push(entry);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return parsed;
  }

  function parseGeometry (prop) {
    if (!this.$$map) {
      if (is(prop) && prop.constructor === Array) {
        return parseArray$1(prop, this.parentRangeTypes, this.parentBranch);
      }

      if (isnt(prop)) {
        return undefined;
      }
    }

    if (this.$$map) {
      if (is(prop) && prop.constructor === Array) {
        return {
          assign: parseArray$1(prop, this.parentRangeTypes, this.parentBranch)
        };
      }

      if (isnt(prop)) {
        return {
          assign: undefined
        };
      }
    }
  }

  function parseArray$1(data, parentRangeTypes, parentBranch) {
    // Here we check whether array entries' types (String, Number, etc)
    // are compatible with the parent domain (categorical, quantitative, etc)
    var types = ['x', 'y'];
    var parsed = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entry = _step.value;
        var point = [];

        for (var i = 0; i < types.length; ++i) {
          var type = types[i];
          var parentRangeType = parentRangeTypes[type];

          if (invalidValueForRangeType$1(entry[i], parentRangeType)) {
            throw new Error("Invalid input ".concat(entry[i], " for parent Section domain type ").concat(parentRangeType));
          } else {
            if (['categorical', 'temporal'].includes(parentRangeType)) {
              // We will already convert categorical and temporal data here.
              point.push(convertToNumeric(entry[i], type, parentBranch));
            } else {
              point.push(entry[i]);
            }
          }
        }

        parsed.push(point);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return parsed;
  }

  function parsePixelValue (prop) {}

  function parseProperty (prop, options) {
    if (!this.$$map) {
      if (is(prop) && (prop.constructor === Object || prop.constructor === Function)) {
        throw new Error('Trying to map without vgg-map component.');
      }

      if (is(prop)) {
        return prop;
      }

      if (isnt(prop)) {
        return options.default;
      }
    }

    if (this.$$map) {
      if (is(prop) && prop.constructor === Object) {
        throw new Error("Property '".concat(prop, "' is unmappable."));
      }

      var isFunction = is(prop) && prop.constructor === Function;

      if (is(prop) && isFunction) {
        return {
          func: prop
        };
      }

      if (is(prop) && !isFunction) {
        return {
          assign: prop
        };
      }

      if (isnt(prop)) {
        return {
          assign: options.default
        };
      }
    }
  }

  var Mark = {
    mixins: [CoordinateTreeUser, DataReceiver],
    inject: ['$$transform', '$$map'],
    props: {
      interpolate: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      __update: function __update() {
        return this.$$coordinateTree._update;
      },
      _interpolate: function _interpolate() {
        // TODO check if interpolation is necessary (i.e. if all parent
        // coordinate transformations are linear)
        return this.interpolate;
      },
      context: function context() {
        return {
          domains: this.$$dataContainer.getDomains(),
          ranges: this.parentBranch.domains,
          parentBranch: this.parentBranch
        };
      }
    },
    methods: {
      parseAesthetic: parseAesthetic,
      parseCoordinate: parseCoordinate,
      parseCoordinateSet: parseCoordinateSet,
      parseGeometry: parseGeometry,
      parsePixelValue: parsePixelValue,
      parseProperty: parseProperty
    },
    mounted: function mounted() {
      this.parseAesthetic.bind(this);
      this.parseCoordinate.bind(this);
      this.parseCoordinateSet.bind(this);
      this.parseGeometry.bind(this);
      this.parsePixelValue.bind(this);
      this.parseProperty.bind(this);
    }
  };

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var $at = require('./_string-at')(true); // 21.1.3.27 String.prototype[@@iterator]()


  require('./_iter-define')(String, 'String', function (iterated) {
    this._t = String(iterated); // target

    this._i = 0; // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return {
      value: undefined,
      done: true
    };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });

  var ctx = require('./_ctx');

  var $export$3 = require('./_export');

  var toObject = require('./_to-object');

  var call = require('./_iter-call');

  var isArrayIter = require('./_is-array-iter');

  var toLength = require('./_to-length');

  var createProperty = require('./_create-property');

  var getIterFn = require('./core.get-iterator-method');

  $export$3($export$3.S + $export$3.F * !require('./_iter-detect')(function (iter) {
  }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike
    /* , mapfn = undefined, thisArg = undefined */
    ) {
      var O = toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = getIterFn(O);
      var length, result, step, iterator;
      if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = toLength(O.length);

        for (result = new C(length); length > index; index++) {
          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }

      result.length = index;
      return result;
    }
  });

  // @@match logic
  require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
    // 21.1.3.11 String.prototype.match(regexp)
    return [function match(regexp) {

      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }, $match];
  });

  var dP$3 = require('./_object-dp').f;

  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = 'name'; // 19.2.4.2 name

  NAME$1 in FProto || require('./_descriptors') && dP$3(FProto, NAME$1, {
    configurable: true,
    get: function get() {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  // 21.2.5.3 get RegExp.prototype.flags()
  if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
    configurable: true,
    get: require('./_flags')
  });

  require('./es6.regexp.flags');

  var anObject$1 = require('./_an-object');

  var $flags$1 = require('./_flags');

  var DESCRIPTORS$1 = require('./_descriptors');

  var TO_STRING = 'toString';
  var $toString = /./[TO_STRING];

  var define = function define(fn) {
    require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
  }; // 21.2.5.14 RegExp.prototype.toString()


  if (require('./_fails')(function () {
    return $toString.call({
      source: 'a',
      flags: 'b'
    }) != '/a/b';
  })) {
    define(function toString() {
      var R = anObject$1(this);
      return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS$1 && R instanceof RegExp ? $flags$1.call(R) : undefined);
    }); // FF44- RegExp#toString has a wrong name
  } else if ($toString.name != TO_STRING) {
    define(function toString() {
      return $toString.call(this);
    });
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var CoordinateTree =
  /*#__PURE__*/
  function () {
    function CoordinateTree() {
      _classCallCheck(this, CoordinateTree);

      this._coordinateTree = null;
      this._branchPaths = {};
      this._update = 1;
    }

    _createClass(CoordinateTree, [{
      key: "setRoot",
      value: function setRoot(coordinateTransformation) {
        this._coordinateTree = new Branch('root', null, coordinateTransformation);
        this._branchPaths['root'] = [];
      }
    }, {
      key: "addBranch",
      value: function addBranch(id, parentID, coordinateTransformation) {
        var parent = this.getBranch(parentID);
        parent.children[id] = new Branch(id, parentID, coordinateTransformation);
        var parentBranchPath = this._branchPaths[parentID];
        this._branchPaths[id] = _toConsumableArray(parentBranchPath).concat([id]);
        this._update++;
      }
    }, {
      key: "getBranch",
      value: function getBranch(id) {
        var branchPath = this._branchPaths[id];
        var currentLocation = this._coordinateTree;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = branchPath[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var branch = _step.value;
            currentLocation = currentLocation.children[branch];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return currentLocation;
      }
    }, {
      key: "updateBranch",
      value: function updateBranch(id, coordinateTransformation) {
        var branch = this.getBranch(id);
        branch.update(coordinateTransformation);
        this._update++;
      }
    }, {
      key: "removeBranch",
      value: function removeBranch(id) {
        var branchPath = this._branchPaths[id];

        if (branchPath) {
          var currentLocation = this._coordinateTree;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = branchPath[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var branchID = _step2.value;
              var childBranch = currentLocation.children[branchID];

              if (childBranch.id === id) {
                delete currentLocation.children[branchID];
                break;
              } else {
                currentLocation = childBranch;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          for (var branchPathID in this._branchPaths) {
            var path = this._branchPaths[branchPathID];

            if (path.includes(id)) {
              delete this._branchPaths[branchPathID];
            }
          }
        }

        this._update++;
      }
    }, {
      key: "getTotalTransformation",
      value: function getTotalTransformation(id) {
        var transformation = function transformation(_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              x = _ref2[0],
              y = _ref2[1];

          var currentLocation = this.getBranch(id);
          var result = currentLocation.transform([x, y]);

          while (currentLocation.parentID) {
            currentLocation = this.getBranch(currentLocation.parentID);
            result = currentLocation.transform(result);
          }

          return result;
        };

        return transformation.bind(this);
      }
    }]);

    return CoordinateTree;
  }();

  var Branch =
  /*#__PURE__*/
  function () {
    function Branch(id, parentID, coordinateTransformation) {
      _classCallCheck(this, Branch);

      this.id = id;
      this.parentID = parentID;
      this.update(coordinateTransformation);
      this.children = {};
    }

    _createClass(Branch, [{
      key: "update",
      value: function update(coordinateTransformation) {
        for (var key in coordinateTransformation) {
          if (key !== 'dataContainer') {
            this[key] = coordinateTransformation[key];
          }
        }
      }
    }]);

    return Branch;
  }();

  function checkValidScale (prop, variableType, scale, availableScales) {
    if (!availableScales.hasOwnProperty(scale)) {
      throw new Error("\n      Prop '".concat(prop, "', variable type '").concat(variableType, "':\n      No scale '").concat(scale, "' found\n    "));
    }
  }

  function updateDomain (domain, scalingOptions) {
    var newDomain = JSON.parse(JSON.stringify(domain));
    var updateDomain = scalingOptions.domain;

    if (updateDomain) {
      if (updateDomain.constructor !== Array && updateDomain.length !== 2) {
        throw new Error('Invalid domain modification');
      }

      if (is$1(updateDomain[0])) {
        newDomain[0] = updateDomain[0];
      }

      if (is$1(updateDomain[1])) {
        newDomain[1] = updateDomain[1];
      }
    }

    return newDomain;
  }

  function is$1(val) {
    return val !== undefined && val !== null;
  }

  function offsetZeroes (func) {
    return function (input) {
      if (input === 0) {
        input = 1e6;
      }

      return func(input);
    };
  }

  var numeric = {
    linear: linear,
    log: log,
    square: square,
    squareRoot: squareRoot
  };

  function linear(domain, range) {
    return d3.scaleLinear().domain(domain).range(range);
  }

  function log(domain, range) {
    var domainCopy = JSON.parse(JSON.stringify(domain));

    if (domainCopy[0] === 0) {
      domainCopy[0] += 1e-6;
    }

    var scale = d3.scaleLog().domain(domainCopy).range(range);
    return offsetZeroes(scale);
  }

  function square(domain, range) {
    var scale = d3.scalePow().exponent(2).domain(domain).range(range);
    return scale;
  }

  function squareRoot(domain, range) {
    var scale = d3.scalePow().exponent(1 / 2).domain(domain).range(range);
    return scale;
  }

  var temporal = {
    temporal: temporal$1
  };

  function temporal$1(domain, range) {
    return d3.scaleTime().domain(domain).nice().range(range);
  }

  var categorical = {
    equidistant: equidistant // TODO better name

  };

  function equidistant(domain, range) {
    var padStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var padEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var deltaRange = range[1] - range[0];
    var paddedRange = deltaRange - padStart - padEnd;
    var sections = domain.length;
    var sectionLength = paddedRange / sections;
    var mapping = {};
    var i = 0;
    domain.forEach(function (entry) {
      mapping[entry] = range[0] + padStart + i * sectionLength + sectionLength / 2;
      i++;
    });
    return function (x) {
      return mapping[x];
    };
  }

  function createCoordsScale (prop, variableType, domain, range, scalingOptions) {
    if (variableType === 'quantitative') {
      var scale = scalingOptions.scale || 'linear';
      checkValidScale(prop, variableType, scale, numeric);
      return numeric[scale](updateDomain(domain, scalingOptions), range);
    }

    if (variableType === 'temporal') {
      var _scale = scalingOptions.scale || 'temporal';

      checkValidScale(prop, variableType, _scale, temporal);
      return temporal[_scale](domain, range);
    }

    if (variableType === 'categorical') {
      var _scale2 = scalingOptions.scale || 'equidistant';

      checkValidScale(prop, variableType, _scale2, categorical);
      return categorical[_scale2](domain, range);
    }
  }

  function getDataType (value) {
    switch (value.constructor) {
      case Number:
        return 'quantitative';

      case String:
        return 'categorical';

      case Date:
        return 'temporal';

      case Array:
        return 'nested';

      default:
        throw new Error('Invalid data');
    }
  }

  function parseDomain (domainSpecification, variableDomains) {
    var domain;
    var domainType;

    if (![Array, String].includes(domainSpecification.constructor)) {
      throw new Error('Invalid domain specification: only Array or String allowed');
    }

    if (domainSpecification.constructor === Array) {
      checkValidDomainArray(domainSpecification);
      domainType = getDataType(domainSpecification[0]);
      domain = domainSpecification;
    } else {
      if (variableDomains) {
        if (domainSpecification.constructor === String) {
          if (!variableDomains[domainSpecification]) {
            throw new Error("Invalid domain specification: variable does not exist");
          }

          domain = variableDomains[domainSpecification];
          domainType = getDataType(domain[0]);
        }
      } else {
        domain = [0, 1]; // placeholder until real data is available

        domainType = 'quantitative';
      }
    }

    return [domain, domainType];
  }

  function checkValidDomainArray(array) {
    if (array.length < 2) {
      throw new Error('Invalid domain specification array: length shorter than 2');
    }

    var invalid = false;

    if (array[0].constructor === Number) {
      if (array[1].constructor !== Number || array.length !== 2) {
        invalid = true;
      }
    } else if (array[0].constructor === String) {
      for (var i = 1; i < array.length; i++) {
        if (array[i].constructor !== String) {
          invalid = true;
          break;
        }
      }
    } else if (array[0].constructor === Date) {
      for (var _i = 1; _i < array.length; _i++) {
        if (array[_i].constructor !== Date) {
          invalid = true;
          break;
        }
      }
    }

    if (invalid) {
      throw new Error('Invalid domain specification array');
    }
  }

  function parseScale (scaleSpecification) {
    var scaleTypeX;
    var scaleTypeY;

    if (scaleSpecification === undefined) {
      return [{}, {}];
    }

    if (scaleSpecification.constructor === String) {
      scaleTypeX = {
        scale: scaleSpecification
      };
      scaleTypeY = {
        scale: scaleSpecification
      };
    } else if (scaleSpecification.constructor === Object) {
      if (scaleSpecification.hasOwnProperty('x')) {
        if (scaleSpecification.x.constructor === String) {
          scaleTypeX = {
            scale: scaleSpecification.x
          };
        } else if (scaleSpecification.x.constructor === Object) {
          scaleTypeX = scaleSpecification.x;
        } else {
          throw new Error('Scale specification x must be String or Object');
        }
      } else {
        scaleTypeX = {};
      }

      if (scaleSpecification.hasOwnProperty('y')) {
        if (scaleSpecification.y.constructor === String) {
          scaleTypeY = {
            scale: scaleSpecification.y
          };
        } else if (scaleSpecification.y.constructor === Object) {
          scaleTypeY = scaleSpecification.y;
        } else {
          throw new Error('Scale specification y must be String or Object');
        }
      } else {
        scaleTypeY = {};
      }
    } else {
      throw new Error('Scale specification must be String or Object');
    }

    return [scaleTypeX, scaleTypeY];
  }

  var CoordinateTransformation = function CoordinateTransformation(options) {
    var _this = this;

    _classCallCheck(this, CoordinateTransformation);

    var domainSpecifications = options.domains;
    var ranges = options.ranges;
    var variableDomains;

    if (options.dataContainer) {
      variableDomains = options.dataContainer.getDomains();
    } // Check for validity, and fetch variable domains from dataContainer if necessary


    var _parseDomain = parseDomain(domainSpecifications.x, variableDomains),
        _parseDomain2 = _slicedToArray(_parseDomain, 2),
        domainX = _parseDomain2[0],
        domainXType = _parseDomain2[1];

    var _parseDomain3 = parseDomain(domainSpecifications.y, variableDomains),
        _parseDomain4 = _slicedToArray(_parseDomain3, 2),
        domainY = _parseDomain4[0],
        domainYType = _parseDomain4[1];

    var _parseScale = parseScale(options.scale),
        _parseScale2 = _slicedToArray(_parseScale, 2),
        scaleOptionsX = _parseScale2[0],
        scaleOptionsY = _parseScale2[1]; // Store domains and ranges


    this.domainTypes = {
      x: domainXType,
      y: domainYType // If we have a categorical or temporal domain: set ranges as domains

    };
    this.domains = {};

    if (['categorical', 'temporal'].includes(this.domainTypes.x)) {
      this.domains.x = ranges.x;
    } else {
      this.domains.x = domainX;
    }

    if (['categorical', 'temporal'].includes(this.domainTypes.y)) {
      this.domains.y = ranges.y;
    } else {
      this.domains.y = domainY;
    }

    this.ranges = ranges;
    this.scaleX = createCoordsScale('x', domainXType, domainX, ranges.x, scaleOptionsX);
    this.scaleY = createCoordsScale('y', domainYType, domainY, ranges.y, scaleOptionsY); // We will wrap the scaling functions in this 'get' function.
    // For categorical and temporal domains, we don't need to apply the scaling,
    // since we've already done this when the prop was passed (see Mark.js,
    // parseCoord function). This is because we need to support nested Sections,
    // where the parent is for example categorical but the child is numeric. It
    // is also necessary to properly interpolate in the interpolatePath function
    // (you cannot interpolate between 'A' and 'B'). So for these components,
    // we already need to know the converted (numeric) value before the transform
    // function is used.

    this.getX = function (x) {
      if (['categorical', 'temporal'].includes(_this.domainTypes.x)) {
        return x;
      } else {
        return _this.scaleX(x);
      }
    };

    this.getY = function (y) {
      if (['categorical', 'temporal'].includes(_this.domainTypes.y)) {
        return y;
      } else {
        return _this.scaleY(y);
      }
    };

    if (options.type === 'scale') {
      this.transform = function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return [_this.getX(x), _this.getY(y)];
      };
    }

    if (options.type === 'polar') {
      var toTheta = createCoordsScale('x', 'quantitative', ranges.x, [0, 2 * Math.PI], {});
      var toRadius = createCoordsScale('y', 'quantitative', ranges.y, [0, 1], {});
      var toRangeX = createCoordsScale('x', 'quantitative', [-1, 1], ranges.x, {});
      var toRangeY = createCoordsScale('y', 'quantitative', [-1, 1], ranges.y, {});

      this.transform = function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        var scaledX = _this.getX(x);

        var scaledY = _this.getY(y);

        var theta = toTheta(scaledX);
        var radius = toRadius(scaledY);
        var cartesian = polarToCartesian(theta, radius);
        return [toRangeX(cartesian[0]), toRangeY(cartesian[1])];
      };
    }
  };

  function polarToCartesian(theta, r) {
    var x = r * Math.sin(theta);
    var y = r * Math.cos(theta);
    return [x, y];
  }

  var CoordinateSystem = {
    props: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      flip: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        ready: false,
        coordinateTree: new CoordinateTree()
      };
    },
    mounted: function mounted() {
      this.setCoordinateTreeRoot();
      this.ready = true;
    },
    methods: {
      setCoordinateTreeRoot: function setCoordinateTreeRoot() {
        var domains = {
          x: [0, this.width],
          y: [0, this.height]
        };
        var ranges = {
          x: [0, this.width],
          y: [0, this.height]
        };

        if (this.flip) {
          ranges.y = [this.height, 0];
        }

        var transformation = new CoordinateTransformation({
          type: 'scale',
          scale: 'linear',
          domains: domains,
          ranges: ranges
        });
        this.coordinateTree.setRoot(transformation);
      }
    },
    provide: function provide() {
      var $$coordinateTree = this.coordinateTree;
      var $$transform = this.coordinateTree.getTotalTransformation('root');
      var $$coordinateTreeParent = 'root';
      return {
        $$coordinateTree: $$coordinateTree,
        $$transform: $$transform,
        $$coordinateTreeParent: $$coordinateTreeParent,
        $$map: false
      };
    }
  };

  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

  var $export$4 = require('./_export');

  var toLength$1 = require('./_to-length');

  var context$1 = require('./_string-context');

  var ENDS_WITH = 'endsWith';
  var $endsWith = ''[ENDS_WITH];
  $export$4($export$4.P + $export$4.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
    endsWith: function endsWith(searchString
    /* , endPosition = @length */
    ) {
      var that = context$1(this, searchString, ENDS_WITH);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = toLength$1(that.length);
      var end = endPosition === undefined ? len : Math.min(toLength$1(endPosition), len);
      var search = String(searchString);
      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }
  });

  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])

  var $export$5 = require('./_export');

  var toLength$2 = require('./_to-length');

  var context$2 = require('./_string-context');

  var STARTS_WITH = 'startsWith';
  var $startsWith = ''[STARTS_WITH];
  $export$5($export$5.P + $export$5.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString
    /* , position = 0 */
    ) {
      var that = context$2(this, searchString, STARTS_WITH);
      var index = toLength$2(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }
  });

  function adjustToAnchorPoint(_ref, width, height, oldAnchorPoint, newAnchorPoint) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    // In this particular case we don't need to do anything
    if (oldAnchorPoint === newAnchorPoint) {
      return [x, y];
    } // In all other cases:
    // First we will convert the defaultAnchorPoint to a 'centered' anchor point


    var centered = [];

    if (oldAnchorPoint === 'center') {
      centered = [x, y];
    } else {
      centered[0] = oldAnchorPoint.startsWith('l') ? x - width / 2 : x + width / 2;
      centered[1] = oldAnchorPoint.endsWith('b') ? y + height / 2 : y - height / 2;
    } // Second, we convert the centered anchor point to the new anchor point


    if (newAnchorPoint === 'center') {
      return centered;
    } else {
      var _centered = centered,
          _centered2 = _slicedToArray(_centered, 2),
          cx = _centered2[0],
          cy = _centered2[1];

      var translated = [];
      translated[0] = newAnchorPoint.startsWith('l') ? cx + width / 2 : cx - width / 2;
      translated[1] = newAnchorPoint.endsWith('b') ? cy - height / 2 : cy + height / 2;
      return translated;
    }
  }
  function textAnchorPoint(anchorPoint) {
    // For setting the anchor point on a SVG text element
    switch (anchorPoint) {
      case 'center':
        return {
          textAnchor: 'middle',
          dominantBaseline: 'middle'
        };

      case 'lb':
        return {
          textAnchor: 'start',
          dominantBaseline: 'alphabetic'
        };

      case 'lt':
        return {
          textAnchor: 'start',
          dominantBaseline: 'hanging'
        };

      case 'rt':
        return {
          textAnchor: 'end',
          dominantBaseline: 'hanging'
        };

      case 'rb':
        return {
          textAnchor: 'end',
          dominantBaseline: 'alphabetic'
        };

      case 'l':
        return {
          textAnchor: 'start',
          dominantBaseline: 'middle'
        };

      case 'r':
        return {
          textAnchor: 'end',
          dominantBaseline: 'middle'
        };

      case 'b':
        return {
          textAnchor: 'middle',
          dominantBaseline: 'alphabetic'
        };

      case 't':
        return {
          textAnchor: 'middle',
          dominantBaseline: 'hanging'
        };
    }
  }

  var script = {
    mixins: [Mark, CoordinateSystem],
    props: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      anchorPoint: {
        type: String,
        default: 'center',
        validator: function validator(p) {
          return ['center', 'lb', 'lt', 'rt', 'rb'].includes(p);
        }
      }
    },
    computed: {
      transformedXY: function transformedXY() {
        if (this.__update) {
          return this.$$transform([this.x, this.y]);
        }
      },
      anchorPointAdjustedXY: function anchorPointAdjustedXY() {
        var xy = this.transformedXY;
        return adjustToAnchorPoint(xy, this.width, this.height, 'lt', this.anchorPoint);
      },
      translate: function translate() {
        var _this$anchorPointAdju = _slicedToArray(this.anchorPointAdjustedXY, 2),
            x = _this$anchorPointAdju[0],
            y = _this$anchorPointAdju[1];

        return "translate(".concat(x, ", ").concat(y, ")");
      }
    }
  };

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.ready ? _c('g', {
      attrs: {
        "transform": _vm.translate
      }
    }, [_vm._t("default")], 2) : _vm._e();
  };

  var __vue_staticRenderFns__ = [];
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* component normalizer */

  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Glyph.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Glyph = __vue_normalize__({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

  // 19.1.2.14 Object.keys(O)
  var toObject$1 = require('./_to-object');

  var $keys$1 = require('./_object-keys');

  require('./_object-sap')('keys', function () {
    return function keys(it) {
      return $keys$1(toObject$1(it));
    };
  });

  var numeric$1 = {
    brownBlue: brownBlue,
    purpleGreen: purpleGreen,
    pinkGreen: pinkGreen,
    purpleOrange: purpleOrange,
    redBlue: redBlue,
    redGray: redGray,
    redYellowBlue: redYellowBlue,
    redYellowGreen: redYellowGreen,
    spectral: spectral,
    blues: blues,
    greens: greens,
    greys: greys,
    oranges: oranges,
    purples: purples,
    reds: reds,
    viridis: viridis,
    inferno: inferno,
    magma: magma,
    plasma: plasma,
    warm: warm,
    cool: cool,
    cubehelixDefault: cubehelixDefault,
    rainbow: rainbow,
    sinebow: sinebow // Diverging

  };

  function brownBlue(domain) {
    return d3.scaleDiverging(d3$1.interpolateBrBG).domain(domain);
  }

  function purpleGreen(domain) {
    return d3.scaleDiverging(d3$1.interpolatePRGn).domain(domain);
  }

  function pinkGreen(domain) {
    return d3.scaleDiverging(d3$1.interpolatePiYG).domain(domain);
  }

  function purpleOrange(domain) {
    return d3.scaleDiverging(d3$1.interpolatePuOr).domain(domain);
  }

  function redBlue(domain) {
    return d3.scaleDiverging(d3$1.interpolateRdBu).domain(domain);
  }

  function redGray(domain) {
    return d3.scaleDiverging(d3$1.interpolateRdGy).domain(domain);
  }

  function redYellowBlue(domain) {
    return d3.scaleDiverging(d3$1.interpolateRdYlBu).domain(domain);
  }

  function redYellowGreen(domain) {
    return d3.scaleDiverging(d3$1.interpolateRdYlGn).domain(domain);
  }

  function spectral(domain) {
    return d3.scaleDiverging(d3$1.interpolateSpectral).domain(domain);
  } // Sequential


  function blues(domain) {
    return d3.scaleSequential(d3$1.interpolateBlues).domain(domain);
  }

  function greens(domain) {
    return d3.scaleSequential(d3$1.interpolateGreens).domain(domain);
  }

  function greys(domain) {
    return d3.scaleSequential(d3$1.interpolateGreys).domain(domain);
  }

  function oranges(domain) {
    return d3.scaleSequential(d3$1.interpolateOranges).domain(domain);
  }

  function purples(domain) {
    return d3.scaleSequential(d3$1.interpolatePurples).domain(domain);
  }

  function reds(domain) {
    return d3.scaleSequential(d3$1.interpolateReds).domain(domain);
  } // Sequential - Multi-Hue


  function viridis(domain) {
    return d3.scaleSequential(d3$1.interpolateViridis).domain(domain);
  }

  function inferno(domain) {
    return d3.scaleSequential(d3$1.interpolateInferno).domain(domain);
  }

  function magma(domain) {
    return d3.scaleSequential(d3$1.interpolateMagma).domain(domain);
  }

  function plasma(domain) {
    return d3.scaleSequential(d3$1.interpolatePlasma).domain(domain);
  }

  function warm(domain) {
    return d3.scaleSequential(d3$1.interpolateWarm).domain(domain);
  }

  function cool(domain) {
    return d3.scaleSequential(d3$1.interpolateCool).domain(domain);
  }

  function cubehelixDefault(domain) {
    return d3.scaleSequential(d3$1.interpolateCubehelixDefault).domain(domain);
  } // Cyclical


  function rainbow(domain) {
    return d3.scaleSequential(d3$1.interpolateRainbow).domain(domain);
  }

  function sinebow(domain) {
    return d3.scaleSequential(d3$1.interpolateSinebow).domain(domain);
  }

  var categorical$1 = {
    colors: colors
  };

  function colors(domain, range) {
    return d3.scaleOrdinal().domain(domain).range(range);
  }

  function createColorScale (prop, variableType, domain, scalingOptions) {
    if (variableType === 'quantitative') {
      var scale = scalingOptions.scale || 'blues';
      checkValidScale(prop, variableType, scale, numeric$1);
      return numeric$1[scale](updateDomain(domain, scalingOptions));
    }

    if (variableType === 'categorical') {
      var _scale = scalingOptions.scale || 'colors';

      checkValidScale(prop, variableType, _scale, categorical$1);
      return categorical$1[_scale](domain);
    }
  }

  var numeric$2 = {
    linear: function linear(domain) {
      return d3.scaleLinear().domain(domain).range([0, 1]);
    }
  };

  function createOpacityScale (prop, variableType, domain, scalingOptions) {
    if (variableType === 'quantitative') {
      var scale = scalingOptions.scale || 'linear';
      checkValidScale(prop, variableType, scale, numeric$2);
      return numeric$2[scale](updateDomain(domain, scalingOptions));
    }
  }

  function getDimension (prop) {
    if (['x', 'x1', 'x2', 'w'].includes(prop)) {
      return 'x';
    }

    if (['y', 'y1', 'y2', 'h'].includes(prop)) {
      return 'y';
    }
  }

  function createScale (prop, context, scalingOptions) {
    var domain = context.domains[scalingOptions.variable];
    var variableType = getDataType(domain[0]);

    if (['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(prop)) {
      var dimension = getDimension(prop);
      var range = context.ranges[dimension];
      return createCoordsScale(prop, variableType, domain, range, scalingOptions);
    }

    if (prop === 'color') {
      return createColorScale(prop, variableType, domain, scalingOptions);
    }

    if (prop === 'opacity') {
      return createOpacityScale(prop, variableType, domain, scalingOptions);
    }
  }

  var $export$6 = require('./_export');

  var aFunction = require('./_a-function');

  var toObject$2 = require('./_to-object');

  var fails$1 = require('./_fails');

  var $sort = [].sort;
  var test = [1, 2, 3];
  $export$6($export$6.P + $export$6.F * (fails$1(function () {
    // IE8-
    test.sort(undefined);
  }) || !fails$1(function () {
    // V8 bug
    test.sort(null); // Old WebKit
  }) || !require('./_strict-method')($sort)), 'Array', {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined ? $sort.call(toObject$2(this)) : $sort.call(toObject$2(this), aFunction(comparefn));
    }
  });

  var wh = {
    bulge: bulge
  };

  function bulge(prop, range, positioningSettings) {
    return function (propsPerMark) {
      var basedOn = positioningSettings.basedOn || guessBasedOn(prop, propsPerMark[0]);
      var padding = positioningSettings.padding || 0; // Sort ascending

      var coordsSorted = propsPerMark.map(function (props, ix) {
        return [props[basedOn], ix];
      }).sort(function (a, b) {
        return a[0] > b[0];
      });
      var len = coordsSorted.length;

      for (var i = 0; i < len; ++i) {
        var center = coordsSorted[i][0];
        var dLeft = void 0; // distance to nearest mark on the left

        var dRight = void 0; // distance to nearest mark on the right

        if (i === 0) {
          dLeft = Math.abs(center - range[0]);
        } else {
          dLeft = Math.abs(center - coordsSorted[i - 1][0]) / 2;
        }

        if (i === len - 1) {
          dRight = Math.abs(center - range[1]);
        } else {
          dRight = Math.abs(center - coordsSorted[i + 1][0]) / 2;
        }

        dLeft -= padding;
        dRight -= padding;
        var value = Math.min(dLeft, dRight) * 2;
        var originalIndex = coordsSorted[i][1];
        propsPerMark[originalIndex][prop] = value;
      }
    };
  }

  function guessBasedOn(prop, firstRow) {
    if (prop === 'w') {
      if (firstRow.hasOwnProperty('x1')) {
        return 'x1';
      }

      if (firstRow.hasOwnProperty('x2')) {
        return 'x2';
      }

      if (firstRow.hasOwnProperty('x')) {
        return 'x';
      }
    }

    if (prop === 'h') {
      if (firstRow.hasOwnProperty('y1')) {
        return 'y1';
      }

      if (firstRow.hasOwnProperty('y2')) {
        return 'y2';
      }

      if (firstRow.hasOwnProperty('y')) {
        return 'y';
      }
    }
  }

  function createPositioner (prop, context, positioningSettings) {
    if (['w', 'h'].includes(prop)) {
      var positioner = positioningSettings.positioner;
      var dimension = positioningSettings.dimension || prop === 'w' ? 'x' : 'y';
      var range = context.ranges[dimension];
      return wh[positioner](prop, range, positioningSettings);
    }
  }

  function mapAesthetics (aesthetics, context, dataContainer) {
    var assigners = {};
    var scales = {};
    var funcs = {};
    var positioners = {}; // First, extract the assigners, scales, getter-funcs and positioners

    for (var aesKey in aesthetics) {
      var passedProp = aesthetics[aesKey];

      if (passedProp.hasOwnProperty('assign') && is(passedProp.assign)) {
        assigners[aesKey] = passedProp.assign;
      }

      if (passedProp.hasOwnProperty('scale')) {
        scales[aesKey] = passedProp.scale;
      }

      if (passedProp.hasOwnProperty('func')) {
        funcs[aesKey] = passedProp.func;
      }

      if (passedProp.hasOwnProperty('position')) {
        positioners[aesKey] = passedProp.position;
      }
    } // Second, we will parse the scales


    var parsedScales = {};

    for (var _aesKey in scales) {
      var scalingOptions = scales[_aesKey]; // The scale can be specified in three ways:
      // 1. Set the scale with a shorthand with the default settings
      // 2. Set the scale with a shorthand with custom settings
      // 3. Set the scale by constructing your own scale
      // 1. Set the scale with a shorthand with the default settings.
      // Here we just need the string id of the variable we want to scale

      if (scalingOptions.constructor === String) {
        parsedScales[_aesKey] = createScale(_aesKey, context, {
          variable: scalingOptions
        });
      }

      if (scalingOptions.constructor === Object) {
        // 2. Set the scale with a shorthand with custom settings
        // In this case we need an object with options with at least a 'variable' key.
        if (!scalingOptions.construct) {
          parsedScales[_aesKey] = createScale(_aesKey, context, scalingOptions);
        } // 3. Set the scale by constructing your own scale
        // In this case we need a 'construct' function. 'variable' key is optional.


        if (scalingOptions.construct) {
          parsedScales[_aesKey] = scalingOptions.construct(context);
        }
      }
    } // Third, we apply the scales, functions and assigners and calculate props for each mark


    var aestheticsPerMark = [];
    dataContainer.forEachRow(function (row, i) {
      var props = {};

      for (var _aesKey2 in aesthetics) {
        // If a scale has been specified for this aesthetic:
        if (is(scales[_aesKey2])) {
          // If the scale was specified a string, it is assumed to be the
          // identifier of a variable (see above).
          if (scales[_aesKey2].constructor === String) {
            var variable = scales[_aesKey2];
            props[_aesKey2] = parsedScales[_aesKey2](row[variable]);
          } // If the scale was specified as an object:


          if (scales[_aesKey2].constructor === Object) {
            // If scales[key].variable is specified, it will be used
            // as the identifier of a variable.
            if (scales[_aesKey2].hasOwnProperty('variable')) {
              var _variable = scales[_aesKey2].variable;
              props[_aesKey2] = parsedScales[_aesKey2](row[_variable]);
            } else {
              // If scales[key].variable is not specified, we will pass the
              // entire row to the mapping function instead of just the value for
              // that variable in that row.
              props[_aesKey2] = parsedScales[_aesKey2](row);
            }
          }
        } else if (is(funcs[_aesKey2])) {
          // If a function was used instead of a scale object:
          // We pass it the entire row, the row index and the context object
          var value = funcs[_aesKey2](row, i, context); // If the value is categorical or temporal, and a coord,
          // we have to convert it to numeric


          var dimension = getDimension(_aesKey2);

          if (dimension && [String, Date].includes(value.constructor)) {
            props[_aesKey2] = convertToNumeric(value, dimension, context.parentBranch);
          } else {
            props[_aesKey2] = value;
          }
        } else if (is(assigners[_aesKey2])) {
          // Finally, if there were no scales or getter functions specified,
          // we will assign a constant value if necessary.
          props[_aesKey2] = assigners[_aesKey2];
        }
      }

      aestheticsPerMark.push(props);
    }); // Fourth, we will apply positioning if necessary

    if (Object.keys(positioners).length > 0) {
      for (var _aesKey3 in positioners) {
        var positioningOptions = positioners[_aesKey3];

        if (positioningOptions.constructor !== Array) {
          var position = void 0;

          if (positioningOptions.constructor === String) {
            position = createPositioner(_aesKey3, context, {
              positioner: positioningOptions
            });
          }

          if (positioningOptions.constructor === Object) {
            position = createPositioner(_aesKey3, context, positioningOptions);
          }

          position(aestheticsPerMark); // Positioners work in-place
        } // Positioners can be chained by passing an array of positioningOptions-objects


        if (positioningOptions.constructor === Array) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = positioningOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var chainedOptions = _step.value;

              var _position = void 0;

              if (chainedOptions.constructor === String) {
                _position = createPositioner(_aesKey3, context, {
                  positioner: chainedOptions
                });
              }

              if (chainedOptions.constructor === Object) {
                _position = createPositioner(_aesKey3, context, chainedOptions);
              }

              _position(aestheticsPerMark); // Positioners work in-place

            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }

    return aestheticsPerMark;
  }

  var script$1 = {
    mixins: [Mark],
    props: {
      // Mappable
      x: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      // Non-mappable
      width: {
        type: Number,
        default: 10
      },
      height: {
        type: Number,
        default: 10
      },
      anchorPoint: {
        type: String,
        default: 'center',
        validator: function validator(p) {
          return ['center', 'lb', 'lt', 'rt', 'rb'].includes(p);
        }
      }
    },
    computed: {
      aesthetics: function aesthetics() {
        return {
          x: this.parseCoordinate(this.x, {
            dimension: 'x'
          }),
          y: this.parseCoordinate(this.y, {
            dimension: 'y'
          }),
          width: this.parseProperty(this.width, {
            default: 10
          }),
          height: this.parseProperty(this.height, {
            default: 10
          }),
          anchorPoint: this.parseProperty(this.anchorPoint, {
            default: 'center'
          })
        };
      }
    },
    methods: {
      renderGlyph: function renderGlyph(createElement, aesthetics) {
        return createElement(Glyph, {
          props: aesthetics
        }, this.$slots.default);
      }
    },
    render: function render(createElement) {
      if (!this.$$map) {
        return this.renderGlyph(createElement, this.aesthetics);
      }

      if (this.$$map) {
        var aestheticsPerGlyph = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

        var glyphs = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = aestheticsPerGlyph[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var aesthetics = _step.value;
            glyphs.push(this.renderGlyph(createElement, aesthetics));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return createElement('g', glyphs);
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = undefined;
  /* component normalizer */

  function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "GlyphWrapper.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Glyph$1 = __vue_normalize__$1({}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

  var strong = require('./_collection-strong');

  var validate = require('./_validate-collection');

  var SET = 'Set'; // 23.2 Set Objects

  module.exports = require('./_collection')(SET, function (get) {
    return function Set() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value) {
      return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
    }
  }, strong);

  function initDomains(firstRow) {
    var domainPerVariable = {};

    for (var variableKey in firstRow) {
      var variableType = getDataType(firstRow[variableKey]);

      if (variableType === 'quantitative') {
        domainPerVariable[variableKey] = [Infinity, -Infinity];
      }

      if (variableType === 'categorical') {
        domainPerVariable[variableKey] = [];
      }

      if (variableType === 'temporal') {
        // https://en.wikipedia.org/wiki/Unix_time
        domainPerVariable[variableKey] = [new Date('19 January 2038'), new Date(0)];
      } // if (variableType === 'nested') {} // TODO

    }

    return domainPerVariable;
  }
  function updateDomains(row, currentDomains) {
    for (var variableKey in row) {
      var value = row[variableKey];
      var variableType = getDataType(value);
      var domain = currentDomains[variableKey];

      if (variableType === 'quantitative') {
        if (domain[0] >= value) {
          domain[0] = value;
        }

        if (domain[1] <= value) {
          domain[1] = value;
        }
      }

      if (variableType === 'categorical') {
        if (!domain.includes(value)) {
          domain.push(value);
        }
      }

      if (variableType === 'temporal') {
        var epoch = value.getTime();

        if (domain[0].getTime() >= epoch) {
          domain[0] = value;
        }

        if (domain[1].getTime() <= epoch) {
          domain[1] = value;
        }
      } // if (variableType === 'nested') {} // TODO

    }

    return currentDomains;
  }

  // const variableTypes = ['quantitative', 'temporal', 'categorical']

  var _default =
  /*#__PURE__*/
  function () {
    function _default(data, type) {
      _classCallCheck(this, _default);

      this._dataset = [];
      this._domains = {};

      if (!type) {
        // If no type is provided, we will assume it's a dataFrame
        this.setDataFrame(data);
      }

      if (type) {
        switch (type) {
          case 'dataFrame':
            {
              this.setDataFrame(data);
              break;
            }

          case 'geojson':
            {
              this.setGeoJSON(data);
              break;
            }

          default:
            throw new Error('Unknown type!');
        }
      }
    }

    _createClass(_default, [{
      key: "setDataFrame",
      value: function setDataFrame(data) {
        if (data.constructor !== Array) {
          throw new Error('Data of type dataFrame must be passed as an array');
        } // Initialize domain object


        var firstRow = data[0];
        var domainPerVariable = initDomains(firstRow); // Find domains

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var row = _step.value;
            checkRowFormat(row, firstRow);
            domainPerVariable = updateDomains(row, domainPerVariable);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this._dataset = data;
        this._domains = domainPerVariable;
      }
    }, {
      key: "setGeoJSON",
      value: function setGeoJSON(data) {
        if (data.constructor !== Object) {
          throw new Error('Data of type geojson must be passed as an object');
        } // TODO

      }
    }, {
      key: "getDataset",
      value: function getDataset() {
        return this._dataset;
      }
    }, {
      key: "getVariableData",
      value: function getVariableData(variable) {
        var result = [];
        var data = this._dataset;

        for (var row in data) {
          result.push(data[row][variable]);
        }

        return result;
      }
    }, {
      key: "hasVariable",
      value: function hasVariable(variable) {
        return this._domains.hasOwnProperty(variable);
      }
    }, {
      key: "getDomain",
      value: function getDomain(variable) {
        return this._domains[variable];
      }
    }, {
      key: "getDomains",
      value: function getDomains() {
        return this._domains;
      }
    }, {
      key: "forEachRow",
      value: function forEachRow(callback) {
        this._dataset.forEach(function (row, index) {
          callback(row, index);
        });
      }
    }]);

    return _default;
  }(); ///           ///

  function checkRowFormat(row, firstRow) {
    // Check if it is an array of objects
    if (row.constructor !== Object) {
      throw new Error('Data array must contain only objects');
    } // Check if all have the same keys using first row


    if (!objectsHaveSameKeys(row, firstRow)) {
      throw new Error('All objects in data array must have same keys');
    }
  }

  function objectsHaveSameKeys() {
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    var allKeys = objects.reduce(function (keys, object) {
      return keys.concat(Object.keys(object));
    }, []);
    var union = new Set(allKeys);
    return objects.every(function (object) {
      return union.size === Object.keys(object).length;
    });
  }

  var DataProvider = {
    props: {
      data: {
        type: [Array, Object, undefined],
        default: undefined
      },
      dataType: {
        type: [String, undefined],
        default: undefined
      }
    },
    computed: {
      dataContainer: function dataContainer() {
        if (this.data) {
          return new _default(this.data, this.dataType);
        }
      }
    },
    provide: function provide() {
      var $$dataContainerContext = this;
      return {
        $$dataContainerContext: $$dataContainerContext
      };
    }
  };

  //
  var script$2 = {
    mixins: [CoordinateSystem, DataProvider]
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.ready ? _c('svg', {
      attrs: {
        "width": _vm.width,
        "height": _vm.height
      }
    }, [_vm._t("default")], 2) : _vm._e();
  };

  var __vue_staticRenderFns__$1 = [];
  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* component normalizer */

  function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Graphic.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Graphic = __vue_normalize__$2({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

  var DataValve = {
    inject: ['$$dataContainerContext'],
    props: {
      data: {
        type: [Array, Object, undefined],
        default: undefined
      },
      dataType: {
        type: [Object, undefined],
        default: undefined
      }
    },
    computed: {
      $$dataContainer: function $$dataContainer() {
        return this.$$dataContainerContext.dataContainer;
      },
      dataContainer: function dataContainer() {
        if (this.data) {
          return new _default(this.data, this.dataType);
        }
      }
    },
    provide: function provide() {
      if (this.dataContainer) {
        var $$dataContainerContext = this;
        return {
          $$dataContainerContext: $$dataContainerContext
        };
      }
    }
  };

  //
  var script$3 = {
    mixins: [DataValve],
    provide: function provide() {
      return {
        $$map: true
      };
    }
  };

  /* script */
  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.$$dataContainer || _vm.dataContainer ? _c('g', [_vm._t("default")], 2) : _vm._e();
  };

  var __vue_staticRenderFns__$2 = [];
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* component normalizer */

  function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Map.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Map = __vue_normalize__$3({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

  function id () {
    return '_' + Math.random().toString();
  }

  //
  var script$4 = {
    mixins: [CoordinateTreeUser, DataReceiver],
    props: {
      type: {
        type: String,
        default: 'scale'
      },
      domains: {
        type: [Object, undefined],
        default: undefined
      },
      ranges: {
        type: Object,
        required: true
      },
      scale: {
        type: [String, Object, undefined],
        default: undefined
      }
    },
    data: function data() {
      return {
        ready: false,
        id: id()
      };
    },
    computed: {
      _domains: function _domains() {
        if (this.domains) {
          var domains = {};

          if (this.domains.hasOwnProperty('x')) {
            domains.x = this.domains.x;
          } else {
            domains.x = this.ranges.x;
          }

          if (this.domains.hasOwnProperty('y')) {
            domains.y = this.domains.y;
          } else {
            domains.y = this.ranges.y;
          }

          return domains;
        }

        if (!this.domains) {
          return this.ranges;
        }
      },
      allowDomains: function allowDomains() {
        var xNotArray = this._domains.x.constructor !== Array;
        var yNotArray = this._domains.y.constructor !== Array;

        if (!this.$$dataContainer && (xNotArray || yNotArray)) {
          return false;
        } else {
          return true;
        }
      }
    },
    watch: {
      type: 'updateCoordinateTreeBranch',
      domains: 'updateCoordinateTreeBranch',
      ranges: 'updateCoordinateTreeBranch',
      scale: 'updateCoordinateTreeBranch'
    },
    beforeDestroy: function beforeDestroy() {
      this.$$coordinateTree.removeBranch(this.id);
    },
    mounted: function mounted() {
      this.setCoordinateTreeBranch();
      this.ready = true;
    },
    methods: {
      setCoordinateTreeBranch: function setCoordinateTreeBranch() {
        var transformation = new CoordinateTransformation({
          type: this.type,
          domains: this._domains,
          ranges: this.ranges,
          scale: this.scale,
          dataContainer: this.$$dataContainer
        });
        this.$$coordinateTree.addBranch(this.id, this.$$coordinateTreeParent, transformation);
      },
      updateCoordinateTreeBranch: function updateCoordinateTreeBranch() {
        var transformation = new CoordinateTransformation({
          type: this.type,
          domains: this._domains,
          ranges: this.ranges,
          scale: this.scale,
          dataContainer: this.$$dataContainer
        });
        this.$$coordinateTree.updateBranch(this.id, transformation);
      }
    },
    provide: function provide() {
      var $$transform = this.$$coordinateTree.getTotalTransformation(this.id);
      var $$coordinateTreeParent = this.id;
      return {
        $$transform: $$transform,
        $$coordinateTreeParent: $$coordinateTreeParent,
        $$map: false
      };
    }
  };

  /* script */
  var __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.ready && _vm.allowDomains ? _c('g', [_vm._t("default")], 2) : _vm._e();
  };

  var __vue_staticRenderFns__$3 = [];
  /* style */

  var __vue_inject_styles__$4 = undefined;
  /* scoped */

  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* component normalizer */

  function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Section.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Section = __vue_normalize__$4({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

  var Rectangular = {
    mixins: [Mark],
    props: {
      x1: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      x2: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y1: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y2: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      x: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      w: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      h: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      color: {
        type: [String, Object, Function, undefined],
        default: undefined
      }
    },
    computed: {
      invalidX: function invalidX() {
        return invalidCombination(this.x1, this.x2, this.x, this.w);
      },
      invalidY: function invalidY() {
        return invalidCombination(this.y1, this.y2, this.y, this.h);
      },
      aesthetics: function aesthetics() {
        if (this.invalidX) {
          throw new Error('Invalid combination of props x1, x2, x and w');
        }

        if (this.invalidY) {
          throw new Error('Invalid combination of props y1, y2, y and h');
        }

        return {
          x1: this.parseCoordinate(this.x1, {
            dimension: 'x'
          }),
          x2: this.parseCoordinate(this.x2, {
            dimension: 'x'
          }),
          y1: this.parseCoordinate(this.y1, {
            dimension: 'y'
          }),
          y2: this.parseCoordinate(this.y2, {
            dimension: 'y'
          }),
          x: this.parseCoordinate(this.x, {
            dimension: 'x'
          }),
          y: this.parseCoordinate(this.y, {
            dimension: 'y'
          }),
          w: this.parseCoordinate(this.w, {
            dimension: 'x',
            wh: true
          }),
          h: this.parseCoordinate(this.h, {
            dimension: 'y',
            wh: true
          }),
          color: this.parseAesthetic(this.color, {
            default: '#000000'
          })
        };
      }
    },
    methods: {
      convertCoordinateSpecification: function convertCoordinateSpecification(aes) {
        var _convertSpecification = convertSpecification(aes.x1, aes.x2, aes.x, aes.w),
            _convertSpecification2 = _slicedToArray(_convertSpecification, 2),
            x1 = _convertSpecification2[0],
            x2 = _convertSpecification2[1];

        var _convertSpecification3 = convertSpecification(aes.y1, aes.y2, aes.y, aes.h),
            _convertSpecification4 = _slicedToArray(_convertSpecification3, 2),
            y1 = _convertSpecification4[0],
            y2 = _convertSpecification4[1];

        for (var aesKey in ['x', 'y', 'w', 'h']) {
          if (aes[aesKey]) {
            delete aes[aesKey];
          }
        }

        aes.x1 = x1;
        aes.x2 = x2;
        aes.y1 = y1;
        aes.y2 = y2;
        return aes;
      }
    }
  };

  function invalidCombination(x1, x2, x, w) {
    var validCombinations = [// If there is nothing, just x1, just x2, or just x1 and x2
    isnt(x) && isnt(w), // If there is just x1 and w
    is(x1) && isnt(x2) && isnt(x) && is(w), // If there is just x2 and w
    isnt(x1) && is(x2) && isnt(x) && is(w), // If there is just x and w
    isnt(x1) && isnt(x2) && is(x) && is(w)];
    return !validCombinations.some(function (combo) {
      return combo === true;
    });
  } // Converts any valid combination of x1, x2, x and w to [x1, x2]


  function convertSpecification(x1, x2, x, w) {
    // If there is nothing, just x1, just x2, or just x1 and x2
    if (isnt(x) && isnt(w)) {
      return [x1, x2];
    } // If there is just x1 and w


    if (is(x1) && isnt(x2) && isnt(x) && is(w)) {
      return [x1, x1 + w];
    } // If there is just x2 and w


    if (isnt(x1) && is(x2) && isnt(x) && is(w)) {
      return [x2 - w, x2];
    } // If there is just x and w


    if (isnt(x1) && isnt(x2) && is(x) && is(w)) {
      return [x - w / 2, x + w / 2];
    }
  }

  var script$5 = {
    mixins: [Rectangular],
    props: {
      type: {
        type: String,
        default: 'scale'
      },
      domains: {
        type: [Object, undefined],
        default: undefined
      },
      scale: {
        type: [String, Object, undefined],
        default: undefined
      }
    },
    methods: {
      calculateRanges: function calculateRanges(aesthetics) {
        var aes = this.convertCoordinateSpecification(aesthetics);
        return {
          x: [aes.x1, aes.x2],
          y: [aes.y1, aes.y2]
        };
      },
      renderSection: function renderSection(createElement, aesthetics) {
        var ranges = this.calculateRanges(aesthetics);
        return createElement(Section, {
          props: {
            type: this.type,
            scale: this.scale,
            domains: this.domains,
            ranges: ranges
          }
        }, this.$slots.default);
      }
    },
    render: function render(createElement) {
      if (!this.$$map) {
        return this.renderSection(createElement, this.aesthetics);
      }

      if (this.$$map) {
        var aestheticsPerSection = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

        var sections = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = aestheticsPerSection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var aesthetics = _step.value;
            sections.push(this.renderSection(createElement, aesthetics));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return createElement('g', sections);
      }
    }
  };

  /* script */
  var __vue_script__$5 = script$5;
  /* template */

  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = undefined;
  /* component normalizer */

  function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "SectionWrapper.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Section$1 = __vue_normalize__$5({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$6 = {
    props: {
      x: {
        type: [Number, Object, Function],
        required: true
      },
      y: {
        type: [Number, Object, Function],
        required: true
      },
      radius: {
        type: Number,
        required: true
      },
      transformation: {
        type: String,
        default: 'polar'
      },
      anchorPoint: {
        type: String,
        default: 'center'
      }
    },
    computed: {
      wh: function wh() {
        return this.radius * 2;
      },
      rectangles: function rectangles() {
        var rectangles = [{
          x1: 0,
          x2: 15,
          y1: 0,
          y2: 100,
          color: 'green'
        }, {
          x1: 15,
          x2: 50,
          y1: 0,
          y2: 100,
          color: 'red'
        }, {
          x1: 50,
          x2: 75,
          y1: 0,
          y2: 100,
          color: 'yellow'
        }, {
          x1: 75,
          x2: 100,
          y1: 0,
          y2: 100,
          color: 'blue'
        }];
        return rectangles;
      }
    }
  };

  /* script */
  var __vue_script__$6 = script$6;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('vgg-glyph', {
      attrs: {
        "x": _vm.x,
        "y": _vm.y,
        "width": _vm.wh,
        "height": _vm.wh,
        "anchor-point": _vm.anchorPoint
      }
    }, [_c('vgg-section', {
      attrs: {
        "type": _vm.transformation,
        "x1": 0,
        "x2": _vm.wh,
        "y1": 0,
        "y2": _vm.wh,
        "domains": {
          x: [0, 100],
          y: [0, 100]
        }
      }
    }, _vm._l(_vm.rectangles, function (rect, i) {
      return _c('vgg-rectangle', {
        key: i,
        attrs: {
          "x1": rect.x1,
          "x2": rect.x2,
          "y1": rect.y1,
          "y2": rect.y2,
          "color": rect.color
        }
      });
    }), 1)], 1);
  };

  var __vue_staticRenderFns__$4 = [];
  /* style */

  var __vue_inject_styles__$6 = undefined;
  /* scoped */

  var __vue_scope_id__$6 = undefined;
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* component normalizer */

  function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Piechart.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Piechart = __vue_normalize__$6({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

  var BaseAxis = {
    mixins: [Rectangular],
    props: {
      domain: {
        type: [Array, String, undefined],
        default: undefined
      },
      scale: {
        type: [String, Object],
        default: function _default() {
          return {};
        }
      },
      tickValues: {
        type: [Array, undefined],
        default: undefined
      },
      tickCount: {
        type: Number,
        default: 10
      },
      rotateLabel: {
        type: Boolean,
        default: false
      },
      format: {
        type: [String, Function, undefined],
        default: undefined
      },
      flip: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      _domain: function _domain() {
        if (this.domain.constructor === Array) {
          return this.domain;
        }

        if (this.domain.constructor === String) {
          return this.$$dataContainer.getDomain(this.domain);
        }
      },
      _domainType: function _domainType() {
        if (this.domain) {
          return getDataType(this._domain[0]);
        }
      },
      ranges: function ranges() {
        return this.convertCoordinateSpecification(this.aesthetics);
      },
      tickData: function tickData() {
        if (this.tickValues) {
          return this.tickValues.map(function (value) {
            return {
              value: value
            };
          });
        } else {
          var ticks;
          var format = this.format && this.format.constructor === Function ? this.format : function (x) {
            return x;
          };

          if (this._domainType === 'quantitative') {
            ticks = d3Array.ticks.apply(void 0, _toConsumableArray(this._domain).concat([this.tickCount])).map(function (value) {
              return {
                value: value,
                label: format(value)
              };
            });
          }

          if (this._domainType === 'categorical') {
            ticks = this._domain.map(function (value) {
              return {
                value: value,
                label: format(value)
              };
            });
          }

          if (this._domainType === 'temporal') {
            if (this.format) {
              if (this.format.constructor === String) {
                format = d3TimeFormat.timeFormat(this.format);
              }
            } else {
              format = d3TimeFormat.timeFormat('%d/%m/%Y');
            }

            var scale = d3.scaleTime().domain(this._domain);
            ticks = scale.ticks(this.tickCount).map(function (value) {
              var date = new Date(value);
              return {
                value: date,
                label: format(date)
              };
            });
          }

          return ticks;
        }
      }
    }
  };

  //
  var script$7 = {
    mixins: [BaseAxis]
  };

  /* script */
  var __vue_script__$7 = script$7;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('vgg-section', {
      attrs: {
        "x1": _vm.ranges.x1,
        "x2": _vm.ranges.x2,
        "y1": _vm.ranges.y1,
        "y2": _vm.ranges.y2,
        "domains": {
          x: [0, 1],
          y: [0, 1]
        }
      }
    }, [_c('vgg-line', {
      attrs: {
        "x1": 0,
        "y1": 0.5,
        "x2": 1,
        "y2": 0.5,
        "width": 1
      }
    }), _c('vgg-section', {
      attrs: {
        "x1": 0,
        "x2": 1,
        "y1": 0,
        "y2": 1,
        "domains": {
          x: _vm.domain
        },
        "scale": {
          x: _vm.scale
        }
      }
    }, [_c('vgg-map', {
      attrs: {
        "data": _vm.tickData
      }
    }, [_c('vgg-line', {
      attrs: {
        "x1": function x1(tick) {
          return tick.value;
        },
        "y1": 0.5,
        "x2": function x2(tick) {
          return tick.value;
        },
        "y2": _vm.flip ? 0.35 : 0.65,
        "width": 0.5
      }
    }), !_vm.rotateLabel ? _c('vgg-label', {
      attrs: {
        "x": function x(tick) {
          return tick.value;
        },
        "y": _vm.flip ? 0.59 : 0.45,
        "text": function text(tick) {
          return tick.label;
        },
        "font-size": 10,
        "anchor-point": _vm.flip ? 'b' : 't'
      }
    }) : _vm._e(), _vm.rotateLabel ? _c('vgg-label', {
      attrs: {
        "x": function x(tick) {
          return tick.value;
        },
        "y": _vm.flip ? 0.59 : 0.45,
        "text": function text(tick) {
          return tick.label;
        },
        "font-size": 10,
        "rotation": _vm.flip ? 30 : -30,
        "anchor-point": _vm.flip ? 'rb' : 'rt'
      }
    }) : _vm._e()], 1)], 1)], 1);
  };

  var __vue_staticRenderFns__$5 = [];
  /* style */

  var __vue_inject_styles__$7 = undefined;
  /* scoped */

  var __vue_scope_id__$7 = undefined;
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* component normalizer */

  function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "XAxis.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var XAxis = __vue_normalize__$7({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

  //
  var script$8 = {
    mixins: [BaseAxis]
  };

  /* script */
  var __vue_script__$8 = script$8;
  /* template */

  var __vue_render__$6 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('vgg-section', {
      attrs: {
        "x1": _vm.ranges.x1,
        "x2": _vm.ranges.x2,
        "y1": _vm.ranges.y1,
        "y2": _vm.ranges.y2,
        "domains": {
          x: [0, 1],
          y: [0, 1]
        }
      }
    }, [_c('vgg-line', {
      attrs: {
        "x1": 0.5,
        "y1": 0,
        "x2": 0.5,
        "y2": 1,
        "width": 1
      }
    }), _vm.domain !== undefined ? _c('vgg-section', {
      attrs: {
        "x1": 0,
        "x2": 1,
        "y1": 0,
        "y2": 1,
        "domains": {
          y: _vm.domain
        },
        "scale": {
          y: _vm.scale
        }
      }
    }, [_c('vgg-map', {
      attrs: {
        "data": _vm.tickData
      }
    }, [_c('vgg-line', {
      attrs: {
        "x1": 0.5,
        "y1": function y1(tick) {
          return tick.value;
        },
        "x2": _vm.flip ? 0.65 : 0.35,
        "y2": function y2(tick) {
          return tick.value;
        },
        "width": 0.5
      }
    }), !_vm.rotateLabel ? _c('vgg-label', {
      attrs: {
        "x": _vm.flip ? 0.45 : 0.59,
        "y": function y(tick) {
          return tick.value;
        },
        "text": function text(tick) {
          return tick.label;
        },
        "font-size": 10,
        "anchor-point": _vm.flip ? 'r' : 'l'
      }
    }) : _vm._e(), _vm.rotateLabel ? _c('vgg-label', {
      attrs: {
        "x": _vm.flip ? 0.41 : 0.59,
        "y": function y(tick) {
          return tick.value;
        },
        "text": function text(tick) {
          return tick.label;
        },
        "font-size": 10,
        "rotation": _vm.flip ? -30 : 30,
        "anchor-point": _vm.flip ? 'r' : 'l'
      }
    }) : _vm._e()], 1)], 1) : _vm._e()], 1);
  };

  var __vue_staticRenderFns__$6 = [];
  /* style */

  var __vue_inject_styles__$8 = undefined;
  /* scoped */

  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = false;
  /* component normalizer */

  function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "YAxis.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var YAxis = __vue_normalize__$8({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

  var BaseGrid = {
    mixins: [Rectangular],
    props: {
      domain: {
        type: [Array, String, undefined],
        default: undefined
      },
      scale: {
        type: [String, Object],
        default: function _default() {
          return {};
        }
      },
      gridLines: {
        type: [Array, Number],
        default: 10
      }
    },
    computed: {
      _domain: function _domain() {
        if (this.domain.constructor === Array) {
          return this.domain;
        }

        if (this.domain.constructor === String) {
          return this.$$dataContainer.getDomain(this.domain);
        }
      },
      _domainType: function _domainType() {
        if (this.domain) {
          return getDataType(this._domain[0]);
        }
      },
      ranges: function ranges() {
        return this.convertCoordinateSpecification(this.aesthetics);
      },
      cells: function cells() {
        if (this.gridLines.constructor === Array) {
          return this.gridLines.map(function (value) {
            return {
              value: value
            };
          });
        } else {
          var cells;

          if (this._domainType === 'quantitative') {
            cells = d3Array.ticks.apply(void 0, _toConsumableArray(this._domain).concat([this.gridLines])).map(function (value) {
              return {
                value: value
              };
            });
          }

          if (this._domainType === 'categorical') {
            cells = this._domain.map(function (value) {
              return {
                value: value
              };
            });
          }

          if (this._domainType === 'temporal') {
            var scale = d3.scaleTime().domain(this._domain);
            cells = scale.ticks(this.tickCount).map(function (value) {
              var date = new Date(value);
              return {
                value: date
              };
            });
          }

          return cells;
        }
      }
    }
  };

  //
  var script$9 = {
    mixins: [BaseGrid]
  };

  /* script */
  var __vue_script__$9 = script$9;
  /* template */

  var __vue_render__$7 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('vgg-section', {
      attrs: {
        "x1": _vm.ranges.x1,
        "x2": _vm.ranges.x2,
        "y1": _vm.ranges.y1,
        "y2": _vm.ranges.y2,
        "domains": {
          x: _vm.domain,
          y: [0, 1]
        },
        "scale": {
          x: _vm.scale
        }
      }
    }, _vm._l(_vm.cells, function (cell, i) {
      return _c('vgg-line', {
        key: i,
        attrs: {
          "x1": cell.value,
          "y1": 0,
          "x2": cell.value,
          "y2": 1,
          "width": 0.5,
          "color": "#808080"
        }
      });
    }), 1);
  };

  var __vue_staticRenderFns__$7 = [];
  /* style */

  var __vue_inject_styles__$9 = undefined;
  /* scoped */

  var __vue_scope_id__$9 = undefined;
  /* module identifier */

  var __vue_module_identifier__$9 = undefined;
  /* functional template */

  var __vue_is_functional_template__$9 = false;
  /* component normalizer */

  function __vue_normalize__$9(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "XGrid.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var XGrid = __vue_normalize__$9({
    render: __vue_render__$7,
    staticRenderFns: __vue_staticRenderFns__$7
  }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

  //
  var script$a = {
    mixins: [BaseGrid]
  };

  /* script */
  var __vue_script__$a = script$a;
  /* template */

  var __vue_render__$8 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('vgg-section', {
      attrs: {
        "x1": _vm.ranges.x1,
        "x2": _vm.ranges.x2,
        "y1": _vm.ranges.y1,
        "y2": _vm.ranges.y2,
        "domains": {
          x: [0, 1],
          y: _vm.domain
        },
        "scale": {
          y: _vm.scale
        }
      }
    }, _vm._l(_vm.cells, function (cell, i) {
      return _c('vgg-line', {
        key: i,
        attrs: {
          "x1": 0,
          "y1": cell.value,
          "x2": 1,
          "y2": cell.value,
          "width": 0.5,
          "color": "#808080"
        }
      });
    }), 1);
  };

  var __vue_staticRenderFns__$8 = [];
  /* style */

  var __vue_inject_styles__$a = undefined;
  /* scoped */

  var __vue_scope_id__$a = undefined;
  /* module identifier */

  var __vue_module_identifier__$a = undefined;
  /* functional template */

  var __vue_is_functional_template__$a = false;
  /* component normalizer */

  function __vue_normalize__$a(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "YGrid.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var YGrid = __vue_normalize__$a({
    render: __vue_render__$8,
    staticRenderFns: __vue_staticRenderFns__$8
  }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, undefined, undefined);

  function interpolatePath(corners, transformer) {
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var resolution = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
    var points = [];
    points.push(corners[0]);

    for (var i = 0; i < corners.length - 1; ++i) {
      var from = corners[i];
      var to = corners[i + 1];
      var interpolator = d3Interpolate.interpolate(from, to);

      for (var j = 1; j <= resolution; ++j) {
        var point = interpolator(j / resolution);
        points.push([point[0], point[1]]); // this pushes a deep copy of 'point'
      }
    }

    var path = createPath(points, transformer, precision);
    return path;
  }
  function interpolatePathFromFunc(func, transformer, domains) {
    var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var resolution = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 300;
    var points = [];
    var interpolator = d3Interpolate.interpolate.apply(void 0, _toConsumableArray(domains.x));

    for (var i = 0; i <= resolution; ++i) {
      var x = interpolator(i / resolution);
      var y = func(x);

      if (inDomain([x, y], domains)) {
        points.push([x, y]);
      }
    }

    var path = createPath(points, transformer, precision);
    return path;
  }
  function createPath(points, transformer) {
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var transformedPoints = points.map(function (p) {
      return transformer(p).map(function (c) {
        return round(c, precision);
      });
    });
    var lineGenerator = d3Shape.line();
    var path = lineGenerator(transformedPoints);
    return path;
  }

  function round(input, precision) {
    return Math.round(input * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  function inDomain(point, domains) {
    var yMin = Math.min.apply(Math, _toConsumableArray(domains.y));
    var yMax = Math.max.apply(Math, _toConsumableArray(domains.y));
    return point[1] > yMin && point[1] < yMax;
  }

  var script$b = {
    mixins: [Mark],
    props: {
      // Mappable
      x1: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      x2: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y1: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y2: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      func: {
        type: [Function, Object, undefined],
        default: undefined
      },
      color: {
        type: [String, Object, Function, undefined],
        default: undefined
      },
      // Non-mappable
      width: {
        type: Number,
        default: 2
      }
    },
    computed: {
      aesthetics: function aesthetics() {
        return {
          x1: this.parseCoordinate(this.x1, {
            dimension: 'x'
          }),
          y1: this.parseCoordinate(this.y1, {
            dimension: 'y'
          }),
          x2: this.parseCoordinate(this.x2, {
            dimension: 'x'
          }),
          y2: this.parseCoordinate(this.y2, {
            dimension: 'y'
          }),
          func: this.parseAesthetic(this.func, {
            isFunction: true
          }),
          color: this.parseAesthetic(this.color, {
            default: '#000000'
          }),
          width: this.parseProperty(this.width, {
            default: 2
          })
        };
      }
    },
    methods: {
      createPath: function createPath$$1(func, coords) {
        var path;

        if (func) {
          var parentId = this.$$coordinateTreeParent;
          var domains = this.$$coordinateTree.getBranch(parentId).domains;
          path = interpolatePathFromFunc(this.func, this.$$transform, domains);
        }

        if (!func) {
          if (this._interpolate) {
            path = interpolatePath(coords, this.$$transform);
          }

          if (!this._interpolate) {
            path = createPath(coords, this.$$transform);
          }
        }

        return path;
      },
      renderSVG: function renderSVG(createElement, aesthetics) {
        var coords = [[aesthetics.x1, aesthetics.y1], [aesthetics.x2, aesthetics.y2]];
        var path = this.createPath(aesthetics.func, coords);
        return createElement('path', {
          attrs: {
            'd': path,
            'stroke': aesthetics.color,
            'stroke-width': aesthetics.width,
            'fill': 'none'
          }
        });
      }
    },
    render: function render(createElement) {
      if (this.__update) {
        if (!this.$$map) {
          // Create svg element using aesthetics
          return this.renderSVG(createElement, this.aesthetics);
        }

        if (this.$$map) {
          // Create the aesthetics for each mark
          var aestheticsPerMark = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

          var components = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = aestheticsPerMark[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var aesthetics = _step.value;
              components.push(this.renderSVG(createElement, aesthetics));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return createElement('g', components);
        }
      }
    }
  };

  /* script */
  var __vue_script__$b = script$b;
  /* template */

  /* style */

  var __vue_inject_styles__$b = undefined;
  /* scoped */

  var __vue_scope_id__$b = undefined;
  /* module identifier */

  var __vue_module_identifier__$b = undefined;
  /* functional template */

  var __vue_is_functional_template__$b = undefined;
  /* component normalizer */

  function __vue_normalize__$b(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Line.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Line = __vue_normalize__$b({}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, undefined, undefined);

  function checkPoints (points, x, y) {
    if (is(points) && is(x) && is(y)) {
      throw new Error("Cannot have both 'points', and 'x' and 'y' props");
    }

    if (isnt(points) && isnt(x) && isnt(y)) {
      throw new Error("Missing required props (either 'points', or 'x' and 'y')");
    }

    if (isnt(points) && !(is(x) && is(y))) {
      throw new Error("Both 'x' and 'y' props must be specified");
    }
  }

  var MultiLine = {
    mixins: [Mark],
    props: {
      // Mappable
      points: {
        type: [Array, Object, Function, undefined],
        default: undefined
      },
      x: {
        type: [Array, Object, String, Function, undefined],
        default: undefined
      },
      y: {
        type: [Array, Object, String, Function, undefined],
        default: undefined
      },
      color: {
        type: [String, Object, Function, undefined],
        default: undefined
      },
      // Non-mappable
      width: {
        type: Number,
        default: 2
      },
      sortX: {
        type: Boolean,
        default: true
      },
      close: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      aesthetics: function aesthetics() {
        checkPoints(this.points, this.x, this.y);
        return {
          points: this.parseGeometry(this.points, {}),
          x: this.parseCoordinateSet(this.x, {
            dimension: 'x'
          }),
          y: this.parseCoordinateSet(this.y, {
            dimension: 'y'
          }),
          color: this.parseAesthetic(this.color, {
            default: '#000000'
          }),
          width: this.parseProperty(this.width, {
            default: 2
          })
        };
      }
    },
    methods: {
      generatePoints: function generatePoints(aesthetics) {
        if (aesthetics.points) {
          return aesthetics.points;
        }

        if (aesthetics.x.length !== aesthetics.y.length) {
          throw new Error("'x' and 'y' coordinate sets have different lengths");
        } else {
          var zipped = [];

          for (var i = 0; i < aesthetics.x.length; ++i) {
            zipped.push([aesthetics.x[i], aesthetics.y[i]]);
          }

          return zipped;
        }
      },
      sort: function sort(points) {
        return points.sort(function (a, b) {
          return a[0] - b[0];
        });
      },
      close: function close(points) {
        // Check if polygon is closed
        var lastID = points.length - 1;

        if (points[0][0] !== points[lastID][0] || points[0][1] !== points[lastID][1]) {
          // If not, close
          points.push(points[0]);
        }

        return points;
      },
      createPath: function createPath$$1(points) {
        if (this._interpolate) {
          return interpolatePath(points, this.$$transform);
        }

        if (!this._interpolate) {
          return createPath(points, this.$$transform);
        }
      },
      renderSVG: function renderSVG(createElement, aesthetics) {
        var points = this.generatePoints(aesthetics);

        if (this.sortX) {
          points = this.sort(points);
        }

        if (this.close) {
          points = this.close(points);
        }

        var path = this.createPath(points);
        return createElement('path', {
          attrs: {
            'd': path,
            'stroke': aesthetics.color,
            'stroke-width': aesthetics.width,
            'fill': 'none'
          }
        });
      }
    },
    render: function render(createElement) {
      if (this.__update) {
        if (!this.$$map) {
          // Create svg element using aesthetics
          return this.renderSVG(createElement, this.aesthetics);
        }

        if (this.$$map) {
          // Create the aesthetics for each mark
          var aestheticsPerMark = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

          var components = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = aestheticsPerMark[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var aesthetics = _step.value;
              components.push(this.renderSVG(createElement, aesthetics));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return createElement('g', components);
        }
      }
    }
  };

  var script$c = {
    mixins: [MultiLine],
    props: {
      sortX: {
        type: Boolean,
        default: true
      },
      close: {
        type: Boolean,
        default: false
      }
    }
  };

  /* script */
  var __vue_script__$c = script$c;
  /* template */

  /* style */

  var __vue_inject_styles__$c = undefined;
  /* scoped */

  var __vue_scope_id__$c = undefined;
  /* module identifier */

  var __vue_module_identifier__$c = undefined;
  /* functional template */

  var __vue_is_functional_template__$c = undefined;
  /* component normalizer */

  function __vue_normalize__$c(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "MultiLine.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var MultiLine$1 = __vue_normalize__$c({}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined);

  var script$d = {
    mixins: [MultiLine],
    props: {
      sortX: {
        type: Boolean,
        default: false
      },
      close: {
        type: Boolean,
        default: true
      }
    }
  };

  /* script */
  var __vue_script__$d = script$d;
  /* template */

  /* style */

  var __vue_inject_styles__$d = undefined;
  /* scoped */

  var __vue_scope_id__$d = undefined;
  /* module identifier */

  var __vue_module_identifier__$d = undefined;
  /* functional template */

  var __vue_is_functional_template__$d = undefined;
  /* component normalizer */

  function __vue_normalize__$d(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Path.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Path = __vue_normalize__$d({}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, undefined, undefined);

  var script$e = {
    mixins: [Mark],
    props: {
      // Mappable
      x: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y: {
        type: [Number, String, Date, Object, Function, String, undefined],
        default: undefined
      },
      color: {
        type: [String, Object, Function, undefined],
        default: undefined
      },
      // Non-mappable
      radius: {
        type: Number,
        default: 3
      },
      strokeWidth: {
        type: Number,
        default: 0
      }
    },
    computed: {
      aesthetics: function aesthetics() {
        return {
          x: this.parseCoordinate(this.x, {
            dimension: 'x'
          }),
          y: this.parseCoordinate(this.y, {
            dimension: 'y'
          }),
          color: this.parseAesthetic(this.color, {
            default: '#000000'
          }),
          radius: this.parseProperty(this.radius, {
            default: 3
          }),
          strokeWidth: this.parseProperty(this.strokeWidth, {
            default: 0
          })
        };
      }
    },
    methods: {
      renderSVG: function renderSVG(createElement, aesthetics) {
        var _this$$$transform = this.$$transform([aesthetics.x, aesthetics.y]),
            _this$$$transform2 = _slicedToArray(_this$$$transform, 2),
            cx = _this$$$transform2[0],
            cy = _this$$$transform2[1];

        return createElement('circle', {
          attrs: {
            'cx': cx,
            'cy': cy,
            'fill': aesthetics.color,
            'r': aesthetics.radius,
            'stroke-width': aesthetics.strokeWidth
          }
        });
      }
    },
    render: function render(createElement) {
      if (this.__update) {
        if (!this.$$map) {
          // Create svg element using aesthetics
          return this.renderSVG(createElement, this.aesthetics);
        }

        if (this.$$map) {
          // Create the aesthetics for each mark
          var aestheticsPerMark = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

          var components = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = aestheticsPerMark[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var aesthetics = _step.value;
              components.push(this.renderSVG(createElement, aesthetics));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return createElement('g', components);
        }
      }
    }
  };

  /* script */
  var __vue_script__$e = script$e;
  /* template */

  /* style */

  var __vue_inject_styles__$e = undefined;
  /* scoped */

  var __vue_scope_id__$e = undefined;
  /* module identifier */

  var __vue_module_identifier__$e = undefined;
  /* functional template */

  var __vue_is_functional_template__$e = undefined;
  /* component normalizer */

  function __vue_normalize__$e(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Point.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Point = __vue_normalize__$e({}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, undefined, undefined);

  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  var $export$7 = require('./_export');

  $export$7($export$7.P, 'Array', {
    fill: require('./_array-fill')
  });

  require('./_add-to-unscopables')('fill');

  var script$f = {
    mixins: [MultiLine],
    props: {
      fill: {
        type: [String, Object, Function, undefined],
        default: undefined
      },
      sortX: {
        type: Boolean,
        default: false
      },
      close: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      renderSVG: function renderSVG(createElement, aesthetics) {
        var points = this.generatePoints(aesthetics);
        var path = this.createPath(points);

        if (this.sortX) {
          points = this.sort(points);
        }

        if (this.close) {
          points = this.close(points);
        }

        return createElement('path', {
          attrs: {
            'd': path,
            'stroke': aesthetics.color,
            'stroke-width': aesthetics.width,
            'fill': aesthetics.fill
          }
        });
      }
    },
    render: function render(createElement) {
      if (this.__update) {
        if (!this.$$map) {
          // Create svg element using aesthetics
          return this.renderSVG(createElement, this.aesthetics);
        }

        if (!this.$$map) {
          // Create the aesthetics for each mark
          var aestheticsPerMark = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

          var components = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = aestheticsPerMark[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var aesthetics = _step.value;
              components.push(this.renderSVG(createElement, aesthetics));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return createElement('g', components);
        }
      }
    }
  };

  /* script */
  var __vue_script__$f = script$f;
  /* template */

  /* style */

  var __vue_inject_styles__$f = undefined;
  /* scoped */

  var __vue_scope_id__$f = undefined;
  /* module identifier */

  var __vue_module_identifier__$f = undefined;
  /* functional template */

  var __vue_is_functional_template__$f = undefined;
  /* component normalizer */

  function __vue_normalize__$f(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Polygon.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Polygon = __vue_normalize__$f({}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, undefined, undefined);

  var script$g = {
    mixins: [Rectangular],
    methods: {
      renderSVG: function renderSVG(createElement, aesthetics) {
        var aes = this.convertCoordinateSpecification(aesthetics);
        var points = [[aes.x1, aes.y1], [aes.x1, aes.y2], [aes.x2, aes.y2], [aes.x2, aes.y1], [aes.x1, aes.y1]];
        var path;

        if (this._interpolate) {
          path = interpolatePath(points, this.$$transform);
        }

        if (!this._interpolate) {
          path = createPath(points, this.$$transform);
        }

        return createElement('path', {
          attrs: {
            'd': path,
            'style': "fill: ".concat(aesthetics.color)
          }
        });
      }
    },
    render: function render(createElement) {
      if (this.__update) {
        if (!this.$$map) {
          // Create svg element using aesthetics
          return this.renderSVG(createElement, this.aesthetics);
        }

        if (this.$$map) {
          // Create the aesthetics for each mark
          var aestheticsPerMark = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

          var components = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = aestheticsPerMark[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var aesthetics = _step.value;
              components.push(this.renderSVG(createElement, aesthetics));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return createElement('g', components);
        }
      }
    }
  };

  /* script */
  var __vue_script__$g = script$g;
  /* template */

  /* style */

  var __vue_inject_styles__$g = undefined;
  /* scoped */

  var __vue_scope_id__$g = undefined;
  /* module identifier */

  var __vue_module_identifier__$g = undefined;
  /* functional template */

  var __vue_is_functional_template__$g = undefined;
  /* component normalizer */

  function __vue_normalize__$g(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Rectangle.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component;
  }
  /* style inject */

  /* style inject SSR */


  var Rectangle = __vue_normalize__$g({}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

  var script$h = {
    mixins: [Mark],
    props: {
      // Mappable
      text: {
        type: [String, Object, Function, undefined],
        default: undefined
      },
      x: {
        type: [Number, String, Date, Object, Function, undefined],
        default: undefined
      },
      y: {
        type: [Number, String, Date, Object, Function, String, undefined],
        default: undefined
      },
      color: {
        type: [String, Object, Function, undefined],
        default: undefined
      },
      fontSize: {
        type: [Number, Object, Function, undefined],
        default: undefined
      },
      rotation: {
        type: [Number, Object, Function, undefined],
        default: undefined
      },
      // Unmappable
      anchorPoint: {
        type: String,
        default: 'center',
        validator: function validator(p) {
          return ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p);
        }
      }
    },
    computed: {
      aesthetics: function aesthetics() {
        return {
          text: this.parseAesthetic(this.text, {}),
          x: this.parseCoordinate(this.x, {
            dimension: 'x'
          }),
          y: this.parseCoordinate(this.y, {
            dimension: 'y'
          }),
          color: this.parseAesthetic(this.color, {
            default: '#000000'
          }),
          fontSize: this.parseAesthetic(this.fontSize, {
            default: 16
          }),
          rotation: this.parseAesthetic(this.rotation, {
            default: 0
          })
        };
      }
    },
    methods: {
      calcTransform: function calcTransform(rotation, cx, cy) {
        return "rotate(".concat(rotation, ", ").concat(cx, ", ").concat(cy, ")");
      },
      renderSVG: function renderSVG(createElement, aesthetics) {
        var _this$$$transform = this.$$transform([aesthetics.x, aesthetics.y]),
            _this$$$transform2 = _slicedToArray(_this$$$transform, 2),
            cx = _this$$$transform2[0],
            cy = _this$$$transform2[1];

        var anchorPoint = textAnchorPoint(this.anchorPoint);
        var transform = this.calcTransform(aesthetics.rotation, cx, cy);
        var el = createElement('text', {
          attrs: {
            'x': cx,
            'y': cy,
            'fill': aesthetics.color,
            'text-anchor': anchorPoint.textAnchor,
            'dominant-baseline': anchorPoint.dominantBaseline,
            'transform': transform,
            'class': 'vgg-label'
          },
          style: {
            'font-size': aesthetics.fontSize + 'px'
          }
        }, aesthetics.text);
        return el;
      }
    },
    render: function render(createElement) {
      if (this.__update) {
        if (!this.$$map) {
          // Create svg element using aesthetics
          return this.renderSVG(createElement, this.aesthetics);
        }

        if (this.$$map) {
          // Create the aesthetics for each mark
          var aestheticsPerMark = mapAesthetics(this.aesthetics, this.context, this.$$dataContainer); // Create svg element for each mark from aesthetics

          var components = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = aestheticsPerMark[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var aesthetics = _step.value;
              components.push(this.renderSVG(createElement, aesthetics));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return createElement('g', components);
        }
      }
    }
  };

  var __vue_script__$h = script$h;
  /* template */

  /* style */

  var __vue_inject_styles__$h = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-a472028e_0", {
      source: ".vgg-label[data-v-a472028e]{font-family:sans-serif}",
      map: undefined,
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$h = "data-v-a472028e";
  /* module identifier */

  var __vue_module_identifier__$h = undefined;
  /* functional template */

  var __vue_is_functional_template__$h = undefined;
  /* component normalizer */

  function __vue_normalize__$h(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

    component.__file = "Label.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      var hook;

      if (style) {
        hook = function hook(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;

          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component;
  }
  /* style inject */


  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = {
        ids: [],
        parts: [],
        element: undefined
      });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;
        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';
          if (css.media) el.setAttribute('media', css.media);

          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */


  var Label = __vue_normalize__$h({}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, __vue_create_injector__, undefined);

  // Core
  var components = {
    Glyph: Glyph$1,
    Graphic: Graphic,
    Map: Map,
    Section: Section$1,
    Piechart: Piechart,
    XAxis: XAxis,
    YAxis: YAxis,
    XGrid: XGrid,
    YGrid: YGrid,
    Line: Line,
    MultiLine: MultiLine$1,
    Path: Path,
    Point: Point,
    Polygon: Polygon,
    Rectangle: Rectangle,
    Label: Label
  };

  var index = {
    install: function install(Vue, options) {
      var prefix = 'Vgg';

      if (options) {
        if (options.prefix) {
          prefix = options.prefix;
        }
      }

      for (var key in components) {
        var componentName = prefix + key;
        Vue.component(componentName, components[key]);
      }
    }
  };

  return index;

}));
