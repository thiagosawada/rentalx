import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };
