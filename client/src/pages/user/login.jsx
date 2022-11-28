import React from "react";
import NavBar from "../partials/navBar";
import LoginBG from "../../assets/images/login_bg.jpg";
import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <NavBar />
            <div className="w-[900px] mx-auto flex bg-base-100 rounded overflow-hidden">
                <div className=" w-1/2 min-h-[400px]">
                    <img
                        className="object-cover h-full"
                        src={LoginBG}
                        alt="background"
                    />
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-semibold py-8">Login Page</h1>

                    <form
                        action="#"
                        method="POST"
                        className="space-y-6 w-[80%]"
                    >
                        <div>
                            <label htmlFor="email" className="label">
                                Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email Address"
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
                    <div className="divider w-[80%] mx-auto">OR</div>
                    <div className="w-[80%]">
                        <button className="btn btn-secondary w-full">
                            Guest Login
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="py-8">Don't have account?</p>
                        <Link
                            to={{ pathname: "/sign-up" }}
                            className="link link-primary font-semibold no-underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
