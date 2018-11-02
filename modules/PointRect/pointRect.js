/**
 * by cmce Copyright 2018-11-02
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.pointRect = factory());
}(this, (function () {
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var isPc = function () {
      if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
          return false;
      } else {
          return true;
      }
  }();
  function init(_ref) {
      var box = _ref.box,
          points = _ref.points,
          _ref$radius = _ref.radius,
          radius = _ref$radius === undefined ? 0 : _ref$radius,
          end_cb = _ref.end_cb,
          touch_cb = _ref.touch_cb;
      if (!box || !points.length) {
          console.warn("you need box , points ");
          return;
      }
      var context = this,
          rect = box.getBoundingClientRect(),
          box_to_top = rect.top,
          box_to_left = rect.left,
          length = points.length;
      var i = 0,
          x = void 0,
          y = void 0;
      for (; i < length; i++) {
          x = points[i].x;
          y = points[i].y;
          context.range_array.push({
              x: [x - radius, x + radius],
              y: [y - radius, y + radius]
          });
          x = y = 0;
      }
      var _ref2 = isPc ? ["mousedown", "mouseup"] : ["touchstart", "touchend"],
          _ref3 = slicedToArray(_ref2, 2),
          downEvent = _ref3[0],
          upEvent = _ref3[1];
      function downFn(e) {
          if (context.result_array.length >= length) {
              context.touchNumber = 0;
              return;
          }
          var touch = e.changedTouches[0],
              clientX = touch.clientX,
              clientY = touch.clientY,
              point_to_box_top = clientY - box_to_top,
              point_to_box_left = clientX - box_to_left,
              range = context.range_array[context.touchNumber];
          touch_cb && touch_cb({ top: point_to_box_top, left: point_to_box_left });
          if (point_to_box_left >= range.x[0] && point_to_box_left <= range.x[1] && point_to_box_top >= range.y[0] && point_to_box_top <= range.y[1]) {
              context.result_array.push(true);
          } else {
              context.result_array.push(false);
          }
          context.touchNumber++;
      }
      function upFn() {
          if (context.touchNumber == length) {
              end_cb && end_cb(context.test());
          }
      }
      box.addEventListener(downEvent, downFn, false);
      box.addEventListener(upEvent, upFn, false);
      return function () {
          box.removeEventListener(downEvent, downFn, false);
          box.removeEventListener(upEvent, upFn, false);
      };
  }
  var PointRect = function () {
      function PointRect(opt) {
          classCallCheck(this, PointRect);
          this.result_array = [];
          this.range_array = [];
          this.touchNumber = 0;
          this.box = opt.box;
          this.init_dom_inner = this.box.innerHTML;
          this.remove_event = init.call(this, opt);
      }
      createClass(PointRect, [{
          key: "reset",
          value: function reset() {
              this.touchNumber = 0;
              this.result_array = [];
              this.box.innerHTML = this.init_dom_inner;
          }
      }, {
          key: "remove",
          value: function remove() {
              this.result_array = null;
              this.range_array = null;
              this.touchNumber = null;
              this.box = null;
              this.init_dom_inner = null;
              this.remove_event();
              this.remove_event = null;
          }
      }, {
          key: "test",
          value: function test() {
              var result_array = this.result_array,
                  length = result_array.length,
                  i = 0;
              for (; i < length; i++) {
                  if (!result_array[i]) {
                      return false;
                  }
              }
              return true;
          }
      }]);
      return PointRect;
  }();

  return PointRect;

})));
