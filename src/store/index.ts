import { City, Offer } from "../types"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../types'
import { reducerSlice } from "./reducer"

export const store = configureStore({
	reducer: reducerSlice.reducer,
})

export const {selectOffer} = reducerSlice.actions
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector