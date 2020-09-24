import { addFontFromFile, formatText } from './utils/helpers.mjs';
import { generateImages, downloadAsPDF } from './generate-images.mjs';
import { setInkColor } from './utils/draw.mjs';

/**
 *
 * Hi there! This is the entry file of the tool and deals with adding event listeners
 * and some other functions.
 *
 */

const pageEl = document.querySelector('.page-a');

const setTextareaStyle = (attrib, v) => (pageEl.style[attrib] = v);

/**
 * Add event listeners here, they will be automatically mapped with addEventListener later
 */
const EVENT_MAP = {
    '#generate-image-form': {
        on: 'submit',
        action: (e) => {
            e.preventDefault();
            generateImages();
        }
    },
    '#handwriting-font': {
        on: 'change',
        action: (e) =>
            document.body.style.setProperty('--handwriting-font', e.target.value)
    },
    '#font-size': {
        on: 'change',
        action: (e) => setTextareaStyle('fontSize', e.target.value + 'pt')
    },
    '#letter-spacing': {
        on: 'change',
        action: (e) => setTextareaStyle('letterSpacing', e.target.value + 'pt')
    },
    '#word-spacing': {
        on: 'change',
        action: (e) => setTextareaStyle('wordSpacing', e.target.value + 'px')
    },
    '#top-padding': {
        on: 'change',
        action: (e) => {
            document.querySelector('.page-a .paper-content').style.paddingTop =
                e.target.value + 'px';
        }
    },
    '#font-file': {
        on: 'change',
        action: (e) => addFontFromFile(e.target.files[0])
    },
    '#ink-color': {
        on: 'change',
        action: (e) => {
            document.body.style.setProperty('--ink-color', e.target.value);
            setInkColor(e.target.value);
        }
    },
    '#paper-margin-toggle': {
        on: 'change',
        action: () => {
            if (pageEl.classList.contains('margined')) {
                pageEl.classList.remove('margined');
            } else {
                pageEl.classList.add('margined');
            }
        }
    },
    '#paper-line-toggle': {
        on: 'change',
        action: () => {
            if (pageEl.classList.contains('lines')) {
                pageEl.classList.remove('lines');
            } else {
                pageEl.classList.add('lines');
            }
        }
    },
    '#download-as-pdf-button': {
        on: 'click',
        action: () => {
            downloadAsPDF();
        }
    },
    '.page-a .paper-content': {
        on: 'paste',
        action: formatText
    }
};

for (const eventSelector in EVENT_MAP) {
    document
        .querySelector(eventSelector)
        .addEventListener(
            EVENT_MAP[eventSelector].on,
            EVENT_MAP[eventSelector].action
        );
}

/**
 * This makes toggles, accessible.
 */
document.querySelectorAll('.switch-toggle input').forEach((toggleInput) => {
    toggleInput.addEventListener('change', (e) => {
        if (toggleInput.checked) {
            document.querySelector(
                `label[for="${toggleInput.id}"] .status`
            ).textContent = 'on';
            toggleInput.setAttribute('aria-checked', true);
        } else {
            toggleInput.setAttribute('aria-checked', false);
            document.querySelector(
                `label[for="${toggleInput.id}"] .status`
            ).textContent = 'off';
        }
    });
});
