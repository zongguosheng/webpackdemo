Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    getSystemInfo: function(e) {
        wx.getSystemInfo(e);
    },
    getSystemInfoSync: function() {
        return wx.getSystemInfoSync();
    }
};