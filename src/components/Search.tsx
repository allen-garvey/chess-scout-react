import React, {FormEvent, useState} from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import css from './search.module.scss';

const Search = () => {
    const [userName, setUserName] = useState('');
    const history = useHistory();
    const submitAction = (e: FormEvent) => {
        e.preventDefault();
        history.push(`/u/${userName}`);
    };

    return (<div>
        <form onSubmit={submitAction}>
            <div className={css.searchContainer}>
                <label 
                    className={cx(css.searchLabel, 'form-control')}
                >
                    Lichess User Name
                    <input 
                        type="search" 
                        className="form-control" 
                        value={userName} onInput={(e) => setUserName((e.target as HTMLInputElement).value)} 
                    />
                </label>
                <input 
                    className={cx(css.button, 'btn',  'btn-primary')} 
                    type="submit" 
                    value="Submit" 
                    disabled={!userName} 
                />
            </div>
        </form>
    </div>);
};

export default Search;