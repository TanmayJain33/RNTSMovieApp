import {GET_USER_DETAILS} from '../constants';

const initialState = {
  userDetails: {},
};

function settingReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {...state, userDetails: action.payload};
    default:
      return state;
  }
}

export default settingReducer;
