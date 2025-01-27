import { Router, Response } from "express";
import { AuthenticateStudentController } from "./controllers/Student/AuthenticateStudentController";
import { CreateStudentController } from "./controllers/Student/CreateStudentController";
import { CreateTransactionController } from "./controllers/Transaction/CreateTransactionController";
import { GetAccountBalanceController } from "./controllers/Account/GetAccountBalanceController";
import { GetTransactionsController } from "./controllers/Transaction/GetTransactionsController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { UpdateTransactionsController } from "./controllers/Transaction/UpdateTransactionController";
import { DeleteTransactionController } from "./controllers/Transaction/DeleteTransactionController";
import validateResource from "./middlewares/requestValidator";
import {
  createStudentSchema,
  authenticateStudentSchema,
  createTransactionSchema,
  updateTransactionSchema,
} from "./domain/schema";

const router = Router();

const createStudentController = new CreateStudentController();
const authenticateStudentController = new AuthenticateStudentController();
const createTransactionController = new CreateTransactionController();
const getAccountBalanceController = new GetAccountBalanceController();
const getTransactionsController = new GetTransactionsController();
const updateTransactionController = new UpdateTransactionsController();
const deleteTransactionController = new DeleteTransactionController();

router.get("/", (_, response: Response) => {
  return response.json({
    ok: true,
  });
});

router.post(
  "/student",
  validateResource(createStudentSchema),
  createStudentController.handle
);
router.post(
  "/login/student",
  validateResource(authenticateStudentSchema),
  authenticateStudentController.handle
);
router.post(
  "/transaction",
  validateResource(createTransactionSchema),
  ensureAuthenticated,
  createTransactionController.handle
);
router.get("/balance", ensureAuthenticated, getAccountBalanceController.handle);
router.get(
  "/transaction",
  ensureAuthenticated,
  getTransactionsController.handle
);
router.patch(
  "/transaction/:transactionId",
  validateResource(updateTransactionSchema),
  ensureAuthenticated,
  updateTransactionController.handle
);
router.delete(
  "/transaction/:transactionId",
  ensureAuthenticated,
  deleteTransactionController.handle
);

export { router };
