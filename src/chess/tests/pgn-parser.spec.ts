import { parsePgn, PgnGame } from '../pgn-parser';
const testResults: PgnGame[] = require('./parsed-pgn.json');
const fs = require('fs');
const path = require('path');

describe('#parsePgn', () => {
    let testData = '';

    beforeAll(async () => {
        return fs.promises.readFile(path.join(__dirname, 'test.pgn'), 'utf8').then((contents) => {
            testData = contents;
        });
    });

    test('Parses empty PGN', () => {
        expect(parsePgn('')).toEqual([]);
    });

    test('Parses PGN of multiple games', () => {
        expect(parsePgn(testData)).toEqual(testResults);
    });
});