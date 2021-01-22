import {useContext} from "react";
import {StoreContext} from "../index";

const useStores = () => {
    return useContext(StoreContext);
};

export default useStores