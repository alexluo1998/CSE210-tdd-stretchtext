// Arrow functions are used for concise function declarations.
// const and let are used for variable declarations instead of var.

import { toggleSummary } from './toggleSummary.js';

export function initStretchText() {
  'use strict';

  const TITLE_WHEN_CLOSED = 'Expand';
  const TITLE_WHEN_OPEN = 'Collapse';

  const loaded = () => {
    // FIXME(slightlyoff): Add global handlers instead of one per item.
    getSummaries().forEach((summary) => {
      summary.setAttribute('title', TITLE_WHEN_CLOSED);

      // Listen on mousedown instead of click so that we can prevent text
      // selection if the mouse is clicked rapidly.
      summary.addEventListener('mousedown', toggleSummary);

      summary.addEventListener('touchstart', toggleSummary);

      // Link resolving can't be canceled in the mousedown event, only in the click event.
      summary.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
  };

  const getSummaries = () => {
    const results = [];

    // epub-type
    let summaries = document.querySelectorAll('[epub-type="stretchsummary"]');
    Array.from(summaries).forEach((result) => {
      results.push(result);
    });

    // CSS class.
    summaries = document.getElementsByClassName('stretchsummary');
    Array.from(summaries).forEach((result) => {
      results.push(result);
    });

    return results;
  };

  window.addEventListener('DOMContentLoaded', loaded);
  if (document.readyState === "complete") {
    loaded();
  }
}

// OLD VERSION'S CODE WITHOUT MODERNIZE

// import { toggleSummary } from './toggleSummary.js';

// export function initStretchText() {
//   'use strict';

//   const TITLE_WHEN_CLOSED = 'Expand';
//   const TITLE_WHEN_OPEN = 'Collapse';


//   function loaded() {
//     // FIXME(slightlyoff): Add global handlers instead of one per item.
//     getSummaries().forEach(function (summary) {
//       summary.setAttribute('title', TITLE_WHEN_CLOSED);

//       // Listen on mousedown instead of click so that we can prevent text
//       // selection if the mouse is clicked rapidly.
//       summary.addEventListener('mousedown', toggleSummary);

//       summary.addEventListener('touchstart', toggleSummary);

//       // Link resolving can't be canceled in the mousedown event, only in the click event.
//       summary.addEventListener('click', function (e) {
//         e.preventDefault();
//       });
//     });
//   }

//   function getSummaries() {
//     var results = [],
//       summaries;

//     // epub-type
//     summaries = document.querySelectorAll('[epub-type="stretchsummary"]');
//     Array.prototype.forEach.call(summaries, function (result) {
//       results.push(result);
//     });

//     // CSS class.
//     summaries = document.getElementsByClassName('stretchsummary');
//     Array.prototype.forEach.call(summaries, function (result) {
//       results.push(result);
//     });

//     return results;
//   }

//   window.addEventListener('DOMContentLoaded', loaded);
//   if (document.readyState == "complete") {
//     loaded();
//   }
// }
