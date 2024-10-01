import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ message: "Name is required" });
		}
		const findCompany = await Company.findOne({
			name,
		});
		if (findCompany) {
			return res.status(400).json({ message: "Company name already exists" });
		}
		const company = await Company.create({
			name,
			userId: req.id,
		});
		res.status(200).json({
			message: "Company registered successfully",
			"Comapny Name": company,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getCompany = async (req, res) => {
	try {
		const userId = req.id;
		if (!userId) {
			return res.status(404).json({ message: "Please login" });
		}
		const comapnies = await Company.find({ userId });
		res
			.status(200)
			.json({ message: "Fetched all companies", Company: comapnies });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getCompanyById = async (req, res) => {
	try {
		const userId = req.id;
		if (!userId) {
			return res.status(404).json({ message: "Please login" });
		}
		const company = await Company.findById(req.params.id);
		if (!company) {
			return res.status(404).json({ message: "Company not found" });
		}
		res.status(200).json({ message: "Company found!", company: company });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateCompany = async (req, res) => {
	try {
		const userId = req.id;
		if (!userId) {
			return res.status(404).json({ message: "Please login" });
		}
		const data = req.body;
		const file = req.file;
		const company = await Company.findByIdAndUpdate(
			req.params.id,
			{...data},
			{ new: true }
		);
		if (!company) {
			return res.status(404).json({ message: "Company not found" });
		}
		res
			.status(200)
			.json({ message: "Company updated successfully", company: company });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};
