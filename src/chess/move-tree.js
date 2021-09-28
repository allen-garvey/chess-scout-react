import { getResult } from './util';

export function getMoveTrees(games, playerName){
    const moveDepth = 15;
    return {
        white: getMoveTreesForColor(games, playerName, 'White', moveDepth),
        black: getMoveTreesForColor(games, playerName, 'Black', moveDepth),
    };
}

function createNode(){
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

function getMoveTreesForColor(games, playerName, color, moveDepth){
    const root = createNode();
    const max = moveDepth * 2;

    games.forEach((game) => {
        const header = game.header;
        if(header[color] !== playerName){
            return;
        }
        root.games.push[header.Site];
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