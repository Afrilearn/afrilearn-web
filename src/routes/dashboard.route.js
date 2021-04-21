import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller";
import validateToken from "../middlewares/auth.middleware";

const router = Router();

router.post("/", validateToken, DashboardController.getUserDashboard);
router.post(
  "/class-membership",
  validateToken,
  DashboardController.getUserDashboardClassMembership
);
router.post(
  "/recentActivities-by-time",
  DashboardController.getUserDashboardRecentActivitiesTimeBased
);
router.post(
  "/recentActivities",
  validateToken,
  DashboardController.getUserDashboardRecentActivities
);
router.post(
  "/recommendations",
  validateToken,
  DashboardController.getUserDashboardRecommendations
);
router.post(
  "/enrolled-courses",
  validateToken,
  DashboardController.getUserDashboardEnrolledCourses
);
router.post(
  "/student-performance-summary",
  validateToken,
  DashboardController.getStudentPerformanceSummary
);
// router.get('/:courseId', CourseController.getCourse);
// router.get(
//   '/:courseId/progress-and-performance',
//   validateToken,
//   CourseController.getCourseProgressAndPerformance,
// );
// router.get('/:courseId/subjects', CourseController.getSubjectsForACourse);
// router.post(
//   '/enroll',
//   AddEnrolledCourseValidator.validateData(),
//   AddEnrolledCourseValidator.myValidationResult,
//   CourseController.addCourseToEnrolledCourses,
// );
// router.post(
//   '/subject-progress',
//   validateToken,
//   SubjectProgressValidator.validateData(),
//   SubjectProgressValidator.myValidationResult,
//   SubjectProgressValidator.progressExist,
//   CourseController.subjectProgress,
// );

export default router;
