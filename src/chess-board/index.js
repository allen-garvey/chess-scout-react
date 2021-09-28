import pgn from './pgn';

const square = 64;
const dimensions = square * 8;
const LINE_WIDTH = 1.5;
const WHITE = '#fff';
const BLACK = '#000';

export function drawBoard(context, moves){
    context.canvas.height = dimensions;
    context.canvas.width = dimensions;
    drawSquares(context);
    drawPieces(context, pgn.pgnToPosition(moves));
}

function drawSquares(context){
    let isWhite = true;
    for(let x=0;x<dimensions;x+=square){
        isWhite = !isWhite;
        for(let y=0;y<dimensions;y+=square){
            isWhite = !isWhite;
            context.fillStyle = isWhite ? '#F4F4DB' : '#a85f00';
            context.fillRect(x, y, dimensions, dimensions);
        }
    }
}

function drawPieces(context, board){
    board.forEach((line, y) => line.forEach((piece, x) => {
        const xPosition = x * square;
        const yPosition = y * square;
        switch(piece){
            case 'wQ':
                return drawWhiteQueen(context, xPosition, yPosition);
            case 'bQ':
                return drawBlackQueen(context, xPosition, yPosition);
            case 'wK':
                return drawWhiteKing(context, xPosition, yPosition);
            case 'bK':
                return drawBlackKing(context, xPosition, yPosition);
            case 'wR':
                return drawWhiteRook(context, xPosition, yPosition);
            case 'bR':
                return drawBlackRook(context, xPosition, yPosition);
            case 'wN':
                return drawKnight(context, xPosition, yPosition, true);
            case 'bN':
                return drawKnight(context, xPosition, yPosition, false);
            case 'wB':
                return drawBishop(context, xPosition, yPosition, true);
            case 'bB':
                return drawBishop(context, xPosition, yPosition, false);
            case 'wP':
                return drawPawn(context, xPosition, yPosition, true);
            case 'bP':
                return drawPawn(context, xPosition, yPosition, false);
            default:
                return;
        }
    }));
}

function drawPawn(context, x, y, isWhite){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    const path = new Path2D('M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z');
    context.fillStyle = isWhite ? WHITE : BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'round';
    context.fill(path);
    context.stroke(path);
}

function drawWhiteQueen(context, x, y){
    const circleSvg = 'M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z';
    const createQueenCirclePath = (xTranslate, yTranslate) => {
        const path = new Path2D(circleSvg);
        const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
        matrix.a = 1;
        matrix.b = 0;
        matrix.c = 0;
        matrix.d = 1;
        matrix.e = xTranslate;
        matrix.f = yTranslate;
        
        return [path, matrix];
    }; 

    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = WHITE;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    const path2 = new Path2D('M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z');
    context.fill(path2);
    context.stroke(path2);

    const path3 = new Path2D('M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z');
    context.fill(path3);
    context.stroke(path3);

    context.stroke(new Path2D('M 11.5,30 C 15,29 30,29 33.5,30'));
    context.stroke(new Path2D('M 12,33.5 C 18,32.5 27,32.5 33,33.5'));

    // circles
    const path = new Path2D(circleSvg);
    path.addPath(...createQueenCirclePath(15.5, -5.5));
    path.addPath(...createQueenCirclePath(32, -1));
    path.addPath(...createQueenCirclePath(7, -4.5));
    path.addPath(...createQueenCirclePath(24, -4));

    context.fill(path);
    context.stroke(path);
}

