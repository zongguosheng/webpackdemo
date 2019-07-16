Component({
    properties: {},
    externalClasses: [ "c-mask-content-external" ],
    methods: {
        onMaskTaped: function(e) {
            console.log("onTapItem", e), this.triggerEvent("onMaskTaped", {}, {});
        }
    }
});