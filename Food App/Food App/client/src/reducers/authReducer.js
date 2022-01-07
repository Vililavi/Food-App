const INITIAL_STATE = {
    username: null,
    userID: null
}

const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'USER_LOGGED_IN':
            return {
                username: action.payload.username,
                userID: action.payload._id,
                message: action.payload.message
            }

        case 'USER_LOGGED_OUT':
            return {
                username: null,
                userID: null
            }
        default: return state;
    }
}
export default authReducer;
