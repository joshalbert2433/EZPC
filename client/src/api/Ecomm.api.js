import Axios from "axios";

const Ecomm = Axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
    // baseURL: "http://localhost:8080",
});

export default Ecomm;
