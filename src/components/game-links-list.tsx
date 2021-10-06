import React from 'react';
import css from 'game-links-list.module.scss';

interface GameLinksListProps {
    games: string[];
};

const GameLinksList = ({ games }: GameLinksListProps) => {
    const gamesListItems = games.map(gameUrl => (
        <li 
            className={css.gameLinkItem}
            key={gameUrl}
        >
            <a href={gameUrl} target="_blank" rel="noopener noreferrer">{ gameUrl.replace(/^https?:\/\/(www.)?/, '') }</a>
        </li>
    ));

    return (<ul className={css.gameLinksList}>
        { gamesListItems }
    </ul>)
};

export default GameLinksList;