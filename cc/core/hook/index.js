Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./hook"), o = {}, n = {}, r = {}, a = {}, t = [], i = [], f = function(r) {
    var a = [ "onLaunch", "onShow", "onHide", "onError", "onPageNotFound" ], i = (0, 
    e.transformOption)(r, t, a, o, n);
    App(i);
};

f.mixins = function(r) {
    (0, e.mergeData)(t, r.data), (0, e.merge)(o, r.before), (0, e.merge)(n, r.after);
};

var d = function(o) {
    var n = [ "onLoad", "onShow", "onReady", "onHide", "onUnload", "onShareAppMessage" ], t = (0, 
    e.transformOption)(o, i, n, r, a);
    Page(t);
};

d.mixins = function(o) {
    (0, e.mergeData)(i, o.data), (0, e.merge)(r, o.before), (0, e.merge)(a, o.after);
}, exports.default = {
    App: f,
    Page: d
};