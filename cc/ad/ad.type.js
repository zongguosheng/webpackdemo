Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _ = 0, T = 10, E = 19, P = 11, e = 17;

exports.default = {
    AD_TYPE_LINK: 1,
    AD_TYPE_MP_OUTER: 2,
    AD_TYPE_MP_INNER: 3,
    TARGET_TYPE_LINK: _,
    TARGET_TYPE_MP_OUTER: T,
    TARGET_TYPE_MP_INSERT_OUTER: E,
    TARGET_TYPE_MP_INNER: P,
    TARGET_TYPE_MP_PLUGIN: e,
    supportTargetType: function(t) {
        return t === _ || t === T || t === E || t === P || t === e;
    }
};