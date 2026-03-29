/**
 * Process an element: shuffle its text characters in the DOM
 * while maintaining their visual positions using absolute positioning.
 *
 * Uses @chenglou/pretext for text layout measurement instead of
 * getBoundingClientRect, avoiding expensive layout reflows.
 */
declare function process_2(el: HTMLElement): void;
export { process_2 as process }

/**
 * Process all child paragraphs / text blocks within an element.
 */
export declare function processAll(el: HTMLElement): void;

export { }
