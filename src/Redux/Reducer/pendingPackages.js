import types from '../type';

const initialState = {
  PendingPackages: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SavePendngPackages:
      return {
        ...state,
        PendingPackages: [...state.PendingPackages, action.payload],
      };
      break;
    case types.UnSavePendingPackages:
      return {
        ...state,
        PendingPackages: state.PendingPackages.filter(
          PendingPackages => PendingPackages.id !== action.payload.id,
        ),
      };
      break;
    case types.UpdateCountValue:
      const filterData = state.PendingPackages.filter(PendingPackages => {
        PendingPackages.id == action.payload.id;
        return PendingPackages;
      });
      filterData[0].screenOpenCount = filterData[0].screenOpenCount - 1;
      //   const updateValue = () => {

      //   };
      //   updateValue()
      return {
        ...state,
        PendingPackages: filterData[0],
      };
      break;
    case types.DeleteAllPackages:
      return {PendingPackages: []};
    default:
      return state;
      break;
  }
}
