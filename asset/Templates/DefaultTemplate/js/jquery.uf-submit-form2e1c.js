/**
 * @author Benjamin Retel - rbCREATION [https://www.rbcreation.fr]
 * @copyright (c) 2021 - Today. All rights reserved.
 */

/**
 * @param formName
 * @param modAction
 * @param modItemId
 * @param delay
 */
function submitForm(formName, modAction, modItemId = null, delay = null)
{
	jQuery(function($) {
		if (modAction != null) {
			const inputModAction = $('input[name="mod-action"]');

			if (inputModAction.length) {
				inputModAction.remove();
			}
			
			$('form[name="' + formName + '"]').append('<input type="hidden" id="mod-action" name="mod-action" value="' + modAction + '" />');
		}
		
		if (modItemId != null) {
			const inputModItemId = $('input[name="mod-item-id"]');

			if (inputModItemId.length) {
				inputModItemId.remove();
			}
			
			$('form[name="' + formName + '"]').append('<input type="hidden" id="mod-item-id" name="mod-item-id" value="' + modItemId + '" />');
		}
		
		if (modAction != null) {
			if (delay != null) {
				setTimeout(function() {
					$('form[name="' + formName + '"]').submit();
				}, delay);
			} else {
				$('form[name="' + formName + '"]').submit();
			}
		}
	});
}
