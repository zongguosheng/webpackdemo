var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../api"));

Component({
    properties: {
        noticeId: String,
        remainedTime: Number
    },
    data: {
        noticeList: [],
        indicatorDots: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        circular: !0,
        vertical: !0
    },
    methods: {},
    ready: function() {
        var e = this;
        t.default.notices(this.data.noticeId).then(function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            e.setData({
                noticeList: t
            });
        });
    }
});