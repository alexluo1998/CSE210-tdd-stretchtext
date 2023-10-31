const {
    stretchTextListener,
    toggleSummary,
    setTitle,
    findDetailFor,
    isBlockLevelDetail,
  } = require('./stretchtext.js');

test('should return true if the summary is a block-level detail', () => {
    const summary = document.createElement('a');

    expect(isBlockLevelDetail(summary).toBe(true));
})


