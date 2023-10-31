/**
 * @jest-environment jsdom
 */
import {expect, jest, test} from '@jest/globals';
import { toggleSummary, setTitle, findDetailFor, isBlockLevelDetail } from '../stretchtext.js';

describe('testFindDetailFor', () => {
    test('should find correct detail element', () => {
        const summary = document.createElement('a');
        summary.setAttribute('href', '#detail');
        const detail = document.createElement('div');
        detail.id = 'detail';
        document.body.appendChild(summary);
        document.body.appendChild(detail);

        const foundDetail = findDetailFor(summary);
        expect(foundDetail).toBe(detail);

        document.body.removeChild(summary);
        document.body.removeChild(detail);
    });
});

describe('testIsBlockLevelDetail', () => {
    it('should return true if the summary is a block-level detail', () => {
        const summary = document.createElement('a');
        expect(isBlockLevelDetail(summary)).toBe(true);
    })

    it('should return false if the summary is not a block-level detail', () => {
        const summary = document.createElement('div');
        expect(isBlockLevelDetail(summary)).toBe(false);
    })
});

describe('testSetTitle', () => {
    it('should set title attribute correctly if title not present', () => {
        const summary = document.createElement('p');
        setTitle(summary, 'Test Title');
        expect(summary.getAttribute('title')).toBe('Test Title');
    });

    it('should not set the title attribute if already exist',  () => {
        const element = document.createElement('p');
        const manualTitle = "Manual Title";
        element.setAttribute("title", manualTitle);

        const title = 'Test Title';
        setTitle(element, title);
        expect(element.getAttribute('title')).toBe(manualTitle);
    });
});

describe('toggleSummary', () => {
    let summary;
    let detail;

    beforeEach(() => {
        // Set up DOM elements
        summary = document.createElement('a');
        summary.href = '#detail';
        summary.classList.add('stretchsummary');

        detail = document.createElement('aside');
        detail.id = 'detail';
        detail.classList.add('stretchdetail');

        summary.appendChild(detail);
        document.body.appendChild(summary);
    });

    afterEach(() => {
        // Clean up DOM elements
        summary.removeChild(detail);
        document.body.removeChild(summary);
    });

    it('should toggle visibility of associated detail', () => {
        toggleSummary(summary);

        requestAnimationFrame(() => {
            expect(summary.classList.contains('stretchtext-open')).toBe(true);
            expect(detail.classList.contains('stretchtext-open')).toBe(true);
            expect(detail.style.display).toBe('block');
        });
    });

    it('should toggle visibility off if detail is already visible', () => {
        summary.classList.add('stretchtext-open');
        detail.classList.add('stretchtext-open');
        detail.style.display = 'block';

        toggleSummary(summary);

        requestAnimationFrame(() => {
            expect(summary.classList.contains('stretchtext-open')).toBe(false);
            expect(detail.classList.contains('stretchtext-open')).toBe(false);
            expect(detail.style.display).toBe('none');
        });
    });
});