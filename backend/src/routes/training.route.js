import { Router } from "express";
import {
  createTrainingObject,
  deleteTrainingObject,
  getTrainingObject,
} from "../controllers/training.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/exercise").post(createTrainingObject);

router
  .route("/exercise/:id")
  .get(getTrainingObject)
  .delete(deleteTrainingObject);

export default router;
