import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../components/SearchBar/searchSlice";
import dialogReducer from "../components/Dialog/dialogSlice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
