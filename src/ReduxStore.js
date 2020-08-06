import {createStore, combineReducers} from 'redux';

const initialState = {
  username: '',
  email: '',
  phone: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        username: action.data.username,
        email: action.data.email,
        phone: action.data.phone,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer: reducer,
});

const store = createStore(rootReducer);

export default store;
