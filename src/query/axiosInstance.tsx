import axios from "axios";
import Cookies from "js-cookie";
import { SITE_BACKEND_URL } from "../utility/globals";

const axiosStrapi = axios.create({
  baseURL: `${SITE_BACKEND_URL}/api`,
});

export default axiosStrapi;
