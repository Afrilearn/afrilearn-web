import AdminRole from "../db/models/adminRole.model";
import ClassModel from "../db/models/classes.model";
import User from "../db/models/users.model";
import Helper from "../utils/user.utils";
import sendEmail from "../utils/email.utils";
import StudentRequest from "../db/models/studentRequest.model";
import sendWhatsappMessge from "../utils/whatsapp.utils";
import Subject from "../db/models/subjects.model";
import Course from "../db/models/courses.model";
import EnrolledCOurse from "../db/models/enrolledCourses.model";

/**
 *Contains StudentRequest Controller
 *
 *
 *
 * @class StudentRequestController
 */
class StudentRequestController {
  /**
   * Add an Admin to a class
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof StudentRequestController
   * @returns {JSON} - A JSON success response.
   *
   */
  static async addStudentRequest(req, res) {
    let attachment = "";
    if (req.file) {
      attachment = req.file.location;
    }
    try {
      const request = await StudentRequest.create({
        ...req.body,
        userId: req.data.id,
        attachment,
      });
      const user = await User.findById(req.data.id);
      const subject = await Subject.findById(req.body.subjectId).populate(
        "mainSubjectId"
      );
      const course = await Course.findById(req.body.courseId);

      // Send Whatsapp message to admin (a request was received)
      // Send Whatsapp message to user (we received your request)
      const body = `Hello Afrilearn, I am ${user.fullName} \nPlease help me with this Question. \nQuestion: ${req.body.question} \nSubject: ${subject.mainSubjectId.name} \nClass: ${course.name}  \nEmail: ${req.body.email}  \nPhone: ${req.body.phone} `;
      sendWhatsappMessge(body, "");
      if (attachment) {
        sendWhatsappMessge(body, attachment);
      }

      // Send an email to admin (a request was received)
      // Send an email to user (we received your request)
      const htmlMessage = `
      <html>
      <head>
        <title></title>
        <link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div>Hello Afrilearn, I am ${user.fullName} ,</div>
        <div>Please help me with this Question.</div>
        <div>Question: ${req.body.question}</div>
        <div>Subject: ${subject.mainSubjectId.name}</div>
        <div>Class: ${course.name}</div>
        <div>Email: ${req.body.email}</div>
        <div>Phone: ${req.body.phone} </div>
        ${
          attachment &&
          `<div>Attachment: <a href="${attachment}">Download</a></div>`
        }
        
        
      </body>
      </html>
      `;

      sendEmail(
        req.body.email,
        "We received your request.",
        `Hello ${user.fullName}, we received your request '${req.body.question}'. A team member will contact you soon to help you out.`
      );
      sendEmail("care@myafrilearn.com", " HOMEWORK ASSISTANCE", htmlMessage);
      // care@myafrilearn.com
      return res.status(200).json({
        status: "success",
        data: { request },
      });
    } catch (error) {
      return res.status(500).json({
        status: "500 Internal server error",
        error: "Error Adding Student Request",
      });
    }
  }

  /**
   * clear enrolled courses with no user
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof StudentRequestController
   * @returns {JSON} - A JSON success response.
   *
   */
  static async clearEnrolledC(req, res) {
    try {
      const users = await User.find({}).populate("enrolledCourses");
      const counts = [];
      const nulls = [];
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const enrolledCoursesCount = await EnrolledCOurse.countDocuments({
          userId: user._id,
        });
        if (user.enrolledCourses.length < 1) {
          nulls.push(user);
          counts.push(enrolledCoursesCount);
          // await enrolledCOurse.remove();
        }
      }
      console.log("nulls", nulls.length);
      console.log("counts", counts);

      return res.status(200).json({
        status: "success",
        data: { nulls },
      });
    } catch (error) {
      return res.status(500).json({
        status: "500 Internal server error",
        error: "Error Adding Student Request",
      });
    }
  }
}
export default StudentRequestController;
