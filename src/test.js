// const chai = require('chai');
// const assert = chai.assert;

// Importing the functions we want to test

// import { stretchTextListener, toggleSummary, setTitle, findDetailFor, isBlockLevelDetail } from './stretchtext.js';
// import { JSDOM } from "jsdom"
// const dom = new JSDOM()
// global.document = dom.window.document
// global.window = dom.window

const isBlockLevelDetail = require('./stretchtext.js')

test('should return true if the summary is a block-level detail', () => {
    const summary = document.createElement('a');

    expect(isBlockLevelDetail(summary).toBe(true));
})

// describe('StretchText Functions', function () {
//   describe('stretchTextListener', function () {
//     it('should do something when a summary element is clicked', function () {
//     });

//     it('should not do anything when the target is not a summary element', function () {
//     });
//   });

//   describe('toggleSummary', function () {
//     it('should toggle the visibility of the summary element and detail element', function () {
//     });
//   });

//   describe('setTitle', function () {
//     it('should set the title attribute of the summary element', function () {
//     });
//   });

//   describe('findDetailFor', function () {
//     it('should find the detail element associated with the summary element', function () {
//     });

//     it('should return null if no detail is found', function () {
//     });
//   });

//   describe('isBlockLevelDetail', function () {
//     it('should return true if the summary is a block-level detail', function () {
//         const summary = document.createElement('a');

//         const result = isBlockLevelDetail(summary);
  
//         assert.isTrue(result, 'Should return true for block-level details.');
//     });

//     it('should return false if the summary is not a block-level detail', function () {
//       const summary = document.createElement('div');

//       const result = isBlockLevelDetail(summary);

//       assert.isFalse(result, 'Should return false for non-block-level details.');
//     });
//   });
// });
