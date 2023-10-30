export const isBlockLevelDetail = (summary) => summary.nodeName.toLowerCase() === 'a';

export const setTitle = (summary, title) => {
  if (!summary.hasAttribute('title')) {
    summary.setAttribute('title', title);
  }
};

export const findDetailFor = (summary) => {
  if (isBlockLevelDetail(summary)) {
    const id = summary.getAttribute('href').replace(/^#/, '');
    const detail = document.getElementById(id);
    if (!detail && window.console) {
      console.error(`No StretchText details element with ID: ${id}`);
    }
    return detail;
  } else {
    const detail = summary.nextElementSibling;
    if (!detail && window.console) {
      console.error('No StretchText details element found for:', summary);
    }
    return detail;
  }
};

// OLD VERSION"S CODE WITHOUT MODERNIZE

// export function isBlockLevelDetail(summary) {
//     return summary.nodeName.toLowerCase() === 'a';
// }
  
// export function setTitle(summary, title) {
//     if (summary.hasAttribute('title')) {
//     return;
//     } else {
//     summary.setAttribute('title', title);
//     }
// }
  
// export function findDetailFor(summary) {
//     if (isBlockLevelDetail(summary)) {
//     var id = summary.getAttribute('href').replace(/^#/, '');
//     var detail = document.getElementById(id);
//     if (!detail && window.console) {
//         console.error('No StretchText details element with ID: ' + id);
//     }
//     return detail;
//     } else {
//     var detail = summary.nextElementSibling;
//     if (!detail && window.console) {
//         console.error('No StretchText details element found for: ', summary);
//     }
//     return detail;
//     }
// }

