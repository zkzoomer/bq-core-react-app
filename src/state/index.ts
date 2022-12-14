import { configureStore, combineReducers } from '@reduxjs/toolkit'

import answer from './answer/reducer'
import chain from './chain/reducer';
import error from './error/reducer'
import modal from './modal/reducer';

const store = configureStore({
    reducer: {
        answer,
        chain,
        error,
        modal,
    }
})

const rootReducer = combineReducers({
    answer,
    chain,
    error,
    modal
})

export type IRootState = ReturnType<typeof rootReducer>
export default store
