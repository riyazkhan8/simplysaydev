



fabric.util.object.extend(fabric.Textbox.prototype, {
    maxLines: 0,
    maxWidth: 0,
    maxHeight: 0,
    _longLines: [],
    _getNewSelectionStartFromOffset: function(mouseOffset, prevWidth, width, index, jlen) {

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
        var tmp     = 0,
            removed = 0,
            _long = 0; //modified @den.ponomarev

        // account for removed characters
        for (var i = 0; i < this._textLines.length; i++) {
            tmp += this._textLines[i].length;
            if (tmp + removed >= newSelectionStart) {
                break;
            }
            //modified @den.ponomarev
            if(this._longLines[i]){
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
    _wrapLine: function(ctx, text, lineIndex) {
        var lineWidth        = 0,
            lines            = [],
            line             = '',
            words            = text.split(' '),
            word             = '',
            offset           = 0,
            infix            = ' ',
            wordWidth        = 0,
            infixWidth       = 0,
            largestWordWidth = 0,
            lineJustStarted = true,
            additionalSpace = this._getWidthOfCharSpacing();

        this._longLines = [];
        var isLongWord = false;
        for (var i = 0; i < words.length; i++) {
            word = words[i];
            wordWidth = this._measureText(ctx, word, lineIndex, offset);

            var _isLong = this.maxWidth  && wordWidth > this.maxWidth;
            if(_isLong){
                if(line != '') {
                    lines.push(line);
                    this._longLines.push(isLongWord);
                    isLongWord = false;
                    lineWidth = 0;
                    line = '';
                }

                var _bigWordWidth = 0;// lineWidth + infixWidth;
                for (var k = 0, len = word.length; k < len  && _bigWordWidth < this.maxWidth - 10; k++) {
                    _bigWordWidth += this._getWidthOfChar(ctx, word[k], lineIndex, k + offset);
                }
                var new_word =word.substring(0,k - 1);
                isLongWord = true;

                /*  if(new_word != ''){;
                      line += /*infix + */new_word;
                // */
                words.splice(i,1,new_word, word.substr(k - 1));
                i--;
                // line ='';
                lineJustStarted = true;
                continue;
            }
            lineWidth += infixWidth + wordWidth - additionalSpace;

            if (lineWidth >= this.width){
                if(!lineJustStarted){
                    lines.push(line);
                    this._longLines.push(isLongWord);
                    isLongWord = false;
                    line = '';
                    lineWidth = wordWidth;
                    lineJustStarted = true;
                }
            }
            else {

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
    _renderText: function(ctx) {
        this._renderTextFill(ctx);
        this._renderTextStroke(ctx);
        this._renderTextOversize(ctx);
    },
    _renderTextOversize: function(ctx){

        var lineHeight = 0;
        for (i = 0, len = this._textLines.length; i < len; i++) {

            lineWidth = this._getLineWidth(ctx, i);
            lineLeftOffset = this._getLineLeftOffset(lineWidth);
            heightOfLine = this._getHeightOfLine(ctx, i);

            if(this._longLines[i]){
                ctx.fillRect(this._getLeftOffset() + lineLeftOffset + lineWidth + 2, this._getTopOffset() + lineHeight + heightOfLine/2 - 1, 5, this.fontSize / 15);
            }

            lineHeight += heightOfLine;
        }
    },

    insertChar: function(_char, skipUpdate, styleObject) {
        var isEndOfLine = this.text[this.selectionStart] === '\n';

        var _old_text = this.text;
        var _old_textLines = this._textLines;
        var _old_styleMap = this._styleMap;
        this.text = this.text.slice(0, this.selectionStart) +
            _char + this.text.slice(this.selectionEnd);
        this._textLines = this._splitTextIntoLines();
        this.insertStyleObjects(_char, isEndOfLine, styleObject);
        this.selectionStart += _char.length;
        this.selectionEnd = this.selectionStart;

        var oversize = false;
        if( this.maxHeight ){
            var _h = 0;
            for(var i = 0; i < this._textLines.length; i++ ){
                _h += this._getHeightOfLine( this.ctx, 0);
            }
            if( _h > this.maxHeight){
                oversize = true;
            }
        }
        if ( this.maxLines && this._textLines.length > this.maxLines){
            oversize = true;
        }

        if(oversize){
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