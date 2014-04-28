/**
 * Created by michael on 2014/4/27.
 */
define(['../core'], function (core) {
    return core.Object.extend({
        init: function (config) {
            this.color = 'yellow';
            this.position = {
                x: 100,
                y: 100
            };
            this.radius = 50;
            this.slot = document.body;

            return this._super(config);
        },
        render: function () {
            if (!this._hasRendered) {
                var domNode = document.createElement('div');
                this.domNode = domNode;
                this.slot.appendChild(domNode);
                this._hasRendered = true;
            }
            this.domNode.style.cssText = 'position: absolute; left: ' + this.position.x + 'px; top: ' + this.position.y + 'px; border-radius: ' + this.radius + 'px;' +
                'background: ' + this.color +
                '; width: ' + 2 * this.radius + 'px; ' +
                'height: ' + 2 * this.radius + 'px; ';
        }
    });
});