/**
 * @author Benjamin Retel - rbCREATION [https://www.rbcreation.fr]
 * @copyright (c) 2021 - Today. All rights reserved.
 */

(function($) {
	$.fn.ufModal = function ($options) {
		const defaultParams = {
			"container": this,
			"triggerOpen": ".open-modal",
			"triggerClose": ".close-modal",
			"modalId": "modal",
			"modalClass": "modal",
			"modalLoadingId": "modal-loading",
			"modalLoadingClass": "modal-loading",
			"modalContentId": "modal-content",
			"modalContentClass": "modal-content",
			"content": null,
			"actions": [],
			"showOverlay": true,
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
		 */
		const containerSelector = params.container;

		/**
		 * @var string triggerOpenSelector
		 */
		const triggerOpenSelector = params.triggerOpen;

		/**
		 * @var string triggerCloseSelector
		 */
		const triggerCloseSelector = params.triggerClose;

		/**
		 * @var string modalId
		 * @internal Default: "modal"
		 * @example "my-modal"
		 */
		const modalId = params.modalId;

		/**
		 * @var string modalClass
		 * @internal Default: "modal"
		 * @example "my-modal"
		 */
		const modalClass = params.modalClass;

		/**
		 * @var string modalSelector
		 */
		const modalSelector = "#" + modalId;

		/**
		 * @var string modalHtml
		 */
		const modalHtml = '<div id="' + modalId + '" class="' + modalClass + '"></div>';

		/**
		 * @var string modalLoadingId
		 * @internal Default: "modal-loading"
		 * @example "my-modal-loading"
		 */
		const modalLoadingId = params.modalLoadingId;

		/**
		 * @var string modalLoadingClass
		 * @internal Default: "content-loading"
		 * @example "my-content-loading"
		 */
		const modalLoadingClass = params.modalLoadingClass;

		/**
		 * @var string modalLoadingSelector
		 */
		const modalLoadingSelector = modalSelector + " #" + modalLoadingId;

		/**
		 * @var string modalLoadingHtml
		 */
		const modalLoadingHtml = '<div id="' + modalLoadingId + '" class="' + modalLoadingClass + '"><div class="loading"></div></div>';

		/**
		 * @var string modalContentId
		 * @internal Default: "modal-content"
		 * @example "my-modal"
		 */
		const modalContentId = params.modalContentId;

		/**
		 * @var string modalContentClass
		 * @internal Default: "modal-content"
		 * @example "my-modal"
		 */
		const modalContentClass = params.modalContentClass;

		/**
		 * @var string modalContentSelector
		 */
		const modalContentSelector = modalSelector + " #" + modalContentId;

		/**
		 * @var string modalContentHtml
		 */
		const modalContentHtml = '<div id="' + modalContentId + '" class="' + modalContentClass + '"></div>';

		/**
		 * @var mixed content
		 */
		const content = params.content;

		/**
		 * @var array actions
		 * @internal [{triggers, request}]
		 * @internal triggers: [{types: "click keyup", selector: "#my-trigger"}]
		 * @internal request: "my request"
		 */
		const actions = params.actions;

		/**
		 * @var bool showOverlay
		 * @internal Default: false
		 */
		const showOverlay = params.showOverlay;

		/**
		 * @var bool enableBackgroundScroll
		 * @internal Enable or disable background scroll when modal is open
		 * @internal Default: true
		 */
		const enableBackgroundScroll = params.enableBackgroundScroll;

		/**
		 * @var string htmlSelector
		 * @internal Html selector
		 */
		const htmlSelector = "html";

		/**
		 * @return void
		 */
		function loadLoading()
		{
			if ($(modalSelector).length) {
				$(modalSelector).append(modalLoadingHtml);
			}
		}

		/**
		 * @return void
		 */
		function removeLoading()
		{
			if ($(modalLoadingSelector).length) {
				$(modalLoadingSelector).remove();
			}
		}

		/**
		 * @return void
		 */
		function loadContent(e)
		{
			if (content) {
				if ($(modalSelector).length
					&& !$(modalContentSelector).length
				) {
					removeLoading();
					$(modalSelector).html(modalContentHtml);
				}

				if ($(modalContentSelector).length) {
					if (typeof content === "string") {
						$(modalContentSelector).html(content);
					} else if (typeof content === "function") {
						content(
							e,
							function (data) {
								$(modalContentSelector).html(data);
							}
						);
					}
				}
			}
		}

		/**
		 * @return void
		 */
		function loadActions()
		{
			if (Array.isArray(actions)
				&& actions.length !== 0
			) {
				actions.forEach(function(action) {
					if (typeof action === "object") {
						if (action.triggers && action.request) {
							if (Array.isArray(action.triggers)
								&& action.triggers.length !== 0
							) {
								action.triggers.forEach(function(trigger) {
									if (typeof trigger === "object") {
										if (trigger.events && trigger.selector) {
											$(containerSelector)
												.off(trigger.events, trigger.selector)
												.on(trigger.events, trigger.selector, function(e) {
													action.request(
														e,
														function (data) {
															$(modalContentSelector).html(data);
														},
														closeModal
													);
												});
										}
									}
								});
							}
						}
					}
				});
			}
		}

		/**
		 * @return void
		 */
		function openModal(e)
		{
			// Active trigger
			$(triggerOpenSelector).addClass("active");

			// Add modal
			$(containerSelector).append(modalHtml);

			// Show overlay
			if (showOverlay) {
				$(modalSelector).addClass("overlay")
					.css("opacity", "0")
					.fadeTo(100, 1);
			}

			// Load content loading
			loadLoading();

			// Load content
			loadContent(e);

			if (!enableBackgroundScroll
				&& $(htmlSelector).get(0).scrollHeight > $(htmlSelector).innerHeight()
			) {
				disableScrollOfBackground();
			}
		}

		/**
		 * @return void
		 */
		function closeModal()
		{
			// Hide overlay
			if ($(modalSelector).hasClass("overlay")) {
				$(modalSelector).fadeTo(100, 0, function() {
					$(modalSelector).removeClass("overlay")
						.removeAttr("style");

					// Close modal
					$(modalSelector).remove();
				});
			} else {
				// Close modal
				$(modalSelector).remove();
			}

			// Disable trigger
			$(triggerOpenSelector).removeClass("active");

			if (!enableBackgroundScroll) {
				enableScrollOfBackground();
			}
		}

		/**
		 * @return void
		 */
		function modalEvent()
		{
			$(containerSelector).click(function(e) {
				if (!$(modalSelector).length) {
					if ($(e.target).closest(triggerOpenSelector).length) {
						$(e.target).closest(triggerOpenSelector).blur();
						openModal(e);
						loadActions();
					}
				} else {
					if (!$(e.target).closest(modalContentSelector).length
						|| $(e.target).closest(triggerCloseSelector).length
					) {
						closeModal();
					}
				}
			});
		}

		/**
		 * @return void
		 */
		function enableScrollOfBackground()
		{
			const backgroundScrollTop = parseInt($(htmlSelector).css("top"));

			$(htmlSelector).removeClass("noscroll");
			$(htmlSelector + ", body").scrollTop(-backgroundScrollTop);
		}

		/**
		 * @return void
		 */
		function disableScrollOfBackground()
		{
			const backgroundScrollTop = ($(htmlSelector).scrollTop())
				? $(htmlSelector).scrollTop()
				: $("body").scrollTop();

			$(htmlSelector).addClass("noscroll")
				.css("top", -backgroundScrollTop);
		}

		modalEvent();

		return this;
	};
}) (jQuery)
