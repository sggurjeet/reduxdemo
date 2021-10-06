const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

//STATE VARIABLE
const initialState = {
    loading: false,
    users:[],
    error:''
}

//ACTION 
const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'

//ACTION CREATORS
const fetchUsersRequest = ()=>{
    return{
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = users =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = error =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}
//ASYNC ACTION CREATOR
//WITH THE HELP OF THUNK MIDDLEWARE WE ABLE TO RETURN A FUNCTION FROM THE ACTION CREATOR
//THIS FUNCTION DOESN'T HAVE TO BE PURE IT CAN HAVE SIDEEFFECTS, RETURN API CALLS AND DISPATCH ACTIONS AS IT RECEIVES DISPATCH METHOD AS IT'S ARGUEMENT 
const fetchUsers =() =>{
        return function (dispatch) {
            dispatch(fetchUsersRequest())
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is the array of users
                const users = response.data.map(users => users.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error =>{
                //catch the error 
                dispatch(fetchUsersFailure(error.message))
            })
                     
        }
}
//REDUCERS
const reducer = (state=initialState,action) =>{
    switch(action.type){
        //first case when user makes request then only type of loading is set to true.
        case FETCH_USERS_REQUEST:return{
            ...state,
            loading:true
        }
        //second case is when the data fetching is successful
        case FETCH_USERS_SUCCESS:return{
            ...state,
            loading:false,
            users: action.payload, //user now has the property action.payload which is now the property we are passing.
            error:''
        }
        //third case for error when no data is returned
        case FETCH_USERS_FAILURE: return{
            ...state,
            loading:false,
            user:[],
            error: action.payload
        }
        //IF THE DATA IS RETURNED THEN ERROR IS AN EMPTY ARRAY AND IF NOT THEN THE USERS ARRAY HAS AN EMPTY VALUE
        default:return state
    }

}

//REDUX STORE (create a store and pass reducer function as the parameter)
const store = createStore(reducer,applyMiddleware(thunkMiddleware))
//console.log('store is created.')
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())