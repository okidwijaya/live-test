const { default: axios } = require("axios");
import { getDataUser } from "src/modules/getData";
import { ACTION_STRING } from "src/store/action/actionString";

const userAction = (data) => {
  return {
    type: ACTION_STRING.dataUser,
    payload: { data },
  };
};

export const userData = () => {
  return (dispatch) => {
    getDataUser()
      .then((res) => {
        // setData(res.data.results);
        dispatch(userAction(res.data.result));
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
