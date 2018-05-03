if(!window.$){
  window.$ = jQuery;
}
$.fn.absolutePosition = function() {

  var off = this.offset(),  pos = this.position();
  var scroll = {top: document.documentElement.scrollTop || document.body.scrollTop || window.scrollY || 0, left:document.documentElement.scrollLeft || document.body.scrollLeft || window.scrollX || 0, bottom : document.documentElement.scrollHeight - $(window).height(), right: document.documentElement.scrollWidth - $(window).width()}
  var margin = {top: getValue(this.css("margin-top")), left: getValue(this.css("margin-left")) ,bottom: getValue(this.css("margin-bottom")), right: getValue(this.css("margin-right"))};

  function getValue(val){if(val == "auto") return 0 ;var num =  parseInt(val);return isNaN(num) ? 0 : num;}

  var border_offset = getValue(this.css("border-width")) * 2;

  return { top:     off.top, left:    off.left, bottom:  $(window).height() - off.top  - margin.bottom + scroll.bottom - this.height() - border_offset, right:   $(window).width() - off.left  - margin.right + scroll.right - this.width()};
};

$.fn.dpResizable = $.fn.resizable = function(scope) {

  function doIt(p){

    p.className = p.className + ' resizable';
    var resizer = document.createElement('div');
    resizer.className = 'resizable-se';
    p.appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);


    var startX, startY, startWidth, startHeight;

    function initDrag(e) {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
      e.preventDefault();
      e.stopPropagation();
    }

    function doDrag(e) {
      p.style.width = (startWidth + e.clientX - startX) + 'px';
      p.style.height = (startHeight + e.clientY - startY) + 'px';
      e.preventDefault();
      e.stopPropagation();
    }

    function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  for(var i =0 ; i < this.length; i++){
    doIt(this[i])
  }

};




