export function sortByGameFrequency(){
    return (a, b) => b[1].games - a[1].games;
}

export function getResult(header, color){
    const result = {
        draws: 0,
        wins: 0,
        losses: 0,
    };
    
    if(header.Winner === 'Draw'){
        result.draws += 1;
    }
    else if(header.Winner === color){
        result.wins += 1;
    }
    else{
        result.losses += 1;
    }
    return result;
}