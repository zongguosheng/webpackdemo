var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/http.js")), e = require("../../../../service/user"), a = null, n = null;

Component({
    properties: {
        isMaster: {
            type: Boolean,
            value: ""
        },
        randArr: {
            type: Array,
            value: ""
        },
        roomId: {
            type: String,
            value: ""
        },
        diceNum: {
            type: Number,
            value: ""
        },
        isOpen: {
            type: Boolean,
            value: ""
        }
    },
    data: {
        showTime: !1,
        countDown: 5,
        shakeDelay: 0,
        shakePicShow: !0,
        confirmCountShow: !0,
        innerAudioContext: "",
        customOpenShow: !1,
        userId: ""
    },
    ready: function() {
        this.setData({
            userId: e.unionId
        }), this.countDown(), this.data.innerAudioContext = wx.createInnerAudioContext(), 
        this.data.innerAudioContext.src = "https://web.chelaile.net.cn/dice/dice_rolling.mp3", 
        this.randomDice(), this.shake();
    },
    methods: {
        randomDice: function(t) {
            var e = this.data.randArr;
            if (0 === e.length || "shake" === t) {
                e = [];
                for (var a = 0; a < this.data.diceNum; a++) e.push(Math.ceil(6 * Math.random()));
            }
            this.setData({
                randArrRequest: e.join("&dicePoints="),
                randArr: e
            });
        },
        shake: function() {
            var t = 0, e = 0, n = 0, o = 0, i = 0, r = 0, s = this;
            wx.startAccelerometer(), wx.onAccelerometerChange(function(u) {
                t = u.x, e = u.y, n = u.z, Math.abs(t - o) > .8 && Math.abs(e - i) > .8 && Math.abs(n - r) > .8 && (s.setData({
                    showTime: !0,
                    countDown: 5
                }), clearInterval(a), s.data.innerAudioContext.stop(), s.data.innerAudioContext.play(), 
                s.randomDice("shake")), o = t, i = e, r = n;
            });
        },
        confirmDiceCount: function() {
            wx.stopAccelerometer(), this.data.isMaster ? this.setData({
                confirmCountShow: !1
            }) : this.setData({
                confirmCountShow: !1,
                customOpenShow: !0
            }), this.uploadPoints();
        },
        uploadPoints: function() {
            var e = this;
            clearInterval(n);
            var a = "uploadPoints?roomId=" + this.data.roomId + "&userId=" + this.data.userId + "&dicePoints=" + this.data.randArrRequest;
            (0, t.default)({
                url: a,
                method: "POST"
            }).then(function(t) {
                console.log(t), e.setData({
                    shakePicShow: !1
                });
            });
        },
        countDown: function() {
            var t = this;
            a = setInterval(function() {
                t.data.shakeDelay < 3 ? t.setData({
                    shakeDelay: ++t.data.shakeDelay
                }) : (t.setData({
                    showTime: !0,
                    countDown: 6
                }), clearInterval(a));
            }, 1e3), n = setInterval(function() {
                t.data.countDown <= 0 ? (t.data.isMaster ? t.setData({
                    confirmCountShow: !1
                }) : t.setData({
                    confirmCountShow: !1,
                    customOpenShow: !0
                }), wx.stopAccelerometer(), t.uploadPoints()) : t.setData({
                    countDown: --t.data.countDown
                });
            }, 1e3);
        },
        openConfirmCount: function() {
            this.triggerEvent("openConfirmCount");
        }
    }
});