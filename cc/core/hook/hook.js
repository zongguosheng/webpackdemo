function r(r) {
    if (Array.isArray(r)) {
        for (var t = 0, o = Array(r.length); t < r.length; t++) o[t] = r[t];
        return o;
    }
    return Array.from(r);
}

function t(t, o, n, a) {
    var e = t[o];
    t[o] = function() {
        var t = this, c = arguments, i = null;
        n[o] && n[o].forEach(function(r) {
            i = r.apply(void 0, [ t ].concat(Array.prototype.slice.call(c)));
        }), i ? Array.prototype.isPrototypeOf(i) || (i = [ i ]) : i = arguments, e && e.apply(void 0, r(i)), 
        a[o] && a[o].forEach(function(r) {
            r(t, c);
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.merge = function(r, t) {
    t && Object.keys(t).forEach(function(o) {
        r[o] = r[o] || [], r[o].push(t[o]);
    });
}, exports.mergeData = function(r, t) {
    t && r.push(t);
}, exports.transformOption = function(r, o, n, a, e) {
    var c = {};
    return o.forEach(function(r) {
        Object.assign(c, r);
    }), Object.assign(c, r.data || {}), r.data = c, n.forEach(function(o) {
        t(r, o, a, e);
    }), r;
};