const initState = {
    favorites: [],
    theme: "light",
    currentLocation: {},
    defaultLocation: {id: "215854", LocalizedName:"Tel Aviv", "Country": {"ID": "IL", "LocalizedName": "Israel"}},
    unit: true,
};

const main_reducers = (state = initState, action) => {
    switch (action.type){
        case "SUCCESS_SET_FAVORITES":
            return state = {...state, favorites: action.payload};
        case "SUCCESS_SET_THEME":
            return state = {...state, theme: action.payload};
        case "SUCCESS_SET_CURRENT_LOCATION":
            return state = {...state, currentLocation: action.payload};
        case "SUCCESS_SET_UNIT":
            return state = {...state, unit: action.payload};
        default:
            return state;
    }
};

export default main_reducers;
