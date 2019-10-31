import React from 'react';
const useEffect = (React as any).useEffect;
import { Store } from './store/Store'
import axios from 'axios'
import { sortColumns } from './Helpers'
import * as Types from './store/Types'

const Logger = () => {

    const { state } = React.useContext(Store);

    process.env.NODE_ENV !== "production" && console.log("Next State: ", state)

    return(
        <>
        </>
    )
}

export default Logger
