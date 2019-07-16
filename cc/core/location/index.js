Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    getLocation: function(e) {
        return new Promise(function(t, n) {
            wx.getLocation({
                type: e.type,
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    }
};