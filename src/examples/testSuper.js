/**
 * Created by michael on 2014/4/27.
 */
require(['../core', 'Bubble', 'FlyingBubble'], function (core, Bubble, FlyingBubble) {
    var bubble = new Bubble();
    bubble.render();

    var n = 5,
        i;
    var config1 = {
            changeColor: function() {
                this.color = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.random() + ')';
            },
            fly: function () {
                this.changeColor();
                this._super();
            }
        },
        config2 = {
            fly: function () {
                this.radius += 10;
                this._super();
            }
        };
    //multiple mixin
    var NewBubble = FlyingBubble.extend(config1, config2);
    for (i = 0; i < n; i++) {
        (new NewBubble({
            v: {
                x: Math.random() * 5,
                y: Math.random() * 5
            },
            fly: function() {
                if (Math.random() < 0.5) {
                    this.radius = 1;//dynamically bind
                }
                this._super();
            }
        })).fly();
    }
});