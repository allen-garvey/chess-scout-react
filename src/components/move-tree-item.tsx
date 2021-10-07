import React from 'react';
import css from './move-tree-item.module.scss';
import ResultsGraph from './results-graph';
import GameLinksList from './game-links-list';
import { GameNode } from '../chess/move-tree';

interface MoveTreeItemProps {
    itemKey: string;
    gameNode: GameNode;
    totalGames: number;
    itemClickedCallback: (key: string) => void;
}

const MoveTreeItem = ({ itemKey, gameNode, totalGames, itemClickedCallback }: MoveTreeItemProps) => {
    const calculatePercentage = (part: number, total: number) => (part / total * 100).toFixed(2);
    const itemClicked = () => itemClickedCallback(itemKey);

    return (
        <li className={css.statItem}
        >
            <div className={css.clickable} onClick={itemClicked}>
                <h5 className={css.statTitle}>
                    <span>{ itemKey } { ' ' }</span> 
                    <span className={css.gamesCount}>{ gameNode.games.length } games </span> 
                    <span className={css.gamesCountPercentage}>{ calculatePercentage(gameNode.games.length, totalGames) }%</span>
                </h5>
                <ResultsGraph 
                    total={gameNode.games.length}
                    wins={gameNode.results.wins}
                    draws={gameNode.results.draws}
                    losses={gameNode.results.losses}
                />
                <dl className={css.statPercentages}>
                    <dt>Wins</dt>
                    <dd>
                        {calculatePercentage(gameNode.results.wins, gameNode.games.length)}%
                    </dd>
                    <dt>Draws</dt>
                    <dd>
                        {calculatePercentage(gameNode.results.draws, gameNode.games.length)}%
                    </dd>
                    <dt>Losses</dt>
                    <dd>
                        {calculatePercentage(gameNode.results.losses, gameNode.games.length)}%
                    </dd>
                </dl>
            </div>
            { gameNode.games.length <= 4 && <GameLinksList games={gameNode.games} /> }
        </li>
    );
};

export default MoveTreeItem;
