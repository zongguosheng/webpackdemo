Component({
    properties: {
        isMaster: {
            type: Boolean,
            value: ""
        },
        roomId: {
            type: String,
            value: ""
        },
        one: {
            type: Array,
            value: ""
        },
        onePlus: {
            type: Array,
            value: ""
        },
        diceDetail: {
            type: Array,
            value: ""
        }
    },
    data: {
        userId: "",
        orgin: [ 1, 2, 3, 4, 5, 6 ],
        randArr: [ 1, 2, 3, 4, 5, 6 ]
    },
    methods: {
        exitRoom: function() {
            this.triggerEvent("exitGame");
        },
        replayGame: function() {
            this.triggerEvent("replay");
        }
    }
});