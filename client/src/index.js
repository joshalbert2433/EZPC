import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/style.css";
import { UserProvider } from "./services/reducers/userInfo";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<UserProvider>
		<HelmetProvider>
			<App />
		</HelmetProvider>
	</UserProvider>
	// </React.StrictMode>
);
