import React from "react";
import { GitHub, Facebook, Linkedin } from "react-feather";

function Footer() {
	return (
		<div className="w-full bg-base-100 mt-8">
			<div className="flex flex-col p-4 h-fit space-y-2  shadow-lg md:w-[1200px] md:mx-auto md:space-y-0 md:p-0 md:flex-row justify-between items-center md:gap-2 md:py-4">
				<p>
					&#169; {new Date().getFullYear()} Joshua Albert Villanueva
				</p>
				<p className="text-sm text-center">
					The products and services displayed on this website are for
					demonstration purposes only
				</p>
				<div className="flex gap-4 pb-2 pt-2 md:pt-0 md:pb-0">
					<a
						target="_blank"
						href="https://github.com/joshalbert2433"
						rel="noreferrer"
					>
						<GitHub
							className="w-5 h-5 hover:text-secondary cursor-pointer"
							strokeWidth={1.5}
						/>
					</a>

					<a
						target="_blank"
						href="https://www.facebook.com/joshuaalbert.villanueva"
						rel="noreferrer"
					>
						<Facebook
							className="w-5 h-5 hover:text-secondary cursor-pointer"
							strokeWidth={1.5}
						/>
					</a>

					<a
						target="_blank"
						href="https://www.linkedin.com/in/joshua-albert-villanueva-149661209/"
						rel="noreferrer"
					>
						<Linkedin
							className="w-5 h-5 hover:text-secondary cursor-pointer"
							strokeWidth={1.5}
						/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Footer;
