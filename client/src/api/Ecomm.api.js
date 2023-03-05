import Axios from "axios";

const Ecomm = Axios.create({
	// baseURL: "https://ezpc-backend-joshalbert.onrender.com/api/",
	// baseURL: "http://localhost:8080/api/",
	baseURL: "http://localhost:8080/api/",
	headers: {},
});

export default Ecomm;
