import {
    check,
    validationResult
  } from 'express-validator';
  
  /**
   *Contains AddEnrolledCourseValidator Validator
   *
   *
   *
   * @class AddEnrolledCourseValidator
   */
  class Like {
    /**
     * validate Add/Remove Favourite data.
     * @memberof Favourite
     * @returns {null} - No response.
     */
    static validateData() {
      return [
        check('userId')
        .exists()
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('User ID should be a mongoID'),       
        check('lessonId')
        .exists()
        .withMessage('Lesson ID is required')
        .isMongoId()
        .withMessage('Lesson ID should be a mongoID')                   
      ];
    }
  
    /**
     * validate Add EnrolledCourse data.
     * @param {Request} req - Response object.
     * @param {Response} res - The payload.
     * @param {Response} next - The next parameter.
     * @memberof AddEnrolledCourseValidator
     * @returns {JSON} - A JSON success response.
     */
    static async myValidationResult(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errArr = errors.array().map(({
          msg
        }) => msg);
        return res.status(400).json({
          status: '400 Invalid Request',
          error: 'Your request contains invalid parameters',
          errors: errArr,
        });
      }
      return next();
    }
  }
  export default Like;