// @ts-check

/**
 * @param {string} selector
 * @returns {void}
 */
export const scrollToTarget = (selector) => {
	let target;
	let error;
	try {
		target = document.querySelector(selector);
	} catch (e) {
		error = e;
	}
	if (selector === '#' || error || !target) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		return;
	}
	target.scrollIntoView({ behavior: 'smooth' });
};
