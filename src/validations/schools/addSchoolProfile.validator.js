import { check, validationResult } from "express-validator";

/**
 *Contains AddSchoolProfileValidator Validator
 *
 *
 *
 * @class AddSchoolProfileValidator
 */
class AddSchoolProfileValidator {
  /**
   * validate AddClass data.
   * @memberof AddSchoolProfileValidator
   * @returns {null} - No response.
   */
  static validateData() {
    return [
      check("name")
        .exists()
        .withMessage("Name is required")
        .not()
        .isEmpty()
        .withMessage("Name cannot be empty"),
      check("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email should be an email"),
    ];
  }

  /**
   * Validate class data.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof AddSchoolProfileValidator
   * @returns {JSON} - A JSON success response.
   */
  static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: "400 Invalid Request",
        error: "Your request contains invalid parameters",
        errors: errArr,
      });
    }
    return next();
  }
}
export default AddSchoolProfileValidator;
