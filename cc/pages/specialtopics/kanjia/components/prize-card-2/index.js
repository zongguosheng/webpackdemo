var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../route"));

Component({
    properties: {
        prize: Object
    },
    data: {
        isWebTarget: !1
    },
    methods: {
        tapReceive: function(e) {
            console.log("tapReceive"), this.triggerEvent("onReceiveTaped", {
                prize: this.data.prize
            });
        }
    },
    attached: function() {
        this.setData({
            isWebTarget: e.default.isWeb(this.data.prize.path)
        });
    },
    detached: function() {}
});