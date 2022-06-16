import types from '../type';

const initial_state = {
  IsApplunchFirst: true,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LunchedCompleted:
      return {IsApplunchFirst: false};
    default:
      return {...state};
  }
}
