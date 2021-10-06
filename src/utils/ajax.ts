import { parsePgn } from '../chess/pgn-parser';
import { getMoveTrees, MoveTrees } from '../chess/move-tree';

export interface UserGameStats {
    moveTrees: MoveTrees;
};

function getApiUrlForUser(userName: string, gameTypes: string): string{
    const apiUrlBase = 'https://lichess.org/api/games/user/';
    const queryParamBase = `?max=40&perfType=${gameTypes}`;
    // return `${apiUrlBase}${encodeURIComponent(userName)}${queryParamBase}`;
    // for testing so not rate limited by lichess
    return `/assets/${userName}.pgn`;
}

export function getUserGamesStats(userName: string, gameTypes: string): Promise<UserGameStats>{
    return fetch(getApiUrlForUser(userName, gameTypes)).then((res)=>{
        if(res.status !== 200){
            throw new Error('Error reaching lichess api');
        }
        return res.text();
    }).then((text)=>{
        const games = parsePgn(text);
        return {
            moveTrees: getMoveTrees(games, userName),
        };
    });
}