/**
 * Created by michael on 2014/4/26.
 */

define(function() {
    var GLOBAL = window || self,
        FUNCTION_KEY = '___name___',
        CONSTRUCTOR_KEY = '___constructor___';
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
    function _mixin(dest, src) {
        _forEach(src, function(value, key) {
            dest[key] = value;
        });
        return dest;
    }

    function _Object(config) {
        this.init(config);
    }

    _Object.extend = function(config) {
        var SuperClass = this;
        if (!(SuperClass instanceof Function)) {
            throw 'Could only extend from a class constructor (Function).';
        }
        var constructor = function (config) {
                this.init(config);
            },
            prototype = Object.create(new SuperClass());
        _forEach(config, function(value, key) {
            if (value instanceof Function) {
                Object.defineProperty(value, FUNCTION_KEY, {
                    configurable: false,
                    writable: false,
                    value: key
                });
                Object.defineProperty(value, CONSTRUCTOR_KEY, {
                    configurable: false,
                    writable: false,
                    value: constructor
                });
            }
            prototype[key] = value;
        });
        prototype.constructor = constructor;
        constructor.prototype = prototype;
        constructor.extend = _Object.extend;
        return constructor;
    };

    Object.defineProperty(_Object.prototype, '_super', {
        get: function() {
            var args = arguments,
                caller = args.callee.caller,
                constructor = caller[CONSTRUCTOR_KEY],
                name = caller[FUNCTION_KEY],
                prototype;

            if (this.hasOwnProperty(name)) {
                prototype = constructor.prototype;
            } else {
                prototype = Object.getPrototypeOf(constructor.prototype);
            }
            var superFunction = prototype[name];
            if (superFunction instanceof Function) {
                return superFunction;
            }
            throw 'Could not find the super function of ' + name;
        }
    });

    _mixin(_Object.prototype, {
        init: function(config) {
            if (!config) {
                return ;
            }
            var constructor = this.constructor;
            _forEach(config, function(value, key) {
                if (value instanceof Function) {
                    Object.defineProperty(value, FUNCTION_KEY, {
                        configurable: false,
                        writable: false,
                        value: key
                    });
                    Object.defineProperty(value, CONSTRUCTOR_KEY, {
                        configurable: false,
                        writable: false,
                        value: constructor
                    });
                }
                this[key] = value;
            }, this);
        }
    });

    return {
        global: GLOBAL,
        hash: {
            forEach: _forEach,
            mixin: _mixin
        },
        Object: _Object
    };
});