import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './top-players.module.scss';
import { Player, getTopPlayers } from '../utils/ajax';

const TopPlayers = () => {
    const [topPlayers, setTopPlayers] = useState({} as Record<string, Array<Player>>);
    useEffect(() => {
        getTopPlayers().then((res) => {
            setTopPlayers(res);
        });
    }, []);

    const isLoaded = Object.keys(topPlayers).length > 0;
    const gameTypes = ['bullet', 'blitz', 'rapid', 'classical'];
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    
    const players = !isLoaded ? null : gameTypes.map((gameType => <div 
        className={css.gameType}
        key={gameType}
    >
        <h3 className={css.gameTypeTitle}>{ capitalize(gameType) }</h3>
        <ol className={css.playerList}>
            {
                topPlayers[gameType].map((player) => 
                    <li key={player.id}>
                        <span className={css.playerTitle}>{ player.title ? `${player.title}` : '' }</span>
                        <Link to={`/u/${player.id}?gameTypes=${gameType}`}>{player.username}</Link>
                    </li>
                )
            }
        </ol>
    </div>));
    
    return (
        isLoaded ? <div className={css.container}>
            <h2 className={css.title}>Top Players</h2>
            <div className={css.gameTypes}>
                {players}
            </div>
        </div> : null
    )
};

export default TopPlayers;
