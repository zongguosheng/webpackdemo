function e(e) {
    if (Array.isArray(e)) {
        for (var n = 0, t = Array(e.length); n < e.length; n++) t[n] = e[n];
        return t;
    }
    return Array.from(e);
}

function n(e) {
    return e.lineId + "," + e.sn + "," + e.order + ",1";
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return e.length ? e.map(function(e, n) {
        return {
            name: e,
            type: "fav"
        };
    }) : [ i ];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./fav.api")), a = [], u = {}, i = {
    name: "收藏",
    type: "fav"
};

exports.default = {
    reset: function() {},
    getByTag: function(t) {
        var a = this;
        return r.default.allLines().then(function(r) {
            var o = [];
            return r.lines.forEach(function(e) {
                var t = n({
                    lineId: e.line.lineId,
                    sn: e.targetStation.sn,
                    order: e.targetStation.order
                }), r = e.favTagName;
                u[t] = r, o.push(r);
            }), a.updateTags([].concat(e(new Set(o)))), t === i.id ? r.lines : r.lines.filter(function(e) {
                return e.favTagName === t;
            });
        });
    },
    isFav: function(e) {
        return n(e) in u;
    },
    toggleFav: function(e) {
        var t = n(e);
        return 1 === e.fav ? (delete u[t], r.default.removeLine(e)) : r.default.addLine(e).then(function() {
            var n = e.tagName;
            u[t] = n, a.push(n);
        });
    },
    removeTagName: function(e) {
        return r.default.removeTag(e).then(function() {
            return a = a.filter(function(n) {
                return n !== e;
            });
        });
    },
    updateTags: function(n) {
        return a = t(n), [].concat(e(a));
    },
    getTags: function() {
        return a;
    },
    removeLine: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            lineId: "",
            sn: "",
            nsn: "",
            order: -1,
            tagName: ""
        }, t = n(e);
        return delete u[t], r.default.removeLine(e);
    }
};