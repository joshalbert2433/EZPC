import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/style.css";
import { UserProvider } from "./services/reducers/userInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>
);
