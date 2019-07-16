function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

var t = o(require("../../../../mp/framework")), e = require("../../utils/http.js"), i = o(e), a = o(require("../../utils/webSocket.js")), s = require("../../../../service/user"), n = require("../../../../service/analytic"), d = getApp();

t.default.Page({
    data: {
        status: 0,
        roomId: "",
        players: [],
        diceNum: 5,
        isMaster: !0,
        isShowKickOutDialog: !1,
        isShowJoinDialog: !1,
        isShowHistoryDialog: !1,
        isShowQrCode: !1,
        qrCode: "",
        isOpen: !1,
        one: [],
        onePlus: [],
        diceDetail: [],
        randArr: []
    },
    globalData: {
        urlWithArgs: "",
        roomId: "",
        userId: "",
        isLanuched: !1,
        isLogin: !1,
        pageInstance: {},
        options: {}
    },
    onLoad: function(o) {
        console.log("a"), console.log(o), this.data.options = o;
    },
    onShow: function() {
        var o = this;
        console.log("----------dice onShow");
        var t = this.data.options;
        console.log(t);
        var e = t.roomId;
        (e = t.scene || e || "") ? (wx.showLoading({
            title: "正在登录"
        }), this.login(e)) : (0, i.default)({
            url: "getLastRoom",
            data: {
                userId: s.unionId
            }
        }).then(function(t) {
            wx.hideLoading();
            var e = t.data;
            e && (console.log("roomId--------", e), o.setData({
                roomId: e,
                isShowHistoryDialog: !a.default.isOpen
            }));
        }, function() {
            wx.hideLoading();
        });
    },
    login: function(o) {
        var t = this, e = this;
        s.get().then(function() {
            wx.hideLoading(), n.login(s.userId, d), e.globalData.userId = s.userId, e.globalData.isLogin = !0, 
            o && o !== t.data.roomId && 2 !== t.data.status ? t.setData({
                roomId: o,
                isShowJoinDialog: !0
            }) : o === t.data.roomId && !1 === a.default.isOpen && t.joinRoom(o, s.unionId);
        }, function() {
            wx.hideLoading(), wx.showModal({
                title: "提示",
                content: "登录失败，请重新登录",
                success: function(o) {
                    o.confirm && e.login();
                }
            });
        });
    },
    start: function() {
        this.createRoom();
    },
    startPlay: function() {
        var o = this.data.roomId, t = JSON.stringify({
            action: 3,
            roomId: o,
            userId: s.unionId,
            diceNum: this.data.diceNum
        });
        a.default.send(t);
    },
    createRoom: function() {
        var o = this;
        wx.showLoading(), (0, i.default)({
            url: "createRoom",
            data: {
                userId: s.unionId
            }
        }).then(function(t) {
            wx.hideLoading();
            var e = t.data;
            console.log("roomId--------", e), o.setData({
                roomId: e
            }), o.joinRoom(e, s.unionId);
        }, function() {
            wx.hideLoading(), wx.showModal({
                title: "提示",
                content: "创建房间失败，请重新创建",
                success: function(o) {
                    o.confirm && this.createRoom();
                }
            });
        });
    },
    joinRoom: function(o, t) {
        var e = this;
        a.default.isOpen || a.default.open(o, t).then(function(o) {
            wx.hideLoading(), a.default.receive(function(o) {
                e.onMessageChange(o);
            });
        });
    },
    onDiceChange: function(o) {
        this.setData({
            diceNum: o.detail
        });
    },
    onDeletePlayer: function(o) {
        if (o.userId2Del === s.unionId) {
            a.default.close();
            var t = this.data.isMaster;
            this.data.diceNum = 5, this.data.isMaster = !1, this.data.players = [], this.data.roomId = "", 
            this.setData({
                status: 0
            }), t || this.setData({
                isShowKickOutDialog: !0
            });
        } else this.updatePlayers(o);
    },
    kickOut: function() {
        this.setData({
            isShowKickOutDialog: !1
        });
    },
    onUnload: function() {
        console.log("zhitouzi onUnload"), a.default.close();
    },
    deletePlayer: function(o) {
        var t = this.data.roomId, e = JSON.stringify({
            action: 2,
            roomId: t,
            userId: s.unionId,
            userId2Del: o.detail.userId
        });
        a.default.send(e);
    },
    updatePlayers: function(o) {
        var t = this.data.status;
        if (console.log(t, o), 1 === t) {
            var e = o.players, i = e.some(function(o) {
                return o.userId === s.unionId && o.master;
            });
            this.setData({
                isMaster: i,
                players: e
            });
        }
    },
    openJoinDialog: function() {
        this.setData({
            isShowJoinDialog: !0
        });
    },
    cancelJoin: function() {
        this.setData({
            roomId: "",
            isShowJoinDialog: !1,
            isShowHistoryDialog: !1
        });
    },
    confirmJoin: function(o) {
        var t = this;
        wx.showLoading(), "getUserInfo:ok" === o.detail.errMsg && s.bindGetUserInfo(o).then(function() {
            var e = s.unionId, i = (o.detail.userInfo, t.data.roomId);
            t.joinRoom(i, e);
        });
    },
    onMessageChange: function(o) {
        switch (console.log(o), o.action) {
          case 1:
            this.setData({
                status: 1,
                isShowJoinDialog: !1,
                isShowHistoryDialog: !1
            }), this.updatePlayers(o);
            break;

          case 2:
            this.onDeletePlayer(o);
            break;

          case 3:
            var t = {
                status: 2,
                diceNum: o.diceNum,
                isShowJoinDialog: !1,
                isShowHistoryDialog: !1
            };
            o.dicePoints && (t.randArr = o.dicePoints), this.setData(t);
            break;

          case 4:
            this.openResult();
            break;

          case 5:
            this.getResultData(o);
            break;

          case 6:
            this.setData({
                status: 1,
                isOpen: !1,
                action: o.action,
                roomId: this.data.roomId,
                master: o.master,
                diceNum: this.data.diceNum
            }), this.updatePlayers(o);
            break;

          case 99:
            wx.showToast({
                title: o.message,
                icon: "none"
            });
        }
    },
    invite: function() {
        var o = this;
        wx.showLoading({
            title: "生成房间二维码"
        }), (0, e.getImageInfo)("getQrcode?scene=" + this.data.roomId + "&page=pages/dice/pages/index/index&width=278&auto_color=false").then(function(t) {
            wx.hideLoading(), console.log(t), o.setData({
                qrCode: t.path,
                isShowQrCode: !0
            });
        }, function() {
            wx.hideLoading();
        });
    },
    hideQrCode: function() {
        this.setData({
            isShowQrCode: !1
        });
    },
    onShareAppMessage: function(o) {
        var t = this.data.roomId;
        return {
            title: "快来加入我们吧",
            path: "/pages/dice/pages/index/index?roomId=" + t,
            success: function() {
                console.log("-------", t);
            }
        };
    },
    openResult: function() {
        this.setData({
            isOpen: !0,
            status: 2
        });
    },
    exitGame: function() {
        a.default.close(), this.setData({
            status: 0
        });
    },
    replay: function() {
        var o = JSON.stringify({
            action: 6,
            roomId: this.data.roomId,
            userId: s.unionId
        });
        a.default.send(o);
    },
    getResult: function() {
        var o = JSON.stringify({
            action: 5,
            roomId: this.data.roomId,
            userId: s.unionId
        });
        a.default.send(o);
    },
    getResultData: function(o) {
        this.setData({
            isOpen: !0,
            status: 3
        }), o.one && o.onePlus && o.diceDetail && this.setData({
            one: o.one,
            onePlus: o.onePlus,
            diceDetail: o.diceDetail
        });
    }
});