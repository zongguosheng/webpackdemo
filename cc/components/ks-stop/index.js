Component({
    properties: {
        stop: Object
    },
    data: {},
    methods: {
        onTapStop: function(t) {
            var e = t.currentTarget.dataset.item;
            this.triggerEvent("onTapStop", e, {});
        }
    }
});