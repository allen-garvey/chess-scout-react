import React, { useState, useEffect } from 'react';
import css from './results.module.scss';
import Loader from './loader';
import Header from './header';
import Search from './search';
import ChessBoard from './chess-board';
import MoveTree from './move-tree';
import gameTypes from '../models/game-types';
import { getUserGamesStats, UserGameStats } from '../utils/ajax';

interface ResultsProps {
    userName: string;
    selectedGameTypes: string;
}

const Results = ({ userName, selectedGameTypes }: ResultsProps) => {
    const [userGameStats, setUserGameStats] = useState(null as UserGameStats|null);
    const [isLoading, setIsLoading] = useState(true);
    const [moves, setMoves] = useState([] as string[]);
    const [isWhiteSelected, setIsWhiteSelected] = useState(null as boolean|null);
    const [userNotFound, setUserNotFound] = useState(false);

    const getGameTypesTitle = () => {
        return selectedGameTypes.split(',')
        .map(key => {
            const gameType = gameTypes().find(gameType => gameType.key === key);
            return gameType ? gameType.title : '';
        })
        .filter(s => s)
        .join(', ');
    };
    const gameTypesTitle = getGameTypesTitle();
    const userNameUrl = `https://lichess.org/@/${encodeURIComponent(userName)}`;
    const moveTreeUpdated = (moves: string[], isWhite: boolean) => {
        setMoves(moves);
        if(moves.length === 0){
            setIsWhiteSelected(null);
        }
        else{
            setIsWhiteSelected(isWhite);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setUserNotFound(false);
        
        getUserGamesStats(userName, selectedGameTypes)
        .then((results) => {
            setUserGameStats(results);
            setIsLoading(false);
        })
        .catch(() => {
            setUserNotFound(true);
            setIsLoading(false);
        });
    }, [userName, selectedGameTypes]);

    return (
        <div>
            {isLoading &&  <Loader />}
            {!isLoading && <Header />}
            {!isLoading && <div className={css.search}><Search /></div>}
            {!isLoading && !userNotFound && <div>
                <div className={css.header}>
                    <h1 className={css.title}>Opening stats for <a href={userNameUrl} target="_blank" rel="noopener noreferrer">{userName}</a></h1>
                    {gameTypesTitle && <div className={css.gameTypes}>{ gameTypesTitle }</div>}
                </div>
                <div className={css.content}>
                    <ChessBoard moves={moves}/>
                    <div className={css.moveTrees}>
                        {(isWhiteSelected === true || isWhiteSelected === null) && <MoveTree 
                            title="White"
                            tree={userGameStats!.moveTrees.white}
                            treeUpdatedCallback={(moves) => moveTreeUpdated(moves, true)}
                        />}
                        {(isWhiteSelected === false || isWhiteSelected === null) &&  <MoveTree
                            title="Black"
                            tree={userGameStats!.moveTrees.black}
                            treeUpdatedCallback={(moves) => moveTreeUpdated(moves, false)}
                        />}
                    </div>
                </div>
            </div>}
            {!isLoading && userNotFound && <div>
                <h2>User { userName } not found</h2>
            </div>}
        </div>
    );
};

export default Results;
