import express from 'express';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const companyRouter = express.Router();

companyRouter.route("/register").post(isAuthenticated,registerCompany);
companyRouter.route("/update/:id").post(isAuthenticated,updateCompany);
// companyRouter.route("/delete/:id").delete(deleteCompany);
companyRouter.route("/:id").get(isAuthenticated,getCompanyById);
companyRouter.route("/").get(isAuthenticated, getCompany);



export default companyRouter;