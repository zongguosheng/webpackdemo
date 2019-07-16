Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./config.js");

exports.default = {
    isOpen: !1,
    open: function(o, n) {
        var c = this;
        return new Promise(function(t, s) {
            console.log(e.socketBase + "/" + o + "/" + n), wx.connectSocket({
                url: e.socketBase + "/" + o + "/" + n
            }), wx.onSocketOpen(function(e) {
                console.log("WebSocket连接已打开！"), c.isOpen = !0, t(e);
            }), wx.onSocketError(function(e) {
                console.log("WebSocket连接打开失败，请检查！"), console.log(e), c.isOpen = !1, s();
            }), wx.onSocketClose(function(e) {
                c.isOpen = !1, console.log("websocket 关闭"), console.log(e);
            });
        });
    },
    close: function() {
        return new Promise(function(e, o) {
            wx.closeSocket({
                success: function() {
                    e();
                },
                fail: function() {
                    o();
                }
            });
        });
    },
    send: function(e) {
        return new Promise(function(o, n) {
            wx.sendSocketMessage({
                data: e,
                success: function(e) {
                    o(e);
                },
                fail: function() {
                    n();
                }
            });
        });
    },
    receive: function(e) {
        wx.onSocketMessage(function(o) {
            "function" == typeof e && e(JSON.parse(o.data));
        });
    }
};