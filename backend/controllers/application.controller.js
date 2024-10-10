import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
	try {
		const applicant = req.id;
		const jobId = req.params.id;
		if (!jobId) {
			return res.status(400).json({ message: "Invalid job id" });
		}
		const applicationAlreadyExists = await Application.findOne({
			job: jobId,
			applicant: applicant,
		});
		if (applicationAlreadyExists) {
			return res.status(400).json({ message: "Application already exists" });
		}
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({ message: "No job found" });
		}
		const newAplication = await Application.create({
			applicant,
			jobId,
		});
		job.applications?.push(newAplication._id);
		await job.save();
		return res.status(200).json({
			message: "Application submitted successfully",
			newAplication,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getAppliedJob = async (req, res) => {
	try {
		const userId = req.id;
		if (!userId) {
			return res.status(404).json({ message: "Please login" });
		}
		const applications = await Application.find({ applicant: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "jobId",
				options: {
					sort: { createdAt: -1 },
				},
				populate: {
					path: "company",
					options: {
						sort: { createdAt: -1 },
					},
				},
			});
		if (!applications) {
			return res.status(404).json({ message: "No applications found" });
		}
		return res.status(200).json({
			message: "Fetched all applications",
			Applications: applications,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getApplicants = async (req, res) => {
	try {
		const jobId = req.params.id;
		if (!jobId) {
			return res.status(400).json({ message: "Invalid job id" });
		}
		const applications = await Job.find({ jobId })
			.sort({ createdAt: -1 })
			.populate({
				path: "applicant",
				options: {
					sort: { createdAt: -1 },
				},
			});
		if (!applications) {
			return res.status(404).json({ message: "No applications found" });
		}
		return res.status(200).json({
			message: "Fetched all applicants",
			applications: applications,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateStatus = async (req, res) => {
	try {
		const applicationId = req.params.id;
		const status = req.body.status;
		if (!applicationId || !status) {
			return res.status(400).json({ message: "Invalid request" });
		}
		const application = await Application.findById(applicationId);

		if (!application) {
			return res.status(404).json({ message: "No application found" });
		}
		application.status = status;
		await application.save();
		
		return res.status(200).json({
			message: "Status updated successfully",
			application,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};
