export const HttpStatus = {
  Ok: 200,
  Created: 201,
  NoContent: 204,

  MovedPermanently: 301,
  Found: 302,
  NotModified: 304,

  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  TooManyRequests: 429,

  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
} as const;

export type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];
