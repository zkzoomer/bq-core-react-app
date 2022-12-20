import { configureStore, combineReducers } from '@reduxjs/toolkit'

import answer from './answer/reducer'
import chain from './chain/reducer';
import message from './message/reducer'
import modal from './modal/reducer';

const store = configureStore({
    reducer: {
        answer,
        chain,
        message,
        modal,
    }
})

const rootReducer = combineReducers({
    answer,
    chain,
    message,
    modal
})

export type IRootState = ReturnType<typeof rootReducer>
export default store
