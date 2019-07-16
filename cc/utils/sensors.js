function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = t(require("../mp/framework")), r = t(require("./sensors.conf")), i = {}, o = {};

o.para = r.default, o._queue = [], o.getSystemInfoComplete = !1;

var s = Array.prototype, a = Function.prototype, c = Object.prototype, u = s.slice, f = c.toString, l = c.hasOwnProperty;

o.lib_version = "0.6";

var p = "object" === (void 0 === p ? "undefined" : e(p)) ? p : {};

p.info = function() {
    if ("object" === ("undefined" == typeof console ? "undefined" : e(console)) && console.log) try {
        return console.log.apply(console, arguments);
    } catch (t) {
        console.log(arguments[0]);
    }
}, function() {
    a.bind;
    var t = s.forEach, e = s.indexOf, n = Array.isArray, r = {}, o = i.each = function(e, n, i) {
        if (null == e) return !1;
        if (t && e.forEach === t) e.forEach(n, i); else if (e.length === +e.length) {
            for (var o = 0, s = e.length; o < s; o++) if (o in e && n.call(i, e[o], o, e) === r) return !1;
        } else for (var a in e) if (l.call(e, a) && n.call(i, e[a], a, e) === r) return !1;
    };
    i.logger = p, i.extend = function(t) {
        return o(u.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && (t[n] = e[n]);
        }), t;
    }, i.extend2Lev = function(t) {
        return o(u.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && (i.isObject(e[n]) && i.isObject(t[n]) ? i.extend(t[n], e[n]) : t[n] = e[n]);
        }), t;
    }, i.coverExtend = function(t) {
        return o(u.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && void 0 === t[n] && (t[n] = e[n]);
        }), t;
    }, i.isArray = n || function(t) {
        return "[object Array]" === f.call(t);
    }, i.isFunction = function(t) {
        try {
            return /^\s*\bfunction\b/.test(t);
        } catch (t) {
            return !1;
        }
    }, i.isArguments = function(t) {
        return !(!t || !l.call(t, "callee"));
    }, i.toArray = function(t) {
        return t ? t.toArray ? t.toArray() : i.isArray(t) ? u.call(t) : i.isArguments(t) ? u.call(t) : i.values(t) : [];
    }, i.values = function(t) {
        var e = [];
        return null == t ? e : (o(t, function(t) {
            e[e.length] = t;
        }), e);
    }, i.include = function(t, n) {
        var i = !1;
        return null == t ? i : e && t.indexOf === e ? -1 != t.indexOf(n) : (o(t, function(t) {
            if (i || (i = t === n)) return r;
        }), i);
    };
}(), i.trim = function(t) {
    return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}, i.isObject = function(t) {
    return "[object Object]" == f.call(t) && null != t;
}, i.isEmptyObject = function(t) {
    if (i.isObject(t)) {
        for (var e in t) if (l.call(t, e)) return !1;
        return !0;
    }
    return !1;
}, i.isUndefined = function(t) {
    return void 0 === t;
}, i.isString = function(t) {
    return "[object String]" == f.call(t);
}, i.isDate = function(t) {
    return "[object Date]" == f.call(t);
}, i.isBoolean = function(t) {
    return "[object Boolean]" == f.call(t);
}, i.isNumber = function(t) {
    return "[object Number]" == f.call(t) && /[\d\.]+/.test(String(t));
}, i.isJSONString = function(t) {
    try {
        JSON.parse(t);
    } catch (t) {
        return !1;
    }
    return !0;
}, i.decodeURIComponent = function(t) {
    var e = "";
    try {
        e = decodeURIComponent(t);
    } catch (n) {
        e = t;
    }
    return e;
}, i.encodeDates = function(t) {
    return i.each(t, function(e, n) {
        i.isDate(e) ? t[n] = i.formatDate(e) : i.isObject(e) && (t[n] = i.encodeDates(e));
    }), t;
}, i.formatDate = function(t) {
    function e(t) {
        return t < 10 ? "0" + t : t;
    }
    return t.getFullYear() + "-" + e(t.getMonth() + 1) + "-" + e(t.getDate()) + " " + e(t.getHours()) + ":" + e(t.getMinutes()) + ":" + e(t.getSeconds()) + "." + e(t.getMilliseconds());
}, i.searchObjDate = function(t) {
    i.isObject(t) && i.each(t, function(e, n) {
        i.isObject(e) ? i.searchObjDate(t[n]) : i.isDate(e) && (t[n] = i.formatDate(e));
    });
}, i.formatString = function(t) {
    return t.length > o.para.max_string_length ? (p.info("字符串长度超过限制，已经做截取--" + t), t.slice(0, o.para.max_string_length)) : t;
}, i.searchObjString = function(t) {
    i.isObject(t) && i.each(t, function(e, n) {
        i.isObject(e) ? i.searchObjString(t[n]) : i.isString(e) && (t[n] = i.formatString(e));
    });
}, i.unique = function(t) {
    for (var e, n = [], r = {}, i = 0; i < t.length; i++) (e = t[i]) in r || (r[e] = !0, 
    n.push(e));
    return n;
}, i.strip_sa_properties = function(t) {
    return i.isObject(t) ? (i.each(t, function(e, n) {
        if (i.isArray(e)) {
            var r = [];
            i.each(e, function(t) {
                i.isString(t) ? r.push(t) : p.info("您的数据-", e, "的数组里的值必须是字符串,已经将其删除");
            }), 0 !== r.length ? t[n] = r : (delete t[n], p.info("已经删除空的数组"));
        }
        i.isString(e) || i.isNumber(e) || i.isDate(e) || i.isBoolean(e) || i.isArray(e) || (p.info("您的数据-", e, "-格式不满足要求，我们已经将其删除"), 
        delete t[n]);
    }), t) : t;
}, i.strip_empty_properties = function(t) {
    var e = {};
    return i.each(t, function(t, n) {
        null != t && (e[n] = t);
    }), e;
}, i.utf8Encode = function(t) {
    var e, n, r, i = "", o = 0;
    for (e = n = 0, o = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, 
    r = 0; r < o; r++) {
        var s = t.charCodeAt(r), a = null;
        s < 128 ? n++ : a = s > 127 && s < 2048 ? String.fromCharCode(s >> 6 | 192, 63 & s | 128) : String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128), 
        null !== a && (n > e && (i += t.substring(e, n)), i += a, e = n = r + 1);
    }
    return n > e && (i += t.substring(e, t.length)), i;
}, i.base64Encode = function(t) {
    var e, n, r, o, s, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = 0, u = 0, f = "", l = [];
    if (!t) return t;
    t = i.utf8Encode(t);
    do {
        e = (s = t.charCodeAt(c++) << 16 | t.charCodeAt(c++) << 8 | t.charCodeAt(c++)) >> 18 & 63, 
        n = s >> 12 & 63, r = s >> 6 & 63, o = 63 & s, l[u++] = a.charAt(e) + a.charAt(n) + a.charAt(r) + a.charAt(o);
    } while (c < t.length);
    switch (f = l.join(""), t.length % 3) {
      case 1:
        f = f.slice(0, -2) + "==";
        break;

      case 2:
        f = f.slice(0, -1) + "=";
    }
    return f;
}, i.info = {
    properties: {
        $lib: "MiniProgram",
        $lib_version: String("0.6"),
        $user_agent: "SensorsAnalytics MP SDK"
    },
    getSystem: function() {
        function t() {
            wx.getSystemInfo({
                success: function(t) {
                    e.$model = t.model, e.$screen_width = Number(t.windowWidth), e.$screen_height = Number(t.windowHeight), 
                    e.$os = t.system.split(" ")[0], e.$os_version = t.system.split(" ")[1];
                },
                complete: n.setStatusComplete
            });
        }
        var e = this.properties, n = this;
        wx.getNetworkType({
            success: function(t) {
                e.$network_type = t.networkType;
            },
            complete: t
        });
    },
    setStatusComplete: function() {
        o.getSystemInfoComplete = !0, o._queue.length > 0 && (i.each(o._queue, function(t) {
            o.prepareData.apply(o, u.call(t));
        }), o._queue = []);
    }
}, o._ = i, o.prepareData = function(t, n) {
    if (!o.getSystemInfoComplete) return o._queue.push(arguments), !1;
    var r = {
        distinct_id: this.store.getDistinctId(),
        lib: {
            $lib: "MiniProgram",
            $lib_method: "code",
            $lib_version: String("0.6")
        },
        properties: {}
    };
    i.extend(r, t), i.isObject(t.properties) && !i.isEmptyObject(t.properties) && i.extend(r.properties, t.properties), 
    t.type && "profile" === t.type.slice(0, 7) || (r.properties = i.extend({}, i.info.properties, o.store.getProps(), r.properties)), 
    r.properties.$time && i.isDate(r.properties.$time) ? (r.time = 1 * r.properties.$time, 
    delete r.properties.$time) : o.para.use_client_time && (r.time = 1 * new Date()), 
    "object" === e(o.store._state) && "number" == typeof o.store._state.first_visit_day_time && o.store._state.first_visit_day_time > new Date().getTime() ? r.properties.$is_first_day = !0 : r.properties.$is_first_day = !1, 
    i.searchObjDate(r), i.searchObjString(r), o.send(r, n);
}, o.store = {
    getUUID: function() {
        return Date.now() + "-" + Math.floor(1e7 * Math.random()) + "-" + Math.random().toString(16).replace(".", "") + "-" + String(31242 * Math.random()).replace(".", "").slice(0, 8);
    },
    setStorage: function() {},
    getStorage: function() {
        return wx.getStorageSync("sensorsdata2015_wechat") || "";
    },
    _state: {},
    toState: function(t) {
        var e = null;
        i.isJSONString(t) && (e = JSON.parse(t)).distinct_id ? this._state = e : this.set("distinct_id", this.getUUID());
    },
    getFirstId: function() {
        return this._state.first_id;
    },
    getDistinctId: function() {
        return this._state.distinct_id;
    },
    getProps: function() {
        return this._state.props || {};
    },
    setProps: function(t, e) {
        var n = this._state.props || {};
        e ? this.set("props", t) : (i.extend(n, t), this.set("props", n));
    },
    set: function(t, n) {
        var r = {};
        "string" == typeof t ? r[t] = n : "object" === (void 0 === t ? "undefined" : e(t)) && (r = t), 
        this._state = this._state || {};
        for (var i in r) this._state[i] = r[i];
        this.save();
    },
    change: function(t, e) {
        this._state[t] = e;
    },
    save: function() {
        wx.setStorageSync("sensorsdata2015_wechat", JSON.stringify(this._state));
    },
    init: function() {
        var t = this.getStorage();
        if (t) this.toState(t); else {
            var e = new Date(), n = e.getTime();
            e.setHours(23), e.setMinutes(59), e.setSeconds(60), this.set({
                distinct_id: this.getUUID(),
                first_visit_time: n,
                first_visit_day_time: e.getTime()
            });
        }
    }
}, o.setProfile = function(t, e) {
    o.prepareData({
        type: "profile_set",
        properties: t
    }, e);
}, o.setOnceProfile = function(t, e) {
    o.prepareData({
        type: "profile_set_once",
        properties: t
    }, e);
}, o.track = function(t, e, n) {
    this.prepareData({
        type: "track",
        event: t,
        properties: e
    }, n);
}, o.identify = function(t, n) {
    if ("number" == typeof t) t = String(t); else if ("string" != typeof t) return !1;
    var r = o.store.getFirstId(), i = o.store.getDistinctId().split("-");
    "object" === (void 0 === i ? "undefined" : e(i)) && 4 === i.length && (!0 === n ? r ? o.store.set("first_id", t) : o.store.set("distinct_id", t) : r ? o.store.change("first_id", t) : o.store.change("distinct_id", t));
}, o.trackSignup = function(t, e, n, r) {
    o.prepareData({
        original_id: o.store.getFirstId() || o.store.getDistinctId(),
        distinct_id: t,
        type: "track_signup",
        event: e,
        properties: n
    }, r), o.store.set("distinct_id", t);
}, o.register = function(t) {
    i.isObject(t) && !i.isEmptyObject(t) && o.store.setProps(t);
}, o.clearAllRegister = function() {
    o.store.setProps({}, !0);
}, o.login = function(t) {
    var e = o.store.getFirstId(), n = o.store.getDistinctId();
    t !== n && (e ? o.trackSignup(t, "$SignUp") : (o.store.set("first_id", n), o.trackSignup(t, "$SignUp")));
}, o.init = function() {
    this._.info.getSystem(), this.store.init(), i.isObject(this.para.register) && (i.info.properties = i.extend(i.info.properties, this.para.register));
}, o.send = function(t) {
    var e = 0, n = "";
    t._nocache = (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15), 
    p.info(t), t = JSON.stringify(t), n = -1 !== o.para.server_url.indexOf("?") ? o.para.server_url + "&data=" + encodeURIComponent(i.base64Encode(t)) : o.para.server_url + "?data=" + encodeURIComponent(i.base64Encode(t));
    !function t() {
        wx.request({
            url: n,
            method: "GET",
            fail: function() {
                p.info("发送错误，重新发送"), e < 2 && (e++, t());
            }
        });
    }();
};

var d = {};

n.default.beforeApp("onLaunch", function(t) {
    t[o.para.name] = o, t.wxPatch = d, o.init();
}), n.default.beforePage("onShow", function(t, e) {
    var n = "string" == typeof t.__route__ ? t.__route__ : "系统没有取到值";
    o.para.onshow && o.para.onshow(o, n, t);
}), n.default.beforePage("onHide", function(t) {
    d.lastRoute = t.route;
}), n.default.beforePage("onUnload", function(t) {
    d.lastRoute = t.route;
}), exports.default = {
    init: function() {
        console.log("sensors init");
    }
};