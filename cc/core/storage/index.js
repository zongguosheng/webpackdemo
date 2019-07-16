Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    getKeySync: function(e, t) {
        var r = wx.getStorageSync(e);
        return r ? JSON.parse(r).data || t : t;
    },
    setKeySync: function(e, t) {
        var r = {
            data: t
        };
        return wx.setStorageSync(e, JSON.stringify(r)), this;
    },
    removeSync: function(e) {
        wx.removeStorageSync(e);
    },
    clearSync: function() {
        wx.clearStorageSync();
    }
};

exports.default = e;