function drawBlackQueen(context, x, y){
    const circleSvg = 'M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z';
    const createQueenCirclePath = (xTranslate, yTranslate) => {
        const path = new Path2D(circleSvg);
        const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
        matrix.a = 1;
        matrix.b = 0;
        matrix.c = 0;
        matrix.d = 1;
        matrix.e = xTranslate;
        matrix.f = yTranslate;
        
        return [path, matrix];
    }; 

    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    const path2 = new Path2D('M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z');
    context.fill(path2);
    context.stroke(path2);

    const path3 = new Path2D('M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z');
    context.fill(path3);
    context.stroke(path3);

    // circles
    const path = new Path2D(circleSvg);
    path.addPath(...createQueenCirclePath(15.5, -5.5));
    path.addPath(...createQueenCirclePath(32, -1));
    path.addPath(...createQueenCirclePath(7, -4.5));
    path.addPath(...createQueenCirclePath(24, -4));
    
    context.fill(path);
    context.stroke(path);


    context.stroke(new Path2D('M 11,38.5 A 35,35 1 0 0 34,38.5'));
    context.strokeStyle = WHITE;
    context.stroke(new Path2D('M 11,29 A 35,35 1 0 1 34,29'));
    context.stroke(new Path2D('M 12.5,31.5 L 32.5,31.5'));
    context.stroke(new Path2D('M 11.5,34.5 A 35,35 1 0 0 33.5,34.5'));
    context.stroke(new Path2D('M 10.5,37.5 A 35,35 1 0 0 34.5,37.5'));
}

function drawWhiteRook(context, x, y){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = WHITE;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    [
        'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z',
        'M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z',
        'M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14',
        'M 34,14 L 31,17 L 14,17 L 11,14',
        'M 31,17 L 31,29.5 L 14,29.5 L 14,17',
        'M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5',
        'M 11,14 L 34,14',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });
}

function drawBlackRook(context, x, y){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    [
        'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z',
        'M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z',
        'M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14',
        'M 34,14 L 31,17 L 14,17 L 11,14',
        'M 31,17 L 31,29.5 L 14,29.5 L 14,17',
        'M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5',
        'M 11,14 L 34,14',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });

    context.strokeStyle = WHITE;
    [
        'M 12,35.5 L 33,35.5 L 33,35.5',
        'M 13,31.5 L 32,31.5',
        'M 14,29.5 L 31,29.5',
        'M 14,16.5 L 31,16.5',
        'M 11,14 L 34,14',
    ].forEach((coord) => {
        context.stroke(new Path2D(coord));
    });
}

function drawWhiteKing(context, x, y){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = WHITE;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    [
        'M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25',
        'M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });

    [
        'M 22.5,11.63 L 22.5,6',
        'M 20,8 L 25,8',
        'M 11.5,30 C 17,27 27,27 32.5,30',
        'M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5',
        'M 11.5,37 C 17,34 27,34 32.5,37',
    ].forEach((coord) => {
        context.stroke(new Path2D(coord));
    });
}

function drawBlackKing(context, x, y){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    [
        'M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25',
        'M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });

    [
        'M 22.5,11.63 L 22.5,6',
        'M 20,8 L 25,8',
    ].forEach((coord) => {
        context.stroke(new Path2D(coord));
    });

    context.strokeStyle = WHITE;
    [
        'M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85',
        'M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37',
    ].forEach((coord) => {
        context.stroke(new Path2D(coord));
    });
}

function drawBishop(context, x, y, isWhite){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = isWhite ? WHITE : BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    [
        'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z',
        'M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z',
        'M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });
    
    context.strokeStyle = isWhite ? BLACK : WHITE;
    [
        'M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18',
    ].forEach((coord) => {
        context.stroke(new Path2D(coord));
    });
}

function drawKnight(context, x, y, isWhite){
    context.resetTransform();
    context.translate(x+2, y);
    context.scale(1.3, 1.3);
    context.fillStyle = isWhite ? WHITE : BLACK;
    context.strokeStyle = BLACK;
    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'butt';

    [
        'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18',
        'M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });

    context.fillStyle = isWhite ? BLACK : WHITE;
    context.strokeStyle = isWhite ? BLACK : WHITE;
    [
        'M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z',
    ].forEach((coord) => {
        const path = new Path2D(coord);
        context.fill(path);
        context.stroke(path);
    });

    if(!isWhite){
        [
            'M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z',
        ].forEach((coord) => {
            const path = new Path2D(coord);
            context.fill(path);
        });
    }

    const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
    matrix.a = 0.866;
    matrix.b = 0.5;
    matrix.c = -0.5;
    matrix.d = 0.866;
    matrix.e = 9.693;
    matrix.f = -5.173;

    const path = new Path2D();
    path.addPath(new Path2D('M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z'), matrix);
    context.fill(path);
    context.stroke(path);
}