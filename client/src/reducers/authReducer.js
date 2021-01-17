import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  // console.log(
  //   `authreducer.js - state=${JSON.stringify(state)} action = ${JSON.stringify(
  //     action
  //   )}`
  // );
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;
