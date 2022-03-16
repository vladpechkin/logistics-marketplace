import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Offer, State} from "../types";
import cities from "../cities.json"

const initialState : State = {
	originLat: 0,
	originLong: 0,
	destinationLat: 0,
	destinationLong: 0,
	selectedOfferId: 0
}

export const reducerSlice = createSlice({
			name: "reducerSlice",
			initialState,
			reducers: {
				selectOffer: (state, action: PayloadAction<Offer>) => {
					const {id, originId, destinationId} = action.payload
					const originCity = cities.find(city => city.id === originId)
					const destinationCity = cities.find(city => city.id === destinationId)
					if (originCity && destinationCity) {
						state.originLat = originCity.lat
						state.originLong = originCity.long
						state.destinationLat = destinationCity.lat
						state.destinationLong = destinationCity.long
						state.selectedOfferId = id
					}
				}
			}
		}
)