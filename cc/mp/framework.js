function n(n, t, o, r) {
    var u = n[t];
    u && (n[t] = function(n) {
        var e = this;
        o[t] && o[t].forEach(function(t) {
            t(e, n);
        }), u.call(this, n), r[t] && r[t].forEach(function(t) {
            t(e, n);
        });
    });
}

function t(t) {
    var o = r({}, t);
    return [ "onLaunch", "onShow", "onHide", "onError", "onPageNotFound" ].forEach(function(t) {
        n(o, t, u, e);
    }), o;
}

function o(t) {
    var o = r({}, t);
    return [ "onLoad", "onShow", "onReady", "onHide", "onUnload" ].forEach(function(t) {
        n(o, t, i, a);
    }), o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (n[r] = o[r]);
    }
    return n;
}, u = {}, e = {}, i = {}, a = {};

exports.default = {
    App: function(n) {
        function t(t) {
            return n.apply(this, arguments);
        }
        return t.toString = function() {
            return n.toString();
        }, t;
    }(function(n) {
        var o = t(n);
        App(o);
    }),
    beforeApp: function(n, t) {
        u[n] || (u[n] = []), u[n].push(t);
    },
    afterApp: function(n, t) {
        e[n] || (e[n] = []), e[n].push(t);
    },
    Page: function(n) {
        function t(t) {
            return n.apply(this, arguments);
        }
        return t.toString = function() {
            return n.toString();
        }, t;
    }(function(n) {
        var t = o(n);
        Page(t);
    }),
    beforePage: function(n, t) {
        i[n] || (i[n] = []), i[n].push(t);
    },
    afterPage: function(n, t) {
        a[n] || (a[n] = []), a[n].push(t);
    }
};