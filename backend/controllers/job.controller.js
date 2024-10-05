import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
	try {
		const {
			title,
			description,
			location,
			salary,
			email,
			jobType,
			experience,
			position,
			company,
			requirements,
			openings,
		} = req.body;
		const userId = req.id;
		if (!title || !jobType || !openings || !company || !userId) {
			return res.status(400).json({ message: "Missing required fields" });
		}
		const newJob = await Job.create({
			title,
			description,
			location,
			salary,
			email,
			jobType,
			experience,
			position,
			company: company,
			requirements: requirements?.split(",") || requirements,
			openings,
			createdBy: userId,
		});
		res.status(201).json({ message: "Job posted successfully", newJob });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getAllJobs = async (req, res) => {
	try {
		const keyword = req.query.keyword || "";
		const query = {
			$or: [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		};
		const jobs = await Job.find(query)
			.populate({ path: "company" })
			.sort({ createdAt: -1 });
		if (!jobs) {
			return res.status(404).json({ message: "No jobs found" });
		}
		res.status(200).json({ message: "Founded Jobs", AllJobs: jobs });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getJobById = async (req, res) => {
	try {
		const jobId = req.params.id;
		const job = await Job.findById(jobId).populate({ path: "company" });
		if (!job) {
			return res.status(404).json({ message: "No job found" });
		}
		res.status(200).json({ message: "Founded Job", Job: job });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getAdminJobs = async (req, res) => {
	try {
		const userId = req.id;
		const jobs = await Job.find({ createdBy: userId }).populate({ path: "company" });
		if (!jobs) {
			return res.status(404).json({ message: "No jobs found" });
		}
		res.status(200).json({ message: "Founded Jobs", AllJobs: jobs });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};
