Component({
    properties: {
        isMaster: {
            type: Boolean,
            value: !1
        },
        players: {
            type: Array,
            value: []
        },
        diceNum: {
            type: Number,
            value: ""
        },
        roomId: {
            type: String,
            value: ""
        }
    },
    methods: {
        increase: function() {
            var e = this.data.diceNum;
            e < 6 && (this.setData({
                diceNum: e + 1
            }), this.triggerEvent("onDiceChange", e + 1));
        },
        decrease: function() {
            var e = this.data.diceNum;
            e > 1 && (this.setData({
                diceNum: e - 1
            }), this.triggerEvent("onDiceChange", e - 1));
        },
        start: function() {
            this.triggerEvent("start");
        },
        showQrCode: function() {
            this.triggerEvent("invite");
        },
        triggerShare: function() {},
        del: function(e) {
            var t = e.currentTarget.dataset.player, r = this.data.players.filter(function(e) {
                return e.userId !== t.userId;
            });
            this.setData({
                players: r
            }), this.triggerEvent("deletePlayer", t);
        }
    }
});