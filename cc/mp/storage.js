Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    getSync: function(t, e) {
        var r = wx.getStorageSync(t);
        return r || e || r;
    },
    setSync: function(t, e) {
        return wx.setStorageSync(t, e), this;
    },
    get: function(t) {
        wx.getStorage(t);
    },
    set: function(t) {
        return wx.getStorage(t), this;
    }
};

exports.default = t;