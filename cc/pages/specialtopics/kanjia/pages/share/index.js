function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../../mp/framework")), a = e(require("../../api")), o = e(require("../../route")), s = e(require("../../query")), r = require("../../../../../service/user"), i = require("../../../../../service/analytic"), n = getApp();

t.default.Page({
    data: {
        shareDate: {},
        mText1: "长按识别 帮好友砍价",
        mText2: "自己还能免费拿~"
    },
    onLoad: function(e) {
        this.setData({
            hdId: e.hdId,
            goodsId: e.goodsId
        }), i.trackPage({
            curPage: "poster_page",
            describ: "poster_page"
        }, n);
    },
    onReady: function() {
        var e = this, t = this.data.hdId, i = this.data.goodsId, n = r.getUserId(), c = s.default.toQuery({
            hdId: t,
            goodsId: i,
            userId: n
        });
        a.default.encode(n, encodeURIComponent(c)).then(function(t) {
            var s = {
                scene: t,
                page: o.default.getModuleIndex(),
                width: 200
            };
            a.default.getQrcode(s).then(function(t) {
                e.setData({
                    mQrcodePath: t
                });
            }).catch(function(e) {
                console.log(e);
            });
        });
    },
    _drawPreview: function(e) {
        var t = this;
        wx.createSelectorQuery().select("#preview-canvas").fields({
            size: !0
        }, function(a) {
            var o = a.width / 630;
            t._drawByRate("preview-canvas", e, o);
        }).exec();
    },
    _drawByRate: function(e, t, a, o) {
        var s = wx.createCanvasContext(e);
        s.setFillStyle("white"), s.fillRect(0, 0, 630 * a, 960 * a), s.drawImage("../../resource/image/poster@2x.png", 0, 0, 630 * a, 560 * a), 
        s.save(), s.translate(0, 585 * a), s.drawImage(t, 430 * a / 2, 0, 200 * a, 200 * a), 
        s.restore(), s.setTextBaseline("top"), s.setTextAlign("center"), s.save(), s.translate(630 * a / 2, 806 * a), 
        s.setFontSize(40 * a), s.setFillStyle("#333333"), s.fillText(this.data.mText1, 0, 0), 
        s.restore(), s.save(), s.translate(630 * a / 2, 870 * a), s.setFontSize(32 * a), 
        s.setFillStyle("#AAAAAA"), s.fillText(this.data.mText2, 0, 0), s.restore(), s.draw(!1, function() {
            console.log("draw finish"), o && o();
        });
    },
    tapSave: function(e) {
        i.trackClick({
            curPage: "poster_page",
            describ: "click_friends_circle"
        }, n), this._drawByRate("poster-canvas", this.data.mQrcodePath, 1, function() {
            wx.canvasToTempFilePath({
                canvasId: "poster-canvas",
                quality: 1,
                success: function(e) {
                    wx.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function() {
                            wx.showToast({
                                title: "保存成功",
                                duration: 3e3
                            });
                        },
                        fail: function(e) {
                            console.log("saveImageToPhotosAlbum", e), wx.showToast({
                                icon: "none",
                                title: "保存失败",
                                duration: 3e3
                            });
                        }
                    });
                },
                fail: function(e) {
                    console.log("canvasToTempFilePath", e);
                }
            });
        });
    }
});