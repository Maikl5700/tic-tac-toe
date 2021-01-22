import { action as act, observable as obs, makeAutoObservable } from 'mobx';


export enum Stage {
    New = 0,
    YouTurn = 1,
    EnemyTurn = 2,
    Win = 3,
    Lose = 4,
    Draw = 5,
};

export enum TileState {
    Empty = 0,
    Cross = 1,
    Circle = 2
}

export enum TileHighlight {
    None = 0,
    Win = 1,
    Lose = 2
}

export const USER_SIDE = TileState.Circle;
export const ENEMY_SIDE = TileState.Cross;

export type TileType = {
    tileHighlight: TileHighlight,
    tileState: TileState
}


class GameStore {
    @obs counter = 0;
    @obs tiles = Array<TileType>(9).fill({
        tileHighlight: TileHighlight.None,
        tileState: TileState.Empty
    });
    @obs gameStage = Stage.New;
    @obs isFieldEditable = false;
    avaliableTileIndexes = [] as number[];

    constructor() {
        makeAutoObservable(this, {avaliableTileIndexes: false})
    }

    @act checkThreeInRow = (isUser: boolean = false): boolean => {
        const tileState = isUser ? USER_SIDE : ENEMY_SIDE;
        const tileHighlight = isUser ? TileHighlight.Win : TileHighlight.Lose;
        // const indexMap = [ // для наглядности
        //     0, 1, 2,
        //     3, 4, 5,
        //     6, 7, 8,
        // ];

        // Ищем 3 в ряд
        if(
            this.tiles[1].tileState === tileState &&
            this.tiles[4].tileState === tileState &&
            this.tiles[7].tileState === tileState
        ) {
            this.tiles[1].tileState = this.tiles[4].tileState = this.tiles[7].tileState = tileState;
            this.tiles[1].tileHighlight = this.tiles[4].tileHighlight = this.tiles[7].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[2].tileState === tileState &&
            this.tiles[4].tileState === tileState &&
            this.tiles[6].tileState === tileState
        ) {
            this.tiles[2].tileState = this.tiles[4].tileState = this.tiles[6].tileState = tileState;
            this.tiles[2].tileHighlight = this.tiles[4].tileHighlight = this.tiles[6].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[5].tileState === tileState &&
            this.tiles[4].tileState === tileState &&
            this.tiles[3].tileState === tileState
        ) {
            this.tiles[5].tileState = this.tiles[4].tileState = this.tiles[3].tileState = tileState;
            this.tiles[5].tileHighlight = this.tiles[4].tileHighlight = this.tiles[3].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[8].tileState === tileState &&
            this.tiles[4].tileState === tileState &&
            this.tiles[0].tileState === tileState
        ) {
            this.tiles[8].tileState = this.tiles[4].tileState = this.tiles[0].tileState = tileState;
            this.tiles[8].tileHighlight = this.tiles[4].tileHighlight = this.tiles[0].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[0].tileState === tileState &&
            this.tiles[3].tileState === tileState &&
            this.tiles[6].tileState === tileState
        ) {
            this.tiles[0].tileState = this.tiles[3].tileState = this.tiles[6].tileState = tileState;
            this.tiles[0].tileHighlight = this.tiles[3].tileHighlight = this.tiles[6].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[2].tileState === tileState &&
            this.tiles[5].tileState === tileState &&
            this.tiles[8].tileState === tileState
        ) {
            this.tiles[2].tileState = this.tiles[5].tileState = this.tiles[8].tileState = tileState;
            this.tiles[2].tileHighlight = this.tiles[5].tileHighlight = this.tiles[8].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[0].tileState === tileState &&
            this.tiles[1].tileState === tileState &&
            this.tiles[2].tileState === tileState
        ) {
            this.tiles[0].tileState = this.tiles[1].tileState = this.tiles[2].tileState = tileState;
            this.tiles[0].tileHighlight = this.tiles[1].tileHighlight = this.tiles[2].tileHighlight = tileHighlight;
            return true;
        }

        if(
            this.tiles[6].tileState === tileState &&
            this.tiles[7].tileState === tileState &&
            this.tiles[8].tileState === tileState
        ) {
            this.tiles[6].tileState = this.tiles[7].tileState = this.tiles[8].tileState = tileState;
            this.tiles[6].tileHighlight = this.tiles[7].tileHighlight = this.tiles[8].tileHighlight = tileHighlight;
            return true;
        }

        return false;
    };

    @act changeStage = (newStage: Stage) => {
        this.gameStage = newStage;
    };

    @act setEditable = (val: boolean) => {
        this.isFieldEditable = val;
    };

    @act resetTiles = () => {
        this.tiles = Array(9).fill({
            tileHighlight: TileHighlight.None,
            tileState: TileState.Empty
        });
    };

    @act updateAvaliableTileIdexes = () => {
        // обновляем индексы свободных клеток
        let newIndexes = [] as number[];
        this.tiles.forEach((el, i, arr) => {
            if(arr[i].tileState === TileState.Empty) newIndexes.push(i);
        });
        this.avaliableTileIndexes = newIndexes;
    };

    @act enemyTurn = async () => {
        this.gameStage = Stage.EnemyTurn;
        this.isFieldEditable = false;
        // Ожидание хода противника
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Заполняем случайную клетку
        const randomIndex = Math.round(Math.random() * (this.avaliableTileIndexes.length - 1));
        this.tiles[this.avaliableTileIndexes[randomIndex]].tileState = ENEMY_SIDE;

        // проверка победы
        if(this.checkThreeInRow()) {
            this.setEditable(false);
            return this.changeStage(Stage.Lose);
        }

        // проверяем есть свободные клетки
        this.updateAvaliableTileIdexes();
        if(!this.avaliableTileIndexes.length) {
            return this.gameStage = Stage.EnemyTurn;
        }

        // Ход пользователя
        this.changeStage(Stage.YouTurn);
        this.isFieldEditable = true;
    };

    @act userTurn = (index: number) => {
        this.tiles[index].tileState = USER_SIDE;

        // проверка победы
        if(this.checkThreeInRow(true)) {
            this.setEditable(false);
            return this.changeStage(Stage.Win);
        }

        // проверяем есть свободные клетки
        this.updateAvaliableTileIdexes();
        if(!this.avaliableTileIndexes.length && this.gameStage !== Stage.New) {
            return this.gameStage = Stage.Draw;
        }

        // Ход противника
        this.enemyTurn();
    }
}

const gameStore = new GameStore();
export { gameStore, GameStore };