/**
 * Created by michael on 2014/4/26.
 */

define(function() {
    var GLOBAL = window || self,
        FUNCTION_KEY = '___name___',
        PROTOTYPE_KEY = '___prototype___';
    function _forEach(obj, method, context) {
        context = context || GLOBAL;
        if (obj instanceof Object) {
            var keys = Object.keys(obj),
                len = keys.length,
                i;
            for (i = 0; i < len; i++) {
                var key = keys[i];
                if (obj instanceof Array) {
                    key = i;
                }
                if (method.call(context, obj[key], key, obj) === false) {
                    break;
                }
            }
        } else {
            throw 'Could only iterate an Object or Array';
        }
    }
    function _copy(dest) {
        var args = arguments,
            len = args.length,
            i,
            copyValue = function(value, key) {
                dest[key] = value;
            };
        for (i = 1; i < len ; i++) {
            _forEach(args[i], copyValue);
        }

        return dest;
    }

    function _markFunction(config, prototype) {
        _forEach(config, function(value, key) {
            if (value instanceof Function) {
                Object.defineProperty(value, FUNCTION_KEY, {
                    configurable: false,
                    writable: false,
                    value: key
                });
                Object.defineProperty(value, PROTOTYPE_KEY, {
                    configurable: false,
                    writable: false,
                    value: prototype
                });
            }
        });
    }

    function _makePrototypeChain() {
        var args = [].slice.call(arguments),
            len = args.length,
            i,
            p,
            n;
        for (i = 0; i < len - 1; i++) {
            p = args[i];
            n = args[i + 1];
            n = _copy(Object.create(p), n);
            _markFunction(n, p);
            args[i + 1] = n;
        }

        return n || arguments[0];
    }

    function _Object(config) {
        return this.init(config);
    }

    _Object.extend = function() {
        var SuperClass = this;
        if (!(SuperClass instanceof Function)) {
            throw 'Could only extend from a class constructor (Function).';
        }
        var constructor = function (config) {
                return this.init(config);
            },
            prototype = Object.create(new SuperClass());

        prototype = _makePrototypeChain.apply(this, [prototype].concat([].slice.apply(arguments)));
//        _markFunction(config, prototype);
//        _copy(prototype, config);
        prototype.constructor = constructor;
        constructor.prototype = prototype;
        constructor.extend = _Object.extend;
        return constructor;
    };

    Object.defineProperty(_Object.prototype, '_super', {
        get: function() {
            var args = arguments,
                caller = args.callee.caller,
                prototype = caller[PROTOTYPE_KEY],
                name = caller[FUNCTION_KEY];
//                lookupPrototype = prototype;

//            if (this.hasOwnProperty(name)) {
//                lookupPrototype = prototype;
//            } else {
//                lookupPrototype = Object.getPrototypeOf(prototype);
//            }
            var superFunction = prototype[name];
            if (superFunction instanceof Function) {
                return superFunction;
            }
            throw 'Could not find the super function of ' + name;
        }
    });

    _copy(_Object.prototype, {
        init: function(config) {
            if (!(config instanceof Object)) {
                return this;
            }
            if (!(config instanceof Array)) {
                config = [config];
            }
            var prototypes = config;
            prototypes.splice(0, 0, this.constructor.prototype);
//                rootPrototype = Object.prototype,
//                prototype = Object.getPrototypeOf(config);
//            while(prototype !== rootPrototype) {
//                prototypes.push(prototype);
//                prototype = Object.getPrototypeOf(prototype);
//            }
//            prototypes.push(this.constructor.prototype);
//            prototypes.reverse();
            var chain = _makePrototypeChain.apply(this, prototypes),
                finalPrototype = Object.getPrototypeOf(chain),
                ret = Object.create(finalPrototype);

//            _markFunction(config, finalPrototype);
            _copy(ret, this, chain);
            return ret;
//            return _copy(_mixin.apply(this, prototypes))
//            return _mixin([this.constructor.prototype].concat(args));
//            _copy(this, config);
        }
    });

    return {
        global: GLOBAL,
        hash: {
            forEach: _forEach,
            copy: _copy
        },
//        mixin: _makePrototypeChain,
        Object: _Object
    };
});