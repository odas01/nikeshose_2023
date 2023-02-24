import express from "express";

import * as user from "../controller/user.controller.js";

const router = express.Router();

router.route("/search").get(user.search);

router
  .route("/:id")
  .get(user.getOne)
  .put(user.updateOne)
  .delete(user.deleteOne);

router.route("/").get(user.getAll);

export default router;
