/* ========================================================================
 * Plugin Name: Maleo Plugin Library
 *
 * Author: Imam Firmansyah - Prodigystudio
 * Author URI: http://prodigystudio.net
 * Plugin Source: 
 * ======================================================================== */
 
(function($) {
   "use strict";

   // jQuery easypiechart constructor
   if ($.fn.easyPieChart) {
      var defaultset = {
         barColor    : '#95a5a6',
         trackColor  : '#f1f1f1',
         scaleColor  : false,
         lineCap     : 'square',
         lineWidth   : 20,
         size        : 100,
         animation   : 5000,
         font        : 16,
         bgColor     : false
      }

      $.fn.maleoChart = function (options) {

         return this.each(function() {

            var maleoConfig = $.extend({}, defaultset, options),
                widthElement = getSize(maleoConfig.size, $(this), maleoConfig.mode); 
            
            $(this).css({
               'height'       : widthElement,
               'width'        : widthElement,
               'position'     : 'relative',
               'display'      : 'inline-block',
               'margin'       : 'auto 0',
               'text-align'   : 'center',
            });

            $(this).append("<div class='percent' style='position:absolute;top:0;left:0;line-height:"+widthElement+"px;text-align:center;width:"+widthElement+"px;font-size:"+maleoConfig.font+"px;font-weight:300;'></div>");
            if (maleoConfig.bgColor) {
               widthElement = widthElement - maleoConfig.lineWidth;
               $(this).css({'padding': maleoConfig.lineWidth / 2 });
            };

            $(this).easyPieChart({
               barColor    : maleoConfig.barColor,
               trackColor  : maleoConfig.trackColor,
               scaleColor  : maleoConfig.scaleColor,
               lineCap     : maleoConfig.lineCap,
               lineWidth   : maleoConfig.lineWidth,
               size        : widthElement,
               animation   : maleoConfig.animation,
               onStep: function(from, to, percent) {
                  $(this.el).find('.percent').text(Math.round(percent)+'%');
               }
            });
         });  
      }
   } 
   else {
      console.log('jQuery easyPieChart plugin not found');
   }

   function getSize(chartSize, self) {
      var defaultSize = 100,
          widthElement;
      if (chartSize == defaultSize) {
         widthElement = self.parent().width();
      } else {
         widthElement = chartSize;
      }

      return widthElement;
   }

})(jQuery), + (function ($) {
   "use strict";

   // jQuery progress bar
   $.fn.maleoProgressBar = function () {
      return this.each(function() {
         var bar = $(this);
         var percentage = $(this).attr('data-percent');

         progress(percentage, bar);
      });
   }

   function progress(percent, element) {
      var progressBarWidth = percent * element.width() / 100;
      element.find('.progress-content').append("<div class='progress-meter'></div>").animate({ 
         width: progressBarWidth,
         number: percent
      }, {
         duration: 4000,
         step: function(number) { // called on every step
            // Update the element's value:
            element.find('.progress-meter').text(Math.round(number)+'%');
         } 
      });
   }
})(jQuery), + (function ($) {
   "use strict";
   // jQuery menu
   
   if ($.fn.smartmenus) {
     $.fn.maleomenu = function (options) {
      return this.each(function() {
       var self = $(this);

       self.addClass('sm').smartmenus({
        mainMenuSubOffsetX: 0,
        mainMenuSubOffsetY: 10,    
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -47,
        subIndicatorsText : ''
      }).find('li.active').find('a').addClass('active');
     });
    };

    $('.menu').maleomenu();
   } else {
      console.log("Maleo Menu requires jQuery smartmenus plugin");
   }

})(jQuery), + (function ($) {
   "use strict";

   /* ========================================================================
    * Bootstrap: alert.js v3.1.1
    * http://getbootstrap.com/javascript/#alerts
    * ========================================================================
    * Copyright 2011-2014 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    * ======================================================================== */
   
   var dismiss = '[data-component="alert"]';

   var Alert   = function (el) {
      $(el).on('click', dismiss, this.close)
   }

   Alert.prototype.close = function (e) {
      var $this    = $(this)
      var selector = $this.attr('data-target')

      if (!selector) {
         selector = $this.attr('href')
         selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
      }

      var $parent = $(selector)

      if (e) e.preventDefault()

      if (!$parent.length) {
         $parent = $this.hasClass('alert') ? $this : $this.parent()
      }

      $parent.trigger(e = $.Event('close.bs.alert'))

      if (e.isDefaultPrevented()) return

         $parent.removeClass('in')

      function removeElement() {
         $parent.trigger('closed.bs.alert').remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
      $parent
      .one($.support.transition.end, removeElement)
      .emulateTransitionEnd(150) :
      removeElement()
   }

   // Alert Plugin Definition

   var old = $.fn.alert

   $.fn.alert = function (option) {
      return this.each(function () {
         var $this = $(this)
         var data  = $this.data('bs.alert')

         if (!data) $this.data('bs.alert', (data = new Alert(this)))
         if (typeof option == 'string') data[option].call($this)
      })
   }

   $.fn.alert.Constructor = Alert

   // Alert No Conflict
   $.fn.alert.noConflict = function () {
      $.fn.alert = old
      return this
   }

   // Alert Data Api

   $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

})(jQuery), + (function($) {
   // SVG Icon
   "use strict";

   var SVGIcon = {
      init: function ( options, element) {
         var self = element;

         self.config = $.extend( {}, defaultSetVariable, options );
         var drawVal = { icon:self.config.icon, svgClass:self.config.svgClass, svgPath:self.config.pathClass };
         
         // add universal class
         self.addClass('svg-icon');

         // draw svg icon
         drawSvgIcon(drawVal, self);
         
         // draw gradient svg icon
         // if (self.hasClass(self.config.gradientClass)) {  
         //    // drawGradientSvgIcon(self);
         // };
         
         var iconHeight = self.find('.icon-wrapper').height(),
            svgHeight = self.find('.svg').height(),
            svgPadding;

         svgPadding = (svgHeight - iconHeight) / 2;
         self.css({ 
            'text-align'   : 'center',
            'position'     : 'relative',
            'margin-top'   : self.config.positionTop,
            'margin-right'    : 'auto',
            'margin-bottom' : self.config.positionBottom,
            'margin-left'  : 'auto' 
         });

         self.find('.icon-wrapper').css({ 
            'position': 'absolute',
            'top': 0,
            'height' : '100%',
            'width':'100%',
            'padding-top': svgPadding + ( (svgPadding * self.config.iconTop) / 100 ), 
            'padding-bottom': svgPadding + ( (svgPadding * self.config.iconBottom) / 100 )
         });
      }
   };

   $.fn.prodigySvgIcon = function (options) {
      return this.each(function() {
         var svgIcon = Object.create( SVGIcon );

         svgIcon.init( options, $(this) );
         
         $.data( this, 'prodigySvgIcon', svgIcon );
      });
   };

   /**
    * Draw SVG Icon
    */
    function drawSvgIcon(config, e) {
      var c = config.svgClass,
         p = config.svgPath;

      if (config.icon == 'shield') { shieldSvg(c,p,e) } 
      else if (config.icon == 'hexagon') { hexagonSvg(c,p,e) } 
      else if (config.icon == 'cloud') { cloudSvg(c,p,e) } 
      else if (config.icon == 'heart') { heartSvg(c,p,e) } 
      else if (config.icon == 'square') { squareSvg(c,p,e) } 
      else if (config.icon == 'circle') { circleSvg(c,p,e) } 
      else if (config.icon == 'radius') { radiusSvg(c,p,e) } 
      else { console.log('plugin in does not find your svg shape');}

      e.find('i').wrap("<div class='icon-wrapper'></div>");
    }

   /**
    * Draw Gradient SVG Icon
    */
    function drawGradientSvgIcon(element) {
      var gradientColor;

      if (element.hasClass('green')) { 
         gradientColor = gradientGreen(); 
      } else if (element.hasClass('blue')) { 
         gradientColor = gradientBlue(); 
      } else if (element.hasClass('yellow')) { 
         gradientColor = gradientYellow(); 
      } else if (element.hasClass('red')) { 
         gradientColor = gradientRed(); 
      } else { 
         gradientColor = gradientDefault();
      }
      
        element.find('.svg-emmbed-style').html("<defs><linearGradient id='"+gradientColor.gradientId+"' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:rgb("+gradientColor.downColor+");stop-opacity:1'/><stop offset='100%' style='stop-color:rgb("+gradientColor.upColor+");stop-opacity:1'/></linearGradient></defs>");
    }

   /**
    * SVG Icon library
    */
   
    // shield icon svg 

    function squareSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><rect class='"+ p +"' x='6' y='6' width='500' height='500'/></svg>"); }
    function shieldSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M255.98,9.5L43.511,44.347V316.2c0,20.924,10.513,43.522,31.296,67.193c18.429,20.939,44.516,42.381,77.532,63.738c41.222,26.573,83.241,46.356,103.642,55.368c20.432-9.012,62.451-28.795,103.657-55.368c33.041-21.356,59.088-42.799,77.501-63.738c20.808-23.699,31.352-46.27,31.352-67.193V44.347L255.98,9.5z'/></svg>"); }
    function hexagonSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M273.321,499.767c-9.526,5.5-25.115,5.5-34.641,0L53.552,392.886c-9.526-5.5-17.321-19-17.321-30V149.117c0-11,7.794-24.5,17.32-30L238.681,12.233c9.526-5.5,25.114-5.5,34.641,0l185.127,106.884c9.526,5.5,17.32,19,17.32,30v213.769c0,11-7.794,24.5-17.32,30L273.321,499.767z'/></svg>"); }
    function cloudSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M137.444,107.452c-31.127,20.354-66.935,59.435-53.323,128.521c-42.044,11.59-73.346,49.331-73.346,94.98c0,54.322,44.013,98.325,98.322,98.325h296.47c54.296,0,98.321-44.003,98.321-98.325c0-44.814-27.352-80.749-71.036-94.403c3.79-20.288,2.014-55.163-31.372-79.508c-18.623-13.581-57.638-26.305-95.327,2.889C261.188,71.005,169.922,86.211,137.444,107.452z'/></svg>"); }
    function heartSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M256.957,477.293c-12.138-3.615-46.331-31.313-102.581-83.101c-45.729-41.753-77.896-74.871-96.514-99.359C24.679,251.887,8.087,210.329,8.087,170.186c0-37.735,14.164-69.447,42.492-95.142c27.111-24.487,60.09-36.729,98.938-36.729c51.398,0,87.212,21.675,107.44,65.033c20.229-43.358,56.045-65.033,107.443-65.033c38.845,0,71.823,12.241,98.933,36.729c28.331,25.696,42.489,57.407,42.489,95.142c0,29.709-8.904,60.419-26.7,92.126c-17.81,31.719-57.468,75.875-118.975,132.486c-20.226,18.862-37.029,33.921-50.379,45.162C282.648,463.244,265.051,475.688,256.957,477.293L256.957,477.293z'/></svg>"); }
    function radiusSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M506,426c0,44-36,80-80,80H86c-44,0-80-36-80-80V86C6,42,42,6,86,6h340c44,0,80,36,80,80V426z'/></svg>"); }
    function circleSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M506,256c0,137.5-112.5,250-250,250S6,393.5,6,256S118.5,6,256,6S506,118.5,506,256z'/></svg>"); }
   
   /**
    * SVG Gradient library
    */
   
    function gradientDefault() { return { upColor:'149,165,166', downColor:'170,183,184', gradientId : 'gradientSvg'} }
    function gradientGreen() { return { upColor:'26,188,156', downColor:'72,201,176', gradientId : 'gradientSvgGreen' } }
    function gradientBlue() { return { upColor:'52,152,219', downColor:'93,173,226', gradientId : 'gradientSvgBlue' } }
    function gradientYellow() { return { upColor:'241,196,15', downColor:'244,208,63', gradientId : 'gradientSvgYellow' } }
    function gradientRed() { return { upColor:'237,79,79', downColor:'241,114,114', gradientId : 'gradientSvgRed' } }

   /**
    * Default setting
    */

    var defaultSetVariable = { 
      icon              : 'square',             // [string]    - shield, hexagon, cloud, heart, square
      svgClass          : 'svg',             // [string]    - svg class name
      pathClass         : 'svg-path',           // [string]    - svg path class name
      gradientClass     : 'style3',             // [string]    - class name for gradient svg
      positionTop       : 7,                 // [integer]   - add margin top
      positionBottom    : 12,                // [integer]   - add bottom top
      iconTop           : 0,                    // [percent]   - add padding top to icon
      iconBottom        : 0                  // [percent]   - add padding bottom to icon
    };

 })(jQuery), + (function($) {

  "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

})(jQuery), + (function ($) {
  // =================== Jquery Count =================== //
  if ($.fn.countTo) {
  
    if (!Modernizr.touch) {
      // run with trigger
      $('.counter-trigger').waypoint(function() {
        counter_run();
      }, {
        offset: '80%',
        triggerOnce: true
      });
  
  } else { counter_run(); } 
    
    // counter function
    function counter_run() { 
      $('.mo-counter').each(function() {
        $(this).data('countToOptions', {
          formatter: function (value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
          }
        });

        // start all the timers
        $('.timer').each(count);

        function count(options) {
          var $this = $(this);
          options = $.extend({}, options || {}, $this.data('countToOptions') || {});
          $this.countTo(options);
        }
      });
    }

  } else {
    console.log("jQuery Count plugin not found");
  }

})(jQuery), + (function ($) {

  // =================== Jquery Gap =================== //

  $('.gap').each(function () {
    var self = $(this),
    dataGap = self.data();

    $.each(dataGap, function(direction, val) {
      if (direction == "top")    { self.css("margin-top", val+'px'); }
      if (direction == "bottom") { self.css("margin-bottom", val+'px'); }
      if (direction == "left")   { self.css("margin-left", val+'px'); }
      if (direction == "right")  { self.css("margin-right", val+'px'); }
    });

  });

  // =================== Jquery Scroll Top =================== //
  var jump = function(e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: $('html').offset().top
    },1000);

  }

  $(document).ready(function() {
    $('#top').bind("click", jump);
    return false;
  });

  // =================== Jquery Fancybox =================== //
  if ($.fn.fancybox) {
    $(".fancybox").fancybox({
      padding     :0,
      openEffect  :'elastic',
      openSpeed   :250,
      closeEffect :'elastic',
      closeSpeed  :250,
      closeClick  :false,
      helpers     :{
        title   : { type:'outside'},
        media   : {}
      }
    });

    $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
      openEffect    : 'none',
      closeEffect   : 'none',
      prevEffect    : 'none',
      nextEffect    : 'none',
      padding       : 0,

      arrows        : false,
      helpers : {
        media : {},
        buttons : {}
      }
    });
  } else {
    console.log("jQuery fancybox plugin not found ");
  }

   // =================== Isotope Fancybox =================== //
   if ($.fn.isotope) {
      $(window).load(function () {
         var $container = $('.pf-container');
         $container.isotope({
            filter: '*',
            animationOptions: {
               duration: 750,
               easing: 'linear',
               queue: false
            }
         });

         $('#pf-filter a').click(function(){
            var selector = $(this).attr('data-filter');
            $container.isotope({
               filter: selector,
               animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false
               }
            });
            return false;
         });

         var $optionSets = $('#pf-filter'),
         $optionLinks = $optionSets.find('a');

         $optionLinks.click(function(){
            var $this = $(this);
            // don't proceed if already selected
            if ( $this.hasClass('selected') ) {
               return false;
            }
            var $optionSet = $this.parents('#pf-filter');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected'); 
         });
      })
   } else {
      console.log("jQuery isotope plugin not found ");
   }

  // =================== Kyma Additional Jquery =================== //
  $("#toggle-panel").click(function(){
    $("#panel").slideToggle("slow");
  });

  // =================== Progress Bar Jquery =================== //
  if (!Modernizr.touch) {
    // run with trigger
    $('.progress-trigger').waypoint(function() {
      $('.progress-bar').maleoProgressBar();
    }, {
      offset: '80%',
      triggerOnce: true
    });

  } else { $('.progress-bar').maleoProgressBar(); } 
  

  // =================== iCheck =================== //
  if ($.fn.iCheck) {
    $('input').iCheck({
      checkboxClass: 'icheckbox_flat',
      radioClass: 'iradio_flat'
    });
  } else {
    console.log("jQuery iCheck plugin not found ");
  }
  
  // =================== maleoChart =================== //
  if ($.fn.maleoChart) {
    if (!Modernizr.touch) {
      // run with trigger
      $('.chart-trigger').waypoint(function() {
        chart_run();
      }, {
        offset: '80%',
        triggerOnce: true
      });

    } else { chart_run(); } 

    function chart_run() {
      $(".chart").maleoChart({barColor: '#606060', font:32});
      $(".chart-green").maleoChart({ barColor: '#21cba9', font:32 });
      $(".chart-blue").maleoChart({ barColor: '#3ba5ed', font:32 });
      $(".chart-yellow").maleoChart({ barColor: '#fed019', font:32 });
      $(".chart-red").maleoChart({ barColor: '#fd7070', font:32 });

      $(".chart2").maleoChart({barColor: '#fff', bgColor: true, lineWidth: 15, trackColor: '#606060', font:32 });
      $(".chart2-green").maleoChart({ barColor: '#4f4f4f', bgColor: true, lineWidth: 15, trackColor: '#21cba9', font:32 });
      $(".chart2-blue").maleoChart({ barColor: '#4f4f4f', bgColor: true, lineWidth: 15, trackColor: '#3ba5ed', font:32 });
      $(".chart2-yellow").maleoChart({ barColor: '#4f4f4f', bgColor: true, lineWidth: 15, trackColor: '#fed019', font:32 });
      $(".chart2-red").maleoChart({ barColor: '#4f4f4f', bgColor: true, lineWidth: 15, trackColor: '#fd7070', font:32 });
    }
  } else {
    console.log("jQuery maleoChart plugin not found");
  }

  // =================== Jquery prodigySvgIcon =================== //
  if ($.fn.prodigySvgIcon) {
    $('.shield-shape').prodigySvgIcon({ icon : 'shield' });
    $('.hexagon-shape').prodigySvgIcon({ icon : 'hexagon' });
    $('.cloud-shape').prodigySvgIcon({ icon : 'cloud', iconTop : 25 });
    $('.heart-shape').prodigySvgIcon({ icon : 'heart' });  
    $('.circle-shape').prodigySvgIcon({ icon : 'circle' });                 
    $('.square-shape').prodigySvgIcon({ icon : 'square' });
    $('.radius-shape').prodigySvgIcon({ icon : 'radius' });    
  } else {
    console.log("jQuery prodigySvgIcon plugin not found");
  }

  // =================== Jquery mediaelementplayer =================== //
  if ($.fn.mediaelementplayer) {
    $('audio').mediaelementplayer({
      alwaysShowControls: false,
      videoVolume: 'horizontal',
      features: ['playpause','progress','volume']
    });
  } else {
    console.log("jQuery mediaelementplayer plugin not found");
  }
  
  // =================== Jquery tab responsive =================== //
  if ($.fn.easyResponsiveTabs) {
    $('#top-tab').easyResponsiveTabs({ type : 'tab-top' });
    $('#bottom-tab').easyResponsiveTabs({ type : 'tab-bottom' });
    $('#left-tab').easyResponsiveTabs({ type : 'tab-left' });
    $('#right-tab').easyResponsiveTabs({ type : 'tab-right' });
    $('#accordion').easyResponsiveTabs({ type : 'accordion' });
  } else {
    console.log("jQuery easyResponsiveTabs plugin not found");
  }  

  $(".feature-offset").each(function(){ $(this).addClass("panel"); });

  // =================== Jquery barrating =================== //
  if ($.fn.barrating) {
    $('.rating-star').barrating({ showSelectedRating:false });
  } else {
    console.log("jQuery barrating plugin not found");
  }

  // =================== Jquery hover image ================= //
  var slowMove = false;

  setTimeout(function() {
    imagePosition();
  },300);
  
  function imagePosition(slowMove) {
    $(".hoverimg").each(function() {
      var parentW = $(this).parents().width();
      var parentH = $(this).parents().height();
      var imgH = $(this).find('img').height();
      var imgW = $(this).find('img').width();
      var topImg = -(imgH - parentH) / 2;
      var leftImg = -(imgW - parentW) / 2;

      if(slowMove) {
        $(this).find('img').animate({
          'top': topImg, 'left': leftImg
        },'fast');
      } else {
        $(this).find('img').css({ 'top': topImg, 'left': leftImg });
      }
    });
  }

  // imagePosition();
  var currentX = '';
  var currentY = '';
  var movementConstant = .05;

  
  $(".hoverimg").bind('mousemove', function(e) {
    if(currentX == '') currentX = e.pageX;
    var xdiff = e.pageX - currentX;
    currentX = e.pageX;
    if(currentY == '') currentY = e.pageY;
    var ydiff = e.pageY - currentY;
    currentY = e.pageY;

    $(this).find('img').each(function(i, el) {
      var movement = (i + 1) * (xdiff * movementConstant);
      var movementy = (i + 1) * (ydiff * movementConstant);
      var newX = $(el).position().left - movement;
      var newY = $(el).position().top - movementy;
      $(el).css('position', 'absolute');
      $(el).css('left', newX + 'px');
      $(el).css('top', newY + 'px');
    });
  }).bind('mouseleave', function() {
    setTimeout(function() {
      imagePosition(true);
    },100);
  });

  $(".block-size .caption-section, .pf-info").each(function() {
    $(this).find('.pf-like').click(function() {
     $(this).find('i').removeClass('icon-heart').addClass('icon-minismile');
   });
  });
  
  // =================== Jquery Initialization Animation =================== //

  // =================== push For Jquery =================== //
  if (!Modernizr.touch) {

    if ($(".mo-animate")[0]) {
      $('.mo-animate').css('opacity', '0');
    }

    $('.mo-animate').waypoint(function() {
      var animate = $(this).attr('data-animate');
      var delayanimate = $(this).attr('data-delay');
      
      if( delayanimate > 0 ) {
        var delayTime = (delayanimate / 1000) + 's';

        $(this).css({
          'visibility'              : 'visible',
          '-webkit-animation-delay' : delayTime,
          '-moz-animation-delay'    : delayTime,   
          '-o-animation-delay'      : delayTime,     
          'animation-delay'         : delayTime,
        });
      }
        
      $(this).css('opacity', '');
      $(this).addClass("animated " + animate);

    }, {
      offset: '80%',
      triggerOnce: true
    });
  }

  // =================== Jquery Responsive Menu Trigger =================== //

  maleoWidth = $(window).width();
  if (maleoWidth < 767) {
    console.log("mobile mode");
    $('<div class="menu-trigger"><i class="icon-menu"></i></div>').insertBefore(".menu");
    $(".menu").css('display','none');
    $(".menu-trigger").css('display','block');
    $(".menu-trigger").click(function(e) {
      e.preventDefault();
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
        $(".menu").show();
      } else {
        $(".menu").hide();
      }
    });
  }

  // =================== Jquery Pretyprint =================== //

  $(function(){
    window.prettyPrint && prettyPrint()   
  });

})(jQuery);