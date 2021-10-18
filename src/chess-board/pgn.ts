export type Board = string[][];
interface Coordinate {
    x: number;
    y: number;
}

const BLACK = 'b';
const WHITE = 'w';
const EMPTY_CELL = '00';
const PAWN = 'P';
const KNIGHT = 'N';
const BISHOP = 'B';
const QUEEN = 'Q';
const KING = 'K';
const ROOK = 'R';

function getStartingPostion(): Board{
    return [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
    ];
}

function transverseVertical(position: Board, startingRow: number, shouldReverse: boolean, callback){
    if(shouldReverse){
        for(let i=startingRow-1;i>=0;i--){
            const shouldBreak = callback(position[i]);
            if(shouldBreak){
                break;
            }
        }
        return;
    }
    for(let i=startingRow+1;i<position.length;i++){
        const shouldBreak = callback(position[i]);
        if(shouldBreak){
            break;
        }
    }
}

function copyPosition(position: Board): Board{
    return position.map(row => row.slice());
}

function getRow(row: string): number{
    return (parseInt(row) - 8) * -1;
}

function getColumn(column: string): number{
    const columnCleaned = column.toUpperCase();
    let ret = 0;
    switch(columnCleaned){
        case 'H':
            ret++;
        case 'G':
            ret++;
        case 'F':
            ret++;
        case 'E':
            ret++;
        case 'D':
            ret++;
        case 'C':
            ret++;
        case 'B':
            ret++;
        default:
            break; 
    }
    return ret;
}

function findPieces(position: Board, piece: string): Coordinate[]{
    const ret: Coordinate[] = [];
    position.forEach((line, y) => line.forEach((p, x) => {
        if(p === piece){
            ret.push({
                x,
                y,
            });
        }
    }));
    return ret;
}

function findRooks(position: Board, column: number, row: number, color: string): Coordinate[]{
    const ret: Coordinate[] = [];
    const rowTest = position[row];
    const pieceToLookFor = `${color}${ROOK}`;
    for(let x=column+1;x<rowTest.length;x++){
        const piece = rowTest[x];
        if(piece === pieceToLookFor){
            ret.push({
                x,
                y: row
            });
            break;
        }
        else if(piece !== EMPTY_CELL){
            break;
        }
    }
    for(let x=column-1;x>=0;x--){
        const piece = rowTest[x];
        if(piece === pieceToLookFor){
            ret.push({
                x,
                y: row
            });
            break;
        }
        else if(piece !== EMPTY_CELL){
            break;
        }
    }
    for(let y=row+1;y<position.length;y++){
        const piece = position[y][column];
        if(piece === pieceToLookFor){
            ret.push({
                x: column,
                y
            });
            break;
        }
        else if(piece !== EMPTY_CELL){
            break;
        }
    }
    for(let y=row-1;y>=0;y--){
        const piece = position[y][column];
        if(piece === pieceToLookFor){
            ret.push({
                x: column,
                y
            });
            break;
        }
        else if(piece !== EMPTY_CELL){
            break;
        }
    }

    return ret;
}

function moveKnight(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${KNIGHT}`;
    const movedPieceColumn = move.length >= 4 && move[1] !== 'x' ? getColumn(move[1]) : false;
    const foundPieces = findPieces(position, piece);
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;

    for(let i=0;i<foundPieces.length;i++){
        const coordinate = foundPieces[i];
        if((movedPieceColumn === false || movedPieceColumn === coordinate.x) && (Math.abs(column - coordinate.x) === 1 && Math.abs(row - coordinate.y) === 2) || (Math.abs(column - coordinate.x) === 2 && Math.abs(row - coordinate.y) === 1)){
            newPosition[coordinate.y][coordinate.x] = EMPTY_CELL;
            break;
        }
    }
    
    return newPosition;
}

function getPolarity(n1: number, n2: number): boolean{
    return n1 % 2 === n2 % 2;
}

function moveBishop(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${BISHOP}`;
    const piecePolarity = getPolarity(column, row);
    const movedPieceColumn = move.length >= 4 && move[1] !== 'x' ? getColumn(move[1]) : false;
    const foundPieces = findPieces(position, piece);
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;

    for(let i=0;i<foundPieces.length;i++){
        const coordinate = foundPieces[i];
        if((movedPieceColumn === false || movedPieceColumn === coordinate.x) && (piecePolarity === getPolarity(coordinate.x, coordinate.y))){
            newPosition[coordinate.y][coordinate.x] = EMPTY_CELL;
            break;
        }
    }
    
    return newPosition;
}

