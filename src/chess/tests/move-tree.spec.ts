import { PgnGame } from '../pgn-parser';
import { MoveTrees, GameNode, getMoveTrees } from '../move-tree';

const testGames: PgnGame[] = require('./parsed-pgn.json');
const testMoveTrees: MoveTrees = require('./move-trees.json');

describe('#getMoveTrees', () => {
    const emptyGameNode: GameNode = {
        results: {
            wins: 0,
            draws: 0,
            losses: 0,
        },
        games: [],
        children: {},
    };

    test('Creates move trees from empty games', () => {
        expect(getMoveTrees([], 'EricRosen')).toEqual({white: emptyGameNode, black: emptyGameNode});
    });

    test('Creates move trees from PGN games', () => {
        expect(getMoveTrees(testGames, 'EricRosen')).toEqual(testMoveTrees);
    });
});