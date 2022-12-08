import { configureStore, combineReducers } from '@reduxjs/toolkit'

import chain from './chain/reducer';
import error from './error/reducer'
import modal from './modal/reducer';

const store = configureStore({
    reducer: {
        chain,
        error,
        modal,
    }
})

const rootReducer = combineReducers({
    chain,
    error,
    modal
})

export type IRootState = ReturnType<typeof rootReducer>
export default store
