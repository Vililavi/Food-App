import axios from 'axios';

// Tama on action jossa funktio
// VAIHDA POSTIKSI

export const login = (username, password) => async dispatch => {

    const response = await axios.post(
        "http://localhost:5000/user_routes/checkuser", {
        username: username,
        password: password
    });

    dispatch({ type: 'USER_LOGGED_IN', payload: response.data });


};
/*export const login = (username, password) => async dispatch => {
    const response = await axios.get("http://localhost:5000/user_routes/checkuser?username=" + username +
        '&password=' + password);

    dispatch({ type: 'USER_LOGGED_IN', payload: response.data });
};*/


// Tama on normi Actioni
export const logout = () => {

    return {
        type: 'USER_LOGGED_OUT'
    };

};






