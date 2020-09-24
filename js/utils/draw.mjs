import { isMobile } from './helpers.mjs';

/**
 * This file deals with what happens when you click "Change Color" Dropdown.
 */

let inkColor = '#000f55';

function setInkColor(color) {
    inkColor = color;
}

export { setInkColor };
