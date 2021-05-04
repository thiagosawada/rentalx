import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsUseController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsUseController = new ListAvailableCarsUseController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.get("/available", listAvailableCarsUseController.handle);
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
