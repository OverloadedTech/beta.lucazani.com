/**
 * @author Benjamin Retel - rbCREATION [https://www.rbcreation.fr]
 * @copyright (c) 2021 - Today. All rights reserved.
 */

(function($) {
	const site = $("#site");

	site.ufMenu({
		trigger: "#site-main-menu-button",
		closingTrigger: "#close-site-main-menu",
		menu: "#site-main-menu",
		overlay: "#site-overlay",
		showOverlay: true,
		enableBackgroundScroll: true
	});

	site.ufMenu({
		trigger: "#site-user-menu-button",
		closingTrigger: "#close-site-user-menu",
		menu: "#site-user-menu",
		overlay: "#site-overlay",
		showOverlay: true,
		enableBackgroundScroll: true
	});

	$(".message .close-message").click(function(e) {
		if ($(e.target).closest(".close-message").length) {
			$(this).closest(".message").remove();
		}
	});

	$("#select-language select").change(function() {
		let lang = $("#select-language select option:selected").val();
		$.ajax({
			url: "Sites/unit.link/Modules/SelectLanguage/Ajax/SelectLanguageAjax.php",
			method: "POST",
			dataType: "json",
			data: "mod-action=save&lang=" + lang,
			success: function(result) {
				if (result.success) {
					location.reload();
				}
			}
		});
	});
	
	if (window.history.replaceState) {
		window.history.replaceState(null, null, window.location.href);
	}
}) (jQuery)
