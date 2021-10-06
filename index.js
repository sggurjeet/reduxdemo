const redux = require('redux')
const reduxLogger = require('redux-logger')


const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


//action
const BUY_CAKE ='BUY_CAKE'
const BUY_ICECREAM ='BUY_ICECREAM'

//action creator
function buyCake(){
    return{
        type: BUY_CAKE,
        info:'First Redux Code'

    }
}

function buyIceCream(){
    return{
        type: BUY_ICECREAM,
        }
}

//Initial State of the object
/*const initialState = {
    numOfCakes:10,
    numOfIceCream:20
}*/
const initialCakeState={
    numOfCakes:10
}

const initialIceCreamState ={
    numOfIceCream:20
}
//state reducers, it is having initial state of the object 
/*const reducer=(state = initialState,action)=>{
 switch(action.type){
  case BUY_CAKE:return{
      ...state,
      numOfCakes:state.numOfCakes-1
  }
  case BUY_ICECREAM:return{
    ...state,
    numOfIceCream:state.numOfIceCream-2
}
  default: return state
 }
}*/
const cakeReducer=(state = initialCakeState,action)=>{
    switch(action.type){
     case BUY_CAKE:return{
         ...state,
         numOfCakes:state.numOfCakes-1
     }
     default: return state
    }
}
const iceCreamReducer=(state = initialIceCreamState,action)=>{
    switch(action.type){
     case BUY_ICECREAM:return{
         ...state,
         numOfIceCream:state.numOfIceCream-1
     }
     default: return state
    }
}

//Combined Reducers
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store = createStore(rootReducer,applyMiddleware(logger))
//gives the state of the object, in this case the initial state
console.log('InitialState',store.getState())
//used for subscribing to changes, method accepts a function
//unsubscribe method is used to capture return function from subscribe method
const unsubscribe = store.subscribe(()=>{})
//dispatch function is used to update the state, it accepts action as a parameter
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream()) 
unsubscribe()

