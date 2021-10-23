import React, {FormEvent, useState} from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import css from './search.module.scss';
import formCss from './form.module.scss';
import getGameTypes, {IGameType} from '../models/game-types';

const Search = () => {
    const [userName, setUserName] = useState('');
    const history = useHistory();
    const [gameTypes, setGameTypes] = useState(getGameTypes());
    const submitAction = (e: FormEvent) => {
        e.preventDefault();
        const gameTypesQuery = gameTypes
                .filter(gameType => gameType.isChecked)
                .map(gameType => gameType.key)
                .join(',');
        const query = gameTypesQuery ? `?gameTypes=${gameTypesQuery}` : '';
        history.push(`/u/${userName}${query}`);
    };
    const gameTypeId = (gameType: IGameType) =>`${gameType.key}_checkbox_id`;
    const toggleGameType = (toggledGameType: IGameType) => setGameTypes(gameTypes.map(gameType => {
        if(gameType.key === toggledGameType.key){
            return {
                ...gameType,
                isChecked: !gameType.isChecked,
            };
        }
        return gameType;
    }));

    return (<div>
        <form onSubmit={submitAction}>
            <div className={css.searchContainer}>
                <label 
                    className={css.searchLabel}
                >
                    Lichess User Name
                    <input 
                        type="search" 
                        className={formCss['form-control']} 
                        placeholder="EricRosen"
                        value={userName} onInput={(e) => setUserName((e.target as HTMLInputElement).value)}
                        autoFocus 
                    />
                </label>
                <input 
                    className={cx(css.button, formCss.btn,  formCss['btn-primary'])} 
                    type="submit" 
                    value="Submit" 
                    disabled={!userName} 
                />
            </div>
            <div className={css.checkboxContainer}>
                {gameTypes.map((gameType) => 
                    <div key={gameType.key}>
                        <input 
                            id={gameTypeId(gameType)}
                            type="checkbox"
                            className={formCss['form-check-input']}
                            checked={gameType.isChecked}
                            onChange={() => toggleGameType(gameType)}
                        />
                        <label className={css.label} htmlFor={gameTypeId(gameType)}>{ gameType.title }</label>
                    </div> 
                )}
            </div>
        </form>
    </div>);
};

export default Search;