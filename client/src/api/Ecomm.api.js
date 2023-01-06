import Axios from "axios";

const Ecomm = Axios.create({
	baseURL: "http://localhost:8080/api/",
	headers: {
		// "Content-Type": "application/json",
		// headers: {
		// 	Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I3MTRiOGM1ZTMyZTQyNjM1OWUxMmQiLCJlbWFpbCI6InczdzI0MzNAZW1haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY3Mjk0OTE1MiwiZXhwIjoxNjc1NTQxMTUyfQ.CORgNv7PpLoRYRtmIbsfYQA1kO2pEYonZ-ZU1l5zppE`,
		// },
	},
	// baseURL: "http://localhost:8080",
});

export default Ecomm;
