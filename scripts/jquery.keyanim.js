/*!
* jQuery keyframeAnimate v 0.1
* https://github.com/takustaqu
* Copyright (c) 2014 Yabu Kiyohide / Orange Designworks [ow;d] ; MIT License
*/

(function ($) {
    $.fn.keyframeAnimate = function (keyframes, interval, easing, callback) {

        var keyframe = []
        var lastframe = 0;

        //Check added property and longest frame array.
        for (key in keyframes) {
            if (lastframe <= keyframes[key].length) {
                lastframe = keyframes[key].length
            }
            keyframe.push({
                property: key,
                frames: keyframes[key]
            })
        }

        //Fill frame until longest frame count.
        for (i = 0, il = keyframe.length; i < il; i++) {
            var currentLength = keyframe[i].frames.length;
            if (currentLength < lastframe) {
                var lastValue = keyframe[i].frames[currentLength - 1];
                var fillcount = lastframe - currentLength;
                for (j = 0; j < fillcount; j++) {
                    keyframe[i].frames.push(lastValue)
                }

            }
        }

        return this.each(function () {

            var $el = $(this);
            var scope = this;
            var i = 0;

            //Animation function. Call jQuery animation function,and callback this function until end of frame.
            function doAnimate(i) {
                var frame = {};
                for (j = 0, jl = keyframe.length; j < jl; j++) {
                    frame["" + keyframe[j].property] = keyframe[j].frames[i]
                }
                $el.animate(frame, interval, easing, function () {
                    i++
                    if (i < lastframe) {
                        doAnimate(i)
                    } else if (i == lastframe) {
                        return callback.call(this)
                    }
                })
            }

            doAnimate(i);
        });
    };
})(jQuery);