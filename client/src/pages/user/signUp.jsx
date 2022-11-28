import React from "react";
import NavBar from "../partials/navBar";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <>
            <NavBar />
            <div className="w-[400px] mx-auto bg-base-100 py-5 px-12 rounded">
                <form action="#" method="POST" className="space-y-4">
                    <h1 className="text-3xl font-semibold py-4 w-fit mx-auto">
                        Sign Up
                    </h1>

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
                    <div>
                        <label htmlFor="confirm_password" className="label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            className="input input-bordered w-full "
                        />
                    </div>
                    <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-primary w-full"
                    />
                </form>
                <div className="flex items-center gap-2 w-fit mx-auto">
                    <p className="py-8">Have an account?</p>
                    <Link
                        to={{ pathname: "/login" }}
                        className="link link-primary font-semibold no-underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SignUp;
