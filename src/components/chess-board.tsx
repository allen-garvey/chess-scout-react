import React, { useRef, useEffect, LegacyRef } from 'react';
import { drawBoard } from '../chess-board';

const ChessBoard = (moves: string[]) => {
    const canvas: LegacyRef<HTMLCanvasElement> = useRef(null);

    useEffect(() => {
        const context = canvas.current!.getContext('2d')!;
        drawBoard(context, moves);
    }, [moves]);
    
    return (
    <div>
        <canvas ref={canvas}></canvas>
    </div>);
};

export default ChessBoard;