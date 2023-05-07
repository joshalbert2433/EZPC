import Axios from "axios";

const Ecomm = Axios.create({
	// baseURL: "https://ezpc-backend-joshalbert.onrender.com/api/",
	// baseURL: "http://localhost:8080/api/",
	// baseURL: "http://localhost:8080/api/",
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {},
});

export default Ecomm;
