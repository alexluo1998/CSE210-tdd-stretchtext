const TITLE_WHEN_CLOSED = 'Expand';
const TITLE_WHEN_OPEN = 'Collapse';

// TODO: fix deprecated? Are the browser specific ones still relevant?
// requestAnimationFrame shimming.
const requestAnimationFrame =
	window.requestAnimationFrame       ||
	// window.webkitRequestAnimationFrame ||
	// window.mozRequestAnimationFrame    ||
	// window.oRequestAnimationFrame      ||
	// window.msRequestAnimationFrame     ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};

/**
 * Event listener for all stretch summary elements.
 * If a summary is clicked or tapped, toggle it.
 * @param {UIEvent} event triggered mouse or touch event
 */
export function stretchTextListener(event) {
	const summary = event.target.closest('.stretchsummary') ||
		event.target.closest('[epub-type="stretchsummary"]');
	if (summary) {
		// 1. Prevent the text from being selected (default behavior) if rapidly clicked on desktop.
		// 2. Prevent mousedown event from firing on touch device
		// 3. Prevent link resolving when clicking on href
		// Note: only do it when actually selecting a stretch element, otherwise selecting text
		// 		and scrolling behavior will be disabled
		event.preventDefault();
		if (event.type === 'click') {
			// Link resolving can't be canceled in mousedown event, only in click event.
			return;
		}
		toggleSummary(summary);
	}
}

/**
 * Toggles the visibility of the StretchText details for the given summary.
 * @param {HTMLElement} summary - The summary element.
 */
export function toggleSummary(summary) {
	const detail = findDetailFor(summary);
	if (!detail) {
		return;
	}

	// CSS Transitions don't work as expected on things set to 'display: none'. Make the
	// stretch details visible if needed, then use a timeout for the transition to take effect.
	if (summary.classList.contains('stretchtext-open')) {
		detail.style.display = 'none';
	} else {
		detail.style.display = isBlockLevelDetail(summary) ? 'block' : 'inline';
	}

	requestAnimationFrame(() => {
		summary.classList.toggle('stretchtext-open');
		detail.classList.toggle('stretchtext-open');
		setTitle(summary,
			summary.classList.contains('stretchtext-open') ? TITLE_WHEN_OPEN : TITLE_WHEN_CLOSED);
	});
}


/**
 * Sets the title attribute of the summary element.
 * @param {HTMLElement} summary - The summary element.
 * @param {string} title - The title to set.
 */
export function setTitle(summary, title) {
	// Only if the element doesn't have a custom title.
	if (!summary.hasAttribute('title')) {
		summary.setAttribute('title', title);
	}
}


/**
 * Finds the detail element associated with the given summary element.
 * @param {HTMLElement} summary - The summary element.
 * @returns {HTMLElement|null} - The detail element or null.
 */
export function findDetailFor(summary) {
	if (isBlockLevelDetail(summary)) {
		const id = summary.getAttribute('href').replace(/^#/, '');
		const detail = document.getElementById(id);
		if (!detail && window.console) {
			console.error('No StretchText details element with ID: ' + id);
		}
		return detail;
	} else {
		const detail = summary.nextElementSibling;
		if (!detail && window.console) {
			console.error('No StretchText details element found for: ', summary);
		}
		return detail;
	}
}

/**
 * Checks if the detail is a block level element.
 * @param {HTMLElement} summary - The summary element.
 * @returns {boolean} - True if detail is block level.
 */
export function isBlockLevelDetail(summary) {
	return summary.nodeName.toLowerCase() === 'a';
}
