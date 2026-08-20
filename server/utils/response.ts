export function sendResponseSuccess<T>(
    event: any, 
    data: T, 
    statusCode: HttpStatusCode = HttpStatus.Ok
) {
  setResponseStatus(event, statusCode)
  return {
    success: true as const,
    data
  }
}

