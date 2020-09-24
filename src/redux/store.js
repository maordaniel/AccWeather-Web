import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import reducers from "./reducers";
import sessionStorage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    pReducer,
    applyMiddleware(thunk)
);

const persistor = persistStore(store);
export { persistor, store };