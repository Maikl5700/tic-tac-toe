import React, {FC} from 'react';
import {CircleIcon, CrossIcon} from "../Icons";
import useStores from "../../hooks/useStores";
import {TileHighlight, TileState, TileType} from "../../stores";
import {observer} from "mobx-react-lite";

type Props = {
    tile: TileType,
    index: TileState,
}

export const Tile: FC<Props> = observer(({ tile, index }) => {
    const { gameStore: { userTurn, isFieldEditable } } = useStores();
    const { tileHighlight, tileState } = tile;

    return (
        <div
            className={
                `tile
                ${(!tileState && isFieldEditable) && ' tile_hover'}
                ${(tileHighlight === TileHighlight.Win) ? ' tile_win' : ''}
                ${(tileHighlight === TileHighlight.Lose) ? ' tile_lose' : ''}`
            }
            style={{pointerEvents: !isFieldEditable || tileState ? 'none' : 'auto'}}
            onClick={() => userTurn(index)}
        >
            {tileState === TileState.Cross && <CrossIcon/>}
            {tileState === TileState.Circle && <CircleIcon/>}
        </div>
    )
});