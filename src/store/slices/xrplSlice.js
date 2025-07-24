import { createSlice } from '@reduxjs/toolkit'

const xrplSlice = createSlice({
  name: 'xrpl',
  initialState: {
    connectionStatus: false,
    isExplicitDisconnect: false,
    latestLedger: null,

    latestTx: null,

    OfferBookLeft: [],
    OfferBookRight: [],
  },
  reducers: {
    updateConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload
    },
    updateIsExplicitDisconnect: (state, action) => {
      state.isExplicitDisconnect = action.payload
    },
    updateLatestLedger: (state, action) => {
      state.latestLedger = action.payload
    },
    updateLatestTx: (state, action) => {
      state.latestTx = action.payload
    },

    setOfferBookLeft: (state, action) => {
      state.OfferBookLeft = action.payload
    },
    setOfferBookRight: (state, action) => {
      state.OfferBookRight = action.payload
    },
  }
})

export const {
  setServerURL,
  updateConnectionStatus,
  updateIsExplicitDisconnect,
  updateLatestLedger,
  updateLatestTx,
  setOfferBookLeft,
  setOfferBookRight
} = xrplSlice.actions
export default xrplSlice.reducer