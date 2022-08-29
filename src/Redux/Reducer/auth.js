import types from '../type';

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LoginType:
      const data = action.payload;
      return {userData: data};
      break;
    case types.LogoutType:
      return {userData: {}};
      break;
    default:
      return {...state};
      break;
  }
}
