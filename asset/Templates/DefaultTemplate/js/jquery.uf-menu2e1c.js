/**
 * @author Benjamin Retel - rbCREATION [https://www.rbcreation.fr]
 * @copyright (c) 2021 - Today. All rights reserved.
 */

(function($) {
	$.fn.ufMenu = function ($options) {
		const defaultParams = {
			"container": this,
			"trigger": "#open-menu",
			"closingTrigger": "#close-menu",
			"menu": "#menu",
			"overlay": "#overlay",
			"showOverlay": false,
			"enableBackgroundScroll": true
		};

		const customParams = $options || null;

		/**
		 * @var array params
		 * @internal Fusion default params and custom params
		 */
		const params = $.extend(defaultParams, customParams);

		/**
		 * @var string containerSelector
		 * @example "#my-site"
		 */
		const containerSelector = params.container;

		/**
		 * @var string triggerSelector
		 * @internal Trigger to open menu
		 * @internal Default: "#open-menu"
		 * @example "#my-open-menu"
		 */
		const triggerSelector = params.trigger;

		/**
		 * @var string closingTriggerSelector
		 * @internal Trigger to close menu
		 * @internal Default: "#close-menu"
		 * @example "#my-close-menu"
		 */
		const closingTriggerSelector = params.closingTrigger;

		/**
		 * @var string menuSelector
		 */
		const menuSelector = params.menu;

		/**
		 * @var string overlay
		 * @internal Overlay selector
		 * @internal Default: "#overlay"
		 * @example "#my-overlay"
		 */
		const overlay = params.overlay;

		/**
		 * @var bool showOverlay
		 * @internal Default: false
		 */
		const showOverlay = params.showOverlay;

		/**
		 * @var bool enableBackgroundScroll
		 * @internal Enable or disable background scroll when menu is open
		 * @internal Default: true
		 */
		const enableBackgroundScroll = params.enableBackgroundScroll;

		/**
		 * @var string html
		 * @internal Html selector
		 */
		const html = $("html");

		/**
		 * @return void
		 */
		function enableScrollOfBackground()
		{
			const backgroundScrollTop = parseInt(html.css("top"));

			html.removeClass("noscroll");
			$("html, body").scrollTop(-backgroundScrollTop);
		}

		/**
		 * @return void
		 */
		function disableScrollOfBackground()
		{
			const backgroundScrollTop = (html.scrollTop())
				? html.scrollTop()
				: $("body").scrollTop();

			html.addClass("noscroll")
				.css("top", -backgroundScrollTop);
		}

		/**
		 * @return void
		 */
		function openMenu()
		{
			// Show overlay
			if (showOverlay) {
				$(overlay).addClass("open")
					.css("opacity", "0")
					.fadeTo(200, 1);
				//$(overlay).fadeIn(400);
			}

			// Active trigger
			$(triggerSelector).addClass("active");

			// Open menu
			$(menuSelector).addClass("open");

			if (!enableBackgroundScroll && html.get(0).scrollHeight > html.innerHeight()) {
				disableScrollOfBackground();
			}
		}

		/**
		 * @return void
		 */
		function closeMenu()
		{
			// Hide overlay
			if ($(overlay).hasClass("open")) {
				$(overlay).fadeTo(200, 0, function() {
					$(overlay).removeClass("open")
						.removeAttr("style");
				});
				//$(overlay).fadeOut(400);
			}

			// Close menu
			if ($(menuSelector).hasClass("open")) {
				$(menuSelector).removeClass("open");
			}

			// Disable trigger
			$(triggerSelector).removeClass("active");

			if (!enableBackgroundScroll) {
				enableScrollOfBackground();
			}
		}

		/**
		 * @return void
		 */
		function menuEvent()
		{
			$(containerSelector).click(function(e) {
				if (!$(menuSelector).hasClass("open")) {
					if ($(e.target).closest(triggerSelector).length) {
						e.preventDefault();
						openMenu();
					}
				} else {
					if (!$(e.target).closest(menuSelector).length
						|| $(e.target).closest(closingTriggerSelector).length
					) {
						e.preventDefault();
						closeMenu();
					}
				}
			});
		}

		menuEvent();

		return this;
	};
}) (jQuery)
