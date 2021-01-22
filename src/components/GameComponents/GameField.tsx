import React from 'react';
import {observer} from "mobx-react-lite";
import useStores from "../../hooks/useStores";
import {Tile} from "./Tile";

// Сетка
const Grid = (
    <div className="grid">
        <div/><div/><div/><div/>
    </div>
);

export const GameField = observer(() => {
    const { gameStore: { tiles } } = useStores();

    return (
        <div className={'tiles_wrapper'}>
            {tiles.map((tile, i) => <Tile key={i} index={i} tile={tile}/>)}
            {Grid}
        </div>
    )
});