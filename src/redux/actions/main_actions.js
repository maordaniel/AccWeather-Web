export const setFavorites = item => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_FAVORITES",
        payload: item
    })
};

export const setTheme = theme => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_THEME",
        payload: theme
    })
};


export const setCurrentLocation = location => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_CURRENT_LOCATION",
        payload: location
    })
};

export const setUnit = unit => dispatch =>{
    dispatch({
        type: "SUCCESS_SET_UNIT",
        payload: unit
    })
};