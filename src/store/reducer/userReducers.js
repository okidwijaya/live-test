import { ACTION_STRING } from "src/store/action/actionString";

const initialState = {
  dataUser: [],
  err: null,
};

const userReducers = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.dataUser:
      const data = action.payload;
      return {
        ...data,
      };
    default:
      return prevState;
  }
};

export default userReducers;
