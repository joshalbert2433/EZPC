import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../services/reducers/userInfo";

export default function ProtectedRoutes({ children }) {
	const { state } = useContext(User);
	const { userInfo } = state;
	return userInfo ? children : <Navigate to="/login" />;
}
