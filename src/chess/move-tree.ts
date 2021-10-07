import { getResult } from './util';
import { PgnGame } from './pgn-parser';

export interface MoveTrees {
    white: GameNode;
    black: GameNode;
}

export interface GameNode {
    results: {
        wins: number,
        draws: number,
        losses: number,
    };
    games: string[];
    children: Record<string, GameNode>;
}

export function getMoveTrees(games: PgnGame[], playerName: string): MoveTrees{
    const moveDepth = 15;
    return {
        white: getMoveTreesForColor(games, playerName, 'White', moveDepth),
        black: getMoveTreesForColor(games, playerName, 'Black', moveDepth),
    };
}

function createNode(): GameNode{
    return {
        results: {
            wins: 0,
            draws: 0,
            losses: 0,
        },
        games: [],
        children: {},
    };
}

function getMoveTreesForColor(games: PgnGame[], playerName: string, color: string, moveDepth: number): GameNode{
    const root = createNode();
    const max = moveDepth * 2;

    games.forEach((game) => {
        const header = game.header;
        if(header[color] !== playerName){
            return;
        }
        const _index = root.games.push[header.Site];
        let currentNode = root;
        const moves = game.moves.flat();
        const limit = Math.min(max, moves.length - 1);

        for(let i=0;i<limit;i++){
            const key = moves[i];
            if(!(key in currentNode.children)){
                currentNode.children[key] = createNode();
            }
            const result = getResult(header, color);
            currentNode.children[key].results.wins += result.wins;
            currentNode.children[key].results.draws += result.draws;
            currentNode.children[key].results.losses += result.losses;
            currentNode.children[key].games.push(header.Site);

            currentNode = currentNode.children[key];
        }
    });

    return root;
}