/**
 * Created by michael on 2014/4/27.
 */
(function() {
    core.Bubble = core.Object.extend({
        init: function(config) {
            this.color = 'yellow';
            this.position = {
                x: 100,
                y: 100
            };
            this.radius = 50;
            this.slot = document.body;

            this._super(config);
        },
        render: function() {
            if (!this._hasRendered) {
                var domNode = document.createElement('div');
                this.domNode = domNode;
                this.slot.appendChild(domNode);
                this._hasRendered = true;
            }
            this.domNode.style.cssText = 'position: absolute; left: ' + this.position.x + 'px; top: ' + this.position.y + 'px; border-radius: ' + this.radius + 'px;' +
                'background: ' + this.color +
                '; width: ' + 2 * this.radius + 'px; '+
                'height: ' + 2* this.radius + 'px; ';
        }
    });

    core.FlyingBubble = core.Bubble.extend({
        init: function(config) {
            this.v = {
                x: 10,
                y: 10
            };
            this._super(config);
        },
        fly: function() {
            var mainRect = {
                width: document.body.offsetWidth,
                height: document.body.offsetHeight
                },
                _this = this;
            window.setInterval(function() {
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

    window.onload = function() {
        var bubble = new core.Bubble();
        bubble.render();

        var n = 100,
            i;
        for (i = 0; i < n; i++) {
            (new core.FlyingBubble({
                v: {
                    x: Math.random() * 10,
                    y: Math.random() * 10
                },
                fly: function() {
                    this.color = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.random() + ')';
                    this._super();
                }
            })).fly();
        }
    };

})();