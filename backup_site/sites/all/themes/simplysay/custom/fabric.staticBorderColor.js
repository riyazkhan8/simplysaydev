
fabric.util.object.extend(fabric.Text.prototype,{
    staticBorderColor: false,
    render: function(ctx, noTransform){

      if (!this.visible) {
        return;
      }
      if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
        return;
      }
      if (this._shouldClearDimensionCache()) {
        this._setTextStyles(ctx);
        this._initDimensions(ctx);
      }
      fabric.Object.prototype.render.call(this, ctx, noTransform);

      this._drawBorders(ctx,noTransform);
    },
    _drawBorders: function(ctx,noTransform){
      if (this.active || !this.staticBorderColor) {
          return;
      }
      ctx.save();
      if (!noTransform) {
        this.transform(ctx);
      }
      ctx.strokeStyle = this.staticBorderColor;
      ctx.strokeRect(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
      );
      ctx.restore();
    }
});
