/**
 * Created by michael on 2014/4/27.
 */
require(['../core', 'Bubble', 'FlyingBubble'], function (core, Bubble, FlyingBubble) {
    var bubble = new Bubble();
    bubble.render();

    var n = 5,
        i;
    var config1 = {
            changeColor: function () {
                this.color = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.random() + ')';
            },
            fly: function () {
                this.changeColor();
                this._super();
            }
        },
        config2 = {
            changeV: function () {
                this.v = {
                    x: Math.random() * 5,
                    y: Math.random() * 5
                };
            },
            fly: function () {
                this.changeV();
                this.radius += 20;
                this._super();
            }
        };
    //multiple mixin
    var NewBubble = FlyingBubble.extend(config1, config2);
    for (i = 0; i < n; i++) {
        (new NewBubble({
            fly: function () {
                if (Math.random() < 0.5) {
                    this.radius = 5;//dynamically bind
                }
                this._super();
            }
        })).fly();
    }

    //even call super through the injection chain
    for (i = 0; i < n; i++) {
        (new NewBubble([{
            fly: function () {
                if (Math.random() < 0.5) {
                    this.radius = 1;//dynamically bind
                }
                this._super();
            }
        }, {
            changeColor: function () {
                if (this.dontChangeColor) {
                    return;
                } else {
                    this._super();
                }
            },
            fly: function () {
                if (Math.random() < 0.5) {
                    this.color = 'red';
                    this.dontChangeColor = true;
                }
                this._super();
            }
        }])).fly();
    }
});