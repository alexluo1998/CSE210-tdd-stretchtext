import {stretchTextListener} from "./stretchtext.js";

let listenersAdded = false;
onLoad();

function onLoad() {
    window.addEventListener('DOMContentLoaded', addListenersToStretchText);
    // TODO: is this necessary?
    if (document.readyState === "complete"){
        addListenersToStretchText();
    }
}

/**
 * Initializes listeners for StretchText elements when DOM content is loaded.
 */
function addListenersToStretchText() {
    if (!listenersAdded) {
        // TODO: Verify if this is actually more efficient than listeners on single elements
        // Listen on mousedown instead of click to prevent text selection when mouse is clicked rapidly.
        document.body.addEventListener('mousedown', stretchTextListener);
        // For mobile/touch screen devices, set passive to false so can call preventDefault
        document.body.addEventListener('touchstart', stretchTextListener, {passive: false});
        document.body.addEventListener('click', stretchTextListener);
        listenersAdded = true;
    }
}