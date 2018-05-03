/*! Fiera.js Copyright 2016, www.homeTLT.ru (Denis Ponomarev <ponomarevtlt@gmail.com>) 2018-04-23 17:04:55 */
var fiera =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = fabric;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var utils = __webpack_require__(2);
utils.object = __webpack_require__(3);
utils.compile = __webpack_require__(5);

function capitalize(string, firstLetterOnly) {
  return string.charAt(0).toUpperCase() + (firstLetterOnly ? string.slice(1) : string.slice(1).toLowerCase());
}

function toDashed(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

var Toolbar = function Toolbar(PARENT, el, menu, options) {
  this.initialize(PARENT, el, menu, options);
};

Toolbar._getKeyString = function (config) {
  var string = "";

  if (config.ctrlKey) string += "Ctrl + ";
  if (config.altKey) string += "Alt + ";
  if (config.shiftKey) string += "Shift + ";

  var _code = config.key;
  if (_code) {
    string += config.key;
  }
  return string;
};

Toolbar.makeActions = function (actions, PARENT) {
  var result = {};
  for (var i in actions) {
    actions[i].id = i;
    var _action = this.makeAction(actions[i], PARENT);
    if (_action) {
      result[i] = _action;
    }
  }
  return result;
};

Toolbar.makeAction = function (original, parent) {
  var _ORIGINAL = original;
  var target;

  if (original.constructor === Function) {
    _ORIGINAL = original.call(parent);
  }

  if (_ORIGINAL.target && _ORIGINAL.target.constructor === Function) {
    target = _ORIGINAL.target.call(parent);
  } else {
    target = _ORIGINAL.target || parent;
  }

  var ___target = _ORIGINAL.target;
  var ___parent = _ORIGINAL.parent;
  delete _ORIGINAL.parent;
  delete _ORIGINAL.target;

  var RES = utils.object.cloneDeep(_ORIGINAL);
  _ORIGINAL.parent = ___parent;
  _ORIGINAL.target = ___target;

  RES.parent = ___parent;
  RES.target = target;
  RES.id = toDashed(_ORIGINAL.id);

  function createGetter(property, useParent) {
    if (property.constructor === Function) {
      return property;
    }
    if (property.constructor === String) {
      var negative = false;
      if (property[0] === "!") {
        property = property.substr(1);
        negative = true;
      }
      if (useParent) {
        return function () {
          if (this[property].constructor === Function) {
            return !!this[property]() ^ negative;
          } else {
            return !!this[property] ^ negative;
          }
        };
      } else {
        return function () {
          if (this[property].constructor === Function) {
            return !!this[property]() ^ negative;
          } else {
            return !!this[property] ^ negative;
          }
        };
      }
    }
    return null;
  }

  /*var _insert = _ORIGINAL.insert;
  if (!_insert || _insert.constructor == String) {
     if(_ORIGINAL.parent){
      var insertproperty = fabric.util.string.capitalize(fabric.util.string.camelize(_ORIGINAL.parent.id))
    }else{
      var insertproperty = _insert || "insert" + fabric.util.string.capitalize(id,true);
    }
     if(target[insertproperty] !== undefined){
      _insert = target[insertproperty]// createGetter(insertproperty,true)()
    }else{
      _insert = true;
    }
  }
   if(!_insert)return;*/

  if (!RES.type) {
    if (RES.menu) {
      RES.type = "menu";
    } else {
      RES.type = "button";
    }
  }
  if (!RES.action) {
    if (RES.type === "button" || RES.type === "key") {
      RES.action = _ORIGINAL.id;
    }
  }

  if (RES.action) {
    if (RES.action.constructor === String) {
      RES.action = target[RES.action];
    }
    //RES = RES.action.bind(target);
    //RES.action = RES.action.bind(target);
    //_.extend(RES, _act);
    //arguments for action function
    if (_ORIGINAL.args) {
      RES._action = RES.action.bind(target, _ORIGINAL.args);
    } else {
      RES._action = RES.action.bind(target);
    }
    RES.action = function () {
      if (RES.disabled) return;
      RES._action.apply(this, arguments);
    };
  }

  if (_ORIGINAL.menu && _ORIGINAL.menu.constructor === Function) {
    RES.menu = _ORIGINAL.menu.bind(target);
  }
  if (_ORIGINAL.active) {
    RES.active = createGetter(_ORIGINAL.active).bind(target);
  }
  if (_ORIGINAL.visible) {
    RES.visible = createGetter(_ORIGINAL.visible).bind(target);
  }
  if (_ORIGINAL.enabled) {
    RES.enabled = createGetter(_ORIGINAL.enabled).bind(target);
  }
  if (!_ORIGINAL.value) {
    switch (_ORIGINAL.type) {
      case "color":
      case "text":
      case "number":
      case "range":
      case "label":
      case "select":
      case "checkbox":
        _ORIGINAL.value = _ORIGINAL.id;
      // console.log(id, _ORIGINAL);
    }
  }
  if (_ORIGINAL.value) {
    var _set, _get, _options;
    if (_ORIGINAL.value.constructor === String) {

      var setFunctionName = "set" + capitalize(_ORIGINAL.value, true),
          getFunctionName = "get" + capitalize(_ORIGINAL.value, true),
          minName = "min" + capitalize(_ORIGINAL.value, true),
          maxName = "max" + capitalize(_ORIGINAL.value, true),
          setFoo = function setFoo(val) {
        target[setFunctionName](val);
        // todo self.setFunctionCallback(target);
      },
          getFoo = target[getFunctionName],
          minFoo = target[minName],
          maxFoo = target[maxName];

      _set = setFoo || (_ORIGINAL.args ? function (val, args) {
        this[_ORIGINAL.value][args] = val;
      } : function (val) {
        this[_ORIGINAL.value] = val;
      });

      _get = getFoo || (_ORIGINAL.args ? function (args) {
        return this[_ORIGINAL.value][args];
      } : function () {
        return this[_ORIGINAL.value];
      });

      RES.value = {
        min: minFoo,
        max: maxFoo
      };
    } else {
      _set = _ORIGINAL.value.set;
      _get = _ORIGINAL.value.get;
      _options = _ORIGINAL.value.options;
    }

    if (RES.value.min !== undefined && RES.value.min.constructor === String) {
      RES.value.min = target[RES.value.min];
    }
    if (RES.value.max !== undefined && RES.value.max.constructor === String) {
      RES.value.max = target[RES.value.max];
    }
    if (RES.value.step !== undefined && RES.value.step.constructor === String) {
      RES.value.step = target[RES.value.step];
    }
    var _min = RES.value.min,
        _max = RES.value.max,
        _step = RES.value.step;

    if (_set) {
      RES.value.set = _ORIGINAL.args ? _set.bind(target, _ORIGINAL.args) : _set.bind(target);
    }
    if (_get) {
      RES.value.get = _ORIGINAL.args ? _get.bind(target, _ORIGINAL.args) : _get.bind(target);
    }
    if (_min && _min.constructor === Function) {
      RES.value.min = _ORIGINAL.args ? _min.bind(target, _ORIGINAL.args) : _min.bind(target);
    }
    if (_max && _max.constructor === Function) {
      RES.value.max = _ORIGINAL.args ? _max.bind(target, _ORIGINAL.args) : _max.bind(target);
    }
    if (_step && _step.constructor === Function) {
      RES.value.step = _ORIGINAL.args ? _step.bind(target, _ORIGINAL.args) : _step.bind(target);
    }
    if (_options) {
      RES.value.options = _ORIGINAL.args ? _options.bind(target, _ORIGINAL.args) : _options.bind(target);
    }
  }

  if (_ORIGINAL.data) {
    RES.data = _ORIGINAL.data.call(target);
  }
  if (RES.menu) {
    if (_ORIGINAL.menu.constructor === Function) {
      RES.menu = _ORIGINAL.menu.call(target);
    }
    if (RES.type === "options") {
      for (var i in RES.menu) {
        RES.menu[i].parent = RES;
        RES.menu[i].type = "option";
        if (!RES.menu[i].title) {
          RES.menu[i].title = i;
        }
        if (!RES.menu[i].option) {
          RES.menu[i].option = i;
        }
      }
    }
    for (var i in RES.menu) {
      if (RES.menu[i].constructor === String) {
        RES.menu[i] = RES.target._getActionValue(RES.menu[i]);
        RES.menu[i].parent = RES;
      }
      if (!RES.menu[i].id) {
        RES.menu[i].id = i;
      }
      RES.menu[i] = Toolbar.makeAction(RES.menu[i], target);
      if (!RES.menu[i]) {
        delete RES.menu[i];
      }
    }
  }

  if (_ORIGINAL.keyboard !== false && (_ORIGINAL.key || _ORIGINAL.keyCode || _ORIGINAL.shiftKey || _ORIGINAL.altKey || _ORIGINAL.ctrlKey || _ORIGINAL.metaKey)) {
    if (_ORIGINAL.key && _ORIGINAL.key.length == 1) {
      RES.ctrlKey = true;
    }
    if (_ORIGINAL.keyCode && _ORIGINAL.keyCode.constructor === String) {
      RES.keyCode = _ORIGINAL.keyCode.toUpperCase().charCodeAt(0);
      RES.key = String.fromCharCode(RES.keyCode);
    }
    RES.keyboard = true;
  }

  return RES;
};

Toolbar.getButtons = function (actions) {
  var _buttons = [];
  for (var i in actions) {
    var action = actions[i];
    if (action.keyboard) {
      action.title += " (" + Toolbar._getKeyString(action) + ")";
      _buttons.push(action);
    }
    if (actions.menu) {
      _buttons = _buttons.concat(Toolbar.getButtons(actions.menu));
    }
  };

  return _buttons;
};
Toolbar.prototype = {
  initKeys: function initKeys(actions) {
    this.buttons = Toolbar.getButtons(actions);
    this.__keydownHandler = this.handleKeydown.bind(this);
    $(document).on("keydown", this.__keydownHandler);

    //$(window).on("mousewheel", function (event) {
    //  for (var i in self.buttons) {
    //    var data = self.buttons[i];
    //    if (!data.mousewheel)continue;
    //    if (!data.ctrlKey || data.ctrlKey && event.ctrlKey) {
    //      if (event.deltaY > 0 && data.mousewheel == ">") {
    //        data.action.call(target, data.option || event, event)
    //      }
    //      if (event.deltaY < 0 && data.mousewheel == "<") {
    //        data.action.call(target, data.option || event, event)
    //      }
    //      event.preventDefault();
    //      event.stopPropagation();
    //      return false;
    //    }
    //  }
    //});
  },
  handleKeydown: function handleKeydown(e) {
    for (var i in this.buttons) {
      var _config = this.buttons[i];

      if (_config.enabled && !_config.enabled()) {
        continue;
      }
      if (_config.disabled || _config.disabled) {
        continue;
      }
      if (!_config.disabled && !_config.hidden && (_config.keyCode == e.keyCode || _config.key == e.key) && (_config.ctrlKey === undefined || _config.ctrlKey == e.ctrlKey) && (_config.altKey === undefined || _config.altKey == e.altKey) && (_config.shiftKey === undefined || _config.shiftKey == e.shiftKey) && (_config.metaKey === undefined || _config.metaKey == e.metaKey)) {

        e.preventDefault();
        e.stopPropagation();
        if (_config.option !== undefined) {
          _config.action.call(_config.target, _config.option, e);
        } else {
          _config.action.call(_config.target, e);
        }
      }
    }
  },
  tools: {
    "key": {},
    "label": {
      scope: function scope(data, options) {
        return {
          getValue: data.value.get,
          valueCurrent: data.value.get()
        };
      },
      template: '<div class="object-menu-item object-menu-label" title="{title}">',
      render: function render($item, data, options, tool, val) {
        var scope = fabric.util.object.defaults(tool.scope.call(this, data, options), data);
        $item.html(data.template.format(data.value.get()));
        utils.compile.compileElement($item, scope);
      }
    },
    "number": {
      scope: function scope(data, options) {
        return {
          getInputValue: function getInputValue() {
            return parseFloat(data.$item.find("input").val());
          },
          getValue: data.value.get,
          setValue: data.value.set,
          minValue: data.value.min && data.value.min(),
          maxValue: data.value.max && data.value.max(),
          valueCurrent: data.value.get(),
          onchange: function onchange(e) {
            data.value.set(parseFloat($(e.target).val()));
          }
        };
      },
      template: '<div class="object-menu-item object-menu-number" title="{title}">' + '<input type="number" min="{minValue}" max="{maxValue}" value="{valueCurrent}" onchange="onchange(event)">',
      render: function render($item, data, options, tool, val) {
        $item.find("input").val(data.value.get());
      }
    },
    "range": {
      scope: function scope(data, options) {
        return {
          minValue: data.value.min ? typeof data.value.min == "function" ? data.value.min() : data.value.min : 0,
          maxValue: data.value.max ? typeof data.value.max == "function" ? data.value.max() : data.value.max : 1,
          valueStep: data.value.step ? typeof data.value.step == "function" ? data.value.step() : data.value.step : 0.1,
          valueCurrent: data.value.get(),
          onchange: function onchange(e) {
            data.value.set(parseFloat($(e.target).val()));
          }
        };
      },
      template: '<div class="object-menu-item object-menu-range" title="{title}">' + '<input type="range" step="{valueStep}" min="{minValue}" max="{maxValue}" value="{valueCurrent}" onchange="onchange(event)">',
      render: function render($item, data, options, tool, val) {
        $item.find("input").val(data.value.get());
      }
    },
    "checkbox": {
      scope: function scope(data, options) {
        return {
          onchange: function onchange(e) {
            data.value.set(e.target.checked);
          },
          valueCurrent: data.value.get()
        };
      },
      template: '<div class="object-menu-item object-menu-checkbox" title="{title}">\n          <input type="checkbox" onchange="onchange(event)" dp-checked="{valueCurrent}" id="checkbox-{id}">\n          <label for="checkbox-{id}"  class="btn button-{id} {className}">',
      render: function render($item, data, options, tool, val) {
        $item.find("input").val(val);
      }
    },
    "menu": {
      template: '<div class="object-menu-item object-menu-menu" title="{title}">\n          <label dp-if="title" for="button-{id}">{title}</label>\n          <button class="btn button-menu-trigger button-{id} {className}" id="button-{id}"/>\n          <div class="object-menu submenu" style="display: none;" transclude/>',
      post: function post($item, data, options, transclude) {
        $item.find(".button-menu-trigger").click(function () {
          $item.find(".object-menu").toggle();
        });
        if (data.hovered) {
          $item.addClass("hovered");
          this.toggleByHover($item, transclude, null, data);
        }
        if (data.toggled) {
          $item.addClass("toggled");
          this.toggleByButton($item, transclude);
        };
        this.generateMenu(data.target, transclude, options, data.menu);
      }
    },
    "button": {
      scope: function scope(data, options) {
        return {
          buttonsTitle: options.buttons && options.buttons.title || false,
          buttonscClassName: options.buttons && options.buttons.className || ''
        };
      },
      template: '<div class="object-menu-item" title="{title}">\n          <button class="btn button-{id} {className} {buttonscClassName}"  onclick="!disabled && option ? action(option) : action()">\n          <img dp-if="icon" dp-src="icon">\n          <span dp-include="svg" dp-if="svg"></span>\n          <span dp-if="buttonsTitle" class="button-title">{title}</span>'
    }
  },
  initialize: function initialize(PARENT, el, menu, options) {
    this.buttons = [];
    //todo это не совсем хорошо. нельзя создать улбраы с разными конфигами кнопок
    // this.tools = utils.object.cloneDeep(this.tools);


    this.options = options || {};
    // if (options) {
    //   if (options.button) {
    //     utils.object.extend(this.tools.button, options.button);
    //   }
    // }
    // if (!PARENT.generatedActions) {
    //   PARENT.makeActions( menu);
    // }

    if (el.constructor === String) {
      this.container = $(document.getElementById(el));
    } else {
      this.container = el;
    }
    if (this.container) {
      this.generateMenu(PARENT, this.container, options, menu);
      this.container.show();
    }
    this.initKeys(PARENT.generatedActions);
  },
  destroy: function destroy(target) {
    for (var i = this.buttons.length; i--;) {
      var _config = this.buttons[i];
      if (target && _config.target != target) {
        continue;
      }
      this.buttons.splice(i, 1);
    }

    if (this.__keydownHandler) {
      $(document).off("keydown", this.__keydownHandler);
    }
    this.fire("destroy");
  },
  createInput: function createInput($item, data, type) {

    var target = data.target;
    var $input = $("<input>").attr("type", type).attr("min", data.value.min()).attr("max", data.value.max());

    $input.val(data.value.get());
    if (data.value.observe) {
      var _foo = function _foo(val) {
        $input.val(data.value.get());
      };
      target.on(data.value.observe, _foo);
      this.on("destroy", function () {
        target.off(data.value.observe, _foo);
      });
    }
    $input.change(function (e) {
      data.value.set(parseFloat($input.val()));
    });
    $item.append($input);
  },
  initItem: function initItem($item, data) {

    if (data.active) {
      if (data.active.call(data.target, data.option)) {
        $item.addClass("active");
      }
    }

    if (data.visible !== undefined) {
      if (data.visible.constructor == Function) {
        if (!data.visible.call(data.target)) {
          $item.hide();
        }
      } else if (!data.visible) {
        $item.hide();
      }
    }

    data.disabled = false;
    if (data.enabled !== undefined) {
      if (data.enabled.constructor == Function) {
        if (!data.enabled.call(data.target)) {
          $item.attr("disabled", true);
          data.disabled = true;
        }
      }
    }

    if (data.observe && data.target) {
      //todo
      if (data.visible && data.visible.constructor == Function) {
        var visibleObserveCallback = function visibleObserveCallback() {
          if (!data.visible.call(data.target)) {
            $item.hide();
            data.hidden = true;
          } else {
            $item.show();
            data.hidden = false;
          }
        };

        if (data.observe.constructor === String) {
          data.target && data.target.on(data.observe, visibleObserveCallback);
        } else {
          data.observe.call(data.target, visibleObserveCallback);
        }
      }

      if (data.type == "options") {
        data.target && data.target.on(data.observe, function () {
          var _val = data.value.get();
          $("[name=" + data.id + "]").prop("checked", false);
          $("[name=" + data.id + "][value=" + _val + "]").prop("checked", true);
        });
      }

      if (data.enabled && data.enabled.constructor == Function) {
        var enabledObserveCallback = function enabledObserveCallback() {
          if (!data.enabled.call(data.target)) {
            $item.attr("disabled", true);
            data.disabled = true;
          } else {
            $item.removeAttr("disabled");
            data.disabled = false;
          }
        };

        data.enableCallback = enabledObserveCallback;
        if (data.observe.constructor === String) {
          data.target && data.target.on(data.observe, enabledObserveCallback);
        } else {
          data.observe.call(data.target, enabledObserveCallback);
        }
      }

      if (data.destroy) {
        this.on("destroy", data.destroy.bind(data.target, data));
        delete data.enabledCallback;
      }
    }
  },
  toggleByHover: function toggleByHover($item, $toggleElement, foo, data) {

    var onClose;

    $toggleElement.hide();
    $item.mouseout(function () {
      $toggleElement.hide();
      onClose && onClose();
    });
    $item.mouseover(function () {
      $toggleElement.show();
      onClose = foo && foo();
    });

    $item.click(function () {
      if (data && data.immediately) {
        data.action();
      }
    });
  },
  toggleByButton: function toggleByButton($item, $toggleElement, foo, data) {

    var onClose;
    var _try_hide = function _try_hide(e) {
      var _parents = $(e.target).parents();
      for (var i in _parents) {
        if (_parents[i] === $item[0]) {
          return false;
        }
      }
      if ($toggleElement.css("display") !== "none") {
        $toggleElement.hide();
        onClose && onClose();
      }
    };

    $toggleElement.click(function (e) {
      e.stopPropagation();
    });
    $toggleElement.hide();
    $item.click(function () {

      if ($toggleElement.css("display") !== "none") {
        $toggleElement.hide();
        onClose && onClose();
        $(window).off("click", _try_hide);
      } else {
        $toggleElement.show();
        $(window).on("click", _try_hide);

        onClose = foo && foo();

        if (data && data.immediately) {
          data.action();
        }
      }
    });
  },
  generateMenuButton: function generateMenuButton(target, $el, options, data) {
    var _this = this;

    if (data.constructor === String) {
      data = target.actions[data];
    }

    if (!data.target) {
      data = Toolbar.makeAction(data, target);
    }
    if (!data || data.insert !== undefined && !data.insert) {
      return;
    }
    data.type = data.type || "button";

    //todo непонятно зачем аргумент target в начале
    // target = data.target;

    var tool = this.tools[data.type];

    if (!tool) {
      console.warn("tool '" + data.type + "' undefined");
      return;
    }
    var scope = data;
    if (tool.scope) {
      scope = fabric.util.object.defaults(tool.scope.call(this, data, options), data);
    }

    if (tool.template) {
      var $item = $(tool.template.format(scope));
      var transclude = $item.find("[transclude]");
      scope.$item = data.$item = $item;
      if (data.template) {
        $item.html(data.template.format(data.value.get()));
      }

      utils.compile.compileElement($item, scope);

      if (data.value && data.value.observe) {

        var foo = function foo(val) {
          if (tool.post) {
            tool.post.call(_this, $item, scope, options, transclude.length ? transclude : null);
          }
          if (tool.render) {
            tool.render.call(_this, $item, data, options, tool, val);
          }
          //this.fire(data.type + ":render",{item: $item, data: data, options: options, tool: tool, val: val})
        };
        var _target = data.target || target;

        _target.on(data.value.observe, foo);
      }

      this.initItem($item, data);

      if (tool.post) {
        tool.post.call(this, $item, scope, options, transclude.length ? transclude : null);
      }

      $el.append($item);
    }

    this.fire(data.type + ":created", { data: scope, options: options, tool: tool });
  },
  generateMenu: function generateMenu(target, $el, options, menu) {
    var _this2 = this;

    options = options || {
      title: false
    };

    options.buttons = options.buttons || {
      className: "",
      title: false
    };

    $el.empty();

    fabric.util.object.each(menu, function (data) {
      _this2.generateMenuButton(target, $el, options, data);
    });
  }
};
utils.observable(Toolbar.prototype);

Toolbar.single = function (data, element) {
  data.$item = element;
  data.type = data.type || "button";

  var tool = Toolbar.prototype.tools[data.type];

  Toolbar.prototype.initItem(element, data);

  if (data.value && data.value.observe) {
    data.target.on(data.value.observe, function (val) {
      tool.render(element, data, {}, tool, val);
    });
  }

  if (tool.post) {
    var transclude = element.find("[transclude]");

    tool.post.call(Toolbar.prototype, element, data, {}, transclude.length ? transclude : null);
  }

  var scope = data;
  if (tool.scope) {
    scope = _.defaults(data, tool.scope.call(Toolbar.prototype, data, {}));
  }

  element.eachSelf("*", function () {
    var nodes = [],
        values = [];
    for (var att, i = 0, atts = this.attributes, n = atts.length; i < n; i++) {
      att = atts[i];
      nodes.push(att.nodeName);
      values.push(att.nodeValue);
      this.setAttribute(att.nodeName, att.nodeValue.format(scope));
    }
  });
  utils.compile.compileElement(element, scope);
};

module.exports = Toolbar;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = {
  Utf8ArrayToStr: function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12:case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
          break;
      }
    }

    return out;
  },
  dataURItoBlob: function dataURItoBlob(dataURI, dataTYPE) {
    var binary = atob(dataURI.split(',')[1]),
        array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: dataTYPE });
  },
  blobToDataURL: function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result);
    };
    a.readAsDataURL(blob);
  },
  worker: function worker(foo) {
    if (window.Worker) {
      var str = foo.toString();
      var eventArg = str.substring(str.indexOf("(") + 1, str.indexOf(","));
      var postMessageArg = str.substring(str.indexOf(",") + 1, str.indexOf(")"));
      var _functionBody = str.substring(str.indexOf("{") + 1);
      str = "onmessage=function(" + eventArg + "){" + postMessageArg + "= postMessage;" + _functionBody;
      var blob = new Blob([str]);
      //"onmessage = function(e) { postMessage('msg from worker'); }"]);
      var blobURL = window.URL.createObjectURL(blob);
      return new Worker(blobURL);
    } else {
      var worker = {
        terminate: function terminate() {},
        postMessage: function postMessage(data) {
          setTimeout(function () {
            foo({ data: data }, function (responseData) {
              worker.onmessage && worker.onmessage({ data: responseData });
            });
          });
        }
      };
      return worker;
    }
  },
  observable: function observable(obj) {
    obj.fire = function fire(eventName, options) {
      if (!this.__eventListeners) {
        return;
      }
      var listenersForEvent = this.__eventListeners[eventName];
      if (!listenersForEvent) {
        return;
      }
      for (var i = 0, len = listenersForEvent.length; i < len; i++) {
        listenersForEvent[i].call(this, options || {});
      }
      return this;
    };
    obj.on = function (eventName, handler) {
      if (eventName.constructor == Object) {
        for (var i in eventName) {
          this.on(i, eventName[i]);
        }
        return this;
      }
      var events = eventName.split(" ");
      for (var i in events) {
        this.observe(events[i], handler);
      }
      return this;
    };
    obj.observe = function (eventName, handler) {
      if (!this.__eventListeners) {
        this.__eventListeners = {};
      }
      if (arguments.length === 1) {
        for (var prop in eventName) {
          this.on(prop, eventName[prop]);
        }
      } else {
        if (!this.__eventListeners[eventName]) {
          this.__eventListeners[eventName] = [];
        }
        this.__eventListeners[eventName].push(handler);
      }
      return this;
    };
    obj.off = function stopObserving(eventName, handler) {
      function _removeEventListener(eventName, handler) {
        if (!this.__eventListeners[eventName]) {
          return;
        }

        if (handler) {
          var idx = this.__eventListeners[eventName].indexOf(handler);
          if (idx !== -1) {
            this.__eventListeners[eventName].splice(idx, 1);
          }
        } else {
          this.__eventListeners[eventName].length = 0;
        }
      }

      if (!this.__eventListeners) {
        return;
      }
      if (arguments.length === 0) {
        this.__eventListeners = {};
      } else if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
        for (var prop in eventName) {
          _removeEventListener.call(this, prop, eventName[prop]);
        }
      } else {
        _removeEventListener.call(this, eventName, handler);
      }
      return this;
    };
  },
  order: function order(_array, context) {
    (function _call() {
      if (!_array.length) return;
      var foo = _array.shift();
      if (foo) {
        if (foo.length) {
          foo.call(context, _call);
        } else {
          foo.call(context);
          _call();
        }
      } else {
        _call();
      }
    })();
  },
  inOrder: function inOrder(array, foo, callback) {
    var _index = 0;
    function _inOrderIndex() {
      if (++_index < array.length) {
        foo(array[_index], _index, _inOrderIndex);
      } else {
        callback && callback();
      }
    }
    foo(array[_index], _index, _inOrderIndex);
  },
  /**
   * возвращает объект с ключами строки url
   * @returns {{}}
   */
  queryString: function queryString(query) {
    if (query) {
      query = query.substr(query.indexOf("?") + 1);
    } else {
      query = window.location.search.substring(1);
    }
    var obj = {};
    var _length = 0;
    if (!query) return obj;
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var _vname = pair[0],
          val = pair[1];
      if (typeof obj[_vname] === "undefined") {
        obj[_vname] = val || "";
        Object.defineProperty(obj, _length, { value: _vname, enumerable: false });
        _length++;
        // If second entry with this name
      } else if (typeof obj[_vname] === "string") {
        var arr = [obj[_vname], val];
        obj[_vname] = arr;
        Object.defineProperty(obj, _length, { value: _vname, enumerable: false });
        _length++;
        // If third or later entry with this name
      } else {
        obj[_vname].push(val);
        Object.defineProperty(obj, _length, { value: _vname, enumerable: false });
        _length++;
      }
    }
    Object.defineProperty(obj, "length", { value: _length, enumerable: false });
    return obj;
  },

  splitBy: function splitBy(query, delimiter) {
    var traceQueries = [];
    var r = 0,
        f = 0,
        _p_start = 0;
    if (query == "") return [];
    for (var i = 0; i < query.length; i++) {
      var c = query[i];
      if (c == "(") {
        r++;
        f = 1;
      } else if (c == ")") {
        r--;
      }
      if (r == 0 && f == 1) f = 0;
      if (delimiter.indexOf(c) != -1 && r == 0 && f == 0) {
        traceQueries.push(query.substring(_p_start, i));
        _p_start = i + 1;
      }
    }
    traceQueries.push(query.substring(_p_start));
    return traceQueries;
  },
  queueLoad: function queueLoad(total, completeCB, progressCB) {
    var loader = function loader(el) {
      loader.loaded.push(el);
      loader.progressCB && loader.progressCB(loader.loaded.length, loader.total, el, loader.loaded);

      if (loader.loaded.length === (loader.total || loader.elements.length)) {
        loader.completeCB && loader.completeCB(loader.loaded);
        loader.fire("loaded");
      }
    };
    loader.completeCB = completeCB;
    loader.progressCB = progressCB;

    if (total.length) {
      loader.elements = total;
    } else {
      loader.total = total;
    }
    loader.loaded = [];
    utils.observable(loader);

    return loader;
  }
};

module.exports = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(10);

var utils = {
  /**
   *
   * @param arr
   * @param arr2
   * @returns {{}}
   * @example
   *    x = {a: 1 ,b: 1, c: [1,2]}
   *    y = {a: 2 ,  c : 3 , d : 1}
   *
   *    extendArraysObject(x,y) = {a: [1,2] b : [1] c : [1,2,3], d [1] }
   */
  extendArraysObject: function extendArraysObject(arr, arr2) {
    var newArray = {};

    for (var i in arr) {
      if (arr[i].constructor == Array) {
        newArray[i] = [].concat(arr[i]);
      } else {
        newArray[i] = [arr[i]];
      }
    }

    for (var i in arr2) {
      if (newArray[i]) {
        newArray[i].push(arr2[i]);
      } else {
        newArray[i] = [arr2[i]];
      }
    }
    return newArray;
  },
  filterValues: function filterValues(array, values) {
    var new_array = [];
    for (var i in array) {
      var _new_object = {};
      for (var j in values) {
        _new_object[values[j]] = array[i][values[j]];
      }
      new_array.push(_new_object);
    }
    return new_array;
  },
  /**
   *  Тасование Фишера–Йетса,случайное тасование множества
   * @param object
   * @returns {*}
   */
  shuffle: function shuffle(object) {
    if (!object.length) return;
    var i = object.length;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = object[i];
      object[i] = object[j];
      object[j] = temp;
    }

    return object; // for convenience, in case we want a reference to the array
  },
  /**
   * Dependency: underscore.js ( http://documentcloud.github.com/underscore/ )
   *
   * Mix it in with underscore.js:
   * _.mixin({deepExtend: deepExtend});
   *
   * Call it like this:
   * var myObj = utils.deepExtend(grandparent, child, grandchild, greatgrandchild)
   *
   * Notes:
   * Keep it DRY.
   * This function is especially useful if you're working with JSON config documents. It allows you to create a default
   * config document with the most common settings, then override those settings for specific cases. It accepts any
   * number of objects as arguments, giving you fine-grained control over your config document hierarchy.
   *
   * Special Features and Considerations:
   * - parentRE allows you to concatenate strings. example:
   *   var obj = utils.deepExtend({url: "www.example.com"}, {url: "http://#{_}/path/to/file.html"});
   *   console.log(obj.url);
   *   output: "http://www.example.com/path/to/file.html"
   *
   * - parentRE also acts as a placeholder, which can be useful when you need to change one value in an array, while
   *   leaving the others untouched. example:
   *   var arr = utils.deepExtend([100,    {id: 1234}, true,  "foo",  [250, 500]],
   *                          ["#{_}", "#{_}",     false, "#{_}", "#{_}"]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - The previous example can also be written like this:
   *   var arr = utils.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
   *                          ["#{_}", {},          false, "#{_}", []]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - And also like this:
   *   var arr = utils.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
   *                          ["#{_}", {},          false]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - Array order is important. example:
   *   var arr = utils.deepExtend([1, 2, 3, 4], [1, 4, 3, 2]);
   *   console.log(arr);
   *   output: [1, 4, 3, 2]
   *
   * - You can remove an array element set in a parent object by setting the same index value to null in a child object.
   *   example:
   *   var obj = utils.deepExtend({arr: [1, 2, 3, 4]}, {arr: ["#{_}", null]});
   *   console.log(obj.arr);
   *   output: [1, 3, 4]
   *
   **/
  deepExtend: function deepExtend() /*obj_1, [obj_2], [obj_N]*/{
    if (arguments.length < 1 || _typeof(arguments[0]) !== 'object') {
      return false;
    }
    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone, tmpBuf;

    args.forEach(function (obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return;

      for (key in obj) {
        if (!(key in obj)) continue;

        src = target[key];
        val = utils.cloneDeep(obj[key]);

        if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) !== 'object' || src === null) {
          target[key] = val;
        } else if (Array.isArray(val)) {
          clone = Array.isArray(src) ? src : [];

          val.forEach(function (item) {
            clone.push(utils.cloneDeep(item));
          });

          target[key] = clone;
          //todo  если заимствуем массив , то ссохраняем значения из обоих массивов
          //target[key] = utils.deepExtend(clone, val);
        } else {
          clone = !Array.isArray(src) ? src : {};
          target[key] = utils.deepExtend(clone, val);
        }
      }
    });

    return target;
  },
  cloneDeep: function cloneDeep(val) {
    if (typeof val === 'undefined') {
      return undefined;
    }

    if (val === null) {
      return null;
    } else if (val instanceof Date) {
      return new Date(val.getTime());
    } else if (val instanceof RegExp) {
      return new RegExp(val);
    }

    if (val.cloneSync) {
      return val.cloneSync();
    } else if (val.constructor == Object) {
      return utils.deepExtend({}, val);
    } else if (val.constructor == Array) {
      var clone = [];
      for (var i = 0; i < val.length; i++) {
        clone.push(utils.cloneDeep(val[i]));
      }
      return clone;
    } else {
      return val;
    }
  },
  rearrange: function rearrange(object, keys) {
    var _newOrder = {};
    for (var i in keys) {
      if (object[keys[i]] !== undefined) {
        _newOrder[keys[i]] = object[keys[i]];
      }
    }
    return _newOrder;
  },
  copyValue: function copyValue(value) {
    if (value == null) {
      return null;
    }
    if (value == undefined) {
      return undefined;
    }
    switch (value.constructor) {
      case Object:
        return utils.deepExtend({}, value);
      case Array:
        return utils.deepExtend([], value);
      case String:
      case Number:
      case Boolean:
        return value;
      default:
        //console.log(value.constructor);
        return utils.deepExtend({}, value);
    }
  },
  clearValue: function clearValue(value) {
    switch (value.constructor) {
      case Object:
        for (var member in value) {
          delete value[member];
        }break;
      case Array:
        value.length = 0;
        break;
      default:
      //delete value;
    }
  },
  difference: function difference(prev, now) {
    var changes = {};
    for (var prop in now) {
      if (!prev || prev[prop] !== now[prop]) {
        if (_typeof(now[prop]) == "object") {
          var c = utils.difference(prev[prop], now[prop]);
          if (!_.isEmpty(c)) // underscore
            changes[prop] = c;
        } else {
          changes[prop] = now[prop];
        }
      }
    }
    return changes;
  },
  clone: function clone(object, deep) {
    if (deep) {
      return utils.cloneDeep(object);
    } else {
      return utils.extend({}, object);
    }
  }
};

_.defaults(utils, _);

module.exports = utils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  resolve: function resolve(path) {
    var chunks = path.split("/");
    var prev = 0;
    for (var i = chunks.length; i-- > 0;) {
      if (chunks[i] == "..") {
        prev++;
      } else {
        while (prev > 0) {
          chunks.splice(i, 1);
          chunks.splice(i--, 1);
          prev--;
        }
      }
    }
    return chunks.join("/");
  },
  getParentDirectoryUrl: function getParentDirectoryUrl(url) {
    return url.substr(0, url.lastIndexOf("/") + 1);
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

String.prototype.format = function () {
  var str = this.toString();
  if (arguments.length) {
    var type = _typeof(arguments[0]),
        args = type == 'string' || type == 'number' ? Array.prototype.slice.call(arguments) : arguments[0];
    //
    // for (var arg in args) str = str.replace(new RegExp('\\{' + arg + '\\}', 'gi'), args[arg])

    str = str.replace(/\{([^}]*)\}/g, function (a, b) {
      return utils.evalInContext(b, args);
    });
  }

  return str;
};

var utils = {
  extractVariables: function extractVariables(str) {
    return str.match(/(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*/gi);
  },
  evalInContext: function evalInContext(js) {
    js = js.replace(/\s+/g, '');

    var keys = [],
        values = [];

    for (var i = 1; i < arguments.length; i++) {
      keys = keys.concat(Object.keys(arguments[i]));
      for (var j in arguments[i]) {
        values.push(arguments[i][j]);
      }
    }

    //
    //if(_.isCorrectVariableName(js) && keys.indexOf(js) === -1){
    //  keys.push(js);
    //  values.push(undefined);
    //}

    var arr = utils.extractVariables(js);
    //console.log(arr);
    for (var i in arr) {
      if (keys.indexOf(arr[i]) === -1) {
        keys.push(arr[i]);
        values.push(undefined);
      }
    }
    js = "var foo = function(" + keys.join(",") + "){ var __return__value = " + js + " ;return __return__value;}; foo;";
    try {
      var foo = eval(js);
      return foo.apply(this, values);
    } catch (e) {
      return undefined;
    }
  },
  compileElement: function compileElement($item, scope) {

    function _eachSelf(el, selector, foo) {
      el.find(selector).each(foo);
      if (el.is(selector)) {
        foo.call(el[0]);
      }
    }

    //.addBack('selector')
    _eachSelf($item, "[onclick]", function () {
      var onClick = $(this).attr("onclick");
      $(this).removeAttr("onclick");
      $(this).click(function (event) {
        utils.evalInContext(onClick, scope, { event: event });
      });
    });

    _eachSelf($item, "[onchange]", function () {
      var onChange = $(this).attr("onchange");
      $(this).removeAttr("onchange");
      $(this).change(function (event) {
        utils.evalInContext(onChange, scope, { event: event });
      });
    });

    _eachSelf($item, "[dp-checked]", function () {
      var _val = $(this).attr("dp-checked");
      var val = utils.evalInContext(_val, scope);
      if (val) {
        $(this).attr("checked", "checked");
      } else {
        $(this).removeAttr("checked");
      }
    });
    _eachSelf($item, "[dp-src]", function () {
      var _val = $(this).attr("dp-src");
      var val = utils.evalInContext(_val, scope);
      if (val) {
        $(this).attr("src", val);
      }
    });
    _eachSelf($item, "[dp-if]", function () {
      var _val = $(this).attr("dp-if");
      if (_val === "false") {
        $(this).remove();
      }
      if (_val === "true") {} else {
        var val = utils.evalInContext(_val, scope);
        if (!val) {
          $(this).remove();
        }
      }
    });
    _eachSelf($item, "[dp-include]", function () {
      var _el = $(this);
      var _val = _el.attr("dp-include");
      var val = utils.evalInContext(_val, scope);
      _el.load(val);
    });
  },
  parseTemplate: function parseTemplate(tpl, scope) {
    var $item = $(tpl.format(scope));
    _.compileElement($item, scope);
    return $item;
  }
};
if (true) {
  module.exports = utils;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Canvas.prototype, {
  _setSVGObject: function _setSVGObject(markup, instance, reviver) {
    var result = markup.push(instance.toSVG(reviver));
    if (instance._clipTo) {
      var clipId = 'Clipped' + fabric.Object.__uid++;
      result = '<clipPath id="' + clipId + '">\n                    ' + instance._clipTo.toSVG(reviver) + '\n                </clipPath>\n                <g clip-path="url(#' + clipId + ')">' + result + '</g>';
    }
    // markup.push(instance.toSVG(reviver));
    return reviver ? reviver(result) : result;
  },
  // enableClipAreaZooming: function(){
  //todo
  // this.on('viewport:scaled', function(){
  //   if (!this.layer("background").objects) return;
  //   this._backgroundLayer[0].setCoords();
  // });
  // },
  _fabric_clip_function: function _fabric_clip_function(ctx2) {

    var clipRect = this.clipRect;
    ctx2.save();
    clipRect.render(ctx2);
    ctx2.restore();
  }
});

fabric.util.object.extend(fabric.Object.prototype, {

  setClipTo: function setClipTo(val) {
    this.clipTo = val;
    delete this._clipTo;
    if (!this.clipTo) {
      return;
    }

    if (typeof val !== 'string') {
      this._clipTo = val;
      this.clipTo = val.id;
    }

    var functionBody = fabric.util.getFunctionBody(val);
    if (typeof functionBody !== 'undefined') {
      this._clipTo = new Function('ctx', functionBody);
    }
  },
  _initClipping: function _initClipping(options) {
    if (!options._clipTo) {
      return;
    }

    var functionBody = fabric.util.getFunctionBody(options.clipTo);
    if (typeof functionBody !== 'undefined') {
      this._clipTo = new Function('ctx', functionBody);
    }
  }
});

fabric.util.clipContext = function (receiver, ctx) {
  if (!receiver._clipTo) {
    if (receiver.clipTo === "canvas") {
      var clipObject = receiver.canvas;

      var _w = clipObject.originalWidth || clipObject.width;
      var _h = clipObject.originalHeight || clipObject.height;

      var o = clipObject.offsets;
      var _zoom = clipObject.getZoom();
      ctx.rect(o.left, o.top, _w /*/_zoom */ - o.left - o.right, _h /*/_zoom*/ - o.top - o.bottom);
    } else {

      var _id = receiver.clipTo.substring(1);

      var _clipCtx = receiver.canvas.getObjectByID(_id);
      if (_clipCtx) {
        receiver._clipTo = _clipCtx;
      } else {
        console.warn("error: clipTo not found" + receiver.clipTo);
        delete receiver.clipTo;
        return;
      }
    }
  }

  if (receiver._clipTo.constructor === Function) {
    receiver._clipTo(ctx);
  } else {
    //  fabric.util._clipToObject(receiver, ctx);

    ctx.save();
    // let retina = this.canvas.getRetinaScaling();
    // ctx.setTransform(retina, 0, 0, retina, 0, 0);
    ctx.transform.apply(ctx, receiver.canvas.viewportTransform);
    receiver._clipTo.transform(ctx);
    receiver._clipTo._render(ctx);
    ctx.restore();
    ctx.clip();
  }
};

fabric.util._clipToObject = function (receiver, ctx) {
  /*
  ctx.save();
  ctx.beginPath();
   let fromLeft = false;
  let center = fromLeft ? receiver._getLeftTopCoords() : receiver.getCenterPoint();
  ctx.transform(1, Math.tan(fabric.util.degreesToRadians(-receiver.skewY)), 0, 1, 0, 0);
  ctx.transform(1, 0, Math.tan(fabric.util.degreesToRadians(-receiver.skewX)), 1, 0, 0);
  ctx.scale(
    (1 / receiver.scaleX) * (receiver.flipX ? -1 : 1),
    (1 / receiver.scaleY) * (receiver.flipY ? -1 : 1)
  );
  ctx.rotate(fabric.util.degreesToRadians(-receiver.angle));
  ctx.translate(-center.x, -center.y);
   let clipObject = receiver._clipTo;
   if (clipObject.points) {
    let ps = clipObject.points;
    ctx.moveTo(ps[0].x, ps[0].y);
    for (let j = 1; j < ps.length; j++) {
      ctx.lineTo(ps[j].x, ps[j].y);
    }
    //ctx.stroke();
  } else if (clipObject.type == "path-group") {
     ctx.globalAlpha = 0;
    clipObject.transform(ctx);
     ctx.translate(-clipObject.width/2, -clipObject.height/2);
    for (let i = 0, l = clipObject.paths.length; i < l; ++i) {
      clipObject.paths[i]._render(ctx, true);
    }
  } else if (clipObject.type == "path") {
     ctx.globalAlpha = 0;
    clipObject.transform(ctx);
    clipObject._render(ctx);
     //todo очень плохо. изначально объекты имеют клип к слайду статичному. но потом к канвасу динамическому. нехорошо
  } else if (clipObject.type == "slide" || clipObject.type == "canvas") {
      let _w = clipObject.originalWidth || clipObject.width;
    let _h = clipObject.originalHeight || clipObject.height;
      let o = clipObject.offsets;
    let _zoom = clipObject.getZoom();
    ctx.rect(o.left,o.top, _w /
  }else {
    ctx.translate(clipObject.left, clipObject.top);
    ctx.rotate(-(clipObject.angle * -1) * Math.PI / 180);
    if(clipObject.originX === "center"){
      ctx.rect(- clipObject.width/ 2, - clipObject.height/2, clipObject.width, clipObject.height);
    }else{
      ctx.rect(0,0, clipObject.width, clipObject.height);
    }
  }
   ctx.closePath();
  ctx.restore();*/
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

//fabric.debug = DEVELOPMENT;

__webpack_require__(8);

__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
// require('./core/group.ext');


__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(50);
__webpack_require__(52);
__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(56);

__webpack_require__(57);
__webpack_require__(59);
__webpack_require__(61);

// require('./modules/clipTo');
// require('./modules/shirt');
// require('./modules/slide.areas');
// require('./modules/slide.drawing-tools');
// require('./modules/canvas.events');
// require('./modules/resizable');
// require('./modules/ruler');
// require('./modules/render');
// require('./modules/borderImage');
// require('./modules/saveAs');

// require('./brushes/BaseBrush');
// require('./brushes/PencilBrush');
// require('./brushes/RectangleBrush');
// require('./brushes/PolygonBrush');
// require('./brushes/PaintPenBrush');
// require('./brushes/PaintBucketBrush');
// require('./brushes/PointsBrush');

// require('./shapes/path');
// require('./shapes/clipart');
// require('./shapes/photo');
// require('./shapes/polyline');
// require('./shapes/image.photoshop-tools');
// require('./shapes/image.remove-white');
// require('./shapes/bezierText');
// require('./shapes/textbox.list');
// require('./shapes/textFrame');

if (!fabric.isLikelyNode) {
  __webpack_require__(62);
  __webpack_require__(63);
  __webpack_require__(64);

  /**
   * inline script images
   * @type {{error: string}}
   */
  fabric.media = {
    /**
     * replace images loaded with errors
     */
    error: 'data:image/svg+xml;base64,' + __webpack_require__(73)
  };
}

module.exports = fabric;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.data = __webpack_require__(9);
fabric.util.path = __webpack_require__(4);
fabric.util.compile = __webpack_require__(5);
fabric.util.loader = __webpack_require__(12);
fabric.util.syntax = __webpack_require__(13);
fabric.util.promise = __webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
fabric.util.object.extend(fabric.util, __webpack_require__(2));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(4);
var util = __webpack_require__(2);
var object = __webpack_require__(3);

function isServer() {
  return !(typeof window != 'undefined' && window.document);
}

if (isServer()) {
  var fs = __webpack_require__(11);
}

function _load_json(value, callback_success, callback_error) {

  var output = null;
  var errors = [];

  if (value.constructor == String) {

    var filename, regex_data, init_property;
    regex_data = /^([^#]*)#?(.*)$/.exec(value);

    filename = regex_data[1];
    init_property = regex_data[2];
    utils.getInlineJson(filename, "json", _loadJson_data, function (error) {
      errors.push(error);
      if (callback_error) {
        callback_error(error);
      } else {
        console.error("file: \"" + filename + "\". " + error.message);
      }
    });
  } else {
    _loadJson_data(value);
  }

  function _loadJson_data(data) {
    /*
     замена записей "url(./path/to/file)  на "../../path/to/file"
     url начинающиеся с ./ относительно родителького json файла
      url с "/" добавляется APP_STATIC_PATH
     */
    utils.recoursive(data, function (property, value, parent) {
      if (/^url\(.*\)$/.test(value)) {
        var regex_data = /^url\((\.?\/)?(.*)\)$/.exec(value);
        var url = regex_data[2];

        if (regex_data[1] == "/") {
          url = window.APP_STATIC_PATH + url;
        }
        if (regex_data[1] == "./") {
          url = path.getParentDirectoryUrl(filename) + url;
        }

        parent[property] = path.resolve(url);
      }
    });

    var loader = util.queueLoad(1, function finalize() {

      if (init_property) {
        var prop_arr = init_property.split("/");
        for (var i = 0; i < prop_arr.length; i++) {
          data = data[prop_arr[i]];
        }
      }

      if (errors.length) {
        if (callback_error) callback_error(errors);
      } else {
        if (callback_success) callback_success(data);
        output = data;
      }
    });

    /**
     * remove comments
     */
    utils.recoursive(data, function (property, value, parent) {
      /*
       remove comments like
       ["@comment()"]
       "@comment": {}
       */
      if (/^\/\/.*$/.test(value) || /^@comment\(.*\)$/.test(value) || property == "@comment") {
        if (parent.constructor == Array) {
          parent.splice(property, 1);
        } else {
          delete parent[property];
        }
      } else if (/^@extend.*$/.test(property)) {

        loader.total++;
        _load_json(value, function (data) {
          var ext_data = object.deepExtend(data, parent);
          object.deepExtend(parent, ext_data);
          delete parent["@extend"];
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@extend\(.*\)$/.test(value)) {
        var _reg_data = /^@extend\((\.\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1]) {
          url = path.getParentDirectoryUrl(filename) + url;
        }
        loader.total++;
        _load_json(url, function (data) {
          parent[property] = data;
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@mixin\(.*\)$/.test(value)) {
        var _reg_data = /^@mixin\((\.\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1]) {
          url = path.getParentDirectoryUrl(filename) + url;
        }
        loader.total++;
        _load_json(url, function (data) {
          if (parent.constructor == Array) {
            parent.splice(property, 1);
            for (var i in data) {
              parent.push(data[i]);
            }
          } else {
            delete parent[property];
            for (var i in data) {
              parent[i] = data[i];
            }
          }
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@load\((.*)\)$/.test(value)) {
        var _reg_data = /^@load\((\.?\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1] == "/") {
          url = window.APP_STATIC_PATH + url;
        }
        if (_reg_data[1] == "./") {
          url = path.getParentDirectoryUrl(filename) + url;
        }

        loader.total++;
        utils.getInlineJson(url, "html", function (data) {
          parent[property] = data;
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      }
    });
    loader();
  }

  return output;
}

var utils = {
  CACHED_JSON: {},
  loadJsonSync: function loadJsonSync(src) {
    var data;
    _load_json(src, function (_data) {
      data = _data;
    });
    return data;
  },

  /**
   позволяет использовать конструкции вида
   расширить данные из файла template.json
   "@extend" : "url(data/template.json)",
   "@extend" : "url(data/template.json#settings/stages)",
    //заменить строку наданные из файла
   "stages":       "url(data/template.json#settings/stages)",
    * @param filename
   * @param callback_success
   * @param callback_error
   */
  loadJson: function loadJson(value, resolve_cb, fail_cb) {
    return _load_json(value, function (data) {
      resolve_cb && resolve_cb(data);
    }, function (err) {
      fail_cb && fail_cb(err);
    });
  },

  removeComments: function removeComments(str) {
    str = str.replace(/^\s*(\/\/.*|(?:\/\*[\s\S]*?)\*\/\s*)$/gm, "");
    return str;
  },
  /**
   *
   * @param object
   * @param criteria - выполнять функцию со всеми объектами
   */
  recoursive: function recoursive(object, criteria) {
    var readed = [];
    if (!object) return;
    return function sub_recoursive(object) {
      if (readed.indexOf(object) != -1) {
        return;
      }
      readed.push(object);

      if (object instanceof Array) {
        for (var prop = object.length; prop--;) {
          if (object[prop] && (object[prop].constructor == Object || object[prop].constructor == Array)) {
            sub_recoursive(object[prop]);
          } else {
            var break_ = criteria(prop, object[prop], object);
          }
        }
      } else {
        for (var prop in object) {
          if (object[prop] && (object[prop].constructor == Object || object[prop].constructor == Array)) {
            sub_recoursive(object[prop]);
          } else {
            var break_ = criteria(prop, object[prop], object);
          }
        }
      }
    }(object);
  },

  parseCSV: function parseCSV(data) {
    var rows = data.split(/\n/);
    var columns = rows[0].split(',');
    rows.splice(0, 1);

    for (var i = 0; i < rows.length; i++) {
      var output_row_data = {};
      var row_data = [];

      var _quote = false,
          last = -1;
      var j = -1;
      var str = rows[i];
      while (++j < str.length) {
        if (!_quote) {
          if (str[j] == '\'' || str[j] == '\"') {
            _quote = str[j];
          }
          if (str[j] == ",") {
            var _val = str.substring(last, j);
            if (_val[0] == '\"' && _val[_val.length - 1] == '\"') {
              _val = _val.substring(1, _val.length - 1);
            }
            row_data.push(_val);
            last = j + 1;
          }
        } else {
          if (str[j] == _quote) {
            _quote = false;
          }
        }
      }

      for (var j in row_data) {
        output_row_data[columns[j]] = row_data[j];
      }
      rows[i] = output_row_data;
    }
    return rows;
  },
  /**
   *
   * https://stackoverflow.com/questions/4843746/regular-expression-to-add-double-quotes-around-keys-in-javascript
   */
  doubleQuote: function doubleQuote(jsonString) {
    var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g; // look for object names
    return jsonString.replace(objKeysRegex, "$1\"$2\":"); // all object names should be double quoted
  },
  parseData: function parseData(data, dataType) {
    var _parsed;
    if (dataType == "csv") {
      _parsed = utils.parseCSV(data);
    } else if (dataType == "json") {
      _parsed = data.trim();
      //if (data[0] != "{" && data[0] != "[") {
      //  return false;
      //}

      _parsed = utils.removeComments(_parsed);
      //data  = data.replace(/\n/g,"")


      _parsed = utils.doubleQuote(_parsed);

      try {
        var _parsed = JSON.parse(_parsed); //= JSON.parse(data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,""));
      } catch (e) {
        return {
          status: "error",
          message: e.toString(),
          data: data
        };
      }
      //var script = $("<script type='text/json' id='" + url + "'>" + JSON.stringify(data) + "</script>");
    }
    return {
      status: "success",
      data: _parsed
    };
  },
  load: function load(url, dataType, callback_success, callback_error) {
    //todo
    if (isServer()) {
      try {
        var data = fs.readFileSync(url, 'utf8');
        data = data.replace(/^\uFEFF/, '');
        var _parsed = utils.parseData(data, dataType);
        if (_parsed.status == "error") {
          callback_error({
            status: "error",
            message: _parsed.message,
            data: _parsed.data
          });
          return;
        }
        callback_success(_parsed.data);
      } catch (e) {

        if (e.code === 'ENOENT') {
          console.log('File not found!');
        } else {
          throw e;
        }
        callback_error(data);
      }
    } else {

      var httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            var data = httpRequest.responseText;
            var _parsed = utils.parseData(data, dataType);
            if (_parsed.status == "error") {
              callback_error({
                status: httpRequest.status,
                message: _parsed.message,
                response: httpRequest.responseText
              });
              return;
            }
            callback_success(_parsed.data);
          } else {
            callback_error(url, httpRequest);
          }
        }
      };
      httpRequest.open('GET', url);
      httpRequest.send();
    }
  },
  /**
   * Позволяетзагружать json файлы , содержащие ссылки на другие json файлы.
   * вместо ссылок типа
   *  "property" : "url(chunk.json)"
   *  будет загружено содержимое файла
   *  "property" : {...}
   *
   *  если указать якорь
   *  "property" : "url(chunk.json#settings/chunk/0/text)"
   *
   * то будет загружено содержимое поля settings.chunk[0].text из файла chunk.json
   *
   *
   * @param filename  путь к основному json файлу
   * @param callback  будет вызван после окончания загрузки всех файлов
   */
  getInlineJson: function getInlineJson(url, dataType, callback_success, callback_error) {

    if (dataType.constructor != String) {
      callback_error = callback_success;
      callback_success = dataType;
      dataType = "json";
    }

    if (typeof utils.CACHED_JSON !== "undefined" && utils.CACHED_JSON && utils.CACHED_JSON[url]) {
      callback_success(utils.CACHED_JSON[url]);
      return;
    }
    if (typeof $ !== "undefined") {
      if (typeof document !== "undefined") {
        var inline = $("script[id='" + url + "']");
        if (inline.length > 0) {
          var _data = inline[0].innerText || //all
          inline[0].textContent || //firefox
          inline[0].text; //ie8
          if (dataType == "json") {

            var _data = utils.removeComments(_data);
            callback_success(JSON.parse(_data));
          } else {
            callback_success(_data);
          }
          return;
        }
      }
    }
    utils.load(url, dataType, callback_success, callback_error);
  }
};

module.exports = utils;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.


// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FuncProto = Function.prototype;

// Create quick reference variables for speed access to core prototypes.
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeBind = FuncProto.bind,
    nativeCreate = Object.create;

// Naked function reference for surrogate-prototype-swapping.
var Ctor = function Ctor() {};

// Create a safe reference to the Underscore object for use below.
var _ = function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

// Current version.
_.VERSION = '1.8.3';

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
var optimizeCb = function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    case 2:
      return function (value, other) {
        return func.call(context, value, other);
      };
    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };
    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }
  return function () {
    return func.apply(context, arguments);
  };
};

// A mostly-internal function to generate callbacks that can be applied
// to each element in a collection, returning the desired result — either
// identity, an arbitrary callback, a property matcher, or a property accessor.
var cb = function cb(value, context, argCount) {
  if (value == null) return _.identity;
  if (_.isFunction(value)) return optimizeCb(value, context, argCount);
  if (_.isObject(value)) return _.matcher(value);
  return _.property(value);
};
_.iteratee = function (value, context) {
  return cb(value, context, Infinity);
};

// An internal function for creating assigner functions.
var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
  return function (obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};

// An internal function for creating a new object that inherits from another.
var baseCreate = function baseCreate(prototype) {
  if (!_.isObject(prototype)) return {};
  if (nativeCreate) return nativeCreate(prototype);
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
};

var property = function property(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
};

// Helper for collection methods to determine whether a collection
// should be iterated as an array or as an object
// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function isArrayLike(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Collection Functions
// --------------------

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
_.each = _.forEach = function (obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;
  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};

// Return the results of applying the iteratee to each element.
_.map = _.collect = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length,
      results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

// Create a reducing function iterating left or right.
function createReduce(dir) {
  // Optimized iterator function as using arguments.length
  // in the main function will deoptimize the, see #1991.
  function iterator(obj, iteratee, memo, keys, index, length) {
    for (; index >= 0 && index < length; index += dir) {
      var currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  }

  return function (obj, iteratee, memo, context) {
    iteratee = optimizeCb(iteratee, context, 4);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index = dir > 0 ? 0 : length - 1;
    // Determine the initial value if none is provided.
    if (arguments.length < 3) {
      memo = obj[keys ? keys[index] : index];
      index += dir;
    }
    return iterator(obj, iteratee, memo, keys, index, length);
  };
}

// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
_.reduce = _.foldl = _.inject = createReduce(1);

// The right-associative version of reduce, also known as `foldr`.
_.reduceRight = _.foldr = createReduce(-1);

// Return the first value which passes a truth test. Aliased as `detect`.
_.find = _.detect = function (obj, predicate, context) {
  var key;
  if (isArrayLike(obj)) {
    key = _.findIndex(obj, predicate, context);
  } else {
    key = _.findKey(obj, predicate, context);
  }
  if (key !== void 0 && key !== -1) return obj[key];
};

// Return all the elements that pass a truth test.
// Aliased as `select`.
_.filter = _.select = function (obj, predicate, context) {
  var results = [];
  predicate = cb(predicate, context);
  _.each(obj, function (value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
};

// Return all the elements for which a truth test fails.
_.reject = function (obj, predicate, context) {
  return _.filter(obj, _.negate(cb(predicate)), context);
};

// Determine whether all of the elements match a truth test.
// Aliased as `all`.
_.every = _.all = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
};

// Determine if at least one element in the object matches a truth test.
// Aliased as `any`.
_.some = _.any = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }
  return false;
};

// Determine if the array or object contains a given item (using `===`).
// Aliased as `includes` and `include`.
_.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = _.values(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return _.indexOf(obj, item, fromIndex) >= 0;
};

// Invoke a method (with arguments) on every item in a collection.
_.invoke = function (obj, method) {
  var args = slice.call(arguments, 2);
  var isFunc = _.isFunction(method);
  return _.map(obj, function (value) {
    var func = isFunc ? method : value[method];
    return func == null ? func : func.apply(value, args);
  });
};

// Convenience version of a common use case of `map`: fetching a property.
_.pluck = function (obj, key) {
  return _.map(obj, _.property(key));
};

// Convenience version of a common use case of `filter`: selecting only objects
// containing specific `key:value` pairs.
_.where = function (obj, attrs) {
  return _.filter(obj, _.matcher(attrs));
};

// Convenience version of a common use case of `find`: getting the first object
// containing specific `key:value` pairs.
_.findWhere = function (obj, attrs) {
  return _.find(obj, _.matcher(attrs));
};

// Return the maximum element (or element-based computation).
_.max = function (obj, iteratee, context) {
  var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;
  if (iteratee == null && obj != null) {
    obj = isArrayLike(obj) ? obj : _.values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value > result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    _.each(obj, function (value, index, list) {
      computed = iteratee(value, index, list);
      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = value;
        lastComputed = computed;
      }
    });
  }
  return result;
};

// Return the minimum element (or element-based computation).
_.min = function (obj, iteratee, context) {
  var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;
  if (iteratee == null && obj != null) {
    obj = isArrayLike(obj) ? obj : _.values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value < result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    _.each(obj, function (value, index, list) {
      computed = iteratee(value, index, list);
      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = value;
        lastComputed = computed;
      }
    });
  }
  return result;
};

// Shuffle a collection, using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
_.shuffle = function (obj) {
  var set = isArrayLike(obj) ? obj : _.values(obj);
  var length = set.length;
  var shuffled = Array(length);
  for (var index = 0, rand; index < length; index++) {
    rand = _.random(0, index);
    if (rand !== index) shuffled[index] = shuffled[rand];
    shuffled[rand] = set[index];
  }
  return shuffled;
};

// Sample **n** random values from a collection.
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.
_.sample = function (obj, n, guard) {
  if (n == null || guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return obj[_.random(obj.length - 1)];
  }
  return _.shuffle(obj).slice(0, Math.max(0, n));
};

// Sort the object's values by a criterion produced by an iteratee.
_.sortBy = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  return _.pluck(_.map(obj, function (value, index, list) {
    return {
      value: value,
      index: index,
      criteria: iteratee(value, index, list)
    };
  }).sort(function (left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }
    return left.index - right.index;
  }), 'value');
};

// An internal function used for aggregate "group by" operations.
var group = function group(behavior) {
  return function (obj, iteratee, context) {
    var result = {};
    iteratee = cb(iteratee, context);
    _.each(obj, function (value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
};

// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
_.groupBy = group(function (result, value, key) {
  if (_.has(result, key)) result[key].push(value);else result[key] = [value];
});

// Indexes the object's values by a criterion, similar to `groupBy`, but for
// when you know that your index values will be unique.
_.indexBy = group(function (result, value, key) {
  result[key] = value;
});

// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
_.countBy = group(function (result, value, key) {
  if (_.has(result, key)) result[key]++;else result[key] = 1;
});

// Safely create a real, live array from anything iterable.
_.toArray = function (obj) {
  if (!obj) return [];
  if (_.isArray(obj)) return slice.call(obj);
  if (isArrayLike(obj)) return _.map(obj, _.identity);
  return _.values(obj);
};

// Return the number of elements in an object.
_.size = function (obj) {
  if (obj == null) return 0;
  return isArrayLike(obj) ? obj.length : _.keys(obj).length;
};

// Split a collection into two arrays: one whose elements all satisfy the given
// predicate, and one whose elements all do not satisfy the predicate.
_.partition = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var pass = [],
      fail = [];
  _.each(obj, function (value, key, obj) {
    (predicate(value, key, obj) ? pass : fail).push(value);
  });
  return [pass, fail];
};

// Array Functions
// ---------------

// Get the first element of an array. Passing **n** will return the first N
// values in the array. Aliased as `head` and `take`. The **guard** check
// allows it to work with `_.map`.
_.first = _.head = _.take = function (array, n, guard) {
  if (array == null) return void 0;
  if (n == null || guard) return array[0];
  return _.initial(array, array.length - n);
};

// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
_.initial = function (array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
};

// Get the last element of an array. Passing **n** will return the last N
// values in the array.
_.last = function (array, n, guard) {
  if (array == null) return void 0;
  if (n == null || guard) return array[array.length - 1];
  return _.rest(array, Math.max(0, array.length - n));
};

// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array.
_.rest = _.tail = _.drop = function (array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
};

// Trim out all falsy values from an array.
_.compact = function (array) {
  return _.filter(array, _.identity);
};

// Internal implementation of a recursive `flatten` function.
var flatten = function flatten(input, shallow, strict, startIndex) {
  var output = [],
      idx = 0;
  for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
      //flatten current level of array or arguments object
      if (!shallow) value = flatten(value, shallow, strict);
      var j = 0,
          len = value.length;
      output.length += len;
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};

// Flatten out an array, either recursively (by default), or just one level.
_.flatten = function (array, shallow) {
  return flatten(array, shallow, false);
};

// Return a version of the array that does not contain the specified value(s).
_.without = function (array) {
  return _.difference(array, slice.call(arguments, 1));
};

// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// Aliased as `unique`.
_.uniq = _.unique = function (array, isSorted, iteratee, context) {
  if (!_.isBoolean(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }
  if (iteratee != null) iteratee = cb(iteratee, context);
  var result = [];
  var seen = [];
  for (var i = 0, length = getLength(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!_.contains(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!_.contains(result, value)) {
      result.push(value);
    }
  }
  return result;
};

// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
_.union = function () {
  return _.uniq(flatten(arguments, true, true));
};

// Produce an array that contains every item shared between all the
// passed-in arrays.
_.intersection = function (array) {
  var result = [];
  var argsLength = arguments.length;
  for (var i = 0, length = getLength(array); i < length; i++) {
    var item = array[i];
    if (_.contains(result, item)) continue;
    for (var j = 1; j < argsLength; j++) {
      if (!_.contains(arguments[j], item)) break;
    }
    if (j === argsLength) result.push(item);
  }
  return result;
};

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = function (array) {
  var rest = flatten(arguments, true, true, 1);
  return _.filter(array, function (value) {
    return !_.contains(rest, value);
  });
};

// Zip together multiple lists into a single array -- elements that share
// an index go together.
_.zip = function () {
  return _.unzip(arguments);
};

// Complement of _.zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices
_.unzip = function (array) {
  var length = array && _.max(array, getLength).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = _.pluck(array, index);
  }
  return result;
};

// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values.
_.object = function (list, values) {
  var result = {};
  for (var i = 0, length = getLength(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }
  return result;
};

// Generator function to create the findIndex and findLastIndex functions
function createPredicateIndexFinder(dir) {
  return function (array, predicate, context) {
    predicate = cb(predicate, context);
    var length = getLength(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
}

// Returns the first index on an array-like that passes a predicate test
_.findIndex = createPredicateIndexFinder(1);
_.findLastIndex = createPredicateIndexFinder(-1);

// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
_.sortedIndex = function (array, obj, iteratee, context) {
  iteratee = cb(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0,
      high = getLength(array);
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
  }
  return low;
};

// Generator function to create the indexOf and lastIndexOf functions
function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function (array, item, idx) {
    var i = 0,
        length = getLength(array);
    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }
    if (item !== item) {
      idx = predicateFind(slice.call(array, i, length), _.isNaN);
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  };
}

// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
_.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](http://docs.python.org/library/functions.html#range).
_.range = function (start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  step = step || 1;

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};

// Function (ahem) Functions
// ------------------

// Determines whether to execute a function as a constructor
// or a normal function with the provided arguments
var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = baseCreate(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if (_.isObject(result)) return result;
  return self;
};

// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.
_.bind = function (func, context) {
  if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
  if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
  var args = slice.call(arguments, 2);
  var bound = function bound() {
    return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
  };
  return bound;
};

// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder, allowing any combination of arguments to be pre-filled.
_.partial = function (func) {
  var boundArgs = slice.call(arguments, 1);
  var bound = function bound() {
    var position = 0,
        length = boundArgs.length;
    var args = Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
    }
    while (position < arguments.length) {
      args.push(arguments[position++]);
    }return executeBound(func, bound, this, this, args);
  };
  return bound;
};

// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
_.bindAll = function (obj) {
  var i,
      length = arguments.length,
      key;
  if (length <= 1) throw new Error('bindAll must be passed function names');
  for (i = 1; i < length; i++) {
    key = arguments[i];
    obj[key] = _.bind(obj[key], obj);
  }
  return obj;
};

// Memoize an expensive function by storing its results.
_.memoize = function (func, hasher) {
  var memoize = function memoize(key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
_.delay = function (func, wait) {
  var args = slice.call(arguments, 2);
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
};

// Defers a function, scheduling it to run after the current call stack has
// cleared.
_.defer = _.partial(_.delay, _, 1);

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
_.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function (func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function later() {
    var last = _.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
_.wrap = function (func, wrapper) {
  return _.partial(wrapper, func);
};

// Returns a negated version of the passed-in predicate.
_.negate = function (predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
};

// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) {
      result = args[i].call(this, result);
    }return result;
  };
};

// Returns a function that will only be executed on and after the Nth call.
_.after = function (times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
};

// Returns a function that will only be executed up to (but not including) the Nth call.
_.before = function (times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }
    if (times <= 1) func = null;
    return memo;
  };
};

// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
_.once = _.partial(_.before, 2);

// Object Functions
// ----------------

// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

function collectNonEnumProps(obj, keys) {
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

  // Constructor is a special case.
  var prop = 'constructor';
  if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];
    if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
      keys.push(prop);
    }
  }
}

// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`
_.keys = function (obj) {
  if (!_.isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var keys = [];
  for (var key in obj) {
    if (_.has(obj, key)) keys.push(key);
  } // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

// Retrieve all the property names of an object.
_.allKeys = function (obj) {
  if (!_.isObject(obj)) return [];
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  } // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

// Retrieve the values of an object's properties.
_.values = function (obj) {
  var keys = _.keys(obj);
  var length = keys.length;
  var values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
};

// Returns the results of applying the iteratee to each element of the object
// In contrast to _.map it returns an object
_.mapObject = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = _.keys(obj),
      length = keys.length,
      results = {},
      currentKey;
  for (var index = 0; index < length; index++) {
    currentKey = keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

// Convert an object into a list of `[key, value]` pairs.
_.pairs = function (obj) {
  var keys = _.keys(obj);
  var length = keys.length;
  var pairs = Array(length);
  for (var i = 0; i < length; i++) {
    pairs[i] = [keys[i], obj[keys[i]]];
  }
  return pairs;
};

// Invert the keys and values of an object. The values must be serializable.
_.invert = function (obj) {
  var result = {};
  var keys = _.keys(obj);
  for (var i = 0, length = keys.length; i < length; i++) {
    result[obj[keys[i]]] = keys[i];
  }
  return result;
};

// Return a sorted list of the function names available on the object.
// Aliased as `methods`
_.functions = _.methods = function (obj) {
  var names = [];
  for (var key in obj) {
    if (_.isFunction(obj[key])) names.push(key);
  }
  return names.sort();
};

// Extend a given object with all the properties in passed-in object(s).
_.extend = createAssigner(_.allKeys);

// Assigns a given object with all the own properties in the passed-in object(s)
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
_.extendOwn = _.assign = createAssigner(_.keys);

// Returns the first key on an object that passes a predicate test
_.findKey = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = _.keys(obj),
      key;
  for (var i = 0, length = keys.length; i < length; i++) {
    key = keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
};

// Return a copy of the object only containing the whitelisted properties.
_.pick = function (object, oiteratee, context) {
  var result = {},
      obj = object,
      iteratee,
      keys;
  if (obj == null) return result;
  if (_.isFunction(oiteratee)) {
    keys = _.allKeys(obj);
    iteratee = optimizeCb(oiteratee, context);
  } else {
    keys = flatten(arguments, false, false, 1);
    iteratee = function iteratee(value, key, obj) {
      return key in obj;
    };
    obj = Object(obj);
  }
  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }
  return result;
};

// Return a copy of the object without the blacklisted properties.
_.omit = function (obj, iteratee, context) {
  if (_.isFunction(iteratee)) {
    iteratee = _.negate(iteratee);
  } else {
    var keys = _.map(flatten(arguments, false, false, 1), String);
    iteratee = function iteratee(value, key) {
      return !_.contains(keys, key);
    };
  }
  return _.pick(obj, iteratee, context);
};

// Fill in a given object with default properties.
_.defaults = createAssigner(_.allKeys, true);

// Retrieve all the property names of an object.
_.allKeys = function (obj) {
  if (!_.isObject(obj)) return [];
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  } // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
  return function (obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};

// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
_.create = function (prototype, props) {
  var result = baseCreate(prototype);
  if (props) _.extendOwn(result, props);
  return result;
};

// Create a (shallow-cloned) duplicate of an object.
_.clone = function (obj) {
  if (!_.isObject(obj)) return obj;
  return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
};

// Invokes interceptor with the obj, and then returns obj.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
_.tap = function (obj, interceptor) {
  interceptor(obj);
  return obj;
};

// Returns whether an object has a given set of `key:value` pairs.
_.isMatch = function (object, attrs) {
  var keys = _.keys(attrs),
      length = keys.length;
  if (object == null) return !length;
  var obj = Object(object);
  for (var i = 0; i < length; i++) {
    var key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
};

// Internal recursive comparison function for `isEqual`.
var eq = function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  // A strict comparison is necessary because `null == undefined`.
  if (a == null || b == null) return a === b;
  // Unwrap any wrapped objects.
  if (a instanceof _) a = a._wrapped;
  if (b instanceof _) b = b._wrapped;
  // Compare `[[Class]]` names.
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case '[object RegExp]':
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;
    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN
      if (+a !== +a) return +b !== +b;
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
  }

  var areArrays = className === '[object Array]';
  if (!areArrays) {
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    var aCtor = a.constructor,
        bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
      return false;
    }
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);

  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false;
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var keys = _.keys(a),
        key;
    length = keys.length;
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (_.keys(b).length !== length) return false;
    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();
  return true;
};

// Perform a deep comparison to check if two objects are equal.
_.isEqual = function (a, b) {
  return eq(a, b);
};

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
_.isEmpty = function (obj) {
  if (obj == null) return true;
  if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
  return _.keys(obj).length === 0;
};

// Is a given value a DOM element?
_.isElement = function (obj) {
  return !!(obj && obj.nodeType === 1);
};

// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
_.isArray = nativeIsArray || function (obj) {
  return toString.call(obj) === '[object Array]';
};

// Is a given variable an object?
_.isObject = function (obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  return type === 'function' || type === 'object' && !!obj;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), and in Safari 8 (#1929).
if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
}

// Is a given object a finite number?
_.isFinite = function (obj) {
  return isFinite(obj) && !isNaN(parseFloat(obj));
};

// Is the given value `NaN`? (NaN is the only number which does not equal itself).
_.isNaN = function (obj) {
  return _.isNumber(obj) && obj !== +obj;
};

// Is a given value a boolean?
_.isBoolean = function (obj) {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
};

// Is a given value equal to null?
_.isNull = function (obj) {
  return obj === null;
};

// Is a given variable undefined?
_.isUndefined = function (obj) {
  return obj === void 0;
};

// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
_.has = function (obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
};

// Keep the identity function around for default iteratees.
_.identity = function (value) {
  return value;
};

// Predicate-generating functions. Often useful outside of Underscore.
_.constant = function (value) {
  return function () {
    return value;
  };
};

_.noop = function () {};

_.property = property;

// Generates a function for a given object that returns a given property.
_.propertyOf = function (obj) {
  return obj == null ? function () {} : function (key) {
    return obj[key];
  };
};

// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
_.matcher = _.matches = function (attrs) {
  attrs = _.extendOwn({}, attrs);
  return function (obj) {
    return _.isMatch(obj, attrs);
  };
};

// Run a function **n** times.
_.times = function (n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizeCb(iteratee, context, 1);
  for (var i = 0; i < n; i++) {
    accum[i] = iteratee(i);
  }return accum;
};

// Return a random integer between min and max (inclusive).
_.random = function (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

// A (possibly faster) way to get the current timestamp as an integer.
_.now = Date.now || function () {
  return new Date().getTime();
};

// List of HTML entities for escaping.
var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
var unescapeMap = _.invert(escapeMap);

// Functions for escaping and unescaping strings to/from HTML interpolation.
var createEscaper = function createEscaper(map) {
  var escaper = function escaper(match) {
    return map[match];
  };
  // Regexes for identifying a key that needs to be escaped
  var source = '(?:' + _.keys(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
};
_.escape = createEscaper(escapeMap);
_.unescape = createEscaper(unescapeMap);

// If the value of the named `property` is a function then invoke it with the
// `object` as context; otherwise, return it.
_.result = function (object, property, fallback) {
  var value = object == null ? void 0 : object[property];
  if (value === void 0) {
    value = fallback;
  }
  return _.isFunction(value) ? value.call(object) : value;
};

// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;
_.uniqueId = function (prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
};

// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
_.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/;

// Certain characters need to be escaped so that they can be put into a
// string literal.
var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function escapeChar(match) {
  return '\\' + escapes[match];
};

// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
_.template = function (text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = _.defaults({}, settings, _.templateSettings);

  // Combine delimiters into one regular expression via alternation.
  var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

  // Compile the template source, escaping string literals appropriately.
  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escaper, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    }

    // Adobe VMs need the match returned to produce the correct offest.
    return match;
  });
  source += "';\n";

  // If a variable is not specified, place data values in local scope.
  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

  try {
    var render = new Function(settings.variable || 'obj', '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function template(data) {
    return render.call(this, data, _);
  };

  // Provide the compiled source as a convenience for precompilation.
  var argument = settings.variable || 'obj';
  template.source = 'function(' + argument + '){\n' + source + '}';

  return template;
};

// Add a "chain" function. Start chaining a wrapped Underscore object.
_.chain = function (obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
};

// OOP
// ---------------
// If Underscore is called as a function, it returns a wrapped object that
// can be used OO-style. This wrapper holds altered versions of all the
// underscore functions. Wrapped objects may be chained.

// Helper function to continue chaining intermediate results.
var result = function result(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
};

// Add your own custom functions to the Underscore object.
_.mixin = function (obj) {
  _.each(_.functions(obj), function (name) {
    var func = _[name] = obj[name];
    _.prototype[name] = function () {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return result(this, func.apply(_, args));
    };
  });
};

// Add all of the Underscore functions to the wrapper object.
_.mixin(_);

// Add all mutator Array functions to the wrapper.
_.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
  var method = ArrayProto[name];
  _.prototype[name] = function () {
    var obj = this._wrapped;
    method.apply(obj, arguments);
    if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
    return result(this, obj);
  };
});

// Add all accessor Array functions to the wrapper.
_.each(['concat', 'join', 'slice'], function (name) {
  var method = ArrayProto[name];
  _.prototype[name] = function () {
    return result(this, method.apply(this._wrapped, arguments));
  };
});

// Extracts the result from a wrapped and chained object.
_.prototype.value = function () {
  return this._wrapped;
};

// Provide unwrapping proxy for some methods used in engine operations
// such as arithmetic and JSON stringification.
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function () {
  return '' + this._wrapped;
};

if (true) {
  module.exports = _;
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  loadScript: function loadScript(requirement, helper, error) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = error;
    script.onreadystatechange = function () {
      if (this.readyState == 'complete') {
        helper(script, __src);
      }
    };
    script.addEventListener("load", helper, true);
    script.src = requirement;
    head.appendChild(script);
  },
  scriptURL: function scriptURL() {

    if (document.currentScript) {
      return document.currentScript.src;
    }
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i--;) {
      if (scripts[i].src) {
        return scripts[i].src;
      }
    }
    return false;
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deepDiffMapper = {
  VALUE_CREATED: 'created',
  VALUE_UPDATED: 'updated',
  VALUE_DELETED: 'deleted',
  VALUE_UNCHANGED: 'unchanged',
  map: function map(obj1, obj2) {
    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      throw 'Invalid argument. Function given, object expected.';
    }
    if (this.isValue(obj1) || this.isValue(obj2)) {
      return {
        '_map_type': this.compareValues(obj1, obj2),
        '_map_data': obj2 === undefined ? obj1 : obj2
      };
    }

    if (_.isArray(obj2)) {
      var _array = true;
      var diff = [];
    } else {
      var diff = {};
    }

    for (var key in obj1) {
      if (this.isFunction(obj1[key])) {
        continue;
      }

      var value2 = undefined;
      if ('undefined' != typeof obj2[key]) {
        value2 = obj2[key];
      }

      diff[key] = this.map(obj1[key], value2);
    }
    for (var key in obj2) {
      if (this.isFunction(obj2[key]) || 'undefined' != typeof diff[key]) {
        continue;
      }

      var _val = this.map(undefined, obj2[key]);
      if (_array) {
        diff.push(_val);
      } else {
        diff[key] = _val;
      }
    }

    return {
      '_map_type': '',
      '_map_data': diff
    };
  },
  compareValues: function compareValues(value1, value2) {
    if (value1 === value2) {
      return this.VALUE_UNCHANGED;
    }
    if ('undefined' == typeof value1) {
      return this.VALUE_CREATED;
    }
    if ('undefined' == typeof value2) {
      return this.VALUE_DELETED;
    }

    return this.VALUE_UPDATED;
  },
  isFunction: function isFunction(obj) {
    return {}.toString.apply(obj) === '[object Function]';
  },
  isArray: function isArray(obj) {
    return {}.toString.apply(obj) === '[object Array]';
  },
  isObject: function isObject(obj) {
    return {}.toString.apply(obj) === '[object Object]';
  },
  isValue: function isValue(obj) {
    return !this.isObject(obj) && !this.isArray(obj);
  }
};

module.exports = {
  differenceMap: deepDiffMapper.map.bind(deepDiffMapper),
  syntaxHighlight: function syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
    return json = json.replace(/[^,\n][^\n]*/g, function (match) {
      return '<span>' + match + '</span>';
    });
  },
  differenceHighlight: function differenceHighlight(json, output) {

    if (output) {
      output.empty();
    } else {
      output = $("<pre>");
    }

    function printObject(json, level, output, comma, objectIndex) {
      var _el = $("<p>");

      _el.append($("<span>").addClass("object-key").append($("<span>").text(new Array(level).join(' '))));
      if (objectIndex) {
        _el.append($("<span>").text('"').addClass("invisible"), $("<span>").addClass("key").text(objectIndex), $("<span>").text('"').addClass("invisible"), $("<span>").text(': '));
      }

      if (json && json._map_type !== undefined) {
        _el.addClass(json._map_type);

        if (_.isArray(json._map_data)) {
          _el.append($("<span>").text("["));
          var _last_key = json._map_data.length - 1;
          for (var i in json._map_data) {
            printObject(json._map_data[i], level + 1, _el, i != _last_key);
          }
          _el.append($("<p>").text(new Array(level).join(' ') + "]" + (comma ? "," : "")));
        } else if (_.isObject(json._map_data)) {
          _el.append($("<span>").text("{"));
          var _last_key = Object.keys(json._map_data).pop();
          for (var i in json._map_data) {
            printObject(json._map_data[i], level + 1, _el, i != _last_key, i);
          }
          _el.append($("<p>").text(new Array(level).join(' ') + "}" + (comma ? "," : "")));
        } else {

          if (_.isNull(json._map_data)) {
            _el.append($("<span>").text(JSON.stringify(json._map_data, null, 2)));
          } else if (json._map_data.constructor === String) {
            _el.append($("<span>").text('"'), $("<span>").addClass('string').text(json._map_data), $("<span>").text('"'));
          } else if (json._map_data.constructor === Number || json._map_data.constructor === Boolean) {
            _el.append($("<span>").addClass('number').text(json._map_data));
          } else {
            _el.append($("<span>").text(JSON.stringify(json._map_data, null, 2)));
          }
          if (comma) {
            _el.append($("<span>").text(","));
          }
        }
      } else {
        _el.append($("<span>").text(JSON.stringify(json, null, 2)));

        if (comma) {
          _el.append($("<span>").text(","));
        }
      }

      output.append(_el);
    }
    printObject(json, 1, output);
    return output;
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  map: function map(data, foo) {

    if (data.constructor == Array) {
      return Promise.all(data.map(foo)).then(function (results, error) {
        if (error) {
          return Promise.reject(error);
        }
        return Promise.resolve(results);
      });
    }

    var keys = Object.keys(data);
    var urls = Object.values(data);
    return Promise.all(urls.map(foo)).then(function (results, error) {
      if (error) {
        return Promise.reject(error);
      }
      var _map = {};

      for (var i = 0; i < results.length; i++) {
        _map[keys[i]] = results[i];
      }
      return Promise.resolve(_map);
    });
  },
  wrap: function wrap(context) {
    return function wrap(foo) {
      return function () {
        var options = Array.prototype.slice.call(arguments, 1);
        if (!foo.length) {
          return new Promise(function (resolve, fail) {
            var _result = foo.call(context);
            _result || _result === undefined ? resolve() : fail();
          });
        } else {
          return new Promise(foo.bind(context));
        }
      };
    };
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

if (!String.prototype.splice) {
  /**
   * {JSDoc}
   *
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   * @return {string} A new string with the spliced substring.
   */
  String.prototype.splice = function (start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

fabric.util.string.toDashed = function (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

fabric.util.string.uncapitalize = function (string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.util.object, __webpack_require__(3));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.util, {
  idCounter: 1,
  createObject: function createObject(type, options, callback) {
    if (typeof type !== "string") {
      callback = options;
      options = type;
      type = null;
    } else {
      options.type = type;
    }
    var app = options.application;
    app && app.fire("entity:load", { options: options });

    var _klassName = fabric.util.string.camelize(fabric.util.string.capitalize(type || options.type || app.prototypes.Object.type, true));
    var _klass = options.application.klasses[_klassName] || fabric[_klassName];

    if (!_klass) {
      console.warn(_klassName + " is undefined");

      var _text = options.text && options.text.constructor == String ? options.text : _klassName;
      delete options.text;
      return callback(new fabric.Text(_text, options));
    }

    var el = _klass.fromObject(options, function (el) {
      callback && callback(el);
      callback = null;
    });
    if (el) {
      callback && callback(el);
      callback = null;
    }
    return el;
  },
  getProportions: function getProportions(photo, container, mode) {
    mode = mode || 'fit';
    var _w = photo.naturalWidth || photo.width;
    var _h = photo.naturalHeight || photo.height;
    if (!container.height && !container.width) {
      return {
        scale: 1,
        width: _w,
        height: _h
      };
    }
    if (!photo.height && !photo.width) {
      return {
        scale: 0.001,
        width: container.width,
        height: container.height
      };
    }

    // var _asp = _w / _h, _c_asp = container.width / container.height;

    // if (_asp > _c_asp) {
    //   _h = container.height;
    //   _w = _h * _asp;
    //
    // } else {
    //   _w = container.width;
    //   _h = _w / _asp;
    // }
    // var scaleX = container.width / _w;
    // var scaleY = container.height / _h;
    var scaleX = container.width && container.width / _w || 999;
    var scaleY = container.height && container.height / _h || 999;

    var scale;
    if (mode === 'cover') {
      scale = Math.max(scaleX, scaleY);
    }
    if (mode === 'fit') {
      scale = Math.min(scaleX, scaleY);
    }
    if (mode === 'center') {
      scale = 1;
    }
    return {
      scale: scale,
      width: Math.floor(_w * scale),
      height: Math.floor(_h * scale)
    };
  },

  createCanvasElementWithSize: function createCanvasElementWithSize(size) {
    var canvas = fabric.util.createCanvasElement();
    canvas.width = size.width;
    canvas.height = size.height;
    return canvas;
  },

  getRect: function getRect(width, height, options) {
    var rect = {};

    var _flexArray = fabric.util.flex(width, [{ value: options.left, flex: 0 }, { value: options.width, flex: 1 }, { value: options.right, flex: 0 }]);
    rect.left = _flexArray[0];
    rect.width = _flexArray[1];
    rect.right = _flexArray[2];

    var _flexArray = fabric.util.flex(height, [{ value: options.top, flex: 0 }, { value: options.height, flex: 1 }, { value: options.bottom, flex: 0 }]);
    rect.top = _flexArray[0];
    rect.height = _flexArray[1];
    rect.bottom = _flexArray[2];

    return rect;
  },
  /**
   * will divide total width for every object in columnts array
   *
   *
   * @example
   *     var _flexArray = fabric.util.flex(200 , [{flex: 0},{value: 100, flex: 1},{flex: 0}] );
   * @param total
   * @param columns
   * @returns {Array}
   * @example [50,100,50]
   */
  flex: function flex(total, columns) {
    var _return = [];
    var split = 0;
    columns.forEach(function (column, index) {
      if (column.value === undefined) {
        split++;
      } else {
        total -= column.value;
      }
    });
    var _w = total / split;
    columns.forEach(function (column) {
      _return.push(column.value === undefined ? _w : column.value);
    });
    return _return;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/**
 * @private
 * @param {String} eventName
 * @param {Function} handler
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _removeEventListener(eventName, handler) {
  if (!this.__eventListeners[eventName]) {
    return;
  }
  var eventListener = this.__eventListeners[eventName];
  if (handler) {
    eventListener.splice(eventListener.indexOf(handler), 1);
  } else {
    eventListener.length = 0;
  }
}

fabric.Observable.stopObserving = function stopObserving(eventName, handler) {
  if (!this.__eventListeners) {
    return;
  }

  // remove all key/value pairs (event name -> event handler)
  if (arguments.length === 0) {
    for (eventName in this.__eventListeners) {
      _removeEventListener.call(this, eventName);
    }
  }
  // one object with key/value pairs was passed
  else if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
      for (var prop in eventName) {
        _removeEventListener.call(this, prop, eventName[prop]);
      }
    } else {
      _removeEventListener.call(this, eventName, handler);
    }
  return this;
};

fabric.Observable.on = function (eventName, handler, priority) {
  if (eventName.constructor == Object) {
    for (var i in eventName) {
      this.on(i, eventName[i], priority);
    }
    return this;
  }
  var events = eventName.split(" ");
  for (var i in events) {
    eventName = events[i];
    this.observe(eventName, handler);
    if (priority) {
      this.__eventListeners[eventName].unshift(this.__eventListeners[eventName].pop());
    }
  }
  return this;
};

fabric.Observable.off = function (eventName, handler) {
  var events = eventName.split(" ");
  for (var i in events) {
    this.stopObserving(events[i], handler);
  }
  return this;
};

fabric.Observable.fire = function fire(eventName, options) {
  if (!this.__eventListeners) {
    return;
  }

  var listenersForEvent = this.__eventListeners[eventName];
  if (listenersForEvent) {
    for (var i = 0, len = listenersForEvent.length; i < len; i++) {
      listenersForEvent[i].call(this, options || {});
    }
  }

  var listenersForEventAll = this.__eventListeners['*'];
  if (listenersForEventAll) {
    options = options || {};
    options.eventName = eventName;
    options.listeners = listenersForEvent;
    for (i = 0, len = listenersForEventAll.length; i < len; i++) {
      listenersForEventAll[i].call(this, options);
    }
  }

  return this;
};

fabric.util.object.extend(fabric.Object.prototype, fabric.Observable);
fabric.util.object.extend(fabric.IText.prototype, fabric.Observable);
fabric.util.object.extend(fabric.Textbox.prototype, fabric.Observable);
fabric.util.object.extend(fabric.Image.prototype, fabric.Observable);
fabric.util.object.extend(fabric.Canvas.prototype, fabric.Observable);
fabric.util.object.extend(fabric, fabric.Observable);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

fabric.Object._fromObject = function (className, object, callback, forceAsync, extraParam) {
  var klass = fabric[className];
  var _app = object.application;
  delete object.application;
  object = fabric.util.object.clone(object, true);
  object.application = _app;
  if (forceAsync) {
    fabric.util.enlivenPatterns([object.fill, object.stroke], function (patterns) {
      if (typeof patterns[0] !== 'undefined') {
        object.fill = patterns[0];
      }
      if (typeof patterns[1] !== 'undefined') {
        object.stroke = patterns[1];
      }
      var instance = extraParam ? new klass(object[extraParam], object) : new klass(object);
      callback && callback(instance);
    });
  } else {
    var instance = extraParam ? new klass(object[extraParam], object) : new klass(object);
    callback && callback(instance);
    return instance;
  }
};

fabric.INCLUDE_ALL = "*";

fabric.util.object.extend(fabric.Object.prototype, {
  storeProperties: ["type"],
  eventListeners: {},
  optionsOrder: ["*"],
  setEventListeners: function setEventListeners(val) {
    this.on(val);
  },
  set: function set(key, value) {
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
      this._setObject(key, value);
    } else {
      if (key[0] === "&") {
        key = key.substr(1);
        this._set(key, value(this.get(key)));
      } else {
        this._set(key, value);
      }
    }
    return this;
  },
  _setObject: function _setObject(options, callback) {
    var _this = this;

    var keys = Object.keys(options);

    if (this.optionsOrder) {
      var middleIndex = this.optionsOrder.indexOf("*") || -1;
      var i = middleIndex,
          prop = void 0,
          keyIndex = void 0;

      while (prop = this.optionsOrder[--i]) {
        if ((keyIndex = keys.indexOf(prop)) !== -1) {
          keys.splice(keyIndex, 1);
          keys.unshift(prop);
        }
      }
      i = middleIndex;
      while (prop = this.optionsOrder[++i]) {
        if ((keyIndex = keys.indexOf(prop)) !== -1) {
          keys.splice(keyIndex, 1);
          keys.push(prop);
        }
      }
    }

    var queue = void 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var _key = _step.value;

        if (options[_key] === undefined) return 'continue';

        var _fooName = "set" + fabric.util.string.capitalize(_key, true);
        if (_this[_fooName] && _this[_fooName].name && _this[_fooName].name !== "anonymous") {
          if (_this[_fooName].length === 2) {
            if (!queue) {
              queue = fabric.util.queueLoad(["__initiated", _key], callback);
            } else {
              queue.elements.push(_key);
            }
            _this[_fooName](options[_key], function () {
              queue(_key);
            });
          } else {
            _this[_fooName](options[_key]);
          }
        } else {
          _this.__set(_key, options[_key]);
        }
      };

      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_ret === 'continue') continue;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (queue) {
      queue("__initiated");
    } else if (callback) {
      callback();
    }
  },

  __set: fabric.Object.prototype._set,
  _set: function _set(key, value, callback) {
    var _fooName = "set" + fabric.util.string.capitalize(key, true);
    if (this[_fooName] && this[_fooName].name && this[_fooName].name !== "anonymous") {
      this[_fooName](value, callback);
    } else {
      this.__set(key, value);
    }
    return this;
  },
  setAngle: function setAngle(angle) {
    this.angle = angle;
  },
  setShadow: function setShadow(options) {
    return this.shadow = options ? new fabric.Shadow(options) : null;
  },
  disable: function disable() {
    this.set({
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true
    });
  },

  stored: true,
  store_left: function store_left() {
    return fabric.util.toFixed(this.left, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_top: function store_top() {
    return fabric.util.toFixed(this.top, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_width: function store_width() {
    return fabric.util.toFixed(this.width, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_height: function store_height() {
    return fabric.util.toFixed(this.height, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_fill: function store_fill() {
    return this.fill && this.fill.toObject ? this.fill.toObject() : this.fill;
  },
  store_stroke: function store_stroke() {
    return this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke;
  },
  store_strokeWidth: function store_strokeWidth() {
    return fabric.util.toFixed(this.strokeWidth, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_strokeDashArray: function store_strokeDashArray() {
    return this.strokeDashArray ? this.strokeDashArray.concat() : this.strokeDashArray;
  },
  store_strokeMiterLimit: function store_strokeMiterLimit() {
    return fabric.util.toFixed(this.strokeMiterLimit, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_scaleX: function store_scaleX() {
    return fabric.util.toFixed(this.scaleX, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_scaleY: function store_scaleY() {
    return fabric.util.toFixed(this.scaleY, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_angle: function store_angle() {
    return fabric.util.toFixed(this.getAngle(), fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_opacity: function store_opacity() {
    return fabric.util.toFixed(this.opacity, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_shadow: function store_shadow() {
    return this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow;
  },
  store_clipTo: function store_clipTo() {
    return this.clipTo && (this.clipTo.id && '#' + this.clipTo.id || this.clipTo) || null;
  },
  store_transformMatrix: function store_transformMatrix() {
    return this.transformMatrix ? this.transformMatrix.concat() : null;
  },
  store_skewX: function store_skewX() {
    return fabric.util.toFixed(this.skewX, fabric.Object.NUM_FRACTION_DIGITS);
  },
  store_skewY: function store_skewY() {
    return fabric.util.toFixed(this.skewY, fabric.Object.NUM_FRACTION_DIGITS);
  },
  toObject: function toObject(propertiesToInclude) {
    propertiesToInclude = (propertiesToInclude || []).concat(this.storeProperties).concat(this.stateProperties);
    var object = this.getProperties(propertiesToInclude);
    if (!this.includeDefaultValues) {
      object = this._removeDefaultValues(object, this.type);
    }
    this.fire("before:object", { object: object });
    return object;
  },

  /**
   * Sets object's properties from options
   * @param {Object} [options] Options object
   */
  setOptions: function setOptions(options) {
    this._setObject(options);
    // this._initGradient(options);
    // this._initPattern(options);
    // this._initClipping(options);
  },
  _initEntity: function _initEntity(options) {
    if (options.canvas && !options.application) {
      options.application = options.canvas.application;
    }
    options.application && options.application.fire("entity:created", { target: this, options: options });
  },
  initialize: function initialize(options, callback) {
    options = options || {};
    this._initEntity(options);
    // if(options.wholeCoordinates){
    //   let coordinates = ["left","top","width","height"];
    //   for(let i in coordinates){
    //     if(options[coordinates[i]]){
    //       options[coordinates[i]] = Math.round(options[coordinates[i]]);
    //     }
    //   }
    // }
    var _self = this;
    this._setObject(options, function () {
      _self.loaded = true;
      _self.fire("loaded");
      callback && callback(_self);
    });
  },
  add: function add(canvas) {
    canvas.add(this);
  },

  hasBoundsControls: true,
  stroke: "transparent",
  stepRotating: function stepRotating() {
    var b = this.getAngle(),
        a = 45 * parseInt(b / 45);
    5 > b - a ? this.setAngle(a) : 40 < b - a && this.setAngle(a + 45);
  },
  onTop: function onTop() {
    return this.canvas._objects.indexOf(this) === this.canvas._objects.length - 1;
  },
  onBottom: function onBottom() {
    return this.canvas._objects.indexOf(this) === 0;
  },
  flop: function flop() {
    this.flipY = !this.flipY;
    this.canvas.renderAll();
  },
  flip: function flip() {
    this.flipX = !this.flipX;
    this.canvas.renderAll();
  },
  duplicate: function duplicate() {
    var _object = this.toObject();
    _object.active = true;
    _object.left += 10;
    _object.top += 10;
    var _clone = /*this.cloneSync && this.cloneSync() || */this.canvas.createObject(_object);
    return _clone;
  },

  _normalizeAngle: function _normalizeAngle() {
    if (this.angle < 0) {
      this.angle += 360;
    } else if (this.angle > 360) {
      this.angle %= 360;
    }
  },
  minStrokeWidth: 0,
  maxStrokeWidth: function maxStrokeWidth() {
    return Math.min(this.width, this.height) / 2;
  },

  movementDelta: 1,
  moveUp: function moveUp() {
    this.top -= this.movementDelta;
    this.canvas.renderAll();
  },
  moveDown: function moveDown() {
    this.top += this.movementDelta;
    this.canvas.renderAll();
  },
  moveLeft: function moveLeft() {
    this.left -= this.movementDelta;
    this.canvas.renderAll();
  },
  moveRight: function moveRight() {
    this.left += this.movementDelta;
    this.canvas.renderAll();
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(21);

fabric.util.object.extend(fabric.Image.prototype, fabric.ImageMixin, {
  filters: null,
  resizeFilters: null,
  originalSrc: null,
  storeProperties: fabric.Object.prototype.storeProperties.concat(["filters", "resizeFilters", "originalSrc", "src", "contentOffsets"]),
  store_originalSrc: function store_originalSrc() {
    return this._edited ? this._original_src || this._originalElement.src || this._element.src : null;
  },
  store_src: function store_src() {
    var src = void 0;
    if (this._edited) {
      src = this._element.src;
    } else {
      src = this._original_src || this._originalElement.src || this._element.src;
    }
    if (src.indexOf(fabric.util.mediaRoot) === 0) {
      src = src.replace(fabric.util.mediaRoot, "");
    }
    return src;
  },
  store_filters: function store_filters() {
    var filters = [];
    var scaleX = 1,
        scaleY = 1;
    this.filters.forEach(function (filterObj) {
      if (filterObj) {
        if (filterObj.type === 'Resize') {
          scaleX *= filterObj.scaleX;
          scaleY *= filterObj.scaleY;
        }
        filters.push(filterObj.toObject());
      }
    });
    return filters.length && filters || null;
  },
  store_resizeFilters: function store_resizeFilters() {
    var resizeFilters = [];
    this.resizeFilters.forEach(function (filterObj) {
      filterObj && resizeFilters.push(filterObj.toObject());
    });
    return resizeFilters.length && resizeFilters || null;
  },
  setSrc: function setSrc(opt) {
    // console.log(opt);
  },
  toObject: fabric.Object.prototype.toObject,
  //   var obj = this._toObjectNative.call(this, toInclude);
  //
  //
  //   // if (this.contentOffsets) {
  //   //   obj.contentOffsets = this.contentOffsets;
  //   // }
  //   // //
  //   // if (!this.includeDefaultValues) {
  //   //   if (!obj.filters.length) delete obj.filters;
  //   //   if (!obj.resizeFilters.length) delete obj.resizeFilters;
  //   // }
  //   //if(this._originalElement){
  //   //    obj.thumb = this._element.src;
  //   //}
  //
  //   this._beforeObject(obj,toInclude);
  //   return obj;
  // },
  async: true,
  initialize: function initialize(element, options, callback) {
    options || (options = {});
    this.filters = [];
    this.resizeFilters = [];

    if (options.originalSrc) {
      this._edited = true;
      fabric.util.loadImage(options.originalSrc, function (img) {
        this._originalElement = img;
      }.bind(this));
    }

    this._initElement(element, options, callback && function () {
      fabric.Object.prototype.initialize.call(this, options, callback);
    }.bind(this)); //adding callback
  },

  _initElement: function _initElement(element, options, callback) {
    this.setElement(fabric.util.getById(element), callback, options);
    fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS);
  },
  /**
   * Sets crossOrigin value (on an instance and corresponding image element)
   * @return {fabric.Image} thisArg
   * @chainable
   */
  setCrossOrigin: function setCrossOrigin(value) {
    this.crossOrigin = value;
    if (this._element) {
      this._element.crossOrigin = value;
    }
    return this;
  },
  setElement: function setElement(element, callback, options) {

    var _callback, _this;

    this._element = element;
    this._originalElement = element;
    this._initConfig(options);
    // this.setOptions(options );
    // this._setWidthHeight(this);
    // if (this._element && this.crossOrigin) {
    //   this._element.crossOrigin = this.crossOrigin;
    // }


    if (this.resizeFilters.length === 0) {
      _callback = callback;
    } else {
      _this = this;
      _callback = function _callback() {
        _this.applyFilters(callback, _this.resizeFilters, _this._filteredEl || _this._originalElement, true);
      };
    }

    if (this.filters.length !== 0) {
      this.applyFilters(_callback);
    } else if (_callback) {
      _callback(this);
    }
    if (this.canvas) {
      this.canvas.renderAll();
    }
    return this;
  },
  cloneSync: function cloneSync() {
    return new fabric.Image(this._element, this);
  }
});

fabric.util.initFilters = function (img, object, callback) {

  // if (fabric.version >= 1.6) {


  for (var i in object.filters) {
    object.filters[i].type = fabric.util.string.capitalize(fabric.util.string.camelize(object.filters[i].type), true);
  }

  fabric.Image.prototype._initFilters.call(object, object.filters, function (filters) {
    object.filters = filters || [];
    fabric.Image.prototype._initFilters.call(object, object.resizeFilters, function (resizeFilters) {
      object.resizeFilters = resizeFilters || [];
      callback(img, object);
    });
  });
  // } else {
  //   fabric.Image.prototype._initFilters.call(object, object, function (filters) {
  //     object.filters = filters || [];
  //     callback(img, object);
  //   });
  // }
};

fabric.util.initImageAndFilters = function (object, callback) {
  if (object.image) {
    var img = object.image;
    delete object.src;
    delete object.image;
    fabric.util.initFilters(img, object, callback);
  } else if (object.src) {
    fabric.util.loadImage(object.src, function (img) {
      //delete object.src;
      fabric.util.initFilters(img, object, callback);
    }, null, object.crossOrigin);
  } else {
    fabric.util.initFilters(null, object, callback);
  }
};

fabric.Image.fromObject = function (object, callback) {
  fabric.util.initImageAndFilters(object, function (img, object) {
    new fabric.Image(img, object, callback);
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.ImageMixin = {
  setElementFromMenu: function setElementFromMenu(data) {
    this.setElement(data.image);
  },
  initProportinalSize: true,
  /**
   * @private
   * @param {Object} [options] Object with width/height properties
   */
  _setWidthHeight: function _setWidthHeight(options) {
    if (this.element || this._element) {
      var _size = this.getOriginalSize();
    } else {
      _size = {};
    }
    if ('width' in options) {
      this.width = options.width;
    } else {
      if (!_size.width) {
        this.width = 100;
      } else {
        if (this.initProportinalSize && 'height' in options) {
          this.width = options.height / _size.height * _size.width;
        } else {
          this.width = _size.width;
        }
      }
    }

    if ('height' in options) {
      this.height = options.height;
    } else {
      if (!_size.height) {
        this.height = 100;
      } else {
        if (this.initProportinalSize && 'width' in options) {
          this.height = options.width / _size.width * _size.height;
        } else {
          this.height = _size.height;
        }
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var _set_dimensions_overwritten = fabric.Canvas.prototype.setDimensions;

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  optionsOrder: [],
  __set: fabric.Object.prototype.__set,
  _set: fabric.Object.prototype._set,
  _setObject: fabric.Object.prototype._setObject,
  get: fabric.Object.prototype.get,
  set: fabric.Object.prototype.set
});

fabric.util.object.extend(fabric.Object.prototype, {
  layer: "objects"
});
fabric.util.object.extend(fabric.Canvas.prototype, {
  //  optionsOrder: ["*"],
  originalState: {},
  stateProperties: [],
  editingObject: null,
  /**
   * Select object which is over the selected one
   */
  frontObjectsSelectionPriority: false,
  /**
   * Method that determines what object we are clicking on
   * the skipGroup parameter is for internal use, is needed for shift+click action
   * @param {Event} e mouse event
   * @param {Boolean} skipGroup when true, activeGroup is skipped and only objects are traversed through
   */
  findTarget: function findTarget(e, skipGroup) {
    if (this.skipTargetFind) {
      return;
    }
    var ignoreZoom = true,
        pointer = this.getPointer(e, ignoreZoom),
        activeGroup = this.getActiveGroup(),
        activeObject = this.getActiveObject(),
        activeTarget,
        activeTargetSubs;
    // first check current group (if one exists)
    // active group does not check sub targets like normal groups.
    // if active group just exits.
    this.targets = [];
    if (activeGroup && !skipGroup && activeGroup === this._searchPossibleTargets([activeGroup], pointer)) {
      this._fireOverOutEvents(activeGroup, e);
      return activeGroup;
    }
    // if we hit the corner of an activeObject, let's return that.
    if (activeObject && activeObject._findTargetCorner(pointer)) {
      this._fireOverOutEvents(activeObject, e);
      return activeObject;
    }

    if (!this.frontObjectsSelectionPriority && activeObject && activeObject === this._searchPossibleTargets([activeObject], pointer)) {
      if (!this.preserveObjectStacking) {
        this._fireOverOutEvents(activeObject, e);
        return activeObject;
      } else {
        activeTarget = activeObject;
        activeTargetSubs = this.targets;
        this.targets = [];
      }
    }

    var target = this._searchPossibleTargets(this._objects, pointer);
    if (e[this.altSelectionKey] && target && activeTarget && target !== activeTarget) {
      target = activeTarget;
      this.targets = activeTargetSubs;
    }
    this._fireOverOutEvents(target, e);
    return target;
  },
  setDimensions: function setDimensions(dimensions, options) {
    _set_dimensions_overwritten.call(this, dimensions, options);

    if (this.backgroundImage && this.backgroundImage.constructor !== String) {
      this._update_background_overlay_image("background");
    }
    if (this.overlayImage && this.overlayImage.constructor !== String) {
      this._update_background_overlay_image("overlay");
    }
    //this._update_clip_rect();
    this.fire("dimensions:modified");
    this.renderAll();
  }
});

var ExtCanvasMixin = {
  objects: null,
  // defaultOptions: {},
  animated: false,
  fitIndex: 0.8,
  originalWidth: 0,
  originalHeight: 0,
  /**
   * required to show video
   */
  setAnimated: function setAnimated(val) {
    if (!val) {
      return;
    }

    fabric.util.requestAnimFrame(function render() {
      this.renderAll();
      fabric.util.requestAnimFrame(render);
    }.bind(this));
  },

  /**
   * Divides objects in two groups, one to render immediately
   * and one to render as activeGroup.
   * return objects to render immediately and pushes the other in the activeGroup.
   */
  _chooseObjectsToRender: function _chooseObjectsToRender(layer) {
    if (this.interactive) {
      var activeGroup = this.getActiveGroup(),
          activeObject = this.getActiveObject();
    }
    var object,
        objsToRender = [],
        activeGroupObjects = [];

    if (activeGroup && !this.preserveObjectStacking) {
      for (var i = 0, length = this._objects.length; i < length; i++) {
        object = this._objects[i];
        if (layer && object.layer !== layer) continue;
        if (!activeGroup.contains(object)) {
          if (!object.hiddenActive) {
            objsToRender.push(object);
          }
        } else {
          activeGroupObjects.push(object);
        }
      }
      if (activeGroup) {
        // activeGroup._set('_objects', activeGroupObjects);
        objsToRender.push(activeGroup);
      }
      activeObject && objsToRender.push(activeObject);
      // activeGroup._set('_objects', activeGroupObjects);
    } else {
      if (layer) {
        for (var i = 0, length = this._objects.length; i < length; i++) {
          object = this._objects[i];
          if (layer && object.layer !== layer) continue;
          objsToRender.push(object);
        }
      } else {
        objsToRender = this._objects;
      }
    }
    return objsToRender;
  },

  setEventListeners: function setEventListeners(val) {
    this.on(val);
  },
  find: function find(options) {
    if (typeof options === "string") {
      options = {
        type: options
      };
    }
    return fabric.util.object.where(this._objects, options);
  },
  _update_background_overlay_image: function _update_background_overlay_image(property) {

    var position = this[property + "Position"];
    var photo = this[property + "Image"];
    if (!photo || photo.constructor === Object || photo.constructor === String) return;

    if (position === 'resize') {
      this.originalWidth = photo.width;
      this.originalHeight = photo.height;
    } else if (position !== 'manual') {

      var _w = this.originalWidth || this.width,
          _h = this.originalHeight || this.height;

      if (position === 'fit' || !photo._originalElement) {

        size = {
          width: _w,
          height: _h
        };
      } else {
        var size = fabric.util.getProportions(photo._originalElement, {
          width: _w,
          height: _h
        }, position);
      }

      var _l;
      if (photo.originX === 'center') {
        _l = _w / 2;
      } else {
        _l = (_w - size.width) / 2;
      }
      var _t;
      if (photo.originY === 'center') {
        _t = _h / 2;
      } else {
        _t = (_h - size.height) / 2;
      }

      var _z = this.viewportTransform[0];
      photo.set({
        left: _l, //(_l /*+ this.viewportTransform[4]*/)*_z,
        top: _t, // /*+ this.viewportTransform[5]*/)*_z,
        width: size.width, //*_z,
        height: size.height, //*_z,
        scaleX: 1,
        scaleY: 1
      });
    } else {
      // var _orig = photo.getOriginalSize();
      // photo.set({
      //   originX: 'left',
      //   originY: 'top',
      //   left: 0, //this.viewportTransform[4],
      //   top: 0, //this.viewportTransform[5],
      //   width: _orig.width,
      //   height: _orig.height
      // });
    }
  },
  _setBackgroundOverlayImage: function _setBackgroundOverlayImage(fabricImage, type) {
    var property = type + "Image";
    var positionProperty = type + "Position";

    if (this.loaded) {
      var originalState = {};
      originalState[property] = this[property];
    }

    this[property] = fabricImage;
    this[property].canvas = this;
    this._update_background_overlay_image(type);
    if (this[positionProperty] === "resize") {
      this.originalWidth = fabricImage.width;
      this.originalHeight = fabricImage.height;
    }

    if (this.loaded) {
      var modifiedState = {};
      modifiedState[property] = this[property];
      this.fire('modified', { states: {
          original: originalState,
          modified: modifiedState
        } });
    }

    this.fire("background-image:loaded", { target: fabricImage });
  },
  setBackgroundOverlayImage: function setBackgroundOverlayImage(bg, type, callback) {
    var _this = this;

    var property = type + "Image";
    var prototype = this.application.prototypes && this.application.prototypes[fabric.util.string.capitalize(property)];

    if (!bg) {
      this[property] = null;
      callback && callback();
      return;
    }
    if (bg instanceof HTMLImageElement || bg instanceof Image) {
      var el = new fabric.Image(bg, {
        width: bg.naturalWidth,
        height: bg.naturalHeight
      });

      this._setBackgroundOverlayImage(el, type);
      callback && callback();
      return;
    }
    if (bg.constructor == String) {
      bg = {
        src: bg
      };
    }

    prototype && fabric.util.object.extend(bg, prototype);
    bg.application = this.application;
    bg.disableDefaultProperties = true;
    bg.type = bg.type || "image";

    fabric.util.createObject(bg, function (el) {
      _this._setBackgroundOverlayImage(el, type);
      callback && callback();
    });
  },
  setOverlayImage: function setOverlayImage(bg, callback) {
    this.setBackgroundOverlayImage(bg, "overlay", callback);
  },
  setBackgroundImage: function setBackgroundImage(bg, callback) {
    this.setBackgroundOverlayImage(bg, "background", callback);
  },
  createObjects: function createObjects(objects, callback) {

    if (this.application) {
      for (var i in objects) {
        if (objects[i].constructor == String) {
          objects[i] = this.application.objects[objects[i]];
        }
      }
    }

    var _canvas = this;

    function success(_objects) {
      _canvas.fire("progress:complete", { objects: objects });
      for (var i in _objects) {
        _canvas.add(_objects[i]);
      }
      _canvas.renderAll();
      callback && callback.call(_canvas);
    }

    function progress(l, t) {
      _canvas.fire("progress", { loaded: l, total: t });
      if (fabric.util.loaderDebug) {
        console.log("loaded " + l + " / " + t);
      }
    }

    var _objects = [];
    if (!objects || !objects.length) {
      success(_objects);
      return;
    }

    if (objects[0].constructor.name === "klass") {
      success(objects);
      return;
    }

    var queueLoadCallback = fabric.util.queueLoad(objects.length, function () {
      success(fabric.util.object.pluck(_objects, "object"));
    }, progress);

    queueLoadCallback.data = (this.title || "") + "objects";

    for (var i in objects) {
      (function (options) {
        var _object_slot = { object: null, options: options };
        _objects.push(_object_slot);

        options.application = _canvas.application;
        fabric.util.createObject(options, function (el) {
          _object_slot.object = el;
          queueLoadCallback();
        });
      }).call(this, objects[i]);
    }
  },
  /**
   * apply options for group of filtered objects
   * @param filter
   * @param options
   */
  applyOptions: function applyOptions(filter, options) {
    this._objects.forEach(function (_obj) {
      for (var prop in filter) {
        if (_obj[prop] !== filter[prop]) return;
      }
      _obj.setOptions(options);
    });
  },

  /*
  remove: function () {
    var _objects = this.getObjects(),
      index;
    var objects;
    for (var i = 0, length = arguments.length; i < length; i++) {
      if (arguments[i].layer) {
        objects = arguments[i].layer;
      } else {
        objects = _objects;
      }
       index = objects.indexOf(arguments[i]);
      // only call onObjectRemoved if an object was actually removed
      if (index !== -1) {
        objects.splice(index, 1);
        this._onObjectRemoved(arguments[i]);
      }
    }
     this.renderOnAddRemove && this.renderAll();
    return this;
  },*/
  /**
   * Create Object by type and options
   * @param type
   * @param options
   * @param callback
   */
  createObject: function createObject(type, options, callback) {
    if (typeof type !== "string") {
      callback = options;
      options = fabric.util.object.clone(type);
      type = null;
    } else {
      options = fabric.util.object.clone(options);
      options.type = type;
    }

    var _self = this;

    options = fabric.util.object.extend({}, this.application.getDefaultProperties(options.type), options);

    options.application = this.application;
    // var _active = options.active;
    // var _position = options.position;
    //    delete options.active;
    //  delete options.position;


    function _add(el) {
      if (el.canvas) return;
      // el.application = _self.application;
      _self.add(el);
      /*
            if(_active){
            if(_active){
              _self.setActiveObject(el);
            }*/
      callback && callback(el);
    }

    var el = fabric.util.createObject(options, _add);
    el && _add(el);
    return el;
  },
  onLoad: function onLoad(callback) {
    var _this2 = this;

    this.processing = false;
    this.loaded = true;
    this.interactive = true;
    this.renderAll();
    setTimeout(function () {
      _this2.fire("loading:end", { type: "slide", target: _this2 });
      _this2.application.fire("slide:loading:end", { target: _this2, type: "slide" });
      callback && callback.call(_this2);
    });
  },
  load: function load(options, callback) {
    if (!options) return;
    this.application._populateWithDefaultProperties(this, options);
    if (options.width) {
      options.originalWidth = options.width;
      options.originalHeight = options.height;
    }

    this.processing = true;
    this.interactive = false;

    this.clear();
    this.fire("loading:begin", { type: "slide", options: options });
    this.application.fire("slide:loading:begin", { target: this, type: "slide", options: options });

    this.set(options, this.onLoad.bind(this, callback));
  },
  setObjects: function setObjects(objects, callback) {

    this._objects.length = 0;
    if (this._hasITextHandlers) {
      this.off('mouse:up', this._mouseUpITextHandler);
      this._iTextInstances = null;
      this._hasITextHandlers = false;
    }
    if (this.interactive) {
      this.discardActiveGroup();
      this.discardActiveObject();
      this.clearContext(this.contextTop);
    }

    this.createObjects(objects, function () {
      for (var i in this._objects) {
        this._objects[i].setCoords();
      }
      callback();
    });
  },
  onResize: function onResize() {
    var _scale = Math.min(1, 800 / this.width);
    // this.setZoom(_scale);
    this.setDimensions({ width: this.width, height: this.height });
  },
  getCenter: function getCenter(el) {
    return {
      top: (this.originalHeight || this.getHeight()) / 2,
      left: (this.originalWidth || this.getWidth()) / 2
    };
  },
  setOriginalSize: function setOriginalSize(w, h) {
    this.originalWidth = h ? w : w.naturalWidth || w.width;
    this.originalHeight = h ? h : w.naturalHeight || w.height;
    return this;
  }
};

var _get_pointer_overwritten = fabric.Canvas.prototype.getPointer;
fabric.util.object.extend(fabric.StaticCanvas.prototype, ExtCanvasMixin, {
  type: "canvas",
  cacheProperties: [],
  optionsOrder: function () {
    var oo = fabric.StaticCanvas.prototype.optionsOrder;
    oo.unshift("originalWidth", "originalHeight", "width", "height", "*");
    return oo;
  }(),
  _initEntity: function _initEntity(options) {
    options.application && options.application.fire("entity:created", { target: this, options: options });
  },
  _layers: ["background", "objects", "areas", "overlayImage", "overlay", "controls"],
  // _overlayObjects: [],
  layers: {
    background: {
      render: function render(canvas, ctx) {
        canvas._renderBackground(ctx);
      },
      svg: function svg(canvas, markup, reviver) {
        canvas._setSVGBgOverlayColor(markup, 'backgroundColor');
        canvas._setSVGBgOverlayImage(markup, 'backgroundImage', reviver);
      }
    },
    areas: {
      render: function render(canvas, ctx) {
        ctx.save();
        if (canvas.clipTo) {
          fabric.util.clipContext(canvas, ctx);
        }
        //apply viewport transform once for all rendering process
        ctx.transform.apply(ctx, canvas.viewportTransform);

        if (canvas._offsetsObject) {
          canvas._offsetsObject.render(ctx);
        }
        if (canvas._areasObjects) {
          canvas._renderObjects(ctx, canvas._areasObjects);
        }
        if (canvas._helpersObjects) {
          canvas._renderObjects(ctx, canvas._helpersObjects);
        }
        // canvas._renderObjects(ctx, canvas._chooseObjectsToRender("areas"));
        ctx.restore();
      },
      objects: function objects(canvas) {
        return canvas._areasObjects || canvas._offsetsObject && [canvas._offsetsObject] || [];
      }
    },
    objects: {
      render: function render(canvas, ctx) {
        ctx.save();
        if (canvas.clipTo) {
          fabric.util.clipContext(canvas, ctx);
        }
        //apply viewport transform once for all rendering process
        ctx.transform.apply(ctx, canvas.viewportTransform);
        canvas._renderObjects(ctx, canvas._chooseObjectsToRender("objects"));
        ctx.restore();
      },
      objects: function objects(canvas) {
        return canvas._objects;
      },
      svg: function svg(canvas, markup, reviver) {
        var objects = canvas._chooseObjectsToRender("objects");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var instance = _step.value;

            if (instance.excludeFromExport) continue;
            canvas._setSVGObject(markup, instance, reviver);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    },
    overlay: {
      render: function render(canvas, ctx) {
        ctx.save();
        if (canvas.clipTo) {
          fabric.util.clipContext(canvas, ctx);
        }
        //apply viewport transform once for all rendering process
        ctx.transform.apply(ctx, canvas.viewportTransform);
        canvas._renderObjects(ctx, canvas._chooseObjectsToRender("overlay"));
        ctx.restore();
      },
      svg: function svg(canvas, markup, reviver) {
        var objects = canvas._chooseObjectsToRender("overlay");
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var instance = _step2.value;

            if (instance.excludeFromExport) continue;
            canvas._setSVGObject(markup, instance, reviver);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      // objects: function(canvas){
      //   return canvas._overlayObjects;
      // }
    },
    controls: {
      render: function render(canvas, ctx) {
        // this.controlsAboveOverlay &&
        if (canvas.interactive) {
          canvas.drawControls(ctx);
        }
      }
    },
    overlayImage: {
      render: function render(canvas, ctx) {
        canvas._renderOverlay(ctx);
      },
      svg: function svg(canvas, markup, reviver) {
        canvas._setSVGBgOverlayColor(markup, 'overlayColor');
        canvas._setSVGBgOverlayImage(markup, 'overlayImage', reviver);
      }
    }
  },
  /**
   * Renders background, objects, overlay and controls.
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} objects to render
   * @return {fabric.Canvas} instance
   * @chainable
   */
  renderCanvas: function renderCanvas(ctx, objects) {
    //do not redraw while working on  something
    // if(this.processing)return false;
    // if (this.selection && !this._groupSelector && !this.isDrawingMode) {
    //   this.clearContext(this.contextTop);
    // }

    this.clearContext(ctx);

    this.fire('before:render');

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this._layers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var i = _step3.value;

        this.layers[i].render(this, ctx);
        // if(this._chooseObjectsToRender &&  i === "objects"){
        //   this._renderObjects(ctx, this._chooseObjectsToRender());
        // }else{
        //   this._renderObjects(ctx, this.layers[i].objects);
        // }
      }

      // this._renderBackgroundObjects(ctx);
      // this._renderObjects(ctx, objects);
      // this._renderOverlayObjects(ctx);
      // if (this.controlsAboveOverlay && this.interactive) {
      //   this.drawControls(ctx);
      // }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    this.fire('after:render');
  },
  _renderOverlayObjects: function _renderOverlayObjects() {},
  _renderBackgroundObjects: function _renderBackgroundObjects() {},
  /**
   * @private
   * @param {HTMLElement | String} el &lt;canvas> element to initialize instance on
   * @param {Object} [options] Options object
   */
  _initStatic: function _initStatic(el, options) {
    this._objects = [];
    this._helpersObjects = [];
    this._createLowerCanvas(el);
    this._initSize(options);
    this.set(options);
    this._setImageSmoothing();

    // only initialize retina scaling once
    if (!this.interactive) {
      this._initRetinaScaling();
    }
    this.calcOffset();
    this.backgroundRect = new fabric.Rect({
      width: this.width,
      height: this.height,
      background: "#fff",
      shadow: {
        color: 'rgba(0,0,0,0.3)'
      }
    });
  },
  _initSize: function _initSize() {
    this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0;
    this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0;

    if (!this.lowerCanvasEl.style) {
      return;
    }

    this.lowerCanvasEl.width = this.width;
    this.lowerCanvasEl.height = this.height;

    this.lowerCanvasEl.style.width = this.width + 'px';
    this.lowerCanvasEl.style.height = this.height + 'px';

    this.viewportTransform = this.viewportTransform.slice();
  },
  initialize: function initialize(el, options) {
    if (el && el.constructor == Object) {
      // callback = options;
      options = el;
      el = null;
    }
    options = options || {};

    if (options.application) {
      options.application.fire("entity:created", { target: this, options: options });
    }

    // options =  fabric.util.object.defaults(fabric.util.object.deepExtend(options || {}),this.defaultOptions);
    this._initEntity(options);
    this._initStatic(el, options);

    this.updateFonts();
  },
  updateFonts: function updateFonts(data) {
    var _this3 = this;

    fabric.on("fonts:loaded", function () {
      var els = _this3.find({ type: "text" });
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = els[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var el = _step4.value;

          el.dirty = true;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var els = _this3.find({ type: "textbox" });
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = els[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var el = _step5.value;

          el.dirty = true;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var els = _this3.find({ type: "i-text" });
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = els[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var el = _step6.value;

          el.dirty = true;
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      _this3.renderAll();
    });
  },
  setData: function setData(data) {

    if (data.role === "background") {
      this.setBackgroundImage(data, this.renderAll.bind(this));
    } else {

      var options = {
        position: data.left === undefined && data.top === undefined ? "center" : "manual",
        active: true
      };

      var id = this.activeArea && this.activeArea.id && "#" + this.activeArea.id;
      if (id) {
        options.movementLimits = id;
        options.clipTo = id;
      }

      this.createObject(fabric.util.object.deepExtend(options, data));
    }
  },
  setOriginalWidth: function setOriginalWidth(value) {
    this.originalWidth = value;
    if (!this.stretchable) {
      this.setWidth(value);
    }
  },
  setOriginalHeight: function setOriginalHeight(value) {
    this.originalHeight = value;
    if (!this.stretchable) {
      this.setHeight(value);
    }
  },
  setWidth: function setWidth(value) {
    return this.setDimensions({ width: value }, {});
  },
  setHeight: function setHeight(value) {
    return this.setDimensions({ height: value }, {});
  },

  /**
   * backgroundPosition
   * @values manual | cover | fit
   */
  backgroundPosition: 'manual',
  setBackgroundPosition: function setBackgroundPosition(src) {
    this.backgroundPosition = src;
    this._update_background_overlay_image("background");
    return this;
  },
  store_offsets: function store_offsets() {
    if (!this.offsets) return 0;
    if (this.offsets.left == this.offsets.right && this.offsets.right == this.offsets.top && this.offsets.top == this.offsets.bottom) {
      return this.offsets.left;
    } else {
      return this.offsets;
    }
  },
  offsets: 0,
  fillBackgroundColorOverCanvas: false,
  _renderBackgroundOrOverlay: function _renderBackgroundOrOverlay(ctx, property) {
    var object = this[property + 'Color'];

    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;

    var _rect = this.backgroundRect;
    if (property === "background" && _rect) {
      _rect.left = this.viewportTransform[4];
      _rect.top = this.viewportTransform[5];
      _rect.width = this.originalWidth * this.viewportTransform[0];
      _rect.height = this.originalHeight * this.viewportTransform[0];
      _rect.fill = object || "#ffffff";
      _rect.dirty = true;
      _rect.render(ctx);
    } else if (object) {

      ctx.fillStyle = object.toLive ? object.toLive(ctx) : object;

      if (!this.fillBackgroundColorOverCanvas) {
        //todo do!!!
        ctx.fillRect(object.offsetX || this.viewportTransform[4], // * this.viewportTransform[0],
        object.offsetY || this.viewportTransform[5], // * this.viewportTransform[0],
        _w * this.viewportTransform[0], _h * this.viewportTransform[0]);
      } else {
        ctx.fillRect(object.offsetX || 0, object.offsetY || 0, this.width, this.height);
      }
    }
    object = this[property + 'Image'];
    if (object && object.constructor !== String && object.constructor !== Object) {

      ctx.save();
      ctx.transform.apply(ctx, this.viewportTransform);

      object.render(ctx);

      ctx.restore();
    }
  },
  getImageData: function getImageData(options) {
    options = fabric.util.object.extend({
      clipped_area: false,
      clipped_area_only: false,
      draw_background: true,
      format: 'png',
      quality: 0.8
    }, options || {});

    var size;
    if (options.clipped_area) {
      size = options.clipped_area.getBoundingRect();
      var _zoom = this.getZoom();
      size.left /= _zoom;
      size.top /= _zoom;
      size.width /= _zoom;
      size.height /= _zoom;
      fabric.util.object.extend(options, size);
    } else {
      size = {
        width: options.width || this.originalWidth || this.width,
        height: options.height || this.originalHeight || this.height
      };

      if (options.clipped_area_only) {
        size.width -= this.offsets.left + this.offsets.right;
        size.height -= this.offsets.top + this.offsets.bottom;
      }
    }
    if (options.zoom) {
      size.width *= options.zoom;
      size.height *= options.zoom;
    }

    var canvas = fabric.util.createCanvasElement();
    canvas.width = size.width;
    canvas.height = size.height;

    options.left = Math.floor(options.left);
    options.top = Math.floor(options.top);
    options.height = Math.ceil(options.height);
    options.width = Math.ceil(options.width);

    this.renderThumb(canvas, options);

    var src = canvas.toDataURL(options);

    var blob = fabric.util.dataURItoBlob(src, 'image/' + options.format);
    var objectURL = URL.createObjectURL(blob);
    return {
      dataURL: src,
      blob: blob,
      url: objectURL,
      canvas: canvas
    };
  },
  getOriginalSize: function getOriginalSize() {
    return {
      width: this.originalWidth,
      height: this.originalHeight
    };
  },

  /**
   * @private
   */

  getObjectByID: function getObjectByID(_id) {
    for (var lid in this.layers) {
      if (this.layers[lid].objects) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.layers[lid].objects(this)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var o = _step7.value;

            if (o.id === _id) {
              return o;
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      }
    }
    return null;
  },
  /*
   Add Custom Object Tranformations
   */
  getPointer: function getPointer(e, ignoreZoom, upperCanvasEl) {
    var pointer = _get_pointer_overwritten.call(this, e, ignoreZoom, upperCanvasEl);
    if (e._group) {
      return this._normalizePointer(e._group, pointer);
    }
    return pointer;
  },

  hasStateChanged: fabric.Object.prototype.hasStateChanged,
  /** Creates a bottom canvas
   * @private
   * @param {HTMLElement} [canvasEl]
   */
  _createLowerCanvas: function _createLowerCanvas(canvasEl) {
    if (typeof canvasEl == "string") {
      this.lowerCanvasEl = fabric.util.getById(canvasEl);
    } else if (canvasEl) {
      this.lowerCanvasEl = this._createCanvasElement(canvasEl);
    } else {
      //edited allow virtul canvas
      // this.virtual = true;
      this.lowerCanvasEl = fabric.util.createCanvasElement();
    }
    fabric.util.addClass(this.lowerCanvasEl, 'lower-canvas');

    if (this.interactive) {
      this._applyCanvasStyle(this.lowerCanvasEl);
    }

    this.contextContainer = this.lowerCanvasEl.getContext('2d');
  },
  findTarget: function findTarget(e, skipGroup) {
    if (this.skipTargetFind) {
      return;
    }

    var ignoreZoom = true,
        pointer = this.getPointer(e, ignoreZoom),
        activeGroup = this.getActiveGroup(),
        activeObject = this.getActiveObject();
    if (activeGroup && !skipGroup && this._checkTarget(pointer, activeGroup)) {
      return activeGroup;
    }

    if (activeObject && this._checkTarget(pointer, activeObject)) {
      //added visceroid
      this._fireOverOutEvents(activeObject, e);
      return activeObject;
    }

    this.targets = [];

    var target = this._searchPossibleTargets(this._objects, pointer);
    this._fireOverOutEvents(target, e);
    return target;
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, ExtCanvasMixin, {
  type: "slide"
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var __initializeOverriden = fabric.Text.prototype.initialize;

fabric.util.object.extend(fabric.Text.prototype, {
  stateProperties: fabric.Text.prototype.stateProperties.concat(["text"]),
  initializeOverriden: __initializeOverriden,
  initialize: function initialize(text, options) {
    this._initEntity(options);
    this.initializeOverriden(text, options);
    // this.updateCache();
  },
  accepts: {
    role: "fontFamily"
  },
  setData: function setData(data) {
    if (data.role == "fontFamily") {
      this.setFontFamily(data.fontFamily);
    }
  },
  getStyle: function getStyle(styleName) {
    var object = this;
    return object.getSelectionStyles && object.isEditing ? object.getSelectionStyles()[styleName] || object[styleName] : object[styleName] || object['__' + styleName] || '';
  },
  getPattern: function getPattern(url) {
    var _fill = this.getStyle('fill ');
    return _fill && _fill.source;
  },
  setStyles: function setStyles(val) {
    this.styles = val || {};
  },
  setPattern: function setPattern(url) {
    if (!url) {
      this.setStyle('fill');
    } else {
      // var _texture = _.findWhere(this.project.textures, {id: url});
      var _this = this;
      fabric.util.loadImage(url, function (img) {
        _this.setStyle('fill', new fabric.Pattern({
          source: img,
          repeat: 'repeat'
        }));
      });
    }
  },
  /* getOpacity: function () {
    return this.getStyle('opacity') * 100;
  },
  setOpacity: function (value) {
    this.setStyle('opacity', parseInt(value, 10) / 100);
  },*/
  getRadius: function getRadius() {
    return this.get('radius');
  },
  setShadow: function setShadow(options) {
    return this.setProperty('shadow', options ? new fabric.Shadow(options) : null);
  },
  setRadius: function setRadius(value) {
    this.setProperty('radius', value);
  },
  getSpacing: function getSpacing() {
    return this.get('spacing');
  },
  setSpacing: function setSpacing(value) {
    this.setProperty('spacing', value);
  },
  getReverted: function getReverted() {
    return this.get('reverted');
  },
  setReverted: function setReverted(value) {
    this.setProperty('reverted', value);
  },
  getFill: function getFill() {
    return this.getStyle('fill');
  },
  setFill: function setFill(value) {
    this.setStyle('fill', value);
  },
  getText: function getText() {
    return this.get('text');
  },
  setText: function setText(value) {
    this.setProperty('text', value);
  },
  getTextAlign: function getTextAlign() {
    return this.get('textAlign');
  },
  setTextAlign: function setTextAlign(value) {
    this.setProperty('textAlign', value.toLowerCase());
  },
  getFontFamily: function getFontFamily() {
    return this.get('fontFamily');
  },
  setFontFamily: function setFontFamily(value) {
    this.setStyle('fontFamily', value);
  },
  getStyles: function getStyles() {
    return {
      fill: this.fill,
      fontSize: this.fontSize,
      textBackgroundColor: this.textBackgroundColor,
      textDecoration: this.textDecoration,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth
    };
  },
  getBgColor: function getBgColor() {
    return this.get('backgroundColor');
  },
  setBgColor: function setBgColor(value) {
    this.setProperty('backgroundColor', value);
  },
  getTextBgColor: function getTextBgColor() {
    return this.get('textBackgroundColor');
  },
  setTextBgColor: function setTextBgColor(value) {
    this.setProperty('textBackgroundColor', value);
  },
  getStroke: function getStroke() {
    return this.getStyle('stroke');
  },
  setStroke: function setStroke(value) {
    this.setStyle('stroke', value);
  },
  getStrokeWidth: function getStrokeWidth() {
    return this.getStyle('strokeWidth');
  },
  setStrokeWidth: function setStrokeWidth(value) {
    this.setStyle('strokeWidth', parseInt(value, 10));
  },
  decreaseFontSize: function decreaseFontSize() {
    this.setStyle('fontSize', parseInt(this.getStyle('fontSize')) - 1);
  },
  increaseFontSize: function increaseFontSize() {
    this.setStyle('fontSize', parseInt(this.getStyle('fontSize')) + 1);
  },
  getFontSize: function getFontSize() {
    return this.getStyle('fontSize');
  },
  setFontSize: function setFontSize(value) {
    this.setStyle('fontSize', parseInt(value, 10));
  },
  getLineHeight: function getLineHeight() {
    return this.getStyle('lineHeight');
  },
  setLineHeight: function setLineHeight(value) {
    this.setStyle('lineHeight', parseFloat(value, 10));
  },
  addText: function addText(text, options) {

    var _match = this.text.match(/\n/g);
    var _lineIndex = _match && _match.length || 0;
    var charIndex = this.text.length - this.text.lastIndexOf("\n") - 1;

    if (!this.styles[_lineIndex]) {
      this.styles[_lineIndex] = {};
    }

    if (!this.styles[_lineIndex][charIndex]) {
      this.styles[_lineIndex][charIndex] = {};
    }
    fabric.util.object.extend(this.styles[_lineIndex][charIndex], options);
    this.text += text;
    // this.styles;
  },
  getBold: function getBold() {
    return this.getStyle('fontWeight') === "bold";
  },
  setBold: function setBold(value) {
    this.setStyle('fontWeight', value ? 'bold' : '');
  },
  getItalic: function getItalic() {
    return this.getStyle('fontStyle') === 'italic';
  },
  setItalic: function setItalic(value) {
    this.setStyle('fontStyle', value ? 'italic' : '');
  },
  getUnderline: function getUnderline() {
    return this.getStyle('textDecoration').indexOf('underline') > -1;
  },
  setUnderline: function setUnderline(value) {
    value = value ? this.getStyle('textDecoration') + ' underline' : this.getStyle('textDecoration').replace('underline', '');

    this.setStyle('textDecoration', value);
  },
  getLinethrough: function getLinethrough() {
    return this.getStyle('textDecoration').indexOf('line-through') > -1;
  },
  setLinethrough: function setLinethrough(value) {
    value = value ? this.getStyle('textDecoration') + ' line-through' : this.getStyle('textDecoration').replace('line-through', '');

    this.setStyle('textDecoration', value);
  },
  getOverline: function getOverline() {
    return this.getStyle('textDecoration').indexOf('overline') > -1;
  },
  setOverline: function setOverline(value) {
    value = value ? this.getStyle('textDecoration') + ' overline' : this.getStyle('textDecoration').replace('overlin', '');

    this.setStyle('textDecoration', value);
  },
  _checkModifiedText: function _checkModifiedText(prop, value) {
    if (this.isEditing) {
      var isTextChanged = this._textBeforeEdit !== this.text;
      if (isTextChanged) {
        this.canvas.fire("object:modified", { target: this });
      }
    }
  },
  setProperty: function setProperty(prop, value) {
    this._checkModifiedText();
    this.saveState();
    this[prop] = value;

    this.fire("modified", {});
    if (this.canvas) {
      this.canvas.fire("object:modified", { target: this });
      this.canvas.renderAll();
    }
    this._textBeforeEdit = this.text;
  },

  setStyle: function setStyle(styleName, value) {
    this._checkModifiedText();
    this.saveState();

    var _old = this.getStyles();
    _old.styles = this.styles;

    if (this.setSelectionStyles && this.isEditing && this.selectionStart !== this.selectionEnd) {
      var style = {};
      if (value !== undefined) {
        style[styleName] = value;
      } else {
        delete style[styleName];
      }
      this.setSelectionStyles(style);
      this.setCoords();
    } else {
      if (value !== undefined) {
        this[styleName] = value;
      } else {
        delete this[styleName];
      }
      for (var i in this.styles) {
        for (var j in this.styles[i]) {
          if (this.styles[i][j][styleName] !== undefined) {
            delete this.styles[i][j][styleName];
          }
        }
      }
    }

    this.setCoords();

    if (this.caching) {
      this.dirty = true;
    }

    // if(!this.isEditing){
    this.fire("modified", {});

    if (this.canvas) {
      this.canvas.fire("object:modified", { target: this });
      this.canvas.renderAll();
    }
    // }
  },
  generateTextStyle: function generateTextStyle() {
    return {
      'font-style': this.isItalic() ? 'italic' : 'normal',
      'font-weight': this.isBold() ? 700 : 400,
      'text-decoration': (this.isLinethrough() ? 'line-through ' : '') + (this.isOverline() ? 'overline ' : '') + (this.isUnderline() ? 'underline ' : '')
    };
  }
});

fabric.util.object.extend(fabric.Textbox.prototype, {
  toObject: fabric.Object.prototype.toObject
});

fabric.util.object.extend(fabric.IText.prototype, {
  stateProperties: fabric.IText.prototype.stateProperties.concat(["styles"]),
  store_styles: function store_styles() {
    if (!Object.keys(this.styles).length) return null;
    var _styles = {};
    var _is_not_empty = false;
    for (var row in this.styles) {
      if (Object.keys(this.styles[row]).length) {
        var _row_empty = true;
        for (var char in this.styles[row]) {
          if (Object.keys(this.styles[row][char]).length) {
            if (_row_empty) {
              _styles[row] = {};_row_empty = false;
            }
            _styles[row][char] = fabric.util.object.clone(this.styles[row][char]);
          }
        }
        if (!_row_empty) {
          _is_not_empty = true;
        }
      }
    }
    return _is_not_empty && _styles || null;
  },
  toObject: fabric.Object.prototype.toObject,
  initHiddenTextarea_native: fabric.IText.prototype.initHiddenTextarea,
  initHiddenTextarea: function initHiddenTextarea() {
    this.initHiddenTextarea_native();
    this.hiddenTextarea.style.width = "9999px";
    this.hiddenTextarea.style["margin-left"] = "-9999px";
  },
  /**
   * Exits from editing state
   * @return {fabric.IText} thisArg
   * @chainable
   */
  /* exitEditing: function() {
      var isTextChanged = (this._textBeforeEdit !== this.text);
     this.selected = false;
     this.isEditing = false;
     this.selectable = true;
      this.selectionEnd = this.selectionStart;
      if (this.hiddenTextarea) {
       this.hiddenTextarea.blur && this.hiddenTextarea.blur();
       this.canvas && this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea);
       this.hiddenTextarea = null;
     }
      this.abortCursorAnimation();
     this._restoreEditingProps();
     this._currentCursorOpacity = 0;
      this.fire('editing:exited');
     isTextChanged && this.fire('modified');
     if (this.canvas) {
       this.canvas.off('mouse:move', this.mouseMoveHandler);
       this.canvas.fire('text:editing:exited', { target: this });
       isTextChanged && this.canvas.fire('object:modified', { target: this });
       // this.canvas.fireModifiedIfChanged(this);
     }
     return this;
   },*/
  maxStrokeWidth: function maxStrokeWidth() {
    return Math.ceil(this.getFontSize() / 10);
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/**
 * # Application
 *
 * farbic.app function is the entry point of FabricJS application.
 * Application could be initialised with configuration object. Different extensions allows to initialize special application attributes such as *object prototypes*, *resizable canvas*, *available fonts*, etc.
 *
 * ### option: util
 * mediaRoot - root directory for all media files in fabric application
 *
 * ### option: resizable
 * makes canvas responsible. Canvas will be scaled to 100% of its container size
 *
 * ### option: onResize
 * function which override deafult canvas resize behavior.
 *
 * ### option: callback
 * function calls after canvas initialized
 *
 * ### option: initialize
 * function calls before canvas initialize
 *
 * @example
 *
 * new fabric.Editor({
 *      resizable: true,
 *      onResize: function(){},
 *      util: {
 *        mediaRoot: '../../media/'
 *      },
 *      canvasContainer: "fiera-canvas",
 *      prototypes: {},
 *      objects: {},
 *      eventListeners: {},
 *      callback: function(){},
 *      initialize:  function(){}
 *      customPublicApplicationFunction: function(){},
 *      customPublicApplicationAttribute: value
 *  })
 *
 */

fabric.util.object.extend(fabric, {
  errors: []
});

fabric.Editor = function (options) {
  if (options.id) {
    this.id = options.id;
    delete options.id;
  }

  this.initEventListeners();

  this.fire("created", { options: options });

  options = fabric.util.object.deepExtend({}, this.defaultOptions, options || {});
  this.init(options);
};

fabric.Editor.prototype = fabric.util.object.extend({}, fabric.Observable, {
  defaultOptions: {
    /**
     * id of target canvas element
     */
    // canvasContainer: null
  },
  credentials: false,
  ready: false,
  optionsOrder: ["canvasContainer", "*", "objects", "slide"],
  plugins: {
    configuration: [],
    canvas: []
  },
  /**
   * Additional Event Listeners couldbe used to detect activeobject changes
   *  - canvas:created
   *  - entity:load - Event fired on creation of every new fabric instance(canvas,brush,object)
   *
   *  @example
   *  'entity:load' : function(e){
   *     if(e.options.boxType == 'machine') {
   *       e.options.type = "machine-mask-rectangle";
   *     }
   *   }
   */
  eventListeners: {
    "canvas:created": [],
    "entity:created": [function (e) {
      if (!e.options.id) {
        e.options.id = fabric.util.idCounter++;
      }
      if (e.target.eventListeners) {
        for (var i in e.target.eventListeners) {
          var _listeners = e.target.eventListeners[i];
          if (_listeners.constructor == Array) {
            for (var j in _listeners) {
              e.target.on(i, _listeners[j]);
            }
          } else {
            e.target.on(i, _listeners);
          }
        }
      }
      if (e.options.eventListeners) {
        for (var i in e.options.eventListeners) {
          e.target.on(i, e.options.eventListeners[i]);
        }
      }
      delete e.options.eventListeners;
      if (e.target._default_event_listeners) {
        for (var i in e.target._default_event_listeners) {
          e.target.on(i, e.target._default_event_listeners[i]);
        }
      }
    }]
  },
  onSlideLoaded: function onSlideLoaded() {},
  callback: function callback() {},
  init: function init(options) {
    this._options = options;

    this._loading = true;
    this.fire("loading:begin", { options: this._options });

    // new Promise(() => {
    //   return this;
    // })
    // .then(this.preloader.bind(this))
    // .then(this.loadConfiguration.bind(this))
    // .then(this.initOptions.bind(this))
    // .then(this.initialize.bind(this))
    // .then(this.onApplicationCreated.bind(this))
    // .then(this.postloader.bind(this))
    // .then(this.callback && function(app){
    //   setTimeout(this.callback.bind(this),0);
    // })
    // .then(  function(){
    //   this.fire("ready");
    // }.bind(this))


    // if(options.loader){
    //   this.setLoader(options.loader);
    //   delete options.loader;
    // }
    // if(options.prototypes){
    //   this.setPrototypes(options.prototypes);
    //   delete options.prototypes;
    // }
    //
    // if(options.actions){
    //   this.setActions(options.actions);
    //   delete options.actions;
    // }
    // if(options.history){
    //   this.setHistory(options.history);
    //   delete options.history;
    // }
    //
    // if(options.toolbars){
    //   this.setToolbars(options.toolbars);
    //   delete options.toolbars;
    // }
    //
    // if(options.previewMode){
    //   this.previewMode = options.previewMode;
    //   delete options.previewMode;
    // }
    //
    // if(options.slide){
    //   this.slide = options.slide;
    // }
    // this.setCanvasContainer(options.canvasContainer);
    // delete this.slide;
    // delete options.canvasContainer;


    fabric.util.order([
    // function(cb){
    //   this.setWebfonts(options.webfonts,cb);
    //   delete options.webfonts;
    // },
    this.preloader, this.loadConfiguration, this.initOptions, this.initialize, function () {
      // this._loading = false;
      // this.fire("loading:end",{});
    }, this.postloader, function () {
      setTimeout(this.callback.bind(this), 0);
    }, function () {
      this.ready = true;
      this.fire("ready");
    }], this);
  },
  setCredentials: function setCredentials(credentials) {
    if (credentials) {
      console.info("%cFiera Canvas Editor%c by %cDenis Ponomarev%c %c%6$s%c / %c%9$s%c", "color: #ffa500", "color: #202020", "color: #2EC06C", "color: #202020", "color: #337ab7", "www.hometlt.ru", "color: #202020", "color: #337ab7", "ponomarevtlt@gmail.com", "color: #202020");
    }
  },
  initOptions: function initOptions(resolve, error) {
    this.set(this._options, function () {
      resolve();
    });
  },
  configurationProperties: [],
  loadConfiguration: function loadConfiguration(resolve, error) {
    var _this = this;

    if (this.configurationProperties) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.configurationProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;


          if (this._options[prop]) {
            if (!this._options.configuration) {
              this._options.configuration = {};
            }
            this._options.configuration[prop] = this._options[prop];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    if (!this._options.configuration) {
      return resolve();
    }
    var _app = this;
    fabric.util.promise.map(this._options.configuration, function (value) {
      return new Promise(function (resolve, fail) {
        if (value.constructor === Function) {
          if (value.length) {
            value(resolve, fail);
          } else {
            resolve(value());
          }
        } else {
          fabric.util.data.loadJson(value, resolve, fail);
        }
      });
    }).then(function (results) {
      fabric.util.object.extend(_app._options, results);
      delete _this._options.configuration;
    }).then(resolve, error);
  },
  createCanvas: function createCanvas(data) {

    var fabricCanvas;
    if (fabric.isLikelyNode) {
      // fabric.Canvas = fabric.Canvas;
      var w = data.slideWidth; //todo|| slide.template.width;
      var h = data.slideHeight; //todo || slide.template.height;
      var zoom = fabric.Canvas.prototype.zoom || 1;
      fabricCanvas = fabric.createCanvasForNode(w * zoom, h * zoom);
    } else {
      fabricCanvas = new fabric.Canvas({ application: this, width: data.width, height: data.height });
      // this.canvas =  new fabric.StaticCanvas($canvas, {application: application, interactive: false});
    }

    delete data.width;
    delete data.height;

    // var fabricCanvas = new fabric[this.canvasClass]( {application: this});
    this.fire("canvas:created");

    /*if(this.canvasContainer){
      this.canvasContainer.append(fabricCanvas.wrapperEl)
    }*/
    //
    // if (fabricCanvas.load) {
    //   fabricCanvas.load(data, callback);
    // } else {
    //   fabricCanvas.createObjects(data, callback);
    // }
    return fabricCanvas;
  },
  getLibraryElements: function getLibraryElements(options) {
    return [];
  },
  _setCanvasContainer: function _setCanvasContainer(el, callback) {
    this.canvasContainer = el;
    //temporary slide;
    // if(this._options.slide){
    //   this.canvas = this.createCanvas(this._options.slide);
    //   this.canvasContainer.appendChild(this.canvas.wrapperEl);
    //   this.slides = [this.canvas];
    // }
    // this.canvas.load({});
  },
  setCanvasContainer: function setCanvasContainer(canvasContainer, callback) {
    var _this2 = this;

    //waiting while doument is ready
    if (canvasContainer.constructor === String) {
      var el = document.getElementById(canvasContainer);
      if (el) {
        //} || fabric.isLikelyNode) {
        this._setCanvasContainer(el);
        callback();
      } else {
        $(document).ready(function () {
          _this2._setCanvasContainer(document.getElementById(canvasContainer));
          callback();
        });
      }
    } else {
      this._setCanvasContainer(canvasContainer);
    }
  },
  dispose: function dispose() {
    this.canvas.dispose();
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Event Listeners
  //--------------------------------------------------------------------------------------------------------------------

  setEventListeners: function setEventListeners(val) {
    this.on(val);
  },
  initEventListeners: function initEventListeners() {
    if (!this.__eventListeners) {
      this.__eventListeners = {};
    }
    for (var event in this.eventListeners) {
      if (!this.__eventListeners[event]) {
        this.__eventListeners[event] = [];
      }
      this.__eventListeners[event] = this.__eventListeners[event].concat(this.eventListeners[event]);
    }
  },
  cacheProperties: [],
  //--------------------------------------------------------------------------------------------------------------------
  //
  toObject: function toObject() {
    var data = {};
    if (this.slide) {
      return this.slide.toObject();
    }
    if (this.slides) {
      data.slides = [];
      for (var i in this.slides) {
        data.slides.push(this.slides[i].toObject());
      }
    }
    return data;
  },
  __set: fabric.Object.prototype.__set,
  _setObject: fabric.Object.prototype._setObject,
  set: fabric.Object.prototype.set,
  setOptions: fabric.Object.prototype.setOptions
});

// fabric.Editor.addPlugin = fabric.PluginsMixin.addPlugin.bind(fabric.Editor);

fabric.app = function (options) {
  return new fabric.Editor(options);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/**
 * # Canvas
 * Inherited from fabric.Canvas
 *
 *

 ## method: load

Mathod allows to add new objects and set new attributes of canvas.

 ```javascript
 load : ({
    backgroundImage: string,
    objects: [FabricShapeOptions],
    customSyncOption: any,
    customAsyncOption: any
  },callback) : void
 ```

 To extend loading behavior and use custom options it is possible to define **set fucntions** in Canvas prototype.

 ```javascript
 // Canvas Prototype
 setCustomAsyncOption: function(val,callback){
  this.doAsyncMethod(val,callback)
}
 setCustomSyncOption: function(val){
  this.customSyncOtion = val;
}
 ```

 ### attribute: backgroundImageProperties

 default attributes for background image

 ### freeDrawingBrush

 default active drawing brush

 ```
 freeDrawingBrush: "PaintBucketBrush" | "PaintPenBrush" | "PencilBrush"
 ```

 ### attribute: onSlideLoaded

 onSlideLoaded calls as a callback for load fucntion

 ### attribute: backgroundPosition

 onSlideLoaded calls as a callback for load fucntion

 ```
 backgroundPosition: 'manual' | 'resize' | 'fit' | 'cover' | 'center'
 ```

 - manual - background will ne not scaled and put at left top corner
 - resize - canvas will be resized according to image size
 - fit - will be scaled to fit canvas size
 - cover - will be scaled to cover all canvas size
 - center - backogrund will be not scaled but put in the middle

 ### method: setInteractiveMode

 switch between drawing and hand( moving cunvas by mouse) modes

 ```javascript
 canvas.setInteractiveMode( mode : "hand" | "mixed") : void
 ```

 ### drawingColor

 drawing color using by brushes

 */

fabric.util.object.extend(fabric.StaticCanvas.prototype, {

  setBackgroundColor: function setBackgroundColor(backgroundColor, callback) {
    var _this = this;

    if (this.loaded) {
      this.saveState(["backgroundColor"]);
    }

    return this.__setBgOverlayColor('backgroundColor', backgroundColor, function () {
      _this.renderAll();

      if (_this.loaded) {
        _this.fire('modified');
      }
      callback && callback();
    });
  },
  storeProperties: ['objects', 'backgroundColor', 'overlayColor', 'backgroundImage', 'overlayImage', 'width', 'height'],
  toObjectSync: function toObjectSync(propertiesToInclude) {
    propertiesToInclude = (propertiesToInclude || []).concat(this.storeProperties);

    var _data = {
      objects: this.getObjects(),
      width: this.originalWidth || this.width,
      height: this.originalHeight || this.height
    };
    fabric.util.populateWithProperties(this, _data, propertiesToInclude);

    this.fire("before:object", { object: _data });

    return _data;
  },
  /*store_thumb: function (){
    var size = fabric.util.getProportions(this.getOriginalSize(), this.thumbSize, 'fit');
    var canvas = fabric.util.createCanvasElement();
    canvas.width = size.width;
    canvas.height = size.height;
    this.renderThumb(canvas);
    return canvas.toDataURL();
  },
  store_template: function(propertiesToInclude, _data) {
    if (this.template) {
      for (var i in _data.template) {
        if (JSON.stringify(_data[i]) == JSON.stringify(_data.template[i])) {
          delete _data[i];
        }
      }
      return this.template.id;
    }
    return null;
  },*/
  store_backgroundImage: function store_backgroundImage() {
    if (this.backgroundImage && !this.backgroundImage.excludeFromExport) {
      return this.backgroundImage.toObject();
    }
    return null;
  },
  store_overlayImage: function store_overlayImage() {
    if (this.overlayImage && !this.overlayImage.excludeFromExport) {
      return this.overlayImage.toObject();
    }
    return null;
  },
  store_backgroundColor: function store_backgroundColor() {
    if (!this.backgroundColor) return "";
    return this.backgroundColor.toObject ? this.backgroundColor.toObject() : this.backgroundColor;
  },
  store_width: function store_width() {
    return this.originalWidth || this.width;
  },
  store_height: function store_height() {
    return this.originalHeight || this.height;
  },
  store_overlayColor: function store_overlayColor() {
    if (!this.overlayColor) return "";
    return this.overlayColor.toObject ? this.overlayColor.toObject() : this.overlayColor;
  },
  store_objects: function store_objects() {
    var _this2 = this;

    var _objs = fabric.util.object.filter(this.getObjects(), { stored: true });
    if (!_objs.length) return null;
    return _objs.map(function (instance) {
      return instance.toObject(_this2.objectsPropertiesToInclude);
    });
  },
  toObject: fabric.Object.prototype.toObject,

  addText: function addText() {
    this.createObject({
      active: true,
      position: "center",
      type: this.defaultTextType,
      clipTo: this.activeArea,
      text: this.deafultText,
      movementLimits: this.activeArea
    });
  }
});

fabric.util.object.extend(fabric.Canvas.prototype,
// fabric.PluginsMixin,
{
  type: 'canvas',
  /**
   * initialized width of the canvas
   */
  width: 160,
  /**
   * initialized height of the canvas
   */
  height: 90,
  /**
   * output quality
   */
  dotsPerUnit: 1,
  scale: 1,
  loaded: false,
  /**
   * allow user to interact with canvas
   */
  interactive: true,
  /**
   * fill not the slide area, but whole canvas with background color
   */
  defaultTextType: "text",

  thumbSize: {
    width: 50,
    height: 100
  },
  contextTopImageSmoothingEnabled: true,
  setInteractive: function setInteractive(value) {
    this.interactive = value;
  },
  setContextTopImageSmoothingEnabled: function setContextTopImageSmoothingEnabled() {
    var ctx = this.contextTop;
    if (ctx.imageSmoothingEnabled) {
      ctx.imageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
      return;
    }
    ctx.webkitImageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
    ctx.mozImageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
    ctx.msImageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
    ctx.oImageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
  },

  _onMouseUpInDrawingMode: function _onMouseUpInDrawingMode(e) {
    this._isCurrentlyDrawing = false;
    if (this.clipTo) {
      this.contextTop.restore();
    }
    var pointer = this.getPointer(e);
    this.freeDrawingBrush.onMouseUp(pointer);
    this._handleEvent(e, 'up');
  },
  _clearObjects: function _clearObjects() {
    var _oldObjects = this._objects.splice(0);

    if (this._hasITextHandlers) {
      this.off('mouse:up', this._mouseUpITextHandler);
      this._iTextInstances = null;
      this._hasITextHandlers = false;
    }
    return _oldObjects;
  },
  clearObjects: function clearObjects() {

    var _oldObjects = this._clearObjects();
    this.clearContext(this.contextContainer);
    this.fire('canvas:cleared', { objects: _oldObjects });
    this.renderAll();
    return this;
  },
  renderPageBackground: false,
  initialize: function initialize(el, options, callback) {
    this.processing = true;
    if (el && el.constructor == Object) {
      callback = options;
      options = el;
      el = null;
    }
    options = options || {};

    if (options.application) {
      options.application.fire("entity:created", { target: this, options: options });
    }

    this.fire("before:created", { options: options });

    this._objects = [];
    this._helpersObjects = [];
    this._createLowerCanvas(el);

    this.created = true;
    this._currentTransform = null;
    this._groupSelector = null;
    this._initWrapperElement();
    this._createUpperCanvas();
    this._initEventListeners();
    this.calcOffset();

    this.wrapperEl.appendChild(this.upperCanvasEl);

    this._createCacheCanvas();
    this._setImageSmoothing();
    this._initRetinaScaling();

    this._initSize();
    this.set(options);

    if (this.renderPageBackground) {
      this.backgroundRect = new fabric.Rect({
        width: this.width,
        height: this.height,
        shadow: {
          offsetX: 1,
          offsetY: 3,
          blur: 10,
          color: 'rgba(0,0,0,0.6)'
        }
      });
    }

    this.updateFonts();
    this.calcOffset();

    this.on({
      'canvas:cleared': function canvasCleared() {
        var event = {};
        event.previous = this.application.target;
        if (event.previous) {
          event.previous.fire('deselected');
        }
        this.application.target = null;
        this.application.fire('target:cleared', event);
      },
      'object:modified': function targetModifed(e) {
        if (this.application.target === e.target) {
          this.application.fire('target:modified', { target: e.target, canvas: this });
        }
      },
      'selection:cleared': function targetClear(event) {
        if (!this.application.target) return;
        this.application.target.fire('deselected', event);

        if (this.application.target.canvas === this) {
          event.previous = this.application.target;
          this.application.target = null;
          this.application.fire('target:cleared', event);
        }
      },
      'object:selected': function targetChanged(event) {
        event.previous = this.application.target;
        this.application.target = event.target;
        if (event.previous) {
          event.previous.fire('deselected', event);
        }
        this.application.fire('target:changed', event);
      },
      'group:selected': function targetChanged(event) {
        event.previous = this.application.target;
        this.application.target = event.target;
        this.application.fire('target:changed', event);
      }
    });
    this.fire("created");
    this.processing = false;
    this.renderAll();

    // if(this.application){
    //   this.application.fire("canvas:created",{target : this});
    // }
  },
  animated: false,
  setAnimated: function setAnimated(val) {
    this.animated = val;
    if (val) {
      fabric.util.requestAnimFrame(function render() {
        this.renderAll();
        fabric.util.requestAnimFrame(render);
      }.bind(this));
    }
  },
  create: function create() {
    this.created = true;
    this._initInteractive();
    this._createCacheCanvas();
  }
});
fabric.Canvas.fromJson = function (url, callback, element) {
  fabric.util.data.loadJson(url, function (data) {
    new fabric.Canvas(element, data, callback);
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.PREVIEW = {
  NONE: 0,
  SINGLE: 1,
  ALL: 2
};

fabric.Editor.prototype.configurationProperties.push("slides");
fabric.util.object.extend(fabric.Editor.prototype, {
  defaultOptions: fabric.util.object.extend(fabric.Editor.prototype.defaultOptions, {
    activeSlide: 0
  }),
  previewMode: fabric.PREVIEW.SINGLE,
  optionsOrder: function () {
    var oo = fabric.Editor.prototype.optionsOrder;
    oo.push("slides", "activeSlide");
    return oo;
  }(),
  _setSlidesData: function _setSlidesData(slides) {
    var _this = this;

    if (this.slides) {
      this.slides.forEach(function (slide) {
        slide.processing = true;
        slide.dispose();
        slide.lowerCanvasEl.parentNode.removeChild(slide.lowerCanvasEl);
      });
    }
    this.slides = [];

    slides.forEach(function (slide) {
      return _this.addSlide(slide);
    });

    function onSlideLoaded() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var slide = _step.value;

          if (!slide.loaded) return false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.fire("loading:end", {});
      this.off("slide:loading:end", onSlideLoaded);
      return true;
    }

    if (!onSlideLoaded.call(this)) {
      this.on("slide:loading:end", onSlideLoaded);
    }
  },
  _parse_function_json: function _parse_function_json(value, callbackFn, errorFn) {
    if (typeof value === "function") {
      if (value.length) {
        return value.call(this, callbackFn, errorFn);
      } else {
        value = value.call(this);
      }
    }
    fabric.util.data.loadJson(value, callbackFn, errorFn);
  },
  setSlide: function setSlide(value, callbackFn) {
    var _this2 = this;

    this._parse_function_json(value, function (slide) {

      var old = _this2.canvas;
      if (old) {
        if (_this2.canvasContainer === old.wrapperEl) {
          _this2.canvasContainer = old.lowerCanvasEl;
        }
        old.lowerCanvasEl.style = "";
        old.processing = true;
        old.dispose();
      }
      _this2.slides = [];

      _this2.canvas = _this2.addSlide(slide);

      function onSlideLoaded() {
        var _this3 = this;

        this._replaceCanvasElement(this.canvas.wrapperEl, old && old.lowerCanvasEl);
        this.fire("loading:end", {});
        this.fire("slide:changed", { canvas: this.canvas });
        //todo
        setTimeout(function () {
          _this3.off("slide:loading:end", onSlideLoaded);
        });
      }
      _this2.on("slide:loading:end", onSlideLoaded);

      callbackFn && callbackFn();
    }, function () {
      console.error("slide loading failed");
      callbackFn && callbackFn();
    });
  },
  setSlides: function setSlides(value, callbackFn) {
    var _this4 = this;

    this._parse_function_json(value, function (slide) {
      _this4._setSlidesData(slide);
      callbackFn && callbackFn();
    }, function () {
      console.error("slides loading failed");
      callbackFn && callbackFn();
    });
  },
  _replaceCanvasElement: function _replaceCanvasElement(slideWrapper, _oldWrapper) {
    //container CANVAS
    if (this.canvasContainer.constructor === HTMLCanvasElement) {
      this.canvasContainer.parentNode.replaceChild(slideWrapper, this.canvasContainer);
      this.canvasContainer = slideWrapper;
    } else if (!_oldWrapper) {
      //container DIV
      this.canvasContainer.appendChild(slideWrapper);
    }
    //container .CANVAS-CONTAINER
    else if (this.canvasContainer === _oldWrapper) {
        _oldWrapper.parentNode.replaceChild(slideWrapper, _oldWrapper);
        this.canvasContainer = slideWrapper;
      }
      //container DIV
      else if (_oldWrapper) {
          $(_oldWrapper).remove();
          this.canvasContainer.appendChild(slideWrapper);
        }
  },
  _setActiveSlide: function _setActiveSlide(slide) {

    if (this.canvas === slide) return;

    var old = this.canvas;
    this.canvas = slide;

    if (old) {
      old.discardActiveGroup();
      old.discardActiveObject();
      old.renderAll();
    }

    if (this.previewMode === fabric.PREVIEW.SINGLE) {

      this._replaceCanvasElement(slide.wrapperEl, old && old.wrapperEl);
    } else {
      //container DIV
      if (old) {
        $(old.wrapperEl).removeClass("active");
      }
      $(slide.wrapperEl).addClass("active");
    }

    slide._onResize();
    this.fire("slide:changed", { canvas: this.canvas });
  },

  setActiveSlide: function setActiveSlide(slideId) {
    var _this5 = this;

    var slide = void 0;

    if (!this.slides) {
      return false;
    }
    if (slideId.constructor === Number) {
      slide = this.slides[slideId];
    } else if (slideId.constructor === String) {} else {
      slide = slideId;
    }

    if (this.activeSlide === slide) return;

    if (slide.loaded) {
      this._setActiveSlide(slide);
    } else {
      slide.on("loading:end", function () {
        _this5._setActiveSlide(slide);
      });
    }
  },
  unloadUnactiveSlides: false,
  // lazyLoadEnabled: true,
  // lazyLoad: function(){
  //
  //   var app = this;
  //   if(this.lazyLoadEnabled){
  //     this.slides.forEach(function(slide){
  //       if(!slide.loaded && !slide.processing){
  //         slide.load(slide.object,function(){
  //           slide.fire("loaded");
  //           // if(app.activeSlide === slide.id){
  //           //   this.setActiveSlide(slide);
  //           // }
  //
  //           // app.fire("slide:loading:end", {target: this});
  //
  //           for(var _s in app.slides){
  //             if(!app.slides[_s].loaded){
  //               return;
  //             }
  //           }
  //           app.fire("loading:end", {});
  //         }.bind(slide));
  //       }
  //     });
  //   }else{
  //     app.fire("loading:end",{});
  //   }
  // },
  addSlide: function addSlide(options) {
    var slide = this.createCanvas(options);
    slide.load(options);

    this.slides.push(slide);
    if (this.previewMode === fabric.PREVIEW.ALL) {
      if (this.canvasContainer) {
        this.canvasContainer.appendChild(slide.wrapperEl);
        slide._onResize();
      }
    }

    slide.on("mouse:down", function () {
      this.application.setActiveSlide(this);
    }, true);

    this.fire("slide:created", { target: slide });
    return slide;
  },
  removeSlide: function removeSlide(slide) {
    var _s = this.slides;
    var _curPos = _s.indexOf(slide);
    _s.splice(_curPos, 1);
    slide.fire("removed");

    if (slide === this.activeSlide) {
      delete this.activeSlide;
    }

    if (this.slides.length === 0) {
      var slideData = {};
      var _slide = this.addSlide(slideData);
      _slide.load(_slide.object);
      this.setActiveSlide(0);
    } else if (this.slides.length > _curPos) {
      this.setActiveSlide(_curPos);
    } else {
      this.setActiveSlide(_curPos - 1);
    }
  },
  /**
   * move slide to another position
   * @param slide
   * @param newPosition
   */
  moveSlide: function moveSlide(slide, newPosition) {
    var _s = this.slides;

    var _curPos = _s.indexOf(slide);
    newPosition = parseInt(newPosition);

    if (_curPos < newPosition) {
      _s.splice(_curPos, 1);
      _s.splice(newPosition, 0, slide);
    } else {
      _s.splice(_curPos, 1);
      _s.splice(newPosition, 0, slide);
    }
  },
  /**
   * replace slide
   * @param slide
   * @param newPosition - position of the second slide
   */
  replaceSlide: function replaceSlide(slide, newPosition) {
    var _s = this.slides;
    var _replacedSlide = _s[newPosition];
    var _curPos = _s.indexOf(slide);
    if (_curPos < newPosition) {
      _s.splice(newPosition, 1, slide);
      _s.splice(_curPos, 1, _replacedSlide);
    } else {
      _s.splice(_curPos, 1, _replacedSlide);
      _s.splice(newPosition, 1, slide);
    }
  },
  // preload: function(){
  //   for(var i in this.slides) {
  //     var _slide = this.slides[i];
  //     // _slide.canvas.preload(_slide.object, function () {
  //     //   _slide.fire("modified");
  //     // });
  //   }
  // },
  setActiveSlideByIndex: function setActiveSlideByIndex(index) {
    this.setActiveSlide(this.slides[index]);
  },
  setActiveSlideById: function setActiveSlideById(id) {
    this.setActiveSlide(fabric.util.object.findWhere(this.slides, { id: id }));
  },
  duplicateSlide: function duplicateSlide(slideData) {
    slideData = slideData.toObject();
    var _slide = this.addSlide(slideData);
    _slide.load(_slide.object);
  },
  nextSlide: function nextSlide() {
    var i = this.slides.indexOf(this.activeSlide);
    if (i < this.slides.length - 1) {
      this.setActiveSlide(i + 1);
    }
  },
  prevSlide: function prevSlide() {
    var i = this.slides.indexOf(this.activeSlide);
    if (i > 0) {
      this.setActiveSlide(i - 1);
    }
  },
  gotoSlide: function gotoSlide(slide) {
    this.setActiveSlide(slide - 1);
  },
  nextSlideAvailable: function nextSlideAvailable() {
    var i = this.slides.indexOf(this.activeSlide);
    return i < this.slides.length - 1;
  },
  prevSlideAvailable: function prevSlideAvailable() {
    var i = this.slides.indexOf(this.activeSlide);
    return i > 0;
  },
  createSlidesListElement: function createSlidesListElement(slide) {
    var _this6 = this;

    var $element = fabric.util.createCanvasElement();
    $element.setAttribute("height", 140);
    fabric.util.createThumb(slide, $element);

    slide.$slideElement = $("<div>").addClass("slide").click(function () {
      return _this6.setActiveSlide(slide);
    }).append($element).append($("<span>").html(slide.title));

    if (slide.description) {
      slide.$slideElement.attr("title", slide.description);
    }

    slide.on({
      "modified": function modified() {
        this.renderAll();
      },
      "removed": function removed() {
        slide.$slideElement.remove();
      }
    });
    this.$slideListInner.append(slide.$slideElement);
  },
  createSlidesList: function createSlidesList($container) {
    var _this7 = this;

    this.$slideList = this.$slidesList = $("<div>").addClass("slides-list");
    this.$slideListInner = $("<div>").addClass("slides-list-inner");
    this.$slideList.append(this.$slideListInner);

    $container.append(this.$slidesList);

    this.slides.forEach(function (slide) {
      return _this7.createSlidesListElement(slide);
    });

    this.on("slide:created", function (e) {
      _this7.createSlidesListElement(e.target);
    });

    return {
      list: this.$slideList

      //this.canvas.on( "dimensions:modified" ,this.updateThumbs.bind(this))
      //this.updateThumbs();
    };
  },
  updateThumbs: function updateThumbs() {
    var _this8 = this;

    this.slides.forEach(function (slide) {
      slide.canvas.setDimensions({ width: _this8.canvas.width, height: _this8.canvas.height });
    });
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  title: "New Slide",
  unique: false,
  required: false,
  // stateProperties: ["unique","required"],
  removeSlide: function removeSlide() {
    this.application.removeSlide(this);
  },
  duplicateSlide: function duplicateSlide() {
    this.application.duplicateSlide(this);
  }
  // eventListeners: fabric.util.object.extendArraysObject(fabric.Canvas.prototype.eventListeners, {
  //   "modified" : function(e){
  //     if(this.canvas){
  //       this.canvas.canvas.set(e.states.modified);
  //       this.canvas.fire("modified");
  //     }
  //   },
  //   "object:modified" : function(){
  //     if(this.canvas){
  //       this.canvas.fire("modified");
  //     }
  //   }
  // })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/**
 * # Prototypes

 Prototypes allows to define **prototypes** property in Application configuration.

 ```javascript
 Application ({
  prototypes: {
    ClassName: options
  }
 })
 ```

 If prototype is defined every new Object created by application will have this properties by default.

 ```javascript
   NewClass: {
    $super: "ParentClass",
    type: "new-class",
    \/*other properties and methods*\/
   }
  ```

 if property **type** of Object class is defined then every object be default will have this type.

 ```javascript
   Object: {
    type: "rectangle"
   }
 ...
 //rectangle will be created
 fabric.createObject({width:100, height: 100})
 ```
*/

fabric.util.object.extend(fabric.Object.prototype, {
  /**
   * @private
   * @param {Object} object
   */
  _removeDefaultValues: function _removeDefaultValues(object, _type) {

    var prototype = this.application.getKlass(_type || object.type).prototype;
    // stateProperties = prototype.stateProperties;
    var _protoProperties = this.application && this.application.getDefaultProperties(prototype) || {};

    for (var prop in object) {
      if (prop === "type") continue;
      var _protoValue = _protoProperties[prop] !== undefined ? _protoProperties[prop] : prototype[prop];

      if (object[prop] === _protoValue) {
        delete object[prop];
      }
      var isArray = Object.prototype.toString.call(object[prop]) === '[object Array]' && Object.prototype.toString.call(_protoValue) === '[object Array]';

      // basically a check for [] === []
      if (isArray && object[prop].length === 0 && _protoValue.length === 0) {
        delete object[prop];
      }
    }

    return object;
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  _removeDefaultValues: fabric.Object.prototype._removeDefaultValues
});

fabric.util.object.extend(fabric.Editor.prototype, {
  optionsOrder: function () {
    var oo = fabric.Editor.prototype.optionsOrder;
    oo.splice(oo.indexOf("canvasContainer"), 0, "prototypes");
    return oo;
  }(),
  getDefaultProperties: function getDefaultProperties(stringTypeOrPrototype) {
    if (!this.prototypes) return;
    var klassname, proto;
    if (stringTypeOrPrototype.constructor === String) {
      klassname = fabric.util.string.capitalize(fabric.util.string.camelize(stringTypeOrPrototype), true);
      var _klass = this.getKlass(klassname);
      proto = _klass.prototype;
    } else {
      proto = stringTypeOrPrototype;
      klassname = fabric.util.string.capitalize(fabric.util.string.camelize(proto.type), true);
    }
    var _protoProperties = proto && proto.__proto__ && proto.__proto__.type && this.getDefaultProperties(proto.__proto__) || {};
    var _defaultProperties = klassname && fabric.util.object.clone(this.prototypes[klassname]) || {};

    fabric.util.object.extend(_protoProperties, _defaultProperties);

    return _protoProperties;
  },
  /**
   * default prototypes propertes for objects
   */
  prototypes: {
    Object: {
      includeDefaultValues: false
    },
    Canvas: {
      includeDefaultValues: false
    }
  },
  setUtils: function setUtils(utilsOptions) {

    if (!utilsOptions) {
      return;
    }
    fabric.util.object.extend(this.util || {}, utilsOptions);

    if (this.options['util']) {
      fabric.util.object.extend(fabric.util, this.options['util']);
    }
    if (this.options['fabric']) {
      fabric.util.object.extend(fabric, this.options['fabric']);
    }
    delete this.options['fabric'];
    delete this.options['util'];
  },
  klasses: [],
  getKlass: function getKlass(type) {
    // capitalize first letter only
    var klassName = fabric.util.string.camelize(type.charAt(0).toUpperCase() + type.slice(1));
    return this.klasses[klassName] || fabric[klassName];
  },
  setPrototypes: function setPrototypes(prototypes) {

    var _prototypes = fabric.util.object.deepExtend({}, this.prototypes, prototypes);

    this.prototypes = _prototypes;

    if (_prototypes.eventListeners) {
      _prototypes.eventListeners.$extend = 'array';
    }

    for (var klassName in _prototypes) {
      var _proto = _prototypes[klassName];

      for (var j in _proto) {
        if (_proto[j] && _proto[j]["$extend"]) {
          var _extend = _proto[j]["$extend"];
          if (_extend == "array") {
            _proto[j] = fabric.util.object.extendArraysObject(fabric[klassName].prototype[j], _proto[j]);
          } else if (_extend == "deep") {
            _proto[j] = fabric.util.object.deepExtend(fabric[klassName].prototype[j], _proto[j]);
          } else {
            _proto[j] = fabric.util.object.extend(fabric[klassName].prototype[j], _proto[j]);
          }
          delete _proto[j]["$extend"];
        }
      }

      if (_proto["$super"]) {
        var _superklass = fabric[_proto["$super"]];
        if (!_superklass) {
          console.warn('class ' + _proto["$super"] + ' doent exists ');
          continue;
        }
        delete _proto["$super"];
        _proto.type = fabric.util.string.toDashed(klassName);

        var _fromObject = _proto.fromObject || _superklass.fromObject;
        delete _proto.fromObject;
        var _klass = this.klasses[klassName] = fabric.util.createClass(_superklass, _proto);
        _klass.fromObject = _fromObject.bind(_klass);
      }

      //   if (klassName.actions && _proto.actions.constructor == Function) {
      //     fabric[klassName].prototype.actions = _proto.actions.call(fabric[klassName].prototype)
      //   }
    }

    if (_prototypes.Editor) {
      fabric.util.object.deepExtend(this, _prototypes.Editor);
    }

    // delete this.options['prototypes'];

    if (this.actions && this.actions.constructor == Function) {
      this.actions = this.actions.call(this);
    }
  },
  _populateWithDefaultProperties: function _populateWithDefaultProperties(target, options) {

    if (!target.disableDefaultProperties) {

      fabric.util.object.defaults(options, this.getDefaultProperties(target, options));

      for (var key in options) {
        var value = options[key];
        if (key[0] == "+") {
          var _key = key.substr(1);
          var _arr = target.get(_key);
          if (_arr instanceof Array) {
            _arr = _arr.slice().concat(value);
          } else {
            _arr = fabric.util.object.extend({}, _arr, value);
          }
          options[_key] = _arr;
          delete options[key];
        }
      }
    }
  },
  eventListeners: fabric.util.object.extendArraysObject(fabric.Editor.prototype.eventListeners, {
    "created": function created(e) {
      if (e.options.prototypes && e.options.prototypes.Editor) {
        fabric.util.object.defaults(e.options, e.options.prototypes.Editor);
      }
    },
    "entity:created": function entityCreated(e) {
      e.target.application = this;
      this._populateWithDefaultProperties(e.target, e.options);
      delete e.options.type;
      delete e.options.application;
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.ActionsMixin = {
  setActions: function setActions(actions) {
    for (var i in actions) {
      actions[i].id = i;
    }
    this.actions = fabric.util.object.deepExtend({}, this.__proto__.actions, actions);
  },
  _getActionValue: function _getActionValue(property) {
    var object = this;
    var defaultProperties = void 0;
    do {
      if (!defaultProperties) {
        var actions = this.application.getDefaultProperties("Object").actions;
        defaultProperties = actions && actions[property];
      }
      if (object.actions && object.actions[property]) {
        return fabric.util.object.extend({}, object.actions[property], defaultProperties);
      }
    } while (object = object.__proto__);
    return fabric.util.object.extend({}, defaultProperties);
  }
};

fabric.util.object.extend(fabric.Editor.prototype, {
  _getActionValue: function _getActionValue(property) {
    return this.actions[property];
  },
  setActions: function setActions(actions) {
    for (var klassName in actions) {
      for (var i in actions[klassName]) {
        actions[klassName][i].id = i;
      }
      if (klassName == "Editor") {
        this.actions = fabric.util.object.deepExtend(this.actions, actions[klassName]);
        continue;
      }
      if (!this.prototypes[klassName]) {
        this.prototypes[klassName] = {};
      }
      var proto = this.getKlass(klassName);
      this.prototypes[klassName].actions = fabric.util.object.deepExtend({}, proto && proto.prototype.actions, actions[klassName]);
    }
  },
  actions: {
    save: {
      title: "save project",
      className: 'fa fa-floppy-o',
      action: function action() {
        var data = this.toObject();
        this.save(data);
      }
    },
    addSlide: {
      title: "add slide",
      className: 'fa fa-plus',
      action: function action() {
        var slideData = {};
        var _slide = this.addSlide(slideData);
        _slide.canvas.load(_slide.object);
        this._setActiveSlide(_slide);
      }
    }
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, fabric.ActionsMixin, {
  actions: {
    clear: {
      title: 'Clear',
      className: 'fa fa-trash'
    },
    clearObjects: {
      title: 'Clear All',
      className: 'fa fa-trash'
    },

    /* selectAll: {
       keyCode: 'a',
       ctrlKey: true,
       title: 'Select All',
       type: 'key'
     },*/
    backgroundColor: {
      title: "Set Background Colour",
      type: "color"
    },
    addText: {
      className: 'fa fa-font',
      title: 'Add Text',
      action: function action() {
        this.addText();
      }
    },
    removeSlide: {
      title: "add slide",
      className: 'fa fa-trash-o'
    },
    duplicateSlide: {
      title: "duplicate slide",
      className: 'fa fa-clone'
    }
  }
});

fabric.util.object.extend(fabric.Object.prototype, fabric.ActionsMixin, {
  actions: {
    movement: {
      className: 'fa fa-arrows',
      menu: ["moveUp", "moveDown", "moveLeft", "moveRight"]
    },
    moveUp: {
      className: "fa fa-arrow-up",
      type: "key",
      keyCode: 38
    },
    moveDown: {
      className: "fa fa-arrow-down",
      type: "key",
      keyCode: 40
    },
    moveLeft: {
      className: "fa fa-arrow-left",
      type: "key",
      keyCode: 37
    },
    moveRight: {
      className: "fa fa-arrow-right",
      type: "key",
      keyCode: 39
    },
    boundingRect: {
      type: 'label',
      template: '<dt>L:</dt><dd class="{leftClass}" title="{left}">{roundLeft}</dd><dt>T:</dt><dd class="{topClass}"  title="{top}">{roundTop}</dd><dt>R:</dt><dd class="{rightClass}" title="{right}">{roundRight}</dd><dt>B:</dt><dd class="{bottomClass}"  title="{bottom}">{roundBottom}</dd>',
      value: {
        observe: "modified scaling moving rotating",
        get: function get() {
          var _rect = this.getBoundingRect();

          if (this.movementLimits) {

            if (this.movementLimits == this.canvas) {
              var _v = this.canvas.viewportTransform;
              var _mlr = {
                left: _v[4],
                top: _v[5],
                width: (this.canvas.originalWidth || this.canvas.width) * _v[0],
                height: (this.canvas.originalHeight || this.canvas.height) * _v[3],
                right: 0,
                bottom: 0
              };
            } else {
              _mlr = this.movementLimits.getBoundingRect();
            }

            _rect.bottom = this.movementLimits.height - _rect.height;
            var _t = _rect.top - _mlr.top;
            var _l = _rect.left - _mlr.left;
            var _r = _mlr.width - _rect.width - _l;
            var _b = _mlr.height - _rect.height - _t;
          } else {
            _t = _rect.top;
            _l = _rect.left;
            _b = this.canvas.height - _rect.height - _rect.top;
            _r = this.canvas.width - _rect.width - _rect.left;
          }

          return {
            topClass: _t > 0 ? "positive" : _t < 0 ? "negative" : "zero",
            bottomClass: _b > 0 ? "positive" : _b < 0 ? "negative" : "zero",
            leftClass: _l > 0 ? "positive" : _l < 0 ? "negative" : "zero",
            rightClass: _r > 0 ? "positive" : _r < 0 ? "negative" : "zero",
            top: _t,
            left: _l,
            bottom: _b,
            right: _r,
            roundTop: Math.round(_t),
            roundLeft: Math.round(_l),
            roundBottom: Math.round(_b),
            roundRight: Math.round(_r)
          };
        }
      }
    },
    left: {
      type: 'number',
      title: 'left',
      value: {
        set: function set(val) {
          this.left = val;
          this.fire("modified");
          this.canvas.fire("object:modified", { target: this });
          this.canvas.renderAll();
        },
        get: function get() {
          return this.left;
        },
        observe: "modified"
      }
    },
    top: {
      type: 'number',
      title: 'top',
      value: {
        set: function set(val) {
          this.top = val;
          this.fire("modified");
          this.canvas.fire("object:modified", { target: this });
          this.canvas.renderAll();
        },
        get: function get() {
          return this.top;
        },
        observe: "modified"
      }
    },
    position: {
      title: 'position',
      type: 'menu',
      menu: ["left", "top"]
    },
    dimensions: {
      title: 'dimensions',
      type: 'menu',
      menu: {
        objectWidth: {
          type: 'number',
          title: 'width',
          value: {
            set: function set(val) {
              this.saveState();
              this.dimensionsWidthValue = val;
              this.scaleToWidth(val * this.canvas.getZoom());
              // this.canvas.fireModifiedIfChanged(this);
              this.fire("modified", {});
              this.canvas.fire("object:modified", { target: this });
              this.canvas.renderAll();
              delete this.dimensionsWidthValue;
            },
            get: function get() {
              if (this.dimensionsWidthValue) {
                return this.dimensionsWidthValue;
              }
              return Math.round(this.getBoundingRect().width / this.canvas.getZoom());
            },
            observe: "modified"
          }
        },
        objectHeight: {
          type: 'number',
          title: 'height',
          value: {
            set: function set(val) {
              this.saveState();
              this.scaleToHeight(val * this.canvas.getZoom());
              this.dimensionsHeightValue = val;
              this.fire("modified", {});
              this.canvas.fire("object:modified", { target: this });
              this.canvas.renderAll();
              delete this.dimensionsHeightValue;
            },
            get: function get() {
              if (this.dimensionsHeightValue) {
                return this.dimensionsHeightValue;
              }
              return Math.round(this.getBoundingRect().height / this.canvas.getZoom());
            },
            observe: "modified"
          }
        }
      }
    },
    center: {
      className: 'fa fa-bullseye',
      title: 'Center',
      action: function action() {
        this.center();
        this.setCoords();
      }
    },
    flip: {
      className: 'fa fa-arrows-h',
      title: 'flip',
      action: 'flip'
    },
    flop: {
      className: 'fa fa-arrows-v',
      title: 'flop'
    },
    order: {
      className: 'fa fa-exchange fa-rotate-90',
      menu: ["bringForward", "sendBackwards", "bringToFront", "sendToBack"]
    },
    bringForward: {
      title: 'bring forward',
      className: 'fa fa-level-up',
      enabled: '!onTop',
      observe: function observe(cb) {
        this.canvas.on("object:added object:removed object:replaced", cb);
      },
      destroy: function destroy(data) {
        this.canvas.off("object:added object:removed object:replaced", data.enableCallback);
      }
    },
    sendBackwards: {
      title: 'send backwards',
      className: 'fa fa-level-down',
      enabled: '!onBottom',
      observe: function observe(cb) {
        this.canvas.on("object:added object:removed object:replaced", cb);
      },
      destroy: function destroy(data) {
        this.canvas.off("object:added object:removed object:replaced", data.enableCallback);
      }
    },
    bringToFront: {
      title: 'bring to front',
      className: 'fa fa-level-up',
      enabled: '!onTop',
      observe: function observe(cb) {
        this.canvas.on("object:added object:removed object:replaced", cb);
      },
      destroy: function destroy(data) {
        this.canvas.off("object:added object:removed object:replaced", data.enableCallback);
      }
    },
    sendToBack: {
      title: 'send to back',
      className: 'fa fa-level-down',
      enabled: '!onBottom',
      observe: function observe(cb) {
        this.canvas.on("object:added object:removed object:replaced", cb);
      },
      destroy: function destroy(data) {
        this.canvas.off("object:added object:removed object:replaced", data.enableCallback);
      }
    },
    remove: {
      className: 'fa fa-trash',
      title: 'remove',
      key: "Delete"
    },
    duplicate: {
      className: 'fa fa-clone',
      title: 'duplicate'
    },
    fill: {
      type: 'color',
      title: 'fill',
      value: 'fill'
    },
    rotateLeft: {
      className: 'fa fa-rotate-left',
      title: 'rotate Left',
      action: function action() {
        this._normalizeAngle();
        var desiredAngle = (Math.floor(this.angle / 90) - 1) * 90;
        this.rotate(desiredAngle);
        this.canvas.renderAll();
      }
    },
    rotateRight: {
      className: 'fa fa-rotate-right',
      title: 'rotate Right',
      action: function action() {
        this._normalizeAngle();
        var desiredAngle = (Math.floor(this.angle / 90) + 1) * 90;
        this.rotate(desiredAngle);
        this.canvas.renderAll();
      }
    },
    stretch: {
      className: 'fa fa-arrows-alt',
      title: 'stretch',
      action: function action() {
        this._normalizeAngle();
        var _deviation = this.angle % 90;
        this.angle = Math.floor(this.angle / 90) * 90;

        if (_deviation > 45) {
          this.angle += 90;
        }

        var scaleX = void 0,
            scaleY = void 0;

        if (this.angle === 90 || this.angle === 270) {
          scaleX = this.canvas.width / this.height;
          scaleY = this.canvas.height / this.width;
        } else {
          scaleX = this.canvas.width / this.width;
          scaleY = this.canvas.height / this.height;
        }

        this._setOriginToCenter();

        this.set({
          scaleX: scaleX,
          scaleY: scaleY,
          left: this.canvas.width / 2,
          top: this.canvas.height / 2
        });

        this.canvas._restoreOriginXY(this);
        this.setCoords();
        this.canvas.renderAll();
      }
    }
  }
});

fabric.util.object.extend(fabric.Text.prototype, {
  actions: {
    fill: {
      type: 'color',
      title: 'fill',
      value: {
        get: function get() {
          //texture pattern fill fix
          return typeof this.fill === "string" ? this.fill : "transparent";
        },
        set: function set(value) {
          this.setFill(value);
        }
      }
    },
    textBgcolor: {
      type: 'color',
      title: 'bgColor',
      value: 'bgColor'
    },
    textTextbgcolor: {
      type: 'color',
      title: 'textBgColor',
      value: 'textBgColor'
    },
    textBold: {
      type: "checkbox",
      title: 'bold',
      value: 'bold',
      className: 'fa fa-bold'
    },
    textItalic: {
      type: "checkbox",
      title: 'italic',
      value: 'italic',
      className: 'fa fa-italic'
    },
    textUnderline: {
      type: "checkbox",
      title: 'Underline',
      value: 'underline',
      className: 'fa fa-underline'
    },
    textLinethrough: {
      type: "checkbox",
      insert: 'advancedTextStyleTools',
      title: 'Linethrough',
      value: 'linethrough',
      className: 'text-linethrough fa fa-strikethrough'
    },
    textOverline: {
      type: "checkbox",
      insert: 'advancedTextStyleTools',
      title: 'overline',
      value: 'overline',
      className: 'text-overline fa fa-overline'
    },
    textAlign: {
      type: 'options',
      title: 'text align',
      insert: 'textAligmentTools',
      value: "textAlign",
      menu: {
        textAlignCenter: {
          title: 'align center',
          option: 'center',
          className: 'fa fa-align-center'
        },
        textAlignLeft: {
          title: 'align left',
          option: 'left',
          className: 'fa fa-align-left'
        },
        textAlignRight: {
          title: 'align right',
          option: 'right',
          className: 'fa fa-align-right'
        },
        textAlignJustify: {
          title: 'align justify',
          option: 'justify',
          className: 'fa fa-align-justify'
        }
      }
    },
    fontFamily: {
      type: 'fontFamily',
      title: 'font family',
      className: 'fa fa-font',
      value: 'fontFamily',
      data: function data() {
        return this.application.fonts;
      }
    },
    textFontSize: {
      insert: 'textFontSizeTools',
      type: 'number',
      title: 'fontSize',
      value: 'fontSize'
    },
    /*textFont: {
     insert: 'textFontSizeTools',
     type: 'menu',
     title: 'font',
     className: 'fa fa-font',
     menu: {
     textFontSizeDecrease: {
     title: 'decreaseFontSize',
     action: _TEX.decreaseFontSize,
     className: 'fa fa-font font-size-decrease'
     },
     textFontSizeIncrease: {
     title: 'increaseFontSize',
     action: _TEX.increaseFontSize,
     className: 'fa fa-font font-size-increase'
     }
     }
     }*/
    advancedColorsTools: {
      className: 'colors',
      type: 'menu',
      title: 'colors',
      toggled: true,
      menu: ["fill", "textBgcolor", "textTextbgcolor", "fill"]
    },
    textStyle: {
      type: 'menu',
      title: 'text style',
      toggled: true,
      className: 'fa fa-font',
      style: 'generateTextStyle',
      menu: ["textBold", "textItalic", "textUnderline", "textLinethrough", "textOverline", "textAlign", "fontFamily", "textFontSize"]
    }
  }
});

fabric.util.object.extend(fabric.IText.prototype, {
  actions: fabric.util.object.extend({
    enterEditing: {
      insert: 'editTool',
      className: 'fa fa-pencil-square-o',
      title: 'edit'
    }
  }, fabric.Text.prototype.actions)
});

fabric.util.object.extend(fabric.Image.prototype, {
  actions: {
    source: {
      type: 'effect',
      className: 'fa fa-file-image-o',
      title: "source",
      actionParameters: function actionParameters($el, data) {
        data.target.application.createGallery(data.target, $el);
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var StateMixin = {
  _saveStateOverwritten: fabric.Object.prototype.saveState,
  getProperties: function getProperties(properties) {
    var object = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prop = _step.value;

        object[prop] = this["store_" + prop] ? this["store_" + prop]() : this[prop];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return object;
  },
  /**
   * Saves state of an object
   * @param {Object} [options] Object with additional `stateProperties` array to include when saving state
   * @return {fabric.Object} thisArg
   */
  saveState: function saveState(options) {
    var _includeDefaultValues = this.includeDefaultValues;
    if (!_includeDefaultValues) {
      this.includeDefaultValues = true;
    }
    if (fabric.version.indexOf("1.7") === 0) {
      if (!options) {
        this._stateProperties = this.toObject();
      } else if (options.length) {
        this._stateProperties = this.getProperties(options);
      } else {
        this._saveStateOverwritten(options);
      }
    } else {
      this.originalState = this.toObject();
    }
    if (!_includeDefaultValues) {
      this.includeDefaultValues = false;
    }
    return this;
  },

  getModifiedStates: function getModifiedStates() {

    var _originalState = void 0;
    if (fabric.version.indexOf("1.7") === 0) {
      _originalState = this._stateProperties;
    } else {
      _originalState = this.originalState;
    }

    var _counter = 0;
    var states = {
      original: {},
      modified: {}
    };

    var _includeDefaultValues = this.includeDefaultValues;
    if (!_includeDefaultValues) {
      this.includeDefaultValues = true;
    }
    var state = this.toObject();
    if (!_includeDefaultValues) {
      this.includeDefaultValues = false;
    }

    for (var prop in _originalState) {
      if (_originalState[prop] !== state[prop]) {
        if (_originalState[prop] instanceof Object) {
          if (JSON.stringify(_originalState[prop]) === JSON.stringify(state[prop])) {
            continue;
          }
        }
        states.original[prop] = _originalState[prop];
        states.modified[prop] = state[prop];
        _counter++;
      }
    }
    return _counter && states;
  }
};

fabric.util.object.extend(fabric.Object.prototype, StateMixin);

fabric.util.object.extend(fabric.Canvas.prototype, StateMixin, {
  _finalizeCurrentTransform: function _finalizeCurrentTransform() {
    var transform = this._currentTransform,
        target = transform.target;
    if (target._scaling) {
      target._scaling = false;
    }
    target.setCoords();
    this._restoreOriginXY(target);
    target.fire("modified", {});
    this.fire("object:modified", { target: target });
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric, {
  debugTimeout: 0
});

fabric.StaticCanvas.prototype.enableConsoleDebugging = function () {
  window.canvas = this;
  this.on("object:selected", function (e) {
    window.target = e.target;
  });
  this.on("selection:updated", function (e) {
    window.target = e.target;
  });
  this.on("selection:cleared", function (e) {
    window.target = null;
  });
  this.on("selection:created", function (e) {
    window.target = e.target;
  });
};

fabric.StaticCanvas.prototype.setDebug = function (val) {
  if (val) {
    this.enableConsoleDebugging();
  }
};

fabric.Editor && fabric.util.object.extend(fabric.Editor.prototype, {
  logEvents: fabric.Object.prototype.logEvents = function eventsLogger(options) {
    var _counter = {};
    for (var i in options) {
      _counter[i] = 0;
      this.on(options[i], function (i, event) {
        console.log(i + " " + ++_counter[i], event);
      }.bind(this, i));
    }
  },
  setDebug: function setDebug(value) {
    fabric.debug = value;
    this.on("ready", function () {
      this.enableDebugging();
    });
  },

  enableDebugging: function enableDebugging() {
    if (fabric.debug) {

      var _operand = "color: #2EC06C; font-style: italic;";
      console.info("debug enabled. (use %capp%c, %cproject%c, %ccanvas%c, %ctarget%c in console)", _operand, "color: #202020", _operand, "color: #202020", _operand, "color: #202020", _operand, "color: #202020");

      window[fabric.debug] = this;
      window.canvas = this.canvas;
      window.target = null;

      this.on("target:changed", function () {
        window.target = this.target;
      });
      this.on("slide:changed", function (e) {
        window.canvas = e.canvas;
      });
    }
  }
});

fabric.Object.prototype.debug = function (noBorders) {
  var canvas = document.createElement("canvas");
  canvas.width = noBorders ? this.width : this.width + 2;
  canvas.height = noBorders ? this.height : this.height + 2;

  var ctx = canvas.getContext('2d');
  if (!noBorders) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(0, 0, this.width + 2, this.height + 2);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(0, 0, this.width + 2, this.height + 2);
  }
  ctx.translate(this.width / 2 + 1, this.height / 2 + 1);
  var _clipTo = this.clipTo;
  delete this.clipTo;
  this.render(ctx, true);
  this.clipTo = _clipTo;
  window.open(canvas.toDataURL(), "_blank");
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Canvas.prototype, {
  /**
   * makes canvas responsible. Canvas will be scaled to 100% of its container size
   */
  stretchable: false,
  _onResize: function _onResize() {
    if (this.stretchable) {
      if (!this.wrapperEl.parentNode) return;
      // if (canvas.virtual) return;
      var _parent = $(this.wrapperEl.parentNode);

      var _offset = $(this.wrapperEl).position();
      var _margin = this.application && this.application.widthMargin || 0;
      var _w = _parent.width() - _margin,
          _h = _parent.height();
      if (this.application && this.application.onResize) {
        this.application.onResize({
          width: _w,
          height: _h
        }, {
          width: this.originalWidth,
          height: this.originalHeight
        });
        this.calcOffset();
      } else {
        this.setDimensions({
          width: _w /*- _offset.left*/ - _margin,
          height: _h /*- _offset.top*/
        });
      }
    } else {
      this.calcOffset();
    }
  },
  setStretchable: function setStretchable(val) {
    this.stretchable = val;
    this._onResize();
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

configurationProperties: [];

fabric.Editor.prototype.configurationProperties.push("templates");

fabric.util.object.extend(fabric.Editor.prototype, {
  setTemplates: function setTemplates(value) {
    this.templates = value;
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  eventListeners: fabric.util.object.extendArraysObject(fabric.Canvas.prototype.eventListeners, {
    "loading:begin": function loadingBegin(e) {
      this._applyTemplate(e.options);
    }
  })
});

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  eventListeners: fabric.util.object.extendArraysObject(fabric.StaticCanvas.prototype.eventListeners, {
    "loading:begin": function loadingBegin(e) {
      this._applyTemplate(e.options);
    }
  }),

  _applyTemplate: function _applyTemplate(options) {
    var val = options.template;
    if (val) {
      var tpl = this.getTemplate(val);
      fabric.util.object.extend(options, tpl.data);
      if (tpl.data.width) {
        options.originalWidth = tpl.data.width;
      }
      if (tpl.data.height) {
        options.originalHeight = tpl.data.height;
      }
    }
  },
  /*tTemplate: function(template){
     this.template = template;
    if(!template)return;
     this.setWidth(this.slideWidth || template.width);
    this.setHeight(this.slideHeight || template.height);
    this.originalHeight = this.height;
    this.originalWidth = this.width;
     this.set(fabric.util.object.rearrange(template,["areas","helpers","offsets"]));
     this._update_clip_rect();
    this._update_background_overlay_image("background");
    this.fire("modified",{type: "template"});
    this.renderAll();
  },*/
  // setTemplate: function(value){
  //   this.template = value;
  // },
  //-------------------------------------------------------------------------------
  getTemplate: function getTemplate(id) {
    return fabric.util.object.findWhere(this.application.templates, { id: id });
  },
  updateSlideTemplate: function updateSlideTemplate(slide) {
    slide.canvas.setTemplate(slide.canvas.template);
    this.canvas.template = slide.canvas.template;
    if (this.activeSlide == slide) {
      this.canvas.setTemplate(slide.canvas.template);
    }
  },
  updateTemplate: function updateTemplate(template) {
    for (var i in this.slides) {
      if (this.slides[i].canvas.template == template) {
        this.updateSlideTemplate(this.slides[i]);
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/**
 * specific order functions. Allow to move object only within object`s layer
 */
fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  _toFront: function _toFront(obj) {
    if (obj.layer) {
      var layerIndex = this._layers.indexOf(obj.layer);
      for (var i = 0; i < this._objects.length; i++) {
        if (this._objects[i].layer && this._layers.indexOf(this._objects[i].layer) > layerIndex) {
          break;
        }
      }
      this._objects.splice(i, 0, obj);
    } else {
      this._objects.push(obj);
    }
  },
  _toBack: function _toBack(obj) {
    if (obj.layer) {
      var layerIndex = this._layers.indexOf(obj.layer);
      for (var i = this._objects.length; i--;) {
        if (this._objects[i].layer && this._layers.indexOf(this._objects[i].layer) < layerIndex) {
          this._objects.splice(i + 1, 0, obj);
          return;
        }
      }
    }

    this._objects.unshift(obj);
  },
  add: function add() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var obj = _step.value;

        this._toFront(obj);

        if (this._onObjectAdded) {
          this._onObjectAdded(obj);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.renderOnAddRemove && this.renderAll();
    return this;
  },

  /**
   * Moves an object or the objects of a multiple selection
   * to the bottom of the stack of drawn objects
   * @param {fabric.Object} object Object to send to back
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  sendToBack: function sendToBack(object) {
    if (!object) {
      return this;
    }
    var activeGroup = this._activeGroup,
        i,
        obj,
        objs;
    if (object === activeGroup) {
      objs = activeGroup._objects;
      for (i = objs.length; i--;) {
        obj = objs[i];
        fabric.util.removeFromArray(this._objects, obj);
        this._objects.unshift(obj);
      }
    } else {
      fabric.util.removeFromArray(this._objects, object);
      this._toBack(object);
      this.fire("object:replaced", { target: object });
    }
    return this.renderAll && this.renderAll();
  },

  /**
   * Moves an object or the objects of a multiple selection
   * to the top of the stack of drawn objects
   * @param {fabric.Object} object Object to send
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  bringToFront: function bringToFront(object) {
    if (!object) {
      return this;
    }
    var activeGroup = this._activeGroup,
        i,
        obj,
        objs;
    if (object === activeGroup) {
      objs = activeGroup._objects;
      for (i = 0; i < objs.length; i++) {
        obj = objs[i];
        fabric.util.removeFromArray(this._objects, obj);
        this._objects.push(obj);
      }
    } else {
      fabric.util.removeFromArray(this._objects, object);

      this._toFront(object);
      this.fire("object:replaced", { target: object });
    }
    return this.renderAll && this.renderAll();
  }
});

fabric.util.object.extend(fabric.Object.prototype, {
  onTop: function onTop() {
    var objs = this.canvas._objects;
    var index = objs.indexOf(this);
    if (index === objs.length - 1) {
      return true;
    } else if (this.layer) {
      // If above object is on another layer we could not bring our object forward
      if (objs[index + 1].layer && objs[index + 1].layer != this.layer) {
        return true;
      }
    }
    return false;
  },
  onBottom: function onBottom() {
    var objs = this.canvas._objects;
    var index = objs.indexOf(this);
    if (index === 0) {
      return true;
    } else if (this.layer) {
      // If above object is on another layer we could not bring our object forward
      if (objs[index - 1].layer && objs[index - 1].layer != this.layer) {
        return true;
      }
    }
    return false;
  },

  /**
   * Moves an object down in stack of drawn objects
   * @param {Boolean} [intersecting] If `true`, send object behind next lower intersecting object
   * @return {fabric.Object} thisArg
   * @chainable
   */
  sendBackwards: function sendBackwards(intersecting) {
    if (this.group) {
      fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, intersecting);
    } else {
      this.canvas.sendBackwards(this, intersecting);
      this.canvas.fire("object:replaced", { target: this });
    }
    return this;
  },


  /**
   * Moves an object up in stack of drawn objects
   * @param {Boolean} [intersecting] If `true`, send object in front of next upper intersecting object
   * @return {fabric.Object} thisArg
   * @chainable
   */
  bringForward: function bringForward(intersecting) {
    if (this.group) {
      fabric.StaticCanvas.prototype.bringForward.call(this.group, this, intersecting);
    } else {
      this.canvas.bringForward(this, intersecting);
      this.canvas.fire("object:replaced", { target: this });
    }
    return this;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

{

  /*
   fabric.Image.filters.Redify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
   type: 'Redify',
   applyTo: function (canvasEl) {
   var context = canvasEl.getContext('2d'),
   imageData = context.getImageData(0, 0,
   canvasEl.width, canvasEl.height),
   data = imageData.data;
   for (var i = 0, len = data.length; i < len; i += 4) {
   data[i + 1] = 0;
   data[i + 2] = 0;
   }
   context.putImageData(imageData, 0, 0);
   }
   });
   fabric.Image.filters.Redify.fromObject = function (object) {
   return new fabric.Image.filters.Redify(object);
   };
   */

  fabric.Image.filters.Sharpen = fabric.util.createClass(fabric.Image.filters.Convolute, {
    type: 'Sharpen',
    initialize: function initialize(options) {
      options = options || {};

      this.opaque = options.opaque;
      this.matrix = options.matrix || [0, -1, 0, -1, 5, -1, 0, -1, 0];
    }
  });
  fabric.Image.filters.Sharpen.fromObject = function (object) {
    return new fabric.Image.filters.Sharpen(object);
  };

  fabric.Image.filters.Blur = fabric.util.createClass(fabric.Image.filters.Convolute, {
    type: 'Blur',
    initialize: function initialize(options) {
      options = options || {};

      var _v = 1 / 9;
      this.opaque = options.opaque;
      this.matrix = options.matrix || [_v, _v, _v, _v, _v, _v, _v, _v, _v];
    }
  });
  fabric.Image.filters.Blur.fromObject = function (object) {
    return new fabric.Image.filters.Blur(object);
  };

  fabric.Image.filters.Emboss = fabric.util.createClass(fabric.Image.filters.Convolute, {
    type: 'Emboss',
    initialize: function initialize(options) {
      options = options || {};

      this.opaque = options.opaque;
      this.matrix = options.matrix || [1, 1, 1, 1, 0.7, -1, -1, -1, -1];
    }
  });
  fabric.Image.filters.Emboss.fromObject = function (object) {
    return new fabric.Image.filters.Emboss(object);
  };

  fabric.Image.filters.Mask.prototype.maskFilter = true;

  var prototypeOptions = {
    Brightness: {
      "brightness": { value: 100, min: 0, max: 255 }
    },
    Noise: {
      "noise": { value: 100, min: 0, max: 1000 }
    },
    Convolute: {
      "opaque": { value: true, type: "boolean" },
      "matrix": { value: [1, 1, 1, 1, 1, 1, 1, 1, 1], type: "matrix" }
    },
    Blur: {},
    Sharpen: {},
    Emboss: {},
    Multiply: {
      "color": { type: 'color', value: "#F0F" }
    },
    Pixelate: {
      "blocksize": { value: 4, min: 2, max: 20 }
    },
    Tint: {
      "color": { type: 'color', value: "#3513B0" },
      "opacity": { value: 1, min: 0, max: 1, step: 0.1 }
    },
    Mask: {
      mask: {
        type: 'image',
        value: {
          src: "photos/explosion.png"
        }
      },
      channel: { value: 0 }
    },
    Blend: {
      "color": { type: 'color', value: "#3513B0" },
      "mode": {
        value: "add",
        options: [{ value: "add", title: "Add" }, { value: "diff", title: "Diff" }, { value: "subtract", title: "Subtract" }, { value: "multiply", title: "Multiply" }, { value: "screen", title: "Screen" }, { value: "lighten", title: "Lighten" }, { value: "darken", title: "Darken" }]
      }
    }
  };

  for (var i in prototypeOptions) {
    fabric.Image.filters[i].prototype.options = prototypeOptions[i];
  }
}

fabric.Image.getFiltersList = function (el) {

  el = el || fabric.Image.prototype;
  var filterList = [];
  for (var i in el.availableFilters) {
    var _f = fabric.Image.filters[el.availableFilters[i]];

    var _data = {
      type: el.availableFilters[i]
    };
    if (_f.prototype.custom) {
      if (!el.customFilters) {
        continue;
      }
    }
    if (_f.prototype.maskFilter) {
      if (!el.maskFilter) {
        continue;
      }
    }
    if (_f.prototype.caman) {
      if (!el.camanFilters) {
        continue;
      }
      _data.caman = true;
    } else {
      if (!el.fabricFilters) {
        continue;
      }
    }
    if (_f.prototype.options) {
      _data.options = fabric.util.object.clone(_f.prototype.options);
    }
    _data.text = _f.prototype.title || el.availableFilters[i];

    filterList.push(_data);
  }
  return filterList;
};

fabric.util.object.extend(fabric.Image.prototype, {
  camanFilters: false,
  fabricFilters: true,
  customFilters: false,
  maskFilter: false,
  getFiltersData: function getFiltersData() {
    var _filters = fabric.Image.getFiltersList(this);
    for (var i in this.filters) {
      var _f = fabric.util.object.findWhere(_filters, { type: fabric.util.string.capitalize(this.filters[i].type) });
      if (_f) {
        _f.enabled = true;
      }
    }
    return _filters;
  },
  availableFilters: [
  //fabricJS
  "Grayscale", "Sepia", "Sepia2", "Invert", "Blur", "Sharpen", "Emboss", "Blend", "Tint", "Multiply",
  //"Convolute",
  "Noise", "Brightness", "Pixelate", "GradientTransparency", "Mask"],
  getFilter: function getFilter(filterName) {
    filterName = fabric.util.string.uncapitalize(filterName);
    for (var i in this.filters) {
      if (fabric.util.string.uncapitalize(this.filters[i].type) === filterName) {
        return this.filters[i];
      }
    }
    return false;
  },
  setFilter: function setFilter(filter) {

    var _old_filter = false;
    if (filter.replace) {
      this.filters = [];
    } else {
      _old_filter = fabric.util.object.findWhere(this.filters, { type: filter.type });
      _old_filter = _old_filter && _old_filter.toObject() || false;
    }

    if (filter.type) {
      var _type = fabric.util.string.capitalize(filter.type, true);
      var _new_filter = filter.options && fabric.util.object.clone(filter.options);
    } else {
      _type = false;
      _new_filter = false;
    }

    /* this.project.history.add({
     data:   [$.extend(true, {}, this.data)],
     slide:  this.slide,
     object: this,
     redo:   filter,
     undo:   _old_filter ,
     type:   "filter",
     undoFn: function(action){
     action.object._set_filter(action.undo);
     },
     redoFn:  function(action){
     action.object._set_filter(action.redo);
     }
     });
     */
    this._set_filter(_type, _new_filter, _old_filter);
  },

  _set_filter: function _set_filter(_type, _new_filter) {

    if (_type) {
      var _old_filter = this.getFilter(_type);
    }

    if (_old_filter && _new_filter) {
      for (var i in _new_filter) {
        _old_filter[i] = _new_filter[i];
      }
    } else if (_old_filter && !_new_filter) {
      this.filters.splice(this.filters.indexOf(_old_filter), 1);
    }
    if (!_old_filter && _new_filter) {
      this.filters.push(new fabric.Image.filters[_type](_new_filter));
    }
    this.applyFilters(this.canvas.renderAll.bind(this.canvas));
  },

  /**
   * @override
   * Applies filters assigned to this image (from "filters" array)
   * @method applyFilters
   * @param {Function} callback Callback is invoked when all filters have been applied and new image is generated
   * @param {Array} filters to be applied
   * @param {fabric.Image} imgElement image to filter ( default to this._element )
   * @param {Boolean} forResizing
   * @return {CanvasElement} canvasEl to be drawn immediately
   * @chainable
   */
  applyFilters: function applyFilters(callback, filters, imgElement, forResizing) {

    filters = filters || this.filters;
    imgElement = imgElement || this._originalElement;

    if (!imgElement) {
      return;
    }

    var replacement = fabric.util.createImage(),
        retinaScaling = this.canvas ? this.canvas.getRetinaScaling() : fabric.devicePixelRatio,
        minimumScale = this.minimumScaleTrigger / retinaScaling,
        _this = this,
        scaleX,
        scaleY;

    if (filters.length === 0) {
      this._element = imgElement;
      callback && callback(this);
      return imgElement;
    }

    var canvasEl = fabric.util.createCanvasElement();
    canvasEl.width = imgElement.naturalWidth; //overridden
    canvasEl.height = imgElement.naturalHeight; //overridden
    canvasEl.getContext('2d').drawImage(imgElement, 0, 0, imgElement.naturalWidth, imgElement.naturalHeight);

    filters.forEach(function (filter) {
      if (!filter) {
        return;
      }
      if (forResizing) {
        scaleX = _this.scaleX < minimumScale ? _this.scaleX : 1;
        scaleY = _this.scaleY < minimumScale ? _this.scaleY : 1;
        if (scaleX * retinaScaling < 1) {
          scaleX *= retinaScaling;
        }
        if (scaleY * retinaScaling < 1) {
          scaleY *= retinaScaling;
        }
      } else {
        scaleX = filter.scaleX;
        scaleY = filter.scaleY;
      }
      filter.applyTo(canvasEl, scaleX, scaleY);
      if (!forResizing && filter.type === 'Resize') {
        _this.width *= filter.scaleX;
        _this.height *= filter.scaleY;
      }
    });

    /** @ignore */
    replacement.width = canvasEl.width;
    replacement.height = canvasEl.height;
    if (fabric.isLikelyNode) {
      replacement.src = canvasEl.toBuffer(undefined, fabric.Image.pngCompression);
      // onload doesn't fire in some node versions, so we invoke callback manually
      _this._element = replacement;
      !forResizing && (_this._filteredEl = replacement);
      callback && callback(_this);
    } else {
      replacement.onload = function () {
        _this._element = replacement;
        !forResizing && (_this._filteredEl = replacement);
        callback && callback(_this);
        replacement.onload = canvasEl = null;
      };
      replacement.src = canvasEl.toDataURL('image/png');
    }
    return canvasEl;
  },

  actions: fabric.util.object.extend(fabric.Image.prototype.actions, {
    filters: {
      title: "фильтр",
      itemClassName: "filters-selector",
      className: "fa fa-filter",
      type: "select",
      dropdown: {
        theme: "toolbar-filters-selector",
        previewWidth: 0,
        previewHeight: 22,
        templateSelection: function templateSelection(state, container) {
          if (state.any) {
            return state.text;
          }
          return $('<span><span class="color-span" style="background-color:' + state.text + '"></span>' + state.text + '</span>');
        },
        templateResult: function templateResult(state, container, data) {
          var $el = $('<span>' + state.text + '</span>');
          var $canvas = $('<canvas>');
          fabric.util.drawFilter($canvas[0], data.target._originalElement || data.target._element, state.id, {
            width: data.dropdown.previewWidth,
            height: data.dropdown.previewHeight
          });
          $el.prepend($canvas);
          return $el;
        }
      },

      value: {
        set: function set(val, filtersData) {
          var options = false;
          if (val === "none") {
            val = false;
          } else {
            var _f = fabric.util.object.findWhere(filtersData, { id: val });
            _f.enabled = !_f.enabled;
            for (var i in _f.options) {
              if ($.isNumeric(_f.options[i])) {
                _f.options[i] = parseFloat(_f.options[i]);
              }
            }
            if (_f.enabled) {
              options = {};
              for (var i in _f.options) {
                options[i] = _f.options[i].value;
              }
            }
          }
          this.setFilter({
            type: val,
            options: options,
            replace: true
          });
        },
        get: function get() {
          return this.filters.length ? fabric.util.string.capitalize(this.filters[0].type, true) : "none";
        },
        options: function options() {

          var _filters = this.getFiltersData();
          for (var i in _filters) {
            _filters[i].id = _filters[i].type;
          }
          return [{
            id: 'none',
            text: 'original',
            enabled: !this.filters || !this.filters.length
          }].concat(_filters);
        }
      }
    }
  })
});

//
// fabric.Image.filterManager = {
//
//   //hide: function(object){
//   //
//   //},
//   show: function (object) {
//     this.activeObject = object;
//     this.fire('show', object);
//     this.on('target:changed', object)
//   }
// // };


// fabric.util.observable(fabric.Image.filterManager);

fabric.util.drawFilter = function (element, src, filterName, options) {
  if (src.constructor === String) {
    fabric.util.loadImage(src, function (el) {
      fabric.util._drawFilter(element, el, filterName, options);
    });
  } else {
    fabric.util._drawFilter(element, src, filterName, options);
  }
};

fabric.util._drawFilter = function (element, el, filterName, options) {

  var ctx = element.getContext("2d");
  if (options) {
    if (options.width && options.height) {
      element.width = options.width;
      element.height = options.height;
    } else if (options.width) {
      element.width = options.width;
      element.height = options.width * (el.height / el.width);
    } else if (options.height) {
      element.height = options.height;
      element.width = options.height * (el.width / el.height);
    }
  }

  ctx.drawImage(el, 0, 0, element.width, element.height);

  if (!filterName || filterName == "none") return;
  filterName = fabric.util.string.capitalize(filterName, true);

  if (fabric.Image.filters[filterName]) {
    var _filter = new fabric.Image.filters[filterName]();
  } else {
    var _filter = fabric.Image.filters[filterName].create({});
  }

  //var _filter = new fabric.Image.filters[filterName];
  if (_filter) {
    var _fo = fabric.Image.filters[filterName].prototype.options;
    var filterOptions = {};
    for (var i in _fo) {
      filterOptions[i] = _fo[i].value;
    }
    fabric.util.object.extend(_filter, filterOptions);
    _filter.imageData = ctx.getImageData(0, 0, element.width, element.height);
    _filter.applyTo(element);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/*
export interface GalleryData : {
 target: fabricjs object
}
*/

fabric.util.object.extend(fabric.Editor.prototype, {
  galleries: null,
  /**
   *
   *
    draggableArea: ".main_container",
   photo: config.cardType === CARD_TYPES.PHOTO || config.cardType === CARD_TYPES.BLANK && {
        container: "photos-gallery",
        elements: config.photosGallery,
        mapper: function (val) {
          return {
            preview: "image",
            type: "photo",
            src: config.photosPath + val
          }
        },
        options: {
          itemClass: "prevClose",
          removeButtonTemplate: '<span class="fa fa-close closeIMG">',
          removable: true
        }
      },
    * @param selectedData
   */
  setGalleries: function setGalleries(options) {
    if (options.draggableArea) {
      this.draggableArea = options.draggableArea;
      delete options.draggableArea;
    }
    this.galleries = [];
    for (var i in options) {
      var go = options[i];
      if (!go) {
        continue;
      }
      this.galleries[i] = this.createGallery(go.container, fabric.util.object.map(go.elements, go.mapper), go.options);
    }
  },

  // setElementFromMenu: function (selectedData) {
  //   this.canvas.createImageObject(selectedData.image, this.uploadClass);
  // };
  /*createGallery: function (target, $el, options) {
    if ($el.constructor === String) {
      $el = $("#" + $el);
    }
    options = options || {};
     if (target.galleryCategory) {
      options.category = target.galleryCategory;
    }
     $el.empty();
    var library = this.getLibraryElements(options);
      this.createElementsList($el, library);
     _.each(library, function (libraryItem) {
      var img = new Image();
      img.src = fabric.util.mediaRoot + libraryItem.src;
       var $img = $(img).width(100).height(100)
        .click(function () {
           var selectedData = {
            image: img,
            data: libraryItem,
            options: options
          };
          target.setElementFromMenu(selectedData);
        });
       $el.append($img);
    });
  },*/
  getFontsLibrary: function getFontsLibrary() {
    return _.map(this.fonts, function (fontName) {
      return {
        fontFamily: fontName,
        fontSize: 25,
        category: "fontFamily",
        role: "fontFamily",
        text: fontName,
        type: "text"
      };
    });
  },
  createGallery: function createGallery($el, library, options) {
    if (!options) {
      options = {};
    }
    options.application = this;
    return new fabric.Gallery($el, options, library);
  }
});

fabric.Gallery = function ($el, options, library) {
  if (options.application) {
    this.application = options.application;
  }
  if ($el.constructor === String) {
    $el = $("#" + $el);
  }
  this.element = $el;
  this.elements = [];
  this.options = this._getElementsListOptions(options);
  this.addElements(library);
};

fabric.Gallery.prototype = {
  // draggableArea: ".ff-container",
  draggableArea: "body",
  imageWidth: 300,
  imageHeight: 150,
  _addCanvasEl: function _addCanvasEl(el, element, innerEl) {
    // element = fabric.util.object.cloneDeep(element);

    var canvasEl = document.createElement("canvas");
    innerEl.width = canvasEl.width = this.imageWidth;
    innerEl.height = canvasEl.height = this.imageHeight;

    var _fake_canvas = new fabric.StaticCanvas(canvasEl, { application: this.application });
    _fake_canvas.clear();

    element.position = "center";

    _fake_canvas.createObject(element, function (_object) {
      var b = _object.getBoundingRect();
      /* _object.set({
         left : 80 - b.width/2 - _object.strokeWidth * 2,
         top : 45 - b.height/2 - _object.strokeWidth * 2
       });*/

      fabric.util.object.extend(element, {
        scaleX: _object.scaleX,
        scaleY: _object.scaleY,
        width: _object.width,
        height: _object.fheight,
        left: _object.left,
        top: _object.top,
        strokeWidth: _object.strokeWidth
      });

      delete element.position;

      _fake_canvas.add(_object);
      _fake_canvas.renderAll();

      innerEl.src = canvasEl.toDataURL();

      delete _object.canvas;
      el[0].data = element;
      el[0].element = _object;
    });
  },
  removeElement: function removeElement(element) {
    element.element.remove();
    var index = this.elements.indexOf(element);
    this.elements.splice(index, 1);
    this.fire("removed", { item: element, target: this, index: index });
    this.application && this.application.fire("gallery:removed", { item: element, target: this, index: index });
  },
  addElements: function addElements(elements) {
    var _this = this;

    elements.forEach(function (element) {
      return _this.add(element);
    });
  },
  _getElementsListOptions: function _getElementsListOptions(options) {

    return fabric.util.object.defaults(options || {}, {
      removable: false,
      draggable: true,
      itemClass: "list-item",
      removeButtonTemplate: '<span class="fa fa-close">',
      activate: function activate(data) {
        var data = fabric.util.object.clone(data);
        if (options.activateOptions && (options.activateOptions.width || options.activateOptions.height)) {
          delete data.width;
          delete data.height;
        } else {
          data.width = $(data.activeElement).width();
          data.height = $(data.activeElement).height();
        }

        fabric.util.object.extend(data, options.activateOptions);
        delete data.left;
        delete data.top;
        var _canvas = this.canvas;

        if (_canvas.target && _canvas.isAccepts(_canvas.target.accepts, data)) {
          _canvas.target.setData(data);
        } else {
          _canvas.setData(data);
        }
      }
    });
  },
  add: function add(element) {
    var _this2 = this;

    var options = this.options;

    var el = $("<li>").addClass(options.itemClass);

    var insertedElement = {
      data: element,
      element: el
    };

    el[0].data = element;

    if (options.element) {
      element = options.element(element);
    }

    if (element.title) {
      var $span = $("<span>").text(element.title).addClass("element-title");
      el.append($span);
    }
    var $innerEl = null;

    if (options.render) {
      $innerEl = options.render(element);
    } else {
      if (element.role === "fontFamily") {
        element.preview = "fontFamily";
      }
      if (element.type === "image" || element.type === "video") {
        if (!element.preview) {
          element.preview = element.type;
        }
        if (!element.role) {
          element.role = element.type;
        }
      }

      switch (element.preview) {
        case "fontFamily":
          $innerEl = $("<span>").css({
            "color": element.fill || fabric.Text.prototype.fill,
            "font-family": element.fontFamily,
            "font-size": element.fontSize
          }).text(element.text);
          break;
        case "image":
          var img = element.image;

          if (!img) {
            var img = new Image();
            img.onload = function () {
              element.width = img.width;
              element.height = img.height;
              element.image = img;
            };
            img.crossOrigin = 'anonymous';
            img.src = fabric.util.getURL(element.src);
          }
          // el[0].element = img;
          el[0].element = element;
          $innerEl = $(img);
          break;
        case "video":
          $innerEl = $("<video>");
          $innerEl[0].crossOrigin = 'anonymous';
          for (var type in element.src) {
            $innerEl.append($("<source>").attr({
              src: fabric.util.mediaRoot + element.src[type],
              type: type
            }));
          }
          el[0].element = $innerEl[0];
          break;
        default:
          $innerEl = $("<img>");
          this._addCanvasEl(el, element, $innerEl[0]);
      }
    }
    if ($innerEl.constructor == Array) {
      var _span = $("<span>");
      _span.append($innerEl);
      $innerEl = _span;
    }
    el.append($innerEl);

    if (options.removable) {
      var _span = $(this.options.removeButtonTemplate);
      _span.click(this.removeElement.bind(this, insertedElement));
      el.append(_span);
    }

    if (options.draggable) {
      $innerEl.draggable({
        draggable: "helper",
        droppable: ".canvas-container",
        ngModel: element,
        onMove: function onMove(data) {
          //todo может быть несколько канвасов
          _this2.application.canvas._onDragMove && _this2.application.canvas._onDragMove(data.$event);
        },
        onDrop: function onDrop(data) {
          //todo может быть несколько канвасов
          _this2.application.canvas._onDrop(data.$event);
        },
        draggableArea: this.draggableArea
      });
    }
    element.activeElement = $innerEl;
    $innerEl.click(options.activate.bind(this.application, element));
    this.element.append(el);

    this.elements.push(insertedElement);
  }
};
fabric.util.observable(fabric.Gallery.prototype);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/**
 * Aligment library for FabricJS
 *
 *
 *
 * @author Denis Ponomarev
 * @email den.ponomarev@gmail.com
 */

fabric.GridSnapper = function (canvas, options) {
  this.canvas = canvas;

  this.rect = fabric.util.getRect(canvas.width, canvas.height, canvas.offsets);

  for (var prop in options) {
    this[prop] = options[prop];
  }

  this.createAligmentLines(canvas);

  // for(let i in this.canvas._objects){
  //   this.applySnap(this.canvas._objects[i]);
  // }

  var _gs = this;

  (this.canvas.wrapperEl || this.canvas.lowerCanvasEl).addEventListener("mousedown", function () {
    window.addEventListener("mouseup", _gs._window_mouse_up.bind(_gs));
  });
};

fabric.util.object.extend(fabric.Object.prototype, {
  griddable: true,
  snapCorners: {
    tl: ["tl", "bl", "br", "tr"],
    bl: ["tl", "bl", "br", "tr"],
    tr: ["tl", "bl", "br", "tr"],
    br: ["tl", "bl", "br", "tr"],
    c: ["c"]
  }
});
fabric.util.object.extend(fabric.Canvas.prototype, {
  gridSize: 25,
  gridColor: 25,
  grid: false,
  snapArea: 3,
  snapping: false,
  setSnapping: function setSnapping(val) {
    if (val) {
      this.on("object:moving", this.gridSnapMove);
      this.on('mouse:up', this.clearSnapping);
      if (this.drawSnapping) {
        this.on('after:render', this._drawSnapping);
      }
    } else {
      this.off("object:moving", this.gridSnapMove);
      this.off('mouse:up', this.clearSnapping);
      if (this.drawSnapping) {
        this.off('after:render', this._drawSnapping);
      }
    }
    this.snapping = val;
  },
  setGrid: function setGrid(val) {
    if (val) {
      this.grid = new fabric.GridSnapper(this);
      this.grid.createGrid();
      this.grid.createGridFrame();
    } else if (this.grid) {
      this.grid.removeGrid();
      this.grid.removeGridFrame();
      this.grid = null;
    }
    this.renderAll();
  },
  clearSnapping: function clearSnapping() {
    this.clearContext(this.contextTop);
    this.snapTo = null;
  },


  /**
   * @param object
   * @returns {{x: (false|{value, corner}|{value, corner, object2, corner2}), y: (false|{value, corner}|{value, corner, object2, corner2})}}
   */
  gridSnapMove: function gridSnapMove(options) {

    if (options.e.shiftKey || !options.target.griddable) {
      return;
    }

    options.target.setCoords();

    var x = this.gridSnapMoveByAxe(options.target, "x"),
        y = this.gridSnapMoveByAxe(options.target, "y");

    this.snapTo = { x: x, y: y };
    this.snapCallback && this.snapCallback(this.snapTo);

    return this.snapTo;
  },
  _get_corner: function _get_corner(object, corner_name) {

    if (corner_name == "c") {
      var p = object.getCenterPoint();
      var _scale = this.getZoom();
      p.x *= _scale;
      p.y *= _scale;
      return p;
    }
    return object.oCoords[corner_name];
  },
  gridSnapMoveByAxe: function gridSnapMoveByAxe(object, axe) {

    var _scale = this.getZoom();
    var _l = void 0,
        _w = void 0,
        _c = void 0,
        _p = void 0;

    if (axe == "x") {
      _l = this.offsets.left;
      _w = this.originalWidth - this.offsets.right - _l;
      _c = object.left;
      _p = "left";
    } else {
      _l = this.offsets.top;
      _w = this.originalHeight - this.offsets.bottom - _l;
      _c = object.top;
      _p = "top";
    }
    var sc = object.snapCorners;

    //supportlines
    for (var corner_name in sc) {
      var corner = this._get_corner(object, corner_name);
      for (var i in this.supportLines) {
        var l = this.supportLines[i];
        var _val = l[axe] + this.rect[_p];
        if (l[axe] && Math.abs(_val - corner[axe]) < this.snapArea) {
          object[_p] = (_val - (corner[axe] - object.oCoords.tl[axe])) / object.canvas.viewportTransform[0];
          return { value: _val, corner: corner_name, object2: l, line: true };
        }
      }
    }

    //guidlines
    for (var _corner_name2 in sc) {
      var _corner = this._get_corner(object, _corner_name2);
      for (var _i in this.guidlines) {
        var _l2 = this.guidlines[_i];
        var _val2 = _l2[axe] * _scale;
        if (_l2[axe] && Math.abs(_val2 - _corner[axe]) < this.snapArea) {
          object[_p] = (_val2 - (_corner[axe] - object.oCoords.tl[axe])) / object.canvas.viewportTransform[0];
          return { value: _val2, corner: _corner_name2, object2: _l2, line: true };
        }
      }
    }

    //grid

    for (var _corner_name3 in sc) {
      var _corner2 = this._get_corner(object, _corner_name3);

      if (this.grid.gridEnabled) {
        var x = (_corner2[axe] - _l + this.snapArea + this.grid._gridOffset[axe]) % this.gridSize;
        if (x < -this.gridSize) return false;
        if (x < this.snapArea * 2) {
          //let _xxx = _c + (corner[axe] - object.oCoords.tl[axe]);
          // if (_xxx > _l && _xxx < _w + _l) {
          object[_p] -= x - this.snapArea;
          return { value: _corner2[axe] - x + this.snapArea, corner: _corner_name3, grid: true };
        }
      }

      if (this.borderEnabled) {
        //grid width/height
        var valX = (_w + this.offsets[_p]) * _scale;
        if (Math.abs(valX - _corner2[axe]) < this.snapArea) {
          object[_p] = (valX - (_corner2[axe] - object.oCoords.tl[axe])) / _scale;
          return { value: valX, corner: _corner_name3, grid: true, corner2: axe == "x" ? "width" : "height" };
        }
        //grid top/left
        var valY = this.offsets[_p] * this.getZoom();
        if (Math.abs(valY - _corner2[axe]) < this.snapArea) {
          object[_p] = (valY - (_corner2[axe] - object.oCoords.tl[axe])) / object.canvas.viewportTransform[0];
          return { value: valY, corner: _corner_name3, grid: true, corner2: _p };
        }
      }
    }

    //other objects
    for (var _obj_index in this._objects) {
      var _obj = this._objects[_obj_index];
      if (!_obj.griddable || _obj == object || !_obj.visible || _obj.hiddenActive) continue;

      for (var _corner_name4 in sc) {
        var _corner3 = this._get_corner(object, _corner_name4);

        for (var j in sc[_corner_name4]) {
          var corner_name_2 = sc[_corner_name4][j];
          var corner_2 = this._get_corner(_obj, corner_name_2);

          if (Math.abs(_corner3[axe] - corner_2[axe]) < this.snapArea) {
            object[_p] = (corner_2[axe] - (_corner3[axe] - object.oCoords.tl[axe])) / object.canvas.viewportTransform[0];
            return { value: corner_2[axe], corner: _corner_name4, object2: _obj, corner2: corner_name_2 };
          }
        }
      }
    }
    return false;
  },
  _drawSnapping: function _drawSnapping() {
    var ctx = this.contextTop,
        snapTo = this.snapTo;
    ctx.strokeStyle = "#ffaaaa";

    if (this._currentTransform && snapTo) {
      this.clearContext(ctx);
    }

    if (!snapTo) return;
    if (snapTo.x) {
      ctx.beginPath();
      if (snapTo.x.object2) {
        var _ic = void 0,
            _c = void 0;
        _c = snapTo.x.object2.oCoords;
        if (snapTo.x.line) {
          ctx.moveTo(_c.mt.x, 0);
          ctx.lineTo(_c.mt.x, this.height);
        } else {

          ctx.moveTo(_c.tl.x, _c.tl.y);
          ctx.lineTo(_c.tr.x, _c.tr.y);
          ctx.lineTo(_c.br.x, _c.br.y);
          ctx.lineTo(_c.bl.x, _c.bl.y);
          ctx.lineTo(_c.tl.x, _c.tl.y);

          if (snapTo.x.corner2 == "c") {
            _ic = snapTo.x.object2.getCenterPoint();
          } else {
            _ic = _c[snapTo.x.corner2];
          }
          if (_ic) {
            ctx.moveTo(_ic.x, _ic.y);
            ctx.arc(_ic.x, _ic.y, 2, 0, 2 * Math.PI);
          }
        }

        var _active = this._activeObject || this._activeGroup;
        _c = _active.oCoords;
        if (snapTo.x.corner == "c") {
          _ic = snapTo.x.object2.getCenterPoint();
        } else {
          _ic = _c[snapTo.x.corner];
        }
        ctx.moveTo(_ic.x, _ic.y);
        ctx.arc(_ic.x, _ic.y, 2, 0, 2 * Math.PI);
      }
      ctx.moveTo(snapTo.x.value, 0);
      ctx.lineTo(snapTo.x.value, this.height);
      ctx.stroke();
    }
    if (snapTo.y) {
      ctx.beginPath();

      if (snapTo.y.object2) {
        var _ic2 = void 0,
            _c2 = void 0;
        _c2 = snapTo.y.object2.oCoords;
        if (snapTo.y.line) {
          ctx.moveTo(0, _c2.ml.y);
          ctx.lineTo(this.width, _c2.ml.y);
        } else {
          ctx.moveTo(_c2.tl.x, _c2.tl.y);
          ctx.lineTo(_c2.tr.x, _c2.tr.y);
          ctx.lineTo(_c2.br.x, _c2.br.y);
          ctx.lineTo(_c2.bl.x, _c2.bl.y);
          ctx.lineTo(_c2.tl.x, _c2.tl.y);
          if (snapTo.y.corner2 == "c") {
            _ic2 = snapTo.y.object2.getCenterPoint();
          } else {
            _ic2 = _c2[snapTo.y.corner2];
          }
          if (_ic2) {
            ctx.moveTo(_ic2.x, _ic2.y);
            ctx.arc(_ic2.x, _ic2.y, 2, 0, 2 * Math.PI);
          }

          var _active2 = this._activeObject || this._activeGroup;
          _c2 = _active2.oCoords;
          if (snapTo.y.corner == "c") {
            _ic2 = snapTo.y.object2.getCenterPoint();
          } else {
            _ic2 = _c2[snapTo.y.corner];
          }
          ctx.moveTo(_ic2.x, _ic2.y);
          ctx.arc(_ic2.x, _ic2.y, 2, 0, 2 * Math.PI);
        }
      }

      ctx.moveTo(0, snapTo.y.value);
      ctx.lineTo(this.width, snapTo.y.value);
      ctx.stroke();
    }
  },
  toggleGrid: function toggleGrid() {
    var val = !this.grid;
    this.processing = true;
    this.setGrid(val);
    this.setSnapping(val);
    this.processing = false;
  },

  actions: fabric.util.object.extend(fabric.Canvas.prototype.actions, {
    toggleGrid: {
      className: 'fa fa-th',
      key: 'i',
      title: 'Grid'
    }
  })
});
fabric.util.object.extend(fabric.Editor.prototype, {
  actions: fabric.util.object.extend(fabric.Editor.prototype.actions, {
    toggleGrid: {
      className: 'fa fa-th',
      key: 'i',
      title: 'Grid',
      action: function action() {
        this.canvas.toggleGrid();
      }
    }
  })
});

fabric.GridSnapper.prototype = {
  //offsets and size of the grid
  rect: null,
  //   {
  //   top: 50,
  //   left: 50,
  //   width: 600,
  //   height: 600
  // },
  /**
   * support lines
   * @value [{
     *  [x: integer],
     *  [y: integer]
     * }]
   */
  supportLines: [],
  /**
   * fabrc objects.
   * @value [klass]
   */
  objects: [],
  //the area in pixels, where object will be snapped to the grid
  //flag
  enabled: true,
  //
  gridEnabled: true,
  borderEnabled: true,
  gridBorder: false,
  //size of the grid
  gridSize: 25,
  /**
   * corners that will be snapped to the grid. This is the name from fabric object oCoords property. ( it is possible to more or less points )
   */

  _window_mouse_up: function _window_mouse_up() {
    this.hideAligmentLines();
    window.removeEventListener('mouseup', this._window_mouse_up);
  },

  // applySnap (obj){
  //   let _gs = this;
  //   //
  //   // this.canvas.on("object:removed",function(e){
  //   //   let i = _gs.canvas._objects.indexOf(e.target);
  //   //   if(i == -1)return;
  //   //   _gs.canvas._objects.splice(i,1);
  //   // });
  //
  //   // obj.on("moving",function(){
  //   //   if(_gs.enabled){
  //   //     _gs.gridSnapMove(this);
  //   //   }
  //   // });
  // },

  creteSupportLines: function creteSupportLines() {
    var rect = this.rect;

    var objs = [];
    for (var i = 0; i < this.supportLines.length; i++) {
      var l = this.supportLines[i];
      objs.push(new fabric.Line(l.x ? [l.x, 0, l.x, rect.height] : [0, l.y, rect.width, l.y], { stroke: 'red' }));
    }

    var support = new fabric.Group(objs, {
      left: rect.left,
      top: rect.top,
      selectable: false,
      evented: false
    });
    this.canvas._helpersObjects.push(support);
    return support;
  },
  removeGridFrame: function removeGridFrame() {
    this.canvas._helpersObjects.splice(this.canvas._helpersObjects.indexOf(this.gridFrame), 1);
    delete this.gridFrame;
  },
  removeGrid: function removeGrid() {

    this.canvas._helpersObjects.splice(this.canvas._helpersObjects.indexOf(this._gridObject), 1);
    delete this._gridObject;
  },
  updateGridSize: function updateGridSize() {

    this.removeGridFrame();
    this.createGridFrame();

    if (this._gridObject) {
      this.removeGrid();
      this.createGrid();
    }
    this.canvas.renderAll();
  },
  createGridFrame: function createGridFrame() {
    var objs = [];

    objs.push(new fabric.Line([0, this.rect.top, this.canvas.width, this.rect.top], {
      stroke: this.canvas.gridColor
    }));
    objs.push(new fabric.Line([0, this.rect.top + this.rect.height, this.canvas.width, this.rect.top + this.rect.height], {
      stroke: this.canvas.gridColor
    }));
    objs.push(new fabric.Line([this.rect.left, 0, this.rect.left, this.canvas.height], {
      stroke: this.canvas.gridColor
    }));
    objs.push(new fabric.Line([this.rect.left + this.rect.width, 0, this.rect.left + this.rect.width, this.canvas.height], {
      stroke: this.canvas.gridColor
    }));

    this.gridFrame = new fabric.Group(objs, {
      selectable: false,
      evented: false
    });
    this.canvas._helpersObjects.push(this.gridFrame);
    return this.gridFrame;
  },

  /**
   * create a set of lines on the canvas
   * @returns {*}
   */
  createGrid: function createGrid() {
    var rect = this.rect,
        size = this.canvas.gridSize,
        objs = [];
    this._gridOffset = {
      y: (size - rect.height % size) / 2,
      x: (size - rect.width % size) / 2
    };

    for (var y = size - this._gridOffset.y; y <= rect.height - 1; y += size) {
      objs.push(new fabric.Line([0, y, rect.width, y], {
        stroke: this.canvas.gridColor
      }));
    }

    for (var x = size - this._gridOffset.x; x <= rect.width - 1; x += size) {
      objs.push(new fabric.Line([x, 0, x, rect.height], {
        stroke: this.canvas.gridColor
      }));
    }

    this._gridObject = new fabric.Group(objs, {
      left: rect.left,
      top: rect.top,
      selectable: false,
      evented: false
    });

    this.canvas._helpersObjects.push(this._gridObject);
    return this._gridObject;
  },

  snapCallback: function snapCallback(snapTo) {
    this.snapTo = snapTo;
  },
  hideAligmentLines: function hideAligmentLines(canvas) {

    if (this.xLine) {
      this.xLine.setVisible(false);
      this.xLine.canvas.renderAll();
    }
    if (this.yLine) {
      this.yLine.setVisible(false);
      this.xLine.canvas.renderAll();
    }
  },
  createAligmentLines: function createAligmentLines() {
    //this.xLine = new fabric.Line([1, 0, 1, this.canvas.height], {
    //    left:0,
    //    stroke: '#40D0FF',
    //    selectable: false,
    //    evented: false,
    //    visible: false
    //});
    //this.yLine = new fabric.Line([0, 1, this.canvas.width, 1], {
    //    top:0,
    //    stroke: '#40D0FF',
    //    selectable: false,
    //    evented: false,
    //    visible: false
    //});
    //
    //this.canvas.add(this.xLine);
    //this.canvas.add(this.yLine);

  },


  //snap to grid by x coordinates
  gridSnapResize: function gridSnapResize(object) {

    this.setCoords();
    var x = this.gridSnapXResize(object),
        y = this.gridSnapYResize(object);
    this.snapTo = { x: x, y: y };
    this.snapCallback && this.snapCallback(this.snapTo);
    return this.snapTo;
  },
  gridSnapXResize: function gridSnapXResize(object) {

    var self = this;

    var _l = self.rect.left,
        _w = self.rect.width;

    var active_corner = canvas._currentTransform.corner;

    var coords = [];
    var is_right = false;
    switch (active_corner) {
      case "tr":
      case "br":
      case "mr":
        is_right = true;
        coords = ["tr", "br"];
        break;
      case "tl":
      case "bl":
      case "ml":
        coords = ["bl", "tl"];
        break;
    }

    var to_radians = Math.PI / 180;
    for (var i in this.snapCorners) {
      var _corner_name = this.snapCorners[i];
      if (coords.indexOf(_corner_name) == -1) continue;
      var corner = object.oCoords[this.snapCorners[i]];

      var x = (corner.x - _l + self.area) % self.gridSize;
      var _line = Math.floor((corner.x - _l + self.area) / self.gridSize) + 1;
      if (x < -self.gridSize) return false;
      if (x < self.area * 2) {
        if (corner.x > _l && corner.x < _w + _l) {

          if (is_right) {
            if (_corner_name == "tr") {
              var _opt = {
                scaleX: object.scaleX * (_line * self.gridSize - object.oCoords.tl.x - _l) / (corner.x - object.oCoords.tl.x)
              };
            }
            if (_corner_name == "br") {
              var _opt2 = {
                scaleX: object.scaleX * (_line * self.gridSize - object.oCoords.bl.x - _l) / (corner.x - object.oCoords.bl.x)
              };
            }
            //if(_corner_name == "mr"){
            //    let opt = {
            //        scaleX: object.scaleX *  (_line * self.gridSize - object.oCoords.ml.x - _l)/(corner.x - object.oCoords.ml.x)
            //    };
            //}
          } else {
            var scale2 = (corner.x + object.width * object.scaleX - ((_line - 1) * self.gridSize + _l)) / object.width;
            //if(_corner_name == "tl"){
            //    let _l = (_line - 1) * self.gridSize + _l;
            //    let _r = object.oCoords.tr.x;
            //    let _w = _r - _l;
            //
            //   let _scale   = _w / (object.width *Math.sin(object.angle *  to_radians ));
            //
            //    opt = {
            //
            //        scaleX: scale2
            //    };
            //}
            //else{

            var _opt3 = {
              left: object.oCoords.tr.x - (object.oCoords.tr.x - object.left) / object.scaleX * scale2,
              scaleX: scale2
            };
            if (_corner_name != "ml") {
              _opt3.top = object.oCoords.tr.y - (object.oCoords.tr.y - object.top) / object.scaleX * scale2;
            }
            //}

          }
          object.set(opt);
          return { value: object.left + (corner.x - object.oCoords.tl.x), corner: _corner_name };
        }
      }
    }
    return false;
  },


  //snap to grid by x coordinates
  gridSnapYResize: function gridSnapYResize(object) {

    var self = this;

    var _l = self.rect.top,
        _w = self.rect.height;

    var active_corner = canvas._currentTransform.corner;

    var coords = [];
    var is_right = false;
    switch (active_corner) {
      //             case "ml":
      //                 coords = ["tl","bl"];
      //                 break;
      //             case "mr":
      //                 is_right = true;
      //                 coords = ["tr","br"];
      //                 break;
      case "tr":
      case "tl":
      case "mt":
        coords = ["tl", "tr"];
        break;
      case "bl":
      case "mb":
      case "br":
        is_right = true;
        coords = ["bl", "br"];
        break;
    }

    for (var i in this.snapCorners) {
      var _corner_name = this.snapCorners[i];
      if (coords.indexOf(_corner_name) == -1) continue;
      var corner = object.oCoords[this.snapCorners[i]];

      var y = (corner.y - _l + self.area) % self.gridSize;
      var _line = Math.floor((corner.y - _l + self.area) / self.gridSize) + 1;
      if (y < -self.gridSize) return false;
      if (y < self.area * 2) {
        if (corner.y > _l && corner.y < _w + _l) {

          if (is_right) {
            if (_corner_name == "bl") {
              var _opt4 = {
                scaleY: object.scaleY * (_line * self.gridSize - object.oCoords.tl.y - _l) / (corner.y - object.oCoords.tl.y)
              };
            }
            if (_corner_name == "br") {
              var _opt5 = {
                scaleY: object.scaleY * (_line * self.gridSize - object.oCoords.tr.y - _l) / (corner.y - object.oCoords.tr.y)
              };
            }
            //if(_corner_name == "mb"){
            //    let opt = {
            //        scaleY: object.scaleY *  (_line * self.gridSize - object.oCoords.tr.y - _l)/(corner.y - object.oCoords.mt.y)
            //    };
            //}
          } else {
            var scale2 = (corner.y + object.width * object.scaleY - ((_line - 1) * self.gridSize + _l)) / object.width;
            var _opt6 = {
              top: object.oCoords.bl.y - (object.oCoords.bl.y - object.top) / object.scaleY * scale2,
              scaleY: scale2
            };
            //if(_corner_name != "mt"){
            //    opt.left =  object.oCoords.bl.y - (object.oCoords.bl.y - object.left)/object.scaleY * scale2;
            //}
          }
          object.set(opt);
          return { value: object.left + (corner.y - object.oCoords.tl.y), corner: _corner_name };
        }
      }
    }
    return false;
  }
};

// WEBPACK FOOTER //
// src/modules/grid.js
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.objectsLibrary = {
  text: {
    title: "Text",
    type: "text",
    text: "Текст"
  },
  iText: {
    title: "IText",
    type: "i-text",
    text: "Текст"
  },
  textbox: {
    title: "Textbox",
    type: "textbox",
    text: "Текст",
    width: 100
  },
  line: {
    type: "line",
    strokeWidth: 5,
    stroke: "black",
    scaleX: 1,
    scaleY: 1,
    x1: 0,
    x2: 100,
    y1: 0,
    y2: 50
  },
  triangle: {
    type: "triangle",
    width: function width(w, h) {
      return Math.min(w, h) - 4;
    },
    height: function height(w, h) {
      return Math.min(w, h) - 4;
    }
  },
  rectangle: {
    type: "rect",
    width: function width(w, h) {
      return Math.min(w, h) - 4;
    },
    height: function height(w, h) {
      return Math.min(w, h) - 4;
    }
  },
  polygon: {
    scaleX: 1,
    scaleY: 1,
    type: "polygon",
    points: function points(w, h) {
      return [{ x: 25, y: 1 }, { x: 31, y: 18 }, { x: 49, y: 18 }, { x: 35, y: 29 }, { x: 40, y: 46 }, { x: 25, y: 36 }, { x: 10, y: 46 }, { x: 15, y: 29 }, { x: 1, y: 18 }, { x: 19, y: 18 }];
    }
  },
  path: {
    "type": "path",
    "path": "m581.077942,2.537359c-2.053223,0.047071 -4.04071,0.188348 -6.108093,0.352907c-33.05542,2.663918 -62.235901,19.640541 -77.057678,44.925953l-7.8573,19.135319c1.698822,-6.633144 4.302979,-13.065384 7.8573,-19.135319c-26.430695,-22.16293 -63.531677,-32.388445 -100.192383,-27.574373c-36.661469,4.788353 -68.503082,24.041758 -85.901978,51.935225c-49.116486,-24.490013 -110.34288,-22.999454 -157.711807,3.860092c-47.369164,26.86068 -72.61673,74.40551 -64.941162,122.38308l5.021355,19.49968c-2.263329,-6.38501 -3.960793,-12.887695 -5.021355,-19.49968l-0.761948,1.798569c-41.179165,3.625244 -74.945375,29.465134 -83.716398,64.059235c-8.771805,34.597748 9.46701,70.085876 45.185621,87.96701l55.776558,10.973114c-19.480217,1.291962 -38.915543,-2.534515 -55.776558,-10.973114c-27.5478,24.96817 -33.888516,61.935303 -15.71492,92.467834c18.173733,30.524719 56.988899,48.110687 97.030457,44.11734l24.339722,-5.21109c-7.827499,2.651611 -15.960983,4.379059 -24.339722,5.21109c22.730042,33.857269 60.428192,58.556244 104.66893,68.383514c44.2491,9.81366 91.240952,4.014771 130.425949,-16.094604c31.96701,40.793823 88.707642,62.217468 145.596313,54.99707c56.902466,-7.219666 103.833984,-41.81427 120.501343,-88.770996l5.781433,-26.239532c-0.863708,8.909546 -2.742249,17.681366 -5.781433,26.239532c39.133301,20.753662 88.353333,21.927307 128.785095,3.049316c40.439819,-18.874084 65.665771,-54.869049 66.036133,-94.078247l-14.495605,-58.580597l-57.105713,-39.630768c44.163452,22.374573 71.992615,56.467255 71.601318,98.211365c52.49707,0.448181 97.103394,-35.956573 117.112427,-77.726288c20.011597,-41.769836 12.443604,-89.396759 -19.864929,-125.164642c13.401184,-26.637695 12.609985,-56.937332 -2.183472,-83.034088c-14.786194,-26.097893 -42.065491,-45.476891 -74.873047,-53.098335c-7.341431,-34.580929 -37.602661,-62.404482 -77.600708,-71.526293c-39.998474,-9.121368 -82.584839,2.123992 -109.364807,28.926123l-16.258179,22.19817c4.157959,-8.018612 9.583923,-15.495213 16.258179,-22.19817c-18.876953,-21.060713 -48.486023,-32.954061 -79.348938,-32.155401l0,0z",
    "width": function width(w, h) {
      return w - 4;
    },
    "height": function height(w, h) {
      return h - 4;
    }
  },
  ellipse: {
    "type": "ellipse",
    "rx": function rx(w, h) {
      return w / 2 - 4;
    },
    "ry": function ry(w, h) {
      return h / 2 - 4;
    }
  },
  circle: {
    type: "circle",
    radius: function radius(w, h) {
      return Math.min(w, h) / 2 - 4;
    }
  }
};

fabric.util.object.extend(fabric.Editor.prototype, {
  getLibraryElements: function getLibraryElements(options) {
    var category = fabric.util.object.findWhere(this.library, { id: options.category });

    var category_items = fabric.util.object.cloneDeep(category.items);

    return fabric.util.object.map(fabric.util.object.cloneDeep(category.items), function (el) {
      return fabric.util.object.defaults(el, category.template);
    });
  },
  /**
   *
   * @param value
   * @param callback
   *
   * @example
   [{
    "id": 5,
    "title": "video",
    "template": {
      "type": "video"
    },
    "items": [
      {
        "src": "video.mpg"
        "height": 360,
        "width": 480
      }]
    }]
   */
  setLibrary: function setLibrary(value, callback) {
    var _this = this;

    fabric.util.data.loadJson(value, function (data) {
      data.forEach(function (category) {
        if (!category.id) {
          category.id = ++fabric.util._idCounter;
        }
      });
      _this.library = data;
      callback();
    });
  },
  getObjectsList: function getObjectsList(w, h) {
    var _lib = [];
    for (var i in fabric.objectsLibrary) {
      console.log(i);
      var o = fabric.util.object.cloneDeep(fabric.objectsLibrary[i]);
      o.id = i;
      _lib.push(o);
      o.title = o.title || o.type;
      if (o.width === 0) o.width = w;
      if (o.height === 0) o.height = h;
      for (var j in o) {
        if (o[j].constructor === Function) {
          o[j] = o[j].call(o, w, h);
        }
      }
    }
    return _lib;
  }
});
fabric.Editor.prototype.configurationProperties.push("library");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric, __dirname) {

fabric.util.mediaRoot = "";
fabric.util.addNoCache = false;

fabric.util._loadImage_overwritten = fabric.util.loadImage;

fabric.util.object.extend(fabric.Editor.prototype, {
  optionsOrder: function () {
    var oo = fabric.Editor.prototype.optionsOrder;
    oo.splice(oo.indexOf("canvasContainer"), 0, "mediaRoot");
    return oo;
  }(),
  setMediaRoot: function setMediaRoot(val) {
    if (val) {
      if (val.indexOf("://" != -1)) {
        fabric.util.mediaRoot = val;
        return;
      }
      var _dirname;
      if (fabric.isLikelyNode) {
        _dirname = __dirname;
      } else {
        _dirname = fabric.util.path.getParentDirectoryUrl(window.location.href);
      }
      var _last = val[val.length - 1];
      if (_last != "/" && _last != "\\") {
        val += "/";
      }
      val = fabric.util.path.resolve(_dirname + val);
      fabric.util.mediaRoot = val;
    }
  }
});

// if(!fabric.isLikelyNode){
//
//   var URL = require('url'),
//     HTTP = require('http'),
//     HTTPS = require('https'),
//     Image = require('canvas').Image;
//
//   /** @private */
//   var request = function (url, encoding, callback) {
//     var oURL = URL.parse(url);
//
//     // detect if http or https is used
//     if ( !oURL.port ) {
//       oURL.port = ( oURL.protocol.indexOf('https:') === 0 ) ? 443 : 80;
//     }
//
//     // assign request handler based on protocol
//     var reqHandler = (oURL.protocol.indexOf('https:') === 0 ) ? HTTPS : HTTP,
//       req = reqHandler.request({
//         hostname: oURL.hostname,
//         port: oURL.port,
//         path: oURL.path,
//         method: 'GET'
//       }, function(response) {
//         var body = '';
//         if (encoding) {
//           response.setEncoding(encoding);
//         }
//         response.on('end', function () {
//           callback(body);
//         });
//         response.on('data', function (chunk) {
//           if (response.statusCode === 200) {
//             body += chunk;
//           }
//         });
//       });
//
//     req.on('error', function(err) {
//       if (err.errno === process.ECONNREFUSED) {
//         fabric.log('ECONNREFUSED: connection refused to ' + oURL.hostname + ':' + oURL.port);
//       }
//       else {
//         fabric.log(err.message);
//       }
//       callback(null);
//     });
//
//     req.end();
//   }
//
//   /** @private */
//   var requestFs = function (path, callback) {
//     var fs = require('fs');
//     fs.readFile(path, function (err, data) {
//       if (err) {
//         fabric.log(err);
//         throw err;
//       }
//       else {
//         callback(data);
//       }
//     });
//   };
//
//   fabric.util.loadImage = function(url, callback, context) {
//
//
//     var img = new Image();
//     img.onerror = function(){
//       console.log("error");
//       callback && callback.call(context, null, true);
//     };
//     img.onload = function(){
//       console.log("success");
//       callback && callback.call(context, img);
//     };
//
//     function createImageAndCallBack(data) {
//       if (data) {
//         img.src = data;
//         // preserving original url, which seems to be lost in node-canvas
//         img._src = url;
//       }
//       else {
//         img = null;
//         callback && callback.call(context, null, true);
//       }
//     }
//
//     if (url && (url instanceof Buffer || url.indexOf('data') === 0)) {
//       img.src = img._src = url;
//     }
//     else if (url && url.indexOf('http') !== 0) {
//       var path = require("path");
//       url = fabric.util.getURL(url);
//       url =   path.resolve(fabric.util.mediaRoot, url);
//       img.src =  url;
//       // requestFs(url, createImageAndCallBack);
//     }
//     else if (url) {
//       request(url, 'binary', createImageAndCallBack);
//     }
//     else {
//       callback && callback.call(context, url);
//     }
//   };
// }else{
fabric.util.loadResources = function (resources, callback, context, crossOrigin) {

  var loadedResources = {};
  var loader = fabric.util.queueLoad(Object.keys(resources).length, function () {
    callback(loadedResources);
  });
  for (var i in resources) {
    (function (i) {
      fabric.util.loadImage(resources[i], function (image) {
        loadedResources[i] = image;
        loader();
      }, context, crossOrigin);
    })(i);
  }
};

fabric.util.loadImage = function (url, callback, context, crossOrigin) {
  url = fabric.util.getURL(url);
  function _check_errors(img) {
    //изображение не было загружено
    if (img) {
      callback.call(this, img);
    } else {
      fabric.errors.push({ type: "image", message: "Image was not loaded" });
      fabric.util._loadImage_overwritten(fabric.media.error, callback, context, crossOrigin || 'Anonymous');
    }
  }

  if (fabric.debugTimeout) {
    setTimeout(fabric.util._loadImage_overwritten.bind(this, url, _check_errors, context, crossOrigin || 'Anonymous'), fabric.debugTimeout);
  } else {
    fabric.util._loadImage_overwritten(url, _check_errors, context, crossOrigin || 'Anonymous');
  }
};

fabric.util.getURL = function (url) {
  if (url.indexOf('blob') !== 0 && url.indexOf('data') !== 0 && url.indexOf('://') == -1 && !url.startsWith('./')) {
    url = fabric.util.mediaRoot + url;
  }
  if (fabric.util.addNoCache && /^(http|https)\:\/\//.test(url)) {
    url += '?no-cache=' + new Date().getTime();
  }
  return url;
};

fabric.util.loadVideo = function (sources, callback, context, crossOrigin) {

  function loadIt(url) {
    video.src = fabric.util.getURL(url);
    video.addEventListener("loadeddata", function () {
      callback(video);
    }, true);
    video.load();
  }

  var video = document.createElement('video');

  //trying to find the most suitable source for current browser
  for (var type in sources) {
    if (video.canPlayType(type) == "yes") {
      this.mediaType = type;
      loadIt(sources[type]);
      return;
    }
  }
  for (var type in sources) {
    if (video.canPlayType(type) == "maybe") {
      this.mediaType = type;
      loadIt(sources[type]);
      return;
    }
  }
  console.warn("video sources formats is not supported");
};

fabric.util._loadSVGFromURL_overwritten = fabric.loadSVGFromURL;
fabric.loadSVGFromURL = function (url, callback, reviver) {
  if (url.indexOf('data') !== 0 && url.indexOf('://') == -1) {
    url = fabric.util.mediaRoot + url;
  }
  if (fabric.util.addNoCache && /^(http|https)\:\/\//.test(url)) {
    url += '?no-cache=' + moment().format('x');
  }
  fabric.util._loadSVGFromURL_overwritten(url, function (data) {
    if (data) {
      return callback(data);
    }

    var xml = jQuery.parseXML(atob(fabric.media.error.substr(26)));

    fabric.parseSVGDocument(xml.documentElement, function (results, options) {
      callback && callback(results, options);
    }, reviver);
  }, reviver);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), "/"))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.uploadImageMaxSize = {
  width: 400,
  height: 400
};

fabric.util.uploadImageMinSize = {
  width: 100,
  height: 100
};
//
// fabric.util.onImageUpload = function(img,callback,options){
//
//   if(!options.multiple){
//     if (options.apiAfterUpload) {
//       options.apiAfterUpload([this], function (val) {
//         callback(val);
//       },options)
//     } else {
//       callback(this);
//     }
//   }else{
//     callback();
//   }
// };


fabric.util.readImageFile = function (file, callback) {

  var reader = new FileReader();
  reader.onload = function (e) {
    var result = e.target.result;
    var type = result.substr(11, result.indexOf(";") - 11);
    var img = new Image();
    img.type = type;
    img.name = file.name;
    img.onload = function () {
      callback(img, e);
    };
    img.src = result;
  };
  reader.readAsDataURL(file);
};

fabric.util.createUploadInput = function (options, complete, progress) {

  var input = document.createElement("input");
  input.setAttribute("type", "file");
  if (options.multiple) {
    input.setAttribute("multiple", options.multiple);
  }
  input.className = "hidden";

  $(input).change(function () {
    if (input.files && input.files.length) {
      if (input.files.length === 1) {
        if (options.upload) {
          options.upload(input.files[0], complete);
        } else if (options.multiUpload) {
          options.multiUpload(input.files, complete);
        }
      } else {
        if (options.multiUpload) {
          options.multiUpload(input.files, complete);
        } else {
          var _loader = fabric.util.queueLoad(input.files.length, function (loaded) {
            complete(loaded);
          }, function (total, current, image) {
            progress && progress(total, current, image);
          });
          for (var i = 0; i < input.files.length; i++) {
            options.upload(input.files[i], _loader);
          }
        }
      }
    }
  });

  fabric.util.uploadInput = input;
};

//fabric.util.resizeImage(img, callback);
// fabric.util.uploadPreprocessor = function(img, callback) {
//   app.api.upload({
//     image: img
//   }, callback)
// }


fabric.util.uploadImage = function (options, cb, progress) {
  fabric.util.createUploadInput(options, cb, progress);
  $(fabric.util.uploadInput).trigger('click');
};

fabric.util.resizeUploadedImage = function (img, callback) {

  if (img.type === "svg+xml") {
    callback(img);
    return;
  }
  //Here we can put a restriction to upload a minim sized logo
  if (img.width < fabric.util.uploadImageMinSize.width || img.height < fabric.util.uploadImageMinSize.height) {
    alert("Logo is too small. MInimum size is " + fabric.util.uploadImageMinSize.width + "x" + fabric.util.uploadImageMinSize.height);
    callback(false);
    return;
  }

  if (img.width > fabric.util.uploadImageMaxSize.width || img.height > fabric.util.uploadImageMaxSize.height) {

    var size = fabric.util.getProportions(img, fabric.util.uploadImageMaxSize, "fit");

    var filter = new fabric.Image.filters.ResizeDP();

    var canvas = fabric.util.createCanvasElementWithSize(img);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    filter.applyTo(canvas, size.width, size.height);
    callback(canvas);
  } else {
    callback(img);
  }
};

fabric.util.object.extend(fabric.Canvas.prototype, {
  uploadClass: 'image',
  multipleUpload: false,
  uploadImage: function uploadImage(options) {

    var _api = this.application.uploader || {};

    options = fabric.util.object.extend({
      upload: _api.upload,
      afterUpload: _api.callback,
      validation: _api.validation,
      data: false,
      multiple: _api.multiple,
      multiUpload: _api.multipleUpload
    }, options);

    options.afterUpload = options.afterUpload && options.afterUpload.bind(this.application, this, options.data) || function (canvas, data, image, event) {
      // this.application.fire("image:upload",{image: img, canvas: this});
      // _api.afterUpload && _api.afterUpload({image: img, canvas: this,event:});
      this.createImageObject(image);
    }.bind(this);

    options.upload = options.upload && options.upload.bind(this.application) || function (file, callback) {
      if (options.validation && options.validation.call(this, file, options.data) === false) {
        return callback();
      }
      fabric.util.readImageFile(file, function (img, event) {
        options.afterUpload(img, event);
        callback();
      });
    }.bind(this.application);

    fabric.util.uploadImage({
      multiple: _api.multiple,
      apiAfterUpload: options.afterUpload,
      multiUpload: options.multiUpload && options.multiUpload.bind(this.application),
      upload: options.upload
    }, function () {});
  },
  createImageObject: function createImageObject(img) {
    var _this = this;

    if (!img) return;

    this.createObject({
      position: "center",
      active: true,
      type: this.uploadClass,
      image: img,
      width: img.width,
      height: img.height,
      clipTo: this.activeArea,
      movementLimits: this.activeArea
    }, function (el) {
      return _this.fitObject(el);
    });
  },
  actions: fabric.util.object.extend(fabric.Canvas.prototype.actions, {
    uploadImage: {
      className: 'fa fa-upload',
      key: 'u',
      title: 'upload image',
      action: function action() {
        this.uploadImage({ data: "default" });
        // this.application.api.upload,
        // this.application.api.afterUpload,
        // this.application.api.uploadValidation)
      }
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Editor.prototype, {
  setInstagram: function setInstagram(data) {
    this.instagram = data;
    this.instagram.api = new InstagramApi(this.instagram.clientID, this.instagram.redirectURI);
  },
  instagramAuth: function instagramAuth(cb) {
    var _this = this;

    if (this.instagram.accessToken) {
      return cb.call(this);
    }

    var authUrl = this.instagram.api.getAuthUrl();
    //the pop-up window size, change if you want
    var popupWidth = 700,
        popupHeight = 500,
        popupLeft = (window.screen.width - popupWidth) / 2,
        popupTop = (window.screen.height - popupHeight) / 2;

    //the url needs to point to instagram_auth.php
    var popup = window.open(authUrl, '', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + popupLeft + ',top=' + popupTop + '');

    popup.onload = function () {
      //an interval runs to get the access token from the pop-up
      var interval = setInterval(function () {
        try {
          //check if hash exists
          if (popup.location.hash.length) {
            //hash found, that includes the access token
            clearInterval(interval);
            _this.instagram.accessToken = popup.location.hash.slice(14); //slice #access_token= from string
            popup.close();
            cb(_this.instagram.accessToken);
          }
        } catch (evt) {
          //permission denied
        }
      }, 100);
    };
  },
  getInstagramMedia: function getInstagramMedia(callback) {
    var _this2 = this;

    this.instagramAuth(function () {
      _this2.instagram.api.user.media('self', _this2.instagram.accessToken, function (data) {
        callback(data.data);
        // var images = _.pluck(data.data,"images");
        // var thumbnails = _.pluck(images,"thumbnail");
        // var thumbnails_urls = _.pluck(thumbnails,"url");
        //
        // console.log(thumbnails_urls);
      });
    });
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  actions: fabric.util.object.extend(fabric.Canvas.prototype.actions, {
    instagram: {
      className: "fa fa-instagram",
      type: 'effect',
      title: "instagram",
      effectClassName: "instagram-container",
      actionParameters: function actionParameters($el, data) {
        var _this3 = this;

        this.application.getInstagramMedia(function (data) {

          _this3.application.createGallery($el, fabric.util.object.map(data, function (el) {
            return {
              type: "image",
              src: el.images.thumbnail.url,
              title: el.caption && el.caption.text
            };
          }));
        });
      }
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Editor.prototype, {
  setFacebook: function setFacebook(data) {
    this.facebook = data;

    (function (d, s, id) {
      var js,
          fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },
  facebookAuth: function facebookAuth(cb) {

    FB.init({
      appId: this.facebook.appId,
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true, // parse social plugins on this page
      version: 'v2.9' // use graph api version 2.8
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function (response) {

      /**
       * {
      status: 'connected',
      authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
      }
      }
       */
      console.log(response);
      // statusChangeCallback(response);
    });
    //
    // if(this.facebook.accessToken){
    //   return cb.call(this)
    // }
  },
  getFacebookMedia: function getFacebookMedia(callback) {
    var _this = this;

    this.facebookAuth(function () {
      _this.facebook.api.user.media('self', _this.facebook.accessToken, function (data) {
        callback(data.data);
      });
    });
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  actions: fabric.util.object.extend(fabric.Canvas.prototype.actions, {
    facebook: {
      className: "fa fa-facebook",
      type: 'effect',
      title: "facebook",
      effectClassName: "facebook-container",
      actionParameters: function actionParameters($el, data) {
        var _this2 = this;

        this.application.getFacebookMedia(function (data) {

          _this2.application.createElementsList($el, fabric.util.object.map(data, function (el) {
            return {
              type: "image",
              src: el.images.thumbnail.url,
              title: el.caption && el.caption.text
            };
          }));
        });
      }
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(43);

fabric.util.object.extend(fabric.Canvas.prototype, {
  setDroppable: function setDroppable(val) {
    if (!this.droppable && val) {
      this.droppable = true;
      this.initDragAndDrop();
    }
  },
  accepts: {},
  droppable: false, //{}
  isAccepts: function isAccepts(accepts, data) {

    for (var i in accepts) {
      if (accepts[i].constructor == Array) {
        if (accepts[i].indexOf(data[i]) == -1) return false;
      } else {
        if (accepts[i] == "*") continue;
        if (accepts[i] != data[i]) return false;
      }
    }
    return true;
    //return (this.supportedTypes == "*" || this.supportedTypes.indexOf(type)!= -1)
  },
  drop: function drop(data) {
    this.setData(data);
  },
  initDragAndDrop: function initDragAndDrop() {
    this.on("mouse:drop", function (e) {
      var _x = e.x - e.offsetX,
          _y = e.y - e.offsetY,
          _w = e.width,
          // (e.data.width || e.width  );
      _h = e.height; //(e.data.height || e.height );

      if (e.data.scaleX) {
        var _scaleX = e.data.scaleX / this.viewportTransform[0];
      } else {
        _scaleX = 1;
        _w /= this.viewportTransform[0];
      }

      if (e.data.scaleY) {
        var _scaleY = e.data.scaleY / this.viewportTransform[3];
      } else {
        _scaleY = 1;
        _h /= this.viewportTransform[3];
      }

      var _stroke = e.data.strokeWidth || 0;
      if (e.data.left) {
        _x += (e.data.left + _stroke) / this.viewportTransform[0];
      }
      if (e.data.top) {
        _y += (e.data.top + _stroke) / this.viewportTransform[3];
      }

      e.data = fabric.util.object.extend({}, e.data, {
        scaleX: _scaleX,
        scaleY: _scaleY,
        left: _x,
        top: _y,
        width: _w,
        height: _h,
        originalWidth: e.data.width,
        originalHeight: e.data.height
      });

      this.fire("before:drop", e);

      e.target = this.findTarget(e.originalEvent);
      if (e.target && !this.isDrawingMode) {
        // To unify the behavior, the object's double click event does not fire on drawing mode.
        e.target.fire('object:drop', e);
      }

      if (e.target && e.target.accepts) {
        if (this.isAccepts(e.target.accepts, e.data)) {
          e.target.deactivate();
          e.target.setData(e.data);
        }
      } else {
        if (this.isAccepts(this.accepts, e.data)) {
          this.setData(e.data);
        }
      }
    });
    this.on("mouse:dragenter", function (e) {
      if (e.target && e.target.accepts) {
        if (this.isAccepts(e.target.accepts, e.data)) {
          e.target.activate();
          e.e.helper.css("cursor", "alias");
          this.setCursor("alias");
        } else {
          e.e.helper.css("cursor", "not-allowed");
          this.setCursor("not-allowed");
        }
      }
    });
    this.on("mouse:dragleave", function (e) {
      if (e.target && e.target.accepts) {
        if (this.isAccepts(e.target.accepts, e.data)) {
          this._activated = false;
          e.target.deactivate();
        }
        e.e.helper.css("cursor", "pointer");
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var _bindEvents2 = fabric.Canvas.prototype._bindEvents;
var _onMouseDown_overwritten = fabric.Canvas.prototype._onMouseDown;
var _onMouseUp_overwritten = fabric.Canvas.prototype._onMouseUp;
var _initEventListeners_overwritten = fabric.Canvas.prototype._initEventListeners;
var removeListeners_overwritten = fabric.Canvas.prototype.removeListeners;

fabric.util.object.extend(fabric.Canvas.prototype, {
  tapholdThreshold: 2000,
  _bindEvents: function _bindEvents() {
    _bindEvents2.call(this);
    this._onClick = this._onClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onTapHold = this._onTapHold.bind(this);
  },

  _onDoubleClick: function _onDoubleClick(e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('mouse:dblclick', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      target.fire('dblclick', {
        e: e
      });
    }
  },

  _onDrop: function _onDrop(e) {
    var _zoom = this.getZoom();
    e.x /= _zoom;
    e.y /= _zoom;
    e.offsetX /= _zoom;
    e.offsetY /= _zoom;
    e.width = e.helper.width() / _zoom;
    e.height = e.helper.height() / _zoom;
    var self = this;

    this.fire('mouse:drop', e);
  },

  _onDragMove: function _onDragMove(e) {
    var self = this;

    var target = self.findTarget(e.originalEvent);
    self.fire('mouse:dragmove', {
      target: target,
      e: e,
      data: e.data
    });
    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      target.fire('object:dragmove', {
        e: e,
        data: e.data
      });
    }
    if (this._last_target == target) return;
    if (this._last_target) {
      self.fire('mouse:dragleave', {
        target: this._last_target,
        e: e,
        data: e.data
      });
      this._last_target.fire('object:dragleave', {
        e: e,
        data: e.data
      });
      this._last_target = false;
    }
    if (target) {

      self.fire('mouse:dragenter', {
        target: target,
        e: e,
        data: e.data
      });
      target.fire('object:dragenter', {
        e: e,
        data: e.data
      });

      this._last_target = target;
    }
  },

  _onClick: function _onClick(e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('mouse:click', {
      target: target,
      e: e
    });

    var e1 = this._mouseDownCoordinatesEvent;
    delete this._mouseDownCoordinatesEvent;

    if (target && !self.isDrawingMode) {
      //fabric2.1.0 || fabric 1.6.4
      // var states = target._stateProperties || target.originalState;

      if (e1 && e1.x === e.x && e1.y === e.y) {
        // // target._stateProperties.angle == target.angle
        // states.left == target.left &&
        // states.top == target.top &&
        // states.scaleX == target.scaleX &&
        // states.scaleY == target.scaleY &&
        // states.angle == target.angle
        // ) {
        // To unify the behavior, the object's double click event does not fire on drawing mode.
        target.fire('object:click', {
          e: e
        });
      }
    }
  },

  _onTapHold: function _onTapHold(e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:taphold', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's tap hold event does not fire on drawing mode.
      target.fire('taphold', {
        e: e
      });
    }

    if (e.type === 'touchend' && self.touchStartTimer != null) {
      clearTimeout(self.touchStartTimer);
    }
  },

  _onMouseDown: function _onMouseDown(e) {
    _onMouseDown_overwritten.call(this, e);

    this._mouseDownCoordinatesEvent = e;

    var self = this;
    if (e.type === 'touchstart') {
      var touchStartTimer = setTimeout(function () {
        self._onTapHold(e);
        self.isLongTap = true;
      }, self.tapholdThreshold);
      self.touchStartTimer = touchStartTimer;
      return;
    }

    // Add right click support
    if (e.which === 3) {
      var target = this.findTarget(e);
      self.fire('mouse:down', { target: target, e: e });
      if (target && !self.isDrawingMode) {
        // To unify the behavior, the object's mouse down event does not fire on drawing mode.
        target.fire('mousedown', {
          e: e
        });
      }
    }
  },

  _onMouseUp: function _onMouseUp(e) {

    _onMouseUp_overwritten.call(this, e);

    if (e.type === 'touchend') {
      // Process tap hold.
      if (this.touchStartTimer != null) {
        clearTimeout(this.touchStartTimer);
      }
      // Process long tap.
      if (this.isLongTap) {
        this._onLongTapEnd(e);
        this.isLongTap = false;
      }
      // Process double click
      var now = new Date().getTime();
      var lastTouch = this.lastTouch || now + 1;
      var delta = now - lastTouch;
      if (delta < 300 && delta > 0) {
        // After we detct a doubletap, start over
        this.lastTouch = null;

        this._onDoubleTap(e);
      } else {
        this.lastTouch = now;
      }
    }
  },

  _onDoubleTap: function _onDoubleTap(e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:doubletap', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double tap event does not fire on drawing mode.
      target.fire('object:doubletap', {
        e: e
      });
    }
  },

  _onLongTapEnd: function _onLongTapEnd(e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:longtapend', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's long tap end event does not fire on drawing mode.
      target.fire('object:longtapend', {
        e: e
      });
    }
  },

  _initEventListeners: function _initEventListeners() {
    var self = this;
    _initEventListeners_overwritten.call(self);

    fabric.util.addListener(self.upperCanvasEl, 'click', self._onClick);
    fabric.util.addListener(self.upperCanvasEl, 'dblclick', self._onDoubleClick);

    self.on('object:scaling', function (e) {
      if (e.target && e.target._scaling_events_enabled) {
        e.target.fire("scaling", e.e);
      }
    });
    self.on('object:selected', function (e) {
      if (e.target) {
        e.target.fire("object:selected", e.e);
      }
    });
    self.on('mouse:over', function (e) {
      if (e.target) {
        e.target.fire("mouse:over", e.e);
      }
    });

    self.on('mouse:out', function (e) {
      if (e.target) {
        e.target.fire("mouse:out", e.e);
      }
    });
  },

  removeListeners: function removeListeners() {
    var self = this;
    removeListeners_overwritten.call(self);

    fabric.util.removeListener(self.upperCanvasEl, 'click', self._onClick);
    fabric.util.removeListener(self.upperCanvasEl, 'dblclick', self._onDoubleClick);
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(6);

/**
 * Cropping do not support skewX and skewY
 */
fabric.util.object.extend(fabric.Image.prototype, {
  stateProperties: fabric.Image.prototype.stateProperties.concat(["crop"]),
  crop: null,
  store_crop: function store_crop() {
    if (!this.crop) return null;
    var DIG = fabric.Object.NUM_FRACTION_DIGITS;
    var _crop = {};

    if (this.crop.left) _crop.left = fabric.util.toFixed(this.crop.left, DIG);
    if (this.crop.top) _crop.top = fabric.util.toFixed(this.crop.top, DIG);
    if (this.crop.scaleX) _crop.scaleX = fabric.util.toFixed(this.crop.scaleX, DIG);
    if (this.crop.scaleY) _crop.scaleY = fabric.util.toFixed(this.crop.scaleY, DIG);
    if (this.crop.angle) _crop.angle = fabric.util.toFixed(this.crop.angle, DIG);
    return _crop;
  },
  setCrop: function setCrop(crop) {
    this.crop = crop;
    if (!crop) {
      delete this._draw_transform_element;
      return;
    }
    if (!this._draw_transform_element) {
      this._draw_transform_element = new fabric.Image(this._element, {
        originX: "center",
        originY: "center"
      });
      this._draw_transform_element.group = this;
    }
    this._draw_transform_element.set({
      skewX: crop.skewX || 0,
      skewY: crop.skewY || 0,
      angle: crop.angle || 0,
      left: crop.left * this.width || 0,
      top: crop.top * this.height || 0,
      width: this.width,
      height: this.height,
      scaleX: crop.scaleX || 1,
      scaleY: crop.scaleY || 1
    });
  },
  _render: function _render(ctx, noTransform) {
    var x,
        y,
        imageMargins = this._findMargins(),
        elementToDraw;

    x = noTransform ? this.left : -this.width / 2;
    y = noTransform ? this.top : -this.height / 2;

    if (this.crop || this.meetOrSlice === 'slice') {
      ctx.beginPath();
      ctx.rect(x, y, this.width, this.height);
      ctx.clip();
    }

    if (this.isMoving === false && this.resizeFilters.length && this._needsResize()) {
      this._lastScaleX = this.scaleX;
      this._lastScaleY = this.scaleY;
      elementToDraw = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, true);
    } else {
      elementToDraw = this._element;
    }
    if (this.crop) {
      // this._draw_transform_element.CropTo = this;
      this._draw_transform_element.canvas = this.canvas;
      // var _el = this._draw_transform_element;
      // _el.transform(ctx);
      // _el._render(ctx);
      // imageMargins = this._draw_transform_element._findMargins();
      // x = (noTransform ? this.left : -this.width / 2);
      // y = (noTransform ? this.top : -this.height / 2);
      this._draw_transform_element._element = this._element;
      this._draw_transform_element.render(ctx);
    } else {

      elementToDraw && ctx.drawImage(elementToDraw, x + imageMargins.marginX, y + imageMargins.marginY, imageMargins.width, imageMargins.height);
    }

    this._stroke(ctx);
    this._renderStroke(ctx);
  },
  /**
   * Execute the drawing operation for an object on a specified context
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {Boolean} [noTransform] When true, context is not transformed
   */
  // drawObject: function(ctx, noTransform) {
  //   this._renderBackground(ctx);
  //   this._setStrokeStyles(ctx);
  //   this._setFillStyles(ctx);
  //   if(this.crop){
  //     // this._transform_element.group = this;
  //     this._transform_element.render(ctx);
  //     // delete this._transform_element.group;
  //     // this._transform_element
  //   }else{
  //     this._render(ctx, noTransform);
  //   }
  // },
  /*crop: {
    left: 0,
    top: 0,
    scaleX: 1,
    scaleY: 1
  },*/
  cropPhotoEnd: function cropPhotoEnd() {

    this.canvas.remove(this._transform_element);

    this.canvas.editingObject = null;
    this.application.off("target:changed target:cleared", this._endFoo);

    if (this.canvas._gridObject) {
      this.canvas._gridObject.enabled = true;
    }

    this.set({
      hasControls: true,
      evented: true,
      flipX: this._transform_element.flipX,
      flipY: this._transform_element.flipY
    });
    this._resetOrigin();

    this._cropmode = false;

    this.canvas.setActiveObject(this);
    this.canvas.renderAll();
    this.canvas.stateful = true;

    // if (this.hasStateChanged()) {
    this.canvas.fire('object:modified', { target: this });
    this.fire('modified', {});
    // }


    // this.fire("cropping:exited");
    // this.canvas.fire('frame:cropping:exited', { target: this });
  },
  updateCrop: function updateCrop() {

    var I = this._transform_element,
        F = this,
        to_radians = Math.PI / 180,
        cosA = Math.cos(F.angle * to_radians),
        sinA = Math.sin(F.angle * to_radians),
        left = ((I.left - F.left) * cosA + (I.top - F.top) * sinA /*- F.width/ 2*/) * (I.flipX ? -1 : 1),
        top = (-(I.left - F.left) * sinA + (I.top - F.top) * cosA /*- F.height/ 2*/) * (I.flipY ? -1 : 1);

    F.setCrop({
      skewX: I.skewX,
      skewY: I.skewY,
      left: left / F.width / F.scaleX,
      top: top / F.height / F.scaleY,
      scaleX: I.scaleX / F.scaleX,
      scaleY: I.scaleY / F.scaleY,
      angle: I.angle - F.angle
    });
  },
  toSVG_overwritten: fabric.Image.prototype.toSVG,
  getShape: function getShape() {
    var path = "M 0 0 L " + this.width + " 0 L " + this.width + " " + this.height + " L 0 " + this.height + " z";
    var element = new fabric.Path(path, {});
    element.group = this;
    element.canvas = this.canvas;
    fabric.Group.prototype.realizeTransform.call(this, element);
    delete element.group;
    element.set({
      originX: "center",
      originY: "center"
    });
    return element;
  },
  toSVG: function toSVG(reviver) {
    if (this.crop) {

      var clipId = "Clipped" + fabric.Object.__uid++;

      return "\n        <clipPath id=\"" + clipId + "\">\n          " + this.getShape().toSVG(reviver) + "\n        </clipPath>\n        <g clip-path=\"url(#" + clipId + ")\">\n          " + this._createTransformedElement().toSVG_overwritten(reviver) + "\n        </g>";
    } else {
      return this.toSVG_overwritten(reviver);
    }
  },
  _createTransformedElement: function _createTransformedElement() {

    var el;
    if (this._draw_transform_element) {
      this._draw_transform_element.group = this;
      this.setCrop(this.crop);
      fabric.Group.prototype.realizeTransform.call(this, this._draw_transform_element);

      el = new fabric.Image(this._element, {
        angle: this._draw_transform_element.angle,
        left: this._draw_transform_element.left,
        top: this._draw_transform_element.top,
        width: this._draw_transform_element.width,
        height: this._draw_transform_element.height,
        scaleX: this._draw_transform_element.scaleX,
        scaleY: this._draw_transform_element.scaleY,
        skewX: this._draw_transform_element.skewX,
        skewY: this._draw_transform_element.skewY
      });
      this.setCrop(this.crop);
    } else {
      el = new fabric.Image(this._element, {
        angle: this.angle,
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
        scaleX: this.scaleX,
        scaleY: this.scaleY
      });
    }
    el.set({
      originX: "center",
      originY: "center",
      movementLimits: this,
      clipTo: this,
      movementLimitMode: "content",
      hasControls: true,
      selectable: true,
      perPixelTargetFind: false
    });
    el.canvas = this.canvas;

    el.application = this.application;
    return el;
  },
  cropPhotoStart: function cropPhotoStart() {
    var _this2 = this;

    this._cropmode = true;

    this.canvas.stateful && this.saveState();
    this.canvas.stateful = false;

    this.canvas.discardActiveGroup();
    if (this.canvas._gridObject) {
      this.canvas._gridObject.enabled = false;
    }

    this.set({
      width: this.width * this.scaleX,
      height: this.height * this.scaleY,
      scaleY: 1,
      scaleX: 1
    });
    this._setOriginToCenter();

    this._transform_element = this._createTransformedElement();
    this._transform_element.parent = this;

    this._transform_element.on("rotating", this._transform_element.stepRotating);

    this._transform_element.set({
      tools: ["cropZoomIn", "cropZoomOut", "cropEnd"],
      actions: {
        cropZoomIn: {
          className: "fa fa-search-plus ",
          title: "zoom in",
          action: function action() {
            this.parent.cropZoomIn();
          }
        },
        cropZoomOut: {
          className: "fa fa fa-search-minus",
          title: "zoom out",
          action: function action() {
            this.parent.cropZoomOut();
          }
        },
        cropEnd: {
          className: "fa fa-crop",
          title: "crop end",
          action: function action() {
            this.parent.cropPhotoEnd();
          }
        }
      },
      opacity: 0.5,
      eventListeners: {
        "rotating moving scaling skewing": function rotatingMovingScalingSkewing() {
          this.parent.updateCrop();
        }
      }
    });

    this.canvas.add(this._transform_element);

    this.canvas.on("mouse:wheel", function (e) {
      if (e.target === _this2._transform_element) {
        if (e.e.deltaY < 0) {
          _this2.cropZoomIn();
        } else {
          _this2.cropZoomOut();
        }
        e.e.stopPropagation();
        e.e.preventDefault();
      }
    });

    //рамку двигать нельзя
    this.set({
      hasControls: false,
      evented: false
    });

    this.canvas.setActiveObject(this._transform_element);
    this.active = true;

    var _this = this;
    this._endFoo = function () {
      _this.cropPhotoEnd();
    };
    this.application.on("target:changed target:cleared", this._endFoo);

    this.fire("cropping:entered");
    this.canvas.fire('frame:cropping:entered', { target: this });

    this.canvas.editingObject = this;
    this.canvas.renderAll();
  },
  cropZoomOut: function cropZoomOut() {
    this._transform_element.set({
      scaleX: Math.max(this._transform_element.scaleX - 0.1, 0.1),
      scaleY: Math.max(this._transform_element.scaleY - 0.1, 0.1)
    });
    this.updateCrop();
    this.canvas.renderAll();
  },
  cropZoomIn: function cropZoomIn() {
    this._transform_element.set({
      scaleX: Math.max(this._transform_element.scaleX + 0.1, 0.1),
      scaleY: Math.max(this._transform_element.scaleY + 0.1, 0.1)
    });
    this.updateCrop();
    this.canvas.renderAll();
  },
  actions: fabric.util.object.extend(fabric.Image.prototype.actions, {
    crop: {
      title: "crop",
      className: "fa fa-crop",
      action: "cropPhotoStart",
      // visible:    "croppingAvailable",
      observe: "cropping:entered cropping:exited element:modified"
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.Editor.prototype.configurationProperties.push("frames");
fabric.util.object.extend(fabric.Editor.prototype, {
  setFrames: function setFrames(val) {
    this.frames = fabric.util.object.extend(val.map(function (item) {
      return fabric.util.object.defaults(item, {
        frame: false,
        shape: false,
        type: "photo",
        role: "frame"
      });
    }));
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.createThumb = function (slide, $canvasEl) {

  var _canvas = slide,
      firstDraw = true,
      modified,
      _w = +$canvasEl.getAttribute("width"),
      _h = +$canvasEl.getAttribute("height");

  if (_h) {
    $canvasEl.style.height = $canvasEl.height;
  }

  function renderThumb() {
    if (_canvas.processing || !_canvas.loaded) {
      return false;
    }
    _canvas.renderThumb($canvasEl);
    modified = _canvas.modified;
  }

  function forceRenderThumb() {
    if (this.loaded) {
      this.renderThumb($canvasEl);
    } else if (this.thumb) {
      var img = new Image();
      img.onload = function () {
        var ctx = $canvasEl.getContext("2d");
        ctx.clearRect(0, 0, $canvasEl.width, $canvasEl.height);
        ctx.drawImage(img, 0, 0, $canvasEl.width, $canvasEl.height);
        modified = this.modified;
      };
      img.src = this.thumb;
    }
    // //if (attrs.force !== "true") return;
    // var canvas = new fabric.Canvas(null, this.data, function () {
    //   canvas.renderThumb($canvasEl);
    //   //modified = slide.modified;
    // });
  }

  function scaleThumb() {

    var _fitSize = fabric.util.getProportions({
      width: slide.originalWidth || slide.width,
      height: slide.originalHeight || slide.height
    }, {
      width: _w,
      height: _h
    }, "fit");

    $canvasEl.width = _fitSize.width;
    $canvasEl.height = _fitSize.height;

    $canvasEl.style.width = _fitSize.width + 'px';
    $canvasEl.style.height = _fitSize.height + 'px';
    renderThumb();
  }

  slide.on({
    'after:render': renderThumb,
    'dimensions:modified': scaleThumb,
    'loading:end': scaleThumb,
    'modified': forceRenderThumb
  });

  $canvasEl.setAttribute("title", slide.title);

  scaleThumb.call(slide);
  forceRenderThumb.call(slide);
};

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  renderThumb: function renderThumb(canvas, options) {
    options = options || {
      objects: true,
      clipped_area_only: false,
      draw_background: true
    };

    if (options.zoom) {
      var _zoom = options.zoom;
    } else {
      if (canvas.width) {
        var _zoom = canvas.width / (this.originalWidth || this.width);
      } else {
        var _zoom = 1;
      }
    }
    var _old_Scale = this.viewportTransform[0];
    var old_x = this.viewportTransform[4];
    var old_y = this.viewportTransform[5];
    this.viewportTransform[4] = this.viewportTransform[5] = 0;
    this.viewportTransform[0] = this.viewportTransform[3] = 1;

    this.viewportTransform[0] = this.viewportTransform[3] = _zoom;
    //this._update_clip_rect();

    if (this.clipRect) {
      this.clipRect.setOpacity(0);
    }

    var size = {
      width: this.originalWidth || this.width,
      height: this.originalHeight || this.height
    };
    size.width = Math.ceil(size.width * _zoom);
    size.height = Math.ceil(size.height * _zoom);

    var _canvas = fabric.util.createCanvasElement();
    _canvas.width = size.width;
    _canvas.height = size.height;

    var canvasToDrawOn = _canvas.getContext('2d'),
        objsToRender;

    this.clearContext(canvasToDrawOn);
    canvasToDrawOn.save();
    canvasToDrawOn.transform.apply(canvasToDrawOn, this.viewportTransform);

    if (options.draw_background) {
      this._renderBackground(canvasToDrawOn);
      //if (this._backgroundLayer) {
      //  this._renderObjects(canvasToDrawOn, this._backgroundLayer);
      //}
    }

    if (!options.clipped_area_only && this.clipTo) {
      fabric.util.clipContext(this, canvasToDrawOn);
    }

    var _objects;
    if (options.objects && options.objects.constructor === Array) {
      _objects = options.objects;
    } else {
      _objects = options.objects !== false ? this._objects : [];
    }
    if (options.clipped_area) {
      _objects = fabric.util.object.clone(_objects);
      for (var i = _objects.length; i--;) {
        if (_objects[i].clipTo !== options.clipped_area) {
          _objects.splice(i, 1);
        }
      }
    }
    // if (fabric.version >= 1.6) {
    this._renderObjects(canvasToDrawOn, _objects);
    // } else {
    //   for (var i = 0, length = _objects.length; i < length; ++i) {
    //     this._draw(canvasToDrawOn, _objects[i]);
    //   }
    // }


    canvasToDrawOn.restore();
    if (!options.clipped_area_only && this.clipTo) {
      canvasToDrawOn.restore();
    }
    this._renderOverlay(canvasToDrawOn);
    canvasToDrawOn.restore();
    if (this.clipRect) {
      this.clipRect.setOpacity(1);
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (options.clipped_area_only && this.clipRect) {
      var _rect = {
        left: this.clipRect.left * _zoom,
        top: this.clipRect.top * _zoom,
        width: this.clipRect.width * _zoom,
        height: this.clipRect.height * _zoom
      };
    } else {
      var _rect = {
        left: options.left * _zoom || 0,
        top: options.top * _zoom || 0,
        width: options.width * _zoom || size.width,
        height: options.height * _zoom || size.height
      };
    }
    if (options.angle) {
      ctx.rotate(-options.angle * Math.PI / 180);
      ctx.drawImage(_canvas, 0, 0, _rect.width + _rect.left + _canvas.width, _rect.height + _rect.top + _canvas.height, -_rect.left, -_rect.top, canvas.width + _rect.left + _canvas.width, canvas.height + _rect.top + _canvas.height);
    } else {
      ctx.drawImage(_canvas, _rect.left, _rect.top, _rect.width, _rect.height, 0, 0, canvas.width, canvas.height);
    }

    this.viewportTransform[0] = this.viewportTransform[3] = _old_Scale;
    // this._update_background_image();
    //this._update_clip_rect();

    this.viewportTransform[4] = old_x;
    this.viewportTransform[5] = old_y;

    return canvas;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(48);
__webpack_require__(49);

// todo это убрать
//fabric.movementsLimitsEasy = false;
var _scaleObject_overwritten = fabric.Canvas.prototype._scaleObject;

fabric.util.object.extend(fabric.Object.prototype, {
  store_movementLimits: function store_movementLimits() {
    return this.movementLimits ? this.movementLimits.id ? '#' + this.movementLimits.id : this.movementLimits : null;
  },
  setWholeCoordinates: function setWholeCoordinates(val) {
    this.wholeCoordinates = val;
    this.on("added modified", function () {
      if (this.wholeCoordinates) {
        this.set({
          left: Math.round(this.left),
          top: Math.round(this.top),
          width: Math.round(this.width),
          height: Math.round(this.height)
        });
      }
    }, true);
  },
  // setTop: function(val){
  //   if(this.wholeCoordinates){
  //     val = Math.round(val);
  //   }
  //   this.top = val;
  // },
  // setLeft: function(val){
  //   if(this.wholeCoordinates){
  //     val = Math.round(val);
  //   }
  //   this.left = val;
  // },
  // setWidth: function(w){
  //   if(this.wholeCoordinates){
  //     w = Math.round(w);
  //   }
  //   this.width = w;
  // },
  // setHeight: function(h){
  //   if(this.wholeCoordinates){
  //     h = Math.round(h);
  //   }
  //   this.height = h;
  // },
  // specialProperties: fabric.Object.prototype.specialProperties.concat(["movementLimits"]),

  setActive: function setActive(value) {
    if (!this.canvas) {
      this.on("added", function () {
        if (this.canvas.interactive) {
          this.canvas.setActiveObject(this);
        }
      });
    }

    this.active = value;
  },
  setPosition: function setPosition(_position) {
    if (_position === "center") {
      this.on("added", function setPosition() {
        this.center();
        this.setCoords();
        // this.canvas.fitObject(this);
      }, true);
    }
  },

  setMovementLimits: function setMovementLimits(val) {

    if (!this.movementLimits) {
      this.on({
        added: function added() {
          if (this.canvas.interactive) {
            this.canvas._check_object_position(this);
          }
        },
        rotated: function rotated(event) {
          var target = this;

          if (target.resizable) {
            if (pos.left !== undefined) {
              if (target.left < pos.left) {
                target.width += target.left - pos.left;
                target.left = pos.left;
              } else {
                target.width -= target.left - pos.left;
              }
            }
            if (pos.top !== undefined) {
              if (target.top < pos.top) {
                target.height += target.top - pos.top;
                target.top = pos.top;
              } else {
                target.height -= target.top - pos.top;
              }
            }
          }
          this.canvas._check_object_position(this);
        },
        modified: function modified(event) {
          this.canvas && this.canvas._check_object_after_modified(this);
        }
      });
    }
    this.movementLimits = val;

    /* if(this.canvas){
       this._setMovementLimitsString();
     }*/
  }
});

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  fitObject: function fitObject(el) {
    var _rect,
        maxSize,
        o = this.offsets;

    if (!el.movementLimits || el.movementLimits == "canvas") {
      var _zoom = this.getZoom();
      var _w = this.originalWidth || this.width / _zoom;
      var _h = this.originalHeight || this.height / _zoom;
      _rect = {
        width: o ? _w - o.left - o.right : _w,
        height: o ? _h - o.top - o.bottom : _h
      };
      /* offsets = {
       left: o && o.top ||0 ,
       top:  o &&  o.left ||0
       }*/
    } else if (el.movementLimits.constructor !== Function) {
      var lim = el.movementLimits;
      _rect = {
        left: lim.left * lim.scaleX,
        width: lim.width * lim.scaleX,
        top: lim.top * lim.scaleY,
        height: lim.height * lim.scaleY
      };
      //maxSize = _rect;
      // offsets = lim;
    }
    maxSize = {
      width: _rect.width * this.fitIndex,
      height: _rect.height * this.fitIndex
    };
    var size = fabric.util.getProportions(el, maxSize, 'fit');

    if (el.resizable) {
      el.setOptions({
        width: el.width * size.scale,
        height: el.height * size.scale
      });
      el.updateElement();
    } else {
      el.setOptions({
        scaleX: size.scale,
        scaleY: size.scale
      });
    }
    this.centerObject(el);
    el.setCoords();
    this.fire("scaling");
  },
  //fix getcenter function
  centerObject: function centerObject(object) {
    var center;
    if (object.movementLimits) {

      center = this._getMovementsLimitsCenter(object.movementLimits);
    } else {
      center = this.getCenter();
    }
    this._centerObject(object, new fabric.Point(center.left, center.top));
    this.renderAll();
    return this;
  },
  getCenter: function getCenter() {
    return {
      top: this.originalHeight || this.height / 2 / this.getZoom(),
      left: this.originalWidth || this.width / 2 / this.getZoom()
    };
  },
  movementLimits: {
    left: false,
    top: false,
    right: false,
    bottom: false
  },
  setMovementLimits: function setMovementLimits(_offsets) {
    this.movementLimits = _offsets;

    return this;
  },
  //content хотя бы  пиксель объекта должен быть внутри зоны
  //fit зона должно полностью находится внутри объекта
  movementLimitMode: "fit",
  _getMovementsLimitsCenter: function _getMovementsLimitsCenter(movementLimits) {

    if (movementLimits === 'canvas') {
      var o = this.offsets;
      var _w = this.originalWidth || this.width;
      var _h = this.originalHeight || this.height;
      return { top: o.top + (_h - o.top - o.bottom) / 2, left: o.left + (_w - o.left - o.right) / 2 };
    }

    if (typeof movementLimits == "string") {
      var obj = this.getObjectByID(movementLimits.substr(1));
    } else {
      obj = movementLimits;
    }

    var _xy = obj.getCenterPoint();
    return { top: _xy.y, left: _xy.x };
  },
  _getMovementsLimitsRect: function _getMovementsLimitsRect(movementLimits) {

    var o = this.offsets;
    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;

    if (movementLimits.constructor == Object) {
      return movementLimits;
    }

    var scale = this.viewportTransform[0];

    if (movementLimits === 'canvas') {

      var rect = {
        left: o.left,
        top: o.top,
        width: _w - o.left - o.right,
        height: _h - o.top - o.bottom,
        right: o.right,
        bottom: o.bottom
      };

      rect.width *= scale;
      rect.height *= scale;
      return rect;
    }

    if (movementLimits.constructor == String) {
      var obj = this.getObjectByID(movementLimits.substr(1));
      if (!obj) {
        return false;
      }
    } else {
      obj = movementLimits;
    }

    var _stroke_width = obj.strokeWidth;
    obj.strokeWidth = 0;

    obj.setCoords();
    var rect = obj.getBoundingRect();

    obj.strokeWidth = _stroke_width;

    rect.left /= scale;
    rect.top /= scale;
    rect.width /= scale;
    rect.height /= scale;
    rect.left -= this.viewportTransform[4] / scale;
    rect.top -= this.viewportTransform[5] / scale;

    //rect.left   += sw /2;
    //rect.top    += sw /2;
    //rect.width  -= sw;
    //rect.height -= sw;

    rect.right = _w - (rect.left + rect.width);
    rect.bottom = _h - (rect.top + rect.height);

    return rect;
  },
  contentOffsets: 5,

  getFixedPosition: function getFixedPosition(target, x, y) {

    var _translatedX = 0,
        _translatedY = 0,
        _w = this.originalWidth || this.width,
        _h = this.originalHeight || this.height,
        scale = this.viewportTransform[0];

    if (this._currentTransform) {
      _translatedX = x - this._currentTransform.lastX;
      _translatedY = y - this._currentTransform.lastY;
    }

    // console.log(_translatedX,_translatedY);

    if (x === undefined) {
      x = target.left;
    }
    if (y === undefined) {
      y = target.top;
    }
    // target.setCoords();
    // var bounds = target.getBoundingRect();

    var brect = this._currentTransform && this._currentTransform._bounding_rect || target.getBoundingRect();
    var bounds = {
      left: (brect.left + _translatedX - this.viewportTransform[4]) / scale,
      top: (brect.top + _translatedY - this.viewportTransform[5]) / scale,
      width: brect.width / scale,
      height: brect.height / scale
    };

    // bounds.left -= this.viewportTransform[4] / scale;
    // bounds.top -= this.viewportTransform[5] / scale;
    bounds.right = _w - (bounds.left + bounds.width);
    bounds.bottom = _h - (bounds.top + bounds.height);

    var limits = this._currentTransform && this._currentTransform.movementLimits;
    if (!limits) {
      return {};
    }
    // var limits = rect || this.movementLimits;

    var newPos = {},
        _l = limits.left,
        _r = limits.right,
        _t = limits.top,
        _b = limits.bottom;

    if (target.movementLimitMode === "content") {
      _l -= bounds.width - this.contentOffsets;
      _r -= bounds.width - this.contentOffsets;
      _t -= bounds.height - this.contentOffsets;
      _b -= bounds.height - this.contentOffsets;
    }

    if (target.movementLimitMode === "fit" && !target.resizable) {
      if (_l !== false && _r !== false) {
        _w = _w - _l - _r;
        if (bounds.width > _w) {
          var _asp = _w / bounds.width;
          newPos.scaleX = _asp;
          newPos.scaleY = _asp;
        }
      }

      if (_t !== false && _b !== false) {
        _h = _h - _t - _b;
        if (bounds.height > _h) {
          var _asp = _h / bounds.height;
          target.scaleX *= _asp;
          target.scaleY *= _asp;
        }
      }
    }

    if (target.movementLimitMode === "fit" || target.movementLimitMode === "content") {

      if (_l !== false) {
        var _diff = _l - bounds.left;
        if (_diff > 0) {
          newPos.left = x + _diff;
        }
      }

      if (!newPos.left && _r !== false) {
        var _diff = _r - bounds.right;
        if (_diff > 0) {
          newPos.left = x - _diff;
        }
      }

      if (_t !== false) {
        var _diff = _t - bounds.top;
        if (_diff > 0) {
          newPos.top = y + _diff;
        }
      }

      if (!newPos.top && _b !== false) {
        var _diff = _b - bounds.bottom;
        if (_diff > 0) {
          newPos.top = y - _diff;
        }
      }
    }

    return newPos;
  },

  // _restoreOriginXYNative: _restoreOriginXYNative,
  // _restoreOriginXY: function (target) {
  //   this._restoreOriginXYNative(target);
  //
  //   // if (target.wholeCoordinates) {
  //   //   target.left = Math.round(target.left);
  //   //   target.top = Math.round(target.top);
  //   // }
  // },

  /**
   * Sets the position of the object taking into consideration the object's origin
   * @param {fabric.Point} pos The new position of the object
   * @param {String} originX Horizontal origin: 'left', 'center' or 'right'
   * @param {String} originY Vertical origin: 'top', 'center' or 'bottom'
   * @return {void}
   */
  setPositionByOrigin: function setPositionByOrigin(pos, originX, originY) {
    var center = this.translateToCenterPoint(pos, originX, originY),
        position = this.translateToOriginPoint(center, this.originX, this.originY);

    // if (this.wholeCoordinates) {
    //   position.x = Math.round(position.x);
    //   position.y = Math.round(position.y);
    // }
    this.set('left', position.x);
    this.set('top', position.y);
  }
});

var _translateObject_overwritten = fabric.Canvas.prototype._translateObject;
var _beforeScaleTransform_overwritten = fabric.Canvas.prototype._beforeScaleTransform;
var _beforeTransform_overwritten = fabric.Canvas.prototype._beforeTransform;
var _restoreOriginXYNative = fabric.Canvas.prototype._restoreOriginXY;
var _setupCurrentTransformNative = fabric.Canvas.prototype._setupCurrentTransform;
fabric.util.object.extend(fabric.Canvas.prototype, {
  _beforeScaleTransform_overwritten: _beforeScaleTransform_overwritten,
  _setupCurrentTransform_overwritten: fabric.Canvas.prototype._setupCurrentTransform,
  _beforeScaleTransform: function _beforeScaleTransform(e, transform) {
    this._beforeScaleTransform_overwritten(e, transform);
    if (!this._currentTransform.original.oCoords) {
      this._currentTransform.original.oCoords = fabric.util.object.cloneDeep(this._currentTransform.target.oCoords);
    }
  },
  _setupCurrentTransform: function _setupCurrentTransform(e, target) {
    this._setupCurrentTransform_overwritten(e, target);
    this._currentTransform._bounding_rect = target.getBoundingRect();
    this._currentTransform.movementLimits = this._getMovementsLimitsRect(target.movementLimits || this.movementLimits);
  },
  getFixedPositionEasy: function getFixedPositionEasy(target, x, y) {
    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;

    if (x === undefined) {
      x = target.left;
    }
    if (y === undefined) {
      y = target.top;
    }
    var scale = this.viewportTransform[0];
    target.setCoords();
    target.right = _w - (target.left + target.width);
    target.bottom = _h - (target.top + target.height);

    var _diff, _asp, rect;
    var newPos = {
      left: x,
      top: y,
      width: target.width,
      height: target.height
    };

    if (target.width > _w) {
      newPos.width = _w;
    }
    if (target.height > _h) {
      newPos.height = _h;
    }
    if (target.left < 0) {
      newPos.width += target.left;
      newPos.left -= target.left;
    }
    if (target.right < 0) {
      newPos.width += target.right;
    }
    if (target.top < 0) {
      newPos.height += target.top;
    }
    if (target.bottom < 0) {
      newPos.height += target.bottom;
    }
    return newPos;
  },
  /**
   * функцию можно вызвать с евентом  'after:render'. Позволяет отображать вычисления пересечений изменяемого объекта с рамкой. выделяет красными лиинияи
   * @private
   * @example
   *  eventListeners : {
    Canvas: {
      'before:render': function(){
        this.clearContext(this.contextTop);
      },
      'after:render': function(){
        this._debug_intersections()
      }
    }
  }
   */
  drawInterestionLines: function drawInterestionLines() {
    var tr = this._currentTransform;
    if (tr && tr._intersections) {
      var ctx = this.contextTop;
      ctx.beginPath();
      ctx.strokeStyle = "red";
      for (var i in tr._intersections) {
        var _coord = tr._intersections[i];
        ctx.moveTo(_coord.x + 5, _coord.y);
        ctx.arc(_coord.x, _coord.y, 5, 0, 2 * Math.PI);
      }
      for (var i in tr.lines) {
        var _l = tr.lines[i];
        ctx.moveTo(_l[0].x, _l[0].y);
        ctx.lineTo(_l[1].x, _l[1].y);
      }
      for (var i in tr.mlLines) {
        var _l = tr.mlLines[i];
        ctx.moveTo(_l[0].x, _l[0].y);
        ctx.lineTo(_l[1].x, _l[1].y);
      }
      ctx.stroke();
    }
  },
  _scaleObjectEasy: function _scaleObjectEasy(x, y, by) {
    //_scaleObject_overwritten.call(this, x, y, by);
    var tr = this._currentTransform,
        target = tr.target,
        corner = tr.corner;
    if (!target.movementLimits) {
      return _scaleObject_overwritten.call(this, x, y, by);
    }

    if (target.movementLimitMode !== 'fit') return;
    x = Math.min(target.movementLimits.width, Math.max(0, x));
    y = Math.min(target.movementLimits.height, Math.max(0, y));
    _scaleObject_overwritten.call(this, x, y, by);
  },
  /**
   * Scales object by invoking its scaleX/scaleY methods
   * @private
   * @param {Number} x pointer's x coordinate
   * @param {Number} y pointer's y coordinate
   * @param {String} by Either 'x' or 'y' - specifies dimension constraint by which to scale an object.
   *                    When not provided, an object is scaled by both dimensions equally
   */
  _scaleObject: function _scaleObject(x, y, by) {
    var _scaled = _scaleObject_overwritten.call(this, x, y, by);

    var tr = this._currentTransform,
        target = tr.target,
        corner = tr.corner;
    var _v = this.viewportTransform;

    if (!target.movementLimits || target.movementLimitMode !== "fit") {
      return _scaled;
    }
    target.setCoords();

    var _scale = this.getZoom();

    if (target.movementLimits == this) {
      var _w = this.originalWidth || this.width;
      var _h = this.originalHeight || this.height;
      var _l = this.viewportTransform[4];
      var _t = this.viewportTransform[5];
      _w *= _scale;
      _h *= _scale;
      var _rc = {
        tl: { x: _l, y: _t },
        tr: { x: _l + _w, y: _t },
        bl: { x: _l, y: _t + _h },
        br: { x: _l + _w, y: _t + _h }
      };
    } else {
      target.movementLimits.setCoords();
      var _rc = target.movementLimits.oCoords;
    }

    if (!tr.pointerOffset) {
      tr.pointerOffset = {
        x: x * _v[0] - target.oCoords[corner].x,
        y: y * _v[3] - target.oCoords[corner].y
      };

      tr.pointCenter = target.getCenterPoint();
      tr.pointCenter.x *= _scale;
      tr.pointCenter.y *= _scale;
      tr.pointOriginal = tr.original.oCoords[corner];
    }

    tr.pointTranformed = target.oCoords[corner];

    tr.mlLines = [];
    tr.lines = [];
    function _intersection(corner, coordinate) {
      var _oc;
      if (coordinate == "x" && corner[0] != "m") {
        _oc = tr.original.oCoords["m" + corner[0]];
      } else if (coordinate == "y" && corner[0] != "m") {
        _oc = tr.original.oCoords["m" + corner[1]];
      } else {
        _oc = tr.pointCenter;
        _oc = {
          x: _oc.x + _v[4],
          y: _oc.y + _v[5]
        };
      }
      var _tc = target.oCoords[corner];

      tr.lines.push([_oc, _tc]);
      tr.mlLines.push([_rc.tl, _rc.tr]);
      tr.mlLines.push([_rc.tr, _rc.br]);
      tr.mlLines.push([_rc.br, _rc.bl]);
      tr.mlLines.push([_rc.bl, _rc.tl]);

      var inters = fabric.Intersection.intersectLinePolygon(_oc, _tc, [_rc.tl, _rc.tr, _rc.br, _rc.bl]);
      if (!inters.points.length) {
        return;
      }
      inters.points[0].coordinate = coordinate;
      tr._intersections.push(inters.points[0]);

      //         if (coordinate) {
      //           var p1 = inters.points[0];

      //           var corner2;
      //           if (coordinate == "x") {
      //             corner2 = (corner[0] == "t" ? "b" : "t") + corner[1];
      //           } else {
      //             corner2 = corner[0] + (corner[1] == "l" ? "r" : "l");
      //           }
      //           var _p2 = target.oCoords[corner2];
      //           var _diff = {x: _tc.x - p1.x, y: _tc.y - p1.y};

      //           var p2 = {
      //             x: _p2.x - _diff.x,
      //             y: _p2.y - _diff.y
      //           };

      //           var its = fabric.Intersection.intersectLineLine(tr.pointCenter, tr.pointTranformed, p1, p2);
      //           if (!its.points[0]) {
      //             return;
      //           }
      //           tr._intersections.push(its.points[0]);
      //         } else {
      //           tr._intersections.push(inters.points[0]);
      //         }


      //
      //if(inters.points.length){
      //  _scaleObject_overwritten.call(this, inters.points[0].x,  inters.points[0].y, by);
      //  target.setCoords();
      //}else{
      //  _scaleObject_overwritten.call(this, x, y, by);
      //}
    }

    tr._intersection = null;
    tr._intersections = [];
    switch (corner) {
      case "tl":
        _intersection("tl");
        _intersection("bl", "x");
        _intersection("tr", "y");
        break;
      case "tr":
        _intersection("tr");
        _intersection("tl", "y");
        _intersection("br", "x");
        break;
      case "br":
        _intersection("br");
        _intersection("tr", "x");
        _intersection("bl", "y");
        break;
      case "bl":
        _intersection("bl");
        _intersection("tl", "x");
        _intersection("br", "y");
        break;
      case "mt":
        _intersection("mt");
        _intersection("tl", "y");
        _intersection("tr", "y");
        break;
      case "mb":
        _intersection("mb");
        _intersection("bl", "y");
        _intersection("br", "y");
        break;
      case "mr":
        _intersection("mr");
        _intersection("tr", "x");
        _intersection("br", "x");
        break;
      case "ml":
        _intersection("ml");
        _intersection("tl", "x");
        _intersection("bl", "x");
    }

    if (!tr._intersections.length) {
      return _scaled;
    }

    var _newXY = tr._intersections[0];
    var _l = tr._intersections[0].distanceFrom(tr.pointOriginal);

    for (var i = 1; i < tr._intersections.length; i++) {
      var _l2 = tr._intersections[i].distanceFrom(tr.pointOriginal);
      if (_l2 < _l) {
        _newXY = tr._intersections[i];
        _l = _l2;
      }
    }
    tr._intersection = _newXY;

    if (by == "equally") {
      //by = false;

      var _diff2 = { x: _newXY.x - tr.pointCenter.x, y: _newXY.y - tr.pointCenter.y };
      var _l = Math.sqrt(_diff2.x * _diff2.x + _diff2.y * _diff2.y);

      _newXY.x -= _diff2.x / _l * target.strokeWidth;
      _newXY.y -= _diff2.y / _l * target.strokeWidth;
      // scrt(x*x + y*y) = atrokewidth
      var a = 1;
    }
    //return _scaleObject_overwritten.call(this, x, y, by);
    var __x = (_newXY.x + tr.pointerOffset.x) / _v[0];
    var __y = (_newXY.y + tr.pointerOffset.y) / _v[3];
    return _scaleObject_overwritten.call(this, __x, __y, by);

    //
    //if (corner == "br" || corner == "tr" || corner == "mr") {
    //  if (x < target.movementXMaxLimit) {
    //    x = target.movementXMaxLimit;
    //  }
    //}
    //if (corner == "bl" || corner == "tl" || corner == "ml") {
    //  if (x > target.movementXMinLimit) {
    //    x = target.movementXMinLimit;
    //  }
    //}
    //if (corner == "bl" || corner == "br" || corner == "mb") {
    //  if (y < target.movementYMaxLimit) {
    //    y = target.movementYMaxLimit;
    //  }
    //}
    //if (corner == "tl" || corner == "tr" || corner == "mt") {
    //  if (y > target.movementYMinLimit) {
    //    y = target.movementYMinLimit;
    //  }
    //}
    //
    //_scaleObject_overwritten.call(this, x, y, by);
  },
  movementLimitsOnAddAction: 'translate',
  _check_object_after_modified: function _check_object_after_modified(target) {
    if (!this._currentTransform) {
      return;
    }
    var pos = this.getFixedPosition(target, target.left, target.top);

    switch (this._currentTransform.corner) {
      case "mtr":
        if (pos.left !== undefined) {
          target.set('left', pos.left);
        }
        if (pos.top) {
          target.set('top', pos.top);
        }
        break;
      case "mr":
      case "br":
        if (pos.left !== undefined) {
          var _ldiff = target.left - pos.left;
        }
        if (pos.top !== undefined) {
          var _tdiff = target.top - pos.top;
        }

        if (_ldiff && (!_tdiff || Math.abs(_ldiff) > Math.abs(_tdiff))) {
          if (_ldiff < 0) {
            target.width += _ldiff;
          } else {
            target.width -= _ldiff;
          }
        } else if (_tdiff) {
          if (_tdiff < 0) {
            target.width += _tdiff;
          } else {
            target.width -= _tdiff;
          }
        }
      //console.log(pos,_ldiff,_tdiff)
    }
    // this._check_object_position(target)
  },
  _check_object_position: function _check_object_position(target) {

    var pos = this.getFixedPosition(target, target.left, target.top);
    if (this.movementLimitsOnAddAction == 'translate') {
      if (pos.left !== undefined) {
        target.set('left', pos.left);
      }
      if (pos.top !== undefined) {
        target.set('top', pos.top);
      }
    } else {

      if (pos.left !== undefined) {
        if (target.left < pos.left) {
          target.width += target.left - pos.left;
          target.left = pos.left;
        } else {
          target.width -= target.left - pos.left;
        }
      }
      if (pos.top !== undefined) {
        if (target.top < pos.top) {
          target.height += target.top - pos.top;
          target.top = pos.top;
        } else {
          target.height -= target.top - pos.top;
        }
      }
    }

    if (pos.scaleX) {
      target.scaleX = target.scaleX *= pos.scaleX;
    }
    if (pos.scaleY) {
      target.scaleY = target.scaleY *= pos.scaleY;
    }

    target.setCoords();

    this.renderAll();
    // if(target.wholeCoordinates){
    //   target.top = Math.round(target.top);
    //   target.left = Math.round(target.left);
    //   target.height = Math.round(target.height);
    //   target.width = Math.round(target.width);
    // }
  },
  _translateObject: function _translateObject(x, y, limits) {
    var target = this._currentTransform.target;
    if (target.beforeTranslate) {
      var _point = target.beforeTranslate(x, y);
      if (!_point) return false;
      x = _point.x;
      y = _point.y;
    }
    var _translated = _translateObject_overwritten.call(this, x, y, limits);

    if (this.movementLimits) {

      var pos = this.getFixedPosition(target, x, y);

      if (pos.scaleX) {
        target.scaleX = this._currentTransform.scaleX *= pos.scaleX;
      }
      if (pos.scaleY) {
        target.scaleY = this._currentTransform.scaleY *= pos.scaleY;
      }

      if (pos.top !== undefined || pos.left !== undefined) {
        _translated = _translateObject_overwritten.call(this, pos.left !== undefined ? pos.left : x, pos.top !== undefined ? pos.top : y);
      }
    }
    return _translated || pos.scaleX || pos.scaleY;

    /* if (!target.get('lockMovementX')) {
     var _val = x - this._currentTransform.offsetX;
      //left offset
     var lim = this.movementLimits.minX.constructor == Number ? this.movementLimits.minX : -bounds.width + 1;
     if(target.movementXMinLimit && target.movementXMinLimit.constructor == Number && target.movementXMinLimit > lim ){
     lim = target.movementXMinLimit ;
     }
      _val = Math.min(lim, _val);
      //right offset
     var lim = this.movementLimits.maxX.constructor == Number ? this.movementLimits.maxX : this.width + bounds.width - 1;
     if(target.movementXMaxLimit && target.movementXMaxLimit.constructor == Number && target.movementXMaxLimit > lim ){
     lim = target.movementXMaxLimit ;
     }
     _val = Math.max(lim  - target.width * target.scaleX, _val);
     target.set('left', _val);
     }
     if (!target.get('lockMovementY')) {
     var _val = y - this._currentTransform.offsetY;
     if(target.movementYMinLimit !== undefined)
     _val = Math.min(target.movementYMinLimit, _val);
     if(target.movementYMaxLimit !== undefined)
     _val = Math.max(target.movementYMaxLimit  - target.height, _val);
      target.set('top', _val);
     }
     */
    //movementLimits ={
    //    xmin: 0,
    //    xmax: 0,
    //    ymin: 0,
    //    ymax: 0
    //};
  },

  _beforeTransform: function _beforeTransform(e, target) {
    target && target._beforeTransform ? target._beforeTransform(e) : _beforeTransform_overwritten.call(this, e, target);
  },
  _beforeTransformNative: _beforeTransform_overwritten
  /**
   * Translates object by "setting" its left/top
   * @private
   * @param {Number} x pointer's x coordinate
   * @param {Number} y pointer's y coordinate
   * @return {Boolean} true if the translation occurred
   */
  /* _translateObject: function (x, y) {
     var transform = this._currentTransform,
       target = transform.target,
       newLeft = x - transform.offsetX,
       newTop = y - transform.offsetY,
       moveX = !target.get('lockMovementX') && target.left !== newLeft,
       moveY = !target.get('lockMovementY') && target.top !== newTop;
  
     //round coordinates
     // if (target.wholeCoordinates) {
     //   newLeft = Math.round(newLeft);
     //   newTop = Math.round(newTop);
     // }
      moveX && target.set('left', newLeft);
     moveY && target.set('top', newTop);
     return moveX || moveY;
   }*/
});

//fabric.Canvas.addPlugin("loaders",function(){
//    this.initMovementLimits();
//});

//todo
// fabric.Rect.prototype.stateProperties   = fabric.Rect.prototype.stateProperties.concat(["movementLimits","clipTo"]);
// fabric.Object.prototype.stateProperties = fabric.Object.prototype.stateProperties.concat(["movementLimits","clipTo"]);
// fabric.IText.prototype.stateProperties  = fabric.IText.prototype.stateProperties.concat(["movementLimits","clipTo"]);
// fabric.Image.prototype.stateProperties  = fabric.Image.prototype.stateProperties.concat(["movementLimits","clipTo"]);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {
//require("./../core/base.js");
//require("./../core/slide.js");

__webpack_require__(6);

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  optionsOrder: fabric.StaticCanvas.prototype.optionsOrder && function () {
    var oo = fabric.StaticCanvas.prototype.optionsOrder;
    oo.splice(oo.indexOf("*"), 0, "areas", "offsets", "helpers");
    return oo;
  }(),
  _helpersObjects: null,
  _areasObjects: null,
  _update_clip_rect: function _update_clip_rect() {
    //todo
    return;
    if (this.areas || !this._areasObjects[0]) return;
    var geometry = fabric.util.getRect(this.width, this.height, this.offsets);
    this._areasObjects[0].set(geometry);
  },
  //offsets: {left : 0,t``````````````````````````````op : 0, right: 0, bottom:0},
  setHelpers: function setHelpers(helpers, callback) {
    var _this2 = this;

    return false; //todo
    this.helpers = helpers;
    this._helpersObjects = [];
    if (helpers) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = helpers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var h = _step.value;

          this.createObject(h, function (helper) {
            _this2._helpersObjects.push(helper);
            _this2.renderAll();
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    callback && callback();
  },
  storeProperties: fabric.StaticCanvas.prototype.storeProperties && fabric.StaticCanvas.prototype.storeProperties.concat(["offsets", "helpers", "areas"]),
  areaActivating: false,
  addElementsInsideActiveArea: false,
  areaProperties: {
    originX: 'left',
    originY: 'top',
    fill: 'transparent',
    strokeDashArray: [5, 5],
    strokeWidth: 1,
    stroke: 'black',
    resizable: true
    //selectable: false
  },
  setAreaProperty: function setAreaProperty(property, value) {
    this["area_" + property] = value;
    if (this._offsetsObject) {
      this._offsetsObject[property] = value;
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this._areasObjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var object = _step2.value;

        object[property] = value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.renderAll();
  },
  setActiveArea: function setActiveArea(area) {
    if (this.activeArea) {
      this.activeArea.setStroke("#000");
    }
    this.activeArea = area;
    if (area) {
      area.setStroke("#B7F1ED");
    }
  },
  setAreaActivating: function setAreaActivating(value /*, force*/) {
    //todo force
    var force = true;
    if (force || value && !this.areaActivating) {
      this.areaActivating = true;
      this.on("object:modified", function (e) {
        if (!this._areasObjects) return;
        if (this.editingObject) {
          return;
        }
        //todo event! не ъотел бы это тут испольовать,но работает
        var pointer = this.getPointer(event, true);
        var target = this._searchPossibleTargets(this._areasObjects, pointer);
        if (this._currentTransform && target && this.application.target.movementLimits != target) {
          this.application.target.set({
            movementLimits: target,
            clipTo: target
          });
          this.setActiveArea(target);
        }
      });
      this.on("mouse:down", function (e) {
        if (!this._areasObjects) return;
        var pointer = this.getPointer(e.e, true);
        var target = this._searchPossibleTargets(this._areasObjects, pointer);
        if (target) {
          this.setActiveArea(target);
        }
      });
    }
  },
  _update_area_geometry: function _update_area_geometry(el, options) {

    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;

    if (options.path) {

      options.width = options.width || el.width;
      var geometry = fabric.util.getRect(_w, _h, options);
      var _scale = el.width / geometry.width;
      el.set({
        left: geometry.left, ///* el.left * _scale*/,
        top: geometry.top, //+ el.top * _scale,
        scaleX: _scale,
        scaleY: _scale
      });
      return;
    }

    var geometry = fabric.util.getRect(_w, _h, options);

    if (options.src) {
      var _scale = geometry.width / img.width;
      el.set({
        left: geometry.left, // + el.left * _scale,
        top: geometry.top, //+ el.top * _scale,
        strokeWidth: this.areaProperties.strokeWidth / _scale,
        scaleX: _scale,
        scaleY: _scale
      });
    } else {
      // geometry.width -= el.strokeWidth * 2;
      // geometry.height -= el.strokeWidth * 2;
      el.set(geometry);
    }
  },
  _renderOverlayObjects: function _renderOverlayObjects(ctx) {
    if (this._offsetsObject) {
      this._offsetsObject.render(ctx);
    }
    if (this._areasObjects) {
      this._renderObjects(ctx, this._areasObjects);
    }
    if (this._helpersObjects) {
      this._renderObjects(ctx, this._helpersObjects);
    }
  },
  createArea: function createArea(area, callback) {

    var _this = this;

    var _finalize = function (path, area) {
      path.id = area.id;
      //
      // area.instance = path;
      // path.layer = "background";
      // this.add(path);
      this._update_area_geometry(path, area);
      this._areasObjects.push(path);
      // _this._backgroundLayer.push(path);
      // path.canvas = _this;
      callback();
    }.bind(this);

    var path, rectarea;
    if (area.path) {
      path = new fabric.Path(area.path, this.areaProperties);
      area.top = path.top;
      area.left = path.left;
      area.width = path.width;
      area.height = path.height;
      _finalize(path, area);
    } else if (area.src) {
      var clipFiller = new fabric.Pathfinder({});
      fabric.util.loadImage(area.src, function (img) {
        clipFiller.setImage(img);
        clipFiller.mask = MagicWand.selectBackground(clipFiller.getInfo(), null, 15);

        var contours = clipFiller.getContours();
        var clipPoints = contours[1].points;
        var pathData = fabric.PencilBrush.prototype.convertPointsToSVGPath(clipPoints).join(''); //todo
        path = new fabric.Path(pathData, _this.areaProperties);

        _finalize(path, area);
      });
    } else {
      path = new fabric.Rect(this.areaProperties);
      _finalize(path, area);
    }

    if ((area.right || area.bottom || area.path) && (!this.originalWidth || !this.originalHeight)) {
      this.on("background-image:loaded", function () {
        this._update_area_geometry(path, area);
        this.renderAll();
      }.bind(this));
    }

    /*
     app.canvas.setOffsets({
     right:  1,
     left:   1,
     top:    1,
     bottom: 1
     });
       app.canvas.clipTo = function (ctx) {
     var zoom = app.canvas_config.width / app.canvas.backgroundImage.filters[0].pathfinder.mask.width;
     ctx.save();
     ctx.scale(zoom, zoom);
     app.clipFiller.traceInner(ctx);
     ctx.restore();
     };*/
  },
  removeArea: function removeArea(area) {
    /*
        var objs = this.getObjects();
        for (var i in objs) {
          if (objs[i].movementLimits === area) {
            delete objs[i].movementLimits;
          }
          if (objs[i].clipTo === area) {
            //if(objs[i].olcClipToID){
            //    objs[i].clipToID = objs[i].oldClipToID;
            //}
            delete objs[i].clipTo;
            //objs[i].olcClipToID = area.id;
          }
        }
        area.remove();*/
  },
  /**
   *
   * @param offsets : {top: number, right: number, bottom: number, left: number} | number | [?number,?number,?number,?number]
   * @param callback
   */
  setOffsets: function setOffsets(offsets) {
    var _this3 = this;

    if (offsets === null) {
      this.offsets = { top: 0, right: 0, bottom: 0, left: 0 };
    } else if (offsets.constructor === Number) {
      this.offsets = { top: offsets, right: offsets, bottom: offsets, left: offsets };
    } else if (offsets.constructor === Array) {
      switch (offsets.length) {
        case 0:
          this.offsets = { top: 0, right: 0, bottom: 0, left: 0 };break;
        case 1:
          this.offsets = { top: offsets[0], right: offsets[0], bottom: offsets[0], left: offsets[0] };break;
        case 2:
          this.offsets = { top: offsets[0], right: offsets[1], bottom: offsets[0], left: offsets[1] };break;
        case 3:
          this.offsets = { top: offsets[0], right: offsets[1], bottom: offsets[2], left: offsets[1] };break;
        case 4:
          this.offsets = { top: offsets[0], right: offsets[1], bottom: offsets[2], left: offsets[3] };break;
      }
    } else {
      this.offsets = offsets;
    }

    if (this.offsets.top || this.offsets.bottom || this.offsets.left || this.offsets.right) {

      this._offsetsObject = new fabric.Rect(this.offsets);
      this._offsetsObject.set(this.areaProperties);
      this._update_area_geometry(this._offsetsObject, this.offsets);

      this.on("viewport:scaled", function () {
        _this3._update_area_geometry(_this3._offsetsObject, _this3.offsets);
      });

      this.on("dimensions:modified", function () {
        _this3._update_area_geometry(_this3._offsetsObject, _this3.offsets);
      });

      if (this.areaActivating) {
        this.setActiveArea(this._offsetsObject || null);
      }
    } else {
      this._offsetsObject = null;
    }

    this.renderAll();
  },
  setAreas: function setAreas(areas, callback) {
    this._areasObjects = [];
    areas = areas || [];
    if (this.areas) {
      for (var i = this.areas.length; i--;) {
        this.removeArea(this.areas[i].instance);
      }
    }
    this.areas = areas;

    var cb = fabric.util.queueLoad(areas.length + 1, function () {
      if (this.areaActivating) {
        this.setActiveArea(this._areasObjects[0] || null);
      }

      /* var objs = this.getObjects();
      //work with object
       if (!areas.length) {
         objs.length && this.clear();
       } else {
         /* todo : применить текущую зону ко всем объектам
          var _area = this.activeArea || this.layers.background.objects[0];
          for (var i in objs) {
          var obj = objs[i];
          obj.clipTo = _area;
          obj.setMovementLimits(_area);
          obj.setCoords();
          }*/
      //}*/
      callback && callback.call(this);
    }.bind(this));

    for (var i in areas) {
      if (!areas[i].id) {
        areas[i].id = "__" + i;
      }
      this.createArea(areas[i], cb);
    }
    cb();

    this.renderAll();
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  defaultOptions: fabric.util.object.extend(fabric.Canvas.prototype.defaultOptions, {
    //offsets: {left : 0,top : 0, right: 0, bottom:0}
  }),
  eventListeners: fabric.util.object.extendArraysObject(fabric.Canvas.prototype.eventListeners, {
    "before:drop": function beforeDrop(e) {
      //todo;
      if (!this._backgroundLayer) {
        return;
      }
      var pointer = this.getPointer(e.originalEvent, true);
      var target = this._searchPossibleTargets(this._backgroundLayer, pointer);
      if (target) {
        this.setActiveArea(target);
        e.data.clipTo = "#" + target.id;
        e.data.movementLimits = "#" + target.id;
      }
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var _OBJ = fabric.Object.prototype;
var _handleGrouping_overwritten = fabric.Canvas.prototype._handleGrouping;
fabric.Object.prototype.groupable = true;

fabric.util.object.extend(fabric.Canvas.prototype, {
  /**
   * Deactivates all objects and dispatches appropriate events
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  deactivateAllWithDispatch: function deactivateAllWithDispatch(e) {
    var activeGroup = this.getActiveGroup(),
        activeObject = this.getActiveObject();
    var _target = activeObject || activeGroup;
    if (_target) {
      this.fire('before:selection:cleared', { target: _target, e: e });
    }
    this.deactivateAll();
    if (_target) {
      this.fire('selection:cleared', { e: e, target: _target });
      _target.fire('deselected');
    }
    return this;
  },

  /**
   * adding before:selection:created event
   * @private
   * @param {Event} e Event object
   * @param {fabric.Object} target
   */
  _handleGrouping: function _handleGrouping(e, target) {
    this.fire("before:selection:created");
    _handleGrouping_overwritten.call(this, e, target);
  },
  /**
   * @private
   * @param {Event} e mouse event
   */
  _groupSelectedObjects: function _groupSelectedObjects(e) {

    var group = this._collectObjects();

    group = fabric.util.object.filter(group, { groupable: true });

    // do not create group for 1 element only
    if (group.length === 1) {
      this.setActiveObject(group[0], e);
    } else if (group.length > 1) {
      group = new fabric.Group(group.reverse(), {
        canvas: this
      });
      group.addWithUpdate();
      this.setActiveGroup(group, e);
      group.saveCoords();
      this.fire('selection:created', { target: group });
      this.renderAll();
    }
  }
});

_OBJ.clone = function (callback, propertiesToInclude) {
  var _obj = this.toObject(propertiesToInclude);
  _obj.application = this.application;
  if (this.constructor.fromObject) {
    return this.constructor.fromObject(_obj, callback);
  }
  return new fabric.Object(this.toObject(propertiesToInclude));
};

_OBJ.cloneSync = function () {
  var _klass = fabric[fabric.util.string.camelize(fabric.util.string.capitalize(this.type))];
  if (_klass.async) {
    var _obj = new _klass.fromObject(this, function () {});
  } else {
    var _obj = this.clone();
  }
  _obj.canvas = this.canvas;
  return _obj;
};

fabric.util.object.extend(fabric.Group.prototype, {
  isPossibleTarget: function isPossibleTarget(e, object) {
    return this.searchPossibleTargets(e, [object]).target !== null;
  },
  /**
   * return inner target and group of targets under the cursor
   * @param e
   * @param objects
   * @returns {{target: null, group: Array}}
   */
  searchPossibleTargets: function searchPossibleTargets(e, objects) {

    if (!objects) objects = this._objects;
    var pointer = this.canvas.getPointer(e, true);
    var i = objects.length,
        normalizedPointer = this.canvas._normalizePointer(this, pointer);

    var targets = {
      target: null,
      group: []
    };
    while (i--) {
      if (this.canvas._checkTarget(normalizedPointer, objects[i])) {
        if (!targets.target) targets.target = objects[i];
        targets.group.push(objects[i]);
      }
    }
    return targets;
  },

  groupSelectable: true,
  cloneSync: function cloneSync() {
    var _clonedObjects = this._objects.map(function (object) {
      return object.cloneSync();
    });

    var object = this.toObject();
    delete object.objects;

    return new fabric.Group(_clonedObjects, object, true);

    // fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
    //   delete object.objects;
    //   callback && callback(new fabric.Group(enlivenedObjects, object, true));
    // });
  },
  _calcBounds: function _calcBounds(onlyWidthHeight) {
    var aX = [],
        aY = [],
        o,
        prop,
        props = ['tr', 'br', 'bl', 'tl'];

    for (var i = 0, len = this._objects.length; i < len; ++i) {
      o = this._objects[i];
      if (o.notSelectableInTheGroup) {
        continue;
      }
      o.setCoords();
      for (var j = 0; j < props.length; j++) {
        prop = props[j];
        aX.push(o.oCoords[prop].x);
        aY.push(o.oCoords[prop].y);
      }
    }

    this.set(this._getBounds(aX, aY, onlyWidthHeight));
  },
  initialize_overwritten: fabric.Group.prototype.initialize,
  isSelectionGroup: function isSelectionGroup() {
    return this.canvas._objects.indexOf(this) === -1;
  },
  //clone: function(callback){
  //  if(callback === true || callback.constructor === Object){
  //    var _frame = new fabric.Group(this);
  //    if(callback.constructor === Object){
  //      _frame.set(callback);
  //      return _frame;
  //    }
  //  }
  //  return this.callSuper('clone',callback);
  //},
  initialize: function initialize(objects, options) {
    if (objects.constructor != Array) {
      var el = objects;
      options = el.toObject();
      objects = [];
      for (var i in el._objects) {
        objects.push(el._objects[i].cloneSync());
      }
    }

    this.initialize_overwritten(objects, options);
    if (this.type == 'group') {
      this.on("dblclick", function () {
        if (this.canvas._objects.indexOf(this) === -1) {
          this.groupSelectedElements();
        } else {
          this.ungroup();
        }
      });
    }
  },
  ungroup: function ungroup() {
    var _canvas = this.canvas;
    _canvas.discardActiveGroup();
    this._restoreObjectsState();
    for (var i in this._objects) {
      _canvas.add(this._objects[i]);
      this._objects[i].clipTo = this.clipTo;
      //this._objects[i].active = true;
    }
    _canvas.remove(this);
    var group = new fabric.Group(this._objects, {
      canvas: _canvas
    });
    group.addWithUpdate();
    _canvas.setActiveGroup(group);
    group.saveCoords();
    _canvas.fire('selection:created', { target: group });
    _canvas.renderAll();

    //var _group = new fabric.Group(this._objects);
    //_group.canvas = _canvas;
    //_canvas.setActiveObject(_group);
  },

  groupSelectedElements: function groupSelectedElements() {

    var el = this.cloneSync();
    this.canvas.add(el);
    this.canvas.discardActiveGroup();
    this.canvas.setActiveObject(el);

    for (var i in this._objects) {
      this.canvas.remove(this._objects[i].originalObject);
    }
  },
  actions: {

    remove: {
      className: 'fa fa-trash',
      title: 'Delete',
      key: "Delete",
      action: function action() {
        if (this.isSelectionGroup()) {
          for (var i in this._objects) {
            var _obj = this._objects[i];
            this.canvas.remove(_obj.originalObject);
          }
          this.canvas.discardActiveGroup();
          this.canvas.discardActiveObject();
        } else {
          this.canvas.remove(this);
        }
        this.canvas.renderAll();
      }
    },
    duplicate: {
      className: 'fa fa-clone',
      title: 'Duplicate',
      action: function action() {
        if (this.isSelectionGroup()) {
          this.canvas.fire('before:selection:cleared', { target: this, e: null });
          this.canvas.discardActiveGroup();
          this.duplicate(function (el) {
            el.ungroup();
          });

          this.canvas.renderAll();
        } else {
          this.duplicate();
        }
      }
    },
    groupSelectedElements: {
      title: 'группа',
      className: 'fa fa-object-group',
      visible: function visible() {
        return this.isSelectionGroup();
      },
      action: function action() {
        this.groupSelectedElements();
        this.canvas.renderAll();
      }
      //visible: IDE.groupAvailable
    },
    ungroup: {
      title: 'группа',
      className: 'fa fa-object-ungroup',
      visible: function visible() {
        return this.type == "group" && this.canvas._objects.indexOf(this) !== -1;
      },
      action: function action() {
        this.ungroup();
        this.canvas.renderAll();
      }
    }
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  eventListeners: fabric.util.object.extendArraysObject(fabric.Canvas.prototype.eventListeners, {
    'selection:created': function selectionCreated(event) {
      this._onSelectionCreated(event);
    }
  }),
  _onSelectionModified: function _onSelectionModified() {
    for (var i in this._objects) {

      var copy = this._objects[i].cloneSync();
      copy.group = this;
      this._restoreObjectState(copy);

      this._objects[i].originalObject.set({
        clipTo: this.clipTo,
        movementLimits: this.movementLimits,
        left: copy.left,
        top: copy.top,
        angle: copy.angle,
        scaleX: copy.scaleX,
        scaleY: copy.scaleY,
        skewX: copy.skewX,
        skewY: copy.skewY,
        width: copy.width,
        height: copy.height
      });
    }
  },
  _onSelectionDeselected: function _onSelectionDeselected(data) {
    for (var i in this._objects) {
      var _obj = this._objects[i];
      _obj.originalObject.setCoords();
      _obj.originalObject.evented = true;
      delete _obj.originalObject.hiddenActive;
    }
  },
  _onSelectionCreated: function _onSelectionCreated(el) {

    var group = el.target;

    var originalObjects = [];
    for (var i in group._objects) {
      var _obj = group._objects[i];
      originalObjects.push(_obj.originalObject || _obj);
    }

    group.destroy();
    group._objects = [];

    var _clipTo = originalObjects[0].clipTo;

    for (var i in originalObjects) {
      var original = originalObjects[i];

      if (_clipTo != original.clipTo) {
        _clipTo = false;
      }

      var _obj = original.cloneSync();

      _obj.set({
        clipTo: null,
        originalObject: original
      });
      original.set({
        active: false,
        evented: false,
        hiddenActive: true
      });

      group.addWithUpdate(_obj);
      group.setCoords();
    }

    group.clipTo = _clipTo;

    group.on({
      "modified": this._onSelectionModified,
      'deselected': this._onSelectionDeselected
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.History = __webpack_require__(51);

fabric.util.object.extend(fabric.Editor.prototype.actions, {
  undo: {
    key: 'z',
    observe: 'changed',
    className: 'fa fa-  undo',
    title: 'Undo',
    enabled: 'canUndo',
    action: function action() {
      this.undo();
    },
    target: function target() {
      return this.history;
    }
  },
  records: {
    title: "Records",
    itemClassName: "filters-selector",
    className: "fa fa-history",
    type: "select",
    target: function target() {
      return this.history;
    },
    dropdown: {
      width: 300,
      templateSelection: function templateSelection(state, container) {
        if (state.any) {
          return state.text;
        }
        return $('<span>' + state.id + ":" + state.type + '</span>');
      },
      templateResult: function templateResult(state, container, data) {
        if (!state.type) return;
        var _keys = state.originalState && Object.keys(state.originalState).join(',') || '';
        var type = state.object && state.object.type || '';
        return $("<span title='{id}:{type}({otype} {keys})'>{id}:{type}({otype} {keys})</span>".format(fabric.util.object.extend({
          keys: _keys,
          otype: type
        }, state)));
      }
    },
    value: {
      observe: 'changed',
      set: function set(val, filtersData) {
        this.goto(val);
      },
      get: function get() {
        return this.records[this.current].id;
      },
      options: function options() {
        return this.records;
      }
    }
  },
  redo: {
    key: 'y',
    observe: 'changed',
    className: 'fa fa-repeat',
    title: 'Redo',
    enabled: 'canRedo',
    action: function action() {
      this.redo();
    },
    target: function target() {
      return this.history;
    }
  },
  history: {
    title: 'History',
    type: 'menu',
    menu: ["redo", "undo"]
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  onCanvasModified: function onCanvasModified(e) {
    var _this = this;

    if (!this._isHistoryActive()) return;

    var states = this.getModifiedStates();
    if (!states) return;

    this.history.add({
      canvas: this,
      originalState: states.original,
      modifiedState: states.modified,
      type: 'canvas:modified',
      undo: function undo(a) {
        _this.set(a.originalState).fire('modified').renderAll();
      },
      redo: function redo(a) {
        _this.set(a.modifiedState).fire('modified').renderAll();
      }
    });
  },
  onCanvasCleared: function onCanvasCleared(e) {
    var _this2 = this;

    if (!this._isHistoryActive()) return;

    var states = this.getModifiedStates();

    if (!e.objects.length && !states) {
      return;
    }

    this.history.add({
      originalState: states && states.original,
      modifiedState: states && states.modified,
      originalObjects: e.objects,
      type: 'canvas:cleared',
      redo: function redo(a) {
        _this2._clearObjects();
        if (a.originalState) {
          _this2.set(a.modifiedState).fire('modified');
        }
        _this2.renderAll();
      },
      undo: function undo(a) {
        _this2._objects = _this2._objects.concat(a.originalObjects);
        if (a.modifiedState) {
          _this2.set(a.originalState).fire('modified');
        }
        _this2.renderAll();
      }
    });
  },
  onObjectModified: function onObjectModified(e) {
    if (!this._isHistoryActive()) return;

    var target = e.target,
        states = e.target.getModifiedStates();

    if (!states) return;

    this.history.add({
      canvas: target.canvas.originalSlide || target.canvas,
      originalState: states.original,
      modifiedState: states.modified,
      object: target,
      type: 'object:modified',
      undo: function undo(a) {
        a.object.set(a.originalState);
        a.object.setCoords();
        a.object.fire('modified');
        a.canvas.fire('object:modified', { target: a.object });
        a.canvas.renderAll();
      },
      redo: function redo(a) {
        a.object.set(a.modifiedState);
        a.object.setCoords();
        a.canvas.fire('object:modified', { target: a.object });
        a.object.fire('modified');
        a.canvas.renderAll();
      }
    });
  },
  clearHistory: function clearHistory() {
    this.history.clear();
  },
  disableHistory: function disableHistory() {
    this.history.enabled = false;
  },
  _add_object_historya: function _add_object_historya(a) {
    var _canvas = this.canvas || this;
    // if(this.canvas && a.canvas.mirrorSlide == this.canvas){
    //   _canvas.add(a.object);
    //   _canvas.setActiveObject(a.object);
    //   _canvas.renderAll();
    // }else{
    a.canvas.add(a.object);
    // }
    a.canvas.renderAll();
  },
  _remove_object_historya: function _remove_object_historya(a) {
    a.canvas.remove(a.object);
    a.canvas.renderAll();
    // if(this.canvas && a.canvas.mirrorSlide == this.canvas){
    //   this.canvas.renderAll();
    // }
  },
  _isHistoryActive: function _isHistoryActive() {
    return this.stateful && this.history.enabled && !this.processing && !this.history.processing;
  },
  onObjectRemoved: function onObjectRemoved(e) {
    if (!this._isHistoryActive()) return;
    this.history.add({
      canvas: e.target.canvas.originalSlide || e.target.canvas,
      object: e.target,
      type: 'object:removed',
      redo: this._remove_object_historya,
      undo: this._add_object_historya
    });
  },
  onDrawAfter: function onDrawAfter(event) {
    if (!e.target.canvas.stateful || !this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add(this.freeDrawingBrush.getHistoryRecord(event));
  },
  onObjectAdded: function onObjectAdded(e) {
    if (!this._isHistoryActive()) return;
    this.history.add({
      canvas: e.target.canvas.originalSlide || e.target.canvas,
      object: e.target,
      type: 'object:added',
      undo: this._remove_object_historya,
      redo: this._add_object_historya
    });
  },
  initHistory: function initHistory(history) {
    if (!history) {
      history = new fabric.History(this);
      history.application = this.application;
    }
    this.stateful = true;
    this.history = history;

    this.on({
      'modified': this.onCanvasModified,
      'loading:begin': this.clearHistory,
      'draw:after': this.onDrawAfter,
      'object:modified': this.onObjectModified,
      'canvas:cleared': this.onCanvasCleared,
      'object:added': this.onObjectAdded,
      'object:removed': this.onObjectRemoved
    });

    // let _this = this;
    // this.history.on('changed', function(e){
    // });
    var proto = this.application.prototypes.History;
    if (proto) {
      if (proto.eventListeners) {
        history.on(proto.eventListeners);
      }
    }
  },
  enableHistory: function enableHistory() {
    this.history.enabled = true;
  }
});

fabric.HISTORY_MODE = {
  INDIVIDUAL: "slide",
  SHARED: "global"
};

fabric.util.object.extend(fabric.Editor.prototype, {
  optionsOrder: function () {
    var oo = fabric.Editor.prototype.optionsOrder;
    oo.splice(oo.indexOf("*"), 0, "history");
    return oo;
  }(),
  history: null,
  // _default_event_listeners : {
  //   "slide:change:begin" : function(){
  //     this.processing = true ;
  //     if(this.history){
  //       this.history.processing = true ;
  //     }
  //   },
  //   "slide:changed" : function(){
  //     this.processing = false;
  //     if(this.history){
  //       this.history.processing = false;
  //     }
  //   }
  // },
  setHistory: function setHistory(historyOption) {
    var _this3 = this;

    if (historyOption === fabric.HISTORY_MODE.SHARED) {
      this.history = new fabric.History(this);
      this.enableHistory();

      this.on("slide:created", function (e) {
        e.target.initHistory(_this3.history);
      });
      // this.on("ready",() => {
      //   if (this.slides) {
      //     this.slides.forEach(slide => {
      //       slide.initHistory(this.history);
      //     })
      //   }
      // })
    }
    /* if(historyOption === fabric.HISTORY_MODE.INDIVIDUAL){
       if(this.canvas){
         this.history = new fabric.History(this);
         this.enableHistory();
         this.canvas.initHistory(this.history);
       }
       //todo unsupported
     }*/
  },
  enableHistory: function enableHistory() {
    this.history.enabled = true;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
utils.object = __webpack_require__(3);

/***********************************************************************************************************************
 ** DPHistory
 ***********************************************************************************************************************/

var DPHistory = function DPHistory(parent, initAction) {
  this.parent = parent;
  this.clear(initAction);
};

DPHistory.prototype.setRecords = function (records, current) {
  this.canUndo = records.length;
  this.canRedo = false;

  if (!records.length) {
    records = [{
      type: 'initialized',
      id: 0,
      text: 'initialized'
    }];
  }
  this.records = records;
  this.length = this.records.length;
  this.current = current === undefined ? records.length - 1 : current;
  this.activeAction = this.records[this.current];
  this.fire("changed", { action: this.activeAction });
  return this;
};

DPHistory.prototype.restore = function () {
  this.setRecords(this.saved.records, this.saved.current);
  return this;
};

DPHistory.prototype.save = function () {
  this.saved = {
    current: this.current,
    records: utils.object.cloneDeep(this.records)
  };
  return this;
};

DPHistory.prototype.clear = function (initAction) {
  if (initAction) {
    initAction.id = 0;
  } else {
    initAction = {
      type: 'initialized',
      id: 0,
      text: 'initialized'
    };
  }
  this.records = [initAction];
  this.current = 0;
  this.canUndo = false;
  this.canRedo = false;
  this.activeAction = this.records[this.current];
  this.fire("changed", { action: this.activeAction });
  return this;
};

DPHistory.prototype.add = function (action) {

  if (!this.enabled || this.processing) {
    return false;
  }

  action.moment = new Date().getTime();
  this.canUndo = true;
  this.canRedo = false;
  this.records.splice(this.current + 1);
  this.records.push(action);
  this.length = this.records.length;
  action.id = this.length - 1;
  action.text = action.type || action.text;
  this.current = this.length - 1;

  this.activeAction = this.records[this.current];
  this.fire("changed", { action: action });
  return this;
};
DPHistory.prototype.disable = function () {
  this.enabled = false;
  return this;
};
DPHistory.prototype.enable = function () {
  this.enabled = true;
  return this;
};
DPHistory.prototype.undo = function (noFire) {
  this.canRedo = true;
  var _action = this.records[this.current];
  this.current--;
  this.processing = true;
  _action.undo.call(this.parent, _action);
  this.processing = false;
  if (this.current == 0) {
    this.canUndo = false;
  }
  if (!noFire) {
    this.activeAction = this.records[this.current];
    this.fire("changed", { action: _action });
  }
  return this;
};

DPHistory.prototype.goto = function (index) {
  if (index == this.current) return;
  if (index < this.current) {
    for (var i = this.current - index; i--;) {
      this.undo(true);
    }
  }if (index > this.current) {
    for (var i = index - this.current; i--;) {
      this.redo(true);
    }
  }
  this.activeAction = this.records[this.current];
  this.fire("changed", { action: this.activeAction });
  return this;
};

DPHistory.prototype.redo = function (noFire) {
  if (this.current == this.length - 1) {
    return;
  }
  this.processing = true;
  this.canUndo = true;
  this.current++;
  var _action = this.records[this.current];

  _action.redo.call(this.parent, _action);

  if (this.current == this.length - 1) {
    this.canRedo = false;
  }
  this.processing = false;
  if (!noFire) {
    this.activeAction = this.records[this.current];
    this.fire("changed", { action: _action });
  }
  return this;
};
utils.observable(DPHistory.prototype);
module.exports = DPHistory;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

/////////////////module responsive borders//////////////////////////////////////////////////////////////////////////////////////////

fabric.util.object.extend(fabric.Object.prototype, {
  responsiveBorders: false,
  centerAndZoomOut: function centerAndZoomOut() {
    this.canvas.centerOnObject(this);
  }
});

if (!fabric.Canvas.prototype._default_event_listeners) {
  fabric.Canvas.prototype._default_event_listeners = {};
};

fabric.Object.prototype.updateResponsiveBorder = function () {
  if (this.responsiveBorders) {
    if (!this.originalStrokeWidth) {
      this.originalStrokeWidth = this.strokeWidth;
    }
    this.strokeWidth = this.canvas ? this.originalStrokeWidth / this.canvas.viewportTransform[0] : 0;
  }
};

fabric.util.object.extend(fabric.Canvas.prototype, {
  _default_event_listeners: {
    "dimensions:modified": function dimensionsModified() {
      if (this.autoCenterAndZoomOutEnabled) {
        this.centerAndZoomOut();
      }
    },
    'viewport:scaled': function viewportScaled() {
      if (this.backgroundImage) {
        this.backgroundImage.updateResponsiveBorder();
      }
      for (var i in this._objects) {
        this._objects[i].updateResponsiveBorder();
      }
    },
    "background-image:loaded": function backgroundImageLoaded(event) {
      if (this.autoCenterAndZoomOutEnabled) {
        this.centerAndZoomOut();
      }
    },
    "loading:end": function loadingEnd(event) {
      if (this.autoCenterAndZoomOutEnabled && (this.originalHeight || this.originalWidth)) {
        this.centerAndZoomOut();
      }
    },
    "object:added": function objectAdded(event) {
      event.target.updateResponsiveBorder();
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


fabric.util.object.extend(fabric.Canvas.prototype, {
  zoomCtrlKey: true,
  mouseWheelZoom: false,
  setMouseWheelZoom: function setMouseWheelZoom(val) {
    this.mouseWheelZoom = val;
    this.on("mouse:wheel", this.wheelZoom);
  },
  _setZoomNative: fabric.Canvas.prototype.setZoom,
  _zoomToPointNative: fabric.Canvas.prototype.zoomToPoint,
  changeDimensionOnZoom: false,
  drawZoomArea: function drawZoomArea(_ctx, left, top, width, height) {
    _ctx.save();
    _ctx.translate(left || 0, top || 0);
    var _scale = this.getZoom();
    var _size = fabric.util.getProportions(this.backgroundImage, { width: width || 100, height: height || 100 });
    _ctx.globalAlpha = 0.5;
    _ctx.fillRect(0, 0, _size.width, _size.height);
    _ctx.strokeStyle = "red";

    var v = this.viewportTransform;

    var x1 = -v[4] * _size.scale / _scale;
    var y1 = -v[5] * _size.scale / _scale;
    var x2 = x1 + this.width * _size.scale / _scale;
    var y2 = y1 + this.height * _size.scale / _scale;

    x1 = Math.max(x1, 0);
    y1 = Math.max(y1, 0);
    x2 = Math.min(x2, _size.width);
    y2 = Math.min(y2, _size.height);

    _ctx.globalAlpha = 1;
    _ctx.beginPath();
    _ctx.moveTo(x1, y1);
    _ctx.lineTo(x2, y1);
    _ctx.lineTo(x2, y2);
    _ctx.lineTo(x1, y2);
    _ctx.lineTo(x1, y1);

    _ctx.fill();
    _ctx.clip();
    // _ctx.globalCompositeOperation = "source-in";
    _ctx.drawImage(this.backgroundImage._element, 0, 0, _size.width, _size.height);
    // _ctx.globalCompositeOperation = "source-over";
    // _ctx.drawImage(this.backgroundImage._element,0,0,_size.width, _size.height)
    _ctx.stroke();
    _ctx.strokeRect(0, 0, _size.width, _size.height);
    _ctx.restore();
  },
  setZoom: function setZoom(_scale, point) {

    if (!point) {
      point = new fabric.Point(0, 0);
    }

    if (this.changeDimensionOnZoom) {

      if (!this.originalWidth) {
        this.originalWidth = this.width;
      }
      if (!this.originalHeight) {
        this.originalHeight = this.height;
      }
      this.setDimensions({
        width: Math.round(this.originalWidth * _scale),
        height: Math.round(this.originalHeight * _scale)
      }, {
        // cssOnly: true
      });
    }
    this._zoomToPointNative(point, _scale);

    this._update_background_overlay_image("background");
    this._update_background_overlay_image("overlay");
    //  this._setZoomNative(_scale);
    this.fire('viewport:scaled', { scale: _scale });
  },
  zoomToPoint: function zoomToPoint(point, newZoom) {
    var _max = this.getMaxZoom();
    var _min = this.getMinZoom().scale;
    if (newZoom > _max) {
      newZoom = _max;
    }
    if (newZoom < _min) {
      newZoom = _min;
    }
    this.setZoom(newZoom, point);
  },
  resetViewport: function resetViewport() {
    _canvas.viewportTransform[0] = 1;
    _canvas.viewportTransform[3] = 1;
    _canvas.viewportTransform[4] = 0;
    _canvas.viewportTransform[5] = 0;
    _canvas.renderAll();
    for (var i in this._objects) {
      this._objects[i].setCoords();
    }
  },
  zoomToPointEnabled: true,
  minZoomFactor: 1,
  maxZoom: 20,
  autoCenterAndZoomOutEnabled: false,
  getMaxZoom: function getMaxZoom() {
    return this.maxZoom;
  },
  getMinZoom: function getMinZoom() {
    var _containerSize = {
      width: $(this.wrapperEl).width(),
      height: $(this.wrapperEl).height()
    };
    var _bgSize = {
      width: this.originalWidth,
      height: this.originalHeight
    };
    var _maxSize = {
      width: _containerSize.width * this.minZoomFactor,
      height: _containerSize.height * this.minZoomFactor
    };

    return fabric.util.getProportions(_bgSize, _maxSize, 'fit');
  },
  centerAndZoomOut: function centerAndZoomOut() {

    if (this.virtual) {
      return;
    }
    var options = this.getMinZoom();

    var _containerSize = {
      width: $(this.wrapperEl).width(),
      height: $(this.wrapperEl).height()
    };

    var vpt = this.viewportTransform.slice(0);
    vpt[0] = options.scale;
    vpt[3] = options.scale;
    vpt[4] = (_containerSize.width - options.width) / 2;
    vpt[5] = (_containerSize.height - options.height) / 2;

    this.setViewportTransform(vpt);

    this._update_background_overlay_image("background");
    this._update_background_overlay_image("overlay");
    // this.fire("viewport:scaled",{scale: options.scale})
    //this.renderAll();
  },
  centerOnObject: function centerOnObject(tag) {
    var br = tag.getBoundingRect();
    var ct = this.viewportTransform;
    br.width /= ct[0];
    br.height /= ct[3];
    var size = {
      width: br.width * 1.1,
      height: br.height * 1.1
    };

    var prop = fabric.util.getProportions(size, this);
    var _w = (this.width / prop.scale - size.width) / 2;
    var _h = (this.height / prop.scale - size.height) / 2;
    var _l = (br.left - ct[4]) / ct[0];
    var _t = (br.top - ct[5]) / ct[3];

    var x1 = [prop.scale, 0, 0, prop.scale, -tag.left * prop.scale + (tag.width * 0.05 + _w) * prop.scale, -tag.top * prop.scale + (tag.height * 0.05 + _h) * prop.scale];
    var x2 = [prop.scale, 0, 0, prop.scale, -_l * prop.scale + (br.width * 0.05 + _w) * prop.scale, -_t * prop.scale + (br.height * 0.05 + _h) * prop.scale];

    this.setViewportTransform(x2);
    this.fire("viewport:scaled", { scale: prop.scale });
    this.renderAll();
  },

  wheelZoom: function wheelZoom(event) {

    if (!this.mouseWheelEnabled || this.zoomCtrlKey && !event.ctrlKey) {
      return;
    }
    //Find nearest point, that is inside image END
    var zoomStep; // = 0.1 * event.deltaY;
    if (event.deltaY < 0) {
      zoomStep = 1.1;
    } else {
      zoomStep = 0.9;
    }

    var cZoom = this.getZoom();
    var newZoom = cZoom * zoomStep;
    var minZoom = this.getMinZoom().scale;

    if (this.zoomToPointEnabled) {
      var point = new fabric.Point(event.offsetX, event.offsetY);
      var _x = this.viewportTransform[4];
      var _y = this.viewportTransform[5];

      // Find nearest point, that is inside image BEGIN
      // It is needed to prevent canvas to zoom outside image
      var _w = this.originalWidth * this.getZoom() + _x;
      var _h = this.originalHeight * this.getZoom() + _y;

      if (point.x < _x) {
        point.x = _x;
      }
      if (point.y < _y) {
        point.y = _y;
      }
      if (point.x > _w) {
        point.x = _w;
      }
      if (point.y > _h) {
        point.y = _h;
      }
      if (minZoom > newZoom) {
        if (this.autoCenterAndZoomOutEnabled) {
          this.centerAndZoomOut();
        } else if (event.deltaY < 0) {
          this.zoomToPoint(point, newZoom);
        }
      } else {
        this.zoomToPoint(point, newZoom);
      }
    } else {
      this.setZoom(newZoom);
    }

    for (var i in this._objects) {
      this._objects[i].setCoords();
    }
    this.renderAll();
    event.stopPropagation();
    event.preventDefault();
    return false; //preventing scroll page
  },
  scaleFactor: 1.1,
  getOrignalCenter: function getOrignalCenter() {
    var point = this.getCenter();
    point.left += this.viewportTransform[4];
    point.top += this.viewportTransform[5];
    return point;
  }
});

fabric.util.object.extend(fabric.Object.prototype.actions, {
  centerAndZoomOut: {
    className: 'fa fa-search-plus',
    title: 'centerAndZoomOut'
  }
});

fabric.util.object.extend(fabric.Canvas.prototype.actions, {
  zoomOut: {
    className: 'fa fa-search-minus',
    title: 'zoom-out',
    action: function action() {
      var point = this.getOrignalCenter();
      var scaleValue = this.getZoom() / this.scaleFactor;
      this.zoomToPoint({ x: point.left, y: point.top }, scaleValue);
    }
  },
  zoomNumber: {
    type: 'number',
    value: {
      min: function min() {
        return 0.01;
      },
      max: function max() {
        return 10;
      },
      set: function set(val) {
        this.setZoom(val);
      },
      get: function get() {
        return this.getZoom();
      },
      observe: "viewport:scaled"
    }
  },
  zoomIn: {
    className: 'fa fa-search-plus',
    title: 'zoom-in',
    action: function action() {
      var point = this.getOrignalCenter();
      var scaleValue = this.getZoom() * this.scaleFactor;
      this.zoomToPoint({ x: point.left, y: point.top }, scaleValue);
    }
    // zoom: {
    //   title: "zoom",
    //   menu: zoomOut
    // }
  } });
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  _toSVG_overwritten: fabric.StaticCanvas.prototype.toSVG,
  toSVG: function toSVG(options, reviver) {

    var _w = this.width,
        _h = this.height;
    if (this.originalWidth) {
      this.svgViewportTransformation = false;
      this.width = this.originalWidth;
      this.height = this.originalHeight;
    }

    options || (options = {});

    var markup = [];

    this._setSVGPreamble(markup, options);
    this._setSVGHeader(markup, options);
    this._setSVGLayers(markup, reviver);

    markup.push('</svg>');

    if (this.originalWidth) {
      this.width = _w;
      this.height = _h;
    }
    return markup.join('');
  },
  _setSVGLayers: function _setSVGLayers(markup, reviver) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = this._layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var layerId = _step.value;

        if (this.layers[layerId].svg) {
          this.layers[layerId].svg(this, markup, reviver);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  getSVGBody: function getSVGBody(options, reviver) {

    var _w = this.width,
        _h = this.height;

    if (this.originalWidth) {
      this.width = this.originalWidth;
      this.height = this.originalHeight;
    }
    options = options || {};

    var scaleX = options.scaleX || (options.width ? options.width / this.width : 1),
        scaleY = options.scaleY || (options.height ? options.height / this.height : 1),
        _l = options.left || 0,
        _t = options.top || 0,
        angle = options.angle || 0,
        clipPath = "";

    if (options.clipPath) {
      clipPath = 'clip-path: url(#' + options.clipPath + ');';
    }

    var transform = "";
    if (angle !== 0) {
      transform += 'rotate(' + angle + ') ';
    }
    if (_l !== 0 || _t !== 0) {
      transform += 'translate(' + _l + ' ' + _t + ') ';
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transform += 'scale(' + scaleX + ' ' + scaleY + ') ';
    }

    var markup = ['<g transform="' + transform + '" style="' + clipPath + '" id="' + options.clipPath + '">'];

    this._setSVGLayers(markup, reviver);

    markup.push('</g>');

    if (this.originalWidth) {
      this.width = _w;
      this.height = _h;
    }
    return markup;
  }
});

fabric.StaticCanvas.prototype.inlineSVG = false;

fabric.Image.prototype.getSvgSrc = function (filtered) {
  var element = filtered ? this._element : this._originalElement;
  if (element) {
    var _src = fabric.isLikelyNode ? element._src : element.src;
    if (this.canvas.inlineSVG && !_src.startsWith("data:image")) {
      if (element.toDataURL) {
        return element.toDataURL();
      } else {
        var canvas = fabric.util.createCanvasElement();
        canvas.width = element.width;
        canvas.height = element.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(element, 0, 0);
        var dataURL = canvas.toDataURL();
        return dataURL;
      }
    }
    return _src;
  } else {
    return this.src || '';
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var $ = window.jQuery || window.$;
$.focusNextElement = function (previos) {
  //add all elements we want to include in our selection
  var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  // if (document.activeElement ) {
  var focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElements), function (element) {
    //check for visibility while always include the current activeElement
    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
  });

  var index = focussable.indexOf(document.activeElement);
  var nextElement;
  if (previos) {
    nextElement = focussable[index - 1] || focussable[focussable.length - 1];
  } else {
    nextElement = focussable[index + 1] || focussable[0];
  }
  nextElement.focus();
  // }
};

fabric.IText.prototype.activateNextObject = function (e) {
  this.exitEditing();
  var _prev = e.shiftKey;
  this.canvas.activateNextObject(_prev);
};

fabric.IText.prototype.keysMap[9] = "activateNextObject";

fabric.focusedCanvas = null;
fabric.util.addListener(fabric.window, 'keydown', function (e) {
  if (e.code === "Tab") {
    fabric._tabbableSetToLast = e.shiftKey;
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  tabbable: false,
  activateFirstObject: function activateFirstObject() {
    this.discardActiveGroup();
    this.discardActiveObject();
    if (this._objects.length > 0) {
      this.setActiveObject(this._objects[0]);
    }
  },
  activateLastObject: function activateLastObject() {
    this.discardActiveGroup();
    this.discardActiveObject();
    if (this._objects.length > 0) {
      this.setActiveObject(this._objects[this._objects.length - 1]);
    }
  },
  activateNextObject: function activateNextObject(previos) {
    var _active = this.getActiveObject();
    var _index = this._objects.indexOf(_active);
    var next = this._objects[_index + (previos ? -1 : 1)];
    if (next) {
      this.setActiveObject(next);
    } else {
      this.discardActiveGroup();
      this.discardActiveObject();

      this._ignoreFocusEvent = true;
      $(this.inputElement).focus();
      fabric._tabbableSetToLast = previos;
      $.focusNextElement(previos);
    }
  },
  setTabbable: function setTabbable(value) {
    if (this.tabbable === value) {
      return;
    }
    this.tabbable = value;
    if (!value) {
      $(this.inputElement).remove();
      delete this.inputElement;
      return;
    }
    var _this = this;

    this.inputElement = fabric.document.createElement('input');
    this.inputElement.setAttribute("type", "text");
    this.inputElement.style.cssText = 'position: absolute; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px;';
    this.wrapperEl.appendChild(this.inputElement);
    fabric.util.addListener(this.inputElement, 'focus', this.focus.bind(this));

    $(this.inputElement).bind({
      focus: function focus() {
        if (_this._ignoreFocusEvent) {
          delete _this._ignoreFocusEvent;
          return false;
        }
        _this.focus();
        // fabric.focusedCanvas = _this;
        fabric._tabbableSetToLast ? _this.activateLastObject() : _this.activateFirstObject();
        // $(_this.wrapperEl).css('border','1px dotted #000');
      },
      blur: function blur() {
        // fabric.focusedCanvas = null;
        // $(this.wrapperEl).css('border','none');
      }
    });
    this.on("mouse:down", this.focus.bind(this));
  },
  onkeyUp: function onkeyUp(e) {
    console.log(e);
  },
  blur: function blur() {
    if (this._activeObject) {
      if (this._activeObject.isEditing) {
        this._activeObject.exitEditing();
      }
    }
    this.discardActiveGroup();
    this.discardActiveObject();
    this.renderAll();
    return this;
  },
  focus: function focus() {
    if (fabric.focusedCanvas == this) {
      return;
    }
    if (fabric.focusedCanvas) {
      fabric.focusedCanvas.blur();
    }
    fabric.focusedCanvas = this;
    return this;
    // this.activateNextObject();
    // $(this.wrapperEl).css('border','1px dotted #000');
    // $(this.wrapperEl).focus();
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Text.prototype, {
    staticBorderColor: false,
    _render_staticBorderColorOverwritten: fabric.Text.prototype.render,
    render: function render(ctx, noTransform) {
        this._render_staticBorderColorOverwritten(ctx);

        ctx.save();
        if (!noTransform) {
            this.transform(ctx);
        }
        this._drawBorders(ctx);
        ctx.restore();
    },
    _staticBorderColorRender: fabric.IText.prototype._render,
    _drawBorders: function _drawBorders(ctx) {
        if (this.active || !this.staticBorderColor) {
            return;
        }
        ctx.strokeStyle = this.staticBorderColor;
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {/**
* InteractiveMode mixin. Allow to switch between pan/edit/drawing canvas modes.
*/



var _mouse_down_overwritten = fabric.Canvas.prototype._onMouseDown;
var _mouse_up_overwritten = fabric.Canvas.prototype._onMouseUp;
var _mouse_move_overwritten = fabric.Canvas.prototype._onMouseMove;

fabric.util.object.extend(fabric.Canvas.prototype, {
  _initEventListeners_overwritten: fabric.Canvas.prototype._initEventListeners,
  _initEventListeners: function _initEventListeners() {
    this._initEventListeners_overwritten();
    this.___onKeyDown = this._onKeyDown.bind(this);
    fabric.util.addListener(fabric.window, 'keydown', this.___onKeyDown);
  },
  _removeListeners_overwritten: fabric.Canvas.prototype.removeListeners,
  removeListeners: function removeListeners() {
    this._removeListeners_overwritten();
    fabric.util.removeListener(fabric.window, 'keydown', this.___onKeyDown);
  },
  _onKeyDown: function _onKeyDown(e) {
    return this._applyMixedMode(e);
  },
  getInteractiveMode: function getInteractiveMode() {
    return this.interactiveMode;
  },
  setInteractiveMode: function setInteractiveMode(tool) {
    //todo checkthis out
    // if (tool === 'hand') {
    //   this.setCursor('pointer');
    // }
    this.isDrawingMode = tool === 'draw';
    this.isHandMode = tool === 'hand';
    this.interactive = tool !== 'disabled';
    this.isMixedMode = tool === 'mixed';

    if (!this.interactive) {
      this.upperCanvasEl.style.cursor = 'default';
    }
    this.interactiveMode = tool;
  },

  /**
   *  current mode
   *  @values default | hand | selection
   *  @comment
   *      hand      - moving canvas
   *      draw - drawing reactangles
   *      selection - default behavior
   */
  interactiveMode: 'default',

  isHandMode: false,
  _handModeCursorMove: false,
  _handModeCursorDown: false,
  _handModeCursorPosition: { x: 0, y: 0 },
  _handModeMouseMove: function _handModeMouseMove(e) {
    if (this._handModeCursorDown === true) {

      if (e.pageY === this._handModeCursorPosition.y && e.pageX === this._handModeCursorPosition.x) {
        return;
      }

      this._handModeCursorMove = true;

      var scroll = { x: this.viewportTransform[4], y: this.viewportTransform[5] };

      var newScroll = {
        x: scroll.x - (this._handModeCursorPosition.x - e.pageX),
        y: scroll.y - (this._handModeCursorPosition.y - e.pageY)
      };

      var dims = {
        width: this.size.width * this.zoom - this.lowerCanvasEl.width,
        height: this.size.height * this.zoom - this.lowerCanvasEl.height
      };
      /*  todo need to add some restrictions later
       //Math.max(Math.min(0,newScroll.x),-dims.width);
       //Math.max(Math.min(0,newScroll.y),-dims.height);
       */
      this.viewportTransform[4] = newScroll.x;
      this.viewportTransform[5] = newScroll.y;

      this.fire('viewport:translate');

      this.renderAll();
      for (var i = 0, len = this._objects.length; i < len; i++) {
        this._objects[i].setCoords();
      }

      this._handModeCursorPosition.y = e.pageY;
      this._handModeCursorPosition.x = e.pageX;
    }
  },
  _handModeMouseUp: function _handModeMouseUp() {
    this._handModeCursorDown = false;
    if (!this._handModeCursorMove) {}
  },
  _handModeMouseDown: function _handModeMouseDown(e) {

    this._handModeCursorMove = false;
    this._handModeCursorDown = true;
    this._handModeCursorPosition = {
      y: e.pageY,
      x: e.pageX
    };
  },
  handModeEnabled: false,
  handModeKey: "Alt",
  _applyMixedMode: function _applyMixedMode(e) {

    if (this.handModeEnabled && e.altKey || e.key === this.handModeKey) {
      //if shift use hand mode
      if (!this.isHandMode) {
        this.isHandMode = true;
        this.isDrawingMode = false;
        this.setCursor('pointer');
      }
    } else if (this.isMixedMode && !this._isCurrentlyDrawing && !this._currentTransform) {

      this.isHandMode = false;

      this._current_target = this.findTarget(e);
      if (this._current_target) {
        if (this.freeDrawingBrush && this._current_target.allowDrawing) {
          var corner = this._current_target._findTargetCorner(this.getPointer(e, true));
          if (!corner) {
            this.isDrawingMode = true;
          } else {
            this.isDrawingMode = false;
          }
        } else if (this.isDrawingMode) {
          this.isDrawingMode = false;
        }
      } else {
        if (this.freeDrawingBrush && !this.isDrawingMode) {
          this.setCursor(this.freeDrawingCursor);
          this.isDrawingMode = true;
        }
      }
    } else {
      this.isHandMode = false;
    }
  },
  _onMouseMove: function _onMouseMove(e) {
    if (!this.interactive) {
      return;
    }

    this._applyMixedMode(e);

    if (this.isHandMode) {

      if (this._current_target && this._current_target.selectable_overwritten) {
        this._current_target.selectable = true;
      }

      if (this._handModeActive) {
        return this._handModeMouseMove(e);
      }
      this.fire('mouse:move', { target: this._current_target, e: e });
      this._current_target && this._current_target.fire('mousemove', { e: e });
      return true;
    } else {
      return _mouse_move_overwritten.call(this, e);
    }
  }, /**
     * @private
     */
  _onScale: function _onScale(e, transform, x, y) {

    var useUniScale = e.shiftKey ^ this.shiftInverted;
    // rotate object only if shift key is not pressed
    // and if it is not a group we are transforming
    if ((useUniScale || this.uniScaleTransform) && !transform.target.get('lockUniScaling')) {
      transform.currentAction = 'scale';
      return this._scaleObject(x, y);
    } else {
      // Switch from a normal resize to proportional
      if (!transform.reset && transform.currentAction === 'scale') {
        this._resetCurrentTransform(e);
      }

      transform.currentAction = 'scaleEqually';
      return this._scaleObject(x, y, 'equally');
    }
  },
  shiftInverted: false,
  _setCursorFromEvent_overwritten: fabric.Canvas.prototype._setCursorFromEvent,
  _setCursorFromEvent: function _setCursorFromEvent(e, target) {
    if (this.isHandMode) {
      this.setCursor('pointer');
    } else {
      this._setCursorFromEvent_overwritten(e, target);
    }
  },
  _onMouseDown: function _onMouseDown(e) {
    if (!this.interactive) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this._applyMixedMode(e);
    if (this.isHandMode && this._current_target) {
      this._current_target.selectable_overwritten = this._current_target.selectable;
      this._current_target.selectable = false;
    }

    _mouse_down_overwritten.call(this, e);

    if (this.isHandMode) {

      if (this._current_target && this._current_target.selectable_overwritten) {
        this._current_target.selectable = true;
      }
      this._handModeActive = true;
      this._handModeMouseDown(e);
    }
  },

  _onMouseUp: function _onMouseUp(e) {
    if (!this.interactive) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    _mouse_up_overwritten.call(this, e);

    if (this.isHandMode) {
      this._handModeActive = false;
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

if (!fabric.StrokeMixin) {
  __webpack_require__(58);
}

/**
 * @author Denis Ponomarev
 * @email den.ponomarev@gmail.com
 */
fabric.Frame = fabric.util.createClass(fabric.Group, fabric.StrokeMixin, {
  type: 'frame',
  //strokeActive:   "lightgreen",
  //stroke: "red",
  minWidth: 35,
  minHeight: 35,
  fill: "transparent",
  resizable: true,
  contentTools: false,
  //states : Empty / Full / Active
  stateProperties: fabric.Group.prototype.stateProperties.concat(["clip"]),
  optionsOrder: function () {
    var oo = fabric.Object.prototype.optionsOrder.slice();
    oo.splice(oo.indexOf("*") + 1, 0, "element", "clip");
    return oo;
  }(),
  clip: {
    left: 0,
    top: 0,
    scaleX: 1,
    scaleY: 1
  },
  clippingAvailable: function clippingAvailable() {
    return this.clipEnabled && this.element && !this._clipmode;
  },
  clipEnabled: true,
  /**
   * create clone with same image and shape as original (syncronous)
   * @param callback
   * @returns {*}
   */
  cloneSync: function cloneSync(options) {
    var _frame = new fabric.Frame(this);
    options && _frame.set(options);
    return _frame;
  },
  initialize: function initialize(options) {
    options || (options = {});

    if (options.constructor != Object) {

      var _obj = options.toObject();
      if (options.element) {
        _obj.element = options.element.cloneSync();
        _obj.element.clipTo = _obj._fabric_shape;
      }
      _obj.shape = options.shape;
      options = _obj;
    }

    this.on({
      "object:click": this._check_text_as_target_and_edit,
      "dblclick": this.toggleClipModeByClick,
      "redraw": this._apply_shape,
      "element:modified": function elementModified(event) {
        this.updateStroke();
        this._apply_shape();
      }
    });

    this.initShape(options);
    this.callSuper('initialize', [this._fabric_shape], options);
    this._elements_to_update = [];
  },
  toggleClipModeByClick: function toggleClipModeByClick(e) {
    if (this._is_clipping_available(e.e)) {
      if (!this._clipmode) {
        this.clipPhotoStart();
      } else {
        this.clipPhotoEnd();
      }
    }
  },
  _check_text_as_target_and_edit: function _check_text_as_target_and_edit(e) {
    if (this.isPossibleTarget(e.e, this.text)) {
      this.text.setOpacity(1);
      this._on_text_edit(e);
    }
  },
  clipPhotoEnd: function clipPhotoEnd() {
    this.canvas.editingObject = null;
    this.application.off("target:changed target:cleared", this._endFoo);

    if (this.canvas._gridObject) {
      this.canvas._gridObject.enabled = true;
    }

    //this.project.clipMode = false;


    this.canvas.remove(this.element);
    this.set({
      hasControls: false,
      evented: true,
      flipX: this.element.flipX,
      flipY: this.element.flipY
    });

    var to_radians = Math.PI / 180;
    var cosA = Math.cos(this.angle * to_radians);
    var sinA = Math.sin(this.angle * to_radians);
    var I = this.element,
        F = this;

    var _newGeometry = {
      angle: this.element.angle - this.angle,
      left: ((I.left - F.left) * cosA + (I.top - F.top) * sinA - F.width / 2) * (I.flipX ? -1 : 1),
      top: (-(I.left - F.left) * sinA + (I.top - F.top) * cosA - F.height / 2) * (I.flipY ? -1 : 1),
      flipX: false,
      flipY: false
    };

    if (this.element.originX === "center") {
      //   _newGeometry.left += this.element.width /2;
    }
    if (this.element.originY === "center") {
      //_newGeometry.top += this.element.height /2;
    }

    this.add(this.element);
    this.element.set(_newGeometry);
    //
    //
    this._clipmode = false;
    //рамку двигать нельзя
    this.set({
      hasControls: true,
      evented: true
    });
    this.canvas.remove(this._fabric_shape);
    this.add(this._fabric_shape);
    this.updateStroke();
    this._apply_shape();

    this.element.active = false;
    this.canvas.setActiveObject(this);
    this.canvas.renderAll();

    var w = this.width,
        h = this.height,
        el = this.element;

    this.clip = {
      left: el.left / w,
      top: el.top / h,
      scaleX: el.width / w,
      scaleY: el.height / h
    };

    this.fire("clipping:exited");
    this.canvas.fire('frame:clipping:exited', { target: this });
  },
  clipPhotoStart: function clipPhotoStart() {
    var _this = this;
    this._clipmode = true;
    this.updateStroke();
    this._apply_shape();
    this.canvas.discardActiveGroup();
    if (this.canvas._gridObject) {
      this.canvas._gridObject.enabled = false;
    }

    /* this.fabric.set({
     originX: "center",
     originY:  "center",
     left: this.fabric.left + this.fabric.width/2,
     top: this.fabric.top + this.fabric.height/2,
     });*/

    this.element.set({
      movementLimits: this,
      movementLimitMode: "content",
      //clipTo:         this,
      flipX: this.flipX,
      flipY: this.flipY
      //left: this.element.left* (this.flipX ? -1 : 1),
      //top:  this.element.top* (this.flipY ? -1 : 1)
    });

    this._restoreObjectState(this.element);
    this.element.set({
      hasControls: true,
      //selectable: false,
      //perPixelTargetFind: true,
      selectable: true,
      perPixelTargetFind: false
    });
    this.remove(this.element);
    this.canvas.add(this.element);

    this._restoreObjectState(this._fabric_shape);
    this.remove(this._fabric_shape);
    this.canvas.add(this._fabric_shape);

    //рамка должна рисоваться над картинкой, иначе  некрасиво
    //      this.slide.canvas.bringToFront(this.fabric);

    //рамку двигать нельзя
    this.set({
      hasControls: false,
      evented: false
    });

    this.canvas.setActiveObject(this.element);
    this.active = true;

    this._endFoo = function () {
      _this.clipPhotoEnd();
    };
    this.application.on("target:changed target:cleared", this._endFoo);

    this.fire("clipping:entered");
    this.canvas.fire('frame:clipping:entered', { target: this });

    this.canvas.editingObject = this;
    this.canvas.renderAll();
  },
  render: function render(ctx, noTransform) {

    if (this.dirty) {

      if (this.dirtyHeight) {
        for (var i in this._elements_to_update) {
          var data = this._elements_to_update[i];
          this._update_interface_element_position(data.element, data, "height");
        }
        this._update_element_height();
        this.dirtyHeight = false;
      }
      if (this.dirtyWidth) {
        for (var i in this._elements_to_update) {
          var data = this._elements_to_update[i];
          this._update_interface_element_position(data.element, data, "width");
        }
        this._update_element_width();
        this.dirtyWidth = false;
      }
      this.dirty = false;
      this.fire("redraw");
    }

    if (this._clipmode) {
      var _zoom = this.canvas.getZoom();
      ctx.save();
      //  this.transform(ctx);
      ctx.globalAlpha = 0.5;
      var _clip_to = this.element.clipTo;
      this.element.clipTo = null;
      this.element.render(ctx);
      ctx.scale(_zoom, _zoom);
      this.element.clipTo = _clip_to;
      this.transform(ctx);
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = 1 / this.borderScaleFactor;
      ctx.beginPath();
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    this.callSuper('render', ctx, noTransform);
  },
  //supportedTypes: "*", // * or ["image","video",...]
  clippingSupportedTypes: "*", // * or ["image","video",...]
  _is_clipping_available: function _is_clipping_available(e) {
    if (!this.clipEnabled) return false;
    if (e && this.isPossibleTarget(e, this.button)) {
      return;
    }
    return this.element && (this.clippingSupportedTypes == "*" || this.clippingSupportedTypes.indexOf(this.element.type) != -1);
  },
  _remove_element: function _remove_element() {},
  setData: function setData(data) {
    if (data.role == "frame") {
      this.setFrame(data.frame);
      this.setShape(data.shape);
    } else {
      this.setElementObject(data);
    }
  },
  accepts: {
    role: ["image", "video", "frame"]
  },
  setElementObject: function setElementObject(options, callback) {
    var newOptions = {
      src: options.src
    };
    if (options.role == "image") {
      newOptions.type = "image";
    }
    if (options.role == "video") {
      newOptions.type = "video";
    }
    this._set_pending(true);
    this.fire("element:loading");
    fabric.util.createObject(newOptions, function (el) {
      this._set_pending(false);
      this.setElementKlass(el);
      callback && callback(el);
    }.bind(this));
  },
  setElement: function setElement(el, cb) {
    if (el) {
      if (el.constructor == Object) {
        this.setElementObject(el, cb);
      } else {
        this.setElementKlass(el);
        cb && cb();
      }
    } else {
      this.setElementKlass();
      cb && cb();
    }
  },
  dropElementMethod: "cover", //resize
  /**
   * Создание элемента фото
   * @private
   */
  setElementKlass: function setElementKlass(el) {
    if (this.element === el) return;

    if (this.element) {
      this._remove_element();
      this.element.destructor && this.element.destructor();
      this.remove(this.element);
      this.canvas && this.canvas.remove(this.element);
    }
    this.element = el;

    if (el) {
      el.on("dblclick", function (e) {
        this.parent.toggleClipModeByClick(e);
      });
      el.setupState();

      if (this.dropElementMethod == "resize") {
        this.clip = {
          left: 0,
          top: 0,
          scaleX: 1,
          scaleY: 1
        };
      }

      if (this.dropElementMethod == "cover") {
        var size = fabric.util.getProportions(el, this, 'cover');
        this.clip = {
          left: 0,
          top: 0,
          scaleX: size.width / this.width,
          scaleY: size.height / this.height
        };
      }

      el.set({
        tools: ["clipEnd"],
        actions: {
          clipEnd: {
            className: "fa fa-crop",
            title: "clip end",
            action: function action() {
              this.parent.clipPhotoEnd();
            }
          }
        },
        parent: this,
        notSelectableInTheGroup: true,
        originX: "center",
        originY: "center",
        transparentCorners: false,
        resizable: true,
        clipTo: this._fabric_shape
      });

      this.add(el);

      for (var i in this._elements_to_update) {
        this.remove(this._elements_to_update[i].element);
        this.add(this._elements_to_update[i].element);
      }
      this._update_element_size();
    }

    this.fire("element:modified", { element: el });
    this.canvas && this.canvas.renderAll();
  },

  /**
   * ограничиваем перемещение фотографии внутри рамки
   * @param el
   */
  _limit_moving: function _limit_moving(data) {

    var r = this.getBoundingRect();
    var i = this.element;
    i.on("moving", function () {
      var b = {
        l: r.left + i.width * i.scaleX / 2,
        r: r.left + r.width - i.width * i.scaleX / 2,
        t: r.top + i.height * i.scaleY / 2,
        b: r.top + r.height - i.height * i.scaleY / 2
      };
      // capping logic here
      i.setLeft(Math.max(Math.min(b.l, i.left), b.r));
      i.setTop(Math.max(Math.min(b.t, i.top), b.b));
    });

    i.on("scaling", function () {
      i.set({
        width: Math.max(r.width, i.width * i.scaleX),
        height: Math.max(r.height, i.height * i.scaleY),
        scaleX: 1,
        scaleY: 1
      });

      var b = {
        l: r.left + i.width * i.scaleX / 2,
        r: r.left + r.width - i.width * i.scaleX / 2,
        t: r.top + i.height * i.scaleY / 2,
        b: r.top + r.height - i.height * i.scaleY / 2
      };
      //// capping logic here
      //i.setLeft(Math.min(Math.max(b.l, i.left),b.r));
      //i.setTop(Math.min(Math.max(b.t, i.top),b.b));
    });
  },

  _set_pending: function _set_pending(val) {
    this._pending = val;
  },

  /**
   * Создание элемента фото
   * @private
   */
  _create_remove_button: function _create_remove_button(options) {

    this.button = this._create_button({
      text: "",
      options: {
        visible: false
      },
      position: {
        top: 0,
        right: 0
      }
    });

    this.button.on('click', function (e) {
      if (!this._pending) {
        this.setElement(false);
      }
    }.bind(this));
  },
  _add_element_to_update: function _add_element_to_update(data) {
    this._elements_to_update.push(data);

    if (data.right !== undefined) {
      data.element.setOriginX("right");
    }
    if (data.left !== undefined) {
      data.element.setOriginX("left");
    }
    if (data.bottom !== undefined) {
      data.element.setOriginY("bottom");
    }
    if (data.top !== undefined) {
      data.element.setOriginY("top");
    }

    this._update_interface_element_position(data.element, data);
  },
  setClip: function setClip(val) {
    this.clip = val;
    this._update_element_size();
  },
  _update_element_size: function _update_element_size() {
    this._update_element_width();
    this._update_element_height();
  },

  _update_element_width: function _update_element_width() {
    if (this.element) {
      if (this.element.type == "ellipse") {
        this.element.set({
          rx: this.width / 2 * this.clip.scaleX
        });
      } else if (this.element.type == "video" || this.element.type == "path") {

        this.element.set({
          left: 0,
          scaleX: this.width / this.element.width
        });
      } else {
        this.element.setWidth(this.width * this.clip.scaleX);
        this.element.setLeft(this.width * this.clip.left);
      }
    }
  },
  _update_element_height: function _update_element_height() {
    if (this.element) {

      if (this.element.type == "ellipse") {
        this.element.set({
          ry: this.height / 2 * this.clip.scaleY
        });
      } else if (this.element.type == "video" || this.element.type == "path") {

        this.element.set({
          top: 0,
          scaleY: this.height / this.element.height
        });
      } else {
        this.element.setHeight(this.height * this.clip.scaleY);
        this.element.setTop(this.height * this.clip.top);
      }
    }
  },
  _update_interface_element_position: function _update_interface_element_position(el, data, prop) {
    if (!prop || prop == "height") {
      if (data.top !== undefined && data.bottom !== undefined) {
        el.setTop(-this.height / 2 + data.top);
        el.setHeight(this.height - data.top - data.bottom);
      }if (data.top !== undefined) {
        el.setTop(-this.height / 2 + data.top);
      } else if (data.bottom !== undefined) {
        el.setTop(this.height / 2 - data.bottom);
      } else if (data.height !== undefined) {
        el.setHeight(data.height);
      }
    }
    if (!prop || prop == "width") {
      if (data.right !== undefined && data.left !== undefined) {
        el.setLeft(-this.width / 2 + data.left);
        el.setWidth(this.width - data.left - data.right);
      } else if (data.right !== undefined) {
        el.setLeft(this.width / 2 - data.right);
      } else if (data.left !== undefined) {
        el.setLeft(-this.width / 2 + data.left);
      } else if (data.width !== undefined) {
        el.setWidth(data.width);
      }
    }
    el.setCoords();
  },
  dirty: false,
  dirtyHeight: false,
  dirtyWidth: false,
  setHeight: function setHeight(h) {
    this.height = h;
    this.dirty = true;
    this.dirtyHeight = true;
  },
  setWidth: function setWidth(w) {
    this.width = w;
    this.dirty = true;
    this.dirtyWidth = true;
  },
  toObject: function toObject(propertiesToInclude) {
    propertiesToInclude = ["clip", "data"].concat(propertiesToInclude);

    // var object = this.callSuper('toObject', propertiesToInclude);
    var object = fabric.Object.prototype.toObject.call(this, propertiesToInclude);

    if (this.shape) {
      object.shape = fabric.util.object.clone(this.shape);
      if (object.shape.src) {
        delete object.shape.paths;
        delete object.shape.height;
        delete object.shape.width;
        delete object.shape.svgUid;
        delete object.shape.toBeParsed;
      }
    }

    delete object.objects;

    if (this.element) {
      var _obj2 = this.element.toObject();
      object.element = {
        type: _obj2.type,
        src: _obj2.src
      };
    }
    return object;
  }
});

var _FRA = fabric.Frame.prototype;
fabric.Frame.prototype.actions = fabric.util.object.extend({}, fabric.Object.prototype.actions, {
  clear: {
    title: "Remove content",
    className: "fa fa-times",
    action: _FRA.setElement,
    visible: "element",
    observe: "element:modified"
  },
  crop: {
    title: "crop",
    className: "fa fa-crop",
    action: _FRA.clipPhotoStart,
    visible: _FRA.clippingAvailable,
    observe: "clipping:entered clipping:exited element:modified"
  }
});

fabric.Frame.fromObject = function (object, callback) {
  var _app = object.application;
  delete object.application;
  object = fabric.util.object.cloneDeep(object);
  object.application = _app;

  var cb = fabric.util.queueLoad(2, function () {
    callback && callback(new fabric.Frame(object));
  });

  if (object.image) {

    fabric.util.createObject({
      type: "image",
      image: object.image,
      width: object.image.width,
      height: object.image.height
    }, function (el) {
      object.element = el;
      cb();
    });
  } else if (object.element) {
    fabric.util.createObject(object.element, function (el) {
      object.element = el;
      cb();
    });
  } else {
    cb();
  }

  if (object.shape && object.shape.src) {
    fabric.loadSVGFromURL(object.shape.src, function (paths, options) {
      object.shape.paths = paths;
      fabric.util.object.extend(object.shape, options);
      cb();
    });
  } else {
    cb();
  }
};
fabric.Frame.async = true;

fabric.util.createAccessors(fabric.Frame);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.StrokeMixin = {
  shape: {
    strokeWidthFull: 0,
    strokeWidthEmpty: 2,
    strokeWidthActive: 2,
    strokeDashArray: [5, 5],
    fill: "transparent",
    strokeEmpty: "red",
    strokeFull: "red",
    strokeActive: "green"
  },
  setShape: function setShape(el, cb) {

    el = fabric.util.object.extend({
      strokeWidthFull: this.shape.strokeWidthFull,
      strokeWidthEmpty: this.shape.strokeWidthEmpty,
      strokeWidthActive: this.shape.strokeWidthActive,
      dashArray: this.shape.dashArray,
      strokeEmpty: this.shape.strokeEmpty,
      strokeFull: this.shape.strokeFull,
      strokeActive: this.shape.strokeActive
    }, el);

    var _this = this;
    if (el && el.src && !el.paths) {
      fabric.loadSVGFromURL(el.src, function (paths, options) {
        el.paths = paths;
        fabric.util.object.extend(el, options);
        _this._set_shape(el);
        _this.add(_this._fabric_shape);
        _this._apply_shape();
        _this._fabric_shape.sendToBack();
        cb && cb();
      });
    } else {
      _this._set_shape(el);
      _this.add(_this._fabric_shape);
      _this._apply_shape();
      _this._fabric_shape.sendToBack();
      cb && cb();
    }
  },
  initShape: function initShape(options) {

    var _shapeOptions = fabric.util.object.extend(options.shape || {}, this.shape);

    this._fabric_shape = new fabric.Rect(fabric.util.object.extend({}, _shapeOptions, {
      width: options.width,
      height: options.height,
      stroke: _shapeOptions.strokeEmpty,
      strokeWidth: _shapeOptions.strokeWidthEmpty
    }));
  },

  /**
   * �������������� ����� �� ������� ������� ����
   * @private
   */
  _apply_shape: function _apply_shape() {
    var shape = this.shape;

    var _off = shape && shape.offsets;

    if (!_off) {
      _off = [0, 0, 0, 0];
    }

    var _off_units = shape && shape.offsets_units;

    if (!_off_units) {
      //if (frame.border_image) {todo
      //    _off_units = frame.border_image.width_units || [0, 0, 0, 0];
      //} else {
      _off_units = [1, 1, 1, 1];
      //}
    }

    /*else if(shape.offsets && shape.offsets_units){
     var s = this.slide.scaleValue;
     this._fabric_shape = new fabric.Rect({
     originX: 'center',
     originY: 'center',
     width:  (this.data.geometry.width - shape.offsets[3] - shape.offsets[1]) * s,
     height: (this.data.geometry.height -shape.offsets[0] - shape.offsets[2]) * s
     });*/

    _off = {
      top: _off[0] * (_off_units[0] ? this.height / 100 : 1) || 0,
      right: _off[1] * (_off_units[1] ? this.width / 100 : 1) || 0,
      bottom: _off[2] * (_off_units[2] ? this.height / 100 : 1) || 0,
      left: _off[3] * (_off_units[3] ? this.width / 100 : 1) || 0
    };

    var _w = this.width - _off.left - _off.right; // *this.slide.scaleValue;
    var _h = this.height - _off.top - _off.bottom; // *this.slide.scaleValue;


    //if(this.resources.frame.data.shape && this.resources.frame.data.shape.radius){
    //
    //    this._fabric_shape.set({
    //        left: -this.width/2  + _off.left ,
    //        top:  -this.height/2 + _off.top ,
    //        width: _w - _off.left -_off.right,
    //        height:  _h - _off.top -_off.bottom,
    //        scaleX:  1,
    //        scaleY:  1
    //    });
    //}else{


    //if(this.shape.path || this.shape.paths || this.shape.offsets){
    var _sw = this.shape.width || this._fabric_shape.width;
    var _sh = this.shape.height || this._fabric_shape.height;

    // if(this._fabric_shape.strokeWidth){
    //   _sw += this._fabric_shape.strokeWidth ;
    //   _sh += this._fabric_shape.strokeWidth ;
    // }

    var options = {
      left: -this.width / 2 + _off.left,
      top: -this.height / 2 + _off.top,
      scaleX: _w / 100 / (_sw / 100), // * (shape.scaleX || 1),
      scaleY: _h / 100 / (_sh / 100), // * (shape.scaleY || 1)
      angle: 0
    };
    /*}else{
      var options = {
        left:   -this.width / 2 + _off.left,
        top:    -this.height / 2 + _off.top,
        width:    _w,// * (shape.scaleX || 1),
        height:   _h,// * (shape.scaleY || 1)
        angle: 0
      };
    }*/

    this._fabric_shape.set(options);

    this.updateStroke();
    this.canvas && this.canvas.renderAll();
  },
  _set_shape: function _set_shape(shape) {

    if (this._fabric_shape) {
      this.remove(this._fabric_shape);
      delete this._fabric_shape;
    }
    var _fabric_shape;
    var _options = {
      fill: "transparent",
      strokeDashArray: this.shape.dashArray
    };

    if (!shape) {
      shape = {};
    }

    this.shape = shape;

    if (shape.paths) {

      for (var i in shape.paths) {
        shape.paths[i].set(_options);
      }

      _fabric_shape = fabric.util.groupSVGElements(shape.paths, shape);
      //
      // _fabric_shape.set({
      //   width: this.width,
      //   height: this.height
      // });

      //this._objects.unshift(this._objects.pop());
    } else {
      var path;

      if (shape.radius) {
        path = fabric.util.getRadiusClipPath(shape.radius, shape.radius_units, this.width, this.height);
        _fabric_shape = new fabric.Path(path, _options);
      } else if (shape.path) {
        _fabric_shape = new fabric.Path(shape.path, _options);
        //} else if(shape.offsets){
        //  path = fabric.util.getOffsetsClipPath(shape.offsets, shape.offsets_units)
      } else {

        if (!shape.width) {
          shape.width = 100;
        }
        if (!shape.height) {
          shape.height = 100;
        }
        path = "M 0 0 L " + shape.width + " 0 L " + shape.width + " " + shape.height + " L 0 " + shape.height + " z";

        _fabric_shape = new fabric.Path(path, _options);
        //
        //_fabric_shape =  new fabric.Rect(fabric.util.object.extend({
        //  width:            100,
        //  height:           100
        //},shape));
      }
    }

    _fabric_shape.set({
      scaleX: this.width / _fabric_shape.width,
      scaleY: this.height / _fabric_shape.height,
      perPixelTargetFind: true,
      selectable: false,
      originX: "left",
      originY: "top"
    });

    this._fabric_shape = _fabric_shape;

    if (this.element) {
      this.element.setClipTo(this._fabric_shape);
    }

    this.updateStroke();
  },

  updateStroke: function updateStroke() {

    var _stroke = this.shape.stroke;
    var _sw = 0;
    if ((this._activated || this._clipmode) && this.shape.strokeWidthActive) {
      _sw = this.shape.strokeWidthActive;
    } else if (this.element && this.shape.strokeWidthFull) {
      _sw = this.shape.strokeWidthFull;
    } else if (!this.element && this.shape.strokeWidthEmpty) {
      _sw = this.shape.strokeWidthEmpty;
    }
    if ((this._activated || this._clipmode) && this.shape.strokeActive) {
      _stroke = this.shape.strokeActive;
    } else if (this.element && this.shape.strokeFull) {
      _stroke = this.shape.strokeFull;
    } else if (!this.element && this.shape.strokeEmpty) {
      _stroke = this.shape.strokeEmpty;
    }

    var _strokeWidth = _sw / Math.max(this._fabric_shape.scaleX, this._fabric_shape.scaleY);

    if (this.shape) {
      if (this.shape.paths) {
        for (var i in this._fabric_shape.paths) {
          this._fabric_shape.paths[i].setStrokeWidth(_strokeWidth);
          this._fabric_shape.paths[i].setStroke(_stroke);
        }
      } else {
        this._fabric_shape.setStrokeWidth(_strokeWidth);
        this._fabric_shape.setStroke(_stroke);
      }
    }
  },
  /**
   * кобъект готовится к замену фото
   */
  activate: function activate() {
    this._activated = true;
    this._fabric_shape.setOpacity(1);
    this.updateStroke();
    this.canvas.renderAll();
  },
  /**
   * кобъект не готовится к замену фото
   */
  deactivate: function deactivate() {
    this._activated = false;
    this.updateStroke();
    this.canvas.renderAll();
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(60);

fabric.Barcode = fabric.util.createClass(fabric.Image, {
  type: 'barcode',
  storeProperties: fabric.Object.prototype.storeProperties,
  stateProperties: fabric.Image.prototype.stateProperties.concat(["text"]),
  correctLevel: QRCode.CorrectLevel.L,
  setText: function setText(text) {
    this.text = text;
    this.qrcode = new QRCode({ correctLevel: this.correctLevel });
    this._element = this.qrcode.makeCode(text);
    this.dirty = true;
    this.canvas.renderAll();
    return this;
  },
  setCorrectLevel: function setCorrectLevel() {
    this.qrcode = new QRCode({ correctLevel: this.correctLevel });
    return this;
  },
  initialize: function initialize(options) {
    this.setCorrectLevel(new QRCode({ correctLevel: this.correctLevel || options.correctLevel }));
    var image = this.qrcode.makeCode(options.text);
    this.text = options.text;
    delete options.text;

    this.callSuper('initialize', image, options);
  }
});
fabric.Barcode.fromObject = function (object) {
  return new fabric.Barcode(object);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 *
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */
window.QRCode = function () {
  var QRCode;
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------
  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
    this.parsedData = [];

    // Added to support UTF-8 Characters
    for (var i = 0, l = this.data.length; i < l; i++) {
      var byteArray = [];
      var code = this.data.charCodeAt(i);

      if (code > 0x10000) {
        byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
        byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
        byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
        byteArray[3] = 0x80 | code & 0x3F;
      } else if (code > 0x800) {
        byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
        byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
        byteArray[2] = 0x80 | code & 0x3F;
      } else if (code > 0x80) {
        byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
        byteArray[1] = 0x80 | code & 0x3F;
      } else {
        byteArray[0] = code;
      }

      this.parsedData.push(byteArray);
    }

    this.parsedData = Array.prototype.concat.apply([], this.parsedData);

    if (this.parsedData.length != this.data.length) {
      this.parsedData.unshift(191);
      this.parsedData.unshift(187);
      this.parsedData.unshift(239);
    }
  }

  QR8bitByte.prototype = {
    getLength: function getLength(buffer) {
      return this.parsedData.length;
    },
    write: function write(buffer) {
      for (var i = 0, l = this.parsedData.length; i < l; i++) {
        buffer.put(this.parsedData[i], 8);
      }
    }
  };

  function QRCodeModel(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }

  QRCodeModel.prototype = {
    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    }, isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    }, getModuleCount: function getModuleCount() {
      return this.moduleCount;
    }, make: function make() {
      this.makeImpl(false, this.getBestMaskPattern());
    }, makeImpl: function makeImpl(test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null;
        }
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }
      if (this.dataCache == null) {
        this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }
      this.mapData(this.dataCache, maskPattern);
    }, setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    }, getBestMaskPattern: function getBestMaskPattern() {
      var minLostPoint = 0;
      var pattern = 0;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(true, i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }
      return pattern;
    }, createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;
      this.make();
      for (var row = 0; row < this.modules.length; row++) {
        var y = row * cs;
        for (var col = 0; col < this.modules[row].length; col++) {
          var x = col * cs;
          var dark = this.modules[row][col];
          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }
      return qr_mc;
    }, setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }
      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    }, setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    }, setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    }, setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      this.modules[this.moduleCount - 8][8] = !test;
    }, mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
  };
  QRCodeModel.PAD0 = 0xEC;
  QRCodeModel.PAD1 = 0x11;
  QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    var buffer = new QRBitBuffer();
    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeModel.PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeModel.PAD1, 8);
    }
    return QRCodeModel.createBytes(buffer, rsBlocks);
  };
  QRCodeModel.createBytes = function (buffer, rsBlocks) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    var data = new Array(totalCodeCount);
    var index = 0;
    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;
  };
  var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
  var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  var QRUtil = {
    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    },
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    getLengthInBits: function getLengthInBits(mode, type) {
      if (1 <= type && type < 10) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);
        }
      } else if (type < 27) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);
        }
      } else if (type < 41) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);
        }
      } else {
        throw new Error("type:" + type);
      }
    },
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount();
      var lostPoint = 0;
      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount; col++) {
          var sameCount = 0;
          var dark = qrCode.isDark(row, col);
          for (var r = -1; r <= 1; r++) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (var c = -1; c <= 1; c++) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }
      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }
      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }
      var darkCount = 0;
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    }
  };
  var QRMath = {
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    }, gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
  };
  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    }, getLength: function getLength() {
      return this.num.length;
    }, multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    }, mod: function mod(e) {
      if (this.getLength() - e.getLength() < 0) {
        return this;
      }
      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      var num = new Array(this.getLength());
      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }
      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var list = [];
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];
      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }
    return list;
  };
  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;
    }
  };

  function QRBitBuffer() {
    this.buffer = [];
    this.length = 0;
  }

  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    }, put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    }, getLengthInBits: function getLengthInBits() {
      return this.length;
    }, putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    }
  };
  var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

  function _isSupportCanvas() {
    return typeof CanvasRenderingContext2D != "undefined";
  }

  // android 2.x doesn't support Data-URI spec
  function _getAndroid() {
    var android = false;
    var sAgent = navigator.userAgent;

    if (/android/i.test(sAgent)) {
      // android
      android = true;
      var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);

      if (aMat && aMat[1]) {
        android = parseFloat(aMat[1]);
      }
    }

    return android;
  }

  var svgDrawer = function () {

    var Drawing = function Drawing(htOption) {
      this._htOption = htOption;
    };

    Drawing.prototype.draw = function (oQRCode) {
      var _htOption = this._htOption;
      var nCount = oQRCode.getModuleCount();
      var nWidth = Math.floor(_htOption.width / nCount);
      var nHeight = Math.floor(_htOption.height / nCount);

      this.clear();

      function makeSVG(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs) {
          if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
        }return el;
      }

      var svg = makeSVG("svg", {
        'viewBox': '0 0 ' + String(nCount) + " " + String(nCount),
        'width': '100%',
        'height': '100%',
        'fill': _htOption.colorLight
      });
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      svg.appendChild(makeSVG("rect", { "fill": _htOption.colorLight, "width": "100%", "height": "100%" }));
      svg.appendChild(makeSVG("rect", { "fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template" }));

      for (var row = 0; row < nCount; row++) {
        for (var col = 0; col < nCount; col++) {
          if (oQRCode.isDark(row, col)) {
            var child = makeSVG("use", { "x": String(col), "y": String(row) });
            child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template");
            svg.appendChild(child);
          }
        }
      }
      return svg;
    };
    return Drawing;
  }();

  var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

  // Drawing in DOM by using Table tag
  var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? function () {
    var Drawing = function Drawing(htOption) {
      this._htOption = htOption;
    };

    /**
     * Draw the QRCode
     *
     * @param {QRCode} oQRCode
     */
    Drawing.prototype.draw = function (oQRCode) {
      var _htOption = this._htOption;
      var nCount = oQRCode.getModuleCount();
      var nWidth = Math.floor(_htOption.width / nCount);
      var nHeight = Math.floor(_htOption.height / nCount);
      var aHTML = ['<table style="border:0;border-collapse:collapse;">'];

      for (var row = 0; row < nCount; row++) {
        aHTML.push('<tr>');

        for (var col = 0; col < nCount; col++) {
          aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
        }

        aHTML.push('</tr>');
      }

      aHTML.push('</table>');
      _el.innerHTML = aHTML.join('');

      // Fix the margin values as real size.
      var elTable = _el.childNodes[0];
      var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
      var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;

      if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
        elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
      }
    };

    /**
     * Clear the QRCode
     */
    Drawing.prototype.clear = function () {
      this._el.innerHTML = '';
    };

    return Drawing;
  }() : function () {
    // Drawing in Canvas
    function _onMakeImage() {

      this._elCanvas = document.createElement("canvas");
      // this._elImage.src = this._elCanvas.toDataURL("image/png");
      // this._elImage.style.display = "block";
      // this._elCanvas.style.display = "none";
    }

    // Android 2.1 bug workaround
    // http://code.google.com/p/android/issues/detail?id=5141
    if (window._android && window._android <= 2.1) {
      var factor = 1 / window.devicePixelRatio;
      var drawImage = CanvasRenderingContext2D.prototype.drawImage;
      CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
        if ("nodeName" in image && /img/i.test(image.nodeName)) {
          for (var i = arguments.length - 1; i >= 1; i--) {
            arguments[i] = arguments[i] * factor;
          }
        } else if (typeof dw == "undefined") {
          arguments[1] *= factor;
          arguments[2] *= factor;
          arguments[3] *= factor;
          arguments[4] *= factor;
        }

        drawImage.apply(this, arguments);
      };
    }

    /**
     * Check whether the user's browser supports Data URI or not
     *
     * @private
     * @param {Function} fSuccess Occurs if it supports Data URI
     * @param {Function} fFail Occurs if it doesn't support Data URI
     */
    function _safeSetDataURI(fSuccess, fFail) {
      var self = this;
      self._fFail = fFail;
      self._fSuccess = fSuccess;

      // Check it just once
      if (self._bSupportDataURI === null) {
        var el = document.createElement("img");
        var fOnError = function fOnError() {
          self._bSupportDataURI = false;

          if (self._fFail) {
            self._fFail.call(self);
          }
        };
        var fOnSuccess = function fOnSuccess() {
          self._bSupportDataURI = true;

          if (self._fSuccess) {
            self._fSuccess.call(self);
          }
        };

        el.onabort = fOnError;
        el.onerror = fOnError;
        el.onload = fOnSuccess;
        el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
        return el;
      } else if (self._bSupportDataURI === true && self._fSuccess) {
        self._fSuccess.call(self);
      } else if (self._bSupportDataURI === false && self._fFail) {
        self._fFail.call(self);
      }
    };

    /**
     * Drawing QRCode by using canvas
     *
     * @constructor
     * @param {Object} htOption QRCode Options
     */
    var Drawing = function Drawing(htOption) {
      this._bIsPainted = false;
      window._android = _getAndroid();

      this._htOption = htOption;
      this._elCanvas = document.createElement("canvas");
      this._elCanvas.width = htOption.width;
      this._elCanvas.height = htOption.height;
      this._oContext = this._elCanvas.getContext("2d");
      this._bIsPainted = false;
      this._elImage = document.createElement("img");
      this._elImage.alt = "Scan me!";
      this._elImage.style.display = "none";
      this._bSupportDataURI = null;
    };

    /**
     * Draw the QRCode
     *
     * @param {QRCode} oQRCode
     */
    Drawing.prototype.draw = function (oQRCode) {
      var _elImage = this._elImage;
      var _oContext = this._oContext;
      var _htOption = this._htOption;

      var nCount = oQRCode.getModuleCount();
      var nWidth = _htOption.width / nCount;
      var nHeight = _htOption.height / nCount;
      var nRoundedWidth = Math.round(nWidth);
      var nRoundedHeight = Math.round(nHeight);

      _elImage.style.display = "none";
      this.clear();

      for (var row = 0; row < nCount; row++) {
        for (var col = 0; col < nCount; col++) {
          var bIsDark = oQRCode.isDark(row, col);
          var nLeft = col * nWidth;
          var nTop = row * nHeight;
          _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
          _oContext.lineWidth = 1;
          _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
          _oContext.fillRect(nLeft, nTop, nWidth, nHeight);

          // 안티 앨리어싱 방지 처리
          _oContext.strokeRect(Math.floor(nLeft) + 0.5, Math.floor(nTop) + 0.5, nRoundedWidth, nRoundedHeight);

          _oContext.strokeRect(Math.ceil(nLeft) - 0.5, Math.ceil(nTop) - 0.5, nRoundedWidth, nRoundedHeight);
        }
      }

      this._bIsPainted = true;
    };

    /**
     * Make the image from Canvas if the browser supports Data URI.
     */
    Drawing.prototype.makeImage = function () {
      if (this._bIsPainted) {
        _safeSetDataURI.call(this, _onMakeImage);
      }
      var img = new Image();
      img.src = this._elCanvas.toDataURL();
      return img;
    };

    /**
     * Return whether the QRCode is painted or not
     *
     * @return {Boolean}
     */
    Drawing.prototype.isPainted = function () {
      return this._bIsPainted;
    };

    /**
     * Clear the QRCode
     */
    Drawing.prototype.clear = function () {
      this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
      this._bIsPainted = false;
    };

    /**
     * @private
     * @param {Number} nNumber
     */
    Drawing.prototype.round = function (nNumber) {
      if (!nNumber) {
        return nNumber;
      }

      return Math.floor(nNumber * 1000) / 1000;
    };

    return Drawing;
  }();

  /**
   * Get the type by string length
   *
   * @private
   * @param {String} sText
   * @param {Number} nCorrectLevel
   * @return {Number} type
   */
  function _getTypeNumber(sText, nCorrectLevel) {
    var nType = 1;
    var length = _getUTF8Length(sText);

    for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
      var nLimit = 0;

      switch (nCorrectLevel) {
        case QRErrorCorrectLevel.L:
          nLimit = QRCodeLimitLength[i][0];
          break;
        case QRErrorCorrectLevel.M:
          nLimit = QRCodeLimitLength[i][1];
          break;
        case QRErrorCorrectLevel.Q:
          nLimit = QRCodeLimitLength[i][2];
          break;
        case QRErrorCorrectLevel.H:
          nLimit = QRCodeLimitLength[i][3];
          break;
      }

      if (length <= nLimit) {
        break;
      } else {
        nType++;
      }
    }

    if (nType > QRCodeLimitLength.length) {
      throw new Error("Too long data");
    }

    return nType;
  }

  function _getUTF8Length(sText) {
    var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return replacedText.length + (replacedText.length != sText ? 3 : 0);
  }

  /**
   * @class QRCode
   * @constructor
   * @example
   * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
   *
   * @example
   * var oQRCode = new QRCode("test", {
  *    text : "http://naver.com",
  *    width : 128,
  *    height : 128
  * });
   *
   * oQRCode.clear(); // Clear the QRCode.
   * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
   *
   * @param {HTMLElement|String} el target element or 'id' attribute of element.
   * @param {Object|String} vOption
   * @param {String} vOption.text QRCode link data
   * @param {Number} [vOption.width=256]
   * @param {Number} [vOption.height=256]
   * @param {String} [vOption.colorDark="#000000"]
   * @param {String} [vOption.colorLight="#ffffff"]
   * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H]
   */
  QRCode = function QRCode(vOption) {
    this._htOption = {
      width: 256,
      height: 256,
      typeNumber: 4,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRErrorCorrectLevel.H
    };

    if (typeof vOption === 'string') {
      vOption = {
        text: vOption
      };
    }

    // Overwrites options
    if (vOption) {
      for (var i in vOption) {
        this._htOption[i] = vOption[i];
      }
    }

    if (this._htOption.useSVG) {
      Drawing = svgDrawer;
    }

    window._android = _getAndroid();
    this._oQRCode = null;
    this._oDrawing = new Drawing(this._htOption);

    if (this._htOption.text) {
      this.makeCode(this._htOption.text);
    }
  };

  /**
   * Make the QRCode
   *
   * @param {String} sText link data
   */
  QRCode.prototype.makeCode = function (sText) {
    this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
    this._oQRCode.addData(sText);
    this._oQRCode.make();
    this._oDrawing.draw(this._oQRCode);
    return this.makeImage();
  };

  /**
   * Make the Image from Canvas element
   * - It occurs automatically
   * - Android below 3 doesn't support Data-URI spec.
   *
   * @private
   */
  QRCode.prototype.makeImage = function () {
    if (typeof this._oDrawing.makeImage == "function" && (!window._android || window._android >= 3)) {
      return this._oDrawing.makeImage();
    }
  };

  /**
   * Clear the QRCode
   */
  QRCode.prototype.clear = function () {
    this._oDrawing.clear();
  };

  /**
   * @name QRCode.CorrectLevel
   */
  QRCode.CorrectLevel = QRErrorCorrectLevel;

  return QRCode;
}();

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Textbox.prototype, {
    stateProperties: fabric.Textbox.prototype.stateProperties.concat(["maxLines", "maxWidth", "fixedWidth", "maxHeight", "easyEdit"]),
    maxLines: 0,
    maxWidth: 0,
    fixedWidth: false,
    maxHeight: 0,
    _longLines: [],
    easyEdit: false,
    setEasyEdit: function setEasyEdit(val) {
        this.easyEdit = val;
        if (val) {
            this._enterEditing = this.enterEditing.bind(this);
            this.on('selected', this._enterEditing);
        } else {
            this.off('selected', this._enterEditing);
            delete this._enterEditing;
        }
    },
    render: function render(ctx) {
        if (this.dirty) {
            this._forceClearCache = true;
            this._textLines = this._splitTextIntoLines(ctx);
            this._updateTextarea();
            this.setCoords();
        }
        this.callSuper("render", ctx);
    },
    _getNewSelectionStartFromOffset: function _getNewSelectionStartFromOffset(mouseOffset, prevWidth, width, index, jlen) {

        var distanceBtwLastCharAndCursor = mouseOffset.x - prevWidth,
            distanceBtwNextCharAndCursor = width - mouseOffset.x,
            offset = distanceBtwNextCharAndCursor > distanceBtwLastCharAndCursor ? 0 : 1,
            newSelectionStart = index + offset;

        // if object is horizontally flipped, mirror cursor location from the end
        if (this.flipX) {
            newSelectionStart = jlen - newSelectionStart;
        }

        // the index passed into the function is padded by the amount of lines from _textLines (to account for \n)
        // we need to remove this padding, and pad it by actual lines, and / or spaces that are meant to be there
        var tmp = 0,
            removed = 0,
            _long = 0; //modified @den.ponomarev

        // account for removed characters
        for (var i = 0; i < this._textLines.length; i++) {
            tmp += this._textLines[i].length;
            if (tmp + removed >= newSelectionStart) {
                break;
            }
            //modified @den.ponomarev
            if (this._longLines[i]) {
                newSelectionStart--;
                _long++;
            }

            if (this.text[tmp + removed] === '\n' || this.text[tmp + removed] === ' ') {
                removed++;
            }
        }

        if (newSelectionStart > this.text.length) {
            newSelectionStart = this.text.length;
        }
        //modified @den.ponomarev
        return newSelectionStart - i + removed + _long;
    },
    /**
     * Wraps a line of text using the width of the Textbox and a context.
     * @param {CanvasRenderingContext2D} ctx Context to use for measurements
     * @param {String} text The string of text to split into lines
     * @param {Number} lineIndex
     * @returns {Array} Array of line(s) into which the given text is wrapped
     * to.
     */
    _wrapLine: function _wrapLine(ctx, text, lineIndex) {
        var lineWidth = 0,
            lines = [],
            line = '',
            words = text.split(' '),
            word = '',
            offset = 0,
            infix = ' ',
            wordWidth = 0,
            infixWidth = 0,
            largestWordWidth = 0,
            lineJustStarted = true,
            additionalSpace = this._getWidthOfCharSpacing();

        this._longLines = [];
        var _maxWidth = this.maxWidth || this.fixedWidth && this.width;
        var isLongWord = false;
        for (var i = 0; i < words.length; i++) {
            word = words[i];
            wordWidth = this._measureText(ctx, word, lineIndex, offset);

            var _isLong = _maxWidth && wordWidth > _maxWidth;
            if (_isLong) {
                if (line != '') {
                    lines.push(line);
                    this._longLines.push(isLongWord);
                    isLongWord = false;
                    lineWidth = 0;
                    line = '';
                }

                var _bigWordWidth = 0; // lineWidth + infixWidth;
                for (var k = 0, len = word.length; k < len && _bigWordWidth < _maxWidth - 10; k++) {
                    _bigWordWidth += this._getWidthOfChar(ctx, word[k], lineIndex, k + offset);
                }
                var new_word = word.substring(0, k - 1);
                isLongWord = true;

                words.splice(i, 1, new_word, word.substr(k - 1));
                i--;
                // line ='';
                lineJustStarted = true;
                continue;
            }
            lineWidth += infixWidth + wordWidth - additionalSpace;

            if (lineWidth >= this.width) {
                if (!lineJustStarted) {
                    lines.push(line);
                    this._longLines.push(isLongWord);
                    isLongWord = false;
                    line = '';
                    lineWidth = wordWidth;
                    lineJustStarted = true;
                }
            } else {

                lineWidth += additionalSpace;
            }
            offset += word.length;

            if (!lineJustStarted) {
                line += infix;
            }
            line += word;

            infixWidth = this._measureText(ctx, infix, lineIndex, offset);
            offset++;

            // keep track of largest word
            if (wordWidth > largestWordWidth) {
                largestWordWidth = wordWidth;
            }
            lineJustStarted = false;
        }

        i && lines.push(line);
        this._longLines.push(false);

        if (largestWordWidth > this.dynamicMinWidth) {
            this.dynamicMinWidth = largestWordWidth - additionalSpace;
        }
        return lines;
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderText: function _renderText(ctx) {
        this._renderTextFill(ctx);
        this._renderTextStroke(ctx);
        this._renderTextOversize(ctx);
    },
    _renderTextOversize: function _renderTextOversize(ctx) {

        var lineHeight = 0;
        for (var i = 0, len = this._textLines.length; i < len; i++) {

            var lineWidth = this._getLineWidth(ctx, i);
            var lineLeftOffset = this._getLineLeftOffset(lineWidth);
            var heightOfLine = this._getHeightOfLine(ctx, i);

            if (this._longLines[i]) {
                ctx.fillRect(this._getLeftOffset() + lineLeftOffset + lineWidth + 2, this._getTopOffset() + lineHeight + heightOfLine / 2 - 1, 5, this.fontSize / 15);
            }

            lineHeight += heightOfLine;
        }
    },

    insertChar: function insertChar(_char, skipUpdate, styleObject) {
        var isEndOfLine = this.text[this.selectionStart] === '\n';

        var _old_text = this.text;
        var _old_textLines = this._textLines;
        var _old_styleMap = this._styleMap;
        this.text = this.text.slice(0, this.selectionStart) + _char + this.text.slice(this.selectionEnd);
        this._textLines = this._splitTextIntoLines();
        this.insertStyleObjects(_char, isEndOfLine, styleObject);
        this.selectionStart += _char.length;
        this.selectionEnd = this.selectionStart;

        var oversize = false;
        if (this.maxHeight) {
            var _h = 0;
            for (var i = 0; i < this._textLines.length; i++) {
                _h += this._getHeightOfLine(this.ctx, 0);
            }
            if (_h > this.maxHeight) {
                oversize = true;
            }
        }
        if (this.maxLines && this._textLines.length > this.maxLines) {
            oversize = true;
        }

        if (oversize) {
            this.text = _old_text;
            this.selectionStart -= _char.length;
            this.selectionEnd = this.selectionStart;
            this._textLines = this._splitTextIntoLines();
        }

        if (skipUpdate) {
            return;
        }

        this._updateTextarea();
        this.setCoords();
        this._fireSelectionChanged();
        this.fire('changed');
        this.restartCursorIfNeeded();
        if (this.canvas) {
            this.canvas.fire('text:changed', { target: this });
            this.canvas.renderAll();
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.StaticCanvas.prototype, {

  _showMainLoaderIndicator: function _showMainLoaderIndicator(e) {
    var canvas = e.target;
    canvas.loaderElement = $(this.loader.template);
    $(canvas.wrapperEl).append(canvas.loaderElement).addClass("loading");
  },
  _hideMainLoaderIndicator: function _hideMainLoaderIndicator(e) {
    var canvas = e.target;
    canvas.loaderElement.remove();
    $(canvas.wrapperEl).removeClass("loading");
  }
});

fabric.util.object.extend(fabric.Editor.prototype, {
  pending: false,
  setPending: function setPending(val) {
    this.pending = val;
    if (val) {
      if (this.canvas) {
        this.canvas.interactive = false;
      }
      if (this.slides) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var slide = _step.value;

            slide.interactive = false;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  },
  loader: {
    container: "",
    template: "<div class='canvas-loader'><span class='loader-spinner fa fa-pulse fa-spinner canvas-load-spinner'></span><span class='loader-message'>Loading...</span></div>"
    // icon:   'data:image/svg+xml;base64,' + require('base64-loader!./../media/loader.svg'),
  },
  _showMainLoaderIndicator: function _showMainLoaderIndicator(e) {
    if (this.canvasContainer.constructor !== HTMLCanvasElement) {
      $(this.canvasContainer).append(this._loaderElement);
    }
    $(this.canvasContainer).addClass("loading");
  },
  _hideMainLoaderIndicator: function _hideMainLoaderIndicator(e) {
    if (this.pending) {
      this.pending = false;
      return;
    }
    this._loaderElement.remove();
    $(this.canvasContainer).removeClass("loading");
  },
  setLoader: function setLoader(val) {
    if (!val) return;
    if (val.constructor === String) {
      val = {
        id: val
      };
    }
    if (val.id) {
      this._loaderElement = $(document.getElementById(val.id));
    }
    if (val.template) {
      this.loader.template = val.template.replace("{loaderIcon}", this.loader.icon);
      this._loaderElement = $(this.loader.template);
    }
    if (val) {
      // this.loader.container = $(val.container);
      // this.loader.element = $(val.template).hide();
      // this.on("loading:begin", this._showMainLoaderIndicator);
      // this.on("loading:end", this._hideMainLoaderIndicator);
      if (this._loading) {
        this._showMainLoaderIndicator();
      }
      if (val.pending) {
        this._showMainLoaderIndicator();
      }
      this.on("loading:begin", this._showMainLoaderIndicator.bind(this));
      this.on("loading:end", this._hideMainLoaderIndicator.bind(this));
      // this.on("slide:loading:begin", this._showMainLoaderIndicator.bind(this));
      // this.on("slide:loading:end", this._hideMainLoaderIndicator.bind(this));

    }
  }
});

// fabric.util.object.extend(fabric.Canvas.prototype, {
//   // loaderTemplate: "<span class='fa fa-pulse fa-spinner canvas-load-spinner'></span>",
//   setLoaderTemplate: function (val) {
//     if(this.virtual) return false;
//     this.loaderTemplate = val;
//     if(val) {
//       this.loaderEl = $(this.loaderTemplate).hide();
//       $(this.wrapperEl).append(this.loaderEl);
//       this.on("loading:begin", function () {
//         this.loaderEl.show();
//         $(this.wrapperEl).addClass("loading");
//       });
//       this.on("loading:end", function () {
//         this.loaderEl.hide();
//         $(this.wrapperEl).removeClass("loading");
//       });
//     }
//   }
// });
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

//if ( fabric.isLikelyNode ){
//    //fabric.webFontsLoader = require("webfontloader");
//} else {
//     fabric.webFontsLoader = require("./../../plugins/webfont.js");
//}


// if(typeof WebFont == "undefined"){
//   fabric.webFontsLoader = require("./../../plugins/webfont.js");
// } else {
//   fabric.webFontsLoader = WebFont;
// }

//интересная библиотека
// http://opentype.js.org/index.html
//todo add step
//
// fabric.Editor.prototype.steps.splice(3,0,"loadWebfonts");

fabric.loadFonts = function (options) {
  var _this = this;

  this.webFontsStatus = "loading";
  var options = fabric.util.object.extend({
    active: function active() {
      if (_this.waitForWebfonts) {
        fabric.util.fonts.waitFor(options.google.families.concat(options.custom.families), function () {
          _this.webFontsStatus = "ready";
          _this.fire("fonts:loaded");
        });
      } else {

        if (options.google && options.google.families.length) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = options.google.families[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var family = _step.value;

              fabric.util.clearFabricFontCache(family);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        if (options.custom && options.custom.families.length) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = options.custom.families[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _family = _step2.value;

              fabric.util.clearFabricFontCache(_family);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        // callback()
        _this.webFontsStatus = "ready";
        _this.fire("fonts:loaded");
      }
    },
    inactive: function inactive() {
      console.warn("fonts could not be loaded");
      _this.webFontsStatus = "failed";
      _this.fire("fonts:loaded");
    }
  }, options);
  WebFont.load(options);
};

fabric.util.object.extend(fabric.Editor.prototype, {
  setWebfonts: function setWebfonts(options /*,callback*/) {

    var _fonts = [].concat(options.native || []).concat(options.custom || []).concat(options.google || []);
    this.fonts = fabric.util.object.sortBy(_fonts, function (font) {
      return font;
    });

    if (fabric.webFontsStatus === "ready" || fabric.webFontsStatus === "failed") {
      return; // callback()
    }
    fabric.on("fonts:loaded fonts:failed", function () {
      //callback();
    });
    if (fabric.webFontsStatus === "loading") {
      return;
    }
    if (fabric.isLikelyNode) {
      fabric.webFontsStatus = "failed";
      //todo шрифты не грузятся на сервере
      //return callback();
    }

    if (options.google) {
      if (options.google.length) {
        options.google = { families: options.google };
      } else {
        delete options.google;
      }
    }
    if (options.custom) {
      if (options.custom.length) {
        options.custom = { families: options.custom };
      } else {
        delete options.custom;
      }
    }
    fabric.loadFonts(options);
  },
  setFonts: function setFonts(fonts) {
    this.fonts = fonts;
  },
  fonts: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Geneva', 'sans-serif', 'serif', 'monospace', 'cursive'],
  /*
  {
    native: []
    google: [],
    custom: []
  }
   */
  webfonts: null
});

fabric.util.fonts = {
  waitFor: function waitFor(fonts, callback) {
    var checklist = [];
    var interval;
    var node = void 0,
        font = void 0;
    var initialWidth = void 0;
    for (var i = 0, l = fonts.length; i < l; ++i) {
      font = fonts[i];

      node = document.createElement('span');
      // Characters that vary significantly among different fonts
      node.innerHTML = 'giItT1WQy@!-/#';
      // Visible - so we can measure it - but not on the screen
      node.style.position = 'absolute';
      node.style.left = '-10000px';
      node.style.top = '-10000px';
      // Large font size makes even subtle changes obvious
      node.style.fontSize = '300px';
      // Reset any font properties
      node.style.fontFamily = 'sans-serif';
      node.style.fontVariant = 'normal';
      node.style.fontStyle = 'normal';
      node.style.fontWeight = 'normal';
      node.style.letterSpacing = '0';
      document.body.appendChild(node);
      initialWidth = node.offsetWidth;
      // Remember width with no applied web font
      node.style.fontFamily = font;
      if (node.offsetWidth === initialWidth) {
        checklist.push(node);
      } else {
        fabric.clearFabricFontCache(node.style.fontFamily);
      }
    }

    function checkFonts() {
      for (var i = checklist.length; i--;) {
        if (node.offsetWidth !== initialWidth) {
          checklist.splice(checklist.indexOf(font), 1);
          node.parentNode.removeChild(node);

          fabric.clearFabricFontCache(node.style.fontFamily);
          // If all fonts have been loaded
          if (!checklist.length) {
            clearInterval(interval);
            callback();
          }
        }
      }
    }
    if (checklist.length) {
      interval = setInterval(checkFonts, 50);
    } else {
      callback();
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

if (!Toolbar) {
  __webpack_require__(65);
  var Toolbar = __webpack_require__(1);
  __webpack_require__(66);
  __webpack_require__(67);
  __webpack_require__(70);
  __webpack_require__(71);
  __webpack_require__(72);
}

Toolbar.prototype.setFunctionCallback = function (target) {
  if (target.canvas) {
    return target.canvas.renderAll();
  }
  if (target.renderAll) {
    return target.renderAll();
  }
};

fabric.ToolsMixin = {
  /**
   *
   * @param tools ["x", "*", "y"]
   * @param proto
   * @returns ["x", "a", "b", "c", "y"]
   * @private
   */
  _getTools: function _getTools(tools, proto) {
    var indexOfStar = -1;
    if ((indexOfStar = tools.indexOf("*")) == -1) {
      return tools;
    }

    var klassname = fabric.util.string.capitalize(fabric.util.string.camelize(proto.type), true);
    var protoFabric = fabric[klassname].prototype;
    var protoApp = this.application.prototypes[klassname];

    var tools2 = protoApp && protoApp.tools || protoFabric.tools;
    if (tools2) {
      tools.splice.apply(tools, [indexOfStar, 1].concat(tools2));
    }
    var _tools = this._getTools(tools, protoFabric.__proto__);
    return _tools;
  },
  setTools: function setTools(tools) {
    if (this.application.toolbars.objects) {
      var _tools = [].concat(tools); //
      this.tools = this._getTools(_tools, this.__proto__);
      this.makeActions();
    }
  },
  makeActions: function makeActions() {
    var actions = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.tools[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var tool = _step.value;

        var _val = this._getActionValue(tool);
        if (_val) {
          actions[tool] = _val;
        } else {
          console.warn("tool " + tool + " is undefined");
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.generatedActions = Toolbar.makeActions(actions, this);
  }
};

fabric.Toolbar = Toolbar;

fabric.util.object.extend(fabric.Object.prototype, fabric.ToolsMixin, {
  optionsOrder: function () {
    var oo = fabric.Object.prototype.optionsOrder;
    oo.push("actions", "tools");
    return oo;
  }()
});

fabric.util.object.extend(fabric.Editor.prototype, fabric.ToolsMixin, {
  optionsOrder: function () {
    var oo = fabric.Editor.prototype.optionsOrder;
    oo.splice(oo.indexOf("prototypes") + 1, 0, "actions");
    oo.splice(oo.indexOf("objects"), 0, "toolbars", "tools");
    return oo;
  }(),
  objectsToolbarContainer: null,
  target: null,
  setToolbarCoords: function setToolbarCoords($menu, target, options) {

    options = fabric.util.object.extend({
      originX: "left",
      originY: "top",
      marginX: 0,
      marginY: 0
    }, options);

    target.setCoords();
    var r = target.getBoundingRect();

    var _left;
    switch (options.originX) {
      case "left":
        _left = r.left;
        break;
      case "right":
        _left = r.left + r.width;
        break;
      case "center":
        _left = r.left + r.width / 2;
        break;
    }

    var _top;
    switch (options.originY) {
      case "top":
        _top = r.top - $menu.height();
        break;
      case "bottom":
        _top = r.top + r.height;
        break;
      case "center":
        _top = r.top + r.height / 2 - $menu.height() / 2;
        break;
    }

    var $wrapper = $menu.relativeParent(); // $(target.canvas.wrapperEl);
    var _menuContainerOffset = $($menu.parents()[0]).offset();
    var _canvasOffset = $(target.canvas.wrapperEl).offset();
    var _pos = $(target.canvas.wrapperEl).position();

    var _scale = $(target.canvas.wrapperEl).height() / target.canvas.height;
    _top *= _scale;
    _left *= _scale;

    _top += options.marginY + _canvasOffset.top - _menuContainerOffset.top; // + _pos.top;
    _left += options.marginX + _canvasOffset.left - _menuContainerOffset.left; // + _pos.left;

    _left = Math.max(3, _left);

    var _overflow = -$wrapper.width() + _left + $menu.width() + 3;

    if (_overflow > 0) {
      _left -= _overflow;
    }

    var coords = {
      top: Math.max(3, _top),
      left: _left
    };

    //  $(this.wrapperEl).offset();

    $menu.css(coords);
    return coords;
  },
  _createObjectsToolbar: function _createObjectsToolbar(options) {
    var _this = this;

    var $ctr;
    if (options.container) {
      $ctr = $(document.getElementById(options.container));
    } else {
      $ctr = $('<div>');
      $(this.wrapperEl).prepend($ctr);
    }
    if (options.position) {
      fabric.util.object.defaults(options.position, {
        originX: "left",
        originY: "top",
        marginX: 0,
        marginY: 0
      });
      $ctr.addClass("floated-menu");
      $ctr.css({
        "position": "absolute",
        "z-index": 999
      });
    }

    $ctr.hide();
    this.on({
      'target:cleared': function targetCleared(event) {
        if (event.previous) {
          $ctr.hide();
          _this.objectToolbar.destroy();
          delete _this.objectToolbar;
        }
      },
      'target:changed': function targetChanged(event) {
        if (event.previous) {
          _this.objectToolbar.destroy();
        }
        $ctr.show();
        if (_this.target.actions) {
          _this.objectToolbar = new fabric.Toolbar(_this.target, $ctr, _this.target.generatedActions, options);
        }
        if (options.position) {
          _this.setToolbarCoords($ctr, _this.target, options.position);
          // this.objectToolbar.moving_eventListener = this.setToolbarCoords.bind(this, $ctr, this.target, options.position);
          // this.target.on("moving",this.objectToolbar.moving_eventListener)
        }
      },
      'target:modified': function targetModified(event) {
        if (options.position) {
          _this.setToolbarCoords($ctr, _this.target, options.position);
        }
      }
    });
  },
  _createCanvasToolbar: function _createCanvasToolbar(options) {
    if (!options) return;

    this.on("slide:changed", function (e) {
      var canvas = e.canvas;
      if (this.slideToolbar) {
        this.slideToolbar.destroy();
      }
      this.slideToolbar = new fabric.Toolbar(canvas, options.container, canvas.generatedActions, options);
    });

    if (this.canvas) {
      this.slideToolbar = new fabric.Toolbar(this.canvas, options.container, this.canvas.generatedActions, options);
    }
  },
  setToolbars: function setToolbars(options) {
    this.toolbars = options;

    if (options.tools) {
      if (options.tools.Editor) {
        this.setTools(options.tools.Editor);
        delete options.tools.Editor;
      }
      for (var klassName in options.tools) {
        if (!this.prototypes[klassName]) {
          this.prototypes[klassName] = {};
        }
        this.prototypes[klassName].tools = options.tools[klassName];
      }
    }
    if (options.application) {}
    if (options.objects) {
      this._createObjectsToolbar(options.objects);
    }
    if (options.canvas) {
      this._createCanvasToolbar(options.canvas);
    }
  },
  setTools: function setTools(tools) {
    if (this.toolbars.application) {
      var _tools = [].concat(tools); //
      this.tools = this._getTools(_tools, this.__proto__.__proto__);
      this.makeActions();
      new fabric.Toolbar(this, this.toolbars.application.container, this.generatedActions, this.toolbars.application);
    }
  },
  /*setToolbarOptions: function(toolbarOptions){
     fabric.util.object.deepExtend(Toolbar.tools, toolbarOptions.tools);
    for (var klassName in toolbarOptions.actions) {
      var actions = toolbarOptions.actions[klassName];
      if(!fabric[klassName].prototype.actions){
        fabric[klassName].prototype.actions = {}
      }
      var protoActions = fabric[klassName].prototype.actions;
       if (actions.constructor == Function) {
        actions = actions.call(fabric[klassName].prototype)
      }else{
        actions = fabric.util.object.cloneDeep(actions);
      }
     // var $order = actions["$order"];
     // delete actions["$order"];
       for (var j in actions) {
        if(protoActions[j]){
          if (actions[j]["$clone"]) {
            protoActions[j] = fabric.util.object.deepExtend({}, protoActions[j]);
            delete actions[j]["$clone"];
          }
          fabric.util.object.deepExtend(protoActions[j], actions[j]);
        }else{
          protoActions[j] = actions[j];
        }
      }
    }
  },*/
  eventListeners: fabric.util.object.extendArraysObject(fabric.Editor.prototype.eventListeners, {
    // "canvas:created" : function(){
    //  this.initTools();
    // },
    //  "canvas:created": function(){
    //    this.createToolbars();
    //  }
  })
});

//todo нужно сделать порядок свойст унаследуемым
fabric.util.object.extend(fabric.Canvas.prototype, fabric.ToolsMixin, {
  setTools: function setTools(tools) {
    if (this.application.toolbars.canvas) {
      var _tools = [].concat(tools);
      this.tools = this._getTools(_tools, this.__proto__.__proto__);
      this.makeActions();
    }
  },
  optionsOrder: function () {
    var oo = fabric.StaticCanvas.prototype.optionsOrder;
    oo.push("actions", "tools");
    return oo;
  }()
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.extend({
  relativeParent: function relativeParent() {
    var regex = /(static|relative|absolute)/;
    var relativeParent = this.parents().filter(function () {
      var parent = $(this);
      return regex.test(parent.css("position"));
    }).eq(0);

    return !relativeParent.length ? $(this[0].ownerDocument || document) : relativeParent;
  },
  scrollParent: function scrollParent(includeHidden) {
    var position = this.css("position"),
        excludeStaticParent = position === "absolute",
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        scrollParent = this.parents().filter(function () {
      var parent = $(this);
      if (excludeStaticParent && parent.css("position") === "static") {
        return false;
      }
      return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
    }).eq(0);

    return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
  },
  eachSelf: function eachSelf(selector, foo) {
    this.find(selector).each(foo);
    if (this.is(selector)) {
      foo.call(this[0]);
    }
  }

});

$.fn.appendText = function (text) {
  return this.each(function () {
    var textNode = document.createTextNode(text);
    $(this).append(textNode);
  });
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

// if(!$.minicolors){
//     require("../../plugins/$.minicolors");
// }

if (typeof Toolbar === "undefined") {
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.colorpicker = function (el, options) {
  options.format = 'rgb';
  options.opacity = true;
  el.minicolors(options);
};

Toolbar.prototype.colorpickerOptions = {
  position: "right bottom"
};

Toolbar.prototype.tools.color = {
  template: '<div class="object-menu-item" title="{title}">' + '<div class="btn button-{id} {className}">' + '<input type="text" data-format="rgba" data-opacity="true" data-text="true" data-control="saturation" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|#0ff"  value="{valueCurrent}" transclude>',
  post: function post($item, data, options, transclude) {
    //var target = data.target;

    var _visible = false;
    this.colorpicker(transclude, fabric.util.object.extend({
      // value:        data.value.get() ,//|| data.value.get(),
      defaultValue: /*data.value.defaultValue ||*/data.value.get(),
      control: 'hue',
      format: 'hex',
      keywords: '',
      inline: false,
      letterCase: 'lowercase',
      opacity: true,
      position: "right bottom",
      swatches: "#fff|#000|#f00|#0f0|#00f|#ff0|#0ff".split('|'),
      text: true,
      hide: function hide() {
        _visible = false;
      },
      show: function show() {
        _visible = true;
      },
      change: function change(value, opacity) {
        data.value.set(value);
      }
    }, options.colorpicker));

    var _el = $(transclude.parents()[0]).find(".minicolors-panel");

    var _HIDE = function _HIDE(e) {
      if (_visible && $(e.target).parents().index(_el) == -1) {
        transclude.minicolors("hide");
        $("body").off("mousedown", _HIDE);
      }
    };
    $("body").on("mousedown", _HIDE);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!$.fontSelector) {
  __webpack_require__(68);
}

if (typeof Toolbar === "undefined") {
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.fonts = ['Arial,Helvetica,sans-serif', 'Arial Black,Gadget,sans-serif', 'Comic Sans MS,cursive', 'Courier New,Courier,monospace', 'Georgia,serif', 'Impact,Charcoal,sans-serif', 'Lucida Console,Monaco,monospace', 'Lucida Sans Unicode,Lucida Grande,sans-serif', 'Palatino Linotype,Book Antiqua,Palatino,serif', 'Tahoma,Geneva,sans-serif', 'Times New Roman,Times,serif', 'Trebuchet MS,Helvetica,sans-serif', 'Verdana,Geneva,sans-serif', 'Gill Sans,Geneva,sans-serif'];

Toolbar.prototype.tools.fontFamily = {
  scope: function scope(data, options) {
    return {
      //currentValue: data.value.get(),
      onchange: function onchange(e) {
        data.value.set(parseFloat($(e.target).val()));
      }
    };
  },
  template: "<div class=\"object-menu-item object-menu-font-family\" title=\"{title}\">\n      <label class=\"btn button-{id} {className}\">\n      <div class=\"fontSelect\" transclude><div class=\"arrow-down\">",
  post: function post($item, data, options, transclude) {

    transclude.fontSelector({
      'hide_fallbacks': true,
      'initial': data.value.get(), //'Courier New,Courier New,Courier,monospace',
      'selected': data.value.set.bind(data.target),
      'fonts': data.data
    });

    this.on("destroy", function () {
      transclude.fontSelector("destroy");
    });
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Font Selector - jQuery plugin 0.1
 *
 * Copyright (c) 2012 Chris Dyer
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following
 * conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following
 * disclaimer. Redistributions in binary form must reproduce the above copyright notice, this list of conditions
 * and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 */

(function (factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory(__webpack_require__(69));
  } else {
    factory(jQuery);
  }
})(function ($) {

  'use strict';
  //if(_ && _.styleSheetContains && !_.styleSheetContains('.fontSelect')){
  //  _.linkCSS(_.scriptURL() + "/../../css/jquery.fontSelector.css");
  //}

  var settings;

  var methods = {
    destroy: function destroy(options) {
      this.ul.remove();
    },
    close: function close(options) {
      this.closeUl();
    },
    init: function init(options) {

      settings = $.extend({
        'hide_fallbacks': false,
        'selected': function selected(style) {},
        'opened': function opened() {},
        'closed': function closed() {},
        'initial': '',
        'fonts': []
      }, options);

      var root = this;
      var $root = $(this);
      root.selectedCallback = settings['selected'];
      root.openedCallback = settings['opened'];
      root.closedCallback = settings['closed'];
      var visible = false;
      var selected = false;
      var openedClass = 'fontSelectOpen';

      var displayName = function displayName(font) {
        if (settings['hide_fallbacks']) {
          var index = font.indexOf(',');
          if (index == -1) return font;
          return font.substr(0, index);
        } else return font;
      };

      var select = function select(font, initial) {
        root.find('span').html(displayName(font).replace(/["']{1}/gi, ""));
        root.css('font-family', font);
        selected = font;

        if (!initial) root.selectedCallback(selected);
      };

      var positionUl = function positionUl() {
        var left, top;
        left = $(root).offset().left;
        top = $(root).offset().top + $(root).outerHeight();

        $(ul).css({
          'position': 'absolute',
          'left': left + 'px',
          'top': top + 'px',
          'width': $(root).outerWidth() + 'px'
        });
      };

      var closeUl = this.closeUl = function () {
        ul.slideUp('fast', function () {
          visible = false;
        });

        $root.removeClass(openedClass);

        root.closedCallback();
      };

      var openUi = function openUi() {
        ul.slideDown('fast', function () {
          visible = true;
        });

        $root.addClass(openedClass);

        root.openedCallback();
      };

      // Setup markup
      $root.prepend('<span>' + settings['initial'].replace(/'/g, '&#039;') + '</span>');
      var ul = this.ul = $('<ul class="fontSelectUl"></ul>').appendTo('body');
      ul.hide();
      positionUl();

      for (var i = 0; i < settings['fonts'].length; i++) {
        var item = $('<li>' + displayName(settings['fonts'][i]) + '</li>').appendTo(ul);
        item.css('font-family', settings['fonts'][i]);
        item[0].data = settings['fonts'][i];
      }

      if (settings['initial'] != '') select(settings['initial'], true);

      ul.find('li').click(function () {

        if (!visible) return;

        positionUl();
        closeUl();

        select(this.data);
      });

      $root.click(function (event) {

        if (visible) return;

        event.stopPropagation();

        positionUl();
        openUi();
      });

      $('html').click(function () {
        if (visible) {
          closeUl();
        }
      });
    },
    selected: function selected() {
      return this.data;
    },
    select: function select(font) {
      this.find('span').html(font.substr(0, font.indexOf(',')).replace(/["']{1}/gi, ""));
      this.css('font-family', font);
      var selected = false;
      selected = font;
    }
  };
  $.fontSelector = {};

  $.fn.fontSelector = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.fontSelector');
    }
  };
});

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


;
if (typeof Toolbar === "undefined") {
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.updateSelectedOption = function (data) {
  var $checked = data.$item.find(":checked");
  var $checkedOptionEl = $($checked.parents()[0]);

  var selOption = data.$item.find('.btn-selected-option');
  selOption.html($checkedOptionEl.find("label")[0].outerHTML);
};

Toolbar.prototype.tools.option = {
  scope: function scope(data, options) {
    var _self = this;
    return {
      parentId: data.parent.id,
      valueCurrent: data.parent.value.get() === data.option,
      onchange: function onchange() {
        //оптимизировать

        var $checked = data.$item.find(":checked");
        var _value = $checked.val();
        if (_value == data.option) {
          data.parent.value.set(_value);
        }
        _self.updateSelectedOption(data.parent);
      }
    };
  },
  template: '<div class="object-menu-item object-menu-option " title="{title}" >' + '<input type="radio" id="tool-{id}" dp-checked="{valueCurrent}" name="{parentId}" value="{option}" onchange="onchange()">' + '<label class="btn button-{id} {className}" for="tool-{id}">' + '<img dp-if="icon" dp-src="icon">' + '<span dp-include="svg" dp-if="svg"></span>' + '<span dp-if="title" class="option-title">{title}</span>'
};

Toolbar.prototype.tools.options = {
  scope: function scope(data, options) {
    return {
      position: options.options && options.options.position,
      className: data.className || 'items-column',
      buttonsTitle: options.buttons && options.buttons.title || false,
      buttonsClassName: options.buttons.className || ''
    };
  },
  template: "<div class=\"object-menu-item object-menu-options {className}\" title=\"{title}\">\n      <div class=\"btn-selected-option\"></div>\n      <div class=\"object-menu-options-container {position}\" transclude>",
  post: function post($item, data, options, transclude) {
    this.generateMenu(data.target, transclude, options, data.menu);
    this.updateSelectedOption(data);
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


;
if (typeof Toolbar === "undefined") {
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.tools.select = {
  scope: function scope(data, options) {
    return {
      getInputValue: function getInputValue() {
        return parseFloat(data.$item.find("input").val());
      },
      getValue: data.value.get,
      setValue: data.value.set,
      onchange: function onchange(e, model) {
        data.value.set(e.params.data.id, model);
      }
    };
  },
  template: '<div class="object-menu-item object-menu-select {itemClassName}" title="{title}" ><label for="xxx" class="btn button-{id} {className}"></label><select id="xxx">',
  render: function render($item, data, options, tool, val) {
    var model = data.value.options(),
        _val = data.value.get(),
        _select = $item.find("select");

    _select.dpSelect("data", model);
    _select.dpSelect("val", [_val]);
  },
  post: function post($item, data, options, tool, val) {
    var model = data.value.options(),
        _val = data.value.get(),
        _select = $item.find("select");
    var dropdown = data.dropdown;

    _select.dpSelect({
      width: dropdown.width || 40,
      minimumResultsForSearch: dropdown.minimumResultsForSearch || Infinity,
      dropdownParent: this.container.relativeParent(),
      data: model,
      theme: dropdown.theme,
      templateSelection: function templateSelection(state, container) {
        return dropdown.templateSelection(state, container, data);
      },
      templateResult: function templateResult(state, container) {
        return dropdown.templateResult(state, container, data);
      }
    }).on("select2:select", function (e) {
      data.onchange(e, model);
    });
    _select.dpSelect("val", [_val]);

    this.on("destroy", function () {
      _select.dpSelect("destroy");
    });
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Toolbar === "undefined") {
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.colorpicker = function (el, options) {
  // options.format = 'rgb';
  // options.opacity = true;
  el.minicolors(options);
};

Toolbar.prototype.tools.effect = {
  scope: function scope(data, options) {
    return {
      buttonsTitle: options.buttons && options.buttons.title || false,
      isParameters: !!data.actionParameters,
      buttonsClassName: options.buttons && options.buttons.className || ''
      // effectClassName: data
    };
  },
  template: '<div class="object-menu-item" title="{title}">' + '<button class="btn button-{id} {className} {buttonsClassName}">' + '<span dp-if="buttonsTitle" class="button-title">{title}</span>' + '</button>' + '<div dp-if="isParameters" class="menu-action-parameters {effectClassName}" style="display: none" transclude></div>' + '</div>',
  post: function post($item, data, options, transclude) {

    if (data.container) {
      transclude = $(document.getElementById(data.container));
    }

    var $tpl;
    var foo = function foo() {
      if (data.effectTpl) {
        $tpl = $(data.effectTpl);
        transclude.html($tpl);
      }
      if (data.actionParametersId) {
        $tpl = $("#" + data.actionParametersId).clone();
        transclude.html($tpl);
      }
      return data.actionParameters.call(data.target, transclude, data, options);
    };
    this.toggleByButton($item, transclude, foo, data);
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczpuczE9Imh0dHA6Ly9zb3ppLmJhaWVyb3VnZS5mciIKICAgIGlkPSJzdmc0ODg4IgogICAgc29kaXBvZGk6ZG9jbmFtZT0id2FybmluZ19idXR0b24uc3ZnIgogICAgdmlld0JveD0iMCAwIDQwMCA0MDAiCiAgICB2ZXJzaW9uPSIxLjEiCiAgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjAgcjk2NTQiCiAgPgogIDxkZWZzCiAgICAgIGlkPSJkZWZzNDg5MCIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTEiCiAgICAgICAgeTI9IjM2Ny44OCIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMjg3LjQ5IgogICAgICAgIHgyPSIzMTUuNDciCiAgICAgICAgeDE9IjI0MS40MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNDE1OCIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNjAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTowIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPGZpbHRlcgogICAgICAgIGlkPSJmaWx0ZXI2MTI2IgogICAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPGZlR2F1c3NpYW5CbHVyCiAgICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXI2MTI4IgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIwLjUzMDM1NzEzIgogICAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAvPgogICAgPC9maWx0ZXIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTMiCiAgICAgICAgeTI9IjM5MS40NSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMzAwLjg2IgogICAgICAgIHgyPSIzNDIiCiAgICAgICAgeDE9IjI3NS42MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNzIwMSIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM1NTAwMDAiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcyMDMiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPHJhZGlhbEdyYWRpZW50CiAgICAgICAgaWQ9InJhZGlhbEdyYWRpZW50ODQxNSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICBjeD0iMzEyLjc4IgogICAgICAgIGN5PSIzODYuNTciCiAgICAgICAgcj0iNTMuMDM2IgogICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS41OTMyNyAtLjU5MzI3IC43MTUwNSAtLjcxNTA1IDI0My4yNyA4NDkuMDMpIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A3MTEzLTciCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTouNDA4MTYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcxMTUtNyIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjAiCiAgICAgICAgICBvZmZzZXQ9IjEiCiAgICAgIC8+CiAgICA8L3JhZGlhbEdyYWRpZW50CiAgICA+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDQ0OSIKICAgICAgICB5Mj0iMzM4LjgyIgogICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgIHkxPSIyODYuNjciCiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguOTU1MzQgMCAwIC45NTUzNCAxMzYuMTIgMTQuMDU1KSIKICAgICAgICB4Mj0iMzAwLjI3IgogICAgICAgIHgxPSIyNTUuMzIiCiAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICA+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNTAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmIgogICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAvPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A0MTUyIgogICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZjtzdG9wLW9wYWNpdHk6MCIKICAgICAgICAgIG9mZnNldD0iMSIKICAgICAgLz4KICAgIDwvbGluZWFyR3JhZGllbnQKICAgID4KICAgIDxmaWx0ZXIKICAgICAgICBpZD0iZmlsdGVyMTE0MjgiCiAgICAgICAgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjExNDMwIgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIxLjI0MzQ2NzgiCiAgICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgIC8+CiAgICA8L2ZpbHRlcgogICAgPgogIDwvZGVmcwogID4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgIGlkPSJiYXNlIgogICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk4OCIKICAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICAgaW5rc2NhcGU6em9vbT0iMC43MDcxMDY3OCIKICAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgICBpbmtzY2FwZTpjeD0iMzA0Ljg5NDA5IgogICAgICBpbmtzY2FwZTpjeT0iMzQxLjUyMTg2IgogICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2ODAiCiAgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAvPgogIDxnCiAgICAgIGlkPSJsYXllcjEiCiAgICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC02NTIuMzYpIgogICAgPgogICAgPGcKICAgICAgICBpZD0iZzExNDMyIgogICAgICAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSI5MCIKICAgICAgICBpbmtzY2FwZTpleHBvcnQteGRwaT0iOTAiCiAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMi45MDUxIDAgMCAyLjkwNTEgLTEwMDEuOSAtNzguOTYxKSIKICAgICAgPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjc2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDojOTk5OTk5IgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTczNTQgMCAwIC45NzM1NCAxMjAuMDkgLTEyLjYyOCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI3OCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTEpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTU5NjAgMCAwIC45NTk2MCAxMjQuMzMgLTcuODAxNCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6I2VjZWNlYyIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjg3MzU1IDAgMCAuODczNTUgMTUwLjQ3IDIxLjk4MSkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MiIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6Izk5OTk5OSIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjgzODM4IDAgMCAuODM4MzggMTYxLjE1IDM0LjE1MikiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4NCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTMpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguODA1ODcgMCAwIC44MDU4NyAxNzEuMDMgNDUuNDA1KSIKICAgICAgICAgIHNvZGlwb2RpOmN5PSIzNDYuMTEyMTgiCiAgICAgICAgICBzb2RpcG9kaTpjeD0iMzAzLjc1IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjg2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI3JhZGlhbEdyYWRpZW50ODQxNSkiCiAgICAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICAgICBkPSJtMzU2Ljc5IDM0Ni4xMWMwIDI5LjI5MS0yMy43NDUgNTMuMDM2LTUzLjAzNiA1My4wMzZzLTUzLjAzNi0yMy43NDUtNTMuMDM2LTUzLjAzNiAyMy43NDUtNTMuMDM2IDUzLjAzNi01My4wMzYgNTMuMDM2IDIzLjc0NSA1My4wMzYgNTMuMDM2eiIKICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC43NTgyNSAwIDAgLjc1ODI1IDE4Ni43NSA2My45MDYpIgogICAgICAgICAgc29kaXBvZGk6Y3k9IjM0Ni4xMTIxOCIKICAgICAgICAgIHNvZGlwb2RpOmN4PSIzMDMuNzUiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDcyODgiCiAgICAgICAgICBzdHlsZT0ib3BhY2l0eTouMzE3NzE7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50MTA0NDkpIgogICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgIGQ9Im00MTQuOCAyODQuMTVjLTEzLjMzMSAwLjMwMDY5LTI2LjE4NiA3LjM1OC0zMy4zMzYgMTkuNzQyLTcuNjkwMyAxMy4zMi02LjcxMzkgMjkuMjY2IDEuMTU0NSA0MS4zMzEgMC44NTMwNi0yNi41MzIgMjEuMTMyLTQ2LjUxNSA0Ni4zMjQtNDUuMDU0IDguMjU4OSAwLjQ3OTA3IDE2LjA1NCAzLjIwMDEgMjIuODU5IDcuNTkwOC0zLjI1NzgtNy40NDk4LTguODE3MS0xMy45NTMtMTYuMzk0LTE4LjMyNy02LjQ4NjctMy43NDUxLTEzLjYyNS01LjQzOTMtMjAuNjA4LTUuMjgxOHoiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icmVjdDczNzAiCiAgICAgICAgICBkPSJtNDAyLjg4IDMwMC4wOS0xMS41ODEgMTEuNTgxIDEzLjI5NSAxMy4yOTUtMTMuMjk1IDEzLjI4MSAxMS41ODEgMTEuNTgxIDEzLjI4MS0xMy4yOTUgMTMuMjk1IDEzLjI5NSAxMS41ODEtMTEuNTgxLTEzLjI4MS0xMy4yODEgMTMuMjgxLTEzLjI5NS0xMS41ODEtMTEuNTgxLTEzLjI5NSAxMy4yODEtMTMuMjgxLTEzLjI4MXoiCiAgICAgICAgICBzdHlsZT0iZmlsdGVyOnVybCgjZmlsdGVyMTE0MjgpO2ZpbGw6IzFhMWExYSIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDEwNDU3IgogICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgICBkPSJtNDAzLjQ1IDMwMS4xNS0xMS4wODcgMTEuMDg3IDEyLjcyOCAxMi43MjgtMTIuNzI4IDEyLjcxNCAxMS4wODcgMTEuMDg3IDEyLjcxNC0xMi43MjggMTIuNzI4IDEyLjcyOCAxMS4wODctMTEuMDg3LTEyLjcxNC0xMi43MTQgMTIuNzE0LTEyLjcyOC0xMS4wODctMTEuMDg3LTEyLjcyOCAxMi43MTQtMTIuNzE0LTEyLjcxNHoiCiAgICAgIC8+CiAgICA8L2cKICAgID4KICA8L2cKICA+CiAgPG1ldGFkYXRhCiAgICA+CiAgICA8cmRmOlJERgogICAgICA+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgPgogICAgICAgIDxkYzpmb3JtYXQKICAgICAgICAgID5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQKICAgICAgICA+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIKICAgICAgICAvPgogICAgICAgIDxjYzpsaWNlbnNlCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICAvPgogICAgICAgIDxkYzpwdWJsaXNoZXIKICAgICAgICAgID4KICAgICAgICAgIDxjYzpBZ2VudAogICAgICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL29wZW5jbGlwYXJ0Lm9yZy8iCiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPk9wZW5jbGlwYXJ0PC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpwdWJsaXNoZXIKICAgICAgICA+CiAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICA+ZXJyb3IgYnV0dG9uPC9kYzp0aXRsZQogICAgICAgID4KICAgICAgICA8ZGM6ZGF0ZQogICAgICAgICAgPjIwMTEtMDItMjRUMTc6NDU6NDU8L2RjOmRhdGUKICAgICAgICA+CiAgICAgICAgPGRjOmRlc2NyaXB0aW9uCiAgICAgICAgLz4KICAgICAgICA8ZGM6c291cmNlCiAgICAgICAgICA+aHR0cHM6Ly9vcGVuY2xpcGFydC5vcmcvZGV0YWlsLzEyMjQyNS9lcnJvci1idXR0b24tYnktcmljYXJkb21haWE8L2RjOnNvdXJjZQogICAgICAgID4KICAgICAgICA8ZGM6Y3JlYXRvcgogICAgICAgICAgPgogICAgICAgICAgPGNjOkFnZW50CiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPnJpY2FyZG9tYWlhPC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpjcmVhdG9yCiAgICAgICAgPgogICAgICAgIDxkYzpzdWJqZWN0CiAgICAgICAgICA+CiAgICAgICAgICA8cmRmOkJhZwogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+YnV0dG9uPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPmNhbmNlbDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5jaXJjbGU8L3JkZjpsaQogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+ZGVsZXRlPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPnJlZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5yb3VuZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgIDwvcmRmOkJhZwogICAgICAgICAgPgogICAgICAgIDwvZGM6c3ViamVjdAogICAgICAgID4KICAgICAgPC9jYzpXb3JrCiAgICAgID4KICAgICAgPGNjOkxpY2Vuc2UKICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICA+CiAgICAgICAgPGNjOnBlcm1pdHMKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNSZXByb2R1Y3Rpb24iCiAgICAgICAgLz4KICAgICAgICA8Y2M6cGVybWl0cwogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rpc3RyaWJ1dGlvbiIKICAgICAgICAvPgogICAgICAgIDxjYzpwZXJtaXRzCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjRGVyaXZhdGl2ZVdvcmtzIgogICAgICAgIC8+CiAgICAgIDwvY2M6TGljZW5zZQogICAgICA+CiAgICA8L3JkZjpSREYKICAgID4KICA8L21ldGFkYXRhCiAgPgo8L3N2Zwo+Cg=="

/***/ })
/******/ ]);