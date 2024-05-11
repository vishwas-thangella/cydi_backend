const express = require("express");
const { AddMembership, GetMemberships, PurchaseMembership, DeActivateMembership } = require("../controllers/Membership");

const Router = express.Router();


Router.post("/add",AddMembership);
Router.get("/",GetMemberships);
Router.post("/purchase/:mid/:uid",PurchaseMembership);
Router.get("/deactivate/:email",DeActivateMembership);

module.exports = Router;