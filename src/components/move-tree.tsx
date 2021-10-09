import React, { useState } from 'react';
import css from './move-tree.module.scss';
import MoveTreeItem from './move-tree-item';
import { GameNode } from '../chess/move-tree';

interface MoveTreeProps {
    title: string;
    tree: GameNode;
    treeUpdatedCallback: (moves: string[]) => void;
}

const MoveTree = ({ title, tree, treeUpdatedCallback }: MoveTreeProps) => {
    const [currentNode, setCurrentNode] = useState(tree);
    const [path, setPath] = useState([] as string[]);

    const isRoot = path.length === 0;

    const getTreeTitle = () =>{
        if(isRoot){
            return '';
        }
        let ret = ' - ';
        let moveNumber = 0;
        path.forEach((move, i) => {
            if(i % 2 === 0){
                moveNumber++;
                ret += `${moveNumber}.`;
            }
            ret += `${move} `;
        });
        return ret;
    };
    const treeTitle = getTreeTitle();
    const totalGames = Object.keys(currentNode.children).reduce((total, key) => total + currentNode.children[key].games.length, 0);
    
    const children = Object.keys(currentNode.children).sort((key1, key2) => currentNode.children[key2].games.length - currentNode.children[key1].games.length);
    
    const getChild = (key: string): GameNode => currentNode.children[key];
    
    const childClicked = (key: string) => {
        const newPath = path.concat(key)
        setPath(newPath);
        setCurrentNode(getChild(key));
        treeUpdatedCallback(newPath);
    };

    const resetTree = () => {
        const newPath = [];
        setPath(newPath);
        setCurrentNode(tree);
        treeUpdatedCallback(newPath);
    };

    const copyPgn = () => {
        const pgn = treeTitle.replace(/^ - /, '');
        navigator.clipboard.writeText(pgn);
    };

    const moveTreeItems = children.map((childKey, i) => {
        const node = getChild(childKey);
        return (<MoveTreeItem gameNode={node} itemClickedCallback={childClicked} totalGames={totalGames} itemKey={childKey} key={`${childKey}-${i}`} />);
    });

    return (
        <div className={css.container}>
            <div>
                <h4 className={css.title}>{title}{treeTitle}</h4>
                {!isRoot && <button onClick={resetTree}>Reset</button>}
                {!isRoot && <button className={css.copyButton} onClick={copyPgn}>Copy PGN</button>}
                <ol className={css.moveList}>
                    { moveTreeItems }
                </ol>
            </div>
        </div>
    );
};

export default MoveTree;