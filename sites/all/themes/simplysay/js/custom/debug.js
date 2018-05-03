(function(window){

  window.debugColor = function(string){
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle= string;
    ctx.fillRect(0,0,100,100);
    window.debugImage(canvas);
  };

  window.debugText = function (text) {
    var blob = new Blob([text], {
      type: 'application/json'
    });
    var objectURL = URL.createObjectURL(blob);
    console.log(objectURL );
  };

  window.debugImage = function(element,noBorders){
    var canvas = document.createElement("canvas");
    canvas.width = noBorders ?element.width: element.width + 2;
    canvas.height = noBorders ?element.height : element.height + 2;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(element, noBorders ? 0 : 1, noBorders ? 0 : 1);
    if(!noBorders){
      ctx.lineWidth=1;
      ctx.strokeStyle="yellow";
      ctx.strokeRect(0,0,this.width + 2,this.height+ 2);
      ctx.setLineDash([4,4]);
      ctx.strokeStyle="#000000";
      ctx.strokeRect(0,0,this.width + 2,this.height+ 2);
    }
    canvas.toBlob(function(blob){
      var objectURL = URL.createObjectURL(blob);
      window.open(objectURL,"_blank");
      console.log(objectURL);
      // window.open(canvas.toDataURL(),"_blank");
    })
  };

  window.getTextDataUrl = function(text) {
    var blob = new Blob([text], {
      type: 'text/plain'
    });
    return objectURL = URL.createObjectURL(blob);
  }


  window.debugImageData = function(imgData){
    var canvas = document.createElement("canvas");
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    var ctx = canvas.getContext('2d');
    ctx.putImageData(imgData,0,0);
    debugImage(canvas);
  };

  if(typeof HTMLImageElement !== "undefined"){
    HTMLImageElement.prototype.debug = function(){
      debugImage(this);
    };
  }

  if(typeof HTMLCanvasElement !== "undefined") {
    HTMLCanvasElement.prototype.debug = function () {
      debugImage(this);
    };
  }

  if(typeof ImageData !== "undefined") {
    ImageData.prototype.debug = function () {

      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      var ctx = canvas.getContext('2d');
      ctx.putImageData(this, 0, 0)
      canvas.debug();
    };
  }

  if(typeof CanvasRenderingContext2D !== "undefined") {
    CanvasRenderingContext2D.prototype.debug = function () {
      this.canvas.debug();
    };
  }

  String.prototype.debug = function(){
    window.open(URL.createObjectURL(new Blob([JSON.stringify(this)],{type : 'text/html'})), '_blank');
  };

  Object.defineProperty( Object.prototype, 'debugProperty', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: function(property,callback) {
      var _local_variablename = "$$$_" + property;
      this[_local_variablename] = this[property];
      console.log(property + ":=" , this[property]);
      Object.defineProperty(this,property,{
        set: function(val){
          callback && callback(val);
          console.trace(property + "::" ,val,this[_local_variablename]);
          this[_local_variablename] = val;
        },
        get: function(){
          return this[_local_variablename];
        }
      })
    }
  });




  function ObservableArray(items) {
    var _self = this,
      _array = [],
      _handlers = {
        itemadded: [],
        itemremoved: [],
        itemset: []
      };

    function defineIndexProperty(index) {
      if (!(index in _self)) {
        Object.defineProperty(_self, index, {
          configurable: true,
          enumerable: true,
          get: function() {
            return _array[index];
          },
          set: function(v) {
            _array[index] = v;
            raiseEvent({
              type: "itemset",
              index: index,
              item: v
            });
          }
        });
      }
    }

    function raiseEvent(event) {
      _handlers[event.type].forEach(function(h) {
        h.call(_self, event);
      });
    }

    Object.defineProperty(_self, "addEventListener", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function(eventName, handler) {
        eventName = ("" + eventName).toLowerCase();
        if (!(eventName in _handlers)) throw new Error("Invalid event name.");
        if (typeof handler !== "function") throw new Error("Invalid handler.");
        _handlers[eventName].push(handler);
      }
    });

    Object.defineProperty(_self, "removeEventListener", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function(eventName, handler) {
        eventName = ("" + eventName).toLowerCase();
        if (!(eventName in _handlers)) throw new Error("Invalid event name.");
        if (typeof handler !== "function") throw new Error("Invalid handler.");
        var h = _handlers[eventName];
        var ln = h.length;
        while (--ln >= 0) {
          if (h[ln] === handler) {
            h.splice(ln, 1);
          }
        }
      }
    });

    Object.defineProperty(_self, "push", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function() {
        var index;
        for (var i = 0, ln = arguments.length; i < ln; i++) {
          index = _array.length;
          _array.push(arguments[i]);
          defineIndexProperty(index);
          raiseEvent({
            type: "itemadded",
            index: index,
            item: arguments[i]
          });
        }
        return _array.length;
      }
    });

    Object.defineProperty(_self, "pop", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function() {
        if (_array.length > -1) {
          var index = _array.length - 1,
            item = _array.pop();
          delete _self[index];
          raiseEvent({
            type: "itemremoved",
            index: index,
            item: item
          });
          return item;
        }
      }
    });

    Object.defineProperty(_self, "unshift", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function() {
        for (var i = 0, ln = arguments.length; i < ln; i++) {
          _array.splice(i, 0, arguments[i]);
          defineIndexProperty(_array.length - 1);
          raiseEvent({
            type: "itemadded",
            index: i,
            item: arguments[i]
          });
        }
        for (; i < _array.length; i++) {
          raiseEvent({
            type: "itemset",
            index: i,
            item: _array[i]
          });
        }
        return _array.length;
      }
    });

    Object.defineProperty(_self, "shift", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function() {
        if (_array.length > -1) {
          var item = _array.shift();
          delete _self[_array.length];
          raiseEvent({
            type: "itemremoved",
            index: 0,
            item: item
          });
          return item;
        }
      }
    });

    Object.defineProperty(_self, "splice", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function(index, howMany /*, element1, element2, ... */ ) {
        var removed = [],
          item,
          pos;

        index = index == null ? 0 : index < 0 ? _array.length + index : index;

        howMany = howMany == null ? _array.length - index : howMany > 0 ? howMany : 0;

        while (howMany--) {
          item = _array.splice(index, 1)[0];
          removed.push(item);
          delete _self[_array.length];
          raiseEvent({
            type: "itemremoved",
            index: index + removed.length - 1,
            item: item
          });
        }

        for (var i = 2, ln = arguments.length; i < ln; i++) {
          _array.splice(index, 0, arguments[i]);
          defineIndexProperty(_array.length - 1);
          raiseEvent({
            type: "itemadded",
            index: index,
            item: arguments[i]
          });
          index++;
        }

        return removed;
      }
    });

    Object.defineProperty(_self, "length", {
      configurable: false,
      enumerable: false,
      get: function() {
        return _array.length;
      },
      set: function(value) {
        var n = Number(value);
        var length = _array.length;
        if (n % 1 === 0 && n >= 0) {
          if (n < length) {
            _self.splice(n);
          } else if (n > length) {
            _self.push.apply(_self, new Array(n - length));
          }
        } else {
          throw new RangeError("Invalid array length");
        }
        _array.length = n;
        return value;
      }
    });

    Object.getOwnPropertyNames(Array.prototype).forEach(function(name) {
      if (!(name in _self)) {
        Object.defineProperty(_self, name, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: Array.prototype[name]
        });
      }
    });

    if (items instanceof Array) {
      _self.push.apply(_self, items);
    }
  }


  Object.defineProperty( Object.prototype, 'debugArray', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: function(property,callback) {



      var observableArray =  new ObservableArray(this[property]);
      console.log(property + ":=" , this[property]);

      observableArray.addEventListener("itemadded", callback || function(e) {
        console.log("Added %o at index %d.", e.item, e.index);
        console.trace(property + "::" ,this);
      });
      observableArray.addEventListener("itemset", callback || function(e) {
        console.log("Set index %d to %o.", e.index, e.item);
          console.trace(property + "::" ,this);
      });
      observableArray.addEventListener("itemremoved", callback || function(e) {
        console.log("Removed %o at index %d.", e.item, e.index);
          console.trace(property + "::" ,this);
      });
      this[property] = observableArray;

      this.debugProperty(property);
    }
  });



})(typeof window !== "undefined" ? window : global);
