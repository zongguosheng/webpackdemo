Component({
    externalClasses: [ "timer-outer", "timer-unit-outer", "timer-number-outer" ],
    properties: {
        seconds: Number,
        milliseconds: Number
    },
    data: {
        vHours: "00",
        vMinutes: "00",
        vSeconds: "00",
        _timerFlag: -1
    },
    methods: {
        _tick: function(t) {
            var e = this;
            if (t <= 0) return this.setData({
                vHours: "00",
                vMinutes: "00",
                vSeconds: "00"
            }), void this.triggerEvent("countdownEnd");
            var i = t % 60, s = (t - i) / 60, a = s % 60, n = (s - a) / 60;
            this.setData({
                vHours: n < 10 ? "0" + n : n,
                vMinutes: a < 10 ? "0" + a : a,
                vSeconds: i < 10 ? "0" + i : i
            }), this.data._timerFlag = setTimeout(function() {
                e._tick(t - 1);
            }, 1e3);
        }
    },
    attached: function() {
        this.data.milliseconds ? this._tick(Math.floor(this.data.milliseconds / 1e3)) : this.data.seconds > 0 && this._tick(this.data.seconds);
    },
    detached: function() {
        clearTimeout(this.data._timerFlag);
    }
});