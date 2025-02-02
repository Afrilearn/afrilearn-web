import { Router } from "express";
import ExamController from "../controllers/exams.controller";
import validateToken from "../middlewares/auth.middleware";
import upload from "../config/bucket";
import AddExamValidator from "../validations/exams/addExam.validator";
import AddResultExamValidator from "../validations/exams/addExamResult.validator";
import AddQuestionTypeValidator from "../validations/exams/addQuestionType";

const router = Router();

router.get(
  "/student-exams/:classId",
  validateToken,
  ExamController.getRelatedExam
);
router.get("/exam-question-type", ExamController.getExamQuestionType);
router.post(
  "/exam-question-type",
  AddQuestionTypeValidator.validateData(),
  AddQuestionTypeValidator.myValidationResult,
  validateToken,
  ExamController.createExamQuestionType
);
router.delete("/question/:questionId", ExamController.deleteQuestion);
router.get("/question/:questionId", ExamController.getQuestion);
router.get("/exam-question/:examId", ExamController.readExamQuestions);
router.patch(
  "/exam-theory-question/:questionId",
  upload.fields([{ name: "contentImages" }]),
  ExamController.updateTheoryExamQuestion
);
router.post(
  "/exam-theory-question",
  validateToken,
  upload.fields([{ name: "contentImages" }]),
  ExamController.createTheoryExamQuestion
);
router.post(
  "/exam-question",
  validateToken,
  upload.fields([
    { name: "images" },
    { name: "question_image", maxCount: 1 },
    { name: "contentImages" },
  ]),
  ExamController.createExamQuestion
);
router.post(
  "/exam-result/:resultId/:resultItemId",
  ExamController.updateExamResultScore
);
router.patch("/exam-result/:resultId", ExamController.updateExamResult);
router.get("/exam-result/:resultId", ExamController.getResult);
router.post(
  "/exam-result",
  AddResultExamValidator.validateData(),
  AddResultExamValidator.myValidationResult,
  validateToken,
  ExamController.saveExamResult
);
router.get("/exam/:examId", ExamController.getExam);
router.get("/exam", validateToken, ExamController.getTeacherExams);
router.patch("/exam/:examId", ExamController.updateExam);
router.post("/send-results/:examId", ExamController.sendExamResultsToStudents);
router.post(
  "/exam",
  AddExamValidator.validateData(),
  AddExamValidator.myValidationResult,
  validateToken,
  ExamController.createExam
);
router.get(
  "/class/:classId",
  validateToken,
  ExamController.getStudentLatestExam
);
router.get(
  "/instruction/:examId",
  validateToken,
  ExamController.getExamInformation
);
export default router;
