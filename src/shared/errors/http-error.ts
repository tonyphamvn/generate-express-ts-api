import httpStatus from 'http-status';
import messages from '@/shared/messages';

export class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message || 'Something went wrong. Please try again.');
    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

function createErrorClass(name: string, statusCode: number, defaultMessage: string) {
  return class extends HttpError {
    constructor(message = defaultMessage) {
      super(message, statusCode);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
    }
  };
}

export const BadRequestError = createErrorClass(
  'BadRequestError',
  httpStatus.BAD_REQUEST,
  messages.httpMessage[400],
);

export const UnauthorizedError = createErrorClass(
  'UnauthorizedError',
  httpStatus.UNAUTHORIZED,
  messages.httpMessage[401],
);

export const ForbiddenError = createErrorClass(
  'ForbiddenError',
  httpStatus.FORBIDDEN,
  messages.httpMessage[403],
);

export const EntityNotFoundError = createErrorClass(
  'EntityNotFoundError',
  httpStatus.NOT_FOUND,
  messages.httpMessage[404],
);

export const ConflictError = createErrorClass(
  'ConflictError',
  httpStatus.CONFLICT,
  messages.httpMessage[409],
);

export const BadGatewayError = createErrorClass(
  'BadGatewayError',
  httpStatus.BAD_GATEWAY,
  messages.httpMessage[502],
);
