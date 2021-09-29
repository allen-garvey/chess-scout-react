export interface GameHeader {
    Winner: string;
    Result: string;
    White: string;
    Black: string;
    Site: string;
    Variant: string;
}

export interface PgnGame {
    header: GameHeader;
    moves: string[][];
}

export function parsePgn(pgnRaw: string): PgnGame[]{
    return extractHeaderAndMoves(separateGames(pgnRaw));
}

function separateGames(pgnRaw: string): string[]{
    const gamesRaw = pgnRaw.split('\n\n\n').filter((line)=>{
        return line && !line.match(/^\s+$/);
    });
    return gamesRaw;
}

function extractHeaderAndMoves(gamesRaw: string[]): PgnGame[]{
    return gamesRaw
        .map((game)=>{
            const split = game.split('\n\n');
            return {
                header: parseHeader(split[0]),
                moves: extractMoves(split[1]),
            };
        })
        .filter((game) => game.moves.length > 0)
        .filter((game) => game.header.Variant === 'Standard');
}

function parseHeader(headerRaw: string): GameHeader{
    const header: GameHeader = {
        Winner: '',
        Result: '',
        White: '',
        Black: '',
        Site: '',
        Variant: '',
    };

    headerRaw.split('\n').forEach((line)=>{
        const key = line.replace(/^\[| .*\].*$/g, '');
        const value = line.replace(/^\[\w+ "|"\].*$/g, '');
        header[key] = value;
    });

    if(header.Result === '1-0'){
        header.Winner = 'White';
    }
    else if(header.Result === '0-1'){
        header.Winner = 'Black';
    }
    else{
        header.Winner = 'Draw';
    }

    return header;
}

function extractMoves(movesRaw: string): string[][]{
    return movesRaw
        .replace(/ (1-0|0-1|1\/2-1\/2)$/, '')
        .split(/\d+\. /)
        .filter(line => line)
        .map((line) => line.replace(/\s+$/, '').split(' '));
}