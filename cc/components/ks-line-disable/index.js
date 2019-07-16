Component({
    properties: {
        line: Object
    },
    data: {},
    methods: {
        onTapDelAction: function(t) {
            var e = t.currentTarget.dataset.item;
            this.triggerEvent("onTapDelAction", e, {});
        }
    }
});