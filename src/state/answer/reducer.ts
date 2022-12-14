import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    multipleAnswer: 1,
    openAnswer: 'deenz'
}

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        setMultipleAnswer: (state, action) => {
            state.multipleAnswer = action.payload
        },
        setOpenAnswer: (state, action) => {
            state.openAnswer = action.payload
        },
    }
})

export const { setMultipleAnswer, setOpenAnswer } = answerSlice.actions
export default answerSlice.reducer