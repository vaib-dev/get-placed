import express from 'express';

import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const jobsRouter = express.Router();

jobsRouter.route("/post").post(isAuthenticated,postJob);
jobsRouter.route("/get-all").get(isAuthenticated,getAllJobs);
// companyRouter.route("/delete/:id").delete(deleteCompany);
jobsRouter.route("/get-admin-jobs").get(isAuthenticated,getAdminJobs);
jobsRouter.route("/get-job/:id").get(isAuthenticated, getJobById);



export default jobsRouter;