import joi, { ValidationErrorItem } from '@hapi/joi';
import { BadRequestError } from '@helpers/errors';

/**
 * getErrMessage
 * @param {ValidationErrorItem} item
 * @returns {message} returns message string
 */
const getErrMessage = (item: ValidationErrorItem) => {
  let message;
  switch (item.type) {
    case `${item.type.split('.')[0]}.only`:
      message = `${item?.context?.value} is not a valid option`;
      break;
    case `${item.type.split('.')[0]}.required`:
      message = `${item.path.join('.')} is required`;
      break;
    case `object.min`:
      message = `This request body should not be empty`;
      break;
    case `string.min`:
      message = `${item.path.join('.')} should have at least ${
        item?.context?.limit
      } characters!`;
      break;
    case `string.max`:
      message = `${item.path.join('.')} should have at most ${
        item?.context?.limit
      } characters!`;
      break;
    case `string.alphanum`:
      message = `${item.path.join(
        '.'
      )} should contain only alphanumeric characters`;
      break;
    case `string.base`:
      message = `${item.path.join('.')} should be a string`;
      break;
    case `string.length`:
      message = `${item.path.join('.')} should only be ${
        item?.context?.limit
      } characters, no less, no more`;
      break;
    default:
      break;
  }
  return message;
};

/**
 * Validator
 * @param {ValidationErrorItem[]} errors
 * @returns {customErrors} returns custom error
 */
const buildErrorObject = (
  errors: ValidationErrorItem[]
): { message: string; details: string } | {} => {
  const customErrors: any = {};
  errors.forEach((item) => {
    if (
      !Object.prototype.hasOwnProperty.call(customErrors, item.path.join('.'))
    ) {
      const details = getErrMessage(item);

      customErrors[item.path.join('.')] = {
        message: item.message.replace(/['"]+/g, ''),
        details,
      };
    }
  });

  return customErrors;
};

/**
 * Validator
 * @param {object} request
 * @param {joi.ObjectSchema} schema
 * @returns {value} returns value
 */
export const validator = (
  request: { [key: string]: any },
  schema: joi.ObjectSchema
) => {
  const validation = schema.validate(request, { abortEarly: false });
  const { value, error } = validation;

  if (error) {
    throw new BadRequestError(
      'Invalid request data',
      buildErrorObject(error.details)
    );
  }

  return value;
};
