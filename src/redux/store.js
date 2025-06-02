import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from './slice/applicationSlice'

export const store = configureStore({
    reducer: {
        application: applicationReducer
    },
})