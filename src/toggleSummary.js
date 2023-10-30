import { findDetailFor, setTitle, isBlockLevelDetail } from './findDetail.js';

export const TITLE_WHEN_CLOSED = 'Expand';
export const TITLE_WHEN_OPEN = 'Collapse';

// requestAnimationFrame shimming.
export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  ((callback) => {
    window.setTimeout(callback, 1000 / 60);
  });

export const toggleSummary = (evt) => {
  // Prevent the text from being selected if rapidly clicked.
  evt.preventDefault();

  const summary = evt.target;
  const detail = findDetailFor(summary);
  if (!detail) {
    return;
  }

  // CSS Transitions don't work as expected on things set to 'display: none'. Make the
  // stretch details visible if needed, then use a timeout for the transition to take
  // effect.
  if (summary.classList.contains('stretchtext-open')) {
    detail.style.display = 'none';
  } else {
    detail.style.display = isBlockLevelDetail(summary) ? 'block' : 'inline';
  }

  requestAnimationFrame(() => {
    summary.classList.toggle('stretchtext-open');
    detail.classList.toggle('stretchtext-open');

    if (summary.classList.contains('stretchtext-open')) {
      setTitle(summary, TITLE_WHEN_OPEN);
    } else {
      setTitle(summary, TITLE_WHEN_CLOSED);
    }
  });
};


// OLD VERSION'S CODE WITHOUT MODERNIZE

// import { findDetailFor, setTitle, isBlockLevelDetail } from './findDetail.js';

// export const TITLE_WHEN_CLOSED = 'Expand';
// export const TITLE_WHEN_OPEN = 'Collapse';

// // requestAnimationFrame shimming.
// export const requestAnimationFrame =
//   window.requestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame ||
//   window.oRequestAnimationFrame ||
//   window.msRequestAnimationFrame ||
//   function (callback) {
//     window.setTimeout(callback, 1000 / 60);
//   };

// export function toggleSummary(evt) {
//   // Prevent the text from being selected if rapidly clicked.
//   evt.preventDefault();

//   var summary = evt.target;
//   var detail = findDetailFor(summary);
//   if (!detail) {
//     return;
//   }

//   // CSS Transitions don't work as expected on things set to 'display: none'. Make the
//   // stretch details visible if needed, then use a timeout for the transition to take
//   // effect.
//   if (summary.classList.contains('stretchtext-open')) {
//     detail.style.display = 'none';
//   } else {
//     detail.style.display = isBlockLevelDetail(summary) ? 'block' : 'inline';
//   }

//   requestAnimationFrame(function () {
//     summary.classList.toggle('stretchtext-open');
//     detail.classList.toggle('stretchtext-open');

//     if (summary.classList.contains('stretchtext-open')) {
//       setTitle(summary, TITLE_WHEN_OPEN);
//     } else {
//       setTitle(summary, TITLE_WHEN_CLOSED);
//     }
//   });
// }