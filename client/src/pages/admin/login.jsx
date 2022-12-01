import React from "react";
import NavBar from "../partials/navBar";

function AdminLogin() {
    return (
        <>
            <NavBar />
            <div className="">
                <div className="w-[400px] mx-auto flex flex-col items-center justify-center bg-base-100 rounded-lg pb-8">
                    <h1 className="text-3xl font-semibold py-8">
                        Admin Login Page
                    </h1>

                    <form
                        action="#"
                        method="POST"
                        className="space-y-6 w-[80%]"
                    >
                        <div>
                            <label htmlFor="username" className="label">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input input-bordered w-full "
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered w-full "
                            />
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-primary w-full"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;
