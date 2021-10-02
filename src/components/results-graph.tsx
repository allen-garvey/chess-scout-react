import React from 'react';
import css from 'results-graph.module.scss';

interface ResultsGraphProps {
    total: number;
    wins: number;
    draws: number;
    losses: number;
}

const ResultsGraph = ({total, wins, draws, losses}: ResultsGraphProps) => {
    const calculateWidth = (num: number) => `${num / total * 100}%`;

    return (
        <div>
            <div className={css.container}>
                <div 
                    className={css.wins}
                    style={{width: calculateWidth(wins)}}
                >
                </div>
                <div 
                    className={css.draws}
                    style={{width: calculateWidth(draws)}}
                >
                </div>
                <div 
                    className={css.losses}
                    style={{width: calculateWidth(losses)}}
                >
                </div>
            </div>
        </div>
    );

};

export default ResultsGraph;