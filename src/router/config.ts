import {lazy} from "react";


export const routes = [
    {
        path: "/",
        exact: true,
        component: lazy(() => import('../Pages/MainPage'))
    },
];