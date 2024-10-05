import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import companyRouter from "./routes/company.route.js";
import jobsRouter from "./routes/jobs.route.js";
import userRouter from "./routes/user.route.js";
import connectDB from "./utils/db.js";
 


dotenv.config({});
const app = express();

app.get("/home", (req, res) => {
	return res.send("Welcome to the Home Page");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/jobs", jobsRouter);




app.listen(PORT, function () {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});

// Define the routes
