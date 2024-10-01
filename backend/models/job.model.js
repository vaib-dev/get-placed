import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		requirements: [{ type: String }],
		salary: { type: Number },
		location: { type: String },
		jobType: { type: String, required: true },
		experience: { type: Number },
		openings: { type: Number, required: true },
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
			required: true,
		},
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		applications: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
	},
	{ timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
