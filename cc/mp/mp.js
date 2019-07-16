function e(e) {
    return e.split(".").map(function(e) {
        return parseInt(e, 10);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    compareVersion: function(r, t) {
        for (var n = e(r), u = e(t), o = Math.max(n.length, u.length), a = 0; a < o; a++) {
            var i = (n[a] || 0) - (u[a] || 0);
            if (i > 0) return 1;
            if (i < 0) return -1;
        }
        return 0;
    }
};