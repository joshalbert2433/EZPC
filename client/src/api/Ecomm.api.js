import Axios from "axios";

const Ecomm = Axios.create({
	baseURL: "http://localhost:8080/api/",
	headers: {},
});

export default Ecomm;
