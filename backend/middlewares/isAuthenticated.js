import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: "User not loggedIn, Please try to login." });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ message: "Unauthorized access" });
		}
		req.id = decoded.userId;
		next();
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};


export default isAuthenticated;