$.fn.dpDraggable = $.fn.draggable = function(scope) {
  var element = this;
  scope = scope || {
      button: 0,
      onChange:   null,
      ngModel:    null,
      onMove:     null,
      onCancel:   null,
      onDrop:     null,
      draggable:  "self",//"helper",
      draggableArea: null,
      droppable:  "[droppable]"
    };




  scope.excludeElements = scope.excludeElements || ".no-drag";
  scope.includeElements = scope.includeElements ||  ".drag-on";
  scope.draggable = scope.draggable || "self";
  scope.droppable = scope.droppable || "[droppable]";

  /**
   * при нажатииклавиши мыши на объекте - подготовливаемся к перетаскиванию.
   */
  function prepareForDrag(event){

    var _tags = "INPUT|SELECT|TEXTAREA|BUTTON";
    if(_tags.indexOf(event.target.tagName)!= -1 ){
      return;
    }

    if(scope.button && (event.button != scope.button)){
      return;
    }


    var _touch = event.type == "touchstart";
    options = {
      targetEl: event.target,
      hoverEl: null,
      _last_event:  _touch? event.originalEvent.changedTouches[0] : event,
      touch: _touch
    };

    if(scope.draggable == "false"){
      return;
    }

    var _parents = $(options.targetEl).parents();
    _parents.splice(0,0,options.targetEl);
    for(var i = 0; i < _parents.length; i++){
      if($(_parents[i]).is(scope.includeElements)){
        break;
      }
      if($(_parents[i]).is(scope.excludeElements)){
        return;
      }
      if(_parents[i] == element[0]){
        break;
      }
    }

    event.preventDefault();
    event.stopPropagation();

    $(document).on('mousemove touchmove', handleDragStart);
    $(document).on('mouseup touchend', handleDragCancel);
  }

  /**
   * изменение данных объекта droppable
   * @param e
   */
  function onChange(e){

    options.value = options.hoverEl && options.hoverEl.attr("value") || false;

    scope.onChange && scope.onChange({
      $event: e,
      $data:  scope.ngModel,
      $value:  options.value
    });
  }
  /**
   * поиск элемнета droppable под курсором
   * @param e
   */
  function hoverDroppable(e) {
    if(!options.areaEl)return;
    var _drop = scope.droppable || "[droppable]";

    var _hovered = false;
    var els = options.areaEl.find(_drop);

    if(options.areaEl.is(_drop)){
      els.push(options.areaEl[0])
    };

    els.each( function () {

      var el = $(this);
      var pos = el.absolutePosition();

      if (e.pageX > pos.left && e.pageX < pos.left + el.width() &&
        e.pageY > pos.top  && e.pageY < pos.top  + el.height()){

        _hovered = true;

        if(!options.hoverEl || options.hoverEl[0] != el[0]){
          el.addClass("hover");
          options.hoverEl = el;
          onChange(e);
        }
        options.hoverX = e.pageX - pos.left;
        options.hoverY = e.pageY - pos.top;
      }else{
        el.removeClass("hover");
      }

    });

    if(!_hovered){
      options.hoverEl = null;
      delete options.hoverX;
      delete options.hoverY;
      onChange(e);
    }
  }

  /**
   * перемеение элемента
   * @param event
   */
  function handleDragMove(event) {
    event.preventDefault();

    var e =  options.touch? event.originalEvent.changedTouches[0] : event;

    if(options.areaEl){
      var pos_area =  options.areaEl.absolutePosition();

      var _top = e.pageY - options.helperStartOffsetY - pos_area.top + options.marginTop + options.areaEl[0].scrollTop;
      var _left =  e.pageX - options.helperStartOffsetX - pos_area.left + options.marginLeft + options.areaEl[0].scrollLeft;

    }else{
      var _top = e.pageY - options.helperStartOffsetY + options.marginTop ;
      var _left = e.pageX - options.helperStartOffsetX + options.marginLeft;
    }

    if(element.hasClass("draggable-limited")){
      var _w = element.outerWidth(), _h = element.outerHeight();
      if(_top < options.marginTop){
        _top = options.marginTop;
      }
      if(_left < options.marginLeft){
        _left = options.marginLeft;
      }
      if(_left > options.areaEl.outerWidth() - _w + options.marginLeft){
        _left = options.areaEl.outerWidth() - _w + options.marginLeft;
      }
      if(_top > options.areaEl.outerHeight() - _h + options.marginTop){
        _top = options.areaEl.outerHeight() - _h + options.marginTop;
      }
    }


    if(options._helper){

      options._helper.css({
        top:   _top,
        left:   _left
      });
    }

    hoverDroppable(e);

    var $options = {
      originalEvent: e,
      element: element,
      event: e,
      data: scope.ngModel,
      helper: options._helper,
      x: _left,
      y: _top ,
      dropEl:  options.hoverEl,
      dragEl: options.dragEl,
      areaEl: options.areaEl,
      offsetX: options.helperStartOffsetX,
      offsetY: options.helperStartOffsetY
    };

    e.data = scope.ngModel;

    if(options.hoverEl){

      scope.onMove && scope.onMove({
        $event: $options,
        $data: scope.ngModel
      })
    }
  }


  /**
   * завершаем перетаскивание
   * @param e
   */
  function handleDragEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    element.removeClass("draggable");
    $(document).off('mousemove touchmove', handleDragMove);
    $(document).off('mouseup touchend', handleDragEnd);

    if(options.hoverEl){
      options.hoverEl.removeClass("hover");
    }

    if(!options.hoverEl || !options.hoverEl.length ){

      scope.onCancel && scope.onCancel({
        $event: e,
        $data: scope.ngModel,
        helper: options._helper,
        dragEl: options.dragEl,
        areaEl: options.areaEl
      });

      if(scope.draggable == "helper"){
        options._helper.remove();
      }else{
        //element.css({
        //    top: 0,
        //    left: 0
        //});
      }

    }else{


      // var foo = scope.onDrop && scope.onDrop || options.hoverEl[0].onDrop;

      var $options = {
        originalEvent: e,
        data: scope.ngModel,
        helper: options._helper,
        x: options.hoverX,
        y: options.hoverY,
        value: options.value,
        dropEl:  options.hoverEl,
        dragEl: options.dragEl,
        areaEl: options.areaEl,
        offsetX: options.helperStartOffsetX,
        offsetY: options.helperStartOffsetY,
        callback: function(){
          if(scope.draggable == "helper") {
            options._helper.remove();
          }
        }
      };

      var _remove = scope.onDrop({
        $event:     $options,
        $value:     options.value,
        $callback:  options.callback
      });
      if(_remove !== false && scope.draggable == "helper"){
        options._helper.remove();
      }else{
        //element.css({
        //    top: 0,
        //    left: 0
        //});
      }
    }
    //scope.$apply();
  }


  /**
   * создаем копию перетаскиваемого элемента
   * @param e
   */
  function createHelper(e){
    options._helper = element.clone();
    var pos =  element.absolutePosition();
    var pos_area =  options.areaEl.absolutePosition();


    options._helper.find(".no-helper").remove();

    options._helper.css({
      height:             element.outerHeight(),
      display:            "inline-block",
      "z-index":          e.pageX ? 10000 : 9999,
      //"pointer-events":   "none",
      position:           "absolute",
      left:               pos.left - pos_area.left,
      top:                pos.top - pos_area.top
    })
      .attr("draggable","false")
      .appendTo(options.areaEl);

    options.dragEl = element;

    options._helper.addClass("draggable-helper");

  }

  /**
   * Начинаем перетаскивание
   * @param e
   */
  function handleDragStart(event) {
    var e =  options.touch? event.originalEvent.changedTouches[0] : event;

    if(Math.abs(options._last_event.pageX - e.pageX) < 1 && Math.abs(options._last_event.pageY - e.pageY) < 1){
      return;
    }

    $(document).off('touchmove mousemove', handleDragStart);
    $(document).off('touchend mouseup', handleDragCancel);


    event.preventDefault();
    element.addClass("draggable");

    var _parent =  $(element.parents()[0]);
    if(scope.draggableArea){
      options.areaEl = $(scope.draggableArea);
    }else{
      options.areaEl = _parent;
    }

    var pos =  element.absolutePosition();
    options.helperStartOffsetX = e.pageX - pos.left ;
    options.helperStartOffsetY = e.pageY - pos.top;


    options.marginLeft = 0;
    options.marginTop = 0;
    if(scope.draggable == "helper"){
      createHelper(e);
      options.dragData = scope.ngModel;
    }else if(scope.draggable == "self"){
      options._helper = element;
      options.marginLeft = 0;
      options.marginTop = 0;
      //if(_parent != options.areaEl){
      //    options.marginLeft =  + options.areaEl.offset().left;
      //    options.marginTop = + options.areaEl.offset().top;
      //}
    }

    scope.onDrag && scope.onDrag({
      $event: e,
      $data: scope.ngModel
    });


    $(document).on('mousemove touchmove', handleDragMove);
    $(document).on('mouseup touchend', handleDragEnd);
  }

  /**
   * drag не происходит
   */
  function handleDragCancel(){
    $(document).off('mousemove touchmove', handleDragStart);
    $(document).off('mouseup touchend', handleDragCancel);

  }

  this.on('mousedown touchstart', prepareForDrag);
  return this;
};

