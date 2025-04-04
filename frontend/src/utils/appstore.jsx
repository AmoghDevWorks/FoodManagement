import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import typeReducer from './typeSlice'

const appStore = configureStore({
    reducer:{
        user:userReducer,
        type:typeReducer
    }
})

export default appStore