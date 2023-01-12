const jwt = require("jsonwebtoken");

module.exports = isAuth = (req, res, next) => {
	const authorization = req.headers.authorization;
	// console.log(req.user);

	if (authorization) {
		const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: "Invalid Token" });
			} else {
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(401).send({ message: "No Token" });
	}
};
