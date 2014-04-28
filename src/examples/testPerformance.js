/**
 * Created by michael on 2014/4/29.
 */
require(['../core', 'flyingBubble'], function(core, flyingBubble) {
    var n = 10000,
        i;

//    var config = {
//        fly: function() {
//            console.log('we are flying');
//            this._super();
//        }
//    };

    console.log('test large number of short inheriting...');
    var t1 = new Date(),
        shortClass;
    for (i = 0; i < n; i++) {
        shortClass = flyingBubble.extend({
            fly: function() {
                console.log('we are flying');
                this._super();
            }
        });
    }
    console.log(new Date() - t1);

    var configs = [];
    for (i = 0; i < n; i++) {
        configs.push({
            fly: function() {
                console.log('we are flying');
                this._super();
            }
        });
    }

    console.log('test a inheriting of a very long chain...');
    var longClass;
    t1 = new Date();
    longClass = flyingBubble.extend.apply(flyingBubble, configs);
    console.log(new Date() - t1);

    console.log('test creating large number of short class instances...');
    var shortInstance;

    t1 = new Date();
    for (i = 0; i < n; i++) {
        shortInstance = new shortClass();
    }
    console.log(new Date() - t1);

    console.log('test creating large number of long class instances...');
    var longInstance;

    t1 = new Date();
    for (i = 0; i < n; i++) {
        longInstance = new longClass();
    }
    console.log(new Date() - t1);





});