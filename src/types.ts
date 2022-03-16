import { store } from "./store";

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Offer {
    id: number
    text: string
    originId: number
    destinationId: number
}

export interface City {
    id: number
    name: string
    lat: number,
    long: number
}

export interface State {
    originLat: number,
    originLong: number,
    destinationLat: number,
    destinationLong: number,
    selectedOfferId: number
}