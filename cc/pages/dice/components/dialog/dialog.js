Component({
    properties: {
        isShow: {
            type: Boolean,
            value: !1
        },
        showClose: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        close: function() {
            this.triggerEvent("close");
        }
    }
});