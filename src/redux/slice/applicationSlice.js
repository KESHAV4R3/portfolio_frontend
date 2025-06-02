import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentSection: "Home",
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateCurrentSection: (state, action) => {
            state.currentSection = action.payload
        }
    },
})

export const { updateCurrentSection } = applicationSlice.actions

export default applicationSlice.reducer