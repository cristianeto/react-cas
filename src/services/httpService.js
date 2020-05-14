import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //Sentry.captureException(error);
    logger.log(error);
    toast.error("An unexpected error ocurred.");
  }
  return Promise.reject(error);
});
function setPassport(passport) {
  axios.defaults.headers.common = { Authorization: `Bearer ${passport}` };
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setPassport,
};
