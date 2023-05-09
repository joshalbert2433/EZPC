import Axios from "axios";

const Ecomm = Axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {},
});

export default Ecomm;
