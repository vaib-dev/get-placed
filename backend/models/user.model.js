import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, unique: true },
		dob: { type: Date },
		password: { type: String, required: true },
		role: { type: String, enum: ["student", "recruiter"], default: "user" },
		profile: {
			bio: { type: String },
			company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
			profileImage: { type: String, default: "" },
			skills: [{ type: String }],
			resume: { type: String },
			resumeOriginalName: { type: String },
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
