// @ts-check

/**
 * @param {Element} element
 * @returns {string}
 */
export const cleanOuterHTML = (element) => {
	return element.outerHTML.trim().replace(/\s+/g, ' ');
};
