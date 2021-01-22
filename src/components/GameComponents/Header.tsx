import React from 'react';
import {observer} from "mobx-react-lite";
import useStores from "../../hooks/useStores";
import {Stage} from "../../stores";



export const Header = observer(() => {
    const { gameStore: { changeStage, gameStage, setEditable, resetTiles } } = useStores();

    const finishGame = () => {
        setEditable(false);
        resetTiles();
        changeStage(Stage.New);
    };

    const startGame = () => {
        changeStage(Stage.YouTurn);
        setEditable(true);
    };

    return (
        <div className={'header'}>
            {gameStage === 0 &&
                <h2 onClick={startGame}>
                    Начать игру
                </h2>}
            {gameStage === 1 &&
                <h2>
                    Ваш ход
                </h2>}
            {gameStage === 2 &&
                <h2 >
                    Ход противника
                </h2>}
            {gameStage === 3 &&
                <h2 onClick={finishGame}>
                    Победа
                </h2>}
            {gameStage === 4 &&
                <h2 onClick={finishGame}>
                    Вы проиграли
                </h2>}
            {gameStage === 5 &&
                <h2 onClick={finishGame}>
                    Ничья
                </h2>}
        </div>
    )
});