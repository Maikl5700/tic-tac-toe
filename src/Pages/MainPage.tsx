import React from 'react';

import {Header} from "../components/GameComponents/Header";
import {GameField} from "../components/GameComponents";
import {Page} from "../components/General";


export default () => {
    return (
        <Page title={'Игра'}>
            <Header/>
            <GameField/>
        </Page>
    )
};