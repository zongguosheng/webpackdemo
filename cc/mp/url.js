function n(n, t, r) {
    var e = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    n[t] = e ? encodeURIComponent(r) : r;
}

function t() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], e = n[t];
    return e ? r ? decodeURIComponent(e) : e : null;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function n(n, t) {
        var r = [], e = !0, o = !1, i = void 0;
        try {
            for (var u, a = n[Symbol.iterator](); !(e = (u = a.next()).done) && (r.push(u.value), 
            !t || r.length !== t); e = !0) ;
        } catch (n) {
            o = !0, i = n;
        } finally {
            try {
                !e && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return n(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = "__payload__", o = "__from__", i = "__to__";

exports.default = {
    addPayload: function(t, r) {
        var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = r;
        (!(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]) && (i = JSON.stringify(r)), 
        n(t, e, i, o);
    },
    getPayload: function(n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i = t(n, e, r);
        return i ? o ? JSON.parse(i) : i : {};
    },
    addFrom: function(t, r) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        n(t, o, r, e);
    },
    getFrom: function(n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return t(n, o, r);
    },
    addTo: function(t, r) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        n(t, i, r, e);
    },
    getTo: function(n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return t(n, i, r);
    },
    toQueryString: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return Object.keys(n).map(function(r) {
            var e = n[r];
            return r + "=" + (t ? encodeURIComponent(e) : e);
        }).join("&");
    },
    fromQueryString: function(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return n ? n.split("&").map(function(n) {
            return n.split("=");
        }).reduce(function(n, e) {
            var o = r(e, 2), i = o[0], u = o[1];
            return n[i] = t ? decodeURIComponent(u) : u, n;
        }, {}) : {};
    },
    toUrlString: function(n, t) {
        return n + "?" + t;
    }
};