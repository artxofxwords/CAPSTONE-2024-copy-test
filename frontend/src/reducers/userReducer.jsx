export const userData = {
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    companyName: null,
    company: null,
    city: null,
    state: null,
    isAdmin: null,
    _id: null
}

export function userReducer ( state, action ) {
    switch(action.type) {
        case "SET_USERDATA" : {
            console.log("CTX: ", action.userData);
            
            let newState = {...state, ...action.userData}

            return newState
        }
}
}