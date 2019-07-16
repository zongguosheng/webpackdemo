Component({
    properties: {
        err: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        err: !1
    },
    methods: {
        _comeBack: function() {
            this.triggerEvent("comeBack");
        }
    }
});