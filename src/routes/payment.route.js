import { Router } from "express";
import PaymentController from "../controllers/payment.controller";
import validateToken from "../middlewares/auth.middleware";
import PaymentValidator from "../validations/payment/payments.validator";
import VerifyPayment from "../validations/payment/verifyGooglePayment.validator";

const router = Router();

// router.post("/manual-sub-teacher", PaymentController.subscribeForTeachers);
router.get("/teacher-plans", PaymentController.getTeacherPaymentPlans);
router.get("/plans", PaymentController.getPaymentPlans);
router.get("/coin-plans", PaymentController.getAfriCoinPaymentPlans);
router.post("/add-teacher-plan", PaymentController.addTeacherPaymentPlan);
router.post("/add-coin-plan", PaymentController.addAfriCoinPaymentPlan);
router.post(
  "/add-transaction",
  validateToken,
  PaymentValidator.validateData(),
  PaymentValidator.myValidationResult,
  PaymentController.addTransaction
);

router.post(
  "/verify-paystack-payment",
  validateToken,
  PaymentController.verifyPaystackPayment
);
router.post(
  "/pay-with-coins",
  validateToken,
  PaymentController.payWithAfriCoins
);

router.post(
  "/verify-google-payment",
  validateToken,
  VerifyPayment.validateData(),
  VerifyPayment.myValidationResult,
  PaymentController.verifyGoogleBilingPayment
);
router.post(
  "/verify-google-payment-for-coin-purchase",
  validateToken,
  VerifyPayment.validateData(),
  VerifyPayment.myValidationResult,
  PaymentController.verifyGoogleBilingPaymentForCoinPurchase
);
export default router;
