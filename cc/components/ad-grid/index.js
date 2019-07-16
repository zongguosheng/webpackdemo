Component({
    properties: {
        ads: Object
    },
    methods: {
        onTapItem: function(t) {
            console.log("onTapItem", t);
            var e = t.currentTarget.dataset.item;
            this.triggerEvent("onTapAd", e, {});
        }
    }
});