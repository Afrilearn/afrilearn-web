import {
  Router
} from "express";
import LessonController from "../controllers/lesson.controller";
import verifyToken from "../middlewares/auth.middleware";
import SaveQuizResults from "../validations/results/quizResults.validator";
import ResumePlaying from "../validations/lessons/resumePlaying.validator";
import Favourite from "../validations/lessons/favourite.validator";
import Like from "../validations/lessons/like.validator";

const router = Router();

router.get("/", LessonController.getAllLessons);
router.get("/:lessonId/test", LessonController.loadTest);
router.post(
  "/:lessonId/save-test-results",
  SaveQuizResults.validateData(),
  SaveQuizResults.myValidationResult,
  verifyToken,
  LessonController.saveTestResult
);
router.get(
  "/:lessonId/get-test-results",
  verifyToken,
  LessonController.getTestResult
);
router.post("/search/:keywords", LessonController.searchLessons);
router.post(
  "/:courseId/:subjectId/subject-lessons",
  LessonController.getSubjectLessonsAndProgress
);
router.patch("/:lessonId/update", LessonController.updateLesson);
router.get("/:lessonId/", LessonController.getSingleLesson);
router.post("/storeUnFinishedVideos", ResumePlaying.validateData(), ResumePlaying.myValidationResult, LessonController.storeUnFinishedVideos);
router.delete("/clearUnFinishedVideos", ResumePlaying.validateData(), ResumePlaying.myValidationResult, LessonController.clearUnFinishedVideos);
router.post("/saveFavouriteVideos", Favourite.validateData(), Favourite.myValidationResult, LessonController.saveFavouriteVideos);
router.delete("/removeFavouriteVideos", Favourite.validateData(), Favourite.myValidationResult, LessonController.removeFromFavourite);
router.post("/saveLikedVideo", Like.validateData(), Like.myValidationResult, LessonController.saveLikedVideo);
router.delete("/removeLikedVideo", Like.validateData(), Like.myValidationResult, LessonController.removeLikedVideo);
export default router;