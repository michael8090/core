/**
 * Created by michael on 2014/4/27.
 */
/**
 * Created by michael on 2014/4/27.
 */
define(['Bubble'], function (Bubble) {
    return Bubble.extend({
        init: function (config) {
            this.v = {
                x: 10,
                y: 10
            };
            return this._super(config);
        },
        fly: function () {
            var mainRect = {
                    width: document.body.offsetWidth,
                    height: document.body.offsetHeight
                },
                _this = this;
            window.setInterval(function () {
                var p = _this.position,
                    v = _this.v,
                    d = 2 * _this.radius;
                p.x += v.x;
                p.y += v.y;
                if (p.x < 0 || p.x + d > mainRect.width) {
                    v.x *= -1;
                }
                if (p.y < 0 || p.y + d > mainRect.height) {
                    v.y *= -1;
                }
                _this.render();
            }, 10);
        }
    });

});