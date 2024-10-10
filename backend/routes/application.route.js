import express from "express";

import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const applicationRouter = express.Router();

applicationRouter.route("/apply/:id").get(isAuthenticated, applyJob);
applicationRouter.route("/jobs-applied").get(isAuthenticated, getAppliedJob);
// companyRouter.route("/delete/:id").delete(deleteCompany);
applicationRouter.route("/:id/applicants").get(isAuthenticated, getApplicants);
applicationRouter.route("/update/:id").post(isAuthenticated, updateStatus);

export default applicationRouter;
