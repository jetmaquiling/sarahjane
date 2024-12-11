import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

//axios.defaults.baseURL = "https://mlaserver-hb5vv.ondigitalocean.app/api";
axios.defaults.baseURL = "http://192.168.100.167:1337/api";
//axios.defaults.baseURL = "http://localhost:1337/api";

export { axios };
