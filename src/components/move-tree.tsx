import React, { useState } from 'react';
import css from 'loader.module.scss';
import ResultsGraph from './results-graph';
import { GameNode } from '../chess/move-tree';

interface MoveTreeProps {
    title: string;
    tree: GameNode;
}

const MoveTree = ({ title, tree }: MoveTreeProps) => {
    const [currentNode, setCurrentNode] = useState(tree);
    const [path, setPath] = useState([] as string[]);

    const isRoot = path.length === 0;

    // treeTitle(){
    //     if(this.isRoot){
    //         return '';
    //     }
    //     let ret = ' - ';
    //     let moveNumber = 0;
    //     this.path.forEach((move, i) => {
    //         if(i % 2 === 0){
    //             moveNumber++;
    //             ret += `${moveNumber}.`;
    //         }
    //         ret += `${move} `;
    //     });
    //     return ret;
    // },
    const totalGames = Object.keys(currentNode.children).reduce((total, key) => total + currentNode.children[key].games.length, 0);
    
    const children = Object.keys(currentNode.children).sort((key1, key2) => currentNode.children[key2].games.length - currentNode.children[key1].games.length);


    const calculatePercentage = (part: number, total: number) => (part / total * 100).toFixed(2);
    
    const getChild = (key: string): GameNode => currentNode.children[key];
    
    const childClicked = (key: string) => {
        setPath(path.concat(key));
        setCurrentNode(getChild(key));
        // send tree updated
    };

    const resetTree = () => {
        setPath([]);
        setCurrentNode(tree);
        // send tree updated
    };

    const copyPgn = () => {
        const pgn = treeTitle.replace(/^ - /, '');
        navigator.clipboard.writeText(pgn);
    };

    return (
        <div className={css.container}>
            <div>
                <h4 className={css.title}>{title}{treeTitle}</h4>
                {!isRoot && <button onClick={resetTree}>Reset</button>}
                {!isRoot && <button className={css.copyButton} onClick={copyPgn}>Copy PGN</button>}
                <ol className={css.moveList}>
                    <li 
                        v-for="(childKey, index) in children" 
                        :key="index" 
                        className={css.statItem}
                    >
                        <div className={css.clickable} onClick={childClicked(childKey)}>
                            <h5 className={css.statTitle}>
                                <span>{ childKey } { ' ' }</span> 
                                <span className={css.gamesCount}>{{ getChild(childKey).games.length }} games </span> 
                                <span className={css.gamesCountPercentage}>{ calculatePercentage(getChild(childKey).games.length, totalGames) }%</span>
                            </h5>
                            <ResultsGraph 
                                total={getChild(childKey).games.length}
                                wins={getChild(childKey).results.wins}
                                draws={getChild(childKey).results.draws}
                                losses={getChild(childKey).results.losses}
                            />
                            <dl className={css.statPercentages}>
                                <dt>Wins</dt>
                                <dd>
                                    {calculatePercentage(getChild(childKey).results.wins, getChild(childKey).games.length)}%
                                </dd>
                                <dt>Draws</dt>
                                <dd>
                                    {calculatePercentage(getChild(childKey).results.draws, getChild(childKey).games.length)}%
                                </dd>
                                <dt>Losses</dt>
                                <dd>
                                    {calculatePercentage(getChild(childKey).results.losses, getChild(childKey).games.length)}%
                                </dd>
                            </dl>
                        </div>
                        <ul 
                            className={css.gameLinksList}
                            v-if="getChild(childKey).games.length <= 4"
                        >
                            <li 
                                className={css.gameLinkItem}
                                v-for="gameUrl in getChild(childKey).games" 
                                key={gameUrl}
                            >
                                <a href={gameUrl} target="_blank" rel="noopener noreferrer">{ gameUrl.replace(/^https?:\/\/(www.)?/, '') }</a>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default MoveTree;