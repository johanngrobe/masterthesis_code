/*!
 * SmartMenus jQuery Plugin Bootstrap Addon - v0.1.1 - August 25, 2014
 * http://www.smartmenus.org/
 *
 * Copyright 2014 Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function($) {

	// init ondomready
	$(function() {

		// init all menus
		$('ul.navbar-nav').each(function() {
				var $this = $(this);
				$this.addClass('sm').smartmenus({

						// these are some good default options that should work for all
						// you can, of course, tweak these as you like
						subMenusSubOffsetX: 2,
						subMenusSubOffsetY: -6,
            showOnClick:true,
						subIndicatorsPos: 'append',
						subIndicatorsText: '',
						collapsibleShowFunction: null,
						collapsibleHideFunction: null,
						rightToLeftSubMenus: $this.hasClass('navbar-right'),
						bottomToTopSubMenus: $this.closest('.navbar').hasClass('navbar-fixed-bottom')
					})
					// set Bootstrap's "active" class to SmartMenus "current" items (should someone decide to enable markCurrentItem: true)
					.find('a.current').parent().addClass('active');
			})
			.bind({
				// set/unset proper Bootstrap classes for some menu elements
				'show.smapi': function(e, menu) {
					var $menu = $(menu),
						$scrollArrows = $menu.dataSM('scroll-arrows'),
						obj = $(this).data('smartmenus');
					if ($scrollArrows) {
						// they inherit border-color from body, so we can use its background-color too
						$scrollArrows.css('background-color', $(document.body).css('background-color'));
					}
					$menu.parent().addClass('open' + (obj.isCollapsible() ? ' collapsible' : ''));
				},
				'hide.smapi': function(e, menu) {
					$(menu).parent().removeClass('open collapsible');
				},
				// click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
				'click.smapi': function(e, item) {
					var obj = $(this).data('smartmenus');
					if (obj.isCollapsible()) {
						var $item = $(item),
							$sub = $item.parent().dataSM('sub');
						if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
							obj.itemActivate($item);
							obj.menuHide($sub);
							return false;
						}
					}
				}
			});
/*      
      var $mainMenu = $('#main-menu').on('click', 'span.sub-arrow', function(e) {
        // toggle the sub menu on sub arrow click in collapsible mode
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
          var $item = $(this).parent(),
            $sub = $item.parent().dataSM('sub'),
            subIsVisible = $sub.dataSM('shown-before') && $sub.is(':visible');
          $sub.dataSM('arrowClicked', true);
          obj.itemActivate($item);
          if (subIsVisible) {
            obj.menuHide($sub);
          }
          e.stopPropagation();
          e.preventDefault();
        }
      }).bind({
        // don't show the sub menu in collapsible mode unless the sub arrow is clicked
        'beforeshow.smapi': function(e, menu) {
          var obj = $mainMenu.data('smartmenus');
          if (obj.isCollapsible()) {
            var $menu = $(menu);
            if (!$menu.dataSM('arrowClicked')) {
              return false;
            }
            $menu.removeDataSM('arrowClicked');
          }
        }
      });      
*/
	});

	// fix collapsible menu detection for Bootstrap 3
	$.SmartMenus.prototype.isCollapsible = function() {
		return this.$firstLink.parent().css('float') != 'left';
	};

})(jQuery);