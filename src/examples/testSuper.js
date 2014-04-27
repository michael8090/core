/**
 * Created by michael on 2014/4/27.
 */
require(['Bubble', 'FlyingBubble'], function (Bubble, FlyingBubble) {
    var bubble = new Bubble();
    bubble.render();

    var n = 100,
        i,
        fly = function () {
            this.color = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.random() + ')';
            this._super();//dynamically bind
        };
    for (i = 0; i < n; i++) {
        (new FlyingBubble({
            v: {
                x: Math.random() * 10,
                y: Math.random() * 10
            },
            fly: fly
        })).fly();
    }
});