function moveRook(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const color = isWhite ? WHITE : BLACK;
    const piece = `${color}${ROOK}`;
    const movedPieceColumn = move.length >= 4 && /^[a-h]$/.test(move[1]) ? getColumn(move[1]) : false;
    const movedPieceRow = move.length >= 4 && /^[1-8]$/.test(move[1]) ? getRow(move[1]) : false;
    const foundPieces = findRooks(position, column, row, color);
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;

    for(let i=0;i<foundPieces.length;i++){
        const coordinate = foundPieces[i];
        if(
            (movedPieceColumn === false || movedPieceColumn === coordinate.x) && 
            (movedPieceRow === false || movedPieceRow === coordinate.y) &&
            (coordinate.x === column || coordinate.y === row)
        ){
            newPosition[coordinate.y][coordinate.x] = EMPTY_CELL;
            break;
        }
    }
    
    return newPosition;
}

function moveKing(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${KING}`;
    const foundPiece = findPieces(position, piece)[0];
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;
    newPosition[foundPiece.y][foundPiece.x] = EMPTY_CELL;
    
    return newPosition;
}

function moveQueen(position: Board, move: string, isWhite: boolean): Board{
    function isHorizontalClear(column, row, x): boolean{
        const startColumn = Math.min(x, column) + 1;
        const endColumn = Math.max(x, column);
        for(let i=startColumn;i<endColumn;i++){
            if(position[row][i] !== EMPTY_CELL){
                return false;
            }
        }
        return true;
    }
    function isVerticalClear(column, row, y): boolean{
        const startRow = Math.min(y, row) + 1;
        const endRow = Math.max(y, row);
        for(let i=startRow;i<endRow;i++){
            if(position[i][column] !== EMPTY_CELL){
                return false;
            }
        }
        return true;
    }
    function isDiagonalClear(column, row, x, y): boolean{
        const startRow = Math.min(y, row) + 1;
        const endRow = Math.max(y, row);
        let startColumn = x;
        let columnIncrement = y < row ? -1 : 1;
        if(startRow + 1 === row){
            startColumn = column;
            columnIncrement = row < y ? -1 : 1;
        }
        for(let i=startRow,j=1;i<endRow;i++,j++){
            if(position[i][startColumn+(j*columnIncrement)] !== EMPTY_CELL){
                return false;
            }
        }
        return true;
    }
    function findPiece(pieces: Coordinate[], column: number, row: number, specifiedColumn: number|false, specifiedRow): Coordinate{
        if(pieces.length === 1){
            return pieces[0];
        }
        const piecePolarity = getPolarity(column, row);
        for(const piece of pieces){
            const {x, y} = piece;
            if(specifiedColumn !== false && x !== specifiedColumn){
                continue;
            }
            if(specifiedRow !== false && y !== specifiedRow){
                continue;
            }
            if(x === column && isVerticalClear(column, row, y)){
                return piece;
            }
            if(y === row && isHorizontalClear(column, row, x)){
                return piece;
            }
            if(piecePolarity === getPolarity(x, y) && isDiagonalClear(column, row, x, y)){
                return piece;
            }
        }
        //should never hit this
        return {x: -1, y: -1};
    }

    const column = getColumn(move[move.length - 2]);
    const row = getRow(move[move.length - 1]);
    const piece = `${isWhite ? WHITE : BLACK}${QUEEN}`;
    const movedPieceColumn = move.length >= 4 && /^[a-h]$/.test(move[1]) ? getColumn(move[1]) : false;
    const movedPieceRow = move.length >= 4 && /^[1-8]$/.test(move[1]) ? getRow(move[1]) : false;
    const foundPieces = findPieces(position, piece);
    const foundPiece = findPiece(foundPieces, column, row, movedPieceColumn, movedPieceRow);
    const newPosition = copyPosition(position);
    newPosition[row][column] = piece;
    newPosition[foundPiece.y][foundPiece.x] = EMPTY_CELL;
    
    return newPosition;
}

function movePawn(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[0]);
    const row = getRow(move[1]);
    const color = isWhite ? WHITE : BLACK;
    const newPosition = copyPosition(position);
    newPosition[row][column] = `${color}${PAWN}`;

    transverseVertical(newPosition, row, !isWhite, (localRow) => {
        if(localRow[column][1] === PAWN){
            localRow[column] = EMPTY_CELL;
            return true;
        }
    });

    return newPosition;
}

function pawnTakes(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[2]);
    const row = getRow(move[3]);
    const color = isWhite ? WHITE : BLACK;
    const newPosition = copyPosition(position);
    const piece = `${color}${PAWN}`;
    const rowFrom = isWhite ? row + 1 : row - 1;
    // check for en passant
    if(newPosition[row][column] === EMPTY_CELL){
        newPosition[rowFrom][column] = EMPTY_CELL;
    }
    newPosition[row][column] = piece;
    newPosition[rowFrom][getColumn(move[0])] = EMPTY_CELL;

    return newPosition;
}

function pawnPromotes(position: Board, move: string, isWhite: boolean): Board{
    const column = getColumn(move[move.length - 4]);
    const row = getRow(move[move.length - 3]);
    const color = isWhite ? WHITE : BLACK;
    const newPosition = copyPosition(position);
    const piece = `${color}${move[move.length - 1]}`;
    newPosition[row][column] = piece;
    
    const columnFrom = getColumn(move[0]);
    const rowFrom = isWhite ? 1 : 6;
    newPosition[rowFrom][columnFrom] = EMPTY_CELL;

    return newPosition;
}

function shortCastle(position: Board, isWhite: boolean): Board{
    const color = isWhite ? WHITE : BLACK;
    const row = isWhite ? 7 : 0;
    const newPosition = copyPosition(position);
    newPosition[row][4] = EMPTY_CELL;
    newPosition[row][7] = EMPTY_CELL;
    newPosition[row][5] = `${color}${ROOK}`;
    newPosition[row][6] = `${color}${KING}`;

    return newPosition;
}

function longCastle(position: Board, isWhite: boolean): Board{
    const color = isWhite ? WHITE : BLACK;
    const row = isWhite ? 7 : 0;
    const newPosition = copyPosition(position);
    newPosition[row][0] = EMPTY_CELL;
    newPosition[row][4] = EMPTY_CELL;
    newPosition[row][3] = `${color}${ROOK}`;
    newPosition[row][2] = `${color}${KING}`;

    return newPosition;
}

function pgnToPosition(moves: string[]): Board{
    let position = getStartingPostion();
    let isWhite = false;

    moves.forEach((move) => {
        isWhite = !isWhite;
        const cleanedMove = move.replace(/[+#]$/, '');
        switch(true){
            case /^\w\d$/.test(cleanedMove):
                position = movePawn(position, cleanedMove, isWhite);
                break;
            case /=.$/.test(cleanedMove):
                position = pawnPromotes(position, cleanedMove, isWhite);
                break;
            case /^[a-h]x/.test(cleanedMove):
                position = pawnTakes(position, cleanedMove, isWhite);
                break;
            case /^N[a-h]?x?[a-h]\d$/.test(cleanedMove):
                position = moveKnight(position, cleanedMove, isWhite);
                break;
            case /^B[a-h]?x?[a-h]\d$/.test(cleanedMove):
                // TODO: this will not work with multiple Bishops of same color
                position = moveBishop(position, cleanedMove, isWhite);
                break;
            case /^R[a-h1-8]?x?[a-h]\d$/.test(cleanedMove):
                position = moveRook(position, cleanedMove, isWhite);
                break;
            case /^Q[a-h1-8]?x?[a-h]\d$/.test(cleanedMove):
                position = moveQueen(position, cleanedMove, isWhite);
                break;
            case /^Kx?[a-h]\d$/.test(cleanedMove):
                position = moveKing(position, cleanedMove, isWhite);
                break;
            case move === 'O-O':
                position = shortCastle(position, isWhite);
                break;
            case move === 'O-O-O':
                    position = longCastle(position, isWhite);
                    break;
        }
    });

    return position;
}

export default {
    getStartingPostion,
    pgnToPosition,
};