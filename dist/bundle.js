/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  var e = {
      16: (e) => {
        'use strict';
        e.exports = require('url');
      },
      32: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.URL = t.DNS = void 0);
        const n = r(355),
          o = r(157);
        var i = r(157);
        function s(e, t, r, i) {
          return (0, o.default)(48, n.default, e, t, r, i);
        }
        Object.defineProperty(t, 'DNS', {
          enumerable: !0,
          get: function () {
            return i.DNS;
          },
        }),
          Object.defineProperty(t, 'URL', {
            enumerable: !0,
            get: function () {
              return i.URL;
            },
          }),
          (s.DNS = o.DNS),
          (s.URL = o.URL),
          (t.default = s);
      },
      56: (e) => {
        'use strict';
        e.exports = JSON.parse(
          '{"name":"dotenv","version":"16.5.0","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","pretest":"npm run lint && npm run dts-check","test":"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"homepage":"https://github.com/motdotla/dotenv#readme","funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^18.11.3","decache":"^4.6.2","sinon":"^14.0.1","standard":"^17.0.0","standard-version":"^9.5.0","tap":"^19.2.0","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}'
        );
      },
      152: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(982);
        t.default = { randomUUID: n.randomUUID };
      },
      157: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.URL = t.DNS = t.stringToBytes = void 0);
        const n = r(524),
          o = r(202);
        function i(e) {
          e = unescape(encodeURIComponent(e));
          const t = new Uint8Array(e.length);
          for (let r = 0; r < e.length; ++r) t[r] = e.charCodeAt(r);
          return t;
        }
        (t.stringToBytes = i),
          (t.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
          (t.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'),
          (t.default = function (e, t, r, s, a, u) {
            const c = 'string' == typeof r ? i(r) : r,
              f = 'string' == typeof s ? (0, n.default)(s) : s;
            if (('string' == typeof s && (s = (0, n.default)(s)), 16 !== s?.length))
              throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
            let l = new Uint8Array(16 + c.length);
            if (
              (l.set(f),
              l.set(c, f.length),
              (l = t(l)),
              (l[6] = (15 & l[6]) | e),
              (l[8] = (63 & l[8]) | 128),
              a)
            ) {
              u = u || 0;
              for (let e = 0; e < 16; ++e) a[u + e] = l[e];
              return a;
            }
            return (0, o.unsafeStringify)(l);
          });
      },
      202: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.unsafeStringify = void 0);
        const n = r(873),
          o = [];
        for (let e = 0; e < 256; ++e) o.push((e + 256).toString(16).slice(1));
        function i(e, t = 0) {
          return (
            o[e[t + 0]] +
            o[e[t + 1]] +
            o[e[t + 2]] +
            o[e[t + 3]] +
            '-' +
            o[e[t + 4]] +
            o[e[t + 5]] +
            '-' +
            o[e[t + 6]] +
            o[e[t + 7]] +
            '-' +
            o[e[t + 8]] +
            o[e[t + 9]] +
            '-' +
            o[e[t + 10]] +
            o[e[t + 11]] +
            o[e[t + 12]] +
            o[e[t + 13]] +
            o[e[t + 14]] +
            o[e[t + 15]]
          ).toLowerCase();
        }
        (t.unsafeStringify = i),
          (t.default = function (e, t = 0) {
            const r = i(e, t);
            if (!(0, n.default)(r)) throw TypeError('Stringified UUID is invalid');
            return r;
          });
      },
      355: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(982);
        t.default = function (e) {
          return (
            Array.isArray(e)
              ? (e = Buffer.from(e))
              : 'string' == typeof e && (e = Buffer.from(e, 'utf8')),
            (0, n.createHash)('md5').update(e).digest()
          );
        };
      },
      458: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.updateV1State = void 0);
        const n = r(942),
          o = r(202),
          i = {};
        function s(e, t, r) {
          return (
            (e.msecs ??= -1 / 0),
            (e.nsecs ??= 0),
            t === e.msecs
              ? (e.nsecs++, e.nsecs >= 1e4 && ((e.node = void 0), (e.nsecs = 0)))
              : t > e.msecs
                ? (e.nsecs = 0)
                : t < e.msecs && (e.node = void 0),
            e.node ||
              ((e.node = r.slice(10, 16)),
              (e.node[0] |= 1),
              (e.clockseq = 16383 & ((r[8] << 8) | r[9]))),
            (e.msecs = t),
            e
          );
        }
        function a(e, t, r, n, o, i, s = 0) {
          if (e.length < 16) throw new Error('Random bytes length must be >= 16');
          if (i) {
            if (s < 0 || s + 16 > i.length)
              throw new RangeError(`UUID byte range ${s}:${s + 15} is out of buffer bounds`);
          } else (i = new Uint8Array(16)), (s = 0);
          (t ??= Date.now()),
            (r ??= 0),
            (n ??= 16383 & ((e[8] << 8) | e[9])),
            (o ??= e.slice(10, 16));
          const a = (1e4 * (268435455 & (t += 122192928e5)) + r) % 4294967296;
          (i[s++] = (a >>> 24) & 255),
            (i[s++] = (a >>> 16) & 255),
            (i[s++] = (a >>> 8) & 255),
            (i[s++] = 255 & a);
          const u = ((t / 4294967296) * 1e4) & 268435455;
          (i[s++] = (u >>> 8) & 255),
            (i[s++] = 255 & u),
            (i[s++] = ((u >>> 24) & 15) | 16),
            (i[s++] = (u >>> 16) & 255),
            (i[s++] = (n >>> 8) | 128),
            (i[s++] = 255 & n);
          for (let e = 0; e < 6; ++e) i[s++] = o[e];
          return i;
        }
        (t.updateV1State = s),
          (t.default = function (e, t, r) {
            let u;
            const c = e?._v6 ?? !1;
            if (e) {
              const t = Object.keys(e);
              1 === t.length && '_v6' === t[0] && (e = void 0);
            }
            if (e)
              u = a(
                e.random ?? e.rng?.() ?? (0, n.default)(),
                e.msecs,
                e.nsecs,
                e.clockseq,
                e.node,
                t,
                r
              );
            else {
              const e = Date.now(),
                o = (0, n.default)();
              s(i, e, o),
                (u = a(o, i.msecs, i.nsecs, c ? void 0 : i.clockseq, c ? void 0 : i.node, t, r));
            }
            return t ?? (0, o.unsafeStringify)(u);
          });
      },
      502: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.URL = t.DNS = void 0);
        const n = r(766),
          o = r(157);
        var i = r(157);
        function s(e, t, r, i) {
          return (0, o.default)(80, n.default, e, t, r, i);
        }
        Object.defineProperty(t, 'DNS', {
          enumerable: !0,
          get: function () {
            return i.DNS;
          },
        }),
          Object.defineProperty(t, 'URL', {
            enumerable: !0,
            get: function () {
              return i.URL;
            },
          }),
          (s.DNS = o.DNS),
          (s.URL = o.URL),
          (t.default = s);
      },
      508: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.updateV7State = void 0);
        const n = r(942),
          o = r(202),
          i = {};
        function s(e, t, r) {
          return (
            (e.msecs ??= -1 / 0),
            (e.seq ??= 0),
            t > e.msecs
              ? ((e.seq = (r[6] << 23) | (r[7] << 16) | (r[8] << 8) | r[9]), (e.msecs = t))
              : ((e.seq = (e.seq + 1) | 0), 0 === e.seq && e.msecs++),
            e
          );
        }
        function a(e, t, r, n, o = 0) {
          if (e.length < 16) throw new Error('Random bytes length must be >= 16');
          if (n) {
            if (o < 0 || o + 16 > n.length)
              throw new RangeError(`UUID byte range ${o}:${o + 15} is out of buffer bounds`);
          } else (n = new Uint8Array(16)), (o = 0);
          return (
            (t ??= Date.now()),
            (r ??= ((127 * e[6]) << 24) | (e[7] << 16) | (e[8] << 8) | e[9]),
            (n[o++] = (t / 1099511627776) & 255),
            (n[o++] = (t / 4294967296) & 255),
            (n[o++] = (t / 16777216) & 255),
            (n[o++] = (t / 65536) & 255),
            (n[o++] = (t / 256) & 255),
            (n[o++] = 255 & t),
            (n[o++] = 112 | ((r >>> 28) & 15)),
            (n[o++] = (r >>> 20) & 255),
            (n[o++] = 128 | ((r >>> 14) & 63)),
            (n[o++] = (r >>> 6) & 255),
            (n[o++] = ((r << 2) & 255) | (3 & e[10])),
            (n[o++] = e[11]),
            (n[o++] = e[12]),
            (n[o++] = e[13]),
            (n[o++] = e[14]),
            (n[o++] = e[15]),
            n
          );
        }
        (t.updateV7State = s),
          (t.default = function (e, t, r) {
            let u;
            if (e) u = a(e.random ?? e.rng?.() ?? (0, n.default)(), e.msecs, e.seq, t, r);
            else {
              const e = Date.now(),
                o = (0, n.default)();
              s(i, e, o), (u = a(o, i.msecs, i.seq, t, r));
            }
            return t ?? (0, o.unsafeStringify)(u);
          });
      },
      524: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(873);
        t.default = function (e) {
          if (!(0, n.default)(e)) throw TypeError('Invalid UUID');
          let t;
          return Uint8Array.of(
            (t = parseInt(e.slice(0, 8), 16)) >>> 24,
            (t >>> 16) & 255,
            (t >>> 8) & 255,
            255 & t,
            (t = parseInt(e.slice(9, 13), 16)) >>> 8,
            255 & t,
            (t = parseInt(e.slice(14, 18), 16)) >>> 8,
            255 & t,
            (t = parseInt(e.slice(19, 23), 16)) >>> 8,
            255 & t,
            ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255,
            (t / 4294967296) & 255,
            (t >>> 24) & 255,
            (t >>> 16) & 255,
            (t >>> 8) & 255,
            255 & t
          );
        };
      },
      547: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(873);
        t.default = function (e) {
          if (!(0, n.default)(e)) throw TypeError('Invalid UUID');
          return parseInt(e.slice(14, 15), 16);
        };
      },
      588: (e, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = '00000000-0000-0000-0000-000000000000');
      },
      596: (e, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);
      },
      597: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(152),
          o = r(942),
          i = r(202);
        t.default = function (e, t, r) {
          if (n.default.randomUUID && !t && !e) return n.default.randomUUID();
          const s = (e = e || {}).random ?? e.rng?.() ?? (0, o.default)();
          if (s.length < 16) throw new Error('Random bytes length must be >= 16');
          if (((s[6] = (15 & s[6]) | 64), (s[8] = (63 & s[8]) | 128), t)) {
            if ((r = r || 0) < 0 || r + 16 > t.length)
              throw new RangeError(`UUID byte range ${r}:${r + 15} is out of buffer bounds`);
            for (let e = 0; e < 16; ++e) t[r + e] = s[e];
            return t;
          }
          return (0, i.unsafeStringify)(s);
        };
      },
      609: (e, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = 'ffffffff-ffff-ffff-ffff-ffffffffffff');
      },
      611: (e) => {
        'use strict';
        e.exports = require('http');
      },
      672: (e, t, r) => {
        var n = r(802),
          o = {
            getAllUsers: function (e, t) {
              var r = n.getAll();
              (t.statusCode = 200),
                t.setHeader('Content-Type', 'application/json'),
                t.end(JSON.stringify(r));
            },
            getUserById: function (e, t, r) {
              if (!n.isValidId(r))
                return (
                  (t.statusCode = 400),
                  t.setHeader('Content-Type', 'application/json'),
                  void t.end(JSON.stringify({ message: 'User ID is invalid' }))
                );
              var o = n.getById(r);
              if (!o)
                return (
                  (t.statusCode = 404),
                  t.setHeader('Content-Type', 'application/json'),
                  void t.end(JSON.stringify({ message: 'User not found' }))
                );
              (t.statusCode = 200),
                t.setHeader('Content-Type', 'application/json'),
                t.end(JSON.stringify(o));
            },
            createUser: function (e, t, r) {
              if (!r || !r.username || void 0 === r.age)
                return (
                  (t.statusCode = 400),
                  t.setHeader('Content-Type', 'application/json'),
                  void t.end(
                    JSON.stringify({ message: 'Request body does not contain required fields' })
                  )
                );
              var o = n.create(r);
              (t.statusCode = 201),
                t.setHeader('Content-Type', 'application/json'),
                t.end(JSON.stringify(o));
            },
            updateUser: function (e, t, r, o) {
              if (!n.isValidId(r))
                return (
                  (t.statusCode = 400),
                  t.setHeader('Content-Type', 'application/json'),
                  void t.end(JSON.stringify({ message: 'User ID is invalid' }))
                );
              var i = n.update(r, o);
              if (!i)
                return (
                  (t.statusCode = 404),
                  t.setHeader('Content-Type', 'application/json'),
                  void t.end(JSON.stringify({ message: 'User not found' }))
                );
              (t.statusCode = 200),
                t.setHeader('Content-Type', 'application/json'),
                t.end(JSON.stringify(i));
            },
            deleteUser: function (e, t, r) {
              return n.isValidId(r)
                ? n.delete(r)
                  ? ((t.statusCode = 204), void t.end())
                  : ((t.statusCode = 404),
                    t.setHeader('Content-Type', 'application/json'),
                    void t.end(JSON.stringify({ message: 'User not found' })))
                : ((t.statusCode = 400),
                  t.setHeader('Content-Type', 'application/json'),
                  void t.end(JSON.stringify({ message: 'User ID is invalid' })));
            },
          };
        e.exports = o;
      },
      766: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(982);
        t.default = function (e) {
          return (
            Array.isArray(e)
              ? (e = Buffer.from(e))
              : 'string' == typeof e && (e = Buffer.from(e, 'utf8')),
            (0, n.createHash)('sha1').update(e).digest()
          );
        };
      },
      802: (e, t, r) => {
        function n(e) {
          return (
            (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  }),
            n(e)
          );
        }
        function o(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function i(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? o(Object(r), !0).forEach(function (t) {
                  s(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                : o(Object(r)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                  });
          }
          return e;
        }
        function s(e, t, r) {
          return (
            (t = u(t)) in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function a(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(e, u(n.key), n);
          }
        }
        function u(e) {
          var t = (function (e) {
            if ('object' != n(e) || !e) return e;
            var t = e[Symbol.toPrimitive];
            if (void 0 !== t) {
              var r = t.call(e, 'string');
              if ('object' != n(r)) return r;
              throw new TypeError('@@toPrimitive must return a primitive value.');
            }
            return String(e);
          })(e);
          return 'symbol' == n(t) ? t : t + '';
        }
        var c = r(827).v4,
          f = [],
          l = (function () {
            function e(t) {
              var r = t.username,
                n = t.age,
                o = t.hobbies,
                i = void 0 === o ? [] : o;
              !(function (e, t) {
                if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
              })(this, e),
                (this.id = c()),
                (this.username = r),
                (this.age = n),
                (this.hobbies = i);
            }
            return (
              (t = e),
              (r = [
                {
                  key: 'getAll',
                  value: function () {
                    return f;
                  },
                },
                {
                  key: 'getById',
                  value: function (e) {
                    return f.find(function (t) {
                      return t.id === e;
                    });
                  },
                },
                {
                  key: 'create',
                  value: function (t) {
                    var r = new e(t);
                    return f.push(r), this.notifyChanges(), r;
                  },
                },
                {
                  key: 'update',
                  value: function (e, t) {
                    var r = f.findIndex(function (t) {
                      return t.id === e;
                    });
                    if (-1 === r) return null;
                    var n = i(i(i({}, f[r]), t), {}, { id: e });
                    return (f[r] = n), this.notifyChanges(), n;
                  },
                },
                {
                  key: 'delete',
                  value: function (e) {
                    var t = f.findIndex(function (t) {
                      return t.id === e;
                    });
                    return -1 !== t && (f.splice(t, 1), this.notifyChanges(), !0);
                  },
                },
                {
                  key: 'isValidId',
                  value: function (e) {
                    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                      e
                    );
                  },
                },
                {
                  key: 'syncUsers',
                  value: function (e) {
                    return (f = e);
                  },
                },
                {
                  key: 'notifyChanges',
                  value: function () {
                    process.send &&
                      'function' == typeof process.send &&
                      process.send({ type: 'UPDATE_USERS', data: f });
                  },
                },
              ]),
              null && a(t.prototype, null),
              r && a(t, r),
              Object.defineProperty(t, 'prototype', { writable: !1 }),
              t
            );
            var t, r;
          })();
        e.exports = l;
      },
      827: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.version =
            t.validate =
            t.v7 =
            t.v6ToV1 =
            t.v6 =
            t.v5 =
            t.v4 =
            t.v3 =
            t.v1ToV6 =
            t.v1 =
            t.stringify =
            t.parse =
            t.NIL =
            t.MAX =
              void 0);
        var n = r(609);
        Object.defineProperty(t, 'MAX', {
          enumerable: !0,
          get: function () {
            return n.default;
          },
        });
        var o = r(588);
        Object.defineProperty(t, 'NIL', {
          enumerable: !0,
          get: function () {
            return o.default;
          },
        });
        var i = r(524);
        Object.defineProperty(t, 'parse', {
          enumerable: !0,
          get: function () {
            return i.default;
          },
        });
        var s = r(202);
        Object.defineProperty(t, 'stringify', {
          enumerable: !0,
          get: function () {
            return s.default;
          },
        });
        var a = r(458);
        Object.defineProperty(t, 'v1', {
          enumerable: !0,
          get: function () {
            return a.default;
          },
        });
        var u = r(891);
        Object.defineProperty(t, 'v1ToV6', {
          enumerable: !0,
          get: function () {
            return u.default;
          },
        });
        var c = r(32);
        Object.defineProperty(t, 'v3', {
          enumerable: !0,
          get: function () {
            return c.default;
          },
        });
        var f = r(597);
        Object.defineProperty(t, 'v4', {
          enumerable: !0,
          get: function () {
            return f.default;
          },
        });
        var l = r(502);
        Object.defineProperty(t, 'v5', {
          enumerable: !0,
          get: function () {
            return l.default;
          },
        });
        var d = r(971);
        Object.defineProperty(t, 'v6', {
          enumerable: !0,
          get: function () {
            return d.default;
          },
        });
        var p = r(959);
        Object.defineProperty(t, 'v6ToV1', {
          enumerable: !0,
          get: function () {
            return p.default;
          },
        });
        var y = r(508);
        Object.defineProperty(t, 'v7', {
          enumerable: !0,
          get: function () {
            return y.default;
          },
        });
        var v = r(873);
        Object.defineProperty(t, 'validate', {
          enumerable: !0,
          get: function () {
            return v.default;
          },
        });
        var h = r(547);
        Object.defineProperty(t, 'version', {
          enumerable: !0,
          get: function () {
            return h.default;
          },
        });
      },
      857: (e) => {
        'use strict';
        e.exports = require('os');
      },
      873: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(596);
        t.default = function (e) {
          return 'string' == typeof e && n.default.test(e);
        };
      },
      891: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(524),
          o = r(202);
        t.default = function (e) {
          const t =
            ((r = 'string' == typeof e ? (0, n.default)(e) : e),
            Uint8Array.of(
              ((15 & r[6]) << 4) | ((r[7] >> 4) & 15),
              ((15 & r[7]) << 4) | ((240 & r[4]) >> 4),
              ((15 & r[4]) << 4) | ((240 & r[5]) >> 4),
              ((15 & r[5]) << 4) | ((240 & r[0]) >> 4),
              ((15 & r[0]) << 4) | ((240 & r[1]) >> 4),
              ((15 & r[1]) << 4) | ((240 & r[2]) >> 4),
              96 | (15 & r[2]),
              r[3],
              r[8],
              r[9],
              r[10],
              r[11],
              r[12],
              r[13],
              r[14],
              r[15]
            ));
          var r;
          return 'string' == typeof e ? (0, o.unsafeStringify)(t) : t;
        };
      },
      896: (e) => {
        'use strict';
        e.exports = require('fs');
      },
      928: (e) => {
        'use strict';
        e.exports = require('path');
      },
      942: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(982),
          o = new Uint8Array(256);
        let i = o.length;
        t.default = function () {
          return i > o.length - 16 && ((0, n.randomFillSync)(o), (i = 0)), o.slice(i, (i += 16));
        };
      },
      959: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(524),
          o = r(202);
        t.default = function (e) {
          const t =
            ((r = 'string' == typeof e ? (0, n.default)(e) : e),
            Uint8Array.of(
              ((15 & r[3]) << 4) | ((r[4] >> 4) & 15),
              ((15 & r[4]) << 4) | ((240 & r[5]) >> 4),
              ((15 & r[5]) << 4) | (15 & r[6]),
              r[7],
              ((15 & r[1]) << 4) | ((240 & r[2]) >> 4),
              ((15 & r[2]) << 4) | ((240 & r[3]) >> 4),
              16 | ((240 & r[0]) >> 4),
              ((15 & r[0]) << 4) | ((240 & r[1]) >> 4),
              r[8],
              r[9],
              r[10],
              r[11],
              r[12],
              r[13],
              r[14],
              r[15]
            ));
          var r;
          return 'string' == typeof e ? (0, o.unsafeStringify)(t) : t;
        };
      },
      971: (e, t, r) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(202),
          o = r(458),
          i = r(891);
        t.default = function (e, t, r) {
          (e ??= {}), (r ??= 0);
          let s = (0, o.default)({ ...e, _v6: !0 }, new Uint8Array(16));
          if (((s = (0, i.default)(s)), t)) {
            for (let e = 0; e < 16; e++) t[r + e] = s[e];
            return t;
          }
          return (0, n.unsafeStringify)(s);
        };
      },
      981: (e, t, r) => {
        function n(e) {
          return (
            (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  }),
            n(e)
          );
        }
        function o() {
          'use strict';
          o = function () {
            return t;
          };
          var e,
            t = {},
            r = Object.prototype,
            i = r.hasOwnProperty,
            s = 'function' == typeof Symbol ? Symbol : {},
            a = s.iterator || '@@iterator',
            u = s.asyncIterator || '@@asyncIterator',
            c = s.toStringTag || '@@toStringTag';
          function f(e, t, r, n) {
            return Object.defineProperty(e, t, {
              value: r,
              enumerable: !n,
              configurable: !n,
              writable: !n,
            });
          }
          try {
            f({}, '');
          } catch (e) {
            f = function (e, t, r) {
              return (e[t] = r);
            };
          }
          function l(t, r, n, o) {
            var i = r && r.prototype instanceof y ? r : y,
              s = Object.create(i.prototype);
            return (
              f(
                s,
                '_invoke',
                (function (t, r, n) {
                  var o = 1;
                  return function (i, s) {
                    if (3 === o) throw Error('Generator is already running');
                    if (4 === o) {
                      if ('throw' === i) throw s;
                      return { value: e, done: !0 };
                    }
                    for (n.method = i, n.arg = s; ; ) {
                      var a = n.delegate;
                      if (a) {
                        var u = _(a, n);
                        if (u) {
                          if (u === p) continue;
                          return u;
                        }
                      }
                      if ('next' === n.method) n.sent = n._sent = n.arg;
                      else if ('throw' === n.method) {
                        if (1 === o) throw ((o = 4), n.arg);
                        n.dispatchException(n.arg);
                      } else 'return' === n.method && n.abrupt('return', n.arg);
                      o = 3;
                      var c = d(t, r, n);
                      if ('normal' === c.type) {
                        if (((o = n.done ? 4 : 2), c.arg === p)) continue;
                        return { value: c.arg, done: n.done };
                      }
                      'throw' === c.type && ((o = 4), (n.method = 'throw'), (n.arg = c.arg));
                    }
                  };
                })(t, n, new N(o || [])),
                !0
              ),
              s
            );
          }
          function d(e, t, r) {
            try {
              return { type: 'normal', arg: e.call(t, r) };
            } catch (e) {
              return { type: 'throw', arg: e };
            }
          }
          t.wrap = l;
          var p = {};
          function y() {}
          function v() {}
          function h() {}
          var g = {};
          f(g, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            m = b && b(b(S([])));
          m && m !== r && i.call(m, a) && (g = m);
          var O = (h.prototype = y.prototype = Object.create(g));
          function w(e) {
            ['next', 'throw', 'return'].forEach(function (t) {
              f(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function E(e, t) {
            function r(o, s, a, u) {
              var c = d(e[o], e, s);
              if ('throw' !== c.type) {
                var f = c.arg,
                  l = f.value;
                return l && 'object' == n(l) && i.call(l, '__await')
                  ? t.resolve(l.__await).then(
                      function (e) {
                        r('next', e, a, u);
                      },
                      function (e) {
                        r('throw', e, a, u);
                      }
                    )
                  : t.resolve(l).then(
                      function (e) {
                        (f.value = e), a(f);
                      },
                      function (e) {
                        return r('throw', e, a, u);
                      }
                    );
              }
              u(c.arg);
            }
            var o;
            f(
              this,
              '_invoke',
              function (e, n) {
                function i() {
                  return new t(function (t, o) {
                    r(e, n, t, o);
                  });
                }
                return (o = o ? o.then(i, i) : i());
              },
              !0
            );
          }
          function _(t, r) {
            var n = r.method,
              o = t.i[n];
            if (o === e)
              return (
                (r.delegate = null),
                ('throw' === n &&
                  t.i.return &&
                  ((r.method = 'return'), (r.arg = e), _(t, r), 'throw' === r.method)) ||
                  ('return' !== n &&
                    ((r.method = 'throw'),
                    (r.arg = new TypeError("The iterator does not provide a '" + n + "' method")))),
                p
              );
            var i = d(o, t.i, r.arg);
            if ('throw' === i.type)
              return (r.method = 'throw'), (r.arg = i.arg), (r.delegate = null), p;
            var s = i.arg;
            return s
              ? s.done
                ? ((r[t.r] = s.value),
                  (r.next = t.n),
                  'return' !== r.method && ((r.method = 'next'), (r.arg = e)),
                  (r.delegate = null),
                  p)
                : s
              : ((r.method = 'throw'),
                (r.arg = new TypeError('iterator result is not an object')),
                (r.delegate = null),
                p);
          }
          function j(e) {
            this.tryEntries.push(e);
          }
          function D(t) {
            var r = t[4] || {};
            (r.type = 'normal'), (r.arg = e), (t[4] = r);
          }
          function N(e) {
            (this.tryEntries = [[-1]]), e.forEach(j, this), this.reset(!0);
          }
          function S(t) {
            if (null != t) {
              var r = t[a];
              if (r) return r.call(t);
              if ('function' == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var o = -1,
                  s = function r() {
                    for (; ++o < t.length; )
                      if (i.call(t, o)) return (r.value = t[o]), (r.done = !1), r;
                    return (r.value = e), (r.done = !0), r;
                  };
                return (s.next = s);
              }
            }
            throw new TypeError(n(t) + ' is not iterable');
          }
          return (
            (v.prototype = h),
            f(O, 'constructor', h),
            f(h, 'constructor', v),
            (v.displayName = f(h, c, 'GeneratorFunction')),
            (t.isGeneratorFunction = function (e) {
              var t = 'function' == typeof e && e.constructor;
              return !!t && (t === v || 'GeneratorFunction' === (t.displayName || t.name));
            }),
            (t.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, h)
                  : ((e.__proto__ = h), f(e, c, 'GeneratorFunction')),
                (e.prototype = Object.create(O)),
                e
              );
            }),
            (t.awrap = function (e) {
              return { __await: e };
            }),
            w(E.prototype),
            f(E.prototype, u, function () {
              return this;
            }),
            (t.AsyncIterator = E),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise);
              var s = new E(l(e, r, n, o), i);
              return t.isGeneratorFunction(r)
                ? s
                : s.next().then(function (e) {
                    return e.done ? e.value : s.next();
                  });
            }),
            w(O),
            f(O, c, 'Generator'),
            f(O, a, function () {
              return this;
            }),
            f(O, 'toString', function () {
              return '[object Generator]';
            }),
            (t.keys = function (e) {
              var t = Object(e),
                r = [];
              for (var n in t) r.unshift(n);
              return function e() {
                for (; r.length; ) if ((n = r.pop()) in t) return (e.value = n), (e.done = !1), e;
                return (e.done = !0), e;
              };
            }),
            (t.values = S),
            (N.prototype = {
              constructor: N,
              reset: function (t) {
                if (
                  ((this.prev = this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = e),
                  this.tryEntries.forEach(D),
                  !t)
                )
                  for (var r in this)
                    't' === r.charAt(0) && i.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0][4];
                if ('throw' === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var r = this;
                function n(e) {
                  (s.type = 'throw'), (s.arg = t), (r.next = e);
                }
                for (var o = r.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    s = i[4],
                    a = this.prev,
                    u = i[1],
                    c = i[2];
                  if (-1 === i[0]) return n('end'), !1;
                  if (!u && !c) throw Error('try statement without catch or finally');
                  if (null != i[0] && i[0] <= a) {
                    if (a < u) return (this.method = 'next'), (this.arg = e), n(u), !0;
                    if (a < c) return n(c), !1;
                  }
                }
              },
              abrupt: function (e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var n = this.tryEntries[r];
                  if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
                    var o = n;
                    break;
                  }
                }
                o && ('break' === e || 'continue' === e) && o[0] <= t && t <= o[2] && (o = null);
                var i = o ? o[4] : {};
                return (
                  (i.type = e),
                  (i.arg = t),
                  o ? ((this.method = 'next'), (this.next = o[2]), p) : this.complete(i)
                );
              },
              complete: function (e, t) {
                if ('throw' === e.type) throw e.arg;
                return (
                  'break' === e.type || 'continue' === e.type
                    ? (this.next = e.arg)
                    : 'return' === e.type
                      ? ((this.rval = this.arg = e.arg),
                        (this.method = 'return'),
                        (this.next = 'end'))
                      : 'normal' === e.type && t && (this.next = t),
                  p
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r[2] === e) return this.complete(r[4], r[3]), D(r), p;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r[0] === e) {
                    var n = r[4];
                    if ('throw' === n.type) {
                      var o = n.arg;
                      D(r);
                    }
                    return o;
                  }
                }
                throw Error('illegal catch attempt');
              },
              delegateYield: function (t, r, n) {
                return (
                  (this.delegate = { i: S(t), r, n }), 'next' === this.method && (this.arg = e), p
                );
              },
            }),
            t
          );
        }
        function i(e, t, r, n, o, i, s) {
          try {
            var a = e[i](s),
              u = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        var s = r(16),
          a = r(672),
          u = function (e) {
            return new Promise(function (t, r) {
              try {
                var n = '';
                e.on('data', function (e) {
                  n += e.toString();
                }),
                  e.on('end', function () {
                    try {
                      var e = n ? JSON.parse(n) : {};
                      t(e);
                    } catch (e) {
                      r(new Error('Invalid JSON in request body'));
                    }
                  });
              } catch (e) {
                r(e);
              }
            });
          },
          c = (function () {
            var e,
              t =
                ((e = o().mark(function e(t, r) {
                  var n, i, c, f, l, d;
                  return o().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((e.prev = 0),
                              (n = s.parse(t.url, !0)),
                              (i = n.pathname),
                              (c = i.replace(/^\/+|\/+$/g, '')),
                              r.setHeader('Content-Type', 'application/json'),
                              'api/users' !== c)
                            ) {
                              e.next = 21;
                              break;
                            }
                            if ('GET' !== t.method) {
                              e.next = 10;
                              break;
                            }
                            a.getAllUsers(t, r), (e.next = 19);
                            break;
                          case 10:
                            if ('POST' !== t.method) {
                              e.next = 17;
                              break;
                            }
                            return (e.next = 13), u(t);
                          case 13:
                            (f = e.sent), a.createUser(t, r, f), (e.next = 19);
                            break;
                          case 17:
                            (r.statusCode = 405),
                              r.end(JSON.stringify({ message: 'Method not allowed' }));
                          case 19:
                            e.next = 39;
                            break;
                          case 21:
                            if (!c.startsWith('api/users/')) {
                              e.next = 37;
                              break;
                            }
                            if (((l = c.split('/')[2]), 'GET' !== t.method)) {
                              e.next = 27;
                              break;
                            }
                            a.getUserById(t, r, l), (e.next = 35);
                            break;
                          case 27:
                            if ('PUT' !== t.method) {
                              e.next = 34;
                              break;
                            }
                            return (e.next = 30), u(t);
                          case 30:
                            (d = e.sent), a.updateUser(t, r, l, d), (e.next = 35);
                            break;
                          case 34:
                            'DELETE' === t.method
                              ? a.deleteUser(t, r, l)
                              : ((r.statusCode = 405),
                                r.end(JSON.stringify({ message: 'Method not allowed' })));
                          case 35:
                            e.next = 39;
                            break;
                          case 37:
                            (r.statusCode = 404),
                              r.end(JSON.stringify({ message: 'Endpoint not found' }));
                          case 39:
                            e.next = 46;
                            break;
                          case 41:
                            (e.prev = 41),
                              (e.t0 = e.catch(0)),
                              console.error('Error handling request:', e.t0),
                              (r.statusCode = 500),
                              r.end(JSON.stringify({ message: 'Internal server error' }));
                          case 46:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 41]]
                  );
                })),
                function () {
                  var t = this,
                    r = arguments;
                  return new Promise(function (n, o) {
                    var s = e.apply(t, r);
                    function a(e) {
                      i(s, n, o, a, u, 'next', e);
                    }
                    function u(e) {
                      i(s, n, o, a, u, 'throw', e);
                    }
                    a(void 0);
                  });
                });
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })();
        e.exports = { handleRequest: c };
      },
      982: (e) => {
        'use strict';
        e.exports = require('crypto');
      },
      998: (e, t, r) => {
        const n = r(896),
          o = r(928),
          i = r(857),
          s = r(982),
          a = r(56).version,
          u =
            /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;
        function c(e) {
          console.log(`[dotenv@${a}][DEBUG] ${e}`);
        }
        function f(e) {
          return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0
            ? e.DOTENV_KEY
            : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0
              ? process.env.DOTENV_KEY
              : '';
        }
        function l(e, t) {
          let r;
          try {
            r = new URL(t);
          } catch (e) {
            if ('ERR_INVALID_URL' === e.code) {
              const e = new Error(
                'INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development'
              );
              throw ((e.code = 'INVALID_DOTENV_KEY'), e);
            }
            throw e;
          }
          const n = r.password;
          if (!n) {
            const e = new Error('INVALID_DOTENV_KEY: Missing key part');
            throw ((e.code = 'INVALID_DOTENV_KEY'), e);
          }
          const o = r.searchParams.get('environment');
          if (!o) {
            const e = new Error('INVALID_DOTENV_KEY: Missing environment part');
            throw ((e.code = 'INVALID_DOTENV_KEY'), e);
          }
          const i = `DOTENV_VAULT_${o.toUpperCase()}`,
            s = e.parsed[i];
          if (!s) {
            const e = new Error(
              `NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${i} in your .env.vault file.`
            );
            throw ((e.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'), e);
          }
          return { ciphertext: s, key: n };
        }
        function d(e) {
          let t = null;
          if (e && e.path && e.path.length > 0)
            if (Array.isArray(e.path))
              for (const r of e.path)
                n.existsSync(r) && (t = r.endsWith('.vault') ? r : `${r}.vault`);
            else t = e.path.endsWith('.vault') ? e.path : `${e.path}.vault`;
          else t = o.resolve(process.cwd(), '.env.vault');
          return n.existsSync(t) ? t : null;
        }
        function p(e) {
          return '~' === e[0] ? o.join(i.homedir(), e.slice(1)) : e;
        }
        const y = {
          configDotenv: function (e) {
            const t = o.resolve(process.cwd(), '.env');
            let r = 'utf8';
            const i = Boolean(e && e.debug);
            e && e.encoding
              ? (r = e.encoding)
              : i && c('No encoding is specified. UTF-8 is used by default');
            let s,
              a = [t];
            if (e && e.path)
              if (Array.isArray(e.path)) {
                a = [];
                for (const t of e.path) a.push(p(t));
              } else a = [p(e.path)];
            const u = {};
            for (const t of a)
              try {
                const o = y.parse(n.readFileSync(t, { encoding: r }));
                y.populate(u, o, e);
              } catch (e) {
                i && c(`Failed to load ${t} ${e.message}`), (s = e);
              }
            let f = process.env;
            return (
              e && null != e.processEnv && (f = e.processEnv),
              y.populate(f, u, e),
              s ? { parsed: u, error: s } : { parsed: u }
            );
          },
          _configVault: function (e) {
            Boolean(e && e.debug) && c('Loading env from encrypted .env.vault');
            const t = y._parseVault(e);
            let r = process.env;
            return (
              e && null != e.processEnv && (r = e.processEnv), y.populate(r, t, e), { parsed: t }
            );
          },
          _parseVault: function (e) {
            const t = d(e),
              r = y.configDotenv({ path: t });
            if (!r.parsed) {
              const e = new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
              throw ((e.code = 'MISSING_DATA'), e);
            }
            const n = f(e).split(','),
              o = n.length;
            let i;
            for (let e = 0; e < o; e++)
              try {
                const t = l(r, n[e].trim());
                i = y.decrypt(t.ciphertext, t.key);
                break;
              } catch (t) {
                if (e + 1 >= o) throw t;
              }
            return y.parse(i);
          },
          config: function (e) {
            if (0 === f(e).length) return y.configDotenv(e);
            const t = d(e);
            return t
              ? y._configVault(e)
              : ((r = `You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`),
                console.log(`[dotenv@${a}][WARN] ${r}`),
                y.configDotenv(e));
            var r;
          },
          decrypt: function (e, t) {
            const r = Buffer.from(t.slice(-64), 'hex');
            let n = Buffer.from(e, 'base64');
            const o = n.subarray(0, 12),
              i = n.subarray(-16);
            n = n.subarray(12, -16);
            try {
              const e = s.createDecipheriv('aes-256-gcm', r, o);
              return e.setAuthTag(i), `${e.update(n)}${e.final()}`;
            } catch (e) {
              const t = e instanceof RangeError,
                r = 'Invalid key length' === e.message,
                n = 'Unsupported state or unable to authenticate data' === e.message;
              if (t || r) {
                const e = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)');
                throw ((e.code = 'INVALID_DOTENV_KEY'), e);
              }
              if (n) {
                const e = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY');
                throw ((e.code = 'DECRYPTION_FAILED'), e);
              }
              throw e;
            }
          },
          parse: function (e) {
            const t = {};
            let r,
              n = e.toString();
            for (n = n.replace(/\r\n?/gm, '\n'); null != (r = u.exec(n)); ) {
              const e = r[1];
              let n = r[2] || '';
              n = n.trim();
              const o = n[0];
              (n = n.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
                '"' === o && ((n = n.replace(/\\n/g, '\n')), (n = n.replace(/\\r/g, '\r'))),
                (t[e] = n);
            }
            return t;
          },
          populate: function (e, t, r = {}) {
            const n = Boolean(r && r.debug),
              o = Boolean(r && r.override);
            if ('object' != typeof t) {
              const e = new Error(
                'OBJECT_REQUIRED: Please check the processEnv argument being passed to populate'
              );
              throw ((e.code = 'OBJECT_REQUIRED'), e);
            }
            for (const r of Object.keys(t))
              Object.prototype.hasOwnProperty.call(e, r)
                ? (!0 === o && (e[r] = t[r]),
                  n &&
                    c(
                      !0 === o
                        ? `"${r}" is already defined and WAS overwritten`
                        : `"${r}" is already defined and was NOT overwritten`
                    ))
                : (e[r] = t[r]);
          },
        };
        (e.exports.configDotenv = y.configDotenv),
          (e.exports._configVault = y._configVault),
          (e.exports._parseVault = y._parseVault),
          (e.exports.config = y.config),
          (e.exports.decrypt = y.decrypt),
          (e.exports.parse = y.parse),
          (e.exports.populate = y.populate),
          (e.exports = y);
      },
    },
    t = {};
  function r(n) {
    var o = t[n];
    if (void 0 !== o) return o.exports;
    var i = (t[n] = { exports: {} });
    return e[n](i, i.exports, r), i.exports;
  }
  var n = r(611),
    o = r(998),
    i = r(981).handleRequest;
  o.config();
  var s = process.env.PORT || 4e3;
  n.createServer(i).listen(s, function () {
    console.log('Server running at http://localhost:'.concat(s, '/'));
  }),
    process.on('uncaughtException', function (e) {
      console.error('Uncaught Exception:', e), process.exit(1);
    });
})();
