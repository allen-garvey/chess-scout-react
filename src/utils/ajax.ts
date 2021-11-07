import { parsePgn } from '../chess/pgn-parser';
import { getMoveTrees, MoveTrees } from '../chess/move-tree';

export interface UserGameStats {
    moveTrees: MoveTrees;
};

export interface Player {
    id: string;
    username: string;
    title: string;
}

function getApiUrlForUser(userName: string, gameTypes: string): string{
    const apiUrlBase = 'https://lichess.org/api/games/user/';
    const queryParamBase = `?max=40&perfType=${gameTypes}`;
    return `${apiUrlBase}${encodeURIComponent(userName)}${queryParamBase}`;
    // for testing so not rate limited by lichess
    // return `/${userName}.pgn`;
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

export function getTopPlayers(): Promise<Record<string, Array<Player>>>{
    // return fetch('https://lichess.org/player', {
    //     mode: 'no-cors',
    //     headers: {
    //         Accept: 'application/vnd.lichess.v3+json'
    //     }
    // }).then(res => res.json());
    return fetch('/top-players.json').then(res => res.json());
}