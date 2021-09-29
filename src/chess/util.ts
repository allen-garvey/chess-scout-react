import { PgnGame, GameHeader } from './pgn-parser';

interface GameResults {
    draws: number;
    wins: number;
    losses: number;
};

export function sortByGameFrequency(): (a: PgnGame, b: PgnGame) => number{
    return (a: PgnGame, b: PgnGame): number => b[1].games - a[1].games;
}

export function getResult(header: GameHeader, color: string): GameResults{
    const result = {
        draws: 0,
        wins: 0,
        losses: 0,
    };
    
    if(header.Winner === 'Draw'){
        result.draws += 1;
    }
    else if(header.Winner === color){
        result.wins += 1;
    }
    else{
        result.losses += 1;
    }
    return result;
}