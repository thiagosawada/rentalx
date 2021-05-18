import { Router } from "express";

import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordController.handle);

export { passwordRoutes };
