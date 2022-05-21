import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getDataUser = () => {
  return axios.get(URL);
};
