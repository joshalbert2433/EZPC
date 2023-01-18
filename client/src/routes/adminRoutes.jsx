import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../services/reducers/userInfo";

export default function AdminRoutes({ children }) {
	const { state } = useContext(User);
	const { userInfo } = state;
	return userInfo && userInfo.isAdmin ? children : <Navigate to="/" />;
}
