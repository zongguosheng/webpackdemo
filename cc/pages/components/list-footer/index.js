Component({
    behaviors: [],
    properties: {
        text: {
            type: String,
            value: "清空搜索记录"
        }
    },
    data: {},
    attached: function() {},
    ready: function() {},
    methods: {
        onClick: function(t) {
            this.triggerEvent("onClick", {}, {});
        }
    }
});