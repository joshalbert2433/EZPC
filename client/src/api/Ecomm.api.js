import Axios from "axios";

const Ecomm = Axios.create({
	baseURL: "https://ezpc-backend-joshalbert.onrender.com/api/",
	headers: {},
});

export default Ecomm;
