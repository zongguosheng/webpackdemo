function e(e) {
    return e && "object" === (void 0 === e ? "undefined" : r(e)) && "undefined" !== e;
}

function t(e) {
    return e ? Object.assign({}, e) : {};
}

function n(e, n) {
    e.scene = n.scene || e.scene, e.path = n.path || e.path, e.shareTicket = n.shareTicket || e.shareTicket, 
    Object.assign(e.query, n.query);
    var r = n.referrerInfo;
    return r && Object.assign(e.params, o({
        appId: r.appId
    }, t(r.extraData))), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
}, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = {
    path: null,
    scene: "NO_SCENE",
    shareTicket: null,
    query: {
        from: "NO_FROM"
    },
    params: {}
};

exports.default = {
    update: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(t) ? (n(a, t), console.log("session=", a)) : console.log("[update] check options fail");
    },
    get: function() {
        return a;
    }
};