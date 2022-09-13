import { TYPES } from "../actions/crudActions";

export const crudInitialState = {
  users: [],
};

export const crudReducer = (state, { type, payload }) => {
  switch (type) {
    case TYPES.GET_ALL_DATA:
      return {
        ...state,
        users: payload,
      };

    case TYPES.CREATE_ONE:
      return {
        ...state,
        users: [...state.users, payload],
      };

    case TYPES.DELETE_ONE:
      return {
        ...state,
        users: state.users.filter(el => el.id !== payload),
      };

    case TYPES.UPDATE_ONE:
      return {
        ...state,
        users: state.users.map(el => (el.id !== payload.id ? el : payload)),
      };

    default:
      return state;
  }
};
