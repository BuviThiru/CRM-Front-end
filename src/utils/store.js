import { configureStore } from "@reduxjs/toolkit";
import appSlice from './slice'
const store = configureStore({
  reducer : {tokenCred : appSlice}
}
)

export default store;