import types from '../type';

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LoginType:
      const data = action.payload;
      return {userData: data};
    case types.LogoutType:
      return {userData: {}};
    default:
      return {...state};
  }
}
